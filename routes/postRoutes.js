import express from 'express'
import authUser from '../middleware/authUser.js'
import { createPost } from '../controllers/postController.js'
import upload from '../middleware/upload.js'


const router = express.Router()

router.post('/create', authUser, upload.array("media") ,createPost )

export default router;