const BASE_URL = 'https://pixabay.com';
const API_KEY = '21930090-2f4bfee534669e28d6350f360';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = '';
  }
  searchImages() {
    const perPage = 12;
    const url = `${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.perPage}&key=${API_KEY}`;
    return fetch(url)
      .then(respone => respone.json())
      .then(this.incrementPage());
  }
  incrementPage() {
    this.pageNumber++;
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
