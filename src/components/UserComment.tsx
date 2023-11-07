import RatingBadge from './RatingBadge';

interface UserCommentProps {
  ratingItem: Rating;
}

const UserComment: React.FC<UserCommentProps> = ({ ratingItem }) => (
  <div
    key={ratingItem.user.username}
    className="flex flex-col justify-start gap-1"
  >
    <div className="flex items-center justify-start gap-2 text-lg font-medium">
      <span>{ratingItem.user.username}</span>
      {ratingItem.rating ? <RatingBadge rating={ratingItem.rating} /> : null}
    </div>
    <p className="text-md">
      {ratingItem.comments ? (
        ratingItem.comments
      ) : (
        <i>This user did not left a comment.</i>
      )}
    </p>
  </div>
);

export default UserComment;
