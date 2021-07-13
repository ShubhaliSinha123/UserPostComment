const db = require('../models');
const User = db.user;
const Employee = db.employee;
const Post = db.post;
const Comment = db.comment;
const bcrypt = require('bcryptjs');

exports.createUser = async(req, res, next ) => {
    try {
        const { name, email, phone, compnayName, role, address} = req.body;

        const userData = await User.findOne({
            where: {
                email
            }
        })

        if(userData)
        {
            return res.status(300).send('Email already registered');
        }

        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(req.body.password,8),
            phone,
            role
        });

        await Employee.create({
            userId: user.id,
            compnayName, 
            post: role, 
            address
        });

        return res.status(201).send('User registered sucessfully!');
    } catch (error) {
        next(error);
    }
};


exports.updateUser = async(req, res, next) => {
    try {
        const { name, email, phone, compnayName, role, address} = req.body;

        const userData = await User.findOne({ where: {id: req.params.id}});

        if(!userData) {
            return res.status(401).send({message: "User, not found!"});
        }

        const employee = await Employee.findOne({
            where: {
                userId: userData.id
            }
        });

        if(!employee) {
            return res.status(401).send({message: "Something went wrong...user is not a current employee of the company"});
        }

        const user = userData.update({
            name,
            role,
            email,
            password: bcrypt.hashSync(req.body.password,8),
            phone,
        });

        await employee.update({
            compnayName,
            post: role,
            address,
        });

        return res.status(201).send("User updated successfully");
        
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async(req, res, next) => {
    try {
        const id = req.params.id;

        const userData= await User.findOne({id});
        
        if(!userData) {
            return res.status(401).send({message: "User not found"});
        }

        const employee = await Employee.findOne({where: { userId: userData.id}});

        const user = await userData.destroy();

        await employee.destroy();
         
        return res.status(200).send({message: "User deleted successfully!"});
    } catch (error) {
        next(error);
    }
};

exports.findAndCountUserPostComment = async(req, res, next) => {
    try {
        const { offset, limit} = req.query;

        const id = req.params.userId;

        const query = {
            attributes: ["name", "email", "phone"],
            where: {
                id
            },
            include: [{
                model: Employee,
                attributes: ["companyName","post"]
            },
            {
                model: Post,
                attributes: ["title", "description", "createdAt"],
                include: [{
                    model: Comment,
                    attributes: ["comment", "createdAt"]
                }]
            }
        ],
        limit,
        offset,
        order: [["createdAt", "DESC"]], 
        };

        const data = await User.findAndCountAll(query);

        return res.status(201).send(data);
        
    } catch (error) {
        next(error);
    }
};


exports.findAndCountUser = async(req, res, next) => {
    try {
        const { offset, limit } = req.query;
        
        const query = {
            attributes: ["id", "name", "email", "phone"],
            include: [
                {
                    model: Employee,
                    attributes: ["id", "companyName", "post"]
                }
            ],
            limit,
            offset
        };

        const data = await User.findAndCountAll(query);

        return res.status(201).send(data);
    } catch (error) {
        next(error);
    }
};