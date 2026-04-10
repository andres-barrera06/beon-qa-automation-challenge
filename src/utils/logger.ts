import { TestInfo } from '@playwright/test';

type LogLevel = 'info' | 'warn' | 'error' | 'step';

export class Logger {
  private testName: string;

  constructor(testInfo: TestInfo) {
    this.testName = testInfo.title;
  }

  private log(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    const prefix = level.toUpperCase().padEnd(5);
    console.log(`[${prefix}] [${this.testName}] ${timestamp} — ${message}`);
  }

  info(message: string) { this.log('info', message); }
  warn(message: string) { this.log('warn', message); }
  error(message: string) { this.log('error', message); }
  step(message: string) { this.log('step', message); }
}
