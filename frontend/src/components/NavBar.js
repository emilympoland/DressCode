'use client';

import Link from 'next/link';
import { Home, Compass, Upload, MessageSquare, User } from 'lucide-react'; // optional icons

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#96A8FD] px-6 h-15 flex justify-around items-center z-50">
      <Link href="/home" className="flex flex-1 justify-center items-center">
        <Home className="text-white w-7 h-7" />
      </Link>
      <Link href="/explore" className="flex flex-1 justify-center items-center">
        <Compass className="text-white w-7 h-7" />
      </Link>
      <Link href="/upload" className="flex flex-1 justify-center items-center">
        <Upload className="text-white w-7 h-7" />
      </Link>
      <Link href="/messages" className="flex flex-1 justify-center items-center">
        <MessageSquare className="text-white w-7 h-7" />
      </Link>
      <Link href="/profile" className="flex flex-1 justify-center items-center">
        <User className="text-white w-7 h-7" />
      </Link>
    </nav>
  );
}