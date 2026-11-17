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

        /* PTZ D-Pad Overlay */
        .ptz-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: grid;
            grid-template-columns: repeat(3, 44px);
            grid-template-rows: repeat(3, 44px);
            gap: 8px;
            z-index: 25;
            transition: opacity 0.25s ease-in-out;
            pointer-events: auto;
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
            background-color: rgba(0, 0, 0, 0.65);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            user-select: none;
            transition: background-color 0.15s, transform 0.1s;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
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

        /* Presets Bar */
        .preset-bar {
            position: absolute;
            bottom: 45px;
            left: 0;
            right: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px;
            padding: 6px 10px;
            z-index: 24;
            transition: opacity 0.25s ease-in-out;
            pointer-events: auto;
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
            background-color: rgba(0, 0, 0, 0.75);
            color: #fff;
            border-radius: 14px;
            padding: 3px 12px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            user-select: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: background-color 0.15s, transform 0.1s;
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
