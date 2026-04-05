I've added the **scattered dots texture** back as a distinct layer.

### Changes:
1.  **Updated `app/globals.css`:** Added a new `.bg-speckle` class. This uses a custom SVG filter (`feTurbulence` + `feColorMatrix`) to generate small, distinct, random dots instead of soft noise.
2.  **Updated `app/vidclue/page.tsx`:** Added a new `div` overlay to the device case container using the `.bg-speckle` class.
    -   Used `mix-blend-multiply` to ensure the dots appear as dark speckles on the red surface.
    -   Set opacity to `0.4` for a visible but integrated look.

This will give the red casing that specific "speckled plastic" appearance shown in your reference image, layering it on top of the existing fine grain for depth.

Check the result with `npm run dev`!