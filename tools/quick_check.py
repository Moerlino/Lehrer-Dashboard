#!/usr/bin/env python3
from pathlib import Path
import hashlib
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
required = [
    ROOT/'materials/modernes-maerchen/arbeitsblatt.html',
    ROOT/'materials/modernes-maerchen/musterloesung.html',
    ROOT/'materials/modernes-maerchen/sicherung.html',
    ROOT/'index.html', ROOT/'assets/css/app.css', ROOT/'assets/js/app.js', ROOT/'assets/js/dynamic-library.js',
    ROOT/'content/catalog.js', ROOT/'content/protected-files.json',
    ROOT/'manifest.webmanifest', ROOT/'app-version.json', ROOT/'sw.js', ROOT/'tools/local_server.py', ROOT/'SCHRITT_5_SICHERUNG_UND_STARTER.txt', ROOT/'SCHRITT_6_BESTANDSMIGRATION.txt', ROOT/'SCHRITT_7_ABNAHME_UND_UMSCHALTUNG.txt', ROOT/'VALIDIERUNGSBERICHT_SCHRITT_7.txt', ROOT/'SCHRITT_8_PRODUKTFREIGABE.txt', ROOT/'VALIDIERUNGSBERICHT_SCHRITT_8.txt',
    ROOT/'import/04_Sprachlicher_Feinschliff.unterricht.zip', ROOT/'import/Literarische_Texte_verstehen.unterricht.zip',
    ROOT/'apps/sprachinseln/index.html', ROOT/'apps/sprachinseln/launcher.html', ROOT/'apps/sprachinseln/assets/css/style.css',
    ROOT/'apps/sprachinseln/assets/css/print.css', ROOT/'apps/sprachinseln/assets/js/data.js',
    ROOT/'apps/sprachinseln/assets/js/app.js', ROOT/'apps/sprachinseln/assets/js/launcher-app.js'
]
errors=[]
for path in required:
    if not path.is_file():
        errors.append(f'Fehlt: {path.relative_to(ROOT)}')

if (ROOT/'index.html').is_file():
    html=(ROOT/'index.html').read_text(encoding='utf-8')
    for src in re.findall(r'<script[^>]+src="([^"]+)"', html):
        clean=src.split('?',1)[0].split('#',1)[0]
        if not (ROOT/clean).is_file():
            errors.append(f'Script-Verweis fehlt: {src}')
    for href in re.findall(r'<link[^>]+href="([^"]+)"', html):
        clean=href.split('?',1)[0].split('#',1)[0]
        if not href.startswith(('http:','https:')) and not (ROOT/clean).is_file():
            errors.append(f'Link-Verweis fehlt: {href}')


# Embedded Sprachinseln app: verify local references without changing the source files.
for sprach_index in [ROOT/'apps/sprachinseln/index.html', ROOT/'apps/sprachinseln/launcher.html']:
    if sprach_index.is_file():
        html = sprach_index.read_text(encoding='utf-8')
        base = sprach_index.parent
        for src in re.findall(r'<script[^>]+src="([^"]+)"', html):
            if not src.startswith(('http:','https:')) and not (base/src).is_file():
                errors.append(f'Sprachinseln-Script fehlt in {sprach_index.name}: {src}')
        for href in re.findall(r'<link[^>]+href="([^"]+)"', html):
            if not href.startswith(('http:','https:')) and not (base/href).is_file():
                errors.append(f'Sprachinseln-Link fehlt in {sprach_index.name}: {href}')

# Immutable release assets: a package build fails if a protected file changed.
registry_path = ROOT/'content/protected-files.json'
if registry_path.is_file():
    try:
        registry = json.loads(registry_path.read_text(encoding='utf-8'))
        protected = registry.get('files', {})
        if not isinstance(protected, dict):
            raise ValueError('"files" muss ein Objekt sein.')
        for rel, expected in protected.items():
            path = ROOT/rel
            if not path.is_file():
                errors.append(f'Geschützte Datei fehlt: {rel}')
                continue
            actual = hashlib.sha256(path.read_bytes()).hexdigest()
            if actual != expected:
                errors.append(
                    f'Geschützte Datei wurde verändert: {rel}\n'
                    f'  erwartet: {expected}\n  gefunden: {actual}\n'
                    '  Änderung nur nach ausdrücklicher Nutzerfreigabe zulässig.'
                )
    except (json.JSONDecodeError, ValueError) as exc:
        errors.append(f'Fehler in content/protected-files.json: {exc}')

try:
    js_files = [
        ROOT/'assets/js/app.js', ROOT/'assets/js/dynamic-library.js',
        ROOT/'content/catalog.js',
        ROOT/'apps/sprachinseln/assets/js/data.js',
        ROOT/'apps/sprachinseln/assets/js/app.js',
        ROOT/'apps/sprachinseln/assets/js/launcher-app.js'
    ] + sorted((ROOT/'content/lessons').glob('*/*.js'))
    for js in js_files:
        subprocess.run(['node','--check',str(js)],check=True,capture_output=True,text=True)
except FileNotFoundError:
    print('Hinweis: Node nicht installiert; JS-Syntaxprüfung übersprungen.')
except subprocess.CalledProcessError as exc:
    errors.append('JavaScript-Syntaxfehler: '+(exc.stderr.strip() or exc.stdout.strip()))

if errors:
    print('\n'.join('FEHLER: '+e for e in errors))
    sys.exit(1)
print('Schnellprüfung erfolgreich: Kernstruktur, JavaScript und geschützte Originaldateien sind gültig.')
