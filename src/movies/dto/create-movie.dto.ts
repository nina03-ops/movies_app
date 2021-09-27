import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;
}
