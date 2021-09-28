import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
}
