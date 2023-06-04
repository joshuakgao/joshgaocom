import { Route, Routes } from "react-router-dom";
import "./assets/styles.css";
import { Navbar } from "./components/customComponents/navbar/navbar";
import { ChatbotJoshPage } from "./components/projectComponents/aiml";
import {
  JoshgaocomPage,
  VolleyballConnectPage,
} from "./components/projectComponents/appdev";
import {
  RealEstateDealFinderPage,
  RedditLaughsPage,
  PortfolioTrackerPage,
} from "./components/projectComponents/other";
import { HomePage, AimlPage, OtherPage, AppdevPage } from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/ai-ml" element={<AimlPage />} />
        <Route path="/ai-ml/chatbotJosh" element={<ChatbotJoshPage />} />

        <Route path="/app-dev" element={<AppdevPage />} />
        <Route path="/app-dev/joshgaocom" element={<JoshgaocomPage />} />
        <Route
          path="/app-dev/volleyballConnect"
          element={<VolleyballConnectPage />}
        />

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
