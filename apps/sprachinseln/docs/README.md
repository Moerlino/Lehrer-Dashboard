# Dashboard Sprachinseln

Modulare lokale Webapp für Sprachförderung/DaZ/DaF im beruflichen Kontext.

## Start

Nach dem Entpacken `index.html` im Browser öffnen. Die App funktioniert lokal ohne Server.

## Struktur

```text
dashboard_sprachinseln_webapp/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── print.css
│   └── js/
│       ├── data.js
│       └── app.js
└── docs/
    └── README.md
```

## Navigation

Die Seitenleiste ist in aufklappbare Dropdown-Bereiche gegliedert:

- Themenbereiche
- Unterricht
- Material

Die Bereiche können ein- und ausgeklappt werden. Die aktiven Themen und Ansichten bleiben sichtbar hervorgehoben.

## Steuerung

- `F`: App im Vollbild
- `D`: aktuelles Arbeitsblatt bzw. Musterlösung drucken
- `Leertaste`: Karteikarte aufdecken/verdecken
- `← / →`: Karte wechseln

## Inhalte erweitern

Neue Sprachinseln werden zentral in `assets/js/data.js` ergänzt. Aus denselben Inhaltsdaten erzeugt die App Unterrichtsansichten, Karteikarten, Arbeitsblatt und Musterlösung.

## Update
- Die Seitenleiste kann über den Button links oben ein- und ausgeklappt werden.
- Das interaktive Tafelbild nutzt nun eine systematische Verbenübersicht statt eines allgemeinen Wortschatzfeldes.
