module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'cas-ms-master-capacitacion',
        description: 'Proyecto de Párrafos Núcleo Digital',
        termsOfService: 'http://api_url/terms/',
        contact: {
            name: 'Clínica Alemana',
            email: 'contacto@alemana.cl',
            url: 'https://www.clinicaalemana.cl/'
        },
        license: {
            name: 'ISC',
            url: 'https://opensource.org/licenses/ISC'
        }
    },
    servers: [
        {
            url: 'http://localhost:85/',
            description: 'Local server'
        }
    ],
    tags: [
    ],
    paths: {
        '/v1/categorias': {
            get: {
                tags: ['Categorias'],
                description: 'Obtiene listado de categorías',
                operationId: 'obtenerCategorias',
                parameters: [
                ],
                responses: {
                    '200': {
                        description: 'Listado de categorías',
                        content: {
                            'application/json': {
                                schema: {
                                    properties: {
                                        Code: {
                                            $ref: '#/components/schemas/Code'
                                        },
                                        Message: {
                                            $ref: '#/components/schemas/Message'
                                        },
                                        Data: {
                                            type: 'object',
                                            properties: {
                                                Categorias: {
                                                    type: 'array',
                                                    items: {
                                                        $ref: '#/components/schemas/Categoria'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    code: 200,
                                    message: 'Operación exitosa',
                                    data: [
                                        {
                                            "Id": 5120000001,
                                            "Nombre": "Pruebas Rapidas"
                                        },
                                        {
                                            "Id": 5010000001,
                                            "Nombre": "Procedimientos"
                                        },
                                        {
                                            "Id": 5030000003,
                                            "Nombre": "Laboratorio"
                                        },
                                        {
                                            "Id": 5020000002,
                                            "Nombre": "Imagenologia"
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "404": {
                        "description": "Not Found"
                    },
                    '500': {
                        description: 'Ha ocurrido un error inesperado en la obtención de categorías ',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'Ha ocurrido un error inesperado en la obtención de categorías'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/v1/categorias/{categoriaId}': {
            get: {
                tags: ['Categorias'],
                description: 'Obtiene categoría',
                operationId: 'obtenerCategoriaPorId',
                parameters: [
                    {
                        "in": "path",
                        "name": "categoriaId",
                        "description": "id de Categoria/ Negocio",
                        "required": true,
                        "type": "integer"
                    }
                ],
                responses: {
                    '200': {
                        description: 'Categoría',
                        content: {
                            'application/json': {
                                schema: {
                                    properties: {
                                        Code: {
                                            $ref: '#/components/schemas/Code'
                                        },
                                        Message: {
                                            $ref: '#/components/schemas/Message'
                                        },
                                        Data: {
                                            type: 'object',
                                            properties: {
                                                Categoria: {
                                                    $ref: '#/components/schemas/Categoria'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    code: 200,
                                    message: 'Operación exitosa',
                                    data: {
                                        Id: 5030000003,
                                        Nombre: "Laboratorio"
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "404": {
                        "description": "Not Found"
                    },
                    "504": {
                        "description": "Error al invocar al microservicio"
                    },
                    '500': {
                        description: 'Ha ocurrido un error inesperado en la obtención de categorías',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'Ha ocurrido un error inesperado en la obtención de categorías'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/v1/categorias/{categoriaId}/gruposjerarquicos': {
            get: {
                tags: ['Grupos Jerarquicos'],
                description: 'Obtiene Listado de Grupos Jerarquicos asociados a una categoría/Negocio',
                operationId: 'obtenerGruposJerarquicosPorIdCategoria',
                parameters: [
                    {
                        "in": "path",
                        "name": "categoriaId",
                        "description": "id de Categoria/ Negocio",
                        "required": true,
                        "type": "integer"
                    }
                ],
                responses: {
                    '200': {
                        description: 'GruposJerarquicos',
                        content: {
                            'application/json': {
                                schema: {
                                    properties: {
                                        Code: {
                                            $ref: '#/components/schemas/Code'
                                        },
                                        Message: {
                                            $ref: '#/components/schemas/Message'
                                        },
                                        Data: {
                                            type: 'object',
                                            properties: {
                                                GruposJerarquicos: {
                                                    type: 'array',
                                                    items: {
                                                        $ref: '#/components/schemas/GrupoJerarquico'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    code: 200,
                                    message: 'Operación exitosa',
                                    data: [
                                        {
                                            "Id": 5835906,
                                            "Nombre": "Inmunología/Electroforesis"
                                        },
                                        {
                                            "Id": 5835901,
                                            "Nombre": "Biología Molecular"
                                        },
                                        {
                                            "Id": 5835902,
                                            "Nombre": "Bioquímica"
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "404": {
                        "description": "Not Found"
                    },
                    "504": {
                        "description": "Error al invocar al microservicio"
                    },
                    '500': {
                        description: 'Ha ocurrido un error inesperado en la obtención de categorías',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'Ha ocurrido un error inesperado en la obtención de categorías'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/v1/categorias/gruposjerarquicos/{grupoJerarquicoId}': {
            get: {
                tags: ['Grupos Jerarquicos'],
                description: 'Obtiene Grupo Jerarquico por Id',
                operationId: 'obtenerGrupoJerarquicoPorId',
                parameters: [
                    {
                        "in": "path",
                        "name": "grupoJerarquicoId",
                        "description": "id de Grupo Jerarquico",
                        "required": true,
                        "type": "integer"
                    }
                ],
                responses: {
                    '200': {
                        description: 'GrupoJerarquico',
                        content: {
                            'application/json': {
                                schema: {
                                    properties: {
                                        Code: {
                                            $ref: '#/components/schemas/Code'
                                        },
                                        Message: {
                                            $ref: '#/components/schemas/Message'
                                        },
                                        Data: {
                                            type: 'object',
                                            properties: {
                                                GrupoJerarquico: {
                                                    $ref: '#/components/schemas/GrupoJerarquico'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    code: 200,
                                    message: 'Operación exitosa',
                                    data: {
                                        Id: 5835906,
                                        Nombre: "Inmunología/Electroforesis"
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "403": {
                        "description": "Acceso Prohibido"
                    },
                    "404": {
                        "description": "Not Found"
                    },
                    "504": {
                        "description": "Error al invocar al microservicio"
                    },
                    '500': {
                        description: 'Ha ocurrido un error inesperado en la obtención de categorías',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'Ha ocurrido un error inesperado en la obtención de categorías'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/v1/healthCheck': {
            get: {
                tags: ['Health Check'],
                description: 'Obtiene el status de conexion de la base de datos',
                operationId: 'getHealthCheck',
                responses: {
                    '200': {
                        description: 'Ejemplo',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HealthResponse'
                                },
                                example: {
                                    code: 200,
                                    status: 'connection OK',
                                    message: 'connection OK'
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "404": {
                        "description": "Not Found"
                    },
                    "504": {
                        "description": "Error al invocar al microservicio"
                    },
                    '500': {
                        description: 'Ha ocurrido un error inesperado en la obtención de ejemplo',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'Ha ocurrido un error inesperado en la obtención de ejemplo'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Code: {
                type: 'integer',
                description: 'codigo de respuesta del servicio',
                example: 200
            },
            Message: {
                type: 'string',
                description: 'mensaje de respuesta del servicio',
                example: "Operación exitosa."
            },
            Id: {
                type: 'integer',
                description: 'User identification number',
                example: 1234
            },
            Nombre: {
                type: 'string',
                example: 'Biologia'
            },
            Categoria: {
                type: 'object',
                properties: {
                    Id: {
                        $ref: '#/components/schemas/Id'
                    },
                    Nombre: {
                        $ref: '#/components/schemas/Nombre'
                    }
                }
            },
            Categorias: {
                type: 'object',
                properties: {
                    categorias: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Categoria'
                        }
                    }
                }
            },
            GrupoJerarquico: {
                type: 'object',
                properties: {
                    Id: {
                        $ref: '#/components/schemas/Id'
                    },
                    Nombre: {
                        $ref: '#/components/schemas/Nombre'
                    }
                }
            },
            GruposJerarquicos: {
                type: 'object',
                properties: {
                    categorias: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/GrupoJerarquico'
                        }
                    }
                }
            },
            code: {
                type: 'integer',
                description: 'codigo de status',
                example: 200
            },
            status: {
                type: 'integer',
                description: 'texto corto status',
                example: 'connection OK'
            },
            message: {
                type: 'any',
                description: 'texto descriptivo de status u objeto de error de excepción',
                example: 'connection OK'
            },
            HealthResponse: {
                type: 'object',
                properties: {
                    code: {
                        $ref: '#/components/schemas/code'
                    },
                    status: {
                        $ref: '#/components/schemas/status'
                    },
                    message: {
                        $ref: '#/components/schemas/message'
                    }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    internal_code: {
                        type: 'string'
                    }
                }
            }
        }
    }
};