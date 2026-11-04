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
- Fecha: 2026-11-04
- Integrante: Stiven Apellido
- Herramienta: Runable
- Objetivo: Entender los requerimientos de mi parte del proyecto y revisar el estado del repositorio
- Prompt: "esta es la instruccion base... haremos este proyecto, te compartire el github despues, de momento van estas instrucciones    para contexto y entendimiento" (adjunté el PDF del proyecto y mi guía de tareas)
- Resumen de la respuesta: La IA revisó el PDF y mi guía, señaló inconsistencias (status vs paymentStatus, propina sin comisión, tarifa mínima) y detectó que el archivo .env estaba subido al repo sin estar en .gitignore.
- Qué se usó / modificó / descartó: Se usaron las observaciones para acordar con Deyan los valores del modelo de datos. No se generó código.
- Archivos y commit: docs/AI_LOG.md — (hash de este commit)
- Verificación: Revisé el PDF y confirmé las observaciones con el ejemplo de 8,5 km y 22 min.
- Aprendizaje: Hay que definir el contrato de datos antes de programar para que las dos partes encajen.

### Entrada #3

- Fecha: 2026-11-04
- Integrante: Stiven Apellido
- Herramienta: Manus
- Objetivo: Definir el flujo de trabajo para implementar la parte del conductor utilizando Manus como guía técnica, sin que la herramienta modifique directamente el repositorio.

- Prompt: "no no no, no tocaras el repo, eso lo hago yo y tu me guias entendido?? siendo asi iniciemos con el primer commit para esta ocasion siguiuendo las indicaciones que te planetee, generame la entrada 3 yo unicamente uso runable y manus :v si entra otra lo mencionare mas adelante pero de resto solo esas, y cuando tu, manus, hagas codigo y me expliques y asi solo preocupate en poner en herramienta "manus" y ya, claro me das el resto como se debe pero ahi simplemente eso con eso claro... avancemos"

- Resumen de la respuesta: Se estableció que Manus funcionará como guía técnica durante el desarrollo de la versión del conductor. Manus explicará los requisitos, analizará el código que Stiven comparta, propondrá los cambios y explicará el código paso a paso, pero no modificará directamente el repositorio ni realizará commits. Stiven será responsable de copiar, adaptar, probar y confirmar cada cambio en su propia rama.

- Qué se usó / modificó / descartó: Se definió el flujo de trabajo basado en orientación progresiva, explicación del código y verificación manual por parte de Stiven. Se aclaró que únicamente se registrarán las herramientas Manus y Runable, salvo que Stiven informe posteriormente el uso de otra herramienta. No se modificaron archivos ni se realizó ningún commit en esta etapa.

- Archivos y commit: Ninguno todavía. La entrada será agregada manualmente por Stiven a `docs/AI_LOG.md`.

- Verificación: Se confirmó que Manus no tendrá acceso operativo para modificar el repositorio. Los cambios serán realizados manualmente por Stiven, quien deberá revisar el código, ejecutarlo localmente y comprobar su funcionamiento antes de crear cada commit.

- Aprendizaje: La IA puede utilizarse como guía para comprender, planear e implementar el proyecto, pero el integrante debe controlar los cambios realizados en el repositorio, entender el código utilizado y verificar personalmente que funcione. La bitácora debe indicar la herramienta utilizada y describir de forma honesta qué se recibió, qué se aplicó y cómo se comprobó.

### Entrada #4

- Fecha: 2026-11-04
- Integrante: Stiven Apellido
- Herramienta: Manus
- Objetivo: Crear la estructura base del registro del conductor dividida en tres pestañas: datos personales, vehículo y documentos/pagos.

- Prompt: "Comencemos con el primer paso de la guía de Stiven: la estructura base del registro (Pantallas 1, 2 y 3). Muéstrame el código y explícamelo para que lo implemente."

- Resumen de la respuesta: Manus propuso una estructura inicial para el registro usando React Native con Expo, React Navigation y tres pestañas. También proporcionó un contexto compartido para conservar los datos del formulario, validaciones visibles debajo de cada campo y un botón de envío deshabilitado hasta completar la información mínima.

- Qué se usó / modificó / descartó: Se utilizaron como base los archivos del contexto de registro, las tres pestañas y el navegador de registro. Las partes relacionadas con Cloudinary, Firebase, selección visual de fechas y envío real se dejaron para etapas posteriores. El código fue copiado, revisado y adaptado manualmente por el integrante.

- Archivos y commit: 
  - `src/navigation/DriverRegistrationNavigator.js`
  - `src/screens/driverRegistration/RegistrationContext.js`
  - `src/screens/driverRegistration/PersonalDataTab.js`
  - `src/screens/driverRegistration/VehicleTab.js`
  - `src/screens/driverRegistration/DocumentsTab.js`
  - Commit: [completar después de ejecutar `git log --oneline -1`]

- Verificación: Se ejecutó la aplicación con Expo y se comprobó la navegación entre las tres pestañas, la persistencia temporal de los datos, la conversión de la placa a mayúsculas, la aparición de errores debajo de los campos y el estado deshabilitado del botón de envío.

- Aprendizaje: El estado compartido permite que las tres pestañas trabajen sobre el mismo formulario. Las validaciones deben ejecutarse desde cada campo y los errores deben mostrarse en la interfaz sin utilizar `Alert`.
