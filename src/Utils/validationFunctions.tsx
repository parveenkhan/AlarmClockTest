export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function hasLength(value: string, min = 1) {
  return value.trim().length >= min;
}

export default { isEmail, hasLength };
