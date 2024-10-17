# Client pour la cartographie nationale de l’offre de médiation numérique

## À propos

Ce client permet l'affichage de la [cartographie nationale de l’offre de médiation numérique](https://cartographie.societenumerique.gouv.fr) dans un navigateur web, il est construit à partir des éléments présents dans la bibliothèque pour la cartographie de l’offre de médiation numérique.

## Table des matières

- 🪧 [À propos](#à-propos)
- 🔗 [Liens utiles](#liens-utiles)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🤝 [Contribution](#contribution)
- 🏗️ [Construit avec](#construit-avec)
- 📚 [Documentation](#documentation)
- 🏷️ [Gestion des versions](#gestion-des-versions)
- 📝 [Licence](#licence)

## Liens utiles

- [Dashlord Incubateur des territoires](https://dashlord.incubateur.anct.gouv.fr/url/cartographie-societenumerique-gouv-fr-orientation)
- [Schéma de données des lieux de médiation numérique](https://schema.data.gouv.fr/LaMednum/standard-mediation-num/)

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
- La branche portant la version à publier est `publish` aucun commit ne doit être fait sur cette branche.

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

Pour publier une nouvelle version sur le registre npm, il faut que le numéro de version cible soit mis à jour dans le fichier `package.json`, que le commit de la version à publier porte un tag de la forme `vX.Y.Z` correspondant au numéro de version présent dans `package.json`, et que le changlog soit publier dans une release associé au tag de la version avant de procéder à la publication sur le registre [@gouvfr-anct/cartographie-nationale](https://www.npmjs.com/package/@gouvfr-anct/cartographie-nationale).

Ce processus est automatisé par l'utilitaire `semantic-release` exécuté par le workflow `release-and-publish`, pour le déclencher avec la bonne version à publier, il faut :

- Récupérer la version à publier depuis la branche `main`
- Récupérer ou créer la branche `publish`
- Faire un merge de `main` dans `publish` : ceci permet de mettre à jour la branche `publish` tout en concervant les tags qui ont été produits sur la branche `publish` lors du processus de publication.
- Pousser la branche `publish` `git push origin publish` conduit à l'exécution du workflow `release-and-publish` et donc à la publication d'une nouvelle version via l'utilitaire `semantic-release`

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
  - `TF_API_TOKEN` : Clé d'accès Terraform (Team API Token) pour publier les environments éphémères gérés par Terraform

#### Déploiement

##### Sur l'environnement de production

- L'infrastructure de déploiement est décrite avec Terraform dans les dépôts :
  - [Client Infrastructure](https://github.com/anct-cartographie-nationale/client-infrastructure)
  - [Network Infrastructure](https://github.com/anct-cartographie-nationale/network-infrastructure)
- [AWS](https://aws.amazon.com/) est la plateforme de services Cloud proposée par Amazon.
  - Compte de déploiement : `cartographie-nationale.client.ci`
  - Groupe : `publisher.client`
  - Environnement cible : https://cartographie.societenumerique.gouv.fr

##### Sur le registre npm

- [npm](https://www.npmjs.com/) est le registre de référence pour les paquets Node.
  - Organisation : [@gouvfr-anct](https://www.npmjs.com/org/gouvfr-anct)
  - Paquet : [@gouvfr-anct/cartographie-nationale](https://www.npmjs.com/package/@gouvfr-anct/cartographie-nationale)

## Documentation

### Table des matières

- [Intégration dans une page HTML](#intégration-dans-une-page-HTML)
- [Personnalisation](#personnalisation)
- [Utilisation partielle](#utilisation-partielle)

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
  <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
</head>
...
```

3. Liens vers les scripts `js` pour l'interactivité

```html
...
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>

  <script
    src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/mediation-numerique.js"
    type="module"></script>
</body>
...
```

4. Affichage avec les éléments `<fr-mediation-numerique-conteneur>` et `<fr-mediation-numerique>`

```html
...
<body>
  <fr-mediation-numerique-conteneur>
    <fr-mediation-numerique></fr-mediation-numerique>
  </fr-mediation-numerique-conteneur>

  <script
    src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/mediation-numerique.js"
    type="module"></script>
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
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body>
    <fr-mediation-numerique-conteneur>
      <fr-mediation-numerique></fr-mediation-numerique>
    </fr-mediation-numerique-conteneur>

    <script
      src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/mediation-numerique.js"
      type="module"></script>
  </body>
</html>
```

Cliquez sur `Run >` pour voir la cartographie s'afficher.

### Personnalisation

#### Titre et logo

Exemple :

```html
<fr-mediation-numerique-conteneur titre="Hub B" logo="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg">
  <fr-mediation-numerique></fr-mediation-numerique>
</fr-mediation-numerique-conteneur>
```

#### Illustration svg orientation

Il est possible d'afficher l'illustration correspondante à sa région.

Les valeurs disponibles sont :

- antille-guyane
- auvergne-rhone-alpe
- bourgogne-franche-conte
- bretagne
- centre-val-de-loire
- corse
- france-et-outremer
- grand-ouest
- hauts-de-france
- ile-de-france
- normandie
- nouvelle-aquitaine
- occitanie
- paca
- pays-de-la-loire
- st-martin-guadeloupe-martinique

La valeur par défaut est `france-et-outremer`.

Exemple:

```html
<fr-mediation-numerique-conteneur>
  <fr-mediation-numerique illustration="france-et-outremer"></fr-mediation-numerique>
</fr-mediation-numerique-conteneur>
```

#### Source de données

Pour utiliser une autre source il faut préciser une url qui fournit les données conformes au [schéma de données des lieux de médiation numérique](https://lamednum.coop/schema-de-donnees-des-lieux-de-mediation-numerique), nous publions régulièrement des données compatibles sur [data.gouv, dans l'organisation _Cartographie Nationale des lieux de médiation numérique_](https://www.data.gouv.fr/fr/organizations/cartographie-nationale-des-lieux-de-mediation-numerique/). N'hésitez pas à nous contacter pour faire apparaître vos données dans cette liste.

Exemple avec les données du hub Hinaura :

```html
<fr-mediation-numerique-conteneur>
  <fr-mediation-numerique
    source="https://www.data.gouv.fr/fr/datasets/r/55eea24c-be8c-47f9-9c4a-77399d346fbd"></fr-mediation-numerique>
</fr-mediation-numerique-conteneur>
```

#### Localisation initiale

Par défaut la carte est centrée sur le milieu de la France avec un niveau de zoom qui permet d'afficher le territoire métropolitain, il est possible de préciser la latitude et la longitude sur laquelle la carte doit être centrée ainsi que le niveau de zoom.

Exemple :

```html
<fr-mediation-numerique-conteneur>
  <fr-mediation-numerique latitude="45.515833" longitude="4.538056" zoom="8"></fr-mediation-numerique>
</fr-mediation-numerique-conteneur>
```

- Il est possible de récupérer la latitude et la longitude sur [openStreetMap](https://www.openstreetmap.org/node/3228260561) en recherchant une localité
- Le zoom doit être une valeur entière comprise entre 0 et 20
- Aussitôt affichée, la carte part de cette position initiale pour encadrer les marqueurs affichés issue de la source de donnée

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
  </head>
  <body>
    <fr-mediation-numerique-conteneur
      titre="Médiation numérique à Bessenay"
      logo="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg">
      <fr-mediation-numerique
        source="https://api.conseiller-numerique.gouv.fr/permanences"
        latitude="45.77647396140311"
        longitude="4.55431157343317"
        zoom="12"></fr-mediation-numerique>
    </fr-mediation-numerique-conteneur>

    <script
      src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/mediation-numerique.js"
      type="module"></script>
  </body>
</html>
```

### Utilisation partielle

Il est également possible de n'utiliser que certains sous-ensembles : en enlevant la barre de navigation et le pied de page, en utilisant seulement la cartographie ou seulement l'orientation. Cela peut demander un effort technique supplémentaire, mais permet une meilleure intégration dans un environnement déjà existant.

#### Enlever la barre de navigation et le pied de page

L'élément `<fr-mediation-numerique-conteneur>` gère l'affichage de la barre de navigation et du pied de page, mais également l'affichage en plein écran. En enlevant cet élément la barre de navigation et le pied de page disparaissent, mais il faut compenser le plein écran en ajoutant `class="vh-100"` sur l'élément `<body>` :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <fr-mediation-numerique
      titre="Médiation numérique à Bessenay"
      logo="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg"></fr-mediation-numerique>

    <script
      src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/mediation-numerique.js"
      type="module"></script>
  </body>
</html>
```

En l'absence de l'élément `<fr-mediation-numerique-conteneur>`, les configurations `titre` et `logo` peuvent être reportées sur l'élément `<fr-mediation-numerique>` (ces informations apparaissent dans le parcours d'orientation) :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <fr-mediation-numerique></fr-mediation-numerique>

    <script
      src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/mediation-numerique.js"
      type="module"></script>
  </body>
</html>
```

#### Utiliser seulement la cartographie

Pour n'importer que les sources strictement nécessaires à ce mode, il faut remplacer le script `mediation-numerique.js` par `cartographie.js` :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <script
      src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/cartographie.js"
      type="module"></script>
  </body>
</html>
```

Il est alors possible d'utiliser l'élément `<fr-mediation-numerique-cartographie></fr-mediation-numerique-cartographie>` :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <fr-mediation-numerique-cartographie></fr-mediation-numerique-cartographie>
    <script
      src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/cartographie.js"
      type="module"></script>
  </body>
</html>
```

Les attributs de personnalisations suivants, présentés dans la section précédente sont disponibles : `zoom`, `latitude`, `longitude`, `source` :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <fr-mediation-numerique-cartographie
      source="https://api.conseiller-numerique.gouv.fr/permanences"
      latitude="45.77647396140311"
      longitude="4.55431157343317"
      zoom="12"></fr-mediation-numerique-cartographie>
    <script
      src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/cartographie.js"
      type="module"></script>
  </body>
</html>
```

S'il existe une autre page dans laquelle un outil capable d'effectuer un parcours d'orientation est disponible, il est possible d'activer le bouton `Modifier les critères d'orientation` en fournissant un lien avec l'attribut `lien-orientation` :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <fr-mediation-numerique-cartographie
      source="https://api.conseiller-numerique.gouv.fr/permanences"
      latitude="45.77647396140311"
      longitude="4.55431157343317"
      zoom="12"
      lien-orientation="https://cartographie.societenumerique.gouv.fr/orientation"></fr-mediation-numerique-cartographie>
    <script
      src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/cartographie.js"
      type="module"></script>
  </body>
</html>
```

Les paramètres sélectionnés lors du parcours d'orientation sont fournis sous forme de paramètre d'url, par exemple `?date_ouverture=2022-08-17&ouvert_actuellement=true`.

> Il n'est pas possible d'utiliser la barre de navigation dans ce mode

#### Utiliser seulement l'orientation

Pour n'importer que les sources strictement nécessaires à ce mode, il faut remplacer le script `mediation-numerique.js` par `orientation.js` :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <script src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/orientation.js" type="module"></script>
  </body>
</html>
```

Il est alors possible d'utiliser l'élément `<fr-mediation-numerique-orientation></fr-mediation-numerique-orientation>` :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <fr-mediation-numerique-orientation></fr-mediation-numerique-orientation>
    <script src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/orientation.js" type="module"></script>
  </body>
</html>
```

Les attributs de personnalisations suivants, présentés dans la section précédente sont disponibles : `logo`, `titre`, `source`, `illustration` :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <fr-mediation-numerique-orientation
      source="https://api.conseiller-numerique.gouv.fr/permanences"
      titre="Médiation numérique à Bessenay"
      logo="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg"
      illustration="grand-ouest"></fr-mediation-numerique-orientation>
    <script src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/orientation.js" type="module"></script>
  </body>
</html>
```

S'il existe une autre page dans laquelle un outil capable d'effectuer un parcours d'orientation est disponible, il est possible d'activer le bouton `Afficher les résultats sur la cartographie` en fournissant un lien avec l'attribut `lien-cartographie` :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <base href="/" />
    <link href="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/styles.css" rel="stylesheet" />
  </head>
  <body class="vh-100">
    <fr-mediation-numerique-orientation
      source="https://api.conseiller-numerique.gouv.fr/permanences"
      titre="Médiation numérique à Bessenay"
      logo="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg"
      lien-cartographie="https://cartographie.societenumerique.gouv.fr/cartographie"></fr-mediation-numerique-orientation>
    <script src="https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.20.0/orientation.js" type="module"></script>
  </body>
</html>
```

Les paramètres sélectionnés lors du parcours d'orientation sont fournis sous forme de paramètre d'url, par exemple `?date_ouverture=2022-08-17&ouvert_actuellement=true`.

> Il n'est pas possible d'utiliser la barre de navigation dans ce mode

## Gestion des versions

Afin de maintenir un cycle de publication clair et de favoriser la rétrocompatibilité, la dénomination des versions suit la spécification décrite par la [Gestion sémantique de version](https://semver.org/lang/fr/)

Les versions disponibles ainsi que les journaux décrivant les changements apportés sont disponibles depuis [la page des Releases](https://github.com/anct-cartographie-nationale/client-application/releases).

## Licence

Voir le fichier [LICENSE.md](./LICENSE.md) du dépôt.
