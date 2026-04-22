import { format } from 'date-fns';

function formatJoinedDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return `Joined ${format(date, 'MMM yyyy')}`;
  } catch {
    return dateStr;
  }
}

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-5">
        <div className="skeleton w-22 h-22 rounded-full flex-shrink-0" style={{ width: '88px', height: '88px' }} />
        <div className="flex-1">
          <div className="skeleton h-5 w-3/4 mb-3" />
          <div className="skeleton h-4 w-1/2" />
        </div>
      </div>
      <div className="skeleton h-4 w-full mb-4" />
      <div className="flex gap-4">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-4 w-24" />
      </div>
    </div>
  );
}

export default function ProfileCard({ user, label, color, loading }) {
  if (loading) return <SkeletonCard />;
  if (!user) return null;

  const isBlue = color === 'blue';
  const accentColor = isBlue ? 'text-gh-accent' : 'text-gh-purple';
  const glowClass = isBlue ? 'card-glow-blue' : 'card-glow-purple';
  const borderColor = isBlue ? 'border-gh-accent/20' : 'border-gh-purple/20';
  const ringClass = isBlue ? 'avatar-ring-blue' : 'avatar-ring-purple';
  const animClass = isBlue ? 'animate-slide-in-left' : 'animate-slide-in-right';

  return (
    <div className={`glass ${borderColor} rounded-2xl p-6 ${glowClass} ${animClass}`}>
      {/* Label & GitHub link */}
      <div className="flex items-center justify-between mb-5">
        <span className={`text-xs font-bold uppercase tracking-[0.15em] ${accentColor}`}>
          {label}
        </span>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gh-text-secondary hover:text-white transition-all duration-300 hover:scale-110"
          title="View on GitHub"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>

      {/* Avatar + Name */}
      <div className="flex items-center gap-5 mb-5">
        <div className={ringClass}>
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-20 h-20 rounded-full flex-shrink-0 bg-gh-card-solid"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-white truncate tracking-tight">{user.name || user.login}</h3>
          <p className={`text-sm font-medium ${accentColor}`}>@{user.login}</p>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-sm text-gh-text mb-5 leading-relaxed line-clamp-2 border-l-2 border-gh-border pl-3 italic opacity-80">
          {user.bio}
        </p>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-5 py-3 px-4 rounded-xl bg-gh-bg-secondary/50">
        <div className="flex-1 text-center">
          <div className="text-lg font-bold text-white tabular-nums">{user.public_repos}</div>
          <div className="text-[10px] text-gh-text-secondary uppercase tracking-wider font-medium">Repos</div>
        </div>
        <div className="w-px h-8 bg-gh-border" />
        <div className="flex-1 text-center">
          <div className="text-lg font-bold text-white tabular-nums">{user.followers?.toLocaleString()}</div>
          <div className="text-[10px] text-gh-text-secondary uppercase tracking-wider font-medium">Followers</div>
        </div>
        <div className="w-px h-8 bg-gh-border" />
        <div className="flex-1 text-center">
          <div className="text-lg font-bold text-white tabular-nums">{user.following?.toLocaleString()}</div>
          <div className="text-[10px] text-gh-text-secondary uppercase tracking-wider font-medium">Following</div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2.5 text-sm text-gh-text-secondary">
        {user.company && (
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 flex-shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
            <span className="truncate">{user.company}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 flex-shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="truncate">{user.location}</span>
          </div>
        )}
        {user.blog && (
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 flex-shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-4.687a4.5 4.5 0 00-6.364-6.364L4.5 8.25a4.5 4.5 0 006.364 6.364l.518-.518" />
            </svg>
            <a
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`truncate hover:underline ${accentColor}`}
            >
              {user.blog.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2.5">
          <svg className="w-4 h-4 flex-shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <span>{formatJoinedDate(user.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
