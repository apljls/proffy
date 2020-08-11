document.querySelector("#add-time").addEventListener("click", cloneField)

function cloneField (){
    //console.log("Cliquei no botão de add horario")

    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

    //
    const field = newFieldContainer.querySelectorAll('input');
    
    //field.forEach(functio(element){element.value = ""})
    field.forEach(element => {
        element.value = "";
    });

    //add
    document.querySelector("#schedule-items").appendChild(newFieldContainer)
}