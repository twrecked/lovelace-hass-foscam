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
        .box {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: absolute;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.4);
            padding: 4px 8px;
            color: white;
            display: flex;
            justify-content: space-between;
            z-index: 2;
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
            gap: 4px;
        }
        .box-align-right {
            margin-right: 4px;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .box-title {
            font-weight: 500;
            font-size: 14px;
        }
        .box-status {
            font-size: 12px;
            opacity: 0.9;
        }
        .camera-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
        }
        .camera-image {
            width: 100%;
            height: auto;
            display: block;
        }
        .stream-video {
            width: 100%;
            height: auto;
            display: block;
        }

        /* PTZ D-Pad Overlay */
        .ptz-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: grid;
            grid-template-columns: repeat(3, 40px);
            grid-template-rows: repeat(3, 40px);
            gap: 6px;
            z-index: 5;
            transition: opacity 0.25s ease-in-out;
            pointer-events: auto;
        }
        .aarlo-base, .camera-container {
            position: relative;
            overflow: hidden;
        }
        .ptz-hover-mode {
            opacity: 0;
        }
        .aarlo-base:hover .ptz-hover-mode,
        .camera-container:hover .ptz-hover-mode,
        ha-card:hover .ptz-hover-mode,
        .ptz-active {
            opacity: 1 !important;
        }
        .ptz-btn {
            background-color: rgba(0, 0, 0, 0.55);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            user-select: none;
            transition: background-color 0.15s, transform 0.1s;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }
        .ptz-btn:hover {
            background-color: rgba(3, 169, 244, 0.85);
        }
        .ptz-btn:active {
            transform: scale(0.9);
            background-color: #0288d1;
        }
        .ptz-btn-stop {
            background-color: rgba(244, 67, 54, 0.65);
        }
        .ptz-btn-stop:hover {
            background-color: rgba(244, 67, 54, 0.9);
        }

        /* Presets Bar */
        .preset-bar {
            position: absolute;
            bottom: 40px;
            left: 0;
            right: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px;
            padding: 4px 8px;
            z-index: 4;
            transition: opacity 0.25s ease-in-out;
        }
        .preset-chip {
            background-color: rgba(0, 0, 0, 0.65);
            color: #fff;
            border-radius: 12px;
            padding: 2px 10px;
            font-size: 11px;
            font-weight: 500;
            cursor: pointer;
            user-select: none;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            transition: background-color 0.15s;
        }
        .preset-chip:hover {
            background-color: #03a9f4;
        }
        .preset-chip:active {
            transform: scale(0.95);
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
