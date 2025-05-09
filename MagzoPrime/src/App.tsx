import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Bestsellers from "./pages/Bestsellers";
import NewReleases from "./pages/NewReleases";
import NotFound from "./pages/NotFound";
import BookDetail from "./pages/BookDetail";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import CategoryDetail from "./pages/CategoryDetail";
import GenreDetail from "./pages/GenreDetail";
import { ScrollToTop } from "./components/ui/scroll-to-top";
import { MagzoAIAssistant } from "./components/MagzoAIAssistant";
import { AutoScrollToTop } from "./components/utils/AutoScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

// SuperAdmin pages
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";
import BookApprovals from "./pages/admin/BookApprovals";
import AdminManagement from "./pages/admin/AdminManagement";

// Additional pages
import SpecialOffers from "./pages/SpecialOffers";
import Help from "./pages/Help";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Customer-facing routes */}
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryDetail />} />
          <Route path="/genre/:slug" element={<GenreDetail />} />
          <Route path="/bestsellers" element={<Bestsellers />} />
          <Route path="/new-releases" element={<NewReleases />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />

          {/* Info pages */}
          <Route path="/special-offers" element={<SpecialOffers />} />
          <Route path="/help" element={<Help />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/books" element={
            <ProtectedRoute requiredRole="admin">
              <AdminBooks />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute requiredRole="admin">
              <AdminOrders />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRole="admin">
              <AdminUsers />
            </ProtectedRoute>
          } />

          {/* SuperAdmin routes */}
          <Route path="/superadmin" element={
            <ProtectedRoute requiredRole="superAdmin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/superadmin/approvals" element={
            <ProtectedRoute requiredRole="superAdmin">
              <BookApprovals />
            </ProtectedRoute>
          } />
          <Route path="/superadmin/admin-management" element={
            <ProtectedRoute requiredRole="superAdmin">
              <AdminManagement />
            </ProtectedRoute>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global components */}
        <AutoScrollToTop />
        <ScrollToTop />
        <MagzoAIAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
