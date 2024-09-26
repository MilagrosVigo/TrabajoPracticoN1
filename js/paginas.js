document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar la opción "todo" al cargar la página
    const defaultCategory = document.querySelector('.category_item[category="todo"]');
    if (defaultCategory) {
        defaultCategory.classList.add('ct_item_active');
    }

    // Mostrar todos los productos al cargar la página
    const products = document.querySelectorAll('.card-product');
    products.forEach(product => {
        product.style.display = 'block'; // Mostrar todos los productos
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

                if (selectedCategory === 'todo' || productCategory === selectedCategory) {
                    product.style.display = 'block'; // Mostrar productos que coinciden
                } else {
                    product.style.display = 'none'; // Ocultar productos que no coinciden
                }
            });

            // Comprobar si hay productos visibles
            const visibleProducts = Array.from(products).filter(product => product.style.display === 'block');
            const noResultsMessage = document.getElementById('noResults');

            // Mostrar u ocultar el mensaje de "No se han encontrado resultados"
            if (visibleProducts.length === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        });
    });
});

// Lógica de búsqueda
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const products = document.querySelectorAll('.card-product'); // Asegúrate de que las clases coincidan
    const noResults = document.getElementById('noResults');
    let hasResults = false;

    // Filtrar productos según la búsqueda
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const productCategory = product.getAttribute('categoryProduct');
        const activeCategory = document.querySelector('.ct_item_active').getAttribute('category');

        // Mostrar solo los productos que coinciden con la búsqueda y la categoría seleccionada
        if (title.includes(searchTerm) && (activeCategory === 'todo' || productCategory === activeCategory)) {
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
});

