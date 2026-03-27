import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { QuickView } from '../components/QuickView';
import { Toast } from '../components/Toast';
import { useCart } from '../CartContext';
import { Product } from '../types';

export const Home: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { recentlyViewed } = useCart();
  
  const featuredProducts = useMemo(() => PRODUCTS.filter(p => p.isFeatured).slice(0, 4), []);
  
  const recentlyViewedProducts = useMemo(() => {
    return recentlyViewed
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter((p): p is typeof PRODUCTS[0] => !!p)
      .slice(0, 4);
  }, [recentlyViewed]);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
            alt="Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block text-stone-400">Est. 2026 — Collection No. 01</span>
              <h1 className="text-7xl md:text-[10vw] font-serif italic leading-[0.85] mb-10 tracking-tighter">
                Elevate <br /> 
                <span className="text-stone-400">Your</span> Space
              </h1>
              <p className="text-lg md:text-xl text-stone-300 mb-12 max-w-lg leading-relaxed font-light">
                A curated sanctuary of minimalist essentials, where timeless elegance meets modern functionality.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  to="/shop"
                  className="btn-primary flex items-center gap-3 group"
                >
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Element */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-20 bottom-20 hidden lg:block"
        >
          <div className="w-64 h-80 rounded-3xl overflow-hidden border-8 border-white/10 backdrop-blur-md rotate-6 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover"
              alt="Floating Product"
            />
          </div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className="py-10 bg-stone-900 overflow-hidden whitespace-nowrap border-y border-stone-800">
        <div className="flex animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-10 px-10">
              <span className="text-4xl md:text-6xl font-serif italic text-stone-700 uppercase tracking-tighter">New Arrivals</span>
              <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
              <span className="text-4xl md:text-6xl font-serif italic text-stone-700 uppercase tracking-tighter">Minimalist Design</span>
              <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
              <span className="text-4xl md:text-6xl font-serif italic text-stone-700 uppercase tracking-tighter">Sustainable Living</span>
              <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products - Bento Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xl font-serif italic mb-6 dark:text-white leading-tight">The <span className="text-stone-400">Curated</span> Edit</h2>
            <p className="text-stone-500 dark:text-stone-400 text-lg">Handpicked masterpieces that define the Lumina aesthetic. Each piece tells a story of craftsmanship and intent.</p>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest pb-2 border-b-2 border-stone-900 dark:border-white dark:text-white">
            Explore All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard 
                product={product} 
                onAddToCart={() => setShowToast(true)}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Split Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover"
                alt="Craftsmanship"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-stone-100 dark:bg-stone-900 rounded-full p-8 hidden md:flex flex-col items-center justify-center text-center shadow-xl border border-white/20">
              <span className="text-4xl font-serif italic mb-2">100%</span>
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Sustainable Materials</p>
            </div>
          </div>
          <div className="space-y-10">
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-stone-400">Our Philosophy</span>
            <h2 className="text-5xl md:text-7xl font-serif italic leading-tight dark:text-white">Beauty in <br /> <span className="text-stone-400">Simplicity</span></h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-light">
              We believe that your home should be a reflection of your inner peace. Our design process strips away the unnecessary, leaving only what is essential and beautiful.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Artisans', value: '50+' },
                { label: 'Countries', value: '12' },
                { label: 'Materials', value: 'Organic' },
                { label: 'Shipping', value: 'Global' },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl font-serif italic dark:text-white">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-secondary inline-block">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-serif italic mb-4 dark:text-white">Continue <span className="text-stone-400">Exploring</span></h2>
            <p className="text-stone-500 dark:text-stone-400">Based on your recent interests</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {recentlyViewedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => setShowToast(true)}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter / CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-stone-900 rounded-[60px] p-12 md:p-24 overflow-hidden text-center">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover"
              alt="Newsletter BG"
            />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">Join the <br /> <span className="text-stone-400">Inner Circle</span></h2>
            <p className="text-stone-400 text-lg font-light">Subscribe to receive early access to new collections, exclusive editorial content, and minimalist living inspiration.</p>
            <form className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-8 py-5 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all backdrop-blur-md"
              />
              <button className="btn-primary whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <QuickView 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={() => setShowToast(true)}
      />

      <Toast 
        message="Added to cart successfully!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default Home;
