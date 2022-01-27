import { url as endpoint } from './url.js'

const ul = document.querySelector('.list-group');
const form = document.querySelector('.form-group');
const btnBuscar = document.querySelector('#btnNombre');

document.getElementById('inputId').style.display = 'none';

const getPeli = async () => {
    const resp = await fetch(endpoint)
    const data = await resp.json()

    data.forEach(element => {
        const {id, nombre, imagen, director, descripcion} = element
        ul.innerHTML += `
        <li class="list-group-item ms-auto">

        <div class="card" style="width: 18rem">
        <img src=${imagen} class="card-img-top w-50 ms-auto" alt="...">
            <div class="card-body justify-content-center">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${director}</p>
                <p class="card-text">${descripcion}</p>
                <button id=${id} class="btn btn-primary btn-sm float-end"> BORRAR </button>
            </div>
        </div>
        </li>
        `        
    });
}

window.addEventListener("DOMContentLoaded", getPeli);

ul.addEventListener('click', e => {
    const btnEliminar = e.target.classList.contains('btn-primary')

    if(btnEliminar){
        const id = e.target.id;
        fetch(endpoint + id, {
            method: 'DELETE'
        })
    }
    console.log(btnEliminar);
});

const capturarDatos = () => {
    const imagen = document.getElementById('inputImagen').value;
    const nombre = document.getElementById('inputNombre').value;
    const director = document.getElementById('inputDirector').value;
    const descripcion = document.getElementById('inputDescripcion').value;

    const user = {
        imagen, 
        nombre,
        director,
        descripcion
    }

    return user;
}

form.addEventListener('submit', async e => {
    e.preventDefault()
    const objeto = capturarDatos()

    await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
})

btnBuscar.addEventListener('click', async () => {
    const input = document.getElementById('inputNombre').value 

    const resp = await fetch(endpoint)
    const data = await resp.json()

    const buscado = data.find(u => u.nombre.toLocaleLowerCase() === input.toLocaleLowerCase())

    if(buscado !== undefined) {
        const {imagen, nombre, descripcion, director, id} = buscado
        document.getElementById('inputImagen').value = imagen;
        document.getElementById('inputNombre').value = nombre;
        document.getElementById('inputDirector').value = director;
        document.getElementById('inputDescripcion').value = descripcion;
        document.getElementById('inputId').value = id;
    } else {
        alert("Nombre no encontrado")
    }
})

btnModificar.addEventListener('click', async () => {
    const dataModificar = capturarDatos()
    const {imagen, director, nombre, descripcion} = dataModificar

    if (imagen === "", nombre === "", descripcion === "" , director === ""){
        alert("Llenar todos los campos")
    } else {
        const id = document.getElementById('inputId').value 

        await fetch(endpoint + id, {
            method: 'PUT',
            body: JSON.stringify(dataModificar),
            headers: {
                'Content-Type':'application/json; charset=utf-8'
            }
        })
    }
})