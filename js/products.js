fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
        const productos = data.productos;
        insertDOM(productos);
    })
    .catch(error => console.error("Error al cargar el JSON:", error));

const prodContainer = document.getElementById('productos');
const cardContainer = document.createElement('article');
cardContainer.classList.add('card_container');

function insertDOM(productos) {

    productos.forEach(producto => {
        cardContainer.innerHTML += `
        <div class="card">
            <form class="card-form" onsubmit="addProduct()">
                <div class="card-content">
                    <div class="card-image">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <div class="card-data">
                        <h5 id="nombre" class="card-title">${producto.nombre}</h5>
                        <p class="card-subtitle" id="description">
                            ${producto.descripcion}
                        </p>
                        <p class="card-subtitle" id="tipo">
                            ${producto.tipo}
                        </p>
                    </div>
                    <div class="card-price-data">
                        <h5 id="precio" class="card-price">${producto.precio} $</h5>
                    </div>
                    <div class="botonera" id="botonera">
                        <input class="button" type="submit" value="Comprar">
                    </div>
                </div>
            </form>
        </div>
      `;
        prodContainer.appendChild(cardContainer);
    });
}