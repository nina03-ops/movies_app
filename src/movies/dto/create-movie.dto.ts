import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
    @ApiProperty()
    title: string;
}
