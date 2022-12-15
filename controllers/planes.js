const Plane = require('../modles/plane');

const getPlanes = async (req, res) => {
    try {
        const planes = await Plane.find();

        res.status(200).json(planes);
    } catch (error) {
    res
            .status(500)
            .json({ 
            message: "не удалось получить список самолетовб повторите попытку" 
            });
    }
};

const getPlane = async (req, res) => {
    try {
        const plane = await Plane.find({ _id: req.params.id});

        res.status(200).json(plane)
    } catch (error) {
        res
        .status(400)
        .json({ 
        message: "не найдено" 
        });
    }
}

const createPlane = async (req, res) => {
    const errors = {
    };
     
    if (!req.body.name) {
        errors.name = { massage: "укажите название"}
    }
    if (!req.body.price) {
        errors.price = { massage: "укажите цену"}
    }
    if (!req.body.description) {
        errors.description = { massage: "укажите описание"}
    }   
    if (!req.body.capacity) {
        errors.capacity = { massage: "укажите вместимость"}
    }  
    if (!req.file) {
        errors.planeImage = { massage: "добавьте фото"}
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {
        const { name, price, description, capacity } = req.body;

        const plane = await Plane.create({
            name,
            price,
            description, 
            capacity,
            planeImage: `http://localhost:${process.env.PORT}/static/${req.file.filename}`
        });

        res.status(201).json(plane);
    } catch (error) {
        res
        .status(500)
        .json({
            massage: "не удалось создать самолет"
        });
    }
}

module.exports = {
    getPlanes,
    createPlane,
    getPlane
}