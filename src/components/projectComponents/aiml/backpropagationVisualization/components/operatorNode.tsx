import Latex from "react-latex-next";
import { Handle, NodeProps, Position } from "reactflow";
import { Col } from "../../../../commonComponents";

export function OperatorNode({ id, data }: NodeProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid var(--accent)",
        borderRadius: "100%",
        background: "white",
        height: 150,
        width: 150,
        padding: 20,
      }}
    >
      <Col style={{ flex: 1 }}>
        <b
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 4,
            marginTop: 0,
            color: "var(--accent)",
          }}
        >
          <Latex>{"$" + data.label + "$"}</Latex>
        </b>
        <p style={{ marginTop: 4 }}>Value: {data.value.toFixed(3)}</p>
        <p style={{ marginTop: 4 }}>Grad: {data.gradient.toFixed(3)}</p>
      </Col>
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
