# Deploy alaskarp.pl -> home.pl (WinSCP, FTP)
# Wzorowane na "Hola Perros"/deploy.ps1.
# Haslo pobierane W LOCIE z zapisanej sesji FileZilli - brak sekretow w repo.
#
# Uzycie:
#   npm run build:deploy                                          # build + PRERENDER
#   powershell -ExecutionPolicy Bypass -File deploy.ps1 -Lista    # pokaz, co poleci
#   powershell -ExecutionPolicy Bypass -File deploy.ps1           # wysylka
#
# WAZNE 1: wysylaj po `build:deploy`, nie po samym `build`. Bez prerenderu
# bot bez JavaScriptu dostaje pusty <div id="root"> i zero znakow tresci.
# Skrypt to sprawdza i przerywa, jesli tresci brak.
#
# WAZNE 2: docroot home.pl to /public_html, NIE /. W katalogu / tez leza pliki,
# ale domena serwuje z public_html.
#
# WAZNE 3: `put`, NIE `synchronize`. Na serwerze moga lezec pliki wgrane recznie
# (stary WordPress, /panel), o ktorych repo nie wie - synchronizacja by je skasowala.

param(
  [switch]$Lista,
  [string]$Host_ = 'serwer2068543.home.pl',
  [string]$User = 'alaska@alaskarp.pl',
  [string]$Remote = '/public_html'
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$Dist = "$PSScriptRoot\dist"

# --- Kontrola przed wysylka --------------------------------------------------

if (-not (Test-Path "$Dist\index.html")) { throw 'Brak dist/index.html - najpierw: npm run build:deploy' }
if (-not (Test-Path "$Dist\.htaccess"))  { throw 'Brak dist/.htaccess' }

# Straznik prerenderu
$html = Get-Content "$Dist\index.html" -Raw
if ($html -match '<div id="root"></div>') {
  throw 'dist/index.html ma PUSTY root - prerender nie zostal uruchomiony. Uruchom: npm run build:deploy'
}
if ($html -notmatch '<h1') {
  throw 'dist/index.html nie ma <h1> - prerender sie nie udal. Sprawdz: npm run prerender'
}

$tekst = ($html -replace '(?s)<(script|style)[^>]*>.*?</\1>', ' ') -replace '<[^>]+>', ' '
$tekst = ($tekst -replace '\s+', ' ').Trim()
if ($tekst.Length -lt 2000) {
  throw "dist/index.html ma tylko $($tekst.Length) znakow tresci - prerender niekompletny."
}

# Strony uslugowe musza istniec jako osobne pliki - .htaccess kieruje na nie
# adres /montaz-klimatyzacji-raciborz. Bez pliku zadzialalby fallback na
# powloke z noindex i strona wypadlaby z indeksu.
$uslugi = @(
  'klimatyzacja-raciborz', 'montaz-klimatyzacji-raciborz', 'serwis-klimatyzacji-raciborz',
  'czyszczenie-klimatyzacji-raciborz', 'nabijanie-klimatyzacji-raciborz', 'pompy-ciepla-raciborz',
  'wentylacja-raciborz', 'wypozyczalnia-klimatyzatorow-raciborz', 'chlodnictwo-przemyslowe-raciborz'
)
foreach ($u in $uslugi) {
  $f = "$Dist\$u.html"
  if (-not (Test-Path $f)) { throw "Brak $u.html - prerender nie objal stron uslugowych." }
  $t = Get-Content $f -Raw
  if ($t -notmatch [regex]::Escape("https://alaskarp.pl/$u")) {
    throw "$u.html nie ma wlasnego canonicala - nie wysylam."
  }
}

# Powloka zapasowa dla nieznanych adresow MUSI miec noindex, inaczej kazda
# literowka w adresie wraca do indeksu jako duplikat strony glownej.
if (-not (Test-Path "$Dist\powloka.html")) { throw 'Brak dist/powloka.html - uruchom npm run prerender' }
if ((Get-Content "$Dist\powloka.html" -Raw) -notmatch 'noindex') {
  throw 'powloka.html bez noindex - nie wysylam.'
}

# Panel realizacji to administracja - nie ma czego szukac w Google
$panel = "$Dist\panel\index.html"
if ((Test-Path $panel) -and ((Get-Content $panel -Raw) -notmatch 'noindex')) {
  Write-Host "UWAGA: panel/index.html bez noindex" -ForegroundColor Yellow
}

if ($Lista) {
  Write-Host "Poleci zawartosc dist/ -> ${User}@${Host_}:$Remote" -ForegroundColor Cyan
  Get-ChildItem $Dist -Force | ForEach-Object {
    if ($_.PSIsContainer) {
      $n = (Get-ChildItem $_.FullName -Recurse -File).Count
      "  $($_.Name)\  ($n plikow)"
    } else {
      $kb = [math]::Round($_.Length / 1KB)
      "  $($_.Name)  ($kb KB)"
    }
  }
  Write-Host ""
  Write-Host "Tresc w index.html: $($tekst.Length) znakow (prerender OK)" -ForegroundColor Green
  Write-Host "Stron uslugowych z wlasnym canonicalem: $($uslugi.Count)" -ForegroundColor Green
  return
}

# --- Haslo z zapisanej sesji FileZilli ---------------------------------------
# Czytane tylko do pamieci, przekazywane prosto do WinSCP. Nigdzie nie jest
# wypisywane ani zapisywane na dysk poza tymczasowym skryptem WinSCP.

$sesja = $null
foreach ($plik in @("$env:APPDATA\FileZilla\recentservers.xml", "$env:APPDATA\FileZilla\sitemanager.xml")) {
  if (-not (Test-Path $plik)) { continue }
  [xml]$xml = Get-Content $plik
  $sesja = @($xml.SelectNodes('//Server') | Where-Object {
    $_.Host -eq $Host_ -and $_.User -eq $User -and $_.Pass.'#text'
  })[0]
  if ($sesja) { break }
}
if (-not $sesja) {
  throw "Brak zapisanej sesji ${User}@${Host_} w FileZilli. Polacz sie raz FileZilla z zapamietaniem hasla."
}
$pass = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($sesja.Pass.'#text'))
$passQ = $pass -replace '"', '""'
$userQ = [uri]::EscapeDataString($User)

