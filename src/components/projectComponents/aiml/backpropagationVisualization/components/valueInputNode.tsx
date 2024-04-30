import { useContext } from "react";
import Latex from "react-latex-next";
import { Handle, NodeProps, Position } from "reactflow";
import { Col } from "../../../../commonComponents";
import { AppContext } from "../backpropagationVisualizationPage";

export function ValueInputNode({ id, data }: NodeProps) {
  const { onValueUpdate } = useContext(AppContext);

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
          value={isNaN(data.value) ? "" : data.value}
          onChange={(e) => onValueUpdate(data.ref, parseFloat(e.target.value))}
        />
        <p style={{ marginTop: 4 }}>Grad: {data.gradient.toFixed(3)}</p>
      </Col>
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
