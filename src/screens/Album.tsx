import { useState, useMemo } from 'react';
import { useCollection } from '../hooks/useCollection';
import { countries, groups, Group, Country, fwcCodes, ccCodes } from '../data/album';

const FiguCard = ({
  label,
  qty,
  onAdd,
  onSub,
}: {
  label: string;
  qty: number;
  onAdd: () => void;
  onSub: () => void;
}) => {
  const isObtained = qty >= 1;
  const isRepeated = qty > 1;

  return (
    <div
      className={`
        rounded-lg flex flex-col items-center justify-between p-2
        transition-all select-none min-h-[80px]
        ${isObtained ? (isRepeated ? 'bg-yellow-600' : 'bg-success') : 'bg-surface-elevated'}
      `}
    >
      <span
        className={`text-sm font-bold leading-tight ${isObtained ? 'text-white' : 'text-gray-500'}`}
      >
        {label}
      </span>

      <span className={`text-[10px] font-bold leading-tight ${isObtained ? 'text-white/80' : 'text-gray-600'}`}>
        {qty > 0 ? `x${qty}` : ''}
      </span>

      <div className="flex items-center gap-1 w-full mt-0.5">
        <button
          onClick={(e) => { e.stopPropagation(); onSub(); }}
          className={`
            flex-1 h-8 rounded text-sm font-bold leading-none
            transition-all active:scale-90
            ${isObtained
              ? 'bg-black/20 text-white hover:bg-black/30'
              : 'bg-white/10 text-gray-500 hover:bg-white/20'
            }
          `}
        >
          −
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
          className={`
            flex-1 h-8 rounded text-sm font-bold leading-none
            transition-all active:scale-90
            ${isObtained
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-white/10 text-gray-500 hover:bg-white/20'
            }
          `}
        >
          +
        </button>
      </div>
    </div>
  );
};

