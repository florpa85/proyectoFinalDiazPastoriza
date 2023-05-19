const pintarCarrito = () => {

  modalBody.innerHTML = ""; 
  modalBody.style.display = "flex";
  guardarLocalStorage();

   //header Modal
  const modalHeader= document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML +=
  `<h5 class="modal-title">Carrito</h5>
  <button class="cerrar-modal" type="button"><span class="material-symbols-outlined">
  close
  </span></button>`;
  
                     
  modalBody.append(modalHeader);

  //header boton cerrar modal
  let modalButton = modalHeader.querySelector(".cerrar-modal");
 
  modalButton.addEventListener("click",()=>{
       modalBody.style.display = "none";
  });

  modalHeader.append(modalButton);
 
  //dibujar modal

  carrito.forEach((prod) => {
    let carritoContenido = document.createElement("div");
    carritoContenido.className = "modal-contenido"; 
       
    carritoContenido.innerHTML = `
      <img src="${prod.img}">
      <p>${prod.titulo}</p>
      <p>Color: ${prod.color}</p>
      <p>$${prod.precio}</p>
      <button class="menos" type="button">
        <span class="material-symbols-outlined">arrow_drop_down</span>
      </button>
      <p>Cantidad: ${prod.cantidad}</p>
      <button class="mas" type="button">
        <span class="material-symbols-outlined">arrow_drop_up</span>
      </button>
      <p>Subtotal: ${prod.cantidad* prod.precio}</p>
      <button class= "eliminar" type="button">
        <span class="material-symbols-outlined">close</span>
      </button>
      `;
  modalBody.append(carritoContenido);  

  //botones sumar, restar y eliminar
     
    let menos =carritoContenido.querySelector(".menos");

    menos.addEventListener(("click"), () =>{
       if(prod.cantidad !== 1){
       prod.cantidad--;
       }
       guardarLocalStorage();
       pintarCarrito();
    });


    let mas =carritoContenido.querySelector(".mas");

    mas.addEventListener(("click"), () =>{
       prod.cantidad++;
       guardarLocalStorage();
       pintarCarrito();
    });


    let eliminar = carritoContenido.querySelector(".eliminar");

    eliminar.addEventListener(("click"),() =>{
      Swal.fire({
        html:`<span class="material-symbols-outlined">check
             </span>`,
        title: '<span class="titulo-sw"> El producto fue eliminado!!</span>',
        confirmButtonColor:"#6E6D70",
        customClass:"swal-vaciar",
        });

      eliminarProd(prod.id);   
      pintarCarrito();
    });

  });

  //Footer Modal

  const modalFooter= document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML +=
    ` <button class="vaciar-carrito" type="button">Vaciar Carrito</button>
      <button class="finalizar-compra" type="button">Finalizar Compra</button>
    `;
                   
  modalBody.append(modalFooter);

  //Botón Vaciar

  let vaciar =modalFooter.querySelector(".vaciar-carrito");
   
  vaciar.addEventListener(("click"),() =>{
  VaciarCarrito();
  
    
  });

  //Botón Finalizar
   
  let finalizar =modalFooter.querySelector(".finalizar-compra");

  finalizar.addEventListener(("click"), () =>{ 
    
    if(carrito.length == 0){
      Swal.fire({
        html:`<span class="material-symbols-outlined">error
              </span>`,
        title:'<span class="titulo-sw"> Tu carrito está vacío!!</span>',
        confirmButtonColor:"#6E6D70",
        customClass:"swal-vaciar",
      });
    } else {
        Swal.fire({
          html:`<span class="material-symbols-outlined">check
               </span>`,
          title: '<span class="titulo-sw"> Tu compra fue realizada con éxito!!</span>',
          confirmButtonColor:"#6E6D70",
          customClass:"swal-vaciar",

        }); 
      }
  });
 

  //total carrito
 
  const total =carrito.reduce((acumulador,e)=> acumulador + e.precio * e.cantidad,0);
 
    const totalCompra =document.createElement("div");
    totalCompra.className = "total-carrito";
    totalCompra.innerHTML = `El total a pagar es: $${total}`;
    modalBody.append(totalCompra);
   
  
};


//ver carrito

verCarrito.addEventListener("click",pintarCarrito);

//vaciar carrito  

function VaciarCarrito(){

  Swal.fire({
    title: '<span class="titulo-sw"> Quiere vaciar el carrito?</span>',
    html:`<span class="material-symbols-outlined">priority_high
          </span>`,
    showCancelButton: true,
    confirmButtonText: "Si!",
    confirmButtonColor:"#6E6D70",
    cancelButton: "No!",
    cancelButtonColor:"#6E6D70",
    customClass:"swal-vaciar"
  }).then((result) => {
    if(result.value){
      carrito =[];
      carrito.innerHTML = "";
      carritoCounter();
      guardarLocalStorage();
      pintarCarrito();
      Swal.fire({
        title: '<span class="titulo-sw"> Carrito vacío!</span>',
        html: `<span class="material-symbols-outlined">check
              </span>`,
        confirmButtonColor:"#6E6D70",
        customClass:"swal-vaciar"
      });
    }
  });
}; 
  
//Eliminar Productos 

const eliminarProd = (id) => {

  const buscarID = carrito.find((e)=> e.id === id);

  carrito = carrito.filter((carritoID) => {
      return carritoID !== buscarID;
  });
  carritoCounter();
  guardarLocalStorage();
  pintarCarrito();
};  

  //contador carrito

const carritoCounter = () =>{

  cantidadCarrito.style.display="block";
  const carritoBuscar = carrito.length;
  localStorage.setItem("carritoBuscar", JSON.stringify(carritoBuscar));
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoBuscar"));
};
 
carritoCounter();
 
