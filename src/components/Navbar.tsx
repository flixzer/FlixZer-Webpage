import { Home, User, Film, DollarSign, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/about', icon: User, label: 'About' },
  { to: '/portfolio', icon: Film, label: 'Portfolio' },
  { to: '/pricing', icon: DollarSign, label: 'Pricing' },
  { to: '/contact', icon: Mail, label: 'Contact' },
  { to: '/queue', icon: Mail, label: 'Queue' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-sky-600 dark:text-sky-400">
            ก้อง
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === to
                    ? 'text-sky-600 dark:text-sky-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
      >
        <div className="px-4 py-2 space-y-1">
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                location.pathname === to
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50'
                  : 'text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}