var rTimer;
var sds ;

TimeTick();

function TimeTick(){
sds =  new Date();
document.form1.tfield.value=" "+sds.getHours()+" : "+sds.getMinutes()+" : "+sds.getSeconds();
	if(rTimer){
		clearTimeout(rTimer);
	}
rTimer = setTimeout('TimeTick()', 1000);
}


