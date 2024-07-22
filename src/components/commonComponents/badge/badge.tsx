import { Row } from "../row";

export function Badge({
  text,
  color = "#999fd1",
}: {
  text: string;
  color?: string;
}) {
  const lightenColor = (hex: string, percent: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
    const toHex = (value: number) => value.toString(16).padStart(2, "0");
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  };

  const textColor = lightenColor(color, -50);
  const borderColor = lightenColor(textColor, 50);
  const backgroundColor = lightenColor(borderColor, 50);

  return (
    <Row
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        borderRadius: 6,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 8,
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <p
        style={{
          fontSize: 12,
          marginTop: 2,
          color: textColor,
        }}
      >
        {text}
      </p>
    </Row>
  );
}
