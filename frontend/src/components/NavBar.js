// components/Navbar.js
'use client'; // needed if you plan to use client-side interactivity

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex space-x-6">
      <Link href="/" className="hover:underline"></Link>
      <Link href="/home" className="hover:underline">Home</Link>
      <Link href="/explore" className="hover:underline">Explore</Link>
      <Link href="/upload" className="hover:underline">Upload</Link>
      <Link href="/messages" className="hover:underline">Messages</Link>
      <Link href="/profile" className="hover:underline">Profile</Link>

    </nav>
  );
}