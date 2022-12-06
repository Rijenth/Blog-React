<?php

namespace App\Entity;

class Post extends BaseEntity
{
    private int $id;
    private string $title;
    private string $content;
    private int $user_id;
    private ?string $publicationDate;
    private ?string $illustrationPath;
    
    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Post
     */
    public function setId(int $id): Post
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return Post
     */
    public function setTitle(string $title): Post
    {
        $this->title = $title;
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
     * @return Post
     */
    public function setContent(string $content): Post
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
     * @return Post
     */
    public function setUser_id(int $user_id): Post
    {
        $this->user_id = $user_id;
        return $this;
    }

    /**
     * @return string
     */
    public function getPublicationDate()
    {
        return $this->publicationDate;
    }

    /**
     * @param string $publicationDate
     * @return Post
     */
    public function setPublicationDate(string $publicationDate): Post
    {
        $this->publicationDate = $publicationDate;
        return $this;
    }

    /**
     * @return string
     */
    public function getIllustrationPath()
    {
        return $this->illustrationPath;
    }

    /**
     * @param string $illustrationPath
     * @return Post
     */
    public function setIllustrationPath(?string $illustrationPath): Post
    {
        $this->illustrationPath = $illustrationPath;
        return $this;
    }
}
