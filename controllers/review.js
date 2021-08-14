const { task, user, review } = require('../models')
const sequelize = require('sequelize')

class reviewController {
    static async getReview(req,res, next) {
        try {
            const result = await review.findAll({
                order: [['id', 'ASC']],
                include : [
                    user,
                    task
                ]
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async addReview(req,res, next) {
        const { comment, performance, suggestion } = req.body;
        const taskId = req.params.id
        const userId = req.userData.id
        
        try {
            const found = await review.findOne({
				where: {
					userId : userId
				}
			})
			if (found) {
				res.status(409).json({
					msg: "You already add areview for this task!"
                })
            } else {
                const newReview = await review.create({
                    comment, 
                    performance,
                    suggestion,
                    userId,
                    taskId
                });
            }   res.status(201).json({msg : "Thank you for your review!"})
        } catch (error) {
            next(error)
        }
    }
    static async deleteReview(req,res, next) {
        const id = req.params.id;
        try {
            const result = await review.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({result, msg : 'Review has been deleted'})
        } catch (error) {
            next(error)
        }
    }
    static async updateReview(req,res, next) {
        const id = req.params.id;
        const { comment, performance, suggestion, userId, taskId } = req.body;
        try {
            const result = await review.findOne({
                where :{
                    id,
                }
            })
            if (result) {
                const editReview = await review.update({
                    comment, 
                    performance,
                    suggestion,
                    userId,
                    taskId
                }, {where: { 
                    id 
                } 
            });
                res.status(200).json({editReview, msg : 'Review updated'})
            } else {
                res.status(404).json({msg: 'Review is not found.'})    
            }
            
        } catch (error) {
            next(error)
        }
    }
    static async getReviewbyTask(req,res, next) {
        const taskId = req.params.taskId
        try {
            const findTask = await task.findOne({
                where: {
                    id: taskId
                }
            })
            if (findTask){
                const result = await review.findAll({
                    where : { taskId : taskId },
                    order: [['id', 'ASC']],
                    include : [ 
                        user, task
                    ]
                }); 
                const totalrating = await review.findAll({ 
                    where: { taskId },
                    attributes: [ 
                        [sequelize.fn('AVG', sequelize.col('rating')),'avgrating']
                            ],
                    })
                    res.status(200).json({result, totalrating})
            } else {
                res.status(404).json({msg : "Deeply sorry, task can not be found."})
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    reviewController
};
