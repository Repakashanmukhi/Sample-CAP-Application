// const cds = require('@sap/cds');
// const fs = require('fs');
// const path = require('path');
// module.exports = async (srv) => {
//     const { Books } = srv.entities; 
//     srv.on('CreateBooks', async () => {
//         const batchSize = 1000;
//         const total = 50000;
//         const result = await SELECT.from(Books).columns('MAX(ID) as maxID');
//         let startID = result[0].maxID ? result[0].maxID + 1 : 1;
//         const stockValues = [30, 50, 70, 100]; 
//         const allInsertedRecords = []; 
//         for (let i = 0; i < total; i += batchSize) {
//             const entries = [];
//             for (let j = 0; j < batchSize && i + j < total; j++) {
//                 const id = startID + i + j;
//                 const record = {
//                     ID: id,
//                     title: `Book #${id}`,
//                     author: `Author #${Math.ceil(Math.random() * 100000)}`,
//                     stock: stockValues[Math.floor(Math.random() * stockValues.length)],
//                     price: (Math.random() * 100).toFixed(2)
//                 };
//                 entries.push(record);
//                 allInsertedRecords.push(record);
//             }
//             await INSERT.into(Books).entries(entries);
//             console.log(`Inserted ${Math.min(startID + i + batchSize - 1, startID + total - 1)} of ${total} records...`);
//         }
//         const filePath = path.join(__dirname, 'InsertedBooks.json');
//         fs.writeFileSync(filePath, JSON.stringify(allInsertedRecords, null, 2));
//         console.log(`Inserted data saved to ${filePath}`);
//         return `Inserted ${total} book records starting from ID ${startID}`;
//     });
// };




const cds = require('@sap/cds');
const fs = require('fs');
const path = require('path');

module.exports = async (srv) => {
    const { Books } = srv.entities;

    srv.on('CreateBooks', async () => {
        const batchSize = 1000;
        const total = 100000; // total records
        const result = await SELECT.from(Books).columns('MAX(ID) as maxID');
        let startID = result[0].maxID ? result[0].maxID + 1 : 1;

        // Repeating stock and price values
        const stockValues = [50, 20, 10];
        const priceValues = [500, 100, 300]; 

        const allInsertedRecords = [];

        for (let i = 0; i < total; i += batchSize) {
            const entries = [];
            for (let j = 0; j < batchSize && i + j < total; j++) {
                const id = startID + i + j;
                const record = {
                    ID: id,
                    title: `Book #${id}`,
                    author: `Author #${Math.ceil(Math.random() * 100000)}`,
                    stock: stockValues[(i + j) % stockValues.length],  // repeating
                    price: priceValues[(i + j) % priceValues.length]    // repeating
                };
                entries.push(record);
                allInsertedRecords.push(record);
            }
            await INSERT.into(Books).entries(entries);
            console.log(`Inserted ${Math.min(startID + i + batchSize - 1, startID + total - 1)} of ${total} records...`);
        }

        // Save as CSV
        const filePath = path.join(__dirname, 'InsertedBooks.csv');
        const csvHeader = 'ID,title,author,stock,price\n';
        const csvData = allInsertedRecords.map(r => `${r.ID},"${r.title}","${r.author}",${r.stock},${r.price}`).join('\n');
        fs.writeFileSync(filePath, csvHeader + csvData);
        console.log(`Inserted data saved to ${filePath}`);

        return `Inserted ${total} book records starting from ID ${startID}`;
    });
};
