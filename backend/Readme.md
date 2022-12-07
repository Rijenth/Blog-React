# TP3 - Blog en php

<img src="./preview.png" style='border-radius:8px;height:auto;width:100%'>

## Groupe
| Prénom  | Nom          |
| ------- | ------------ |
| Rijenth | Arumainathan |
| Kader   | Bakayoko     |
| Ethan   | Videau       |

## Info sur l'utilisation de la variable superglobale $_POST
Les données sont filtrées en front puis envoyé sur l'endpoint. C'est pourquoi, dans les contrôleurs, des classes sont instanciées en utilisant $_POST

## Au cas ou vous êtes paumé

- `app/components` -> components utilisé sur une page
- `app/layout` -> Les 3 différent layout qui seront utilisé pour l'app
- `app/styles` -> SCSS de l'app
## Les api endpoints

- `/api/register` -> méthode POST -> créer un utilisateur
- `/api/login` -> méthode POST -> login un utilisateur
- `/api/getPosts` -> méthode GET -> Récupère tout les posts
- `/api/user/{userId}` -> méthode GET -> Récupère toute les données publique d'un utilisateurs

### Pour les commentaires d'un post
- `/api/posts/{post_id}/comments` -> méthode GET -> Récupère tout les commentaires d'un post dont l'id est `post_id`
- `/api/posts/{post_id}/comments` -> méthode POST -> Créer un commentaire pour le post dont l'id est `post_id`
- `/api/comments/{comment_id}` -> méthode DELETE -> Supprime un commentaire dont l'id est `comment_id`
