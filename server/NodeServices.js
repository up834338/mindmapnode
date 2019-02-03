const db  = require('./DatabaseUtils')

module.exports.createUpdateNode = (ctx) => {
    if (ctx.values) {
        db.insertQuery()
            .into('node')
            .fields(['name', 'nodeTypeId', 'description'])
            .values(ctx.values)
            .execute();
    }
}

module.exports.deleteNode = (ctx) => {
    if (ctx.where) {
        db.deleteQuery()
            .from('node')
            .where(ctx.where)
            .execute();
    }
}

module.exports.getNode = (ctx) => {

}

module.exports.getNodeList = (ctx) => {
    
}