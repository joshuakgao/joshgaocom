import watermelon from "../../../assets/images/watermelon.png";
import { Row } from "../../commonComponents";

export function Logo() {
  require("./styles.css");
  return (
    <Row>
      <img className="logo" src={watermelon} alt="Logo" />
      <h4 className="tertiary" style={{ marginLeft: 10 }}>
        Gao
      </h4>
    </Row>
  );
}
