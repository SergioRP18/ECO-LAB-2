class CardPost extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    };

    static get observedAttributes(){
        return ["title","body","imageUrl"];
    }

    attributeChangedCallback(propName, oldValue, newValue){
        this[propName] = newValue;
        this.render();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){

            const container = document.createElement("div");
            this.shadowRoot.appendChild(container);

            const title = document.createElement("h1");
            title.innerText = this.title;
            container.appendChild(title);

            const body = document.createElement("p");
            body.innerText = this.body;
            container.appendChild(title);

            const image = document.createElement("img");
            image.src = this.imageUrl;
            container.appendChild(image);

        }
    }
};

customElements.define("card-post", CardPost);
export default CardPost;