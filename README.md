# Client pour la cartographie nationale de l’offre de médiation numérique

## À propos

Ce client permet l'affichage de la [cartographie nationale de l’offre de médiation numérique](https://d2pzn8br7bs1l.cloudfront.net/) dans un navigateur web, il est construit à partir des éléments présents dans la bibliothèque pour la cartographie de l’offre de médiation numérique.

## Table des matières

- 🪧 [À propos](#à-propos)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🤝 [Contribution](#contribution)
- 🏗️ [Construit avec](#construit-avec)
- 📚 [Documentation](#documentation)
- 🏷️ [Gestion des versions](#gestion-des-versions)
- 📝 [Licence](#licence)

## Prérequis

- [Git](https://git-scm.com/) : Système de contrôle de versions distribué d'un ensemble de fichiers
- [Node](https://nodejs.org/) : Environnement d'exécution pour Javascript
- [Yarn](https://yarnpkg.com/) : Gestionnaire de paquets pour les produits développés dans des environnements Node

> Node et Yarn peuvent être installés via [nvm](https://github.com/nvm-sh/nvm) qui permet d'obtenir et d'utiliser rapidement différentes versions de Node via la ligne de commande.

## Installation

### Mise en place des sources

Ce projet a été construit dans un espace de travail Angular, pour fonctionner correctement, il est nécessaire de le cloner dans l'environnement prévu à cet effet :

- Suivre la procédure d'installation du projet [Client Base](https://github.com/anct-cartographie-nationale/client-base)
- Puis cloner le dépôt en local dans le dossier `projects` : `git clone git@github.com:anct-cartographie-nationale/client-application.git`

### Installer Husky

[Husky](https://typicode.github.io/husky) est un outil de gestion des hooks git pour effectuer des tâches automatiques

Mise en place de Husky dans le dossier du projet `projects/client-application` :

```bash
npx husky install
```

Rendre exécutable les fichiers qui contiennent les hooks :

```bash
chmod a+x .husky/commit-msg
chmod a+x .husky/pre-commit
```

## Utilisation

Ces commandes servent dans un contexte de développement de l'application et doivent être exécutées depuis la racine de l'espace de travail, c'est-à-dire depuis le dossier parent du dossier `projects`.

### Lancement

Exécuter `yarn start`, puis naviguer vers `http://localhost:4200/`.

### Construction

Exécuter `yarn build client-application` pour construire le projet. Les fichiers de sortie sont écrits dans le dossier `dist/`.

### Test

Exécuter `yarn test client-application` pour tester le projet.

### ESLint

Exécuter `yarn lint client-application` pour une analyse statique des fichiers `.ts` du projet.

### StyleLint

Exécuter `yarn stylelint "projects/client-application/**/*.scss"` pour une analyse statique des fichiers `.scss` du projet.

### Commit lint

Exécuter `yarn commitlint --from HEAD~1` pour valider la syntaxe du dernier commit.

### Prettier

Exécuter `yarn prettier` pour mettre à niveau la syntaxe de l'ensemble des fichiers du projet.

### Ajouter des icônes au projet

- Aller sur [Remixicon](https://remixicon.com/)
- Cliquer sur le dossier à droite de la barre de recherche, puis importer la [collection du projet](./src/assets/fonts/remixicon/collection.remixicon) en cliquant sur la flèche vers le bas dans la modale.
- Rechercher et sélectionner les icônes à ajouter
- Une fois les ajouts terminés
  - Cliquer sur le dossier à droite de la barre de recherche pour télécharger le nouveau fichier de collection en cliquant sur la flèche vers le haut, le renommer `collection.remixicon`, puis remplacer l'ancienne version [dans le dossier des fonts](./src/assets/fonts/remixicon/)
  - Sans quitter la modale qui affiche la collection, télécharger les fonts en cliquant sur le bouton correspondant en bas à droite, puis extraire les fichiers de l'archive pour les copier [dans le dossier des fonts](./src/assets/fonts/remixicon/) excepté les fichiers `remixicon.css` et `remixicon.less`
  - Ajouter les nouveaux `codepoint` à la fin du fichier [icons.scss](./src/scss/components/_icons.scss) disponibles dans le fichier `remixicon.css`
  - Relancer le serveur pour appliquer les changements

## Contribution

### Nommage des branches

- Avant de créer une nouvelle branche de travail, récupérer les dernières modifications disponibles sur la branche `main`
- La nouvelle branche de travail doit ête préfixée par `build/`, `chore/`, `ci/`, `docs/`, `feat/`, `fix/`, `perf/`, `refactor/`, `revert/`, `style/` ou `test/` en fonction du type de modification prévu, pour plus de détails à ce sujet, consulter [Conventional Commits cheat sheet](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)
- Une branche portant une version à publier doit être de la forme `release/X.Y` avec `X.Y` égal au numéro de majeur et de mineur de la release, cela signifie donc que tous les patches sont à appliquer sur la même branche pour chaque version mineure. Cette organisation permet de gérer plusieurs versions de la bibliothèque en parallèle sans mettre en péril la rétrocompatibilité.

### Commits

#### Convention

Les commits de ce repository doivent respecter la syntaxe décrite par la spécification des [Commits Conventionnels](https://www.conventionalcommits.org/fr)

#### Signature

La branche `main`, ainsi que l'ensemble des branches de travail avec un préfixe valide requièrent que les commits soient signés :

- La documentation de GitHub indique comment [configurer la signature des commits](https://docs.github.com/en/enterprise-server@3.5/authentication/managing-commit-signature-verification/about-commit-signature-verification)
- Les utilisateurs de [keybase](https://keybase.io/) peuvent [signer leurs commits avec leur clé GPG sur Keybase](https://stephenreescarter.net/signing-git-commits-with-a-keybase-gpg-key/)

### Publier sur la branche principale

- La branche principale est `main`, il n'est pas possible de publier en faisant un `push` depuis un dépôt local
- Il faut forcément créer une nouvelle branche de travail avec l'un préfixe autorisé
- À chaque publication sur une branche de travail, le workflow `Validate feature` sur [github actions](https://github.com/anct-cartographie-nationale/client-application/actions) vérifie
  - Qu'il est possible de créer un build sans erreur
  - Que la syntaxe correspond bien à ce qui est [défini par Prettier](https://github.com/anct-cartographie-nationale/client-base/blob/main/.prettierrc.json)
  - Que le code écrit en TypeScript respecte les conventions décrites par les [règles ESLint](https://github.com/anct-cartographie-nationale/client-base/blob/main/.eslintrc.json)
  - Que le style écrit en SCSS respecte les conventions décrites par les [règles Standard](https://github.com/anct-cartographie-nationale/client-base/blob/main/.stylelintrc.json)
  - Que les messages des commits suivent le standard établi par [Conventional Commits](https://www.conventionalcommits.org/fr)
- Une fois les développements terminés, il faut créer une [pull request](https://github.com/anct-cartographie-nationale/client-application/pulls) avec la banche de travail comme origin et la branche `main` comme destination.
- La pull request ne peut être fusionné que si :
  - Les étapes du workflow `Validate feature` sont valides
  - Les fichiers modifiés ont été revus par au moins une personne
  - Les commits ajoutés sont signés
- La branche de travail est supprimée automatiquement une fois qu'elle a été fusionnée

### Déployer

#### Sur l'environnement de production

Lorsqu'une branche est fusionnée avec `main`, cela déclenche automatiquement la publication du build sur l'espace dédié à la production ainsi que l'invalidation du cache sur le CDN.

#### Sur le registre npm

Pour publier une nouvelle version sur le registre npm, il faut que le numéro de version cible soit mis à jour dans le fichier `package.json`, que le fichier `CHANGELOG.md` soit mis à jour et que le commit de la version à publier porte un tag de la forme `vX.Y.Z` correspondant au numéro de version présent dans `package.json`.

Il est possible d'automatiser ce processus en utilisant la commande `standard-version` :

- Récupérer la version à publier depuis la branche `main`
- Vérifier la valeur du prochain tag avec la commande `standard-version --dry-run`
- Récupérer ou créer la branche `release/X.Y` correspondant à la majeure et la mineure indiquée par la commande précédente
- Lancer la commande `standard-version` qui
  - met à jour la version dans le fichier `package.json`
  - met à jour le fichier `CHANGELOG.md`
  - créé un nouveau commit
  - ajoute le tag correspondant à la version dans le fichier `package.json`
- Pousser la branche avec le tag `git push origin release/X.Y --tags` conduit à la publication d'une nouvelle version
- Si le numéro de version est le plus grand au sens de la [priorité définie par la spécification de la gestion sémantique de version (11)](https://semver.org/lang/fr/), alors il faut créer une [pull request](https://github.com/anct-cartographie-nationale/client-application/pulls) vers la branche `main`, il ne faut pas le faire si ce n'est pas le cas.

## Construit avec

### langages & Frameworks

- [TypeScript](https://www.typescriptlang.org/) est un langage open source construit à partir de JavaScript
- [Angular](https://angular.io/) est une boîte à outils open source pour construire des clients web
- [Remixicon](https://remixicon.com/) est un ensemble de symboles open-source élaborés pour les designers et les développeurs.

### Outils

#### CLI

- [Jest](https://jestjs.io/) est une boîte à outils pour écrire des tests automatisés en JavaScript
- [Eslint](https://eslint.org/) est un analyseur statique de JavaScript
- [Stylelint](https://stylelint.io/) est un analyseur statique de fichiers de style (css, scss, etc.)
- [Prettier](https://prettier.io/) est un magnificateur de code source en JavaScript

#### CI

- [Github Actions](https://docs.github.com/en/actions) est l'outil d'intégration et de déploiement continu intégré à GitHub
  - L'historique des déploiements est disponible [sous l'onglet Actions](https://github.com/anct-cartographie-nationale/client-application/actions/)
- Secrets du dépôt :
  - `AWS_ACCESS_KEY_ID` : Clé d'accès AWS du compte `cartographie-nationale.client.ci`
  - `AWS_SECRET_ACCESS_KEY` : Secret associé à la clé d'accès à AWS du compte `cartographie-nationale.client.ci`
  - `AWS_S3_BUCKET` : Identifiant de l'espace sur AWS S3 dans lequel est publié le build du projet pour un accès public
  - `AWS_CLOUDFRONT_DISTRIBUTION_ID` : Identifiant de la distribution CloudFront qui est le CDN par lequel le site est exposé sur internet
  - `NODE_AUTH_TOKEN` : Clé d'accès NPM pour publier sur l'organisation [@gouvfr-anct](https://www.npmjs.com/org/gouvfr-anct)

#### Déploiement

##### Sur l'environnement de production

- L'infrastructure de déploiement est décrite avec Terraform dans les dépôts :
  - [Client Infrastructure](https://github.com/anct-cartographie-nationale/client-infrastructure)
  - [Network Infrastructure](https://github.com/anct-cartographie-nationale/network-infrastructure)
- [AWS](https://aws.amazon.com/) est la plateforme de services Cloud proposée par Amazon.
  - Compte de déploiement : `cartographie-nationale.client.ci`
  - Groupe : `publisher.client`
  - Environnement cible : https://d2pzn8br7bs1l.cloudfront.net/

##### Sur le registre npm

- [npm](https://www.npmjs.com/) est le registre de référence pour les paquets Node.
  - Organisation : [@gouvfr-anct](https://www.npmjs.com/org/gouvfr-anct)
  - Paquet : [@gouvfr-anct/cartographie-nationale](https://www.npmjs.com/package/@gouvfr-anct/cartographie-nationale)

## Documentation

### Table des matières

- [Intégration dans une page HTML](#intégration-dans-une-page-HTML)
- [Personnalisation](#personnalisation)

### Intégration dans une page HTML

La Cartographie Nationale intègre dès le début de sa conception la possibilité d'être intégrée dans n'importe quelle page HTML en 4 étapes.

L'éditeur en ligne de [w3schools](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_intro) permet de tester cela facilement :

1. Mise en place du chemin de référence

```html
...
<head>
  <title>Page Title</title>
  <base href="/" />
</head>
...
```

2. Lien vers le style `css` pour la mise en forme

```html
...
<head>
  <title>Page Title</title>
  <base href="/" />
  <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@2.2.0/styles.css" rel="stylesheet" />
</head>
...
```

3. Liens vers les scripts `js` pour l'interactivité

```html
...
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>

  <script src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@2.2.0/script.js" type="module"></script>
</body>
...
```

4. Affichage avec l'élément `<fr-mediation-numerique>`

```html
...
<body>
  <fr-mediation-numerique></fr-mediation-numerique>

  <script src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@2.2.0/script.js" type="module"></script>
</body>
...
```

La version finale devrait ressembler à celà :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@2.2.0/styles.css" rel="stylesheet" />
  </head>
  <body>
    <fr-mediation-numerique></fr-mediation-numerique>

    <script src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@2.2.0/script.js" type="module"></script>
  </body>
</html>
```

Cliquez sur `Run >` pour voir la cartographie s'afficher.

### Personnalisation

#### Titre et logo

Exemple :

```html
<fr-mediation-numerique
  titre="Hub B"
  logo="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg"></fr-mediation-numerique>
```

#### Source de données

Par défaut la source de données affiche les CnFS, pour utiliser une autre source il faut préciser une url qui fournit les données conformes au [schéma de données des lieux de médiation numérique](https://lamednum.coop/schema-de-donnees-des-lieux-de-mediation-numerique)

Exemple :

```html
<fr-mediation-numerique
  source="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@2.2.0/assets/data/lieux-de-mediation-numerique.json"></fr-mediation-numerique>
```

#### Localisation initiale

Par défaut la carte est centrée sur le milieu de la France avec un niveau de zoom qui permet d'afficher le territoire métropolitain, il est possible de préciser la latitude et la longitude sur laquelle la carte doit être centrée ainsi que le niveau de zoom.

Exemple :

```html
<fr-mediation-numerique latitude="45.77647396140311" longitude="4.55431157343317" zoom="12"></fr-mediation-numerique>
```

- Il est possible de récupérer la latitude et la longitude sur [openStreetMap](https://www.openstreetmap.org/node/3228260561) en recherchant une localité.
- Le zoom doit être une valeur entière comprise entre 0 et 20.

#### Couleur

Il est possible de changer certaines couleurs utilisées par la cartographie, pour cela il faut remplacer le style par une alternative comprenant les modifications des couleurs, notre outil disponible sur [GitHub](https://github.com/) permet de faire cela :

- [Créer un compte GitHub](https://github.com/signup?ref_cta=Sign+up) si besoin
- Récupérer les sources de la cartographie [avec l'aide d'un `Fork`](https://github.com/anct-cartographie-nationale/client-application/fork) puis cliquer sur le bouton vert pour créer le `Fork`
- Une fois l'opération terminée, cliquer sur l'onglet `Actions` en haut de la page
- Autoriser l'utilisation des `Workflows`, c'est cela qui va permettre de modifier le fichier de style
- Cliquer sur `Generate custom style` dans la liste à gauche
- Cliquer sur le bouton `Run workflow` à droite, vous devez entrer une valeur pour `Primary Color` avant de cliquer sur le bouton `Run workflow` vert, la valeur de la couleur doit avoir cette forme : `#712cf9`, sans oublier le `#`
- Patienter quelques instants puis cliquer sur la tâche nommée `Generate custom style` dès qu'elle apparaît
- Le fichier est généré au bout de quelques minutes, lorsque c'est terminé, un `Artifact` nommé `build` apparaît dans la liste en bas, cliquer dessus pour le télécharger puis décompresser l'archive `build.zip`, qui contient uniquement le fichier `style.css`
- Idéalement il faudrait héberger correctement le fichier `style.css` avec le reste des fichiers du site, par exemple dans un dossier `assets/`, il faudrait alors remplacer le contenu de `<link />` vers ce chemin :
  ```html
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="/assets/style.css" rel="stylesheet" />
  </head>
  ```
  Mais pour aller au bout de cet exemple, une autre méthode permet de renseigner directement le style dans la page html que nous sommes en train d'éditer, pour cela il faut ouvrir le fichier `style.css` avec le programme `notepad` sur Windows, copier l'intégralité du contenu et le coller dans l'emplacement `<style></style>`
  ```html
  <head>
    <title>Page Title</title>
    <base href="/" />
    <style>
      Remplacer ce texte par le contenu du fichier style.css (@charset "UTF-8" etc.)
    </style>
  </head>
  ```

#### Exemple complet de personnalisation

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <style>
      @charset "UTF-8";:root{...
    </style>
    <link
      href="https://gist.githubusercontent.com/Kyappy/1e38c73048929c1df34d44749e3542e0/raw/5e4a06b49f3bb8431ca9cfc8f93631f4a36ba75d/styles.css"
      rel="stylesheet" />
  </head>
  <body>
    <fr-mediation-numerique
      titre="Médiation numérique à Bessenay"
      logo="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg"
      source="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@2.2.0/assets/data/lieux-de-mediation-numerique.json"
      latitude="45.77647396140311"
      longitude="4.55431157343317"
      zoom="12"></fr-mediation-numerique>

    <script src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@2.2.0/script.js" type="module"></script>
  </body>
</html>
```

## Gestion des versions

Afin de maintenir un cycle de publication clair et de favoriser la rétrocompatibilité, la dénomination des versions suit la spécification décrite par la [Gestion sémantique de version](https://semver.org/lang/fr/)

Les versions disponibles ainsi que les journaux décrivant les changements apportés sont disponibles depuis [la page des Releases](https://github.com/anct-cartographie-nationale/client-application/releases).

## Licence

Voir le fichier [LICENSE.md](./LICENSE.md) du dépôt.
