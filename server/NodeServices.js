const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME
    }
});

module.exports.createUpdateNode = async ctx => {
    if (ctx.values) {
        let insertId = await db.insertQuery()
            .into('node')
            .fields(['name', 'nodeTypeId', 'description'])
            .values(ctx.values)
            .execute();

        return insertId;
    }
}

module.exports.deleteNode = ctx => {
    if (ctx.where) {
        db.deleteQuery()
            .from('node')
            .where(ctx.where)
            .execute();
    }
}

module.exports.getNode = async ctx => {
    if (ctx.where) {
        return await db.selectQuery()
            .from('node')
            .where(ctx.where)
            .first()
    }
}

module.exports.listNodes = () => {
    return knex("node").select("name", "description")
}

module.exports.listNodes2 = async () => {
    return await db.selectQuery().from('node').list();
}

module.exports.listNodeTypes = async () => {
    return await db.selectQuery().from('node_type').list();
}