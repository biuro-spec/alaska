// Strony usługowe — jedna strona na jedno realne zapytanie z Search Console.
//
// PO CO: do 09.2026 serwis miał cztery trasy (/, /blog, /blog/:slug, /realizacje).
// Strona główna rankowała na wszystko naraz w okolicach pozycji 9 i zbierała
// 2389 z 2685 wyświetleń. Frazy „montaż klimatyzacji Racibórz" (277 wyświetleń,
// pozycja 11,3), „czyszczenie klimatyzacji Racibórz" (57, pozycja 15,5) czy
// „nabijanie klimatyzacji Racibórz" (33, pozycja 11,6) miały ZERO kliknięć —
// nikt nie wchodzi z pozycji 11 na wynik, którego tytuł brzmi ogólnie.
//
// Treść pochodzi z modali w Services.jsx (fullDesc + features), sekcji FAQ
// i artykułów bloga. Modale renderują się dopiero po kliknięciu, więc ta treść
// nigdy nie trafiła do indeksu — tutaj jest w HTML od razu.
//
// UWAGA: pola oznaczone `doPotwierdzenia` zawierają liczby przepisane
// z istniejących materiałów (ceny z artykułów bloga z 2025 r.). Właściciel
// musi je potwierdzić przed wdrożeniem.

export const TELEFON = '607 044 336';
export const TELEFON_TEL = '+48607044336';
export const TELEFON_SPRZEDAZ = '607 376 336';
export const EMAIL = 'alaskarp@tlen.pl';

