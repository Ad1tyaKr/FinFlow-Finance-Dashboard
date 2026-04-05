import { useCardContext } from '../context/CardContext';

/**
 * Thin hook — delegates to CardContext so every consumer
 * (CardCarousel, CardDetailsPanel, CardsOverviewGrid, MyCards page)
 * all share the same single activeIndex.
 */
export function useCards() {
  return useCardContext();
}
