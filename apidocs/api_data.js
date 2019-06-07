define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "../trivia-test/apidocs/main.js",
    "group": "C__Users_HP_Documents_Clases_Codigo_Ada_trivia_test_apidocs_main_js",
    "groupTitle": "C__Users_HP_Documents_Clases_Codigo_Ada_trivia_test_apidocs_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/v1/categories",
    "title": "Agregar categoria",
    "name": "addcategory",
    "group": "Categorias",
    "version": "1.0.0",
    "description": "<p>Agrega una categoria</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/categories\", {\n     headers: {\n         \"Accept\": \"application/json\",\n         \"Content-Type\": \"application/json;  charset=UTF-8\",\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n     body: JSON.stringify({\n         name: \"Series\",\n         color: \"#F8F8F8\"\n     })  \n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>Código hexadecimal que sirve como etiqueta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\": \"Series\",\n    \"color\": \"#F8F8F8\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": \"true\",\n    \"message\": \"Categoría añadida con éxito\" \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/categories/controller.js",
    "groupTitle": "Categorias"
  },
  {
    "type": "get",
    "url": "/v1/categories/:sort?",
    "title": "Obtener categorias",
    "name": "getcategories",
    "group": "Categorias",
    "version": "1.0.0",
    "description": "<p>Agrega una categoria</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/categories/likes\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"questions\"",
              "\"likes\""
            ],
            "optional": false,
            "field": "sort",
            "description": "<p>Orden de las categorías, por número de preguntas o por likes</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[]",
            "optional": false,
            "field": "categories",
            "description": "<p>Listado de categorías</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "categories.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "categories.color",
            "description": "<p>Color de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Number",
            "optional": false,
            "field": "categories.questions",
            "description": "<p>Cantidad de preguntas en la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Number",
            "optional": false,
            "field": "categories.likes",
            "description": "<p>Total de likes de preguntas en la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"categories\": [\n        {\n            \"name\": \"Historia\",\n            \"color\": \"#F8F8F8\",\n            \"questions\": 544,\n            \"likes\": 350\n        },\n        {\n            \"name\": \"Peliculas\",\n            \"color\": \"#F8F8F8\",\n            \"questions\": 52,\n            \"likes\": 170\n        }\n    ]\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/categories/controller.js",
    "groupTitle": "Categorias"
  },
  {
    "type": "post",
    "url": "/v1/competitions/invite/:username/:category?",
    "title": "Desafiar a competencia",
    "name": "addcompetition",
    "group": "Competiciones",
    "version": "1.0.0",
    "description": "<p>Desafía a unx usuarix a una competición</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/competitions/invite/ada\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuarix que se quiere desafiar</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "defaultValue": "random",
            "description": "<p>Categoría del desafío</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": \"true\",\n    \"message\": \"Competición creada exitosamente\" \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/competitions/controller.js",
    "groupTitle": "Competiciones"
  },
  {
    "type": "get",
    "url": "/v1/:status?/:page?",
    "title": "Obtener competencias",
    "name": "getcompetitions",
    "group": "Competiciones",
    "version": "1.0.0",
    "description": "<p>Obtiene un listado de las competencias</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/competitions/won\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\"\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"all\"",
              "\"pending\"",
              "\"played\"",
              "\"finished\"",
              "\"won\"",
              "\"draw\"",
              "\"lost\""
            ],
            "optional": true,
            "field": "filter",
            "defaultValue": "all",
            "description": "<p>Filtro de las competencias por estado</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de página de las competencias (10 por página)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[]",
            "optional": false,
            "field": "competitions",
            "description": "<p>Listado de competiciones</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "competitions._id",
            "description": "<p>Id de la competición</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "competitions.challenger",
            "description": "<p>Creadorx de la competición</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "competitions.challenged",
            "description": "<p>Invitadx de la competición</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Number",
            "optional": false,
            "field": "competitions.challenger_points",
            "description": "<p>Preguntas bien respondidas por lx creadorx de la competición</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Number",
            "optional": false,
            "field": "competitions.challenged_points",
            "description": "<p>Preguntas bien respondidas por lx invitadx de la competición</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "competitions.challenger_finished",
            "description": "<p>Creadorx de la competición terminó de jugar</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "competitions.challenged_finished",
            "description": "<p>Invitadx de la competición terminó de jugar</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "competitions.category",
            "description": "<p>Categoría de la competición</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"success\": true,\n\"competitions\": [\n        {\n            \"_id\": \"5cf412f474f3091a907f9658\",\n            \"challenger\": \"pablo\",\n            \"challenged\": \"user\",\n            \"challenger_points\": 7,\n            \"challenged_points\": 7,\n            \"challenger_finished\": true,\n            \"challenged_finished\": true,\n            \"category\": \"random\"\n        }\n    ]\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/competitions/controller.js",
    "groupTitle": "Competiciones"
  },
  {
    "type": "post",
    "url": "/v1/competitions/play/:id/:points",
    "title": "Jugar competencia",
    "name": "playcompetition",
    "group": "Competiciones",
    "version": "1.0.0",
    "description": "<p>Juega el turno de un jugador actualizando la competencia con la cantidad de preguntas bien respondidas. Una vez que se juega no puede volverse a jugar la misma competencia.</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/competitions/play/5cf412f474f3091a907f9658/8\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la competición que se quiere jugar</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "points",
            "description": "<p>Cantidad de preguntas bien respondidas</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": \"true\",\n    \"message\": \"Competición actualizada exitosamente\" \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/competitions/controller.js",
    "groupTitle": "Competiciones"
  },
  {
    "type": "post",
    "url": "/v1/challenges/",
    "title": "Agregar desafio",
    "name": "addChallenge",
    "group": "Desafios",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Agrega un desafío</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/challenges\", {\n     headers: {\n         \"Accept\": \"application/json\",\n         \"Content-Type\": \"application/json; charset=UTF-8\"\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n     body: JSON.stringify({\n           title: \"De curiosidades y anécdotas\",\n           description: \"Poné a prueba tu conocimiento inútil o aprendé algo inservible!\",\n           questions: [\n                   \"5cef009125363837987fd841\",\n                   \"5cef00912asfas3837987841\",\n                   \"5cef00912523423837987f41\",\n                   \"5cef00912242343837987d41\",\n                   \"5cef009234234g34597fd841\",\n                   \"5cef234fddsfsfs383797841\",\n                   \"5cef0032423dfs2383787f41\",\n                   \"5cef00912124124ffsd87d41\",\n                   \"546dfgdf2124124ffsd87d41\",\n                   \"5cef00912124124ffsd87d41\",\n               ],\n       })\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Enunciado del desafío</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Descripción del desafío</p>"
          },
          {
            "group": "Parameter",
            "type": "String[10]",
            "optional": false,
            "field": "questions",
            "description": "<p>Lista de los ids de las diez preguntas</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"Desafío añadido con éxito\"\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/challenges/controller.js",
    "groupTitle": "Desafios"
  },
  {
    "type": "post",
    "url": "/v1/challenges/downvote/:id?",
    "title": "Dar dislike a desafío",
    "name": "downvoteChallenge",
    "group": "Desafios",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Le suma un dislike al desafío</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/challenges/downvote/5cf2ffc54005a8207052616b/\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id del desafío que se quiere likear</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": \"true\",\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/challenges/controller.js",
    "groupTitle": "Desafios"
  },
  {
    "type": "get",
    "url": "/v1/challenges/all/:sort?/:page?",
    "title": "Obtener todos los desafios",
    "name": "getAllChallenges",
    "group": "Desafios",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene un listado de todos los desafíos</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/challenges/all/top\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"top\"",
              "\"new\""
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "top",
            "description": "<p>Orden en el que vienen los desafíos (por puntos o novedad)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de página del listado (10 desafíos por página)</p>"
          }
        ]
      }
    },
    "filename": "../trivia-test/components/challenges/controller.js",
    "groupTitle": "Desafios",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": "<p>Información sobre el desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Id del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Título del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.description",
            "description": "<p>Descripción del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.username",
            "description": "<p>Usuarix creadorx del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[10]",
            "optional": false,
            "field": "challenge.questions",
            "description": "<p>Preguntas del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "challenge.questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"challenge\": {\n      \"_id\": \"5cef1a27a9139458f02b1cbd\",\n      \"title\": \"Por qué razón se conoce a...?\",\n      \"description\": \"Adiviná por qué son famosas históricamente estas personas\",\n      \"username\": \"pablo\",\n      \"questions\": [{\n          \"_id\": \"5cef1a27asdfsdf8f02b1cbd\",\n          \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n          \"answer\": \"Ser la primera programadora\",\n          \"answers\": [\n              \"Descubrir un dinosaurio\",\n              \"Ser la primera programadora\",\n              \"Jugar muy bien al tenis\"\n              \"Construir la muralla china\"\n          ],\n          \"category\": {\n            \"name\": \"historia\",\n             \"color\": \"#F8F8F8\"\n          }\t\t\n      }\n       // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/challenges/:id/",
    "title": "Obtener desafio por id",
    "name": "getChallengeById",
    "group": "Desafios",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene la información de un desafío dado un id</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/challenges/5ceefe4439bc8a4438d37426\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id del desafío</p>"
          }
        ]
      }
    },
    "filename": "../trivia-test/components/challenges/controller.js",
    "groupTitle": "Desafios",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": "<p>Información sobre el desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Id del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Título del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.description",
            "description": "<p>Descripción del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.username",
            "description": "<p>Usuarix creadorx del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[10]",
            "optional": false,
            "field": "challenge.questions",
            "description": "<p>Preguntas del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "challenge.questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"challenge\": {\n      \"_id\": \"5cef1a27a9139458f02b1cbd\",\n      \"title\": \"Por qué razón se conoce a...?\",\n      \"description\": \"Adiviná por qué son famosas históricamente estas personas\",\n      \"username\": \"pablo\",\n      \"questions\": [{\n          \"_id\": \"5cef1a27asdfsdf8f02b1cbd\",\n          \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n          \"answer\": \"Ser la primera programadora\",\n          \"answers\": [\n              \"Descubrir un dinosaurio\",\n              \"Ser la primera programadora\",\n              \"Jugar muy bien al tenis\"\n              \"Construir la muralla china\"\n          ],\n          \"category\": {\n            \"name\": \"historia\",\n             \"color\": \"#F8F8F8\"\n          }\t\t\n      }\n       // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/challenges/byusername/:username/:sort?/:page?",
    "title": "Obtener desafios por usuarix",
    "name": "getChallengesByUser",
    "group": "Desafios",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene un listado de todos los desafíos de unx usuarix</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/challenges/all/top\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuarix</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"top\"",
              "\"new\""
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "top",
            "description": "<p>Orden en el que vienen los desafíos (por puntos o novedad)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de página del listado (10 desafíos por página)</p>"
          }
        ]
      }
    },
    "filename": "../trivia-test/components/challenges/controller.js",
    "groupTitle": "Desafios",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": "<p>Información sobre el desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Id del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Título del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.description",
            "description": "<p>Descripción del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.username",
            "description": "<p>Usuarix creadorx del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[10]",
            "optional": false,
            "field": "challenge.questions",
            "description": "<p>Preguntas del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "challenge.questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"challenge\": {\n      \"_id\": \"5cef1a27a9139458f02b1cbd\",\n      \"title\": \"Por qué razón se conoce a...?\",\n      \"description\": \"Adiviná por qué son famosas históricamente estas personas\",\n      \"username\": \"pablo\",\n      \"questions\": [{\n          \"_id\": \"5cef1a27asdfsdf8f02b1cbd\",\n          \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n          \"answer\": \"Ser la primera programadora\",\n          \"answers\": [\n              \"Descubrir un dinosaurio\",\n              \"Ser la primera programadora\",\n              \"Jugar muy bien al tenis\"\n              \"Construir la muralla china\"\n          ],\n          \"category\": {\n            \"name\": \"historia\",\n             \"color\": \"#F8F8F8\"\n          }\t\t\n      }\n       // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/challenges/random",
    "title": "Obtener desafio random",
    "name": "getRandomChallenge",
    "group": "Desafios",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene un desafío aleatorio</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/challenges/random\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "filename": "../trivia-test/components/challenges/controller.js",
    "groupTitle": "Desafios",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": "<p>Información sobre el desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Id del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Título del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.description",
            "description": "<p>Descripción del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.username",
            "description": "<p>Usuarix creadorx del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[10]",
            "optional": false,
            "field": "challenge.questions",
            "description": "<p>Preguntas del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "challenge.questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"challenge\": {\n      \"_id\": \"5cef1a27a9139458f02b1cbd\",\n      \"title\": \"Por qué razón se conoce a...?\",\n      \"description\": \"Adiviná por qué son famosas históricamente estas personas\",\n      \"username\": \"pablo\",\n      \"questions\": [{\n          \"_id\": \"5cef1a27asdfsdf8f02b1cbd\",\n          \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n          \"answer\": \"Ser la primera programadora\",\n          \"answers\": [\n              \"Descubrir un dinosaurio\",\n              \"Ser la primera programadora\",\n              \"Jugar muy bien al tenis\"\n              \"Construir la muralla china\"\n          ],\n          \"category\": {\n            \"name\": \"historia\",\n             \"color\": \"#F8F8F8\"\n          }\t\t\n      }\n       // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/challenges/search/:query/:page?",
    "title": "Buscar desafios",
    "name": "searchChallenges",
    "group": "Desafios",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Busca desafíos que tengan un texto en su título</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/challenges/search/ciencia\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "query",
            "description": "<p>El texto que se desea buscar</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de página del listado (10 desafíos por página)</p>"
          }
        ]
      }
    },
    "filename": "../trivia-test/components/challenges/controller.js",
    "groupTitle": "Desafios",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": "<p>Información sobre el desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Id del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Título del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.description",
            "description": "<p>Descripción del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.username",
            "description": "<p>Usuarix creadorx del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[10]",
            "optional": false,
            "field": "challenge.questions",
            "description": "<p>Preguntas del desafío</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "challenge.questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "challenge.questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "challenge.questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"challenge\": {\n      \"_id\": \"5cef1a27a9139458f02b1cbd\",\n      \"title\": \"Por qué razón se conoce a...?\",\n      \"description\": \"Adiviná por qué son famosas históricamente estas personas\",\n      \"username\": \"pablo\",\n      \"questions\": [{\n          \"_id\": \"5cef1a27asdfsdf8f02b1cbd\",\n          \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n          \"answer\": \"Ser la primera programadora\",\n          \"answers\": [\n              \"Descubrir un dinosaurio\",\n              \"Ser la primera programadora\",\n              \"Jugar muy bien al tenis\"\n              \"Construir la muralla china\"\n          ],\n          \"category\": {\n            \"name\": \"historia\",\n             \"color\": \"#F8F8F8\"\n          }\t\t\n      }\n       // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/challenges/upvote/:id?",
    "title": "Dar like a desafío",
    "name": "upvoteChallenge",
    "group": "Desafios",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Le suma un like al desafío</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/challenges/upvote/5cf2ffc54005a8207052616b/\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id del desafío que se quiere likear</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": \"true\",\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/challenges/controller.js",
    "groupTitle": "Desafios"
  },
  {
    "type": "get",
    "url": "/v1/notificationes/:quantity?/:page?",
    "title": "Obtener notificaciones",
    "name": "getNotifications",
    "group": "Notificaciones",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene todas las notificaciones de más nuevas a más viejas. Cuando se las obtiene, aquellas que estén sin leer se actualizan como leídas.</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/challenges/all/top\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "quantity",
            "defaultValue": "5",
            "description": "<p>Cantidad de notificaciones que se desea obtener</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de página de las notificaciones</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"success\": true,\n  \"notifications\": [\n      {\n          \"message\": \"random_citizen te ha vencido 7-9\",\n          \"read\": false\n      },\n      {\n       \"message\": \"random_citizen ha comenzado a seguirte!\",\n       \"read\": false\n   },\n   {\n       \"message\": \"Has empatado contra random_citizen 5-5!\",\n       \"read\": true\n   }",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/notifications/controller.js",
    "groupTitle": "Notificaciones"
  },
  {
    "type": "post",
    "url": "/v1/questions/",
    "title": "Agregar pregunta",
    "name": "addQuestion",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Agrega una pregunta</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions\", {\n     headers: {\n         \"Accept\": \"application/json\",\n         \"Content-Type\": \"application/json;  charset=UTF-8\"\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n     body: JSON.stringify({\n           title: \"Por qué razón es conocida Ada Lovelace?\",\n           answer: \"Ser la primera programadora\",\n           answers: [\n                   \"Descubrir un dinosaurio\",\n                   \"Ser la primera programadora\",\n                   \"Jugar muy bien al tenis\"\n                   \"Construir la muralla china\"\n               ],\n           \"category\": \"historia\"\t\t\n       })\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "Parameter",
            "type": "String[4]",
            "optional": false,
            "field": "answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Nombre de la categoría a la que pertenece la pregunta</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "question_id",
            "description": "<p>Id de la preguntada agregada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"users\": {\n       \"success\": \"true\",\n       \"message\": \"Pregunta añadida con éxito\",\n       \"question_id\": \"5ceefe4439bc8a4438d37426\"\n   }     \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas"
  },
  {
    "type": "post",
    "url": "/v1/questions/answer",
    "title": "Responder preguntas",
    "name": "answer",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Suma las preguntas respondidas al puntaje total de lx usuarix</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/answer\", {\n     headers: {\n         \"Accept\": \"application/json\",\n         \"Content-Type\": \"application/json;  charset=UTF-8\"\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n     body: JSON.stringify({\n          questions: [\n              \"5cf2ffc04005a82070526169\",\n              \"5cf2ffc54005a8207052616b\",\n              \"5cf2ffd34005a8207052616f\"\n              \"5cf2ffd74005a82070526170\"\n          ],\n       })\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "questions",
            "description": "<p>Ids de preguntas respondidas</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"Preguntas respondidas\"\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas"
  },
  {
    "type": "post",
    "url": "/v1/questions/downvote/:id?",
    "title": "Dar dislike a pregunta",
    "name": "downvote",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Le suma un dislike a la pregunta</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/downvote/5cf2ffc54005a8207052616b/\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la pregunta que se quiere dislikear</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": \"true\",\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas"
  },
  {
    "type": "get",
    "url": "/v1/questions/all",
    "title": "Obtener preguntas",
    "name": "getAll",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene el listado de todas las preguntas</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/all\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"top\"",
              "\"new\""
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "top",
            "description": "<p>Orden de las preguntas (por puntaje o novedad)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de página (10 preguntas por página)</p>"
          }
        ]
      }
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[]",
            "optional": false,
            "field": "questions",
            "description": "<p>Listado de preguntas aleatorias</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"questions\": [{\n      \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n      \"answer\": \"Ser la primera programadora\",\n      \"answers\": [\n          \"Descubrir un dinosaurio\",\n          \"Ser la primera programadora\",\n          \"Jugar muy bien al tenis\"\n          \"Construir la muralla china\"\n      ],\n      \"category\": {\n          \"name\": \"historia\",\n          \"color\": \"#F8F8F8\"\n      }\t\t\n   }\n   // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/questions/byuser/:username/:sort?/:page?",
    "title": "Obtener preguntas por usuarix",
    "name": "getAll",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene el listado de todas las preguntas de unx usuarix</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/byuser/ada/top/\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuarix</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"top\"",
              "\"new\""
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "top",
            "description": "<p>Orden de las preguntas (por puntaje o novedad)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de página (10 preguntas por página)</p>"
          }
        ]
      }
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[]",
            "optional": false,
            "field": "questions",
            "description": "<p>Listado de preguntas aleatorias</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"questions\": [{\n      \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n      \"answer\": \"Ser la primera programadora\",\n      \"answers\": [\n          \"Descubrir un dinosaurio\",\n          \"Ser la primera programadora\",\n          \"Jugar muy bien al tenis\"\n          \"Construir la muralla china\"\n      ],\n      \"category\": {\n          \"name\": \"historia\",\n          \"color\": \"#F8F8F8\"\n      }\t\t\n   }\n   // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/questions/bycategory/:category/:sort?/:page?",
    "title": "Obtener preguntas por categoría",
    "name": "getAllByCategory",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene el listado de preguntas de cierta categoría</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/bycategory/historia/new\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"top\"",
              "\"new\""
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "top",
            "description": "<p>Orden de las preguntas (por puntaje o novedad)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de página (10 preguntas por página)</p>"
          }
        ]
      }
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[]",
            "optional": false,
            "field": "questions",
            "description": "<p>Listado de preguntas aleatorias</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"questions\": [{\n      \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n      \"answer\": \"Ser la primera programadora\",\n      \"answers\": [\n          \"Descubrir un dinosaurio\",\n          \"Ser la primera programadora\",\n          \"Jugar muy bien al tenis\"\n          \"Construir la muralla china\"\n      ],\n      \"category\": {\n          \"name\": \"historia\",\n          \"color\": \"#F8F8F8\"\n      }\t\t\n   }\n   // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/questions/:id/",
    "title": "Obtener pregunta por id",
    "name": "getQuestionById",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene la información de una pregunta dado un id</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/5ceefe4439bc8a4438d37426\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la pregunta</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "question",
            "description": "<p>Pregunta correspondiente al id buscado</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "question._id",
            "description": "<p>Id de la preguntada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"question\": {\n      \"_id\": \"5cf2ffc24005a8207052616a\",\n      \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n      \"answer\": \"Ser la primera programadora\",\n      \"answers\": [\n          \"Descubrir un dinosaurio\",\n          \"Ser la primera programadora\",\n          \"Jugar muy bien al tenis\",\n          \"Construir la muralla china\"\n      ],\n     \"category\": {\n          \"name\": \"historia\",\n          \"color\": \"#F8F8F8\"\n      }\t\t\n   }     \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas"
  },
  {
    "type": "get",
    "url": "/v1/questions/random/",
    "title": "Obtener preguntas aleatorias",
    "name": "getRandom",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene 10 preguntas aleatorias</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/random\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[]",
            "optional": false,
            "field": "questions",
            "description": "<p>Listado de preguntas aleatorias</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"questions\": [{\n      \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n      \"answer\": \"Ser la primera programadora\",\n      \"answers\": [\n          \"Descubrir un dinosaurio\",\n          \"Ser la primera programadora\",\n          \"Jugar muy bien al tenis\"\n          \"Construir la muralla china\"\n      ],\n      \"category\": {\n          \"name\": \"historia\",\n          \"color\": \"#F8F8F8\"\n      }\t\t\n   }\n   // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/v1/questions/random/:category",
    "title": "Obtener preguntas aleatorias por categoría",
    "name": "getRandomByCategory",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene 10 preguntas aleatorias de una categoría</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/random/historia\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Nombre de la categoría</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[]",
            "optional": false,
            "field": "questions",
            "description": "<p>Listado de preguntas aleatorias</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"questions\": [{\n      \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n      \"answer\": \"Ser la primera programadora\",\n      \"answers\": [\n          \"Descubrir un dinosaurio\",\n          \"Ser la primera programadora\",\n          \"Jugar muy bien al tenis\"\n          \"Construir la muralla china\"\n      ],\n      \"category\": {\n          \"name\": \"historia\",\n          \"color\": \"#F8F8F8\"\n      }\t\t\n   }\n   // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas"
  },
  {
    "type": "get",
    "url": "/v1/questions/search/:query",
    "title": "Buscar preguntas",
    "name": "search",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Busca preguntas por texto en título</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/search/ada\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de página (10 preguntas por página)</p>"
          }
        ]
      }
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas",
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[]",
            "optional": false,
            "field": "questions",
            "description": "<p>Listado de preguntas aleatorias</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question",
            "description": "<p>Datos de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question._id",
            "description": "<p>Id de la preguntada agregada</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.title",
            "description": "<p>Enunciado de la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.answer",
            "description": "<p>Respuesta correcta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[4]",
            "optional": false,
            "field": "questions.question.answers",
            "description": "<p>Lista de las cuatro respuestas posibles</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "questions.question.category",
            "description": "<p>Categoría a la que pertenece la pregunta</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.name",
            "description": "<p>Nombre de la categoría</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "questions.question.category.color",
            "description": "<p>Color opcional asignado a la categoría</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"questions\": [{\n      \"title\": \"Por qué razón es conocida Ada Lovelace?\",\n      \"answer\": \"Ser la primera programadora\",\n      \"answers\": [\n          \"Descubrir un dinosaurio\",\n          \"Ser la primera programadora\",\n          \"Jugar muy bien al tenis\"\n          \"Construir la muralla china\"\n      ],\n      \"category\": {\n          \"name\": \"historia\",\n          \"color\": \"#F8F8F8\"\n      }\t\t\n   }\n   // +9 questions\n   ]     \n}",
          "type": "type"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/v1/questions/upvote/:id?",
    "title": "Dar like a pregunta",
    "name": "upvote",
    "group": "Preguntas",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Le suma un like a la pregunta</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/questions/upvote/5cf2ffc54005a8207052616b\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\",\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la pregunta que se quiere likear</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": \"true\",\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/questions/controller.js",
    "groupTitle": "Preguntas"
  },
  {
    "type": "post",
    "url": "/v1/users/follow/:username",
    "title": "Seguir a usuarixs",
    "name": "follow",
    "group": "Usuarixs",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Comenzar a seguir a unx usuarix para que nos lleguen notificaciones cuando suba un nuevo desafío</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/users/follow/ada\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\"\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Usuarix que vamos a seguir</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"Has comenzado a seguir a ada\"\n   }     \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/users/controller.js",
    "groupTitle": "Usuarixs"
  },
  {
    "type": "get",
    "url": "/v1/users/all/:filter?/:page?",
    "title": "Obtener rankings de usuarixs",
    "name": "getAll",
    "group": "Usuarixs",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene una lista con todxs lxs usuarixs, ya sea por puntaje total o por puntaje por categorías</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/users/all/historia\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\"\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "filter",
            "defaultValue": "answers",
            "description": "<p>Filtro con el que se desea realizar la búsqueda, puede ser &quot;answers&quot; para puntaje total, o cualquier nombre de una categoría existente</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Número de la página de búsqueda, trae 10 resultados por página</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>Listado de usuarixs</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>Id de usuarix</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Nombre de usuarix</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Number",
            "optional": false,
            "field": "user.answered",
            "description": "<p>Puntaje de usuarix (cantidad de preguntas respondidas)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"users\": [{\n       \"_id\": \"5ceefe4439bc8a4438d37426\",\n       \"username\": \"ada\",\n       \"answered\": 234\n   }, {\n       \"_id\": \"5ceefg3455538a4438d37426\",\n       \"username\": \"random_citizen\",\n       \"answered\": 122\n   }]     \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/users/controller.js",
    "groupTitle": "Usuarixs"
  },
  {
    "type": "get",
    "url": "/v1/users/:username",
    "title": "Obtener perfil",
    "name": "getByUsername",
    "group": "Usuarixs",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Obtiene la información del perfil de usuarix que se le pasa por parámetro</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/users/ada\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"get\"\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuarix del perfil que se desea obtener</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Info de perfil de usuarix</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>Id de usuarix</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Nombre de usuarix</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Number",
            "optional": false,
            "field": "user.competitions_won",
            "description": "<p>Cantidad de competiciones ganadas</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[]",
            "optional": false,
            "field": "user.following",
            "description": "<p>Lista de usuarixs que sigue</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String[]",
            "optional": false,
            "field": "user.followers",
            "description": "<p>Lista de usuarixs que le siguen</p>"
          },
          {
            "group": "200 (OK)",
            "type": "Number",
            "optional": false,
            "field": "user.answered",
            "description": "<p>Puntaje de usuarix (cantidad de preguntas respondidas)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"user\": {\n       \"_id\": \"5ceefe4439bc8a4438d37426\",\n       \"username\": \"ada\",\n       \"competitions_won\": 3,\n       \"following\": [\n          \"random_citizen\"   \n       ],\n       \"followers\": [\n          \"random_citizen\"\n       ]\n       \"answered\": 234\n   }     \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/users/controller.js",
    "groupTitle": "Usuarixs"
  },
  {
    "type": "post",
    "url": "/v1/users/login",
    "title": "Loguear usuarix",
    "name": "loginuser",
    "group": "Usuarixs",
    "version": "1.0.0",
    "description": "<p>Loguea unx usuarix registradx y devuelve el token de autenticación si los datos ingresados son correctos</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/users/login\", {\n     headers: {\n         \"Accept\": \"application/json\",\n         \"Content-Type\": \"application/json;  charset=UTF-8\"\n     },\n     method: \"post\",\n     body: JSON.stringify({\n         username: \"ada\",\n         password: \"adaitw\"\n     })  \n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuarix</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\": \"ada\",\n    \"password\": \"adaitw\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de autenticación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": \"true\",\n    \"message\": \"Login exitoso\",\n    \"token\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/users/controller.js",
    "groupTitle": "Usuarixs"
  },
  {
    "type": "post",
    "url": "/v1/users/signin",
    "title": "Registrar usuarix",
    "name": "signinuser",
    "group": "Usuarixs",
    "version": "1.0.0",
    "description": "<p>Registra unx usuarix que no se encuentre registradx ya en la base de datos</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/users/signin\", {\n     headers: {\n         \"Accept\": \"application/json\",\n         \"Content-Type\": \"application/json;  charset=UTF-8\"\n     },\n     method: \"post\",\n     body: JSON.stringify({\n         username: \"ada\",\n         password: \"adaitw\"\n     })  \n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de usuarix</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\": \"ada\",\n    \"password\": \"adaitw\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": \"true\",\n    \"message\": \"Usuarix creadx exitosamente\" \n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/users/controller.js",
    "groupTitle": "Usuarixs"
  },
  {
    "type": "post",
    "url": "/v1/users/unfollow/:username",
    "title": "Dejar de seguir a usuarixs",
    "name": "unfollow",
    "group": "Usuarixs",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización.</p>"
          }
        ]
      }
    },
    "description": "<p>Deja de seguir a unx usuarix</p>",
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "fetch(\"https://preguntadas.herokuapp.com/v1/users/unfollow/ada\", {\n     headers: {\n         \"Authorization\": \"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0\"\n     },\n     method: \"post\"\n}).then(function(result) {\n     return result.json();\n}).then(function(result) {\n\n}).catch(function(error) {\n\n});",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Usuarix que vamos a dejar de seguir</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 (OK)": [
          {
            "group": "200 (OK)",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la operación</p>"
          },
          {
            "group": "200 (OK)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje resultado de la operación</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"Has dejado de seguir a ada\"\n}",
          "type": "type"
        }
      ]
    },
    "filename": "../trivia-test/components/users/controller.js",
    "groupTitle": "Usuarixs"
  }
] });
