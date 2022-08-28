import { Header } from "./components/customComponents/header";
import { HomePage } from "./screens";

function App() {
  let Page;
  switch (window.location.pathname) {
    case "/":
      Page = <HomePage />;
  }
  return (
    <>
      <Header />
      {Page}
    </>
  );
}

export default App;
