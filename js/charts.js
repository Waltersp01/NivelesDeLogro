let graficoCompetencia = null;

function crearGraficoCompetencia(
    competencia,
    datosCompetencia,
    modo,
    total
){

    const ctx = document.getElementById("barChart");

    if(graficoCompetencia){
        graficoCompetencia.destroy();
    }

    let datosGrafico = [];
    let etiqueta = "";

    if(modo === "cantidad"){

        datosGrafico = [
            datosCompetencia.AD,
            datosCompetencia.A,
            datosCompetencia.B,
            datosCompetencia.C
        ];

        etiqueta = "Cantidad - Competencia " + competencia;

    } else {

        datosGrafico = [
            ((datosCompetencia.AD / total) * 100).toFixed(1),
            ((datosCompetencia.A / total) * 100).toFixed(1),
            ((datosCompetencia.B / total) * 100).toFixed(1),
            ((datosCompetencia.C / total) * 100).toFixed(1)
        ];

        etiqueta = "Porcentaje - Competencia " + competencia;

    }

    graficoCompetencia = new Chart(ctx, {

        type: "bar",

        data: {
            labels: ["AD", "A", "B", "C"],

            datasets: [{
                label: etiqueta,
                data: datosGrafico,

                backgroundColor: [
                    coloresGrafico.AD,
                    coloresGrafico.A,
                    coloresGrafico.B,
                    coloresGrafico.C
                ],

                borderWidth: 1
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true,
                    max: modo === "porcentaje" ? 100 : undefined,

                    ticks: {
                        precision: 0,

                        callback: function(value){
                            return modo === "porcentaje"
                                ? value + "%"
                                : value;
                        }
                    }
                }
            },

            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context){
                            return modo === "porcentaje"
                                ? context.parsed.y + "%"
                                : context.parsed.y;
                        }
                    }
                }
            }
        }

    });

}