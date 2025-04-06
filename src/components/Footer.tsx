
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Integrations', 'Pricing', 'Changelog', 'Documentation']
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press', 'Partners']
    },
    {
      title: 'Resources',
      links: ['Community', 'Contact', 'Privacy', 'Terms', 'Legal']
    }
  ];
  
  return (
    <footer className="relative border-t border-border">
      <div className="section-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <a href="/" className="text-2xl font-bold tracking-tight">Elegant</a>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              Embracing simplicity and clarity in design, we create experiences that feel intuitive, beautiful, and human.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(platform => (
                <a 
                  key={platform}
                  href="#" 
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors duration-300 hover:bg-primary/5"
                  aria-label={platform}
                >
                  <span className="sr-only">{platform}</span>
                  {/* Icon placeholder */}
                  <div className="w-5 h-5 rounded-full bg-muted"></div>
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h4 className="font-medium mb-6">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map(link => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} Elegant. All rights reserved.
          </p>
          
          <p className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="mx-1 h-3 w-3 text-red-500" /> by Elegant Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
