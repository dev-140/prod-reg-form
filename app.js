$(document).ready(function () {
	$(".continue-one-btn").on("click", () => {
		$(".hero-container").removeClass("slide-right").addClass("exit");
		setTimeout(function () {
			$(".hero-container").addClass("d-none");
			$(".first-container").addClass("slide-right").removeClass("d-none").removeClass("exit");
		}, 1000);
	});

    var emailCodeval;
    emailjs.init("UYS2azYm6sggcXD6l");

    $.fn.emailCode = () => {
        var val = Math.floor(1000 + Math.random() * 9000);
        var emailN = $("#codeEmail").val();
        emailCodeval = val;
        console.log(val);
        var params = {
            to_email: emailN,
            message: val
        };

        emailjs
        .send("service_ofto8wr", "template_iqzlb59", params)
        .then(function (response) {
            console.log("Email sent successfully:", response);
        })
        .catch(function (error) {
            console.error("Email sending failed:", error);
        });
    }

	$(".check-email").on("click", () => {
		var email = $('#codeEmail').val();
		var txt = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!txt.test(email)) {
			$('.modal-form').removeClass("d-none");
            setTimeout(function () {
                $('.modal-form').addClass("d-none");
            }, 1000);
		} else {
            $(".first-container").addClass("exit");
            setTimeout(function () {
                $(".first-container").addClass("d-none");
                $(".second-container").addClass("slide-right").removeClass("d-none").removeClass("exit");
                // $.fn.emailCode();
            }, 1000);
        }
	});

    $('.check-code').on('click', () => {
        if ($("#codeVal").val() == 111) {
            console.log("valid");

            $(".second-container").removeClass("slide-right").addClass("exit");
            setTimeout(function () {
                $(".second-container").addClass("d-none");
                $(".third-container").addClass("slide-right").removeClass("d-none").removeClass("exit");
            }, 1000);
        } else {
            $(".modal-code").removeClass("d-none");
            setTimeout(function () {
                $(".modal-code").addClass("d-none");
            }, 1000);
        }
    });

    $('.back-to-email').on("click", () => {
        $(".second-container").addClass("exit");
        setTimeout(function () {
            $(".second-container").addClass("d-none");
            $(".first-container").addClass("slide-right").removeClass("exit").removeClass("d-none");
        }, 1000);
    });

    // input text checker

    $('.text-only').attr('onkeydown', 'return /[a-z]/i.test(event.key)');

    // $('.required-input').
    $.fn.checkInputs = () => {
        console.log(1)
    }

    $('.check-step-one').on('click', () => {
        $.fn.checkInputs();
    });
});

$(".hero-container").addClass("d-none");
$(".second-container").addClass("d-none");
$(".first-container").addClass("d-none");
$(".third-container").removeClass("d-none");
