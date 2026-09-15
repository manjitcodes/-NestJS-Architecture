import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { NotesService } from './notes.service';

interface CreateNoteDto {
  text?: string;
  completed?: boolean;
}

interface UpdateNoteDto {
  text?: string;
  completed?: boolean;
}

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const note = this.notesService.findOne(Number(id));

    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }

    return note;
  }

  @Post()
  create(@Body() body: CreateNoteDto) {
    return this.notesService.create(
      body.text ?? '',
      body.completed ?? false,
    );
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateNoteDto) {
    const note = this.notesService.update(
      Number(id),
      body.text ?? '',
      body.completed ?? false,
    );

    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }

    return note;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const note = this.notesService.remove(Number(id));

    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }

    return note;
  }
}