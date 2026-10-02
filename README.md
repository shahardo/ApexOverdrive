# Apex Override — 3D Web PoC

A 3D proof of concept for Apex Override's two core mechanics:

- **Omni-Rig handling**: strafe-drift sideways at speed without turning the car.
- **Auto-Strike combat**: Cyclone-Sweep spin attacks and Aero-Jostle dash rams.

You drive a chase-cam car around an endless **figure-8 track** with an overpass at the crossing. Corporate Blockers come down the road in singles, wedges and walls. Speed and spawn rate go up every 30 seconds, and three hits ends the run.

The earlier 2D top-down version is in the git history (PR #1).

## Run it

Open `apex_poc.html` in a modern desktop browser. No build step or server is needed.

- **Keep `apex_poc.html` and `config.js` in the same folder.** `config.js` holds every tunable number.
- **You need an internet connection.** The only external dependency is Three.js, loaded from the jsDelivr CDN and pinned to `three@0.160.0`. Everything else (cars, track, sky, skyline, particles) is generated in code, with no images, models or sounds.

## Controls

| Action | Keys |
|---|---|
| Move / strafe-drift (left, right, forward, back) | WASD or Arrow keys |
| Aero-Jostle (dash / ram) | Double-tap a direction |
| Cyclone-Sweep (spin attack) | Space |
| Overdrive (when the meter is full) | Shift |
| Pause | P / Esc |
| Start / Restart | Enter / R |
| Debug overlay (FPS, entity counts) | F3 |

## Mechanics at a glance

- **Cyclone-Sweep**: the car spins and knocks away every enemy within 5 m. It has a 1.2 s cooldown.
- **Aero-Jostle**: a short, fast dash in the tapped direction. Any enemy you touch during the dash is destroyed. It has a 0.6 s cooldown.
- **Near-miss**: an enemy that passes within 1 m of you without touching you adds score and Overdrive meter.
- **Overdrive**: filled by kills and near-misses. When active, it doubles track speed, makes your car an instant-kill hitbox and doubles score. The screen colors invert. It lasts 6 s.
- **Score**: you earn 10 per second survived, 100 per kill and 25 per near-miss, all doubled during Overdrive. The high score is kept in `localStorage`.
- **Track**: a ~2 km figure-8 with a minimap in the corner. The overpass is drawn in yellow. The game logic works in track space (lateral offset and distance along the road), so the overpass never creates collisions between the two halves of the loop.

## Tuning

All gameplay, track, camera and look numbers are in `config.js` (metres and seconds). That includes physics, cooldowns, spawn curves, difficulty scaling, the figure-8 shape and the bridge height. Model proportions and effect counts stay in `apex_poc.html`.

`window.__game` exposes the live game instance for debugging in the browser console.
