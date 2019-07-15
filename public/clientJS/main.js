$(".delete-note").on('click', function (e) {
        e.preventDefault();
        let idNote = $(this).data("id");
        $.ajax({
            type: 'DELETE',
            url: `/api/notes/${idNote}`,
            data: idNote,
            success: function (response) {
                $(`#${idNote}`).remove();
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

$(".delete-list").on('click', function (e) {
        e.preventDefault();
        let idList = $(this).data("id");
        $.ajax({
            type: 'DELETE',
            url: `api/lists/${idList}`,
            data: idList,
            success: function (res) {
                $(`#${idList}`).remove();
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

$(".edit-note").on('click', function (e) {
        e.preventDefault();
        let idNote = $(this).data("id");
        $.ajax({
            type: 'GET',
            url: `/notes/edit/${idNote}`,
            data: idNote,
            success: function (response) {
                window.location = `/notes/edit/${idNote}`;
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

$(".edit-list").on('click', function (e) {
        e.preventDefault();
        let idList = $(this).data("id");
        $.ajax({
            type: 'GET',
            url: `/lists/edit/${idList}`,
            data: idList,
            success: function (response) {
                window.location = `/lists/edit/${idList}`;
            },
            error: function (err) {
                console.log(err);
            }
        });
    });







