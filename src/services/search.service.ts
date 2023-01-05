import config from '../config';
import { Book } from '../database/models';

export class SearchService {
  private static _searchServiceInstance: SearchService;

  constructor() {}

  static getInstance() {
    if (!SearchService._searchServiceInstance) {
      SearchService._searchServiceInstance = new SearchService();
    }
    return SearchService._searchServiceInstance;
  }

  //buscar Libro
  async getSearch(title: string) {
    let searchs = await Book.find({
      title: { $regex: new RegExp(title, 'i') },
    });
    searchs = searchs.map((search) => {
      search.image = `${config.publicUrl}/images/${search.image}`;
      return search;
    });
    return searchs;
  }
}
