import React, { useMemo, useEffect, useRef } from 'react';
import { Shield, Target, ArrowUpDown, Search, RotateCcw, HardHat, Zap, Layers, Crosshair } from 'lucide-react';
import type { FilterState, ArmorType, HelmetType, HitPart, WeaponCategory } from '@/types';
import { getArmorsByLevel } from '@/data/armor';
import { getHelmetsByLevel } from '@/data/helmets';
import { getPenetrationRate, getAllBulletTypes, groupBulletTypesByLevel } from '@/data/calculator';
import { weapons } from '@/data/weapons';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const HIT_PARTS: { id: HitPart; label: string }[] = [
  { id: 'head', label: '头部' },
  { id: 'chest', label: '胸部' },
  { id: 'abdomen', label: '腹部' },
  { id: 'limbs', label: '四肢' },
];

const SORT_OPTIONS: { id: 'ttk' | 'btk' | 'rpm'; label: string }[] = [
  { id: 'ttk', label: '击杀时间 (TTK)' },
  { id: 'btk', label: '子弹消耗 (BTK)' },
  { id: 'rpm', label: '射速 (RPM)' },
];

const CATEGORIES: { id: WeaponCategory | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'assault_rifle', label: '突击步枪' },
  { id: 'smg', label: '冲锋枪' },
  { id: 'dmr', label: '精确射手步枪' },
  { id: 'lmg', label: '轻机枪' },
  { id: 'sniper', label: '狙击枪' },
];

const ARMOR_LEVELS = [0, 1, 2, 3, 4, 5, 6] as const;

const ALL_BULLET_TYPES = getAllBulletTypes(weapons);
const BULLET_GROUPS = groupBulletTypesByLevel(ALL_BULLET_TYPES);
const BULLET_LEVEL_ORDER = [1, 2, 3, 4, 5, 6];

