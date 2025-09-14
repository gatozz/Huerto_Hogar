// Lista de productos con categorías
const productos = [
  { id: 1, nombre: "Manzanas Fuji", precio: 1200, categoria: "Frutas" },
  { id: 2, nombre: "Naranjas Valencia", precio: 1000, categoria: "Frutas" },
  { id: 3, nombre: "Plátanos Cavendish", precio: 800, categoria: "Frutas" },
  { id: 4, nombre: "Zanahorias Orgánicas", precio: 900, categoria: "Verduras" },
  { id: 5, nombre: "Espinacas Frescas", precio: 700, categoria: "Verduras" },
  { id: 6, nombre: "Pimientos Tricolores", precio: 1500, categoria: "Verduras" },
  { id: 7, nombre: "Miel Orgánica", precio: 5000, categoria: "Orgánicos" },
  { id: 8, nombre: "Quinua Orgánica", precio: 6000, categoria: "Orgánicos" },
  { id: 9, nombre: "Leche Entera", precio: 2000, categoria: "Lacteos" }
];

// Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosFiltrados = [...productos];

// Iniciar cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarCategorias();
  mostrarProductos(productosFiltrados);
  mostrarCarrito();

  // Botón limpiar carrito
  const btnLimpiar = document.getElementById("btnLimpiar");
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", limpiarCarrito);
  }
});

// Mostrar categorías en un <select>
function mostrarCategorias() {
  const select = document.getElementById("filtroCategoria");
  const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    const categoria = e.target.value;
    productosFiltrados = (categoria === "Todos")
      ? [...productos]
      : productos.filter(p => p.categoria === categoria);

    mostrarProductos(productosFiltrados);
  });
}

// Mostrar productos filtrados
function mostrarProductos(lista) {
  const contenedor = document.getElementById("listaProductos");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="vacío">
        <i class="fas fa-search"></i>
        <p>No hay productos en esta categoría</p>
      </div>
    `;
    return;
  }

  lista.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("producto");
    item.innerHTML = `
      <span class="categoria">${p.categoria}</span>
      <h3>${p.nombre}</h3>
      <p class="precio">$${p.precio.toLocaleString("es-CL")}</p>
      <button class="btn-agregar" onclick="agregarAlCarrito(${p.id})">
        <i class="fas fa-cart-plus me-1"></i> Agregar
      </button>
    `;
    contenedor.appendChild(item);
  });
}

// Agregar productos al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    if (existe.cantidad >= 5) {
      alert("⚠️ No puedes agregar más de 5 unidades de este producto.");
      return;
    }
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  
  // Efecto visual de agregado
  const btn = event.target;
  btn.innerHTML = '<i class="fas fa-check me-1"></i> Agregado';
  btn.style.backgroundColor = '#4CAF50';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-cart-plus me-1"></i> Agregar';
    btn.style.backgroundColor = '';
  }, 1000);
}

// Mostrar carrito con botones + y - y total
function mostrarCarrito() {
  const contenedor = document.getElementById("carrito");
  const totalElemento = document.getElementById("total");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="vacío">
        <i class="fas fa-shopping-basket"></i>
        <p>Tu carrito está vacío</p>
      </div>
    `;
    totalElemento.textContent = "Total: $0";
    return;
  }

  let total = 0;

  carrito.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("item-carrito");
    item.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>${p.nombre}</strong>
          <p>$${p.precio.toLocaleString("es-CL")} c/u</p>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn-cantidad" onclick="disminuir(${p.id})">-</button>
          <span class="mx-2 fw-bold">${p.cantidad}</span>
          <button class="btn-cantidad" onclick="aumentar(${p.id})">+</button>
        </div>
      </div>
      <p class="text-end mb-0">Subtotal: $${(p.precio * p.cantidad).toLocaleString("es-CL")}</p>
    `;
    contenedor.appendChild(item);

    total += p.precio * p.cantidad;
  });

  totalElemento.textContent = `Total: $${total.toLocaleString("es-CL")}`;
}

// Aumentar cantidad
function aumentar(id) {
  const prod = carrito.find(p => p.id === id);
  if (prod && prod.cantidad < 5) {
    prod.cantidad++;
  } else {
    alert("⚠️ Máximo 5 unidades por producto.");
  }
  guardarCarrito();
}

// Disminuir cantidad
function disminuir(id) {
  const prod = carrito.find(p => p.id === id);
  if (prod) {
    prod.cantidad--;
    if (prod.cantidad <= 0) {
      carrito = carrito.filter(p => p.id !== id);
    }
  }
  guardarCarrito();
}

// Limpiar carrito completo
function limpiarCarrito() {
  if (carrito.length === 0) return;
  
  if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
    carrito = [];
    guardarCarrito();
  }
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}