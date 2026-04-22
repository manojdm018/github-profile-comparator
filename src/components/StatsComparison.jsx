const stats = [
  {
    key: 'public_repos',
    label: 'Public Repos',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    key: 'followers',
    label: 'Followers',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    key: 'following',
    label: 'Following',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

export default function StatsComparison({ user1, user2, repos1, repos2, loading }) {
  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gh-accent">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Stats Comparison</h2>
            <p className="text-xs text-gh-text-secondary mt-0.5">Head-to-head metrics</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="stat-card rounded-xl p-5">
              <div className="skeleton h-4 w-24 mb-4" />
              <div className="flex justify-between">
                <div className="skeleton h-8 w-16" />
                <div className="skeleton h-8 w-16" />
              </div>
              <div className="skeleton h-2 w-full mt-4 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user1 || !user2) return null;

  const totalStars1 = repos1.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalStars2 = repos2.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks1 = repos1.reduce((sum, r) => sum + r.forks_count, 0);
  const totalForks2 = repos2.reduce((sum, r) => sum + r.forks_count, 0);

  const allStats = [
    ...stats,
    {
      key: 'total_stars',
      label: 'Total Stars',
      val1: totalStars1,
      val2: totalStars2,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      key: 'total_forks',
      label: 'Total Forks',
      val1: totalForks1,
      val2: totalForks2,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      ),
    },
  ];

  const getWinner = (stat) => {
    if (stat.val1 !== undefined) {
      return stat.val1 > stat.val2 ? 1 : stat.val1 < stat.val2 ? 2 : 0;
    }
    const v1 = user1[stat.key] || 0;
    const v2 = user2[stat.key] || 0;
    return v1 > v2 ? 1 : v1 < v2 ? 2 : 0;
  };

  const getVal = (user, stat) => {
    if (stat.val1 !== undefined) {
      return user === 1 ? stat.val1 : stat.val2;
    }
    return (user === 1 ? user1 : user2)[stat.key] || 0;
  };

  // Calculate overall winner
  let wins1 = 0, wins2 = 0;
  allStats.forEach((stat) => {
    const w = getWinner(stat);
    if (w === 1) wins1++;
    if (w === 2) wins2++;
  });

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gh-accent">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Stats Comparison</h2>
          <p className="text-xs text-gh-text-secondary mt-0.5">Head-to-head metrics</p>
        </div>
      </div>

      {/* Overall Score Banner */}
      <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between animate-fade-in-scale">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${wins1 > wins2 ? 'bg-gh-green/20 text-gh-green' : 'bg-gh-accent/10 text-gh-accent'}`}>
            {wins1}
          </div>
          <span className="text-sm text-gh-text-secondary font-medium">wins</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-2 rounded-full transition-all duration-1000 ${wins1 >= wins2 ? 'bg-gh-green' : 'bg-gh-accent/40'}`}
            style={{ width: `${Math.max((wins1 / (wins1 + wins2 || 1)) * 120, 8)}px` }}
          />
          <span className="text-xs text-gh-text-secondary font-bold px-2">SCORE</span>
          <div className={`h-2 rounded-full transition-all duration-1000 ${wins2 >= wins1 ? 'bg-gh-purple' : 'bg-gh-purple/40'}`}
            style={{ width: `${Math.max((wins2 / (wins1 + wins2 || 1)) * 120, 8)}px` }}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gh-text-secondary font-medium">wins</span>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${wins2 > wins1 ? 'bg-gh-purple/20 text-gh-purple' : 'bg-gh-purple/10 text-gh-purple/60'}`}>
            {wins2}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allStats.map((stat, index) => {
          const winner = getWinner(stat);
          const v1 = getVal(1, stat);
          const v2 = getVal(2, stat);

          return (
            <div
              key={stat.key}
              className={`stat-card rounded-xl p-5 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-2.5 text-gh-text-secondary mb-4">
                <span className="opacity-70">{stat.icon}</span>
                <span className="text-sm font-semibold tracking-tight">{stat.label}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                {/* User 1 value */}
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className={`text-2xl font-bold tabular-nums animate-count-up ${
                      winner === 1 ? 'text-gh-green' : 'text-white'
                    }`}
                  >
                    {v1.toLocaleString()}
                  </div>
                  {winner === 1 && (
                    <span className="winner-badge text-[10px] font-bold px-2 py-0.5 rounded-md text-white">
                      WIN
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-gh-border/50" />

                {/* User 2 value */}
                <div className="flex items-center gap-2 flex-1 justify-end">
                  {winner === 2 && (
                    <span className="winner-badge text-[10px] font-bold px-2 py-0.5 rounded-md text-white">
                      WIN
                    </span>
                  )}
                  <div
                    className={`text-2xl font-bold tabular-nums animate-count-up ${
                      winner === 2 ? 'text-gh-purple' : 'text-white'
                    }`}
                    style={{ animationDelay: '0.15s' }}
                  >
                    {v2.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress bar comparison */}
              <div className="mt-4 flex gap-1 h-2 rounded-full overflow-hidden bg-gh-bg-secondary/80">
                {v1 + v2 > 0 ? (
                  <>
                    <div
                      className={`rounded-full progress-bar ${
                        winner === 1 ? 'bg-gh-green' : 'bg-gh-accent/40'
                      }`}
                      style={{ width: `${(v1 / (v1 + v2)) * 100}%` }}
                    />
                    <div
                      className={`rounded-full progress-bar ${
                        winner === 2 ? 'bg-gh-purple' : 'bg-gh-purple/40'
                      }`}
                      style={{ width: `${(v2 / (v1 + v2)) * 100}%` }}
                    />
                  </>
                ) : (
                  <div className="w-full bg-gh-border/30 rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
