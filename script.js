let current = 0;

/* === FUNCIÓN PRINCIPAL DE NAVEGACIÓN ENTRE PASOS === */
function nextStep(current) {
  const form = document.getElementById("wizardForm");
  
  // Captura los valores
  const name = document.getElementById("name").value;
  const last = document.getElementById("last").value;
  const amount = document.getElementById("amount").value;
  const account = document.getElementById("account").value;

  function safeSet(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}


  // Inserta en el paso 2
safeSet("display-name", name);
safeSet("display-last", last);
safeSet("display-last1", last);
safeSet("display-amount-step2", amount);
safeSet("display-amount-step02", amount);
safeSet("display-amount-step4", amount);
safeSet("display-account", account);
safeSet("display-account-step4", account);


  const inputs = form.querySelectorAll(`#step-${current} input, 
                                        #step-${current} select`);
  let valid = true;

  // Validaciones
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      input.reportValidity();
      valid = false;
    } else {
      localStorage.setItem(input.name, input.value);
    }
  });

  if (!valid) return;

  // Ocultar paso actual y mostrar siguiente
  document.getElementById(`step-${current}`).style.display = "none";
  document.getElementById(`step-${current + 1}`).style.display = "block";

  // Indicadores
  for (let i = 1; i <= 4; i++) {
    const indicator = document.getElementById(`step-${i}-indicator`);
    indicator.classList.remove("active", "completed");

    if (i < current + 1) indicator.classList.add("completed");
    else if (i === current + 1) indicator.classList.add("active");
  }

  // Líneas
  for (let i = 1; i <= 3; i++) {
    const line = document.getElementById(`step-${i}-line`);
    line.classList.remove("active", "completed");

    if (i < current + 1) line.classList.add("completed");
    else if (i === current + 0) line.classList.add("active");
  }

document.getElementById(`step-${current}`).classList.remove("active");
document.getElementById(`step-${current + 1}`).classList.add("active");

}

/* === FUNCIÓN DEL PRELOADER === */
function showPreloader(step) {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "flex";
  preloader.style.background = "#ffffff"

  // Tiempo editable (en milisegundos)
  const tiempoCarga = 5000; // 2000 = 2 segundos

  setTimeout(() => {
    preloader.style.display = "none"; // Ocultar preloader
    nextStep(step); // Llamar a tu función original
  }, tiempoCarga);


}



//timer
function generateBarcode() {
  const btn = document.getElementById("generate-code-btn");
  const barcode = document.getElementById("barcode-container");
  const timer = document.getElementById("step3-timer");
  const progress = document.getElementById("step3-progress-bar");

  // Estado de carga
  btn.disabled = true;
  btn.textContent = "Generating code...";
  btn.classList.add("loading");

  const delay = 3000; // tiempo de carga antes de mostrar el código
  const countdown = 120; // duración del timer en segundos

  setTimeout(() => {
    // Mostrar elementos
    barcode.style.display = "block";
    timer.style.display = "block";
    progress.style.display = "block";

    btn.textContent = "Code Generated ";
    btn.classList.remove("loading");

    // Iniciar timer
    startStep3Timer(120, () => {
  // 🔁 Reiniciar todo al terminar
  document.getElementById("barcode-container").style.display = "none";
  document.getElementById("step3-timer").style.display = "none";
  document.getElementById("step3-progress-bar").style.display = "none";

  const btn = document.getElementById("generate-code-btn");
  btn.disabled = false;
  btn.textContent = "Generate Barcode";
});

  }, delay);
}

// Timer con callback al finalizar
function startStep3Timer(durationInSeconds, onComplete) {
  const progress = document.getElementById("step3-progress-bar");

  let remaining = durationInSeconds;
  const total = durationInSeconds;

  // Inicializa visualmente
  updateTimerDisplay(remaining);
  progress.style.width = "0%";

  const interval = setInterval(() => {
    remaining--;

    updateTimerDisplay(remaining);

    const percent = ((total - remaining) / total) * 100;
    progress.style.width = `${percent}%`;

    if (remaining <= 0) {
      clearInterval(interval);
      if (typeof onComplete === "function") onComplete();
    }
  }, 1000);
}

// 🧠 Función auxiliar para mostrar el tiempo
function updateTimerDisplay(seconds) {
  const timer = document.getElementById("step3-timer");
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timer.textContent = `Code Expire in... ${minutes}:${secs.toString().padStart(2, '0')}`;
}



