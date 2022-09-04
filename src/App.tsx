import { NavBar } from "./components/customComponents/navBar";
import { HomePage, BusinessPage, SoftwarePage, OtherPage } from "./screens";
import { Tofu60Page } from "./components/projectComponents/Tofu60";
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

        <Route path="/other/tofu60" element={<Tofu60Page />} />
      </Routes>
    </>
  );
}

export default App;
