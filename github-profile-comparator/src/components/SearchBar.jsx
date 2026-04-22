import { useState } from 'react';

export default function SearchBar({ onCompare, loading }) {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user1.trim() && user2.trim()) {
      onCompare(user1.trim(), user2.trim());
    }
  };

  const handleSwap = () => {
    const temp = user1;
    setUser1(user2);
    setUser2(temp);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-3">
          {/* User 1 input */}
          <div className="flex-1 w-full">
            <label className="block text-xs text-gh-accent mb-2 font-semibold uppercase tracking-widest">
              User 1
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gh-accent text-lg font-bold transition-transform group-focus-within:scale-110">
                @
              </span>
              <input
                type="text"
                value={user1}
                onChange={(e) => setUser1(e.target.value)}
                placeholder="e.g. torvalds"
                className="search-input w-full rounded-xl px-4 pl-10 py-4 text-white placeholder-gh-text-secondary/50 focus:outline-none transition-all duration-300 text-base font-medium"
                disabled={loading}
              />
            </div>
          </div>

          {/* Center controls */}
          <div className="flex items-center gap-3 mt-5 md:mt-6">
            {/* Swap button */}
            <button
              type="button"
              onClick={handleSwap}
              className="p-3 rounded-xl glass hover:border-gh-accent/40 transition-all duration-300 group active:scale-90"
              title="Swap users"
            >
              <svg className="w-5 h-5 text-gh-text-secondary group-hover:text-gh-accent transition-all duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </button>

            {/* VS badge */}
            <div className="hidden md:flex items-center">
              <span className="vs-badge font-black text-lg tracking-widest px-5 py-2.5 rounded-xl">
                VS
              </span>
            </div>
          </div>

          {/* User 2 input */}
          <div className="flex-1 w-full">
            <label className="block text-xs text-gh-purple mb-2 font-semibold uppercase tracking-widest">
              User 2
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gh-purple text-lg font-bold transition-transform group-focus-within:scale-110">
                @
              </span>
              <input
                type="text"
                value={user2}
                onChange={(e) => setUser2(e.target.value)}
                placeholder="e.g. gaearon"
                className="search-input search-input-purple w-full rounded-xl px-4 pl-10 py-4 text-white placeholder-gh-text-secondary/50 focus:outline-none transition-all duration-300 text-base font-medium"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Compare button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={loading || !user1.trim() || !user2.trim()}
            className="compare-btn px-10 py-4 rounded-xl font-bold text-white text-base flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Comparing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                <span>Compare Profiles</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
