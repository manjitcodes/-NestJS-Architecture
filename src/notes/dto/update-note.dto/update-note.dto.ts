import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  completed: boolean;
}