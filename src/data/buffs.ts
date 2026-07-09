import type { WeaponBuff } from '@/types';

// 三角洲行动 武器改装词条系统
// 模拟不同配件/改装对武器性能的影响

export const WEAPON_BUFFS: WeaponBuff[] = [
  // ====== 枪管类 ======
  {
    id: 'heavy_barrel',
    name: '重枪管',
    description: '伤害+8%，射速-5%',
    damageMultiplier: 1.08,
    armorDamageMultiplier: 1.08,
    rpmMultiplier: 0.95,
    color: '#c9372c',
  },
  {
    id: 'light_barrel',
    name: '短枪管',
    description: '伤害-5%，射速+10%',
    damageMultiplier: 0.95,
    armorDamageMultiplier: 0.95,
    rpmMultiplier: 1.10,
    color: '#34d6e0',
  },
  {
    id: 'standard_barrel',
    name: '标准枪管',
    description: '伤害+3%',
    damageMultiplier: 1.03,
    armorDamageMultiplier: 1.03,
    rpmMultiplier: 1.0,
    color: '#e0a33e',
  },

  // ====== 握把/枪托类 ======
  {
    id: 'ergo_grip',
    name: '人体工学握把',
    description: '射速+8%',
    damageMultiplier: 1.0,
    armorDamageMultiplier: 1.0,
    rpmMultiplier: 1.08,
    color: '#4ade80',
  },
  {
    id: 'heavy_stock',
    name: '重型枪托',
    description: '伤害+5%，射速-3%',
    damageMultiplier: 1.05,
    armorDamageMultiplier: 1.05,
    rpmMultiplier: 0.97,
    color: '#f97316',
  },

  // ====== 弹药类 ======
  {
    id: 'ap_ammo',
    name: '穿甲弹改装',
    description: '甲伤+15%，肉伤-5%',
    damageMultiplier: 0.95,
    armorDamageMultiplier: 1.15,
    rpmMultiplier: 1.0,
    color: '#c9372c',
  },
  {
    id: 'hp_ammo',
    name: '空尖弹改装',
    description: '肉伤+12%，甲伤-10%',
    damageMultiplier: 1.12,
    armorDamageMultiplier: 0.90,
    rpmMultiplier: 1.0,
    color: '#e0a33e',
  },

  // ====== 特殊类 ======
  {
    id: 'tuned_trigger',
    name: '竞技扳机',
    description: '射速+15%',
    damageMultiplier: 1.0,
    armorDamageMultiplier: 1.0,
    rpmMultiplier: 1.15,
    color: '#34d6e0',
  },
  {
    id: 'suppressed',
    name: '消音器',
    description: '伤害-8%，射速-3%',
    damageMultiplier: 0.92,
    armorDamageMultiplier: 0.92,
    rpmMultiplier: 0.97,
    color: '#555',
  },
  {
    id: 'compensator',
    name: '制退器',
    description: '射速+5%，伤害+2%',
    damageMultiplier: 1.02,
    armorDamageMultiplier: 1.02,
    rpmMultiplier: 1.05,
    color: '#4ade80',
  },
];

// 根据buff IDs计算总倍率
export function calculateBuffMultipliers(buffIds: string[]) {
  let damageMult = 1.0;
  let armorDamageMult = 1.0;
  let rpmMult = 1.0;

  for (const buffId of buffIds) {
    const buff = WEAPON_BUFFS.find((b) => b.id === buffId);
    if (!buff) continue;
    if (buff.damageMultiplier) damageMult *= buff.damageMultiplier;
    if (buff.armorDamageMultiplier) armorDamageMult *= buff.armorDamageMultiplier;
    if (buff.rpmMultiplier) rpmMult *= buff.rpmMultiplier;
  }

  return {
    damageMultiplier: Math.round(damageMult * 1000) / 1000,
    armorDamageMultiplier: Math.round(armorDamageMult * 1000) / 1000,
    rpmMultiplier: Math.round(rpmMult * 1000) / 1000,
  };
}

// 获取buff标签颜色
export function getBuffColor(buffId: string): string {
  const buff = WEAPON_BUFFS.find((b) => b.id === buffId);
  return buff?.color || '#555';
}
