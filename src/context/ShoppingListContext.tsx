'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SavedProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  businessName: string;
  businessPhone: string;
  businessTill?: string;
  slug: string;
  category: string;
  addedAt: string;
}

interface ShoppingListContextType {
  savedItems: SavedProduct[];
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleSaveItem: (product: {
    id: string;
    title: string;
    price: number;
    image: string;
    businessName: string;
    businessPhone: string;
    businessTill?: string;
    slug: string;
    category: string;
  }) => void;
  isItemSaved: (id: string) => boolean;
  removeItem: (id: string) => void;
  clearShoppingList: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export function ShoppingListProvider({ children }: { children: React.ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedProduct[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('homeduka_shopping_list');
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('homeduka_shopping_list', JSON.stringify(savedItems));
    } catch {
      // Ignore
    }
  }, [savedItems, isInitialized]);

  const toggleSaveItem = (product: {
    id: string;
    title: string;
    price: number;
    image: string;
    businessName: string;
    businessPhone: string;
    businessTill?: string;
    slug: string;
    category: string;
  }) => {
    setSavedItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        const newItem: SavedProduct = {
          ...product,
          addedAt: new Date().toISOString()
        };
        // Auto open drawer so user sees confirmation
        setIsDrawerOpen(true);
        return [newItem, ...prev];
      }
    });
  };

  const isItemSaved = (id: string) => {
    return savedItems.some((item) => item.id === id);
  };

  const removeItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearShoppingList = () => {
    setSavedItems([]);
  };

  return (
    <ShoppingListContext.Provider
      value={{
        savedItems,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleSaveItem,
        isItemSaved,
        removeItem,
        clearShoppingList
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
}
