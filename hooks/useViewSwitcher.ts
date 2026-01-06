'use client';

import { create } from 'zustand';
import { ViewType } from '@/lib/types';

interface ViewStore {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  currentView: 'landing',
  setView: (view) => set({ currentView: view }),
}));