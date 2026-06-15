#!/bin/bash
set -u
cd "$(dirname "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then exec python3 tools/local_server.py; fi
if command -v python >/dev/null 2>&1 && python - <<'PY' >/dev/null 2>&1
import sys
raise SystemExit(0 if sys.version_info.major >= 3 else 1)
PY
then exec python tools/local_server.py; fi
MESSAGE="Das UnterrichtsDashboard benötigt Python 3, um den stabilen lokalen Server zu starten."
if command -v osascript >/dev/null 2>&1; then osascript -e "display dialog \"$MESSAGE\" buttons {\"OK\"} default button \"OK\" with icon stop"; else echo "$MESSAGE"; fi
exit 1
