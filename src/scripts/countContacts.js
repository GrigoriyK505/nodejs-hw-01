import { PATH_DB } from "../constants/contacts.js";
import fs from 'node:fs/promises';

export const countContacts = async () => {
    try {
        let data;
        try {
            data = await fs.readFile(PATH_DB, 'utf8');
        } catch (err) {
            if (err.code === 'ENOENT') {
                data = '[]';
            } else {
                console.error('Помилка читання файлу:', err);
                return;
            }
        }
        try {
            const contacts = JSON.parse(data);
            console.log(contacts.length);  
        } catch (jsonError) {
            console.error('Помилка парсингу:', jsonError);
        }
    } catch (err) {
        console.error('Помилка під час генерації контактів:', err);
    }
};

console.log(await countContacts());
