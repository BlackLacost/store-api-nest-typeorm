import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from '../brands/brand.entity';
import { Type } from '../types/type.entity';
import { ItemInfo } from './item-info.entity';

@Entity()
export class Item {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty({ type: Number })
  @Column({
    type: 'decimal',
    scale: 2,
    default: 0,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  price: number;

  @ApiProperty({ default: 'default.jpg' })
  @Column({
    default: 'default.jpg',
    transformer: {
      to(filename) {
        return filename;
      },
      from(filename) {
        return `http://localhost:5000/item-images/${filename}`;
      },
    },
  })
  image: string = 'default.jpg';

  @ApiProperty({ type: () => Type })
  @ManyToOne(() => Type, (type) => type.items, { cascade: true })
  type: Type;

  @ApiProperty({ type: () => Brand })
  @ManyToOne(() => Brand, (brand) => brand.items, { cascade: true })
  brand: Brand;

  @ApiProperty({ type: () => [ItemInfo] })
  @OneToMany(() => ItemInfo, (itemInfo) => itemInfo.item, { cascade: true })
  itemInfos: ItemInfo[];
}
