const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const commentsUrl = "https://jsonplaceholder.typicode.com/comments";

let posts = {};
let comments = [];

// Загрузка данных о постах
fetch(postsUrl)
  .then(response => response.json())
  .then(data => {
    // Создание объекта для постов
    data.forEach(post => {
      posts[post.id] = {
        title: post.title,
        body: post.body
      };
    });

    // Загрузка данных о комментариях
    return fetch(commentsUrl);
  })
  .then(response => response.json())
  .then(data => {
    // Фильтрация комментариев, чтобы вывести только те, которые относятся к какому-либо посту
    comments = data.filter(comment => posts[comment.postId]);

    // Отрисовка постов и комментариев на странице
    const postsContainer = document.querySelector(".posts");

    for (const postId in posts) {
      const post = posts[postId];

      // Создание элемента для поста
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      // Создание заголовка поста

