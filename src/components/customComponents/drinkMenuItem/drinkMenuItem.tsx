import { Col } from "../../commonComponents";

export function DrinkMenuItem({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <Col
      style={{
        flex: 1,
        justifyContent: "flex-start",
        border: "none",
        minHeight: 500,
      }}
    >
      <img
        style={{ borderRadius: "var(--borderRadius)" }}
        src={image}
        width="100%"
        height="100%"
        alt={title}
      />
      <h3 style={{ textAlign: "center", fontSize: "calc(22px + 0.2vw)" }}>
        {title}
      </h3>
      <p style={{ textAlign: "center" }}>{description}</p>
    </Col>
  );
}
