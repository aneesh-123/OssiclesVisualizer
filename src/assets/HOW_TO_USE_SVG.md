# How to Use Your Own SVG Files

## Quick Start

1. **Draw your SVGs** using an online tool:
   - **Figma** (figma.com) - Free, excellent for SVG export
   - **Boxy SVG** (boxy-svg.com) - Browser-based, simple
   - **SVG-Edit** (svgedit.net) - Free online editor
   - **Draw.io** (diagrams.net) - Free, good for technical drawings

2. **Save three files** in this folder (`src/assets/`):
   - `malleus.svg`
   - `incus.svg`
   - `stapes.svg`

3. **Update `Ossicles.tsx`**:
   - Uncomment the import statements at the top
   - Change `USE_SVG_FILES` to `true`

## SVG Requirements

### Positioning
- **Malleus**: The handle/manubrium should start at coordinates (0, 0)
- **Incus**: The body/connection point should be at (0, 0)  
- **Stapes**: The head/connection point should be at (0, 0)

### Size
- Draw at a reasonable size (200-400px width recommended)
- The component will scale them automatically based on the bone size sliders

### ViewBox
Make sure your SVG has a `viewBox` attribute:
```svg
<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
  <!-- your paths -->
</svg>
```

### Example SVG Structure
```svg
<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
  <g>
    <!-- Your bone shape here -->
    <path d="M 0,0 L 50,100 ..." fill="#A0522D" stroke="#654321" stroke-width="2"/>
  </g>
</svg>
```

## Tips

- Use reference images from medical textbooks or Wikimedia Commons
- Keep paths simple for better performance
- Use bone-like colors: #8B4513, #A0522D, or #654321
- Test your SVG in a browser first to make sure it displays correctly

## After Adding Files

1. The dev server will automatically reload
2. Your custom SVGs will appear instead of the hand-drawn versions
3. They'll still animate and scale with the bone size controls!
