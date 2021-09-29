const Menu = require("./menus");
const Company = require("./companies");
const Location = require("./locations");
const setupDb = require("./setupDb");
const express = require("express");


const app = express();

// create an express API to allow clients to make HTTP requests to read and modify data.

/* endpoints:
 - get all the companies
 - get a specififc company by its id
 - get all a company's menu
 - create a new company
 - delete a company
*/

// in order for express to be able to read request bodies, we need to add the folowing code:
// app.use(express.urlencoded({ extended: true}));
app.use(express.json());



// get all the companies
app.get('/companies', async (req, res) => {
    const companies = await Company.findAll();
    res.json(companies);
});



// get a specific company by its id and include all its menus
app.get('/companies/:id', async (req, res) => {
    const company = await Company.findByPk(req.params.id, {
        include: Menu,
        include: Location,
    });
    if (!company) {
        return res.sendStatus(404);
    }
    res.json(company);
});


// create a new company
app.post('/companies', async (req, res) => {
    const { name, logoUrl } = req.body;
    await Company.create({ name, logoUrl});
    res.sendStatus(200);
});


// delete a company
app.delete('/companies/:id', async (req, res) => {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
        return res.sendStatus(404);
    }
    await company.destroy();
    res.sendStatus(200)
});



// get a specific menu by its id
app.get('/menus/:id', async (req, res) => {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) {
        return res.sendStatus(404);
    }
    res.json(menu);
});



// Replace a specific company ???
app.put('/companies/:id', async (req, res) => {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
        return res.sendStatus(404);
    }
    await company.update(req.body)
    // await Company.create({ name, logoUrl});
    res.sendStatus(200);
});

// create a menu for a particlar company
app.post("/companies/:id/menus", async (req, res) => {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
        return res.sendStatus(404);
    }
    const { title } = req.body;
    await company.createMenu({ title });
    res.sendStatus(201);
})


// create a location for a particlar company
app.post("/companies/:id/locations", async (req, res) => {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
        return res.sendStatus(404);
    }
    const { name, capacity, manager } = req.body;
    await company.createLocation({ name, capacity, manager });
    res.sendStatus(201);
})

// delete a location
app.delete('/locations/:id', async (req, res) => {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
        return res.sendStatus(404);
    }
    await Location.destroy();
    res.sendStatus(200)
});


app.listen(3000, () => {
    console.log("listening on port 3000");
});

setupDb();
