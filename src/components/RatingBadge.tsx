import Image from 'next/image';

interface RatingBadgeProps {
  rating: number;
}

const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => (
  <div className="flex h-[24px] w-[50px] items-center justify-evenly rounded-xl bg-primary-400 text-sm">
    <span className="text-sm text-primary-100">{rating}</span>
    <Image src="/assets/images/star.svg" alt="Star" width={14} height={14} />
  </div>
);

export default RatingBadge;
