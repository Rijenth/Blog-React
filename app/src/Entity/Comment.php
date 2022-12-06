<?php 

namespace App\Entity;

class Comment extends BaseEntity
{
    // this is a comments
    private int $id;
    private string $content;
    private int $user_id;
    private int $post_id;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Comment
     */
    public function setId(int $id): Comment
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getContent(): string
    {
        return $this->content;
    }

    /**
     * @param string $content
     * @return Comment
     */
    public function setContent(string $content): Comment
    {
        $this->content = $content;
        return $this;
    }

    /**
     * @return int
     */
    public function getUser_id(): int
    {
        return $this->user_id;
    }

    /**
     * @param int $user_id
     * @return Comment
     */
    public function setUser_id(int $user_id): Comment
    {
        $this->user_id = $user_id;
        return $this;
    }

    /**
     * @return int
     */
    public function getPost_id(): int
    {
        return $this->post_id;
    }

    /**
     * @param int $post_id
     * @return Comment
     */
    public function setPost_id(int $post_id): Comment
    {
        $this->post_id = $post_id;
        return $this;
    }
}

