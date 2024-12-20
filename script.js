// Lista de regalos con sus respectivos porcentajes
const gifts = [
    { name: "ADAN TOOLS", percentage: 10 },
    { name: "ODIN CHECKER", percentage: 15 },
    { name: "ZCOPIE", percentage: 20 },
    { name: "IP TRACKER", percentage: 5 },
    { name: "NUMBER TRACKER", percentage: 10 },
    { name: "DISCORD FREE CODES", percentage: 15 },
    { name: "CARDS GENERATOR", percentage: 10 },
    { name: "ZCOPIE V2", percentage: 5 },
    { name: "KPC", percentage: 5 },
    { name: "FAKER", percentage: 5 },
  ];
  
  // Función para obtener un regalo basándonos en las probabilidades
  function getRandomGift() {
    const cumulative = [];
    let total = 0;
  
    gifts.forEach((gift) => {
      total += gift.percentage;
      cumulative.push({ ...gift, range: total });
    });
  
    const random = Math.random() * 100;
  
    for (let gift of cumulative) {
      if (random < gift.range) {
        return gift.name;
      }
    }
  }
  
  // Referencias al DOM
  const giftButton = document.getElementById("giftButton");
  const giftDisplay = document.getElementById("giftDisplay");
  const message = document.getElementById("message");
  const countdown = document.createElement("p");
  countdown.id = "countdown";
  message.parentNode.insertBefore(countdown, giftDisplay);
  
  const MS_IN_A_DAY = 24 * 60 * 60 * 1000;
  
  // Control de tiempo de 24 horas
  let lastClaimTime = localStorage.getItem("lastClaimTime");
  
  if (lastClaimTime) {
    const timeDiff = Date.now() - parseInt(lastClaimTime, 10);
    if (timeDiff < MS_IN_A_DAY) {
      disableButton(MS_IN_A_DAY - timeDiff);
    }
  }
  
  giftButton.addEventListener("click", () => {
    const now = Date.now();
    localStorage.setItem("lastClaimTime", now);
  
    const gift = getRandomGift();
    giftDisplay.textContent = `🎉 ${gift} 🎉`;
  
    disableButton(MS_IN_A_DAY);
  });
  
  function disableButton(timeRemaining) {
    giftButton.disabled = true;
    message.textContent = "Ya has reclamado tu regalo. Vuelve mañana.";
  
    updateCountdown(timeRemaining);
  
    const interval = setInterval(() => {
      timeRemaining -= 1000;
      updateCountdown(timeRemaining);
  
      if (timeRemaining <= 0) {
        clearInterval(interval);
        giftButton.disabled = false;
        message.textContent = "¡Puedes reclamar tu regalo ahora!";
        countdown.textContent = "";
      }
    }, 1000);
  }
  
  function updateCountdown(timeRemaining) {
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    countdown.textContent = `Próximo regalo en: ${hours}h ${minutes}m ${seconds}s`;
  }
  
  // Generar copos de nieve
function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❄";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
    snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
    document.body.appendChild(snowflake);
  
    // Eliminar el copo de nieve después de que termine la animación
    setTimeout(() => {
      snowflake.remove();
    }, 10000);
  }
  
  // Crear copos de nieve continuamente
  setInterval(createSnowflake, 300);

  // Cambiar el idioma del mensaje
function changeLanguage(language) {
    const translations = {
      en: {
        title: "PAGE FOR THE CHRISTMAS EVENT 2024",
        body: "🎄 Merry Christmas to everyone! 🎄",
        footer: "Sincerely, Noctámbulo"
      },
      es: {
        title: "PÁGINA PARA EL EVENTO DE NAVIDAD 2024",
        body: "🎄 ¡Feliz Navidad a todos! 🎄",
        footer: "Att: Noctámbulo"
      },
      hi: {
        title: "क्रिसमस इवेंट 2024 के लिए पेज",
        body: "🎄 सभी को क्रिसमस की शुभकामनाएँ! 🎄",
        footer: "सादर, नोक्टाम्बुलो"
      }
    };
  
    // Actualizar el texto según el idioma seleccionado
    document.getElementById("messageTitle").textContent = translations[language].title;
    document.getElementById("messageBody").textContent = translations[language].body;
    document.getElementById("messageFooter").textContent = translations[language].footer;
  }
// Verificar si el usuario ya ha reclamado el regalo
if (localStorage.getItem('hasClaimed') === 'true') {
  document.getElementById('claimMessage').textContent = "Ya reclamaste tu regalo hoy. ¡Vuelve en 24 horas!";
  document.getElementById('claimButton').disabled = true;  // Deshabilitar el botón de reclamar
} else {
  document.getElementById('claimMessage').textContent = "¡Haz clic en el botón para reclamar tu regalo!";
  document.getElementById('claimButton').disabled = false;  // Habilitar el botón de reclamar
}

// Cuando el usuario reclame el regalo
function claimGift() {
  // Marcar que ya ha reclamado el regalo
  localStorage.setItem('hasClaimed', 'true');
  
  // Actualizar el mensaje y deshabilitar el botón
  document.getElementById('claimMessage').textContent = "¡Felicidades! Has reclamado tu regalo.";
  document.getElementById('claimButton').disabled = true;
  
  // Restablecer el estado después de 24 horas
  setTimeout(function() {
    localStorage.removeItem('hasClaimed');
    location.reload(); // Recargar la página después de 24 horas para que el usuario pueda reclamar nuevamente
  }, 24 * 60 * 60 * 1000);  // 24 horas en milisegundos
}
  
  