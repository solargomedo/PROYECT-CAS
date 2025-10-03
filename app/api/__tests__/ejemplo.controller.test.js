const controller = require("../ejemplo.controller");

const mockCategorias = {
    code: 200,
    message: 'Operación exitosa.',
    data: [
        { Id: 1, Nombre: "Categoría 1", GruposJerarquicos: [] },
        { Id: 2, Nombre: "Categoría 2", GruposJerarquicos: [] }
    ]
};

const mockCategoria = {
    code: 200,
    message: 'Operación exitosa.',
    data: {
        Id: 1,
        Nombre: "Categoría 1",
        GruposJerarquicos: []
    }
}

const mockGrupos = {
    code: 200,
    message: 'Operación exitosa.',
    data: [
        { Id: 1, Nombre: "Grupo 1" },
        { Id: 2, Nombre: "Grupo 2" }
    ]
};

const mockGrupo = {
    code: 200,
    message: 'Operación exitosa.',
    data: { 
        Id: 1, 
        Nombre: "Grupo 1" 
    }
};


const mockBadReq = {
    code: 400,
    error: "Bad Request",
    message: 'Error en la solicitud.'
};

//Mocking del servicio parrafo
jest.mock("../../services/ejemplo.service");

//Pruebas del controlador de parrafo
describe('testing-ejemplo-controller', () => {

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    test('obtenerCategorias', async () => {

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const res = mockResponse();
        const req = {};

        await controller.obtenerCategorias(req, res, null);
        expect(res.json).toHaveBeenCalledWith(mockCategorias);
    });

    test('obtenerCategorias tryCatch', async () => {

        jest.unmock("../../services/ejemplo.service");

        jest.doMock('../../services/ejemplo.service', () => {
            return {
                obtenerCategorias() {
                    return new Promise((resolve, reject) => {
                        reject(new Error('Error'));
                    });
                }
            };
        });

        const controller = jest.requireActual('../ejemplo.controller');

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const next = jest.fn();
        const res = mockResponse();
        const req = {};

        await controller.obtenerCategorias(req, res, next);
        expect(next).toHaveBeenCalledWith(new Error('Error'));
    });

    

    test('obtenerCategoriaPorId', async () => {

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const res = mockResponse();
        const req = {};

        req.params = {};
        req.params.categoriaId = 9879;

        await controller.obtenerCategoriaPorId(req, res, null);
        expect(res.json).toHaveBeenCalledWith(mockCategoria);
    });

    test('obtenerCategoriaPorId BadRequest', async () => {

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const res = mockResponse();
        const req = {};

        req.params = {};
        req.params.categoriaId = "string";

        await controller.obtenerCategoriaPorId(req, res, null);
        expect(res.json).toHaveBeenCalledWith(mockBadReq);
    });

    test('obtenerCategoriaPorId tryCatch', async () => {

        jest.unmock("../../services/ejemplo.service");

        jest.doMock('../../services/ejemplo.service', () => {
            return {
                obtenerCategoriaPorId() {
                    return new Promise((resolve, reject) => {
                        reject(new Error('Error'));
                    });
                }
            };
        });

        const controller = jest.requireActual('../ejemplo.controller');

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const next = jest.fn();
        const res = mockResponse();
        const req = {};

        req.params = {};
        req.params.categoriaId = 9879;

        await controller.obtenerCategoriaPorId(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    test('obtenerGruposJerarquicosPorIdCategoria', async () => {

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const res = mockResponse();
        const req = {};

        req.params = {};
        req.params.categoriaId = 9879;

        await controller.obtenerGruposJerarquicosPorIdCategoria(req, res, null);
        expect(res.json).toHaveBeenCalledWith(mockGrupos);
    });

    test('obtenerGruposJerarquicosPorIdCategoria BadRequest', async () => {

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const res = mockResponse();
        const req = {};

        req.params = {};
        req.params.categoriaId = "string";

        await controller.obtenerGruposJerarquicosPorIdCategoria(req, res, null);
        expect(res.json).toHaveBeenCalledWith(mockBadReq);
    });

    test('obtenerGruposJerarquicosPorIdCategoria tryCatch', async () => {

        jest.unmock("../../services/ejemplo.service");

        jest.doMock('../../services/ejemplo.service', () => {
            return {
                obtenerGruposJerarquicosPorIdCategoria() {
                    return new Promise((resolve, reject) => {
                        reject(new Error('Error'));
                    });
                }
            };
        });

        const controller = jest.requireActual('../ejemplo.controller');

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const next = jest.fn();
        const res = mockResponse();
        const req = {};

        req.params = {};
        req.params.categoriaId = 9879;

        await controller.obtenerGruposJerarquicosPorIdCategoria(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    test('obtenerGrupoJerarquicoPorId', async () => {

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const res = mockResponse();
        const req = {};

        req.params = {};
        req.params.grupoJerarquicoId = 9879;

        await controller.obtenerGrupoJerarquicoPorId(req, res, null);
        expect(res.json).toHaveBeenCalledWith(mockGrupo);
    });

    test('obtenerGrupoJerarquicoPorId BadRequest', async () => {

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const res = mockResponse();
        const req = {};

        req.params = {};
        req.params.grupoJerarquicoId = "string";

        await controller.obtenerGrupoJerarquicoPorId(req, res, null);
        expect(res.json).toHaveBeenCalledWith(mockBadReq);
    });

    test('obtenerGrupoJerarquicoPorId tryCatch', async () => {

        jest.unmock("../../services/ejemplo.service");

        jest.doMock('../../services/ejemplo.service', () => {
            return {
                obtenerGrupoJerarquicoPorId() {
                    return new Promise((resolve, reject) => {
                        reject(new Error('Error'));
                    });
                }
            };
        });

        const controller = jest.requireActual('../ejemplo.controller');

        const mockResponse = () => {
            const res = {};

            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);

            return res;
        };

        const next = jest.fn();
        const res = mockResponse();
        const req = {};

        req.params = {};
        req.params.grupoJerarquicoId = 9879;

        await controller.obtenerGrupoJerarquicoPorId(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});