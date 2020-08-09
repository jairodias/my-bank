import express from 'express';
import { promises as fs } from 'fs';

const app = express.Router();
const { readFile, writeFile } = fs;

app.post('/create', async (req, res) => {
    try {
        let account = req.body;
        const accounts = JSON.parse(await readFile(global.fileAccounts));

        account = {
            id: accounts.nextId,
            ...account
        };

        accounts.nextId++

        accounts.accounts.push(account);

        await writeFile(global.fileAccounts, JSON.stringify(accounts, null, 2));

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

app.get('/accounts', async (req, res) => {
    try {
        const accounts = JSON.parse(await readFile(global.fileAccounts));
        delete accounts.nextId;
        res.status(200).send({
            success: true,
            message: "Todas as contas do nosso banco esta listada a baixo",
            response: accounts
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
})

app.get('/accounts/:cpf', async (req, res) => {
    try {
        const { cpf } = req.params;
    
        const accounts = JSON.parse( await readFile(global.fileAccounts));

        const response = accounts.accounts.filter((account) => {
            return account.cpf == cpf;
        });

        res.status(200).send({
            success: true,
            message: "Cliente encontrado com sucesso",
            response
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
})

export default app;