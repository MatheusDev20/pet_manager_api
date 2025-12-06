import { SALT_ROUNDS, SERVICES, ServiceType } from '../constants';

describe('Constants', () => {
  describe('SALT_ROUNDS', () => {
    it('should have the correct value', () => {
      expect(SALT_ROUNDS).toBe(10);
    });
  });

  describe('SERVICES', () => {
    it('should contain all expected service types', () => {
      expect(SERVICES).toEqual([
        'bath',
        'grooming',
        'vet_consultation',
        'vaccine',
      ]);
    });
  });

  describe('ServiceType', () => {
    it('should accept valid service types', () => {
      const bathService: ServiceType = 'bath';
      const groomingService: ServiceType = 'grooming';
      const vetService: ServiceType = 'vet_consultation';
      const vaccineService: ServiceType = 'vaccine';

      expect(bathService).toBe('bath');
      expect(groomingService).toBe('grooming');
      expect(vetService).toBe('vet_consultation');
      expect(vaccineService).toBe('vaccine');
    });

    it('should include all services from SERVICES array', () => {
      SERVICES.forEach((service) => {
        const serviceType: ServiceType = service;
        expect(SERVICES).toContain(serviceType);
      });
    });
  });
});
