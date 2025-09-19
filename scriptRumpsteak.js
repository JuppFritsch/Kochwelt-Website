const input = document.querySelector('.portionInputRumpsteak');
const button = document.querySelector('.portionButtonRumpsteak');
const message = document.getElementById('portionMessage');
const zutatenTable = document.getElementById('zutatenTable');

// Speichere die Originaltexte für die Zutaten
const originalZutaten = [];
zutatenTable.querySelectorAll('td').forEach(td => {
  originalZutaten.push(td.textContent);
});

function updateZutaten() {
  const value = Number(input.value);
  if (value < 1 || value > 20) {
    message.textContent = 'Bitte gib eine Zahl zwischen 1 und 20 ein!';
    input.value = Math.min(Math.max(value, 1), 20);
    return;
  } else {
    message.textContent = '';
  }

  zutatenTable.querySelectorAll('td').forEach((td, i) => {
    const base = td.getAttribute('data-base');
    if (base) {
      // Extrahiere die Einheit und Beschreibung
      const match = originalZutaten[i].match(/^(\d+)\s*(.*)$/);
      if (match) {
        const newAmount = base * value;
        td.textContent = `${newAmount} ${match[2]}`;
      }
    } else {
      td.textContent = originalZutaten[i];
    }
  });
}

button.addEventListener('click', updateZutaten);
input.addEventListener('change', updateZutaten);

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.kontaktForm');
  form.addEventListener('submit', function(e) {
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
