import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // GET /notes
  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  // GET /notes/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(Number(id));
  }

  // POST /notes
  @Post()
  create(@Body() body: { text: string }) {
    return this.notesService.create(body.text);
  }

  // PUT /notes/:id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { text: string; completed: boolean },
  ) {
    return this.notesService.update(
      Number(id),
      body.text,
      body.completed,
    );
  }

  // DELETE /notes/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(Number(id));
  }
}