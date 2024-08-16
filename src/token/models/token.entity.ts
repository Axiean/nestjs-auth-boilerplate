import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TOKEN_TYPE } from '../../shared/types';
import { User } from '../../user/models/user.entity';

@Entity({ name: 'token' })
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'text' })
  token: string;

  @Column({ nullable: false, type: 'enum', enumName: 'TOKEN_TYPE', enum: TOKEN_TYPE })
  type: TOKEN_TYPE;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;
}