export const Album = () => {
  const { getFigu, addFigu, subFigu, setFigu } = useCollection();
  const [viewType, setViewType] = useState<string>('groups');
  const [selectedGroup, setSelectedGroup] = useState<Group>('A');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const countriesInGroup = countries.filter((c) => c.group === selectedGroup);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const matched = countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );

    if (matched.length === 0) return [];

    const matchedGroups = new Set(matched.map((c) => c.group));
    return countries.filter((c) => matchedGroups.has(c.group));
  }, [searchQuery]);

  const handleSearchSelect = (country: Country) => {
    setSelectedGroup(country.group as Group);
    setSelectedCountry(country);
    setSearchQuery('');
  };

  const makeFwcCards = () => (
    <div className="grid grid-cols-3 gap-2.5">
      {fwcCodes.map((codigo) => (
        <FiguCard
          key={codigo}
          label={codigo.replace('FWC', '')}
          qty={getFigu('fwc', undefined, codigo)}
          onAdd={() => addFigu('fwc', undefined, codigo)}
          onSub={() => subFigu('fwc', undefined, codigo)}
        />
      ))}
    </div>
  );

  const makeCcCards = () => (
    <div className="grid grid-cols-3 gap-2.5">
      {ccCodes.map((codigo) => (
        <FiguCard
          key={codigo}
          label={codigo.replace('CC', '')}
          qty={getFigu('cc', undefined, codigo)}
          onAdd={() => addFigu('cc', undefined, codigo)}
          onSub={() => subFigu('cc', undefined, codigo)}
        />
      ))}
    </div>
  );

  const makeCountryCards = (paisCode: string) => (
    <div className="grid grid-cols-3 gap-2.5">
      {Array.from({ length: 20 }, (_, i) => {
        const num = `${i + 1}`;
        return (
          <FiguCard
            key={num}
            label={num}
            qty={getFigu('pais', paisCode, num)}
            onAdd={() => addFigu('pais', paisCode, num)}
            onSub={() => subFigu('pais', paisCode, num)}
          />
        );
      })}
    </div>
  );

  if (viewType === 'fwc') {
    return (
      <div className="p-4 pb-24">
        <button onClick={() => setViewType('groups')} className="mb-4 text-accent hover:underline">
          ← Volver
        </button>
        <div className="mb-4">
          <h1 className="text-xl font-bold">Figuritas World Cup</h1>
          <p className="text-gray-400 text-sm">FWC00 - FWC19</p>
        </div>

        {makeFwcCards()}

        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <span>
            {fwcCodes.filter((c) => getFigu('fwc', undefined, c) > 0).length}/20 obtenidas
          </span>
          <button
            onClick={() => {
              fwcCodes.forEach((c) => setFigu('fwc', undefined, c, 1));
            }}
            className="text-accent hover:underline"
          >
            Marcar todas
          </button>
        </div>
      </div>
    );
  }

  if (viewType === 'cc') {
    return (
      <div className="p-4 pb-24">
        <button onClick={() => setViewType('groups')} className="mb-4 text-accent hover:underline">
          ← Volver
        </button>
        <div className="mb-4">
          <h1 className="text-xl font-bold">Figuritas Copa</h1>
          <p className="text-gray-400 text-sm">CC1 - CC14</p>
        </div>

        {makeCcCards()}

        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <span>
            {ccCodes.filter((c) => getFigu('cc', undefined, c) > 0).length}/14 obtenidas
          </span>
          <button
            onClick={() => {
              ccCodes.forEach((c) => setFigu('cc', undefined, c, 1));
            }}
            className="text-accent hover:underline"
          >
            Marcar todas
          </button>
        </div>
      </div>
    );
  }

  if (selectedCountry) {
    const missing: number[] = [];
    for (let i = 1; i <= 20; i++) {
      if (getFigu('pais', selectedCountry.code, `${i}`) === 0) {
        missing.push(i);
      }
    }

    return (
      <div className="p-4 pb-24">
        <button onClick={() => setSelectedCountry(null)} className="mb-4 text-accent hover:underline">
          ← Volver
        </button>
        <div className="mb-4">
          <h1 className="text-xl font-bold">{selectedCountry.name}</h1>
          <p className="text-gray-400 text-sm">Grupo {selectedCountry.group}</p>
        </div>

        {makeCountryCards(selectedCountry.code)}

        {missing.length > 0 && (
          <div className="mt-4 bg-bg-card rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-300 mb-2">
              Faltan {missing.length} figurita{missing.length !== 1 ? 's' : ''}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {missing.map((n) => (
                <span key={n} className="bg-surface-elevated text-gray-400 px-2 py-0.5 rounded text-xs">
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}

        {missing.length === 0 && (
          <div className="mt-4 bg-success/20 rounded-xl p-4 text-center">
            <p className="text-success font-bold">¡Completaste {selectedCountry.name}!</p>
          </div>
        )}
      </div>
    );
  }

  const displayedCountries = searchResults ?? countriesInGroup;

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-accent mb-4">Album</h1>

      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar país por nombre o código..."
          className="w-full bg-bg-card border border-surface-elevated rounded-xl p-3 pl-10 text-white placeholder-gray-600 focus:border-accent focus:outline-none"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setViewType('groups')}
          className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            viewType === 'groups' ? 'bg-accent text-black' : 'bg-surface-elevated text-gray-400'
          }`}
        >
          Países
        </button>
        <button
          onClick={() => setViewType('fwc')}
          className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            viewType === 'fwc' ? 'bg-accent text-black' : 'bg-surface-elevated text-gray-400'
          }`}
        >
          FWC
        </button>
        <button
          onClick={() => setViewType('cc')}
          className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            viewType === 'cc' ? 'bg-accent text-black' : 'bg-surface-elevated text-gray-400'
          }`}
        >
          CC
        </button>
      </div>

      {viewType === 'groups' && (
        <>
          {!searchQuery && (
            <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group as Group)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    selectedGroup === group ? 'bg-accent text-black' : 'bg-surface-elevated text-gray-400'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          )}

          {searchQuery && searchResults && searchResults.length === 0 && (
            <div className="bg-bg-card rounded-xl p-6 text-center">
              <p className="text-gray-500">No se encontraron países para "{searchQuery}"</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {displayedCountries.map((country) => {
              let obtained = 0;
              let repeated = 0;
              for (let i = 1; i <= 20; i++) {
                const qty = getFigu('pais', country.code, `${i}`);
                if (qty > 0) obtained++;
                if (qty > 1) repeated += qty - 1;
              }

              return (
                <button
                  key={country.code}
                  onClick={() => {
                    if (searchQuery) {
                      handleSearchSelect(country);
                    } else {
                      setSelectedCountry(country);
                    }
                  }}
                  className="bg-bg-card rounded-xl p-4 text-left hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{country.code}</h3>
                      <p className="text-xs text-gray-400">{country.name}</p>
                    </div>
                    {obtained === 20 ? (
                      <span className="text-success text-xs">✓ Completo</span>
                    ) : (
                      <span className="text-gray-500 text-xs">{20 - obtained} faltan</span>
                    )}
                  </div>
                  <div className="mt-2 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full"
                      style={{ width: `${(obtained / 20) * 100}%` }}
                    />
                  </div>
                  {repeated > 0 && <p className="text-xs text-accent mt-1">{repeated} repetida{repeated > 1 ? 's' : ''}</p>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
