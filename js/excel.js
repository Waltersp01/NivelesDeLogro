let workbook = null;

/*
----------------------------------
CARGAR EXCEL
----------------------------------
*/
function cargarExcel(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function (e) {

            try {

                const data = new Uint8Array(e.target.result);

                workbook = XLSX.read(data, {
                    type: "array"
                });

                resolve(workbook);

            } catch (error) {

                reject(error);

            }

        };

        reader.readAsArrayBuffer(file);

    });

}

/*
----------------------------------
OBTENER NOMBRES DE HOJAS
----------------------------------
*/
function listarHojas() {

    if (!workbook) return [];

    return workbook.SheetNames.filter(nombre =>
        nombre.trim().toUpperCase() !== "INDICACIONES"
    );

}

/*
----------------------------------
OBTENER DATOS DE UNA HOJA
----------------------------------
*/
function obtenerDatosHoja(nombreHoja) {

    const hoja = workbook.Sheets[nombreHoja];

    let datos = XLSX.utils.sheet_to_json(
        hoja,
        {
            defval: ""
        }
    );

  datos = datos.filter(fila => {

    const id =
        String(fila.ID || "").trim();

    const nombre =
        String(fila.Nombres || "").trim();

    return (
        id !== "" &&
        id !== "ID" &&
        nombre !== ""
    );

});

    console.log("Total registros:", datos.length);

datos.forEach((fila, index) => {
    console.log(
        index,
        fila.ID,
        fila.Nombres
    );
});
    return datos;

}