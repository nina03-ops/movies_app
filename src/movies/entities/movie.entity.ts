import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["title", "userId"])
  export class Movie{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    released: Date;

    @Column()
    genre: string;

    @Column()
    director: string;

    @Column()
    userId: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}
