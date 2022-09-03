import { NavBar } from "./components/customComponents/navBar";
import { HomePage, BusinessPage, SoftwarePage, OtherPage } from "./screens";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/software" element={<SoftwarePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/other" element={<OtherPage />} />
      </Routes>
    </>
  );
}

export default App;
