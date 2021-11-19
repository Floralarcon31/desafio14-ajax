

// API DOLAR - DOLAR SI
// Turistas extranjeros tengan refencia en dolares / peso argentino


let urlDOLAR = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

$("#monedaEXT").click(function () {
  $.get(urlDOLAR, function (datos) {
    $("#box").prepend(`<div class='dolarCompra'>Compra: ${datos[0].casa.compra}</div>
                        <div class='dolarVenta'>Venta: ${datos[0].casa.venta}</div>`)
              //  .css("color", "red")
    
})

                    
});
//tiempo-en que se hace la cotizacion
let tiempo = new Date();
$("#monedaEXT").click(function () {
  
    $("#boxTiempo").html(`<div> DIA Y HORA DE LA COTIZACIÓN : <br>${tiempo} </div>`)
        .css("text-align", "center")
        .css("margin-top", "40px")
        .css("color", "dodgerblue")
            
                      
  });


// titulo animado
$("#dolarCambio")
    .html("DOLAR HOY ARGENTINA ")
        .css("color", "rgb(28,62,95)")
            .fadeOut(1000)  
                     .fadeIn(1000)

  
                     


