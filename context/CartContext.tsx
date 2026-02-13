"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    quantity: number;
    size: string;
    color: string;
    description: string;
    condition?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    updateSize: (id: string, oldSize: string, newSize: string) => void;
    clearCart: () => void;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);



export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (loading) return;

        // Reset initialization state when user changes to prevent saving old cart to new user
        setIsInitialized(false);

        const key = user && (user._id || user.id) ? `cart_${user._id || user.id}` : "cart";
        const savedCart = localStorage.getItem(key);

        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
                setCartItems([]);
            }
        } else {
            setCartItems([]);
        }

        setIsInitialized(true);
    }, [user, loading]);

    useEffect(() => {
        if (loading || !isInitialized) return;

        const key = user && (user._id || user.id) ? `cart_${user._id || user.id}` : "cart";
        localStorage.setItem(key, JSON.stringify(cartItems));
    }, [cartItems, user, loading, isInitialized]);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existingItem = prev.find((i) => i.id === item.id && i.size === item.size);
            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id && i.size === item.size
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string, size: string) => {
        setCartItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
    };

    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((i) =>
                i.id === id && i.size === size ? { ...i, quantity } : i
            )
        );
    };

    const updateSize = (id: string, oldSize: string, newSize: string) => {
        setCartItems((prev) => {
            // Check if an item with the new size already exists
            const existingItemWithNewSize = prev.find(i => i.id === id && i.size === newSize);

            if (existingItemWithNewSize) {
                // If it exists, find the old item, add its quantity to the new item, and remove old item
                const oldItem = prev.find(i => i.id === id && i.size === oldSize);
                if (!oldItem) return prev;

                return prev
                    .map(i => i.id === id && i.size === newSize
                        ? { ...i, quantity: i.quantity + oldItem.quantity }
                        : i)
                    .filter(i => !(i.id === id && i.size === oldSize));
            }

            // Otherwise just update the size
            return prev.map((i) =>
                i.id === id && i.size === oldSize ? { ...i, size: newSize } : i
            );
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateSize,
                clearCart,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
