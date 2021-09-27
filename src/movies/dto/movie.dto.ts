import { ApiProperty } from "@nestjs/swagger";

export class MovieDto {
   @ApiProperty()
   id:number;
   
   @ApiProperty()
   title: string;
   
   @ApiProperty()
   description: string;
   
   @ApiProperty()
   price: number;
}
