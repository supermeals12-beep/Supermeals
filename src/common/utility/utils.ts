import { randomBytes } from 'crypto';

export function generateOrderNumber(prefix = 'ORD'): string {
  // Current timestamp in YYYYMMDDHHMMSS format
  const now = new Date();
  const timestamp =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0');

  // Random 4-character string (hex)
  const randomStr = randomBytes(2).toString('hex').toUpperCase();

  // Final order number
  return `${prefix}-${timestamp}-${randomStr}`;
}


// otp.util.ts
export function generateOtp(length = 5): string {
  // Generate a random number with the specified number of digits
  const min = Math.pow(10, length - 1); // e.g., 10000 for 5 digits
  const max = Math.pow(10, length) - 1; // e.g., 99999 for 5 digits
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
