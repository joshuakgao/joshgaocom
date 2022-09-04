import watermelon from "../../../assets/images/watermelon.png";
import { Row } from "../../commonComponents";

export function Logo() {
  require("./styles.css");
  return (
    <Row className="logo">
      <img className="watermelon z-index_6" src={watermelon} alt="Logo" />
      <h4 className="tertiary z-index_6" style={{ marginLeft: 10 }}>
        Gao
      </h4>
    </Row>
  );
}
