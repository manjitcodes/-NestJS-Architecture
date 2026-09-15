import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {
  private notes: Array<{ id: number; text: string; completed: boolean }> = [];
  private nextId = 1;

  findAll() {
    return this.notes;
  }

  findOne(id: number) {
    return this.notes.find((note) => note.id === id);
  }

  create(text: string, completed?: boolean) {
    const note = {
      id: this.nextId++,
      text,
      completed: completed ?? false,
    };

    this.notes.push(note);

    return note;
  }

  update(id: number, text: string, completed: boolean) {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      return undefined;
    }

    note.text = text;
    note.completed = completed;

    return note;
  }

  remove(id: number) {
    const index = this.notes.findIndex((note) => note.id === id);

    if (index === -1) {
      return undefined;
    }

    return this.notes.splice(index, 1)[0];
  }
}