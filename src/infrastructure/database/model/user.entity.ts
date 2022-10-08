import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from './enums/role';
import { Confidentiality } from './enums/confidentiality';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Role,
    default: Role.MEMBER,
  })
  user_role: Role;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Confidentiality,
    default: Confidentiality.PUBLIC,
  })
  confidentiality: Confidentiality;
}
