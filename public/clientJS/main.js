
$('#board').click(function (e) {
    if ($(e.target).hasClass("delete-note")) {
        $.ajax({
            type: 'DELETE',
            url: '/notes/edit/' + $(e.target).attr('data-id'),
            success: function (response) {
                window.location.href = '/';
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    if ($(e.target).hasClass("delete-list")) {
        $.ajax({
            type: 'DELETE',
            url: '/lists/edit/' + $(e.target).attr('data-id'),
            success: function (response) {
                window.location.href = '/';
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});





