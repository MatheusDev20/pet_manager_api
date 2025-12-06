export const SALT_ROUNDS = 10;

export const SERVICES = [
  'bath',
  'grooming',
  'vet_consultation',
  'vaccine',
] as const;

export type ServiceType = (typeof SERVICES)[number];
