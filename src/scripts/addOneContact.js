import { PATH_DB } from "../constants/contacts.js";
import { createFakeContact } from "../utils/createFakeContact.js";
import fs from 'node:fs/promises';

export const addOneContact = async () => {
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
            const newContacts = Array.from({length: 1}, createFakeContact);
            const updateContacts = [...contacts, ...newContacts];
            
            await fs.writeFile(PATH_DB, JSON.stringify(updateContacts, null, 2), 'utf8');  
        } catch (jsonError) {
            console.error('Помилка парсингу:', jsonError);
        }
    
    } catch (err) {
        console.error('Помилка під час генерації контактів:',err);
    }
};

addOneContact();
