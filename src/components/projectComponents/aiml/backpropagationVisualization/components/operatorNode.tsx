import Latex from "react-latex-next";
import { Handle, NodeProps, Position } from "reactflow";

export function OperatorNode({ id, data }: NodeProps) {
  return (
    <div
      style={{
        border: "1px solid var(--tertiary)",
        borderRadius: "100%",
        background: "white",
        height: 100,
        width: 100,
        padding: 24,
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
        <p style={{ marginTop: 4 }}>Value: {data.value}</p>
        <p style={{ marginTop: 4 }}>Grad: {data.grad}</p>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, pointerEvents: "none" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
