import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart, Moon, Sun } from 'lucide-react';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const { totalItems, userProfile, wishlist, preferences, setPreferences, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Orders', path: '/orders' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full glass dark:bg-stone-900/80 border-b border-stone-200 dark:border-stone-800 backdrop-blur-md transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-stone-900 dark:bg-white rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500">
              <span className="text-xl font-serif italic font-bold text-white dark:text-stone-900">L</span>
            </div>
            <span className="text-2xl font-serif italic font-bold tracking-tight text-stone-900 dark:text-white">Lumina</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-stone-900 dark:hover:text-white relative group",
                  location.pathname === link.path ? "text-stone-900 dark:text-white" : "text-stone-400 dark:text-stone-500"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 w-0 h-0.5 bg-stone-900 dark:bg-white transition-all duration-300 group-hover:w-full",
                  location.pathname === link.path && "w-full"
                )} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={toggleTheme}
              className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all hover:scale-110"
              title="Toggle Theme"
            >
              {preferences.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all hover:scale-110">
                <Search className="w-5 h-5" />
              </button>
              
              <Link to="/wishlist" className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all hover:scale-110 relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold w-3 h-3 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </div>

            <Link 
              to={userProfile ? "/profile" : "/auth"} 
              className="flex items-center gap-3 p-1 pl-3 pr-1 bg-stone-100 dark:bg-stone-800 rounded-full text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all group border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
            >
              <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest">
                {userProfile ? userProfile.name.split(' ')[0] : 'Sign In'}
              </span>
              <div className="w-8 h-8 rounded-full bg-white dark:bg-stone-900 flex items-center justify-center overflow-hidden border border-stone-200 dark:border-stone-700 group-hover:border-stone-900 dark:group-hover:border-white transition-colors">
                {userProfile?.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-2xl hover:scale-105 transition-all relative shadow-lg shadow-stone-900/20 dark:shadow-black/50"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-stone-900">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
