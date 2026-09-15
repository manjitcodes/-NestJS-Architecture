import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

const observeAppKey = process.env.OBSERVE_APP_KEY;
const observeAppSecret = process.env.OBSERVE_APP_SECRET;
export const observeEnabled = Boolean(
  observeAppKey &&
    observeAppSecret &&
    observeAppKey !== 'YOUR_APP_KEY' &&
    observeAppSecret !== 'YOUR_APP_SECRET',
);

@Module({
  imports: [
    ...(observeEnabled
      ? [
          ObserveModule.forRoot({
            appKey: observeAppKey!,
            appSecret: observeAppSecret!,
            serviceId: process.env.OBSERVE_SERVICE_ID ?? 'my-notes-api',
          }),
        ]
      : []),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
