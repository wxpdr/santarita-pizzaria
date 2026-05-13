const categoryButtons = document.querySelectorAll(".category-btn");
const menuSections = document.querySelectorAll(".menu-section");
const menuLists = document.querySelectorAll(".menu-list");

async function carregarCardapio() {
    try {
        const resposta = await fetch("dados/cardapio.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o cardápio.");
        }

        const cardapio = await resposta.json();

        renderizarPizzas(cardapio.salgadas, "salgadas");
        renderizarPizzas(cardapio.doces, "doces");
        renderizarBebidas(cardapio.bebidas, "bebidas");

    } catch (erro) {
        console.error(erro);

        menuLists.forEach((lista) => {
            lista.innerHTML = `
                <p class="menu-error">
                    Não foi possível carregar o cardápio no momento.
                </p>
            `;
        });
    }
}

function renderizarPizzas(itens, categoria) {
    const lista = document.querySelector(`[data-list="${categoria}"]`);

    if (!lista) return;

    lista.innerHTML = itens.map((item) => {
        return `
            <article class="menu-item">
                <div class="menu-info">
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                </div>

                <div class="price-column">
                    <div class="price-box">
                        <small>Grande</small>
                        <strong>${item.grande}</strong>
                    </div>

                    <div class="price-box">
                        <small>Broto</small>
                        <strong>${item.broto}</strong>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function renderizarBebidas(itens, categoria) {
    const lista = document.querySelector(`[data-list="${categoria}"]`);

    if (!lista) return;

    const grupos = {};

    itens.forEach((item) => {
        if (!grupos[item.tipo]) {
            grupos[item.tipo] = [];
        }

        grupos[item.tipo].push(item);
    });

    lista.innerHTML = Object.keys(grupos).map((tipo) => {
        const bebidas = grupos[tipo].map((item) => {
            return `
                <article class="menu-item">
                    <div class="menu-info">
                        <h3>${item.nome}</h3>
                    </div>

                    <div class="price-column">
                        <div class="price-box">
                            <small>Valor</small>
                            <strong>${item.valor}</strong>
                        </div>
                    </div>
                </article>
            `;
        }).join("");

        return `
            <h3 class="drink-subtitle">${tipo}</h3>
            ${bebidas}
        `;
    }).join("");
}

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.category;

        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        menuSections.forEach((section) => {
            section.classList.remove("active-section");
        });

        button.classList.add("active");

        const activeSection = document.getElementById(selectedCategory);

        if (activeSection) {
            activeSection.classList.add("active-section");
        }
    });
});

carregarCardapio();