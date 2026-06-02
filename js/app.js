let resultadoCompetenciasGlobal = {};
let totalEstudiantesGlobal = 0;
let modoVisualizacionGlobal = "cantidad";

let coloresGrafico = {
    AD: "#2563eb",
    A: "#16a34a",
    B: "#f59e0b",
    C: "#dc2626"
};

const excelFile = document.getElementById("excelFile");
const sheetSelector = document.getElementById("sheetSelector");
const competenciaSelector = document.getElementById("competenciaSelector");
const modoVisualizacion = document.getElementById("modoVisualizacion");

excelFile.addEventListener("change", async function(e){

    const archivo = e.target.files[0];

    if(!archivo) return;

    try{
        await cargarExcel(archivo);
        cargarSelectorHojas();
    }
    catch(error){
        console.error(error);
        alert("Error al leer el archivo");
    }

});

function cargarSelectorHojas(){

    const hojas = listarHojas();

    sheetSelector.innerHTML = "";

    const optionInicial = document.createElement("option");
    optionInicial.value = "";
    optionInicial.textContent = "Seleccione una hoja";
    sheetSelector.appendChild(optionInicial);

    hojas.forEach(nombre => {

        const option = document.createElement("option");
        option.value = nombre;
        option.textContent = nombre;
        sheetSelector.appendChild(option);

    });

}

sheetSelector.addEventListener("change", function(){

    const hoja = this.value;

    if(!hoja) return;

    const datos = obtenerDatosHoja(hoja);

    procesarHoja(hoja, datos);

});

function procesarHoja(nombreHoja, datos){

    const columnasNL = obtenerColumnasNL(datos);

    cargarCompetencias(columnasNL);

    const resultadoCompetencias =
        contarPorCompetencia(datos, columnasNL);

    resultadoCompetenciasGlobal = resultadoCompetencias;
    totalEstudiantesGlobal = datos.length;

    document.getElementById("resultadoCompetencia").innerHTML = `
        <p class="mensaje">
            Seleccione una competencia.
        </p>
    `;

}

function cargarCompetencias(columnasNL){

    competenciaSelector.innerHTML = "";

    const optionInicial = document.createElement("option");
    optionInicial.value = "";
    optionInicial.textContent = "Seleccione una competencia";
    competenciaSelector.appendChild(optionInicial);

    columnasNL.forEach(comp => {

        const option = document.createElement("option");
        option.value = comp;
        option.textContent = "Competencia " + comp;
        competenciaSelector.appendChild(option);

    });

}

function calcularPorcentaje(cantidad, total){

    if(total === 0) return "0.0";

    return (cantidad / total * 100).toFixed(1);

}

function mostrarCompetenciaSeleccionada(){

    const competencia = competenciaSelector.value;

    if(!competencia) return;

    const datosCompetencia =
        resultadoCompetenciasGlobal[competencia];

    if(!datosCompetencia) return;

    const porcentajeAD =
        calcularPorcentaje(datosCompetencia.AD, totalEstudiantesGlobal);

    const porcentajeA =
        calcularPorcentaje(datosCompetencia.A, totalEstudiantesGlobal);

    const porcentajeB =
        calcularPorcentaje(datosCompetencia.B, totalEstudiantesGlobal);

    const porcentajeC =
        calcularPorcentaje(datosCompetencia.C, totalEstudiantesGlobal);

    let contenido = `
        <h3>Competencia ${competencia}</h3>
    `;

    if(modoVisualizacionGlobal === "cantidad"){

        contenido += `
            <div class="tabla-estadistica">
        <div class="fila-estadistica">
            <span>AD</span>
            <strong>${datosCompetencia.AD}</strong>
        </div>

        <div class="fila-estadistica">
            <span>A</span>
            <strong>${datosCompetencia.A}</strong>
        </div>

        <div class="fila-estadistica">
            <span>B</span>
            <strong>${datosCompetencia.B}</strong>
        </div>

        <div class="fila-estadistica">
            <span>C</span>
            <strong>${datosCompetencia.C}</strong>
        </div>
    </div>
        `;

    } else {

        contenido += `
            <p>AD: ${porcentajeAD}%</p>
            <p>A: ${porcentajeA}%</p>
            <p>B: ${porcentajeB}%</p>
            <p>C: ${porcentajeC}%</p>
        `;

    }

    document.getElementById("resultadoCompetencia").innerHTML = contenido;

    crearGraficoCompetencia(
        competencia,
        datosCompetencia,
        modoVisualizacionGlobal,
        totalEstudiantesGlobal
    );

}

competenciaSelector.addEventListener(
    "change",
    mostrarCompetenciaSeleccionada
);

modoVisualizacion.addEventListener("change", function(){

    modoVisualizacionGlobal = this.value;
    mostrarCompetenciaSeleccionada();

});

document.getElementById("colorAD").addEventListener("input", function(){
    coloresGrafico.AD = this.value;
    mostrarCompetenciaSeleccionada();
});

document.getElementById("colorA").addEventListener("input", function(){
    coloresGrafico.A = this.value;
    mostrarCompetenciaSeleccionada();
});

document.getElementById("colorB").addEventListener("input", function(){
    coloresGrafico.B = this.value;
    mostrarCompetenciaSeleccionada();
});

document.getElementById("colorC").addEventListener("input", function(){
    coloresGrafico.C = this.value;
    mostrarCompetenciaSeleccionada();
});