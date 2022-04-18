import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { Type } from '../../types/entities/type.entity';

@Entity()
export class Item {
  @ApiProperty()
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

  @ApiProperty({ default: 'http://localhost/default.jpg' })
  @Column({ default: 'http://localhost/default.jpg' })
  image: string = 'http://localhost/default.jpg';

  @ApiProperty({ type: () => Type })
  @ManyToOne(() => Type, (type) => type.items, { cascade: true })
  type: Type;

  @ApiProperty({ type: () => Brand })
  @ManyToOne(() => Brand, (brand) => brand.items, { cascade: true })
  brand: Brand;
}
