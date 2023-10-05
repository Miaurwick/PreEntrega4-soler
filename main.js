const productos = [
  {
    nombre: "Spatiphyllum",
    precio: 15.99,
    imagen: "Spatiphyllum.jpg",
    categoria: "sol",
    id: 1,
    stock: 20,
  },
  {
    nombre: "Bonsai",
    precio: 19.99,
    imagen: "Bonsai.jpg",
    categoria: "sol",
    id: 2,
    stock: 30,
  },
  {
    nombre: "Alocasia",
    precio: 12.49,
    imagen: "Alocasia.jpg",
    categoria: "Sombra",
    id: 3,
    stock: 12,
  },
  {
    nombre: "Makoyana",
    precio: 24.99,
    imagen: "Calathea-Makoyana.jpg",
    categoria: "sol",
    id: 4,
    stock: 15,
  },
  {
    nombre: "Dracena",
    precio: 29.99,
    imagen: "Dracena-Lemon.jpg",
    categoria: "sombra",
    id: 5,
    stock: 18,
  },
  {
    nombre: "Kentya",
    precio: 29.99,
    imagen: "Kentya.jpg",
    categoria: "sombra",
    id: 6,
    stock: 55,
  },
  {
    nombre: "Monstera",
    precio: 29.99,
    imagen: "Monstera.jpg",
    categoria: "sol",
    id: 7,
    stock: 20,
  },
  {
    nombre: "Sansevieria",
    precio: 29.99,
    imagen: "Sansevieria.jpg",
    categoria: "sombra",
    id: 8,
    stock: 60,
  },
  {
    nombre: "Rowleyanus",
    precio: 29.99,
    imagen: "Senecio-Rowleyanus.jpg",
    categoria: "sol",
    id: 9,
    stock: 14,
  },
  {
    nombre: "Siempreviva",
    precio: 29.99,
    imagen: "siempreviva.jpg",
    categoria: "sol",
    id: 10,
    stock: 42,
  },
];

let carrito = [];
let carritoRecuperado = localStorage.getItem("carrito")
if(carritoRecuperado){
  carrito = JSON.parse(carritoRecuperado)
}

renderizarProducutos(productos, carrito);
renderizarCarrito(carrito)

function renderizarProducutos(productos, carrito) {
  let contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    let card = document.createElement("div");

    card.className = "contorno";

    card.innerHTML = `
      <h3 class=titutloProducto >${producto.nombre}</h3>
      <img class=productosImagenes src=./assets/${producto.imagen} />
      <p class=parrafoPrecio >Precio: $${producto.precio}</p>
      <p class=categoria >Categoria: ${producto.categoria}</p>
      <button class="btn" id=${producto.id} >Agregar al carrito</button>
      `;

    contenedor.appendChild(card);
    let botonAgregarAlCarrito = document.getElementById(producto.id);
    botonAgregarAlCarrito.addEventListener("click", (e) =>
      agregarProductoAlCarrito(productos, carrito, e)
    );
  });
}


let buscador = document.getElementById("buscador");
let botonBuscar = document.getElementById("buscar");

function filtrar(productos) {
  let productosFiltrados = productos.filter((productos) =>
    productos.nombre.includes(buscador.value)
  );
  renderizarProducutos(productosFiltrados, carrito);
}

botonBuscar.addEventListener("click", () => filtrar(productos));

function agregarProductoAlCarrito(productos, carrito, e) {
  let productoBuscado = productos.find(
    (producto) => producto.id === Number(e.target.id)
  );
  let productoEnCarrito = carrito.find(
    (producto) => producto.id === productoBuscado.id
  );

  if (productoBuscado.stock > 0) {
    if (productoEnCarrito) {
      productoEnCarrito.unidades++;
      productoEnCarrito.subtotal =
        productoEnCarrito.unidades * productoEnCarrito.precioUnitario;
    } else {
      carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        precioUnitario: productoBuscado.precio,
        unidades: 1,
        subtotal: productoBuscado.precio,
        imagen: productoBuscado.imagen,
        categoria: productoBuscado.categoria,
      });
    }
    productoBuscado.stock--;
    localStorage.setItem("carrito", JSON.stringify(carrito))
  } else {
    alert("No hay más stock del producto seleccionado");
  }

  renderizarCarrito(carrito);
}

function renderizarCarrito(productosEnCarrito) {
  let divCarrito = document.getElementById("carrito");
  divCarrito.innerHTML = "";
  console.log(divCarrito)


  productosEnCarrito.forEach((producto) => {
    let tarjetaCarrito = document.createElement("div");
    tarjetaCarrito.innerHTML = `
      <h3 class=titutloProducto >${producto.nombre}</h3>
      <img class=productosImagenes src=./assets/${producto.imagen} />
      <p class=parrafoPrecio >Precio: $${producto.precio}</p>
      <p class=categoria >Categoria: ${producto.categoria}</p>
  `;

    divCarrito.appendChild(tarjetaCarrito);
  });
}
