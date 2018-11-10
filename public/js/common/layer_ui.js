// s:iframe layer open
var fm_all = null;
var div = null;
var layerdiv = null;
var fm = null;

function coverScreen() {
	var h = parseInt(document.documentElement.scrollHeight) + "px";
	var w = parseInt(document.body.offsetWidth) + "px";

	div = document.getElementById("layer_pop_box");

	document.body.appendChild(div);

	document.body.onresize = document.body.onresizestart = document.body.onresizeend = document.body.onscroll = function () {
		layerdiv.style.left = (parseInt(document.documentElement.clientWidth) / 2) - (parseInt(layerdiv.style.width) / 2) + 'px';
	}

	layerdiv = document.createElement("div");
	layerdiv.style.width = 400;
	layerdiv.style.height = 400;
	layerdiv.style.left = (parseInt(document.documentElement.clientWidth) / 2) - (parseInt(layerdiv.style.width) / 2) + 'px';
	layerdiv.style.top = (parseInt(document.documentElement.clientHeight) / 2) - (parseInt(layerdiv.style.height) / 2) + 'px';
	layerdiv.style.position = "absolute";
	layerdiv.style.zIndex = 9990;
	layerdiv.style.display = "none";
	layerdiv.style.backgroundColor = "transparent";
	layerdiv.style.color = "#FFFFFF";
	document.body.appendChild(layerdiv);
	
	//아이프레임으로 넣기
	fm = document.createElement("iframe");
	fm.id = "iframe_pop";
	fm.style.width = "100%";
	fm.style.height = "100%";
	fm.allowTransparency = "true";
	fm.style.backgroundColor = "transparent";
	fm.frameBorder = "0";
	fm.style.margin = "0";
	layerdiv.appendChild(fm);

}
function showLayer(_w, _h, _src) {
	if (div == null) {
		coverScreen();
		//coverScreen("/public/payment/PC/back");
	}
	layerdiv.style.width = _w + 'px';
	layerdiv.style.height = _h + 'px';
	layerdiv.style.left = (parseInt(document.documentElement.clientWidth) / 2) - (parseInt(layerdiv.style.width) / 2) + 'px';
	layerdiv.style.top = ((parseInt(document.documentElement.clientHeight) / 2) + (parseInt(document.body.scrollTop + document.documentElement.scrollTop))) - (parseInt(_h) / 2) + 'px';
	fm.src = _src;
	div.style.display = "block";
	layerdiv.style.display = "block";
}
function hideLayer() {
	div.style.display = "none";
	layerdiv.style.display = "none";
	fm.src = "";
}
// e:iframe layer open