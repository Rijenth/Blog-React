// get author
const getAuthor = async (id) => {
  const response = await fetch(`/api/user/${id}`);
  const data = await response.json();
  //const user = JSON.parse(data);

  return data.username;
};

// create post
const postForm = document.querySelector(".post-form");
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", postForm.title.value);
  formData.append("content", postForm.content.value);
  formData.append("user_id", current_user);
  fetch("/api/posts/create", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  // if the above code works we need to clear the form
  // empty form
  postForm.title.value = "";
  postForm.content.value = "";
  // empty the posts wrapper
  document.querySelector(".blog_posts-wrapper").innerHTML = "";
  // fetch all posts
  renderPosts();
});

// delete post
function deletePost(id) {
  fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  // if the above code works we need to clear the form
  // empty form
  postForm.title.value = "";
  postForm.content.value = "";
  // empty the posts wrapper
  document.querySelector(".blog_posts-wrapper").innerHTML = "";
  // fetch all posts
  renderPosts();
}

// get comments

const getComments = async (id) => {
  // the api route is /api/posts/{post_id}/comments
  const response = await fetch(`/api/posts/${id}/comments`);
  const data = await response.json();
  return data;
};

renderPosts();
