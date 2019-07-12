const checksDiv = document.getElementById('checks');

document.addEventListener('click', function (e) {
    let target = e.target;
    if(target.id === 'plus-btn') {
        createItem();
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
    inputItem.name = "taskName";

    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn', 'btn-sm', 'text-light','rounded', 'bg-danger', 'delete-btn','position-absolute', 'mr-1');
    cancelBtn.style.right = '0';
    cancelBtn.style.top = '10%';
    cancelBtn.innerText = 'x';

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

document.addEventListener('submit', function (e) {
    // e.preventDefault();
    const checkItems = document.querySelectorAll('input.input-item');
    checkItems.forEach(function(element){
        let checkboxItem = element.previousElementSibling;
        if(element.value) {
            if (!checkboxItem.checked) {
                element.name = element.name + '0';
            }
        }
    });
});