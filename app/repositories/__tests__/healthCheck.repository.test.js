const mockHealthCheck = {
    code: 200,
    status: 'connection OK', 
    message: 'connection OK'
};

const mockHealthCheckDataBase = {
    code: 200,
    status: 'connection OK', 
    message: 'connection OK'
};

//Pruebas del repositorio de healthCheck
describe('testing-healthCheck-repository', () => {

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('getHealthCheck', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                getConnectionStatus() {
                    return new Promise((resolve, reject) => {
                        resolve(mockHealthCheckDataBase);
                    });
                }
            };
        });

        const HealthCheckRepository = jest.requireActual('../healthCheck.repository');
        const healthCheckRepository = new HealthCheckRepository();

        expect.assertions(1);
        await expect(healthCheckRepository.getHealthCheck()).resolves.toEqual(mockHealthCheck);
    });


    it('getHealthCheck Reject', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                getConnectionStatus() {
                    return new Promise((resolve, reject) => {
                        reject(new Error('Error'));
                    });
                }
            };
        });

        const HealthCheckRepository = jest.requireActual('../healthCheck.repository');
        const healthCheckRepository = new HealthCheckRepository();

        expect.assertions(1);
        await expect(healthCheckRepository.getHealthCheck()).rejects.toThrowError(new Error('Error'));
    });
});