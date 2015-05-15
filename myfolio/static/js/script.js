var eb = document.getElementById('eyeball')
var r = 15;
var valve = false;
var mx = my=0;
document.addEventListener('mousemove',function(e){
    /*  if(!valve){
     setTimeout(function(){
     valve = true;
     },200);
     return;
     }
     valve= false;*/
    var x = e.pageX;
    var y = e.pageY;

    var cx = window.innerWidth/2;
    var cy = window.innerHeight/2;
    var dx = x-cx;
    var dy = y-cy;
    var d = Math.sqrt(dx*dx+dy*dy);

    mx = r * dx / d;
    my = r * dy / d;

    if(d<20 && d>-20){
        mx = 0;
        my = 0;
    }
})

setInterval(function(){
    eb.style.transform='translate('+mx+'px,'+my+'px)';
},200);

$(document).ready(function () {
    var dp = new VF_datepicker();
    dp.datepicker({
        'name': 'form1',
        'start': null,
        'end': null,
        'monthNames': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        'dayNames': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        'startCtrl': $('#fromDisplay'),
        'endCtrl': $('#toDisplay'),
        'startDisplay': $('#fromDisplay'),
        'endDisplay': $('#toDisplay'),
        'startInput': $('#fromInput'),
        'endInput': $('#toInput'),
        'startDP': $('#startDP'),
        'endDP': $('#endDP'),
        'clearTxt': 'Clear dates',
        'displayFrom': function(from, to){
            console.log(['from display', from, to]);
        },
        'displayTo': function(from, to){
            console.log(['to display', from, to]);
        },
        'fromChosen': function(from, to){
            console.log(['from chosen', from, to]);
        },
        'toChosen': function(from, to){
            console.log(['to chosen', from, to]);
        },
        'hideFrom': function(from, to){
            console.log(['from hide', from, to]);
        },
        'hideTo': function(from, to){
            console.log(['to hide', from, to]);
        },
        'positions': ['left']
    });

    var dp2 = new VF_datepicker();
    dp2.datepicker({
        'name': 'form2',
        'start': null,
        'end': null,
        'monthNames': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        'dayNames': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        'startCtrl': $('#fromDisplay2'),
        'endCtrl': $('#toDisplay2'),
        'startDisplay': $('#fromDisplay2'),
        'endDisplay': $('#toDisplay2'),
        'startInput': $('#fromInput2'),
        'endInput': $('#toInput2'),
        'startDP': $('#startDP2'),
        'endDP': $('#endDP2'),
        'clearTxt': 'Clear dates',
        'displayFrom': function(from, to){
            console.log(['from display2', from, to]);
        },
        'displayTo': function(from, to){
            console.log(['to display2', from, to]);
        },
        'fromChosen': function(from, to){
            console.log(['from chosen2', from, to]);
        },
        'toChosen': function(from, to){
            console.log(['to chosen2', from, to]);
        },
        'hideFrom': function(from, to){
            console.log(['from hide2', from, to]);
        },
        'hideTo': function(from, to){
            console.log(['to hide2', from, to]);
        },
        'positions': ['left']
    });
});