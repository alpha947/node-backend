/**
 * ===================================================================
 * SWAGGER DOCUMENTATION FOR QUADB TECH BACKEND
 * ===================================================================
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Bearer token for authentication
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - user_name
 *         - user_email
 *         - user_password
 *       properties:
 *         user_id:
 *           type: integer
 *         user_name:
 *           type: string
 *         user_email:
 *           type: string
 *         user_password:
 *           type: string
 *         user_image:
 *           type: string
 *         total_orders:
 *           type: integer
 *         user_role:
 *           type: string
 *           enum: [user, admin, superadmin]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     LoginRequest:
 *       type: object
 *       required:
 *         - user_email
 *         - user_password
 *       properties:
 *         user_email:
 *           type: string
 *           format: email
 *         user_password:
 *           type: string
 *           format: password
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     description: Verify if the server is running
 *     tags:
 *       - API Info
 *     responses:
 *       '200':
 *         description: Server running
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - user_email
 *               - user_password
 *             properties:
 *               user_name:
 *                 type: string
 *               user_email:
 *                 type: string
 *               user_password:
 *                 type: string
 *               user_image:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and receive JWT tokens
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid credentials
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /users/details/{user_id}:
 *   get:
 *     summary: Get user details
 *     description: Retrieve user information by ID
 *     tags:
 *       - User Management
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User details retrieved
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /users/image/{user_id}:
 *   get:
 *     summary: Get user profile image
 *     tags:
 *       - User Management
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User image retrieved
 *       '404':
 *         description: User image not found
 */

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user details
 *     description: Update authenticated user information
 *     tags:
 *       - User Management
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               user_name:
 *                 type: string
 *               user_email:
 *                 type: string
 *               user_image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */

/**
 * @swagger
 * /users/insert:
 *   post:
 *     summary: Create new user (Admin only)
 *     description: Create a new user account (requires admin role)
 *     tags:
 *       - User Management
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               user_email:
 *                 type: string
 *               user_password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/delete/{user_id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - User Management
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */
