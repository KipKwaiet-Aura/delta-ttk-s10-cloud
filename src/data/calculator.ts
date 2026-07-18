import type { Weapon, Armor, Helmet, HitPart, DamageResult, BulletType } from '@/types';

// ========== 全局默认部位伤害倍率 ==========
export const DEFAULT_PART_MULTIPLIERS: Record<HitPart, number> = {
  head: 1.9,
  chest: 1.0,
  abdomen: 0.9,
  limbs: 0.4,
};

// 从武器profile中获取部位倍率（profile级倍率优先于默认值）
export function getPartMultiplier(weapon: Weapon, bulletType: string, part: HitPart): number {
  const profile = weapon.profiles[bulletType as BulletType];
  return profile?.partMultipliers?.[part] ?? DEFAULT_PART_MULTIPLIERS[part];
}

export const PART_MULTIPLIERS = DEFAULT_PART_MULTIPLIERS;
export const PLAYER_HP = 100;

// ========== 穿透率矩阵（肉伤倍率） ==========
// bulletType × armorLevel → 穿透率
export const PENETRATION_TABLE: Record<BulletType, Record<number, number>> = {
  '1级弹': { 1: 0.50, 2: 0.00, 3: 0.00, 4: 0.00, 5: 0.00, 6: 0.00 },
  '2级弹': { 1: 0.75, 2: 0.50, 3: 0.00, 4: 0.00, 5: 0.00, 6: 0.00 },
  '3级弹': { 1: 1.00, 2: 0.75, 3: 0.50, 4: 0.00, 5: 0.00, 6: 0.00 },
  '3级SUB弹': { 1: 1.00, 2: 0.75, 3: 0.50, 4: 0.00, 5: 0.00, 6: 0.00 },
  '3级apc弹': { 1: 1.00, 2: 0.75, 3: 0.50, 4: 0.00, 5: 0.00, 6: 0.00 },
  '3级肉伤弹': { 1: 0.00, 2: 0.00, 3: 0.00, 4: 0.00, 5: 0.00, 6: 0.00 },
  '3级PLY弹': { 1: 1.00, 2: 0.75, 3: 0.50, 4: 0.00, 5: 0.00, 6: 0.00 },
  '4级弹': { 1: 1.00, 2: 1.00, 3: 0.75, 4: 0.50, 5: 0.00, 6: 0.00 },
  '4级SUB弹': { 1: 1.00, 2: 1.00, 3: 0.75, 4: 0.50, 5: 0.00, 6: 0.00 },
  '4级apc弹': { 1: 1.00, 2: 1.00, 3: 0.75, 4: 0.50, 5: 0.00, 6: 0.00 },
  '4级P弹': { 1: 1.00, 2: 1.00, 3: 0.75, 4: 0.50, 5: 0.00, 6: 0.00 },
  '4级ST弹': { 1: 1.00, 2: 1.00, 3: 0.75, 4: 0.50, 5: 0.00, 6: 0.00 },
  '4级双头弹': { 1: 1.00, 2: 1.00, 3: 0.75, 4: 0.50, 5: 0.40, 6: 0.30 },
  '4级肉伤弹': { 1: 0.00, 2: 0.00, 3: 0.00, 4: 0.00, 5: 0.00, 6: 0.00 },
  '4级PLY弹': { 1: 1.00, 2: 1.00, 3: 0.75, 4: 0.50, 5: 0.00, 6: 0.00 },
  '5级弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 0.75, 5: 0.50, 6: 0.00 },
  '5级SUB弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 0.75, 5: 0.50, 6: 0.00 },
  '5级ST弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 0.75, 5: 0.50, 6: 0.00 },
  '5级P弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 0.75, 5: 0.50, 6: 0.00 },
  '5级PLY弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 0.75, 5: 0.50, 6: 0.00 },
  '6级弹M7': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 0.75, 6: 0.50 },
  '6级弹M61': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 0.75, 6: 0.50 },
  '6级弹SNB': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 0.75, 6: 0.50 },
};

