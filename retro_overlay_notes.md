I've updated the background and light effect structure.

### Changes:
1.  **Main Background:** Changed the base background to pure `bg-white`.
2.  **Upper Frame Overlay (`bg-room.png`):** Instead of using `bg-room.png` behind the device, I've added it as a top-level overlay (`absolute inset-0 z-50`).
    -   Applied `mix-blend-multiply` and `opacity-80`.
    -   This effectively projects the shadows and textures of the "room" image *onto* the white background and the red device, creating a unified lighting effect across the whole site.
3.  **Z-Index Adjustment:** Ensured the device sits at `z-10` so it's clearly affected by the overlay (which is at `z-50`) but remains interactable (pointer-events-none on the overlay).

Now the room image acts as a light/shadow filter over the entire scene, giving it a cohesive atmospheric look.

Check it out with `npm run dev`!