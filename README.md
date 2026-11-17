# lovelace-hass-foscam (`foscam-glance`)

A custom Home Assistant Lovelace card designed for Foscam IP cameras and the [`hass-foscam`](https://github.com/twrecked/hass-foscam) integration.

## Features
- **Live RTSP Streaming & Snapshots**: Live video streaming and automatic snapshot refreshes.
- **On-Screen PTZ Controls**: Intuitive directional D-pad overlay (Pan, Tilt, Diagonals, and Stop) visible on hover (desktop) or touch toggle (mobile).
- **Preset Position Buttons**: Quick-action buttons to jump directly to saved camera preset points.
- **Saved Clips Library Browser**: Browse camera recordings directly on the dashboard with HTTP 206 range request seeking and playback.
- **Glance Sensor Badges**: Clean top and bottom bars showing camera status, motion alarm state, sound alarm, and today's capture counts.

## Quick Start Configuration

```yaml
type: custom:foscam-glance
entity: camera.back_garden

# Optional PTZ configuration (enabled by default):
ptz:
  show: true          # true / false
  mode: hover         # 'hover' (fade on hover / tap on touch), 'always', or 'bottom'
  travel_time: 0.125  # movement travel time in seconds
  presets: auto       # 'auto' discovers from camera, or specify list: ['Patio', 'Driveway']

# Optional overrides:
motion_id: binary_sensor.motion_back_garden
captured_today_id: sensor.captured_today_back_garden
last_id: sensor.last_back_garden
```

## Manual Installation
Run the install script pointing to your Home Assistant config directory:
```bash
./scripts/install go /path/to/homeassistant/config
```
This installs `foscam-glance.js` to `<config>/www/foscam-glance.js`.
