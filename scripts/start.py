"""Supervise both processes. Child failure stops the service so Render can restart it."""
import os
from pathlib import Path
import signal
import subprocess
import sys
import time
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
children = []
stopping = False

def stop(_signal=None, _frame=None):
    global stopping
    stopping = True
    for child in children:
        if child.poll() is None:
            child.terminate()

def main():
    if len(os.environ.get("WHC_API_KEY", "")) < 32:
        raise SystemExit("Set WHC_API_KEY to a random token of at least 32 characters.")
    os.environ["AI_SERVICE_URL"] = "http://127.0.0.1:8000"
    os.environ.setdefault("WHC_DEMO_MODE", "true")
    for sig in (signal.SIGTERM, signal.SIGINT):
        signal.signal(sig, stop)
    children.append(subprocess.Popen([
        sys.executable, "-m", "uvicorn", "app.main:create_app", "--factory",
        "--host", "127.0.0.1", "--port", "8000", "--no-access-log",
    ], cwd=ROOT / "ai"))
    # Wait for model initialization before exposing the public server.
    deadline = time.monotonic() + 60
    ready = False
    while not stopping and time.monotonic() < deadline:
        if children[0].poll() is not None:
            break
        try:
            with urllib.request.urlopen("http://127.0.0.1:8000/health", timeout=1) as response:
                ready = response.status == 200
            if ready:
                break
        except (OSError, TimeoutError):
            time.sleep(0.2)
    code = 0 if stopping else 1
    if ready and not stopping:
        children.append(subprocess.Popen(["node", "server/dist/index.js"], cwd=ROOT))
        while not stopping:
            if any(child.poll() is not None for child in children):
                print("A required process stopped; restarting the whole service is necessary.", flush=True)
                break
            time.sleep(0.2)
    code = 0 if stopping else 1
    stop()
    for child in children:
        try:
            child.wait(timeout=10)
        except subprocess.TimeoutExpired:
            child.kill()
            child.wait()
    return code

if __name__ == "__main__":
    raise SystemExit(main())
