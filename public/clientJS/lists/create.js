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

    let checkItem = document.createElement('input');
    checkItem.type = 'checkbox';
    checkItem.name = 'task';
    checkItem.classList.add('check-item');

    let inputItem = document.createElement('input');
    inputItem.type = 'text';
    inputItem.classList.add('d-inline-block', 'input-item');
    inputItem.name = "taskName";

    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn', 'btn-danger', 'btn-md', 'text-light', 'delete-btn');
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
    //e.preventDefault();
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