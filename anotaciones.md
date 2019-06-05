# Ada Trivia

## Temas
          
    
    * Funciones
        - Cada acción que se vaya a hacer es una función

        * Login/Register
            - validarInputs [return]
            - chequearUsuarix [return]
            - chequarLogin [return]
            - registrarUsuarix
            - loguearUsuarix
        * Home
            - obtenerDatosPerfil [return][objeto] 
            - mostrarDatosPerfil [DOM]
            - obtenerDesafioRandom (y redirigir)
            - mostrarOpcionesNuevoJuego [DOM] 
            - comenzarNuevoJuego (redirigir)
        * Perfil
            - obtenerDatosPerfil [return] 
            - obtenerEstadísticas [return]
            - obtenerDesafíos [return]
            - obtenerCompetencias [DOM]
            - mostrarDatosPerfil [DOM]
            - mostrarEstadísticas [DOM]
            - mostrarDesafíos [DOM]
            - mostrarCompetencias [DOM]
            - seguir/dejarDeSeguir
            - desloguearse
            - desafiarACompetencia
            - mostrarOpcionesCompetencia [DOM] 
            - comenzarCompetencia     
        * Crear pregunta
            - validarInputs [return]
            - obtenerCategorias [return]
            - mostrarCategorias [DOM]
            - seleccionarCategoria [DOM]
            - agregarPregunta [DOM]
            - enviarPregunta
        * Crear desafío
            - validarInputs
            - obtenerPreguntas [return]
            - mostrarPreguntas [DOM]
            - agregarPregunta [DOM]
            - enviarDesafio
        * Juego      
            - obtenerPreguntas [return]
            - obtenerSiguientePregunta [return]
            - mostrarPregunta [DOM]
            - validarRespuesta
            - actualizarProgreso
            - mostrarProgreso [DOM]
            - actualizarResultado
            - mostrarResultado [DOM]
            - actualizarPuntaje/Experiencia
            - calificarPregunta
            - calificarDesafio
            - completarCompetencia
        * Rankings
            - obtenerUsuarixs (filtro, pagina) [return][array/objeto]
            - obtenerDesafios (filtro, pagina) [return][array/objeto]
            - obtenerCategorias (filtro, pagina) [return][array/objeto]
            - mostrarUsuarixs [DOM]
            - mostrarDesafios [DOM]
            - mostrarCategorias [DOM]
        * Notificaciones         
            - obtenerNotificaciones [return][array/objeto]
            - mostrarNotificaciones [DOM]

    * Arrays
        - Preguntas
        - Categorías
        - Desafíos
        - Notificaciones
        - Siguiendo / Le siguen
        - Usuarixs (rankings)

    * Objetos
        - Usuarix
        - Idem arrays pero mejorado
        - Pasar funciones a metodos

    * Fetch 
        - Todo lo anterior

## Planificación

### DIA 1

    1. Presentar el proyecto
    2. Presentar los roles y que definan cuál van a ser cada una
    3. Presentar Trello y explicar flujo de trabajo
        - Etiquetas
        - Todo
        - Comentarios
        - Vencimiento
        - Filtros
    4. Que se creen la cuenta, la PM cree el tablero del proyecto e invita a colaborar a las demás (a Sabri y a mí)
    5. Explicar rebase
    6. Presentación modo de flujo de trabajo (TERMINAR DE DEFINIR)
        - Paradas en master hacemos pull
        - Creamos la branch de la feature desde master
        - Cuando terminamos la pusheamos
        - TL la mergea a dev
        - Tester la prueba en dev
        - Tester la aprueba
        - TL la mergea a master
        - Se borra branch de la feature, se hace pull de master y se vuelve a crear otra branch para trabajar
    7. Crear repo del proyecto que se agreguen como colaboradoras        
    8. Definir pantallas, diseño, estilo y flujos (dibujo, desktop/mobile)
    9. Definir, estimar y distribuirse tareas iniciales (en Trello)
    10. Clonar el repo
    11. Definir estructura del proyecto inicial
    archivos y carpetas (con contenido) y subir el primer commit a master

### DIA 2     

    1. Explicar return
    2. Ir definiendo funciones que devuelvan valores (booleanos y strings por ahora):
        - Validaciones de inputs
        - Obtener datos (como si fuera de db)
    3. Ir probando valores en consola       
    4. Maquetar ALGO
    5. Hacer funciones que llamen a las del punto 2, y rendericen en HTML lo que devuelven 

### DIA 3

    1. Aprovechar paro para maquetar

### DIA 4     

    1. Explicar arrays
    2. Crear arrays de cosas necesarias simulando db y devolverlos en las funciones correspondientes
    3. Iterarlos y renderizarlos mostrando el HTML
    4. Maquetar un poco más

### DIA 5

    1. Explicar DOM (seleccionar clases, querySelectorAll, etc)
    2. Explicar createElement, appendChild 
    3. Explicar addListener para HTML dinámico
    4. Adaptar las funciones que toman datos de array
    y generan HTML a elements
    5. Investigar otras propiedas y métodos de element

## FINDE

    1. Aprovechar finde para maquetar

### DIA 6     
### DIA 7     
### DIA 8     
### DIA 9     
### DIA 10     


## Cosas a investigar

    * Gradientes
    * Parámetros URL

## Opcionales

    * Avatar
    * Equipos
    * Modos de juego
        - [OPCIONAL] Por tiempo: idem normal, pero con una cantidad de tiempo por preguntas (10s), si se termina el tiempo se toma la pregunta como incorrecta
        - [OPCIONAL] Supervivencia: ver a cuantas preguntas se puede responder bien sin equivocarse, cuando se erra una termina el desafío
        - [OPCIONAL] Supervivencia por tiempo: idem supervivencia, pero con tiempo por preguntas, si se termina el tiempo de alguna de ellas (o se responde mal), termina el juego
        - [OPCIONAL] Velocidad: cuántas preguntas se pueden responder en un tiempo determinado (1m, 3m, etc)