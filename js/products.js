fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
        const productos = data.productos;
        insertDOM(productos);
        //masInfo(productos.id);
    })
    .catch(error => console.error("Error al cargar el JSON:", error));

const prodContainer = document.getElementById('productos');
const carddContainer = document.createElement('article');
carddContainer.classList.add('cardd_container');

function insertDOM(productos) {
    productos.forEach(producto => {
        carddContainer.innerHTML += `
        <div class="cardd">
            <form class="cardd-form${producto.id}">
                <div class="cardd-content">
                    <div class="cardd-image">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <div class="cardd-data">
                        <h5 id="nombre${producto.id}" name="nombre" class="cardd-title">${producto.nombre}</h5>
                        <p class="cardd-subtitle" id="description${producto.id}">
                            ${producto.descripcion}
                            <br>
                            <button class="ocultarInfo" id="ocultarInfo${producto.id}"><i class="fa-solid fa-xmark"></i></button>
                        </p>
                        <p class="cardd-subtitle" id="tipo${producto.id}">
                            ${producto.tipo}
                        </p>
                    </div>
                    <div class="botonera" id="botonera${producto.id}-1">
                        <button id="btnMasInfo${producto.id}" class="button" onclick="masInfo('${producto.id}')" type="button">+Info</button>
                    </div>
                    <div class="cardd-price-data">
                        <h5 id="precio${producto.id}" name="precio" class="cardd-price">${producto.precio} $</h5>
                    </div>
                    <div class="botonera" id="botonera${producto.id}-2">
                        <button onclick="comprarProducto('${producto.id}')" class="button" value="Comprar">Comprar</button>
                    </div>
                </div>
            </form>
        </div>
      `;
        prodContainer.appendChild(carddContainer);
    });
}

function masInfo(id) {
    let idx = id.toString();
    let desc = "description" + idx;
    let btn = "btnMasInfo" + idx;
    let ocultar = "ocultarInfo" + idx;
    let btnDiv = "botonera" + idx + "-1";

    let btnMasInfo = document.getElementById(btn);
    let descripcion = document.getElementById(desc);
    let ocultarInfo = document.getElementById(ocultar);
    let botonera = document.getElementById(btnDiv);

    btnMasInfo.addEventListener("click", (e) => {
        e.preventDefault();
        btnMasInfo.classList.add("invisible");
        botonera.classList.add("invisible");
        descripcion.classList.add("visible");
    })
    ocultarInfo.addEventListener("click", (e) => {
        e.preventDefault();
        btnMasInfo.classList.remove("invisible");
        botonera.classList.remove("invisible");
        descripcion.classList.remove("visible");
    })
}

function comprarProducto(id) {
    event.preventDefault();
    let idx = id.toString();
    let formId = 'cardd-form' + idx; 
    let formProd = document.querySelector(`.${formId}`);

    if (!formProd) {
        console.error(`Formulario con ID ${formId} no encontrado.`);
        return;
    }
    const nombre = document.getElementById(`nombre${idx}`).textContent.trim();
    const precio = document.getElementById(`precio${idx}`).textContent.trim().replace('$', '').trim();

    let pedido = {
        id: Date.now(),
        productoId: idx,
        name: nombre,
        price: parseFloat(precio),
        amount: 1
    };

    console.log("Pedido generado:", pedido);

    if (typeof Storage !== "undefined") {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(pedido);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        alert(`Producto "${pedido.name}" añadido al carrito.`);

    } else {
        console.error("El almacenamiento local no está soportado en este navegador.");
    }

    return false;
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tbody = document.querySelector('#carrito-table tbody');
    const totalCarrito = document.getElementById('total-carrito');

    tbody.innerHTML = '';

    let total = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.price * producto.amount;
        total += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.name}</td>
            <td>${producto.price} $</td>
            <td>
                <button class="btn btn-warning btn-actualizar" onclick="actualizarCantidad(${index}, -1)">-</button>
                ${producto.amount}
                <button class="btn btn-warning btn-actualizar" onclick="actualizarCantidad(${index}, 1)">+</button>
            </td>
            <td>${subtotal.toFixed(2)} $</td>
            <td>
                <button class="btn btn-danger btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;

        tbody.appendChild(fila);
    });
    totalCarrito.textContent = total.toFixed(2);
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}
function actualizarCantidad(index, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].amount += cantidad;

    if (carrito[index].amount < 1) {
        carrito[index].amount = 1;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem(
            'carrito',
            JSON.stringify([
                { name: 'Producto 1', price: 10, amount: 1 },
                { name: 'Producto 2', price: 20, amount: 2 }
            ])
        );
    }
    mostrarCarrito();
});

document.getElementById('carritoModal').addEventListener('show.bs.modal', () => {
    mostrarCarrito();
});