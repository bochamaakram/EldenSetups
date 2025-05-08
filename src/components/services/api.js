import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getLaptops() {
        return api.get('/products/ORDINATEUR');
    },
    getTablets() {
        return api.get('/products/TABLETTE_GRAPHIQUE');
    },
    getMonitors() {
        return api.get('/products/ECRAN');
    },
    getKeyboards() {
        return api.get('/products/CLAVIER');
    },
    getMice() {
        return api.get('/products/SOURIS');
    },
    getStorage() {
        return api.get('/products/Stockage');
    },
    getPrinters() {
        return api.get('/products/IMPRIMANTE');
    }
}