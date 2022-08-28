import { HamburgerMenu } from "../hamburgerMenu";
import { Logo } from "../logo/logo";

export function Header() {
  require("./styles.css");
  return (
    <div className="fixed">
      <div className="header row">
        <Logo />
        <HamburgerMenu />
      </div>
    </div>
  );
}
