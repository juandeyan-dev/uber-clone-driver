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
Archivos y commit: src/services/useDriverLocation.js (Commit: d413c84)
Verificación: Lógica asíncrona revisada y control de fugas de memoria validado por el Tech Lead.
Aprendizaje: Comprendí el ciclo de vida del useEffect para servicios continuos, la diferencia entre mayúsculas/minúsculas en los retornos de React y cómo remover suscripciones activas.

### Entrada #3
Fecha: 2026-11-05
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Crear pantalla inicial (MapScreen) con manejo de estado Disponible/No disponible.
Prompt: "import React, { useState, useEffect } from 'react'... export default function MapScreen() {..." (código inicial de la vista).
Resumen de la respuesta: El Tech Lead detectó riesgos de "crash" al intentar renderizar objetos nulos en JSX y corrigió el uso de sentencias if dentro del return. Se implementó un operador ternario para manejar el estado "Cargando" (Esperando ubicación...).
Qué se usó / modificó / descartó: Se creó la interfaz base MapScreen.js incorporando el componente Switch y conectándolo al estado local isAvailable, validando las coordenadas del hook de ubicación.
Archivos y commit: src/screens/MapScreen.js (Commit: 92bd0ac)
Verificación: La pantalla renderiza correctamente sin crashes cuando el estado inicial del GPS es nulo.
Aprendizaje: Uso correcto del operador ternario en JSX y validación estricta de propiedades anidadas de objetos (location.coords) para evitar errores de referencia en React Native.

### Entrada #4
Fecha: 2026-11-05
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Conectar el interruptor de disponibilidad (MapScreen) con el control de encendido/apagado del GPS (useDriverLocation).
Prompt: "import React, {useState, useEffect} from 'react'... export default function useDriverLocation(isAvailable) {..." (código con el paso de parámetros y corrección de dependencias).
Resumen de la respuesta: El Tech Lead detectó un problema de "Temporal Dead Zone" al intentar usar el estado antes de declararlo en MapScreen, y señaló la falta de la dependencia `isAvailable` en el useEffect del hook. 
Qué se usó / modificó / descartó: Se reordenó la declaración del estado en MapScreen.js y se inyectó `isAvailable` en el arreglo de dependencias de `useDriverLocation.js`, condicionando la ejecución de `startTracking()` para apagar el GPS exitosamente.
Archivos y commit: src/screens/MapScreen.js, src/services/useDriverLocation.js (Commit: d3b1943)
Verificación: El componente compila sin crashes y la suscripción del GPS se destruye correctamente al apagar el interruptor, cumpliendo la regla de optimización de recursos.
Aprendizaje: Comprendí la importancia del orden de declaración (Temporal Dead Zone) en JavaScript y cómo los parámetros inyectados a un hook deben incluirse en el arreglo de dependencias del useEffect para que reaccione a los cambios.
- Fecha: 2026-11-04
- Integrante: Stiven Hernandez
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
- Integrante: Stiven Hernandez
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
- Integrante: Stiven Hernandez
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
  - Commits: se hicieron varios commits en cada creacion de cada una de los archivos, y unos extras que hice sin guardar cambios entoces el commit no los agarro 

- Verificación: Se ejecutó la aplicación con Expo y se comprobó la navegación entre las tres pestañas, la persistencia temporal de los datos, la conversión de la placa a mayúsculas, la aparición de errores debajo de los campos y el estado deshabilitado del botón de envío.

- Aprendizaje: El estado compartido permite que las tres pestañas trabajen sobre el mismo formulario. Las validaciones deben ejecutarse desde cada campo y los errores deben mostrarse en la interfaz sin utilizar `Alert`.

### Entrada #5

- Fecha: 2026-11-04
- Integrante: Stiven Hernandez
- Herramienta: Manus
- Objetivo: Resolver los errores de ejecución encontrados al implementar y probar la estructura base del registro del conductor con tres pestañas.

