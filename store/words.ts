import { create } from 'zustand';
import { Word } from '../types/word';

type WordStore = {
    words: Word[];
    addWord: (word: Word) => void;
    setWords: (list: Word[]) => void;
}

export const useWordStore = create<WordStore>((set) => ({
    words: [],
    addWord: (word) => set((state) => ({ words: [...state.words, word] })),
    setWords: (list) => set({ words: list }),
}));