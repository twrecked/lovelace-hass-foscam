export const TOP_WIDGET_OPTIONS = [
    { value: "name", label: "Camera Name" },
    { value: "status", label: "Status (Idle/Streaming/etc)" },
    { value: "date", label: "Date / Time of Capture" },
];

export const BOTTOM_WIDGET_OPTIONS = [
    { value: "ptz", label: "PTZ Controls Toggle" },
    { value: "motion", label: "Motion Detection" },
    { value: "sound", label: "Audio Detection" },
    { value: "stream", label: "Live Stream Toggle" },
    { value: "snapshot", label: "Take Snapshot" },
    { value: "library", label: "Library / Recordings" },
    { value: "onoff", label: "Camera On/Off" },
    { value: "light", label: "Paired Light (Optional)" },
    { value: "siren", label: "Paired Siren (Optional)" },
];

export const PTZ_MODE_OPTIONS = [
    { value: "always", label: "Always Visible (Overlay on Stream & Image)" },
    { value: "hover", label: "Visible on Hover (Desktop) / Tap (Mobile)" },
    { value: "off", label: "Disabled (Hide PTZ Controls)" },
];

export const EDITOR_SCHEMA = [
    { name: "entity", selector: { entity: { domain: "camera" } } },
    { name: "name", selector: { text: {} } },
    {
        name: "image_click",
        selector: {
            select: {
                options: [
                    { value: "stream", label: "Live Stream" },
                    { value: "recording", label: "Last Recording" },
                ],
            },
        },
    },
    {
        name: "show_ptz",
        selector: { boolean: {} },
    },
    {
        name: "ptz_mode",
        selector: {
            select: {
                options: PTZ_MODE_OPTIONS,
            },
        },
    },
    {
        name: "ptz_travel_time",
        selector: {
            number: {
                min: 0.05,
                max: 1.0,
                step: 0.025,
                mode: "box",
                unit_of_measurement: "sec",
            },
        },
    },
    {
        name: "ptz_presets",
        selector: { text: {} },
    },
    {
        name: "top_left",
        selector: {
            select: {
                multiple: true,
                options: TOP_WIDGET_OPTIONS,
            },
        },
    },
    {
        name: "top_right",
        selector: {
            select: {
                multiple: true,
                options: TOP_WIDGET_OPTIONS,
            },
        },
    },
    {
        name: "bottom_left",
        selector: {
            select: {
                multiple: true,
                options: BOTTOM_WIDGET_OPTIONS,
            },
        },
    },
    {
        name: "bottom_right",
        selector: {
            select: {
                multiple: true,
                options: BOTTOM_WIDGET_OPTIONS,
            },
        },
    },
    { name: "light", selector: { entity: { domain: "light" } } },
    { name: "siren", selector: { entity: { domain: "siren" } } },
    { name: "library_sizes", selector: { text: {} } },
    { name: "logging", selector: { boolean: {} } },
];

export class FoscamGlanceEditor extends HTMLElement {
    constructor() {
        super();
        this._config = null;
        this._hass = null;
        this._form = null;
    }

    setConfig(config) {
        this._config = { ...config };
        this.render();
    }

    set hass(hass) {
        this._hass = hass;
        if (this._form) {
            this._form.hass = hass;
        }
    }

    connectedCallback() {
        this.render();
    }

    _computeLabel(schema) {
        const labels = {
            entity: "Camera Entity",
            name: "Display Name (Optional)",
            image_click: "Click Preview Action",
            show_ptz: "Enable PTZ D-Pad & Controls",
            ptz_mode: "PTZ Display Mode",
            ptz_travel_time: "PTZ Step Travel Time",
            ptz_presets: "Presets Override (Comma-separated, blank for auto-detect)",
            top_left: "Top Bar Widgets (Left)",
            top_right: "Top Bar Widgets (Right)",
            bottom_left: "Bottom Bar Widgets (Left)",
            bottom_right: "Bottom Bar Widgets (Right)",
            light: "Optional Paired Light",
            siren: "Optional Paired Siren",
            library_sizes: "Library Grid Sizes (e.g. 2,3,4)",
            logging: "Enable Debug Logging",
        };
        return labels[schema.name] || schema.name;
    }

