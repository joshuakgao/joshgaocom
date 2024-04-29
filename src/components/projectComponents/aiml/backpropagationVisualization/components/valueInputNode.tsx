import { ChangeEventHandler } from "react";
import Latex from "react-latex-next";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";

export function ValueInputNode({ id, data }: NodeProps) {
  const { setNodes } = useReactFlow();

  const updateData: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = parseInt(e.target.value);

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== id) return node;
        return {
          ...node,
          data: { ...node.data, inputValue: inputValue },
        };
      })
    );
  };

  return (
    <div
      style={{
        border: "1px solid var(--tertiary)",
        borderRadius: "100%",
        background: "white",
        height: 100,
        width: 100,
        padding: 20,
      }}
    >
      <div>
        <b
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 4,
            marginTop: 0,
          }}
        >
          <Latex>{"$" + data.label + "$"}</Latex>
        </b>
        <input
          style={{
            width: 75,
            fontSize: 16,
            border: "1px solid lightgray",
            padding: 4,
          }}
          value={data.inputValue}
          onChange={updateData}
        />
        <p style={{ marginTop: 4 }}>Grad: {data.grad}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
