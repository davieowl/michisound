# michisound 🎹✨

![michisound Interface](public/icon.png)

Bienvenido a **michisound**, un sintetizador de pasos (step sequencer) interactivo, visualmente cautivador y con un toque muy personal. Creado con mucho cariño y código por **michidev**, este proyecto te invita a experimentar con patrones rítmicos y melódicos de forma intuitiva, usando React, TypeScript y la potente librería de audio **Tone.js**.

Es más que una herramienta; es un pequeño estudio creativo donde dar vida a tus ideas musicales directamente en el navegador. 🎶

---

## 🌟 Características

*   **Interfaz de Cuadrícula (Grid):** 8 filas (notas) x 16 columnas (pasos) para una programación precisa y visual.
*   **Reproducción en Tiempo Real:** Un cursor luminoso se desplaza sobre la cuadrícula, mostrándote exactamente dónde suena la música.
*   **Sintetizador Personalizable:** Elige la personalidad de tu sonido entre 4 formas de onda: **Seno (Sine)**, **Triángulo (Triangle)**, **Cuadrada (Square)** y **Diente de Sierra (Sawtooth)**.
*   **Efectos de Ambiente:** Ajusta la cantidad de **Reverberación (Reverb)** y **Delay** para darle espacio y textura a tu secuencia.
*   **Control de Tempo (BPM):** Marca el ritmo de tu corazón... o de tu canción, de 60 a 200 pulsaciones por minuto.
*   **Generación Aleatoria:** ¿Sin ideas? El botón **RANDOM** 🎲 te regala patrones únicos al instante.
*   **Gestión de Patrones (Slots):** Guarda y carga hasta 4 patrones diferentes usando el almacenamiento local de tu navegador. (Doble clic para guardar, un clic para cargar).
*   **Grabación y Exportación:** Captura tu creación con un solo clic y descárgala como un archivo `.wav` para compartirla con el mundo.
*   **Visualizador de Audio:** Un elegante analizador de espectro (FFT) que baila y reacciona a cada nota, llenando de color tu experiencia.
*   **Diseño Suave y Moderno:** Con una estética oscura y acentos de color neón, cada interacción está diseñada para ser un placer visual.

---

## 🚀 Tecnologías Utilizadas

*   **[React](https://reactjs.org/)** - La biblioteca para construir la interfaz de usuario.
*   **[TypeScript](https://www.typescriptlang.org/)** - Para un código más robusto y mantenible.
*   **[Vite](https://vitejs.dev/)** - La herramienta de construcción ultrarrápida.
*   **[Tone.js](https://tonejs.github.io/)** - El corazón musical, un framework de audio para la web.
*   **[Tailwind CSS](https://tailwindcss.com/)** - Para un diseño utilitario, rápido y hermoso.
*   **[Font Awesome](https://fontawesome.com/)** - Los iconos que dan vida a la interfaz.

---

## 🛠️ Instalación y Uso

¿Quieres tener **michisound** en tu propia máquina? ¡Es muy fácil!

### Prerrequisitos

Solo necesitas tener instalado [Node.js](https://nodejs.org/) (que incluye npm). Si prefieres [pnpm](https://pnpm.io/), también funciona genial.

### Pasos para la Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/michisound.git
    cd michisound
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    # o si usas pnpm
    pnpm install
    ```

3.  **¡A jugar! Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    # o
    pnpm dev
    ```

4.  **Abre tu navegador** y visita la dirección que aparece en la terminal (generalmente `http://localhost:5173`). ¡Los sonidos de michi te esperan!

---

## 🎮 Cómo Usarlo

1.  **Activa las celdas:** Haz clic en cualquier cuadrito de la cuadrícula. ¡Así de simple! Cada fila es una nota diferente (`C4`, `D4`, `E4`, `G4`, `A4`, `C5`, `D5`, `E5`).
2.  **Dale al Play:** Presiona el gran botón **PLAY** (🟢) para escuchar tu creación. El botón se volverá **STOP** (🔴) para que puedas detenerlo cuando quieras.
3.  **Experimenta con el Sonido:**
    *   **Oscilador:** En la sección "Oscillator", cambia la forma de onda y escucha cómo cambia el timbre.
    *   **Efectos:** Mueve los deslizadores de "REVERB" y "DELAY" para darle más ambiente.
    *   **Tempo:** Ajusta el BPM para ir de una balada lenta a un techno vibrante.
4.  **Juega con Patrones:**
    *   🎲 **RANDOM** para una explosión de ideas locas.
    *   🧹 **CLEAR** para empezar de cero.
    *   **Slots (1-4):** Haz clic en un número para cargar un patrón guardado. Haz **doble clic** para guardar el patrón actual en ese slot.
5.  **Graba tu Sesión:**
    *   Presiona **REC** 🔴 (verás que late) para empezar a grabar.
    *   Presiona **EXPORT** ⬇️ para detener la grabación y descargar tu obra maestra como un archivo `.wav`.

---

## 🎨 Paleta de Colores

El diseño de **michisound** se basa en una paleta de colores suave pero vibrante, pensada para inspirar creatividad:

*   **Fondo Principal:** `#0a0a0f` - Un negro azabache muy profundo.
*   **Fondo Secundario:** `#14141f` / `#1a1a2a` - Grises muy oscuros con un toque de púrpura.
*   **Acento Primario (Cian):** `#00f0ff` - El color de la vida, el ritmo y el paso actual.
*   **Acento Secundario (Rosa/Magenta):** `#ff00aa` / `#f472b6` - Para la grabación y los detalles juguetones.
*   **Amarillo:** `#eab308` - Para los slots de patrones, como pequeños tesoros.

---

## 📁 Estructura del Proyecto

Una mirada rápida a cómo está organizado el código de **michisound**:

```
michisound/
├── public/             # Archivos estáticos (como nuestro querido icon.png)
├── src/
│   ├── assets/         # Imágenes y recursos varios
│   ├── audio/          # El cerebro musical con Tone.js
│   │   ├── engine.ts   # Configuración del sintetizador
│   │   ├── effects.ts  # Inicialización de efectos (reverb, delay)
│   │   └── recorder.ts # Lógica para la grabación
│   ├── components/     # Los componentes de React
│   │   ├── Grid.tsx    # La cuadrícula principal y todos los controles
│   │   └── Visualizer.tsx # El visualizador de audio en canvas
│   ├── App.tsx         # El componente raíz que lo junta todo
│   ├── main.tsx        # El punto de entrada de React
│   └── index.css       # Estilos globales y la magia de Tailwind
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🤝 Contribuciones

¿Tienes una idea para hacer **michisound** aún más genial? ¿Encontraste un pequeño bug? ¡Este proyecto es un espacio abierto y acogedor!

Siéntete libre de abrir un "issue" para discutirlo o enviar un "pull request". Toda ayuda y creatividad es bienvenida. 💖

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Si usas parte de este código en tus propias creaciones, una mención a **michidev** y a **michisound** sería muy bonito y apreciado. ✨

---

## 💖 Créditos

*   **Creador y Mente Creativa:** **michidev** - Todo el cariño, el código y las ideas.
*   **Icono:** El logo de **michisound** es una adaptación del logo de Vite, transformado con mucho amor para representar la esencia del proyecto.

**¡Que los sonidos te acompañen y la creatividad fluya!** 🎹✨
