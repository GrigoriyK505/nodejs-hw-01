import { PATH_DB } from "../constants/contacts.js";
import fs from 'node:fs/promises';

export const removeLastContact = async () => {
    try {
        let data;
        try {
           data = await fs.readFile(PATH_DB, 'utf8');
            if (!data.trim()) {
               data = '[]';
           }
       } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('Файл не існує');
               return;
           } else {
                console.error('Помилка читання файлу:', err);
               return;
           }
       }
       let contacts;
        try {
            contacts = JSON.parse(data);
            if (!Array.isArray(contacts)){
                contacts = [];
            }
        } catch (jsonError) {
            console.error('Помилка парсингу JSON:', jsonError);
            contacts = []; 
        }
        if (contacts.length > 0) {
            contacts.pop();
            await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf8');
        } else {
            console.log('Масив вже пустий');
        }
    } catch (err) {
        console.error('Помилка під час генерації контактів:',err);
    }
};

removeLastContact();
