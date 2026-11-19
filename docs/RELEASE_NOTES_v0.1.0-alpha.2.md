# 🚀 lovelace-hass-foscam v0.1.0-alpha.2 — Optical Zoom & Manual Focus Lens Controls

> ### ⚠️ Compatibility Note
> Optical zoom and focus actions require **[`hass-foscam v0.1.0-alpha.5`](https://github.com/twrecked/hass-foscam/releases/tag/v0.1.0-alpha.5)** or later.

---

## 🌟 Highlights

### 1. Optical Zoom & Manual Focus Overlay Controls
- **Compact Lens Controls:** Placed alongside the existing 3x3 PTZ D-pad overlay:
  - **Zoom In / Out:** `mdi:magnify-plus-outline` and `mdi:magnify-minus-outline`.
  - **Focus Near / Far:** `mdi:image-filter-center-focus` and `mdi:image-filter-center-focus-weak`.
- **Integrated Emergency Stop:** The center Stop button (`mdi:stop`) halts PTZ, zoom, and focus movements concurrently.
- **Inward Alignment:** For `bottom-right` and `top-right` anchor positions, the layout renders with inward flex orientation so that lens controls never clip card boundaries.
- **Fullscreen Scaling:** All lens buttons and icons scale up proportionally to 44px when viewing in fullscreen mode.

### 2. Visual Card Configuration Editor (GUI)
- Added toggle switches in the card visual editor under PTZ settings:
  - `show_zoom`: Show Optical Zoom Controls (In/Out)
  - `show_focus`: Show Manual Focus Controls (Near/Far)
- Off by default so that cameras without motorized zoom/focus lenses remain clean and uncluttered.
