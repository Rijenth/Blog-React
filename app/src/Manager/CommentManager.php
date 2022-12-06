<?php

namespace App\Manager;

use App\Entity\Comment;

class CommentManager extends BaseManager
{
    /**
     * @return Comment[]
     */
    public function index(int $post_id): array
    {
        $query = $this->pdo->prepare("SELECT * FROM Comments WHERE post_id = :post_id");

        $query->execute([
            "post_id" => $post_id,
        ]);

        $comments = [];
        
        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $comment = new Comment($data);

            $comments[] = $comment->dataToArray();
        }
        
        return $comments;
    }

    public function create(Comment $comment): void
    {
        $query = $this->pdo->prepare("INSERT INTO Comments (content, user_id, post_id) VALUES (:content, :user_id, :post_id)");

        $query->execute([
            "content" => $comment->getContent(),
            "user_id" => $comment->getUser_id(),
            "post_id" => $comment->getPost_id(),
        ]);
    }

    public function delete(int $id): void
    {
        $query = $this->pdo->prepare("DELETE FROM Comments WHERE id = :id");

        $query->execute([
            "id" => $id,
        ]);
    }
}
