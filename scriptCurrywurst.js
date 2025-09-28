document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.portionInputCurrywurst');
  const button = document.querySelector('.portionButtonCurrywurst');
  const listEl = document.querySelector('.zutatenListeCurrywurst');

  // Fehlermeldung-Element einmalig anlegen und immer sichtbar halten
  let messageEl = document.querySelector('.portionMessageCurrywurst');
  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.className = 'portionMessageCurrywurst';
    messageEl.style.color = '#d80000';
    messageEl.style.fontSize = '0.95rem';
    messageEl.style.marginTop = '6px';

    // direkt NACH dem Button einfügen
    button.insertAdjacentElement('afterend', messageEl);
  }

  // Basiswerte speichern
  const liEls = Array.from(listEl.querySelectorAll('li'));
  const originalTexts = liEls.map(li => li.textContent.trim());
  const initialPortions = Number(input.value) || 1;

  function formatNumber(n) {
    if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
    return String(Math.round(n * 100) / 100).replace('.', ',');
  }

  function updateZutaten() {
    let portions = Number(input.value);
    if (!Number.isFinite(portions) || portions < 1) portions = 1;

    if (portions > 25) {
      messageEl.textContent = '⚠️ Maximal 25 Portionen möglich!';
      input.value = 25;
      portions = 25;
    } else {
      messageEl.textContent = '';
    }

    liEls.forEach((li, idx) => {
      const original = originalTexts[idx];
      const match = original.match(/(\d+[.,]?\d*)/);
      if (!match) {
        li.textContent = original;
        return;
      }
      const baseNum = parseFloat(match[1].replace(',', '.'));
      const scaled = (baseNum / initialPortions) * portions;
      const scaledStr = formatNumber(scaled);
      li.textContent = original.replace(match[1], scaledStr);
    });
  }

  // Initial starten
  updateZutaten();

  // Events
  button.addEventListener('click', updateZutaten);
  input.addEventListener('change', updateZutaten);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateZutaten();
    }
  });
});
