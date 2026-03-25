/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Profile } from './pages/Profile';
import { Wishlist } from './pages/Wishlist';
import { Orders } from './pages/Orders';
import { SupportBot } from './components/SupportBot';
import { CartDrawer } from './components/CartDrawer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white dark:bg-stone-950 transition-colors duration-300">
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <SupportBot />
        </div>
      </Router>
    </CartProvider>
  );
}

