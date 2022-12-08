<?php

namespace App\Controller;

use App\Entity\User;
use App\Factory\PDOFactory;
use App\Manager\UserManager;
use App\Route\Route;


class UserController extends AbstractController
{
    #[Route('/api/register', name: 'createUser', methods: ['POST'])]
    public function createUser()
    {
        $user = new User($_POST);

        $manager = new UserManager(new PDOFactory());

        try {
            $manager->register($user);
        } catch (\PDOException $e) {
            return http_response_code(500);
        }

        return http_response_code(201);
    }

    #[Route('/api/user/{user_id}', name: 'getUser', methods: ['GET'])]
    public function getUser(string $user_id)
    {
        $manager = new UserManager(new PDOFactory());

        try {
            $user = $manager->getSingleUser(["user_id" => $user_id]);
        } catch (\PDOException $e) {
            return http_response_code(500);
        }

        echo json_encode($user->dataToArray());

        return http_response_code(200);
    }

    #[Route('/api/login', name: 'createUser', methods: ['POST'])]
    public function loginUser()
    {
        $username = $_POST["username"];

        $password = $_POST["password"];

        $manager = new UserManager(new PDOFactory());

        $manager->login($username, $password);
    }
}
