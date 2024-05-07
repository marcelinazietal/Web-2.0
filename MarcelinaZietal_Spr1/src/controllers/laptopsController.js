const Laptop = require('../models/laptops')
const middleware = require("../middleware/middleware");

const getLaptopForm = async (req, res) => {
    res.render('addlaptop', {isLoggedIn: req.session.isLoggedIn, isAdmin: req.session.isAdmin});
}

const getAllLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find();
        req.session.isLoggedIn = await middleware.isLoggedIn(req);
        req.session.isAdmin = await middleware.isAdmin(req);
        res.render("laptops", {
            laptops:laptops,
            isLoggedIn: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const getLaptopById = async (req, res) => {
    try {
        const {id} = req.params;
        const laptop = await Laptop.findById(id);

        if(!laptop){
            return res.status(404).json({message: "Laptop not found"});
        }
        res.json(laptop);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

//create
const createLaptop = async (req, res) => {
    try {
        const {
            imgUrl,
            name,
            price,
            processor,
            ram,
            graphics_memory,
            operating_system,
            height,
            width,
            depth,
            weight,
            included_accessories
        } = req.body;

        const laptop = await Laptop.create({
            imgUrl,
            name,
            price,
            processor,
            ram,
            graphics_memory,
            operating_system,
            height,
            width,
            depth,
            weight,
            included_accessories
        });

        req.session.isLoggedIn = await middleware.isLoggedIn(req);
        req.session.isAdmin = await middleware.isAdmin(req);
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//update
const updateLaptop = async (req, res) => {
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

        const laptopId = req.params.id;

        const updatedLaptop = await Laptop.findByIdAndUpdate(laptopId, {
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

        console.log("laptopId")
        console.log(laptopId)
        console.log(req.body)
        console.log(price)
        console.log(updatedLaptop)

        req.session.isLoggedIn = await middleware.isLoggedIn(req);
        req.session.isAdmin = await middleware.isAdmin(req);
        res.redirect('/api/laptops');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete
const deleteLaptop = async (req, res) => {
    try {
        const laptopId = req.params.id;
        await Laptop.findByIdAndDelete(laptopId);
        req.session.isLoggedIn = await middleware.isLoggedIn(req);
        req.session.isAdmin = await middleware.isAdmin(req);
        res.redirect('/api/laptops');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const editLaptop = async (req, res) => {
    try {
        const laptopId = req.params.id;
        const laptop = await Laptop.findById(laptopId);
        if (!laptop) {
            return res.status(404).json({ error: 'Nie znaleziono komputera o podanym identyfikatorze' });
        }
        res.render('editlaptop', { 
            laptop: laptop,
            isLoggedIn: req.session.isLoggedIn, 
            isAdmin: req.session.isAdmin 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateLaptopAndShowAll = async (req, res) => {
    try {
        const laptopId = req.params.id;
        console.log("req.body")
        console.log(req.body)
        await updateLaptop(req, res); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteLaptopAndShowAll = async (req, res) => {
    try {
        const laptopId = req.params.id;
        await deleteLaptop(req, res); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getLaptopForm,
    getAllLaptops,
    getLaptopById,
    createLaptop,
    updateLaptop,
    deleteLaptop,
    editLaptop,
    updateLaptopAndShowAll,
    deleteLaptopAndShowAll
}