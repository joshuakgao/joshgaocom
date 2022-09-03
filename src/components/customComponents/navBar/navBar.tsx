import { Row } from "../../commonComponents";
import { HamburgerMenu } from "../hamburgerMenu";
import { Logo } from "../logo/logo";
import { Link } from "react-router-dom";

export function NavBar() {
  require("./styles.css");
  let Nav = Row;
  return (
    <div className="fixed-position">
      <Nav className="navbar">
        <Link to="/">
          <Logo />
        </Link>
        <HamburgerMenu />
      </Nav>
    </div>
  );
}
