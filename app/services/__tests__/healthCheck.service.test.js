const HealthCheckService = require("../healthCheck.service");

const mockHealthCheck = {
    code: 200,
    status: 'connection OK', 
    message: 'connection OK'
};

//Mocking del repositorio de healthCheck
jest.mock("../../repositories/healthCheck.repository");

//Pruebas del servicio de healthCheck
describe('testing-healthCheck-service', () => {

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('getHealthCheck', async () => {

        const healthCheckService = new HealthCheckService();

        expect.assertions(1);
        await expect(healthCheckService.getHealthCheck()).resolves.toEqual(mockHealthCheck);
    });

    it('getHealthCheck Reject', async () => {

        jest.unmock("../../repositories/healthCheck.repository");

        jest.doMock('../../repositories/healthCheck.repository', () => {
            return class HealthCheckRepository {
                getHealthCheck() {
                    return new Promise((resolve, reject) => {
                        reject(new Error('Error'));
                    });
                }
            };
        });

        const HealthCheckService = jest.requireActual('../healthCheck.service');
        const healthCheckService = new HealthCheckService();

        expect.assertions(1);
        await expect(healthCheckService.getHealthCheck()).rejects.toThrowError(new Error('Error'));
    });
});
