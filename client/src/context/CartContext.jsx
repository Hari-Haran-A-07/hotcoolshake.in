import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const local = localStorage.getItem('hcs_cart');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [flyingItem, setFlyingItem] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('hcs_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const triggerFlyToCart = (itemPosition = null) => {
    setFlyingItem({
      id: Date.now(),
      startX: itemPosition ? itemPosition.x : window.innerWidth / 2,
      startY: itemPosition ? itemPosition.y : window.innerHeight / 2,
    });
    setTimeout(() => setFlyingItem(null), 1000);
  };

  const addToCart = (product, quantity = 1, options = {}, startPos = null) => {
    triggerFlyToCart(startPos);

    setCartItems((prevItems) => {
      // Check if exact same item with identical options already exists
      const itemKey = `${product._id || product.name}-${options.temperature || product.temperature || 'COOL'}-${options.size || 'Standard'}-${options.bottle || ''}`;
      
      const existingIndex = prevItems.findIndex((item) => item.cartKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          cartKey: itemKey,
          id: product._id || `custom-${Date.now()}`,
          name: product.name || product.customBlendTitle || 'HOT COOL SHAKE Specialty',
          itemType: product.customBlendTitle ? 'CUSTOM_COFFEE' : 'PRODUCT',
          productId: product._id || null,
          customCoffeeId: product.customCoffeeId || null,
          price: product.price || product.calculatedPrice || 8.50,
          quantity,
          image: product.image || (product.bottle && product.bottle.image) || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
          temperature: options.temperature || product.temperature || product.condition || 'COOL',
          customDetails: {
            bottle: options.bottle || (product.bottle && product.bottle.name) || 'Standard Cup',
            flavors: options.flavors || (product.flavors ? product.flavors.map(f => f.name || f) : []),
            condition: options.condition || product.condition || 'COOL',
            milk: options.milk || product.milkBase || 'Oat Milk',
            size: options.size || 'Standard 500ml',
            sweetness: options.sweetness || product.sweetnessLevel || 'Standard',
          },
        };
        return [newItem, ...prevItems];
      }
    });

    // Auto open cart drawer after half a second
    setTimeout(() => {
      setIsCartOpen(true);
    }, 400);
  };

  const removeFromCart = (cartKey) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HOTCOOL10') {
      setDiscountPercent(10);
      setPromoMessage('10% Brand Welcome Discount Applied!');
      return true;
    } else if (clean === 'FIRSTSIP') {
      setDiscountPercent(15);
      setPromoMessage('15% First Alchemy Sip Discount Applied!');
      return true;
    } else {
      setPromoMessage('Invalid promo code. Try "HOTCOOL10" or "FIRSTSIP"');
      return false;
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 40 || cartItems.length === 0 ? 0 : 2.50;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal: Number(subtotal.toFixed(2)),
        discountAmount: Number(discountAmount.toFixed(2)),
        discountPercent,
        deliveryFee,
        total: Number(total.toFixed(2)),
        totalItemsCount,
        promoCode,
        setPromoCode,
        promoMessage,
        applyPromoCode,
        flyingItem,
        triggerFlyToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
