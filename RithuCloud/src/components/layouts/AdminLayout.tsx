
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  HardDrive, 
  User, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";

type AdminLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
      path: "/admin/dashboard"
    },
    {
      title: "Users",
      icon: <Users className="w-5 h-5 mr-2" />,
      path: "/admin/users"
    },
    {
      title: "User Limits",
      icon: <HardDrive className="w-5 h-5 mr-2" />,
      path: "/admin/user-limits"
    },
    {
      title: "Profile",
      icon: <User className="w-5 h-5 mr-2" />,
      path: "/admin/profile"
    }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-lg fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-cloud-blue flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
              CloudCanvas
              <span className="text-xs ml-1 font-normal bg-cloud-blue text-white px-1 rounded">
                Admin
              </span>
            </h1>
          </div>

          <div className="flex-grow overflow-y-auto pt-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start pl-6 ${
                      location.pathname === item.path
                        ? "bg-cloud-lightBlue bg-opacity-20 text-cloud-blue"
                        : ""
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    {item.title}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div 
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        </header>
        <main className="p-6 animate-fade-in">
          {children}
        </main>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
