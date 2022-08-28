export function Column({
  children,
  style,
  d,
}: {
  children?: any;
  style?: any;
  d?: boolean;
}) {
  require("./styles.css");
  return (
    <div className={`column ${d ? "d" : null}`} style={style}>
      {children}
    </div>
  );
}