- Prompt:

  "me salio este error, tambien agregre esto: 
  npm install @react-navigation/stack

  y tengo la app.js asi

  import { StatusBar } from 'expo-status-bar';
  import {NavigationContainer} from '@react-navigation/native'
  import {createStackNavigator} from '@react-navigation/stack'

  import DriverRegistrationNavigator from './src/navigation/DriverRegistrationNavigator';

  const Stack = createStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="DriverRegistration"
            component={DriverRegistrationNavigator}
            options={{title: 'Registro de conductor'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  [Se adjuntó una captura del error relacionado con createMaterialTopTabNavigator]"

  "mas te vale agregar eso en la entrada esa que porcierto ahora es la 5 no la 4

  > npx expo doctor

    $ expo doctor is not supported in the local CLI, please use npx expo-doctor instead

  PS D:\Dev\5SEMESTRE\desarollo movil\desarollo movil\uber-clone-driver>"

  "no haremos el #5 hasta arreglar esto, asi que ve llevando registro"

  "Render Error

  undefined is not a function

  Source:
  D:\Dev\5SEMESTRE\desarollo movil\desarollo movil\uber-clone-driver\node_modules\react-native-gesture-handler\src\moduleId.ts (8:49)

  Call Stack:
  getModuleId (...)
  GestureHandlerRootView (...)
  
  tenemos nuevo error."

  "Render Error

  Property 'ErrorText' doesn't exist

  Source:
  D:\Dev\5SEMESTRE\desarollo movil\desarollo movil\uber-clone-driver\src\screens\driverRegistration\VehicleTab.js (92:13)

  Call Stack:
  VehicleTab (... línea 92 ...)

  mira con mas detalle"

  "ya quedo creo

  return (
          <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.title}>Vehiculo</Text>
              <Text style={styles.label}>Categoría</Text>
              <View style={styles.optionsRow}>
                  {[
                      { label: 'Economico', value: 'economico' },
                      { label: 'XL', value: 'xl' },
                      { label: 'Premium', value: 'premium' },
                  ].map((option) => (
                      <TouchableOpacity
                          key={option.value}
                          style={[
                              styles.optionButton,
                              vehicle.category === option.value && styles.selectedOption,
                          ]}
                          onPress={() => updateField('category', option.value)}
                      >
                          <Text>{option.label}</Text>
                      </TouchableOpacity>
                  ))}
              </View>
              <ErrorMessage message={errors.category} />

  Text style={styles.label}>Placa</Text>
              <TextInput
                  style={styles.input}
                  value={vehicle.plate}
                  maxLength={30}
                  onChangeText={(value) => handleChange('plate', value)}
              />
              <ErrorMessage  message={errors.plate} />

              <Text style={styles.label}>Modelo</Text>
              <TextInput
                  style={styles.input}
                  value={vehicle.model}
                  maxLength={30}
                  onChangeText={(value) => handleChange('model', value)}
                  placeholder="Ejemplo: Onix"
              />
              <ErrorMessage  message={errors.model} />

              <Text style={styles.label}>Año</Text>
              <TextInput
                  style={styles.input}
                  value={vehicle.year}
                  keyboardType="numeric"
                  maxLength={4}
                  onChangeText={(value) => handleChange('year', value)}
                  placeholder="Ejemplo: 2020"
              />
              <ErrorMessage  message={errors.year} />

              <Text style={styles.label}>Color</Text>
              <TextInput
                  style={styles.input}
                  value={vehicle.color}
                  onChangeText={(value) => handleChange('color', value)}
                  placeholder="Ejemplo: Rojo"
              />
              <ErrorMessage  message={errors.color} />

              <Text style={styles.label}>Capacidad de pasajeros</Text>
              <TextInput
                  style={styles.input}
                  value={vehicle.capacity}
                  keyboardType="numeric"
                  onChangeText={(value) => handleChange('capacity', value)}
                  placeholder="Ejemplo: 4"
  <ErrorMessage  message={errors.capacity} />

              <Text style={styles.label}>Foto del vehículo</Text>
              <TouchableOpacity
                  style={styles.photoButton}"

  "funcionando correctamente"

  "PS D:\Dev\5SEMESTRE\desarollo movil\uber-clone-driver> git status
  On branch stiven
  Your branch is ahead of 'origin/stiven' by 9 commits.
    (use "git push" to publish your local commits)

  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
          modified:   App.js
          modified:   package-lock.json
          modified:   package.json
          modified:   src/navigation/DriverRegistrationNavigator.js
          modified:   src/screens/driverRegistration/DocumentsTab.js
          modified:   src/screens/driverRegistration/VehicleTab.js

  no changes added to commit (use "git add" and/or "git commit -a")"

  "esos commits son por cada pantalla y asi, relax si estan revisados, ahre el commit y push"

- Resumen de la respuesta:

  Durante la prueba de la estructura base del registro aparecieron varios errores. Primero, React Native no encontraba `createMaterialTopTabNavigator`, porque el navegador `Stack` y el navegador `Material Top Tabs` requieren paquetes independientes. Después apareció un error relacionado con `react-native-gesture-handler`, utilizado por React Navigation Stack. Finalmente se corrigieron errores en `VehicleTab.js`, incluyendo el uso de `ErrorText` cuando el componente declarado se llamaba `ErrorMessage`, errores de sintaxis JSX, el límite incorrecto de caracteres para la placa y la variable `normalizedValue` sin declarar.

  Manus indicó instalar las dependencias compatibles mediante Expo, agregar `react-native-gesture-handler` como primer import de `App.js`, limpiar la caché de Metro y revisar las versiones instaladas. También se explicó que los valores técnicos de las categorías debían ser `economy`, `xl` y `premium`.

- Qué se usó / modificó / descartó:

  Se utilizaron las siguientes recomendaciones:

  - Instalación de las dependencias de navegación mediante `npx expo install`.
  - Uso separado de `@react-navigation/stack` y `@react-navigation/material-top-tabs`.
  - Inclusión de `react-native-gesture-handler` al inicio de `App.js`.
  - Corrección de `ErrorText` a `ErrorMessage`.
  - Corrección de la etiqueta incompleta de Placa:
  
    ```jsx
    <Text style={styles.label}>Placa</Text>
    ```

  - Corrección del límite de la placa de `30` a `6` caracteres.
  - Inclusión del campo Marca, requerido por la guía.
  - Cierre correcto del componente `TextInput` de Capacidad.
  - Declaración de la variable usada para normalizar la placa:

    ```js
    let normalizedValue = value;
    ```

  - Conversión automática de la placa a mayúsculas y eliminación de espacios.
  - Uso de los valores técnicos:

    ```js
    economy
    xl
    premium
    ```

  Se descartó usar únicamente `@react-navigation/stack` para resolver el problema de `createMaterialTopTabNavigator`, porque ambos navegadores son paquetes independientes. También se dejó para una etapa posterior la integración con Cloudinary, Firebase, los selectores visuales de fecha y la pantalla real de aprobación.

- Archivos y commit:

  Archivos modificados:

  - `App.js`
  - `package.json`
  - `package-lock.json`
  - `src/navigation/DriverRegistrationNavigator.js`
  - `src/screens/driverRegistration/DocumentsTab.js`
  - `src/screens/driverRegistration/VehicleTab.js`

  Commit:
  resolver errores de runtime en validaciones de documentos y vehículo
- DocumentsTab: Alinea el nombre del parámetro en la función 'setErrors' con la variable del operador spread para evitar el error 'Property 'previousErrors' doesn't exist'.
- VehicleTab: Corrige la declaración y asignación de la variable en 'handleChange' para prevenir el fallo 'normalizeValue doesn't exist' al transformar la placa a mayúsculas.

  URL: https://manus.im/share/H1JlQmIwGf9H8760uNOvap . era manus no runable :v JAJAJAJA perdon

  ### Entrada #6

- Fecha: 2026-11-05
- Integrante: Stiven Hernandez
- Herramienta: Manus
- Objetivo: Crear el archivo compartido `src/config/pricing.js` con las reglas base de tarifas del proyecto UberClone Conductor.

- Prompt: "bueno vamos con mi lista

  Lista corregida y completa
  Día 1 — Tarifas, registro y aprobación

  Mañana:
  Crear pricing.js.
  Crear y probar calculateFare.js.
  Congelar con Juan el contrato de perfiles y viajes.
  Confirmar los archivos compartidos en main.
  Integrar selector de fecha de nacimiento.
  Validar edad mínima de 18 años.
  Integrar fechas de vencimiento de documentos.
  Validar que las fechas sean posteriores a hoy.

  Tarde:
  Completar validaciones personales.
  Completar validaciones del vehículo.
  Completar validaciones de documentos y pagos.
  Integrar selección de fotos.
  Subir fotos a Cloudinary.
  Mostrar y exigir la comisión del 20 %.
  Crear pantalla Pendiente de Aprobación.
  Guardar isApproved: false.
  Bloquear el acceso al mapa y a Disponible mientras no exista aprobación.

  Día 2 — Perfil, ganancias, historial y entrega
  Mañana:
  Crear perfil y configuración.
  Implementar edición de datos personales, vehículo y documentos.
  Implementar idioma y preferencias con AsyncStorage.
  Implementar cierre de sesión.
  Crear useEarnings.
  Calcular métricas con useMemo para hoy, semana y mes.
  Mostrar viajes, total facturado, comisión, propinas, ganancia neta, promedio y saldo.

  Tarde:
  Crear historial con FlatList.
  Agregar límite o paginación de aproximadamente 20 viajes.
  Agregar filtros de tiempo y método de pago.
  Agregar orden cronológico descendente.
  Agregar estado vacío.
  Crear detalle del viaje.
  Dibujar la ruta con Polyline.
  Mostrar distancia, duración, tarifa, comisión, propina, ganancia y calificación.
  Completar docs/AI_LOG.md.
  Agregar referencias AI-assisted.
  Ejecutar pruebas finales.
  Crear Pull Request de tu rama hacia main."

- Resumen de la respuesta: Manus indicó que el siguiente punto pendiente era crear `src/config/pricing.js` antes de implementar `calculateFare.js`. Se definió una configuración centralizada para evitar duplicar las reglas de tarifas en distintas partes del proyecto.

- Qué se usó / modificó / descartó: Se utilizó la estructura propuesta para crear manualmente `src/config/pricing.js`. El archivo incluye la tarifa base de 3500 COP, el valor de 1200 COP por kilómetro, el valor de 250 COP por minuto, la tarifa mínima de 6000 COP, la comisión de 0.20, los multiplicadores `economy`, `xl` y `premium`, y la unidad de redondeo de 100 COP. También se conservaron cambios en comentarios personales de archivos anteriores, sin modificar la lógica funcional. No se utilizaron API keys, tokens ni datos sensibles.

- Archivos y commit: `src/config/pricing.js` — `39d9302`

- Verificación: Se comprobó que el archivo estuviera ubicado en `src/config/pricing.js`, que contuviera los valores definidos en el documento oficial y que no incluyera información sensible. Después se creó y publicó el commit en la rama `stiven`.

- Aprendizaje: Entendí que las reglas de tarifas deben estar centralizadas en un único archivo compartido para evitar diferencias entre los cálculos del pasajero, el conductor y el backend. También comprendí que la comisión debe expresarse como `0.20` y que las categorías deben utilizar los identificadores técnicos `economy`, `xl` y `premium`.

### Entrada #7

- Fecha: 2026-11-05
- Integrante: Stiven Hernandez
- Herramienta: Manus
- Objetivo: Crear la función pura `calculateFare` para calcular la tarifa, la comisión de la plataforma y la ganancia neta del conductor usando la configuración compartida del proyecto.

- Prompt: "vale vamos con lo siguiente y con su respectiva entrada, cada entrada sera un commit vale?, de una vez digo que hare los comentarios del commit diferentes como habras notado"

- Resumen de la respuesta: Manus explicó que la siguiente tarea era crear `src/utils/calculateFare.js` utilizando los valores de `src/config/pricing.js`. Se implementó el cálculo de distancia, duración, multiplicador por categoría, tarifa mínima, redondeo al múltiplo de 100 COP, comisión del 20 % y ganancia del conductor con la propina completa.

- Qué se usó / modificó / descartó: Se utilizó la función propuesta como base y se adaptó manualmente en el repositorio. La función recibe `distanceKm`, `durationMin`, `category` y `tip`, y devuelve `fare`, `commission` y `driverEarnings`. Se descartaron los bloques temporales de prueba y los `console.log` antes del commit final.

- Archivos y commit: `src/utils/calculateFare.js` — `4f0cf3c`

- Verificación: Se probó el ejemplo oficial de 8,5 km y 22 minutos. Para `economy`, el resultado esperado fue una tarifa de 19.200 COP, comisión de 3.840 COP y ganancia neta de 15.360 COP. Para `xl`, el resultado esperado fue una tarifa de 26.900 COP, comisión de 5.380 COP y ganancia neta de 21.520 COP. También se verificó que una propina de 2.000 COP se sumara completamente a la ganancia del conductor.

- Aprendizaje: Entendí que la comisión se calcula después de redondear la tarifa y que la propina no debe reducirse por la comisión de la plataforma. También aprendí que la función debe utilizar una única configuración compartida y rechazar categorías que no existan en el contrato del proyecto.

### Entrada #5
Fecha: 2026-11-06
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Integrar el mapa interactivo (react-native-maps) centrado en la ubicación del conductor.
Prompt: "import React, { useState, useEffect } from 'react'... <MapView style={{ flex: 1}} initialRegion={{..." (código de integración del mapa).
Resumen de la respuesta: El Tech Lead validó la extracción de coordenadas pero identificó un error crítico de Flexbox en React Native: el contenedor padre carecía de `flex: 1`, lo que causaría que el mapa colapsara a 0 píxeles. Se recomendó cambiar `initialRegion` por `region` para que la cámara siga al conductor.
Qué se usó / modificó / descartó: Se reemplazó el texto plano de coordenadas por `<MapView>` y `<Marker>`. Se corrigió el estilo del contenedor principal `<View style={{ flex: 1 }}>`.
Archivos y commit: src/screens/MapScreen.js (Commit: 97b5d61)
Verificación: El mapa se renderiza ocupando toda la pantalla y la cámara rastrea las actualizaciones de la ubicación del conductor.
Aprendizaje: Entendí las reglas de herencia de Flexbox en React Native y la diferencia clave entre `initialRegion` y `region` para el seguimiento en tiempo real.

### Entrada #6
Fecha: 2026-11-06
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Implementar validación de estado "isApproved" para bloquear la disponibilidad del conductor.
Prompt: "Pero si es buena idea simular el backend? es fácil editarlo cuando necesitemos hacer la verdadera aprobación desde firebase?" (Consulta sobre Mocking de datos).
Resumen de la respuesta: El Tech Lead explicó los beneficios del "Mocking" para desacoplar el desarrollo frontend del backend. Durante la revisión, detectó un auto-import defectuoso de VS Code (`Color`) que causaba crash, y un problema de Flexbox donde el banner dividía la pantalla a la mitad con el mapa.
Qué se usó / modificó / descartó: Se agregó un estado simulado `isApproved` en `MapScreen.js`. Se refactorizó la UI usando renderizado condicional con el operador `&&` para mostrar un banner de advertencia rojo y deshabilitar dinámicamente la prop `disabled` del `Switch`. Se eliminó la importación inválida.
Archivos y commit: src/screens/MapScreen.js (Commit: 511527b)
Verificación: El conductor no puede cambiar a "Disponible" si `isApproved` es falso, mostrando correctamente la alerta visual sin deformar el mapa.
Aprendizaje: Comprendí el concepto de Mocking para avanzar sin bloqueos externos, el principio DRY (Don't Repeat Yourself) en componentes condicionales, y cómo evitar estilos generados automáticamente por el IDE.

### Entrada #7
Fecha: 2026-11-06
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Crear el hook `useTripRequests` para escuchar las solicitudes de viajes entrantes.
Prompt: "import React, { useState, useEffect } from 'react'... export default function useTripRequests(isAvailable) {..." (código del hook con el timeout integrado).
Resumen de la respuesta: El Tech Lead aprobó la estructura base pero detectó un riesgo de "memory leak" (viajes fantasma) si el conductor se desconectaba antes de cumplirse el temporizador, además de señalar importaciones visuales innecesarias en un archivo lógico.
Qué se usó / modificó / descartó: Se eliminaron las importaciones de React Native. Se implementó la limpieza del temporizador usando `clearTimeout(timeoutId)` en el return del `useEffect` para destruir procesos pendientes al desmontar o cambiar la disponibilidad.
Archivos y commit: src/services/useTripRequests.js (Commit: 0710146)
Verificación: El estado simula correctamente la llegada de un viaje tras 5 segundos de estar disponible, y el temporizador se cancela exitosamente si el conductor se desconecta antes.
Aprendizaje: Entendí la importancia vital de limpiar procesos asíncronos (como temporizadores o suscripciones) en los Custom Hooks para evitar fugas de memoria y actualizaciones de estado en componentes desmontados.

### Entrada #8
Fecha: 2026-11-06
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Renderizar la tarjeta de la solicitud entrante superpuesta al mapa de navegación.
Prompt: "import React, { useState, useEffect } from 'react'... {incomingRequests != null && (..." (código de integración condicional en la UI).
Resumen de la respuesta: El Tech Lead validó el uso correcto de `position: 'absolute'` y `z-index` implícito para superponer la UI sobre el mapa, pero detectó un error de sintaxis crítico por la falta de una etiqueta de cierre de JSX (`</View>`).
Qué se usó / modificó / descartó: Se integró el hook `useTripRequests` en `MapScreen.js`. Se construyó una tarjeta flotante utilizando renderizado condicional dependiente del estado `incomingRequests`, corrigiendo el cierre de etiquetas JSX para evitar fallos de compilación.
Archivos y commit: src/screens/MapScreen.js (Commit: edd90b3)
Verificación: Al activar la disponibilidad, la tarjeta blanca con los datos del viaje (origen, destino, tarifa) aparece flotando sobre la parte inferior del mapa tras 5 segundos.
Aprendizaje: Reforcé el uso de posicionamiento absoluto en React Native para superposición de interfaces y la importancia de la estructura estricta de cierre de etiquetas en JSX.

### Entrada #9
Fecha: 2026-11-09
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Implementar temporizador regresivo, botones de acción (Aceptar/Rechazar) y navegación a la pantalla de viaje.
Prompt: "Pues tiene que ser implementado los botones debajo de la targeta de solicitud... y lo de los 15 segundos no es parecido a esto?" (Consulta sobre temporizadores).
Resumen de la respuesta: El Tech Lead diferenció el uso de `setTimeout` (una vez) vs `setInterval` (repetitivo). Se instruyó mover toda la lógica del reloj al hook para mantener la vista limpia, e implementar `useNavigation` para la transición de pantallas.
Qué se usó / modificó / descartó: Se actualizó `useTripRequests` agregando `setInterval` para un conteo de 15 a 0, limpiándolo en el ciclo de desmontaje. En `MapScreen.js` se agregaron botones interactivos con `TouchableOpacity` y la función `acceptTrip` que transfiere el estado del viaje a `'ActiveTrip'` mediante `react-navigation`.
Archivos y commit: src/services/useTripRequests.js, src/screens/MapScreen.js (Commit: 782d516)
Verificación: El temporizador baja visualmente cada segundo; al llegar a cero o presionar "Rechazar", la tarjeta se limpia. Al presionar "Aceptar", se ejecuta la función de navegación con los parámetros.
Aprendizaje: Comprendí la diferencia entre temporizadores en JavaScript (`setTimeout` vs `setInterval`) dentro del ciclo de vida de React, y cómo pasar parámetros de estado entre pantallas mediante rutas.

### Entrada #10
Fecha: 2026-11-11
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Crear pantalla de Viaje en Curso (ActiveTripScreen) y configurar el enrutador principal en App.js.
Prompt: "La verdad no veo ningún MainNavigator... (compartiendo código de App.js)".
Resumen de la respuesta: El Tech Lead aclaró que `App.js` funciona como el enrutador principal del proyecto. Se corrigió un error de arquitectura donde se había anidado la pantalla operativa dentro de los tabs de registro, indicando cómo registrar las rutas a nivel raíz.
Qué se usó / modificó / descartó: Se creó `src/screens/ActiveTripScreen.js` configurado para recibir y renderizar `route.params.trip`. Se revirtió la modificación en el archivo de Stiven (`DriverRegistrationNavigator`). Se modificó `App.js` para registrar `MapScreen` y `ActiveTripScreen` en el `Stack.Navigator`, asignando el mapa como `initialRouteName`.
Archivos y commit: App.js, src/screens/ActiveTripScreen.js, src/navigation/DriverRegistrationNavigator.js (Commit: f7bc4a3)
Verificación: El flujo de navegación funciona: al presionar "Aceptar" en la tarjeta del mapa, el sistema navega a pantalla completa hacia "Viaje en Curso", inyectando y renderizando origen, destino y tarifa correctamente.
Aprendizaje: Comprendí la diferencia arquitectónica entre Stack Navigators y Tab Navigators, y cómo evitar acoplar flujos operativos (viajes) con flujos administrativos (registros).

### Entrada #11
Fecha: 2026-11-13
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Resolver el bloqueo de renderizado del mapa nativo en el dispositivo físico, implementar el Estado Global (Context API) y finalizar el ciclo del viaje con actualización de ganancias.
Prompt: "Ya estoy harto, sigue sin aparecerme nada... Pero ese archivo será para manejar Context API?... Otra cosa, en esa misma bitácora meto lo que me diste del coso flotante..."
Resumen de la respuesta: Se diagnosticó que el dispositivo físico (Samsung S23 Ultra) bloquea el renderizado de react-native-maps sin una API Key válida, difiriendo la configuración visual para priorizar la lógica. Se corrigió un error crítico de arquitectura que violaba las Reglas de los Hooks (Hooks declarados después de Early Returns). Se estructuró DriverContext para dar memoria global a la app y se integró un indicador visual de ganancias.
Qué se usó / modificó / descartó: Se creó la bóveda global DriverContext.js. Se modificó App.js para envolver el enrutador con DriverProvider. Se reestructuró ActiveTripScreen.js moviendo los Hooks al nivel superior, usando <Polyline> nativo en lugar de Google Directions, e implementando la función finishTrip. Se modificó MapScreen.js para leer la disponibilidad y ganancias globalmente y renderizar el "badge" flotante. Se descartó temporalmente el uso de la API Key facturable.
Archivos y commit: src/context/DriverContext.js, App.js, src/screens/ActiveTripScreen.js, src/screens/MapScreen.js (Commit: 80b53b8)
Verificación: El estado del switch (disponibilidad) sobrevive al navegar entre pantallas. Al presionar "Finalizar viaje", la navegación retorna silenciosamente al mapa y el badge flotante se actualiza reflejando la suma de la tarifa de la carrera.
Aprendizaje: Comprendí las Reglas estrictas de los Hooks en React (jamás declararlos después de un return condicional), el uso de Context API para evitar la pérdida de estados locales al desmontar pantallas, y cómo las restricciones de hardware/servicios de Google afectan el renderizado en dispositivos físicos.

### Entrada #12
Fecha: 2026-11-13
Integrante: Juan Deyan Chaverra Urrea
Herramienta: Gemini
Objetivo: Reorganizar la interfaz de MapScreen para evitar colisiones visuales y migrar el motor de mapas a OpenStreetMap (WebView) para evadir bloqueos de renderizado por facturación en Google Cloud.
Prompt: "Bueno, lo que necesito antes de seguir hablando de lo de API, necesito arreglar lo del coso flotante de ganancias... Listo, mostré los tres estados, ni en el pc emula... por el momento no implementaré lo que me diste arriba, voy a intentar que mi compañero saque la API de google maps... Dame porfa otra vez esos códigos..."
Resumen de la respuesta: Se rediseñó la UI de MapScreen anclando el interruptor de disponibilidad en la parte inferior y dejando el indicador de ganancias libre en la parte superior. Ante el fallo de renderizado de react-native-maps tanto en emulador como en dispositivo físico sin API Key facturable, se implementó un componente alternativo usando OpenStreetMap y Leaflet incrustados en un WebView, respaldado por la autorización docente para simular datos externos.
Qué se usó / modificó / descartó: Se descartó el uso de react-native-maps y la facturación de Google Cloud. Se instaló react-native-webview. Se creó el componente src/components/FreeMap.js con renderizado HTML/JS de Leaflet. Se modificaron src/screens/MapScreen.js y src/screens/ActiveTripScreen.js para integrar FreeMap, corregir el nombre de ruta en navigation.navigate('ActiveTrip') y reacomodar los controles flotantes.
Archivos y commit: package.json, src/components/FreeMap.js, src/screens/MapScreen.js, src/screens/ActiveTripScreen.js (Commit: f389f9d)
Verificación: Probado en dispositivo físico (Samsung Galaxy S23 Ultra) mediante Expo Go con túnel. El mapa de Medellín carga con calles reales, el marcador GPS ubica al conductor sin obstruir el badge de ganancias, y la pantalla ActiveTripScreen traza la línea de ruta entre origen y destino recorriendo los tres estados del viaje hasta sumar la tarifa.
Aprendizaje: Comprendí cómo desacoplar dependencias propietarias de mapas mediante componentes WebView con librerías Open Source (Leaflet/OpenStreetMap) para eliminar costos de infraestructura en prototipos, además de estructurar layouts absolutos en React Native evitando superposición de controles.









