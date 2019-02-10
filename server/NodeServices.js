const db  = require('./DatabaseUtils')

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

module.exports.listNodes = async () => {
    return await db.selectQuery().from('node').list();
}

module.exports.listNodeTypes = async () => {
    return await db.selectQuery().from('node_type').list();
}