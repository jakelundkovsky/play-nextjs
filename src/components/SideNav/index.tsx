"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="side-nav flex flex-col gap-2">
      <Link 
        href="/generate"
        className={`px-4 py-2 rounded hover:bg-gray-100 ${
          pathname === '/generate' ? 'bg-gray-100 font-semibold' : ''
        }`}
      >
        Home
      </Link>
      <Link 
        href="/keywords"
        className={`px-4 py-2 rounded hover:bg-gray-100 ${
          pathname === '/keywords' ? 'bg-gray-100 font-semibold' : ''
        }`}
      >
        Keywords
      </Link>
      <Link 
        href="/mentions"
        className={`px-4 py-2 rounded hover:bg-gray-100 ${
          pathname === '/mentions' ? 'bg-gray-100 font-semibold' : ''
        }`}
      >
        Mentions
      </Link>
    </div>
  );
};

export default SideNav; 