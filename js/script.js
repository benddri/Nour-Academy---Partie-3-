
import { groupes, eleves } from "./data.js";

const listeEleves = document.getElementById("liste-eleves");
const recherche = document.getElementById("recherche");
const filterGroupe = document.getElementById("filtre-groupe");
const trieEleve = document.getElementById("tri");
const compteur = document.getElementById("compteur");
const aucunResultat = document.getElementById("aucun-resultat");
const groupeEleve=document.getElementById("groupe")
const formEleve =document.getElementById("form-eleve")
const bilanMoyenne = document.getElementById("bilan-moyenne");
const bilanAbsences = document.getElementById("bilan-absences");
const bilanAlertes = document.getElementById("bilan-alertes");
const bilanMeilleur = document.getElementById("bilan-meilleur");
const listeParents = document.getElementById("liste-parents");
const aucuneAlerte = document.getElementById("aucune-alerte");













formEleve.addEventListener("submit",function(event){
    event.preventDefault()
    const prenom=document.getElementById("prenom").value.trim()
    const nom =document.getElementById("nom").value.trim()
    const groupe =document.getElementById("groupe").value.trim()
    const email =document.getElementById("email").value.trim()
    const telephone=document.getElementById("telephone").value.trim()
    const code=document.getElementById("code").value.trim()
    const regexPrenom= /^[A-Za-zÀ-ÿ\s-]{2,}$/
    const prenomMsg=document.getElementById("prenom-msg")
    prenomMsg.textContent="Prenom valide"
    prenomMsg.classList.remove("text-red-600")
    if(!regexPrenom.test(prenom)){
        prenomMsg.textContent="Veuillez entrer un prénom valide";
         prenomMsg.classList.add("text-red-600");
    return;
    }
    const nomMsg=document.getElementById("nom-msg")
    nomMsg.textContent="Nom valide"
    nomMsg.classList.remove("text-red-600")
    if(!regexPrenom.test(nom)){
        nomMsg.textContent="Veuillez entrer un nom valide";
         nomMsg.classList.add("text-red-600");
    return;
    }

    const groupeMsg=document.getElementById("groupe-msg")
    groupeMsg.textContent="groupe de l'eleve"
    groupeMsg.classList.remove("text-red-600")
    if(groupe===""){
        groupeMsg.textContent="Veuillez choisir un groupe";
         groupeMsg.classList.add("text-red-600");
    return;
    }
    const emailMsg=document.getElementById("email-msg")
   const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailMsg.textContent="Exemple: parent@mail.ma"
    emailMsg.classList.remove("text-red-600")
    if(!regexEmail.test(email)){
        emailMsg.textContent="Veuillez entrer un email valide"
        emailMsg.classList.add("text-red-600")
        return
    }
    const telephoneMsg = document.getElementById("telephone-msg");

const regexTelephone = /^(?:(?:\+212|00212)[67]|0[67])[0-9]{8}$/;

telephoneMsg.textContent = "06 / 07 ou +212 6 / 7, puis 8 chiffres.";
telephoneMsg.classList.remove("text-red-600");

if (!regexTelephone.test(telephone)) {
    telephoneMsg.textContent = "Veuillez entrer un numéro de téléphone valide.";
    telephoneMsg.classList.add("text-red-600");
    return;
}
const codeMsg = document.getElementById("code-msg");


const regexCode = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

codeMsg.textContent = "8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial.";
codeMsg.classList.remove("text-red-600");

if (!regexCode.test(code)) {
    codeMsg.textContent = "Le code doit contenir 8 caractères minimum, une majuscule, un chiffre et un symbole.";
    codeMsg.classList.add("text-red-600");
    return;
}
const formErreur = document.getElementById("form-erreur");
formErreur.hidden = true;

const numdansGroup = eleves.filter(function(eleve) {
    return eleve.groupeId === Number(groupe);
}).length;

if (numdansGroup >= 15) {
    formErreur.textContent = "Ce groupe est complet (15 élèves).";
    formErreur.hidden = false;
    return;
}
const nouvelEleve = {
    id: eleves.length + 1,
    prenom: prenom,
    nom: nom,
    groupeId: Number(groupe),
    telephoneParent: telephone,
    absences: 0,
    notes: []
};

eleves.push(nouvelEleve)
filterEleve();
bilanGroupe()






const formSucces = document.getElementById("form-succes");

formSucces.textContent = "Élève ajouté avec succès !";
formSucces.hidden = false;

formEleve.reset();
})

//la fin de form eleve


