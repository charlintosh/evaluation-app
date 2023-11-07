'use client';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

import Loader from '@/components/Loader';

export interface WelcomeBannerProps {}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({}) => {
  const { data: session, status } = useSession();

  const withWrapper = (children: ReactNode): ReactNode => {
    return (
      <section className="mb-5 mt-5 flex h-[73px] flex-col justify-center bg-white pl-16 font-medium text-primary-100 shadow-ks">
        {children}
      </section>
    );
  };

  if (status === 'loading') {
    return withWrapper(<Loader />);
  }

  return session && session.user
    ? withWrapper(
        <Fragment>
          <span className="text-xl">Hello, {session.user.name}!</span>
          <span className="text-2xl">Welcome to the Evaluation App!</span>
        </Fragment>,
      )
    : null;
};

export default WelcomeBanner;
