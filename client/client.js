let pinned;

$(document).ready(() => {
    (new Menu('main-menu')).init();
    pinned = new Menu('pinned-menu');
    pinned.init();
})

async function fetchAjax(url, body, method) {
    method = method ? method : body ? 'post' : 'get';
    const response = await fetch(
        url, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
    return await response.json();
}

function insert(values) {
    fetchAjax('/createUpdateNode', {values: values}).then(data => {
        console.log(data);
    })
}

function getNodes() {
    fetchAjax('/listNodes').then(data => {
        console.log(data);
    })
}

function getNodeTypes() {
    fetchAjax('/listNodeTypes').then(data => {
        console.log(data);
    })
}

function getNode(where) {
    fetchAjax('/getNode', {where: where}).then(data => {
        console.log(data);
    })
}

function createNodePopup() {
    fetch('/createNodePage').then(async data => {
        let html = await data.text();
        let $dialog = $('<div></div>'); 
        $dialog.dialog({
            height: 450,
            width: 600
        });
        $dialog.html(html);
    })
}