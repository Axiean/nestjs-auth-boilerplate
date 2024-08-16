import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { USER_ROLES } from '../../shared/types';
import { Token } from '../../token/models/token.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: USER_ROLES, enumName: 'USER_ROLES' })
  role: USER_ROLES;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ default: false, type: 'boolean' })
  isEmailVerified: boolean;

  @Column({ default: false, type: 'boolean' })
  isPhoneNumberVerified: boolean;

  @Column({ type: 'varchar', length: 80, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  ip: string;

  @Column({ default: false, type: 'boolean' })
  locked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
