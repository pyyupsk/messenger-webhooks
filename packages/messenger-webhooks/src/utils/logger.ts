export const colors = {
  reset: "\x1b[0m",
  gray: "\x1b[90m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

const prefix = `${colors.gray}[bot]${colors.reset}`;

/** A logger utility for logging messages with different severity levels. */
export const logger = {
  /**
   * Logs a general message.
   * @param args - The message or values to log.
   */
  log: (...args: unknown[]): void => {
    console.log(prefix, ...args);
  },

  /**
   * Logs an informational message, with a blue `[info]` tag.
   * @param args - The message or values to log.
   */
  info: (...args: unknown[]): void => {
    console.log(prefix, `${colors.blue}[info]${colors.reset}`, ...args);
  },

  /**
   * Logs a warning message, with a yellow `[warn]` tag.
   * @param args - The message or values to log.
   */
  warn: (...args: unknown[]): void => {
    console.log(prefix, `${colors.yellow}[warn]${colors.reset}`, ...args);
  },

  /**
   * Logs an error message, with a red `[error]` tag, and exits the process.
   * @param args - The message or values to log.
   */
  error: (...args: unknown[]): void => {
    console.log(prefix, `${colors.red}[error]${colors.reset}`, ...args);
    process.exit(1); // Exit the process with an error code
  },
};
