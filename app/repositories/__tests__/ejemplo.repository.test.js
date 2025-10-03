const mockCategorias = [
    { Id: 1, Nombre: "Categoría 1" },
    { Id: 2, Nombre: "Categoría 2" }
];

const mockCategoriasDataBase = {
    cursor: [
        { CAPSNU_ID_CAT: 1, CAPSVA_DESCRIPCION_CAT: "Categoría 1" },
        { CAPSNU_ID_CAT: 2, CAPSVA_DESCRIPCION_CAT: "Categoría 2" }
    ]
};

const mockGrupos = [
    { Id: 1, Nombre: "Grupo 1" },
    { Id: 2, Nombre: "Grupo 2" }
];

const mockGruposDataBase = {
    cursor: [
        { CAPSNU_ID_GRP_JRC: 1, CAPSVA_DESCRIPCION_GRP_JRC: "Grupo 1" },
        { CAPSNU_ID_GRP_JRC: 2, CAPSVA_DESCRIPCION_GRP_JRC: "Grupo 2" }
    ]
};

//Pruebas del repositorio de parrafo
describe('testing-parrafo-repository', () => {

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('obtenerCategorias', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                executeSql() {
                    return new Promise((resolve, reject) => {
                        resolve(mockCategoriasDataBase);
                    });
                }
            };
        });

        const parrafoRepository = jest.requireActual('../ejemplo.repository');

        const request = {
            categoriaId: 9879
        }

        expect.assertions(1);
        await expect(parrafoRepository.obtenerCategorias(request)).resolves.toEqual(mockCategorias);
    });

    it('obtenerCategorias Error Resultado', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                executeSql() {
                    return new Promise((resolve, reject) => {
                        resolve(null);
                    });
                }
            };
        });

        const parrafoRepository = jest.requireActual('../ejemplo.repository');

        const request = {
            usuarioId: 9879,
            origenParrafoId: 3
        }

        expect.assertions(1);
        await expect(parrafoRepository.obtenerCategorias(request)).rejects.toThrowError(new Error('No se pudo obtener el listado de categorías'));
    });

    it('obtenerCategoriaPorId', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                executeSql() {
                    return new Promise((resolve, reject) => {
                        resolve(mockCategoriasDataBase);
                    });
                }
            };
        });

        const parrafoRepository = jest.requireActual('../ejemplo.repository');

        const request = {
            categoriaId: 9879,
        }

        expect.assertions(1);
        await expect(parrafoRepository.obtenerCategoriaPorId(request)).resolves.toEqual(mockCategorias[1]);
    });

    it('obtenerCategoriaPorId Error Resultado', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                executeSql() {
                    return new Promise((resolve, reject) => {
                        resolve(null);
                    });
                }
            };
        });

        const parrafoRepository = jest.requireActual('../ejemplo.repository');

        const request = {
            categoriaId: 9879,
        }

        expect.assertions(1);
        await expect(parrafoRepository.obtenerCategoriaPorId(request)).rejects.toThrowError(new Error('No se pudo obtener el listado de categorías'));
    });

    it('obtenerGruposJerarquicosPorIdCategoria', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                executeSql() {
                    return new Promise((resolve, reject) => {
                        resolve(mockGruposDataBase);
                    });
                }
            };
        });

        const parrafoRepository = jest.requireActual('../ejemplo.repository');

        const request = {
            categoriaId: 9879
        }

        expect.assertions(1);
        await expect(parrafoRepository.obtenerGruposJerarquicosPorIdCategoria(request)).resolves.toEqual(mockGrupos);
    });

    it('obtenerGruposJerarquicosPorIdCategoria Error Resultado', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                executeSql() {
                    return new Promise((resolve, reject) => {
                        resolve(null);
                    });
                }
            };
        });

        const parrafoRepository = jest.requireActual('../ejemplo.repository');

        const request = {
            categoriaId: 9879
        }

        expect.assertions(1);
        await expect(parrafoRepository.obtenerGruposJerarquicosPorIdCategoria(request)).rejects.toThrowError(new Error('No se pudo obtener el listado de grupos jerarquicos'));
    });

    it('obtenerGrupoJerarquicoPorId', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                executeSql() {
                    return new Promise((resolve, reject) => {
                        resolve(mockGruposDataBase);
                    });
                }
            };
        });

        const parrafoRepository = jest.requireActual('../ejemplo.repository');

        const request = {
            grupoJerarquicoId: 9879
        }

        expect.assertions(1);
        await expect(parrafoRepository.obtenerGrupoJerarquicoPorId(request)).resolves.toEqual(mockGrupos[1]);
    });

    it('obtenerGrupoJerarquicoPorId Error Resultado', async () => {

        jest.doMock('../../../node_modules/@cas/cas-lib-ms-core/lib/database.core', () => {
            return {
                executeSql() {
                    return new Promise((resolve, reject) => {
                        resolve(null);
                    });
                }
            };
        });

        const parrafoRepository = jest.requireActual('../ejemplo.repository');

        const request = {
            grupoJerarquicoId: 9879
        }

        expect.assertions(1);
        await expect(parrafoRepository.obtenerGrupoJerarquicoPorId(request)).rejects.toThrowError(new Error('No se pudo obtener el grupo jerarquico'));
    });
});