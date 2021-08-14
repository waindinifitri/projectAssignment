const { Router } = require('express');
const router = Router();
const {typeController} = require('../controllers/type')
const {taskController} = require('../controllers/task');
const { authentication, authorization } = require('../middlewares/auth');
const { uploader } = require('../middlewares/multer')

router.get('/type', typeController.getType) 
router.post('/type/add',authentication,authorization, typeController.addType)
router.delete('/type/delete/:id',authentication, authorization,typeController.deleteType)
router.get('/type/find/:id',authentication, typeController.findType)
router.post('/add',authentication, authorization, uploader.single('picture'), taskController.addTask)
router.post('/find/title', taskController.search)
router.get('/find/:id',authentication, taskController.findById)
router.put('/update/:id', authentication, authorization, uploader.single('picture'),taskController.updateTask)
router.delete('/delete/:id', authentication, authorization, taskController.deleteTask)


module.exports = router;
