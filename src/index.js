import { CARD_VERSION } from "./const.js";
import { FoscamGlance } from "./foscam-glance.js";
import { FoscamGlanceEditor } from "./editor.js";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.head.appendChild(script);
    });
}

(async function loadMediaLibraries() {
    if (!window.Hls) {
        await loadScript("https://cdn.jsdelivr.net/npm/hls.js@1.5.8/dist/hls.min.js");
    }
})();

if (!customElements.get("foscam-glance-editor")) {
    customElements.define("foscam-glance-editor", FoscamGlanceEditor);
}

if (!customElements.get("foscam-glance")) {
    customElements.define("foscam-glance", FoscamGlance);
}


console.info(
    `%c FOSCAM-GLANCE %c ${CARD_VERSION} `,
    "color: white; background: #009688; font-weight: 700;",
    "color: #009688; background: white; font-weight: 700;"
);

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "foscam-glance")) {
    window.customCards.push({
        type: "foscam-glance",
        name: "Foscam Glance Card",
        description: "Foscam camera glance card with live streaming, PTZ controls, and saved clips library",
        preview: true,
    });
}

export { FoscamGlance, FoscamGlanceEditor };
