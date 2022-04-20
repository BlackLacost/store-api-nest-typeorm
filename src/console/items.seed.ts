import { CreateItemDto } from '../items/dto/create-item.dto';

export const items: CreateItemDto[] = [
  {
    name: 'Холод 1',
    price: 45000,
    type: 'Холодильник',
    brand: 'Sharp',
    info: [{ title: 'Фрост система' }, { title: 'Мощный движок' }],
  },
  {
    name: 'Холод 2',
    price: 33000,
    type: 'Холодильник',
    brand: 'Electrolux',
    info: [],
  },
  {
    name: 'XS 10',
    price: 145000,
    type: 'Телефон',
    brand: 'Iphone',
    info: [{ title: 'Супер камера' }, { title: '64 GB' }],
  },
  {
    name: '5',
    price: 45000,
    type: 'Телефон',
    brand: 'Iphone',
    info: [{ title: 'Супер камера' }, { title: '256 GB' }],
  },
];
