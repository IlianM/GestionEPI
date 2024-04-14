import { Request, Response, NextFunction } from 'express';

// Middleware pour les routes non trouvées
const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Middleware pour la gestion des erreurs
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        // Ne renvoyez le stack trace que si vous êtes en développement
        stack: process.env.NODE_ENV === 'development' ? err.stack : '🥞',
    });
};

export { notFound, errorHandler };