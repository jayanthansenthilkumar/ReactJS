import * as React from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ScrollToTop = () => {
  // Set initial state to NOT visible
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Track scroll position for visual feedback
  const toggleScrollState = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 300);
    }
  }, []);

  const scrollToTop = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use a throttled scroll event to improve performance
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      
      const throttledScrollHandler = () => {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            toggleScrollState();
            timeoutId = null;
          }, 100);
        }
      };
      
      window.addEventListener("scroll", throttledScrollHandler);
      // Initial check
      toggleScrollState();
      
      return () => {
        window.removeEventListener("scroll", throttledScrollHandler);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [toggleScrollState]);

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg transition-all duration-300",
        "hover:transform hover:-translate-y-1", 
        isScrolled ? "bg-secondary opacity-100 scale-100" : "bg-primary/80 opacity-0 scale-75 pointer-events-none",
      )}
      size="icon"
      variant={isScrolled ? "secondary" : "default"}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}

export { ScrollToTop }
