import { Navbar } from "./components/customComponents/navbar/navbar";
import { HomePage, OtherPage, SoftwarePage, BusinessPage } from "./pages";
import { Tofu60Page } from "./components/projectComponents/other/tofu60/tofu60Page";
import { Route, Routes } from "react-router-dom";
import "./assets/styles.css";
import {
  ChatbotJoshPage,
  RedditLaughsPage,
  VolleyballConnectPage,
  RealEstateDealFinderPage,
} from "./components/projectComponents/software";
import { PortfolioTrackerPage } from "./components/projectComponents/business";
import JoshgaocomPage from "./components/projectComponents/software/joshgaocom/joshgaocomPage";
import SproutsOct22Page from "./components/projectComponents/business/sproutsOct22/sproutsOct22Page";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/software" element={<SoftwarePage />} />
        <Route path="/software/chatbotJosh" element={<ChatbotJoshPage />} />
        <Route path="/software/joshgaocom" element={<JoshgaocomPage />} />
        <Route
          path="/software/volleyballConnect"
          element={<VolleyballConnectPage />}
        />
        <Route path="/software/redditLaughs" element={<RedditLaughsPage />} />
        <Route
          path="/software/realEstateDealFinder"
          element={<RealEstateDealFinderPage />}
        />

        <Route path="/business" element={<BusinessPage />} />
        <Route
          path="/business/portfolioTracker"
          element={<PortfolioTrackerPage />}
        />
        <Route path="/business/sproutsOct22" element={<SproutsOct22Page />} />

        <Route path="/other" element={<OtherPage />} />
        <Route path="/other/tofu60" element={<Tofu60Page />} />
      </Routes>
    </>
  );
}

export default App;
