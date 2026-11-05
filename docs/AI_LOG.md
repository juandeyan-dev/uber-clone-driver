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
  - Commits: se hicieron varios commits en cada creacion de cada una de los archivos, y unos extras que hice sin guardar cambios entoces el commit no los agarro 

- Verificación: Se ejecutó la aplicación con Expo y se comprobó la navegación entre las tres pestañas, la persistencia temporal de los datos, la conversión de la placa a mayúsculas, la aparición de errores debajo de los campos y el estado deshabilitado del botón de envío.

- Aprendizaje: El estado compartido permite que las tres pestañas trabajen sobre el mismo formulario. Las validaciones deben ejecutarse desde cada campo y los errores deben mostrarse en la interfaz sin utilizar `Alert`.

### Entrada #5

- Fecha: 2026-11-04
- Integrante: Stiven Apellido
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