<?php
// Check if user is logged in
if (!isset($_SESSION['user'])) {
    header("Location: /login");
    exit();
}
$tempId = 70;
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <? echo $args['pageTitle'] ?>
    </title>
    <link rel="stylesheet" href="../../styles/globals.css" />

</head>

<body>
    <a href="/logout" class="logout-btn">
        Logout
    </a>
    <div class="profile">
        <div class="profile__info">
            <a href="/user/<?php echo $_SESSION['userid'] ?>">
                <h1 class="profile__name">
                    <? echo $_SESSION['user'] ?>
                </h1>
            </a>
        </div>
    </div>

    <main id="blog_page">
        <form action="/api/posts/create" method="POST" class="post-form">
            <input type="text" name="title" placeholder="Title" />
            <textarea name="content" placeholder="Content"></textarea>
            <button class="form_action" type="submit">Create</button>
        </form>
        <div class="blog_posts-wrapper">

        </div>
    </main>
    <script>
    const current_user = <?php echo json_encode($_SESSION['userid']) ?>;


    // get all posts
    const postsWrapper = document.querySelector('.blog_posts-wrapper');
    const renderPosts = () => {
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => {
                data.forEach(post => {
                    // each post is currently in a string we need to convert it to an object
                    const author_id = post.user_id;
                    // create a new div for each post
                    const postDiv = document.createElement('div');
                    postDiv.classList.add('blog_post');
                    // create a new h3 for each post
                    const postTitle = document.createElement('h3');
                    postTitle.classList.add('blog_post-title');
                    postTitle.innerText = post.title;
                    // create a new p for each post
                    const postContent = document.createElement('p');
                    postContent.classList.add('blog_post-content');
                    postContent.innerText = post.content;
                    // create a new p for each post
                    const postAuthor = document.createElement('p');
                    postAuthor.classList.add('blog_post-author');
                    // sadly we need to wait for getAuthor to finish before we can add the author to the post
                    getAuthor(author_id).then(author => {
                        postAuthor.innerText = author;
                    });
                    // add a delete btn if user is admin or moderator or if user is the author of the post
                    if (author_id == current_user ||
                        <?php echo json_encode($_SESSION['roles']) ?> ==
                        'admin' || <?php echo json_encode($_SESSION['roles']) ?> == 'moderator') {
                        const deleteBtn = document.createElement('button');
                        deleteBtn.classList.add('delete-btn');
                        deleteBtn.innerText = 'Delete';
                        deleteBtn.addEventListener('click', () => {
                            deletePost(post.id);
                        });
                        postDiv.appendChild(deleteBtn);
                    }
                    // append the elements to the post div
                    postDiv.appendChild(postTitle);
                    postDiv.appendChild(postContent);
                    postDiv.appendChild(postAuthor);

                    // comment section
                    const commentSection = document.createElement('div');
                    commentSection.classList.add('comment-section');
                    const commentForm = document.createElement('form');
                    commentForm.classList.add('comment-form');
                    // To post a comment we need to fetch the form content to /api/posts/{post_id}/comments
                    commentForm.action = `/api/posts/${post.id}/comments`;
                    commentForm.method = 'POST';
                    const commentInput = document.createElement('input');
                    commentInput.type = 'text';
                    commentInput.name = 'content';
                    commentInput.placeholder = 'Comment';
                    const commentBtn = document.createElement('button');
                    commentBtn.type = 'submit';
                    commentBtn.innerText = 'Comment';
                    commentForm.appendChild(commentInput);
                    commentForm.appendChild(commentBtn);
                    commentSection.appendChild(commentForm);
                    // get all comments for each post
                    renderComments(post.id, commentSection);
                    // prevent default form submit
                    commentForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        // get the form data
                        const formData = new FormData(commentForm);
                        // convert the form data to json
                        const json = JSON.stringify(Object.fromEntries(formData));
                        // send the json to the api
                        fetch(commentForm.action, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: json
                            })
                            .then(() => {
                                commentSection.querySelectorAll('.comment').forEach(comment => {
                                    comment.remove();
                                });
                                // render the comments again
                                renderComments(post.id, commentSection);
                            })
                    });
                    // append the post div to the posts wrapper
                    postDiv.appendChild(commentSection);
                    postsWrapper.appendChild(postDiv);
                })

            })
    }
    const renderComments = (post_id, commentSection) => {
        getComments(post_id).then(comments => {
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                const commentContent = document.createElement('p');
                commentContent.classList.add('comment-content');
                commentContent.innerText = comment.content;
                const commentAuthor = document.createElement('p');
                commentAuthor.classList.add('comment-author');
                getAuthor(comment.user_id).then(author => {
                    commentAuthor.innerText = author;
                });
                commentDiv.appendChild(commentContent);
                commentDiv.appendChild(commentAuthor);
                commentSection.appendChild(commentDiv);
            })
        })
    }
    <?php require_once(dirname(__DIR__, 2) . "/layout/blog/blog.layout.js"); ?>
    </script>
</body>

</html>