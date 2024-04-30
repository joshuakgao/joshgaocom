import dagre from "dagre";
import { useLayoutEffect } from "react";
import { Edge, Node, useReactFlow } from "reactflow";
import Gate from "./gate";

const nodeWidth = 200;
const nodeHeight = 150;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
dagreGraph.setGraph({ rankdir: "LR" });

// recreates nodes with auto calculated positions
function layout(nodes: Node[], edges: Edge[]) {
  nodes.forEach((node) =>
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    })
  );

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x,
        y: nodeWithPosition.y,
      },
    };
  });
}

// builds arrays for all nodes and edges in a graph
// nodes will not have position (x, y)
function trace(root: Gate) {
  const nodes = new Set();
  const edges = new Set();

  function build(v: Gate) {
    if (!nodes.has(v)) {
      const newNode = {
        id: v.label,
        data: {
          gradient: v.gradient,
          ref: v,
          value: v.value,
          label: v.label,
        },
        sourcePosition: "right",
      };

      nodes.add(
        v.operation === ""
          ? {
              ...newNode,
              type: "valueInputNode",
              draggable: false,
            }
          : {
              ...newNode,
              type: "operatorNode",
              targetPosition: "left",
              draggable: false,
              selectable: false,
            }
      );

      for (const child of v.children) {
        edges.add({
          //   id: child.label + v.label
          source: child.label,
          target: v.label,
          animated: true,
        });

        build(child);
      }
    }
  }

  build(root);

  return {
    nodes: Array.from(nodes) as Node[],
    edges: Array.from(edges) as Edge[],
  };
}

function useFitViewOnResize() {
  const reactFlowInstance = useReactFlow();

  useLayoutEffect(() => {
    function update() {
      const nodes = reactFlowInstance.getNodes();
      const edges = reactFlowInstance.getEdges();
      const layoutNodes = layout(nodes, edges);
      reactFlowInstance.setNodes(layoutNodes);
      reactFlowInstance.setEdges(edges);
      reactFlowInstance.fitView();
    }

    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, [reactFlowInstance]);
}

export { layout, trace, useFitViewOnResize };
