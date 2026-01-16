#!/bin/bash

# Backend Build & Deploy Script
# Usage: ./deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
BRANCH=${2:-main}

echo "🚀 Déploiement du Backend - Environnement: $ENVIRONMENT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Étape 1: Build
echo -e "\n📦 Étape 1: Build du projet..."
npm run build

# Étape 2: Vérifier environnement
echo -e "\n🔍 Étape 2: Vérification de l'environnement..."
if [ ! -f ".env.$ENVIRONMENT" ]; then
    echo "❌ Erreur: .env.$ENVIRONMENT non trouvé!"
    exit 1
fi
echo "✅ Fichier .env.$ENVIRONMENT trouvé"

# Étape 3: Installer dépendances
echo -e "\n📚 Étape 3: Installation des dépendances..."
npm install --production

# Étape 4: Exécuter migrations
echo -e "\n🗄️  Étape 4: Exécution des migrations..."
NODE_ENV=$ENVIRONMENT npx sequelize-cli db:migrate || echo "⚠️  Migrations skipped"

# Étape 5: Déployer
echo -e "\n✈️  Étape 5: Déploiement..."

if [ "$ENVIRONMENT" = "heroku" ]; then
    echo "Déploiement Heroku..."
    git push heroku $BRANCH
    heroku logs --tail
elif [ "$ENVIRONMENT" = "docker" ]; then
    echo "Déploiement Docker..."
    docker-compose down
    docker-compose build
    docker-compose up -d
    docker-compose logs -f api
elif [ "$ENVIRONMENT" = "production" ]; then
    echo "Déploiement Production..."
    NODE_ENV=production npm start
else
    echo "Environnement inconnu: $ENVIRONMENT"
    exit 1
fi

echo -e "\n✅ Déploiement réussi!"
