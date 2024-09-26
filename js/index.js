document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar la opción "destacado" al cargar la página
    const defaultCategory = document.querySelector('.category_item[category="destacado"]');
    if (defaultCategory) {
        defaultCategory.classList.add('ct_item_active');
    }

    // Mostrar solo los productos "destacado" al cargar la página
    const products = document.querySelectorAll('.card-product');
    products.forEach(product => {
        const productCategory = product.getAttribute('categoryProduct');
        if (productCategory === 'destacado') {
            product.style.display = 'block'; // Mostrar productos "destacado"
        } else {
            product.style.display = 'none'; // Ocultar productos no "destacado"
        }
    });

    // Seleccionar todas las opciones de categoría
    const categoryItems = document.querySelectorAll('.category_item');

    // Agregar un evento click a cada opción de categoría
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar la acción predeterminada del enlace
            const selectedCategory = this.getAttribute('category'); // Obtener la categoría seleccionada

            // Eliminar la clase "ct_item_active" de todas las opciones
            categoryItems.forEach(el => el.classList.remove('ct_item_active'));
            // Agregar la clase "ct_item_active" al elemento clicado
            this.classList.add('ct_item_active');

            // Mostrar u ocultar productos según la categoría seleccionada
            products.forEach(product => {
                const productCategory = product.getAttribute('categoryProduct');

                if (selectedCategory === 'all' || productCategory === selectedCategory) {
                    product.style.display = 'block'; // Mostrar productos que coinciden
                } else {
                    product.style.display = 'none'; // Ocultar productos que no coinciden
                }
            });
        });
    });
});



document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const products = document.querySelectorAll('.card-product'); // Asegúrate de que las clases coincidan
    const noResults = document.getElementById('noResults');
    let hasResults = false;

    // Filtrar productos
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            product.style.display = 'block'; // Mostrar productos coincidentes
            hasResults = true;
        } else {
            product.style.display = 'none'; // Ocultar productos que no coinciden
        }
    });

    // Mostrar el mensaje de 'No se encontraron resultados' si no hay coincidencias
    if (hasResults) {
        noResults.style.display = 'none';
    } else {
        noResults.style.display = 'block';
    }

    // Mostrar/ocultar el contenido de la página principal según los resultados
    const mainSections = document.querySelectorAll('.banner, .top-categories, .top-products');
    if (searchTerm) {
        mainSections.forEach(section => section.classList.add('hide')); // Oculta secciones principales
    } else {
        mainSections.forEach(section => section.classList.remove('hide')); // Muestra secciones principales
        products.forEach(product => product.style.display = 'block'); // Muestra todos los productos si no hay búsqueda
    }

});

// Variables globales
// Array para almacenar los productos en el carrito
let cart = [];

// Selección de elementos del DOM
const cartCountElement = document.querySelector('.number');
const cartListElement = document.querySelector('.cart-list');
const cartModal = document.querySelector('.cart-modal');

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    cartCountElement.textContent = `(${cart.reduce((total, item) => total + item.quantity, 0)})`;

    cartListElement.innerHTML = ''; // Limpiar la lista del carrito
    if (cart.length === 0) {
        cartListElement.innerHTML = '<p>Carrito vacío</p>';
        document.querySelector('.total').textContent = 'Total: $0.00';
    } else {
        cart.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('cart-item');
            listItem.innerHTML = `
                <span>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
                <span class="remove-item" data-product-name="${item.name}">X</span>
            `;
            cartListElement.appendChild(listItem);
        });
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        document.querySelector('.total').textContent = `Total: $${totalAmount.toFixed(2)}`;
    }
}

// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartUI();
}

// Función para remover un producto del carrito
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI();
}

// Agregar eventos a los botones de "Agregar al carrito"
const addCartButtons = document.querySelectorAll('.add-cart');
addCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = button.dataset.productName;
        const productPrice = parseFloat(button.dataset.productPrice);
        addToCart(productName, productPrice);
    });
});

// Mostrar y ocultar el carrito
const cartIcon = document.querySelector('.fa-cart-shopping');
const closeCartButton = document.querySelector('.close-cart');

cartIcon.addEventListener('click', function() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
});

closeCartButton.addEventListener('click', function() {
    cartModal.style.display = 'none';
});

// Evento para remover productos del carrito
cartListElement.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
        const productName = e.target.dataset.productName;
        removeFromCart(productName);
    }
});

// Inicializar la interfaz del carrito al cargar la página
updateCartUI();

