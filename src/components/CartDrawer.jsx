import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import EmptyState from './EmptyState';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white/80 backdrop-blur-xl shadow-2xl z-[70] flex flex-col border-l border-white/50"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-xl text-primary">
                  <ShoppingBag size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Your Cart</h2>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-sm font-bold">
                  {cartItems.length}
                </span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <EmptyState 
                    icon={ShoppingBag}
                    title="Your cart is empty"
                    description="Add some delicious items to get started."
                  />
                </div>
              ) : (
                cartItems.map(item => (
                  <motion.div layout key={item.id} className="flex gap-4 bg-white/50 p-3 rounded-2xl border border-white/60 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-slate-500">${item.price}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded-md transition-colors shadow-sm"><Minus size={14} /></button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded-md transition-colors shadow-sm"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 p-2"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white/50 border-t border-white/60 space-y-4">
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Delivery Fee</span><span>$2.99</span></div>
                  <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t border-slate-200">
                    <span>Total</span><span>${(cartTotal + 2.99).toFixed(2)}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-glow flex items-center justify-center gap-2"
                >
                  Checkout <ArrowRight size={20} />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;