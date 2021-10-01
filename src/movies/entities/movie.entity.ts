import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["title", "userId"])
  export class Movie{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @Column({nullable: true})
    released: Date;

    @Column({nullable: true})
    genre: string;

    @Column({nullable: true})
    director: string;

    @Column({nullable: true})
    userId: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}
