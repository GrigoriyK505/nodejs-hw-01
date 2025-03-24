import { PATH_DB } from "../constants/contacts.js";
import fs from 'node:fs/promises';

export const removeAllContacts = async () => {
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
            if (contacts.length === 0) {
                console.log('Контакти вже видалено');
                return;
            }
            await fs.writeFile(PATH_DB, JSON.stringify([], null, 2), 'utf8') ;
            console.log('Усі контакти були видалені!');
            
        } catch (jsonError) {
            console.error('Помилка парсингу:', jsonError);
        }    
    } catch (err) {
        console.error('Помилка під час генерації контактів:',err);
    }
};

removeAllContacts();
