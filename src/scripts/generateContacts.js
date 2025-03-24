import { PATH_DB } from "../constants/contacts.js";
import { createFakeContact } from "../utils/createFakeContact.js";
import fs from 'node:fs/promises';

const generateContacts = async (number) => {
    try {
        let data;
        try {
            data = await fs.readFile(PATH_DB, 'utf8');
            if (!data.trim()) {
                data = '[]';
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                data = '[]';
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
            const newContacts = Array.from({length: number}, createFakeContact);
            const updateContacts = [...contacts, ...newContacts];
        
            await fs.writeFile(PATH_DB, JSON.stringify(updateContacts, null, 2), 'utf8');  

    } catch (err) {
        console.error('Помилка під час генерації контактів:',err);
    }
};



generateContacts(5);
