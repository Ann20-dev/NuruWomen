import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { useInactivityTimeout } from "./hooks/useInactivityTimeout";

import Index from "./pages/Index";
const AskPage = lazy(() => import("./pages/AskPage"));
const QuestionsPage = lazy(() => import("./pages/QuestionsPage"));
const QuestionDetailPage = lazy(() => import("./pages/QuestionDetailPage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const TopicPage = lazy(() => import("./pages/TopicPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const BlindSpotsPage = lazy(() => import("./pages/BlindSpotsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
import { NIP19Page } from "./pages/NIP19Page";
import NotFound from "./pages/NotFound";

// Helper component to execute the hook inside BrowserRouter context
function InactivityListener() {
  useInactivityTimeout();
  return null;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <InactivityListener />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/question/:id" element={<QuestionDetailPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/library/:slug" element={<ArticlePage />} />
        <Route path="/topics/:slug" element={<TopicPage />} />
        <Route path="/events" element={<EventsPage />} />
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