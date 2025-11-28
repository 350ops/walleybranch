import React, { useRef, useEffect } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { CardPreview } from './CardPreview';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.7;
const CARD_SPACING = 20;

interface CardData {
  id: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate: string;
  brand: string;
}

interface SnappyCardScrollerProps {
  cards: CardData[];
  addCard?: React.ReactNode;
}

export function SnappyCardScroller({ cards = [], addCard }: SnappyCardScrollerProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Handle empty cards array
  if (!cards || cards.length === 0) {
    return addCard ? (
      <View>
        {addCard}
      </View>
    ) : null;
  }
  
  const data = addCard ? [{ id: 'add', isAddCard: true }, ...cards] : cards;

  // Auto-scroll to middle card on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        const initialIndex = addCard ? 1 : Math.floor(cards.length / 2);
        const offset = initialIndex * (CARD_WIDTH + CARD_SPACING);
        scrollViewRef.current.scrollTo({ x: offset, animated: true });
      }
    }, 100); // Small delay to ensure ScrollView is rendered

    return () => clearTimeout(timer);
  }, [cards.length, addCard]);

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - CARD_WIDTH) / 2,
        }}
      >
        {data.map((item: any, index: number) => (
          <View key={item.id || index} style={{ width: CARD_WIDTH, marginHorizontal: CARD_SPACING / 2 }}>
            {item.isAddCard ? (
              addCard
            ) : (
              <CardPreview
                cardNumber={item.cardNumber}
                //cardHolder={item.cardHolder}
                expiryDate={item.expiryDate}
                brand={item.brand}
                onSetDefault={() => {}}
                onDelete={() => {}}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}