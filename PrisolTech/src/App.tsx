import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import ClientsPage from "./pages/ClientsPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import { AIAssistantProvider } from "./components/AIAssistant/AIAssistantContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ThemeProvider } from "./context/theme/ThemeContext";
import Loader from "./components/ui/Loader";
import MouseFollower from "./components/ui/MouseFollower";
import TeamMemberProfile from "./pages/TeamMemberProfile";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <LoadingProvider>
    <Loader />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/team/:memberId" element={<TeamMemberProfile />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </LoadingProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="prisoltech-theme">
      <TooltipProvider>
        <AIAssistantProvider>
          <MouseFollower />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AIAssistantProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
