import { Badge, Col, Row, Spacer } from "../../commonComponents";

export function DrinkMenuItem({
  image,
  title,
  description,
  isPremium,
}: {
  image: string;
  title: string;
  description: string;
  isPremium: boolean;
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
      <Spacer />
      <Row
        style={{
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontSize: "calc(22px + 0.2vw)",
            marginTop: 8,
          }}
        >
          {title}
        </h3>
        <Spacer horizontal size={4} />
        {/* {isPremium ? <Badge text={"Premium"} /> : null} */}
      </Row>
      <p style={{ textAlign: "center" }}>{description}</p>
    </Col>
  );
}
