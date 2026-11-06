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

### Entrada #8

- Fecha: 2026-11-05
- Integrante: Stiven Hernandez
- Herramienta: Manus
- Objetivo: Verificar la versión de Expo e integrar un selector real para la fecha de nacimiento en el formulario de datos personales del conductor.

- Prompt: 

  "Verifiquemos la versión de Expo en package.json para elegir el selector de fechas adecuado."

  "recuerda tener eso en cuenta para la siguiente entrada #"

  "PS D:\Dev\5SEMESTRE\desarollo movil\uber-clone-driver> Get-Content package.json

  {
    "name": "uber-clone-driver",
    "version": "1.0.0",
    "main": "index.js",
    "dependencies": {
      "@react-navigation/material-top-tabs": "^7.8.1",
      "@react-navigation/native": "^7.5.1",
      "@react-navigation/stack": "^7.12.1",
      "expo": "~57.0.31",
      "expo-status-bar": "~57.0.1",
      "react": "19.2.3",
      "react-native": "0.86.3",
      "react-native-gesture-handler": "~2.32.0",
      "react-native-pager-view": "8.0.2",
      "react-native-safe-area-context": "~5.7.0",
      "react-native-screens": "~4.26.0",
      "react-native-tab-view": "^4.3.4"
    },
    "scripts": {
      "start": "expo start",
      "android": "expo start --android",
      "ios": "expo start --ios",
      "web": "expo start --web"
    },
    "private": true
  }

  PS D:\Dev\5SEMESTRE\desarollo movil\uber-clone-driver> npx expo install @react-native-community/datetimepicker

  › Installing 1 SDK 57.0.0 compatible native module using npm
  > npm install

  added 1 package, and audited 497 packages in 8s

  47 packages are looking for funding
    run `npm fund` for details

  10 vulnerabilities (1 low, 7 moderate, 2 high)

  To address issues that do not require attention, run:
    npm audit fix

  To address all issues (including breaking changes), run:
    npm audit fix --force

  Run `npm audit` for details.
  › Added config plugin: @react-native-community/datetimepicker

  esto salio, y ten en cuenta los promts para que no piensen que me los invento aunque ya ni se si leera tanto jajaaja"

  "si salieron esos archivos modificados unicamente, sigamos"

  "puse 5555555 en la parte de fecha de nacimiento y no paso nada"

  "me salio un error al emular mira

  Render Error: Property 'errors' doesn't exist

  En PersonalDataTab.js se intentaba utilizar errors en el componente ErrorMessage, pero errors no estaba declarado correctamente."

  "perfecto ahora si funciona lo de fecha"

- Resumen de la respuesta: Se verificó que el proyecto utiliza Expo SDK 57, específicamente `expo: ~57.0.31`, junto con React 19.2.3 y React Native 0.86.3. Se recomendó instalar `@react-native-community/datetimepicker` mediante `npx expo install` para obtener una versión compatible con el SDK.

  Después se integró el selector de fecha en `PersonalDataTab.js`. La fecha seleccionada se formatea como `YYYY-MM-DD` y se guarda en el estado compartido del formulario. Durante la prueba apareció el error `Property 'errors' doesn't exist`, que se corrigió declarando el estado local `errors` dentro de `PersonalDataTab`.

- Qué se usó / modificó / descartó: Se utilizó `@react-native-community/datetimepicker` para reemplazar el campo de texto manual de fecha de nacimiento. Se agregaron `formatDate`, `handleBirthDateChange`, el estado `showBirthDatePicker` y los estilos del botón de fecha.

  También se agregó el plugin de configuración de `@react-native-community/datetimepicker` en `app.json`. Se corrigió el estado local `errors` sin trasladarlo al contexto global, porque los mensajes de validación pertenecen a cada pestaña del formulario.

  No se implementó todavía la validación de mayoría de edad; esa corresponde a la siguiente tarea. Tampoco se ejecutó `npm audit fix --force`, porque podía introducir actualizaciones incompatibles y no era necesario para esta funcionalidad.

- Archivos y commit: 

  - `app.json`
  - `package.json`
  - `package-lock.json`
  - `src/screens/driverRegistration/PersonalDataTab.js`
  - `docs/AI_LOG.md`
  - Commit: `3a52325`

