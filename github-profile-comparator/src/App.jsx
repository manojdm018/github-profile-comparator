import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import StatsComparison from './components/StatsComparison';
import LanguageChart from './components/LanguageChart';
import RepoCard from './components/RepoCard';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000,
});

async function fetchGitHubData(username) {
  const [profileRes, reposRes] = await Promise.all([
    githubApi.get(`/users/${username}`),
    githubApi.get(`/users/${username}/repos`, {
      params: { per_page: 100, sort: 'updated' },
    }),
  ]);
  return {
    user: profileRes.data,
    repos: reposRes.data,
  };
}

/* ─── Animated Background ─── */
function AnimatedBackground() {
  return (
    <>
      <div className="gradient-mesh">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />
      </div>
      <div className="noise-overlay" />
      <FloatingParticles />
    </>
  );
}

function FloatingParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 animate-fade-in">
      {/* Animated GitHub icon */}
      <div className="relative mb-10">
        <div className="w-36 h-36 rounded-full glass flex items-center justify-center animate-pulse-glow">
          <svg className="w-18 h-18 text-gh-text-secondary" style={{ width: '72px', height: '72px' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
        {/* Orbiting dots */}
        <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-gh-accent/30 animate-pulse" />
        <div className="absolute -bottom-2 -left-4 w-4 h-4 rounded-full bg-gh-purple/30 animate-pulse" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-1/2 -right-8 w-3 h-3 rounded-full bg-gh-green/30 animate-pulse" style={{ animationDelay: '1.4s' }} />
        <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-gh-pink/30 animate-pulse" style={{ animationDelay: '2.1s' }} />
      </div>

      <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
        Compare GitHub Profiles
      </h2>
      <p className="text-gh-text-secondary text-center max-w-lg leading-relaxed text-base">
        Enter two GitHub usernames above to get a comprehensive side-by-side comparison
        of their profiles, repositories, languages, and contribution stats.
      </p>

      {/* Feature hints */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {[
          { icon: '📊', label: 'Stats Comparison' },
          { icon: '👨‍💻', label: 'Profile Details' },
          { icon: '🏁', label: 'Language Breakdown' },
          { icon: '⭐', label: 'Top Repos' },
        ].map((f, i) => (
          <div
            key={f.label}
            className={`feature-tag flex items-center gap-2 text-sm text-gh-text-secondary px-4 py-2.5 rounded-full cursor-default animate-fade-in-up stagger-${i + 1}`}
          >
            <span className="text-base">{f.icon}</span>
            <span className="font-medium">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Error State ─── */
function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in-scale">
      <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-6" style={{ borderColor: 'rgba(248, 81, 73, 0.3)' }}>
        <svg className="w-10 h-10 text-gh-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
      <p className="text-gh-text-secondary text-center max-w-md mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-xl glass text-sm font-medium text-gh-accent hover:border-gh-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-gh-accent/10"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gh-accent">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-gh-text-secondary mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({
    user1: null,
    user2: null,
    repos1: [],
    repos2: [],
    username1: '',
    username2: '',
  });
  const [hasSearched, setHasSearched] = useState(false);

  const handleCompare = useCallback(async (username1, username2) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const [data1, data2] = await Promise.all([
        fetchGitHubData(username1),
        fetchGitHubData(username2),
      ]);

      setResults({
        user1: data1.user,
        user2: data2.user,
        repos1: data1.repos,
        repos2: data2.repos,
        username1,
        username2,
      });
    } catch (err) {
      let message = 'Failed to fetch data. Please check the usernames and try again.';
      if (err.response?.status === 404) {
        const failedUser = err.config?.url?.split('/users/')?.[1]?.split('?')[0];
        message = `User "${failedUser}" not found. Please check the username.`;
      } else if (err.response?.status === 403) {
        message = 'API rate limit exceeded. Please wait a moment and try again.';
      } else if (err.code === 'ECONNABORTED') {
        message = 'Request timed out. Please try again.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Header */}
        <header className="glass-strong sticky top-0 z-50 border-b border-gh-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="logo-icon w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white leading-tight tracking-tight">
                    GitHub Profile Comparator
                  </h1>
                  <p className="text-xs text-gh-text-secondary hidden sm:block font-medium">
                    Side-by-side developer comparison tool
                  </p>
                </div>
              </div>

              {/* Install PWA button */}
              <InstallButton />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Search Section */}
          <section className="mb-12 animate-fade-in-up">
            <SearchBar onCompare={handleCompare} loading={loading} />
          </section>

          {/* Content */}
          {error ? (
            <ErrorState message={error} onRetry={() => setError(null)} />
          ) : loading || results.user1 ? (
            <div className="space-y-10">
              {/* Profile Cards */}
              <section>
                <SectionHeader
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  }
                  title="Profile Overview"
                  subtitle="Developer profiles at a glance"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <ProfileCard
                    user={results.user1}
                    label={results.username1 || 'User 1'}
                    color="blue"
                    loading={loading}
                  />
                  <ProfileCard
                    user={results.user2}
                    label={results.username2 || 'User 2'}
                    color="purple"
                    loading={loading}
                  />
                </div>
              </section>

              <div className="section-divider" />

              {/* Stats Comparison */}
              <section>
                <StatsComparison
                  user1={results.user1}
                  user2={results.user2}
                  repos1={results.repos1}
                  repos2={results.repos2}
                  loading={loading}
                />
              </section>

              <div className="section-divider" />

              {/* Language Charts */}
              <section>
                <LanguageChart
                  repos1={results.repos1}
                  repos2={results.repos2}
                  user1={results.user1}
                  user2={results.user2}
                  loading={loading}
                />
              </section>

              <div className="section-divider" />

              {/* Top Repos */}
              <section>
                <SectionHeader
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  }
                  title="Most Popular Repositories"
                  subtitle="Top repositories ranked by stars"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <RepoCard
                    repos={results.repos1}
                    user={results.user1}
                    label={results.username1 || 'User 1'}
                    color="blue"
                    loading={loading}
                  />
                  <RepoCard
                    repos={results.repos2}
                    user={results.user2}
                    label={results.username2 || 'User 2'}
                    color="purple"
                    loading={loading}
                  />
                </div>
              </section>
            </div>
          ) : hasSearched ? null : (
            <EmptyState />
          )}
        </main>

        {/* Footer */}
        <footer className="relative mt-20">
          <div className="section-divider" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gh-text-secondary">
                Powered by <span className="text-gh-text">GitHub REST API</span>
              </p>
              <p className="text-xs text-gh-text-secondary">
                Built with <span className="text-gh-accent">React</span> + <span className="text-gh-purple">Vite</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ─── Install Button ─── */
function InstallButton() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
    }
    setInstallPrompt(null);
  };

  if (!installPrompt || installed) return null;

  return (
    <button
      onClick={handleInstall}
      className="install-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      <span className="hidden sm:inline">Install App</span>
    </button>
  );
}
