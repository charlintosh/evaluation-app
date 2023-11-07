import Loader from '@/components/Loader';

type LoadingBoundaryProps = UI.ClassNameProp &
  UI.ChildrenProps &
  UI.LoadableProp;
const LoadingBoundary: React.FC<LoadingBoundaryProps> = ({
  isLoading,
  className = '',
  children,
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className={`${isLoading ? 'opacity-20' : ''}`}>{children}</div>
      {isLoading ? (
        <div
          role="status"
          className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2"
        >
          <Loader />
        </div>
      ) : null}
    </div>
  );
};

export default LoadingBoundary;