function filterEleve() {
    const search = recherche.value.toLowerCase().trim();

    const newSearch = eleves.filter(function(eleve) {
        return (
            (
                eleve.prenom.toLowerCase().includes(search) ||
                eleve.nom.toLowerCase().includes(search)
            ) &&
            (
                filterGroupe.value === "" ||
                eleve.groupeId === Number(filterGroupe.value)
            )
        );

    });

    // Trier par nom
    if (trieEleve.value === "nom") {
        newSearch.sort(function(a, b) {
            return a.nom.localeCompare(b.nom);
        });
    }

    // Trier par moyenne
    if (trieEleve.value === "moyenne") {
        newSearch.sort(function(a, b) {
            const totalA = a.notes.reduce((acc, note) => acc + note, 0);
            const totalB = b.notes.reduce((acc, note) => acc + note, 0);

            const moyenneA = a.notes.length === 0 ? -1 : totalA / a.notes.length;
            const moyenneB = b.notes.length === 0 ? -1 : totalB / b.notes.length;

            return moyenneB - moyenneA;
        });
    }

    compteur.textContent = `${newSearch.length} élèves`;
    aucunResultat.hidden = newSearch.length !== 0;

    listeEleves.textContent = "";

    const cards = newSearch.map(function(eleve) {
        const ligne = document.createElement("li");

        ligne.dataset.id = eleve.id;

        ligne.classList.add(
            "rounded-2xl",
            "border",
            "border-line",
            "bg-card",
            "p-3"
        );

        if (eleve.absences >= 3) {
            ligne.classList.add("alerte");
        }

        const contenu = document.createElement("div");

        contenu.classList.add(
            "flex",
            "flex-col",
            "gap-3",
            "lg:flex-row",
            "lg:items-center"
        );

        // Bouton fiche élève
        const btnFiche = document.createElement("button");

        btnFiche.type = "button";

        btnFiche.classList.add(
            "btn-fiche",
            "flex",
            "min-h-11",
            "flex-1",
            "items-center",
            "gap-3",
            "text-left"
        );

        // Initiales
        const initiales = document.createElement("span");

        initiales.textContent = eleve.prenom[0] + eleve.nom[0];

        initiales.classList.add(
            "grid",
            "size-10",
            "shrink-0",
            "place-items-center",
            "rounded-full",
            "bg-brand-soft",
            "text-sm",
            "font-semibold",
            "text-brand"
        );

        if (eleve.absences >= 3) {
            initiales.classList.remove("bg-brand-soft", "text-brand");
            initiales.classList.add("bg-alert", "text-white");
        }

        // Informations élève
        const info = document.createElement("span");

        info.classList.add("min-w-0", "flex-1");

        const nom = document.createElement("span");

        nom.textContent = `${eleve.prenom} ${eleve.nom}`;

        nom.classList.add("block", "truncate", "font-medium");

        const details = document.createElement("span");

        details.classList.add("block", "text-sm", "text-muted");

        const absences = document.createElement("span");

        absences.dataset.role = "absences";
        absences.textContent = `${eleve.absences} absences`;

        // Badge prévenir les parents
        const badgeParent = document.createElement("span");

        badgeParent.textContent = "Prévenir les parents";

        badgeParent.classList.add(
            "badge",
            "ml-1",
            "whitespace-nowrap",
            "rounded-full",
            "bg-alert",
            "px-2",
            "py-0.5",
            "text-xs",
            "font-medium",
            "text-white"
        );

        if (eleve.absences < 3) {
            badgeParent.hidden = true;
        }

        details.appendChild(absences);
        details.appendChild(badgeParent);

        info.appendChild(nom);
        info.appendChild(details);

        // Moyenne
        const moyenneEl = document.createElement("span");

        moyenneEl.dataset.role = "moyenne";

        moyenneEl.classList.add("font-serif", "text-xl");

        if (eleve.notes.length === 0) {
            moyenneEl.textContent = "—";
        } else {
            const total = eleve.notes.reduce(function(acc, note) {
                return acc + note;
            }, 0);

            const moyenne = total / eleve.notes.length;

            moyenneEl.textContent =
              moyenneEl.textContent = `${moyenne.toFixed(2).replace(".", ",")}/20`;
        }

        btnFiche.appendChild(initiales);
        btnFiche.appendChild(info);
        btnFiche.appendChild(moyenneEl);

        // Zone des boutons
        const actions = document.createElement("div");

        actions.classList.add("flex", "gap-2");

        // Bouton absence
        const btnAbsence = document.createElement("button");

        btnAbsence.type = "button";
        btnAbsence.textContent = "Absent";
        btnAbsence.dataset.action = "absence";

        btnAbsence.classList.add(
            "btn-absent",
            "h-11",
            "rounded-full",
            "border",
            "border-line",
            "px-3",
            "text-sm",
            "font-medium",
            "hover:bg-paper",
            "sm:px-4"
        );

        // Input note
        const labelNote = document.createElement("label");

        labelNote.classList.add("flex-1");

        const labelText = document.createElement("span");

        labelText.textContent = "Note sur 20";
        labelText.classList.add("sr-only");

        const inputNote = document.createElement("input");

        inputNote.type = "number";
        inputNote.min = "0";
        inputNote.max = "20";
        inputNote.step = "0.5";
        inputNote.placeholder = "Note";
        inputNote.dataset.role = "note";

        inputNote.classList.add(
            "h-11",
            "w-full",
            "rounded-full",
            "border",
            "border-line",
            "bg-paper",
            "px-4",
            "text-sm",
            "lg:w-24"
        );

        labelNote.appendChild(labelText);
        labelNote.appendChild(inputNote);

        // Bouton ajouter note



        const btnajoutNote = document.createElement("button");

        btnajoutNote.type = "button";
        btnajoutNote.textContent = "Ajouter la note";
        btnajoutNote.dataset.action = "note";

        btnajoutNote.classList.add(
            "btn-note",
            "h-11",
            "rounded-full",
            "bg-ink",
            "px-3",
            "text-sm",
            "font-medium",
            "text-white",
            "hover:bg-brand",
            "sm:px-4"
        );
        const message=document.createElement("p")
        message.textContent ="la note doit etre entre 0 et 20"
        message.dataset.role="message"
        message.hidden=true
        inputNote.value="";
       

        actions.appendChild(btnAbsence);
        actions.appendChild(labelNote);
        actions.appendChild(btnajoutNote);

        
     

        contenu.appendChild(btnFiche);
        contenu.appendChild(actions);
        
        ligne.appendChild(contenu);
        
        ligne.appendChild(message)

        return ligne;
    });

    cards.forEach(function(card) {
        listeEleves.appendChild(card);
    });
}

