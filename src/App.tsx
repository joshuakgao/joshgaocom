import { NavBar } from "./components/customComponents/navBar";
import { HomePage } from "./screens";

function App() {
  let Page;
  switch (window.location.pathname) {
    case "/":
      Page = <HomePage />;
  }
  return (
    <>
      <NavBar />
      {Page}
    </>
  );
}

export default App;
