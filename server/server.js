import express from 'express';
import { ApolloServer } from "apollo-server-express";
import cors from 'cors';
import typeDefs from './schemas/QuizSchema.js';
import resolvers from './resolvers/quizResolvers.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['https://quiz-game-k2pj.onrender.com', 'https://quiz-game-coral-eight.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // Allow credentials if needed
}));


const server = new ApolloServer({ typeDefs, resolvers });

const serverStart = async () => {
    await server.start();
    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
};

connectDB(); // Ensure the database connection is established before starting the server
serverStart();
