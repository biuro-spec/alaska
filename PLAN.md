# Plan: Blog / Baza Wiedzy z React Router

## Architektura

Obecna aplikacja to SPA bez routera. Dodamy React Router z osobną stroną `/blog` i indywidualnymi artykułami pod `/blog/:slug`.

## Kroki implementacji

### 1. Instalacja react-router-dom
- `npm install react-router-dom`

### 2. Restructuryzacja routingu (main.jsx + App.jsx)
- **main.jsx**: Owinąć `<App>` w `<BrowserRouter>`
- **App.jsx**: Dodać `<Routes>` z dwoma ścieżkami:
  - `/` → obecna strona główna (wszystkie sekcje jak teraz)
  - `/blog` → lista artykułów
  - `/blog/:slug` → pojedynczy artykuł

### 3. Dane artykułów (nowy plik: `src/data/blogArticles.js`)
- ~15-20 artykułów Q&A pogrupowanych w kategorie:
  - **Klimatyzacja** (montaż, serwis, dobór, koszty)
  - **Pompy ciepła** (typy, dofinansowanie, oszczędności)
  - **Chłodnictwo** (komory, agregaty, przemysł)
  - **Porady** (serwis, czyszczenie, sezonowość)
- Każdy artykuł: `{ slug, title, category, excerpt, content, keywords }`
- Treść z nasyceniem frazami SEO (Racibórz, Śląsk, konkretne usługi)

### 4. Komponent BlogPage (nowy: `src/components/BlogPage.jsx`)
- Lista artykułów w formie kart z kategoriami
- Filtrowanie po kategoriach
- Link "Wróć do strony głównej"
- Osobny H1 z frazami SEO

### 5. Komponent BlogArticle (nowy: `src/components/BlogArticle.jsx`)
- Wyświetla pełny artykuł
- Breadcrumb: Strona główna > Blog > Tytuł
- Powiązane artykuły na dole
- CTA do kontaktu

### 6. Aktualizacja nawigacji
- **Navigation** (w App.jsx): Dodać link "Blog" w nawigacji
- **Footer.jsx**: Dodać link "Blog" w sekcji Nawigacja

### 7. CSS dla bloga (dopisać do App.css)
- Styl jasny (light) — spójny z sekcjami About/Salon
- Karty artykułów, breadcrumb, typografia artykułu

### 8. Konfiguracja serwera (SPA fallback)
- **vite.config.js**: Bez zmian (dev server obsługuje to automatycznie)
- **public/_redirects**: Dla Netlify (jeśli dotyczy)
- **public/.htaccess**: Dla Apache — RewriteRule do index.html

### 9. ScrollToTop przy zmianie route
- Dodać komponent ScrollToTop w routerze (scroll na górę przy nawigacji)

## Pliki do modyfikacji
- `package.json` (nowa zależność)
- `src/main.jsx` (BrowserRouter)
- `src/App.jsx` (Routes + Navigation link)
- `src/components/Footer.jsx` (link Blog)
- `src/App.css` (style bloga)

## Nowe pliki
- `src/data/blogArticles.js` (dane artykułów)
- `src/components/BlogPage.jsx` (lista)
- `src/components/BlogArticle.jsx` (artykuł)
- `public/.htaccess` (Apache SPA fallback)
