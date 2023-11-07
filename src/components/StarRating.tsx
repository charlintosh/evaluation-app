'use client';
import { useState } from 'react';

import Star from './Star';

interface StarRatingProps {
  of?: number;
  initialRating: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  of = 5,
  initialRating,
  onRate,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const dispatchRatingProcess = (rating: number) => {
    setRating(rating);
    onRate(rating);
  };

  return (
    <div className="flex">
      {Array.from({ length: of }, (_, index) => {
        const currentStar = index + 1;
        return (
          <Star
            key={`${currentStar}-key`}
            isActive={currentStar <= rating || currentStar <= hoveredRating}
            onMouseEnter={() => setHoveredRating(currentStar)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => dispatchRatingProcess(currentStar)}
            label={currentStar.toString()}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
