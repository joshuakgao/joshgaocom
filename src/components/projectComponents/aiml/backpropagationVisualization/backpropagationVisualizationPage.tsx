import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { defaultEdges, defaultNodes, root } from "./default";
import Gate from "./gate";
import { layout, trace, useFitViewOnResize } from "./utils";

export const AppContext = createContext({
  onValueUpdate: (ref: Gate, val: number) => {},
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
    (ref: Gate, val: number) => {
      ref.update(val, root);
      const { nodes: newNodes, edges: newEdges } = trace(root);
      const layoutNodes = layout(newNodes, newEdges);
      setNodes(layoutNodes);
      setEdges(newEdges);
    },
    [setNodes, setEdges]
  );

  const appContext = { onValueUpdate };

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

  return (
    <ScrollDiv>
      {/* <BackpropagationVisualizationCard toFullscreen /> */}
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
        <h1>JI</h1>
        <h1>aowiefj</h1>
        <h1>fjwioej</h1>
      </MainContentDiv>
    </ScrollDiv>
  );
}