// ================bilan de groupe================================
function bilanGroupe(){
    const totalAbsences =eleves.reduce(function(total,eleve){
        return total + eleve .absences

    },0)
    bilanAbsences.textContent=totalAbsences
    const totalAlertes=eleves.filter(function(eleve){
        return eleve.absences>=3

    }).length
    bilanAlertes.textContent=totalAlertes
    //appeler parent
    const parentApeler =eleves.filter(function(eleve){
        return eleve.absences >=3
    })
    listeParents.textContent=""
    aucuneAlerte.hidden = parentApeler.length  !== 0
    parentApeler.forEach (function(eleve){
        const parent =document.createElement("li")
        parent.textContent=`${eleve.prenom} ${eleve.nom}-${eleve.telephoneParent}`
        listeParents.appendChild(parent)
    })


    const elevesAvecLesnote=eleves.filter(function(eleve){
        return eleve.notes.length>0
    })
    const totaleLesNotes=elevesAvecLesnote.reduce(function(totale,eleve){
        const somme =eleve.notes.reduce(function(acc,note){
            return acc +note
        },0)
        return totale+somme
    },0)
    const nombreNote=elevesAvecLesnote.reduce(function(total,eleve){
        return total+eleve.notes.length
    },0)
    const moyenneGroupe=nombreNote === 0? 0:totaleLesNotes/nombreNote
    bilanMoyenne.textContent=moyenneGroupe.toFixed(2).replace(".",",")
}

// Event delegation
listeEleves.addEventListener("click", function(event) {
    const bouton = event.target.closest("button");

    if (!bouton) return;

    const action = bouton.dataset.action;

    if (!action) return;

    const ligne = bouton.closest("li");
    const id = Number(ligne.dataset.id);

    const eleve = eleves.find(function(e) {
        return e.id === id;
    });

    // Ajouter une absence
    if (action === "absence") {
        eleve.absences++;

        const absenceEl = ligne.querySelector('[data-role="absences"]');

        absenceEl.textContent = `${eleve.absences} absences`;

        const badgeParent = ligne.querySelector(".badge");
        const initiales = ligne.querySelector(".btn-fiche span");

        if (eleve.absences >= 3) {
            ligne.classList.add("alerte");

            badgeParent.hidden = false;

            initiales.classList.remove("bg-brand-soft", "text-brand");
            initiales.classList.add("bg-alert", "text-white");
        }
    }
    if (action ==="note"){
        const inputNote  =ligne.querySelector('[data-role="note"]')
        const message=ligne.querySelector('[data-role="message"]')
        const valeur = inputNote.value.trim()
        const note =Number (valeur)
        if(valeur===""||! Number.isFinite(note) || note>20||note<0){
    message.hidden=false
    return
            }



        eleve.notes.push(note);
        const total =eleve .notes.reduce(function(acc,n){
            return acc +n
        },0)
        const moyenne=total/ eleve.notes.length
        const moyenneEl=ligne .querySelector('[data-role="moyenne"]')
        moyenneEl.textContent = `${moyenne.toFixed(2)}/20`;

         message.hidden=true
         inputNote.value=""
    }
   
    bilanGroupe()
    
    
    
    
});
groupes.forEach(function(groupe) {

    // Options formulaire
    const optionForm = document.createElement("option");
    optionForm.value = groupe.id;
    optionForm.textContent = groupe.nom;
    groupeEleve.appendChild(optionForm);

    // Options filtre
    const optionFilter = document.createElement("option");
    optionFilter.value = groupe.id;
    optionFilter.textContent = groupe.nom;
    filterGroupe.appendChild(optionFilter);

});

filterEleve();
bilanGroupe()

recherche.addEventListener("input", filterEleve);
filterGroupe.addEventListener("change", filterEleve);
trieEleve.addEventListener("change", filterEleve);