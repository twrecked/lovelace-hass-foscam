# lovelace-hass-foscam (`foscam-glance`)

A custom Home Assistant Lovelace card designed for Foscam IP cameras and the [`hass-foscam`](https://github.com/twrecked/hass-foscam) integration.

## Features
- **Live RTSP Streaming & Snapshots**: Live video streaming and automatic snapshot refreshes.
- **On-Screen PTZ Controls**: Intuitive directional D-pad overlay (Pan, Tilt, Diagonals, and Stop) visible on hover (desktop) or touch toggle (mobile).
- **Preset Position Buttons**: Quick-action buttons to jump directly to saved camera preset points.
- **Saved Clips Library Browser**: Browse camera recordings directly on the dashboard with HTTP 206 range request seeking and playback.
- **Glance Sensor Badges**: Clean top and bottom bars showing camera status, motion alarm state, sound alarm, and today's capture counts.

---

## Installation

### Method 1: Via HACS (Custom Repository) — Recommended
1. Open **HACS** in your Home Assistant sidebar.
2. Click the **three dots** in the top-right corner and select **Custom repositories**.
3. In the dialog:
   - **Repository**: `https://github.com/twrecked/lovelace-hass-foscam`
   - **Type**: `Dashboard` (or `Lovelace`)
4. Click **Add**.
5. Find **Foscam Glance Card** in HACS, click **Download**, and reload your browser when prompted.

### Method 2: Manual Installation
1. Run the installation script pointing to your Home Assistant config directory:
   ```bash
   ./scripts/install go /path/to/homeassistant/config
   ```
   This copies `foscam-glance.js` to `<config>/www/foscam-glance.js`.
2. Add the resource reference in Home Assistant (**Settings** -> **Dashboards** -> **Three dots** -> **Resources**):
   - **URL**: `/local/foscam-glance.js`
   - **Resource type**: `JavaScript Module`

---

## Card Configuration

Add the card to your dashboard via the visual editor or YAML:

```yaml
type: custom:foscam-glance
entity: camera.back_garden

# Optional PTZ configuration (enabled by default):
ptz:
  show: true          # true / false
  mode: hover         # 'hover' (fade on hover / tap on touch), 'always', or 'bottom'
  travel_time: 0.125  # movement travel time in seconds
  presets: auto       # 'auto' discovers from camera, or specify list: ['Patio', 'Driveway']

# Optional sensor entity overrides (auto-detected if matching naming pattern):
motion_id: binary_sensor.motion_back_garden
captured_today_id: sensor.captured_today_back_garden
last_id: sensor.last_back_garden
```
