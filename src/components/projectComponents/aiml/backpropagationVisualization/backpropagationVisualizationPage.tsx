import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Edge,
  Node,
  NodeTypes,
  OnNodesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { BackpropagationVisualizationCard } from "./backpropagationVisualizationCard";
import { OperatorNode, ValueInputNode } from "./components";

const initialNodes: Node[] = [
  {
    id: "x1",
    type: "valueInputNode",
    position: { x: 0, y: 0 },
    data: { inputValue: 2, label: "x_1", grad: 1.0 },
    draggable: false,
  },
  {
    id: "w1",
    type: "valueInputNode",
    position: { x: 0, y: 150 },
    data: { inputValue: 4, label: "w_1", grad: 4 },
    draggable: false,
  },
  {
    id: "x2",
    type: "valueInputNode",
    position: { x: 0, y: 350 },
    data: { inputValue: 6, label: "x_2", grad: 5 },
    draggable: false,
  },
  {
    id: "w2",
    type: "valueInputNode",
    position: { x: 0, y: 500 },
    data: { inputValue: 6, label: "w_2", grad: 5 },
    draggable: false,
  },
  {
    id: "x1w1",
    type: "operatorNode",
    position: { x: 200, y: 75 },
    data: { operator: "*", grad: 1, label: "x_1w_1", value: 3 },
    draggable: false,
  },
  {
    id: "x2w2",
    type: "operatorNode",
    position: { x: 200, y: 425 },
    data: { operator: "*", grad: 1, label: "x_2w_2", value: 3 },
    draggable: false,
  },
  {
    id: "Wx",
    type: "operatorNode",
    position: { x: 400, y: 250 },
    data: { operator: "+", grad: 3, label: "Wx", value: 3 },
    draggable: false,
  },
  {
    id: "b",
    type: "valueInputNode",
    position: { x: 400, y: 500 },
    data: { inputValue: 2, label: "b", grad: 4 },
    draggable: false,
  },
  {
    id: "Wx+b",
    type: "operatorNode",
    position: { x: 600, y: 375 },
    data: { operator: "+", grad: 4, label: "Wx+b", value: 3 },
    draggable: false,
  },
  {
    id: "sigmoid",
    type: "operatorNode",
    position: { x: 850, y: 375 },
    data: {
      operator: "sigmoid",
      grad: 1,
      label: "\\sigma \\text{ Gate}",
      value: 6,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "x1->x1w1",
    source: "x1",
    target: "x1w1",
    animated: true,
  },
  {
    id: "w1->x1w1",
    source: "w1",
    target: "x1w1",
    animated: true,
  },
  {
    id: "x2->x2w2",
    source: "x2",
    target: "x2w2",
    animated: true,
  },
  {
    id: "w2->x2w2",
    source: "w2",
    target: "x2w2",
    animated: true,
  },
  {
    id: "x1w1->x1w1+x2w2",
    source: "x1w1",
    target: "Wx",
    animated: true,
  },
  {
    id: "x2w2->x1w1+x2w2",
    source: "x2w2",
    target: "Wx",
    animated: true,
  },
  {
    id: "Wx->Wx+b",
    source: "Wx",
    target: "Wx+b",
    animated: true,
  },
  {
    id: "b->Wx+b",
    source: "b",
    target: "Wx+b",
    animated: true,
  },
  {
    id: "Wx+b->sigmoid",
    source: "Wx+b",
    target: "sigmoid",
    animated: true,
  },
];

export function BackpropagationVisualizationPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const nodeTypes: NodeTypes = useMemo(
    () => ({ valueInputNode: ValueInputNode, operatorNode: OperatorNode }),
    []
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

  return (
    <ScrollDiv>
      <BackpropagationVisualizationCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="1/18/2024"
          skills={["python"]}
          projectComponents="K Nearest Neighbor Algorithm with CIFAR-10 Database Interactive Demo"
          sources={{
            github: "https://github.com/tugonbob/cifar-knn-classifer",
          }}
        />
        <div
          style={{
            width: "100%",
            height: 500,
            border: "1px solid lightgray",
            borderRadius: "var(--borderRadius)",
            padding: 8,
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            fitView
            edgesFocusable={false}
          >
            <Background variant={BackgroundVariant.Dots} gap={32} size={1} />
          </ReactFlow>
        </div>
      </MainContentDiv>
    </ScrollDiv>
  );
}
