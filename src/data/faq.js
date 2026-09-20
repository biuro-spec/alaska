// Pytania ze strony glownej. Osobny plik, bo tresc musi byc w JEDNYM miejscu:
// sekcja FAQ renderuje je na stronie, a App.jsx buduje z nich schemat FAQPage.
// Gdy tekst w schemacie rozjedzie sie z widocznym na stronie, Google odrzuca wynik rozszerzony.

const PYTANIA = [
    {
        q: "Jakie marki klimatyzacji oferujecie w Raciborzu?",
        a: "Jesteśmy autoryzowanym partnerem marek LG, Rotenso oraz Mitsubishi Electric i Heavy Industries. Na życzenie klienta montujemy również urządzenia innych producentów. Obsługujemy Racibórz i cały region Śląska."
    },
    {
        q: "Ile kosztuje montaż klimatyzacji?",
        a: "Koszt montażu klimatyzacji zależy od typu urządzenia, liczby jednostek i warunków technicznych. Każda wycena i doradztwo techniczne u klienta są całkowicie bezpłatne i niezobowiązujące — zadzwoń pod 607 044 336."
    },
    {
        q: "Jak często należy serwisować klimatyzację?",
        a: "Zalecamy serwis klimatyzacji dwa razy w roku – przed sezonem letnim oraz po jego zakończeniu, aby zapewnić czystość filtrów i optymalne parametry pracy. Oferujemy umowy serwisowe dla firm i klientów indywidualnych."
    },
    {
        q: "Czy oferujecie pompy ciepła i ogrzewanie?",
        a: "Tak, montujemy pompy ciepła powietrze-woda i powietrze-powietrze. Pompy ciepła mogą obniżyć koszty ogrzewania nawet o 70%. Pomagamy również w uzyskaniu dofinansowania z programu Czyste Powietrze."
    },
    {
        q: "Czy wynajmujecie klimatyzatory przenośne?",
        a: "Tak, posiadamy wypożyczalnię klimatyzatorów przenośnych w Raciborzu. To idealne rozwiązanie na imprezy okolicznościowe, eventy lub do przetestowania przed stałym montażem klimatyzacji."
    }
];

export default PYTANIA;
