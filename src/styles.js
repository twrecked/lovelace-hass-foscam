export const CARD_STYLES = `
    <style>
        .w3-modal {
            z-index: 1000;
            display: none;
            padding-top: 100px;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
        }
        .w3-modal-content {
            margin: auto;
            background-color: #fff;
            position: relative;
            padding: 0;
            outline: 0;
            width: 600px;
        }
        .w3-animate-opacity {
            animation: opac 0.8s;
        }
        @keyframes opac {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        ha-card {
            position: relative;
            min-height: 48px;
            overflow: hidden;
        }
        .aarlo-base, .camera-container {
            position: relative;
            overflow: hidden;
            width: 100%;
            background: #000;
        }
        .aarlo-aspect-16x9 {
            padding-top: 56.25%;
        }
        .aarlo-aspect-4x3 {
            padding-top: 75%;
        }
        .aarlo-aspect-1x1 {
            padding-top: 100%;
        }
        .aarlo-image, .camera-image {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            display: block;
        }
        .aarlo-video, .stream-video {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: auto;
            transform: translate(-50%, -50%);
            display: block;
        }
        .box {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: absolute;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.45);
            padding: 4px 8px;
            color: white;
            display: flex;
            justify-content: space-between;
            z-index: 10;
        }
        .box-top {
            top: 0;
        }
        .box-bottom {
            bottom: 0;
        }
        .box-align-left {
            margin-left: 4px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .box-align-right {
            margin-right: 4px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .box-title {
            font-weight: 500;
            font-size: 14px;
        }
        .box-status {
            font-size: 12px;
            opacity: 0.9;
        }

        /* PTZ D-Pad Overlay (Compact by default) */
        .ptz-overlay {
            position: absolute;
            display: flex;
            align-items: center;
            gap: 6px;
            z-index: 25;
            transition: opacity 0.25s ease-in-out;
            pointer-events: auto;
        }
        .ptz-dpad {
            display: grid;
            grid-template-columns: repeat(3, 30px);
            grid-template-rows: repeat(3, 30px);
            gap: 4px;
        }
        .ptz-lens-group {
            display: flex;
            gap: 4px;
            align-items: center;
        }
        .ptz-lens-column {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .ptz-hover-mode {
            opacity: 0;
            pointer-events: none;
        }
        .aarlo-base:hover .ptz-hover-mode,
        .camera-container:hover .ptz-hover-mode,
        ha-card:hover .ptz-hover-mode,
        .ptz-visible,
        .ptz-active {
            opacity: 1 !important;
            pointer-events: auto !important;
        }
        .ptz-btn {
            width: 30px;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.65);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            user-select: none;
            transition: background-color 0.15s, transform 0.1s;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .ptz-btn ha-icon {
            --mdc-icon-size: 16px;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .ptz-btn:hover {
            background-color: rgba(3, 169, 244, 0.9);
            border-color: #fff;
        }
        .ptz-btn:active {
            transform: scale(0.9);
            background-color: #0288d1;
        }
        .ptz-btn-stop {
            background-color: rgba(244, 67, 54, 0.75);
        }
        .ptz-btn-stop:hover {
            background-color: rgba(244, 67, 54, 0.95);
        }

        /* PTZ Positions */
        .ptz-pos-center {
            top: 50% !important;
            left: 50% !important;
            right: auto !important;
            bottom: auto !important;
            transform: translate(-50%, -50%) !important;
            flex-direction: row;
        }
        .ptz-pos-bottom-right {
            bottom: 44px !important;
            right: 8px !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            flex-direction: row-reverse;
        }
        .ptz-pos-bottom-left {
            bottom: 44px !important;
            left: 8px !important;
            top: auto !important;
            right: auto !important;
            transform: none !important;
            flex-direction: row;
        }
        .ptz-pos-top-right {
            top: 44px !important;
            right: 8px !important;
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            flex-direction: row-reverse;
        }
        .ptz-pos-top-left {
            top: 44px !important;
            left: 8px !important;
            bottom: auto !important;
            right: auto !important;
            transform: none !important;
            flex-direction: row;
        }

        /* Fullscreen PTZ scaling */
        ha-card.aarlo-pseudo-fullscreen .ptz-overlay,
        ha-card:fullscreen .ptz-overlay,
        ha-card:-webkit-full-screen .ptz-overlay {
            gap: 8px;
        }
        ha-card.aarlo-pseudo-fullscreen .ptz-dpad,
        ha-card:fullscreen .ptz-dpad,
        ha-card:-webkit-full-screen .ptz-dpad {
            grid-template-columns: repeat(3, 44px);
            grid-template-rows: repeat(3, 44px);
            gap: 6px;
        }
        ha-card.aarlo-pseudo-fullscreen .ptz-lens-group,
        ha-card:fullscreen .ptz-lens-group,
        ha-card:-webkit-full-screen .ptz-lens-group,
        ha-card.aarlo-pseudo-fullscreen .ptz-lens-column,
        ha-card:fullscreen .ptz-lens-column,
        ha-card:-webkit-full-screen .ptz-lens-column {
            gap: 6px;
        }
        ha-card.aarlo-pseudo-fullscreen .ptz-btn,
        ha-card:fullscreen .ptz-btn,
        ha-card:-webkit-full-screen .ptz-btn {
            width: 44px;
            height: 44px;
        }
        ha-card.aarlo-pseudo-fullscreen .ptz-btn ha-icon,
        ha-card:fullscreen .ptz-btn ha-icon,
        ha-card:-webkit-full-screen .ptz-btn ha-icon {
            --mdc-icon-size: 22px;
            width: 22px;
            height: 22px;
        }

        /* Presets Bar & Positions */
        .preset-bar {
            position: absolute;
            z-index: 24;
            transition: opacity 0.25s ease-in-out;
            pointer-events: auto;
            gap: 5px;
        }
        .preset-orient-horizontal {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        .preset-orient-vertical {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            max-height: calc(100% - 88px);
            overflow-y: auto;
        }
        .preset-pos-bottom {
            bottom: 44px;
            left: 8px;
            right: 8px;
            justify-content: center;
        }
        .preset-pos-top {
            top: 44px;
            left: 8px;
            right: 8px;
            justify-content: center;
        }
        .preset-pos-left {
            top: 44px;
            left: 8px;
        }
        .preset-pos-right {
            top: 44px;
            right: 8px;
            align-items: flex-end;
        }
        .preset-pos-bottom-left {
            bottom: 44px;
            left: 8px;
        }
        .preset-pos-bottom-right {
            bottom: 44px;
            right: 8px;
        }
        .preset-bar.ptz-hover-mode {
            opacity: 0;
            pointer-events: none;
        }
        .aarlo-base:hover .preset-bar.ptz-hover-mode,
        .camera-container:hover .preset-bar.ptz-hover-mode,
        ha-card:hover .preset-bar.ptz-hover-mode,
        .preset-bar.ptz-visible {
            opacity: 1 !important;
            pointer-events: auto !important;
        }
        .preset-chip {
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            border-radius: 12px;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 500;
            cursor: pointer;
            user-select: none;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: background-color 0.15s, transform 0.1s;
            white-space: nowrap;
        }
        .preset-chip:hover {
            background-color: #03a9f4;
            border-color: #fff;
        }
        .preset-chip:active {
            transform: scale(0.95);
        }

        /* Video controls slider */
        input.slider {
            width: 100%;
            height: 4px;
        }

        /* Library modal & carousel */
        .library-gallery {
            display: flex;
            overflow-x: auto;
            gap: 8px;
            padding: 8px;
            background: #111;
        }
        .library-thumb {
            width: 120px;
            flex-shrink: 0;
            cursor: pointer;
            border-radius: 4px;
            overflow: hidden;
            border: 2px solid transparent;
            transition: border-color 0.15s;
        }
        .library-thumb:hover {
            border-color: #03a9f4;
        }
        .library-thumb img {
            width: 100%;
            height: 70px;
            object-fit: cover;
            display: block;
        }
        .library-thumb-date {
            font-size: 10px;
            color: #ccc;
            text-align: center;
            padding: 2px;
            background: rgba(0, 0, 0, 0.8);
        }
    </style>
`;
