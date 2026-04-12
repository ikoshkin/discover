# Discover — Installation Guide (ikoshkin fork)

This fork runs on port **7878** by default (instead of 5000) to avoid
conflicts with macOS AirPlay Receiver and other common services.

---

## Windows — Fresh Machine Setup

### 1. Python
Download and install **Python 3.9.x** (64-bit) from https://python.org  
⚠️ Check **"Add Python 3.9 to PATH"** during install.  
⚠️ Click **"Disable path length limit"** on the final screen.

### 2. Discover Server
Download the original Colidescope zip from https://colidescope.github.io/discover/download  
Extract to a **local non-synced folder** — e.g. `C:\Discover`  
⚠️ Do NOT use OneDrive, Dropbox, or any network folder.

Replace these files with versions from this repo (`ikoshkin/discover`):
- `server.py`
- `discover.bat`

Replace these two files with the patched versions (stored in Dropbox alongside original zip):
- `static\main-es2015.js`
- `static\main-es5.js`

### 3. Python Environment
Open Command Prompt and run:
```
cd C:\Discover
py -3.9 -m venv env
.\env\Scripts\activate.bat
pip install greenlet==3.1.1
pip install -r requirements.txt
```

### 4. Grasshopper Plugin
Copy `Discover.gha` from `ikoshkin/discover-gh-r8` to your Grasshopper Components Folder:
```
%AppData%\Roaming\Grasshopper\Libraries
```
If Discover tab doesn't appear after restarting Rhino:  
Right-click `Discover.gha` → Properties → click **Unblock** → restart Rhino.

### 5. Launch
Double-click `discover.bat` — server starts, browser opens to `http://localhost:7878`

### 6. Connect from Grasshopper
1. Open your `.gh` file
2. Press the **Connect button** on the Discover component
3. Wait for full handshake in server log (`/connect` + `/register-input` lines)
4. Press **RUN** in browser

---

## macOS — Fresh Machine Setup

### 1. Python
Install Python 3.9.x via https://python.org (pkg installer)  
Or via Homebrew: `brew install python@3.9`

### 2. Discover Server
Same as Windows steps 2-3, but use `start-discover.sh` instead of `discover.bat`.  
Create `start-discover.sh` in the Discover folder:
```bash
#!/bin/bash
SERVER_PORT=7878
source ./env/bin/activate
open "http://localhost:$SERVER_PORT/"
python server.py
```
Make it executable: `chmod +x start-discover.sh`

### 3. Grasshopper Plugin
Copy `Discover.gha` to:
```
~/Library/Application Support/McNeel/Rhinoceros/7.0/Plug-ins/Grasshopper/Libraries/
```

### 4. Launch
```
cd /path/to/Discover
./start-discover.sh
```

---

## Changing the Port

If 7878 is also unavailable, change it in **three places**:

| File | What to change |
|------|----------------|
| `server.py` line ~20 | `SERVER_PORT = 7878` → new port |
| `discover.bat` | `SET SERVER_PORT=7878` → new port |
| `static\main-es2015.js` | find/replace `localhost:7878` → `localhost:NEW` |
| `static\main-es5.js` | find/replace `localhost:7878` → `localhost:NEW` |
| `Helpers.cs` in `ikoshkin/discover-gh-r8` | `SERVER_BASE = "http://127.0.0.1:7878"` → new port, then rebuild `.gha` |

On macOS also update `start-discover.sh`.

---

## Repos

| Repo | Contents |
|------|----------|
| [`ikoshkin/discover-gh-r8`](https://github.com/ikoshkin/discover-gh-r8) | Grasshopper plugin — Rhino 8 compatible `.gha` |
| [`ikoshkin/discover`](https://github.com/ikoshkin/discover) | Python Flask server + web UI |

## Credits
Original Discover by [Colidescope](https://colidescope.com).  
Rhino 8 port and fork maintained by [Ihor Koshkin](https://github.com/ikoshkin), ENGIE No