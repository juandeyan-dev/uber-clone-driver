### Entrada #1
Fecha: 2026-11-03
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Vinculación del repositorio y definición de la arquitectura base del proyecto
Prompt: "Ya terminé de vincular el proyecto inicial con el repo, para que mi compañero y yo empecemos a trabajar"
Resumen de la respuesta: El Tech Lead estableció el flujo de trabajo en Git mediante ramas individuales y Pull Requests, e indicó la estructura de carpetas limpia exigida (components, screens, services, theme, docs).
Qué se usó / modificó / descartó: Se adoptó la estructura base de carpetas y el flujo de trabajo con ramas.
Archivos y commit: docs/AI_LOG.md, README.md, .gitignore (Commit: INSERTAR_AQUI_HASH_CORTO)
Verificación: Repositorio remoto vinculado y estructura de carpetas confirmada localmente.
Aprendizaje: Flujo de trabajo colaborativo en Git mediante PRs y separación de la arquitectura en capas.
Commit: afc7f95

### Entrada #2
Fecha: 2026-11-04
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Implementar servicio de geolocalización continua (useDriverLocation)
Prompt: "Dices que hay que utilizar el watchPosition que es nativo de Expo... o esto será la lógica y después cuando consumamos las APIS será suficiente..." (desarrollo iterativo del hook).
Resumen de la respuesta: El Tech Lead explicó la diferencia entre hardware local y consumo de APIs en la nube. Me guio mediante revisiones de código (Peer Review) para implementar correctamente el hook con solicitud de permisos, watchPositionAsync y la función de limpieza (cleanup) del useEffect para no consumir cuota innecesaria.
Qué se usó / modificó / descartó: Se construyó desde cero el hook con estado local y control de la suscripción del GPS.
Archivos y commit: src/services/useDriverLocation.js (Commit: INSERTAR_AQUI_HASH_CORTO)
Verificación: Lógica asíncrona revisada y control de fugas de memoria validado por el Tech Lead.
Aprendizaje: Comprendí el ciclo de vida del useEffect para servicios continuos, la diferencia entre mayúsculas/minúsculas en los retornos de React y cómo remover suscripciones activas.