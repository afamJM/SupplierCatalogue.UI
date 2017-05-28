(() => {
    let shortlistBtns;

    /*
    function setupMap() {
        const gmap = document.getElementById('gmap');

        if (!gmap || gmap.dataset.lat || !gmap.dataset.lon) {
            return;
        }

        const map = new google.maps.Map(gmap, {
            center: {lat: gmap.dataset.lat, lng: gmap.dataset.lon},
            zoom: 8
        });
    }
    */

    function toggleShortlist(ev) {
        const supplierId = window.location.pathname.split('_')[1];
        // ... do some fetchy/ajaxy stuff to update the db

        for (const btn of shortlistBtns) {
            const i = btn.querySelector('.btnShortlist__icon');
            const t = btn.querySelector('.btnShortlist__txt');

            if (btn.classList.contains('btn--shortlisted')) {
                t.textContent = 'Save to shortlist';
            } else {
                t.textContent = 'View my shortlist';
            }

            btn.classList.toggle('btn--shortlisted');
            i.classList.toggle('fa-heart-o');
            i.classList.toggle('fa-heart');
        }
    }

    function filterFairNav(ev) {
        if (ev.target.matches('a')) {
            ev.preventDefault();
            const month = ev.target.dataset.month;
            const monthBlock = document.querySelector(`.month[data-month="${month}"]`);
            const activeBlock = document.querySelector('.month--active');

            if (activeBlock !== monthBlock) {
                activeBlock.classList.remove('month--active');
                monthBlock.classList.add('month--active');
            }
        }
    }

    function bindEventListeners() {
        const fairNav = document.querySelector('.fairNav');

        fairNav.addEventListener('click', filterFairNav);

        for (const btn of shortlistBtns) {
            btn.addEventListener('click', toggleShortlist);
        }
    }

    function init() {
        shortlistBtns = document.querySelectorAll('.btnShortlist');
        bindEventListeners();
        // setupMap()
        const myLazyLoad = new LazyLoad();
    }

    init();
})();
