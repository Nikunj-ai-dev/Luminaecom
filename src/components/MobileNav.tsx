import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User, Search } from 'lucide-react';
import { useCart } from '../CartContext';
import { cn } from '../lib/utils';

export const MobileNav: React.FC = () => {
  const { totalItems, wishlist, userProfile } = useCart();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Shop', path: '/shop' },
    { icon: ShoppingBag, label: 'Cart', path: '/cart', isCart: true },
    { icon: Heart, label: 'Wishlist', path: '/wishlist', count: wishlist.length },
    { icon: User, label: 'Profile', path: userProfile ? '/profile' : '/auth' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 pointer-events-none">
      <div className="max-w-md mx-auto glass dark:bg-stone-900/90 rounded-3xl shadow-2xl shadow-stone-900/20 dark:shadow-black/50 pointer-events-auto flex items-center justify-around p-2 border border-white/20 dark:border-stone-800/50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900 scale-110" 
                  : "text-stone-400 hover:text-stone-900 dark:hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              
              {item.isCart && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-stone-900">
                  {totalItems}
                </span>
              )}

              {item.count !== undefined && item.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-stone-900">
                  {item.count}
                </span>
              )}

              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 bg-current rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
