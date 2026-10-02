/*
 * Apex Override (3D) — tunables.
 *
 * Every gameplay, track, camera and look number lives here so tuning never
 * touches game code. Units: metres, seconds, radians unless noted.
 *
 * This is a CLASSIC script on purpose (not an ES module): browsers block
 * module imports of local files when the page is opened straight from disk
 * (file://), and double-click-to-play should keep working.
 * Keep this file in the same folder as apex_poc.html.
 *
 * Track space: the game logic runs in (d, o) coordinates —
 *   d = lateral offset from the track centreline (+ = right),
 *   o = longitudinal offset from a reference point that advances at the
 *       current scroll speed (the constant forward momentum).
 */
window.CONFIG = {
  // ---------------------------------------------------------------------
  // Track: a figure-8 (Lissajous 1:2) with an overpass at the crossing.
  //   centreline = (A·sin t, B·sin 2t). A=400/B=120 gives ~2 km of track,
  //   a tightest turn radius of ~100 m and a ~62° crossing angle.
  // ---------------------------------------------------------------------
  track: {
    A: 400,
    B: 120,
    samples: 1100,           // arc-length resampling resolution
    startFraction: 0.3,      // where the run begins, as a fraction of the loop (0 = under the bridge)
    roadWidth: 24,           // 6 lanes × 4 m
    lanes: 6,
    deckThickness: 1.4,      // road slab thickness (shows under the bridge)
    bridgeHeight: 9,         // overpass rise above ground
    bridgePlateau: 70,       // flat length on top of the bridge
    bridgeRamp: 90,          // length of each ramp up/down
    railHeight: 0.9,
    railWidth: 0.7,
    pillarSpacing: 18,
    lampSpacing: 30,
    laneDashLength: 16,      // texture repeat length along the road
  },

  // ---------------------------------------------------------------------
  // Scene / look
  // ---------------------------------------------------------------------
  scene: {
    fogNear: 160,
    fogFar: 950,
    skylineCount: 240,
    skylineClearance: 75,    // min distance from the road
    skylineRange: 520,       // how far past the loop the city extends
    groundGridSize: 40,      // metres per grid cell
    groundY: -0.45,          // ground plane height; well below the road (y≈0.02) to avoid depth fighting
    sunDistance: 2600,
    sunDirection: [0.8, 0.13, 0.55],   // world direction of the sun (x, y, z)
    sunSize: 420,
  },

  // ---------------------------------------------------------------------
  // Chase camera
  // ---------------------------------------------------------------------
  camera: {
    fov: 72,
    fovSpeedGain: 10,        // extra degrees at max level speed
    fovOverdrive: 16,        // extra degrees during Overdrive
    fovSmooth: 5,
    near: 0.5,               // keep this high: a tiny near plane wrecks depth precision (road vs ground fighting)
    far: 4000,
    back: 9,                 // metres behind the reference point
    height: 4.4,
    lookAhead: 26,
    lookHeight: 1.4,
    lateralFollow: 0.55,     // camera x-offset as a fraction of player d
    lateralLook: 0.85,       // look-target offset as a fraction of player d
    lateralSmooth: 6,        // how quickly the camera follows the car sideways
    roll: 0.035,             // radians of roll at full lateral speed
    shake: 0.12,             // metres of shake per unit of shake
  },

  // ---------------------------------------------------------------------
  // Player (Omni-Rig)
  // ---------------------------------------------------------------------
  player: {
    width: 1.9,
    length: 3.6,
    hitInset: 0.3,
    accelD: 170,             // lateral acceleration
    accelO: 125,             // forward/back acceleration
    frictionD: 0.90,         // velocity retained per 1/60 s
    frictionO: 0.85,
    maxVd: 26,
    maxVo: 16,
    oMin: -2,                // furthest the car can fall behind the reference
    oMax: 22,                // furthest it can push ahead
    oStart: 4,
    maxHealth: 3,
    invulnTime: 1.5,
    visualYaw: 0.3,          // max body yaw while drifting (visual only)
    visualRoll: 0.14,        // max body roll while drifting (visual only)
    edgeMargin: 0.2,         // gap kept between the car and the rails
  },

  // Aero-Jostle (double-tap dash / ram)
  dash: { window: 0.22, speed: 68, duration: 0.12, cooldown: 0.6, ramGrace: 0.08, carry: 0.55, verticalScale: 0.7 },

  // Cyclone-Sweep (spin attack)
  sweep: { radius: 5, duration: 0.35, cooldown: 1.2, spins: 2 },

  overdrive: { max: 100, duration: 6, speedMult: 2, gainKill: 12, gainRam: 15, gainNearMiss: 6 },

  nearMiss: { margin: 1.0 },

  scroll: { base: 40 },      // m/s of constant forward momentum at level 1

  difficulty: { levelTime: 30, speedGrowth: 1.12, maxSpeedMult: 2.0, spawnBase: 1.35, spawnDecay: 0.88, spawnMin: 0.45 },

  // ---------------------------------------------------------------------
  // Enemies & spawner
  // ---------------------------------------------------------------------
  enemy: {
    width: 2.1,
    length: 3.8,
    homerMaxVd: 6.3,
    homerAccel: 15,
    homerSteer: 1.5,         // desired lateral speed per metre of offset
    knockLife: 0.9,
    knockSpeedD: 40,
    knockSpeedO: 34,
    knockLift: 11,
    gravity: 32,
    spawnDist: 92,           // how far ahead of the reference enemies appear
    despawnBehind: -32,
  },

  spawner: {
    startDelay: 1.2,
    wall:  { base: 0.08, perLevel: 0.06, max: 0.35, delay: 1.6, rel: [0.42, 0.52], gapEarly: 2, gapLate: 1, gapLevel: 2 },
    wedge: { base: 0.25, perLevel: 0.05, max: 0.40, delay: 1.3, rel: [0.45, 0.60], step: 4, size5Level: 2, size5Chance: 0.5 },
    single:{ delay: 1.0, rel: [0.40, 0.65], jitter: 0.5, homerBase: 0.15, homerPerLevel: 0.08, homerMax: 0.5 },
  },

  score: { perSecond: 10, kill: 100, nearMiss: 25, overdriveMult: 2 },

  // ---------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------
  fx: {
    maxParticles: 900,
    maxRings: 8,
    shakeDecay: 0.85,        // per 1/60 s
    flashTime: 0.25,
    bannerTime: 2.2,
    deathTime: 1.3,
    deathSpeedScale: 0.25,   // world speed after the run ends
    deathSlowRate: 2.5,      // how quickly it eases down
  },

  // HUD / overlay
  ui: {
    minimap: true,
    minimapSize: 150,
  },
};

window.COLORS = {
  bg: '#07070f',
  skyTop: '#06041a',
  skyMid: '#3b1470',
  skyGlow: '#c2279f',
  fog: '#3a1366',          // also the horizon colour, so distant fog blends into the sky
  sun: '#ffb347',
  road: '#14142a',
  roadLine: '#d8e4ff',
  deck: '#0b0b18',
  ground: '#0a0818',
  grid: '#7a38e8',
  cyan: '#00f0ff',
  magenta: '#ff2bd6',
  yellow: '#ffe600',
  orange: '#ff8a00',
  red: '#ff0040',
  dim: '#7a7aa8',
  white: '#ffffff',
  carBody: '#101a2a',
  building: '#0c0c26',
};
