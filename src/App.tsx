import { Route, Routes } from "react-router-dom";
import "./assets/styles.css";
import { Navbar } from "./components/customComponents/navbar/navbar";
import { RealEstateLinearRegressionPage } from "./components/projectComponents/aiml";
import {
  AskGptPage,
  JoshgaocomPage,
} from "./components/projectComponents/appdev";
import {
  PortfolioTrackerPage,
  RealEstateDealFinderPage,
  RedditLaughsPage,
} from "./components/projectComponents/other";
import { AimlPage, AppdevPage, HomePage, OtherPage } from "./pages";
// @ts-ignore
import { CifarKnnImageClassificationPage } from "./components/projectComponents/aiml/cifarKnnImageClassification/cifarKnnImageClassificationPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/aiml" element={<AimlPage />} />
        <Route
          path="/aiml/realEstateLinearRegression"
          element={<RealEstateLinearRegressionPage />}
        />
        <Route
          path="/aiml/cifarKnnImageClassification"
          element={<CifarKnnImageClassificationPage />}
        />

        <Route path="/appdev" element={<AppdevPage />} />
        <Route path="/appdev/askGpt" element={<AskGptPage />} />
        <Route path="/appdev/joshgaocom" element={<JoshgaocomPage />} />

        <Route path="/other" element={<OtherPage />} />
        <Route path="/other/redditLaughs" element={<RedditLaughsPage />} />
        <Route
          path="/other/realEstateDealFinder"
          element={<RealEstateDealFinderPage />}
        />
        <Route
          path="/other/portfolioTracker"
          element={<PortfolioTrackerPage />}
        />
      </Routes>
    </>
  );
}

export default App;
