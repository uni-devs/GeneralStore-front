export default function ($axios) {
  return {
    getAll: function() {
      return $axios.get('/categories');
    }
  }
}
