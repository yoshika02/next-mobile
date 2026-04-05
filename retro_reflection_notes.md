I've updated the background and screen reflection effects.

### Changes:
1.  **Main Background:** Changed the full-page background from the room image to a clean, light gray (`bg-[#f4f4f5]`).
2.  **Screen Reflection:** Applied the `bg-room.png` as a subtle overlay/reflection on both the **Left Screen** and **Right Screen** of the device.
    -   Used `mix-blend-overlay` and low opacity (`opacity-20` / `opacity-15`) to make it look like the room is reflecting off the glass surface of the screens, rather than being the wallpaper behind the device.

Now the device sits in a clean, bright environment, but its screens still reflect the "room" texture, adding to the realism.

Check it out with `npm run dev`!