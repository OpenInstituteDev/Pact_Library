// JavaScript Document
//+-------------------------------------
//+ function for encode and decode
//+-------------------------------------
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function randomString() {
	//var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 6;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * keyStr.length);
		randomstring += keyStr.substring(rnum,rnum+1);
	}
	//document.randform.randomfield.value = randomstring;
	return randomstring;
}

// for encode and decode

function encode64(input) {
	input = escape(input);
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	
	do {
	chr1 = input.charCodeAt(i++);
	chr2 = input.charCodeAt(i++);
	chr3 = input.charCodeAt(i++);
	
	enc1 = chr1 >> 2;
	enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	enc4 = chr3 & 63;
	
	if (isNaN(chr2)) {
	enc3 = enc4 = 64;
	} else if (isNaN(chr3)) {
	enc4 = 64;
	}
	
	output = output +
	keyStr.charAt(enc1) +
	keyStr.charAt(enc2) +
	keyStr.charAt(enc3) +
	keyStr.charAt(enc4);
	chr1 = chr2 = chr3 = "";
	enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	
	return output;
}

function decode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	
	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) {
	alert("There were invalid base64 characters in the input text.\n" +
	"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
	"Expect errors in decoding.");
	}
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
	do {
	enc1 = keyStr.indexOf(input.charAt(i++));
	enc2 = keyStr.indexOf(input.charAt(i++));
	enc3 = keyStr.indexOf(input.charAt(i++));
	enc4 = keyStr.indexOf(input.charAt(i++));
	
	chr1 = (enc1 << 2) | (enc2 >> 4);
	chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	chr3 = ((enc3 & 3) << 6) | enc4;
	
	output = output + String.fromCharCode(chr1);
	
	if (enc3 != 64) {
	output = output + String.fromCharCode(chr2);
	}
	if (enc4 != 64) {
	output = output + String.fromCharCode(chr3);
	}
	
	chr1 = chr2 = chr3 = "";
	enc1 = enc2 = enc3 = enc4 = "";
	
	} while (i < input.length);
	
	return unescape(output);
}

//+--------------------------------------------------
//+ function for close, add, edit, delete and view record
//+--------------------------------------------------

function Reset(url){
	document.location = url;
}
function ConfirmClose(url){
	document.location = 'admin.php?content='+url;
}
//function ConfirmAdd(url) {
//	document.location = url;
//}
function ConfirmAdd(url) {
	document.location = 'admin.php?content='+url+'&cate=1';
}

function ConfirmEdit(url, num_row) {
	var count=0;
	var chk_e="";
	var comma="";
	var code_do="";
	for(i=1; i<=num_row; i++){
		var chkname="chk"+i;
		var chk=document.getElementById(chkname).checked;
		var hidname="hid"+i;
		var hid=document.getElementById(hidname).value;
		var val=document.getElementById(chkname).value;
		if(chk==true){
			count=count+1;
			chk_e=hid.substr(0,1);	
			code_do=code_do+comma+val;
			comma=",";
		}
	}
	
	if(count==1){
		// check edit change this Y to N mean that allow edit or need to alert random string
		if(chk_e=="Y"){
			//alert("Do you want to edit records ?");
			//document.location = url+"?e=1&code_do="+code_do;
			//document.location = 'admin.php?content='+url+'&cate=2&code_do='+code_do;
			document.location = 'admin.php?content='+url+'&cate=2&code='+code_do;
		}else{
			var ran_string=randomString();
			//var ran_string="chanra";
			var en_string=encode64(ran_string);
			var input_string=prompt("Please enter decode of encode text below : ", en_string);
			if ( input_string!=null && input_string!=""){
				if(input_string==ran_string){
					//document.location = url+"?e=1&code_do="+code_do;
				//document.location = 'admin.php?content='+url+'&cate=2&code_do='+code_do;
					document.location = 'admin.php?content='+url+'&cate=2&code='+code_do;
				}else{
					alert("Please enter decode text correctly !");
				}
			}
		}
	}else{
		alert("Please select your record correctly !");
	}
}

function ConfirmDelete(url, num_row, num_row_all) {
	var count=0;
	var comma="";
	var code_do="";
	for(i=1; i<=num_row; i++){
		var chkname="chk"+i;
		var chk=document.getElementById(chkname).checked;
		var hidname="hid"+i;
		var hid=document.getElementById(hidname).value;
		var val=document.getElementById(chkname).value;
		if(chk==true && hid.substr(2,1)=="Y"){ /*change Y to N mean that not allow to delete record */
			count=count+1;	
			code_do=code_do+comma+val;
			comma=",";
		}
	}
	
	if(count>0){
		if(count==num_row_all){
			code_do="all";
		}
		if (confirm("Are you sure you want to delete ?")) {
			//document.location = url+"?d=1&code_do="+code_do;
			document.location = 'admin.php?content='+url+'&del=1&code='+code_do;

		}
	}else{
		alert("Please select your record correctly !");
	}
}
function ConfirmView(url, num_row, num_row_all) {
	var count=0;
	var comma="";
	var code_do="";
	for(i=1; i<=num_row; i++){
		var chkname="chk"+i;
		var chk=document.getElementById(chkname).checked;
		var val=document.getElementById(chkname).value;
		if(chk==true){
			count=count+1;	
			code_do=code_do+comma+val;
			comma=",";
		}
	}
	
	if(count>0){
		if(count==num_row_all){
			window.open(url+"?view=1&code=all");
			//window.open(url+"?view=1&code_do=all");
		}else{
			window.open(url+"?view=1&code="+code_do);
			//window.open(url+"?view=1&code_do="+code_do);
		}
	}else{
		alert("Please select your record correctly !");
	}
}
// browse new popup windows
function MyPopUpWin(url) {
	var winWidth;
	var winHeight;
	var iMyWidth;
	var iMyHeight;
	//half the screen width minus half the new window width (plus 5 pixel borders).
	winWidth = window.screen.width - 300;
	iMyWidth = (window.screen.width/2) - ((winWidth/2) + 10);
	//half the screen height minus half the new window height (plus title and status bars).
	winHeight = window.screen.height-400;
	iMyHeight = (window.screen.height/2) - ((winHeight/2) + 50);
	//Open the window.
	var Mywin = window.open(url,"_blank","status=no,height="+winHeight+",width="+winWidth+",resizable=yes,left=" + iMyWidth + ",top=" + iMyHeight + ",screenX=" + iMyWidth + ",screenY=" + iMyHeight + ",toolbar=no,menubar=no,scrollbars=yes,location=no,directories=no");
	Mywin.focus();
}
//---------------------------------------------------
