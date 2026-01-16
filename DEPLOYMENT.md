# Guide de déploiement

## Prérequis

- Node.js >= 16.x
- MySQL >= 5.7
- Git

## Installation locale

1. **Cloner le dépôt**
   ```bash
   git clone <repository-url>
   cd mysql-nodejs-backend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   # Éditer .env avec vos valeurs réelles
   ```

4. **Créer la base de données**
   ```bash
   mysql -u root -p
   CREATE DATABASE node_backend;
   ```

5. **Exécuter les migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Démarrer le serveur**
   ```bash
   # Mode développement
   npm run dev
   
   # Mode production
   npm start
   ```

## Variables d'environnement critiques

```
PORT=8080
NODE_ENV=production
ACCESS_TOKEN_SECRET=<generate-a-long-random-string>
REFRESH_TOKEN_SECRET=<generate-another-long-random-string>
DB_PASS=<your-mysql-password>
EMAIL_ID=<your-gmail>
GOOGLEKEY=<your-gmail-app-password>
```

## Déploiement en production

### Option 1 : Heroku
```bash
heroku login
heroku create your-app-name
heroku addons:create cleardb:ignite
git push heroku main
```

### Option 2 : AWS/DigitalOcean
1. Créer une instance Linux (Ubuntu 20.04+)
2. Installer Node.js et PM2
3. Configurer les variables d'environnement
4. Utiliser PM2 pour la gestion des processus
5. Configurer Nginx comme reverse proxy

### Option 3 : Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

## Checklist de sécurité

- [ ] Changer tous les secrets (tokens JWT)
- [ ] Configurer CORS correctement pour votre domaine
- [ ] Activer HTTPS en production
- [ ] Sauvegarder régulièrement la base de données
- [ ] Monitorer les logs d'erreur
- [ ] Configurer un certificat SSL
- [ ] Utiliser des variables d'environnement pour tous les secrets

## Maintenance

- Mettre à jour les dépendances : `npm update`
- Vérifier les vulnérabilités : `npm audit`
- Nettoyer les dépendances inutilisées : `npm prune`
