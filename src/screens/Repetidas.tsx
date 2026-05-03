import { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { countries } from '../data/album';

export const Repetidas = () => {
  const { getRepeated, setFigu, getFigu } = useCollection();
  const [searchQuery, setSearchQuery] = useState('');
  const repeated = getRepeated();

  const getCountryName = (code: string): string => {
    const country = countries.find((c) => c.code === code);
    return country?.name || code;
  };

  const handleRemoveOne = (type: 'fwc' | 'cc' | 'pais', pais: string | undefined, numero: string) => {
    const current = type === 'pais' 
      ? getFigu('pais', pais, numero)
      : type === 'fwc'
      ? getFigu('fwc', undefined, numero)
      : getFigu('cc', undefined, numero);
    
    if (current > 1) {
      setFigu(type, pais, numero, current - 1);
    }
  };

  const filtered = repeated.filter((figu) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    const display = figu.pais ? `${figu.pais}-${figu.numero}` : figu.numero;
    const name = figu.pais ? getCountryName(figu.pais).toLowerCase() : '';
    const code = figu.pais?.toLowerCase() || '';
    return display.toLowerCase().includes(q) || name.includes(q) || code.includes(q);
  });

  if (repeated.length === 0) {
    return (
      <div className="p-4 pb-24">
        <h1 className="text-2xl font-bold text-accent mb-4">Repetidas</h1>
        <div className="bg-bg-card rounded-xl p-8 text-center">
          <p className="text-4xl mb-4">🎉</p>
          <p className="text-gray-400">No tenés figuritas repetidas</p>
          <p className="text-gray-500 text-sm mt-2">¡Seguir abriendo paquetes!</p>
        </div>
      </div>
    );
  }

  const totalRepeated = filtered.reduce((sum, r) => sum + r.cantidad, 0);

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-accent">Repetidas</h1>
        <span className="bg-accent text-black px-2 py-1 rounded font-bold">{totalRepeated}</span>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por país o código..."
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

      {filtered.length === 0 && (
        <div className="bg-bg-card rounded-xl p-6 text-center">
          <p className="text-gray-500">No se encontraron repetidas para "{searchQuery}"</p>
        </div>
      )}

      <div className="space-y-2">
        {filtered.map((figu, index) => (
          <div
            key={index}
            className="bg-bg-card rounded-xl p-3 flex justify-between items-center"
          >
            <div>
              <span className={`
                font-bold px-2 py-0.5 rounded text-sm
                ${figu.type === 'fwc' ? 'bg-blue-900 text-blue-200' : 
                  figu.type === 'cc' ? 'bg-purple-900 text-purple-200' : 
                  'bg-green-900 text-green-200'}
              `}>
                {figu.type.toUpperCase()}
              </span>
              <span className="ml-2 font-medium">
                {figu.pais ? `${figu.pais}-${figu.numero}` : figu.numero}
              </span>
              {figu.pais && (
                <span className="ml-2 text-gray-400 text-sm">{getCountryName(figu.pais)}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold">x{figu.cantidad}</span>
              <button
                onClick={() => handleRemoveOne(figu.type, figu.pais, figu.numero)}
                className="text-gray-500 hover:text-red-400 font-bold px-3 py-1.5 text-sm"
              >
                -1
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
