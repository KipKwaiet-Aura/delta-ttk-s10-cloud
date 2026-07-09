import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { gsap } from 'gsap';
import {
  Crosshair, Gauge, Shield, HardHat, Skull, Zap, Edit3, Calculator, ArrowUpDown,
} from 'lucide-react';
import type { DamageResult, HitPart, Weapon } from '@/types';
import { formatTTK, getTTKUnit, getRatingColor, getPartMultiplier, getPartLabel, getArmorDamageFactor, PENETRATION_TABLE } from '@/data/calculator';
import { getCategoryLabel } from '@/data/weapons';

// BTK color: fewer shots = better (cyan), more = worse (red)
function getBTKColor(btk: number): string {
  if (btk <= 3) return '#34d6e0';
  if (btk <= 4) return '#4ade80';
  if (btk <= 5) return '#e0a33e';
  if (btk <= 6) return '#f97316';
  return '#c9372c';
}

// TTK color: shorter = better, longer = worse (updated thresholds)
function getTTKDataColor(ttk: number): string {
  if (ttk <= 0.35) return '#34d6e0';   // <= 350ms
  if (ttk <= 0.40) return '#4ade80';   // <= 400ms
  if (ttk <= 0.45) return '#e0a33e';   // <= 450ms
  if (ttk <= 0.50) return '#f97316';   // <= 500ms
  return '#c9372c';                      // > 500ms
}

// 获取完整武器名称（含后缀）
function getWeaponFullName(weapon: DamageResult['weapon']): string {
  return weapon.suffix ? `${weapon.name} ${weapon.suffix}` : weapon.name;
}

interface DataTableProps {
  results: DamageResult[];
  onEditWeapon?: (weapon: Weapon) => void;
  sortBy?: 'ttk' | 'btk' | 'rpm';
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (sortBy: 'ttk' | 'btk' | 'rpm') => void;
}

// Fallback reference for part preview
const REF_HELMET_DUR = 35;

