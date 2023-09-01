const appVue = new Vue({
  el: '#client',
  data: {
    productName: '',
    gtin: '',
    category: '',
    origin: ''
  },
  methods: {
    async registerProduct() {
      try {
        const response = await fetch('/register-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productName: this.productName,
            gtin: this.gtin,
            category: this.category,
            origin: this.origin
          }),
        });

        if (response.ok) {
          console.log('Produto registrado:', this.productName);
          // Limpa os campos após o registro
          this.productName = '';
          this.gtin = '';
          this.category = '';
          this.origin = '';
        }
      } catch (error) {
        console.error('Erro ao registrar produto:', error);
      }
    },
  },
});
