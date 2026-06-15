#!/usr/bin/env python3
"""Lokaler Server mit Versionsprüfung für das UnterrichtsDashboard."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json, os, signal, socket, subprocess, sys, threading, time, urllib.request, webbrowser

HOST="127.0.0.1"
PORT=4173
VERSION="1.5.1"
ROOT=Path(__file__).resolve().parents[1]
URL=f"http://localhost:{PORT}/index.html?app={VERSION}#/home"

class Handler(SimpleHTTPRequestHandler):
    extensions_map={**SimpleHTTPRequestHandler.extensions_map,'.webmanifest':'application/manifest+json','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml'}
    def end_headers(self):
        path=self.path.split('?',1)[0]
        if path in ('/','/index.html','/app-version.json','/sw.js') or path.endswith(('.js','.css','.webmanifest')):
            self.send_header('Cache-Control','no-cache, no-store, must-revalidate')
            self.send_header('Pragma','no-cache')
            self.send_header('Expires','0')
        self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('Referrer-Policy','no-referrer')
        super().end_headers()
    def log_message(self, fmt, *args): print('[Dashboard]', fmt % args)

def running_version():
    try:
        with urllib.request.urlopen(f'http://{HOST}:{PORT}/app-version.json?t={time.time()}',timeout=1) as r:
            return str(json.loads(r.read().decode('utf-8')).get('version',''))
    except Exception:
        return ''

def listening_pids():
    try:
        out=subprocess.check_output(['lsof','-ti',f'tcp:{PORT}','-sTCP:LISTEN'],text=True,stderr=subprocess.DEVNULL)
        return [int(x) for x in out.split() if x.isdigit()]
    except Exception:
        return []

def safe_dashboard_process(pid):
    try:
        cmd=subprocess.check_output(['ps','-p',str(pid),'-o','command='],text=True,stderr=subprocess.DEVNULL).strip().lower()
    except Exception:
        return False
    return ('local_server.py' in cmd or ('http.server' in cmd and str(PORT) in cmd) or ('ruby' in cmd and 'httpd' in cmd and str(PORT) in cmd) or ('php' in cmd and '-s' in cmd and str(PORT) in cmd))

def stop_old_dashboard():
    pids=listening_pids()
    if not pids or not all(safe_dashboard_process(pid) for pid in pids): return False
    for pid in pids:
        try: os.kill(pid,signal.SIGTERM)
        except ProcessLookupError: pass
    for _ in range(30):
        if port_is_free(): return True
        time.sleep(.1)
    return False

def port_is_free():
    with socket.socket(socket.AF_INET,socket.SOCK_STREAM) as sock:
        sock.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
        try: sock.bind((HOST,PORT)); return True
        except OSError: return False

def main():
    os.chdir(ROOT)
    if not port_is_free():
        current=running_version()
        if current==VERSION:
            webbrowser.open(URL); return 0
        print(f'Eine ältere Dashboard-Version ({current or "unbekannt"}) läuft auf Port {PORT}.')
        if not stop_old_dashboard():
            print('Der belegende Prozess konnte nicht sicher als Dashboard-Server erkannt und beendet werden.')
            print('Schließe das frühere Dashboard-Terminal und starte diese Datei erneut.')
            return 2
        print('Der ältere Dashboard-Server wurde beendet.')
    server=ThreadingHTTPServer((HOST,PORT),Handler)
    print(f'UnterrichtsDashboard {VERSION} läuft lokal unter {URL}')
    print('Die App ist nur auf diesem Computer erreichbar. Zum Beenden Strg+C drücken.')
    threading.Timer(.7,lambda:webbrowser.open(URL)).start()
    try: server.serve_forever()
    except KeyboardInterrupt: print('\nDashboard wird beendet …')
    finally: server.server_close()
    return 0

if __name__=='__main__': raise SystemExit(main())
