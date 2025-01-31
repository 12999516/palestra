let a = [];

function invia() {
    mail = document.getElementById("mail").value;
    nome = document.getElementById("nome").value;
    corso = document.getElementById("corso").value;

    if (validateMail(mail)) {

        crea_obj(nome, mail);
        add_corso(corso, mail);
    }

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
        document.getElementById("rispostaabb").innerHTML = mail + " | " + a[mail].nome + " | " + a[mail].cosa_fa.join(", ") + "\n";
    } else {
        document.getElementById("rispostaabb").innerHTML = "non esiste" + "\n";
    }
}

function stampa_robe_tabella(mail) {
    if (a[mail]) {
        return (`<tr><td>${mail}</td><td>${a[mail].nome}</td><td>${a[mail].cosa_fa.join(", ")}</td></tr>`);
    } else {
        return ("<tr><td>Non esiste</td></tr>");
    }
}

function GUI() {
    let content = "<table><tr><td>Mail</td><td>Nome</td><td>Corsi</td></tr>";
    for (mail in a) {
        content += stampa_robe_tabella(mail)
    }
    content += "</table>"
    document.getElementById("risposta").innerHTML = content;
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

function validateMail(mail) {
    let posizione = mail.indexOf("@");
    let punto_ce = false;

    if (posizione > -1) {
        for (let i = posizione + 1; i < mail.length; i++) {
            if (mail[i] == "@") {
                alert("mail sbagliata")
                return false;
            } else if (mail[i] == ".") {
                if (punto_ce) {
                    alert("mail sbagliata");
                    return false;
                } else {
                    punto_ce = true;
                }
            }
        }
        if (punto_ce) {
            alert("mail ok");
            return true
        } else {
            alert("mail sbagliata");
            return false
        }
    } else {
        alert("mail sbagliata");
        return false;
    }


}