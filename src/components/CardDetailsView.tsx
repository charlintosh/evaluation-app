import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import { Button, Textarea } from '@material-tailwind/react';

import { updateCardItem } from '@/app/helpers/client/cards';
import StarRating from '@/components/StarRating';
import UserComment from '@/components/UserComment';
import LoadingBoundary from '@/components/LoadingBoundary';

interface CardDetailsViewProps extends UI.LoadableProp {
  cardItem?: UI.Card;
  onUserRate: () => void;
}

const CardDetailsView: React.FC<CardDetailsViewProps> = ({
  cardItem,
  isLoading,
  onUserRate,
}) => {
  const [comments, setComments] = useState<string>('');

  const handleOnRate = async (rating: number) => {
    if (cardItem) {
      await updateCardItem({ id: cardItem.id, rating });
      onUserRate();
    }
  };

  const handleSubmitComments = async () => {
    if (cardItem) {
      await updateCardItem({ id: cardItem.id, comments });
      setComments('');
      onUserRate();
    }
  };

  return (
    <LoadingBoundary
      isLoading={isLoading}
      className="flex h-3/4 w-[70%] flex-col overflow-auto bg-white p-10 shadow-card"
    >
      {cardItem ? (
        <Fragment>
          <Image
            className="block w-full"
            src={cardItem?.imgSrc}
            layout="responsive"
            width={717}
            height={477}
            alt={cardItem?.title}
          />
          <div className="my-5 flex w-full flex-wrap items-center md:my-10">
            <span className="flex flex-1 justify-center text-2xl font-medium md:text-4xl lg:justify-start">
              {cardItem?.title}
            </span>
            <div className="flex flex-1 justify-center md:justify-end">
              <StarRating
                initialRating={cardItem?.userRate?.rating ?? 0}
                onRate={handleOnRate}
                key={cardItem?.id}
              />
            </div>
          </div>
          <span className="mt-10 text-xl lg:text-2xl">
            {cardItem.description}
          </span>
          <div className="my-10 flex w-full select-none flex-col">
            <span className="mb-5 text-2xl font-semibold lg:text-3xl">
              Reviews & comments
            </span>
            {cardItem.ratings.length > 0 ? (
              cardItem.ratings.map((rateData) => (
                <UserComment
                  key={rateData.user.username}
                  ratingItem={rateData}
                />
              ))
            ) : (
              <i>This item does not have any review yet. Be the first one!</i>
            )}
          </div>
          <div className="my-10 w-full">
            <Textarea
              label="Comments"
              className="text-2xl"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
            />
          </div>
          <Button
            fullWidth
            disabled={comments.length === 0}
            className="font-weight-600 bg-primary-100 text-2xl font-semibold capitalize"
            onClick={handleSubmitComments}
          >
            {!cardItem.userRate ||
            (cardItem.userRate && !cardItem.userRate.comments)
              ? 'Submit'
              : 'Update comment'}
          </Button>
        </Fragment>
      ) : null}
    </LoadingBoundary>
  );
};

export default CardDetailsView;
