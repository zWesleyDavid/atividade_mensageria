import express from "express";
import rotas_mensagens from './routes/rotas_mensagens';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/mensagens', rotas_mensagens);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});