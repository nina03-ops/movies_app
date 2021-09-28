import { ApiProperty } from "@nestjs/swagger";

export class MovieDto {
   @ApiProperty()
   id:number;
   
   @ApiProperty()
   title: string;

   @ApiProperty()
   released: Date;

   @ApiProperty()
   genre: string;

   @ApiProperty()
   director: string;
}