- Verificación: Se confirmó la versión `expo: ~57.0.31` en `package.json`. La dependencia se instaló correctamente mediante `npx expo install @react-native-community/datetimepicker`, y Expo agregó el plugin correspondiente.

  En la aplicación se comprobó que el botón de selección abriera el calendario nativo, que la fecha escogida se mostrara en formato `YYYY-MM-DD` y que la aplicación dejara de mostrar el error relacionado con la variable `errors`.

  También se verificó que una entrada manual como `5555555` no modificara el campo, porque el control ya no es un `TextInput`, sino un selector de fecha. El commit se publicó en la rama `stiven` mediante `git push`.

- Aprendizaje: Entendí que las dependencias nativas de Expo deben instalarse con `npx expo install` para conservar la compatibilidad con el SDK del proyecto. También comprendí que un selector de fecha debe guardar un valor normalizado y que el estado local `errors` debe declararse antes de utilizarlo en los mensajes de validación.

- Próximo paso: Validar que la fecha de nacimiento seleccionada corresponda a una persona mayor o igual a 18 años.

### Entrada #9

- Fecha: 2026-11-05
- Integrante: Stiven Hernandez
- Herramienta: Manus
- Objetivo: Implementar la validación de edad mínima de 18 años para el registro del conductor y conectar esa validación con el estado general del formulario.

- Prompt: 

  "vale, siguiente entrada # vamos con la verificacion de la edad minima"

  "el boton nisiquiera se habilida porque no se ah modificado eso aun y el calendario si se limita hasta la fecha actual porcierto la consola lanzo esto

  N DateTimePicker: `onChange` is deprecated. Use `onValueChange`, `onDismiss`, and `onNeutralButtonPress` instead."

  "todo eso existe, se te olvida que debes revisar el git cada momento? ademas como dices que no existe si lo creamos juntos sea serio"

  "On branch stiven
  Your branch is up to date with 'origin/stiven'.

  Changes not staged for commit:
  modified: docs/AI_LOG.md
  modified: src/screens/driverRegistration/PersonalDataTab.js
  modified: src/screens/driverRegistration/RegistrationContext.js

  Untracked files:
  src/utils/isAdult.js"

- Resumen de la respuesta: Manus explicó que la validación de edad debía conectarse tanto a `PersonalDataTab.js`, para mostrar el error debajo de la fecha, como a `RegistrationContext.js`, para impedir que el formulario se considerara completo cuando el conductor fuera menor de edad. También se indicó reemplazar la prop depreciada `onChange` de `DateTimePicker` por `onValueChange` y `onDismiss`.

- Qué se usó / modificó / descartó: Se creó `src/utils/isAdult.js` como función reutilizable para calcular correctamente la edad, considerando si la persona ya cumplió años durante el año actual. Se utilizó esta función en `PersonalDataTab.js` y `RegistrationContext.js`. También se mantuvo la restricción `maximumDate={new Date()}` del selector y se reemplazó el callback depreciado `onChange` por `onValueChange` y `onDismiss`. No se modificó el contexto de Juan ni ninguna funcionalidad de mapa, GPS, viajes o pagos.

- Archivos y commit:

  - `src/utils/isAdult.js`
  - `src/screens/driverRegistration/PersonalDataTab.js`
  - `src/screens/driverRegistration/RegistrationContext.js`
  - `docs/AI_LOG.md`
  - Commit: `[COMPLETAR CON EL HASH REAL]`

- Verificación: Se comprobó que el calendario no permite seleccionar fechas posteriores a la fecha actual. Se probó una fecha correspondiente a una persona menor de 18 años y se verificó que apareciera el mensaje de error y que el formulario permaneciera incompleto. También se probó una fecha de una persona mayor de 18 años y se verificó que la validación de edad fuera aceptada. Se comprobó que la advertencia relacionada con `onChange` desapareciera después de utilizar `onValueChange` y `onDismiss`.

- Aprendizaje: Entendí que calcular la edad no consiste únicamente en restar el año de nacimiento al año actual, porque también se debe comprobar si la persona ya cumplió años. También aprendí que la validación visual del campo y la validación general del formulario son responsabilidades distintas: una muestra el error y la otra controla si el botón puede habilitarse.




















