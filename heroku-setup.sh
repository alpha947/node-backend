#!/bin/bash

# Configuration Heroku automatisée
# Usage: bash heroku-setup.sh app-name

APP_NAME=${1:-my-backend-app}

echo "🚀 Configuration Heroku - $APP_NAME"
echo "════════════════════════════════════════"

# Vérifier si Heroku CLI est installé
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI non trouvé!"
    echo "📥 Téléchargez: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

echo "✓ Heroku CLI trouvé"

# Étape 1: Login
echo -e "\n1️⃣  Authentification..."
heroku login

# Étape 2: Créer app
echo -e "\n2️⃣  Création de l'app..."
heroku create $APP_NAME 2>/dev/null || echo "App existe déjà"

# Étape 3: Configurer variables d'environnement
echo -e "\n3️⃣  Configuration des variables d'environnement..."

read -p "DB_USER: " DB_USER
read -p "DB_PASS: " DB_PASS
read -s -p "ACCESS_TOKEN_SECRET: " TOKEN_SECRET
echo
read -s -p "REFRESH_TOKEN_SECRET: " REFRESH_SECRET
echo

heroku config:set \
    NODE_ENV=production \
    DB_USER="$DB_USER" \
    DB_PASS="$DB_PASS" \
    ACCESS_TOKEN_SECRET="$TOKEN_SECRET" \
    REFRESH_TOKEN_SECRET="$REFRESH_SECRET" \
    -a $APP_NAME

# Étape 4: Ajouter MySQL addon (optionnel)
echo -e "\n4️⃣  Addons (optionnel)..."
read -p "Ajouter MySQL addon? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    heroku addons:create jawsdb:kitefin -a $APP_NAME
fi

# Étape 5: Déployer
echo -e "\n5️⃣  Déploiement..."
read -p "Déployer maintenant? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push heroku main
fi

# Étape 6: Voir logs
echo -e "\n6️⃣  Logs..."
heroku logs --tail -a $APP_NAME

echo -e "\n✅ Configuration terminée!"
echo "App: https://$APP_NAME.herokuapp.com"
