<?php

namespace App\Manager;

use App\Entity\Post;

class PostManager extends BaseManager
{
    /**
     * @return array
     */
    public function index(): array
    {
        $query = $this->pdo->query("SELECT * FROM Post");

        $posts = [];
        
        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $post = new Post($data);
            
            $posts[] = $post->dataToArray();
        }

        return $posts;
    }

    /**
     * @param array $data
     * @return array
     */
    public function indexMyPosts(array $data): array
    {
        $query = $this->pdo->prepare("SELECT * FROM Post WHERE user_id = :user_id");

        $query->execute([
            "user_id" => $data['user_id'],
        ]);

        $posts = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $post = new Post($data);
            
            $posts[] = $post->dataToArray();
        }

        return $posts;
    }

    /**
     * @param array $data
     * @return Post
     */
    public function getSinglePost(array $data): Post
    {
        // TODO: Cette fonction renvoie un objet Post, 
        // Dans PostControleur, il faudra convertir cette objet en tableau pour
        // pouvoir l'envoyer en JSON au front. (Voir la fonction index(), ligne 19 à 21, pour exemple)

        $query = $this->pdo->prepare("SELECT * FROM Post WHERE id = :id");

        $query->execute([
            "id" => $data['id'],
        ]);

        $data = $query->fetch(\PDO::FETCH_ASSOC);

        return new Post($data);
    }

    /**
     * @param Post $post
     * @return void
     */
    public function createPost(Post $post): void
    {
        $query = $this->pdo->prepare("INSERT INTO Post (title, content, user_id, publicationDate, illustrationPath) VALUES (:title, :content, :user_id, :publicationDate, :illustrationPath)");

        $illustrationPath = ($post->getIllustrationPath() === null) ? null : $post->getIllustrationPath();

        $query->execute([
            "title" => $post->getTitle(),
            "content" => $post->getContent(),
            "user_id" => $post->getUser_id(),
            "publicationDate" => date("Y-m-d H:i:s"),
            "illustrationPath" => $illustrationPath,
        ]);
    }

    /**
     * @param array $data
     * @return void
     */
    public function updatePost(array $data): void
    {
        $post = $this->getSinglePost($data["post_id"]);

        if (array_key_exists("title", $data)) {
            $post->setTitle($data["title"]);
        };

        if (array_key_exists("content", $data)) {
            $post->setContent($data["content"]);
        };

        if (array_key_exists("illustrationPath", $data)) {
            $post->setContent($data["illustrationPath"]);
        };

        $query = $this->pdo->prepare("UPDATE Post SET title = :title, content = :content WHERE id = :post_id");

        $query->execute([
            "title" => $post->getTitle(),
            "content" => $post->getContent(),
            "post_id" => $post->getId(),
            "illustrationPath" => $post->getIllustrationPath(),
        ]);
    }

    /**
     * @param int $id
     * @return void
     */
    public function deletePost(int $id): void
    {
        $query = $this->pdo->prepare("DELETE FROM Post WHERE id = :post_id");

        $query->execute([
            "post_id" => $id,
        ]);
    }
}