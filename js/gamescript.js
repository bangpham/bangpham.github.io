var over;
var score;
var moves;
var turn;
var wins = [7, 56, 448, 73, 146, 292, 273, 84];
var line = [
    [1,2,4],
    [8,16,32],
    [64,128,256],
    [1,8,64],
    [2,16,128],
    [4,32,256],
    [1,16,256],
    [4,16,64]
];


$(document).ready(function(){
    init();


    $(".box").click(function() {
        var id = $(this).attr('value');
        if ( over === true || $(this).html() || moves === 9) {
            return;
        }

        score[turn] += parseInt(id);
        $(this).html(turn);

        var test = this;
        $(test).css({"background-color" : "#178264", 'font-size': '1800px'});
        setTimeout(function () {
            $(test).css({"background-color": "#52D9A3", 'font-size': '35px'});
        }, 300);


        checkWinner();
        turn = turn === "X" ? "O" : "X";
        if (moves === 8 && over == false) {
            $('.status').html("DRAW");
            return;
        } else if (over) {
            $('.status').html(turn + " WINS");
        }else {
            $('.status').html(turn + " turn");
        }

        
        moves++;
    });


    $(".start").click(function() {
        init();
    });

    function init() {
        score = {"X": 0, "O": 0};
        moves = 0;
        turn = "X";
        over = false;
        $('.box').html("");
        $('.box').removeClass('boxwin');
        $('.status').html(turn + " turn");

    }

    function showWinner(sum) {
        switch (sum) {
            case 7:
                showWinner2(1, 2, 4);
                break;
            case 56:
                showWinner2(8, 16, 32);
                break;
            case 448:
                showWinner2(64, 128, 256);
                break;
            case 73:
                showWinner2(1, 8, 64);
                break;
            case 146:
                showWinner2(2, 16, 128);
                break;
            case 292:
                showWinner2(4, 32, 256);
                break;
            case 273:
                showWinner2(1, 16, 256);
                break;
            case 84:
                showWinner2(4, 16, 64);
                break;
        }
    }

    function checkWinner() {
        var i;
        var j;   
        for (i = 0; i < 8; i++) {     
            var sum = 0;
            for (j = 0; j < 3; j++) {
                var box = $("[value=" + line[i][j] + "]").html();
                if (box === turn) {
                    sum += line[i][j];
                    checkWinner2(sum);           
                }            
            }
        }
    }

    function checkWinner2(sum) {
        var x = wins.indexOf(sum);
        if (x !== -1) {
            over = true;
            showWinner(sum);
        }
    }

    function showWinner2(box1, box2, box3) {
        $("[value=" + box1 + "]").addClass('boxwin');
        $("[value=" + box2 + "]").addClass('boxwin');
        $("[value=" + box3 + "]").addClass('boxwin');
    }

});