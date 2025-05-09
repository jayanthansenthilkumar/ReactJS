
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Academics from "./pages/Academics";
import Career from "./pages/Career";
import Wellness from "./pages/Wellness";
import Safety from "./pages/Safety";
import Social from "./pages/Social";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Settings and profile
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

// New pages
import Mentors from "./pages/Mentors";
import Programs from "./pages/Programs";
import Students from "./pages/Students";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/career" element={<Career />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/social" element={<Social />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* User settings and profile */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* New pages */}
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/students" element={<Students />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
