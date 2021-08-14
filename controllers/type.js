const { task, type } = require('../models')

class typeController {
    static async getType (req,res, next) {
        try {
            const result = await type.findAll({
                order: [['id', 'ASC']],
                include : [task]
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async addType (req,res, next) {
        const { typeName, duration, blockers, actual_start, actual_finish, source } = req.body;
        try {
            const result = await type.findOne({
                where: {
                    typeName,
                    duration,
                    blockers,
                    actual_start,
                    actual_finish,
                    source,
                }
            })
            if (result) {
                res.status(400).json({msg: 'type already exists.'})    
            } else {
                const newtype = await type.create({
                    typeName,
                })
                res.status(200).json(newtype)
            }
            
        } catch (error) {
            next(error)
        }
    }
    static async deleteType (req,res, next) {
        const id = req.params.id;
        try {
            const result = await type.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({result, msg : 'Success deleted'})
        } catch (error) {
            next(error)
        }
    }
    static async findType (req,res, next) {
        const { id } = req.params.id;
        try {
            const result = await type.findOne({
                where: {
                    id
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    typeController
};
