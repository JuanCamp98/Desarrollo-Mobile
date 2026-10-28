# Mi Tienda — React Native + Expo Router

Proyecto inicial construido desde cero para la materia Desarrollo de Aplicativos Móviles. Sigue los temas del PDF: componentes nativos, `FlatList`, `useState`, `useEffect`, custom hook `useFetch`, Context API, `AsyncStorage`, Expo Router, cámara/galería y gestos.

## Requisitos

- Node.js 22.13 o superior (recomendado para Expo SDK 58).
- npm.
- Para SDK 58, si Expo Go de la tienda todavía no está actualizado, usar un development build o ejecutar en un emulador compatible.

## Instalar y ejecutar

```bash
cd mi-tienda-mobile
npm install
npx expo install --fix
npx expo-doctor
npx expo start
```

## Conectar la API mockAPI

La consigna indica usar mockAPI, pero no se adjuntó en el mensaje la URL concreta del proyecto mockAPI. Por eso el proyecto viene con datos de demostración y preparado para conectar el endpoint real sin romper la interfaz.

1. En mockapi.io, crear un recurso llamado `products` (o usar el nombre que les dio el profesor).
2. Los objetos deben tener, como mínimo, estos campos:

```json
{
  "name": "Auriculares Air",
  "price": 59900,
  "category": "Audio",
  "image": "https://...",
  "description": "Auriculares inalámbricos"
}
```

3. Abrir `src/api/config.js` y reemplazar `MOCKAPI_PRODUCTS_URL` por la URL de colección que les dio mockAPI, por ejemplo `https://TU-ID.mockapi.io/api/v1/products`.
4. En `src/api/products.js`, `useFetch` consulta esa URL. Si está vacía o la API falla, muestra productos de demostración y un aviso en pantalla. Cuando la URL esté configurada y responda correctamente, usa los productos de mockAPI.

**Importante:** no inventé una URL de mockAPI porque cada proyecto tiene un identificador propio. Para que la entrega consuma la API del curso, hay que pegar la URL real.

## Funcionalidades

- **Catálogo:** pantalla scrolleable con `FlatList`, estado de carga, error/reintento, refresco y detalle del producto.
- **Favoritos:** `FavoritesContext`, persistencia con `AsyncStorage`, swipe para borrar y reordenamiento por arrastre con pulsación larga en el asa “Mover”.
- **Perfil:** `UserContext`, nombre/correo, elegir foto de galería o sacar foto con `expo-image-picker`, persistencia local.
- **Navegación:** Expo Router con tabs Catálogo, Favoritos y Perfil, layouts y detalle.
- **Safe areas:** se usa `SafeAreaView` de `react-native-safe-area-context`, no el componente deprecado de `react-native`.

## Estructura

```text
app/
  _layout.js
  (tabs)/
    _layout.js
    index.js
    favorites.js
    profile.js
  product/[id].js
src/
  api/
  components/
  context/
  hooks/
  styles/
```

## Gestos

El asa “Mover” activa el drag and drop en Favoritos. Deslizar una fila hacia la izquierda revela la acción de eliminar. Se separaron las zonas para que el gesto de mover no compita directamente con el swipe.

## Antes de entregar

- Pegar la URL real de mockAPI.
- Ejecutar `npx expo install --fix` y `npx expo-doctor`.
- Probar en un dispositivo/emulador la galería, cámara, swipe y arrastre.
- Confirmar que el entorno instalado tiene una versión de Expo Go compatible con SDK 58.
