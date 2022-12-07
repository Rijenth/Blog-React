<?php

namespace App\Controller;


use App\Entity\User;
use App\Factory\PDOFactory;
use App\Manager\PostManager;
use App\Manager\UserManager;
use App\Route\Route;


class SecurityController extends AbstractController
{
    #[Route('/login', name: 'login', methods: ['GET'])]
    public function login()
    {
        $view = dirname(__DIR__, 2) . '/layout/auth/auth.layout.php';
        $this->render(
            $view,
            [
                "authForm" => dirname(__DIR__, 2) . "/components/form/login/login.component.php",
                "pageTitle" => "Login",
            ],
        );
    }

    #[Route('/register', name: 'registerView', methods: ['GET'])]
    public function registerView()
    {

        $view = dirname(__DIR__, 2) . '/layout/auth/auth.layout.php';
        $this->render(
            $view,
            [
                "authForm" => dirname(__DIR__, 2) . "/components/form/register/register.component.php",
                "pageTitle" => "Register",
            ],
        );
        require_once $view;
    }

    #[Route('/logout', name: 'logout', methods: ['GET'])]
    public function logout()
    {
        session_destroy();
        header("Location: /");
        exit;
    }
}