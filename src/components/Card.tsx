'use client';
import Image from 'next/image';

import RatingBadge from '@/components/RatingBadge';

interface CardProps {
  cardItem: UI.Card;
  isSelected: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  cardItem: { title, imgSrc, avgRating },
  isSelected,
  onClick,
}) => {
  return (
    <li
      className={`flex max-h-[176px] max-w-[362px] select-none flex-col rounded-md border-2 ${
        isSelected ? 'border-primary-100' : 'border-primary-200'
      } cursor-pointer overflow-hidden hover:border-primary-100 hover:shadow-card-hover`}
      onClick={onClick}
    >
      <Image
        className="block max-w-[362px] overflow-hidden object-cover"
        src={imgSrc}
        alt={title}
        layout="responsive"
        width={362}
        height={130}
      />
      <div className="flex h-[70px] items-center justify-between bg-primary-300 p-1">
        <span className="pl-2 text-sm font-medium">{title}</span>
        <RatingBadge rating={avgRating} />
      </div>
    </li>
  );
};

export default Card;