// ========== 护甲伤害衰减倍率矩阵 ==========
// bulletType × armorLevel → 护甲伤害倍率
export const ARMOR_DAMAGE_TABLE: Record<BulletType, Record<number, number>> = {
  '1级弹': { 1: 0.60, 2: 0.60, 3: 0.40, 4: 0.30, 5: 0.20, 6: 0.20 },
  '2级弹': { 1: 0.70, 2: 0.70, 3: 0.70, 4: 0.50, 5: 0.40, 6: 0.30 },
  '3级弹': { 1: 0.90, 2: 0.90, 3: 0.90, 4: 0.90, 5: 0.50, 6: 0.40 },
  '3级SUB弹': { 1: 0.90, 2: 0.90, 3: 0.90, 4: 0.90, 5: 0.50, 6: 0.40 },
  '3级apc弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 0.60, 6: 0.50 },
  '3级肉伤弹': { 1: 0.40, 2: 0.30, 3: 0.20, 4: 0.20, 5: 0.20, 6: 0.20 },
  '3级PLY弹': { 1: 0.90, 2: 0.90, 3: 0.90, 4: 0.90, 5: 0.50, 6: 0.40 },
  '4级弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 1.00, 6: 0.60 },
  '4级SUB弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 1.00, 6: 0.60 },
  '4级apc弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 1.00, 6: 0.70 },
  '4级P弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 1.00, 6: 0.60 },
  '4级ST弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 1.00, 6: 0.60 },
  '4级双头弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 1.00, 6: 1.00 },
  '4级肉伤弹': { 1: 0.40, 2: 0.30, 3: 0.20, 4: 0.20, 5: 0.20, 6: 0.20 },
  '4级PLY弹': { 1: 1.00, 2: 1.00, 3: 1.00, 4: 1.00, 5: 1.00, 6: 0.60 },
  '5级弹': { 1: 1.10, 2: 1.10, 3: 1.10, 4: 1.10, 5: 1.10, 6: 1.10 },
  '5级SUB弹': { 1: 1.10, 2: 1.10, 3: 1.10, 4: 1.10, 5: 1.10, 6: 1.10 },
  '5级ST弹': { 1: 1.10, 2: 1.10, 3: 1.10, 4: 1.10, 5: 1.10, 6: 1.10 },
  '5级P弹': { 1: 1.10, 2: 1.10, 3: 1.10, 4: 1.10, 5: 1.10, 6: 1.10 },
  '5级PLY弹': { 1: 1.10, 2: 1.10, 3: 1.10, 4: 1.10, 5: 1.10, 6: 1.10 },
  '6级弹M7': { 1: 1.10, 2: 1.10, 3: 1.10, 4: 1.10, 5: 1.10, 6: 1.10 },
  '6级弹M61': { 1: 1.20, 2: 1.20, 3: 1.20, 4: 1.20, 5: 1.20, 6: 1.20 },
  '6级弹SNB': { 1: 1.20, 2: 1.20, 3: 1.20, 4: 1.20, 5: 1.20, 6: 1.20 },
};

// 从 bulletType 中提取 bulletLevel 数字
export function getBulletLevel(bulletType: BulletType): number {
  const match = bulletType.match(/^(\d+)级/);
  return match ? parseInt(match[1], 10) : 3;
}

// 获取穿透率（支持"全部"选项字符串）
export function getPenetrationRate(bulletType: string, armorLevel: number): number {
  // 如果是"全部"选项，取该等级下所有具体子弹类型的平均穿透率
  const expanded = expandBulletSelect(bulletType);
  if (expanded.length === 0) return 0;
  let total = 0;
  for (const bt of expanded) {
    total += PENETRATION_TABLE[bt]?.[armorLevel] ?? 0;
  }
  return total / expanded.length;
}

// 获取护甲伤害衰减倍率
export function getArmorDamageFactor(bulletType: BulletType, armorLevel: number): number {
  return ARMOR_DAMAGE_TABLE[bulletType]?.[armorLevel] ?? 1.0;
}

