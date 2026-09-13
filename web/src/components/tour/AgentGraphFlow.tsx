"use client";

import { useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Edge,
  MarkerType,
  Node,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

const NODE_LABELS: Record<string, string> = {
  route_recruiter: "1. route_recruiter",
  scroll_projects: "2A. scroll_projects",
  highlight_stack: "2B. highlight_stack",
  evaluate_pitch: "3. evaluate_pitch",
  terminal_output: "4. terminal_output",
};

const BASE_POSITIONS: Record<string, { x: number; y: number }> = {
  route_recruiter: { x: 210, y: 0 },
  scroll_projects: { x: 20, y: 130 },
  highlight_stack: { x: 400, y: 130 },
  evaluate_pitch: { x: 210, y: 260 },
  terminal_output: { x: 210, y: 390 },
};

export function AgentGraphFlow({
  activeNode,
  visitedNodes,
}: {
  activeNode: string | null;
  visitedNodes: string[];
}) {
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
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 600,
            padding: "8px 10px",
            width: 190,
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
        id: "e-route-self",
        source: "route_recruiter",
        target: "route_recruiter",
        label: "unclear intent",
        labelStyle: { fill: "var(--muted-foreground)", fontSize: 9 },
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
        labelStyle: { fill: "var(--muted-foreground)", fontSize: 9 },
        style: { ...edgeStyle, strokeDasharray: "4 3" },
        type: "smoothstep",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeNode, visitedNodes]
  );

  return (
    <div className="h-[360px] w-full rounded-xl border border-border bg-card overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={true}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="var(--border)" />
      </ReactFlow>
    </div>
  );
}
