fetch("./productos.json")
  .then((respuesta) => respuesta.json())
  .then(productos =>  principal(productos))

function principal(productos) {
  
  let buscador = document.getElementById("buscador");
  let botonBuscar = document.getElementById("buscar");
  
  botonBuscar.addEventListener("click", () => filtrar(productos, buscador));
  
  let botonVerOcultar = document.getElementById("verOcultar");
  botonVerOcultar.addEventListener("click", verOcultarCarrito);

  renderizarProducutos(productos);
  renderizarCarrito();
}

function renderizarProducutos(productos) {
  let contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  productos.forEach(({ precio, imagen, nombre, categoria, id }) => {
    let card = document.createElement("div");

    card.className = "contorno";

    card.innerHTML = `
      <h3 class=titutloProducto >${nombre}</h3>
      <img class=productosImagenes src=./assets/${imagen} />
      <p class=parrafoPrecio >Precio: $${precio}</p>
      <p class=categoria >Categoria: ${categoria}</p>
      <button class="btn" id=${id} >Agregar al carrito</button>
      `;

    contenedor.appendChild(card);
    let botonAgregarAlCarrito = document.getElementById(id);
    botonAgregarAlCarrito.addEventListener("click", () =>
      mensaje("Prodcuto añadido al carrito", 1300)
    );
    botonAgregarAlCarrito.addEventListener("click", (e) =>
      agregarProductoAlCarrito(productos, e, {
        id,
        nombre,
        precio,
        imagen,
        categoria,
      })
    );
  });
}

function filtrar(productos, buscador) {
  let productosFiltrados = productos.filter((productos) =>
    productos.nombre.includes(buscador.value)
  );
  renderizarProducutos(productosFiltrados);
}

function agregarProductoAlCarrito(productos, e) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
        precioUnitario: productoBuscado.precioUnitario,
        unidades: 1,
        subtotal: productoBuscado.precio,
        imagen: productoBuscado.imagen,
        categoria: productoBuscado.categoria,
      });
    }
    productoBuscado.stock--;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    alert("No hay más stock del producto seleccionado");
  }

  renderizarCarrito();
}

function renderizarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length > 0) {
    let divCarrito = document.getElementById("carrito");
    divCarrito.innerHTML = "";

    carrito.forEach(({ nombre, precio, categoria, imagen }) => {
      let tarjetaCarrito = document.createElement("div");
      tarjetaCarrito.innerHTML = `
        <h3 class=titutloProducto >${nombre}</h3>
        <img class=productosImagenes src=./assets/${imagen} />
        <p class=parrafoPrecio >Precio: $${precio}</p>
        <p class=categoria >Categoria: ${categoria}</p>
    `;

      divCarrito.appendChild(tarjetaCarrito);
    });
  }
    let boton = document.getElementById("comprar");
    boton.addEventListener("click", finalizarCompra);
    boton.addEventListener("click", () => mensaje("Gracias por comprar en el Rincon De Las Hesperides", 1300)); 
}

function finalizarCompra() {
  let carrito = document.getElementById("carrito");
  carrito.innerHTML = "";
  localStorage.removeItem("carrito");
}

function verOcultarCarrito() {
  let carrito = document.getElementById("contenedorCarrito");
  let contenedorProductos = document.getElementById("contenedorPadre");

  carrito.classList.toggle("oculta");
  contenedorProductos.classList.toggle("oculta");
}
function mensaje(text, duration) {
  Toastify({
    text,
    duration,
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to left, #00b09b, #96c93d)",
    },
  }).showToast();
  console.log(text)
}
