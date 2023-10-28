const appVue = new Vue({
    el: '#app',
    data: {
        products: []
    },
    created() {
        this.loadBlockchainData();
    },
    methods: {
        async loadBlockchainData() {
            try {
                const response = await fetch('/get-blockchain-data'); // Rota que retorna os dados do blockchain.json
                if (response.ok) {
                    const blockchainData = await response.json();
                    this.products = blockchainData;
                } else {
                    console.error('Erro ao obter os dados do blockchain:', response.status);
                }
            } catch (error) {
                console.error('Erro ao carregar os dados do blockchain:', error);
            }
        }
    }
});
