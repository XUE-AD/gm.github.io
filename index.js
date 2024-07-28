const express = require('express');
const bodyParser = require('body-parser');
const { processInput } = require('./action.js');

const app = express();
const port = 3000;

// 设置静态文件目录
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/process-input', (req, res) => {
    const { title, date, startHour, endHour, teacherEmail, studentEmail } = req.body;
    processInput(title, date, startHour, endHour, teacherEmail, studentEmail)
        .then(() => res.send('Success'))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


