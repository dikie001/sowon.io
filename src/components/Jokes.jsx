import React, { useState } from 'react';

function Jokes() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  // Function to fetch a joke with safe mode and no repeats.
  const fetchJoke = async (jokeCategory) => {
    setLoading(true);
    setError('');
    // Update current category in state
    setCategory(jokeCategory);
    // Build URL with blacklist flags to filter out nasty content
    let url = '';
    if (jokeCategory === 'Programming') {
      url = 'https://v2.jokeapi.dev/joke/Programming?type=single&blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    } else if (jokeCategory === 'Normal') {
      url = 'https://v2.jokeapi.dev/joke/Misc?type=single&blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    }
    
    let newJoke = '';
    let tries = 0;
    // Try up to 5 times to avoid a repeating joke.
    while (tries < 5) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.joke) {
          newJoke = data.joke;
          // If the new joke is different from the current one, break.
          if (newJoke !== joke) break;
        } else {
          setError('No joke found.');
          break;
        }
      } catch (err) {
        console.error('Error fetching joke:', err);
        setError('Failed to fetch joke.');
        break;
      }
      tries++;
    }
    if (newJoke === joke && tries === 5) {
      setError('Could not fetch a new joke. Try again.');
    } else {
      setJoke(newJoke);
    }
    setLoading(false);
  };

  // Handler for "Generate Another" that uses the current category.
  const generateAnother = () => {
    if (category) {
      fetchJoke(category);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Jokes Galore</h1>
      <div className="space-x-4 mb-6">
        <button
          onClick={() => fetchJoke('Normal')}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
        >
          Normal Jokes
        </button>
        <button
          onClick={() => fetchJoke('Programming')}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
        >
          Programming Jokes
        </button>
      </div>
      {loading && (
        <p className="text-gray-600">
          Fetching a {category} joke...
        </p>
      )}
      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}
      {joke && (
        <div className="max-w-xl bg-white shadow-md rounded p-6 text-center">
          <p className="text-xl text-gray-800 mb-4">{joke}</p>
          <button
            onClick={generateAnother}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            Generate Another
          </button>
        </div>
      )}
    </div>
  );
}

export default Jokes;
