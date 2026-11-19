# 🚀 lovelace-hass-foscam v0.1.0-alpha.3 — Fix PTZ Hover Visibility & Clean Component Isolation

---

## 🌟 Highlights & Bug Fixes

### 1. Fix PTZ Hover Mode Initial Visibility
- **Initial State Fix:** Fixed an issue where the PTZ D-pad overlay and preset bar appeared visible immediately on card load even when `ptz.mode: hover` was configured.
- **State Initialization:** Corrected `showPtz` initial state from `true` to `false` in `getLibraryState()`, ensuring controls remain hidden (`opacity: 0`) until hovered over (or explicitly toggled on via the bottom stream bar `ptz` button).

### 2. Remove `aarlo-glance` Registration Alias
- Removed the automatic `customElements.define("aarlo-glance", FoscamGlance)` registration alias in `src/index.js`.
- Prevents the browser `CustomElementRegistry` error (*"this constructor has already been used with this registry"*).
- Eliminates tag collisions and race conditions in Home Assistant installations running both `lovelace-hass-foscam` and `lovelace-hass-aarlo` side-by-side.

### 3. Purge Legacy Aarlo Naming Artifacts
- **CSS & HTML Classes:** Replaced internal `.aarlo-*` styling and DOM classes with standard `.camera-*` and `.foscam-*` classes (`.camera-container`, `.camera-aspect-*`, `.camera-image`, `.stream-video`, `.foscam-modal-*`, `.foscam-pseudo-fullscreen`).
- **Entity Resolution:** Removed `aarlo_` prefix stripping and doorbell ding fallback lookups in favor of standard camera name handling and Foscam entity naming patterns (`binary_sensor.<camera>_motion`, etc.).
- **Localization:** Updated external language file CDN loader path to point to `lovelace-hass-foscam`.
