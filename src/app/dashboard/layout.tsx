'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getCardList } from '@/app/helpers/client/cards';
import CardList from '@/components/CardList';
import WelcomeBanner from '@/components/WelcomeBanner';
import { Navigation } from '@/components/Navigation';

const DashboardPage: React.FC<UI.ChildrenProps> = ({ children }) => {
  const params = useParams();
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    params.id as string,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<UI.Card[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getCardList()
      .then(setCards)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleCardClick = (data: UI.Card) => {
    setSelectedCardId(data.id);
    push(`/dashboard/${data.id}`);
  };

  return (
    <div>
      <WelcomeBanner />
      <Navigation />
      <div className="flex min-h-screen justify-evenly">
        <div className="flex-2 w-1/4 max-w-[500px] px-10">
          <CardList
            isLoading={isLoading}
            cards={cards}
            selectedCardId={selectedCardId}
            onClick={handleCardClick}
          />
        </div>
        <div className="flex w-3/4 justify-center">{children}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
