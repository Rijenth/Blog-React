# Comment lancer le truc

mettre à jour le conteneur front + lancer le up :

`docker-compose up -d --build`

Testé et approuvé sur Windows + Linux

## PROBLEME COMPOSER

Bizarrement composer n'installe pas Firebase Jwt, sans ce dernier on ne peut pas se login.
Si le problème n'a pas été fixer d'ici là un bouton "créer une session dev", imitera le login en bypassant l'encryption du backend.