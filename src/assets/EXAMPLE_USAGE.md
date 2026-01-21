# Example: How to Replace Hand-Drawn Bones with Your SVG Files

## Step-by-Step Instructions

### 1. Create Your SVG Files

Draw three SVG files using Figma, Boxy SVG, or any SVG editor:
- `malleus.svg` - The hammer bone
- `incus.svg` - The anvil bone
- `stapes.svg` - The stirrup bone

**Important:** Make sure each SVG's attachment point is at (0, 0):
- **Malleus**: Handle/manubrium starts at (0, 0)
- **Incus**: Body connection point at (0, 0)
- **Stapes**: Head connection point at (0, 0)

### 2. Save Files

Place all three files in: `src/assets/`

### 3. Update `src/components/Ossicles.tsx`

#### A. Uncomment the imports (around line 10-12):
```typescript
import malleusSvgUrl from '../assets/malleus.svg?url';
import incusSvgUrl from '../assets/incus.svg?url';
import stapesSvgUrl from '../assets/stapes.svg?url';
```

#### B. Change `USE_SVG_FILES` to `true` (around line 15):
```typescript
const USE_SVG_FILES = true;
```

#### C. Replace the hand-drawn malleus code (around line 131) with:
```typescript
{USE_SVG_FILES ? (
  <image 
    href={malleusSvgUrl} 
    width={200 * malleusScale} 
    height={300 * malleusScale}
    x={-100 * malleusScale} 
    y={-150 * malleusScale}
    preserveAspectRatio="xMidYMid meet"
  />
) : (
  // ... existing hand-drawn code ...
)}
```

#### D. Do the same for incus (around line 214) and stapes (around line 287)

### 4. Test

The dev server will automatically reload. Your custom SVGs should now appear!

## Quick Reference: SVG Image Tag Template

```tsx
<image 
  href={boneSvgUrl}           // Your imported SVG URL
  width={baseWidth * scale}     // Scale based on bone size slider
  height={baseHeight * scale}
  x={-baseWidth * scale * 0.5} // Center horizontally
  y={-baseHeight * scale * 0.5} // Center vertically (adjust as needed)
  preserveAspectRatio="xMidYMid meet"
/>
```

Adjust `baseWidth` and `baseHeight` to match your SVG's natural size.
