import db from '../../db/connect';

async function list(minTags: string[]): Promise<string[]> {
    const data = await db('words').select('word', 'tags').then(
        entries => {
            const stuff = entries.filter(({tags}) => {
                for (const tag of minTags) {
                    if(!tags.includes(tag)) return false;
                }
                return true;
            })
            return stuff.map(thing => thing.word);      
        }
    );
    return data;
}

export default {
    list,
}