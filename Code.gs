/**
 * =====================================================
 * ALASKA – Realizacje (galeria zarządzana przez operatora)
 * Google Apps Script v1.0
 * =====================================================
 * WDROŻENIE (jednorazowo):
 * 1. Wejdź na https://script.google.com (konto: cichonmariusz06@gmail.com)
 * 2. Nowy projekt → wklej CAŁY ten kod (zastąp domyślny)
 * 3. Uruchom raz funkcję "initSheet" (▶ Uruchom) — utworzy Arkusz i zwróci jego ID.
 *    - Zezwól na uprawnienia gdy poprosi.
 * 4. Wdróż → Nowe wdrożenie → typ: Aplikacja internetowa
 *    - Uruchamiaj jako: Ja (właściciel)
 *    - Kto ma dostęp: Wszyscy
 * 5. Skopiuj URL wdrożenia (kończy się na /exec) i wklej go:
 *    - w pliku src/config.js  (API_URL)
 *    - w pliku public/panel/index.html (API_URL)
 * 6. Ustaw hasło panelu: wpisz je w funkcji ustawKlucz() poniżej i uruchom ją raz.
 * =====================================================
 */

const CONFIG = {
  SHEET_NAME: 'Realizacje',
  FOLDER_NAME: 'Alaska - Realizacje',
  // ID arkusza uzupełni się automatycznie po uruchomieniu initSheet (albo wklej ręcznie)
  SPREADSHEET_ID: ''
};

// =====================================================
// HELPERS
// =====================================================
function jsonOK(data)  { return ContentService.createTextOutput(JSON.stringify({ ok: true, data })).setMimeType(ContentService.MimeType.JSON); }
function jsonErr(msg)   { return ContentService.createTextOutput(JSON.stringify({ ok: false, error: msg })).setMimeType(ContentService.MimeType.JSON); }

function ss() {
  const id = CONFIG.SPREADSHEET_ID || PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!id) throw new Error('Brak SPREADSHEET_ID — uruchom najpierw initSheet');
  return SpreadsheetApp.openById(id);
}
function getSheet() {
  const s = ss().getSheetByName(CONFIG.SHEET_NAME);
  if (!s) throw new Error('Brak arkusza: ' + CONFIG.SHEET_NAME);
  return s;
}

// =====================================================
// INICJALIZACJA (uruchom raz)
// =====================================================
function initSheet() {
  let id = CONFIG.SPREADSHEET_ID || PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  let spreadsheet;
  if (id) {
    spreadsheet = SpreadsheetApp.openById(id);
  } else {
    spreadsheet = SpreadsheetApp.create('Alaska - Realizacje');
    id = spreadsheet.getId();
    PropertiesService.getScriptProperties().setProperty('SHEET_ID', id);
  }
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
    sheet.setName(CONFIG.SHEET_NAME);
  }
  const headers = ['ID','FileId','Url','Tytul','Opis','Data'];
  if (!sheet.getRange(1,1).getValue()) {
    sheet.getRange(1,1,1,headers.length).setValues([headers]);
    sheet.getRange(1,1,1,headers.length).setBackground('#0a1628').setFontColor('#fff').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return jsonOK({ msg: 'Arkusz gotowy', SPREADSHEET_ID: id, url: spreadsheet.getUrl() });
}

// =====================================================
// BEZPIECZEŃSTWO — hasło do panelu
// =====================================================
const PUBLIC_ACTIONS = ['test','getRealizacje'];

function getSecret() { return PropertiesService.getScriptProperties().getProperty('PANEL_SECRET') || ''; }

// ⬇️ USTAW HASŁO PANELU: wpisz je poniżej i uruchom ustawKlucz() raz.
function ustawKlucz() {
  const MOJE_HASLO = 'WPISZ-TUTAJ-HASLO';
  PropertiesService.getScriptProperties().setProperty('PANEL_SECRET', MOJE_HASLO);
  return 'Hasło ustawione. Wpisz to samo hasło logując się do panelu.';
}

// ⬇️ USTAW KLUCZ GEMINI (AI): wklej klucz z aistudio.google.com i uruchom raz.
function ustawGeminiKey() {
  const GEMINI_KEY = 'WKLEJ-TUTAJ-KLUCZ-GEMINI';
  PropertiesService.getScriptProperties().setProperty('GEMINI_API_KEY', GEMINI_KEY);
  return 'Klucz Gemini ustawiony.';
}

function checkAuth(action, key) {
  if (PUBLIC_ACTIONS.indexOf(action) > -1) return true;
  const secret = getSecret();
  if (!secret) return true; // dopóki hasło nie ustawione — działa otwarcie
  return key === secret;
}

