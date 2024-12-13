fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
        const productos = data.productos;
        insertDOM(productos);
        //masInfo(productos.id);
    })
    .catch(error => console.error("Error al cargar el JSON:", error));

const prodContainer = document.getElementById('productos');
const cardContainer = document.createElement('article');
cardContainer.classList.add('card_container');

function insertDOM(productos) {
    productos.forEach(producto => {
        cardContainer.innerHTML += `
        <div class="card">
            <form class="card-form${producto.id}">
                <div class="card-content">
                    <div class="card-image">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <div class="card-data">
                        <h5 id="nombre${producto.id}" name="nombre" class="card-title">${producto.nombre}</h5>
                        <button id="btnMasInfo${producto.id}" class="button" onclick="masInfo('${producto.id}')" type="button">+Info</button>
                        <p class="card-subtitle" id="description${producto.id}">
                            ${producto.descripcion}
                            <br><br>
                            <button class="ocultarInfo" id="ocultarInfo${producto.id}"><i class="fa-solid fa-xmark"></i></button>
                        </p>
                        <p class="card-subtitle" id="tipo${producto.id}">
                            ${producto.tipo}
                        </p>
                    </div>
                    <div class="card-price-data">
                        <h5 id="precio${producto.id}" name="precio" class="card-price">${producto.precio} $</h5>
                    </div>
                    <div class="botonera" id="botonera${producto.id}">
                        <button onclick="comprar('${producto.id}')" class="button" value="Comprar" type="button">Comprar</button>
                    </div>
                </div>
            </form>
        </div>
      `;
        prodContainer.appendChild(cardContainer);
    });
}

function masInfo(id){
    let idx = id.toString();
    let desc = "description"+idx;
    let btn = "btnMasInfo"+idx;
    let ocultar = "ocultarInfo"+idx;
    
    let btnMasInfo = document.getElementById(btn);
    let descripcion = document.getElementById(desc);
    let ocultarInfo = document.getElementById(ocultar);
    
    btnMasInfo.addEventListener("click", (e) => {
        e.preventDefault();
        btnMasInfo.classList.add("invisible");
        descripcion.classList.add("visible");
    })
    ocultarInfo.addEventListener("click", (e) => {
        e.preventDefault();
        btnMasInfo.classList.remove("invisible");
        descripcion.classList.remove("visible");
    })
}

function comprarProducto(id) {
    let idx = id.toString();
    let form = 'card-form' + idx;
    let formProd = document.getElementById(form);

    const nombre = formProd.elements['nombre'].value;
    const precio = formProd.elements['precio'].value;
    
    console.log("Cantidad de elementos: "+ formProd.length);
    console.log("Nombre " + nombre);
    console.log("precio2 " + precio);
  
    //Armo el objeto a guardar
    let pedido = {
      "id" : Date.now(),
      "productoId" : idx,
      "name" : nombre,
      "price" : precio,
      "amount" : 1
    }
    
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem(pedido.id, JSON.stringify(pedido));
    } 
    
    return false;
  }