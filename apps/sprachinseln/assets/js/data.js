window.SPRACHINSELN = {
  "themes": {
    "behoerdengang": {
      "label": "Behördengang",
      "icon": "B",
      "tag": "Institution",
      "goal": "Ich kann mich anmelden, mein Anliegen nennen und höflich nachfragen.",
      "situation": "Du bist bei einer Behörde. Du hast einen Termin und brauchst Hilfe mit einem Formular.",
      "board": {
        "impulse": "Du bist bei einer Behörde. Du hast einen Termin. Du möchtest sagen, warum du da bist, und höflich nachfragen.",
        "words": [
          "der Termin",
          "das Formular",
          "die Unterlagen",
          "das Dokument",
          "die Unterschrift",
          "das Büro",
          "erklären",
          "wiederholen"
        ],
        "chunks": [
          "Ich habe einen Termin.",
          "Ich brauche Hilfe bei diesem Formular.",
          "Ich verstehe das nicht ganz.",
          "Können Sie mir das bitte erklären?",
          "Können Sie das bitte wiederholen?",
          "Wo muss ich unterschreiben?"
        ],
        "reflection": "Welche Formulierung klingt bei einer Behörde höflich und klar?"
      },
      "sentences": [
        {
          "verb": "haben",
          "de": "Ich habe einen Termin.",
          "native": ""
        },
        {
          "verb": "suchen",
          "de": "Ich suche das richtige Büro.",
          "native": ""
        },
        {
          "verb": "brauchen",
          "de": "Ich brauche Hilfe bei diesem Formular.",
          "native": ""
        },
        {
          "verb": "verstehen",
          "de": "Ich verstehe das nicht ganz.",
          "native": ""
        },
        {
          "verb": "erklären",
          "de": "Können Sie mir das bitte erklären?",
          "native": ""
        },
        {
          "verb": "wiederholen",
          "de": "Können Sie das bitte wiederholen?",
          "native": ""
        },
        {
          "verb": "unterschreiben",
          "de": "Wo muss ich unterschreiben?",
          "native": ""
        },
        {
          "verb": "fehlen",
          "de": "Mir fehlt noch ein Dokument.",
          "native": ""
        }
      ],
      "boxes": [
        {
          "title": "Ich bin hier wegen …",
          "items": [
            "meines Termins",
            "meiner Unterlagen",
            "meines Antrags",
            "meiner Anmeldung",
            "meines Formulars"
          ]
        },
        {
          "title": "Ich brauche …",
          "items": [
            "Hilfe",
            "einen Termin",
            "ein Formular",
            "eine Unterschrift",
            "eine Kopie",
            "eine Bescheinigung"
          ]
        },
        {
          "title": "Können Sie bitte …?",
          "items": [
            "das wiederholen",
            "langsamer sprechen",
            "mir helfen",
            "mir das erklären",
            "mir das zeigen",
            "das aufschreiben"
          ]
        }
      ],
      "builder": [
        {
          "pattern": "Ich brauche …",
          "middle": [
            "Hilfe bei diesem Formular",
            "einen Termin",
            "eine Kopie",
            "eine Bescheinigung"
          ],
          "end": [
            "."
          ]
        },
        {
          "pattern": "Ich habe …",
          "middle": [
            "einen Termin",
            "eine Frage",
            "meine Unterlagen dabei"
          ],
          "end": [
            "."
          ]
        },
        {
          "pattern": "Ich suche …",
          "middle": [
            "das richtige Büro",
            "den Eingang",
            "die Anmeldung"
          ],
          "end": [
            "."
          ]
        },
        {
          "pattern": "Können Sie mir bitte …?",
          "middle": [
            "helfen",
            "das erklären",
            "das zeigen",
            "ein Beispiel geben"
          ],
          "end": [
            "?"
          ]
        },
        {
          "pattern": "Können Sie bitte …?",
          "middle": [
            "das wiederholen",
            "langsamer sprechen",
            "das aufschreiben"
          ],
          "end": [
            "?"
          ]
        }
      ],
      "dialog": [
        {
          "role": "Person A",
          "step": "Begrüßen",
          "text": "Guten Tag, ich habe einen Termin."
        },
        {
          "role": "Person B",
          "step": "Nachfragen",
          "text": "Guten Tag. Wie heißen Sie bitte?"
        },
        {
          "role": "Person A",
          "step": "Anliegen nennen",
          "text": "Mein Name ist … Ich brauche Hilfe bei diesem Formular."
        },
        {
          "role": "Person B",
          "step": "Erklären",
          "text": "Zeigen Sie mir bitte das Formular."
        },
        {
          "role": "Person A",
          "step": "Genau fragen",
          "text": "Können Sie mir bitte zeigen, wo ich unterschreiben muss?"
        },
        {
          "role": "Person B",
          "step": "Abschließen",
          "text": "Ja. Sie müssen hier unterschreiben."
        }
      ],
      "register": [
        {
          "phrase": "Können Sie mir das bitte erklären?",
          "judgement": "passt gut",
          "reason": "höflich, klar und angemessen für eine Behörde"
        },
        {
          "phrase": "Erklären Sie!",
          "judgement": "zu direkt",
          "reason": "klingt wie ein Befehl"
        },
        {
          "phrase": "Ich verstehe das nicht ganz.",
          "judgement": "passt",
          "reason": "ehrlich und nicht unhöflich"
        },
        {
          "phrase": "Ich checke das nicht.",
          "judgement": "zu umgangssprachlich",
          "reason": "für die Behörde eher unpassend"
        }
      ],
      "recall": [
        {
          "front": "Du bist bei einer Behörde. Du hast einen Termin und brauchst Hilfe mit einem Formular. Was sagst du?",
          "back": [
            "Guten Tag, ich habe einen Termin.",
            "Ich bin wegen meiner Unterlagen hier.",
            "Ich brauche Hilfe bei diesem Formular.",
            "Ich verstehe das nicht ganz.",
            "Können Sie mir das bitte erklären?",
            "Können Sie das bitte wiederholen?",
            "Wo muss ich unterschreiben?",
            "Mir fehlt noch ein Dokument."
          ]
        },
        {
          "front": "Du verstehst ein Formular nicht. Bitte höflich um Hilfe.",
          "back": [
            "Ich brauche Hilfe bei diesem Formular.",
            "Ich verstehe das nicht ganz.",
            "Können Sie mir das bitte erklären?",
            "Wo muss ich unterschreiben?"
          ]
        },
        {
          "front": "Die Person spricht zu schnell. Frage höflich nach.",
          "back": [
            "Können Sie das bitte wiederholen?",
            "Können Sie bitte langsamer sprechen?",
            "Ich verstehe das nicht ganz."
          ]
        },
        {
          "front": "Ein Dokument fehlt. Erkläre das Problem und frage, was du machen sollst.",
          "back": [
            "Mir fehlt noch ein Dokument.",
            "Was muss ich jetzt machen?",
            "Kann ich das Dokument später bringen?"
          ]
        },
        {
          "front": "Du suchst das richtige Büro. Frage höflich nach.",
          "back": [
            "Ich suche das richtige Büro.",
            "Können Sie mir bitte helfen?",
            "Wo muss ich hingehen?"
          ]
        }
      ],
      "worksheet": {
        "title": "Meine Sprachinsel: Behördengang",
        "situation": "Du bist bei einer Behörde. Du hast einen Termin. Du möchtest sagen, warum du da bist, und höflich nachfragen.",
        "goal": "Ich kann mich anmelden, mein Anliegen nennen und nachfragen, wenn ich etwas nicht verstehe.",
        "recallSituations": [
          "Du kommst zur Behörde und hast einen Termin.",
          "Du weißt nicht, wo du hinmusst.",
          "Du brauchst Hilfe mit einem Formular.",
          "Die Person spricht zu schnell.",
          "Du verstehst etwas nicht.",
          "Du hast nicht alle Dokumente dabei."
        ],
        "roleA": "Du bist bei einer Behörde. Du hast einen Termin. Du brauchst Hilfe mit einem Formular.",
        "roleB": "Du arbeitest bei der Behörde. Frage nach dem Namen und erkläre, was Person A machen soll.",
        "solutionRecall": [
          "Ich habe einen Termin.",
          "Ich suche das richtige Büro.",
          "Ich brauche Hilfe bei diesem Formular.",
          "Können Sie bitte langsamer sprechen?",
          "Ich verstehe das nicht ganz.",
          "Mir fehlt noch ein Dokument."
        ]
      },
      "speechSituation": {
        "context": "Eine Person kommt mit einem Termin zur Behörde und braucht Unterstützung bei einem Formular. Das Gespräch soll höflich, klar und ruhig geführt werden.",
        "partnerA": {
          "title": "Partner A – Besucher/in",
          "task": "Du hast einen Termin. Du brauchst Hilfe mit einem Formular und möchtest wissen, wo du unterschreiben musst.",
          "support": [
            "Nenne zuerst deinen Termin.",
            "Erkläre dann dein Problem mit dem Formular.",
            "Frage höflich nach, wenn du etwas nicht verstehst."
          ],
          "phrases": [
            "Guten Tag, ich habe einen Termin.",
            "Ich brauche Hilfe bei diesem Formular.",
            "Können Sie mir das bitte erklären?",
            "Wo muss ich unterschreiben?"
          ]
        },
        "partnerB": {
          "title": "Partner B – Mitarbeiter/in der Behörde",
          "task": "Du arbeitest bei der Behörde. Du führst das Gespräch: Begrüße die Person, frage nach dem Namen, bitte um das Formular und erkläre den nächsten Schritt.",
          "support": [
            "Frage nach dem Namen und dem Termin.",
            "Sprich langsam und in kurzen Sätzen.",
            "Sage genau, was Person A tun soll.",
            "Reagiere freundlich, wenn Person A nachfragt."
          ],
          "phrases": [
            "Guten Tag. Wie heißen Sie bitte?",
            "Haben Sie einen Termin?",
            "Zeigen Sie mir bitte das Formular.",
            "Sie müssen hier unterschreiben.",
            "Bringen Sie das Dokument bitte später mit."
          ]
        },
        "flow": [
          "Begrüßen",
          "Termin nennen",
          "Problem erklären",
          "Hilfe geben",
          "Nachfragen klären"
        ]
      }
    },
    "betrieb_maler": {
      "label": "Betrieb – Maler",
      "icon": "M",
      "tag": "Malerhandwerk",
      "goal": "Ich kann Arbeitsschritte an einer Fläche beschreiben, Fachbegriffe verwenden und bei Unsicherheit gezielt nachfragen.",
      "situation": "Du arbeitest als Maler auf einer Baustelle. Eine Wand oder Metallfläche soll vorbereitet und beschichtet werden.",
      "board": {
        "impulse": "Du bist im Malerbetrieb auf der Baustelle. Du sollst eine Fläche vorbereiten und beschichten. Du klärst Material, Reihenfolge und Arbeitsschutz.",
        "words": [
          "der Untergrund",
          "die Fläche",
          "die Grundierung",
          "die Spachtelmasse",
          "das Schleifpapier",
          "die Schutzbrille",
          "die Abdeckung",
          "der Farbauftrag",
          "abstrahlen",
          "grundieren"
        ],
        "chunks": [
          "Ich prüfe zuerst den Untergrund.",
          "Muss ich die Fläche abschleifen oder abstrahlen?",
          "Ich klebe die Kanten sauber ab.",
          "Danach trage ich die Grundierung gleichmäßig auf.",
          "Können Sie bitte kontrollieren, ob die Fläche trocken genug ist?",
          "Welche Schutzkleidung soll ich dabei tragen?"
        ],
        "reflection": "Wie formulierst du fachlich genau, was du gemacht hast und was du noch klären musst?"
      },
      "sentences": [
        {
          "verb": "prüfen",
          "de": "Ich prüfe zuerst, ob der Untergrund trocken und sauber ist.",
          "native": ""
        },
        {
          "verb": "abkleben",
          "de": "Ich klebe die Kanten und Steckdosen sorgfältig ab.",
          "native": ""
        },
        {
          "verb": "abschleifen",
          "de": "Muss ich die Fläche vor dem Grundieren abschleifen?",
          "native": ""
        },
        {
          "verb": "abstrahlen",
          "de": "Soll die Metallfläche vor dem Beschichten abgestrahlt werden?",
          "native": ""
        },
        {
          "verb": "spachteln",
          "de": "Ich spachtle die Unebenheiten und lasse die Fläche trocknen.",
          "native": ""
        },
        {
          "verb": "grundieren",
          "de": "Danach grundiere ich die Fläche gleichmäßig.",
          "native": ""
        },
        {
          "verb": "auftragen",
          "de": "Ich trage die Farbe in zwei dünnen Schichten auf.",
          "native": ""
        },
        {
          "verb": "kontrollieren",
          "de": "Können Sie bitte kontrollieren, ob der Untergrund vorbereitet ist?",
          "native": ""
        }
      ],
      "boxes": [
        {
          "title": "Ich bereite … vor",
          "items": [
            "den Untergrund",
            "die Wandfläche",
            "die Metallfläche",
            "die Kanten",
            "den Arbeitsplatz"
          ]
        },
        {
          "title": "Ich muss …",
          "items": [
            "abkleben",
            "abschleifen",
            "abstrahlen",
            "spachteln",
            "grundieren",
            "die Farbe auftragen"
          ]
        },
        {
          "title": "Ich frage fachlich nach",
          "items": [
            "Ist der Untergrund trocken genug?",
            "Welche Körnung soll ich nehmen?",
            "Muss ich zuerst grundieren?",
            "Welche Schutzkleidung brauche ich?"
          ]
        }
      ],
      "builder": [
        {
          "pattern": "Ich prüfe zuerst …",
          "middle": [
            "den Untergrund",
            "die Fläche",
            "die Kanten",
            "das Material"
          ],
          "end": [
            "."
          ]
        },
        {
          "pattern": "Ich muss …",
          "middle": [
            "die Kanten abkleben",
            "die Fläche abschleifen",
            "die Unebenheiten spachteln",
            "die Fläche grundieren"
          ],
          "end": [
            "."
          ]
        },
        {
          "pattern": "Soll ich …?",
          "middle": [
            "die Metallfläche abstrahlen",
            "zuerst grundieren",
            "die Farbe in zwei Schichten auftragen",
            "die Fläche noch trocknen lassen"
          ],
          "end": [
            "?"
          ]
        },
        {
          "pattern": "Können Sie bitte kontrollieren, ob …?",
          "middle": [
            "der Untergrund trocken genug ist",
            "die Kanten sauber abgeklebt sind",
            "die Fläche richtig vorbereitet ist"
          ],
          "end": [
            "?"
          ]
        }
      ],
      "dialog": [
        {
          "role": "Azubi",
          "step": "Auftrag sichern",
          "text": "Ich soll die Fläche vorbereiten und danach grundieren."
        },
        {
          "role": "Geselle/Gesellin",
          "step": "Nachfragen",
          "text": "Was machst du zuerst?"
        },
        {
          "role": "Azubi",
          "step": "Arbeitsschritt erklären",
          "text": "Ich prüfe zuerst, ob der Untergrund trocken und sauber ist."
        },
        {
          "role": "Geselle/Gesellin",
          "step": "Problem nennen",
          "text": "An einer Stelle ist alter Lack auf Metall."
        },
        {
          "role": "Azubi",
          "step": "Fachlich nachfragen",
          "text": "Soll die Metallfläche vor dem Beschichten abgestrahlt werden?"
        },
        {
          "role": "Geselle/Gesellin",
          "step": "Sichern",
          "text": "Ja, und danach wird die Fläche gründlich gereinigt und grundiert."
        }
      ],
      "register": [
        {
          "phrase": "Muss ich die Fläche vor dem Grundieren abschleifen?",
          "judgement": "passt gut",
          "reason": "fachlich genau und als Frage klar formuliert"
        },
        {
          "phrase": "Die Wand ist irgendwie schlecht.",
          "judgement": "zu ungenau",
          "reason": "besser: Was ist genau das Problem am Untergrund?"
        },
        {
          "phrase": "Mach du mal, ich weiß nicht.",
          "judgement": "unprofessionell",
          "reason": "im Betrieb besser konkret nachfragen"
        },
        {
          "phrase": "Können Sie bitte kontrollieren, ob der Untergrund vorbereitet ist?",
          "judgement": "passt sehr gut",
          "reason": "zeigt Verantwortungsbewusstsein und Fachsprache"
        }
      ],
      "recall": [
        {
          "front": "Du sollst eine Wandfläche vorbereiten. Erkläre die ersten Arbeitsschritte fachlich.",
          "back": [
            "Ich prüfe zuerst den Untergrund.",
            "Ich klebe die Kanten sauber ab.",
            "Ich spachtle die Unebenheiten.",
            "Danach grundiere ich die Fläche."
          ]
        },
        {
          "front": "Du bist unsicher, ob eine Metallfläche vorbereitet ist. Frage fachlich nach.",
          "back": [
            "Soll die Metallfläche vor dem Beschichten abgestrahlt werden?",
            "Muss ich die Fläche vorher reinigen?",
            "Können Sie bitte kontrollieren, ob der Untergrund vorbereitet ist?"
          ]
        },
        {
          "front": "Du erklärst nach der Arbeit, was du gemacht hast.",
          "back": [
            "Ich habe die Kanten abgeklebt.",
            "Ich habe die Fläche abgeschliffen und gespachtelt.",
            "Danach habe ich die Fläche grundiert."
          ]
        }
      ],
      "worksheet": {
        "title": "Meine Sprachinsel: Betrieb – Maler",
        "situation": "Du arbeitest als Maler auf einer Baustelle. Eine Wand- oder Metallfläche soll vorbereitet und beschichtet werden. Du klärst die Arbeitsschritte, verwendest Fachbegriffe und fragst gezielt nach.",
        "goal": "Ich kann typische Arbeitsschritte im Malerbetrieb beschreiben und fachlich nachfragen, wenn ein Arbeitsschritt unklar ist.",
        "recallInstruction": "Arbeite mit einem Partner: Eine Person liest die Situation vor. Die andere antwortet ohne auf Teil 2 zu schauen. Sprecht zuerst mündlich. Schreibt danach einen passenden fachlichen Satz auf.",
        "recallSituations": [
          "Du beginnst mit der Arbeit und prüfst die Fläche.",
          "Du musst die Kanten und Steckdosen schützen.",
          "Du bist unsicher, ob die Fläche geschliffen werden muss.",
          "Eine Metallfläche soll vorbereitet werden.",
          "Du hast Unebenheiten entdeckt.",
          "Du möchtest, dass jemand deine Vorbereitung kontrolliert."
        ],
        "roleA": "Du bist Azubi im Malerbetrieb. Erkläre, wie du die Fläche vorbereitest. Frage nach, ob du schleifen, abstrahlen oder grundieren sollst.",
        "roleB": "Du bist Geselle/Gesellin. Höre zu, frage nach einem Arbeitsschritt und gib eine kurze fachliche Rückmeldung.",
        "solutionRecall": [
          "Ich prüfe zuerst, ob der Untergrund trocken und sauber ist.",
          "Ich klebe die Kanten und Steckdosen sorgfältig ab.",
          "Muss ich die Fläche vor dem Grundieren abschleifen?",
          "Soll die Metallfläche vor dem Beschichten abgestrahlt werden?",
          "Ich spachtle die Unebenheiten und lasse die Fläche trocknen.",
          "Können Sie bitte kontrollieren, ob der Untergrund vorbereitet ist?"
        ]
      },
      "speechSituation": {
        "context": "Eine Wand- oder Metallfläche soll im Betrieb vorbereitet werden. Partner A erklärt den Arbeitsstand und fragt gezielt nach dem nächsten Arbeitsschritt.",
        "partnerA": {
          "title": "Partner A – Azubi Maler/in",
          "task": "Du bereitest eine Fläche vor. Du bist unsicher, ob du abkleben, schleifen, abstrahlen, spachteln oder grundieren sollst.",
          "support": [
            "Beschreibe zuerst die Fläche.",
            "Nenne, was du schon gemacht hast.",
            "Frage nach dem nächsten Arbeitsschritt."
          ],
          "phrases": [
            "Ich prüfe zuerst die Wandfläche.",
            "Ich klebe die Kanten und Steckdosen ab.",
            "Muss ich die Metallfläche abstrahlen?",
            "Soll ich die Fläche zuerst grundieren?"
          ]
        },
        "partnerB": {
          "title": "Partner B – Geselle/Gesellin",
          "task": "Du leitest Person A an. Frage nach dem Zustand der Fläche, kontrolliere die Vorbereitung und gib eine klare Arbeitsanweisung.",
          "support": [
            "Frage, ob die Fläche sauber, trocken und tragfähig ist.",
            "Entscheide, ob geschliffen, abgestrahlt, gespachtelt oder grundiert werden muss.",
            "Begründe kurz deine Anweisung.",
            "Achte auf Arbeitsschutz und Material."
          ],
          "phrases": [
            "Wie sieht die Fläche aus?",
            "Ist die Fläche trocken und sauber?",
            "Schleife die Unebenheiten zuerst ab.",
            "Bei Rost musst du die Metallfläche abstrahlen.",
            "Danach trägst du die Grundierung auf."
          ]
        },
        "flow": [
          "Fläche beschreiben",
          "Vorbereitung klären",
          "Anweisung geben",
          "Rückfrage stellen",
          "Arbeitsschritt bestätigen"
        ]
      }
    },
    "betrieb_maurer": {
      "label": "Betrieb – Maurer",
      "icon": "Mau",
      "tag": "Bauhandwerk",
      "goal": "Ich kann Arbeitsschritte beim Mauern beschreiben, Fachbegriffe verwenden und Sicherheits- oder Materialfragen klären.",
      "situation": "Du arbeitest als Maurer auf einer Baustelle. Eine Mauer oder ein Fundament soll vorbereitet, ausgerichtet und hergestellt werden.",
      "board": {
        "impulse": "Du bist auf der Baustelle. Du sollst beim Mauern helfen, Material vorbereiten und die Ausführung kontrollieren. Du fragst fachlich nach, bevor Fehler entstehen.",
        "words": [
          "die Mauer",
          "der Mörtel",
          "der Ziegel",
          "die Wasserwaage",
          "die Schnur",
          "das Fundament",
          "die Schalung",
          "die Fuge",
          "anmischen",
          "ausrichten"
        ],
        "chunks": [
          "Ich mische den Mörtel im richtigen Verhältnis an.",
          "Ich richte die erste Steinreihe mit der Wasserwaage aus.",
          "Muss ich die Schnur neu spannen?",
          "Die Fugen müssen gleichmäßig gefüllt sein.",
          "Können Sie bitte kontrollieren, ob die Mauer gerade ist?",
          "Welche Steine soll ich für diese Wand verwenden?"
        ],
        "reflection": "Wie erklärst du einen Arbeitsschritt so genau, dass ein Kollege weiterarbeiten kann?"
      },
      "sentences": [
        {
          "verb": "anmischen",
          "de": "Ich mische den Mörtel im richtigen Verhältnis an.",
          "native": ""
        },
        {
          "verb": "mauern",
          "de": "Ich mauere die nächste Steinreihe entlang der gespannten Schnur.",
          "native": ""
        },
        {
          "verb": "ausrichten",
          "de": "Ich richte die Steine mit der Wasserwaage aus.",
          "native": ""
        },
        {
          "verb": "verfugen",
          "de": "Ich fülle die Fugen gleichmäßig mit Mörtel.",
          "native": ""
        },
        {
          "verb": "messen",
          "de": "Ich messe die Höhe und kontrolliere die Abstände.",
          "native": ""
        },
        {
          "verb": "einschalen",
          "de": "Muss ich den Bereich vor dem Betonieren einschalen?",
          "native": ""
        },
        {
          "verb": "betonieren",
          "de": "Danach betonieren wir das Fundament abschnittsweise.",
          "native": ""
        },
        {
          "verb": "kontrollieren",
          "de": "Können Sie bitte kontrollieren, ob die Mauer gerade ist?",
          "native": ""
        }
      ],
      "boxes": [
        {
          "title": "Ich bereite … vor",
          "items": [
            "den Mörtel",
            "die Steine",
            "die Schnur",
            "die Schalung",
            "den Arbeitsplatz"
          ]
        },
        {
          "title": "Ich arbeite mit …",
          "items": [
            "der Wasserwaage",
            "der Kelle",
            "der Schnur",
            "dem Mörtel",
            "den Ziegeln"
          ]
        },
        {
          "title": "Ich frage fachlich nach",
          "items": [
            "Ist die Mauer gerade?",
            "Welche Steine soll ich nehmen?",
            "Muss ich neu ausrichten?",
            "Wann betonieren wir den Abschnitt?"
          ]
        }
      ],
      "builder": [
        {
          "pattern": "Ich bereite zuerst … vor",
          "middle": [
            "den Mörtel",
            "die Steine",
            "die Schnur",
            "den Arbeitsplatz"
          ],
          "end": [
            "."
          ]
        },
        {
          "pattern": "Ich muss …",
          "middle": [
            "die Steine ausrichten",
            "die Fugen gleichmäßig füllen",
            "die Höhe messen",
            "die Schnur neu spannen"
          ],
          "end": [
            "."
          ]
        },
        {
          "pattern": "Soll ich …?",
          "middle": [
            "die erste Steinreihe neu ausrichten",
            "den Bereich einschalen",
            "den Mörtel noch einmal anmischen",
            "die Fugen nacharbeiten"
          ],
          "end": [
            "?"
          ]
        },
        {
          "pattern": "Können Sie bitte kontrollieren, ob …?",
          "middle": [
            "die Mauer gerade ist",
            "die Fugen gleichmäßig sind",
            "die Höhe stimmt",
            "die Schalung richtig sitzt"
          ],
          "end": [
            "?"
          ]
        }
      ],
      "dialog": [
        {
          "role": "Azubi",
          "step": "Auftrag sichern",
          "text": "Ich soll die nächste Steinreihe vorbereiten und mauern."
        },
        {
          "role": "Polier/Geselle",
          "step": "Nachfragen",
          "text": "Was kontrollierst du zuerst?"
        },
        {
          "role": "Azubi",
          "step": "Arbeitsschritt erklären",
          "text": "Ich kontrolliere zuerst die Schnur und richte die Steine mit der Wasserwaage aus."
        },
        {
          "role": "Polier/Geselle",
          "step": "Problem nennen",
          "text": "Die Fugen sind an einer Stelle zu breit."
        },
        {
          "role": "Azubi",
          "step": "Fachlich reagieren",
          "text": "Soll ich die Steinreihe an dieser Stelle neu ausrichten?"
        },
        {
          "role": "Polier/Geselle",
          "step": "Sichern",
          "text": "Ja, richte sie neu aus und kontrolliere danach noch einmal die Höhe."
        }
      ],
      "register": [
        {
          "phrase": "Können Sie bitte kontrollieren, ob die Mauer gerade ist?",
          "judgement": "passt gut",
          "reason": "fachlich, höflich und klar"
        },
        {
          "phrase": "Die Wand ist schief.",
          "judgement": "verständlich, aber ungenau",
          "reason": "besser: Welche Stelle und welches Maß ist betroffen?"
        },
        {
          "phrase": "Muss ich den Bereich vor dem Betonieren einschalen?",
          "judgement": "passt gut",
          "reason": "klärt einen wichtigen Arbeitsschritt"
        },
        {
          "phrase": "Das sieht falsch aus.",
          "judgement": "zu ungenau",
          "reason": "besser konkret sagen: Fugen, Höhe, Ausrichtung oder Material"
        }
      ],
      "recall": [
        {
          "front": "Du erklärst, wie du beim Mauern beginnst.",
          "back": [
            "Ich bereite zuerst den Mörtel vor.",
            "Ich spanne die Schnur.",
            "Ich richte die erste Steinreihe mit der Wasserwaage aus."
          ]
        },
        {
          "front": "Du bist unsicher, ob die Mauer gerade ist. Frage fachlich nach.",
          "back": [
            "Können Sie bitte kontrollieren, ob die Mauer gerade ist?",
            "Muss ich die Steinreihe neu ausrichten?",
            "Stimmt die Höhe an dieser Stelle?"
          ]
        },
        {
          "front": "Du sollst ein Fundament vorbereiten. Kläre den nächsten Schritt.",
          "back": [
            "Muss ich den Bereich vor dem Betonieren einschalen?",
            "Wann betonieren wir den Abschnitt?",
            "Welche Schalung soll ich verwenden?"
          ]
        }
      ],
      "worksheet": {
        "title": "Meine Sprachinsel: Betrieb – Maurer",
        "situation": "Du arbeitest als Maurer auf einer Baustelle. Eine Mauer oder ein Fundament soll vorbereitet und hergestellt werden. Du beschreibst Arbeitsschritte, verwendest Fachbegriffe und fragst nach, bevor Fehler entstehen.",
        "goal": "Ich kann typische Arbeitsschritte auf der Baustelle beschreiben und fachlich nachfragen, wenn Maße, Material oder Reihenfolge unklar sind.",
        "recallInstruction": "Arbeite mit einem Partner: Eine Person liest die Situation vor. Die andere antwortet ohne auf Teil 2 zu schauen. Sprecht zuerst mündlich. Schreibt danach einen passenden fachlichen Satz auf.",
        "recallSituations": [
          "Du bereitest den Mörtel vor.",
          "Du mauerst eine neue Steinreihe.",
          "Du kontrollierst, ob die Steine gerade liegen.",
          "Die Fugen sollen gleichmäßig sein.",
          "Du bist unsicher, ob vor dem Betonieren eine Schalung nötig ist.",
          "Du möchtest deine Arbeit kontrollieren lassen."
        ],
        "roleA": "Du bist Azubi auf der Baustelle. Erkläre, wie du die Mauer vorbereitest und mauerst. Frage nach, wenn Maße, Material oder Reihenfolge unklar sind.",
        "roleB": "Du bist Polier/Polierin oder Geselle/Gesellin. Höre zu, frage nach einem Arbeitsschritt und gib eine kurze fachliche Rückmeldung.",
        "solutionRecall": [
          "Ich mische den Mörtel im richtigen Verhältnis an.",
          "Ich mauere die nächste Steinreihe entlang der gespannten Schnur.",
          "Ich richte die Steine mit der Wasserwaage aus.",
          "Ich fülle die Fugen gleichmäßig mit Mörtel.",
          "Muss ich den Bereich vor dem Betonieren einschalen?",
          "Können Sie bitte kontrollieren, ob die Mauer gerade ist?"
        ]
      },
      "speechSituation": {
        "context": "Auf der Baustelle soll eine Mauer oder ein Fundament hergestellt werden. Partner A beschreibt den Arbeitsstand und fragt nach Material, Maß oder Reihenfolge.",
        "partnerA": {
          "title": "Partner A – Azubi Maurer/in",
          "task": "Du arbeitest an einer Mauer oder einem Fundament. Du bist unsicher bei Mörtel, Ausrichtung, Fugen oder Schalung.",
          "support": [
            "Nenne den aktuellen Arbeitsschritt.",
            "Frage nach Maß, Material oder Reihenfolge.",
            "Sichere ab, bevor du weiterarbeitest."
          ],
          "phrases": [
            "Ich mische den Mörtel an.",
            "Ich richte die Steine mit der Wasserwaage aus.",
            "Sind die Fugen gleichmäßig genug?",
            "Muss ich vor dem Betonieren einschalen?"
          ]
        },
        "partnerB": {
          "title": "Partner B – Polier/in oder Geselle/Gesellin",
          "task": "Du kontrollierst die Arbeit. Frage nach Maß, Material und Arbeitsschritt. Gib eine klare fachliche Rückmeldung.",
          "support": [
            "Frage nach dem Mischungsverhältnis.",
            "Kontrolliere, ob die Steine gerade liegen.",
            "Erkläre, was vor dem nächsten Schritt passieren muss.",
            "Gib eine kurze Begründung, damit Person A versteht, warum."
          ],
          "phrases": [
            "Welches Mischungsverhältnis hast du genommen?",
            "Kontrolliere die Steinreihe mit der Wasserwaage.",
            "Die Fugen müssen gleichmäßig sein.",
            "Vor dem Betonieren brauchst du eine stabile Schalung."
          ]
        },
        "flow": [
          "Arbeitsschritt nennen",
          "Maß oder Material klären",
          "Kontrollieren",
          "Anweisung geben",
          "Weiterarbeit bestätigen"
        ]
      }
    },
    "schule": {
      "label": "Schule",
      "icon": "S",
      "tag": "Unterricht",
      "goal": "Ich kann im Unterricht nachfragen und um Unterstützung bitten.",
      "situation": "Du bist im Unterricht. Du verstehst eine Aufgabe nicht und möchtest höflich nachfragen.",
      "board": {
        "impulse": "Du bist in der Schule. Die Aufgabe ist unklar. Du möchtest im Unterricht mitarbeiten.",
        "words": [
          "die Aufgabe",
          "der Text",
          "die Frage",
          "das Beispiel",
          "die Lösung",
          "noch einmal",
          "langsamer",
          "abgeben"
        ],
        "chunks": [
          "Ich habe die Aufgabe nicht verstanden.",
          "Können Sie die Aufgabe bitte noch einmal erklären?",
          "Können Sie bitte ein Beispiel geben?",
          "Was bedeutet dieses Wort?",
          "Bis wann müssen wir das abgeben?"
        ],
        "reflection": "Welche Nachfrage hilft dir wirklich weiter?"
      },
      "sentences": [
        {
          "verb": "verstehen",
          "de": "Ich habe die Aufgabe nicht verstanden.",
          "native": ""
        },
        {
          "verb": "erklären",
          "de": "Können Sie die Aufgabe bitte noch einmal erklären?",
          "native": ""
        },
        {
          "verb": "geben",
          "de": "Können Sie bitte ein Beispiel geben?",
          "native": ""
        },
        {
          "verb": "bedeuten",
          "de": "Was bedeutet dieses Wort?",
          "native": ""
        },
        {
          "verb": "abgeben",
          "de": "Bis wann müssen wir das abgeben?",
          "native": ""
        },
        {
          "verb": "helfen",
          "de": "Können Sie mir bitte helfen?",
          "native": ""
        }
      ],
      "boxes": [
        {
          "title": "Ich verstehe … nicht.",
          "items": [
            "die Aufgabe",
            "den Text",
            "die Frage",
            "das Wort"
          ]
        },
        {
          "title": "Können Sie bitte …?",
          "items": [
            "das wiederholen",
            "ein Beispiel geben",
            "langsamer sprechen",
            "mir helfen"
          ]
        },
        {
          "title": "Was bedeutet …?",
          "items": [
            "dieses Wort",
            "dieser Satz",
            "die Frage",
            "der Arbeitsauftrag"
          ]
        }
      ],
      "builder": [
        {
          "pattern": "Ich verstehe … nicht.",
          "middle": [
            "die Aufgabe",
            "den Text",
            "die Frage",
            "das Wort"
          ],
          "end": [
            "."
          ]
        },
        {
          "pattern": "Können Sie bitte …?",
          "middle": [
            "die Aufgabe erklären",
            "ein Beispiel geben",
            "langsamer sprechen",
            "das wiederholen"
          ],
          "end": [
            "?"
          ]
        },
        {
          "pattern": "Was bedeutet …?",
          "middle": [
            "dieses Wort",
            "dieser Satz",
            "die Frage"
          ],
          "end": [
            "?"
          ]
        },
        {
          "pattern": "Bis wann müssen wir …?",
          "middle": [
            "das abgeben",
            "die Aufgabe machen",
            "den Text lesen"
          ],
          "end": [
            "?"
          ]
        }
      ],
      "dialog": [
        {
          "role": "Person A",
          "step": "Nachfragen",
          "text": "Entschuldigung, ich habe die Aufgabe nicht verstanden."
        },
        {
          "role": "Person B",
          "step": "Reagieren",
          "text": "Welchen Teil verstehst du nicht?"
        },
        {
          "role": "Person A",
          "step": "Klären",
          "text": "Was bedeutet dieses Wort?"
        },
        {
          "role": "Person B",
          "step": "Erklären",
          "text": "Ich gebe ein Beispiel."
        },
        {
          "role": "Person A",
          "step": "Frist fragen",
          "text": "Bis wann müssen wir das abgeben?"
        }
      ],
      "register": [
        {
          "phrase": "Können Sie die Aufgabe bitte noch einmal erklären?",
          "judgement": "passt gut",
          "reason": "höflich und konkret"
        },
        {
          "phrase": "Ich kapier nichts.",
          "judgement": "zu allgemein",
          "reason": "verständlich, aber nicht sehr hilfreich"
        },
        {
          "phrase": "Was bedeutet dieses Wort?",
          "judgement": "passt",
          "reason": "konkrete Nachfrage"
        }
      ],
      "recall": [
        {
          "front": "Du verstehst die Aufgabe im Unterricht nicht. Frage höflich nach.",
          "back": [
            "Ich habe die Aufgabe nicht verstanden.",
            "Können Sie die Aufgabe bitte noch einmal erklären?",
            "Können Sie mir bitte helfen?"
          ]
        },
        {
          "front": "Du verstehst ein Wort im Text nicht.",
          "back": [
            "Was bedeutet dieses Wort?",
            "Können Sie bitte ein Beispiel geben?"
          ]
        },
        {
          "front": "Du möchtest wissen, wann die Aufgabe fertig sein muss.",
          "back": [
            "Bis wann müssen wir das abgeben?",
            "Müssen wir das heute abgeben?"
          ]
        }
      ],
      "worksheet": {
        "title": "Meine Sprachinsel: Schule",
        "situation": "Du bist im Unterricht. Du verstehst eine Aufgabe nicht. Du fragst höflich nach.",
        "goal": "Ich kann im Unterricht nachfragen und um Hilfe bitten.",
        "recallSituations": [
          "Du verstehst die Aufgabe nicht.",
          "Du brauchst ein Beispiel.",
          "Du verstehst ein Wort nicht.",
          "Du möchtest die Abgabefrist wissen.",
          "Die Lehrkraft spricht zu schnell."
        ],
        "roleA": "Du bist im Unterricht. Du verstehst eine Aufgabe nicht. Frage höflich nach.",
        "roleB": "Du bist Lehrer/Lehrerin. Erkläre die Aufgabe noch einmal und gib ein Beispiel.",
        "solutionRecall": [
          "Ich habe die Aufgabe nicht verstanden.",
          "Können Sie bitte ein Beispiel geben?",
          "Was bedeutet dieses Wort?",
          "Bis wann müssen wir das abgeben?",
          "Können Sie bitte langsamer sprechen?"
        ]
      },
      "speechSituation": {
        "context": "Im Unterricht ist eine Aufgabe unklar. Partner A fragt nach, Partner B erklärt die Aufgabe so, dass man weiterarbeiten kann.",
        "partnerA": {
          "title": "Partner A – Schüler/in",
          "task": "Du verstehst eine Aufgabe oder ein Wort nicht. Frage höflich nach und bitte um ein Beispiel.",
          "support": [
            "Sage genau, was du nicht verstanden hast.",
            "Bitte um Wiederholung oder ein Beispiel.",
            "Sichere ab, was du tun sollst."
          ],
          "phrases": [
            "Ich habe die Aufgabe nicht verstanden.",
            "Können Sie bitte ein Beispiel geben?",
            "Was bedeutet dieses Wort?",
            "Bis wann müssen wir das abgeben?"
          ]
        },
        "partnerB": {
          "title": "Partner B – Lehrkraft oder Mitschüler/in",
          "task": "Du hilfst beim Verstehen. Erkläre die Aufgabe noch einmal, gib ein Beispiel und frage nach, ob es jetzt klar ist.",
          "support": [
            "Wiederhole die Aufgabe in einfachen Worten.",
            "Erkläre ein schwieriges Wort.",
            "Gib ein kurzes Beispiel.",
            "Frage am Ende: Ist es jetzt klar?"
          ],
          "phrases": [
            "Die Aufgabe bedeutet: …",
            "Ein Beispiel ist: …",
            "Du sollst zuerst … und danach …",
            "Ist es jetzt klarer?"
          ]
        },
        "flow": [
          "Problem nennen",
          "Erklärung geben",
          "Beispiel geben",
          "Verständnis sichern"
        ]
      }
    }
  }
};