//back//
function goBack(currentStep) {
  // Oculta el paso actual
  document.getElementById(`step-${currentStep}`).style.display = "none";



  // Muestra el paso anterior
  const previousStep = currentStep - 1;
  document.getElementById(`step-${previousStep}`).style.display = "block";






    // Actualiza los indicadores
    for (let i = 2; i <= 4; i++) {
    const indicator = document.getElementById(`step-${i}-indicator`);

    indicator.classList.remove("active", "completed");

    if (i < currentStep - 1) indicator.classList.add("completed");
    else if (i === currentStep - 1) indicator.classList.add("active");
  }




    // Actualiza las líneas
   for (let i = 1; i <= 3; i++) {
     const line = document.getElementById(`step-${i}-line`);

     line.classList.remove("active", "completed");

     if (i < currentStep - 1) line.classList.add("completed");
     else if (i === currentStep - 2) line.classList.add("active");
   }

}




  function verificarA() {
    const claveI = document.getElementById("clave").value;
    const claveC = "***************"; // changeItToKey

    if (claveI === claveC) {
      document.getElementById("accesoPrivado").style.display = "none";
      document.getElementById("contenidoPrivado").style.display = "block";
    } else {
      alert("Contraseña incorrecta");
    }
  }



  function setCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + (dias*24*60*60*1000));
  document.cookie = `${nombre}=${valor};expires=${fecha.toUTCString()};path=/`;
}

function getCookie(nombre) {
  const nombreEQ = nombre + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i].trim();
    if (c.indexOf(nombreEQ) == 0) return c.substring(nombreEQ.length);
  }
  return null;
}

// Mostrar contenido si cookie está presente
if (getCookie("nivel") === "premium") {
  document.getElementById("contenidoPremium").style.display = "block";
}



// Optional: submit to PHP
//document.getElementById("wizardForm").addEventListener("submit", function(e) {
  //e.preventDefault();
  //const data = {};
  //const inputs = this.querySelectorAll("input, select");
  //inputs.forEach(input => data[input.name] = input.value);

  //fetch("release_funds.php", {
    //method: "POST",
    //headers: { "Content-Type": "application/json" },
    //body: JSON.stringify(data)
  //})
  //.then(res => res.text())
  //.then(msg => alert(msg))
  //.catch(err => alert("Error submitting form"));
//});






// === Custom dropdown ===
function toggleOptions() {
  const options = document.getElementById("options");
  const arrow = document.getElementById("arrow");

  options.classList.toggle("show");
  arrow.classList.toggle("open");
}

document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    const value = option.getAttribute("data-value");
    const imgSrc = option.getAttribute("data-img");

    const selectedText = document.getElementById("selected-text");
    const selectedOption = document.getElementById("selected-option");
    const selectedImg = document.getElementById("selected-img");

    selectedText.textContent = "Account";
    selectedOption.textContent = value;
    selectedOption.style.display = "inline";

    selectedImg.src = imgSrc;
    selectedImg.alt = value;
    selectedImg.style.display = "inline";

    document.getElementById("options").classList.remove("show");
    document.getElementById("arrow").classList.remove("open");
  });
});

// Al cargar, ocultar opción e imagen
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("selected-option").style.display = "none";
  document.getElementById("selected-img").style.display = "none";
});










// Step 4 fund release simulation
let currentAmount = 0;
const inputAmount = document.getElementById("amount");
const display = document.getElementById("display-amount-step4");
const confirmation = document.getElementById("confirmation");
const releaseBtn = document.getElementById("releaseBtn");
const TransferBox = document.getElementById("transfer-animation");


// Función para formatear como moneda
function formatCurrency(amount) {
  return `$${amount.toLocaleString("en-US", {minimumFractionDigits: 2})}`;
}

// Inicializar el monto desde el input
function initializeAmount() {
  const value = parseFloat(inputAmount.value.replace(/[^0-9.]/g, ""));
  if (!isNaN(value) && value > 0) {
    currentAmount = value;
    display.textContent = formatCurrency(currentAmount);
    confirmation.textContent = "";
  } else {
    display.textContent = "$0.00";
    confirmation.textContent = "please Enter Valid Amount.";
    confirmation.style.color = "red";
    setTimeout(() => {
      confirmation.textContent = "";
    }, 3000);
  }
}


function releaseFunds() {
  if (currentAmount >= 1000) {
    TransferBox.innerHTML = '<div class="transfer-bar"></div><span>Loading...</span>';
    TransferBox.style.display = "block";
    confirmation.textContent = "Processing Transfer...";
    confirmation.style.color = "black";
    releaseBtn.disabled = true;
    releaseBtn.classList.remove("reactivated"); // limpia efecto previo

    // 🔥 A los 10 segundos: actualiza monto y oculta barra
    setTimeout(() => {
      currentAmount -= 1000;
      animateAmountChange(display, currentAmount + 1000, currentAmount);
      confirmation.textContent = `$1,000.00 Successfully Retired.\nAvailable Balance **${formatCurrency(currentAmount)}`;
      confirmation.style.color = "#155724";
      confirmation.style.whiteSpace = "pre-line";
      confirmation.classList.add("success-flash");

      TransferBox.innerHTML = "";
      TransferBox.style.display = "none";
    }, 10000);

    // 🔥 A los 2 minutos: reactiva botón con efecto visual
    setTimeout(() => {
      releaseBtn.disabled = false;
      releaseBtn.classList.add("reactivated");
      confirmation.classList.remove("success-flash");
    }, 120000);
  } else {
    confirmation.textContent = `error! You Don't Have Enough Funds`;
    confirmation.style.color = "red";
    confirmation.classList.add("error-flash");
    setTimeout(() => {
      confirmation.classList.remove("error-flash");
      confirmation.textContent = "";
    }, 4000);
  }

  
}




