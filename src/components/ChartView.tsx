import { useMemo, useState, useCallback, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import ReactDOM from 'react-dom';
import type { DamageResult } from '@/types';
import { getPartMultiplier } from '@/data/calculator';
import { getWeaponFullName } from '@/data/weapons';

type ChartMode = 'ttk' | 'btk';
type ViewCount = 10 | 20 | 30 | 'all';

interface ChartViewProps {
  results: DamageResult[];
}

function getBarColorByTTK(ttk: number): string {
  if (ttk <= 0.35) return '#34d6e0';
  if (ttk <= 0.40) return '#4ade80';
  if (ttk <= 0.45) return '#e0a33e';
  if (ttk <= 0.50) return '#f97316';
  return '#c9372c';
}

function getBarColorByBTK(btk: number): string {
  if (btk <= 3) return '#34d6e0';
  if (btk === 4) return '#4ade80';
  if (btk === 5) return '#e0a33e';
  if (btk === 6) return '#f97316';
  return '#c9372c';
}

const VIEW_OPTIONS: { value: ViewCount; label: string }[] = [
  { value: 10, label: '10个' },
  { value: 20, label: '20个' },
  { value: 30, label: '30个' },
  { value: 'all', label: '全部' },
];

// Deduplicate by weapon.id + bulletType, keep the first occurrence (matches table order)
function dedupeResults(results: DamageResult[]): DamageResult[] {
  const seen = new Set<string>();
  const out: DamageResult[] = [];
  for (const r of results) {
    const key = r.weapon.id + '|' + r.bulletType;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(r);
    }
  }
  return out;
}

