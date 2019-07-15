const checksDiv = document.getElementById('checks');

document.addEventListener('click', function (e) {
    let target = e.target;
    if(target.id === 'plus-btn') {
        createItem();
    }
    else if(target.id === 'save-changes') {
        putData();
    }
    else if(target.id === 'delete-list') {
        deleteData();
    }
    else if(target.classList.contains('delete-btn')) {
        let parent = target.parentNode;
        parent.remove();
    }
    else if(target.classList.contains('check-item')) {
        let clone = moveItem(target);
        if(target.checked === true) {
            checksDiv.appendChild(clone);
        }
        else {
            checksDiv.insertBefore(clone, checksDiv.firstChild);
        }
    }
});

function createItem() {
    let listDiv = document.createElement('div');
    listDiv.classList.add('position-relative', 'mb-1');

    let checkItem = document.createElement('input');
    checkItem.type = 'checkbox';
    checkItem.name = 'task';
    checkItem.classList.add('check-item', 'position-absolute', 'mx-1');
    checkItem.style.left = '0';
    checkItem.style.top = '30%';

    let inputItem = document.createElement('input');
    inputItem.type = 'text';
    inputItem.classList.add('form-control', 'input-item', 'pl-4');

    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn', 'btn-sm', 'text-light','rounded', 'bg-danger', 'delete-btn','position-absolute', 'mr-1');
    cancelBtn.innerText = 'x';
    cancelBtn.style.right = '0';
    cancelBtn.style.top = '10%';

    checksDiv.appendChild(listDiv);
    listDiv.appendChild(checkItem);
    listDiv.appendChild(inputItem);
    listDiv.appendChild(cancelBtn);
}

function moveItem(target) {
    let parent = target.parentNode;
    let clone = parent.cloneNode(true);
    parent.remove();
    return clone;
}

function putData() {
    event.preventDefault();

    let listName = document.getElementById("list-name").value;
    if(!listName) {
        alert("Please fill the Title input!");
        return;
    }

    let idList = document.getElementById("idList").value;

    let listItem = [];
    let listItemChecked = [];

    const checkItems = document.querySelectorAll('input.input-item');
    checkItems.forEach(function(element) {
        if(element.value) {
            if (!element.previousElementSibling.checked) {
                listItem.push(element.value);
            }
            else {
                listItemChecked.push(element.value);
            }
        }
    });
    const data = {
        id: idList,
        listName: listName,
        taskName0: listItem,
        taskName: listItemChecked
    };
    return fetch(`/lists/edit/${idList}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(response => {window.location.replace("/");})
}

function deleteData() {
    event.preventDefault();
    let idList = document.getElementById("idList").value;
    return fetch(`/lists/edit/${idList}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idList})
        })
            .then(response => {window.location.replace("/");})
}

