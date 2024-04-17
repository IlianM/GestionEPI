import { Request, Response } from 'express';
import { epiUserModel } from '../../models/epiUserModel';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName } = req.body;
        const user = await epiUserModel.findByCredentials(firstName, lastName);
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
