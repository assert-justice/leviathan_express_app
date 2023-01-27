import db from '../../db/connect';

async function readInstance(instance_id: string){
    const instance = await db('instances')
    .select('*')
    .where({instance_id})
    .first();
    return instance;
}

async function createInstance(){
    const instance = await db('instances').insert({}, '*');
    return instance[0];
}

async function updateInstance(instance_id: string, location_id: string){
    await db('instances')
        .select('*')
        .update({location_id})
        .where({instance_id});
}

export default {
    readInstance,
    createInstance,
    updateInstance,
};