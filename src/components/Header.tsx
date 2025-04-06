
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScrollProgress } from '@/utils/animations';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-400",
      isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent",
      isMenuOpen ? "bg-white" : ""
    )}>
      <div className="progress-bar h-0.5 bg-primary fixed top-0 left-0 z-50" style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.1s ease-out' }}></div>
      
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="inline-flex items-center">
          <span className="text-xl font-bold tracking-tight transition-opacity duration-300">Elegant</span>
        </Link>
        
        <nav className="hidden md:flex space-x-10">
          {['Features', 'Products', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              <span className="relative overflow-hidden">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
          ))}
        </nav>
        
        <button className="hidden md:flex button-hover-effect glass-panel px-6 py-2 rounded-full font-medium">
          Get Started
        </button>
        
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-primary"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 pt-20 px-6 flex flex-col md:hidden transition-transform duration-400 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col space-y-8 mt-8">
          {['Features', 'Products', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-2xl font-medium"
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <button 
          className="mt-auto mb-10 glass-panel w-full py-4 rounded-full font-medium"
          onClick={closeMenu}
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
