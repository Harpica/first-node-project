import express from 'express';
import { blogController } from '../controllers/blogController';

//create new express router
export const router = express.Router();

router.get('/', blogController.blog_index);

router.get('/create', blogController.blog_create_get);

router.post('/', blogController.blog_create_post);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);
