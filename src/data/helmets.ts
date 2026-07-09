import type { Helmet } from '@/types';

// 三角洲行动 头盔数据库 (0-6级)

export const helmets: Helmet[] = [
  {
    id: 'none',
    name: '未佩戴头盔',
    durability: 0,
    level: 0,
  },
  {
    id: 'h1_户外棒球',
    name: '户外棒球帽',
    durability: 12,
    level: 1,
  },
  {
    id: 'h1_奔尼帽',
    name: '奔尼帽',
    durability: 10,
    level: 1,
  },
  {
    id: 'h1_安保头盔',
    name: '安保头盔',
    durability: 10,
    level: 1,
  },
  {
    id: 'h1_老式钢盔',
    name: '老式钢盔',
    durability: 10,
    level: 1,
  },
  {
    id: 'h2_MC 防',
    name: 'MC 防弹头盔',
    durability: 20,
    level: 2,
  },
  {
    id: 'h2_复古摩托',
    name: '复古摩托头盔',
    durability: 18,
    level: 2,
  },
  {
    id: 'h2_DRO ',
    name: 'DRO 战术头盔',
    durability: 15,
    level: 2,
  },
  {
    id: 'h2_H01 ',
    name: 'H01 战术头盔',
    durability: 12,
    level: 2,
  },
  {
    id: 'h3_MC20',
    name: 'MC201 防弹头盔',
    durability: 34,
    level: 3,
  },
  {
    id: 'h3_DAS ',
    name: 'DAS 防弹头盔',
    durability: 40,
    level: 3,
  },
  {
    id: 'h3_H07 ',
    name: 'H07 战术头盔',
    durability: 20,
    level: 3,
  },
  {
    id: 'h3_防暴头盔',
    name: '防暴头盔',
    durability: 28,
    level: 3,
  },
  {
    id: 'dich',
    name: 'DICH 训练头盔',
    durability: 35,
    level: 4,
  },
  {
    id: 'gt1',
    name: 'GT1 战术头盔',
    durability: 48,
    level: 4,
  },
  {
    id: 'mhs',
    name: 'MHS 战术头盔',
    durability: 30,
    level: 4,
  },
  {
    id: 'd6',
    name: 'D6 战术头盔',
    durability: 55,
    level: 4,
  },
  {
    id: 'h5_DICH',
    name: 'DICH-1战术头盔',
    durability: 40,
    level: 5,
  },
  {
    id: 'h5_GN 重',
    name: 'GN 重型头盔',
    durability: 50,
    level: 5,
  },
  {
    id: 'h5_H09 ',
    name: 'H09 防暴头盔',
    durability: 45,
    level: 5,
  },
  {
    id: 'h5_Mask',
    name: 'Mask-1铁壁头盔',
    durability: 75,
    level: 5,
  },
  {
    id: 'h5_GN 夜',
    name: 'GN 重型夜视头盔',
    durability: 50,
    level: 5,
  },
  {
    id: 'h5_GN 久',
    name: 'GN 久战重型夜视头盔',
    durability: 20,
    level: 5,
  },
  {
    id: 'h6_dich9',
    name: 'DICH-9 重型头盔',
    durability: 50,
    level: 6,
  },
  {
    id: 'h6_gt5',
    name: 'GT5 指挥官头盔',
    durability: 60,
    level: 6,
  },
  {
    id: 'h6_h70',
    name: 'H70 精英头盔',
    durability: 55,
    level: 6,
  },
  {
    id: 'h6_h70_night',
    name: 'H70 夜视精英头盔',
    durability: 55,
    level: 6,
  },
];

// 按等级获取头盔列表
export function getHelmetsByLevel(level: number): Helmet[] {
  return helmets.filter((h) => h.level === level);
}