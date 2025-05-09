import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@/context/theme/ThemeContext";

const NotFound = () => {
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="text-center">
        <h1
          className={`text-4xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          404
        </h1>
        <p
          className={`text-xl mb-4 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Oops! Page not found
        </p>
        <a
          href="/"
          className={`${
            isDark
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-500 hover:text-blue-700"
          } underline`}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
