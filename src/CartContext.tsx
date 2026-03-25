import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, UserPreferences, Order, Address, UserProfile, Coupon, Product, ProductReview } from './types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  orders: Order[];
  addOrder: (order: Order) => void;
  addresses: Address[];
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  updateAddress: (address: Address) => void;
  userProfile: UserProfile | null;
  updateUserProfile: (profile: UserProfile) => void;
  logout: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  recentlyViewed: string[];
  addToRecentlyViewed: (id: string) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  productReviews: { [productId: string]: ProductReview[] };
  addProductReview: (productId: string, review: ProductReview) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DEFAULT_PREFERENCES: UserPreferences = {
  categoryFilter: 'All',
  priceRange: [0, 500],
  ratingFilter: 0,
  sortBy: 'popularity',
  theme: 'light',
};

const COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountType: 'percentage', value: 10 },
  { code: 'LUMINA20', discountType: 'percentage', value: 20 },
  { code: 'FREESHIP', discountType: 'fixed', value: 15 },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lumina_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('lumina_prefs');
    return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lumina_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('lumina_addresses');
    return saved ? JSON.parse(saved) : [];
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('lumina_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('lumina_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('lumina_recent');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('lumina_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [productReviews, setProductReviews] = useState<{ [productId: string]: ProductReview[] }>(() => {
    const saved = localStorage.getItem('lumina_reviews');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('lumina_reviews', JSON.stringify(productReviews));
  }, [productReviews]);

  const addProductReview = (productId: string, review: ProductReview) => {
    setProductReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), review]
    }));
  };

  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumina_prefs', JSON.stringify(preferences));
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('lumina_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lumina_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('lumina_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lumina_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('lumina_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => 
        i.id === item.id && 
        JSON.stringify(i.selectedVariants) === JSON.stringify(item.selectedVariants)
      );
      if (existing) {
        return prev.map((i) =>
          (i.id === item.id && JSON.stringify(i.selectedVariants) === JSON.stringify(item.selectedVariants))
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const addAddress = (address: Address) => {
    setAddresses((prev) => [...prev, address]);
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const updateAddress = (address: Address) => {
    setAddresses((prev) => prev.map((a) => (a.id === address.id ? address : a)));
  };

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const logout = () => {
    setUserProfile(null);
    setOrders([]);
    setAddresses([]);
    setWishlist([]);
    setRecentlyViewed([]);
    setAppliedCoupon(null);
    localStorage.clear();
    window.location.href = '/';
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter(i => i !== id);
      return [id, ...filtered].slice(0, 10);
    });
  };

  const applyCoupon = (code: string) => {
    const coupon = COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      return true;
    }
    return false;
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        preferences,
        setPreferences,
        orders,
        addOrder,
        addresses,
        addAddress,
        removeAddress,
        updateAddress,
        userProfile,
        updateUserProfile,
        logout,
        wishlist,
        toggleWishlist,
        recentlyViewed,
        addToRecentlyViewed,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        productReviews,
        addProductReview,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
