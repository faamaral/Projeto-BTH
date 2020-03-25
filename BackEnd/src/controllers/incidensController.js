const connection = require('../database/connection')

module.exports = 
{
    async index(request, response)
    {
        const { page = 1} = request.query

        const [count] = await connection('incidens').count()
        console.log(count)

        const incidens = await connection('incidens').join('ongs', 'ong_id', '=', 'incidens.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select('incidens.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf')

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidens)
    },
    async create(request, response)
    {
        const { title, description, value} = request.body
        const ong_id = request.headers.authorization
        const [id] = await connection('incidens').insert({
            title,
            description,
            value,
            ong_id,
        })
        return response.json({id})
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incidens = await connection('incidens')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if (incidens.ong_id != ong_id)
        {
            return response.status(401).json({ error: 'Operação não permitida.'});
        }

        await connection('incidens').where('id', id).delete()
        return response.status(204).send()
    }
}