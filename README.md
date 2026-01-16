# 🚀 QuadB Tech Node.js Backend - Documentation Complète

## 📖 👈 **COMMENCEZ ICI: START_HERE.md**

Vous trouverez tout ce dont vous avez besoin pour créer rapidement des endpoints API avec documentation automatique.

---

## 🎯 Capacités principales

- ✅ **Créer des endpoints en 5 minutes** (templates copier/coller)
- ✅ **Documentation automatique** avec Swagger UI
- ✅ **Authentification JWT** complète
- ✅ **Rôles et permissions** (admin, superadmin, user)
- ✅ **Validation des données** automatique
- ✅ **Sécurité renforcée** (Helmet, headers sécurisés)
- ✅ **0 vulnérabilités** de sécurité
- ✅ **12 guides complets** pour apprendre

---

## 🚀 Déployer (Build System)

### Préparation Build
```bash
npm run build    # Vérifie la structure, les dépendances et crée les fichiers de config
```

### 3 Façons de Déployer

**1. 🎯 Local (Immédiat)**
```bash
npm start        # Démarre le serveur
npm run dev      # Mode développement avec auto-reload
```

**2. 🐳 Docker (Recommandé)**
```bash
docker-compose up -d   # Démarre API + MySQL
```

**3. 🌍 Production (Heroku/VPS)**
```bash
npm run build:prod     # Build + démarre production
git push heroku main   # Ou push vers votre serveur
```

👉 **Voir:** [BUILD_QUICK_START.md](BUILD_QUICK_START.md) pour les 3 stratégies détaillées

---

## 🎯 Quickstart - Développement (10 minutes)

### 1. Démarrer le serveur
```bash
npm run dev
```

### 2. Voir la documentation API
```
http://localhost:8080/api-docs
```

### 3. Créer votre premier endpoint
1. Ouvrir: `QUICK_START.md`
2. Copier: Un template
3. Adapter: À votre cas
4. Tester: Dans Swagger

---

## 📚 Documentation disponible

| Guide | Durée | Contenu |
|-------|-------|---------|
| **START_HERE.md** | 5 min | Point de départ |
| **QUICK_START.md** | 10 min | 5 étapes + templates |
| **ARCHITECTURE_GUIDE.md** | 15 min | Comprendre le système |
| **RAPID_ENDPOINTS_GUIDE.md** | 20 min | Patterns avancés |
| **SWAGGER_COMPLETE_GUIDE.md** | 15 min | Documenter l'API |
| **DOCUMENTATION_README.md** | 5 min | Vue d'ensemble |
| **DEPLOYMENT.md** | 30 min | Déployer en production |
| **SECURITY.md** | 10 min | Recommandations sécurité |

**Plus 5 autres guides pour couvrir tous les sujets!**

---

## 🎯 Fonctionnalité disponible

### Utilisateurs (User Management)
- ✅ Enregistrement
- ✅ Connexion avec JWT
- ✅ Récupérer les détails
- ✅ Modifier le profil
- ✅ Supprimer compte
- ✅ Récupérer image profil

### Authentification & Sécurité
- ✅ JWT Tokens
- ✅ Access Token (1 jour)
- ✅ Refresh Token (24 jours)
- ✅ Rôles et permissions
- ✅ Hashage des mots de passe (bcryptjs)

### Documentation
- ✅ Swagger UI automatique
- ✅ Schémas OpenAPI
- ✅ Testable directement
- ✅ Exemples inclus

---

## 🛠️ Stack technologique

```
Frontend:        HTTP/HTTPS
Communication:   REST API + JSON
Backend:         Express.js 4.18.2
ORM:             Sequelize 6.35.0
Database:        MySQL
Authentication:  JWT (jsonwebtoken 9.0.2)
Encryption:      bcryptjs 2.4.3
Security:        Helmet 7.0.0
Validation:      express-validator 7.0.0
Email:           Nodemailer 7.0.12
Documentation:   Swagger/OpenAPI
```

---

## 📖 Endpoints disponibles

### Authentication
```
POST   /users/register          - Créer un compte
POST   /users/login             - Se connecter
```

### User Management
```
GET    /users/details/:id       - Récupérer infos
GET    /users/image/:id         - Récupérer image
PUT    /users/update            - Modifier compte (AUTH)
POST   /users/insert            - Créer utilisateur (ADMIN)
DELETE /users/delete/:id        - Supprimer compte (ADMIN)
```

**Tous les endpoints sont documentés dans Swagger UI!**

---

## 🚀 Installation & Configuration

### 1. Prérequis
```bash
Node.js >= 16.x
MySQL >= 5.7
npm >= 7.x
```

### 2. Installation
```bash
npm install
```

### 3. Configuration
```bash
cp .env.example .env
# Éditer .env avec vos valeurs réelles
```

### 4. Base de données
```bash
mysql -u root -p
CREATE DATABASE quadB;
```

### 5. Démarrer
```bash
npm run dev        # Mode développement
npm start          # Mode production
```

---

## 🔐 Configuration de sécurité