export default function ChartView({ results }: ChartViewProps) {
  const [mode, setMode] = useState<ChartMode>('ttk');
  const [viewCount, setViewCount] = useState<ViewCount>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Deduplicate: each weapon+bulletType combo appears once
  const uniqueResults = useMemo(() => dedupeResults(results), [results]);

  // Apply view count limit
  const chartData = useMemo(() => {
    if (viewCount === 'all' || uniqueResults.length <= viewCount) return uniqueResults;
    return uniqueResults.slice(0, viewCount);
  }, [uniqueResults, viewCount]);

  const maxVal = useMemo(() => {
    if (chartData.length === 0) return 1;
    return mode === 'ttk'
      ? Math.max(...chartData.map((d) => d.totalTime))
      : Math.max(...chartData.map((d) => d.totalShots));
  }, [chartData, mode]);

  const handleMouseEnter = useCallback(
    (index: number, el: HTMLDivElement) => {
      setHoveredIndex(index);
      const rect = el.getBoundingClientRect();
      setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setTooltipPos(null);
  }, []);

  if (chartData.length === 0) return null;

  const totalCount = uniqueResults.length;
  const origCount = results.length;

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-5">
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          borderColor: '#22252c',
          backgroundColor: 'rgba(14, 17, 24, 0.5)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: '#22252c' }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={15} style={{ color: '#e0a33e' }} />
              <span className="text-sm font-semibold text-white">
                {mode === 'ttk' ? 'TTK 击杀时间对比' : 'BTK 击杀弹数对比'}
              </span>
            </div>

            {/* TTK / BTK toggle */}
            <div className="flex items-center gap-0 ml-2">
              <button
                onClick={() => setMode('ttk')}
                className="px-2.5 py-1 text-[11px] font-mono-data rounded-l border transition-all"
                style={{
                  borderColor: mode === 'ttk' ? '#e0a33e' : '#22252c',
                  backgroundColor: mode === 'ttk' ? 'rgba(224,163,62,0.12)' : 'transparent',
                  color: mode === 'ttk' ? '#e0a33e' : '#555',
                }}
              >
                TTK
              </button>
              <button
                onClick={() => setMode('btk')}
                className="px-2.5 py-1 text-[11px] font-mono-data rounded-r border transition-all"
                style={{
                  borderColor: mode === 'btk' ? '#34d6e0' : '#22252c',
                  backgroundColor: mode === 'btk' ? 'rgba(52,214,224,0.12)' : 'transparent',
                  color: mode === 'btk' ? '#34d6e0' : '#555',
                  borderLeft: 'none',
                }}
              >
                BTK
              </button>
            </div>

            {/* View count toggle */}
            <div className="flex items-center gap-0 ml-3">
              {VIEW_OPTIONS.map((opt, i) => {
                const isActive = viewCount === opt.value;
                const isFirst = i === 0;
                const isLast = i === VIEW_OPTIONS.length - 1;
                return (
                  <button
                    key={opt.label}
                    onClick={() => setViewCount(opt.value)}
                    className="px-2 py-1 text-[11px] font-mono-data border transition-all"
                    style={{
                      borderColor: isActive ? '#e0a33e' : '#22252c',
                      backgroundColor: isActive ? 'rgba(224,163,62,0.1)' : 'transparent',
                      color: isActive ? '#e0a33e' : '#555',
                      borderRadius: isFirst ? '4px 0 0 4px' : isLast ? '0 4px 4px 0' : '0',
                      borderLeft: isFirst ? undefined : 'none',
                      marginLeft: isFirst ? undefined : '-1px',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <span className="text-xs" style={{ color: '#555' }}>
              ({viewCount === 'all' ? `共 ${totalCount} 把` : `前 ${viewCount} 把 / ${totalCount}`}
              {origCount > totalCount ? `, 多防具已合并` : ''})
            </span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-[11px]" style={{ color: '#555' }}>
            {mode === 'ttk' ? (
              <>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#34d6e0' }} />{'<=350ms'}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#4ade80' }} />{'<=400ms'}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#e0a33e' }} />{'<=450ms'}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#f97316' }} />{'<=500ms'}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#c9372c' }} />{'>=500ms'}</span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#34d6e0' }} />{'<=3发'}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#4ade80' }} />4发</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#e0a33e' }} />5发</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#f97316' }} />6发</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: '#c9372c' }} />{'>=7发'}</span>
              </>
            )}
          </div>
        </div>

        {/* Chart area */}
        <div className="px-5 py-5 chart-scroll" style={{ overflowX: 'auto' }}>
          <div
            className="flex items-end gap-[4px]"
            style={{
              height: 260,
              minWidth: viewCount === 10 ? Math.max(chartData.length * 104, 1200) :
                         viewCount === 20 ? Math.max(chartData.length * 68, 1400) :
                         viewCount === 30 ? Math.max(chartData.length * 56, 1600) :
                         Math.max(chartData.length * 46, 1400),
            }}
          >
            {chartData.map((data, index) => {
              const barWidth = viewCount === 10 ? 100 : viewCount === 20 ? 64 : viewCount === 30 ? 52 : 42;
              const val = mode === 'ttk' ? data.totalTime : data.totalShots;
              const heightPct = (val / maxVal) * 100;
              const barColor = mode === 'ttk'
                ? getBarColorByTTK(data.totalTime)
                : getBarColorByBTK(data.totalShots);
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={`${data.weapon.id}-${data.bulletType}`}
                  className="flex flex-col items-center gap-1 relative"
                  style={{ width: barWidth, flexShrink: 0 }}
                  onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Bar with CSS animation */}
                  <div className="w-full flex items-end justify-center relative" style={{ height: 200 }}>
                    <div
                      className="w-full rounded-t-sm relative overflow-hidden cursor-pointer"
                      style={{
                        height: `${Math.max(heightPct, 2)}%`,
                        backgroundColor: barColor,
                        minHeight: 3,
                        opacity: isHovered ? 1 : 0.9,
                        filter: isHovered ? 'brightness(1.3)' : 'none',
                        transition: 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.15s, filter 0.15s',
                      }}
                    >
                      {isHovered && (
                        <div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                            backgroundSize: '100% 40%',
                            animation: 'scan-vertical 1s linear infinite',
                          }}
                        />
                      )}
                      {/* Value inside bar */}
                      {heightPct > 12 && (
                        <div
                          className="absolute inset-0 flex items-center justify-center font-mono-data font-bold"
                          style={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: barWidth >= 100 ? (mode === 'ttk' ? 14 : 16) :
                                       barWidth >= 64 ? (mode === 'ttk' ? 12 : 14) :
                                       barWidth >= 52 ? (mode === 'ttk' ? 10 : 12) :
                                       (mode === 'ttk' ? 9 : 11),
                            textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                            writingMode: heightPct < 30 ? 'vertical-rl' : 'horizontal-tb',
                          }}
                        >
                          {mode === 'ttk'
                            ? `${(data.totalTime * 1000).toFixed(0)}`
                            : data.totalShots}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Label */}
                  <div
                    className="font-mono-data text-center w-full"
                    style={{
                      fontSize: barWidth >= 100 ? 13 : barWidth >= 64 ? 11 : barWidth >= 52 ? 10 : 9,
                      color: isHovered ? '#fff' : '#666',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={`${getWeaponFullName(data.weapon)} · ${data.bulletType}`}
                  >
                    {(() => {
                      const label = data.weapon.name;
                      const maxLen = barWidth >= 100 ? 11 : barWidth >= 64 ? 9 : barWidth >= 52 ? 7 : 5;
                      return label.length > maxLen ? label.slice(0, maxLen) + '..' : label;
                    })()}
                    <span style={{ fontSize: '0.75em', color: '#888', marginLeft: 2 }}>
                      {data.bulletType.replace('级', '').replace('弹', '')}
                    </span>
                  </div>

                  {/* Value below */}
                  <div
                    className="font-mono-data"
                    style={{
                      fontSize: barWidth >= 100 ? 13 : barWidth >= 64 ? 11 : barWidth >= 52 ? 10 : 9,
                      color: barColor,
                    }}
                  >
                    {mode === 'ttk'
                      ? `${(data.totalTime * 1000).toFixed(0)}ms`
                      : `${data.totalShots}发`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredIndex !== null && tooltipPos && chartData[hoveredIndex] && (
        <ChartTooltip data={chartData[hoveredIndex]} x={tooltipPos.x} y={tooltipPos.y} />
      )}

      {/* Scrollbar styles */}
      <style>{`
        .chart-scroll::-webkit-scrollbar { height: 8px; }
        .chart-scroll::-webkit-scrollbar-track { background: rgba(14, 17, 24, 0.5); border-radius: 4px; }
        .chart-scroll::-webkit-scrollbar-thumb { background: #22252c; border-radius: 4px; }
        .chart-scroll::-webkit-scrollbar-thumb:hover { background: #3a3d44; }
        .chart-scroll { scrollbar-width: thin; scrollbar-color: #22252c transparent; }
      `}</style>
    </div>
  );
}

function ChartTooltip({ data, x, y }: { data: DamageResult; x: number; y: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  if (!mounted) return null;

  const content = (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        className="px-3 py-2 rounded border text-xs shadow-2xl mb-1"
        style={{
          borderColor: '#22252c',
          backgroundColor: 'rgba(14, 17, 24, 0.98)',
          minWidth: 160,
        }}
      >
        <div
          className="font-mono-data font-bold text-white mb-1.5 text-center truncate"
          style={{ borderBottom: '1px solid #22252c', paddingBottom: 4 }}
        >
          {getWeaponFullName(data.weapon)} · {data.bulletType}
        </div>
        <div className="space-y-0.5 font-mono-data">
          <div className="flex justify-between">
            <span style={{ color: '#555' }}>TTK</span>
            <span style={{ color: '#e0a33e' }} className="font-bold">
              {data.totalTime < 1 ? `${(data.totalTime * 1000).toFixed(0)}ms` : `${data.totalTime.toFixed(2)}s`}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#555' }}>BTK</span>
            <span style={{ color: '#34d6e0' }} className="font-bold">{data.totalShots}发</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#555' }}>碎甲弹数</span>
            <span style={{ color: '#ccc' }}>{data.armorBreakShots}发</span>
          </div>
          <div className="border-t mt-1 pt-1" style={{ borderColor: '#22252c' }}>
            <div className="flex justify-between">
              <span style={{ color: '#555' }}>射速</span>
              <span style={{ color: '#ccc' }}>{data.weapon.rpm}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#555' }}>伤害</span>
              <span style={{ color: '#ccc' }}>
                {data.damagePerShotFlesh > 0
                  ? (data.damagePerShotFlesh / getPartMultiplier(data.weapon, data.bulletType, data.hitPart)).toFixed(0)
                  : '-'}
              </span>
            </div>
          </div>
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
