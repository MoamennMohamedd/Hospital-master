// HeroVideo.js
import React from 'react';
import  Link from 'next/link';
const HeroVideo = () => {
  return (
    <div className="relative h-screen w-full max-w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/Hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Welcome to Smart <span className='text-blue-500 mb-8'>Ambulance</span></h1>
        <Link href="/login" className="text-white font-semibold text-xl duration-300">
        <button className='py-4 px-16 bg-blue-500 rounded-lg'>
            Open case
        </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroVideo;
