function FullN(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Clearcache() {
    $.ajax({
        url: "",
        context: document.body,
        success: function (s, x) {

            $('html[manifest=saveappoffline.appcache]').attr('content', '');
            $(this).html(s);
        }
    }); 
}

function getMessage(lang) {
    $("input").prop("disabled", true);
    $("textarea").prop("disabled", true);
        var pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if ($('#Name').val() != '' && $('#Email').val() != '' && $('#Subject').val() != '' && $('#Message').val() != '') {
            if (!pattern.test($('#Email').val())) {
                if (lang == 'en') {
                    $('input').fadeIn(1000);
                    $('textarea').fadeIn(1000);
                    $('#OK').fadeIn(1000);
                    $("input").prop("disabled", false);
                    $("textarea").prop("disabled", false);
                    swal.fire(
                        'Something went wrong',
                        'Email format is incorrect. Please check your e-mail and try again.',
                        'error'
                    )
                } else {
                    $('input').fadeIn(1000);
                    $('textarea').fadeIn(1000);
                    $('#OK').fadeIn(1000);
                    $("input").prop("disabled", false);
                    $("textarea").prop("disabled", false);
                    swal.fire(
                        'พบข้อผิดพลาด',
                        'รูปแบบอีเมล์ไม่ถูกต้อง กรุณาตรวจสอบอีเมล์และลองใหม่อีกครั้ง',
                        'error'
                    )
                }
            } else {
                $('#WaitIco').fadeIn(500);
                var QM = new Object();
                QM.Name = $('#Name').val();
                QM.Email = $('#Email').val();
                QM.Subject = $('#Subject').val();
                QM.Message = $('#Message').val();
                QM.lang = lang;
                $.ajax({
                    url: "/home/sendMessage",
                    data: JSON.stringify(QM),
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    error: function () {
                        if (lang == 'en') {
                            $('input').fadeIn(1000);
                            $('textarea').fadeIn(1000);
                            $('#OK').fadeIn(1000);
                            $("input").prop("disabled", false);
                            $("textarea").prop("disabled", false);
                            swal.fire(
                                'Something went wrong',
                                'Could not be send message. Please wait about 15-30 minutes and try again.',
                                'error'
                            )
                        } else {
                            $('input').fadeIn(1000);
                            $('textarea').fadeIn(1000);
                            $('#OK').fadeIn(1000);
                            $("input").prop("disabled", false);
                            $("textarea").prop("disabled", false);
                            swal.fire(
                                'พบข้อผิดพลาด',
                                'ระบบขัดข้องไม่สามารถทำรายการได้ กรุณารอประมาณ 15-30 นาทีและลองใหม่อีกครั้ง',
                                'error'
                            )
                        }
                    },
                    success: function (response) {
                        if (response.errorcode == 0) {
                            if (lang == 'en') {
                                $('#WaitIco').hide();
                                $('input').fadeIn(1000);
                                $('textarea').fadeIn(1000);
                                $('#OK').fadeIn(1000);
                                $("input").prop("disabled", false);
                                $("textarea").prop("disabled", false);
                                swal.fire(
                                    'Success',
                                    'Message has been sent',
                                    'success'
                                )
                                $('#Name').val('');
                                $('#Email').val('');
                                $('#Subject').val('');
                                $('#Message').val('');
                            } else {
                                $('#WaitIco').hide();
                                $('input').fadeIn(1000);
                                $('textarea').fadeIn(1000);
                                $('#OK').fadeIn(1000);
                                $("input").prop("disabled", false);
                                $("textarea").prop("disabled", false);
                                swal.fire(
                                    'สำเร็จ',
                                    'ข้อความถูกส่งเรียบร้อยแล้ว',
                                    'success'
                                )
                                $('#Name').val('');
                                $('#Email').val('');
                                $('#Subject').val('');
                                $('#Message').val('');
                            }
                        }
                    },
                })
            }
        } else {
            if (lang == 'en') {
                $('input').fadeIn(1000);
                $('textarea').fadeIn(1000);
                $('#OK').fadeIn(1000);
                $("input").prop("disabled", false);
                $("textarea").prop("disabled", false);
                swal.fire(
                    'Something went wrong',
                    'Some input value are blank. Please check and try again.',
                    'error'
                )
            } else {
                $('input').fadeIn(1000);
                $('textarea').fadeIn(1000);
                $('#OK').fadeIn(1000);
                $("input").prop("disabled", false);
                $("textarea").prop("disabled", false);
                swal.fire(
                    'พบข้อผิดพลาด',
                    'ข้อมูลอาจกรอกไม่ครบ กรุณาตรวจสอบและลองใหม่อีกครั้ง',
                    'error'
                )
            }
        }
}

function InspectLock() {
    var i = 0;
    if (i == 0) {
        $(document).keydown(function (e) {
            if (e.which === 123) {
                Swal.fire({
                    icon: 'info',
                    title: 'Inspect Element shortcut key (F12) function is disabled',
                    text: 'Inspect Element is not avaliable this site for system security reason.',
                    footer: 'This is just message for simulator. Please enter F12 again to view inspect element while this popup is shown.'
                })
                return false;
            }
        });
    }
}

