const { task } = require('../models')
// const { Op, where } = require('sequelize')

class taskController {

    static async addTask (req,res, next) {
        const { title, status, priority, product_manager, engineers, product, typeId } = req.body;
        const picture = req.file.path;
        try {
            const result = await task.findOne({
                where: {
                    title
                }
            })
            if (result) {
                res.status(409).json({msg: 'task already exists.'})    
            } else {
                const newtask = await task.create({
                    title, 
                    picture,
                    status,
                    priority,
                    product_manager,
                    engineers,
                    product,
                    typeId
                })
                res.status(201).json({newtask: newtask})
            }
            
        } catch (error) {
        console.log(error)
            next(error)
        }
    }


    static async updateTask (req,res, next) {
        const id = req.params.id;
        const { title, type, status, priority, product_manager, engineers, product, typeId  } = req.body;
        const picture = req.file.path;
        try {
                const result = await task.findOne({
                    where: {
                        id
                    }
                })
                if (result) {
                    const updatetask = await task.update ({
                        title, picture, type, status, priority, product_manager, engineers, product, typeId 
                    }, {where: { 
                            id 
                        } 
                    });
                    res.status(201).json({message: 'Woosh, The Task Updated Succesfully!'})
                } else {
                    res.status(404).json({ message: 'Cannot find the task.'})
                }
        } catch (error) {
            next(error)
        }
    }

    static async deleteTask (req,res, next) {
        const id = req.params.id
        try {
            const result = task.destroy ({
                where: {
                    id
                }
            })
            res.status(200).json({result, msg: 'Task deleted!'})
        } 
        catch (error) {
            next(error)
        }
    }
    //function for search the task
    static async search(req, res, next){
        const { search } = req.body;
        try {             
            const found = await task.findAll({                 
                where: {                     
                    title: {                         
                        [Op.like]: '%' + search + '%'                     
                    }                 
                }             
            });          
            if(found){                 
                res.status(201).json(found);             
            } else {                 
                res.status(409).json({                     
                    msg: "task is not found!"                 
                });             
            }              
        }
        catch (error) {
            next (error);
        }
    }
    static async findById (req,res, next) {
        const id = req.params.id;
        try {
            const result = await task.findOne ({
                where: {
                    id
                }
            })
            if (result) {
                res.status(200).json(result)    
            }
            else {
                res.status(404).json(`The Task is not found.`)
            }
        } 
        catch (error) {
            next(error)
        }
    }
}



module.exports = {
    taskController
}
