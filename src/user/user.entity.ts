import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as crypto from 'crypto';
import { Cats } from '../cats/cats.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30
  })
  public firstName: string;

  @Column({
    length: 50
  })
  public lastName: string;

  @Column({
    length: 50
  })
  public username: string;

  @Column({
    nullable: false,
    select: false,
    length: 250,
  })
  public password: string;

  @OneToMany(type => Cats, cat => cat.user)
  cats: Cats[];

  @BeforeInsert()
  createPassword() {
    const passHash = crypto.createHmac('sha256', this.password ).digest('hex');
    this.password = passHash;
  }
  @BeforeUpdate()
  updatePassword() {
    const passHash = crypto.createHmac('sha256', this.password ).digest('hex');
    this.password = passHash;
  }

}
