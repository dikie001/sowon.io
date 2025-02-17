import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-8">
      <div className="max-w-3xl bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-10">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6">
          About Ninja Recipes
        </h1>
        <p className="text-2xl text-gray-700 mb-4">
          Welcome to Recipe Finder – your cheerful companion for culinary adventures!
        </p>
        <p className="text-xl text-gray-600 mb-4">
          We believe that every meal is a celebration. Our mission is to inspire you with a delightful collection of recipes that cater to every taste and occasion.
        </p>
        <p className="text-xl text-gray-600 mb-4">
          Whether you’re an experienced chef or a curious beginner, our platform is designed to make exploring, cooking, and sharing recipes an absolute joy.
        </p>
        <p className="text-xl text-gray-600">
          So dive in, get creative, and let Recipe Finder help you bring magic to your kitchen!
        </p>
      </div>
    </div>
  );
}

export default About;
