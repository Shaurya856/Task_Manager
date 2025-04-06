
import { useRef } from 'react';
import { useIntersectionObserver } from '@/utils/animations';
import { cn } from '@/lib/utils';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  const isHeroVisible = useIntersectionObserver(heroRef, 0.1);
  const isTitleVisible = useIntersectionObserver(titleRef, 0.1);
  const isSubtitleVisible = useIntersectionObserver(subtitleRef, 0.1);
  const isButtonVisible = useIntersectionObserver(buttonRef, 0.1);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-70"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-purple-100 blur-3xl opacity-30 animate-float animation-delay-2000"></div>
      </div>
      
      <div className="container section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <span className="subtle-text inline-block px-4 py-1.5 rounded-full bg-primary/5 mb-6 animate-fade-in">
              Minimalist Design Philosophy
            </span>
          </div>
          
          <h1 
            ref={titleRef}
            className={cn(
              "heading-xl mb-6 opacity-0",
              isTitleVisible ? "animate-fade-in-up" : ""
            )}
            style={{ animationDelay: "0.1s" }}
          >
            Elegance through <br/> 
            <span className="text-primary">Simplicity</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className={cn(
              "text-xl text-muted-foreground mb-10 max-w-xl mx-auto opacity-0",
              isSubtitleVisible ? "animate-fade-in-up" : ""
            )}
            style={{ animationDelay: "0.3s" }}
          >
            A design philosophy that embraces clean aesthetics, intuitive interfaces, and purposeful functionality to create exceptional user experiences.
          </p>
          
          <div 
            ref={buttonRef}
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center opacity-0",
              isButtonVisible ? "animate-fade-in-up" : ""
            )}
            style={{ animationDelay: "0.5s" }}
          >
            <button className="glass-panel px-8 py-4 rounded-full font-medium bg-primary text-primary-foreground shadow-md button-hover-effect">
              Explore Now
            </button>
            <button className="px-8 py-4 rounded-full font-medium border border-primary/20 button-hover-effect">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse">
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-muted-foreground rounded-full mt-2 animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
