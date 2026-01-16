const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const PORT = process.env.PORT || 8080
const db = require('./models');
const { errorResponse, successResponse } = require('./helpers/successAndError');
const userRouter = require('./routes/userRouter');
const swaggerUI = require("swagger-ui-express");
const specs = require('./config/swaggerConfig');

// Sécurité
app.use(helmet());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/users", userRouter)

app.get("/", (req, res) => {
    try {
        res.status(200).json(successResponse(200, "Server is running successfully", null));

    } catch (error) {
        res.status(404).json(errorResponse(404, error.message));
    }

})

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port:- ${PORT}`);
    });
})