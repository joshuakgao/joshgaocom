import { useContext } from "react";
import Latex from "react-latex-next";
import { Handle, NodeProps, Position } from "reactflow";
import { Col } from "../../../../commonComponents";
import { AppContext } from "../backpropagationVisualizationPage";

export function ValueInputNode({ id, data }: NodeProps) {
  const { onValueUpdate } = useContext(AppContext);

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
        <input
          id={id}
          style={{
            width: 75,
            fontSize: 16,
            border: "1px solid var(--tertiary)",
            padding: 4,
            marginTop: 4,
          }}
          value={roundIfNotInt(data.value)}
          onChange={(e) => onValueUpdate(data.ref, e.target.value)}
          type="number"
        />
        <p style={{ marginTop: 4 }}>Grad: {data.gradient}</p>
      </Col>
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
