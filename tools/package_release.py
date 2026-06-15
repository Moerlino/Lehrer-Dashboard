#!/usr/bin/env python3
from pathlib import Path
import subprocess, zipfile, sys

ROOT=Path(__file__).resolve().parents[1]
subprocess.run([sys.executable, str(ROOT/'tools/quick_check.py')], check=True)
out=ROOT.parent/(ROOT.name+'.zip')
if out.exists(): out.unlink()
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for p in sorted(ROOT.rglob('*')):
        if p.is_file() and '__pycache__' not in p.parts:
            z.write(p, Path(ROOT.name)/p.relative_to(ROOT))
print(out)
