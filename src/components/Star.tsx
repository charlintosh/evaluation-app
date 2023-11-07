interface StarProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Star: React.FC<StarProps> = ({
  label,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  return (
    <div
      className="relative cursor-pointer select-none px-5"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">
        {label}
      </span>
      <svg
        className="w-full min-w-[35px]"
        xmlns="http://www.w3.org/2000/svg"
        width={44}
        height={43}
        viewBox="0 0 44 43"
        fill={isActive ? '#F0C419' : '#D9E1E3'}
        {...props}
      >
        <path
          fill="inherit"
          d="M10.96 41.89c-1.513.913-3.38-.442-2.982-2.163l2.677-11.572a2 2 0 00-.638-1.962l-8.98-7.785c-1.335-1.157-.623-3.35 1.137-3.503l11.874-1.031a2 2 0 001.67-1.214L20.32 1.768c.688-1.629 2.996-1.629 3.684 0L28.61 12.66a2 2 0 001.67 1.214l11.873 1.03c1.76.153 2.472 2.347 1.137 3.504l-8.98 7.785a2 2 0 00-.638 1.962l2.677 11.572c.398 1.721-1.469 3.076-2.982 2.163l-10.17-6.135a2 2 0 00-2.066 0L10.96 41.89z"
        />
      </svg>
    </div>
  );
};

export default Star;
