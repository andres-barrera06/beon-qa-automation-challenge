type LogLevel = 'info' | 'warn' | 'error' | 'step';

const colors = {
  info: '\x1b[36m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
  step: '\x1b[32m',
  reset: '\x1b[0m',
} as const;

function log(level: LogLevel, message: string) {
  const timestamp = new Date().toISOString();
  const color = colors[level];
  const prefix = level.toUpperCase().padEnd(5);
  console.log(`${color}[${prefix}]${colors.reset} ${timestamp} — ${message}`);
}

export const logger = {
  info: (message: string) => log('info', message),
  warn: (message: string) => log('warn', message),
  error: (message: string) => log('error', message),
  step: (message: string) => log('step', message),
};
