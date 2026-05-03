import { useState, useEffect, useCallback } from 'react';
import { countries, fwcCodes, ccCodes, Group } from '../data/album';

export interface CollectionData {
  fwc: Record<string, number>;
  cc: Record<string, number>;
  paises: Record<string, Record<string, number>>;
}

const STORAGE_KEY = 'figus-album-mundial';

const emptyCollection = (): CollectionData => ({
  fwc: {},
  cc: {},
  paises: {},
});

const loadFromStorage = (): CollectionData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading collection:', e);
  }
  return emptyCollection();
};

const saveToStorage = (data: CollectionData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving collection:', e);
  }
};

export interface Stats {
  total: number;
  totalObtained: number;
  totalMissing: number;
  totalRepeated: number;
  fwcObtained: number;
  ccObtained: number;
  byGroup: Record<Group, { obtained: number; missing: number; repeated: number }>;
}

const calculateStats = (collection: CollectionData): Stats => {
  let totalObtained = 0;
  let totalRepeated = 0;
  let fwcObtained = 0;
  let ccObtained = 0;
  const byGroup: Record<Group, { obtained: number; missing: number; repeated: number }> = {
    A: { obtained: 0, missing: 0, repeated: 0 },
    B: { obtained: 0, missing: 0, repeated: 0 },
    C: { obtained: 0, missing: 0, repeated: 0 },
    D: { obtained: 0, missing: 0, repeated: 0 },
    E: { obtained: 0, missing: 0, repeated: 0 },
    F: { obtained: 0, missing: 0, repeated: 0 },
    G: { obtained: 0, missing: 0, repeated: 0 },
    H: { obtained: 0, missing: 0, repeated: 0 },
    I: { obtained: 0, missing: 0, repeated: 0 },
    J: { obtained: 0, missing: 0, repeated: 0 },
    K: { obtained: 0, missing: 0, repeated: 0 },
    L: { obtained: 0, missing: 0, repeated: 0 },
  };

  for (const code of fwcCodes) {
    const qty = collection.fwc[code] || 0;
    if (qty > 0) {
      totalObtained += 1;
      fwcObtained += 1;
      if (qty > 1) totalRepeated += qty - 1;
    }
  }

  for (const code of ccCodes) {
    const qty = collection.cc[code] || 0;
    if (qty > 0) {
      totalObtained += 1;
      ccObtained += 1;
      if (qty > 1) totalRepeated += qty - 1;
    }
  }

  for (const country of countries) {
    const countryData = collection.paises[country.code] || {};
    for (let i = 1; i <= 20; i++) {
      const qty = countryData[`${i}`] || 0;
      if (qty > 0) {
        totalObtained += 1;
        if (qty > 1) totalRepeated += qty - 1;
        byGroup[country.group as Group].obtained += 1;
      } else {
        byGroup[country.group as Group].missing += 1;
      }
    }
  }

  const total = 20 + (48 * 20) + 14; // 20 FWC + 48 países×20 + 14 CC = 994

  return {
    total,
    totalObtained,
    totalMissing: total - totalObtained,
    totalRepeated,
    fwcObtained,
    ccObtained,
    byGroup,
  };
};

export const useCollection = () => {
  const [collection, setCollection] = useState<CollectionData>(loadFromStorage);
  const [stats, setStats] = useState<Stats>(() => calculateStats(collection));

  useEffect(() => {
    saveToStorage(collection);
    setStats(calculateStats(collection));
  }, [collection]);

  const getFigu = useCallback(
    (type: 'fwc' | 'cc' | 'pais', pais?: string, numero?: string): number => {
      if (type === 'fwc' && numero) {
        return collection.fwc[numero] || 0;
      }
      if (type === 'cc' && numero) {
        return collection.cc[numero] || 0;
      }
      if (type === 'pais' && pais && numero) {
        return collection.paises[pais]?.[numero] || 0;
      }
      return 0;
    },
    [collection]
  );

  const setFigu = useCallback(
    (type: 'fwc' | 'cc' | 'pais', pais?: string, numero?: string, cantidad: number = 1) => {
      setCollection((prev) => {
        const next = { ...prev };
        if (type === 'fwc' && numero) {
          next.fwc = { ...prev.fwc };
          if (cantidad > 0) {
            next.fwc[numero] = cantidad;
          } else {
            delete next.fwc[numero];
          }
        } else if (type === 'cc' && numero) {
          next.cc = { ...prev.cc };
          if (cantidad > 0) {
            next.cc[numero] = cantidad;
          } else {
            delete next.cc[numero];
          }
        } else if (type === 'pais' && pais && numero) {
          next.paises = { ...prev.paises };
          next.paises[pais] = { ...(prev.paises[pais] || {}) };
          if (cantidad > 0) {
            next.paises[pais][numero] = cantidad;
          } else {
            delete next.paises[pais][numero];
          }
        }
        return next;
      });
    },
    []
  );

  const toggleFigu = useCallback(
    (type: 'fwc' | 'cc' | 'pais', pais?: string, numero?: string) => {
      const current = getFigu(type, pais, numero);
      const next = current === 0 ? 1 : 0;
      setFigu(type, pais, numero, next);
    },
    [getFigu, setFigu]
  );

  const removeFigu = useCallback(
    (type: 'fwc' | 'cc' | 'pais', pais?: string, numero?: string) => {
      setFigu(type, pais, numero, 0);
    },
    [setFigu]
  );

  const addFigu = useCallback(
    (type: 'fwc' | 'cc' | 'pais', pais?: string, numero?: string) => {
      const current = getFigu(type, pais, numero);
      setFigu(type, pais, numero, current + 1);
    },
    [getFigu, setFigu]
  );

  const subFigu = useCallback(
    (type: 'fwc' | 'cc' | 'pais', pais?: string, numero?: string) => {
      const current = getFigu(type, pais, numero);
      setFigu(type, pais, numero, Math.max(0, current - 1));
    },
    [getFigu, setFigu]
  );

  const markAllCountry = useCallback(
    (paisCode: string) => {
      setCollection((prev) => {
        const next = { ...prev };
        next.paises = { ...prev.paises };
        next.paises[paisCode] = { ...(prev.paises[paisCode] || {}) };
        for (let i = 1; i <= 20; i++) {
          if (!next.paises[paisCode][`${i}`]) {
            next.paises[paisCode][`${i}`] = 1;
          }
        }
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setCollection(emptyCollection());
  }, []);

  const getRepeated = useCallback(() => {
    const repeated: { type: 'fwc' | 'cc' | 'pais'; pais?: string; numero: string; cantidad: number }[] = [];

    for (const code of fwcCodes) {
      const qty = collection.fwc[code] || 0;
      if (qty > 1) {
        repeated.push({ type: 'fwc', numero: code, cantidad: qty - 1 });
      }
    }

    for (const code of ccCodes) {
      const qty = collection.cc[code] || 0;
      if (qty > 1) {
        repeated.push({ type: 'cc', numero: code, cantidad: qty - 1 });
      }
    }

    for (const country of countries) {
      const countryData = collection.paises[country.code] || {};
      for (let i = 1; i <= 20; i++) {
        const qty = countryData[`${i}`] || 0;
        if (qty > 1) {
          repeated.push({ type: 'pais', pais: country.code, numero: `${i}`, cantidad: qty - 1 });
        }
      }
    }

    return repeated;
  }, [collection]);

  return {
    collection,
    stats,
    getFigu,
    setFigu,
    toggleFigu,
    removeFigu,
    addFigu,
    subFigu,
    markAllCountry,
    reset,
    getRepeated,
  };
};