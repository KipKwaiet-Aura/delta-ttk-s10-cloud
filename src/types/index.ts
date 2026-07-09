// ==================== 基础枚举 ====================

export type WeaponCategory = 'assault_rifle' | 'smg' | 'dmr' | 'lmg' | 'sniper';

export type HitPart = 'head' | 'chest' | 'abdomen' | 'limbs';

export type ArmorType = string;
export type HelmetType = string;

// 具体子弹类型
export type BulletType =
  | '1级弹' | '2级弹'
  | '3级弹' | '3级SUB弹' | '3级apc弹' | '3级肉伤弹' | '3级PLY弹'
  | '4级弹' | '4级SUB弹' | '4级P弹' | '4级ST弹' | '4级apc弹' | '4级双头弹' | '4级肉伤弹' | '4级PLY弹'
  | '5级弹' | '5级SUB弹' | '5级ST弹' | '5级P弹' | '5级PLY弹'
  | '6级弹M7' | '6级弹M61' | '6级弹SNB';

// 子弹选择器选项（含"全部"分组选项）
export type BulletSelectOption = BulletType | '3级全部' | '4级全部' | '5级全部' | '6级全部';

// ==================== 武器数据 ====================

export interface WeaponPartMultipliers {
  head: number;
  chest: number;
  abdomen: number;
  limbs: number;
}

// 每种子弹类型对应的伤害参数（含独立部位倍率）
export interface DamageProfile {
  baseDamage: number;
  armorDamage: number;
  partMultipliers: WeaponPartMultipliers;
}

export interface Weapon {
  id: string;
  name: string;
  suffix?: string;           // 独特后缀，如 "+焰魂枪管"
  category: WeaponCategory;
  rpm: number;
  caliber: string;
  // 该武器支持的所有子弹类型及其参数（含独立部位倍率）
  profiles: Partial<Record<BulletType, DamageProfile>>;
  isPlaceholder?: boolean;
}

// ==================== 防具数据 ====================

export interface Helmet {
  id: HelmetType;
  name: string;
  durability: number;
  level: number;  // 0-6
}

export interface Armor {
  id: ArmorType;
  name: string;
  durability: number;
  coversChest: boolean;
  coversAbdomen: boolean;
  coversShoulder?: boolean;
  level: number;  // 0-6
}

// ==================== 计算结果 ====================

export interface DamageResult {
  weapon: Weapon;
  armor: Armor;
  hitPart: HitPart;
  helmet?: Helmet;

  // 实际计算参数
  bulletType: BulletType;
  bulletLevel: number;
  armorLevel: number;

  // 碎甲阶段
  armorBreakShots: number;
  armorBreakTime: number;
  damagePerShotArmor: number;

  // 击杀阶段
  killShotsAfterBreak: number;
  killTimeAfterBreak: number;
  damagePerShotFlesh: number;

  // 总计
  totalShots: number;
  totalTime: number;

  rating: 'EXTREME' | 'HIGH' | 'MODERATE' | 'LOW' | 'CRITICAL';
  isCustomized?: boolean;
}

// ==================== Buff系统 ====================

export interface WeaponBuff {
  id: string;
  name: string;
  description: string;
  damageMultiplier?: number;
  armorDamageMultiplier?: number;
  rpmMultiplier?: number;
  color: string;
}

// ==================== 筛选状态 ====================

export interface FilterState {
  armorTypes: ArmorType[];
  helmetTypes: HelmetType[];
  hitPart: HitPart;
  bulletSelect: BulletSelectOption;  // 选择的子弹（含"全部"选项）
  armorLevel: number;                // 护甲等级 0-6
  helmetLevel: number;               // 头盔等级 0-6（独立于护甲）
  sortBy: 'ttk' | 'btk' | 'rpm';
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
  categoryFilter: WeaponCategory | 'all';
}

// ==================== 武器覆盖配置 ====================

export interface WeaponOverride {
  weaponId: string;
  bulletType: BulletType;
  baseDamage?: number;
  armorDamage?: number;
  rpm?: number;
  activeBuffs: string[];
  partMultipliers?: WeaponPartMultipliers;
}
