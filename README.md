# Key3 Browser Extension

A Chrome Manifest V3 browser extension built with React, Vite, and TypeScript.

## Project Structure

```
├── public/
│   └── manifest.json      # Chrome extension manifest
├── src/
│   ├── background/
│   │   └── index.ts       # Background service worker
│   ├── content/
│   │   └── index.ts       # Content script
│   ├── popup/
│   │   ├── App.tsx        # Popup React component
│   │   ├── index.css      # Popup styles
│   │   ├── index.html     # Popup HTML entry
│   │   └── main.tsx       # Popup React entry point
│   └── vite-env.d.ts      # Vite type declarations
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Development

### Install Dependencies

```bash
npm install
```

### Build the Extension

```bash
npm run build
```

### Watch Mode (for development)

```bash
npm run dev
```

## Loading the Extension in Chrome

1. Run `npm run build` to create the `dist` folder
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked"
5. Select the `dist` folder from this project
6. The extension should now appear in your extensions list

## Features

- **Popup**: React-based popup UI that opens when clicking the extension icon
- **Background Service Worker**: Runs in the background and handles extension events
- **Content Script**: Injected into web pages for DOM interaction

## Permissions

- `storage`: For storing extension data
- `activeTab`: For accessing the current active tab
- `scripting`: For programmatic script injection
- `tabs`: For tab management
