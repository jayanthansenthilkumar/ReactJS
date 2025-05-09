
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Growth from "./pages/Growth";
import Mentors from "./pages/Mentors";
import MentalHealth from "./pages/MentalHealth";
import About from "./pages/About";

// Mentor Panel Routes
import MentorDashboard from "./pages/mentor/Index";
import MentorMentees from "./pages/mentor/Mentees";
import MentorSessions from "./pages/mentor/Sessions";
import MentorResources from "./pages/mentor/Resources";
import MentorProfile from "./pages/mentor/Profile";

// Admin Panel Routes
import AdminDashboard from "./pages/admin/Index";
import AdminUsers from "./pages/admin/Users";
import AdminGrowthPaths from "./pages/admin/GrowthPaths";
import AdminMentalHealth from "./pages/admin/MentalHealth";
import AdminSettings from "./pages/admin/Settings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/growth" element={<Growth />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/about" element={<About />} />
          
          {/* Mentor Panel Routes */}
          <Route path="/mentor" element={<MentorDashboard />} />
          <Route path="/mentor/mentees" element={<MentorMentees />} />
          <Route path="/mentor/sessions" element={<MentorSessions />} />
          <Route path="/mentor/resources" element={<MentorResources />} />
          <Route path="/mentor/profile" element={<MentorProfile />} />
          
          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/growth-paths" element={<AdminGrowthPaths />} />
          <Route path="/admin/mental-health" element={<AdminMentalHealth />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
