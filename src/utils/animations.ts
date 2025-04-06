
import { useEffect, useState, useRef, RefObject } from 'react';

export const useIntersectionObserver = (
  elementRef: RefObject<HTMLElement>,
  threshold = 0.1,
  rootMargin = '0px'
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold,
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, rootMargin, threshold]);

  return isIntersecting;
};

export const useParallax = (factor: number = 0.1): [RefObject<HTMLDivElement>, number] => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { top } = ref.current.getBoundingClientRect();
        const scrollYOffset = window.pageYOffset;
        const elementTop = top + scrollYOffset;
        const viewportHeight = window.innerHeight;
        
        if (elementTop <= viewportHeight && elementTop + ref.current.offsetHeight >= 0) {
          const distance = scrollYOffset - elementTop;
          setOffset(distance * factor);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [factor]);

  return [ref, offset];
};

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setProgress(Number((currentScrollY / scrollHeight).toFixed(2)));
      }
    };
    
    window.addEventListener('scroll', updateScroll);
    
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);
  
  return progress;
};
