$(function () {
    var tabContainers = $('div.tabs > div'); // получаем массив контейнеров
    tabContainers.hide().filter(':first').show(); // прячем все, кроме первого
    // далее обрабатывается клик по вкладке
    $('div.tabs ul.tabNavigation a').click(function () {
        tabContainers.hide(); // прячем все табы
        tabContainers.filter(this.hash).show(); // показываем содержимое текущего
        $('div.tabs ul.tabNavigation a').removeClass('selected'); // у всех убираем класс 'selected'
        $(this).addClass('selected'); // текушей вкладке добавляем класс 'selected'
        return false;
    }).filter(':first').click();

    var Test = {
        settings: {
            addition: true,
            subtraction: false,
            multiplication: false,
            division: false
        },
        result: {
            success: 0,
            lose: 0
        },
        task: {
            exercise: '1',
            response: '',
            userAnswer: ''
        }
    };

    $("div.tabs div.entry button").click(function () {
        Test.task.userAnswer = $("input:text").val();
        Test.verifyAnswer();
        Test.task.userAnswer = '';
        Test.actualView();
        Test.getTask();
    })

    Test.initialView = function() {
        $("div.correct p").text(Test.result.success);
        $("div.incorrect p").text(Test.result.lose);
        $("input:text").val('')
        $("input[type = 'checkbox'].addtn").prop("checked", Test.settings.addition);
        $("input[type = 'checkbox'].subtr").prop("checked", Test.settings.subtraction);
        $("input[type = 'checkbox'].multp").prop("checked", Test.settings.multiplication);
        $("input[type = 'checkbox'].divsn").prop("checked", Test.settings.division);

    };
    Test.initialView();
    // Test.getTask();



    Test.validationUserAnswer = function() {
        // if(Test.task.userAnswer.length > 0 &&
        //    Test.task.userAnswer.isNumeric()  ) //only numbers, not null, great than 0
    };

    Test.setOperator = function() {
        Test.settings.addition = $("input[type = 'checkbox'].addtn").is(":checked");
        Test.settings.subtraction = $("input[type = 'checkbox'].subtr").is(":checked");
        Test.settings.multiplication = $("input[type = 'checkbox'].multp").is(":checked");
        Test.settings.division = $("input[type = 'checkbox'].divsn").is(":checked");
    };

    Test.getTask = function() {
        Test.setOperator();
        var getRandomNumber = function() {
            var number = Math.floor(Math.random() * 100);

            if (number === 0) { //ask customer if 0 is natural
                number = getRandomNumber();
            }
            return number;
        }
        var getOperator = function() {
            Test.settings.addition = $("input[type = 'checkbox'].addtn").is(":checked");
            Test.settings.subtraction = $("input[type = 'checkbox'].subtr").is(":checked");
            Test.settings.multiplication = $("input[type = 'checkbox'].multp").is(":checked");
            Test.settings.division = $("input[type = 'checkbox'].divsn").is(":checked");

            var signs = [];

            if (Test.settings.addition) {
                signs.push('+');
            }
            if (Test.settings.subtraction) {
                signs.push('-');
            }
            if (Test.settings.multiplication) {
                signs.push('*');
            }
            if (Test.settings.division) {
                signs.push('/');
            }
            return signs[Math.floor(Math.random() * signs.length)];
        }

        var right = getRandomNumber();
        var left = getRandomNumber();
        var operator = getOperator();

        // var left = 93;
        // var right = 17;
        // var operator = '*';

        if (operator == '-') {
            if(left < right) {
                var temp;
                temp = left;
                left = right;
                right = temp;
            }

            Test.task.response = left - right;
        }

        if (operator == '/') {
            for(; left % right;) {
                left = getRandomNumber();
                right = getRandomNumber();
                if(right == 1 || left == right) {
                    right = getRandomNumber();
                }
            }
            Test.task.response = left / right;
        }

        if (operator == '+') {
            if ((left + right) > 100) {
                left = 100 - left;
                right = 100 - right;
            }
            Test.task.response = left + right;
        }

        if (operator == '*') {
            for(; (left * right) > 100;) {
                left = Math.floor(100 / left);
                right = Math.floor(100 / right);
                if (left == 1 || right == 1) {
                    left = getRandomNumber();
                    right = getRandomNumber();
                }
            }
            Test.task.response = left + right;
        }

        Test.task.exercise = String(left) + ' ' + operator + ' ' + String(right) + ' = ?';
        $("div.tabs div.entry p.exercise").text(Test.task.exercise);
    };

    Test.getTask();




    // Test.initialView = function() {
    //     $("div.correct p").text(Test.result.success);
    //     $("div.incorrect p").text(Test.result.lose);
    //     $("input:text").val('')
    //     $("input[type = 'checkbox'].addtn").prop("checked", Test.settings.addition);
    //     $("input[type = 'checkbox'].subtr").prop("checked", Test.settings.subtraction);
    //     $("input[type = 'checkbox'].multp").prop("checked", Test.settings.multiplication);
    //     $("input[type = 'checkbox'].divsn").prop("checked", Test.settings.division);

    //     Test.getTask();
    // };
    // Test.initialView();


    Test.verifyAnswer = function() {
        if(Test.task.response == Test.task.userAnswer) {
            Test.result.success += 1;
        } else {
            Test.result.lose += 1;
        }
    };


    Test.actualView = function() {
        $("div.correct p").text(Test.result.success);
        $("div.incorrect p").text(Test.result.lose);
        $("input:text").val('')
    };

    
    // Test.getUserAnswer = function() {
    // };

    // Test.testing = function() {
    //     alert(Test.task.userAnswer);
    //     // Test.getUserAnswer();
    // };

    // Test.testing();

});