import app from '../../app';
import { epiUserController } from '../interfaces/epiUserController';

const port = process.env.PORT || 5501;

// Utilise le router epiUserController pour toutes les routes préfixées par /users
app.use('/users', epiUserController);

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});
