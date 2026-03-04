# 🚀 Guide de déploiement — Budget Étudiant
## Site web + Application mobile (PWA)

---

## 📦 ÉTAPE 1 — Installer Node.js (5 min)

1. Va sur **https://nodejs.org**
2. Clique sur le gros bouton vert **"LTS"** (la version stable)
3. Lance l'installateur téléchargé et clique "Next" jusqu'à la fin
4. Redémarre ton ordinateur

✅ Pour vérifier que c'est bien installé, ouvre **PowerShell** (cherche "PowerShell" dans le menu Démarrer) et tape :
```
node --version
```
Tu dois voir quelque chose comme `v20.x.x`

---

## 📁 ÉTAPE 2 — Préparer le projet (2 min)

1. Décompresse le fichier **budget-app.zip** que tu as téléchargé
2. Place le dossier **budget-app** sur ton Bureau (ou où tu veux)
3. Ouvre **PowerShell** dans ce dossier :
   - Fais un clic droit sur le dossier **budget-app**
   - Clique sur **"Ouvrir dans le Terminal"**
   (ou sur **"Ouvrir une fenêtre PowerShell ici"**)

---

## ⚙️ ÉTAPE 3 — Installer les dépendances (2 min)

Dans PowerShell, tape cette commande et appuie sur Entrée :
```
npm install
```
Attend que ça se termine (tu vois des lignes défiler, c'est normal).

### Tester en local
```
npm run dev
```
Ouvre ton navigateur sur **http://localhost:5173** → tu vois ton appli ! 🎉

---

## 🌐 ÉTAPE 4 — Publier sur Internet (5 min)

### 4a. Crée un compte GitHub (gratuit)
1. Va sur **https://github.com** → "Sign up"
2. Crée ton compte avec ton email

### 4b. Installe Git
1. Va sur **https://git-scm.com/download/win**
2. Télécharge et installe (clique "Next" partout)

### 4c. Mets ton code sur GitHub
Dans PowerShell (dans le dossier budget-app) :
```
git init
git add .
git commit -m "Mon budget étudiant"
```
Puis sur GitHub :
1. Clique sur le **"+"** en haut à droite → **"New repository"**
2. Nomme-le `budget-etudiant`
3. Clique **"Create repository"**
4. Copie-colle les commandes que GitHub t'affiche (les 2 lignes avec `git remote` et `git push`)

### 4d. Déploie sur Vercel (GRATUIT)
1. Va sur **https://vercel.com** → "Sign up with GitHub"
2. Clique **"Add New Project"**
3. Sélectionne ton repo `budget-etudiant`
4. Clique **"Deploy"**

⏳ Attends 1-2 minutes...

🎉 **Ton appli est en ligne !** Vercel te donne une URL du type :
`https://budget-etudiant-xyz.vercel.app`

Partage cette URL avec tout le monde !

---

## 📱 ÉTAPE 5 — Installer l'appli sur téléphone (PWA)

Ton appli est déjà une PWA ! Pour l'installer sur téléphone :

### Sur Android (Chrome)
1. Ouvre l'URL de ton appli dans Chrome
2. Appuie sur les **3 points** en haut à droite
3. Appuie sur **"Ajouter à l'écran d'accueil"**
4. Appuie sur **"Installer"**

✅ L'appli apparaît sur ton écran d'accueil comme une vraie appli !

### Sur iPhone (Safari)
1. Ouvre l'URL dans **Safari**
2. Appuie sur l'icône **Partager** (le carré avec une flèche)
3. Appuie sur **"Sur l'écran d'accueil"**
4. Appuie sur **"Ajouter"**

---

## ❓ Problèmes fréquents

**"npm n'est pas reconnu"** → Node.js n'est pas bien installé, redémarre et réessaie

**"git n'est pas reconnu"** → Ferme et rouvre PowerShell après avoir installé Git

**L'appli ne se lance pas** → Vérifie que tu es bien dans le bon dossier dans PowerShell

---

## 🆘 Besoin d'aide ?

Reviens dans le chat avec Claude et décris ce que tu vois — je t'aide pas à pas !
