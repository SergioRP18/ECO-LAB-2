class FormUser extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){

            const dialog = document.createElement("dialog");
            dialog.id = "my-modal";
            this.shadowRoot.appendChild(dialog);

            const title = document.createElement("h1");
            title.innerText = "CREATE POST";
            dialog.appendChild(title);

            const inputImageUrl = document.createElement("input");
            inputImageUrl.type = "text";
            inputImageUrl.placeholder = "INPUT IMG URL";
            dialog.appendChild(inputImageUrl);

            const inputTitle = document.createElement("input");
            inputTitle.type = "text";
            inputTitle.placeholder = "INPUT TITLE";
            dialog.appendChild(inputTitle);

            const inputDescription = document.createElement("input");
            inputDescription.type = "text";
            inputDescription.placeholder = "INPUT DESCRIPTION";
            dialog.appendChild(inputDescription);

            const createPost = document.createElement("button");
            createPost.type = "submit";
            createPost.innerText = "public POST";
            createPost.addEventListener("click", () => {
                const imageUrl = inputImageUrl.value;
                const title = inputTitle.value;
                const body = inputDescription.value;

                if (imageUrl && title && body) {
                    this.dispatchEvent(new CustomEvent("create-post", {
                        detail: { imageUrl, title, body },
                    }));

                    inputImageUrl.value = "";
                    inputTitle.value = "";
                    inputDescription.value = "";

                    dialog.close();
                } else {
                    alert("Por favor, completa todos los campos.");
                }
            });
            dialog.appendChild(createPost);

            const list = document.createElement("button");
            list.type = "button";
            list.innerText = "list POSTS";
            dialog.appendChild(list);

            const closeButton = document.createElement("button");
            closeButton.innerText = "Cerrar";
            closeButton.addEventListener("click", () => {
                dialog.close();
            });
            dialog.appendChild(closeButton);

        }
    }
};

customElements.define("user-form", FormUser);
export default FormUser;