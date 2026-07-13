// Histórico de navegação
let historyStack = [];

// Página atual
let currentPage = "home";

// Cria os cards da Home
function loadHome() {

    const homeGrid = document.getElementById("homeGrid");

    homeGrid.innerHTML = "";

    categorias.forEach(categoria => {

        homeGrid.innerHTML += `

        <div class="card" onclick="openFolder('${categoria.id}')">

            <img src="${categoria.imagem}" alt="${categoria.nome}">

            <h2>${categoria.nome}</h2>

        </div>

        `;

    });

}

// Abre uma pasta
function openFolder(id){

    historyStack.push(currentPage);

    currentPage = id;

    document.querySelectorAll(".page").forEach(page=>{

        page.classList.remove("active");

    });

    document.getElementById("folder").classList.add("active");

    const pasta = dados[id];

    document.getElementById("folderTitle").innerText = pasta.nome;

    const folderGrid = document.getElementById("folderGrid");

    folderGrid.innerHTML = "";

    pasta.itens.forEach(item=>{

        folderGrid.innerHTML += `

        <div class="card">

            <img src="${item.imagem}" alt="${item.nome}">

            <h2>${item.nome}</h2>

        </div>

        `;

    });

}

// Voltar
function goBack(){

    document.querySelectorAll(".page").forEach(page=>{

        page.classList.remove("active");

    });

    document.getElementById("home").classList.add("active");

    currentPage = "home";

}

// Inicia o site
loadHome();
