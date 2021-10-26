import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class EnumerationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  description: string;
}
