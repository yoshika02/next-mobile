I've added the "light from window" effect as a full-page overlay, creating distinct shadow bars similar to your reference image.

### Changes:
1.  **Updated `app/globals.css`:** Replaced the old `.shadow-blinds` class with a new `.shadow-window-bars` class.
    -   Used a `repeating-linear-gradient` to create distinct, diagonal shadow bands.
    -   Set a `blur(10px)` filter to give them soft but defined edges, mimicking light casting through blinds or a window frame.
2.  **Updated `app/vidclue/page.tsx`:** Added the `.shadow-window-bars` overlay at `z-[51]`.
    -   This sits **on top** of everything (including the device and the room texture overlay), casting realistic shadows across the entire scene.
    -   It works in combination with the existing `bg-room.png` overlay (z-50) to create a rich, atmospheric environment.

Now you should see clear, diagonal light and shadow patterns crossing the entire page and the device.

Check it out with `npm run dev`!