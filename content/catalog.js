(function(){
  const catalog = {
    version: "1.8.1",
    updated: "2026-06-14",
    schools: [
      {
        id:"berufsschule", title:"Berufsschule", subtitle:"Ausbildungsbegleitender Unterricht", icon:"briefcase", status:"active",
        subjects:[{id:"deutsch",title:"Deutsch",years:[{id:"3-lehrjahr",title:"3. Lehrjahr",units:[
          {id:"literarische-texte",title:"Literarische Texte verstehen",subtitle:"Struktur vorbereitet",status:"placeholder",lessons:[]},
          {id:"04-sprachlicher-feinschliff",title:"04 Sprachlicher Feinschliff",subtitle:"Abschlussprüfung und SHK-Berufsleben",status:"active",unitHandbook:"handbooks/Lehrerhandbuch_SHK_Sprachlicher_Feinschliff.html",lessons:[
              {id:"shk-feinschliff-01-register",label:"Einheit 1",title:"Sprachregister und Diagnose",subtitle:"Woran erkennt man professionelles Schreiben?",status:"ready"},
              {id:"shk-feinschliff-02-satzbau",label:"Einheit 2",title:"Satzbau und Textkohärenz",subtitle:"Wann ist ein kurzer Satz besser, wann ein Satzgefüge?",status:"ready"},
              {id:"shk-feinschliff-03-kommas",label:"Einheit 3",title:"Kommasetzung als Sinnhilfe",subtitle:"Welche Kommas sichern Sinn und Lesbarkeit?",status:"ready"},
              {id:"shk-feinschliff-04-aktiv-passiv",label:"Einheit 4",title:"Aktiv, Passiv und Fachsprache",subtitle:"Wer soll im Satz sichtbar sein?",status:"ready"},
              {id:"shk-feinschliff-05-das-dass",label:"Einheit 5",title:"das oder dass?",subtitle:"Wie prüfe ich das/dass sicher und schnell?",status:"ready"},
              {id:"shk-feinschliff-06-pruefungs-email",label:"Einheit 6",title:"Die Prüfungs-E-Mail",subtitle:"Wie entsteht eine vollständige, überzeugende E-Mail?",status:"ready"},
              {id:"shk-feinschliff-07-nominalisierung",label:"Einheit 7",title:"Nominalisierungen und Lesbarkeit",subtitle:"Wann verdichtet eine Nominalisierung, wann erschwert sie?",status:"ready"},
              {id:"shk-feinschliff-08-lektorat",label:"Einheit 8",title:"Priorisiertes Lektorat und Transfer",subtitle:"Welche Revision bringt unter Zeitdruck den größten Gewinn?",status:"ready"}
          ]}
        ]}]}]
      },
      {
        id:"2bfs", title:"Zweijährige Berufsfachschule", subtitle:"Gewerbliche 2BFS · Kfz", icon:"school", status:"active",
        subjects:[{id:"deutsch",title:"Deutsch",years:[{id:"1-jahr",title:"1. Jahr",units:[{
          id:"literarische-texte", title:"Literarische Texte verstehen", subtitle:"Wie lenken literarische Texte unseren Blick?", status:"active",
          unitHandbook:"handbooks/Lehrerhandbuch_Literarische_Texte_2BFS_Kfz.html",
          lessons:[
            {id:"das-letzte-buch",label:"Stunde 1",title:"Das letzte Buch",subtitle:"Literatur als gesellschaftliche Frage",status:"placeholder"},
            {id:"textgattungen",label:"Stunden 2/3",title:"Textgattungen unterscheiden",subtitle:"Epik · Lyrik · Dramatik",status:"placeholder"},
            {id:"feierabend",label:"Stunde 4",title:"Loriot: Feierabend",subtitle:"Dramatik und Kommunikation",status:"placeholder"},
            {id:"modernes-maerchen",label:"Stunde 5",title:"Kästner: Modernes Märchen",subtitle:"Form, Wirkung und Titel",status:"ready"},
            {id:"inhaltsangabe-vorbereiten",label:"Stunde 7",title:"Inhaltsangabe vorbereiten",subtitle:"Kriterien statt Nacherzählung",status:"placeholder"},
            {id:"eine-sucht",label:"Stunden 8/9",title:"Eine Sucht",subtitle:"Inhaltsangabe schreiben und überarbeiten",status:"placeholder"},
            {id:"erzaehlperspektive",label:"Stunde 10",title:"Erzählperspektive",subtitle:"Wer zeigt uns was?",status:"placeholder"},
            {id:"figuren-charakterisieren",label:"Stunden 11/12",title:"Figuren charakterisieren",subtitle:"Behauptung · Beleg · Erklärung",status:"placeholder"}
          ]
        }]}]}]
      },
      {
        id:"avdual", title:"AVDual", subtitle:"Ausbildungsvorbereitung dual", icon:"path", status:"active",
        subjects:[
          {id:"deutsch",title:"Deutsch",units:[{id:"geschaeftsbrief",title:"Geschäftsbrief",subtitle:"Struktur vorbereitet",status:"placeholder",lessons:[]}]}
        ]
      }
    ],
    languageSupport: {
      id:"sprachfoerderung",
      title:"Sprachförderung",
      subtitle:"Eigenständiger Unterrichtsbereich · DaZ / DaF",
      status:"active",
      icon:"speech",
      categories:[
        {
          id:"sprachinseln",
          title:"Sprachinseln",
          subtitle:"Sprechsituationen für Alltag, Schule und Beruf",
          status:"active",
          kind:"embeddedAppCollection",
          appUrl:"apps/sprachinseln/index.html",
          appLabel:"Sprachinseln-Dashboard",
          topics:[
            {id:"behoerdengang",title:"Behördengang",subtitle:"Anliegen nennen, nachfragen und Formulare klären",status:"ready",themeId:"behoerdengang"},
            {id:"betrieb-maler",title:"Betrieb – Maler",subtitle:"Arbeitsaufträge verstehen und fachlich nachfragen",status:"ready",themeId:"betrieb_maler"},
            {id:"betrieb-maurer",title:"Betrieb – Maurer",subtitle:"Arbeitsabläufe besprechen und Rückfragen stellen",status:"ready",themeId:"betrieb_maurer"},
            {id:"schule",title:"Schule",subtitle:"Im Unterricht nachfragen und Verständnis sichern",status:"ready",themeId:"schule"}
          ]
        },
        {
          id:"grammatik",
          title:"Grammatik",
          subtitle:"Sprachsystematische Lernbereiche",
          status:"placeholder",
          topics:[
            {id:"artikel",title:"Artikel",subtitle:"Bestimmter, unbestimmter und Nullartikel",status:"placeholder"}
          ]
        }
      ]
    }
  };
  window.UD.catalog = Object.freeze(catalog);
})();
