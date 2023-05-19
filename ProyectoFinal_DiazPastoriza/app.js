
const contenedorShop = document.getElementById("contenedor-items");
const verCarrito = document.getElementById("verCarrito");
const modalBody = document.getElementById("modalContainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");
let carritoContenido = [];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const getProducts = async ()=>{
  const response = await fetch("stock.json");
  const data = await response.json();
  
  data.forEach((prod)=>{
    let content = document.createElement("div");
    content.innerHTML =`
    <div  class="row">
        <div class="col-md-12 col-xl-6">
            <div class="mt-5 mb-5 ms-5">
              <div class="col">
                <h2 class="cups_t">${prod.titulo}</h2>
                <p class="cups_d">Color: ${prod.color}</p>
                <p class="cups_d"> Descripción: ${prod.descripcion}</p>
              </div>
            </div>
        </div> 
        <div class="col-md-12  col-xl-6">
            <div class="mt-4 mb-4">
              <div class="col">
                 <p class="cup_name">${prod.nombre}</p>
                 <img class="img-fluid" src="${prod.img}" alt="cup_montjuic_beige">
                 <div class="carrito-fav">
                   <span class="material-symbols-outlined">
                     favorite
                   </span>
                   <button class="comprar" type="button">Comprar</button>
                   <p class="precio-carro">$${prod.precio}</p>
                 </div>
              </div> 
            </div>
        </div>     
    </div>        
    `;

    contenedorShop.append(content);


    let Comprar = content.querySelector("button");
      Comprar.addEventListener("click",()=>{
        Swal.fire({
          html:`<span class="material-symbols-outlined">favorite</span>`,
          title: '<span class="titulo-alert"> Hay un nuevo producto en tu carrito!</span>',
          background: "rgba(186, 179, 179, 0.4)",
          confirmButtonColor:"#6E6D70",
          customClass:"swal-comprar",

      
        });

    const repetido = carrito.some((repProd) => repProd.id === prod.id);
      
      if(repetido) {

        carrito.map((product) =>{
          if(product.id === prod.id){
            product.cantidad++;
          }
        });
        } else{
          carrito.push({
          id: prod.id,
          img: prod.img,
          titulo: prod.titulo,
          precio: prod.precio,
          cantidad: prod.cantidad,
          color: prod.color,

        });
     
      carritoCounter();
      guardarLocalStorage();
     
      }
   
    });
   
  });
   
};
getProducts();

const guardarLocalStorage = () =>{

  localStorage.setItem("carrito", JSON.stringify (carrito));

};





