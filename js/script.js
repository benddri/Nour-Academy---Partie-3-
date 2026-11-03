
import { groupes, eleves } from "./data.js";
// console.log(groupes);
// console.log(eleves);
const listeEleves = document.getElementById("liste-eleves")
const recherche=document.getElementById("recherche")
const filterGroupe=document.getElementById("filtre-groupe")
groupes.forEach(function(groupe){
    const option =document.createElement("option")
   option.value=groupe.id;
   option.textContent= groupe.nom;
filterGroupe.appendChild(option)
});
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

    listeEleves.textContent = "";

    const cards = newSearch.map(function(eleve) {
        const ligne = document.createElement("li");

        ligne.classList.add(
            "bg-white", "rounded-xl", "p-4", "shadow-sm",
            "border", "border-[#e4e0d6]"
        );

        
        let moyenne;

        if (eleve.notes.length === 0) {
            moyenne = "-";
        } else {
            const total = eleve.notes.reduce(function(acc, note) {
                return acc + note;
            }, 0);

            moyenne = (total / eleve.notes.length);
        }

    
        const nom = document.createElement("h3");
        nom.textContent = `${eleve.prenom} ${eleve.nom}`;
        nom.classList.add("font-bold", "text-lg", "text-[#1f6f5c]");

    
        const absences = document.createElement("p");
        absences.textContent = `${eleve.absences} absences`;

        absences.classList.add(
            "inline-block", "rounded-full", "px-3", "py-1", "text-sm"
        );

        if (eleve.absences >= 3) {
            absences.classList.add("bg-red-100", "text-red-700");
        } else {
            absences.classList.add("bg-green-100", "text-green-700");
        }

        const moyenneEl = document.createElement("p");
        if(moyenne==="-"){
            moyenneEl.textContent =`Moyenne : _`
        }else{
            moyenneEl.textContent=`Moyenne :${moyenne}/20`
        }
        ligne.appendChild(nom);
        ligne.appendChild(absences);
        ligne.appendChild(moyenneEl);

        return ligne;
    });

    cards.forEach(function(card) {
        listeEleves.appendChild(card);
    });
}



filterEleve();
recherche.addEventListener("input",filterEleve)
filterGroupe.addEventListener("change",filterEleve)

// // console.log(listeEleves)
// eleves.forEach(function (eleve) {
//     const ligne = document.createElement("li")
//     ligne.classList.add("bg-white", "rounded-xl", "p-4", "shadow-sm")
//     let moyenne
//     if (eleve.notes.length === 0) {
//         moyenne = "-"
        
//     } else {
//         const total = eleve.notes.reduce(function (acc, note) {
//             return acc + note
//         }, 0)
//         moyenne = total / (eleve.notes.length)
//     }
//     ligne.classList.add(
//         "bg-white", "rounded-xl", "p-4", "shadow-sm", "border", "border-[#e4e0d6]"
//     )
//     const nom = document.createElement("h3")
//     nom.textContent = `${eleve.prenom} ${eleve.nom}`
//     nom.classList.add("font-bold", "text-lg", "text-[#1f6f5c]")
//     const absences = document.createElement("p")
//     absences.classList.add( "inline-block","rounded-full","px-3",
//         "py-1",
//         "text-sm",
      

//     )
//     absences.textContent = `${eleve.absences} absences`;
//     if(eleve.absences>=3){
//         absences.classList.add("bg-red-100","text-red-700")
//     }else{
//         absences.classList.add("bg-green-100","text-green-700")
//     }

//     const moyenneEl = document.createElement("p")
//    if( moyenne="-"){
//     moyenneEl.textContent="Moyenne :-"

//    }
//    else{
//     moyenneEl.textContent=`Moyenne :${moyenne}/20`
//    }
//     ligne.appendChild(nom)
//     ligne.appendChild(absences)
//     ligne.appendChild(moyenneEl)

//     listeEleves.appendChild(ligne)
// });
