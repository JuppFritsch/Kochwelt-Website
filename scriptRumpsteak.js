const input = document.querySelector('.portionInputRumpsteak');
const button = document.querySelector('.portionButtonRumpsteak');
const zutatenList = document.querySelector('.zutatenListeRumpsteak');

// Meldungs-Element einfügen, falls noch nicht vorhanden
let message = document.querySelector('.portionMessageRumpsteak');
if (!message) {
  message = document.createElement('span');
  message.className = 'portionMessageRumpsteak';
  input.parentNode.appendChild(message);
}

// Originaltexte speichern
const originalZutaten = [];
zutatenList.querySelectorAll('li').forEach(li => {
  originalZutaten.push(li.textContent);
});

function updateZutaten() {
  const value = Number(input.value);

  // Prüfen auf gültigen Bereich
  if (value < 1 || value > 20) {
    message.textContent = 'Bitte gib eine Zahl zwischen 1 und 20 ein!';
    input.value = Math.min(Math.max(value, 1), 20);
    return;
  } else {
    message.textContent = '';
  }

  zutatenList.querySelectorAll('li').forEach((li, i) => {
    const match = originalZutaten[i].match(/^(\d+)\s*(.*)$/);
    if (match) {
      const base = Number(match[1]);
      const newAmount = base * value;
      li.textContent = `${newAmount} ${match[2]}`;
    } else {
      li.textContent = originalZutaten[i];
    }
  });
}

// Mengen direkt beim Laden für 2 Portionen anzeigen
document.addEventListener('DOMContentLoaded', () => {
  input.value = 2;
  updateZutaten();
});

// Nur beim Klick auf den Button wird gerechnet!
button.addEventListener('click', updateZutaten);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.kontaktForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Sende die Daten per AJAX an Formspree
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          form.reset();
          form.style.display = "none";
          const msg = document.createElement("div");
          msg.className = "kontaktDanke";
          msg.innerHTML = "<h2>Danke für Ihre Nachricht!</h2><p>Wir melden uns bald bei Ihnen.</p>";
          form.parentNode.appendChild(msg);
        } else {
          alert("Fehler beim Senden. Bitte versuchen Sie es später erneut.");
        }
      })
      .catch(() => {
        alert("Fehler beim Senden. Bitte versuchen Sie es später erneut.");
      });
  });
});
