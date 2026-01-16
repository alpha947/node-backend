#!/bin/bash

# ============================================
# Template Generator pour endpoints rapides
# ============================================
# Utilisation: bash generate-endpoint.sh Product

ENTITY=$1

if [ -z "$ENTITY" ]; then
    echo "❌ Veuillez spécifier l'entité:"
    echo "   Usage: bash generate-endpoint.sh Product"
    exit 1
fi

ENTITY_LOWER=$(echo "$ENTITY" | tr '[:upper:]' '[:lower:]')
CONTROLLER_FILE="controller/${ENTITY_LOWER}Controller.js"
ROUTER_FILE="routes/${ENTITY_LOWER}Router.js"
SWAGGER_FILE="docs/swagger-${ENTITY_LOWER}.js"

echo "🚀 Génération des fichiers pour: $ENTITY"

# ============================================
# 1. Controller Template
# ============================================
cat > "$CONTROLLER_FILE" << 'EOF'
const { successResponse, errorResponse } = require('../helpers/successAndError');
const db = require('../models');
const Model = db.$ENTITY$;

// GET All
module.exports.getAll$ENTITY$ = async (req, res) => {
    try {
        const items = await Model.findAll();
        res.status(200).json(successResponse(200, '$ENTITY$ list retrieved', items));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// GET by ID
module.exports.get$ENTITY$ById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Model.findByPk(id);
        
        if (!item) {
            return res.status(404).json(errorResponse(404, '$ENTITY$ not found'));
        }
        
        res.status(200).json(successResponse(200, '$ENTITY$ retrieved', item));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// CREATE
module.exports.create$ENTITY$ = async (req, res) => {
    try {
        const item = await Model.create(req.body);
        res.status(201).json(successResponse(201, '$ENTITY$ created', item));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// UPDATE
module.exports.update$ENTITY$ = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Model.findByPk(id);
        
        if (!item) {
            return res.status(404).json(errorResponse(404, '$ENTITY$ not found'));
        }
        
        await item.update(req.body);
        res.status(200).json(successResponse(200, '$ENTITY$ updated', item));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};

// DELETE
module.exports.delete$ENTITY$ = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Model.findByPk(id);
        
        if (!item) {
            return res.status(404).json(errorResponse(404, '$ENTITY$ not found'));
        }
        
        await item.destroy();
        res.status(200).json(successResponse(200, '$ENTITY$ deleted', null));
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, 'Server error'));
    }
};
EOF

# ============================================
# 2. Router Template
# ============================================
cat > "$ROUTER_FILE" << 'EOF'
const express = require('express');
const $ENTITY_LOWER$Router = express.Router();
const authenticate = require('../middleware/authentication');
const { checkRole } = require('../middleware/authorization');

const {
    getAll$ENTITY$,
    get$ENTITY$ById,
    create$ENTITY$,
    update$ENTITY$,
    delete$ENTITY$
} = require('../controller/$ENTITY_LOWER$Controller');

// Public routes
$ENTITY_LOWER$Router.get('/list', getAll$ENTITY$);
$ENTITY_LOWER$Router.get('/:id', get$ENTITY$ById);

// Protected routes (admin only)
$ENTITY_LOWER$Router.post('/create', authenticate, checkRole(['admin']), create$ENTITY$);
$ENTITY_LOWER$Router.put('/update/:id', authenticate, checkRole(['admin']), update$ENTITY$);
$ENTITY_LOWER$Router.delete('/delete/:id', authenticate, checkRole(['admin']), delete$ENTITY$);

module.exports = $ENTITY_LOWER$Router;
EOF

# ============================================
# 3. Swagger Documentation Template
# ============================================
cat > "$SWAGGER_FILE" << 'EOF'
/**
 * @swagger
 * components:
 *   schemas:
 *     $ENTITY$:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /$ENTITY_LOWER$/list:
 *   get:
 *     summary: Get all $ENTITY_LOWER$
 *     tags:
 *       - $ENTITY$
 *     responses:
 *       '200':
 *         description: $ENTITY$ list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/$ENTITY$'
 *
 * /$ENTITY_LOWER$/{id}:
 *   get:
 *     summary: Get $ENTITY_LOWER$ by ID
 *     tags:
 *       - $ENTITY$
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: $ENTITY$ retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/$ENTITY$'
 *       '404':
 *         description: $ENTITY$ not found
 *
 * /$ENTITY_LOWER$/create:
 *   post:
 *     summary: Create new $ENTITY_LOWER$
 *     tags:
 *       - $ENTITY$
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/$ENTITY$'
 *     responses:
 *       '201':
 *         description: $ENTITY$ created successfully
 *       '401':
 *         description: Unauthorized
 *
 * /$ENTITY_LOWER$/update/{id}:
 *   put:
 *     summary: Update $ENTITY_LOWER$
 *     tags:
 *       - $ENTITY$
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/$ENTITY$'
 *     responses:
 *       '200':
 *         description: $ENTITY$ updated
 *       '404':
 *         description: $ENTITY$ not found
 *
 * /$ENTITY_LOWER$/delete/{id}:
 *   delete:
 *     summary: Delete $ENTITY_LOWER$
 *     tags:
 *       - $ENTITY$
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
 *         description: $ENTITY$ deleted
 *       '404':
 *         description: $ENTITY$ not found
 */
EOF

echo "✅ Fichiers créés:"
echo "   • $CONTROLLER_FILE"
echo "   • $ROUTER_FILE"  
echo "   • $SWAGGER_FILE"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Vérifier et modifier les fichiers générés"
echo "   2. Ajouter le router dans server.js:"
echo "      const ${ENTITY_LOWER}Router = require('./routes/${ENTITY_LOWER}Router');"
echo "      app.use('/${ENTITY_LOWER}', ${ENTITY_LOWER}Router);"
echo "   3. Créer le model dans models/${ENTITY_LOWER}.js"
echo "   4. Exécuter: npm run dev"
echo ""
echo "🎉 Vous êtes prêt!"
