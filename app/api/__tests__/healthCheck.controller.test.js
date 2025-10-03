
const controller = require("../healthCheck.controller");

const mockHealthCheck = {
    code: 200,
    status: 'connection OK', 
    message: 'connection OK'
};

const mockError = 'Error';

//Mocking del servicio HealthCheck
jest.mock("../../services/healthCheck.service");

//Pruebas del controlador de HealthCheck
describe('testing-healthCheck-controller', () => {
    
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });
    
    test('getHealthCheck', async () => {
        
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const res = mockResponse();
        const req = {};

        await controller.getHealthCheck(req, res, null);
        expect(res.json).toHaveBeenCalledWith(mockHealthCheck);
    });

    test('getHealthCheck Error', async () => {
        
        jest.unmock("../../services/healthCheck.service");

        jest.doMock('../../services/healthCheck.service', () => {
            return class HealthCheckService {
                getHealthCheck()  {
                    
                    return new Promise((resolve, reject) => {
                        reject(new Error('Error'));
                    });
                }
            };
        });

        const controller = jest.requireActual('../healthCheck.controller');

        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const res = mockResponse();
        const req = {};

        await controller.getHealthCheck(req, res, null);
        expect(res.json).toHaveBeenCalledWith(mockError);
    });

    test('getHealthCheck tryCatch', async () => {

        jest.unmock("../../services/healthCheck.service");

        jest.doMock('../../services/healthCheck.service', () => {
            return class HealthCheckService {
                getHealthCheck()  {
                    throw new Error('Error');
                }
            };
        });

        const controller = jest.requireActual('../healthCheck.controller');
        
        const mockResponse = () => {
            const res = {};
            
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const next = jest.fn();
        const res = mockResponse();
        const req = {};

        await controller.getHealthCheck(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});