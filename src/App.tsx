import { NavBar } from "./components/customComponents/navBar";
import { HomePage, BusinessPage, SoftwarePage, OtherPage } from "./screens";

function App() {
  let Page;
  switch (window.location.pathname) {
    case "/":
      Page = <HomePage />;
      break;
    case "/software":
      Page = <SoftwarePage />;
      break;
    case "/business":
      Page = <BusinessPage />;
      break;
    case "/other":
      Page = <OtherPage />;
  }

  return (
    <>
      <NavBar />
      {Page}
    </>
  );
}

export default App;
