import React, { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
}

const MouseFollower: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [lastPos, setLastPos] = useState<Position>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const followerRef = useRef<HTMLDivElement>(null);
  const bubbleIdRef = useRef(0);
  const mouseMoveTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Size of the follower (control this value to adjust size)
  const followerSize = 80;
  
  // Maximum number of bubbles to show at once
  const maxBubbles = 20; // Reduced from 50 to 20
  
  // Maximum bubbles generated per movement
  const maxBubblesPerMovement = 1; // Reduced from 3 to 1
  
  useEffect(() => {
    // Throttling function to limit the number of executions
    const throttle = (callback: Function, delay: number) => {
      let previousCall = 0;
      return (...args: any[]) => {
        const now = Date.now();
        if (now - previousCall >= delay) {
          previousCall = now;
          callback(...args);
        }
      };
    };
    
    const updatePosition = throttle((e: MouseEvent) => {
      // Add a small delay for a trailing effect
      requestAnimationFrame(() => {
        if (followerRef.current) {
          // Show the follower when mouse moves
          setIsMoving(true);
          
          // Clear any existing timeout
          if (mouseMoveTimerRef.current) {
            clearTimeout(mouseMoveTimerRef.current);
          }
          
          // Set a timeout to hide the follower immediately after mouse stops
          mouseMoveTimerRef.current = setTimeout(() => {
            setIsMoving(false);
          }, 100);
          
          // Calculate offset to center the follower on cursor (half of follower size)
          const offset = followerSize / 2;
          followerRef.current.style.transform = `translate(${e.clientX - offset}px, ${e.clientY - offset}px)`;
          
          // Calculate mouse movement speed/distance
          const dx = e.clientX - lastPos.x;
          const dy = e.clientY - lastPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only create bubbles if mouse has moved significantly
          if (distance > 8) { // Increased threshold from 5 to 8
            // Create fewer bubbles based on movement speed
            const bubbleCount = Math.min(Math.floor(distance / 15), maxBubblesPerMovement); // Adjusted threshold
            const newBubbles: Bubble[] = [];
            
            for (let i = 0; i < bubbleCount; i++) {
              // Create bubble with random properties
              newBubbles.push({
                id: bubbleIdRef.current++,
                x: e.clientX + (Math.random() * 20 - 10),
                y: e.clientY + (Math.random() * 20 - 10),
                size: Math.random() * 8 + 2, // Size between 2-10px
                speed: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                angle: Math.random() * Math.PI * 2 // Random direction
              });
            }
            
            // Add new bubbles and remove old ones if there are too many
            setBubbles(prev => [...newBubbles, ...prev].slice(0, maxBubbles));
            
            // Update last position
            setLastPos({ x: e.clientX, y: e.clientY });
          }
        }
      });
    }, 10); // Throttle to every 10ms

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsMoving(false);
      if (mouseMoveTimerRef.current) {
        clearTimeout(mouseMoveTimerRef.current);
      }
    };

    // Animation loop for bubbles
    const animateBubbles = () => {
      setBubbles(prevBubbles => 
        prevBubbles
          .map(bubble => ({
            ...bubble,
            // Move bubble in its angle direction
            x: bubble.x + Math.cos(bubble.angle) * bubble.speed,
            y: bubble.y + Math.sin(bubble.angle) * bubble.speed - 0.5, // Slight upward drift
            opacity: bubble.opacity - 0.01, // Fade out gradually
            size: bubble.size - 0.05 // Shrink gradually
          }))
          .filter(bubble => bubble.opacity > 0 && bubble.size > 0) // Remove faded/tiny bubbles
      );
      
      animationRef.current = requestAnimationFrame(animateBubbles);
    };
    
    const animationRef = { current: 0 };
    animationRef.current = requestAnimationFrame(animateBubbles);

    window.addEventListener('mousemove', updatePosition);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Set initial visibility after component mounts
    setIsVisible(true);
    setLastPos({ x: 0, y: 0 });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
      if (mouseMoveTimerRef.current) {
        clearTimeout(mouseMoveTimerRef.current);
      }
    };
  }, []);

  // Calculate proportional sizes for inner elements
  const middleLayerSize = Math.round(followerSize * 0.75); // 75% of follower size
  const innerGlowSize = Math.round(followerSize * 0.5);    // 50% of follower size
  const coreGlowSize = Math.round(followerSize * 0.25);    // 25% of follower size
  
  // Calculate positions to ensure elements are centered
  const middleLayerPos = Math.round((followerSize - middleLayerSize) / 2);
  const innerGlowPos = Math.round((followerSize - innerGlowSize) / 2);
  const coreGlowPos = Math.round((followerSize - coreGlowSize) / 2);

  return (
    <>
      <div
        ref={followerRef}
        className={`pointer-events-none fixed z-[1] transition-opacity duration-300 ${isVisible && isMoving ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: `${followerSize}px`,
          height: `${followerSize}px`,
          willChange: 'transform',
        }}
      >
        {/* Main nebula glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-prisol-blue/30 to-prisol-light-blue/20 blur-xl animate-nebula-glow" />
        
        {/* Middle layer */}
        <div 
          className="absolute rounded-full bg-gradient-to-br from-prisol-blue/30 via-purple-500/20 to-prisol-light-blue/30 blur-lg animate-nebula-glow" 
          style={{ 
            width: `${middleLayerSize}px`, 
            height: `${middleLayerSize}px`,
            left: `${middleLayerPos}px`, 
            top: `${middleLayerPos}px`,
            animationDelay: '0.5s' 
          }} 
        />
        
        {/* Inner glow */}
        <div 
          className="absolute rounded-full bg-gradient-to-r from-blue-300/30 via-prisol-blue/40 to-prisol-light-blue/30 blur-md animate-nebula-glow" 
          style={{ 
            width: `${innerGlowSize}px`, 
            height: `${innerGlowSize}px`,
            left: `${innerGlowPos}px`, 
            top: `${innerGlowPos}px`,
            animationDelay: '1s' 
          }} 
        />
        
        {/* Core glow */}
        <div 
          className="absolute rounded-full bg-white/40 blur-sm animate-nebula-twinkle" 
          style={{ 
            width: `${coreGlowSize}px`, 
            height: `${coreGlowSize}px`,
            left: `${coreGlowPos}px`, 
            top: `${coreGlowPos}px`,
          }} 
        />
        
        {/* Stars effect */}
        <div className="absolute w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full animate-nebula-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Bubbles container */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-white"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              opacity: bubble.opacity,
              boxShadow: `0 0 ${bubble.size * 2}px ${bubble.size/2}px rgba(96, 165, 250, ${bubble.opacity})`,
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.5s',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default MouseFollower;
