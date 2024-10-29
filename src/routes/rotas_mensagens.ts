import { Router } from "express";
import { enviarMensagem, receberMensagem } from "../controllers/controle_mensagens";

const rota = Router();

rota.post('/enviar', enviarMensagem);
rota.get('/receber', receberMensagem);

export default rota;