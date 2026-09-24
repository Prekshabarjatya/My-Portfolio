"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Edge,
  MarkerType,
  Node,
  Position,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

const NODE_LABELS: Record<string, string> = {
  route_recruiter: "1. route_recruiter",
  scroll_projects: "2A. scroll_projects",
  highlight_stack: "2B. highlight_stack",
  answer_personal: "2C. answer_personal",
  evaluate_pitch: "3. evaluate_pitch",
  terminal_output: "4. terminal_output",
};

const BASE_POSITIONS: Record<string, { x: number; y: number }> = {
  route_recruiter: { x: 210, y: 0 },
  scroll_projects: { x: -70, y: 150 },
  highlight_stack: { x: 210, y: 150 },
  answer_personal: { x: 490, y: 150 },
  evaluate_pitch: { x: 210, y: 300 },
  terminal_output: { x: 210, y: 450 },
};

// Plain-language captions for the phone layout, matching ReasoningTrace.
const NODE_CAPTIONS: Record<string, string> = {
  route_recruiter: "Reads your intent",
  scroll_projects: "Projects",
  highlight_stack: "Tech stack",
  answer_personal: "About her",
  evaluate_pitch: "Checks if that's enough, or loops back for more context",
  terminal_output: "Writes the answer",
};

const MOBILE_QUERY = "(max-width: 639px)";

function useIsMobile() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(MOBILE_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );
}

// React Flow scales the whole diagram to fit, which makes labels unreadably
// small on a phone. This stacks the same graph vertically at real text size.
function MobileFlow({
  activeNode,
  visitedNodes,
}: {
  activeNode: string | null;
  visitedNodes: string[];
}) {
  const stateOf = (id: string) =>
    id === activeNode ? "active" : visitedNodes.includes(id) ? "visited" : "idle";

  const nodeCard = (id: string, label: string) => {
    const state = stateOf(id);
    return (
      <div
        className={`rounded-[0.875rem] border px-3 py-2.5 text-center transition-colors ${
          state === "active"
            ? "node-active-glow border-accent bg-foreground text-background"
            : state === "visited"
              ? "border-foreground bg-background"
              : "border-border bg-background"
        }`}
      >
        <p className="text-[14px] font-semibold leading-tight">{label}</p>
        <p
          className={`mt-0.5 text-[12px] leading-snug ${
            state === "active" ? "text-background/80" : "text-muted-foreground"
          }`}
        >
          {NODE_CAPTIONS[id]}
        </p>
      </div>
    );
  };

  const connector = (lit: boolean) => (
    <div className="flex justify-center" aria-hidden="true">
      <span
        className={`h-5 w-0.5 rounded-full ${lit ? "bg-accent" : "bg-border"}`}
      />
    </div>
  );

  const branchIds = ["scroll_projects", "highlight_stack", "answer_personal"];
  const branchTaken = branchIds.some((id) => visitedNodes.includes(id));

  return (
    <div className="rounded-[1.25rem] border border-border bg-card p-3">
      {nodeCard("route_recruiter", NODE_LABELS.route_recruiter)}
      {connector(branchTaken)}
      <div className="grid grid-cols-3 gap-1.5">
        {branchIds.map((id) => {
          const state = stateOf(id);
          return (
            <div
              key={id}
              className={`flex flex-col justify-center rounded-[0.875rem] border px-1 py-2.5 text-center transition-colors ${
                state === "active"
                  ? "node-active-glow border-accent bg-foreground text-background"
                  : state === "visited"
                    ? "border-foreground bg-background"
                    : "border-border bg-background"
              }`}
            >
              <p className="text-[11px] font-semibold leading-tight tracking-tight">
                {NODE_LABELS[id]}
              </p>
              <p
                className={`mt-1 text-[12px] leading-snug ${
                  state === "active"
                    ? "text-background/80"
                    : "text-muted-foreground"
                }`}
              >
                {NODE_CAPTIONS[id]}
              </p>
            </div>
          );
        })}
      </div>
      {connector(visitedNodes.includes("evaluate_pitch"))}
      {nodeCard("evaluate_pitch", NODE_LABELS.evaluate_pitch)}
      {connector(visitedNodes.includes("terminal_output"))}
      {nodeCard("terminal_output", NODE_LABELS.terminal_output)}
    </div>
  );
}

