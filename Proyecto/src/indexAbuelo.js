import * as components from "./components/indexPadre.js"

import fetchData from "./services/data.js";

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    async connectedCallback(){
        await this.render();
    }

    async render(){
        if(this.shadowRoot){
            const title = document.createElement("h1");
            title.innerText = "POSTS";
            this.shadowRoot.appendChild(title);
            

            const button = document.createElement("button");
            button.id = "open-modal";
            button.innerText = "Create POST";
            button.addEventListener("click", () => {
                const formUser = this.shadowRoot.querySelector("user-form"); 
                const modal = formUser ? formUser.shadowRoot.querySelector("#my-modal") : null;

                if(modal) {
                    modal.showModal();  
                } else {
                    console.error("Modal no encontrado");
                }
            });
            this.shadowRoot.appendChild(button);

        try {
            const response = await fetch('http://localhost:3004/posts');
            const data = await response.json(); 
 
                if (data && Array.isArray(data.posts)) {
                    
                    data.posts.forEach(post => {
                        const cardPost = document.createElement("card-post");
                        cardPost.setAttribute("title", post.title);
                        cardPost.setAttribute("body", post.body);
                        cardPost.setAttribute("imageUrl", post.imageUrl);
                        this.shadowRoot.appendChild(cardPost);
                    });
                } else {
                    console.error("El archivo JSON no tiene el formato esperado");
                }
            } catch (error) {
                console.error("Error al cargar los datos del archivo JSON:", error);
            }

            const formUser = document.createElement("user-form");
            this.shadowRoot?.appendChild(formUser);

        }
    }
};

customElements.define("app-container", AppContainer);