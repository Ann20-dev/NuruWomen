import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import Index from "./pages/Index";
import AskPage from "./pages/AskPage";
import QuestionsPage from "./pages/QuestionsPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import LibraryPage from "./pages/LibraryPage";
import ArticlePage from "./pages/ArticlePage";
import TopicPage from "./pages/TopicPage";
import BlindSpotsPage from "./pages/BlindSpotsPage";
import AboutPage from "./pages/AboutPage";
import { NIP19Page } from "./pages/NIP19Page";
import NotFound from "./pages/NotFound";

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/question/:id" element={<QuestionDetailPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/:slug" element={<ArticlePage />} />
        <Route path="/topics/:slug" element={<TopicPage />} />
        <Route path="/blind-spots" element={<BlindSpotsPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* NIP-19 route for npub1, note1, naddr1, nevent1, nprofile1 */}
        <Route path="/:nip19" element={<NIP19Page />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
