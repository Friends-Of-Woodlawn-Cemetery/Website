const Papa = require('papaparse');
const Vue = require('vue').default;
const VueGoodTablePlugin = require('vue-good-table').default

Vue.use(VueGoodTablePlugin);

const remToPixels= (rem) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

window.addEventListener('scroll', event => {
    if(document.querySelector("html").scrollTop > remToPixels(3.75)) {
        document.querySelector("body>header .header-title").classList.add("short");
    }else {
        document.querySelector("body>header .header-title").classList.remove("short");
    }
});

new Vue({
    el: '#internment-app',
    data(){return {
        columns: [],
        records: [],
        searchText: '',
        paginationOptions: {
            enabled: true,
            perPage: 20
        },
        searchOptions: {
            enabled: true,
            trigger: 'enter'
        }
    }},
    created(){
        Papa.parse('/internment.csv', {
            download: true,
            complete: (results, file) => {
                this.columns = results.data[0].map(column => {
                    return {
                        label: column,
                        field: column,
                    }
                });
                this.records = results.data.slice(1).map((row) => {
                    const obj = {};
                    row.forEach((column, columnIndex) => {
                        obj[this.columns[columnIndex].field] = column;
                    });
                    return obj;
                });
            }
        })
    },
})

