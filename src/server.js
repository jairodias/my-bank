import express from 'express';

const app = express();
app.use(express.json());

app.post('/create-account', (req, res) => {

});



app.listen(3000);