TestRS – Frontend Gestion des Personnes



Ce projet est un frontend web simple (HTML, CSS, JavaScript) qui consomme un backend REST JAX‑RS permettant de gérer des personnes (CRUD).



Fonctionnalités



\- Afficher la liste de toutes les personnes.

\- Ajouter une personne (nom, âge).

\- Modifier une personne (id, nom, âge).

\- Supprimer une personne par id.

\- Rechercher une personne par id.

\- Rechercher une personne par nom.



Le frontend appelle les endpoints exposés par la ressource JAX‑RS `RestRouter` :



\- `GET /users/affiche`

\- `PUT /users/add/{age}/{name}`

\- `PUT /users/update/{id}/{age}/{name}`

\- `DELETE /users/remove/{id}`

\- `GET /users/getid/{id}`

\- `GET /users/getname/{name}`



Technologies utilisées



\- HTML5 pour la structure.

\- CSS3 (Flexbox, gradients, effets de hover) pour la mise en forme.

\- JavaScript (Fetch API, async/await) pour les appels REST.

\- Tomcat pour héberger l’application JAX‑RS côté serveur.



Structure du projet



Dans Eclipse (Dynamic Web Project) :



TestRS/

├─ WebContent/

│ ├─ index.html # Interface utilisateur

│ ├─ style.css # Styles et layout

│ └─ app.js # Logique frontend + appels REST

└─ Java Resources/

└─ com.info.service.RestRouter # Backend REST JAX‑RS







Le fichier `app.js` contient la constante `BASE\_URL` qui pointe vers le backend, par exemple :



const BASE\_URL = "http://localhost:8082/TestRS/test/users";







Adapter cette URL en fonction de ton port, context path et `@ApplicationPath`.



Prérequis



\- Java JDK installé.

\- Apache Tomcat configuré dans Eclipse.

\- Backend JAX‑RS déployé et fonctionnel (`RestRouter` et services JDBC/JPA).

\- Navigateur moderne supportant la \*\*Fetch API\*\*.



Lancer le projet



1\. Importer le projet dans Eclipse (Dynamic Web Project).  

2\. Vérifier que Tomcat est configuré et ajouter le projet `TestRS` au serveur.  

3\. Démarrer le serveur Tomcat depuis Eclipse.  

4\. Ouvrir le frontend dans le navigateur :



http://localhost:8082/TestRS/index.html







5\. Vérifier que `BASE\_URL` dans `app.js` correspond bien à l’URL réelle des services REST (tester par exemple `.../users/affiche` dans le navigateur ou Postman).



Utilisation



\- Liste des personnes : cliquer sur « Charger toutes les personnes ».

\- Ajouter : renseigner nom + âge, puis « Ajouter ».

\- Modifier : saisir l’ID à modifier, le nouveau nom et le nouvel âge, puis « Mettre à jour ».

\- Supprimer : saisir l’ID et cliquer sur « Supprimer ».

\- Recherche par ID : saisir l’ID et cliquer sur « Chercher ».

\- Recherche par nom : saisir le nom et cliquer sur « Chercher ».

Depot GIT: https://github.com/mohieddine-b/Projet-SOA-mohieddine-bouzayen-tp4.git
