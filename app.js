$(document).ready(function () {
    $(".animate-container").addClass("d-none")

    $.fn.showContainer = (currContainer) => {
        $(".animate-container").addClass("exit");

        setTimeout(function () {
            $(".animate-container").addClass("d-none");
            $(currContainer).removeClass("exit").removeClass("d-none").addClass("slide-right");
        }, 500);   
    }

    $.fn.showContainer(".hero-container"); // show default container

	$(".continue-one-btn").on("click", () => {
        $.fn.showContainer(".first-container");

		setTimeout(function () {
            $('.blob-container-1').addClass("active");
            $('.blob-container-2').addClass("active");
		}, 500);
	});

    emailjs.init("UYS2azYm6sggcXD6l");

    var code;

    $.fn.emailCode = () => {
        var val = Math.floor(1000 + Math.random() * 9000);
        var emailN = $("#codeEmail").val();
        emailCodeval = val;
        code = val;
        console.log(val);
        var params = {
            to_email: emailN,
            message: val
        };

        console.log(code);
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
            $.fn.emailCode();
            $.fn.showContainer(".second-container");
        }
	});

    $('.check-code').on('click', () => {
        if ($("#codeVal").val() == code) {
            $.fn.showContainer(".third-container");
        } else {
            $(".modal-code").removeClass("d-none");
            setTimeout(function () {
                $(".modal-code").addClass("d-none");
            }, 1000);
        }
    });

    $('.back-to-email').on("click", () => {
        $.fn.showContainer(".first-container");
    });

    // text animation
    $.fn.invalidField = (element) => {
        $(element).addClass("invalid-input");
        $(element).addClass("shake");

        setTimeout(function () {
            $(element).removeClass("shake");
        }, 300);
    }

    // input text checker
    $('.text-only').attr('onkeydown', 'return /[a-z ]/i.test(event.key)');
    $('.number-only').on('keydown input', function (event) {
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
                        // $(inputs[j]).addClass("invalid-input");
                        $.fn.invalidField(inputs[j]);
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
                // $("#bday").addClass("invalid-input");
                $.fn.invalidField("#bday");
                isInputD = false;
            }
        }

        if (isInputs == true && isInputD == true) {
            $.fn.showContainer(".fourth-container");
        }
    }

    $('.check-step-one').on('click', () => {
        $.fn.checkInputs();
    });

    $('.back-to-step-one').on('click', () => {
        $.fn.showContainer(".third-container");
    });

    $('.check-step-two').on("click", () => {
        var inputs = $(".required-input-2");
        var isInputs = false;

        for (var i = 0; i < inputs.length; i++) {
            var inputValue = $(inputs[i]).val();

            if (inputValue === "" || inputValue.length <= 1) {
                // $(inputs[i]).addClass("invalid-input");
                $.fn.invalidField(inputs[i]);
                i = inputs.length;
                isInputs = false;

                for (var j = 0; j < inputs.length; j++) {
                    if ($(inputs[j]).val() === "" || $(inputs[j]).val().length <= 1) {
                        // $(inputs[j]).addClass("invalid-input");
                        $.fn.invalidField(inputs[j]);
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
            // $("#sContactNumber").addClass("invalid-input");
            $.fn.invalidField("#sContactNumber");
            isContactS = false;
        } else {
            $("#sContactNumber").removeClass("invalid-input");
            isContactS = true;
        }

        if ($("#gContactNumber").val().length === 0 || !/^[0-9]+$/.test($("#gContactNumber").val()) || $("#gContactNumber").val().includes(" ") || $("#gContactNumber").val().length !== 11) {
            // $("#gContactNumber").addClass("invalid-input");
            $.fn.invalidField("#gContactNumber");
            isContactG = false;
        } else {
            $("#gContactNumber").removeClass("invalid-input");
            isContactG = true;
        }

        if (isContactG && isContactS && isInputs) {
            $.fn.showContainer(".fifth-container");
        }
    });

    $.fn.getData = () => {
        var email = $("#codeEmail").val();
        var fName = $("#firstName").val();
        var lName = $("#lastName").val();
        var mName = $("#middleName").val();
        var address = $("#Address").val();
        var gender = $(".gender-select option:selected").attr('value');
        var gFn = $("#gFn").val();
        var bday = $("#bday").val();
        var gLn = $("#gLn").val();
        var sContactNumber = $("#sContactNumber").val();
        var gContactNumber = $("#gContactNumber").val();
        var program = $(".program-select option:selected").text();

        $(".fName").text(fName);
        $(".lName").text(lName);
        $(".mName").text(mName);
        $(".email").text(email);
        $(".gender").text(gender);
        $(".bday").text(bday);
        $(".gFName").text(gFn);
        $(".gLName").text(gLn);
        $(".sContact").text(sContactNumber);
        $(".gContact").text(gContactNumber);
        $(".sProgram").text(program);
        $(".sAdress").text(address);
    }

    $(".check-program").on("click", () => {
        var progName = $('#programSelect').find(":selected").attr("value");

        if (progName === "none") {
            $.fn.invalidField("#programSelect");
        } else {
            $('#programSelect').removeClass("invalid-input");
            $.fn.showContainer(".sixth-container");
            $.fn.getData();
        }
    });

    $(".back-to-step-two").on("click", () => {
        $.fn.showContainer(".fourth-container");
    });

    $(".go-to-last").on("click", () => {
        $.fn.showContainer("");
        $(".thank-you-msg").removeClass("d-none").addClass("active");
        $(".blobs").removeClass("active");
    });

    $(".back-to-program").on("click", () => {
        $.fn.showContainer(".fifth-container");
    });
});
