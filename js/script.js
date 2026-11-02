
import { groupes, eleves } from "./data.js";
// console.log(groupes);
// console.log(eleves);
const listeEleves = document.getElementById("liste-eleves")
// console.log(listeEleves)
eleves.forEach(function (eleve) {
    const ligne = document.createElement("li")
    ligne.classList.add("bg-white", "rounded-xl", "p-4", "shadow-sm")
    let moyenne
    if (eleve.notes.length === 0) {
        moyenne = "-"
    } else {
        const total = eleve.notes.reduce(function (acc, note) {
            return acc + note
        }, 0)
        moyenne = total / (eleve.notes.length)
    }
    ligne.classList.add(
        "bg-white", "rounded-xl", "p-4", "shadow-sm", "border", "border-[#e4e0d6]"
    )
    const nom = document.createElement("h3")
    nom.textContent = `${eleve.prenom} ${eleve.nom}`
    nom.classList.add("font-bold", "text-lg", "text-[#1f6f5c]")
    const absences = document.createElement("p")
    absences.classList.add(
        "inline-block",
        "rounded-full",
        "px-3",
        "py-1",
        "text-sm",
        "font-medium"

    )
    absences.textContent = `${eleve.absences} absences`;
    if(eleve.absences>=3){
        absences.classList.add("bg-red-100","text-red-700")
    }else{
        absences.classList.add("bg-green-100","text-green-700")
    }

    const moyenneEl = document.createElement("p")
    moyenneEl.textContent = `Moyenne :${moyenne}/20`
    ligne.appendChild(nom)
    ligne.appendChild(absences)
    ligne.appendChild(moyenneEl)

    listeEleves.appendChild(ligne)
});
