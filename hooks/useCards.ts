import { useSupabaseData, type Card, type NewCardInput } from '@/contexts/DataContext';

type UseCardsResult = {
  cards: Card[];
  isLoading: boolean;
  refresh: () => Promise<void>;
  addCard: (input: NewCardInput) => Promise<Card>;
  primaryCard: Card | null;
};

export const useCards = (): UseCardsResult => {
  const { cards, loading, refreshCards, createCard } = useSupabaseData();

  const primaryCard =
    cards.find((card) => card.is_default) ??
    [...cards].sort((a, b) => (a.created_at < b.created_at ? 1 : -1))[0] ??
    null;

  return {
    cards,
    isLoading: loading.cards,
    refresh: refreshCards,
    addCard: createCard,
    primaryCard,
  };
};

export default useCards;
