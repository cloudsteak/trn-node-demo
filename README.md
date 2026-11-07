# NodeJS alapú webalkalmazás Azure-hoz
## Támogatott NodeJS verziók

- Node.js 24.22.1 vagy újabb

2026. október 21-én a Node.js projekt biztonsági kiadást adott ki. A legsúlyosabb hiba a beépített Brotli-dekóderben van ([CVE-2026-111497](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)): ha az alkalmazás a `node:zlib` modullal támadó által készített Brotli-adatot bont ki, a dekóder a belső pufferen túlírhat. Ez a folyamat összeomlásához, memóriatartalom kiszivárgásához vagy távoli kódvégrehajtáshoz vezethet. Ugyanez a kiadás további magas súlyosságú hibákat is javított, köztük a TLS-tanúsítvány hosztnév-ellenőrzésének megkerülését és a `dns.resolve()` NUL-bájtos névcsonkolását.

A 24-es LTS ágon ezek a javítások a **24.22.1**-es verzióban jelentek meg. Az ennél régebbi 24.x kiadások érintettek. A Node.js 20 már nem támogatott vonal, arra nem készült javítás. A 22-es ág javított kiadása a 22.23.4, a 26-osé a 26.12.1; ez a projekt a 24-es LTS vonalat követi, ezért a minimum a 24.22.1, és csak ennél újabb Node.js futtatható.

Részletek: [Node.js security releases, 2026. október 21.](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)

## Kapcsolódó projekt

Docker verzió: https://github.com/cloudsteak/trn-node-docker-demo

## Megoldás

A megoldás "Embedded JavaScript templating"-re épül. https://ejs.co

https://ejs.co/#install


## Helyi futtatás

Node.js 24.22.1 vagy újabb kell. Ellenőrizd a verziót:

```bash
node -v
```

A projekt mappájában telepítsd a függőségeket, majd indítsd az alkalmazást:

```bash
npm install
npm start
```

A szerver a [http://localhost:3000](http://localhost:3000) címen érhető el. Más portot a `PORT` környezeti változóval adhatsz meg:

```bash
PORT=8080 npm start
```

## Teszt lépések

**[eslint](https://eslint.org/)** tesztelés előkészítve.
Ha CI pipeline-t telepítesz, akkor ellemőrzi a kódodban (példa alapján app.js) a pontosvesszők helyességét. A CD rész, csak akkor fut le, ha a CI (a teszt) sikeres. 

Kézzel is futtatható a teszt:

```bash
npm run test
```

## Azure Pipeline létrehozás és kapcsolat GitHub-al

1. Personal Acces Token létrehozás: https://github.com/settings/tokens
2. "Generate new token (classic)"
    - Note: A token neve. Adj valami értelmezhető nevet. Pl.: AZPIPELINEPAT
    - Expiration: Token lejárati ideje. Tesztelés esetén választhatod a "No expiration". Éles rendszer esetén adj lejárati időt!!!
    - Az alábbi részeket válaszd ki a jelölönégyzeteknél
        - "repo": mindegyiket alatta
        - "admin:repo_hook": mindegyiket alatta
        - "user": mindegyiket alatta
3. "Generate token" gombra kattintéssal a token létrejön.
4. A tokent másold biztonságos helyre! Nem visszafejthető.
5. Menj át az Azure DevOps-ba, a saját organization és project alapján. Pl.: https://cloudsteak.visualstudio.com/MentorKlub/_settings/adminservices (Project Settings > Service connections)
6. "Create service connection"
7. "New Azure service connection" résznél válaszd a GitHub-ot
8. "New GitHub service connection" résznél az alábbi módon töltsd ki
    - "Personal Access Token Authentication"
    - "Personal access token" mezőbe illeszd be a GitHub-on generált token értékét
    - "Service connection name" mezőbe adj egy nevet. Pl.: GITADOCONN
    - Jelöld be a "Grant access permission to all pipelines" jelölő négyzetet
    - Kattints a "Verify and Save" gombra
9. Menj a Pipeline részbe. Pl.: https://cloudsteak.visualstudio.com/MentorKlub/_build
10. "Create Pipeline"
11. GitHub (Yaml)
12. Select lapon görgess a lapaljára és kattints az utolsó sorban a linkre: "You may also select a specific connection."
13. Választd a "GITADOCONN"-t
14. Keresd meg a GitHub repo-k között, amivel kapcsolódni szeretnél.
15. Létező YAML esetén a Run gomb melletti nyilra kattins és válaszd a "Save" lehetőséget.
16. Várd meg míg a pipeline létrejön. Ezzel a kapcsolt kész.
17. Ha GitHub-on módosítasz a kódon, akkor a pipeline elindul és a benne lévő kód lefut.

