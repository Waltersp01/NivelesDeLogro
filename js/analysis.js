/*
=================================
DETECTAR COLUMNAS NL
=================================
*/
function obtenerColumnasNL(datos) {

    if (!datos.length) return [];

    const columnas = Object.keys(datos[0]);

    console.log("TODAS LAS COLUMNAS:");
    console.log(columnas);

    return columnas.filter(col => {

        return (
            col !== "ID" &&
            col !== "Cód. Estudiante" &&
            col !== "Nombres" &&
            !col.includes("_")
        );

    });

}

/*
=================================
CONTAR NIVELES POR COMPETENCIA
=================================
*/
function contarPorCompetencia(datos, columnasNL) {

    const resultado = {};

    columnasNL.forEach(col => {

        resultado[col] = {
            AD: 0,
            A: 0,
            B: 0,
            C: 0
        };

    });

    datos.forEach(fila => {

        columnasNL.forEach(col => {

            const valor =
                String(fila[col] || "")
                .trim()
                .toUpperCase();

            if (
                resultado[col] &&
                resultado[col][valor] !== undefined
            ) {

                resultado[col][valor]++;

            }

        });

    });

    return resultado;

}

/*
=================================
TOTALES GENERALES
=================================
*/
function contarTotales(resultadoCompetencias) {

    let totales = {

        AD: 0,
        A: 0,
        B: 0,
        C: 0

    };

    Object.values(resultadoCompetencias)
    .forEach(comp => {

        totales.AD += comp.AD;
        totales.A += comp.A;
        totales.B += comp.B;
        totales.C += comp.C;

    });

    return totales;

}