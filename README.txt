UnterrichtsDashboard v1.8.1

PRODUKTIVVERSION MIT IMPORTIERBARER UNTERRICHTSBIBLIOTHEK

SCHNELLSTART
macOS: „Dashboard starten.command“ doppelklicken.
Windows: „start-dashboard.bat“ doppelklicken.
Das Dashboard öffnet sich unter http://localhost:4173. Das Terminalfenster während der Nutzung geöffnet lassen.

ERSTER START
Beim ersten Start werden die beiden bisherigen Bestandseinheiten automatisch in die lokale Unterrichtsbibliothek übernommen:
- Zweijährige Berufsfachschule → Deutsch → 1. Jahr → Literarische Texte verstehen
- Berufsschule → Deutsch → 3. Lehrjahr → 04 Sprachlicher Feinschliff
Die statischen Ausgangsfassungen bleiben als geschütztes Rückfallarchiv erhalten, erscheinen aber nicht doppelt in der normalen Navigation.

NEUE EINHEIT IMPORTIEREN
1. Im Hauptmenü „Einheiten verwalten“ öffnen.
2. „Einheit importieren“ wählen.
3. Eine gültige .unterricht.zip-Datei auswählen.
4. Prüfbericht und Navigationsvorschau kontrollieren.
5. Import bestätigen.
Die Einheit erscheint danach automatisch unter Schulform → Fach → Lernjahr.

SICHERUNG
- „Bibliothek sichern“ exportiert alle importierten Einheiten, Materialien, Originalhandbücher, Wiederherstellungspunkte und Einstellungen.
- „Bibliothek wiederherstellen“ kann einen Sicherungsstand vollständig übernehmen oder mit der bestehenden Bibliothek zusammenführen.
- Vor Aktualisieren, Entfernen oder Leeren werden automatisch Wiederherstellungspunkte erzeugt.
- Nach größeren Änderungen sollte eine Sicherungsdatei außerhalb des App-Ordners aufbewahrt werden.

APP-UPDATES
Der lokale Starter verwendet immer http://localhost:4173. Dadurch bleibt die Browserdatenbank auch bei einem neuen App-Ordner unter derselben Adresse erreichbar. Vor einem Update dennoch eine Bibliothekssicherung erstellen.

DRUCKEN
Arbeitsblatt und Musterlösung werden über einen unsichtbaren Druckrahmen an den Browser-Druckdialog übergeben. Pro Klick wird genau ein Druckauftrag ausgelöst.

GESCHÜTZTE ORIGINALDATEIEN
Lehrerhandbücher und die Originaldateien der Sprachinseln bleiben unverändert und werden über SHA-256-Prüfsummen kontrolliert. Das Rückfallarchiv darf nur nach ausdrücklicher Freigabe verändert werden.

TASTATUR
- F: Vollbildmodus ein- oder ausschalten.
- Sprachinseln-Karten: Leertaste dreht die Karte; Pfeiltasten wechseln die Karte.
- In Eingabefeldern bleiben die Tasten für Texteingaben verfügbar.

TECHNISCHE HINWEISE
- Die Bibliothek wird lokal in IndexedDB gespeichert.
- Für Import, PWA, Service Worker und einen stabilen Speicherursprung den lokalen Starter verwenden.
- Es werden keine Unterrichtsdaten ins Internet übertragen.

Version 1.3.1 – wichtiger Starterhinweis
Der Starter prüft, welche Dashboard-Version bereits auf Port 4173 läuft. Ein veralteter eigener Dashboard-Server wird beendet und durch die aktuelle Version ersetzt. Dadurch wird nicht mehr versehentlich eine alte Beta-Oberfläche geöffnet.


PRÄSENTATIONEN
- Jede importierte Unterrichtsstunde besitzt ein eigenes Feld „Präsentation“.
- Eigenständige HTML-Präsentationen können direkt in der Stunde oder zentral unter „Einheiten verwalten“ importiert werden.
- Bei Metadaten ud-unit-id und ud-lesson-id erfolgt die Zuordnung automatisch; sonst wird die Zielstunde ausgewählt.
- Der Präsentationsmodus blendet das Dashboard vollständig aus und bietet einen eigenen Vollbildschalter.
- Präsentationen werden getrennt gespeichert und in Bibliothekssicherungen aufgenommen.


NEU IN 1.5.0
- Unterrichtsmodus pro importierter Stunde
- Phasen-Timer aus dem Verlaufsplan
- Phasenwechsel und Zeitverlängerung
- Schnellzugriffe auf Präsentation, Materialien, Hilfen und Verlaufsplan
- aufklappbarer Notausstieg mit Minimalfahrplan
- optionaler Vollbildmodus

NOTENBUCH
Über den neuen Hauptbereich „Notenbuch“ können Klassen und Dezimalnoten lokal verwaltet werden. Details stehen in NOTENBUCH_v1.0.txt.
