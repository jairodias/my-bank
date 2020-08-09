import express from 'express';
import { promises as fs } from 'fs';

const app = express.Router();
const { readFile, writeFile } = fs;

app.post('/create', async (req, res) => {
    try {
        let account = req.body;
        const accounts = JSON.parse(await readFile("accounts.json"));

        account = {
            id: accounts.nextId,
            ...account
        };

        accounts.nextId++

        accounts.accounts.push(account);

        await writeFile("accounts.json", JSON.stringify(accounts));

        res.status(200).send({
            success: true,
            message: "Conta criada com sucesso !",
            response: account
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

export default app;