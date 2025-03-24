import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const readContacts = async () => {
    try {
        const data = await fs.readFile(PATH_DB, 'utf8');
        try {
            console.log(JSON.parse(data));
        } catch (jsonError) {
            console.error('Помилка парсингу:', jsonError); 
        }
    } catch (err) {
        console.error('Помилка читання файлу:', err);
    }
};
