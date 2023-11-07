'use client';
import { useCallback, useEffect, useState } from 'react';

import { getCardDetails } from '@/app/helpers/client/cards';
import CardDetailsView from '@/components/CardDetailsView';

const CardDetailsPage = ({ params }: Routing.IdSlug) => {
  const [cardData, setCardData] = useState<UI.Card | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const performGetCardDetails = useCallback(() => {
    setIsLoading(true);
    return getCardDetails(params.id)
      .then(setCardData)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [params.id]);

  useEffect(() => {
    performGetCardDetails().catch(console.error);
  }, [performGetCardDetails]);

  return (
    <CardDetailsView
      cardItem={cardData}
      isLoading={isLoading}
      onUserRate={() => performGetCardDetails()}
    />
  );
};

export default CardDetailsPage;
