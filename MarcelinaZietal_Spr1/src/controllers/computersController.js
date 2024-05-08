const Computer = require('../models/computers')
const middleware = require("../middleware/middleware");

const getComputerForm = async (req, res) => {
    res.render('addcomputer', {isLoggedIn: req.session.isLoggedIn, isAdmin: req.session.isAdmin});
}

const getAllComputers = async (req, res) => {
    try {
        const computers = await Computer.find();
        res.render("computers", {
            computers:computers,
            isLoggedIn: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const getComputerById = async (req, res) => {
    try {
        const {id} = req.params;
        const computer = await Computer.findById(id);

        console.log(id)
        console.log(computer)

        if(!computer){
            return res.status(404).json({message: "Computer not found"});
        }
        res.json(computer);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

//create
const createComputer = async (req, res) => {
    try {
        const {
            imgUrl,
            name,
            price,
            processor,
            ram,
            operating_system,
            height,
            width,
            depth,
            weight,
            included_accessories
        } = req.body;

        console.log("imgUrl:", imgUrl);
        console.log("price:", price);
        console.log("processor:", processor);
        console.log(req.body);

        const computer = await Computer.create({
            imgUrl,
            name,
            price,
            processor,
            ram,
            operating_system,
            height,
            width,
            depth,
            weight,
            included_accessories
        });

        req.session.isLoggedIn = await middleware.isLoggedIn(req);
        req.session.isAdmin = await middleware.isAdmin(req);
        // TODO Spr czy działa if
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//update
const updateComputer = async (req, res) => {
    try {
        const {
            imgUrl,
            name,
            price,
            processor,
            ram,
            operating_system,
            height,
            width,
            depth,
            weight,
            included_accessories
        } = req.body;

        const computerId = req.params.id;

        const updatedComputer = await Computer.findByIdAndUpdate(computerId, {
            imgUrl,
            name,
            price,
            processor,
            ram,
            operating_system,
            height,
            width,
            depth,
            weight,
            included_accessories
        });

        console.log("computerId")
        console.log(computerId)
        console.log(req.body)
        console.log(price)
        console.log(updatedComputer)

        req.session.isLoggedIn = await middleware.isLoggedIn(req);
        req.session.isAdmin = await middleware.isAdmin(req);
        res.redirect('/api/computers');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete
const deleteComputer = async (req, res) => {
    try {
        const computerId = req.params.id;
        await Computer.findByIdAndDelete(computerId);
        req.session.isLoggedIn = await middleware.isLoggedIn(req);
        req.session.isAdmin = await middleware.isAdmin(req);
        res.redirect('/api/computers');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const editComputer = async (req, res) => {
    try {
        console.log(req.body)
        const computerId = req.params.id;
        const computer = await Computer.findById(computerId);
        if (!computer) {
            return res.status(404).json({ error: 'Nie znaleziono komputera o podanym identyfikatorze' });
        }
        res.render('editcomputer', { 
            computer: computer,
            isLoggedIn: req.session.isLoggedIn, 
            isAdmin: req.session.isAdmin 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateComputerAndShowAll = async (req, res) => {
    try {
        const computerId = req.params.id;
        console.log("req.body")
        console.log(req.body)
        await updateComputer(req, res); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteComputerAndShowAll = async (req, res) => {
    try {
        const computerId = req.params.id;
        await deleteComputer(req, res); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getComputerForm,
    getAllComputers,
    getComputerById,
    createComputer,
    updateComputer,
    deleteComputer,
    editComputer,
    updateComputerAndShowAll,
    deleteComputerAndShowAll
}