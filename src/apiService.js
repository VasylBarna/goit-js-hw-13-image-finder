const BASE_URL = 'https://pixabay.com';
const API_KEY = '21930090-2f4bfee534669e28d6350f360';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }
  async searchImages() {
    const perPage = 12;
    const response = await fetch(
      `${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${perPage}&key=${API_KEY}`,
    );
    const parsedResponse = await response.json();
    const card = await parsedResponse.hits;
    this.incrementPage();
    return card;
  }
  incrementPage() {
    this.pageNumber +=1;
  }
  resetPage() {
    this.pageNumber = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}
