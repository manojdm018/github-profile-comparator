import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
  Jupyter: '#DA5B0B',
  R: '#198CE7',
  Perl: '#0298c3',
  Haskell: '#5e5086',
  Scala: '#c22d40',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
};

function getDefaultColor(index) {
  const palette = [
    '#58a6ff', '#bc8cff', '#3fb950', '#d29922', '#f778ba',
    '#f85149', '#79c0ff', '#7ee787', '#ffa657', '#d2a8ff',
    '#ff7b72', '#a5d6ff', '#56d364', '#e3b341', '#ff9bce',
  ];
  return palette[index % palette.length];
}

function getLangColor(lang) {
  return LANG_COLORS[lang] || getDefaultColor(lang.length);
}

function countLanguages(repos) {
  const langMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] || 0) + 1;
    }
  });
  return Object.entries(langMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg px-4 py-3 text-sm shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div
            className="w-3 h-3 rounded-full ring-2 ring-white/10"
            style={{ backgroundColor: payload[0].payload.fill }}
          />
          <span className="text-white font-semibold">{payload[0].name}</span>
        </div>
        <div className="text-gh-text-secondary mt-1.5 text-xs">
          {payload[0].value} repo{payload[0].value !== 1 ? 's' : ''}
        </div>
      </div>
    );
  }
  return null;
};

function LanguageBar({ data }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-gh-text-secondary text-sm text-center py-6">
        No language data available
      </p>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const displayData = data.slice(0, 6);
  const otherCount = total - displayData.reduce((sum, d) => sum + d.value, 0);

  if (otherCount > 0) {
    displayData.push({ name: 'Other', value: otherCount });
  }

  const chartData = displayData.map((d) => ({
    ...d,
    fill: d.name === 'Other' ? '#484f58' : getLangColor(d.name),
  }));

  return (
    <div>
      {/* Donut chart */}
      <div className="h-52 mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2.5">
        {chartData.map((lang, i) => (
          <div
            key={lang.name}
            className="flex items-center justify-between text-sm py-1 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05 + 0.3}s`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0 ring-1 ring-white/5"
                style={{ backgroundColor: lang.fill }}
              />
              <span className="text-gh-text truncate max-w-[130px] font-medium">{lang.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold tabular-nums">{lang.value}</span>
              <span className="text-gh-text-secondary text-xs w-12 text-right tabular-nums">
                {((lang.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="space-y-4 p-5">
      <div className="skeleton h-52 w-full rounded-xl" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="skeleton w-3 h-3 rounded-sm" />
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-4 w-8 ml-auto" />
        </div>
      ))}
    </div>
  );
}

export default function LanguageChart({ repos1, repos2, user1, user2, loading }) {
  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gh-accent">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Top Languages</h2>
            <p className="text-xs text-gh-text-secondary mt-0.5">Repository language breakdown</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass rounded-xl">
            <SkeletonChart />
          </div>
          <div className="glass rounded-xl">
            <SkeletonChart />
          </div>
        </div>
      </div>
    );
  }

  if (!user1 || !user2) return null;

  const langData1 = countLanguages(repos1);
  const langData2 = countLanguages(repos2);

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gh-accent">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Top Languages</h2>
          <p className="text-xs text-gh-text-secondary mt-0.5">Repository language breakdown</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass rounded-xl p-6 card-glow-blue border-gh-accent/15 animate-slide-in-left">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="avatar-ring-blue">
              <img src={user1.avatar_url} alt="" className="w-6 h-6 rounded-full bg-gh-card-solid" />
            </div>
            <span className="text-sm font-bold text-gh-accent">@{user1.login}</span>
          </div>
          <LanguageBar data={langData1} />
        </div>
        <div className="glass rounded-xl p-6 card-glow-purple border-gh-purple/15 animate-slide-in-right">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="avatar-ring-purple">
              <img src={user2.avatar_url} alt="" className="w-6 h-6 rounded-full bg-gh-card-solid" />
            </div>
            <span className="text-sm font-bold text-gh-purple">@{user2.login}</span>
          </div>
          <LanguageBar data={langData2} />
        </div>
      </div>
    </div>
  );
}
