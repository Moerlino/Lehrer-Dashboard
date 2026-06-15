#!/bin/bash
PIDS=$(lsof -ti tcp:4173 -sTCP:LISTEN 2>/dev/null || true)
if [ -z "$PIDS" ]; then echo "Kein Dashboard-Server läuft auf Port 4173."; exit 0; fi
for PID in $PIDS; do
  CMD=$(ps -p "$PID" -o command= 2>/dev/null || true)
  if [[ "$CMD" == *"local_server.py"* ]] || [[ "$CMD" == *"http.server"* ]]; then kill "$PID" 2>/dev/null || true; fi
done
echo "Dashboard-Server wurde beendet."