### Variables essentielles (.env)
```env
PORT=8080
DB_USER=root
DB_PASS=your_password
DB_Name=quadB
DB_HOST=localhost
NODE_ENV=development

# Secrets JWT (CHANGEZ CES VALEURS!)
ACCESS_TOKEN_SECRET=votre-clé-secrète-long-aléatoire
REFRESH_TOKEN_SECRET=votre-refresh-secret-long-aléatoire

# Email (optionnel)
EMAIL_ID=votre-email@gmail.com
GOOGLEKEY=votre-app-password
```

---

## 📊 Structure du projet

```
project/
├── controller/              ← Logique métier
│   └── userController.js
├── models/                  ← Structure données
│   └── user.js
├── routes/                  ← Routes API
│   └── userRouter.js
├── middleware/              ← Authentification
│   ├── authentication.js
│   └── authorization.js
├── helpers/                 ← Utilitaires
├── docs/                    ← Documentation Swagger
│   └── swagger.js
├── config/                  ← Configuration
└── server.js                ← Point d'entrée
```

---

## ✨ Exemples d'utilisation

### Créer un endpoint GET
```javascript
router.get('/list', getAll);
```

### Créer un endpoint POST sécurisé
```javascript
router.post('/create', authenticate, checkRole(['admin']), create);
```

### Créer un endpoint PUT
```javascript
router.put('/update/:id', authenticate, update);
```

**Plus d'exemples dans QUICK_START.md!**

---

## 🧪 Tester l'API

### Via Swagger UI
```
http://localhost:8080/api-docs
```
1. Ouvrir dans le navigateur
2. Cliquer sur l'endpoint
3. "Try it out"
4. Remplir les paramètres
5. "Execute"

### Via cURL
```bash
curl http://localhost:8080/users/list
```

### Avec authentification
```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:8080/users/update
```

---

## 📈 Prochaines étapes

### Débutant
- [ ] Lire DOCUMENTATION_README.md
- [ ] Créer 1er endpoint
- [ ] Tester dans Swagger
- [ ] Ajouter l'authentification

### Intermédiaire
- [ ] Lire RAPID_ENDPOINTS_GUIDE.md
- [ ] Créer endpoints complexes
- [ ] Ajouter validation
- [ ] Ajouter relations BD

### Avancé
- [ ] Lire DEPLOYMENT.md
- [ ] Ajouter pagination
- [ ] Ajouter recherche
- [ ] Déployer en production

---

## 📞 Support & Ressources

### Guides complets
- Voir `START_HERE.md` pour navigation
- 12 guides détaillés disponibles
- 15+ exemples de code
- 5+ diagrammes visuels

### Ressources externes
- Express.js: https://expressjs.com
- Sequelize: https://sequelize.org
- Swagger/OpenAPI: https://swagger.io
- JWT: https://jwt.io

---

## ✅ Mise à jour (Jan 2026)

- ✅ Dépendances actualisées (0 vulnérabilités)
- ✅ Documentation complète (12 guides)
- ✅ Sécurité renforcée
- ✅ Swagger intégré
- ✅ Templates disponibles
- ✅ Prêt pour production

---

## 🎓 Niveau de maîtrise

```
Après QUICK_START.md:        Créer des endpoints
Après RAPID_ENDPOINTS.md:    Endpoints avancés
Après tous les guides:       Expert!
```

---

## 🎉 Vous êtes maintenant prêt!

Ouvrez **START_HERE.md** et commencez votre première API!

```
npm run dev
→ http://localhost:8080/api-docs
→ Créer votre API!
```

---

## 📝 Licence

ISC

---

## 👤 Auteur

QuadB Tech

---

**Dernière mise à jour:** 15 Janvier 2026  
**Version:** 1.0.0+documentation  
**État:** ✅ Production Ready


## Backend-Routes
- **User Authentication**:
  - `POST /users/register`: Register a new user.
  - `POST /users/login`: Log in with a registered user.
  - `GET /users/details/{user_id}`: Get the user's details by user_id .
  - `PUT /users/update`: update the user (protected route using JWT).
  - `POST /users/image/{user_id}`: get user's image.
  - `POST /users/insert`: insert new user (protected route using JWT).
  - `DELETE /users/delete/{user_id}`: delete the user using user_id.

### Technologies Used

- Node.js 
- Express.js
- MySQL
- Sequelize
- Sequelize-cli
- Bcrypt
- JWT
- Swagger (for API documentation)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Rubel011/quadb-nodejs-backend.git

2. Navigate to the project directory:
    ```bash
    cd quadb-nodejs-backend
3. Install the project dependencies:
    ```bash
    npm install 

4. Create a .env file in the project root and configure the following environment variables:
    ```markdown
    PORT=your-database-port
    DB_USER=your-database-username
    DB_PASS=your-database-password
    DB_Name=your-database-name
    DB_HOST=your-database-host
    NODE_ENV=production
    ACCESS_TOKEN_SECRET=masai-school-web
    REFRESH_TOKEN_SECRET=masai-school
    ACCESS_TOKEN_EXPIRATION=1d
    REFRESH_TOKEN_EXPIRATION=24d
    EMAIL_ID=nodemailer-email-id
    GOOGLEKEY=nodemailer-google-key
    FRONTEND_DEPLOYED_URL=#
    BACKEND_DEPLOYED_URL=http://localhost:8080/

4. Start the server:
    ```
    npm run server
    ```

5. Access the backend API at http://localhost:PORT.
