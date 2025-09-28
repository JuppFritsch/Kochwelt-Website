document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('portionInput');
  const button = document.getElementById('portionButton');
  const listEl = document.getElementById('zutatenListe');
  const messageEl = document.querySelector('.portionMessageCurrywurst');

  if (!input || !button || !listEl) {
    console.error('Portion-Script: fehlende Elemente (input/button/zutatenListe).');
    return;
  }

  // Li-Elemente + Originaltexte speichern (kein späteres "Verfälschen")
  const liEls = Array.from(listEl.querySelectorAll('li'));
  const originalTexts = liEls.map(li => li.textContent.trim());

  // Initiale Portionszahl zum Verhältnis: originalNumbers gelten für diese Anzahl
  const initialPortions = Number(input.value) || 1;

  const clamp = v => Math.max(1, Math.min(20, Math.floor(v)));

  function formatNumberForDisplay(n) {
    // ganze Zahlen ohne Dezimalstelle, sonst bis 2 Nachkommastellen, deutsche Komma
    if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
    const rounded = Math.round(n * 100) / 100;
    // ersetze Punkt mit Komma für DE-Format
    return String(rounded).replace('.', ',');
  }

  function updateZutaten() {
    let portions = Number(input.value);
    if (!Number.isFinite(portions)) portions = initialPortions;
    portions = clamp(portions);
    input.value = portions; // korrigiere Input falls außerhalb der Grenzen

    // leere Fehlermeldung
    if (messageEl) messageEl.textContent = '';

    liEls.forEach((li, idx) => {
      const original = originalTexts[idx] || '';
      // finde die erste Zahl in der Zeile (inkl. Dezimaltrennzeichen)
      const match = original.match(/(\d+[.,]?\d*)/);
      if (!match) {
        // keine Zahl -> unverändert
        li.textContent = original;
        return;
      }

      const baseNum = parseFloat(match[1].replace(',', '.'));
      // skaliere relativ zur initialen Portionszahl (vermeidet Annahmen)
      const scaled = (baseNum / initialPortions) * portions;
      const scaledStr = formatNumberForDisplay(scaled);
      // nur die erste Zahl ersetzen (sicherer Ersatz)
      li.textContent = original.replace(match[1], scaledStr);
    });
  }

  // initial aufbauen
  updateZutaten();

  // Events: Klick, Enter, Change
  button.addEventListener('click', updateZutaten);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateZutaten();
    }
  });
  input.addEventListener('change', updateZutaten);
});
