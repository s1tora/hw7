const postsContainer = document.querySelector("#postsContainer");
const modalContainer = document.querySelector("#modalContainer");
const modalContent = document.querySelector("#modalContent");
const commentsContainer = document.querySelector("#commentsContainer");
const closeModal = document.querySelector("#closeModal");

const API_URL = "https://jsonplaceholder.typicode.com";

async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  const data = await response.json();
  return data.slice(0, 10);
}

async function fetchComments(postId) {
  const response = await fetch(`${API_URL}/comments?postId=${postId}`);
  const data = await response.json();
  return data.slice(0, 5);
}

function renderPost(post) {
  const postContainer = document.createElement("div");
  postContainer.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <button class="comments-btn">Show Comments</button>
  `;

  const commentsBtn = postContainer.querySelector(".comments-btn");
  commentsBtn.addEventListener("click", async () => {
    const comments = await fetchComments(post.id);
    renderComments(comments);
    modalContainer.style.display = "block";
  });

  postsContainer.appendChild(postContainer);
}

function renderComments(comments) {
  commentsContainer.innerHTML = "";
  comments.forEach(comment => {
    const commentContainer = document.createElement("div");
    commentContainer.innerHTML = `
      <h4>${comment.name}</h4>
      <p>${comment.email}</p>
      <p>${comment.body}</p>
    `;
    commentsContainer.appendChild(commentContainer);
  });
}

closeModal.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modalContainer) {
    modalContainer.style.display = "none";
  }
});

fetchPosts().then(posts => {
    posts.forEach(post => {
    renderPost(post);
    });
    });
