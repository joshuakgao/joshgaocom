import { Route, Routes } from "react-router-dom";
import "./assets/styles.css";
import { Navbar } from "./components/customComponents/navbar/navbar";
import {
  AskGptPage,
  JoshgaocomPage,
} from "./components/projectComponents/appdev";
import {
  RealEstateDealFinderPage,
  RedditLaughsPage,
  PortfolioTrackerPage,
} from "./components/projectComponents/other";
import { HomePage, AimlPage, OtherPage, AppdevPage, AboutPage } from "./pages";
import { LinearRegressionPage } from "./components/projectComponents/aiml";
import { MathJaxContext } from "better-react-mathjax";

function App() {
  return (
    <MathJaxContext>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/ai-ml" element={<AimlPage />} />
        <Route
          path="/ai-ml/standford-cs229-linearRegression"
          element={<LinearRegressionPage />}
        />

        <Route path="/app-dev" element={<AppdevPage />} />
        <Route path="/app-dev/askGpt" element={<AskGptPage />} />
        <Route path="/app-dev/joshgaocom" element={<JoshgaocomPage />} />

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

        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </MathJaxContext>
  );
}

export default App;
