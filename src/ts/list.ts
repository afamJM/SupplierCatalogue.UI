/// <reference types='handlebars' />
/// <reference path='../types/list.d.ts' />

(() => {
    // API_PORT is replaced on build with process.env.API_PORT
    const api: string = `http://${window.location.hostname}:API_PORT/api/v1`;
    let currentCategory: string = '#';
    let ddlCategory: HTMLSelectElement;
    let lazy: any;


    function fetchCategories() {
        const pathArr: string[] = location.pathname.split('/');
        let category: string;

        if (pathArr.length === 3) {
            category = pathArr[2];
        }

        fetch(`${api}/suppliers/categories`)
            .then(resp => resp.json())
            .then((data: CategoryResponse) => {
                const optsFrag = document.createDocumentFragment();

                data.data.categories.forEach((c: category) => {
                    const o: HTMLOptionElement = document.createElement('option');
                    o.value = c.code;
                    o.textContent = c.description;

                    if (category) {
                        if (c.code === category) {
                            o.setAttribute('selected', 'selected');
                        }
                    }

                    optsFrag.appendChild(o);
                });

                ddlCategory.appendChild(optsFrag);
            });
    }


    function setSelectedCategory() {
        const opts = ddlCategory.querySelectorAll('option');
        const pathArr: string[] = location.pathname.split('/');
        let category: string;

        if (pathArr.length === 3) {
            category = pathArr[2];
        }

        if (category) {
            function findSelectedCategory(opt) {
                return opt.value === category;
            }

            const selected = [...opts].filter(findSelectedCategory);

            if (selected.length) {
                ddlCategory.selectedIndex = selected[0].index;
            }
        } else {
            ddlCategory.selectedIndex = 0;
        }
    }


    function fetchPartials() {
        fetch('/views/partials/card.handlebars')
            .then(r => r.text())
            .then((data) => {
                Handlebars.registerPartial('card', data);
            });
    }


    function updateTemplate(data, category = '', pushState = false) {
        const container = document.getElementById('results');

        if (data) {
            fetch('/views/partials/list.handlebars')
                .then(r => r.text())
                .then((tmplData) => {
                    const listTmpl = Handlebars.compile(tmplData);
                    container.innerHTML = listTmpl(data);
                    lazy = new LazyLoad();

                    if (pushState) {
                        history.pushState(data, 'Results', `/suppliers/${category}`);
                    } else {
                        setSelectedCategory();
                    }
                });
        } else {
            setSelectedCategory();
            filterCategory(false);
        }
    }


    function filterCategory(pushState = true) {
        let category = ddlCategory.value;

        let qs = '';

        if (category === '#') {
            category = '';
        } else {
            qs = `?category=${category}`;
        }

        if (category !== currentCategory) {
            currentCategory = category;

            fetch(`${api}/suppliers${qs}`)
                .then(resp => resp.json())
                .then((data) => {
                    updateTemplate(data, category, pushState);
                });
        }
    }


    function init() {
        ddlCategory = <HTMLSelectElement>document.getElementById('category');
        ddlCategory.addEventListener('change', () => {
            filterCategory(true);
        });

        fetchCategories();
        fetchPartials();

        lazy = new LazyLoad();

        window.addEventListener('popstate', () => updateTemplate(history.state));
    }

    init();
})();

