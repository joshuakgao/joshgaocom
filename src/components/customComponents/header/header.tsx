import { Row } from "../../commonComponents";
import { HamburgerMenu } from "../hamburgerMenu";
import { Logo } from "../logo/logo";

export function Header() {
  require("./styles.css");
  return (
    <nav className="fixed">
      <Row className="header">
        <a href="/">
          <Logo />
        </a>
        <HamburgerMenu />
      </Row>
    </nav>
  );
  // return (
  //   <nav className="fixed">
  //     <div className="header row">
  //       <Logo />
  //       <HamburgerMenu />
  //     </div>
  //   </nav>
  // );
}
