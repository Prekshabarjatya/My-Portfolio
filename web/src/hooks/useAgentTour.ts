"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type NodeEvent = {
  id: number;
  node: string;
  action: "idle" | "scroll_to" | "open_modal" | "stream_pitch";
  target: string;
  context?: string[] | null;
  thought?: string;
};

export type TourStatus = "idle" | "connecting" | "open" | "closed" | "error";

// The backend runs on a free Render instance that sleeps when idle. Waking it
// takes anywhere from a few seconds to about a minute.
export type ServerState = "idle" | "waking" | "ready" | "unreachable";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const WS_URL =
  process.env.NEXT_PUBLIC_AGENT_WS_URL ||
  (API_BASE
    ? API_BASE.replace(/\/$/, "").replace(/^http/, "ws") + "/agent-tour"
    : "ws://localhost:8000/agent-tour");
const HEALTH_URL = WS_URL.replace(/^ws/, "http").replace(
  /\/agent-tour$/,
  "/health"
);

const WAKE_ATTEMPT_TIMEOUT_MS = 10_000;
const WAKE_RETRY_DELAY_MS = 3_000;
const WAKE_MAX_MS = 90_000;

function openSocket(timeoutMs: number): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(WS_URL);
    const timer = window.setTimeout(() => {
      socket.close();
      reject(new Error("timeout"));
    }, timeoutMs);
    socket.onopen = () => {
      window.clearTimeout(timer);
      resolve(socket);
    };
    socket.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("socket error"));
    };
  });
}

const sleep = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

export function useAgentTour() {
  const [status, setStatus] = useState<TourStatus>("idle");
  const [serverState, setServerState] = useState<ServerState>("idle");
  const [wakeElapsed, setWakeElapsed] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [lastEvent, setLastEvent] = useState<NodeEvent | null>(null);
  const [steps, setSteps] = useState<NodeEvent[]>([]);
  const [pitchText, setPitchText] = useState("");
  const [isPitching, setIsPitching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const eventIdRef = useRef(0);
  const wakePromiseRef = useRef<Promise<WebSocket> | null>(null);
  const generationRef = useRef(0);

  const attachHandlers = useCallback((socket: WebSocket) => {
    socket.onerror = () => {
      setStatus("error");
      setErrorMessage("Lost connection to the agent. Try asking again.");
    };

    socket.onclose = () => {
      if (socketRef.current === socket) socketRef.current = null;
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
  }, []);

  // Resolves with an open socket, retrying while the server cold-starts.
  // Concurrent callers (page-load warm-up + a user query) share one attempt.
  const wakeServer = useCallback((): Promise<WebSocket> => {
    const existing = socketRef.current;
    if (existing && existing.readyState === WebSocket.OPEN) {
      return Promise.resolve(existing);
    }
    if (wakePromiseRef.current) return wakePromiseRef.current;

    const generation = generationRef.current;
    const isStale = () => generation !== generationRef.current;

    setStatus("connecting");
    setServerState("waking");
    setWakeElapsed(0);
    setErrorMessage(null);

    // A plain HTTP hit is what actually triggers Render to spin the instance up.
    // We don't read the response (it may lack CORS headers while starting).
    fetch(HEALTH_URL, { mode: "no-cors", cache: "no-store" }).catch(() => {});

    const promise = (async () => {
      const startedAt = Date.now();
      while (!isStale()) {
        try {
          const socket = await openSocket(WAKE_ATTEMPT_TIMEOUT_MS);
          if (isStale()) {
            socket.close();
            break;
          }
          socketRef.current = socket;
          attachHandlers(socket);
          setStatus("open");
          setServerState("ready");
          return socket;
        } catch {
          if (Date.now() - startedAt > WAKE_MAX_MS) break;
          await sleep(WAKE_RETRY_DELAY_MS);
        }
      }
      if (!isStale()) {
        setStatus("error");
        setServerState("unreachable");
      }
      throw new Error("agent unreachable");
    })();

    wakePromiseRef.current = promise;
    const clear = () => {
      if (wakePromiseRef.current === promise) wakePromiseRef.current = null;
    };
    promise.then(clear, clear);
    return promise;
  }, [attachHandlers]);

  // Count seconds while waking so the UI can show progress.
  useEffect(() => {
    if (serverState !== "waking") return;
    const startedAt = Date.now();
    const timer = window.setInterval(
      () => setWakeElapsed(Math.floor((Date.now() - startedAt) / 1000)),
      1000
    );
    return () => window.clearInterval(timer);
  }, [serverState]);

  useEffect(() => {
    return () => {
      generationRef.current += 1;
      wakePromiseRef.current = null;
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);

  const sendQuery = useCallback(
    async (query: string) => {
      setVisitedNodes([]);
      setActiveNode(null);
      setSteps([]);
      setPitchText("");
      try {
        const socket = await wakeServer();
        socket.send(JSON.stringify({ query }));
      } catch {
        // serverState/status already reflect the failure
      }
    },
    [wakeServer]
  );

  return {
    status,
    serverState,
    wakeElapsed,
    activeNode,
    visitedNodes,
    lastEvent,
    steps,
    pitchText,
    isPitching,
    errorMessage,
    sendQuery,
    wakeServer,
  };
}
