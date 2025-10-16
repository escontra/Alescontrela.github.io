# Viser Visualization Setup

This directory contains the Viser client build and recordings for interactive 3D visualizations.

## Directory Structure

```
assets/viser/
├── index.html              # Main Viser client entry point
├── assets/                 # Viser client assets (JS, CSS)
├── recordings/             # .viser recording files
│   └── recording.viser     # Example recording
└── README.md              # This file
```

## Adding New Recordings

To add new recordings to the carousel:

1. **Generate a recording** using the Python viser library:
   ```python
   import viser

   server = viser.ViserServer()
   server.start_recording("path/to/recording.viser")
   # ... add your scene nodes ...
   server.stop_recording()
   ```

2. **Copy the recording** to the recordings directory:
   ```bash
   cp path/to/your_recording.viser Alescontrela.github.io/assets/viser/recordings/
   ```

3. **Update the carousel** in `_projects/gauss_gym.md`:

   Add a new carousel item in the HTML:
   ```html
   <div class="viser-carousel-item" data-index="1">
     <iframe src="/assets/viser/index.html?fileUrl=/assets/viser/recordings/your_recording.viser"></iframe>
     <div class="click-overlay" id="clickOverlay1">
       Click and drag to interact!
     </div>
   </div>
   ```

   Add a new thumbnail:
   ```html
   <div class="viser-thumbnail" data-index="1" onclick="viserGoTo(1)">
     Your Recording Name
   </div>
   ```

## Building the Viser Client

If you need to rebuild the viser client (after making changes to the viser source):

```bash
cd /path/to/viser/src/viser/client
npm run build
cp -r build/* /path/to/Alescontrela.github.io/assets/viser/
```

## Viewing Locally

To test the visualization locally:

1. Start a local Jekyll server:
   ```bash
   cd Alescontrela.github.io
   bundle exec jekyll serve
   ```

2. Navigate to `http://localhost:4000/gauss_gym` in your browser

## Notes

- Recording files can be large (10-30MB). Consider using Git LFS for version control.
- The viser client uses relative paths, so it works both locally and on GitHub Pages.
- Interactive features (camera controls, toggles) are preserved in the embedded viewer.
