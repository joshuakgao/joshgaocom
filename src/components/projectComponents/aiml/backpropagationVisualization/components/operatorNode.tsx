import Latex from "react-latex-next";
import { Handle, NodeProps, Position } from "reactflow";
import { Col } from "../../../../commonComponents";

export function OperatorNode({ id, data }: NodeProps) {
  function roundIfNotInt(value: number) {
    // Handle non-numeric input
    if (isNaN(value)) {
      return "";
    }

    // Check if the value is an integer using Number.isInteger() (ES6+)
    if (Number.isInteger(value)) {
      return value; // No need to round integers
    }

    // Round the non-integer to 3 decimal places
    return value.toFixed(2);
  }

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
        <p style={{ marginTop: 4 }}>Value: {roundIfNotInt(data.value)}</p>
        <p style={{ marginTop: 4 }}>Grad: {roundIfNotInt(data.gradient)}</p>
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
