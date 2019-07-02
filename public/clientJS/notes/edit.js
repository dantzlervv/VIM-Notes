document.addEventListener('click', function (e) {
    let target = e.target;

    if(target.id === 'edit-note'){
        putData();
    }
    else if(target.id === 'delete-note'){
        deleteData();
    }
});

function putData() {
    event.preventDefault();
    let idNote = document.getElementById("id-note").value;
    let noteTitle = document.getElementById("note-title").value;
    let noteTextContent = document.getElementById("note-text").value;

    const data = {
        id: idNote,
        noteTitle: noteTitle,
        noteTextContent : noteTextContent
    };

    return fetch(`/notes/edit/${idNote}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
        .then(response => {window.location.replace("/");})
}

function deleteData() {
    event.preventDefault();
    let idNote = document.getElementById("id-note").value;
    return fetch(`/notes/edit/${idNote}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({idNote})
    })
        .then(response => {window.location.replace("/");})
}
