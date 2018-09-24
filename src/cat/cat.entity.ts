import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ObjectIdColumn, ObjectID } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('cats')
export class Cat {
  @ObjectIdColumn() id: ObjectID;
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  age: number;

  @Column({ length: 500 })
  breed: string;

  @ManyToOne(type => User, user => user.cats)
  user: User;

}
