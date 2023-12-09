const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000; // Você pode escolher a porta que desejar
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/Brasil', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
// Rota GET simples
app.use(express.json());
app.use(cors());

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conectado ao banco de dados MongoDB');
});

const MunicipioSchema =  mongoose.model('municipios',{
    municipioId: Number,
    municipioNome: String,
    microrregiaoId: Number,
    microrregiaoNome: String,
    mesorregiaoId: Number,
    mesorregiaoNome: String,
    regiaoImediataId: Number,
    regiaoImediataNome: String,
    regiaoIntermediariaId: Number,
    regiaoIntermediariaNome: String,
    ufId: Number,
    ufSigla: String,
    ufNome: String,
    regiaoId: Number,
    regiaoSigla: String,
    regiaoNome: String,
});

app.get('/consulta', async(req, res) => {

    try {
        const municipios = await MunicipioSchema.find();
        console.log(await MunicipioSchema.find())
        res.json(municipios);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar municipios' });
    }
});

/*app.post('/criar', async(req, res) => {
    try {
        const {
            nome,
            idade,
            curso,
            matricula,
            notas
        } = req.body;

        const novoEstudante = new MunicipioSchema({
            nome,
            idade,
            curso,
            matricula,
            notas
        });

        await novoEstudante.save();
        res.json(novoEstudante);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar estudante.' });
    }
});*/

// Iniciar o servidor na porta especificada
app.listen(port, () => {
    console.log(`O servidor está ouvindo na porta ${port}`);
});