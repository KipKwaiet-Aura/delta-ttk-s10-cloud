import type { Weapon } from '@/types';

// 三角洲行动 武器数据库
// 每把武器包含多种子弹类型的伤害参数和独立部位倍率

export const weapons: Weapon[] = [
  {
    id: 'ak12',
    name: 'AK-12',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 735,
    caliber: '5.45×39mm',
    profiles: {
      '1级弹': { baseDamage: 33, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '2级弹': { baseDamage: 33, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '3级弹': { baseDamage: 30, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级弹': { baseDamage: 30, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级P弹': { baseDamage: 33, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级ST弹': { baseDamage: 30, armorDamage: 42, partMultipliers: { head: 2.2, chest: 1, abdomen: 0.9, limbs: 0.39375 } },
      '5级弹': { baseDamage: 30, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '5级ST弹': { baseDamage: 30, armorDamage: 42, partMultipliers: { head: 2.2, chest: 1, abdomen: 0.99452, limbs: 0.39375 } }
    },
  },
  {
    id: 'akm',
    name: 'AKM',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 600,
    caliber: '7.62×39mm',
    profiles: {
      '1级弹': { baseDamage: 44, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 44, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 40, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 40, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级SUB弹': { baseDamage: 42, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 40, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级SUB弹': { baseDamage: 42, armorDamage: 39.9, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'akm_performance',
    name: 'AKM',
    suffix: '+性能枪管',
    category: 'assault_rifle' as const,
    rpm: 600,
    caliber: '7.62×39mm',
    profiles: {
      '1级弹': { baseDamage: 44, armorDamage: 42, partMultipliers: { head: 2.5, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 44, armorDamage: 42, partMultipliers: { head: 2.5, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 40, armorDamage: 42, partMultipliers: { head: 2.5, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 40, armorDamage: 42, partMultipliers: { head: 2.5, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级SUB弹': { baseDamage: 42, armorDamage: 42, partMultipliers: { head: 2.5, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 40, armorDamage: 42, partMultipliers: { head: 2.5, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级SUB弹': { baseDamage: 42, armorDamage: 39.9, partMultipliers: { head: 2.5, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'aks74u',
    name: 'AKS-74U',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 533,
    caliber: '5.45×39mm',
    profiles: {
      '1级弹': { baseDamage: 37.4, armorDamage: 36, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 37.4, armorDamage: 36, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 34, armorDamage: 36, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 34, armorDamage: 36, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级P弹': { baseDamage: 37.4, armorDamage: 36, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级ST弹': { baseDamage: 34, armorDamage: 36, partMultipliers: { head: 2.2, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '5级弹': { baseDamage: 34, armorDamage: 36, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级ST弹': { baseDamage: 34, armorDamage: 36, partMultipliers: { head: 2.2, chest: 1, abdomen: 0.99452, limbs: 0.35 } }
    },
  },
  {
    id: 'ar57',
    name: 'AR57',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 900,
    caliber: '5.7×28mm',
    profiles: {
      '1级弹': { baseDamage: 36, armorDamage: 31, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 36, armorDamage: 31, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 30, armorDamage: 31, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 42, armorDamage: 31, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 30, armorDamage: 31, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 30, armorDamage: 31, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'ash12',
    name: 'ASh-12',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 500,
    caliber: '12.7×55mm',
    profiles: {
      '3级弹': { baseDamage: 56, armorDamage: 55, partMultipliers: { head: 1.6, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级弹': { baseDamage: 56, armorDamage: 55, partMultipliers: { head: 1.6, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级双头弹': { baseDamage: 74.032, armorDamage: 11, partMultipliers: { head: 1.6, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '5级弹': { baseDamage: 56, armorDamage: 55, partMultipliers: { head: 1.6, chest: 1, abdomen: 0.9, limbs: 0.45 } }
    },
  },
  {
    id: 'ash12_battleaxe',
    name: 'ASh-12',
    suffix: '+战斧重型枪管',
    category: 'assault_rifle' as const,
    rpm: 400,
    caliber: '12.7×55mm',
    profiles: {
      '3级弹': { baseDamage: 75, armorDamage: 40, partMultipliers: { head: 1.75, chest: 1, abdomen: 0.7, limbs: 0.25 } },
      '4级弹': { baseDamage: 75, armorDamage: 40, partMultipliers: { head: 1.75, chest: 1, abdomen: 0.7, limbs: 0.25 } },
      '4级双头弹': { baseDamage: 99.15, armorDamage: 8, partMultipliers: { head: 1.75, chest: 1, abdomen: 0.7, limbs: 0.25 } },
      '5级弹': { baseDamage: 75, armorDamage: 40, partMultipliers: { head: 1.75, chest: 1, abdomen: 0.7, limbs: 0.25 } }
    },
  },
  {
    id: 'ash12_hvk',
    name: 'ASh-12',
    suffix: '+HVK双发套件',
    category: 'assault_rifle' as const,
    rpm: 400,
    caliber: '12.7×55mm',
    profiles: {
      '3级弹': { baseDamage: 84, armorDamage: 90, partMultipliers: { head: 1.6, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级弹': { baseDamage: 84, armorDamage: 90, partMultipliers: { head: 1.6, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级双头弹': { baseDamage: 111.048, armorDamage: 18, partMultipliers: { head: 1.6, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '5级弹': { baseDamage: 84, armorDamage: 90, partMultipliers: { head: 1.6, chest: 1, abdomen: 0.9, limbs: 0.45 } }
    },
  },
  {
    id: 'asval',
    name: 'AS VAL',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 972,
    caliber: '9×39mm',
    profiles: {
      '3级弹': { baseDamage: 28, armorDamage: 44, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 28, armorDamage: 44, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 28, armorDamage: 44, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'asval_ass',
    name: 'AS VAL',
    suffix: '+刺客',
    category: 'assault_rifle' as const,
    rpm: 680,
    caliber: '9×39mm',
    profiles: {
      '3级弹': { baseDamage: 37, armorDamage: 48, partMultipliers: { head: 1.7, chest: 1, abdomen: 1, limbs: 0.6 } },
      '4级弹': { baseDamage: 37, armorDamage: 48, partMultipliers: { head: 1.7, chest: 1, abdomen: 1, limbs: 0.6 } },
      '5级弹': { baseDamage: 37, armorDamage: 48, partMultipliers: { head: 1.7, chest: 1, abdomen: 1, limbs: 0.6 } }
    },
  },
  {
    id: 'aug',
    name: 'AUG',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 679,
    caliber: '5.56×45mm',
    profiles: {
      '1级弹': { baseDamage: 35.2, armorDamage: 35, partMultipliers: { head: 2, chest: 1.1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 35.2, armorDamage: 35, partMultipliers: { head: 2, chest: 1.1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 2, chest: 1.1, abdomen: 0.9, limbs: 0.4 } },
      '3级apc弹': { baseDamage: 32, armorDamage: 40, partMultipliers: { head: 2, chest: 1.1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 2, chest: 1.1, abdomen: 0.9, limbs: 0.4 } },
      '4级apc弹': { baseDamage: 35.2, armorDamage: 40, partMultipliers: { head: 2, chest: 1.1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 2, chest: 1.1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'car15',
    name: 'CAR-15',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 632,
    caliber: '5.56×45mm',
    profiles: {
      '1级弹': { baseDamage: 29.7, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 29.7, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 27, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级apc弹': { baseDamage: 27, armorDamage: 36.8, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 27, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级apc弹': { baseDamage: 29.7, armorDamage: 36.8, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 27, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'g3',
    name: 'G3',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 533,
    caliber: '7.62×51mm',
    profiles: {
      '2级弹': { baseDamage: 42.9, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 39, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 39, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 39, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹M61': { baseDamage: 39, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'k416',
    name: 'K416',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 880,
    caliber: '5.56×45mm',
    profiles: {
      '1级弹': { baseDamage: 34.1, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 34.1, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 31, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级apc弹': { baseDamage: 31, armorDamage: 40.25, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 31, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级apc弹': { baseDamage: 34.1, armorDamage: 40.25, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 31, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'k437',
    name: 'K437',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 780,
    caliber: '.300 BLK',
    profiles: {
      '3级弹': { baseDamage: 36, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级SUB弹': { baseDamage: 37.8, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 36, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级SUB弹': { baseDamage: 37.8, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 36, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'kc17',
    name: 'KC17',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 740,
    caliber: '5.45×39mm',
    profiles: {
      '1级弹': { baseDamage: 34.1, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 34.1, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 31, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 31, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级P弹': { baseDamage: 34.1, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级ST弹': { baseDamage: 31, armorDamage: 48, partMultipliers: { head: 2.2, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '5级弹': { baseDamage: 31, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级ST弹': { baseDamage: 31, armorDamage: 48, partMultipliers: { head: 2.2, chest: 1, abdomen: 0.99452, limbs: 0.35 } }
    },
  },
  {
    id: 'm16a4',
    name: 'M16A4',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 508,
    caliber: '5.56×45mm',
    profiles: {
      '1级弹': { baseDamage: 36.3, armorDamage: 39, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 36.3, armorDamage: 39, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 33, armorDamage: 39, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级apc弹': { baseDamage: 33, armorDamage: 44.85, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 33, armorDamage: 39, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级apc弹': { baseDamage: 36.3, armorDamage: 44.85, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 33, armorDamage: 39, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'm4a1',
    name: 'M4A1',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 800,
    caliber: '5.56×45mm',
    profiles: {
      '1级弹': { baseDamage: 34.1, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 34.1, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 31, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级apc弹': { baseDamage: 31, armorDamage: 37.95, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 31, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级apc弹': { baseDamage: 34.1, armorDamage: 37.95, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 31, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'm7',
    name: 'M7',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 649,
    caliber: '6.8×51mm',
    profiles: {
      '3级PLY弹': { baseDamage: 37, armorDamage: 36, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '4级弹': { baseDamage: 37, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '4级PLY弹': { baseDamage: 37, armorDamage: 36, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '5级弹': { baseDamage: 37, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '5级PLY弹': { baseDamage: 37, armorDamage: 36, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '6级弹M7': { baseDamage: 37, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } }
    },
  },
  {
    id: 'm7_df',
    name: 'M7',
    suffix: '+堤风',
    category: 'assault_rifle' as const,
    rpm: 649,
    caliber: '6.8×51mm',
    profiles: {
      '3级PLY弹': { baseDamage: 39, armorDamage: 37.8, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '4级弹': { baseDamage: 39, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '4级PLY弹': { baseDamage: 39, armorDamage: 37.8, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '5级弹': { baseDamage: 39, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '5级PLY弹': { baseDamage: 39, armorDamage: 37.8, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } },
      '6级弹M7': { baseDamage: 39, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.35 } }
    },
  },
  {
    id: 'mcx_lt',
    name: 'MCX LT',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 840,
    caliber: '.300 BLK',
    profiles: {
      '3级弹': { baseDamage: 34, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '3级SUB弹': { baseDamage: 35.7, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '4级弹': { baseDamage: 34, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '4级SUB弹': { baseDamage: 35.7, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '5级弹': { baseDamage: 34, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } }
    },
  },
  {
    id: 'mcx_lt_soul',
    name: 'MCX LT',
    suffix: '+焰魂枪管',
    category: 'assault_rifle' as const,
    rpm: 840,
    caliber: '.300 BLK',
    profiles: {
      '3级弹': { baseDamage: 36, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '3级SUB弹': { baseDamage: 37.8, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '4级弹': { baseDamage: 36, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '4级SUB弹': { baseDamage: 37.8, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '5级弹': { baseDamage: 36, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } }
    },
  },
  {
    id: 'mcx_lt_soul_sur',
    name: 'MCX LT',
    suffix: '+焰魂枪管+隔热罩',
    category: 'assault_rifle' as const,
    rpm: 870,
    caliber: '.300 BLK',
    profiles: {
      '3级弹': { baseDamage: 36, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '3级SUB弹': { baseDamage: 37.8, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '4级弹': { baseDamage: 36, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '4级SUB弹': { baseDamage: 37.8, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } },
      '5级弹': { baseDamage: 36, armorDamage: 26, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.35 } }
    },
  },
  {
    id: 'mk47',
    name: 'MK47',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 625,
    caliber: '7.62×39mm',
    profiles: {
      '1级弹': { baseDamage: 46.2, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 46.2, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 42, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 42, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级SUB弹': { baseDamage: 44.1, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 42, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级SUB弹': { baseDamage: 44.1, armorDamage: 43.7, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'mk47_ember',
    name: 'MK47',
    suffix: '+余烬枪管',
    category: 'assault_rifle' as const,
    rpm: 625,
    caliber: '7.62×39mm',
    profiles: {
      '1级弹': { baseDamage: 49.5, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 49.5, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 45, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 45, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级SUB弹': { baseDamage: 47.25, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 45, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级SUB弹': { baseDamage: 47.25, armorDamage: 43.7, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'mk47_war',
    name: 'MK47',
    suffix: '+鏖战枪管',
    category: 'assault_rifle' as const,
    rpm: 625,
    caliber: '7.62×39mm',
    profiles: {
      '1级弹': { baseDamage: 50.6, armorDamage: 47, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 50.6, armorDamage: 47, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 46, armorDamage: 47, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 46, armorDamage: 47, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级SUB弹': { baseDamage: 48.3, armorDamage: 47, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 46, armorDamage: 47, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级SUB弹': { baseDamage: 48.3, armorDamage: 44.65, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'ptr32',
    name: 'PTR-32',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 632,
    caliber: '7.62×39mm',
    profiles: {
      '1级弹': { baseDamage: 39.6, armorDamage: 37, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 39.6, armorDamage: 37, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 36, armorDamage: 37, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 36, armorDamage: 37, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级SUB弹': { baseDamage: 37.8, armorDamage: 37, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 36, armorDamage: 37, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级SUB弹': { baseDamage: 37.8, armorDamage: 35.15, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'qbz95',
    name: 'QBZ95-1',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 679,
    caliber: '5.8×42mm',
    profiles: {
      '2级弹': { baseDamage: 30.8, armorDamage: 42, partMultipliers: { head: 2.3, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 28, armorDamage: 42, partMultipliers: { head: 2.3, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 28, armorDamage: 42, partMultipliers: { head: 2.3, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级P弹': { baseDamage: 28, armorDamage: 42, partMultipliers: { head: 2.3, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 28, armorDamage: 42, partMultipliers: { head: 2.3, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级P弹': { baseDamage: 28, armorDamage: 42, partMultipliers: { head: 2.3, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'rm277',
    name: 'RM277',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 550,
    caliber: '6.8×51mm',
    profiles: {
      '3级PLY弹': { baseDamage: 41, armorDamage: 37.8, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.4 } },
      '4级弹': { baseDamage: 41, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.4 } },
      '4级PLY弹': { baseDamage: 41, armorDamage: 37.8, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.4 } },
      '5级弹': { baseDamage: 41, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.4 } },
      '5级PLY弹': { baseDamage: 41, armorDamage: 37.8, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.4 } },
      '6级弹M7': { baseDamage: 41, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.4 } }
    },
  },
  {
    id: 'scarh',
    name: 'SCAR-H',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 585,
    caliber: '7.62×51mm',
    profiles: {
      '2级弹': { baseDamage: 44, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 40, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 40, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 40, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹M61': { baseDamage: 40, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'sg552',
    name: 'SG552',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 906,
    caliber: '5.56×45mm',
    profiles: {
      '1级弹': { baseDamage: 27.5, armorDamage: 34, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 27.5, armorDamage: 34, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 25, armorDamage: 34, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级apc弹': { baseDamage: 25, armorDamage: 39.1, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 25, armorDamage: 34, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级apc弹': { baseDamage: 27.5, armorDamage: 39.1, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 25, armorDamage: 34, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'type191',
    name: '腾龙',
    suffix: undefined,
    category: 'assault_rifle' as const,
    rpm: 706,
    caliber: '5.8×42mm',
    profiles: {
      '2级弹': { baseDamage: 38.5, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级P弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级P弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'type191_speed',
    name: '腾龙',
    suffix: '+高速导气',
    category: 'assault_rifle' as const,
    rpm: 759,
    caliber: '5.8×42mm',
    profiles: {
      '2级弹': { baseDamage: 38.5, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级P弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级P弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'type191_stable',
    name: '腾龙',
    suffix: '+稳固导气',
    category: 'assault_rifle' as const,
    rpm: 660,
    caliber: '5.8×42mm',
    profiles: {
      '2级弹': { baseDamage: 38.5, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级P弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级P弹': { baseDamage: 35, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'bizon',
    name: '野牛',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 659,
    caliber: '9x19mm',
    profiles: {
      '1级弹': { baseDamage: 35.2, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 35.2, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 44.8, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级肉伤弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.7 } },
      '5级弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'mk4',
    name: 'MK4',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 793,
    caliber: '4.6x30mm',
    profiles: {
      '3级弹': { baseDamage: 34, armorDamage: 30, partMultipliers: { head: 2, chest: 1, abdomen: 1, limbs: 0.5 } },
      '4级弹': { baseDamage: 34, armorDamage: 30, partMultipliers: { head: 2, chest: 1, abdomen: 1, limbs: 0.5 } },
      '5级弹': { baseDamage: 34, armorDamage: 30, partMultipliers: { head: 2, chest: 1, abdomen: 1, limbs: 0.5 } }
    },
  },
  {
    id: 'mk4_auto',
    name: 'MK4',
    suffix: '+全自动',
    category: 'smg' as const,
    rpm: 872,
    caliber: '4.6x30mm',
    profiles: {
      '3级弹': { baseDamage: 32, armorDamage: 27, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 32, armorDamage: 27, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 32, armorDamage: 27, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'mp5',
    name: 'MP5',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 820,
    caliber: '9x19mm',
    profiles: {
      '1级弹': { baseDamage: 33, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 33, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 30, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 42, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 30, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级肉伤弹': { baseDamage: 30, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.7 } },
      '5级弹': { baseDamage: 30, armorDamage: 32, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'mp7',
    name: 'MP7',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 950,
    caliber: '4.6x30mm',
    profiles: {
      '3级弹': { baseDamage: 32, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 32, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 32, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'mp7_battle',
    name: 'MP7',
    suffix: '+格斗套件',
    category: 'smg' as const,
    rpm: 950,
    caliber: '4.6x30mm',
    profiles: {
      '3级弹': { baseDamage: 37, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.4 } },
      '4级弹': { baseDamage: 37, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.4 } },
      '5级弹': { baseDamage: 37, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.4 } }
    },
  },
  {
    id: 'p90',
    name: 'P90',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 898,
    caliber: '5.7×28mm',
    profiles: {
      '1级弹': { baseDamage: 38.4, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 38.4, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 44.8, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 32, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'qcq171',
    name: 'QCQ171',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 763,
    caliber: '9x19mm',
    profiles: {
      '1级弹': { baseDamage: 39.6, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 39.6, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 50.4, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级肉伤弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.7 } },
      '5级弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'qcq171_speed',
    name: 'QCQ171',
    suffix: '+高速导气',
    category: 'smg' as const,
    rpm: 848,
    caliber: '9x19mm',
    profiles: {
      '1级弹': { baseDamage: 39.6, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 39.6, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 50.4, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级肉伤弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.7 } },
      '5级弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'qcq171_stable',
    name: 'QCQ171',
    suffix: '+稳固导气',
    category: 'smg' as const,
    rpm: 694,
    caliber: '9x19mm',
    profiles: {
      '1级弹': { baseDamage: 39.6, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 39.6, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 50.4, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级肉伤弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.7 } },
      '5级弹': { baseDamage: 36, armorDamage: 33, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'smg',
    name: 'SMG',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 605,
    caliber: '.45 ACP',
    profiles: {
      '1级弹': { baseDamage: 38.5, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '2级弹': { baseDamage: 38.5, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '3级弹': { baseDamage: 35, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '3级肉伤弹': { baseDamage: 47.25, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级弹': { baseDamage: 35, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级肉伤弹': { baseDamage: 35, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.72 } },
      '5级弹': { baseDamage: 29.75, armorDamage: 40, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } }
    },
  },
  {
    id: 'sr-3m',
    name: 'SR-3M',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 747,
    caliber: '9×39mm',
    profiles: {
      '3级弹': { baseDamage: 36, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 36, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 36, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'uzi',
    name: 'Uzi',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 780,
    caliber: '9x19mm',
    profiles: {
      '1级弹': { baseDamage: 30.8, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 30.8, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 28, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 39.2, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 28, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级肉伤弹': { baseDamage: 28, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.7 } },
      '5级弹': { baseDamage: 28, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'vector',
    name: 'Vector',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 1091,
    caliber: '.45 ACP',
    profiles: {
      '1级弹': { baseDamage: 35.2, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 35.2, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 32, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 43.2, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 32, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级肉伤弹': { baseDamage: 32, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.64 } },
      '5级弹': { baseDamage: 27.2, armorDamage: 28, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'warrior',
    name: '勇士',
    suffix: undefined,
    category: 'smg' as const,
    rpm: 700,
    caliber: '9x19mm',
    profiles: {
      '1级弹': { baseDamage: 39.6, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 39.6, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 36, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级肉伤弹': { baseDamage: 50.4, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 36, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级肉伤弹': { baseDamage: 36, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.7 } },
      '5级弹': { baseDamage: 36, armorDamage: 35, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'm249',
    name: 'M249',
    suffix: undefined,
    category: 'lmg' as const,
    rpm: 858,
    caliber: '5.56×45mm',
    profiles: {
      '1级弹': { baseDamage: 33, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 33, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 30, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级apc弹': { baseDamage: 30, armorDamage: 43.7, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 30, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级apc弹': { baseDamage: 33, armorDamage: 43.7, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 30, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'm249_chain',
    name: 'M249',
    suffix: '+链锯套件',
    category: 'lmg' as const,
    rpm: 944,
    caliber: '5.56×45mm',
    profiles: {
      '1级弹': { baseDamage: 33, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 33, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 30, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级apc弹': { baseDamage: 30, armorDamage: 43.7, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 30, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级apc弹': { baseDamage: 33, armorDamage: 43.7, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 30, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'm250',
    name: 'M250',
    suffix: undefined,
    category: 'lmg' as const,
    rpm: 550,
    caliber: '6.8×51mm',
    profiles: {
      '3级PLY弹': { baseDamage: 55, armorDamage: 47.7, partMultipliers: { head: 1.82, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 55, armorDamage: 53, partMultipliers: { head: 1.82, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级PLY弹': { baseDamage: 55, armorDamage: 47.7, partMultipliers: { head: 1.82, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 55, armorDamage: 53, partMultipliers: { head: 1.82, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级PLY弹': { baseDamage: 55, armorDamage: 47.7, partMultipliers: { head: 1.82, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹M7': { baseDamage: 55, armorDamage: 53, partMultipliers: { head: 1.82, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'pkm',
    name: 'PKM',
    suffix: undefined,
    category: 'lmg' as const,
    rpm: 669,
    caliber: '7.62×54mm',
    profiles: {
      '3级弹': { baseDamage: 45, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 45, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 45, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹SNB': { baseDamage: 45, armorDamage: 42, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'qjb201',
    name: 'QJB201',
    suffix: undefined,
    category: 'lmg' as const,
    rpm: 785,
    caliber: '5.8×42mm',
    profiles: {
      '2级弹': { baseDamage: 35.2, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 32, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 32, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 32, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'qjb201_speed',
    name: 'QJB201',
    suffix: '+高速导气',
    category: 'lmg' as const,
    rpm: 873,
    caliber: '5.8×42mm',
    profiles: {
      '2级弹': { baseDamage: 35.2, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 32, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 32, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 32, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'qjb201_stable',
    name: 'QJB201',
    suffix: '+稳固导气',
    category: 'lmg' as const,
    rpm: 714,
    caliber: '5.8×42mm',
    profiles: {
      '2级弹': { baseDamage: 35.2, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 32, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 32, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 32, armorDamage: 38, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'lever_action_rifle',
    name: '杠杆式步枪',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 100,
    caliber: '.45-70',
    profiles: {
      '3级肉伤弹': { baseDamage: 105, armorDamage: 25, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '4级弹': { baseDamage: 70, armorDamage: 25, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } },
      '5级弹': { baseDamage: 70, armorDamage: 25, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.45 } }
    },
  },
  {
    id: 'm14',
    name: 'M14',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 727,
    caliber: '7.62×51mm',
    profiles: {
      '2级弹': { baseDamage: 42.9, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 39, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 39, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 39, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹M61': { baseDamage: 39, armorDamage: 41, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'mini14',
    name: 'Mini-14',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 590,
    caliber: '5.56×45mm',
    profiles: {
      '1级弹': { baseDamage: 37.4, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.5 } },
      '2级弹': { baseDamage: 37.4, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.5 } },
      '3级弹': { baseDamage: 34, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.5 } },
      '3级apc弹': { baseDamage: 34, armorDamage: 43.7, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.5 } },
      '4级弹': { baseDamage: 34, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.5 } },
      '4级apc弹': { baseDamage: 34, armorDamage: 43.7, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.5 } },
      '5级弹': { baseDamage: 34, armorDamage: 38, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.5 } }
    },
  },
  {
    id: 'psg1',
    name: 'PSG-1',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 300,
    caliber: '7.62×51mm',
    profiles: {
      '2级弹': { baseDamage: 55, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹M61': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'sks',
    name: 'SKS',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 510,
    caliber: '7.62×39mm',
    profiles: {
      '1级弹': { baseDamage: 52.8, armorDamage: 49, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '2级弹': { baseDamage: 52.8, armorDamage: 49, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 48, armorDamage: 49, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 48, armorDamage: 49, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级SUB弹': { baseDamage: 50.4, armorDamage: 49, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 48, armorDamage: 49, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级SUB弹': { baseDamage: 50.4, armorDamage: 46.55, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'sr25',
    name: 'SR-25',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 364,
    caliber: '7.62×51mm',
    profiles: {
      '2级弹': { baseDamage: 55, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } },
      '3级弹': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } },
      '4级弹': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } },
      '5级弹': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } },
      '6级弹M61': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } }
    },
  },
  {
    id: 'sr25_sudden',
    name: 'SR-25',
    suffix: '+瞬息短枪管',
    category: 'dmr' as const,
    rpm: 448,
    caliber: '7.62×51mm',
    profiles: {
      '2级弹': { baseDamage: 60.5, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } },
      '3级弹': { baseDamage: 55, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } },
      '4级弹': { baseDamage: 55, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } },
      '5级弹': { baseDamage: 55, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } },
      '6级弹M61': { baseDamage: 55, armorDamage: 55, partMultipliers: { head: 2.1, chest: 1, abdomen: 1, limbs: 0.5 } }
    },
  },
  {
    id: 'sr9',
    name: 'SR9',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 261,
    caliber: '7.62×51mm',
    profiles: {
      '2级弹': { baseDamage: 55, armorDamage: 55, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '3级弹': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹M61': { baseDamage: 50, armorDamage: 55, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'svch',
    name: 'SVCH',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 600,
    caliber: '7.62×54mm',
    profiles: {
      '3级弹': { baseDamage: 47, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 47, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 47, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹SNB': { baseDamage: 47, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'svch_3',
    name: 'SVCH',
    suffix: '+镀铬枪机',
    category: 'dmr' as const,
    rpm: 700,
    caliber: '7.62×54mm',
    profiles: {
      '3级弹': { baseDamage: 47, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 47, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 47, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹SNB': { baseDamage: 47, armorDamage: 46, partMultipliers: { head: 1.9, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'svd',
    name: 'SVD',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 300,
    caliber: '7.62×54mm',
    profiles: {
      '3级弹': { baseDamage: 56, armorDamage: 56, partMultipliers: { head: 2.32, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '4级弹': { baseDamage: 56, armorDamage: 56, partMultipliers: { head: 2.32, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '5级弹': { baseDamage: 56, armorDamage: 56, partMultipliers: { head: 2.32, chest: 1, abdomen: 0.9, limbs: 0.4 } },
      '6级弹SNB': { baseDamage: 56, armorDamage: 56, partMultipliers: { head: 2.32, chest: 1, abdomen: 0.9, limbs: 0.4 } }
    },
  },
  {
    id: 'vss',
    name: 'VSS',
    suffix: undefined,
    category: 'dmr' as const,
    rpm: 480,
    caliber: '9×39mm',
    profiles: {
      '3级弹': { baseDamage: 40, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.5 } },
      '4级弹': { baseDamage: 40, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.5 } },
      '5级弹': { baseDamage: 40, armorDamage: 48, partMultipliers: { head: 1.9, chest: 1, abdomen: 1, limbs: 0.5 } }
    },
  },
];

// 获取完整武器名称（含后缀）
export function getWeaponFullName(weapon: Weapon): string {
  return weapon.suffix ? `${weapon.name} ${weapon.suffix}` : weapon.name;
}

export function getCategoryLabel(cat: Weapon['category']): string {
  const map: Record<string, string> = {
    assault_rifle: '突击步枪',
    smg: '冲锋枪',
    dmr: '精确射手步枪',
    lmg: '轻机枪',
    sniper: '狙击枪',
  };
  return map[cat] || cat;
}