# Info

Dieses React-Projekt besteht aus den folgenden Komponenten: 

- React Router: Das sorgt dafür, dass die richtigen Components (Seiten) geladen werden je nach URL. Also zum Beispiel www.shopa.com/profile -> für eine Übersicht des Profils oder www.schopa.com/list -> für eine Ansicht aller Einkaufslisten
- Material-UI: UI Framework von Google, siehe https://material-ui.com/
- Google Firebase Authentication: Für die Login-Authentication Services

## Run App
1. Vor dem starten der App muss das Fake-Backend gestartet werden.
    ```
    cd ../frontend/http-fake-backend/

    npm start
    ```
2. Nun muss die React-App gestartet werden
    - Neuen Terminal/Neue Konsole im Ordner des Report-Client Frontends öffnen
    ```
    npm start
    ```

## Report-Client
Dieser Teil der App dient ausschließlich dazu, den Report-Client gemäß der Aufgabenstellung, darzustellen.

In ihr enthalten sind:
- Einkaufsverhalten einsehen
- Statistik anzeigen