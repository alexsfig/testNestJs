import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
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
  // get password() L{ return this._password_hash }


  @OneToMany(type => Cats, cat => cat.user)
  cats: Cats[];

  @BeforeInsert()
  updateDates() {
    const passHash = crypto.createHmac('sha256', this.password ).digest('hex');
    this.password = 'lorem idea';
  }

}
