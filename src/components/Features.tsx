import { useRef } from 'react';
import { useIntersectionObserver } from '@/utils/animations';
import { LucideIcon, Circle, Layers, LineChart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Circle,
    title: "Simple and Effective",
    description: "Our application focuses on the essential features you need, without unnecessary complexity. Get more done with an intuitive interface."
  },
  {
    icon: Layers,
    title: "Quality Design",
    description: "We pay attention to the details that matter, from layout to interactions, creating a seamless experience that works for you."
  },
  {
    icon: LineChart,
    title: "Practical Solutions",
    description: "Our design prioritizes functionality first. Each feature serves a clear purpose to help you manage your tasks efficiently."
  },
  {
    icon: Zap,
    title: "Modern Interface",
    description: "Enjoy a clean, modern interface that makes task management straightforward and accessible for all users."
  }
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useIntersectionObserver(sectionRef, 0.1);
  const isHeadingVisible = useIntersectionObserver(headingRef, 0.1);

  return (
    <section 
      id="features"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="section-container">
        <div 
          ref={headingRef} 
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 md:mb-24 opacity-0",
            isHeadingVisible ? "animate-fade-in-up" : ""
          )}
        >
          <span className="subtle-text inline-block px-4 py-1.5 rounded-full bg-primary/5 mb-4">Key Features</span>
          <h2 className="heading-lg mb-6">Task Manager Features</h2>
          <p className="text-lg text-muted-foreground">
            Our application provides the tools you need to organize your tasks and improve productivity with a clean, intuitive interface.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const featureRef = useRef<HTMLDivElement>(null);
            const isFeatureVisible = useIntersectionObserver(featureRef, 0.1);
            
            return (
              <div 
                key={index}
                ref={featureRef}
                className={cn(
                  "glass-card p-8 lg:p-10 opacity-0",
                  isFeatureVisible ? "animate-fade-in-up" : ""
                )}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="heading-md mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 -left-24 w-48 h-48 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-24 right-12 w-64 h-64 bg-purple-50 rounded-full filter blur-3xl opacity-40"></div>
    </section>
  );
};

export default Features;