const uslugi = [
  {
    slug: 'klimatyzacja-raciborz',
    fraza: 'klimatyzacja racibórz',
    tytul: 'Klimatyzacja Racibórz — montaż i serwis | Alaska',
    opis: 'Klimatyzacja w Raciborzu od 1997 roku. Dobór, montaż i serwis urządzeń LG, Rotenso i Mitsubishi. Bezpłatna wizja lokalna i wycena. Tel. 607 044 336.',
    h1: 'Klimatyzacja Racibórz',
    lead: 'Dobieramy, montujemy i serwisujemy klimatyzację w Raciborzu i okolicy od 1997 roku. Wizja lokalna i wycena są bezpłatne.',
    ikona: 'fa-wind',
    hub: true,
    wstep: [
      'Alaska działa w Raciborzu od 1997 roku. Przez ten czas zamontowaliśmy klimatyzację w mieszkaniach, domach jednorodzinnych, biurach, sklepach i zakładach produkcyjnych w całym powiecie raciborskim. Jesteśmy autoryzowanym partnerem LG, Rotenso oraz Mitsubishi Electric i Mitsubishi Heavy Industries, a na życzenie montujemy urządzenia także innych producentów.',
      'Klimatyzacja to nie jest zakup z półki. Ta sama jednostka sprawdzi się świetnie w jednym pomieszczeniu i będzie się męczyć w drugim — decyduje nasłonecznienie, izolacja, liczba osób i sprzętu grzejnego. Dlatego zaczynamy od wizji lokalnej u klienta, a nie od katalogu. Doradzamy to, co najlepsze dla Ciebie, nie dla naszego portfela.',
    ],
    sekcje: [
      {
        naglowek: 'Jaką klimatyzację wybrać do domu i mieszkania',
        tresc: [
          'Najczęstszym wyborem do mieszkania i domu jednorodzinnego jest klimatyzator ścienny typu split — jednostka zewnętrzna na elewacji lub balkonie, wewnętrzna na ścianie pomieszczenia. Jest cichy, łatwy w montażu i najtańszy w zakupie.',
          'Jeśli chłodzenia potrzebuje kilka pomieszczeń, zwykle korzystniejszy jest multi-split: jedna jednostka zewnętrzna obsługuje od dwóch do pięciu wewnętrznych. Oszczędza miejsce na elewacji i wygląda spokojniej niż kilka osobnych agregatów.',
          'Do biur, gabinetów i lokali usługowych z sufitem podwieszanym proponujemy jednostki kasetonowe — rozprowadzają powietrze równomiernie na cztery strony, więc nikt nie siedzi w strumieniu zimnego powietrza.',
        ],
      },
      {
        naglowek: 'Jaka moc klimatyzacji do pokoju',
        tresc: [
          'Orientacyjnie liczy się około 100 W mocy chłodniczej na każdy metr kwadratowy powierzchni. Pokój 20 m² potrzebuje więc urządzenia o mocy co najmniej 2,0 kW.',
          'To jednak punkt wyjścia, a nie wynik. Pokój od południa z dużym przeszkleniem może wymagać o połowę więcej, a dobrze zaizolowana sypialnia od północy — mniej. Przewymiarowana klimatyzacja pracuje krótkimi cyklami, gorzej osusza powietrze i szybciej się zużywa. Dlatego moc dobieramy na miejscu.',
        ],
      },
      {
        naglowek: 'Klimatyzacja, która grzeje zimą',
        tresc: [
          'Nowoczesne klimatyzatory inwerterowe pracują też jako pompa ciepła powietrze-powietrze i ogrzewają pomieszczenie przy temperaturze zewnętrznej nawet do −15°C.',
          'Dla wielu klientów to najtańszy sposób na dogrzanie pojedynczego pomieszczenia — koszt jest wyraźnie niższy niż przy grzejniku elektrycznym, bo urządzenie nie wytwarza ciepła, tylko je przenosi. Jeśli rozważasz ogrzewanie całego budynku, zobacz stronę o pompach ciepła.',
        ],
      },
    ],
    cechy: [
      'Montaż klimatyzacji ściennej i kasetonowej',
      'Systemy multi-split do wielu pomieszczeń',
      'Klimatyzatory z funkcją grzania (pompy powietrze-powietrze)',
      'Energooszczędne modele inwerterowe klasy A+++',
      'Bezpłatna wizja lokalna i dobór mocy u klienta',
    ],
    faq: [
      {
        q: 'Jakie marki klimatyzacji oferujecie w Raciborzu?',
        a: 'Jesteśmy autoryzowanym partnerem LG, Rotenso oraz Mitsubishi Electric i Mitsubishi Heavy Industries. Na życzenie klienta montujemy również urządzenia innych producentów.',
      },
      {
        q: 'Czy wycena klimatyzacji jest płatna?',
        a: 'Nie. Wizja lokalna, dobór mocy i wycena na terenie Raciborza i okolic są bezpłatne i niezobowiązujące.',
      },
      {
        q: 'Czy klimatyzacja może grzać zimą?',
        a: 'Tak. Klimatyzatory inwerterowe działają jako pompa ciepła powietrze-powietrze i skutecznie ogrzewają pomieszczenie nawet przy −15°C na zewnątrz.',
      },
      {
        q: 'Jak często trzeba serwisować klimatyzację?',
        a: 'Zalecamy dwa przeglądy w roku — przed sezonem letnim i po jego zakończeniu. Dzięki temu urządzenie zachowuje wydajność, a parownik nie staje się siedliskiem pleśni.',
      },
    ],
    powiazane: ['montaz-klimatyzacji-raciborz', 'serwis-klimatyzacji-raciborz', 'czyszczenie-klimatyzacji-raciborz'],
  },

  {
    slug: 'montaz-klimatyzacji-raciborz',
    fraza: 'montaż klimatyzacji racibórz',
    tytul: 'Montaż klimatyzacji Racibórz — cena i przebieg | Alaska',
    opis: 'Montaż klimatyzacji w Raciborzu: bezpłatna wizja lokalna, montaż w jeden dzień, uprawnienia F-gazowe. Split, multi-split i kasetony. Tel. 607 044 336.',
    h1: 'Montaż klimatyzacji Racibórz',
    lead: 'Montujemy klimatyzację w Raciborzu i powiecie raciborskim. Standardowy montaż split zamykamy w jeden dzień roboczy.',
    ikona: 'fa-screwdriver-wrench',
    wstep: [
      'Montaż klimatyzacji to instalacja ciśnieniowa z czynnikiem chłodniczym, a nie powieszenie sprzętu na ścianie. Źle wykonany zostawia po sobie nieszczelności, zawilgoconą ścianę i urządzenie, które traci wydajność w drugim sezonie. Mamy uprawnienia F-gazowe i wykonujemy każdy montaż tak, jakbyśmy robili go u siebie w domu.',
      'Zaczynamy od bezpłatnej wizji lokalnej. Na miejscu ustalamy moc, miejsce jednostki wewnętrznej i zewnętrznej, trasę instalacji i sposób odprowadzenia skroplin. Dopiero wtedy podajemy cenę — i jest to cena końcowa, bez dopłat odkrywanych w trakcie prac.',
    ],
    sekcje: [
      {
        naglowek: 'Jak wygląda montaż krok po kroku',
        tresc: [
          'Wizja lokalna i wycena. Przyjeżdżamy, mierzymy pomieszczenia, ustalamy trasę instalacji i przedstawiamy wycenę. Bezpłatnie i bez zobowiązania.',
          'Ustalenie terminu i dostawa urządzenia. W sezonie letnim warto zarezerwować termin z wyprzedzeniem — od maja do sierpnia kalendarz zapełnia się najszybciej.',
          'Montaż. Wiercimy przepust, prowadzimy instalację chłodniczą, elektryczną i odpływ skroplin, wieszamy jednostki, wykonujemy próbę szczelności i próżniowanie układu, napełniamy czynnikiem i uruchamiamy.',
          'Odbiór i szkolenie. Pokazujemy obsługę pilota i aplikacji, tryby pracy oraz czyszczenie filtrów. Zostawiamy dokumentację gwarancyjną.',
        ],
      },
      {
        naglowek: 'Ile kosztuje montaż klimatyzacji',
        doPotwierdzenia: true,
        tresc: [
          'Pojedynczy klimatyzator split wraz z montażem to orientacyjnie od 3 500 do 7 000 zł — o cenie decyduje marka, moc i długość trasy instalacji.',
          'System multi-split obsługujący dwa lub trzy pomieszczenia to zwykle od 8 000 do 15 000 zł.',
          'Na cenę wpływają też warunki techniczne: wysokość budynku, konieczność pracy z podnośnika, kucie w betonie czy prowadzenie instalacji w korycie maskującym. Dlatego podajemy konkretną kwotę dopiero po wizji lokalnej.',
        ],
      },
      {
        naglowek: 'Montaż klimatyzacji w bloku',
        tresc: [
          'W budynku wielorodzinnym jednostka zewnętrzna trafia zwykle na balkon, na ścianę zewnętrzną lub na dach. W większości spółdzielni i wspólnot potrzebna jest pisemna zgoda zarządcy, a w budynkach objętych ochroną konserwatorską bywa wymagane uzgodnienie wyglądu elewacji.',
          'Podpowiadamy, jak taki wniosek sformułować i jakie parametry urządzenia w nim podać. Dobieramy też jednostki o obniżonym poziomie hałasu, żeby agregat nie przeszkadzał sąsiadom.',
        ],
      },
    ],
    cechy: [
      'Uprawnienia F-gazowe — montaż zgodny z przepisami',
      'Standardowy split montowany w jeden dzień roboczy',
      'Próba szczelności i próżniowanie każdego układu',
      'Bezpłatna wizja lokalna przed wyceną',
      'Cena końcowa ustalona przed rozpoczęciem prac',
    ],
    faq: [
      {
        q: 'Ile trwa montaż klimatyzacji?',
        a: 'Standardowy montaż pojedynczego klimatyzatora split zamykamy w jeden dzień roboczy. System multi-split na kilka pomieszczeń zajmuje zwykle dwa dni.',
      },
      {
        q: 'Czy do montażu klimatyzacji potrzebne jest pozwolenie?',
        a: 'W domu jednorodzinnym zwykle nie. W bloku potrzebna jest zgoda spółdzielni lub wspólnoty, a przy budynkach zabytkowych dodatkowo uzgodnienie z konserwatorem.',
      },
      {
        q: 'Czy montaż niszczy elewację?',
        a: 'Przepust przez ścianę ma średnicę kilku centymetrów i po montażu jest uszczelniony oraz zamaskowany. Instalację na zewnątrz prowadzimy w korycie w kolorze elewacji.',
      },
      {
        q: 'Kiedy najlepiej zamówić montaż?',
        a: 'Wiosną, przed początkiem upałów. Od maja do sierpnia terminy zapełniają się najszybciej, a poza sezonem czeka się najkrócej.',
      },
    ],
    powiazane: ['klimatyzacja-raciborz', 'serwis-klimatyzacji-raciborz', 'wypozyczalnia-klimatyzatorow-raciborz'],
  },

  {
    slug: 'serwis-klimatyzacji-raciborz',
    fraza: 'serwis klimatyzacji racibórz',
    tytul: 'Serwis klimatyzacji Racibórz — przeglądy i naprawy | Alaska',
    opis: 'Serwis klimatyzacji w Raciborzu: przeglądy okresowe, naprawy, pomiary szczelności, umowy serwisowe dla firm. Uprawnienia F-gazowe. Tel. 607 044 336.',
    h1: 'Serwis klimatyzacji Racibórz',
    lead: 'Przeglądy, naprawy i pomiary szczelności klimatyzacji w Raciborzu i na Śląsku. Kiedy dzwonisz z awarią, nie każemy czekać — jedziemy.',
    ikona: 'fa-tools',
    wstep: [
      'Klimatyzacja bez serwisu nie przestaje działać z dnia na dzień. Traci wydajność powoli: zużywa coraz więcej prądu, chłodzi coraz słabiej, a w parowniku narasta warstwa, której nikt nie chciałby wdychać. Regularny przegląd kosztuje ułamek tego, co naprawa sprężarki.',
      'Serwisujemy urządzenia wszystkich marek, także te zamontowane przez inne firmy. Mamy uprawnienia F-gazowe, więc możemy legalnie obsługiwać układy z czynnikiem chłodniczym i prowadzić wymaganą dokumentację.',
    ],
    sekcje: [
      {
        naglowek: 'Co obejmuje przegląd klimatyzacji',
        tresc: [
          'Sprawdzenie ciśnień roboczych i ilości czynnika chłodniczego w układzie.',
          'Kontrolę szczelności instalacji — nieszczelność to nie tylko spadek wydajności, ale i obowiązek zgłoszenia przy większych układach.',
          'Czyszczenie i dezynfekcję parownika oraz wymianę lub mycie filtrów.',
          'Przegląd instalacji elektrycznej, sprawdzenie odpływu skroplin i pomiar parametrów pracy przed oddaniem urządzenia.',
        ],
      },
      {
        naglowek: 'Jak często serwisować klimatyzację',
        tresc: [
          'Dla urządzeń domowych i biurowych zalecamy dwa przeglądy w roku: wiosną, przed sezonem chłodzenia, i jesienią, po jego zakończeniu.',
          'W gastronomii, handlu i przemyśle częstotliwość zależy od obciążenia układu i przepisów o czynnikach fluorowanych. Dla takich klientów prowadzimy umowy serwisowe z ustalonym harmonogramem przeglądów i priorytetem przy awarii.',
        ],
      },
      {
        naglowek: 'Najczęstsze awarie i co je zdradza',
        tresc: [
          'Klimatyzacja chłodzi słabiej niż rok temu — najczęściej ubytek czynnika chłodniczego przez nieszczelność. Samo uzupełnienie bez znalezienia wycieku to wyrzucone pieniądze.',
          'Woda kapie z jednostki wewnętrznej — zatkany lub źle wyprofilowany odpływ skroplin, czasem zalodzony parownik.',
          'Nieprzyjemny zapach po uruchomieniu — pleśń i bakterie na parowniku. Potrzebne odgrzybianie, nie odświeżacz.',
          'Głośna praca jednostki zewnętrznej — zużyte łożyska wentylatora, poluzowane mocowanie albo problem ze sprężarką.',
        ],
      },
    ],
    cechy: [
      'Okresowe przeglądy klimatyzacji i chłodnictwa',
      'Naprawy urządzeń wszystkich marek, także z obcego montażu',
      'Pomiary szczelności i efektywności układów',
      'Umowy serwisowe dla firm z priorytetem przy awarii',
      'Dojazd na terenie województwa śląskiego',
    ],
    faq: [
      {
        q: 'Czy serwisujecie klimatyzację zamontowaną przez inną firmę?',
        a: 'Tak. Obsługujemy urządzenia wszystkich marek niezależnie od tego, kto wykonywał montaż.',
      },
      {
        q: 'Jak szybko przyjeżdżacie do awarii?',
        a: 'Przy awarii staramy się reagować tego samego lub następnego dnia roboczego. Klienci z umową serwisową mają pierwszeństwo.',
      },
      {
        q: 'Czy przegląd klimatyzacji jest obowiązkowy?',
        a: 'Dla urządzeń domowych to zalecenie producenta, od którego zwykle zależy gwarancja. Przy większych układach z czynnikami fluorowanymi kontrole szczelności są obowiązkiem wynikającym z przepisów.',
      },
    ],
    powiazane: ['czyszczenie-klimatyzacji-raciborz', 'nabijanie-klimatyzacji-raciborz', 'klimatyzacja-raciborz'],
  },

  {
    slug: 'czyszczenie-klimatyzacji-raciborz',
    fraza: 'czyszczenie klimatyzacji racibórz',
    tytul: 'Czyszczenie i odgrzybianie klimatyzacji Racibórz | Alaska',
    opis: 'Czyszczenie i odgrzybianie klimatyzacji w Raciborzu metodą ultradźwiękową. Usuwamy pleśń i zapach z parownika. Tel. 607 044 336.',
    h1: 'Czyszczenie i odgrzybianie klimatyzacji Racibórz',
    lead: 'Usuwamy pleśń, bakterie i zapach z parownika klimatyzacji. Dezynfekcja metodą ultradźwiękową, bez demontażu urządzenia.',
    ikona: 'fa-spray-can-sparkles',
    wstep: [
      'Parownik klimatyzacji pracuje mokry — na zimnych lamelach skrapla się woda. To środowisko, w którym pleśń i bakterie rozwijają się same z siebie, a powietrze z nawiewu roznosi je po całym pomieszczeniu. Charakterystyczny stęchły zapach przy uruchomieniu to sygnał, że proces trwa już od dłuższego czasu.',
      'Dla osób z alergią i astmą zaniedbana klimatyzacja potrafi być gorsza niż jej brak. Czyszczenie to nie kosmetyka — to warunek, żeby urządzenie poprawiało jakość powietrza, a nie ją pogarszało.',
    ],
    sekcje: [
      {
        naglowek: 'Na czym polega odgrzybianie ultradźwiękowe',
        tresc: [
          'Preparat dezynfekujący jest rozbijany na mgłę o bardzo drobnych kroplach, która dociera między lamele parownika i do kanałów, gdzie szczotka ani strumień wody nie sięgną.',
          'Metoda nie wymaga demontażu jednostki i nie zalewa elektroniki. Po zabiegu urządzenie można uruchomić od razu.',
          'Czyścimy przy tym filtry, tackę i odpływ skroplin — bo to w stojącej wodzie w tacce najczęściej zaczyna się problem.',
        ],
      },
      {
        naglowek: 'Jak często czyścić klimatyzację',
        tresc: [
          'W mieszkaniu i biurze wystarczy raz w roku, najlepiej wiosną, przed sezonem chłodzenia.',
          'W gastronomii, gabinetach zabiegowych i pomieszczeniach o dużym zapyleniu zalecamy dwa razy w roku.',
          'Filtry siatkowe to osobna sprawa — te użytkownik powinien myć samodzielnie co dwa do czterech tygodni w sezonie. Pokazujemy, jak to robić, przy każdym montażu.',
        ],
      },
      {
        naglowek: 'Po czym poznać, że czas na czyszczenie',
        tresc: [
          'Stęchły lub kwaśny zapach w pierwszych minutach po uruchomieniu.',
          'Nasilenie objawów alergicznych u domowników przy włączonej klimatyzacji.',
          'Widoczny nalot na lamelach jednostki wewnętrznej albo w kratce nawiewu.',
          'Słabszy nawiew mimo tych samych ustawień — zabrudzone filtry i parownik dławią przepływ powietrza.',
        ],
      },
    ],
    cechy: [
      'Dezynfekcja i odgrzybianie metodą ultradźwiękową',
      'Czyszczenie parownika, tacki i odpływu skroplin',
      'Mycie lub wymiana filtrów',
      'Bez demontażu jednostki wewnętrznej',
      'Możliwość połączenia z przeglądem okresowym',
    ],
    faq: [
      {
        q: 'Czy po odgrzybianiu zapach wraca?',
        a: 'Jeśli przyczyną był zabrudzony parownik, zapach znika. Wraca wtedy, gdy woda stale zalega w tacce albo odpływ jest źle wyprofilowany — to sprawdzamy przy każdym zabiegu.',
      },
      {
        q: 'Czy mogę odgrzybić klimatyzację samodzielnie sprayem ze sklepu?',
        a: 'Spray dociera do powierzchni, nie w głąb parownika, i zwykle maskuje zapach na kilka dni. Nie usuwa przyczyny.',
      },
      {
        q: 'Ile trwa czyszczenie klimatyzacji?',
        a: 'Pojedyncza jednostka to zwykle od trzydziestu do sześćdziesięciu minut razem z czyszczeniem filtrów i odpływu.',
      },
    ],
    powiazane: ['serwis-klimatyzacji-raciborz', 'wentylacja-raciborz', 'klimatyzacja-raciborz'],
  },

  {
    slug: 'nabijanie-klimatyzacji-raciborz',
    fraza: 'nabijanie klimatyzacji racibórz',
    tytul: 'Nabijanie klimatyzacji Racibórz — czynnik chłodniczy | Alaska',
    opis: 'Nabijanie klimatyzacji i uzupełnianie czynnika chłodniczego w Raciborzu. Najpierw szukamy wycieku, potem napełniamy. Uprawnienia F-gazowe. Tel. 607 044 336.',
    h1: 'Nabijanie klimatyzacji Racibórz',
    lead: 'Uzupełniamy czynnik chłodniczy w klimatyzacji domowej, biurowej i przemysłowej — ale najpierw znajdujemy przyczynę ubytku.',
    ikona: 'fa-gauge-high',
    wstep: [
      'Układ chłodniczy jest zamknięty. W prawidłowo wykonanej instalacji czynnik nie zużywa się i nie odparowuje — jeśli go ubyło, gdzieś ucieka. Dlatego samo nabicie bez znalezienia nieszczelności to wydatek, który wróci za kilka miesięcy, a przy okazji szkodzi środowisku.',
      'U nas kolejność jest odwrotna niż u wielu: najpierw pomiar szczelności i lokalizacja wycieku, potem naprawa, a dopiero na końcu napełnienie układu. Mamy uprawnienia F-gazowe i odzyskujemy czynnik zgodnie z przepisami, zamiast wypuszczać go do atmosfery.',
    ],
    sekcje: [
      {
        naglowek: 'Skąd wiadomo, że ubyło czynnika',
        tresc: [
          'Klimatyzacja chłodzi wyraźnie słabiej niż w poprzednim sezonie, mimo tych samych ustawień.',
          'Na przyłączach jednostki zewnętrznej albo na rurze ssawnej pojawia się szron lub lód.',
          'Urządzenie pracuje bez przerwy i nie osiąga zadanej temperatury.',
          'Sterownik zgłasza błąd niskiego ciśnienia — nowsze modele potrafią wykryć ubytek same.',
        ],
      },
      {
        naglowek: 'Jak przebiega nabijanie układu',
        tresc: [
          'Pomiar ciśnień i ocena stanu układu. Sprawdzamy, ile czynnika zostało i czy problem na pewno leży w jego ilości.',
          'Lokalizacja nieszczelności — detektorem elektronicznym, próbą ciśnieniową lub, przy trudnych przypadkach, barwnikiem UV.',
          'Naprawa miejsca wycieku: lutowanie, wymiana odcinka instalacji albo uszczelnienie połączenia kielichowego.',
          'Próżniowanie układu, które usuwa wilgoć i powietrze, a następnie napełnienie odważoną ilością czynnika zgodnie z dokumentacją urządzenia.',
        ],
      },
      {
        naglowek: 'Czynniki chłodnicze, którymi pracujemy',
        tresc: [
          'Obsługujemy układy na R32 i R410A, które przeważają w klimatyzacji domowej i biurowej, oraz czynniki stosowane w chłodnictwie przemysłowym.',
          'Starsze instalacje bywają napełnione czynnikami wycofanymi z obrotu. W takim przypadku mówimy wprost, czy opłaca się przezbrojenie układu, czy rozsądniej wymienić urządzenie — zamiast utrzymywać przy życiu sprzęt, którego serwis będzie coraz droższy.',
        ],
      },
    ],
    cechy: [
      'Lokalizacja wycieku przed napełnieniem układu',
      'Detekcja elektroniczna, próba ciśnieniowa i barwnik UV',
      'Próżniowanie i napełnianie odważoną ilością czynnika',
      'Obsługa R32, R410A i czynników przemysłowych',
      'Odzysk czynnika zgodny z przepisami F-gazowymi',
    ],
    faq: [
      {
        q: 'Czy można tylko dobić czynnik, bez szukania wycieku?',
        a: 'Technicznie tak, ale nie polecamy i mówimy o tym wprost. Czynnik uciekł przez nieszczelność i ucieknie znowu — zwykle w ciągu jednego sezonu.',
      },
      {
        q: 'Ile czynnika potrzebuje klimatyzacja?',
        a: 'Zależy od modelu i długości instalacji. Producent podaje napełnienie fabryczne oraz dodatek na każdy metr trasy powyżej długości standardowej — napełniamy wagowo, zgodnie z tą dokumentacją.',
      },
      {
        q: 'Czy ubytek czynnika jest groźny dla urządzenia?',
        a: 'Tak. Praca przy niedoborze czynnika obciąża sprężarkę, a jej wymiana jest jednym z najdroższych możliwych napraw.',
      },
    ],
    powiazane: ['serwis-klimatyzacji-raciborz', 'chlodnictwo-przemyslowe-raciborz', 'klimatyzacja-raciborz'],
  },

  {
    slug: 'pompy-ciepla-raciborz',
    fraza: 'pompy ciepła racibórz',
    tytul: 'Pompy ciepła Racibórz — montaż i serwis | Alaska',
    opis: 'Pompy ciepła powietrze-woda w Raciborzu: dobór, montaż, serwis i pomoc w dofinansowaniu z programu Czyste Powietrze. Tel. 607 044 336.',
    h1: 'Pompy ciepła Racibórz',
    lead: 'Dobieramy i montujemy pompy ciepła powietrze-woda. Pomagamy przejść przez dokumentację programu Czyste Powietrze.',
    ikona: 'fa-leaf',
    wstep: [
      'Pompa ciepła nie wytwarza ciepła — przenosi je z powietrza zewnętrznego do instalacji grzewczej budynku. Dlatego z jednej kilowatogodziny prądu potrafi zrobić trzy do czterech kilowatogodzin ciepła, czego żaden kocioł nie osiągnie.',
      'To zarazem urządzenie, które najbardziej ze wszystkich karze za zły dobór. Pompa dopasowana do nieocieplonego budynku będzie pracować na grzałce i rachunki wyjdą wyższe niż przy kotle gazowym. Dlatego zaczynamy od rozmowy o budynku, a nie o modelu urządzenia — i czasem mówimy, że najpierw warto zrobić coś innego.',
    ],
    sekcje: [
      {
        naglowek: 'Kiedy pompa ciepła ma sens',
        tresc: [
          'Budynek jest ocieplony, a okna nie są najsłabszym punktem. Im mniejsze straty ciepła, tym niższa temperatura zasilania i tym taniej pracuje pompa.',
          'Instalacja grzewcza pracuje na niskiej temperaturze. Najlepiej ogrzewanie podłogowe, dobrze też odpowiednio dobrane grzejniki o powiększonej powierzchni.',
          'Jest miejsce na jednostkę zewnętrzną w odległości od okien sypialni — pompa pracuje ciszej niż kiedyś, ale nie bezgłośnie.',
          'Jeśli któryś z tych warunków nie jest spełniony, rozważamy układ hybrydowy: pompa pokrywa większość sezonu, kocioł wchodzi przy największych mrozach.',
        ],
      },
      {
        naglowek: 'Pompa ciepła a ogrzewanie podłogowe',
        tresc: [
          'Ogrzewanie podłogowe pracuje na temperaturze zasilania rzędu 30–35°C, podczas gdy klasyczne grzejniki potrzebują 50–70°C. Dla pompy ciepła to zasadnicza różnica: im niższa temperatura zasilania, tym wyższa sprawność i niższy rachunek.',
          'Połączenie pompy ciepła z podłogówką jest więc układem, w którym oba elementy dobrze się uzupełniają. W budynkach z grzejnikami też da się to zrobić, ale wymaga sprawdzenia, czy istniejące grzejniki oddadzą potrzebną moc przy niższej temperaturze.',
        ],
      },
      {
        naglowek: 'Dofinansowanie Czyste Powietrze',
        doPotwierdzenia: true,
        tresc: [
          'Wymiana kotła na paliwo stałe na pompę ciepła jest objęta dofinansowaniem z programu Czyste Powietrze. Wysokość wsparcia zależy od dochodu gospodarstwa domowego i zakresu prac.',
          'Pomagamy skompletować dokumentację: dobór urządzenia z wymaganymi parametrami, zaświadczenia i dokumenty rozliczeniowe. Zasady programu bywają zmieniane, więc aktualny zakres i progi potwierdzamy na etapie wyceny.',
        ],
      },
    ],
    cechy: [
      'Pompy ciepła powietrze-woda uznanych producentów',
      'Modernizacja kotłowni i układy hybrydowe',
      'Integracja z instalacją fotowoltaiczną',
      'Pomoc w dokumentacji programu Czyste Powietrze',
      'Serwis i monitoring pracy układu po montażu',
    ],
    faq: [
      {
        q: 'Czy pompa ciepła działa przy dużym mrozie?',
        a: 'Tak, pompy powietrze-woda pracują także przy temperaturach ujemnych, choć ich sprawność wtedy spada. W budynkach o większych stratach ciepła stosujemy układ hybrydowy z kotłem jako wsparciem przy największych mrozach.',
      },
      {
        q: 'Czy pompa ciepła nadaje się do starego domu?',
        a: 'Zależy od stanu izolacji i instalacji grzewczej. W nieocieplonym budynku z grzejnikami wysokotemperaturowymi pompa będzie pracować drogo — w takim przypadku mówimy o tym wprost przed podpisaniem umowy.',
      },
      {
        q: 'Czy serwisujecie pompy ciepła zamontowane przez kogoś innego?',
        a: 'Tak, prowadzimy przeglądy i naprawy pomp ciepła niezależnie od tego, kto je montował.',
      },
    ],
    powiazane: ['klimatyzacja-raciborz', 'wentylacja-raciborz', 'serwis-klimatyzacji-raciborz'],
  },

  {
    slug: 'wentylacja-raciborz',
    fraza: 'wentylacja racibórz',
    tytul: 'Wentylacja i rekuperacja Racibórz | Alaska',
    opis: 'Wentylacja mechaniczna z odzyskiem ciepła, oczyszczacze powietrza i filtry HEPA w Raciborzu. Pomiary jakości powietrza. Tel. 607 044 336.',
    h1: 'Wentylacja i rekuperacja Racibórz',
    lead: 'Systemy wentylacji mechanicznej z odzyskiem ciepła, oczyszczacze powietrza i pomiary jakości powietrza w pomieszczeniach.',
    ikona: 'fa-virus-slash',
    wstep: [
      'Klimatyzacja chłodzi powietrze, które już jest w pomieszczeniu. Wentylacja je wymienia — i to ona decyduje o tym, czy w domu jest świeżo, czy duszno. W szczelnym, nowoczesnym budynku wentylacja grawitacyjna często przestaje działać, bo nie ma czym napływać powietrzu.',
      'Rekuperacja rozwiązuje to bez otwierania okien zimą: wymiennik odbiera ciepło z powietrza usuwanego i oddaje je powietrzu świeżemu. Do tego dochodzi filtracja, która zatrzymuje pyły PM2,5 i pyłki — w sezonie grzewczym na Śląsku to argument sam w sobie.',
    ],
    sekcje: [
      {
        naglowek: 'Rekuperacja — wentylacja z odzyskiem ciepła',
        tresc: [
          'Centrala rekuperacyjna nawiewa świeże powietrze do pokoi i sypialni, a usuwa je z kuchni, łazienek i pomieszczeń gospodarczych. Oba strumienie mijają się w wymienniku, nie mieszając się ze sobą.',
          'Odzysk ciepła sięga kilkudziesięciu procent, więc świeże powietrze wpada do domu już ogrzane. Zimą nie trzeba wybierać między wietrzeniem a rachunkiem za ogrzewanie.',
          'Instalację najłatwiej wykonać na etapie budowy lub głębokiego remontu, gdy da się poprowadzić kanały w stropie lub w warstwie posadzki.',
        ],
      },
      {
        naglowek: 'Oczyszczacze powietrza',
        tresc: [
          'Tam, gdzie kanałów poprowadzić się nie da, sensownym rozwiązaniem są oczyszczacze z filtrem HEPA i węglem aktywnym — zatrzymują pyły zawieszone, pyłki i część zapachów.',
          'Dobieramy urządzenie do kubatury pomieszczenia. Oczyszczacz o zbyt małej wydajności w dużym salonie daje głównie spokój sumienia, a nie czystsze powietrze.',
          'Część modeli ma funkcję nawilżania, co bywa istotne w sezonie grzewczym, gdy wilgotność w mieszkaniach spada poniżej komfortowego poziomu.',
        ],
      },
      {
        naglowek: 'Pomiary jakości powietrza',
        tresc: [
          'Zanim doradzimy rozwiązanie, możemy zmierzyć, co faktycznie dzieje się w pomieszczeniu: stężenie pyłów, poziom dwutlenku węgla i wilgotność.',
          'To często zmienia decyzję. Wysoki poziom CO₂ oznacza, że brakuje wymiany powietrza i żaden oczyszczacz tego nie naprawi — potrzebna jest wentylacja.',
        ],
      },
    ],
    cechy: [
      'Systemy rekuperacji dla domów jednorodzinnych',
      'Wentylacja mechaniczna dla lokali usługowych',
      'Oczyszczacze powietrza z filtrem HEPA i węglem aktywnym',
      'Pomiary stężenia pyłów, CO₂ i wilgotności',
      'Doradztwo w zakresie poprawy mikroklimatu',
    ],
    faq: [
      {
        q: 'Czy rekuperację można zamontować w istniejącym domu?',
        a: 'Tak, choć trudniej niż na etapie budowy. Stosuje się wtedy kanały prowadzone w zabudowie sufitowej albo systemy rozprowadzenia o małym przekroju.',
      },
      {
        q: 'Czy rekuperacja zastępuje klimatyzację?',
        a: 'Nie. Rekuperacja wymienia powietrze i odzyskuje ciepło, ale nie schładza budynku w upał. To rozwiązania uzupełniające się, nie zamienne.',
      },
      {
        q: 'Czy oczyszczacz powietrza pomaga przy alergii?',
        a: 'Przy alergii na pyłki i roztocza filtr HEPA realnie obniża stężenie alergenów w pomieszczeniu. Warunkiem jest dobranie wydajności do kubatury i regularna wymiana filtrów.',
      },
    ],
    powiazane: ['czyszczenie-klimatyzacji-raciborz', 'pompy-ciepla-raciborz', 'klimatyzacja-raciborz'],
  },

  {
    slug: 'wypozyczalnia-klimatyzatorow-raciborz',
    fraza: 'wypożyczalnia klimatyzatorów racibórz',
    tytul: 'Wypożyczalnia klimatyzatorów Racibórz | Alaska',
    opis: 'Wynajem klimatyzatorów przenośnych w Raciborzu — od 3,5 do 15 kW. Eventy, biura, serwerownie. Transport i uruchomienie. Tel. 607 044 336.',
    h1: 'Wypożyczalnia klimatyzatorów Racibórz',
    lead: 'Wynajem klimatyzatorów przenośnych o dużej wydajności — na upał, event, remont serwerowni albo na próbę przed stałym montażem.',
    ikona: 'fa-box-open',
    wstep: [
      'Nie każdy problem z temperaturą wymaga stałej instalacji. Wesele w namiocie, konferencja, awaria klimatyzacji w serwerowni, dwa tygodnie upału w wynajmowanym biurze — w takich sytuacjach klimatyzator przenośny rozwiązuje sprawę w kilka minut i bez ingerencji w budynek.',
      'Dysponujemy urządzeniami od 3,5 do 15 kW mocy chłodniczej. Dowozimy, ustawiamy, montujemy rurę odprowadzającą ciepłe powietrze i pokazujemy obsługę. Po zakończeniu wynajmu odbieramy sprzęt.',
    ],
    sekcje: [
      {
        naglowek: 'Kiedy wynajem wygrywa z zakupem',
        tresc: [
          'Imprezy okolicznościowe i eventy — wesela w namiotach, konferencje, imprezy plenerowe, gdzie chłodzenie potrzebne jest przez jeden lub kilka dni.',
          'Awaria stałej instalacji — urządzenie zastępcze pozwala przetrwać do naprawy bez przerywania pracy biura czy sklepu.',
          'Serwerownie i pomieszczenia techniczne, w których temperatura na krótko wymknęła się spod kontroli.',
          'Lokal wynajmowany, w którym nie wolno ingerować w elewację, a stały montaż nie wchodzi w grę.',
          'Sprawdzenie przed decyzją — kilka dni z urządzeniem przenośnym pokazuje, jak bardzo chłodzenie jest potrzebne i jakiej mocy.',
        ],
      },
      {
        naglowek: 'Jak to działa',
        tresc: [
          'Ustalamy kubaturę pomieszczenia i czas wynajmu, a na tej podstawie dobieramy moc urządzenia.',
          'Dostarczamy sprzęt, ustawiamy go i wyprowadzamy rurę z ciepłym powietrzem — przez okno, kratkę albo przygotowany otwór. To najważniejszy element: bez wyprowadzenia ciepła na zewnątrz klimatyzator przenośny nie schłodzi pomieszczenia.',
          'Szkolimy z obsługi i zostawiamy kontakt na wypadek pytań w trakcie wynajmu.',
          'Wynajem prowadzimy krótko- i długoterminowo. Przy dłuższym okresie sprzęt można po sezonie wykupić.',
        ],
      },
    ],
    cechy: [
      'Klimatyzatory przenośne od 3,5 do 15 kW',
      'Wynajem krótko- i długoterminowy',
      'Urządzenie gotowe do pracy w kilka minut',
      'Obsługa eventów, wesel i namiotów',
      'Możliwość wykupu sprzętu po sezonie',
    ],
    faq: [
      {
        q: 'Czy klimatyzator przenośny wymaga montażu?',
        a: 'Nie wymaga prac instalacyjnych, ale trzeba wyprowadzić rurę z ciepłym powietrzem na zewnątrz. Robimy to przy dostawie.',
      },
      {
        q: 'Na jak długo można wynająć klimatyzator?',
        a: 'Od jednego dnia do całego sezonu. Przy dłuższym wynajmie ustalamy warunki indywidualnie, z możliwością wykupu sprzętu.',
      },
      {
        q: 'Jaką moc wybrać na wesele w namiocie?',
        a: 'Zależy od wielkości namiotu, liczby gości i nasłonecznienia. Podaj nam te dane telefonicznie, a dobierzemy liczbę i moc urządzeń.',
      },
    ],
    powiazane: ['klimatyzacja-raciborz', 'montaz-klimatyzacji-raciborz', 'chlodnictwo-przemyslowe-raciborz'],
  },

  {
    slug: 'chlodnictwo-przemyslowe-raciborz',
    fraza: 'chłodnictwo przemysłowe racibórz',
    tytul: 'Chłodnictwo przemysłowe Racibórz — komory chłodnicze | Alaska',
    opis: 'Komory chłodnicze i mroźnicze, agregaty i instalacje chłodnicze dla gastronomii, handlu i przemysłu w Raciborzu. Serwis 24/7. Tel. 607 044 336.',
    h1: 'Chłodnictwo przemysłowe Racibórz',
    lead: 'Projektujemy i budujemy komory chłodnicze i mroźnicze. Serwisujemy agregaty Bitzer i Danfoss. Przy awarii jesteśmy dostępni całą dobę.',
    ikona: 'fa-temperature-arrow-down',
    wstep: [
      'Chłodnictwo przemysłowe rządzi się inną logiką niż klimatyzacja. Tutaj przestój nie oznacza dyskomfortu, tylko zepsuty towar — dlatego liczy się nie tylko dobry projekt, ale i to, jak szybko ktoś odbierze telefon w niedzielę o drugiej w nocy.',
      'Obsługujemy gastronomię, handel i przemysł spożywczy w Raciborzu i regionie od 1997 roku. Budujemy komory chłodnicze i mroźnicze na wymiar, oparte na komponentach Bitzer i Danfoss, i prowadzimy ich serwis gwarancyjny oraz pogwarancyjny.',
    ],
    sekcje: [
      {
        naglowek: 'Komory chłodnicze i mroźnicze na wymiar',
        tresc: [
          'Projektujemy komorę pod konkretne pomieszczenie i konkretny towar. Inaczej dobiera się układ do warzyw, inaczej do mięsa, a jeszcze inaczej do mrożonek przechowywanych w −25°C.',
          'Wykonujemy zabudowę z płyty warstwowej, montujemy drzwi chłodnicze, parowniki, agregaty skraplające i automatykę sterującą.',
          'Dobieramy moc z zapasem na obciążenie szczytowe, ale bez przewymiarowania — agregat pracujący ciągle krótkimi cyklami zużywa się szybciej i kosztuje więcej w eksploatacji.',
        ],
      },
      {
        naglowek: 'Instalacje dla sklepów i gastronomii',
        tresc: [
          'Meble chłodnicze, witryny, szafy i stoły chłodnicze — dobór, montaż i podłączenie do instalacji centralnej lub agregatów lokalnych.',
          'Układy z agregatem wyniesionym poza salę sprzedaży, dzięki czemu hałas i ciepło nie trafiają do pomieszczenia, w którym są klienci.',
          'Systemy schładzania procesowego tam, gdzie chłód jest częścią produkcji, a nie tylko przechowywania.',
        ],
      },
      {
        naglowek: 'Serwis i przeglądy okresowe',
        tresc: [
          'Prowadzimy przeglądy okresowe agregatów i instalacji chłodniczych oraz kontrole szczelności wymagane przepisami o czynnikach fluorowanych.',
          'Dla klientów z umową serwisową jesteśmy dostępni przy awarii całą dobę. W chłodnictwie to nie jest dodatek do oferty — to jej sens.',
          'Naprawiamy agregaty, wymieniamy sprężarki, usuwamy nieszczelności i odbudowujemy automatykę sterującą.',
        ],
      },
    ],
    cechy: [
      'Komory chłodnicze i mroźnicze na wymiar',
      'Agregaty skraplające i sprężarki przemysłowe',
      'Instalacje chłodnicze dla sklepów i hurtowni',
      'Systemy schładzania procesowego',
      'Przeglądy okresowe i serwis 24/7 przy umowie serwisowej',
    ],
    faq: [
      {
        q: 'Czy budujecie komory chłodnicze na wymiar?',
        a: 'Tak. Komorę projektujemy pod konkretne pomieszczenie, temperaturę pracy i rodzaj przechowywanego towaru.',
      },
      {
        q: 'Jak szybko reagujecie na awarię w chłodnictwie?',
        a: 'Klienci z umową serwisową mają dostęp do serwisu całą dobę. Pozostałych obsługujemy w pierwszym możliwym terminie, traktując awarie chłodnicze priorytetowo.',
      },
      {
        q: 'Czy obsługujecie agregaty innych producentów?',
        a: 'Tak. Pracujemy przede wszystkim na komponentach Bitzer i Danfoss, ale serwisujemy również instalacje oparte na innych markach.',
      },
    ],
    powiazane: ['nabijanie-klimatyzacji-raciborz', 'serwis-klimatyzacji-raciborz', 'wentylacja-raciborz'],
  },
];

export const znajdzUsluge = (slug) => uslugi.find((u) => u.slug === slug);

export default uslugi;
