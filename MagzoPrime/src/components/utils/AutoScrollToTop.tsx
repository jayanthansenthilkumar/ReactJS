import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * This component automatically scrolls the window to the top
 * whenever the route changes in React Router.
 */
export const AutoScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" // Using instant instead of smooth for navigation
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};
