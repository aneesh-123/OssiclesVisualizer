# How to Add Your Own SVG Files

## Step 1: Create Your SVG Files

1. Use an online SVG editor (recommended: **Figma**, **Boxy SVG**, or **SVG-Edit**)
2. Draw each bone separately:
   - `malleus.svg` - The hammer-shaped bone
   - `incus.svg` - The anvil-shaped bone  
   - `stapes.svg` - The stirrup-shaped bone

## Step 2: Export Requirements

**Important:** When creating your SVGs, follow these guidelines:

- **Size**: Draw each bone at a reasonable size (e.g., 200-400px width)
- **Origin**: Position the bone so its **attachment point** is at coordinates (0, 0):
  - **Malleus**: Handle/manubrium should start at (0, 0)
  - **Incus**: Body/connection point to malleus should be at (0, 0)
  - **Stapes**: Head/connection point to incus should be at (0, 0)
- **ViewBox**: Make sure your SVG has a `viewBox` attribute (e.g., `viewBox="0 0 200 300"`)
- **Clean Code**: Remove unnecessary attributes, keep only essential paths/shapes

## Step 3: Save Files

Save your SVG files in this `src/assets/` folder:
- `malleus.svg`
- `incus.svg`
- `stapes.svg`

## Step 4: Enable SVG Import

The component will automatically detect if these files exist and use them instead of the hand-drawn versions.

## Tips for Drawing

- Use reference images from medical textbooks or Wikimedia Commons
- Keep paths simple for better performance
- Use consistent stroke widths (2-4px)
- Consider using a bone-like color (#8B4513, #A0522D, or #654321)

## Example SVG Structure

```svg
<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Your paths here -->
  <path d="M 0,0 L 50,100 ..." fill="#A0522D" stroke="#654321"/>
</svg>
```
