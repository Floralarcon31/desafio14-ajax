const clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
//lo guardo aca
let carrito = []

clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})

//agregar al carrito
function addToCarritoItem(e){
    //se ve el boton que se selecciono
  const button = e.target
    //obtengo la clase mas cercana - closest
  const item = button.closest('.card')
    //obtengo el contenido de los queryselector seleccionados
    //card title -contenido-
  const itemTitle = item.querySelector('.card-title').textContent;
    //precio  -contenido-
  const itemPrice = item.querySelector('.precio').textContent;
   //IMG - lo que se encuentre dentro de src
  const itemImg = item.querySelector('.card-img-top').src;

  //nuevo item al carrito
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}

//
function addItemCarrito(newItem){
    //alert cuando agrego exc.
  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')
  //obtengo el elemento que se encuentra en tbody
  const InputElemento = tbody.getElementsByClassName('input__elemento')
  //recorro el carrito
  for(let i =0; i < carrito.length ; i++){
      //si se cumple ya esta agregado la exc. 
    if(carrito[i].title.trim() === newItem.title.trim()){
        //suma
      carrito[i].cantidad ++;
      const inputValue = InputElemento[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  //agregar el nuevo item
  carrito.push(newItem)
  //
  renderCarrito()
} 

//
function renderCarrito(){

  tbody.innerHTML = ''

  carrito.map(item => {
      //creacion de tr
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    //contenido dentro del carrito
    const content = `
        <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    //agrega el content
    tr.innerHTML = content;
    tbody.append(tr)
    //EVENTO REMOVER ITEM
    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    //Evento change
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}
//TOTALDELCARRITO
function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    //primero que pase por el numero
    const precio = Number(item.precio.replace("$", ''))
    //EL TOTAL GUARDA EL VALOR QUE VAMOS IMPRIMIR
    Total = Total + precio*item.cantidad
  })
  //total de la compra
  itemCartTotal.innerHTML = `Total $${Total}`
  //guardar
  addLocalStorage()
}
// REMOVER DEL CARRITO
function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  //FOR - recorrer carrito
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
    //posicion del elemento que queremos eliminar y cant.
      carrito.splice(i, 1)
    }
  }
  //alert cuando  remuevo exc.
  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  //Ejecutar total
  CarritoTotal()
}
// sumar item (cant.)
function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  //recorrer carrito
  carrito.forEach(item => {
    if(item.title.trim() === title){
        //para que el usuario no pueda poner-1
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}
//local sTORAGE
function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

(function (){
    $(document).ready(function(){
        const storage = JSON.parse(localStorage.getItem('carrito'));
        if(storage){
          carrito = storage;
          renderCarrito()
        }
    })
}());

// compra
$(".btnReservar").on('click', procesarCompra);

function procesarCompra(){
    const itemCartTotal = document.querySelector('.itemCartTotal')
    console.log(itemCartTotal)
    if ( itemCartTotal === "") {
    
    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'No hay productos, selecciona alguno',
        showConfirmButton: false,
        timer: 2000
    }).then(function () {
        window.location = "cba.html";
    })
    } else {
    Swal.fire({
        type: 'success',
        title: 'RESERVA EXITOSA',
        text: 'Se ha enviado toda la info sobre la reserva a tu email',
        showConfirmButton: true,
        timer: 2000
    }).then(function () {
        window.location = "cba.html";
    })

   
}

}
   