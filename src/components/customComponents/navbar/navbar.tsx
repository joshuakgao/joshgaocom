import React, { useEffect, useState } from "react";
import { HamburgerMenu } from "../hamburgerMenu";
import { Logo } from "../logo";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    // Update the screen width whenever the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to window resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={styles.navbarContainer} className="navbar">
      <div style={styles.navbarContainer} className="fade-in">
        <Logo setMenuOpen={(changeMenu) => setMenuOpen(changeMenu)} />
        {screenWidth < 800 ? (
          <HamburgerMenu
            menuOpen={menuOpen}
            setMenuOpen={(changeMenu) => setMenuOpen(changeMenu)}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 32,
              pointerEvents: "auto",
            }}
          >
            <Link
              to="/aiml"
              onClick={() => setMenuOpen(false)}
              style={{
                ...styles.link,
                ...{
                  textDecorationLine:
                    location.pathname === "/aiml" ? "underline" : "none",
                },
              }}
            >
              <h1 style={styles.navText} className="secondary">
                AI / ML
              </h1>
            </Link>
            <Link
              to="/appdev"
              onClick={() => setMenuOpen(false)}
              style={{
                ...styles.link,
                ...{
                  textDecorationLine:
                    location.pathname === "/appdev" ? "underline" : "none",
                },
              }}
            >
              <h1 style={styles.navText} className="secondary">
                APP DEV
              </h1>
            </Link>
            <Link
              to="/other"
              onClick={() => setMenuOpen(false)}
              style={{
                ...styles.link,
                ...{
                  textDecorationLine:
                    location.pathname === "/other" ? "underline" : "none",
                },
              }}
            >
              <h1 style={styles.navText} className="secondary">
                OTHER
              </h1>
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              style={{
                ...styles.link,
                ...{
                  textDecorationLine:
                    location.pathname === "/about" ? "underline" : "none",
                },
              }}
            >
              <h1 style={styles.navText} className="secondary">
                ABOUT
              </h1>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  navbarContainer: {
    position: "fixed",
    height: 100,
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    pointerEvents: "none",
    zIndex: 9,
  },
  navText: {
    margin: 32,
    fontSize: 16,
  },
  link: {
    textDecorationLine: "none",
  },
};
