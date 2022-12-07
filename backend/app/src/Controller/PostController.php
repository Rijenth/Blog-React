<?php

namespace App\Controller;

use App\Entity\Post;
use App\Factory\PDOFactory;
use App\Manager\PostManager;
use App\Route\Route;

class PostController extends AbstractController
{
    #[Route('/', name: 'home', methods: ['GET'])]
    public function home()
    {
        $view = dirname(__DIR__, 2) . '/layout/blog/blog.layout.php';
        $this->render(
            $view,
            [
                "pageTitle" => "Home",
            ],
        );
    }
    
    #[Route('/api/posts', name: 'index', methods: ['GET'])]
    public function index()
    {
        $postManager = new PostManager(new PDOFactory());

        try {
            $posts = $postManager->index();
        } catch (\PDOException $e) {
            return http_response_code(500);
        }

        echo json_encode($posts);
    }

    #[Route('/api/posts/create', name: 'createPost', methods: ['POST'])]
    public function create()
    {
        $postManager = new PostManager(new PDOFactory());

        if(!isset($_POST["illustrationPath"])) {
            $_POST['illustrationPath'] = null;
        } 

        $post = new Post($_POST);

        try {
            $postManager->createPost($post);
        } catch (\PDOException $e) {
            return http_response_code(500);
        }

        return http_response_code(201);
    }
    
    #[Route('/api/posts/{id}', name: 'deletePost', methods: ['DELETE'])]
    public function deletePost(string $id)
    {
        $postManager = new PostManager(new PDOFactory());

        try {
            $postManager->deletePost($id);
        } catch (\PDOException $e) {
            return http_response_code(500);
        }

        return http_response_code(200);
    }

    #[Route('/user/{id}', name: 'user', methods: ['GET'])]
    public function user(string $id)
    {
        $view = dirname(__DIR__, 2) . '/layout/user/user.layout.php';
        $this->render(
            $view,
            [
                "pageTitle" => "User",
                "userId" => $id,
            ],
        );
    }
}