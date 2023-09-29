$(document).ready(function () {
    setTimeout(function () {
        $(".welcome-text-b").text("Wait lang hehehe...");
    }, 2000);
    setTimeout(function () {
        $(".welcome-text-b").text("Tagal potek!");
    }, 5000);
    setTimeout(function () {
        $(".welcome-text-b").text("Yan okay na guys!");
    }, 7000);

	$(".continue-one-btn").on("click", () => {
		$(".hero-container").removeClass("slide-right").addClass("exit");
		setTimeout(function () {
			$(".hero-container").addClass("d-none");
			$(".first-container").addClass("slide-right").removeClass("d-none").removeClass("exit");
            $('.blob-container-1').addClass("active");
            $('.blob-container-2').addClass("active");
		}, 500);
	});

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
            }, 500);
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
        }, 500);
    });

    // input text checker
    $('.text-only').attr('onkeydown', 'return /[a-z ]/i.test(event.key)');
    $('.number-only').on('keydown input', function (event) {
        // Allow numeric input (0-9) and special keys (Delete, Backspace)
        if (!((event.key === 'Delete' || event.key === 'Backspace') || /^[0-9]{0,10}$/.test(this.value))) {
            event.preventDefault();
        }
    });
    

    // $('.required-input').
    $.fn.checkInputs = () => {
        var inputs = $(".required-input");
        var isInputs = false;
        var isInputD = false;

        for(var i = 0; i < inputs.length; i++){
            console.log(1)
            if($(inputs[i]).val() == "" || $(inputs[i]).val().length <= 1) {
                i = inputs.length;
                isInputs = false;

                for(var j = 0; j < inputs.length; j++){
                    if($(inputs[j]).val() == "" || $(inputs[j]).val().length <= 1) {
                        $(inputs[j]).addClass("invalid-input");
                    } else if ($(inputs[j]).val() !== "" || $(inputs[j]).val().length >= 2) {
                        $(inputs[j]).removeClass("invalid-input");
                    }
                }
            } else {
                $(inputs[i]).removeClass("invalid-input");
                isInputs = true;
            }
        }

        var inputDate = $("#bday").val();
        if (inputDate) {
            var birthDate = new Date(inputDate);
            var currentDate = new Date();
            var age = currentDate.getFullYear() - birthDate.getFullYear();

            if (
                currentDate.getMonth() < birthDate.getMonth() ||
                (currentDate.getMonth() === birthDate.getMonth() && 
                currentDate.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            
            if (age >= 16) {
                $("#bday").removeClass("invalid-input");
                isInputD = true;
            } else {
                $("#bday").addClass("invalid-input");
                isInputD = false;
            }
        }

        if (isInputs == true && isInputD == true) {
            $(".third-container").removeClass("slide-right").addClass("exit");
            setTimeout(function () {
                $(".third-container").addClass("d-none");
                $(".fourth-container").removeClass("exit").removeClass("d-none").addClass("slide-right");
            }, 500);
        }
    }

    $('.check-step-one').on('click', () => {
        $.fn.checkInputs();
    });

    $('.back-to-step-one').on('click', () => {
        $(".fourth-container").addClass("exit").removeClass("slide-right");
        setTimeout(function () {
            $(".fourth-container").addClass("d-none");
            $(".third-container").removeClass("exit").removeClass("d-none").addClass("slide-right");
        }, 500);
    });

    $('.check-step-two').on("click", () => {
        var inputs = $(".required-input-2");
        var isInputs = false;

        for (var i = 0; i < inputs.length; i++) {
            var inputValue = $(inputs[i]).val();

            if (inputValue === "" || inputValue.length <= 1) {
                $(inputs[i]).addClass("invalid-input");
                i = inputs.length;
                isInputs = false;

                for (var j = 0; j < inputs.length; j++) {
                    if ($(inputs[j]).val() === "" || $(inputs[j]).val().length <= 1) {
                        $(inputs[j]).addClass("invalid-input");
                        isInputs = false;
                    } else if ($(inputs[j]).val() !== "" || $(inputs[j]).val() >= 2) {
                        $(inputs[j]).removeClass("invalid-input");
                    }
                }
            } else {
                $(inputs[i]).removeClass("invalid-input");
                isInputs = true;
            }
        }

        var isContactS = false;
        var isContactG = false;

        if ($("#sContactNumber").val().length === 0 || !/^[0-9]+$/.test($("#sContactNumber").val()) || $("#sContactNumber").val().includes(" ") || $("#sContactNumber").val().length !== 11) {
            $("#sContactNumber").addClass("invalid-input");
            isContactS = false;
        } else {
            $("#sContactNumber").removeClass("invalid-input");
            isContactS = true;
        }

        if ($("#gContactNumber").val().length === 0 || !/^[0-9]+$/.test($("#gContactNumber").val()) || $("#gContactNumber").val().includes(" ") || $("#gContactNumber").val().length !== 11) {
            $("#gContactNumber").addClass("invalid-input");
            isContactG = false;
        } else {
            $("#gContactNumber").removeClass("invalid-input");
            isContactG = true;
        }

        console.log(isInputs);
        console.log(isContactS);
        console.log(isContactG);

        if (isContactG && isContactS && isInputs) {
            $(".fourth-container").addClass("exit");
            setTimeout(function () {
                $(".fourth-container").addClass("d-none");
            }, 500);
        }

    });
});
