'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ComparisonItem } from '../types/schema';

interface ComparisonContextType {
  items: ComparisonItem[];
  addToCompare: (item: ComparisonItem) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  isModalOpen: boolean;
  openCompareModal: () => void;
  closeCompareModal: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const STORAGE_KEY = 'homeduka_comparison_v1';

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ComparisonItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to read comparison items from localStorage', e);
    }
  }, []);

  const saveItems = (newItems: ComparisonItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.error('Failed to save comparison items to localStorage', e);
    }
  };

  const addToCompare = (item: ComparisonItem) => {
    if (items.some((i) => i.id === item.id)) {
      // Toggle off if already present
      saveItems(items.filter((i) => i.id !== item.id));
      return;
    }
    if (items.length >= 4) {
      // Cap at 4 items
      alert('You can compare up to 4 items at once. Please remove an item first.');
      return;
    }
    saveItems([...items, item]);
  };

  const removeFromCompare = (id: string) => {
    saveItems(items.filter((i) => i.id !== id));
  };

  const clearCompare = () => {
    saveItems([]);
  };

  const isInCompare = (id: string) => {
    return items.some((i) => i.id === id);
  };

  const openCompareModal = () => setIsModalOpen(true);
  const closeCompareModal = () => setIsModalOpen(false);

  return (
    <ComparisonContext.Provider
      value={{
        items,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isModalOpen,
        openCompareModal,
        closeCompareModal,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
