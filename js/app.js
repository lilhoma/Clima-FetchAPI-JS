const formulario = document.querySelector('#formulario');
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})


function buscarClima(e) {
    e.preventDefault();

    // validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    
    if (ciudad === '' || pais === '') {
        // hubo un error
        mostrarError('Ambos campos son obligatorios...');
        return;
    }
    
    // consultar la 
    consultarAPI(ciudad, pais);

} 

function mostrarError(mensaje) {
    // validar si hay alerta
    const alerta = document.querySelector('.bg-red-100')

    if (!alerta) {
        // crear alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
        <strong class="font-bold" >Error!</strong>
        <span class="block"  > ${mensaje} </span>
        `
        container.appendChild(alerta);
        
        // eliminar alerta despues de 3 seg
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}

function consultarAPI(ciudad, pais) {
    const APIKey = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad },${pais}&appid=${APIKey}`;

    Spinner();// muestra un spinner de carga
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            limpiarHTML(); // limpiar el html antes de otra consulta
            console.log(data)
            if (data.cod === '404') {
                mostrarError('Ciudad no encontrada...');
                return;
            }
            // Imprime los datos en el HTML
            mostrarClima(data);
        })
}

function mostrarClima(data) {
    const { name, main:{ temp,temp_min, temp_max  } } = data;
    
    const centigrados = kelvinACelcius(temp);
    const minima = kelvinACelcius(temp_min);
    const maxima = kelvinACelcius(temp_max);
    
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')
    
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');
    
    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Temp. Minima: ${minima} &#8451;`;
    tempMin.classList.add('font-bold', 'text-xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Temp. Maxima: ${maxima} &#8451;`;
    tempMax.classList.add('font-bold', 'text-xl');
    
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMin);
    resultadoDiv.appendChild(tempMax);

    resultado.appendChild(resultadoDiv);
    
}

const  kelvinACelcius = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);

}
