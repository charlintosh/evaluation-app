import Link from 'next/link';

const CreateNewLayout: React.FC<UI.ChildrenProps> = ({ children }) => {
  return (
    <div className="m-10">
      <Link href="/dashboard/"> Go back </Link>
      <h1 className="my-5 text-4xl font-semibold">Create a new item</h1>
      {children}
    </div>
  );
};

export default CreateNewLayout;
