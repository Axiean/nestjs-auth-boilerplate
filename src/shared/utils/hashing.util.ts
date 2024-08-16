import { createHash, randomBytes } from 'crypto';

export function hashString(text: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256');
  hash.update(text + salt);
  return salt + hash.digest('hex');
}

export function validateHashedString(text: string, hashedTextWithSalt: string): boolean {
  const salt = hashedTextWithSalt.slice(0, 32);
  const hash = createHash('sha256');
  hash.update(text + salt);
  const hashedText = salt + hash.digest('hex');
  return hashedTextWithSalt === hashedText;
}
