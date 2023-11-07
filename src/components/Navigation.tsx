'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const links = [
  { href: '/dashboard/', label: 'Dashboard', omitMatch: 'dashboard' },
  { href: '/new/', label: 'Create a new item', omitMatch: 'new' },
];

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="mx-14 my-5 flex gap-3">
      {links
        .filter(({ omitMatch }) => !pathname.match(omitMatch))
        .map(({ href, label }) => (
          <Link
            key={href}
            className="font-medium text-primary-100 hover:underline dark:text-blue-500"
            href={href}
          >
            {label}
          </Link>
        ))}
      <button
        className="font-medium text-primary-100 hover:underline dark:text-blue-500"
        onClick={() =>
          signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/` })
        }
      >
        Sign out
      </button>
    </nav>
  );
};
