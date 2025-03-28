const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Aggiungi la task quando premi Invio
inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();  // Chiamata alla funzione che aggiunge la task
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");  // Mostra un avviso se il campo è vuoto
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.setAttribute("tabindex", "0"); // Rendi il <li> focusabile
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // Simbolo di chiusura (×)
        li.appendChild(span);
    }
    inputBox.value = "";  // Pulisci il campo di input
    saveData();  // Salva i dati aggiornati nel localStorage
}

// Delegazione eventi su click
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");  // Toggle la classe "checked" per il completamento
        saveData();  // Salva i dati aggiornati
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();  // Rimuove l'elemento della lista
        saveData();  // Salva i dati aggiornati
    }
}, false);

// Delegazione evento Enter sui li
listContainer.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

// Salva i dati in localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Mostra i task salvati in localStorage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";  // Se non c'è nulla in localStorage, usa una stringa vuota
    rebindEvents();  // Ri-affibbiamo gli eventi per i nuovi <li>
}

showTask();  // Mostra i task salvati al caricamento della pagina

// Ri-associa gli eventi per ogni <li> caricato (per renderli focusabili)
function rebindEvents() {
    document.querySelectorAll("#list-container li").forEach(li => {
        li.setAttribute("tabindex", "0"); // Rendi ogni <li> focusabile
    });
}
