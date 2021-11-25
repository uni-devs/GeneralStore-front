export const ValidationMixin = {
  data() {
    return {
      errors:{},
      hasError:false,
    }
  },
  methods: {
    validate: function (data,rules) {
      this.errors = {};
      this.hasError = false
      let errors = this.errors;
      if (!rules) {
        return true;
      }
      Object.keys(rules).forEach(key => {
        // check if item should be required
        if (rules[key].required) {
          if (!data[key] || !data[key].length) {
            errors[key] = this.$t("required");
            this.hasError = true;
          }
        }
      });
      this.errors = [];
      this.errors = errors;
      return this.hasError
    }
  }
}
