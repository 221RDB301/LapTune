const express = require('express');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'data/users.csv');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Reģistrācijas apstrāde
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Visi lauki ir obligāti!' });
    }

    // Pārbauda, vai CSV fails eksistē
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, 'username,email,password,created_at\n');
    }

    // Pārbauda, vai e-pasts jau eksistē
    const usersData = fs.readFileSync(USERS_FILE, 'utf-8');
    const users = usersData.split('\n').slice(1).map(row => row.split(','));
    if (users.some(user => user[1] === email)) {
        return res.status(400).json({ message: 'E-pasts jau eksistē!' });
    }

    // Pievieno jaunu lietotāju
    const createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const newUser = `${username},${email},${password},${createdAt}\n`;
    fs.appendFileSync(USERS_FILE, newUser);

    res.json({ message: 'Reģistrācija veiksmīga!' });
});

// Servera startēšana
app.listen(PORT, () => {
    console.log(`Serveris darbojas: http://localhost:${PORT}`);
});
