import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class MovieDto {
   @ApiProperty()
   @IsNumber()
   id:number;
   
   @ApiProperty()
   @IsString()
   title: string;

   @ApiProperty()
   @IsDate()
   released: Date;

   @ApiProperty()
   @IsString()
   genre: string;

   @ApiProperty()
   @IsString()
   director: string;

   @ApiProperty()
   @IsString()
   userId: number;
}
