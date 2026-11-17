export const PtzViewMixin = {
    buildPtzOverlay() {
        if (!this.cc.showPtz) {
            return null;
        }

        const overlay = document.createElement("div");
        overlay.classList.add("ptz-overlay");
        if (this.cc.ptzMode === "hover") {
            overlay.classList.add("ptz-hover-mode");
        }
        if (this.ls.showPtzTouch) {
            overlay.classList.add("ptz-active");
        }

        const D_PAD = [
            { id: "top_left", icon: "mdi:arrow-top-left" },
            { id: "up", icon: "mdi:arrow-up" },
            { id: "top_right", icon: "mdi:arrow-top-right" },
            { id: "left", icon: "mdi:arrow-left" },
            { id: "stop", icon: "mdi:stop", isStop: true },
            { id: "right", icon: "mdi:arrow-right" },
            { id: "bottom_left", icon: "mdi:arrow-bottom-left" },
            { id: "down", icon: "mdi:arrow-down" },
            { id: "bottom_right", icon: "mdi:arrow-bottom-right" },
        ];

        D_PAD.forEach((btn) => {
            const el = document.createElement("div");
            el.classList.add("ptz-btn");
            if (btn.isStop) {
                el.classList.add("ptz-btn-stop");
            }
            el.setAttribute("title", `PTZ ${btn.id}`);

            const icon = document.createElement("ha-icon");
            icon.setAttribute("icon", btn.icon);
            el.appendChild(icon);

            el.addEventListener("click", (e) => {
                e.stopPropagation();
                if (btn.isStop) {
                    this.performPtz("stop");
                } else {
                    this.performPtz(btn.id);
                }
            });
            overlay.appendChild(el);
        });

        return overlay;
    },

    buildPresetBar() {
        if (!this.cc.showPtz || !this.cc.showPresets) {
            return null;
        }

        const presets = this.getPresets();
        if (!presets || presets.length === 0) {
            return null;
        }

        const bar = document.createElement("div");
        bar.classList.add("preset-bar");
        if (this.cc.ptzMode === "hover") {
            bar.classList.add("ptz-hover-mode");
        }
        if (this.ls.showPtzTouch) {
            bar.classList.add("ptz-active");
        }

        presets.forEach((name) => {
            const chip = document.createElement("div");
            chip.classList.add("preset-chip");
            chip.textContent = name;
            chip.setAttribute("title", `Go to preset ${name}`);

            chip.addEventListener("click", (e) => {
                e.stopPropagation();
                this.performPreset(name);
            });
            bar.appendChild(chip);
        });

        return bar;
    },

    getPresets() {
        if (Array.isArray(this.cc.presets) && this.cc.presets.length > 0) {
            return this.cc.presets;
        }
        // Auto-discover from camera entity attributes if available
        const stateObj = this._hass.states[this.cc.id];
        if (stateObj && stateObj.attributes && Array.isArray(stateObj.attributes.preset_list)) {
            return stateObj.attributes.preset_list;
        }
        return [];
    },

    async performPtz(movement) {
        if (!this._hass || !this.cc.id) {
            return;
        }
        try {
            await this._hass.callService("foscam", "ptz", {
                entity_id: this.cc.id,
                movement: movement,
                travel_time: this.cc.ptzTravelTime,
            });
        } catch (err) {
            console.warn(`[foscam-glance] PTZ ${movement} failed:`, err);
        }
    },

    async performPreset(presetName) {
        if (!this._hass || !this.cc.id) {
            return;
        }
        try {
            await this._hass.callService("foscam", "ptz_preset", {
                entity_id: this.cc.id,
                preset_name: presetName,
            });
        } catch (err) {
            console.warn(`[foscam-glance] Preset ${presetName} failed:`, err);
        }
    },
};
