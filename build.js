#!/usr/bin/env node

/**
 * Build Script for Production Deployment
 * Validates configuration, checks dependencies, and prepares the backend for deployment
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

class BuildSystem {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  log(message, type = 'info') {
    const prefix = {
      'info': `${colors.blue}ℹ${colors.reset}`,
      'success': `${colors.green}✓${colors.reset}`,
      'error': `${colors.red}✗${colors.reset}`,
      'warning': `${colors.yellow}⚠${colors.reset}`,
      'step': `${colors.cyan}→${colors.reset}`
    };
    console.log(`${prefix[type]} ${message}`);
  }

  async runCommand(command, description) {
    return new Promise((resolve) => {
      this.log(description, 'step');
      exec(command, (error, stdout, stderr) => {
        if (error) {
          this.errors.push(`${description}: ${error.message}`);
          this.log(`${description}: FAILED`, 'error');
          resolve(false);
        } else {
          this.success.push(description);
          this.log(`${description}: OK`, 'success');
          resolve(true);
        }
      });
    });
  }

  checkFile(filePath, description) {
    if (fs.existsSync(filePath)) {
      this.success.push(description);
      this.log(`${description}: FOUND`, 'success');
      return true;
    } else {
      this.errors.push(`${description}: NOT FOUND`);
      this.log(`${description}: NOT FOUND`, 'error');
      return false;
    }
  }

  async build() {
    console.log(`\n${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║     BACKEND BUILD SYSTEM - v1.0       ║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);

    // Step 1: Check Essential Files
    console.log(`${colors.cyan}=== ÉTAPE 1: Vérification des fichiers essentiels ===${colors.reset}\n`);
    this.checkFile(path.join(__dirname, 'server.js'), 'server.js');
    this.checkFile(path.join(__dirname, 'package.json'), 'package.json');
    this.checkFile(path.join(__dirname, 'config', 'config.js'), 'config/config.js');
    this.checkFile(path.join(__dirname, 'models'), 'models/');
    this.checkFile(path.join(__dirname, 'routes'), 'routes/');
    this.checkFile(path.join(__dirname, 'controller'), 'controller/');

    // Step 2: Check Environment
    console.log(`\n${colors.cyan}=== ÉTAPE 2: Vérification de l'environnement ===${colors.reset}\n`);
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      this.log('.env file exists', 'success');
      this.success.push('.env configuration');
    } else {
      this.warnings.push('.env file not found - using defaults');
      this.log('.env file not found - using defaults', 'warning');
    }

    // Step 3: Dependencies
    console.log(`\n${colors.cyan}=== ÉTAPE 3: Vérification des dépendances ===${colors.reset}\n`);
    await this.runCommand('npm list --depth=0', 'Checking npm dependencies');

    // Step 4: Security Audit
    console.log(`\n${colors.cyan}=== ÉTAPE 4: Audit de sécurité ===${colors.reset}\n`);
    await this.runCommand('npm audit', 'Security audit');

    // Step 5: Code Structure Validation
    console.log(`\n${colors.cyan}=== ÉTAPE 5: Validation de la structure ===${colors.reset}\n`);
    this.validateStructure();

    // Step 6: Configuration Files
    console.log(`\n${colors.cyan}=== ÉTAPE 6: Fichiers de configuration ===${colors.reset}\n`);
    this.createDeploymentFiles();

    // Final Report
    this.printReport();
  }

  validateStructure() {
    const requiredDirs = ['models', 'routes', 'controller', 'middleware', 'helpers', 'config'];
    requiredDirs.forEach(dir => {
      const dirPath = path.join(__dirname, dir);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).length;
        this.log(`${dir}/: ${files} file(s)`, 'success');
        this.success.push(`${dir} structure validated`);
      } else {
        this.warnings.push(`${dir}/ directory missing`);
        this.log(`${dir}/: MISSING`, 'warning');
      }
    });
  }

  createDeploymentFiles() {
    // Create .env.production template
    const envProdPath = path.join(__dirname, '.env.production.example');
    const envProdContent = `# Production Environment Configuration
# Copier ce fichier en .env.production et remplir les valeurs

NODE_ENV=production

# Database
DB_USER=your_db_user
DB_PASS=your_db_password
DB_Name=your_database_name
DB_HOST=your_db_host

# Server
PORT=8080

# JWT Secrets (utilisez des valeurs sécurisées!)
ACCESS_TOKEN_SECRET=your_access_token_secret_here_change_in_production
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here_change_in_production

# Email Configuration
EMAIL_ID=your_email@gmail.com
GOOGLEKEY=your_google_app_password

# URLs
FRONTEND_DEPLOYED_URL=https://your-frontend.com
BACKEND_DEPLOYED_URL=https://your-api.com
`;

    fs.writeFileSync(envProdPath, envProdContent);
    this.log('.env.production.example created', 'success');
    this.success.push('Deployment templates created');
  }

  printReport() {
    console.log(`\n${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║          BUILD REPORT                  ║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);

    if (this.success.length > 0) {
      console.log(`${colors.green}✓ Succès (${this.success.length}):${colors.reset}`);
      this.success.forEach(msg => console.log(`  ${colors.green}✓${colors.reset} ${msg}`));
    }

    if (this.warnings.length > 0) {
      console.log(`\n${colors.yellow}⚠ Avertissements (${this.warnings.length}):${colors.reset}`);
      this.warnings.forEach(msg => console.log(`  ${colors.yellow}⚠${colors.reset} ${msg}`));
    }

    if (this.errors.length > 0) {
      console.log(`\n${colors.red}✗ Erreurs (${this.errors.length}):${colors.reset}`);
      this.errors.forEach(msg => console.log(`  ${colors.red}✗${colors.reset} ${msg}`));
    }

    console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);

    if (this.errors.length === 0) {
      console.log(`${colors.green}🎉 BUILD RÉUSSI! Prêt pour le déploiement.${colors.reset}\n`);
      process.exit(0);
    } else {
      console.log(`${colors.red}❌ BUILD ÉCHOUÉ. Veuillez corriger les erreurs.${colors.reset}\n`);
      process.exit(1);
    }
  }
}

// Run build
const build = new BuildSystem();
build.build().catch(err => {
  console.error(colors.red, err, colors.reset);
  process.exit(1);
});
