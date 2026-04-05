I've made the background light/shadow effect (the blinds) go **over** the main part of the page (the device).

### Changes:
1.  **Updated `app/vidclue/page.tsx`**: Moved the "blinds shadow" overlay to be a direct child of the main container and gave it `z-50` positioning. This ensures the light/shadow pattern is cast **on top** of the device case and screens, not just behind it.

Now, the diagonal shadows from the window blinds should realistically cross over the red device and the screens, creating a more immersive environment.

Check it out with `npm run dev`!