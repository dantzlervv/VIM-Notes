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

document.addEventListener('submit', function (e) {
    //e.preventDefault();
    checksDiv.hidden = true;
    const checkItems = document.querySelectorAll('.check-item');
    checkItems.forEach(function(element){
       if(!element.checked){
           element.checked = true;
           element.name = element.name + '0';
       }
    });
});