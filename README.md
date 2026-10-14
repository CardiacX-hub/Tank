# Tank Command

A responsive, dependency-free browser tank combat game with an isometric voxel battlefield.

## Run

Requires Node.js 18 or newer.

```sh
npm start
```

Open the server on port 3000. Use `PORT` to select another port. No install step is needed.

## Play

- PC: WASD or arrow keys move, mouse aims, click or Space fires, Escape pauses.
- Phone: drag the joystick to move and hold FIRE. The turret targets the nearest enemy automatically.
- Clear a sector to unlock the next of 12 increasingly difficult missions.
- Earn one star for victory, one for finishing with at least 50% hull, and one for meeting the time target.
- Spend earned credits in the garage on hull, cannon, or engine upgrades. Pick one of six free armor finishes.
- Progress saves in browser local storage. Replays also earn credits.

Voxel models are procedurally assembled and rendered using Canvas 2D with an isometric projection. No external model assets or game engine are required. Sound is optional and synthesized locally.

## Checks

`npm test` checks JavaScript syntax. Development validation also exercised combat movement, projectile victories, defeat/retry, stars, credits, purchasing upgrades, persistence, pause/resume, and a 390px touch viewport in Chromium.

## Publish a playable browser version

This game is a static website and works on GitHub Pages without a build step.

In this repository's **Settings → Pages**, select **Deploy from a branch**, choose **main**, choose **/ (root)**, and click **Save**. GitHub will display the published game URL when deployment completes. Players can open that URL on PC or phone; they do not need Node.js or an account.

The Node server is for local development only. The game itself uses `index.html`, `style.css`, and `game.js`.
