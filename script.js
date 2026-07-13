// ==============================
// GABIPEDIA v2
// Engine Principal
// ==============================

class Gabipedia {

    constructor(){

        // Histórico de navegação
        this.history = [];

        // Página atual
        this.current = null;

        // Referências do HTML
        this.homePage = document.getElementById("home");
        this.folderPage = document.getElementById("folder");

        this.homeGrid = document.getElementById("homeGrid");
        this.folderGrid = document.getElementById("folderGrid");
        this.folderTitle = document.getElementById("folderTitle");
        this.breadcrumbs = document.getElementById("breadcrumbs");
        this.itemImage = document.getElementById("itemImage");
        this.itemTitle = document.getElementById("itemTitle");
        this.itemDescription = document.getElementById("itemDescription");

        this.path = [];

    }

    // --------------------------
    // Iniciar aplicação
    // --------------------------

    start(){

        this.renderHome();

    }

    // --------------------------
    // Mostrar Home
    // --------------------------

    renderHome(){

        this.current = null;

        this.showPage("home");

        this.homeGrid.innerHTML = "";

        categorias.forEach(categoria=>{

            const card = this.createCard(

                categoria.nome,

                categoria.imagem,

                ()=>{

                    this.open(categoria.id);

                }

            );

            this.homeGrid.appendChild(card);

        });

    }

    // --------------------------
    // Abrir qualquer pasta
    // --------------------------

    open(id){

        const pasta = dados[id];

        if(!pasta){

            console.warn("Pasta não encontrada:",id);

            return;

        }

        if(this.current){

            this.history.push(this.current);

        }

        this.current = id;

        this.path.push({
            id:id,
            nome:pasta.nome
        });

        this.renderFolder(pasta);

    }

    // --------------------------
    // Mostrar pasta
    // --------------------------

    renderFolder(pasta){

    this.showPage("folder");

    this.folderTitle.textContent = pasta.nome;

    this.renderBreadcrumbs();

    this.folderGrid.innerHTML = "";

    pasta.itens.forEach(item=>{

        const card=this.createCard(

            item.nome,

            item.imagem,

            ()=>{

                // Se possui id, é outra pasta

                if(item.id){

                    this.open(item.id);

                }

            }

        );

        this.folderGrid.appendChild(card);

    });


    }

    // --------------------------
    // Voltar
    // --------------------------

    back(){

        if(this.path.length > 1){

            this.path.pop();

            const anterior = this.path[this.path.length - 1];

            this.current = anterior.id;

            this.renderFolder(dados[anterior.id]);

        }else{
            this.path=[]
            this.renderHome();
        }

    }

    // --------------------------
    // Mostrar tela
    // --------------------------

    showPage(id){

        document.querySelectorAll(".page").forEach(page=>{

            page.classList.remove("active");

        });

        document.getElementById(id).classList.add("active");

    }
    
    // --------------------------
    // Caminho da navegação
    // --------------------------

    renderBreadcrumbs(){

        this.breadcrumbs.innerHTML = "";


        this.path.forEach((item,index)=>{


            const span = document.createElement("span");

            span.textContent = item.nome;


            span.onclick = ()=>{


                this.path = this.path.slice(0,index+1);


                this.current = item.id;


                this.renderFolder(dados[item.id]);


            };


            this.breadcrumbs.appendChild(span);


            if(index < this.path.length - 1){

                this.breadcrumbs.innerHTML += " > ";

            }


        });

    }
    
    // --------------------------
    // Criar Card
    // --------------------------

    createCard(nome,imagem,click){

    const card=document.createElement("div");

    card.className="card";

    const img=document.createElement("img");

    img.src=imagem;

    img.alt=nome;

    img.onerror=()=>{

        img.src="assets/no-image.png";

    };

    const titulo=document.createElement("h2");

    titulo.textContent=nome;

    card.appendChild(img);

    card.appendChild(titulo);

    if(click){

        card.onclick=click;

    }

    return card;

    }

}

// ==============================
// Inicialização
// ==============================

const app = new Gabipedia();

app.start();

// Botão voltar
function goBack(){

    app.back();

}
