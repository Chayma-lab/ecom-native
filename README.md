# 📱 Native Performance Test App (React Native)

Deze app is ontwikkeld als onderdeel van een bachelorproef die onderzoekt in welke mate **Progressive Web Apps (PWA’s)** een alternatief kunnen zijn voor **native apps** binnen internationale e-commerce platformen. De focus ligt op **gebruikservaring, prestaties en offline gedrag**.

Naast performance testing biedt deze app ook een volledige winkelervaring met artikels, een cart en zoekfunctionaliteit.

---

## 🛍️ Functionaliteiten

### 🏠 Homepagina
- Artikels worden opgehaald via een externe API (FakeStore API)
- Zoekfunctie om producten te filteren op naam
- Klik op een product om meer details te bekijken
- Voeg artikels toe aan het winkelmandje

### 🛒 Cartpagina
- Bekijk je winkelmandje
- Verander de hoeveelheid van een item
- Verwijder individuele items
- Bekijk het **totale bedrag**

---

## 📊 Performance Testscherm

De app bevat een speciaal testscherm dat 6 belangrijke performance-indicatoren meet — ontworpen om een vergelijking te maken met Lighthouse-metrics van de PWA-versie.

| Metriek                          | Beschrijving                                                                 |
|----------------------------------|------------------------------------------------------------------------------|
| 🚀 **App Startup Time**          | Tijd tussen app-lancering en eerste zichtbare scherm                        |
| ⚡ **Button Reaction Time (INP)**| Tijd tussen gebruikersklik en visuele respons                               |
| 📊 **System Response Time (SRT)**| Som van Startup Time + INP (vergelijkbaar met TTFB + INP in Lighthouse)     |
| 📡 **Offline Mode Status**       | Detecteert of het toestel zich in offline-modus bevindt                     |
| 🖼️ **Offline Image Test**        | Test of een lokale afbeelding zichtbaar blijft zonder internetverbinding    |
| 💻 **Platform Info**             | Toont op welk platform de test uitgevoerd wordt (bv. Android of iOS)       |

---

## 🧑‍🎓 Gebruikt in Bachelorproef

Deze app wordt vergeleken met een PWA met exact dezelfde functionaliteiten en data. De focus ligt op:

- Performance (SRT, INP, Startup Time)
- Offline gedrag (HTML caching vs native toegang)
- Gebruikerservaring (snelle interactie, consistent gedrag)
- Mobiele bruikbaarheid

---

## 📁 Projectstructuur

```bash
ECOM-NATIVE/
├── assets/                        # Beelden en iconen
│   ├── adaptive-icon.png
│   ├── android-chrome-512x512.png
│   ├── banner-image.webp         # Afbeelding voor offline test
│   ├── favicon.png
│   └── splash-icon.png

├── components/                   # Herbruikbare UI-componenten
│   ├── CartItem.js               # Itemweergave in winkelmandje
│   ├── CartTotal.js              # Totaalprijsberekening
│   ├── Layout.js                 # Layout-wrapper
│   ├── ProductCard.js            # Productkaart voor homepagina
│   └── SearchBar.js              # Zoekbalk

├── screens/                      # App-schermen
│   ├── CartScreen.js             # Winkelmandje beheren
│   ├── DetailScreen.js           # Productdetails
│   ├── HomeScreen.js             # Artikels zoeken en bekijken
│   └── PerformanceTestScreen.js  # Prestatie-analyses uitvoeren

├── utils/                        # Hulpfuncties
│   ├── addToCart.js              # Item toevoegen aan cart
│   └── navigation.js             # Navigatie setup

├── App.js                        # Navigatie entrypoint
├── app.json                      # Expo-configuratie
├── index.js                      # App startpunt
└── .gitignore
```
## ▶️ App uitvoeren (Native – React Native via Expo)

### Vereisten:
- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app op je smartphone (iOS of Android)

### Stappen om de app te runnen:

```bash
git clone https://github.com/Chayma-lab/ecom-native.git
cd ecom-native
npm install
npx expo start
```

### Na het uitvoeren van npx expo start verschijnt er een QR-code in de terminal of in een browservenster.

1. Open de Expo Go app op je smartphone
2. Scan de QR-code
3. De app wordt direct geladen op je toestel

💡 Tip: zet je toestel in vliegtuigmodus om offline gedrag te testen.