// ========== 逐发迭代模拟击杀 ==========
export function calculateDamage(
  weapon: Weapon,
  armor: Armor,
  hitPart: HitPart,
  bulletType: BulletType,
  helmet?: Helmet,
  includeFirstShot: boolean = true,
): DamageResult {
  const profile = weapon.profiles[bulletType];
  if (!profile) {
    // 该武器不支持此子弹类型，返回空结果
    return {
      weapon,
      armor,
      hitPart,
      helmet: hitPart === 'head' ? helmet : undefined,
      bulletType,
      bulletLevel: getBulletLevel(bulletType),
      armorLevel: armor.level,
      armorBreakShots: 0,
      armorBreakTime: 0,
      damagePerShotArmor: 0,
      killShotsAfterBreak: 0,
      killTimeAfterBreak: 0,
      damagePerShotFlesh: 0,
      totalShots: 0,
      totalTime: 0,
      rating: 'CRITICAL',
    };
  }

  const baseDamage = profile.baseDamage;
  const armorDamage = profile.armorDamage;
  const bulletLevel = getBulletLevel(bulletType);
  const isHead = hitPart === 'head';
  const armorLevel = isHead ? (helmet?.level ?? 0) : armor.level;

  const armorDmgFactor = getArmorDamageFactor(bulletType, armorLevel);
  const trueArmorDmg = armorDamage * armorDmgFactor;
  const partMult = getPartMultiplier(weapon, bulletType, hitPart);
  const partDmg = baseDamage * partMult;
  const penRate = getPenetrationRate(bulletType, armorLevel);

  // 判断部位是否有防护
  let hasProtection: boolean;
  let protectionDur: number;

  if (isHead) {
    hasProtection = helmet !== undefined && helmet.level > 0;
    protectionDur = helmet ? helmet.durability : 0;
  } else if (hitPart === 'chest') {
    hasProtection = armor.coversChest && armor.level > 0;
    protectionDur = armor.coversChest ? armor.durability : 0;
  } else if (hitPart === 'abdomen') {
    hasProtection = armor.coversAbdomen && armor.level > 0;
    protectionDur = armor.coversAbdomen ? armor.durability : 0;
  } else {
    hasProtection = false;
    protectionDur = 0;
  }

  let armorDur = protectionDur;
  let hp = PLAYER_HP;
  let shots = 0;
  let armorBreakShots = 0;
  let armorBreakTime = 0;

  while (hp > 0) {
    shots++;
    const preDur = Math.max(armorDur, 0);

    if (hasProtection && preDur > 0) {
      armorDur -= trueArmorDmg;
      const mitigation = Math.min(preDur / trueArmorDmg, 1.0);
      const bypass = 1.0 - mitigation;
      const actualDmg = partDmg * penRate * mitigation + partDmg * bypass;
      hp -= actualDmg;

      if (armorDur <= 0 && armorBreakShots === 0) {
        armorBreakShots = shots;
        armorBreakTime = (armorBreakShots / weapon.rpm) * 60;
      }
    } else {
      hp -= partDmg;
    }
  }

  if (armorBreakShots === 0 && hasProtection) {
    armorBreakShots = shots;
    armorBreakTime = (armorBreakShots / weapon.rpm) * 60;
  }

  const killShotsAfterBreak = shots - armorBreakShots;
  const killTimeAfterBreak = (killShotsAfterBreak / weapon.rpm) * 60;
  // 计算第一枪：包含第一枪=shots个间隔，不包含=shots-1个间隔（最少0）
  const effectiveShots = includeFirstShot ? shots : Math.max(shots - 1, 0);
  const totalTime = (effectiveShots / weapon.rpm) * 60;
  const rating = getRating(totalTime, hasProtection);

  return {
    weapon,
    armor,
    hitPart,
    helmet: isHead ? helmet : undefined,
    bulletType,
    bulletLevel,
    armorLevel,
    armorBreakShots,
    armorBreakTime,
    damagePerShotArmor: trueArmorDmg,
    killShotsAfterBreak,
    killTimeAfterBreak,
    damagePerShotFlesh: partDmg,
    totalShots: shots,
    totalTime,
    rating,
  };
}

