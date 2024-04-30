import { createContext, useCallback, useMemo, useState } from "react";
import Latex from "react-latex-next";
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
import diagram from "../../../../assets/projects/aiml/backpropagationVisualization/gradientDiagram.png";
import {
  ContentHeader,
  LatexDiv,
  MainContentDiv,
  ScrollDiv,
  Spacer,
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
            height: 400,
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
        <p style={{ marginTop: 16 }}>
          Change the values of the input nodes and watch how the gradients
          change.
        </p>
        <h2>Backpropagation</h2>
        <p>
          Backpropagation is an algorithm used to train artificial neural
          networks. It's an efficient way to calculate the gradients of a loss
          function with respect to the weights of the network. It does this by
          iterating backwards from the output node and calculates the gradients
          through the use of the chain rule. The intuition behind gradients is
          that the value at the node affects the output of the node by a factor
          of the gradient.
        </p>
        <h3>Calculation</h3>
        <img src={diagram} style={{ width: "100%" }} />
        <p style={{ flexWrap: "wrap" }}>
          <LatexDiv>
            <p style={{ fontSize: 10 }}>
              <Latex>
                {
                  "$$ [\\text{Downstream Grad}] = [\\text{Upstream Grad}] \\times [\\text{Local Grad}] $$"
                }
              </Latex>
            </p>
            <p style={{ fontSize: 12 }}>
              <Latex>
                {
                  "$$ \\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial z} \\frac{\\partial z}{\\partial x} $$"
                }
              </Latex>
              <Spacer />
            </p>
            <p style={{ fontSize: 10 }}>
              <Latex>
                {
                  "$ \\text{Where:} \\\\ L = \\text{entire computational graph} \\\\ x = \\text{downstream node} \\\\ z = \\text{upstream node} $"
                }
              </Latex>
            </p>
          </LatexDiv>
        </p>
        <h3>Intuition</h3>
        <p>
          <Latex>
            {
              "We want to find the effect of node $x$ on the entire function $L$. Therefore, we are looking for $\\frac{\\partial L}{\\partial x}$, otherwise known as the downstream gradient. $\\frac{\\partial L}{\\partial z}$ is the effect of the upstream node $z$ on the entire function $L$. Additionally, $\\frac{\\partial z}{\\partial x}$ is the effect of $x$ on the local node $z$ also called the local gradient."
            }
          </Latex>
        </p>
        <h2>Gate Intuitions</h2>
        <h3>Addition Node</h3>
        <p>
          The addition nodes act as a gradient distributor, passing along the
          upstream gradient to all downstream gradient branches.
        </p>
        <h3>Multiplication Node</h3>
        <p>
          The multiplication nodes act as a switcher and scaler, taking the
          upstream gradient and scaling it by the value of the other branch.
        </p>
        <h3>ReLU or Max Node</h3>
        <p>
          The max nodes act as a gradient router, passing along the upstream
          gradient to only one of the branches.
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