let modoVerificacion = false;

// Activar/desactivar modo con Ctrl + Alt + V
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'v') {
    modoVerificacion = !modoVerificacion;
    actualizarEstiloBoton();
    console.log("Modo verificación:", modoVerificacion ? "ACTIVADO" : "DESACTIVADO");
  }
});

// Estilo visual opcional
function actualizarEstiloBoton() {
  const btn = document.getElementById('releaseBtn');
  if (modoVerificacion) {
    btn.disabled = true; // Desactiva el botón completamente
    btn.style.boxShadow = '0 0 5px 2px red';
    btn.style.cursor = 'not-allowed';
  } else {
    btn.disabled = false;
    btn.style.boxShadow = '';
    btn.style.cursor = 'pointer';
  }
}

// Interceptar el botón Release Funds
document.getElementById('releaseBtn').addEventListener('click', function(e) {
  if (modoVerificacion) {
    e.preventDefault();
    e.stopImmediatePropagation(); // Detiene cualquier otra acción
    alert("Verification Required. scan Your Fema Code To Continue.");
    return false; // Asegura que no se ejecute nada más
  }

  // Acción normal del botón
  console.log("funds Released Normally");
  // liberarFondos(); o enviar formulario
});





// dinero de step 4
function animateAmountChange(element, from, to) {
  const duration = 2000; // duración total en ms
  const frameRate = 40; // cuántas veces por segundo actualiza
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let frame = 0;

  const step = (from - to) / totalFrames;

  const interval = setInterval(() => {
    frame++;
    const current = from - step * frame;
    element.textContent = formatCurrency(current);

    if (frame >= totalFrames) {
      clearInterval(interval);
      element.textContent = formatCurrency(to); // asegúrate que termine exacto
    }
  }, 2000 / frameRate);
} //



// Escuchar cambios en el input
inputAmount.addEventListener("change", initializeAmount);

// También puedes inicializar al cargar la página
window.addEventListener("load", initializeAmount);

releaseBtn.addEventListener("click", releaseFunds);
// End of custom code






document.addEventListener("DOMContentLoaded", function () {
  const TransferBox = document.getElementById("transfer-animation");
  // Tu lógica aquí


const statusDisplay = document.getElementById("status-display");

let countdownInterval;

function startTimer(duration) {
  clearInterval(countdownInterval);
  let remaining = duration;

  updateDisplay(remaining);

  countdownInterval = setInterval(() => {
    remaining--;
    updateDisplay(remaining);

    if (remaining <= 0) {
      clearInterval(countdownInterval);

      // ✅ Mostrar mensaje final en el mismo lugar
      statusDisplay.textContent = "You can now release the payment";
      statusDisplay.style.color = "#155724";


      // ✅ Ocultar automáticamente después de 5 segundos
      setTimeout(() => {
        statusDisplay.textContent = "";
        statusDisplay.style.color = "#000000c0"; // restaurar color original
      }, 5000);
    }
  }, 1000);
}

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${mins}:${secs.toString().padStart(2, '0')}`;
  statusDisplay.textContent = `Next payment available in... ${formatted}`;
  statusDisplay.style.color = "#000000c0"; // color del timer
}

// ✅ Botón que inicia el temporizador
releaseBtn.addEventListener("click", () => {
  startTimer(120); // Ejemplo: 3 minutos
});









// Formatear como moneda USD
const amountInput = document.getElementById("amount");

// Formatear al salir del campo (blur)
amountInput.addEventListener("blur", () => {
  let raw = amountInput.value.replace(/[^0-9.]/g, ""); // permite decimales
  let numeric = parseFloat(raw);
  if (!isNaN(numeric)) {
    amountInput.value = numeric.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
  } else {
    amountInput.value = "";
  }
});

// Opcional: limpiar el formato al hacer foco para que el usuario pueda editar
amountInput.addEventListener("focus", () => {
  let raw = amountInput.value.replace(/[^0-9.]/g, "");
  amountInput.value = raw;
});




// Formatear número de cuenta estilo **** **** **** 1234
const accountInput = document.getElementById("account");
accountInput.addEventListener("input", () => {
  let raw = accountInput.value.replace(/\D/g, "").slice(-16); // máximo 16 dígitos
  let masked = raw.padStart(16, "*").replace(/.(?=.{4})/g, "*");
  let formatted = masked.match(/.{1,4}/g)?.join(" ") || "";
  accountInput.value = formatted;
});


});
// Fin de formateo personalizado