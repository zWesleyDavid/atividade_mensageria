import Redis from "ioredis";

const redis = new Redis({
    host: 'redis',
    port: 6379,
});

redis.on('connect',() => {
    console.log('Redis conectado com sucesso!');
});

redis.on('erro',(error) => {
    console.error('Erro ao se conectar com Redis: ', error);
});

export default redis;