import { useState } from 'react';
import { X, RotateCcw, Plus, Minus, Save, Sparkles, Crosshair } from 'lucide-react';
import type { Weapon, WeaponOverride, HitPart } from '@/types';
import { DEFAULT_PART_MULTIPLIERS } from '@/data/calculator';

interface WeaponEditorProps {
  weapon: Weapon;
  override: WeaponOverride | undefined;
  onSave: (override: WeaponOverride) => void;
  onRemove: (weaponId: string) => void;
  onClose: () => void;
}

export default function WeaponEditor({
  weapon,
  override,
  onSave,
  onRemove,
  onClose,
}: WeaponEditorProps) {
  const firstProfile = Object.values(weapon.profiles)[0] ?? { baseDamage: 0, armorDamage: 0 };
  const [damage, setDamage] = useState(override?.baseDamage ?? firstProfile.baseDamage);
  const [armorDmg, setArmorDmg] = useState(override?.armorDamage ?? firstProfile.armorDamage);
  const [rpm, setRpm] = useState(override?.rpm ?? weapon.rpm);

  // Part multipliers: use first profile's > override > global default
  const firstProfileMults = firstProfile?.partMultipliers ?? DEFAULT_PART_MULTIPLIERS;
  const [partMults, setPartMults] = useState({
    head: override?.partMultipliers?.head ?? firstProfileMults.head,
    chest: override?.partMultipliers?.chest ?? firstProfileMults.chest,
    abdomen: override?.partMultipliers?.abdomen ?? firstProfileMults.abdomen,
    limbs: override?.partMultipliers?.limbs ?? firstProfileMults.limbs,
  });

  const originalMults = firstProfileMults;
  const hasChanges =
    damage !== firstProfile.baseDamage ||
    armorDmg !== firstProfile.armorDamage ||
    rpm !== weapon.rpm ||
    partMults.head !== originalMults.head ||
    partMults.chest !== originalMults.chest ||
    partMults.abdomen !== originalMults.abdomen ||
    partMults.limbs !== originalMults.limbs;

  const handleSave = () => {
    onSave({
      weaponId: weapon.id,
      bulletType: (Object.keys(weapon.profiles)[0] || '3级弹') as '1级弹' | '2级弹' | '3级弹' | '3级SUB弹' | '3级apc弹' | '3级肉伤弹' | '4级弹' | '4级SUB弹' | '4级P弹' | '4级ST弹' | '4级apc弹' | '4级双头弹' | '5级弹' | '5级SUB弹' | '5级ST弹' | '6级弹M7' | '6级弹M61',
      baseDamage: damage,
      armorDamage: armorDmg,
      rpm: rpm,
      activeBuffs: [],
      partMultipliers:
        partMults.head !== originalMults.head ||
        partMults.chest !== originalMults.chest ||
        partMults.abdomen !== originalMults.abdomen ||
        partMults.limbs !== originalMults.limbs
          ? { ...partMults }
          : undefined,
    });
    onClose();
  };

  const handleReset = () => {
    setDamage(firstProfile.baseDamage);
    setArmorDmg(firstProfile.armorDamage);
    setRpm(weapon.rpm);
    setPartMults({ ...originalMults });
  };

  const handleRemove = () => {
    onRemove(weapon.id);
    onClose();
  };

  const adjust = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    delta: number,
    min: number = 1
  ) => {
    setter((v) => Math.max(min, Math.round((v + delta) * 10) / 10));
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 200,
        backgroundColor: 'rgba(8, 10, 14, 0.7)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          borderColor: '#22252c',
          backgroundColor: '#0e1118',
          width: 480,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: '#22252c' }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={14} style={{ color: '#e0a33e' }} />
            <span className="text-sm font-semibold text-white">
              武器配置: {weapon.name}
            </span>
            <span
              className="text-[10px] font-mono-data px-1.5 py-0.5 rounded"
              style={{
                color: '#555',
                backgroundColor: 'rgba(34, 37, 44, 0.5)',
              }}
            >
              {weapon.caliber}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:opacity-70 transition-opacity"
            style={{ color: '#555' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-5">
          {/* Numeric params */}
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#555' }}>
              基础参数
            </div>

            <ParamRow
              label="基础伤害"
              value={damage}
              original={firstProfile.baseDamage}
              onChange={setDamage}
              onAdjust={(d) => adjust(setDamage, d)}
              suffix=""
            />
            <ParamRow
              label="护甲伤害"
              value={armorDmg}
              original={firstProfile.armorDamage}
              onChange={setArmorDmg}
              onAdjust={(d) => adjust(setArmorDmg, d)}
              suffix=""
            />
            <ParamRow
              label="射速 (RPM)"
              value={rpm}
              original={weapon.rpm}
              onChange={setRpm}
              onAdjust={(d) => adjust(setRpm, d, 10)}
              suffix=""
              step={10}
            />
          </div>

          {/* Part Multipliers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#555' }}>
                <Crosshair size={10} className="inline mr-1" />
                部位伤害倍率
              </div>
              {firstProfile?.partMultipliers && (
                <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ color: '#e0a33e', backgroundColor: 'rgba(224,163,62,0.1)' }}>
                  该武器有独立倍率
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {([
                { part: 'head' as HitPart, label: '头部', defaultVal: originalMults.head },
                { part: 'chest' as HitPart, label: '胸部', defaultVal: originalMults.chest },
                { part: 'abdomen' as HitPart, label: '腹部', defaultVal: originalMults.abdomen },
                { part: 'limbs' as HitPart, label: '四肢', defaultVal: originalMults.limbs },
              ]).map(({ part, label, defaultVal }) => {
                const val = partMults[part];
                const isModified = val !== defaultVal;
                return (
                  <div key={part} className="flex items-center gap-2">
                    <span className="text-xs w-10" style={{ color: '#888' }}>{label}</span>
                    <button
                      onClick={() => setPartMults((p) => ({ ...p, [part]: Math.round((p[part] - 0.05) * 20) / 20 }))}
                      className="p-1 rounded border hover:opacity-80"
                      style={{ borderColor: '#22252c', color: '#555' }}
                    >
                      <Minus size={10} />
                    </button>
                    <input
                      type="number"
                      step={0.05}
                      value={val}
                      onChange={(e) => setPartMults((p) => ({ ...p, [part]: Number(e.target.value) || 0 }))}
                      className="w-14 text-center text-xs font-mono-data bg-transparent border rounded py-1 outline-none"
                      style={{
                        borderColor: isModified ? '#e0a33e' : '#22252c',
                        color: isModified ? '#e0a33e' : '#ccc',
                      }}
                    />
                    <button
                      onClick={() => setPartMults((p) => ({ ...p, [part]: Math.round((p[part] + 0.05) * 20) / 20 }))}
                      className="p-1 rounded border hover:opacity-80"
                      style={{ borderColor: '#22252c', color: '#555' }}
                    >
                      <Plus size={10} />
                    </button>
                    <span className="text-[10px] font-mono-data" style={{ color: '#555' }}>
                      默认{defaultVal}
                    </span>
                    {isModified && (
                      <span
                        className="text-[9px] font-mono-data px-1 rounded"
                        style={{
                          color: val > defaultVal ? '#4ade80' : '#c9372c',
                          backgroundColor: val > defaultVal ? 'rgba(74,222,128,0.1)' : 'rgba(201,55,44,0.1)',
                        }}
                      >
                        {val > defaultVal ? '+' : ''}{((val - defaultVal) / defaultVal * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-5 py-3 border-t"
          style={{ borderColor: '#22252c' }}
        >
          <button
            onClick={handleRemove}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-all hover:opacity-80"
            style={{
              borderColor: '#22252c',
              color: '#555',
            }}
          >
            <RotateCcw size={11} />
            恢复默认
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-all hover:opacity-80"
              style={{
                borderColor: '#22252c',
                color: '#888',
              }}
            >
              <Minus size={11} />
              清空
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs rounded border transition-all"
              style={{
                borderColor: hasChanges ? '#e0a33e' : '#22252c',
                backgroundColor: hasChanges ? 'rgba(224, 163, 62, 0.15)' : 'transparent',
                color: hasChanges ? '#e0a33e' : '#555',
                cursor: hasChanges ? 'pointer' : 'not-allowed',
              }}
            >
              <Save size={11} />
              保存并重算
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Parameter row with +/- controls
function ParamRow({
  label,
  value,
  original,
  onChange,
  onAdjust,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  original: number;
  onChange: (v: number) => void;
  onAdjust: (delta: number) => void;
  suffix: string;
  step?: number;
}) {
  const isModified = value !== original;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs w-24" style={{ color: '#888' }}>
        {label}
      </span>
      <button
        onClick={() => onAdjust(-step)}
        className="p-1 rounded border hover:opacity-80 transition-opacity"
        style={{ borderColor: '#22252c', color: '#555' }}
      >
        <Minus size={10} />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-20 text-center text-sm font-mono-data bg-transparent border rounded py-1 outline-none"
        style={{
          borderColor: isModified ? '#e0a33e' : '#22252c',
          color: isModified ? '#e0a33e' : '#ccc',
        }}
      />
      <button
        onClick={() => onAdjust(step)}
        className="p-1 rounded border hover:opacity-80 transition-opacity"
        style={{ borderColor: '#22252c', color: '#555' }}
      >
        <Plus size={10} />
      </button>
      <span className="text-[10px] font-mono-data" style={{ color: '#555' }}>
        默认: {original}
        {suffix}
      </span>
      {isModified && (
        <span
          className="text-[10px] font-mono-data px-1 rounded"
          style={{
            color: value > original ? '#4ade80' : '#c9372c',
            backgroundColor:
              value > original ? 'rgba(74, 222, 128, 0.1)' : 'rgba(201, 55, 44, 0.1)',
          }}
        >
          {value > original ? '+' : ''}
          {(((value - original) / original) * 100).toFixed(1)}%
        </span>
      )}
    </div>
  );
}
