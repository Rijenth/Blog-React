<?php

namespace App\Manager;

use App\Entity\User;
use App\Factory\PDOFactory;
use App\Interfaces\Database;
// JWT token generator
use Firebase\JWT\JWT;

class UserManager extends BaseManager
{

    /**
     * @return User[]
     */
    public function getAllUsers(): array
    {
        $query = $this->pdo->query("SELECT * FROM User");

        $users = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $users[] = new User($data);
        }

        return $users;
    }

    public function getSingleUser(array $data): User
    {
        $query = $this->pdo->prepare("SELECT * FROM User WHERE id = :id");

        $query->execute([
            "id" => $data['user_id'],
        ]);

        $data = $query->fetch(\PDO::FETCH_ASSOC);

        $user = new User($data);

        return $user;
    }

    public function UserNameExist($username): bool|User
    {
        $query = $this->pdo->prepare("SELECT * FROM User WHERE username = :username");
        $query->execute([
            "username" => $username
        ]);
        $data = $query->fetch(\PDO::FETCH_ASSOC);
        if (count($data) > 0) {
            return new User($data);
        } else {
            return false;
        }
    }

    public function login(string $username, string $password)
    {
        $user = $this->UserNameExist($username);

        $token = [
            "iss" => "http://localhost:5656", // issuer
            "aud" => "http://localhost:3000", // audience
            "iat" => time(),
            "nbf" => time(),
            "exp" => time() + 60 * 60,
        ];


        if ($user === false) {
            return http_response_code(404);
        }

        $checkPass = $user->passwordMatch($password);

        if ($checkPass === false) {
            return http_response_code(404);
        } else {
            $_SESSION["userid"] = $user->getId();
            $_SESSION["user"] = $user->getUsername();
            $_SESSION['roles'] = $user->getRoles();
            // modify the token
            $token["user"] = $user->getUsername();
            $token["roles"] = $user->getRoles();
            $token["id"] = $user->getId();
            $jwt = JWT::encode($token, "jaimelespates", "HS256");
            echo json_encode([
                "token" => $jwt,
                "res" => true
        ]);
        };
    }
    public function register(User $user): void
    {
        $query = $this->pdo->prepare("INSERT INTO User (username, password, email, firstName, lastName, gender, roles) VALUES (:username, :password, :email, :firstName, :lastName, :gender, :roles)");

        $query->execute([
            "username" => $user->getUsername(),
            "email" => $user->getEmail(),
            "password" => $user->getHashedPassword(),
            "firstName" => $user->getFirstName(),
            "lastName" => $user->getLastName(),
            "gender" => $user->getGender(),
            "roles" => $user->getRoles(),
        ]);
    }
}