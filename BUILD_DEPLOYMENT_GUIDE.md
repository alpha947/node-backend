# 🚀 GUIDE DE DÉPLOIEMENT - BUILD SYSTEM

## Table des matières
- [Quick Build](#quick-build)
- [Stratégies de Déploiement](#stratégies-de-déploiement)
- [Build Script Détails](#build-script-détails)
- [Commandes Disponibles](#commandes-disponibles)
- [Checklist Déploiement](#checklist-déploiement)

---

## Quick Build

### Étape 1: Préparer le Build
```bash
npm run build
```

**Ce qu'il fait:**
- ✅ Vérifie les fichiers essentiels
- ✅ Valide la structure du projet
- ✅ Contrôle npm audit
- ✅ Crée les fichiers de configuration
- ✅ Génère rapport détaillé

### Étape 2: Déployer
```bash
# Localement
npm start

# Production
npm run build:prod

# Ou manuellement
NODE_ENV=production node server.js
```

---

## Stratégies de Déploiement

### Stratégie 1: Heroku Deploy

**Fichier: Procfile**
```
web: npm start
```

**Commandes:**
```bash
# 1. Créer app Heroku
heroku create votre-app-name

# 2. Configurer variables d'environnement
heroku config:set DB_USER=votre_user
heroku config:set DB_PASS=votre_pass
heroku config:set DB_Name=votre_db
heroku config:set DB_HOST=votre_host

# 3. Deploy
git push heroku main

# 4. Logs
heroku logs --tail
```

**Avantages:**
- Déploiement simple (git push)
- Scaling automatique
- HTTPS gratuit

---

### Stratégie 2: AWS/DigitalOcean (VPS)

**Étape 1: Préparer le serveur**
```bash
# Sur votre serveur
ssh root@your_server_ip

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Créer utilisateur
sudo useradd -m nodejs
sudo su - nodejs
```

**Étape 2: Cloner et installer**
```bash
git clone votre-repo
cd mysql-nodejs-backend
npm install --production
```

**Étape 3: Configurer PM2 (process manager)**
```bash
npm install -g pm2

# Créer ecosystem.config.js
pm2 start server.js -i max --name "backend-api"

# Sauvegarder config
pm2 startup
pm2 save
```

**Étape 4: Nginx reverse proxy**
```nginx
server {
    listen 80;
    server_name api.votredomaine.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Avantages:**
- Contrôle total
- Coût contrôlé
- Scaling manuel

---

### Stratégie 3: Docker (Conteneurisation)

**Fichier: Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
```

**Fichier: docker-compose.yml**
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - DB_USER=root
      - DB_PASS=password
      - DB_Name=quadB
      - DB_HOST=mysql
      - PORT=8080
    depends_on:
      - mysql

  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: quadB
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

**Commandes:**
```bash
# Build image
docker build -t backend-api .

# Run avec docker-compose
docker-compose up -d

# Voir logs
docker-compose logs -f api

# Stop
docker-compose down
```

**Avantages:**
- Reproductibilité
- Déploiement partout
- Isolation complète

---

## Build Script Détails

### Étape 1: Vérification des fichiers
```
✓ server.js
✓ package.json
✓ config/config.js
✓ models/
✓ routes/
✓ controller/
```

### Étape 2: Vérification de l'environnement
```
✓ .env file exists (ou defaults utilisés)
```

### Étape 3: Vérification des dépendances
```
npm list --depth=0
```

### Étape 4: Audit de sécurité
```
npm audit
```

### Étape 5: Validation structure
```
✓ models/: n files
✓ routes/: n files
✓ controller/: n files
✓ middleware/: n files
✓ helpers/: n files
✓ config/: n files
```

### Étape 6: Fichiers de configuration
```
✓ .env.production.example créé
```

---

## Commandes Disponibles

### Build Commands
```bash
# Full build (recommandé avant déploiement)
npm run build

# Build + démarrer production
npm run build:prod

# Nettoyage des dépendances
npm run clean
```

### Development Commands
```bash
# Développement local
npm run dev

# Mode serveur
npm run server

# Production
npm start
```

---

## Checklist Déploiement

### Avant de déployer

#### Configuration ✅
- [ ] Copier `.env.production.example` en `.env.production`
- [ ] Remplir toutes les variables d'environnement
- [ ] Modifier `ACCESS_TOKEN_SECRET` et `REFRESH_TOKEN_SECRET`
- [ ] Vérifier `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_Name`
- [ ] Configurer `FRONTEND_DEPLOYED_URL` et `BACKEND_DEPLOYED_URL`

#### Sécurité ✅
- [ ] Exécuter `npm audit` → 0 vulnérabilités
- [ ] Vérifier secrets JWT (uniques et forts)
- [ ] Vérifier email configuration
- [ ] Vérifier CORS settings
- [ ] Activer HTTPS (Let's Encrypt si VPS)

#### Validation ✅
- [ ] Exécuter `npm run build` → succès
- [ ] Tester localement `npm run dev`
- [ ] Vérifier tous les endpoints
- [ ] Tester authentication/authorization
- [ ] Vérifier Swagger UI accessible

#### Base de données ✅
- [ ] Database créée
- [ ] Tables créées (migrations exécutées)
- [ ] Utilisateurs test créés
- [ ] Backups configurés

#### Performance ✅
- [ ] Logging configuré
- [ ] Error handling vérifié
- [ ] Timeouts configurés
- [ ] Cache headers configurés (si nécessaire)

### Après déploiement

#### Vérification ✅
- [ ] Serveur démarre sans erreur
- [ ] Tous endpoints accessibles
- [ ] Database connectée
- [ ] Logs propres (pas d'erreurs)
- [ ] Swagger UI accessible

#### Monitoring ✅
- [ ] Configurer monitoring (PM2 Plus, DataDog, etc.)
- [ ] Configurer alertes
- [ ] Configurer logs (CloudWatch, Stackdriver, etc.)
- [ ] Configurer backup database
- [ ] Tester health checks

#### Documentation ✅
- [ ] URL de l'API documentée
- [ ] Credentials sécurisées
- [ ] Processus de rollback documenté
- [ ] Escalade documentée

---

## Scripts de Déploiement Rapides

### Deploy Heroku
```bash
#!/bin/bash
npm run build
git add .
git commit -m "Build pour déploiement"
git push heroku main
heroku logs --tail
```

### Deploy VPS
```bash
#!/bin/bash
npm run build
ssh root@server_ip << 'EOF'
  cd /app/backend
  git pull
  npm install --production
  pm2 restart backend-api
EOF
pm2 logs backend-api
```

### Deploy Docker
```bash
#!/bin/bash
npm run build
docker-compose down
docker-compose build
docker-compose up -d
docker-compose logs -f api
```

---

## Optimisations Production

### 1. Réduire la taille des dépendances
```bash
npm run clean
npm install --production
```

### 2. Utiliser env vars pour secrets
```javascript
// ✗ Mauvais
const SECRET = "my-secret-123";

// ✓ Bon
const SECRET = process.env.ACCESS_TOKEN_SECRET;
```

### 3. Activer compression
```javascript
const compression = require('compression');
app.use(compression());
```

### 4. Utiliser connection pooling
```javascript
// Dans config.js
pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}
```

---

## Troubleshooting

### "npm audit failed"
```bash
npm audit fix
npm audit fix --force
```

### "Build failed - missing files"
```bash
npm run build
# Vérifier les fichiers listés en erreur
# Créer les fichiers manquants
```

### "Database connection failed"
```bash
# Vérifier variables d'environnement
echo $DB_HOST
echo $DB_USER

# Tester connexion
mysql -h $DB_HOST -u $DB_USER -p$DB_PASS
```

### "Port already in use"
```bash
# Chercher le processus
lsof -i :8080

# Tuer le processus
kill -9 <PID>
```

---

## Ressources Utiles

- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Sequelize Deployment](https://sequelize.org/docs/v6/deployment/)
- [Heroku Node Deployment](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## Support

Pour toute question concernant le déploiement:

1. Consulter [DEPLOYMENT.md](DEPLOYMENT.md)
2. Vérifier [SECURITY.md](SECURITY.md)
3. Vérifier les logs: `npm run dev` (dev) ou `docker logs` (prod)

---

**Build System v1.0** - Configuration prête pour production ✅
