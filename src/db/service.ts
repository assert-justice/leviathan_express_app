import db from './connect';

async function exquisite(tags: string[]): Promise<string[]>{
    const tag_ids = await Promise.all(tags.map(word_tag => {
        return db('word_tags')
            .select('word_tag_id')
            .where({word_tag}).first();
    })).then(tags => tags.map((tag):string => tag.word_tag_id));
    if(tag_ids.length === 0){
        return await db('word_tags')
        .select('word')
        .then(words => words.map(word => word.word));
    }
    let res: string[] = [];
    //
    return res;
}

export default {
    exquisite,
}