#!/usr/bin/env python3
"""Update the immutable-file registry after an explicit user-authorized replacement."""
from pathlib import Path
import argparse
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT/'content/protected-files.json'

parser = argparse.ArgumentParser()
parser.add_argument('relative_path', help='Pfad relativ zum App-Hauptordner')
parser.add_argument('--explicit-user-approval', action='store_true',
                    help='Pflichtschalter: bestätigt eine ausdrückliche Nutzerfreigabe')
args = parser.parse_args()

if not args.explicit_user_approval:
    sys.exit('Abbruch: --explicit-user-approval fehlt. Geschützte Dateien dürfen nicht stillschweigend neu registriert werden.')

path = (ROOT/args.relative_path).resolve()
try:
    rel = path.relative_to(ROOT).as_posix()
except ValueError:
    sys.exit('Abbruch: Datei liegt außerhalb der App.')
if not path.is_file():
    sys.exit(f'Abbruch: Datei fehlt: {rel}')

registry = json.loads(REGISTRY.read_text(encoding='utf-8'))
registry.setdefault('files', {})[rel] = hashlib.sha256(path.read_bytes()).hexdigest()
REGISTRY.write_text(json.dumps(registry, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(f'Geschützte Datei nach ausdrücklicher Freigabe registriert: {rel}')
