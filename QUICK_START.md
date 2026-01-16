# ⚡ Quick Start Guide - Créer des endpoints en 5 minutes

## 🎯 Objectif
Créer rapidement un nouvel endpoint API complètement documenté et sécurisé.

---

## 📋 Template - Copier/Coller rapide

### Cas 1 : Simple GET (Récupérer des données)

**Fichier:** `controller/productController.js`
```javascript
module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(successResponse(200, 'Products retrieved', products));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
```

**Fichier:** `routes/productRouter.js`
```javascript
const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controller/productController');

router.get('/list', getAllProducts);

module.exports = router;
```

**Fichier:** `server.js` (ajouter)
```javascript
const productRouter = require('./routes/productRouter');
app.use('/products', productRouter);
```

**Fichier:** `docs/swagger.js` (ajouter à la fin)
```javascript
/**
 * @swagger
 * /products/list:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: Products retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
```

---

### Cas 2 : POST (Créer des données)

**Controller:**
```javascript
module.exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(successResponse(201, 'Product created', product));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
```

**Route:**
```javascript
router.post('/create', authenticate, checkRole(['admin']), createProduct);
```

**Swagger:**
```javascript
/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Product created
 *       '401':
 *         description: Unauthorized
 */
```

---

### Cas 3 : PUT (Modifier des données)

**Controller:**
```javascript
module.exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json(errorResponse(404, 'Not found'));
        }
        await product.update(req.body);
        res.status(200).json(successResponse(200, 'Updated', product));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
```

**Route:**
```javascript
router.put('/update/:id', authenticate, updateProduct);
```

---

### Cas 4 : DELETE (Supprimer des données)

**Controller:**
```javascript
module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json(errorResponse(404, 'Not found'));
        }
        await product.destroy();
        res.status(200).json(successResponse(200, 'Deleted', null));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
```

---

## ⚡ Checklist - 5 étapes

### ✅ Étape 1 : Créer le Controller (2 min)
```
□ Créer controller/mondEntite.js
□ Ajouter les fonctions (getAll, getById, create, update, delete)
□ Importer { successResponse, errorResponse }
□ Ajouter try-catch pour chaque fonction
```

### ✅ Étape 2 : Créer les Routes (2 min)
```
□ Créer routes/mondEntiteRouter.js
□ Ajouter GET, POST, PUT, DELETE routes
□ Appliquer middleware (authenticate, checkRole)
□ Importer les fonctions du controller
```

### ✅ Étape 3 : Enregistrer le Router (1 min)
```
□ Ouvrir server.js
□ Ajouter: const mondEntiteRouter = require('./routes/mondEntiteRouter');
□ Ajouter: app.use('/mondEntite', mondEntiteRouter);
```

### ✅ Étape 4 : Documenter Swagger (1 min)
```
□ Ouvrir docs/swagger.js
□ Ajouter schema en haut
□ Ajouter endpoints à la fin
□ Copier/coller template depuis ce guide
```

### ✅ Étape 5 : Tester (1 min)
```
□ npm run dev
□ Visiter http://localhost:8080/api-docs
□ Tester l'endpoint dans Swagger
```

---

## 🧪 Tests rapides - Exemplaires

### Test 1: GET sans authentification
```bash
curl http://localhost:8080/products/list
```

### Test 2: POST avec body
```bash
curl -X POST http://localhost:8080/products/create \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999}'
```

### Test 3: Avec token JWT
```bash
curl http://localhost:8080/users/update \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"user_id":1,"user_name":"New Name"}'
```

---

## 📚 Fichiers clés

| Fichier | Rôle |
|---------|------|
| `controller/*.js` | Logique métier |
| `routes/*.js` | Définition des routes |
| `models/*.js` | Structure de données |
| `middleware/*.js` | Authentification, validation |
| `docs/swagger.js` | Documentation API |
| `server.js` | Point d'entrée principal |
| `helpers/*.js` | Fonctions utilitaires |

