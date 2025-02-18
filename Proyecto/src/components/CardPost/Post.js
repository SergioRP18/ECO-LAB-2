import { deletePost } from "../../services/data.js";

class CardPost extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    };

    static get observedAttributes(){
        return ["title","body","imageUrl", "id"];
    }

    attributeChangedCallback(propName, oldValue, newValue){
        if (oldValue !== newValue) {
            this[propName] = newValue;
            this.render();
        }
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){

            this.shadowRoot.innerHTML = '';

            const container = document.createElement("div");
            this.shadowRoot.appendChild(container);

            const title = document.createElement("h1");
            title.innerText = this.getAttribute("title") || "";
            container.appendChild(title);

            const body = document.createElement("p");
            body.innerText = this.getAttribute("body") || "";
            container.appendChild(body);

            const image = document.createElement("img");
            image.src = this.getAttribute("imageUrl") || "";
            container.appendChild(image);

            const button = document.createElement("button");
            button.id = "delete-post";
            button.innerText = "Delete";
            button.addEventListener("click", () => this.deletePost());
            container.appendChild(button);

        }

    }

    deletePost() {
        const postId = this.getAttribute("id");
        if (!postId) {
            console.error("postId no está definido");
            return;
        }
        const deleteEvent = new CustomEvent("delete-post", {
            bubbles: true,
            composed: true,
            detail: { postId },
        });
        this.dispatchEvent(deleteEvent);
    }
};

customElements.define("card-post", CardPost);
export default CardPost;