'use client';
import React from 'react';

import Card from '@/components/Card';
import Loader from '@/components/Loader';

interface CardListProps extends UI.LoadableProp {
  cards: UI.Card[];
  selectedCardId?: string;
  onClick: (data: UI.Card) => void;
}

const CardList: React.FC<CardListProps> = ({
  cards,
  selectedCardId,
  onClick,
  isLoading,
}) => {
  return (
    <section className="flex max-h-screen flex-col items-center overflow-auto bg-white p-5 shadow-card">
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <h2 className="mb-5 font-medium">
            Select the cards in order to evaluate them
          </h2>
          <ul className="flex min-w-0 flex-col gap-5">
            {cards.length > 0
              ? cards.map((cardData) => (
                  <Card
                    cardItem={cardData}
                    key={cardData.id}
                    isSelected={selectedCardId === cardData.id}
                    onClick={() => {
                      onClick(cardData);
                    }}
                  />
                ))
              : 'No cards data found'}
          </ul>
        </React.Fragment>
      )}
    </section>
  );
};

export default CardList;
