# Apex Override — Web PoC

A single-file, zero-asset proof of concept for Apex Override's two core mechanics:

- **Omni-Rig handling**: strafe-drift sideways at speed without turning the car.
- **Auto-Strike combat**: Cyclone-Sweep spin attacks and Aero-Jostle dash rams.

It's an endless top-down survival run. Corporate Blockers come down the track in singles, wedges and walls. Speed and spawn rate go up every 30 seconds, and three hits ends the run.

## Run it

Open `apex_poc.html` in any modern browser. It has no build step, no server and no network requests. All visuals are drawn with Canvas primitives.

## Controls

| Action | Keys |
|---|---|
| Move / strafe-drift | WASD or Arrow keys |
| Aero-Jostle (dash / ram) | Double-tap a direction |
| Cyclone-Sweep (spin attack) | Space |
| Overdrive (when the meter is full) | Shift |
| Pause | P / Esc |
| Start / Restart | Enter / R |
| Debug overlay (FPS, hitboxes) | F3 |

## Mechanics at a glance

- **Cyclone-Sweep**: the car spins and knocks away every enemy within a 70 px radius. It has a 1.2 s cooldown.
- **Aero-Jostle**: a short, fast dash in the tapped direction. Any enemy you touch during the dash is destroyed. It has a 0.6 s cooldown.
- **Near-miss**: an enemy that passes within 18 px of you without touching you adds score and Overdrive meter.
- **Overdrive**: filled by kills and near-misses. When active, it doubles track speed, makes your car an instant-kill hitbox and doubles score. The screen colors invert. It lasts 6 s.
- **Score**: you earn 10 per second survived, 100 per kill and 25 per near-miss, all doubled during Overdrive. The high score is kept in `localStorage`.

## Tuning

All gameplay numbers are in the `CONFIG` object at the top of the script: physics, cooldowns, spawn curves and difficulty scaling. `window.__game` exposes the live game instance for debugging in the browser console.
