import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HamburgerMenu } from "../hamburgerMenu";
import { Logo } from "../logo";
import "./styles.css";

export function Navbar() {
  const [visible, setVisible] = useState<boolean>(true);
  const [lastScrollY, setLastSrollY] = useState(0);
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

  // hide navbar on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollUp = lastScrollY > currentScrollY; // Scrolling up

      // Update visibility based on scroll direction and minimum scroll threshold
      setVisible(scrollUp || currentScrollY < 50); // Show on scroll up or within 50px from top
      setLastSrollY(currentScrollY); // Update previous scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // Only re-run on lastScrollY change

  return (
    <div style={styles.navbarContainer} className="navbar">
      <div
        style={styles.navbarContainer}
        className={`${visible ? "fade-in" : "fade-out"}`}
      >
        <Logo
          setMenuOpen={(changeMenu) => setMenuOpen(changeMenu)}
          size={screenWidth > 900 ? "full" : "small"}
        />
        <HamburgerMenu
          menuOpen={menuOpen}
          setMenuOpen={(changeMenu) => setMenuOpen(changeMenu)}
          hidden={screenWidth > 1600 || location.pathname == "/"}
        />
        <div
          style={{
            display:
              screenWidth < 1600 && location.pathname !== "/" ? "none" : "flex",
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
        </div>
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
    height: 75,
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
