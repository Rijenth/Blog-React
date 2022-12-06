<?php

namespace App\Controller;

abstract class AbstractController
{
    public function __construct(string $action, array $params = [])
    {
        if (!is_callable([$this, $action])) {
            throw  new \RuntimeException();
        }
        call_user_func_array([$this, $action], $params);
    }
    public function render(string $view, array $args = [], string $title = "Document")
    {
        foreach ($args as $key => $value) {
            $$key = $value;
        }
        require_once $view;
    }
}