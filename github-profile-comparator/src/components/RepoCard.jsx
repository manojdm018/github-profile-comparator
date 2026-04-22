const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  SCSS: '#c6538c',
  Lua: '#000080',
  R: '#198CE7',
};

function getLangColor(lang) {
  return LANG_COLORS[lang] || '#8b949e';
}

function getTopRepos(repos, count = 3) {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
}

function RepoItem({ repo, accent, index }) {
  const langColor = getLangColor(repo.language);

  return (
    <div
      className="glass-subtle rounded-xl p-4 card-hover group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1 + 0.2}s`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-bold truncate hover:underline ${accent} flex items-center gap-1.5 group-hover:gap-2 transition-all duration-300`}
        >
          <svg className="w-4 h-4 opacity-50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          {repo.name}
        </a>
        {repo.fork && (
          <span className="text-[10px] font-semibold text-gh-text-secondary bg-gh-border/20 px-2 py-0.5 rounded-md flex-shrink-0 uppercase tracking-wider">
            fork
          </span>
        )}
      </div>

      {repo.description && (
        <p className="text-xs text-gh-text-secondary mb-3 line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}

      <div className="flex items-center gap-4 text-xs text-gh-text-secondary">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-white/5"
              style={{ backgroundColor: langColor }}
            />
            <span className="font-medium">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-gh-yellow" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="tabular-nums font-semibold">{repo.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          <span className="tabular-nums font-semibold">{repo.forks_count.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function SkeletonRepos() {
  return (
    <div className="space-y-4 p-5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2.5">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-full" />
          <div className="flex gap-3">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-3 w-10" />
            <div className="skeleton h-3 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RepoCard({ repos, user, label, color, loading }) {
  if (loading) {
    return (
      <div className="glass rounded-xl">
        <div className="p-5 pb-0">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="skeleton w-6 h-6 rounded-full" />
            <div className="skeleton h-4 w-32" />
          </div>
        </div>
        <SkeletonRepos />
      </div>
    );
  }

  if (!user) return null;

  const topRepos = getTopRepos(repos);
  const isBlue = color === 'blue';
  const accent = isBlue ? 'text-gh-accent' : 'text-gh-purple';
  const borderColor = isBlue ? 'border-gh-accent/15' : 'border-gh-purple/15';
  const glowClass = isBlue ? 'card-glow-blue' : 'card-glow-purple';
  const ringClass = isBlue ? 'avatar-ring-blue' : 'avatar-ring-purple';
  const animClass = isBlue ? 'animate-slide-in-left' : 'animate-slide-in-right';

  return (
    <div className={`glass ${borderColor} rounded-xl p-6 ${glowClass} ${animClass}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className={ringClass}>
            <img src={user.avatar_url} alt="" className="w-6 h-6 rounded-full bg-gh-card-solid" />
          </div>
          <span className={`text-sm font-bold ${accent}`}>
            {label} — Top Repos
          </span>
        </div>
        <span className="text-xs text-gh-text-secondary font-medium glass-subtle px-2.5 py-1 rounded-md">
          {repos.length} total
        </span>
      </div>

      <div className="space-y-3">
        {topRepos.length > 0 ? (
          topRepos.map((repo, i) => (
            <RepoItem key={repo.id} repo={repo} accent={accent} index={i} />
          ))
        ) : (
          <p className="text-gh-text-secondary text-sm text-center py-6">
            No public repositories found
          </p>
        )}
      </div>
    </div>
  );
}
