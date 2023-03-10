import { Router } from 'express';
import { SearchService } from '../services';

const router = Router();
const _searchService = SearchService.getInstance();

router.get('/:title', async (req, res, next): Promise<void> => {
  try {
    const { title } = req.params;
    const books = await _searchService.getSearch(title);
    res.status(200).json({
      data: books,
      msg: 'books found!',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
