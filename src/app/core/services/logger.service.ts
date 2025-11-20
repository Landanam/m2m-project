import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${message}`, error);
  }

  warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }

  info(message: string): void {
    console.info(`[INFO] ${message}`);
  }

  debug(message: string): void {
    console.debug(`[DEBUG] ${message}`);
  }
}