const ALL_OPTIONS: Record<number, string> = {
  3: '3级全部',
  4: '4级全部',
  5: '5级全部',
  6: '6级全部',
};

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  // 护甲相关
  const availableArmors = useMemo(() => getArmorsByLevel(filters.armorLevel), [filters.armorLevel]);
  // 头盔相关
  const availableHelmets = useMemo(() => getHelmetsByLevel(filters.helmetLevel), [filters.helmetLevel]);

  // 自动清理残留的无效头盔/护甲ID（等级变化时触发）
  const filtersRef = useRef(filters);
  filtersRef.current = filters;
  const prevArmorLevel = useRef(filters.armorLevel);
  const prevHelmetLevel = useRef(filters.helmetLevel);
  useEffect(() => {
    const f = filtersRef.current;
    // 护甲等级变化时，清理无效的护甲ID
    if (f.armorLevel !== prevArmorLevel.current) {
      prevArmorLevel.current = f.armorLevel;
      const validArmorIds = new Set(availableArmors.map((a) => a.id));
      const cleaned = f.armorTypes.filter((id) => validArmorIds.has(id));
      if (cleaned.length !== f.armorTypes.length || cleaned.length === 0) {
        onFiltersChange({
          ...f,
          armorTypes: cleaned.length > 0 ? cleaned : [availableArmors[0]?.id].filter(Boolean) as string[],
        });
      }
    }
    // 头盔等级变化时，清理无效的头盔ID
    if (f.helmetLevel !== prevHelmetLevel.current) {
      prevHelmetLevel.current = f.helmetLevel;
      const validHelmetIds = new Set(availableHelmets.map((h) => h.id));
      const cleaned = f.helmetTypes.filter((id) => validHelmetIds.has(id));
      if (cleaned.length !== f.helmetTypes.length || cleaned.length === 0) {
        onFiltersChange({
          ...f,
          helmetTypes: cleaned.length > 0 ? cleaned : [availableHelmets[0]?.id].filter(Boolean) as string[],
        });
      }
    }
  }, [filters.armorLevel, filters.helmetLevel, availableArmors, availableHelmets]);
  // 穿透率取子弹vs护甲等级（头部用子弹vs头盔等级）
  const penRate = useMemo(() => {
    const targetLevel = filters.hitPart === 'head' ? filters.helmetLevel : filters.armorLevel;
    return getPenetrationRate(filters.bulletSelect as string, targetLevel);
  }, [filters.bulletSelect, filters.armorLevel, filters.helmetLevel, filters.hitPart]);


  // ===== 设置函数 =====
  const setBulletSelect = (val: string) => onFiltersChange({ ...filters, bulletSelect: val as FilterState['bulletSelect'] });
  const setHitPart = (part: HitPart) => onFiltersChange({ ...filters, hitPart: part });

  // 护甲等级独立设置
  const setArmorLevel = (level: number) => {
    const newArmors = getArmorsByLevel(level);
    onFiltersChange({
      ...filters,
      armorLevel: level,
      armorTypes: newArmors.length > 0 ? [newArmors[0].id] : [],
    });
  };

  // 头盔等级独立设置
  const setHelmetLevel = (level: number) => {
    const newHelmets = getHelmetsByLevel(level);
    onFiltersChange({
      ...filters,
      helmetLevel: level,
      helmetTypes: newHelmets.length > 0 ? [newHelmets[0].id] : [],
    });
  };

  const toggleArmor = (armorId: ArmorType) => {
    const newArmorTypes = filters.armorTypes.includes(armorId)
      ? filters.armorTypes.filter((a) => a !== armorId)
      : [...filters.armorTypes, armorId];
    onFiltersChange({ ...filters, armorTypes: newArmorTypes });
  };

  const toggleHelmet = (helmetId: HelmetType) => {
    // 单选行为：点新的取消旧的同级头盔
    onFiltersChange({ ...filters, helmetTypes: [helmetId] });
  };

  const setSortBy = (sort: 'ttk' | 'btk' | 'rpm') => {
    const newOrder = filters.sortBy === sort ? (filters.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    onFiltersChange({ ...filters, sortBy: sort, sortOrder: newOrder });
  };
  const setCategory = (cat: WeaponCategory | 'all') => onFiltersChange({ ...filters, categoryFilter: cat });
  const setSearchQuery = (query: string) => onFiltersChange({ ...filters, searchQuery: query });
  const resetFilters = () => onFiltersChange({
    armorTypes: ['mk2'], helmetTypes: ['dich'], hitPart: 'chest',
    bulletSelect: '3级弹', armorLevel: 4, helmetLevel: 4,
    includeFirstShot: false,
    sortBy: 'ttk', sortOrder: 'asc',
    searchQuery: '', categoryFilter: 'assault_rifle',
  });

  return (
    <div className="w-full border-b" style={{ borderColor: '#22252c', backgroundColor: 'rgba(14, 17, 24, 0.7)' }}>
      <div className="max-w-[1600px] mx-auto px-6 py-4">

        {/* ===== Row 1: 子弹类型 + 命中部位 ===== */}
        <div className="flex items-center gap-3 flex-wrap mb-4 pb-4" style={{ borderBottom: '1px solid #22252c' }}>
          <div className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#888' }}>
            <Zap size={13} /><span>子弹类型</span>
          </div>
          <select
            value={filters.bulletSelect}
            onChange={(e) => setBulletSelect(e.target.value)}
            className="px-3 py-1.5 text-[13px] font-mono-data rounded border outline-none"
            style={{ borderColor: '#e0a33e', backgroundColor: 'rgba(224, 163, 62, 0.1)', color: '#e0a33e' }}
          >
            {BULLET_LEVEL_ORDER.map((level) => {
              const bullets = BULLET_GROUPS.get(level);
              if (!bullets || bullets.length === 0) return null;
              return (
                <optgroup key={level} label={`${level}级`}>
                  {bullets.map((bt) => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                  {level >= 3 && ALL_OPTIONS[level] && (
                    <option key={ALL_OPTIONS[level]} value={ALL_OPTIONS[level]} style={{ fontWeight: 'bold', color: '#e0a33e' }}>
                      {ALL_OPTIONS[level]}
                    </option>
                  )}
                </optgroup>
              );
            })}
          </select>

          <div className="flex items-center gap-1.5 text-[13px] font-medium ml-3" style={{ color: '#888' }}>
            <Target size={13} /><span>命中部位</span>
          </div>
          {HIT_PARTS.map((part) => {
            const isActive = filters.hitPart === part.id;
            return (
              <button key={part.id} onClick={() => setHitPart(part.id)}
                className="px-4 py-1.5 text-[13px] rounded border transition-all duration-200 font-medium"
                style={{ borderColor: isActive ? '#e0a33e' : '#22252c', backgroundColor: isActive ? 'rgba(224, 163, 62, 0.15)' : 'rgba(14, 17, 24, 0.5)', color: isActive ? '#e0a33e' : '#555' }}>
                {part.label}
              </button>
            );
          })}

          <div className="flex-1" />

          {/* 计算第一枪TTK 切换 */}
          <div className="flex items-center gap-1.5 mr-2">
            <Crosshair size={13} style={{ color: '#888' }} />
            <span className="text-[12px]" style={{ color: '#888' }}>计算第一枪TTK</span>
            <button
              onClick={() => onFiltersChange({ ...filters, includeFirstShot: !filters.includeFirstShot })}
              className="px-3 py-1 text-[12px] font-mono-data rounded border transition-all duration-200 font-bold"
              style={{
                borderColor: filters.includeFirstShot ? '#34d6e0' : '#22252c',
                backgroundColor: filters.includeFirstShot ? 'rgba(52, 214, 224, 0.12)' : 'rgba(14, 17, 24, 0.5)',
                color: filters.includeFirstShot ? '#34d6e0' : '#555',
              }}
            >
              {filters.includeFirstShot ? '是' : '否'}
            </button>
          </div>

          <div className="px-3 py-1.5 rounded border text-[12px] font-mono-data"
            style={{ borderColor: 'rgba(52, 214, 224, 0.3)', backgroundColor: 'rgba(52, 214, 224, 0.08)', color: '#34d6e0' }}>
            穿透率: {(penRate * 100).toFixed(0)}%
          </div>
        </div>

        {/* ===== Row 2: 护甲等级 + 护甲选项 ===== */}
        <div className="flex items-center gap-3 flex-wrap mb-4 pb-4" style={{ borderBottom: '1px solid #22252c' }}>
          <div className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#888' }}>
            <Layers size={13} /><span>护甲等级</span>
          </div>
          {ARMOR_LEVELS.map((level) => {
            const isActive = filters.armorLevel === level;
            return (
              <button key={`a-${level}`} onClick={() => setArmorLevel(level)}
                className="px-3 py-1.5 text-[13px] font-mono-data rounded border transition-all duration-200 font-bold"
                style={{ borderColor: isActive ? '#34d6e0' : '#22252c', backgroundColor: isActive ? 'rgba(52, 214, 224, 0.12)' : 'rgba(14, 17, 24, 0.5)', color: isActive ? '#34d6e0' : '#555' }}>
                {level}级甲
              </button>
            );
          })}

          <div className="w-px h-5 mx-1" style={{ backgroundColor: '#22252c' }} />

          <div className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#888' }}>
            <Shield size={13} /><span>{filters.armorLevel === 0 ? '无护甲' : filters.armorLevel + '级护甲型号'}</span>
          </div>
          {(() => {
            // 清理残留的无效护甲ID（不在当前等级中的）
            const validIds = new Set(availableArmors.map((a) => a.id));
            const activeIds = filters.armorTypes.filter((id) => validIds.has(id));
            const isActive = (id: string) => activeIds.includes(id);
            return availableArmors.map((armor) => (
              <button key={armor.id} onClick={() => toggleArmor(armor.id)}
                className="px-3 py-1.5 text-[13px] font-mono-data rounded border transition-all duration-200"
                style={{ borderColor: isActive(armor.id) ? '#34d6e0' : '#22252c', backgroundColor: isActive(armor.id) ? 'rgba(52, 214, 224, 0.1)' : 'rgba(14, 17, 24, 0.5)', color: isActive(armor.id) ? '#34d6e0' : '#555' }}>
                {armor.name}
              </button>
            ));
          })()}
        </div>

        {/* ===== Row 3: 头盔等级 + 头盔选项 ===== */}
        <div className="flex items-center gap-3 flex-wrap mb-4 pb-4" style={{ borderBottom: '1px solid #22252c' }}>
          <div className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#888' }}>
            <HardHat size={13} /><span>头盔等级</span>
          </div>
          {ARMOR_LEVELS.map((level) => {
            const isActive = filters.helmetLevel === level;
            return (
              <button key={`h-${level}`} onClick={() => setHelmetLevel(level)}
                className="px-3 py-1.5 text-[13px] font-mono-data rounded border transition-all duration-200 font-bold"
                style={{ borderColor: isActive ? '#e0a33e' : '#22252c', backgroundColor: isActive ? 'rgba(224, 163, 62, 0.12)' : 'rgba(14, 17, 24, 0.5)', color: isActive ? '#e0a33e' : '#555' }}>
                {level}级
              </button>
            );
          })}

          <div className="w-px h-5 mx-1" style={{ backgroundColor: '#22252c' }} />

          <div className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#888' }}>
            <HardHat size={13} /><span>{filters.helmetLevel === 0 ? '无头盔' : filters.helmetLevel + '级头盔'}</span>
          </div>
          {(() => {
            // 清理残留的无效头盔ID（不在当前等级中的）
            const validIds = new Set(availableHelmets.map((h) => h.id));
            const activeIds = filters.helmetTypes.filter((id) => validIds.has(id));
            const isActive = (id: string) => activeIds.includes(id);
            return availableHelmets.map((helmet) => (
              <button key={helmet.id} onClick={() => toggleHelmet(helmet.id)}
                className="px-3 py-1.5 text-[13px] font-mono-data rounded border transition-all duration-200"
                style={{ borderColor: isActive(helmet.id) ? '#e0a33e' : '#22252c', backgroundColor: isActive(helmet.id) ? 'rgba(224, 163, 62, 0.1)' : 'rgba(14, 17, 24, 0.5)', color: isActive(helmet.id) ? '#e0a33e' : '#555' }}>
                {helmet.name}
              </button>
            ));
          })()}
        </div>

        {/* ===== Row 4: 分类 + 排序 + 搜索 ===== */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = filters.categoryFilter === cat.id;
              return (
                <button key={cat.id} onClick={() => setCategory(cat.id)}
                  className="px-2.5 py-1 text-[13px] rounded border transition-all duration-200"
                  style={{ borderColor: isActive ? '#e0a33e' : '#22252c', backgroundColor: isActive ? 'rgba(224, 163, 62, 0.08)' : 'transparent', color: isActive ? '#e0a33e' : '#555' }}>
                  {cat.label}
                </button>
              );
            })}
          </div>
          <div className="w-px h-5" style={{ backgroundColor: '#22252c' }} />
          <div className="flex items-center gap-1.5">
            <ArrowUpDown size={12} style={{ color: '#555' }} />
            {SORT_OPTIONS.map((opt) => {
              const isActive = filters.sortBy === opt.id;
              return (
                <button key={opt.id} onClick={() => setSortBy(opt.id)}
                  className="px-2.5 py-1 text-[13px] font-mono-data rounded border transition-all duration-200 flex items-center gap-1"
                  style={{ borderColor: isActive ? '#e0a33e' : '#22252c', backgroundColor: isActive ? 'rgba(224, 163, 62, 0.08)' : 'transparent', color: isActive ? '#e0a33e' : '#555' }}>
                  {opt.label}
                  {isActive && <span style={{ fontSize: 10 }}>{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </button>
              );
            })}
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border" style={{ borderColor: '#22252c', backgroundColor: 'rgba(8, 10, 14, 0.6)' }}>
              <Search size={12} style={{ color: '#555' }} />
              <input type="text" placeholder="搜索武器..." value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-[13px] outline-none font-mono-data" style={{ color: '#ccc', width: 140 }} />
            </div>
            <button onClick={resetFilters} className="p-1.5 rounded border transition-all duration-200 hover:opacity-80" style={{ borderColor: '#22252c', color: '#555' }} title="重置筛选">
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FilterPanel);
