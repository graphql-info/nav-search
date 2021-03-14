const { html } = require('@popeindustries/lit-html-server');
const path = require('path');

module.exports = {
    init: () => [{ name: 'css/search.css', path: path.resolve(__dirname, './assets/css/search.css') }],
    render: (pages, currentItem, base) => {
        const output = [html`
            <input class="search">
            <script>
                document.querySelector('.search').addEventListener("keyup", (e) => {
                    const value = e.currentTarget.value.toUpperCase();
                    document.querySelectorAll('ul > ol').forEach((item) => {
                        if (item.innerText.toUpperCase().indexOf(value) === -1) {
                            item.classList.add('hidden');
                        } else {
                            item.classList.remove('hidden');
                        }
                    });
                    if (value === '') {
                        document.querySelectorAll('details').forEach((item) => {
                            if (item.querySelector('ol.selected')) {
                                item.setAttribute('open', '');
                            } else {
                                item.removeAttribute('open');
                            }
                        });
                    } else {
                        document.querySelectorAll('details').forEach((item) => {
                            if (item.querySelectorAll('ol:not(.hidden)').length > 0) {
                                item.setAttribute('open', '');
                            } else {
                                item.removeAttribute('open');
                            }
                        });
                    }
                });
            </script>`];
        output.push(base(pages, currentItem));
        return output;
    }
};
