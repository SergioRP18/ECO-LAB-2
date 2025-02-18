import "./components/indexPadre.js";
import { fetchData, createPost, deletePost } from "./services/data.js";

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.posts = [];
    }

    async connectedCallback() {
        await this.loadPosts(); 
        await this.render();
    }

    async loadPosts() {
        try {
            const data = await fetchData();
            if (Array.isArray(data)) {
                this.posts = data;
            } else {
                console.error("Los datos no son un array:", data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async render() {
        const title = document.createElement("h1");
        title.innerText = "POSTS";
        this.shadowRoot.appendChild(title);

        const button = document.createElement("button");
        button.id = "open-modal";
        button.innerText = "Create POST";
        button.addEventListener("click", () => {
            const formUser = this.shadowRoot.querySelector("user-form"); 
            const modal = formUser ? formUser.shadowRoot.querySelector("#my-modal") : null;

            if (modal) {
                modal.showModal();  
            } else {
                console.error("Modal no encontrado");
            }
        });
        this.shadowRoot.appendChild(button);

        this.renderPosts();

        
        const formUser = document.createElement("user-form");
        formUser.addEventListener("create-post", async (event) => {
            const newPost = event.detail;
            try {
                const createdPost = await createPost(newPost);
                this.posts.unshift(createdPost);
                this.renderPosts();
            } catch (error) {
                console.error("Error creating post:", error);
            }
        });
        this.shadowRoot.appendChild(formUser);
    }

    async renderPosts() {
        const oldPostContainer = this.shadowRoot.querySelector(".post-container");
        if (oldPostContainer) {
            oldPostContainer.remove();
        }

        const postContainer = document.createElement("div");
        postContainer.classList.add("post-container");
        postContainer.style.display = "grid";
        postContainer.style.gap = "16px";

        this.posts.forEach(post => {
            const cardPost = document.createElement("card-post");
            cardPost.setAttribute("title", post.title);
            cardPost.setAttribute("body", post.body);
            cardPost.setAttribute("imageUrl", post.imageUrl);
            cardPost.setAttribute("id", post.id);

            cardPost.addEventListener("delete-post", (event) => {
                const postId = event.detail.postId;
                this.handleDeletePost(postId);   
            });

            postContainer.appendChild(cardPost);
            
        });

        this.shadowRoot.appendChild(postContainer);
    }

    async handleDeletePost(postId) {
        try {
            await deletePost(postId);
            const postIndex = this.posts.findIndex((post) => post.id === postId);
            if (postIndex !== -1) {
                this.posts.splice(postIndex, 1);
                this.renderPosts();
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }
}

customElements.define("app-container", AppContainer);