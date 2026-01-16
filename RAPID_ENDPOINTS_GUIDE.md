# 📚 Guide Complet - Architecture & Création Rapide d'Endpoints

## Table des matières
1. [Architecture générale](#architecture-générale)
2. [Structure des dossiers](#structure-des-dossiers)
3. [Patterns & Conventions](#patterns--conventions)
4. [Guide rapide - Créer un nouvel endpoint](#guide-rapide---créer-un-nouvel-endpoint)
5. [Exemples pratiques](#exemples-pratiques)
6. [Checklist](#checklist)

---

## Architecture générale

```
Request → Route → Controller → Model → Database
            ↓
        Middleware (Auth, Validation)
            ↓
        Response (JSON)
```

### Flux de données complet :
```
1. Client envoie une requête HTTP
2. Route filtre la requête
3. Middleware (authentication, authorization, validation)
4. Controller traite la logique métier
5. Model interagit avec la BD via Sequelize
6. Response retourne le résultat
```

---

## Structure des dossiers

```
project/
├── config/
│   ├── config.js          ← Configuration BD
│   └── swaggerConfig.js   ← Configuration Swagger
├── controller/
│   ├── userController.js  ← Logique métier User
│   ├── productController.js
│   └── orderController.js
├── middleware/
│   ├── authentication.js  ← Vérifier token JWT
│   └── authorization.js   ← Vérifier les rôles
├── models/
│   ├── index.js           ← Configuration Sequelize
│   ├── user.js
│   ├── product.js
│   └── order.js
├── routes/
│   ├── userRouter.js
│   ├── productRouter.js
│   └── orderRouter.js
├── docs/
│   └── swagger.js         ← Documentation Swagger
├── helpers/
│   ├── sendEmail.js
│   └── successAndError.js
└── server.js              ← Point d'entrée
```

---

## Patterns & Conventions

### 1️⃣ Pattern : Standard Response

**Helper:** [helpers/successAndError.js](../helpers/successAndError.js)

```javascript
// ✅ Succès
res.status(200).json(successResponse(200, "Message", data));

// ❌ Erreur
res.status(400).json(errorResponse(400, "Message d'erreur"));
```

### 2️⃣ Pattern : Middleware Authentication

```javascript
// Route protégée par authentification
router.post('/action', authenticate, controller.action);

// Avec vérification de rôle
router.post('/admin-only', authenticate, checkRole(['admin']), controller.action);
```

### 3️⃣ Pattern : Gestion des erreurs

```javascript
try {
    // Votre logique
} catch (error) {
    console.error(error);
    return res.status(500).json(errorResponse(500, 'Server error'));
}
```

---

## Guide rapide - Créer un nouvel endpoint

### 🚀 5 étapes simples

#### Étape 1 : Créer le Model
**Fichier:** `models/product.js`
```javascript
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: DataTypes.STRING,
        product_price: DataTypes.DECIMAL,
        product_description: DataTypes.TEXT,
        product_category: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        timestamps: true
    });
    return Product;
};
```

#### Étape 2 : Créer le Controller
**Fichier:** `controller/productController.js`
```javascript
const { successResponse, errorResponse } = require('../helpers/successAndError');
const { Product } = require('../models');

// GET tous les produits
module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(successResponse(200, 'Products retrieved', products));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// GET un produit par ID
module.exports.getProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = await Product.findByPk(product_id);
        
        if (!product) {
            return res.status(404).json(errorResponse(404, 'Product not found'));
        }
        
        res.status(200).json(successResponse(200, 'Product retrieved', product));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// CREATE un produit
module.exports.createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const product = await Product.create(newProduct);
        res.status(201).json(successResponse(201, 'Product created', product));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// UPDATE un produit
module.exports.updateProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = await Product.findByPk(product_id);
        
        if (!product) {
            return res.status(404).json(errorResponse(404, 'Product not found'));
        }
        
        await product.update(req.body);
        res.status(200).json(successResponse(200, 'Product updated', product));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// DELETE un produit
module.exports.deleteProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = await Product.findByPk(product_id);
        
        if (!product) {
            return res.status(404).json(errorResponse(404, 'Product not found'));
        }
        
        await product.destroy();
        res.status(200).json(successResponse(200, 'Product deleted', null));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
```

#### Étape 3 : Créer les Routes
**Fichier:** `routes/productRouter.js`
```javascript
const express = require('express');
const productRouter = express.Router();
const authenticate = require('../middleware/authentication');
const { checkRole } = require('../middleware/authorization');

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controller/productController');

// Routes publiques
productRouter.get('/list', getAllProducts);
productRouter.get('/:product_id', getProductById);

// Routes protégées (admin uniquement)
productRouter.post('/create', authenticate, checkRole(['admin']), createProduct);
productRouter.put('/update/:product_id', authenticate, checkRole(['admin']), updateProduct);
productRouter.delete('/delete/:product_id', authenticate, checkRole(['admin']), deleteProduct);

module.exports = productRouter;
```

#### Étape 4 : Enregistrer les routes dans server.js
```javascript
const productRouter = require('./routes/productRouter');
// ...
app.use("/products", productRouter);
```

#### Étape 5 : Documenter dans Swagger
**Fichier:** `docs/swagger.js` (ajouter à la fin)
```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - product_name
 *         - product_price
 *       properties:
 *         product_id:
 *           type: integer
 *         product_name:
 *           type: string
 *         product_price:
 *           type: number
 *         product_description:
 *           type: string
 *         product_category:
 *           type: string
 *
 * /products/list:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *
 * /products/{product_id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Product retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found
 *
 * /products/create:
 *   post:
 *     summary: Create new product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '401':
 *         description: Unauthorized
 *
 * /products/update/{product_id}:
 *   put:
 *     summary: Update product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product updated
 *       '404':
 *         description: Product not found
 *
 * /products/delete/{product_id}:
 *   delete:
 *     summary: Delete product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Product deleted
 *       '404':
 *         description: Product not found
 */
```

---

## Exemples pratiques

### Exemple 1 : Endpoint avec validation

```javascript
// Controller avec validation
const { body, validationResult } = require('express-validator');

module.exports.createProductWithValidation = async (req, res) => {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errorResponse(400, 'Validation failed', errors.array()));
    }

    try {
        const product = await Product.create(req.body);
        res.status(201).json(successResponse(201, 'Product created', product));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// Route avec validation
router.post('/create',
    authenticate,
    checkRole(['admin']),
    body('product_name').notEmpty().trim(),
    body('product_price').isFloat({ min: 0 }),
    createProductWithValidation
);
```

### Exemple 2 : Endpoint avec relations (Jointures)

```javascript
// Récupérer les produits avec l'utilisateur qui les a créés
module.exports.getProductsWithAuthor = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['user_id', 'user_name', 'user_email']
                }
            ]
        });
        res.status(200).json(successResponse(200, 'Products retrieved', products));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
```

### Exemple 3 : Endpoint avec pagination & filtrage

```javascript
module.exports.getProductsPaginated = async (req, res) => {
    try {
        const { page = 1, limit = 10, category } = req.query;
        const offset = (page - 1) * limit;
        
        const where = category ? { product_category: category } : {};
        
        const { count, rows } = await Product.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset
        });
        
        res.status(200).json(successResponse(200, 'Products retrieved', {
            total: count,
            page,
            limit,
            products: rows
        }));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
```

### Exemple 4 : Endpoint avec recherche

```javascript
const { Op } = require('sequelize');

module.exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json(errorResponse(400, 'Query parameter required'));
        }
        
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { product_name: { [Op.like]: `%${query}%` } },
                    { product_description: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        
        res.status(200).json(successResponse(200, 'Search results', products));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
```

---

## Checklist

### ✅ Avant de créer un nouvel endpoint

- [ ] Définir le modèle de données (Model)
- [ ] Créer les fonctions du controller
- [ ] Ajouter les routes
- [ ] Enregistrer le router dans server.js
- [ ] Documenter dans Swagger
- [ ] Tester avec Postman/Thunder Client
- [ ] Ajouter la validation si nécessaire
- [ ] Vérifier les erreurs et exceptions

### 📋 Checklist de sécurité

- [ ] Routes protégées avec `authenticate` middleware
- [ ] Vérification des rôles avec `checkRole`
- [ ] Validation des données d'entrée
- [ ] Gestion des erreurs appropriée
- [ ] Pas de mots de passe en réponse
- [ ] Utiliser les variables d'environnement

---

## Commandes utiles

### Créer une migration
```bash
npx sequelize-cli migration:create --name create-product
```

### Exécuter les migrations
```bash
npx sequelize-cli db:migrate
```

### Annuler les migrations
```bash
npx sequelize-cli db:migrate:undo
```

### Générer un modèle avec Sequelize
```bash
npx sequelize-cli model:create --name Product --attributes name:string,price:decimal
```

---

## Résumé : Créer un endpoint en 5 minutes

1. **Model** → Définir la structure BD
2. **Controller** → Créer les fonctions CRUD
3. **Router** → Ajouter les routes
4. **Server.js** → Enregistrer le router
5. **Swagger** → Documenter l'API

**Total : ~5-10 minutes par endpoint complet! 🚀**
