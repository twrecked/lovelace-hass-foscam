# 🚀 lovelace-hass-foscam v0.1.0-alpha.1 — Modern Glance Card for Foscam IP Cameras

> ### ⚠️ Alpha Release & Community Testing Notice
> **lovelace-hass-foscam is a dedicated Lovelace camera card designed for Foscam IP cameras and the `hass-foscam` integration.**
>
> This is the initial release, featuring live RTSP streaming, on-screen compact PTZ controls, camera preset shortcuts with custom naming/filtering, and a full saved clip library browser.
>
> If you encounter any display or interaction issues, please report them on [GitHub Issues](https://github.com/twrecked/lovelace-hass-foscam/issues).

---

## 🌟 Highlights

### 1. On-Screen PTZ D-Pad Controls
- **Compact Overlay:** Non-obtrusive 30px directional controls (Up, Down, Left, Right, Diagonals, and Center Stop) that scale up automatically in full-screen mode.
- **Configurable Anchoring:** Position the D-pad wherever you prefer:
  - `bottom-right` (default corner)
  - `bottom-left`
  - `top-right`
  - `top-left`
  - `center`
- **Stream Controls Toggle:** A dedicated PTZ toggle button (`mdi:camera-control`) in the bottom stream bar allows showing/hiding the D-pad with a single click.

### 2. Presets Quick Bar with Filtering & Renaming
- **Preset Auto-Discovery:** Automatically loads saved preset points directly from `camera.<name>`'s `preset_list` attribute.
- **Filter Out Boundary Points with `-`:** Prefix with `-` (e.g. `-TopMost, -BottomMost, -LeftMost, -RightMost`) to hide unwanted calibration points.
- **Custom Name Overrides with `=`:** Rename generic camera scene IDs into friendly labels (e.g. `scene01=Pool, scene02=Fire Pit`). The button displays your custom name on screen while calling the underlying camera preset point.
- **Docking & Orientation:** Position the preset chips along the `left` edge (vertical column), `right` edge, `bottom` bar, or `top` bar.

### 3. Saved Clip Library Browser & Video Scrubber
- **Range Request Seeking:** Full video playback modal with seek bar, play/pause, and fullscreen controls powered by Home Assistant's HTTP 206 range request streaming.
- **Context-Aware Visibility:** The PTZ overlay and preset chips automatically hide when viewing the library gallery or watching recorded clips, keeping the view clean.

### 4. Visual Card Configuration Editor (GUI)
- Full Home Assistant dashboard visual editor (`foscam-glance-editor`) with dropdown selectors for:
  - PTZ Display Mode (`always`, `hover`, `off`)
  - PTZ D-Pad Position (`bottom-right`, `center`, etc.)
  - Step Travel Time (seconds per click)
  - Presets Position and Orientation
  - Presets Filter/Override text input
  - Bottom and top bar widget pickers

### 5. Modular Rollup Architecture
- Modular ES module source layout under `src/` (`foscam-glance.js`, `editor.js`, `styles.js`, `localize.js`, `views/`).
- Distribution bundle compiled to `dist/foscam-glance.js`.
- Clean HACS metadata (`hacs.json`) and automated install script (`scripts/install`).
