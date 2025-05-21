import { Bento, Department } from '../types/types';

export const bentoOptions: Bento[] = [
  {
    id: 'western',
    name: '洋風弁当',
    price: 400,
    image: 'https://images.pexels.com/photos/5908255/pexels-photo-5908255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'western'
  },
  {
    id: 'japanese',
    name: '和風弁当',
    price: 500,
    image: 'https://images.pexels.com/photos/884596/pexels-photo-884596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'japanese'
  },
  {
    id: 'chinese',
    name: '中華風弁当',
    price: 600,
    image: 'https://images.pexels.com/photos/6646351/pexels-photo-6646351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'chinese'
  }
];

export const departments: Department[] = [
  { id: 'sales', name: '営業部' },
  { id: 'engineering', name: '技術部' },
  { id: 'hr', name: '人事部' },
  { id: 'finance', name: '財務部' },
  { id: 'marketing', name: 'マーケティング部' }
];