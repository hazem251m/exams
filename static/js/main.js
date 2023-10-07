toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": 1000,
    "hideDuration": 1000,
    "timeOut": 2000,
    "extendedTimeOut": 500,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "rtl": true
    }


fitty('#side-logo', {
    maxSize: 35,
});

$('#bar-collaps-btn').on('click', function() {
    $('#side-logo').css('display', 'none');
});

$('#bar-expand-btn').on('click', function() {
    $('#side-logo').css('display', 'inline-block');
});

datetime = $('#datetime')

function refreshTime() {
    var dateString = new Date().toLocaleString("ar-EG", {
        timeZone: "Africa/Cairo"
    });
    var day = new Date().toLocaleString("ar-EG", {
        timeZone: "Africa/Cairo",
        weekday: "long"
    });
    var formattedString = dateString.split(",");
    my_html = `
        <span>`+ formattedString[0] +`</span>
        <br />
        <span>`+ day + formattedString[1] +`</span>
    `
    $('#datetime').html(my_html);
}

setInterval(refreshTime, 1000);

$('.searcable-dropdown').select2();
$('.datepicker').datepicker();


function delete_item(id) {
    swal({
        title: "هل انت متاكد؟",
        text: "هل تريد حذف هذا المسلسل" + " ('" + id + "')",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "نعم, احذف",
        cancelButtonText: "لا تحذف",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            method: 'POST',
            url: window.location.href,
            data: {
                id: id,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                type: 'delete'
            },
            success: function (data) {
                $('#' + id).remove();
                swal({
                    title:"تم الحذف!",
                    text:"تم حذف المسلسل",
                    type: "success",
                    confirmButtonText: "حسناً",
                });
            }
        });

    });
}

$('#add_form').submit(function (e) {
    e.preventDefault();
    if ($('#add_form').parsley().isValid()) {
        $.ajax({
            method: 'POST',
            url: window.location.href,
            data: new FormData(this),
            contentType: false,
            processData: false,
            success: function (data) {
                $.growl.notice({ title: "اشعار", message: "تم حفظ البيانات بنجاح", location: 'tl' });
                if ((window.location.href).includes('add_')) {
                    document.getElementById("add_form").reset();
                    $(".searchable-combobox").val('1').trigger('change');
                }
            },
            error: function (error_data) {
                var message = error_data.responseText
                if ((window.location.href).includes('/ar')) {
                    $.growl.error({ title: "إشعار بخطأ", message: message, location: 'tl' });
                } else{
                    $.growl.error({ title: "Error Notice", message: message });
                }
            }
        });
    }

});


