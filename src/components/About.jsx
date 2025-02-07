import React from 'react';

function AboutSection() {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to Recipe Finder!
        </h2>
        <p className="text-xl text-gray-700 mb-6">
          Discover a world of flavor at your fingertips. Our app curates the most delectable recipes from around the globe—crafted for every taste and occasion.
        </p>
        <p className="text-lg text-gray-600">
          Whether you’re a seasoned chef or a curious beginner, we invite you to explore our ever-growing collection of meals that inspire, satisfy, and delight.
          Dive in, get creative, and let your culinary adventure begin!
        </p>
      </div>
    </div>
  );
}

export default AboutSection;
