# 📃 Dockistry

<img src="https://badgen.net/badge/Release/v1.3.4/green">
<img src="https://badgen.net/badge/Maintainer/Mathis%20Grisel/purple?icon=terminal">
<img src="https://badgen.net/badge/Docker Compose/Up to date?icon=docker">
<img src="https://badgen.net/badge/GitLab/Up%20to%20date/orange?icon=gitlab">
<img src="https://badgen.net/badge/Node Packages/npm install/green?icon=npm">


<br>

L'objectif de Dockistry (document registry) est de compiler l'ensemble des livrables des projects de R&I dans une même base de données, dans l'optique d'optimiser le partage de documents. Dockistry est un outil pensé pour la collaboration et l'usage concurrent d'un grand nombre d'utilisateurs, ce qui en fait une solution plus adéquate et agréable que ne l'était un tableur excel partagé. Toutefois, un retour arrière est possible avec un système d'export au format CSV.

Un Wiki complet de l'application est disponible ici:
http://10.29.150.203/dockistry/Dockistry/-/wikis/home


## 🖥️ Utilisation

### 🏁 Premier démarrage

Au premier démarrage de l'application, seul un compte `root` existe. Vous devrez donc vous y connecter (`root root`), puis en changer le mot de passe. **`CE MOT DE PASSE N'EST MODIFIABLE QUE LORSQUE VOUS ÊTES CONNECTÉ AU COMPTE. JE VOUS CONSEILLE DONC FORTEMENT DE LE NOTER.`** Une fois fait, vous pourrez accéder au panel d'administration de l'application (`/admin`), dans lequel vous créerez vos nouveaux comptes utilisateurs (en cliquant sur le bouton +). 2 rôles sont disponibles: utilisateur et administrateur. L'administrateur a **tous les droits**, hormis celui de modifier le mot de passe root. Il n'est donc pas nécessaire de lui ajouter d'accès aux différents projets. Il est recommandé de n'utiliser le compte root qu'en cas particulier, et d'utiliser des comptes administrateur à la place.

### ➕ Création de comptes

Lors de la création d'un nouvel utilisateur (par un administrateur ou root), un champ de texte "projets" vous permet d'assigner des droits projet par projet (séparés par une virgule). L'utilisateur pourra alors voir tous les documents inhérents aux projets pré-cités, ainsi que les modifier ou bien en ajouter.

### 🔎 Recherche et tri des documents

En haut à droite de la page se situe un champ de recherche, qui filtrant les documents qui ne correspondent pas à vos recherches. Vous pourrez rechercher, en même temps, des documents en écrivant leur projet, leur titre ou encore le nom de leurs auteurs. Le système de tri (en haut de la page), vous permet de changer l'ordre d'affichage des documents par date, par projet et par type.

### 🖨️ Export en CSV

Il est possible d'exporter les documents auxquels vous avez accès en CSV. En cliquant sur l'icône en forme de tableau dans la barre de navigation, votre navigateur lancera automatiquement le téléchargement du fichier. **Ce dernier ne contient que ce qui se trouve à l'écran au moment de l'export**, ce qui veut donc dire que vous pouvez combiner ce système avec la recherche et le tri de documents pour n'exporter que ce que vous souhaitez conserver, et dans l'ordre qui vous arrange.

### 🔒 Changement de mot de passe

Un administrateur (ou root) peut modifier le mot de passe de n'importe quel utilisateur via l'interface administrateur. Chaque utilisateur peut modifier son propre mot de passe à l'aide de l'icône "clé" dans la barre de navigation. Il n'existe pas de procédure de "mot de passe oublié", et il est donc nécessaire de demander à un administrateur pour toute modifiation de mot de passe. Les mots de passe sont chiffrés


## 📥 Installation

### 📦 Via Docker

L'application est divisée en 2 conteneurs, contenus au sein d'un Docker Compose. Le conteneur web est basé sur l'image NodeJS, et le conteneur database sur l'image MySQL.

Voici le protocole de démarrage de l'application:
```sh
# Construction des conteneurs sur Linux
sh build.sh

# Construction des conteneurs sur Windows
./build.bat

# Démarrage de l'application
docker-compose up
```

Par défaut, les données de l'application (sauvegarde de la base de données) sont stockées à l'aide d'un partage de volume, dans /var/opt/dockistry. Il est toutefois possible de le modifier dans le fichier docker-compose.yml.

### 💾 Sans Docker

*Méthode non recommandée*

L'installation sans utiliser Docker est un peu plus complexe. Dans un premier temps, il faut installer Node et NPM. Voici les commandes permettant le lancement de l'applicatif web:

```sh
# Installation des packets JavaScript nécessaires
npm install

# Lancement de l'application web
npm start
```

Pour ce qui est de la base de données, il est nécessaire d'installer un serveur MySQL et d'utiliser le fichier db-dump.sql afin de formater la base de données nouvellement créée. Enfin il faudra modifier le chemin d'accès et les identifiants de la base dans le code source de l'application web (routes/database.js).
