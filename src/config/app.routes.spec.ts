import { routesV1 } from './app.routes';

describe('App Routes', () => {
  describe('routesV1', () => {
    it('should have correct version', () => {
      expect(routesV1.version).toBe('/api/v1');
    });

    describe('user routes', () => {
      it('should have correct user root', () => {
        expect(routesV1.user.root).toBe('users');
      });

      it('should have correct user delete route with parameter', () => {
        expect(routesV1.user.delete).toBe('/users/:id');
      });
    });

    describe('pet routes', () => {
      it('should have correct pet root', () => {
        expect(routesV1.pet.root).toBe('pets');
      });
    });

    describe('appointments routes', () => {
      it('should have correct appointments root', () => {
        expect(routesV1.appointments.root).toBe('appointments');
      });
    });

    describe('auth routes', () => {
      it('should have correct login route', () => {
        expect(routesV1.auth.login).toBe('/auth/login');
      });
    });

    it('should have all expected route properties', () => {
      expect(routesV1).toHaveProperty('version');
      expect(routesV1).toHaveProperty('user');
      expect(routesV1).toHaveProperty('pet');
      expect(routesV1).toHaveProperty('appointments');
      expect(routesV1).toHaveProperty('auth');
    });

    it('should have user object with expected properties', () => {
      expect(routesV1.user).toHaveProperty('root');
      expect(routesV1.user).toHaveProperty('delete');
    });
  });
});
