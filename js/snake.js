$(function () {

    //绘制蛇移动的方格
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 30; j++) {
            var r = Math.floor(Math.random() * 8);
            var g = Math.floor(Math.random() * 15);
            var b = Math.floor(Math.random() * 255);
            var color = 'rgba(' + r + ',' + g + ',' + b + ',0.4)';
            $('<div>')
                .addClass('block')
                .attr('id', i + '_' + j)
                .css('backgroundColor', color)
                .appendTo('.container');
        }
    };
    var snake = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}];
    var snaketab = {'0_0': true, '0_1': true, '0_2': true};

    function findDiv(x, y) {
        return $('#' + x + '_' + y);
    };

    $.each(snake, function (i, v) {
        findDiv(v.x, v.y).addClass('snake');
    });

    direction = 'right';

    //键盘事件
    $(document).on('keyup', function (e) {
        var setTab = {'left': 37, 'top': 38, 'right': 39, 'bottom': 40}
        var tab = {37: 'left', 38: 'top', 39: 'right', 40: 'bottom'};
        if (Math.abs(e.keyCode - setTab[direction]) == 2) {
            return;
        }

        if (tab[e.keyCode]) {
            direction = tab[e.keyCode];
        }
    });

    //蛇移动函数
    move = function () {
        var oldhd = snake[snake.length - 1];
        if (direction == 'right') {
            var newhd = {x: oldhd.x, y: oldhd.y + 1};
        }
        if (direction == 'left') {
            var newhd = {x: oldhd.x, y: oldhd.y - 1};
        }
        if (direction == 'top') {
            var newhd = {x: oldhd.x - 1, y: oldhd.y};
        }
        if (direction == 'bottom') {
            var newhd = {x: oldhd.x + 1, y: oldhd.y};
        }

        if (snaketab[newhd.x + '_' + newhd.y]) {
            clearInterval(timerId);
            alert('撞到自己了！');
            return;
        }

        if (newhd.x < 0 || newhd.x > 19 || newhd.y < 0 || newhd.y > 29) {
            clearInterval(timerId);
            alert('撞死');
            return;
        }

        snake.push(newhd);
        snaketab[newhd.x + '_' + newhd.y] = true;
        findDiv(newhd.x, newhd.y).addClass('snake');
        if (newhd.x == food.x && newhd.y == food.y) {
            findDiv(food.x, food.y).removeClass('food');
            food = setfood();
        } else {
            var foot = snake.shift();

            delete snaketab[foot.x + '_' + foot.y];

            findDiv(foot.x, foot.y).removeClass('snake');
        }


    };
    //放食物
    function setfood() {
        do {
            var x = Math.floor(Math.random() * 20);
            var y = Math.floor(Math.random() * 30);
        } while (snaketab[x + '_' + y]);

        findDiv(x, y).addClass('food');
        return {x: x, y: y};
    };

    var food = setfood();
    //游戏开始
    var start = $('.start');
    var timerId;
    start.on('click', function () {
        timerId = setInterval(move, 150);
    });
    //游戏暂停
    var pause = $('.pause');
    pause.on('click', function () {
        clearInterval(timerId);
    });

    //通过键盘控制游戏的开始和暂停
    var flag=true;
    $(document).on('keyup',function(e){
        if(flag){
            if(e.keyCode==32){
                clearInterval(timerId);
                flag=!flag;
            }
            else{
                return;
            }
        }
        else{
            if(e.keyCode==32){
                timerId = setInterval(move, 150);
                flag=!flag;
            }
            else{
                return;
            }
        }
    });

    //游戏重新开始
    var restart=$('.restart');
    restart.on('click',function(){
        window.location.reload();
    });

})