    _parseWidgets(field) {
        if (!field) return [[], []];
        const raw = Array.isArray(field) ? field.join("|") : String(field);
        const parts = raw.split("|");
        const left = parts[0] ? parts[0].split(",").map((s) => s.trim()).filter(Boolean) : [];
        const right = parts[1] ? parts[1].split(",").map((s) => s.trim()).filter(Boolean) : [];
        return [left, right];
    }

    _valueChanged(ev) {
        if (!this._config || !this._hass) return;
        const value = ev.detail.value;
        const newConfig = { ...this._config };

        for (const [k, v] of Object.entries(value)) {
            if (v === "" || v === undefined) {
                delete newConfig[k];
            } else {
                newConfig[k] = v;
            }
        }

        const topL = (value.top_left || []).join(",");
        const topR = (value.top_right || []).join(",");
        if (topL || topR) {
            newConfig.image_top = topR ? `${topL}|${topR}` : topL;
        } else {
            delete newConfig.image_top;
        }

        const bottomL = (value.bottom_left || []).join(",");
        const bottomR = (value.bottom_right || []).join(",");
        if (bottomL || bottomR) {
            newConfig.image_bottom = bottomR ? `${bottomL}|${bottomR}` : bottomL;
        } else {
            delete newConfig.image_bottom;
        }

        delete newConfig.top_left;
        delete newConfig.top_right;
        delete newConfig.bottom_left;
        delete newConfig.bottom_right;

        // Build clean ptz config block
        const ptzShow = value.show_ptz !== undefined ? value.show_ptz : true;
        const ptzMode = value.ptz_mode || "always";
        const ptzTravel = parseFloat(value.ptz_travel_time) || 0.125;
        const ptzPresets = value.ptz_presets
            ? String(value.ptz_presets).split(",").map((s) => s.trim()).filter(Boolean)
            : [];

        newConfig.ptz = {
            show: ptzShow,
            mode: ptzMode,
            travel_time: ptzTravel,
        };
        if (ptzPresets.length > 0) {
            newConfig.ptz.presets = ptzPresets;
        }

        // Clean up editor-specific helper keys from yaml
        delete newConfig.show_ptz;
        delete newConfig.ptz_mode;
        delete newConfig.ptz_travel_time;
        delete newConfig.ptz_presets;

        this._config = newConfig;
        const event = new CustomEvent("config-changed", {
            bubbles: true,
            composed: true,
            detail: { config: newConfig },
        });
        this.dispatchEvent(event);
    }

    render() {
        if (!this._hass || !this._config) return;

        if (!this._form) {
            this.innerHTML = `
                <style>
                    .card-config {
                        padding: 16px 0;
                    }
                </style>
                <div class="card-config">
                    <ha-form></ha-form>
                </div>
            `;
            this._form = this.querySelector("ha-form");
            this._form.addEventListener("value-changed", (ev) => this._valueChanged(ev));
            this._form.computeLabel = (s) => this._computeLabel(s);
        }

        const [topLeft, topRight] = this._parseWidgets(this._config.image_top || "name,status");
        const [bottomLeft, bottomRight] = this._parseWidgets(
            this._config.image_bottom || "motion,library,ptz,snapshot"
        );

        const ptzCfg = this._config.ptz || {};
        const showPtz = this._config.show_ptz !== undefined
            ? this._config.show_ptz
            : (ptzCfg.show !== undefined ? ptzCfg.show : true);
        const ptzMode = this._config.ptz_mode || ptzCfg.mode || "always";
        const ptzTravel = this._config.ptz_travel_time || ptzCfg.travel_time || 0.125;
        const ptzPresets = this._config.ptz_presets || (Array.isArray(ptzCfg.presets) ? ptzCfg.presets.join(", ") : "");

        const formData = {
            ...this._config,
            show_ptz: showPtz,
            ptz_mode: ptzMode,
            ptz_travel_time: ptzTravel,
            ptz_presets: ptzPresets,
            top_left: topLeft,
            top_right: topRight,
            bottom_left: bottomLeft,
            bottom_right: bottomRight,
        };

        this._form.hass = this._hass;
        this._form.schema = EDITOR_SCHEMA;
        this._form.data = formData;
    }
}
