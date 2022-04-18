import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { Type } from '../../types/entities/type.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  image: string;

  @ManyToOne(() => Type, (type) => type.items)
  type: Type;

  @ManyToOne(() => Brand, (brand) => brand.items)
  brand: Brand;
}
