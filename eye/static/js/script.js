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