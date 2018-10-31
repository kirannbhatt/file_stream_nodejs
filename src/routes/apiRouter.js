import express from 'express'
const router = express.Router();
import homeRouter from './home'
import videoRouter from './video'

router.use('/video', videoRouter)
router.use('/', homeRouter);

export default router;