---

## 🔒 Sécurité - À ne pas oublier

```javascript
// ❌ MAUVAIS - Route sans protection
router.post('/admin-action', controllerFunc);

// ✅ BON - Route protégée
router.post('/admin-action', authenticate, checkRole(['admin']), controllerFunc);

// ✅ BON - Vérifier l'existence
if (!user) {
    return res.status(404).json(errorResponse(404, 'Not found'));
}

// ❌ MAUVAIS - Retourner le mot de passe
res.json(successResponse(200, 'User', { ...user, user_password: user.user_password }));

// ✅ BON - Exclure les données sensibles
const { user_password, ...userSafe } = user.toJSON();
res.json(successResponse(200, 'User', userSafe));
```

---

## 📊 Comparaison : Avant vs Après

### ❌ AVANT (Sans guide)
```
Temps: 30-45 minutes
Étapes: Chercher les patterns, explorer le code
Documentation: Oubliée ou faite après
Cohérence: Incertaine
```

### ✅ APRÈS (Avec guide)
```
Temps: 5-10 minutes
Étapes: Suivre le template
Documentation: Automatique
Cohérence: Garantie
```

---

## 🚀 Commandes rapides

```bash
# Démarrer le serveur
npm run dev

# Voir la documentation
open http://localhost:8080/api-docs

# Vérifier les dépendances
npm list

# Mettre à jour les dépendances
npm update

# Tester un endpoint
curl http://localhost:8080/users/list
```

---

## 📝 Exemple complet - Entity "Blog"

### 1. Model (models/blog.js)
```javascript
module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        blog_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        author: DataTypes.STRING,
        category: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { timestamps: true });
    return Blog;
};
```

### 2. Controller (controller/blogController.js)
```javascript
const { Blog } = require('../models');
const { successResponse, errorResponse } = require('../helpers/successAndError');

module.exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json(successResponse(200, 'Blogs retrieved', blogs));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

module.exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(successResponse(201, 'Blog created', blog));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
```

### 3. Routes (routes/blogRouter.js)
```javascript
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authentication');
const { checkRole } = require('../middleware/authorization');
const { getAllBlogs, createBlog } = require('../controller/blogController');

router.get('/list', getAllBlogs);
router.post('/create', authenticate, checkRole(['admin']), createBlog);

module.exports = router;
```

### 4. Enregistrer dans server.js
```javascript
const blogRouter = require('./routes/blogRouter');
app.use('/blogs', blogRouter);
```

### 5. Swagger
```javascript
/**
 * @swagger
 * /blogs/list:
 *   get:
 *     summary: Get all blogs
 *     tags:
 *       - Blogs
 *     responses:
 *       '200':
 *         description: Blogs retrieved
 */
```

**C'est tout! 🎉**

---

## 💡 Pro Tips

1. **Copier/Coller les templates** plutôt que de tout écrire
2. **Tester immédiatement** dans Swagger après chaque création
3. **Utiliser les mêmes patterns** pour la cohérence
4. **Documenter en même temps** que vous codez
5. **Vérifier l'authentification** sur les routes sensibles

---

## ⚠️ Erreurs courantes

```javascript
// ❌ Oublier les try-catch
module.exports.getUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);  // BOOM si erreur!
};

// ✅ Ajouter try-catch
module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json(successResponse(200, 'User', user));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// ❌ Routes sans authentification
router.delete('/user/:id', deleteUser);

// ✅ Routes protégées
router.delete('/user/:id', authenticate, checkRole(['admin']), deleteUser);
```

---

## 🎓 Prochaines étapes

- [ ] Créer un endpoint GET simple
- [ ] Créer un endpoint POST
- [ ] Ajouter la validation
- [ ] Tester dans Swagger
- [ ] Ajouter une relation entre models
- [ ] Créer une endpoint avec filtrage/pagination

**Vous êtes maintenant prêt à créer rapidement des APIs! 🚀**
