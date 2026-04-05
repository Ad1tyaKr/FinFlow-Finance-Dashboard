import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CARD_DATA } from '../data/cardData';

const CardContext = createContext(null);

/**
 * Provides shared card selection state to the entire component tree.
 * Wrap MyCards page (and Dashboard if needed) with this provider so
 * CardCarousel, CardDetailsPanel, CardsOverviewGrid, and the big card
 * display all read from — and write to — the same activeIndex.
 */
export function CardProvider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCard = useCallback((i) => {
    setActiveIndex(((i % CARD_DATA.length) + CARD_DATA.length) % CARD_DATA.length);
  }, []);

  const prevCard = useCallback(() => {
    setActiveIndex(i => (i - 1 + CARD_DATA.length) % CARD_DATA.length);
  }, []);

  const nextCard = useCallback(() => {
    setActiveIndex(i => (i + 1) % CARD_DATA.length);
  }, []);

  // Global keyboard navigation — attach once at the provider level
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prevCard();
      if (e.key === 'ArrowRight') nextCard();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prevCard, nextCard]);

  const activeCard = CARD_DATA[activeIndex];

  return (
    <CardContext.Provider value={{
      cards: CARD_DATA,
      activeIndex,
      activeCard,
      selectCard,
      prevCard,
      nextCard,
    }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error('useCardContext must be used inside <CardProvider>');
  return ctx;
}
