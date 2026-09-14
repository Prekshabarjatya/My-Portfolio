"use client";

import { useCallback, useRef, useState } from "react";

export type NodeEvent = {
  id: number;
  node: string;
  action: "idle" | "scroll_to" | "open_modal" | "stream_pitch";
  target: string;
  context?: string[] | null;
  thought?: string;
};

export type TourStatus = "idle" | "connecting" | "open" | "closed" | "error";

const WS_URL =
  process.env.NEXT_PUBLIC_AGENT_WS_URL || "ws://localhost:8000/agent-tour";

export function useAgentTour() {
  const [status, setStatus] = useState<TourStatus>("idle");
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [lastEvent, setLastEvent] = useState<NodeEvent | null>(null);
  const [steps, setSteps] = useState<NodeEvent[]>([]);
  const [pitchText, setPitchText] = useState("");
  const [isPitching, setIsPitching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const eventIdRef = useRef(0);

  const ensureSocket = useCallback((): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
      const existing = socketRef.current;
      if (existing && existing.readyState === WebSocket.OPEN) {
        resolve(existing);
        return;
      }

      setStatus("connecting");
      setErrorMessage(null);
      const socket = new WebSocket(WS_URL);
      socketRef.current = socket;

      socket.onopen = () => {
        setStatus("open");
        resolve(socket);
      };

      socket.onerror = () => {
        setStatus("error");
        setErrorMessage(
          "Couldn't reach the agent backend. Is it running at " + WS_URL + "?"
        );
        reject(new Error("WebSocket error"));
      };

      socket.onclose = () => {
        setStatus("closed");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "node_update") {
          eventIdRef.current += 1;
          const nodeEvent: NodeEvent = {
            id: eventIdRef.current,
            node: data.node,
            action: data.action,
            target: data.target,
            context: data.context,
            thought: data.thought,
          };
          setActiveNode(data.node);
          setVisitedNodes((prev) =>
            prev.includes(data.node) ? prev : [...prev, data.node]
          );
          setLastEvent(nodeEvent);
          setSteps((prev) => [...prev, nodeEvent]);
        } else if (data.type === "pitch_start") {
          setPitchText("");
          setIsPitching(true);
        } else if (data.type === "pitch_chunk") {
          setPitchText((prev) => prev + data.chunk);
        } else if (data.type === "pitch_end") {
          setIsPitching(false);
        } else if (data.type === "error") {
          setErrorMessage(data.message);
        }
      };
    });
  }, []);

  const sendQuery = useCallback(
    async (query: string) => {
      setVisitedNodes([]);
      setActiveNode(null);
      setSteps([]);
      setPitchText("");
      try {
        const socket = await ensureSocket();
        socket.send(JSON.stringify({ query }));
      } catch {
        // status/errorMessage already set by onerror
      }
    },
    [ensureSocket]
  );

  return {
    status,
    activeNode,
    visitedNodes,
    lastEvent,
    steps,
    pitchText,
    isPitching,
    errorMessage,
    sendQuery,
  };
}
