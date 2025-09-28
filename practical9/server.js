const express = require('express');
const homeRoutes = require('./routes/home'); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/', homeRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