# --- Skrypt dla WinSCP -------------------------------------------------------

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add('option batch abort')
$lines.Add('option confirm off')
$lines.Add('open ftp://' + $userQ + '@' + $Host_ + ':21 -passive=on -password="' + $passQ + '"')
$lines.Add('cd "' + $Remote + '"')
# Gwiazdka wysyla ZAWARTOSC dist, a nie sam katalog dist. Bez niej powstalby
# /public_html/dist i strona zostalaby stara.
$lines.Add('put "' + $Dist + '\*" "' + $Remote + '/"')
$lines.Add('exit')

Write-Host ">> Wysylka dist/ -> ${Host_}:$Remote ..." -ForegroundColor Cyan

$tmp = "$env:TEMP\ws_alaska.txt"
Set-Content $tmp $lines -Encoding ascii
$log = "$env:TEMP\ws_alaska_out.txt"
cmd /c "`"C:\Program Files (x86)\WinSCP\WinSCP.com`" /script=`"$tmp`" /ini=nul > `"$log`" 2>&1"
$kod = $LASTEXITCODE
Get-Content $log | Select-Object -Last 30
Remove-Item $tmp, $log -Force
if ($kod -ne 0) { throw "WinSCP zakonczyl z kodem $kod" }

Write-Host ""
Write-Host ">> OK - https://alaskarp.pl zaktualizowane." -ForegroundColor Green
Write-Host "   Uwaga: WAF home.pl blokuje IP wlasciciela - sprawdzaj z komorki" -ForegroundColor Yellow
Write-Host "   na danych komorkowych albo przez https://r.jina.ai/https://alaskarp.pl/"
