const addCheckboxDiv = document.getElementById('add-checkbox');
const plusButton = document.getElementById('plus-btn');
const checksDiv = document.getElementById('checks');

document.addEventListener('click', function (e) {
    let target = e.target;
    if(target.id === 'add-item-btn'){
        createItem();
    }
    else if(target.id === 'plus-btn'){
        addCheckboxDiv.hidden = false;
        plusButton.hidden = true;
    }
    else if(target.id === 'add-cancel-btn'){
        addCheckboxDiv.hidden = true;
        plusButton.hidden = false;
    }
    else if(target.id === 'save-changes'){
        putData();
    }
    else if(target.id === 'delete-list'){
        deleteData();
    }
    else if(target.classList.contains('delete-btn')){
        let parent = target.parentNode;
        parent.remove();
    }
    else if(target.classList.contains('edit-btn')){
        target.hidden = true;
        target.nextElementSibling.hidden = false;
    }
    else if(target.classList.contains('save-btn')){
        checkboxSaveChanges(target);
    }
    else if(target.classList.contains('cancel-btn')){
        let parent = target.parentNode;
        let editButton = parent.previousElementSibling;
        parent.hidden = true;
        editButton.hidden = false;
    }
});

function createItem(){
    let valueOfInput = document.getElementById("new-item").value;
    if(!valueOfInput){
        alert("Please fill the input!");
        return;
    }

    let listDiv = document.createElement('div');

    let checkItem = document.createElement('input');
    checkItem.classList.add('check-item');
    checkItem.type = 'checkbox';
    checkItem.name = 'taskName';
    checkItem.value = valueOfInput;

    let inputLabel = document.createElement('label');
    inputLabel.innerText = valueOfInput;

    checksDiv.appendChild(listDiv);
    listDiv.appendChild(checkItem);
    listDiv.appendChild(inputLabel);

    document.getElementById("new-item").value = '';
    addCheckboxDiv.hidden = true;
    plusButton.hidden = false;
}

function checkboxSaveChanges(target){
    let input = target.previousElementSibling;
    if(!input.value){
        alert("Please fill the input!");
        return;
    }
    let parent = target.parentNode;

    let editButton = parent.previousElementSibling;
    let label = editButton.previousElementSibling;
    let checkInput = label.previousElementSibling;

    parent.hidden = true;
    editButton.hidden = false;

    label.innerText = input.value;
    checkInput.value = input.value;
    input.value = '';
}








function putData() {
    event.preventDefault();
    let idList = document.getElementById("idList").value;
    let listName = document.getElementById("list-name").value;

    let listItem = [];
    let listItemChecked = [];

    const checkItems = document.querySelectorAll('input.check-item');
    checkItems.forEach(function(element){
        if(!element.checked){
            listItem.push(element.value);
        }
        else{
            listItemChecked.push(element.value);
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