export function AgentGraphFlow({
  activeNode,
  visitedNodes,
}: {
  activeNode: string | null;
  visitedNodes: string[];
}) {
  const isMobile = useIsMobile();
  const nodes: Node[] = useMemo(
    () =>
      Object.entries(NODE_LABELS).map(([id, label]) => {
        const isActive = id === activeNode;
        const isVisited = visitedNodes.includes(id);
        return {
          id,
          position: BASE_POSITIONS[id],
          data: { label },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
          className: isActive ? "node-active-glow" : "",
          style: {
            border: isActive
              ? "2px solid var(--accent)"
              : isVisited
                ? "1.5px solid var(--foreground)"
                : "1px solid var(--border)",
            background: isActive ? "var(--foreground)" : "var(--card)",
            color: isActive ? "var(--background)" : "var(--foreground)",
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 600,
            padding: "10px 12px",
            width: 230,
            textAlign: "center",
            transition: "all 0.3s var(--spring-soft, ease)",
          },
        };
      }),
    [activeNode, visitedNodes]
  );

  const edgeStyle = { stroke: "var(--border)", strokeWidth: 1.5 };
  const activeEdgeStyle = {
    stroke: "var(--accent)",
    strokeWidth: 2.5,
  };

  const isEdgeActive = (from: string, to: string) =>
    activeNode === to && visitedNodes.includes(from);

  const edges: Edge[] = useMemo(
    () => [
      {
        id: "e-route-projects",
        source: "route_recruiter",
        target: "scroll_projects",
        style: isEdgeActive("route_recruiter", "scroll_projects")
          ? activeEdgeStyle
          : edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e-route-stack",
        source: "route_recruiter",
        target: "highlight_stack",
        style: isEdgeActive("route_recruiter", "highlight_stack")
          ? activeEdgeStyle
          : edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e-route-personal",
        source: "route_recruiter",
        target: "answer_personal",
        style: isEdgeActive("route_recruiter", "answer_personal")
          ? activeEdgeStyle
          : edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e-route-self",
        source: "route_recruiter",
        target: "route_recruiter",
        label: "unclear intent",
        labelStyle: { fill: "var(--muted-foreground)", fontSize: 13 },
        style: edgeStyle,
        type: "default",
      },
      {
        id: "e-projects-evaluate",
        source: "scroll_projects",
        target: "evaluate_pitch",
        style: isEdgeActive("scroll_projects", "evaluate_pitch")
          ? activeEdgeStyle
          : edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e-stack-evaluate",
        source: "highlight_stack",
        target: "evaluate_pitch",
        style: isEdgeActive("highlight_stack", "evaluate_pitch")
          ? activeEdgeStyle
          : edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e-personal-evaluate",
        source: "answer_personal",
        target: "evaluate_pitch",
        style: isEdgeActive("answer_personal", "evaluate_pitch")
          ? activeEdgeStyle
          : edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e-evaluate-terminal",
        source: "evaluate_pitch",
        target: "terminal_output",
        style: isEdgeActive("evaluate_pitch", "terminal_output")
          ? activeEdgeStyle
          : edgeStyle,
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "e-evaluate-route",
        source: "evaluate_pitch",
        target: "route_recruiter",
        label: "needs more context",
        labelStyle: { fill: "var(--muted-foreground)", fontSize: 13 },
        style: { ...edgeStyle, strokeDasharray: "4 3" },
        type: "smoothstep",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeNode, visitedNodes]
  );

  // fitView only runs once on mount, so re-fit when the container changes size
  // (window resize, switching layouts).
  const wrapperRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<ReactFlowInstance | null>(null);
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      flowRef.current?.fitView({ padding: 0.2 });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  if (isMobile) {
    return <MobileFlow activeNode={activeNode} visitedNodes={visitedNodes} />;
  }

  return (
    <div
      ref={wrapperRef}
      className="h-[460px] w-full overflow-hidden rounded-[1.25rem] border border-border bg-card"
    >
      <ReactFlow
        onInit={(instance) => {
          flowRef.current = instance;
        }}
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        preventScrolling={false}
        panOnDrag={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="var(--border)" />
      </ReactFlow>
    </div>
  );
}
