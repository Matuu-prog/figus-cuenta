import { useCollection } from '../hooks/useCollection';
import { ProgressBar } from '../components/ProgressBar';
import { countries, groups, Group, fwcCodes, ccCodes, getFlag } from '../data/album';

export const Dashboard = () => {
  const { stats, reset, collection } = useCollection();
  const percentage = Math.round((stats.totalObtained / stats.total) * 100);

  return (
    <div className="p-4 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-accent mb-2">Figus - Album del Mundial</h1>
        <p className="text-gray-400 text-sm">Copa Mundial 2026</p>
      </div>

      <div className="bg-bg-card rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Progreso Total</span>
          <span className="text-accent text-xl font-bold">{percentage}%</span>
        </div>
        <ProgressBar value={stats.totalObtained} max={stats.total} showText={`${stats.totalObtained} / ${stats.total}`} />
        <div className="mt-3 flex justify-between text-sm text-gray-400">
          <span>{stats.totalMissing} faltantes</span>
          <span>{stats.totalRepeated} repetidas</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-bg-card rounded-xl p-3">
          <h3 className="font-bold text-blue-400 text-sm mb-2">FWC (World Cup)</h3>
          <div className="text-xs text-gray-400">
            <span className="text-green-500">{stats.fwcObtained || 0}</span> / 20
          </div>
        </div>
        <div className="bg-bg-card rounded-xl p-3">
          <h3 className="font-bold text-purple-400 text-sm mb-2">CC (Copa)</h3>
          <div className="text-xs text-gray-400">
            <span className="text-green-500">{stats.ccObtained || 0}</span> / 14
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">Por Grupo</h2>
      <div className="grid grid-cols-2 gap-3">
        {groups.map((group) => {
          const groupData = stats.byGroup[group as Group];
          const total = 80;
          const obtained = groupData.obtained;
          const missing = groupData.missing;
          const pct = Math.round((obtained / total) * 100);

          return (
            <div key={group} className="bg-bg-card rounded-xl p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-accent">Grupo {group}</span>
                <span className="text-xs text-gray-400">{pct}%</span>
              </div>
              <div className="h-2 bg-surface-elevated rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">
                <span className="text-green-500">{obtained}</span> / {total} •{' '}
                <span className="text-red-400">{missing}</span> faltan
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          const missingPais: Record<string, string[]> = {};
          const missingFwc: string[] = [];
          const missingCc: string[] = [];

          for (const code of fwcCodes) {
            if (!collection.fwc[code]) missingFwc.push(code);
          }

          for (const code of ccCodes) {
            if (!collection.cc[code]) missingCc.push(code);
          }

          for (const country of countries) {
            const cd = collection.paises[country.code] || {};
            for (let i = 1; i <= 20; i++) {
              if (!cd[`${i}`]) {
                if (!missingPais[country.code]) missingPais[country.code] = [];
                missingPais[country.code].push(`${i}`);
              }
            }
          }

          const lines: string[] = ['FALTANTES', ''];

          if (missingFwc.length > 0) {
            lines.push('FWC:');
            lines.push(missingFwc.join(','));
          }

          if (missingCc.length > 0) {
            lines.push('CC:');
            lines.push(
              missingCc
                .sort((a, b) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replace(/\D/g, '')))
                .join(',')
            );
          }

          Object.entries(missingPais)
            .map(([code, nums]) => ({ code, name: countries.find((c) => c.code === code)!.name, nums }))
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(({ code, name, nums }) => {
              lines.push(`${name} ${getFlag(code)}:`);
              lines.push(nums.sort((a, b) => parseInt(a) - parseInt(b)).join(','));
            });

          navigator.clipboard.writeText(lines.join('\n'));
        }}
        className="mt-8 w-full py-3 bg-accent/10 text-accent rounded-xl text-sm font-medium hover:bg-accent/20 transition-colors"
      >
        Copiar faltantes
      </button>

      <button
        onClick={() => {
          if (confirm('¿Resetear toda la colección?')) {
            reset();
          }
        }}
        className="mt-4 w-full py-3 text-gray-500 text-sm hover:text-red-400"
      >
        Resetear Colección
      </button>
    </div>
  );
};