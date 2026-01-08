# Ossicles Sound Amplification Visualizer

An interactive 2D React application that visualizes how the three ossicles (malleus, incus, stapes) in the human ear amplify sound waves from the eardrum to the oval window.

## Features

- **Interactive Visualization**: See how sound waves travel through the ear and get amplified
- **Adjustable Bone Sizes**: Modify the size of each ossicle and see real-time amplification changes
- **Real-time Calculations**: Watch amplification factors, decibel gain, and pressure ratios update instantly
- **Educational**: Learn how area ratios and lever mechanics create sound amplification

## Technology Stack

- React 18 with TypeScript
- Vite for fast development and building
- Framer Motion for smooth animations
- Tailwind CSS for styling
- SVG for 2D rendering

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. Vercel will automatically detect Vite and configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: Vite

4. Deploy! Vercel will build and deploy your application automatically.

Alternatively, you can use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## How It Works

The application demonstrates two key mechanisms of sound amplification in the ear:

1. **Area Ratio**: The eardrum (tympanic membrane) has a much larger surface area (~60 mm²) than the oval window (~3.2 mm²), creating a ~17:1 area ratio that concentrates sound pressure.

2. **Lever Ratio**: The three ossicles act as a lever system, with the malleus and incus forming the input arm and the stapes as the output arm, providing approximately a 1.3:1 mechanical advantage.

**Total Amplification** = Area Ratio × Lever Ratio ≈ 20-25 dB (100-300x pressure increase)

## Project Structure

```
OssiclesVisualizer/
├── src/
│   ├── components/
│   │   ├── EarDiagram.tsx          # Main ear anatomy visualization
│   │   ├── Ossicles.tsx            # The three bones rendering
│   │   ├── SoundWave.tsx           # Animated sound wave component
│   │   ├── AmplificationDisplay.tsx # Real-time metrics display
│   │   ├── Controls.tsx            # Sound frequency/intensity controls
│   │   └── BoneSizeControls.tsx    # Bone size adjustment sliders
│   ├── utils/
│   │   ├── physics.ts              # Amplification calculations
│   │   └── constants.ts            # Anatomical measurements
│   ├── App.tsx                     # Main application component
│   └── main.tsx                    # Application entry point
├── public/                         # Static assets
└── package.json                    # Dependencies and scripts
```

## License

MIT