const DataTable: React.FC<DataTableProps> = ({
  results,
  onEditWeapon = () => {},
  sortBy = 'ttk',
  sortOrder = 'asc',
  onSortChange,
}) => {
  const rowsRef = useRef<HTMLTableRowElement[]>([]);
  const prevResultsRef = useRef<string>('');

  useEffect(() => {
    const resultKey = results.map((r) => r.weapon.id + r.armor.id).join(',');
    if (resultKey === prevResultsRef.current) return;
    prevResultsRef.current = resultKey;

    const rows = rowsRef.current.filter(Boolean);
    if (rows.length === 0) return;

    gsap.fromTo(
      rows,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.025 }
    );
  }, [results]);

  // Helper to handle sort click
  const handleSortClick = (field: 'ttk' | 'btk' | 'rpm') => {
    if (onSortChange) {
      onSortChange(field);
    }
  };

  // Sort indicator component
  const SortArrow = ({ field }: { field: 'ttk' | 'btk' | 'rpm' }) => {
    if (sortBy !== field) {
      return <ArrowUpDown size={10} className="opacity-30" />;
    }
    return (
      <span style={{ color: '#e0a33e', fontSize: 10 }}>
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  if (results.length === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-10 text-center">
        <div className="text-[15px]" style={{ color: '#555' }}>暂无匹配数据，请调整筛选条件</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-4">
      {/* 从结果中提取当前计算参数 */}
      {(() => {
        const r = results[0];
        if (!r) return null;
        // 头部命中显示头盔等级，其他显示护甲等级
        const targetLevel = r.hitPart === 'head' ? (r.helmet?.level ?? 0) : r.armorLevel;
        const targetName = r.hitPart === 'head' ? `${targetLevel}级头盔` : `${targetLevel}级护甲`;
        const penRate = PENETRATION_TABLE[r.bulletType]?.[targetLevel] ?? 0;
        return (
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <Crosshair size={13} style={{ color: '#e0a33e' }} />
            <span className="text-[13px]" style={{ color: '#888' }}>
              显示 <strong className="text-white">{results.length}</strong> 条数据
            </span>
            <span className="text-[13px]" style={{ color: '#555' }}>|</span>
            <span className="text-[13px]" style={{ color: '#888' }}>
              <strong style={{ color: '#e0a33e' }}>{r.bulletType}</strong> 打 <strong style={{ color: '#34d6e0' }}>{targetName}</strong>
            </span>
            <span className="text-[13px]" style={{ color: '#555' }}>|</span>
            <span className="text-[13px]" style={{ color: '#888' }}>
              穿透率: <strong style={{ color: '#4ade80' }}>{(penRate * 100).toFixed(0)}%</strong>
            </span>
            <span className="text-[13px]" style={{ color: '#555' }}>|</span>
            <span className="text-[13px]" style={{ color: '#888' }}>
              命中部位: <strong style={{ color: '#e0a33e' }}>{getPartLabel(r.hitPart)}</strong>
            </span>
            <span className="text-[13px]" style={{ color: '#555' }}>|</span>
            <span className="text-[13px]" style={{ color: '#888' }}>
              点击 <Edit3 size={10} className="inline" style={{ color: '#e0a33e' }} /> 编辑武器参数
            </span>
          </div>
        );
      })()}

      <div
        className="rounded-lg border overflow-hidden"
        style={{ borderColor: '#22252c', backgroundColor: 'rgba(14, 17, 24, 0.5)', marginBottom: 450 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 750, tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: 90 }} />
              <col style={{ width: 70 }} />
              <col style={{ width: 55 }} />
              <col style={{ width: 75 }} />
              <col style={{ width: 55 }} />
              <col style={{ width: 55 }} />
              <col style={{ width: 45 }} />
              <col style={{ width: 45 }} />
              <col style={{ width: 60 }} />
              <col style={{ width: 50 }} />
              <col style={{ width: 80 }} />
              <col style={{ width: 50 }} />
            </colgroup>
            <thead>
              <tr
                className="text-[13px] font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: 'rgba(14, 17, 24, 0.9)',
                  borderBottom: '1px solid rgba(52, 214, 224, 0.3)',
                }}
              >
                <th className="px-2 py-3 text-white whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Crosshair size={11} style={{ color: '#e0a33e' }} />武器代号
                  </div>
                </th>
                <th className="px-2 py-3 whitespace-nowrap" style={{ color: '#888' }}>子弹类型</th>
                <th className="px-2 py-3 whitespace-nowrap" style={{ color: '#888' }}>类型</th>
                <th className="px-2 py-3 whitespace-nowrap" style={{ color: '#888' }}>
                  <div className="flex items-center gap-1">
                    {results[0]?.helmet ? <HardHat size={11} /> : <Shield size={11} />}
                    {results[0]?.helmet
                      ? `${results[0].helmet.level}级头盔`
                      : `${results[0]?.armorLevel || 4}级护甲型号`}
                  </div>
                </th>
                <th className="px-2 py-3 whitespace-nowrap text-right" style={{ color: '#888' }}>
                  <div className="flex items-center justify-end gap-1"><Zap size={11} />基础伤害</div>
                </th>
                <th className="px-2 py-3 whitespace-nowrap text-right" style={{ color: '#888' }}>
                  <div className="flex items-center justify-end gap-1"><Shield size={11} />护甲伤害</div>
                </th>
                <th className="px-2 py-3 whitespace-nowrap text-right" style={{ color: '#888' }}>
                  <div className="flex items-center justify-end gap-1"><Gauge size={11} />射速</div>
                </th>
                {/* 击杀弹数 - clickable sort header */}
                <th
                  className="px-2 py-3 whitespace-nowrap text-right cursor-pointer select-none hover:opacity-80 transition-opacity"
                  style={{ color: '#e0a33e' }}
                  onClick={() => handleSortClick('btk')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <Skull size={11} />
                    击杀弹数
                    <SortArrow field="btk" />
                  </div>
                </th>
                {/* TTK - clickable sort header */}
                <th
                  className="px-2 py-3 whitespace-nowrap text-right cursor-pointer select-none hover:opacity-80 transition-opacity"
                  style={{ color: '#e0a33e' }}
                  onClick={() => handleSortClick('ttk')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <Calculator size={11} />
                    TTK
                    <SortArrow field="ttk" />
                  </div>
                </th>
                <th className="px-2 py-3 whitespace-nowrap text-center" style={{ color: '#888' }}>容错</th>
                <th className="px-2 py-3 whitespace-nowrap text-center" style={{ color: '#888' }}>部位预览</th>
                <th className="px-2 py-3 whitespace-nowrap text-center" style={{ color: '#888' }}>编辑</th>
              </tr>
            </thead>
            <tbody>
              {results.map((data, index) => {
                return (
                  <tr
                    key={`${data.weapon.id}-${data.armor.id}-${index}`}
                    ref={(el) => { if (el) rowsRef.current[index] = el; }}
                    className="table-row-glow transition-colors duration-150"
                    style={{
                      borderBottom: '1px solid rgba(34, 37, 44, 0.5)',
                      opacity: 0,
                    }}
                  >
                    <td className="px-3 py-3">
                      <WeaponNameTooltip data={data} fullName={getWeaponFullName(data.weapon)} />
                    </td>

                    <td className="px-3 py-3">
                      <span
                        className="text-[13px] px-2 py-0.5 rounded border font-mono-data"
                        style={{
                          borderColor: '#22252c',
                          backgroundColor: 'rgba(14, 17, 24, 0.8)',
                          color: '#e0a33e',
                        }}
                      >
                        {data.bulletType}
                      </span>
                    </td>

                    <td className="px-3 py-3">
                      <span
                        className="text-[13px] px-2 py-0.5 rounded border"
                        style={{
                          borderColor: '#22252c',
                          backgroundColor: 'rgba(14, 17, 24, 0.8)',
                          color: '#888',
                        }}
                      >
                        {getCategoryLabel(data.weapon.category)}
                      </span>
                    </td>

                    <td className="px-2 py-3">
                      {data.helmet ? (
                        <span className="text-[13px]" style={{ color: '#e0a33e' }}>
                          {data.helmet.name}
                        </span>
                      ) : (
                        <span className="text-[13px]" style={{ color: '#ccc' }}>{data.armor.name}</span>
                      )}
                    </td>

                    {/* 基础伤害 */}
                    <td className="px-2 py-3 text-right">
                      <span className="font-mono-data text-[13px]" style={{ color: '#ccc' }}>
                        {(() => {
                          const profile = data.weapon.profiles[data.bulletType];
                          return profile?.baseDamage ?? '-';
                        })()}
                      </span>
                    </td>

                    {/* 护甲伤害 */}
                    <td className="px-2 py-3 text-right">
                      <span className="font-mono-data text-[13px]" style={{ color: '#ccc' }}>
                        {(() => {
                          const profile = data.weapon.profiles[data.bulletType];
                          return profile?.armorDamage ?? '-';
                        })()}
                      </span>
                    </td>

                    {/* 射速 */}
                    <td className="px-2 py-3 text-right">
                      <span className="font-mono-data text-[13px]" style={{ color: '#ccc' }}>
                        {data.weapon.rpm}
                      </span>
                    </td>

                    {/* 击杀弹数 - colored */}
                    <td className="px-2 py-3 text-right">
                      <span
                        className="font-mono-data text-[15px] font-bold"
                        style={{ color: getBTKColor(data.totalShots) }}
                      >
                        {data.totalShots}
                      </span>
                    </td>

                    {/* TTK - colored */}
                    <td className="px-2 py-3 text-right relative">
                      <TTKTooltip data={data} color={getTTKDataColor(data.totalTime)} />
                    </td>

                    <td className="px-2 py-3 text-center">
                      <span
                        className="inline-block text-[11px] font-mono-data font-bold px-2 py-0.5 rounded"
                        style={{
                          color: getRatingColor(data.rating),
                          backgroundColor: `${getRatingColor(data.rating)}15`,
                          border: `1px solid ${getRatingColor(data.rating)}40`,
                        }}
                      >
                        {data.rating}
                      </span>
                    </td>

                    <td className="px-2 py-3 text-center">
                      <PartPreview data={data} />
                    </td>

                    <td className="px-2 py-3 text-center">
                      <button
                        onClick={() => onEditWeapon?.(data.weapon)}
                        className="p-1.5 rounded border transition-all duration-200 hover:opacity-80"
                        style={{
                          borderColor: data.isCustomized ? '#e0a33e' : '#22252c',
                          color: data.isCustomized ? '#e0a33e' : '#555',
                          backgroundColor: data.isCustomized ? 'rgba(224,163,62,0.08)' : 'transparent',
                        }}
                        title={`编辑 ${getWeaponFullName(data.weapon)} 参数`}
                      >
                        <Edit3 size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// TTK Tooltip Component
function TTKTooltip({ data, color }: { data: DamageResult; color: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const handleEnter = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({ x: rect.right + 8, y: rect.top - 8 });
  };

  const handleLeave = () => setPos(null);

  const penRate = PENETRATION_TABLE[data.bulletType]?.[data.armorLevel] ?? 0;

  return (
    <div className="inline-block" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className="flex items-center justify-end gap-1 cursor-help">
        <span className="font-mono-data text-lg font-bold" style={{ color }}>
          {formatTTK(data.totalTime)}
        </span>
        <span className="font-mono-data text-[13px]" style={{ color: '#555' }}>
          {getTTKUnit(data.totalTime)}
        </span>
        <Calculator size={10} style={{ color: '#555' }} className="opacity-50" />
      </div>
      {pos && <TTKTooltipPortal data={data} x={pos.x} y={pos.y} penRate={penRate} />}
    </div>
  );
}

// Portal-based fixed tooltip
function TTKTooltipPortal({ data, x, y, penRate }: { data: DamageResult; x: number; y: number; penRate: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  if (!mounted) return null;

  const profile = data.weapon.profiles[data.bulletType];
  const partMult = getPartMultiplier(data.weapon, data.bulletType, data.hitPart);
  const baseDamage = profile?.baseDamage ?? 0;
  const armorDamage = profile?.armorDamage ?? 0;
  const partDmg = baseDamage * partMult;
  const trueArmorDmg = data.damagePerShotArmor;
  const armorDmgFactor = armorDamage > 0 ? trueArmorDmg / armorDamage : 1;
  const factorLabel = armorDmgFactor === 1 ? '100%' : `${(armorDmgFactor * 100).toFixed(0)}%`;

  // 智能位置：保证10发子弹都能显示（每发约22px，头部约120px，总高约340px）
  const estimatedHeight = Math.min(340 + data.totalShots * 22, window.innerHeight - 40);
  let finalY = y;
  let finalX = x;
  // 如果下方超出屏幕，向上偏移
  if (finalY + estimatedHeight > window.innerHeight - 20) {
    finalY = Math.max(10, window.innerHeight - estimatedHeight - 20);
  }
  // 如果右侧超出屏幕，向左偏移
  if (finalX + 320 > window.innerWidth - 20) {
    finalX = Math.max(10, window.innerWidth - 340);
  }

  const content = (
    <div
      style={{
        position: 'fixed',
        left: finalX,
        top: finalY,
        zIndex: 9999,
        minWidth: 300,
        pointerEvents: 'none',
      }}
    >
      <div
        className="rounded-lg border p-3.5 shadow-2xl"
        style={{
          borderColor: 'rgba(224, 163, 62, 0.3)',
          backgroundColor: 'rgba(14, 17, 24, 0.98)',
          maxHeight: '80vh',
          overflowY: 'auto',
          pointerEvents: 'auto',
        }}
      >
        <div
          className="text-[11px] uppercase tracking-wider mb-2.5 font-semibold flex items-center gap-1.5"
          style={{ color: '#e0a33e' }}
        >
          <Calculator size={10} />
          TTK 逐发迭代计算公式
        </div>
        <div className="space-y-2 font-mono-data text-[13px]">
          <div className="space-y-1 p-2 rounded" style={{ backgroundColor: 'rgba(34, 37, 44, 0.3)' }}>
            <div style={{ color: '#888' }}><span style={{ color: '#555' }}>0.</span> 基础参数</div>
            <div className="pl-3 space-y-0.5">
              <div style={{ color: '#aaa' }}>真·甲伤 = {armorDamage} × {factorLabel} = <strong style={{ color: '#e0a33e' }}>{trueArmorDmg.toFixed(1)}</strong></div>
              <div style={{ color: '#aaa' }}>部位伤害 = {baseDamage} × {partMult} = <strong style={{ color: '#34d6e0' }}>{partDmg.toFixed(1)}</strong></div>
              <div style={{ color: '#aaa' }}>穿透率 = <strong style={{ color: '#4ade80' }}>{(penRate * 100).toFixed(0)}%</strong></div>
            </div>
          </div>
          <div className="space-y-1">
            <div style={{ color: '#888' }}><span style={{ color: '#555' }}>1.</span> 核心公式（逐发模拟）</div>
            <div className="pl-3 space-y-0.5">
              <div style={{ color: '#aaa' }}>减伤比例 x = min(射击前耐久 / 真甲伤, 1)</div>
              <div style={{ color: '#aaa' }}>实际伤害 = 部位伤害 × 穿透率 × x + 部位伤害 × (1-x)</div>
            </div>
          </div>
          <div className="space-y-1 pt-1.5" style={{ borderTop: '1px solid #22252c' }}>
            <div style={{ color: '#888' }}><span style={{ color: '#555' }}>2.</span> 逐发推演{data.totalShots > 10 ? '（前8发 + 最后2发）' : '（全部' + data.totalShots + '发）'}</div>
            <TTKShotBreakdown data={data} penRate={penRate} />
          </div>
          <div className="space-y-1 pt-1.5" style={{ borderTop: '1px solid #22252c' }}>
            <div style={{ color: '#888' }}><span style={{ color: '#555' }}>3.</span> 总计</div>
            <div className="pl-3 space-y-0.5">
              <div style={{ color: '#ccc' }}>总弹数 = <strong style={{ color: '#34d6e0' }}>{data.totalShots} 发</strong> (碎甲{data.armorBreakShots}发 + 击杀{data.killShotsAfterBreak}发)</div>
              <div style={{ color: '#ccc' }}>TTK = {data.totalShots} ÷ {data.weapon.rpm} × 60 = <strong style={{ color: '#e0a33e' }}>{data.totalTime < 1 ? `${(data.totalTime * 1000).toFixed(0)}ms` : `${data.totalTime.toFixed(3)}s`}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
}

// Per-shot breakdown
function TTKShotBreakdown({ data, penRate }: { data: DamageResult; penRate: number }) {
  // 1. 计算全部shots（不限制数量）
  const allShots: { shot: number; preDur: number; mitigation: number; actualDmg: number; cumDmg: number; note: string }[] = [];
  const trueArmorDmg = data.damagePerShotArmor;
  const profile = data.weapon.profiles[data.bulletType];
  const baseDamage = profile?.baseDamage ?? 0;
  const partDmg = baseDamage * getPartMultiplier(data.weapon, data.bulletType, data.hitPart);
  const isHeadshot = data.hitPart === 'head';
  let armorDur = isHeadshot ? (data.helmet?.durability ?? 0) : data.armor.durability;
  let hp = 100;
  let cumDmg = 0;
  let shotNum = 0;
  const isArmorRelevant = data.hitPart !== 'limbs';

  while (hp > 0) {
    shotNum++;
    const preDur = Math.max(armorDur, 0);
    let actualDmg: number;
    let note = '';

    if (isArmorRelevant && preDur > 0) {
      armorDur -= trueArmorDmg;
      const mitigation = Math.min(preDur / trueArmorDmg, 1.0);
      const bypass = 1.0 - mitigation;
      actualDmg = partDmg * penRate * mitigation + partDmg * bypass;
      if (armorDur <= 0 && !allShots.some((s) => s.note === '碎甲')) {
        note = '碎甲';
      }
    } else {
      actualDmg = partDmg;
      if (preDur <= 0 && shotNum === 1) note = '无甲';
    }

    hp -= actualDmg;
    cumDmg += actualDmg;
    allShots.push({ shot: shotNum, preDur, mitigation: isArmorRelevant && preDur > 0 ? Math.min(preDur / trueArmorDmg, 1.0) : 0, actualDmg, cumDmg, note });
  }

  // 2. 决定显示策略：<=10发全显，>10发显前8+后2
  const total = allShots.length;
  let displayShots = allShots;
  let showEllipsis = false;
  if (total > 10) {
    displayShots = [...allShots.slice(0, 8), ...allShots.slice(-2)];
    showEllipsis = true;
  }

  return (
    <div className="pl-3 space-y-1">
      <div className="grid grid-cols-5 gap-1 text-[11px]" style={{ color: '#555' }}>
        <span>第N发</span><span className="text-right">射击前耐久</span><span className="text-right">减伤比例</span><span className="text-right">实际伤害</span><span className="text-right">累计</span>
      </div>
      {displayShots.map((s, idx) => (
        <div key={s.shot}>
          {showEllipsis && idx === 8 && (
            <div className="py-0.5 text-[11px]" style={{ color: '#555' }}>
              ... 省略中间 {total - 10} 发 ...
            </div>
          )}
          <div className="grid grid-cols-5 gap-1 text-[13px]" style={{ color: s.note === '碎甲' ? '#e0a33e' : '#ccc' }}>
            <span>第{s.shot}发{s.note && <span className="text-[11px] ml-1" style={{ color: '#e0a33e' }}>{s.note}</span>}</span>
            <span className="text-right">{s.preDur.toFixed(0)}</span>
            <span className="text-right">{(s.mitigation * 100).toFixed(0)}%</span>
            <span className="text-right" style={{ color: s.actualDmg >= partDmg ? '#c9372c' : '#ccc' }}>{s.actualDmg.toFixed(1)}</span>
            <span className="text-right">{s.cumDmg.toFixed(1)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Weapon name tooltip - shows per-part damage on hover
function WeaponNameTooltip({ data, fullName }: { data: DamageResult; fullName: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const weapon = data.weapon;

  const handleEnter = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({ x: rect.left, y: rect.bottom + 6 });
  };
  const handleLeave = () => setPos(null);

  const parts: { part: HitPart; label: string; color: string }[] = [
    { part: 'head', label: '头部', color: '#e0a33e' },
    { part: 'chest', label: '胸部', color: '#ccc' },
    { part: 'abdomen', label: '腹部', color: '#888' },
    { part: 'limbs', label: '四肢', color: '#555' },
  ];

  return (
    <>
      <div
        className="flex flex-col cursor-help"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <span className="font-mono-data font-bold text-[15px] text-white">
          {fullName}
        </span>
        <span className="text-[11px] font-mono-data" style={{ color: '#555' }}>
          {weapon.caliber}
        </span>
      </div>

      {pos && (
        <WeaponDamagePortal
          weapon={weapon}
          parts={parts}
          bulletType={data.bulletType}
          x={pos.x}
          y={pos.y}
        />
      )}
    </>
  );
}

function WeaponDamagePortal({
  weapon,
  parts,
  bulletType,
  x,
  y,
}: {
  weapon: DamageResult['weapon'];
  parts: { part: HitPart; label: string; color: string }[];
  bulletType: string;
  x: number;
  y: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  if (!mounted) return null;
  const baseDamage = weapon.profiles[bulletType as keyof typeof weapon.profiles]?.baseDamage ?? 0;

  const content = (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        className="rounded border px-3 py-2 shadow-2xl"
        style={{
          borderColor: 'rgba(224, 163, 62, 0.25)',
          backgroundColor: 'rgba(14, 17, 24, 0.98)',
          minWidth: 140,
        }}
      >
        <div
          className="text-[11px] font-mono-data font-bold text-white mb-1.5"
          style={{ borderBottom: '1px solid #22252c', paddingBottom: 4 }}
        >
          {getWeaponFullName(weapon)} · {bulletType}
        </div>
        <div className="space-y-1">
          {parts.map(({ part, label, color }) => {
            const mult = getPartMultiplier(weapon, bulletType, part);
            const dmg = baseDamage * mult;
            return (
              <div key={part} className="flex justify-between items-center text-[12px] font-mono-data">
                <span style={{ color }}>{label}</span>
                <span className="flex items-center gap-1">
                  <span style={{ color: '#555' }}>×{mult}</span>
                  <span style={{ color: '#e0a33e' }} className="font-bold">
                    {dmg.toFixed(1)}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-1.5 pt-1 text-[10px] font-mono-data" style={{ color: '#555', borderTop: '1px solid #22252c' }}>
          基础伤害: {baseDamage}
        </div>
      </div>
    </div>
  );

  const portalRoot = document.getElementById('chart-tooltip-root');
  if (portalRoot) return ReactDOM.createPortal(content, portalRoot);
  const newRoot = document.createElement('div');
  newRoot.id = 'chart-tooltip-root';
  document.body.appendChild(newRoot);
  return ReactDOM.createPortal(content, newRoot);
}

// Part damage preview
function PartPreview({ data }: { data: DamageResult }) {
  const weapon = data.weapon;
  const profile = weapon.profiles[data.bulletType];
  const baseDamage = profile?.baseDamage ?? 0;
  const armorDamage = profile?.armorDamage ?? 0;
  const parts: { part: HitPart; label: string }[] = [
    { part: 'head', label: '头' },
    { part: 'chest', label: '胸' },
    { part: 'abdomen', label: '腹' },
    { part: 'limbs', label: '肢' },
  ];

  const getShots = (part: HitPart) => {
    const partMult = getPartMultiplier(weapon, data.bulletType, part);
    const partDmg = baseDamage * partMult;
    const armorLevel = data.armor.level;
    const armorDmgFactor = getArmorDamageFactor(data.bulletType, armorLevel);
    const trueArmorDmg = armorDamage * armorDmgFactor;
    const penRate = PENETRATION_TABLE[data.bulletType]?.[armorLevel] ?? 0;
    const protectionDur = part === 'head'
      ? (data.helmet?.durability ?? REF_HELMET_DUR)
      : data.armor.durability;
    let armorDur = protectionDur;
    let hp = 100;
    let shots = 0;
    const hasProtection = part !== 'limbs' && (
      part === 'head' ? data.helmet !== undefined : (part === 'chest' ? data.armor.coversChest : data.armor.coversAbdomen)
    );

    while (hp > 0) {
      shots++;
      const preDur = Math.max(armorDur, 0);
      if (hasProtection && preDur > 0) {
        armorDur -= trueArmorDmg;
        const mitigation = Math.min(preDur / trueArmorDmg, 1.0);
        const bypass = 1.0 - mitigation;
        hp -= partDmg * penRate * mitigation + partDmg * bypass;
      } else {
        hp -= partDmg;
      }
    }
    return shots;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {parts.map(({ part, label }) => {
        const shots = getShots(part);
        const color = shots <= 2 ? '#34d6e0' : shots <= 4 ? '#4ade80' : shots <= 6 ? '#e0a33e' : '#c9372c';
        return (
          <div key={part} className="flex flex-col items-center gap-0.5" title={`${label}: ${shots}发击杀 (${data.bulletType}打${data.armor.level}级甲)`}>
            <span className="text-[11px]" style={{ color: '#555' }}>{label}</span>
            <span className="font-mono-data text-[11px] font-bold" style={{ color }}>{shots}</span>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(DataTable);
