# 📖 Guide Complet Swagger - Documentation API

## Table des matières
1. [Accéder à la documentation Swagger](#accéder-à-la-documentation)
2. [Comprendre Swagger](#comprendre-swagger)
3. [Structure Swagger](#structure-swagger)
4. [Exemples pratiques](#exemples-pratiques)
5. [Tester les endpoints](#tester-les-endpoints)
6. [Documenter vos endpoints](#documenter-vos-endpoints)

---

## Accéder à la documentation

### URL
```
http://localhost:8080/api-docs
```

### En production
```
https://votre-domaine.com/api-docs
```

---

## Comprendre Swagger

### Qu'est-ce que Swagger ?

**Swagger** (OpenAPI) est une norme pour documenter les APIs REST. Elle permet :
- ✅ Génération automatique de documentation
- ✅ Test interactif des endpoints
- ✅ Génération de clients (SDK)
- ✅ Validation des réponses

### Avantages
```
📚 Documentation automatique
🧪 Test en direct sans outils externes
🔐 Support de l'authentification
📋 Schémas réutilisables
```

---

## Structure Swagger

### 1. Composants de base

```javascript
/**
 * @swagger
 * /endpoint:
 *   method:
 *     summary: Titre court
 *     description: Description détaillée
 *     tags: [Category]
 *     parameters: [...]
 *     requestBody: {...}
 *     responses: {...}
 */
```

### 2. Paramètres

#### Query Parameter (dans l'URL)
```javascript
/**
 * @swagger
 * /products?category=electronics&page=1:
 *   get:
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Product category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 */
```

#### Path Parameter
```javascript
/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 */
```

#### Header Parameter
```javascript
/**
 * @swagger
 * /protected:
 *   get:
 *     parameters:
 *       - in: header
 *         name: X-API-Key
 *         schema:
 *           type: string
 *         description: API Key
 */
```

### 3. Request Body

```javascript
/**
 * @swagger
 * /products/create:
 *   post:
 *     requestBody:
 *       required: true
 *       description: Product details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 example: 999.99
 *               description:
 *                 type: string
 *                 example: "High-performance laptop"
 */
```

### 4. Réponses

```javascript
/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
```

### 5. Schémas réutilisables

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         product_id:
 *           type: integer
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 */
```

---

## Exemples pratiques

### Exemple 1 : Simple GET

```javascript
/**
 * @swagger
 * /articles/list:
 *   get:
 *     summary: Get all articles
 *     tags:
 *       - Articles
 *     responses:
 *       '200':
 *         description: Articles list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
```

### Exemple 2 : POST avec body

```javascript
/**
 * @swagger
 * /articles/create:
 *   post:
 *     summary: Create article
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Article created
 */
```

### Exemple 3 : Avec authentification

```javascript
/**
 * @swagger
 * /articles/delete/{id}:
 *   delete:
 *     summary: Delete article
 *     tags:
 *       - Articles
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Article deleted
 *       '401':
 *         description: Unauthorized
 */
```

### Exemple 4 : Avec pagination et filtres

```javascript
/**
 * @swagger
 * /articles/search:
 *   get:
 *     summary: Search articles with pagination
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       '200':
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 */
```

---

## Tester les endpoints

### Via Swagger UI

1. Ouvrez `http://localhost:8080/api-docs`
2. Trouvez l'endpoint à tester
3. Cliquez sur "Try it out"
4. Remplissez les paramètres
5. Cliquez sur "Execute"
6. Voyez la réponse

### Exemple : Tester /users/login

```json
// Request
{
  "user_email": "john@example.com",
  "user_password": "securePassword123"
}

// Response
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "user_id": 1,
      "user_name": "John Doe",
      "user_email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Exemple : Tester /users/update avec authentification

1. Copiez le token reçu du login
2. Dans Swagger, cliquez sur "Authorize" (cadenas)
3. Entrez : `Bearer <votre_token>`
4. Exécutez la requête

---

## Documenter vos endpoints

### Template standard

```javascript
/**
 * @swagger
 * /route:
 *   method:
 *     summary: Résumé court (une ligne)
 *     description: Description détaillée
 *     tags:
 *       - Catégorie
 *     security:
 *       - BearerAuth: []  # Si protégé
 *     parameters:
 *       - in: path|query|header
 *         name: paramName
 *         required: true|false
 *         schema:
 *           type: string|integer|boolean|object
 *         description: Description du param
 *         example: "example value"
 *     requestBody:
 *       required: true|false
 *       description: Description du body
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - field1
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchemaName'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server error
 */
```

### Checklist documentation

- [ ] Summary (< 120 caractères)
- [ ] Description claire
- [ ] Tags appropriés
- [ ] Tous les paramètres documentés
- [ ] Request body si nécessaire
- [ ] Tous les codes de réponse
- [ ] Exemples dans les schémas
- [ ] Sécurité si protégé

---

## Structure des fichiers Swagger

```
docs/
├── swagger.js           ← Documentation complète
├── swagger-old.js       ← Sauvegarde ancien format
└── swagger-product.js   ← (Optionnel) Docs produits
```

---

## Configuration Swagger (swaggerConfig.js)

```javascript
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "QuadB Tech API",
            version: "1.0.0",
            description: "Backend API documentation"
        },
        servers: [
            {
                url: process.env.BACKEND_DEPLOYED_URL || "http://localhost:8080"
            }
        ],
    },
    apis: ["./docs/*.js"],  // Fichiers à scanner
};

const specs = swaggerJsDoc(options);
module.exports = specs;
```

---

## Tips & Tricks

### 1. Réutiliser les schémas

```javascript
// Définir une fois
/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *         message:
 *           type: string
 */

// Utiliser partout
responses:
  '500':
    description: Error
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Error'
```

### 2. Définir des réponses réutilisables

```javascript
/**
 * @swagger
 * components:
 *   responses:
 *     NotFound:
 *       description: Resource not found
 *     Unauthorized:
 *       description: Authentication required
 */

// Utiliser
responses:
  '404':
    $ref: '#/components/responses/NotFound'
  '401':
    $ref: '#/components/responses/Unauthorized'
```

### 3. Types de données

```javascript
type: string        // Texte
type: integer       // Nombre entier
type: number        // Décimal
type: boolean       // Vrai/Faux
type: array         // Liste
type: object        // Objet
format: date-time   // ISO 8601
format: email       // Email
format: password    // Mot de passe
```

### 4. Énumérations

```javascript
user_role:
  type: string
  enum: [user, admin, superadmin]
  example: "admin"
```

### 5. Objets imbriqués

```javascript
user:
  type: object
  properties:
    id:
      type: integer
    profile:
      type: object
      properties:
        name:
          type: string
        email:
          type: string
```

---

## Commandes utiles

### Vérifier la documentation
```bash
npm run dev
# Visiter http://localhost:8080/api-docs
```

### Exporter en YAML/JSON
```javascript
// Dans swaggerConfig.js, ajouter :
const YAML = require('js-yaml');

// Retourner YAML au lieu de JSON
app.get('/api-docs-yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/yaml');
    res.send(YAML.dump(specs));
});
```

---

## Résumé

| Aspect | Détails |
|--------|---------|
| **Accès** | http://localhost:8080/api-docs |
| **Fichier** | docs/swagger.js |
| **Format** | OpenAPI 3.0.0 |
| **Authentification** | BearerAuth (JWT) |
| **Schémas** | Réutilisables via $ref |
| **Test** | Directement dans l'UI |

🚀 **Maintenant vous pouvez créer et documenter des endpoints très rapidement!**
