# Tank Command

A responsive, dependency-free browser tank combat game with an isometric voxel battlefield.

## Run

Requires Node.js 18 or newer.

```sh
npm start
```

Open the server on port 3000. Use `PORT` to select another port. No install step is needed.

## Play

- PC: WASD or arrow keys move, mouse aims, click or Space fires, R launches installed homing rockets, Escape pauses.
- Phone: drag the joystick to move and hold FIRE. The turret targets the nearest enemy automatically.
- Clear a sector to unlock the next of 12 increasingly difficult missions.
- Earn one star for victory, one for finishing with at least 50% hull, and one for meeting the time target.
- Spend earned credits in the garage on seven component upgrades: reactive hull, rail accelerator, plasma engine, magnetic tracks, Aegis shield, nanite workshop, and swarm rockets. Select numbered callouts or parts on the close-up tank, rotate the model, and compare current and next performance. Every installed upgrade changes the voxel model. Pick one of six free armor finishes.
- Progress saves in browser local storage. Replays also earn credits.

Voxel models are procedurally assembled and rendered using Canvas 2D with an isometric projection. No external model assets or game engine are required. Sound is optional and synthesized locally.

## Checks

`npm test` checks JavaScript syntax and runs 19 regression tests for unique maps, reachable spawns in all 12 missions, obstacle routing, enemy rosters and movement patterns, equipment stats, shield damage, and timed regeneration. Development validation also exercised combat movement, projectile victories, defeat/retry, stars, credits, purchasing upgrades, persistence, pause/resume, and a 390px touch viewport in Chromium.

## Publish a playable browser version

This game is a static website and works on GitHub Pages without a build step.

In this repository's **Settings → Pages**, select **Deploy from a branch**, choose **main**, choose **/ (root)**, and click **Save**. GitHub will display the published game URL when deployment completes. Players can open that URL on PC or phone; they do not need Node.js or an account.

The Node server is for local development only. The game itself uses `index.html`, `style.css`, `rules.js`, and `game.js`.

## Combat modules

Shields recharge after six seconds without damage; nanites repair hull after five seconds. Magnetic tracks add speed and damage resistance. Installed rockets launch with R or the on-screen ROCKET button on both desktop and phones, home toward an enemy, and damage enemies within a 2.2-tile blast radius.

Existing browser saves remain compatible; new components start at level zero. Enemy spawns are validated against building collision and a reachable navigation grid, fixing the hidden power-plant enemy in mission 3.

## Maps and enemy roles

Each of the 12 sectors has its own obstacle layout and theme, growing from 28×28 to 42×42 tiles. Terrains include farmlands, reactor compounds, scrapyards, canyons, docks with water crossings, lava refineries, snowy rail yards, citadels, and flooded cities. Water, lava, walls, rock ridges, buildings, and freight containers block ground movement; crossings and gates remain open.

During combat the camera follows your tank. The sector radar shows obstacles, your position, and remaining enemies, including those outside the camera view.

- Scouts flank clockwise or counterclockwise and fire three-round bursts.
- Aegis heavies advance with shields that regenerate after six seconds without damage.
- Siege artillery keeps its distance and fires delayed area shells.
- Repair escorts stay near heavy tanks and heal nearby allies.
- Gunships arrive in mission 6, increasing to four in the final mission. They fly over obstacles on strafing paths and drop delayed bombs.

Move out of warning rings before shells and bombs land. Aim directly at a helicopter to elevate your cannon; phone auto-aim handles this automatically. Rockets can also lock onto aircraft. Missions require destroying both ground and air enemies, and time targets scale with the larger maps. Existing saves and upgrades remain compatible.
