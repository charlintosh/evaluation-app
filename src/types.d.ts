type ReactNode = import('react').ReactNode;
type NextMiddleware = import('next/server').NextMiddleware;

interface User {
  username: string;
}

interface Rating {
  user: User;
  rating: number;
  comments: string;
}

/** Cards */
interface BaseCard {
  title: string;
  imgSrc: string;
  avgRating: number;
  description: string;
  ratings: Rating[];
  userRate?: Rating;
}

namespace UI {
  interface BasicIdentifier {
    id: string;
  }

  type Card = BaseCard & BasicIdentifier;

  interface ChildrenProps {
    children: ReactNode;
  }

  interface ClassNameProp {
    className?: string;
  }

  interface LoadableProp {
    isLoading?: boolean;
  }
}

namespace API {
  interface MongoIdentifier {
    _id: string;
  }

  type Card = BaseCard & MongoIdentifier;

  interface CreateCardItemPayload {
    title: string;
    description: string;
    image: File;
  }

  interface UpdateCardItemPayload {
    id: string;
    rating?: number;
    comments?: string;
  }

  interface Response<T> {
    data: T;
    success: boolean;
    error?: unknown;
  }
}

namespace Routing {
  interface IdSlug {
    params: {
      id: string;
    };
  }

  type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
}
