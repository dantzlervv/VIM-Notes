document.addEventListener('click', function (e) {
    let target = e.target;
    if(target.id === 'add-item'){
        createItem();
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

    document.getElementById('list-form').appendChild(listDiv);
    listDiv.appendChild(checkItem);
    listDiv.appendChild(inputLabel);

    document.getElementById("new-item").value = '';
}

document.addEventListener('submit', function (e) {
    //e.preventDefault();
    const checkItems = document.querySelectorAll('.check-item');
    checkItems.forEach(function(element){
       if(!element.checked){
           element.checked = true;
           element.name = element.name + '0';
       }
    });
});