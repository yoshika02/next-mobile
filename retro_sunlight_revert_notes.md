I've removed the "sunlight effect from left side" as requested.

### Changes:
1.  **Reverted `app/globals.css`:** Removed the `.sunlight-left-glow` class.
2.  **Reverted `app/vidclue/page.tsx`:** Removed the corresponding overlay div.

The scene is now back to having just the sharp window bar shadows, without the extra left-side glow.

Check it out with `npm run dev`!