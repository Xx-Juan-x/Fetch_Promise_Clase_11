let form = document.getElementById("frm-registro");

//Campo Nombre
let nombre = document.querySelector("#nombre");
let mensaje_nombre = document.querySelector(".conteiner-nombre .text-error");

//Campo Apellido
let apellido = document.querySelector("#apellido");
let mensaje_apellido = document.querySelector(".conteiner-apellido .text-error");

//Campo Email
let email = document.querySelector("#email");
let mensaje_email = document.querySelector(".conteiner-email .text-error");

//Campo Edad
let edad = document.querySelector("#edad");
let mensaje_edad = document.querySelector(".conteiner-edad .text-error");

//Modal
let modal = document.getElementById("modalForm");
let span_cierre = document.querySelector(".close");
let modalNombre = document.querySelector("#modalForm .nombre");
let modalApellido = document.querySelector("#modalForm .apellido");
let modalEmail = document.querySelector("#modalForm .email");
let modalEdad = document.querySelector("#modalForm .edad");
let modalError = document.querySelector("#modalForm .error");
let modalCorrecto = document.querySelector("#modalForm .correcto");

/*Validaciones*/
form.addEventListener("submit",function(Event){

    Event.preventDefault();

    //Bandera
    let errorFormulario = false;

    //Validacion nombre
    if(nombre.value.length < 3){
        errorFormulario = true;
        mensaje_nombre.innerHTML = "El nombre debe contener 3 o más caracteres";
        nombre.classList.add("error");
    }
    else{
        mensaje_nombre.innerHTML = "";
        nombre.classList.remove("error");
    }

    //Validacion apellido
    if(apellido.value.length < 3){
        errorFormulario = true;
        mensaje_apellido.innerHTML = "El apellido debe contener 3 o más caracteres";
        apellido.classList.add("error");
    }
    else{
        mensaje_apellido.innerHTML = "";
        apellido.classList.remove("error");
    }

    //Validacion Email
    var regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if(!regex.test(email.value)){
        errorFormulario = true;
        mensaje_email.innerHTML = "El formato del email es incorrecto";
        email.classList.add("error");
    }else{
        mensaje_email.innerHTML = "";
        email.classList.remove("error");
    }

    //validacion edad
    if(edad.value == ""){
        errorFormulario = true;
        mensaje_edad.innerHTML = "Debe completar la edad";
        edad.classList.add("error");
    }
    else if(!Number.isInteger(Number(edad.value))){
        errorFormulario = true;
        mensaje_edad.innerHTML = "Debe ingresar un número";
        edad.classList.add("error");
    }
    else if(Number(edad.value) < 0 || Number(edad.value) > 100){
        errorFormulario = true;
        mensaje_edad.innerHTML = "La edad debe ser entre 0 - 100";
        edad.classList.add("error");
    }
    else{
        mensaje_edad.innerHTML = "";
        edad.classList.remove("error");
    }
    if(errorFormulario == false){
        fetch('http://curso-dev-2021.herokuapp.com/newsletter/?name=' + nombre.value + '&apellido=' + apellido.value + '&email=' + email.value + '&edad=' + edad.value)
        .then(function (respuesta){
            return respuesta.json();
        })
        .then(function(respuestaJson){
            console.log(respuestaJson);
            modalNombre.innerHTML = "Nombre: " + respuestaJson.name;
            modalApellido.innerHTML = "Apellido: " + respuestaJson.apellido;
            modalEmail.innerHTML = "Email: " + respuestaJson.email;
            modalEdad.innerHTML = "Edad: " + respuestaJson.edad;
            modalCorrecto.innerHTML = "El formulario se envió correctamente"
            modal.style.display = "block";
        })
        .catch(function(error){
            modal.style.display = "block";
            modalError.innerHTML = "Error de consulta a la API";
        })
    }

    //Cerrarlo tocando en la X
    span_cierre.onclick = function(){
        modal.style.display = "none";
    }

    //Cerrarlo tocando fuera del modal
    window.onclick = function(event){
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
});