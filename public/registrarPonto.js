const appVue = new Vue({
    el: '#stage',
    data: {
      productId: '',
      stage: '',
      details: ''
    },
    methods: {
      async registerStage() {
        try {
          const response = await fetch('/add-stage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: this.productId,
              stage: this.stage,
              details: this.details
            }),
          });
  
          if (response.ok) {
            console.log('Ponto registrado:', this.stage);
            // Limpa os campos após o registro
            this.productId = '';
            this.stage = '';
            this.details = '';
          }
        } catch (error) {
          console.error('Erro ao registrar ponto:', error);
        }
      },
    },
  });