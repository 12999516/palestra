let a = [];

function invia() {
    mail = document.getElementById("mail").value;
    nome = document.getElementById("nome").value;
    corso = document.getElementById("corso").value;

    crea_obj(nome, mail);
    add_corso(corso, mail);

}

function crea_obj(nome, mail) {
    if (a[mail]) {
        alert("L'abbonato è già registrato.");
        GUI();
        return;
    }
    a[mail] = { nome: nome, cosa_fa: [] };
    alert(`Abbonato ${nome} aggiunto con successo.`);
    GUI();
}

function add_corso(corso, mail) {
    if (a[mail] && !(a[mail].cosa_fa.includes(corso))) {
        a[mail].cosa_fa.push(corso);
        GUI();
        return true;
    } else {
        GUI();
        return false;
    }
}

function stampa_robe(mail) {
    if (a[mail]) {
        document.getElementById("risposta").innerHTML += mail + " | " + a[mail].nome + " | " + a[mail].cosa_fa.join(", ") + "\n";
    } else {
        document.getElementById("risposta").innerHTML += "non esiste" + "\n";
    }
}

function GUI () {
    document.getElementById("risposta").innerHTML = "";
    for (mail in a) {
        stampa_robe(mail)
    }
}

function rimuovi() {
    let mailRimuovi = document.getElementById("mailRimuovi").value;
    let corsoRimuovi = document.getElementById("corsoRimuovi").value;

    if (rimuoviPrenotazione(mailRimuovi, corsoRimuovi)) {
        alert("Corso rimosso con successo!");
        stampa_robe(mailRimuovi);  // Mostra le attività rimanenti
    } else {
        alert("Errore: L'abbonato non esiste o non è iscritto a questo corso.");
    }
    GUI();
}

function rimuoviPrenotazione(mail, attivita) {
    if (a[mail]) {
        let index = a[mail].cosa_fa.indexOf(attivita);
        if (index > -1) {
            a[mail].cosa_fa.splice(index, 1);  // splice altrimenti si poteva anche usare: delete a[mail].cosa_fa
            if (a[mail].cosa_fa.length == 0) {
                delete a[mail]
            }
            GUI();
            return true;
        }
    }
    GUI();
    return false;
}
