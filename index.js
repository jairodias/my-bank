import express from 'express';
import accounts from './src/routes/account.js';
import { promises as fs } from 'fs';

const app = express();
app.use(express.json());

app.use('/account', accounts);

const { readFile, writeFile} = fs;


app.listen(3000, async () => {

    try {
        await readFile("accounts.json");    
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };

        writeFile("accounts.json", JSON.stringify(initialJson)).then(() => {
            console.log('Arquivo criado com sucesso');
        }).catch(err => {
            console.log(err);
        });
    }
});