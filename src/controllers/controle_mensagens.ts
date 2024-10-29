import { connectRabbitMQ } from "../config/rabbitmq";
import { Request, Response } from "express";
import redis from '../config/redis';
import { error } from "console";
import { channel } from "diagnostics_channel";

const QUEUE_NAME = 'mensagens';

export const enviarMensagem = async (req: Request, res: Response): Promise<void> => {
    try {

        const { mensagem } = req.body;
        const canal = await connectRabbitMQ();
    
        if(!canal){
            res.status(500).json({ error: 'Erro ao se conectar com RabbitMQ!'});
            return;
        }
    
        await canal.assertQueue(QUEUE_NAME, {durable: true});
        canal.sendToQueue(QUEUE_NAME, Buffer.from(mensagem));
        await redis.setex(mensagem, 3600, 'pending');
    
        res.status(200).json({ success: true, message: 'Mensagem foi enviada com sucesso!'});
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
};

export const receberMensagem = async (_req: Request, res: Response): Promise<void> => {
    try {

        const canal = await connectRabbitMQ();
    
        if(!canal) {
            res.status(500).json({ error: 'Erro ao conectar com RabbitMQ!'});
            return;
        }
    
        await canal.assertQueue(QUEUE_NAME, {durable: true});
        canal.consume(
            QUEUE_NAME,
            async (mensagem) => {
                if(mensagem) {
                    const conteudo = mensagem.content.toString();
                    console.log('Mensagem recebida: ', conteudo);
    
                    await redis.set(conteudo, 'processed');
                    canal.ack(mensagem);
                }
            },
            { noAck: false }
        );
    
        res.status(200).json({ success: true, message: 'Consumidor recebendo mensagens!'});
    } catch (error) {
        res.status(500).json({ error: 'Erro ao consumir mensagem' });
    }
};

