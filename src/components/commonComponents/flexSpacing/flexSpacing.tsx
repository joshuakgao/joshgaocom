export function FlexSpacing({
  flexGrow = 1,
  d,
}: {
  flexGrow?: number;
  d?: boolean;
}) {
  require("./styles.css");
  return (
    <div className={`flex-spacing ${d ? "d" : null}`} style={{ flexGrow }} />
  );
}
