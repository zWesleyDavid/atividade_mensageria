import amqplib from 'amqplib';

const RABBITMQ_URL = 'amqp://guest:guest@rabbitmq:5672';

export const connectRabbitMQ = async () => {
    try {
        const conexao = await amqplib.connect(RABBITMQ_URL);
        const canal = await conexao.createChannel();
        console.log('RabbitMQ conectado com sucesso!');
        return canal;
    } catch (error) {
        console.error('Erro ao conectar com RabbitMQ: ', error);
    }
};