import { useState, useMemo, useCallback } from 'react';
import Background from '@/components/Background';
import StatusBar from '@/components/StatusBar';
import FilterPanel from '@/components/FilterPanel';
import ChartView from '@/components/ChartView';
import DataTable from '@/components/DataTable';
import WeaponEditor from '@/components/WeaponEditor';
import Footer from '@/components/Footer';
import { weapons as defaultWeapons } from '@/data/weapons';
import { getArmorsByLevel } from '@/data/armor';
import { getHelmetsByLevel } from '@/data/helmets';
import type { FilterState, DamageResult, Weapon, WeaponOverride } from '@/types';
import { calculateDamage, expandBulletSelect } from '@/data/calculator';

const DEFAULT_FILTERS: FilterState = {
  armorTypes: ['mk2'],
  helmetTypes: ['dich'],
  hitPart: 'chest',
  bulletSelect: '3级弹',
  armorLevel: 4,
  helmetLevel: 4,
  sortBy: 'ttk',
  sortOrder: 'asc',
  searchQuery: '',
  categoryFilter: 'assault_rifle',
};



function App() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [editingWeapon, setEditingWeapon] = useState<Weapon | null>(null);
  const [overrides, setOverrides] = useState<Map<string, WeaponOverride>>(new Map());

  const handleSaveOverride = useCallback((override: WeaponOverride) => {
    setOverrides((prev) => {
      const next = new Map(prev);
      next.set(override.weaponId, override);
      return next;
    });
  }, []);

  const handleRemoveOverride = useCallback((weaponId: string) => {
    setOverrides((prev) => {
      const next = new Map(prev);
      next.delete(weaponId);
      return next;
    });
  }, []);

  const results: DamageResult[] = useMemo(() => {
    // 展开"全部"选项为具体子弹类型列表
    const bulletTypes = expandBulletSelect(filters.bulletSelect);

    const filteredWeapons = defaultWeapons.filter((w) => {
      if (filters.categoryFilter !== 'all' && w.category !== filters.categoryFilter) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!w.name.toLowerCase().includes(q) && !w.caliber.toLowerCase().includes(q) && !w.id.toLowerCase().includes(q)) return false;
      }
      // 只保留支持至少一种展开后子弹类型的武器
      const hasAny = bulletTypes.some((bt) => w.profiles[bt]);
      if (!hasAny) return false;
      return true;
    });

    const availableArmors = getArmorsByLevel(filters.armorLevel);
    const availableHelmets = getHelmetsByLevel(filters.helmetLevel);
    // 清理残留的防具选项（当前等级中不存在的id）
    const validArmorIds = new Set(availableArmors.map((a) => a.id));
    const validHelmetIds = new Set(availableHelmets.map((h) => h.id));
    const activeArmorIds = filters.armorTypes.filter((id) => validArmorIds.has(id));
    const activeHelmetIds = filters.helmetTypes.filter((id) => validHelmetIds.has(id));
    const activeArmors = activeArmorIds.map((id) => availableArmors.find((a) => a.id === id)).filter(Boolean) as typeof availableArmors;
    const activeHelmets = activeHelmetIds.map((id) => availableHelmets.find((h) => h.id === id)).filter(Boolean) as typeof availableHelmets;
    const finalArmors = activeArmors.length > 0 ? activeArmors : [availableArmors[0]];
    const finalHelmets = activeHelmets.length > 0 ? activeHelmets : [availableHelmets[0]];

    const calculated: DamageResult[] = [];
    for (const weapon of filteredWeapons) {
      // 为该武器支持的每种展开后子弹类型各算一行
      const weaponBulletTypes = bulletTypes.filter((bt) => weapon.profiles[bt]);
      for (const bt of weaponBulletTypes) {
        if (filters.hitPart === 'head') {
          for (const helmet of finalHelmets) {
            if (!helmet) continue;
            calculated.push(calculateDamage(weapon, finalArmors[0], filters.hitPart, bt, helmet));
          }
        } else {
          for (const armor of finalArmors) {
            if (!armor) continue;
            calculated.push(calculateDamage(weapon, armor, filters.hitPart, bt));
          }
        }
      }
    }

    calculated.sort((a, b) => {
      const order = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'ttk') return (a.totalTime - b.totalTime) * order;
      if (filters.sortBy === 'btk') return (a.totalShots - b.totalShots) * order;
      return (a.weapon.rpm - b.weapon.rpm) * order;
    });

    // Mark customized weapons
    for (const r of calculated) {
      if (overrides.has(r.weapon.id)) {
        r.isCustomized = true;
      }
    }

    return calculated;
  }, [filters, overrides]);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#080a0e', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <Background />
      <div className="relative" style={{ zIndex: 10 }}>
        <StatusBar weaponCount={defaultWeapons.length} customCount={overrides.size} />
        <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />
        <SummaryStats results={results} />
        <ChartView results={results} />
        <DataTable
          results={results}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSortChange={(sortBy) => {
            setFilters((prev) => ({
              ...prev,
              sortBy,
              sortOrder: prev.sortBy === sortBy ? (prev.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc',
            }));
          }}
          onEditWeapon={(weapon) => setEditingWeapon(weapon)}
        />
        <Footer />

        {/* Weapon Editor Modal */}
        {editingWeapon && (
          <WeaponEditor
            weapon={editingWeapon}
            override={overrides.get(editingWeapon.id)}
            onSave={handleSaveOverride}
            onRemove={handleRemoveOverride}
            onClose={() => setEditingWeapon(null)}
          />
        )}
      </div>
    </div>
  );
}

function SummaryStats({ results }: { results: DamageResult[] }) {
  const stats = useMemo(() => {
    if (results.length === 0) return null;
    const sortedByTTK = [...results].sort((a, b) => a.totalTime - b.totalTime);
    const fastest = sortedByTTK[0];
    const slowest = sortedByTTK[sortedByTTK.length - 1];
    const sortedByBTK = [...results].sort((a, b) => a.totalShots - b.totalShots || a.totalTime - b.totalTime);
    const minBTK = sortedByBTK[0];
    const maxBTK = [...results].sort((a, b) => b.totalShots - a.totalShots || b.totalTime - a.totalTime)[0];
    return { fastest, slowest, minBTK, maxBTK };
  }, [results]);

  if (!stats) return null;

  return (
    <div className="max-w-[1600px] mx-auto px-6 pt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="最快击杀" value={stats.fastest.totalTime < 1 ? `${(stats.fastest.totalTime * 1000).toFixed(0)}ms` : `${stats.fastest.totalTime.toFixed(2)}s`} sub={stats.fastest.weapon.name} color="#34d6e0" />
        <StatCard label="最慢击杀" value={stats.slowest.totalTime < 1 ? `${(stats.slowest.totalTime * 1000).toFixed(0)}ms` : `${stats.slowest.totalTime.toFixed(2)}s`} sub={stats.slowest.weapon.name} color="#c9372c" />
        <StatCard label="最少弹数" value={`${stats.minBTK.totalShots} 发`} sub={stats.minBTK.weapon.name} color="#e0a33e" />
        <StatCard label="最多弹数" value={`${stats.maxBTK.totalShots} 发`} sub={stats.maxBTK.weapon.name} color="#f97316" />
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-lg border p-3" style={{ borderColor: '#22252c', backgroundColor: 'rgba(14, 17, 24, 0.6)' }}>
      <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: '#555' }}>{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono-data text-lg font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="text-[13px] mt-0.5" style={{ color: '#666' }}>{sub}</div>
    </div>
  );
}

export default App;
