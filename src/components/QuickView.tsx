import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Star, Heart, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, cn } from '../lib/utils';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: () => void;
}

export const QuickView: React.FC<QuickViewProps> = ({ product, onClose, onAddToCart }) => {
  const { addToCart, wishlist, toggleWishlist, setIsCartOpen, productReviews } = useCart();

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.stock === 0;

  const dynamicRating = () => {
    const initialReviews = product.reviews || [];
    const customReviews = productReviews[product.id] || [];
    const allReviews = [...initialReviews, ...customReviews];
    if (allReviews.length === 0) return product.rating;
    const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat((sum / allReviews.length).toFixed(1));
  };

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart({ ...product, quantity: 1 });
    if (onAddToCart) onAddToCart();
    setIsCartOpen(true);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/80 dark:bg-stone-800/80 backdrop-blur-md rounded-full text-stone-900 dark:text-white hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-stone-100 dark:bg-stone-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-stone-900 dark:bg-white dark:text-stone-900 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full">
                    New Arrival
                  </span>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold mb-2">{product.category}</p>
                  <h2 className="text-3xl sm:text-4xl font-serif italic text-stone-900 dark:text-white leading-tight">
                    {product.name}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 dark:bg-stone-800 rounded-full">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-stone-900 dark:text-white">{dynamicRating()}</span>
                </div>
                <span className="text-sm text-stone-400">
                  {product.reviews?.length || 0} Reviews
                </span>
              </div>

              <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-8 line-clamp-3">
                {product.description}
              </p>

              <div className="mt-auto space-y-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-stone-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-stone-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAdd}
                    disabled={isOutOfStock}
                    className={cn(
                      "flex-1 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95",
                      isOutOfStock
                        ? "bg-stone-100 text-stone-400 cursor-not-allowed dark:bg-stone-800 dark:text-stone-600"
                        : "bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:opacity-90 shadow-xl shadow-stone-900/10"
                    )}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={cn(
                      "p-4 rounded-2xl border transition-all active:scale-95",
                      isWishlisted
                        ? "bg-red-50 border-red-100 text-red-500"
                        : "border-stone-200 dark:border-stone-800 text-stone-400 hover:border-stone-900 dark:hover:border-white hover:text-stone-900 dark:hover:text-white"
                    )}
                  >
                    <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors group"
                >
                  View Full Details
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
