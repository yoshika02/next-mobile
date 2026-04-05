I've intensified the "light from window" effect to match the strong shadows in your reference image.

### Changes:
1.  **Updated `app/globals.css`:** Modified `.shadow-window-bars` to use a high-contrast repeating gradient.
    -   Defined clear "light" zones (transparent) and "shadow" zones (dark gray).
    -   Reduced the blur slightly (`8px`) to keep the shadow edges relatively defined but still natural.
2.  **Updated `app/vidclue/page.tsx`:** Removed the inline `opacity-50` from the shadow overlay div.
    -   This allows the full intensity of the CSS shadow (which uses `rgba(0,0,0,0.4)`) to come through, ensuring the bands are clearly visible over the device and background.

You should now see very distinct diagonal shadow bars across the entire page, mimicking strong sunlight coming through blinds.

Check it out with `npm run dev`!