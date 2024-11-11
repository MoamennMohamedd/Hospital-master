import React from 'react';
import Navbar from './components/Navbar';
import Link from 'next/link';
import HeroVideo from './components/Hero-Video';

export default function Home() {
  return (
    <div>
      <Navbar />
        <HeroVideo />
    </div>
  );
}