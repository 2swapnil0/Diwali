# Local Diwali surprise

A standalone local Diwali surprise for Bachu, from Swapnil. The public renderer supplies the layout, animations and interactions. The personal letter is included.

## Run

```sh
cd koikoi-diwali-source
python3 serve.py
```

Open http://127.0.0.1:8765/diwali/view (or http://127.0.0.1:8765/).

Stop the server with Ctrl+C. No package installation or internet connection is required to run the viewer. Music starts after a click because of browser autoplay rules.

## Deploy on Vercel

Import this repository into Vercel as an **Other** framework project. Keep the repository root as the project root and leave the build command empty. The site is ready as static files: `index.html` serves the root URL, and `vercel.json` maps `/diwali` and `/diwali/view` to it. The audio, images, fonts, and music are included in the repository.

## Edit

Edit `personalization.json` to change the names, letter paragraphs, or three lantern wishes, then rebuild:

```sh
node build-viewer.cjs
```

Reload the page. Node is required only for rebuilding. `viewer-config.json` shows the generated presentation configuration. `index.html` and `local-view.html` are the generated standalone pages; edits to them are overwritten on rebuild.

## Included

- Diwali greeting, interactive diyas, a personal letter, three lantern wishes, Swapnil's song recording, crackers, and closing greeting.
- `audio/voice-note.m4a`: the local recording. Background music pauses throughout the voice-note screen and resumes afterward if it was playing.
- Diwali illustrations, animated fireworks, decorations, local fonts, background music, and click/applause effects.
- `styles/` and `diwali/`: downloaded local assets.
- `_next/`: the two public renderer chunks required to rebuild the standalone page.

The local server serves files only from this folder and makes no upstream requests. The standalone viewer uses local assets, with a content policy that restricts asset loading to the current host. Original account, payment, upload, publishing, and other unrelated pages/services are not part of this viewer. Original private source and backend code are unavailable from the public site.

## Verification

The letter, lantern scene, first wish reveal, and voice-note playback were checked in Chrome. The generated configuration and HTML are checked after each rebuild.
