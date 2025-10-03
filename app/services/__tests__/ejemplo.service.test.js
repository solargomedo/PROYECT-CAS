const parrafoService = require("../ejemplo.service");

const mockCategorias = [
    { Id: 1, Nombre: "Categoría 1", GruposJerarquicos: []},
    { Id: 2, Nombre: "Categoría 2", GruposJerarquicos: []}
];

const mockGrupos = [
    { Id: 1, Nombre: "Grupo 1"},
    { Id: 2, Nombre: "Grupo 2"}
];

//Mocking del repositorio parrafo
jest.mock("../../repositories/ejemplo.repository");

//Pruebas del servicio de parrafo
describe('testing-parrafo-service', () => {

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('obtenerCategorias', async () => {

        const request = {
            categoriaId: 9879
        }

        expect.assertions(1);
        await expect(parrafoService.obtenerCategorias(request)).resolves.toEqual(mockCategorias);
    });

    it('obtenerCategoriaPorId', async () => {

        const request = {
            categoriaId: 9879
        }

        expect.assertions(1);
        await expect(parrafoService.obtenerCategoriaPorId(request)).resolves.toEqual(mockCategorias[0]);
    });

    it('obtenerGruposJerarquicosPorIdCategoria', async () => {

        const request = {
            categoriaId: 9879
        }

        expect.assertions(1);
        await expect(parrafoService.obtenerGruposJerarquicosPorIdCategoria(request)).resolves.toEqual(mockGrupos);
    });

    it('obtenerGrupoJerarquicoPorId', async () => {

        const request = {
            grupoJerarquicoId: 9879
        }

        expect.assertions(1);
        await expect(parrafoService.obtenerGrupoJerarquicoPorId(request)).resolves.toEqual(mockGrupos[0]);
    });
});