// ========== 评级 ==========
function getRating(ttk: number, hasArmor: boolean): DamageResult['rating'] {
  if (!hasArmor) {
    if (ttk <= 0.4) return 'EXTREME';
    if (ttk <= 0.6) return 'HIGH';
    if (ttk <= 0.9) return 'MODERATE';
    if (ttk <= 1.3) return 'LOW';
    return 'CRITICAL';
  }
  if (ttk <= 0.7) return 'EXTREME';
  if (ttk <= 1.0) return 'HIGH';
  if (ttk <= 1.5) return 'MODERATE';
  if (ttk <= 2.2) return 'LOW';
  return 'CRITICAL';
}

export function getRatingColor(rating: DamageResult['rating']): string {
  switch (rating) {
    case 'EXTREME': return '#34d6e0';
    case 'HIGH': return '#4ade80';
    case 'MODERATE': return '#e0a33e';
    case 'LOW': return '#f97316';
    case 'CRITICAL': return '#c9372c';
  }
}

export function getRatingLabel(rating: DamageResult['rating']): string {
  switch (rating) {
    case 'EXTREME': return '极高';
    case 'HIGH': return '高';
    case 'MODERATE': return '中等';
    case 'LOW': return '低';
    case 'CRITICAL': return '极低';
  }
}

// ========== 格式化 ==========
export function formatTime(seconds: number): string {
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
  return `${seconds.toFixed(2)}s`;
}

export function formatTTK(seconds: number): string {
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)}`;
  return `${seconds.toFixed(2)}`;
}

export function getTTKUnit(seconds: number): string {
  return seconds < 1 ? 'ms' : 's';
}

// ========== 部位中文名 ==========
export function getPartLabel(part: HitPart): string {
  const map: Record<string, string> = { head: '头部', chest: '胸部', abdomen: '腹部', limbs: '四肢' };
  return map[part] || part;
}

// ========== 获取该武器支持的所有子弹类型 ==========
export function getWeaponBulletTypes(weapon: Weapon): BulletType[] {
  return Object.keys(weapon.profiles) as BulletType[];
}

// ========== 获取所有唯一的子弹类型（用于筛选器） ==========
export function getAllBulletTypes(weapons: Weapon[]): BulletType[] {
  const set = new Set<BulletType>();
  for (const w of weapons) {
    for (const bt of Object.keys(w.profiles) as BulletType[]) {
      set.add(bt);
    }
  }
  return Array.from(set).sort();
}

// ========== 按子弹等级分组 ==========
export function groupBulletTypesByLevel(bulletTypes: BulletType[]): Map<number, BulletType[]> {
  const map = new Map<number, BulletType[]>();
  for (const bt of bulletTypes) {
    const level = getBulletLevel(bt);
    const arr = map.get(level) || [];
    arr.push(bt);
    map.set(level, arr);
  }
  return map;
}

// ========== 展开"全部"选项为具体子弹类型列表 ==========
const BULLET_ALL_GROUPS: Record<string, BulletType[]> = {
  '3级全部': ['3级弹', '3级SUB弹', '3级apc弹', '3级肉伤弹', '3级PLY弹'],
  '4级全部': ['4级弹', '4级SUB弹', '4级P弹', '4级ST弹', '4级apc弹', '4级双头弹', '4级肉伤弹', '4级PLY弹'],
  '5级全部': ['5级弹', '5级SUB弹', '5级ST弹', '5级P弹', '5级PLY弹'],
  '6级全部': ['6级弹M7', '6级弹M61', '6级弹SNB'],
};

export function expandBulletSelect(select: string): BulletType[] {
  if (select in BULLET_ALL_GROUPS) {
    return BULLET_ALL_GROUPS[select];
  }
  return [select as BulletType];
}

export function isBulletAllOption(select: string): boolean {
  return select in BULLET_ALL_GROUPS;
}
