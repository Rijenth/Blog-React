<?php

namespace App\Controller;

use App\Entity\User;
use App\Route\Route;
use App\Factory\PDOFactory;
use App\Manager\UserManager;


class SecurityController extends AbstractController
{
    #[Route('/login', name:'login', methods: ['GET'])]
    public function login() 
    {
        $this->render("login.php");
    }

    #[Route('/login', name:'connect', methods: ['POST'])]
    public function connect()
    {   
        $Username=htmlspecialchars($_POST["uid"]);
        $Password=htmlspecialchars($_POST["pwd"]);

        $manger = new UserManager(new PDOFactory());
        $query = $manger->prepare("SELECT * FROM user where username = :username");

        $query ->execute([
          ":username" => $Username,
        ]);
    
        $state=$query->fetch(PDO::FETCH_ASSOC);
       
        if($query->rowCount() == 0){
    
          //echo "cet utilisateur n'existe pas";
          
        }
        
        if($query->rowCount() >= 1){
       

            session_start();
            $_SESSION['username']=$Username;
            $this->render(
                "home.php",
                ['username'=>$Username]

            );
            return;
        
        
    
        
        }

   
    }

    
}