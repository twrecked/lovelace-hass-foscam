export const PtzViewMixin = {
    buildPtzOverlay() {
        if (!this.cc || !this.cc.showPtz) {
            return null;
        }

        const overlay = document.createElement("div");
        overlay.classList.add("ptz-overlay");
        overlay.dataset.zoom = String(Boolean(this.cc.showZoom));
        overlay.dataset.focus = String(Boolean(this.cc.showFocus));
        const pos = this.cc.ptzPosition || "bottom-right";
        overlay.classList.add(`ptz-pos-${pos}`);

        const isVisible = (this.cc.ptzMode === "always") || this.ls.showPtz;
        if (isVisible) {
            overlay.classList.add("ptz-visible");
        } else if (this.cc.ptzMode === "hover") {
            overlay.classList.add("ptz-hover-mode");
        }

        const dpad = document.createElement("div");
        dpad.classList.add("ptz-dpad");

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
                    if (this.cc.showZoom) this.performZoom("stop");
                    if (this.cc.showFocus) this.performFocus("stop");
                } else {
                    this.performPtz(btn.id);
                }
            });
            dpad.appendChild(el);
        });
        overlay.appendChild(dpad);

        if (this.cc.showZoom || this.cc.showFocus) {
            const lensGroup = document.createElement("div");
            lensGroup.classList.add("ptz-lens-group");

            if (this.cc.showZoom) {
                const zoomCol = document.createElement("div");
                zoomCol.classList.add("ptz-lens-column");

                const zoomIn = document.createElement("div");
                zoomIn.classList.add("ptz-btn");
                zoomIn.setAttribute("title", "Zoom In");
                const zinIcon = document.createElement("ha-icon");
                zinIcon.setAttribute("icon", "mdi:magnify-plus-outline");
                zoomIn.appendChild(zinIcon);
                zoomIn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.performZoom("in");
                });
                zoomCol.appendChild(zoomIn);

                const zoomOut = document.createElement("div");
                zoomOut.classList.add("ptz-btn");
                zoomOut.setAttribute("title", "Zoom Out");
                const zoutIcon = document.createElement("ha-icon");
                zoutIcon.setAttribute("icon", "mdi:magnify-minus-outline");
                zoomOut.appendChild(zoutIcon);
                zoomOut.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.performZoom("out");
                });
                zoomCol.appendChild(zoomOut);

                lensGroup.appendChild(zoomCol);
            }

            if (this.cc.showFocus) {
                const focusCol = document.createElement("div");
                focusCol.classList.add("ptz-lens-column");

                const focusNear = document.createElement("div");
                focusNear.classList.add("ptz-btn");
                focusNear.setAttribute("title", "Focus Near");
                const fnIcon = document.createElement("ha-icon");
                fnIcon.setAttribute("icon", "mdi:image-filter-center-focus");
                focusNear.appendChild(fnIcon);
                focusNear.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.performFocus("near");
                });
                focusCol.appendChild(focusNear);

                const focusFar = document.createElement("div");
                focusFar.classList.add("ptz-btn");
                focusFar.setAttribute("title", "Focus Far");
                const ffIcon = document.createElement("ha-icon");
                ffIcon.setAttribute("icon", "mdi:image-filter-center-focus-weak");
                focusFar.appendChild(ffIcon);
                focusFar.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.performFocus("far");
                });
                focusCol.appendChild(focusFar);

                lensGroup.appendChild(focusCol);
            }

            overlay.appendChild(lensGroup);
        }

        return overlay;
    },

    buildPresetBar() {
        if (!this.cc || !this.cc.showPtz || !this.cc.showPresets) {
            return null;
        }

        const presets = this.getPresets();
        if (!presets || presets.length === 0) {
            return null;
        }

        const bar = document.createElement("div");
        bar.classList.add("preset-bar");
        const pos = this.cc.presetsPosition || "left";
        const orient = this.cc.presetsOrientation || "vertical";
        bar.classList.add(`preset-pos-${pos}`, `preset-orient-${orient}`);

        const isVisible = (this.cc.ptzMode === "always") || this.ls.showPtz;
        if (isVisible) {
            bar.classList.add("ptz-visible");
        } else if (this.cc.ptzMode === "hover") {
            bar.classList.add("ptz-hover-mode");
        }

        presets.forEach((p) => {
            const chip = document.createElement("div");
            chip.classList.add("preset-chip");
            chip.textContent = p.label;
            const title = p.name !== p.label ? `${p.label} (${p.name})` : p.name;
            chip.setAttribute("title", `Go to preset ${title}`);

            chip.addEventListener("click", (e) => {
                e.stopPropagation();
                this.performPreset(p.name);
            });
            bar.appendChild(chip);
        });

        return bar;
    },

    getPresets() {
        if (!this._hass || !this.cc || !this.cc.id) {
            return [];
        }

        // 1. Fetch raw list from camera entity attributes
        const stateObj = this._hass.states[this.cc.id];
        let cameraPresets = [];
        if (stateObj && stateObj.attributes && Array.isArray(stateObj.attributes.preset_list)) {
            cameraPresets = stateObj.attributes.preset_list.map((p) => String(p).trim()).filter(Boolean);
        }

        // 2. Parse overrides from config
        let rawOverrides = this.cc.presets || [];
        if (typeof rawOverrides === "string") {
            rawOverrides = rawOverrides.split(",").map((s) => s.trim()).filter(Boolean);
        }

        // If explicitly set to hide all:
        if (rawOverrides.length === 1 && (rawOverrides[0] === "-" || rawOverrides[0] === "-*")) {
            return [];
        }

        const hides = new Set();
        const renames = new Map(); // cameraName -> customLabel
        const explicitOrder = [];

        rawOverrides.forEach((item) => {
            const str = String(item).trim();
            if (!str) return;

            if (str.startsWith("-")) {
                const hideName = str.substring(1).trim();
                if (hideName) {
                    hides.add(hideName.toLowerCase());
                }
            } else if (str.includes("=")) {
                const parts = str.split("=");
                const orig = parts[0].trim();
                const custom = parts.slice(1).join("=").trim();
                if (orig && custom) {
                    renames.set(orig.toLowerCase(), custom);
                    explicitOrder.push(orig);
                }
            } else {
                explicitOrder.push(str);
            }
        });

        // 3. Determine candidate list:
        let candidateList = [];
        const hasExplicitItems = explicitOrder.length > 0;
        const hasHides = hides.size > 0;

        if (hasExplicitItems && !hasHides) {
            candidateList = explicitOrder;
        } else if (cameraPresets.length > 0) {
            candidateList = cameraPresets;
        } else if (hasExplicitItems) {
            candidateList = explicitOrder;
        }

        // 4. Build final results: { name, label }
        const result = [];
        for (const name of candidateList) {
            const lower = name.toLowerCase();
            if (hides.has(lower)) {
                continue;
            }
            const label = renames.get(lower) || name;
            result.push({ name, label });
        }

        return result;
    },

    hidePtzControls() {
        const container = this._element("camera-container");
        if (container) {
            const overlay = container.querySelector(".ptz-overlay");
            if (overlay) overlay.style.display = "none";
            const bar = container.querySelector(".preset-bar");
            if (bar) bar.style.display = "none";
        }
    },

    showPtzControls() {
        const container = this._element("camera-container");
        if (container) {
            const overlay = container.querySelector(".ptz-overlay");
            if (overlay) overlay.style.display = "";
            const bar = container.querySelector(".preset-bar");
            if (bar) bar.style.display = "";
        }
    },

    updatePtzControls() {
        if (!this.cc || !this.cc.showPtz) {
            return;
        }
        // Do not display or update PTZ controls when viewing clip library or watching recordings
        if (this.ls.showing || (this.gs && this.gs.recording !== null)) {
            this.hidePtzControls();
            return;
        }
        this.showPtzControls();

        const container = this._element("camera-container");
        if (!container) {
            return;
        }

        // 1. D-Pad overlay
        let overlay = container.querySelector(".ptz-overlay");
        const currentZoom = overlay ? overlay.dataset.zoom : null;
        const currentFocus = overlay ? overlay.dataset.focus : null;
        const targetZoom = String(Boolean(this.cc.showZoom));
        const targetFocus = String(Boolean(this.cc.showFocus));

        if (overlay && (currentZoom !== targetZoom || currentFocus !== targetFocus)) {
            overlay.remove();
            overlay = null;
        }

        if (!overlay) {
            overlay = this.buildPtzOverlay();
            if (overlay) container.appendChild(overlay);
        } else {
            const isVisible = (this.cc.ptzMode === "always") || this.ls.showPtz;
            overlay.classList.toggle("ptz-visible", isVisible);
            overlay.classList.toggle("ptz-hover-mode", this.cc.ptzMode === "hover" && !this.ls.showPtz);

            // Update position class if changed
            const pos = this.cc.ptzPosition || "bottom-right";
            ["center", "bottom-right", "bottom-left", "top-right", "top-left"].forEach((p) => {
                overlay.classList.toggle(`ptz-pos-${p}`, p === pos);
            });
        }

        // 2. Preset bar
        let bar = container.querySelector(".preset-bar");
        const presets = this.getPresets();
        if (presets && presets.length > 0) {
            if (!bar) {
                bar = this.buildPresetBar();
                if (bar) container.appendChild(bar);
            } else {
                const currentLabels = Array.from(bar.querySelectorAll(".preset-chip")).map((c) => c.textContent);
                const newLabels = presets.map((p) => p.label);
                if (JSON.stringify(currentLabels) !== JSON.stringify(newLabels)) {
                    bar.remove();
                    const newBar = this.buildPresetBar();
                    if (newBar) container.appendChild(newBar);
                } else {
                    const isVisible = (this.cc.ptzMode === "always") || this.ls.showPtz;
                    bar.classList.toggle("ptz-visible", isVisible);
                    bar.classList.toggle("ptz-hover-mode", this.cc.ptzMode === "hover" && !this.ls.showPtz);

                    const pos = this.cc.presetsPosition || "left";
                    ["bottom", "top", "left", "right", "bottom-left", "bottom-right"].forEach((p) => {
                        bar.classList.toggle(`preset-pos-${p}`, p === pos);
                    });

                    const orient = this.cc.presetsOrientation || "vertical";
                    bar.classList.toggle("preset-orient-vertical", orient === "vertical");
                    bar.classList.toggle("preset-orient-horizontal", orient === "horizontal");
                }
            }
        } else if (bar) {
            bar.remove();
        }
    },

    togglePtzControls() {
        this.ls.showPtz = !this.ls.showPtz;
        this.updatePtzControls();
    },

    async performPtz(movement) {
        if (!this._hass || !this.cc.id) {
            return;
        }
        try {
            this._log(`Performing PTZ: ${movement} on ${this.cc.id} (travel_time=${this.cc.ptzTravelTime})`);
            await this._hass.callService("foscam", "ptz", {
                entity_id: this.cc.id,
                movement: movement,
                travel_time: this.cc.ptzTravelTime,
            });
        } catch (err) {
            console.warn(`[foscam-glance] PTZ ${movement} failed:`, err);
        }
    },

    async performZoom(direction) {
        if (!this._hass || !this.cc.id) {
            return;
        }
        try {
            this._log(`Performing zoom: ${direction} on ${this.cc.id} (travel_time=${this.cc.ptzTravelTime})`);
            await this._hass.callService("foscam", "zoom", {
                entity_id: this.cc.id,
                direction: direction,
                travel_time: this.cc.ptzTravelTime,
            });
        } catch (err) {
            console.warn(`[foscam-glance] Zoom ${direction} failed:`, err);
        }
    },

    async performFocus(direction) {
        if (!this._hass || !this.cc.id) {
            return;
        }
        try {
            this._log(`Performing focus: ${direction} on ${this.cc.id} (travel_time=${this.cc.ptzTravelTime})`);
            await this._hass.callService("foscam", "focus", {
                entity_id: this.cc.id,
                direction: direction,
                travel_time: this.cc.ptzTravelTime,
            });
        } catch (err) {
            console.warn(`[foscam-glance] Focus ${direction} failed:`, err);
        }
    },

    async performPreset(presetName) {
        if (!this._hass || !this.cc.id) {
            return;
        }
        try {
            this._log(`Moving to preset: ${presetName} on ${this.cc.id}`);
            await this._hass.callService("foscam", "ptz_preset", {
                entity_id: this.cc.id,
                preset_name: presetName,
            });
        } catch (err) {
            console.warn(`[foscam-glance] Preset ${presetName} failed:`, err);
        }
    },
};