// =====================================================
// HANDLERY
// =====================================================
function doGet(e) {
  try {
    const action = e.parameter.action;
    if (!checkAuth(action, e.parameter.key)) return jsonErr('Brak autoryzacji');
    switch (action) {
      case 'getRealizacje': return getRealizacje();
      case 'init':          return initSheet();
      case 'test':          return jsonOK({ msg: 'Alaska Realizacje API działa!' });
      default:              return jsonErr('Nieznana akcja: ' + action);
    }
  } catch(err) { return jsonErr(err.toString()); }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!checkAuth(data.action, data.key)) return jsonErr('Brak autoryzacji');
    switch (data.action) {
      case 'uploadRealizacja': return uploadRealizacja(data);
      case 'updateRealizacja': return updateRealizacja(data);
      case 'deleteRealizacja': return deleteRealizacja(data);
      case 'generateOpis':     return generateOpis(data);
      default:                 return jsonErr('Nieznana akcja: ' + data.action);
    }
  } catch(err) { return jsonErr(err.toString()); }
}

// =====================================================
// DRIVE
// =====================================================
function getFolder() {
  const it = DriveApp.getFoldersByName(CONFIG.FOLDER_NAME);
  if (it.hasNext()) return it.next();
  const f = DriveApp.createFolder(CONFIG.FOLDER_NAME);
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return f;
}

// =====================================================
// REALIZACJE
// =====================================================
function uploadRealizacja(data) {
  if (!data.imageBase64) return jsonErr('Brak zdjęcia');
  const base64 = data.imageBase64.replace(/^data:image\/\w+;base64,/, '');
  const ct = data.contentType || 'image/jpeg';
  const ext = ct.indexOf('png') > -1 ? 'png' : (ct.indexOf('webp') > -1 ? 'webp' : 'jpg');
  const blob = Utilities.newBlob(Utilities.base64Decode(base64), ct, 'realizacja-' + Date.now() + '.' + ext);

  const file = getFolder().createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  const fileId = file.getId();
  const url = 'https://drive.google.com/thumbnail?id=' + fileId + '&sz=w1200';

  const sheet = getSheet();
  const id = 'R-' + Date.now();
  const dataStr = Utilities.formatDate(new Date(), 'Europe/Warsaw', 'yyyy-MM-dd');
  sheet.appendRow([id, fileId, url, data.tytul || '', data.opis || '', dataStr]);
  return jsonOK({ id, url });
}

function getRealizacje() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i][0]) continue;
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = rows[i][idx]; });
    result.push(obj);
  }
  result.reverse(); // najnowsze pierwsze
  return jsonOK(result);
}

function updateRealizacja(data) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      if (data.tytul !== undefined) sheet.getRange(i+1, 4).setValue(data.tytul);
      if (data.opis  !== undefined) sheet.getRange(i+1, 5).setValue(data.opis);
      return jsonOK('Zaktualizowano');
    }
  }
  return jsonErr('Nie znaleziono: ' + data.id);
}

function deleteRealizacja(data) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][0] === data.id) {
      try { DriveApp.getFileById(rows[i][1]).setTrashed(true); } catch(e) {}
      sheet.deleteRow(i + 1);
      return jsonOK('Usunięto');
    }
  }
  return jsonErr('Nie znaleziono: ' + data.id);
}

// =====================================================
// AI — generowanie opisu SEO (Google Gemini)
// =====================================================
function generateOpis(data) {
  const key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!key) return jsonErr('Brak klucza Gemini — uruchom ustawGeminiKey');

  const tytul = (data.tytul || '').toString().slice(0, 300);
  const notatki = (data.notatki || '').toString().slice(0, 800);

  const prompt =
    'Jesteś copywriterem SEO firmy ALASKA — klimatyzacja, chłodnictwo i pompy ciepła w Raciborzu (woj. śląskie), działającej od 1997 roku. '
    + 'Na podstawie poniższych notatek napisz JEDEN opis realizacji na stronę internetową w galerii "Realizacje". '
    + 'Wymagania: język polski, 2-4 zdania, ton profesjonalny i konkretny, naturalnie wpleć frazy lokalne (Racibórz, Śląsk) oraz branżowe (montaż klimatyzacji, serwis, marka urządzenia jeśli podano). '
    + 'Bez zmyślania szczegółów, bez emotikonów, bez formatowania markdown, bez nagłówków — sam tekst opisu.\n\n'
    + 'Tytuł realizacji: ' + (tytul || '(brak)') + '\n'
    + 'Notatki operatora: ' + (notatki || '(brak)');

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(key);
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 600, thinkingConfig: { thinkingBudget: 0 } }
  };

  try {
    const res = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    const code = res.getResponseCode();
    const body = JSON.parse(res.getContentText());
    if (code !== 200) return jsonErr('Gemini błąd ' + code + ': ' + (body.error && body.error.message || ''));
    const text = body.candidates && body.candidates[0] && body.candidates[0].content
      && body.candidates[0].content.parts && body.candidates[0].content.parts[0].text;
    if (!text) return jsonErr('Gemini nie zwrócił tekstu');
    // Usuń ewentualnie doklejony na górze tytuł (model czasem powtarza go jako nagłówek)
    let out = text.trim();
    const t = (tytul || '').trim();
    if (t && out.toLowerCase().indexOf(t.toLowerCase()) === 0) {
      out = out.slice(t.length).replace(/^[\s:–—-]+/, '').trim();
    }
    return jsonOK({ opis: out });
  } catch(err) {
    return jsonErr('Gemini wyjątek: ' + err.toString());
  }
}
