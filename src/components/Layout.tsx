import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Users, Map, AlertTriangle, HandHelping, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DonateModal from './DonateModal';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Accueil', path: '/', icon: Heart },
    { name: 'Associations', path: '/associations', icon: Users },
    { name: 'Projets', path: '/projets', icon: HandHelping },
    { name: 'Carte', path: '/carte', icon: Map },
    { name: 'Signaler', path: '/signaler', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-ubuntu-cream/80 backdrop-blur-md border-b border-ubuntu-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-ubuntu-orange rounded-full flex items-center justify-center text-white overflow-hidden shadow-sm">
                <img 
                  src="https://ais-pre-kqi55gyfkk3gluwzozd3ii-53629862155.europe-west2.run.app/logo.png" 
                  alt="TOSUNGA" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-2xl font-bold">T</span>';
                  }}
                />
              </div>
              <span className="text-2xl font-ubuntu-serif font-bold tracking-tight text-ubuntu-ink">
                TOSUNGA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-ubuntu-orange ${
                    location.pathname === item.path ? 'text-ubuntu-orange' : 'text-ubuntu-ink/70'
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={() => setIsDonateModalOpen(true)}
                className="ubuntu-button-primary text-sm py-2"
              >
                Faire un don
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-ubuntu-ink"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-ubuntu-ink/5 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 text-lg font-medium ${
                      location.pathname === item.path ? 'text-ubuntu-orange' : 'text-ubuntu-ink/70'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                ))}
                <button 
                  onClick={() => {
                    setIsDonateModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="ubuntu-button-primary w-full py-3"
                >
                  Faire un don
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-ubuntu-ink text-ubuntu-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-ubuntu-orange rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
                  <img 
                    src="https://ais-pre-kqi55gyfkk3gluwzozd3ii-53629862155.europe-west2.run.app/logo.png" 
                    alt="TOSUNGA" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-2xl font-ubuntu-serif font-bold tracking-tight">
                  TOSUNGA
                </span>
              </div>
              <p className="text-ubuntu-cream/60 max-w-md leading-relaxed">
                TOSUNGA est une plateforme solidaire dédiée à la protection des enfants et au soutien des associations humanitaires en Afrique. Ensemble, redonnons espoir à ceux qui en ont le plus besoin.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-ubuntu-cream/60">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="hover:text-ubuntu-orange transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-ubuntu-cream/60">
                <li>Brazzaville, Congo</li>
                <li>contact@ubuntuhelp.org</li>
                <li>+242 06 000 00 00</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-ubuntu-cream/10 text-center text-ubuntu-cream/40 text-sm">
            © {new Date().getFullYear()} TOSUNGA. Plateforme solidaire pour les enfants.
          </div>
        </div>
      </footer>

      <DonateModal 
        isOpen={isDonateModalOpen} 
        onClose={() => setIsDonateModalOpen(false)} 
      />
    </div>
  );
}
