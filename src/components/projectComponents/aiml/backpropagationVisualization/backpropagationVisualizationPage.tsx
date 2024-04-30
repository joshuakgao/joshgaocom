import { createContext, useCallback, useMemo, useState } from "react";
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
import { OperatorNode, ValueInputNode } from "./components";
import { defaultEdges, defaultNodes, root } from "./defaults";
import Gate from "./gate";
import { layout, trace, useFitViewOnResize } from "./utils";

export const AppContext = createContext({
  onValueUpdate: (ref: Gate, val: string) => {}, // need to init an empty function for typescript
});

export function BackpropagationVisualizationPage() {
  useFitViewOnResize();
  const [nodes, setNodes] = useState<Node[]>(defaultNodes);
  const [edges, setEdges] = useState<Edge[]>(defaultEdges);

  // define a string id to each type of node like so: {[Node Type]: [Node Component]}
  const nodeTypes: NodeTypes = useMemo(
    () => ({ valueInputNode: ValueInputNode, operatorNode: OperatorNode }),
    []
  );

  // update nodes when interacted with
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // update values and gradients on node value change
  const onValueUpdate = useCallback(
    (ref: Gate, val: string) => {
      ref.update(val, root);
      const { nodes: newNodes, edges: newEdges } = trace(root);
      const layoutNodes = layout(newNodes, newEdges);
      setNodes(layoutNodes);
      setEdges(newEdges);
    },
    [setNodes, setEdges]
  );

  const appContext = { onValueUpdate };

  return (
    <ScrollDiv>
      <MainContentDiv style={{ marginTop: 50 }}>
        <ContentHeader
          date="4/30/2024"
          skills={["typescript", "react"]}
          projectComponents="Backpropagation Visualizer"
          sources={{
            github:
              "https://github.com/tugonbob/joshgao-com/tree/main/src/components/projectComponents/aiml/backpropagationVisualization",
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
          <AppContext.Provider value={appContext}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              nodeTypes={nodeTypes}
              fitView
              edgesFocusable={false}
            >
              <Background variant={BackgroundVariant.Dots} gap={32} size={2} />
            </ReactFlow>
          </AppContext.Provider>
        </div>
      </MainContentDiv>
    </ScrollDiv>
  );
}
