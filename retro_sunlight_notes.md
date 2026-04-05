I've added the "sunlight effect from left side" to the scene.

### Changes:
1.  **Updated `app/globals.css`:** Added a new `.sunlight-left-glow` class.
    -   This uses a `linear-gradient` from bright white/warm-yellow on the left to transparent on the right.
    -   Applied `mix-blend-mode: soft-light` to ensure it subtly brightens the underlying layers (shadows, device, background) without washing them out completely, creating a natural "glow" effect.
2.  **Updated `app/vidclue/page.tsx`:** Added a new overlay div with this class at `z-[52]`.
    -   This sits on top of the shadow bars, simulating the bloom of strong sunlight hitting from the left window.

Now, combined with the shadow bars, you should see a realistic effect where the left side of the scene is bathed in brighter, warmer light, fading off to the right.

Check it out with `npm run dev`!