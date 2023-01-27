import { Knex } from 'knex';
import data from './words.json';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('words').delete();

    await knex('words').insert(Object.entries(data)
        .map(([word, tags]) => {
            return {word, tags: JSON.stringify(tags)};
        }))

    // const tags = new Set<string>();
    // for (const arr of Object.values(data)) {
    //     for (const tag of arr) {
    //         tags.add(tag);
    //     }
    // }
    // await knex('word_tags').insert([...tags].map(tag => {
    //     return {word_tag: tag};
    // }));

    // for (const [word, tags] of Object.entries(data)) {
    //     const {word_id} = await knex('words').insert({word}, 'word_id').then(data => data[0]);
    //     for (const tag of tags) {
    //         const {word_tag_id} = await knex('word_tags')
    //             .select('word_tag_id')
    //             .where({word_tag: tag})
    //             .first();
    //         await knex('tag_refs').insert({word_id, word_tag_id});
    //     }
    // }
};
