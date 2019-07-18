/* =====================================贫困县地图分布====================================== */
var pk_option = {
	geo : {
		map : 'china',
		roam : true,
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle
	},
	title : {
		text : '贫困县-风貌',
		left : 'center',
		textStyle : titleTextStyle,
		subtextStyle : subTitleTextStyle
	},
	tooltip : {
		trigger : 'item',
		formatter : function(params) {
			return params.name;
		}
	},
	toolbox : {
		show : false,
		orient : 'vertical',
		left : 'right',
		top : 'center',
		feature : {
			dataView : {
				readOnly : false
			},
			restore : {},
			saveAsImage : {}
		},
		iconStyle : {
			normal : {
				color : '#fff'
			}
		}
	},
	legend : {
		top : screenScale * 50,
		data : [],
		itemGap : screenScale * 20,
		itemHeight : screenScale * 20,
		textStyle : legendTextStyle,
		selectedMode : 'single'
	},
	color : defaultColor,
	animationDuration : 1000,
	animationEasing : 'cubicOut',
	animationDurationUpdate : 1000
}

var pingkunChart = echarts.init(document.getElementById('pingkunCounty'));

function addCountryNames(divName, names) {
	var pDiv = $("#" + divName).empty();
	names.sort(function(x, y) {
		return x.code - y.code;
	});
	var proNameTitle;
	var proIndex = 0;
	var currentIndex = 0;
	names.forEach(function(n, i) {
		var proName = getCityName(n.code.substring(0, 2) + "0000");
		if (n.code.substring(2, 4) != "00") {
			var cityName = getCityName(n.code.substring(0, 4) + "00");
			if (cityName == undefined)
				cityName = codeToName[n.code.substring(0, 4) + "00"];

			proName = proName + cityName;
		}
		if (proName != proNameTitle) {
			pDiv.append("<div class='panel panel-default'><div class='panel-heading' role='tab' id='heading" + divName + proIndex + "'><h4 class='panel-title'><a " + (proIndex == 0 ? "" : "class='collapsed'") + "  role='button' data-toggle='collapse' data-parent='#" + divName + "' href='#collapse" + divName + proIndex + "' aria-expanded='" + (proIndex == 0 ? "true" : "false") + "' aria-controls='collapse" + divName + proIndex + "'   style='width:100%;height:100%;display: block;' title='"
					+ proName + "'>" + proName + "</a></h4></div><div id='collapse" + divName + proIndex + "' class='panel-collapse collapse" + (proIndex == 0 ? " in" : "") + "' role='tabpanel' aria-labelledby='headingOne" + divName + proIndex + "'><div class='panel-body' id='panelBody" + divName + proIndex + "'></div></div></div>");
			proNameTitle = proName;
			currentIndex = proIndex;
			proIndex++;
		}
		if (n.name != undefined) {
			var param = {
				name : n.name,
				value : 1
			}
			var panelBody = $("#panelBody" + divName + currentIndex);
			panelBody.append("<a class='countyBlock' href='javascript:showTabWhenClickCounty(" + JSON.stringify(param) + ",0)' title='" + n.name + "'>" + n.name + "<a>");
		}
	});
}

var compare = function(prop) {
	return function(obj1, obj2) {
		var val1 = obj1[prop];
		var val2 = obj2[prop];
		if (val1 < val2) {
			return -1;
		} else if (val1 > val2) {
			return 1;
		} else {
			return 0;
		}
	}
}

function addSeries(tagetChart, name, data) {
	var t = tagetChart.getOption();
	t.legend[0].data.push({
		name : name,
		icon : 'circle'
	});

	if ($("#" + pingkunChart._dom.id).data("legend"))
		t.legend[0].selected = $("#" + pingkunChart._dom.id).data("legend");

	t.series.push({
		name : name,
		type : 'scatter',
		coordinateSystem : 'geo',
		data : data,
		symbolSize : 10 * screenScale,
		symbol : "circle",
		label : false,
		tooltip : {
			trigger : 'item',
			formatter : function(params, ticket, callback) {
				if (params.seriesName == "风貌") {
					return params.name;
				} else {
					getDetails(params.seriesName, (cityMap[params.name] == undefined ? nameToCode[params.name] : cityMap[params.name]), ticket, callback);
				}
				return "Loading";
			}
		},

	});
	tagetChart.setOption(t, true);
}

function getDetails(name, code, ticket, callback) {
	console.log(code)
	$.ajax({
		url : 'show/queryProductByCode.html',
		type : 'get',
		data : {
			code : code
		},
		dataType : 'json',
		success : function(data) {
			var html = "暂无信息。";
			var tmp = [];
			if (name == "特产") {
				var tc_list = null;

				if (data != null && data.techan != undefined)
					tc_list = eval(data.techan.replace(/[\r\n]/g, ""))

				if (tc_list != null && tc_list.length > 0) {
					html = "<b>" + (idMapCity[code] == undefined ? codeToName[code] : idMapCity[code]) + "-特产</b> ：";

					tc_list.forEach(function(item) {
						item.title = item.title.replace(/(^\s*)|(\s*$)/g, '');
						if (item.title != "") {
							if (item['title'].length > 20)
								tmp.push(item['title'].substring(0, 20));
							else
								tmp.push(item['title']);
						}
					});

					html += tmp.join("，");
					delete tmp
				}
			} else if (name == "旅游资源") {
				var fzrq_list = null;

				if (data != null && data.lvyouziyuanjianjie != undefined)
					lyzy_list = eval(data.lvyouziyuanjianjie.replace(/[\r\n]/g, ""))

				if (lyzy_list != null && lyzy_list.length > 0) {
					html = "<b>" + (idMapCity[code] == undefined ? codeToName[code] : idMapCity[code]) + "-旅游资源</b> ：";

					lyzy_list.forEach(function(item) {
						item.title = item.title.replace(/(^\s*)|(\s*$)/g, '');
						if (item.title != "") {
							if (item['title'].length > 20)
								tmp.push(item['title'].substring(0, 20));
							else
								tmp.push(item['title']);
						}
					});

					html += tmp.join("，");
					delete tmp
				}
			} else if (name == "风土人情") {
				var fzrq_list = null;

				if (data != null && data.fengturenqingjieshao != undefined)
					fzrq_list = eval(data.fengturenqingjieshao.replace(/[\r\n]/g, ""))

				if (fzrq_list != null && fzrq_list.length > 0) {
					html = "<b>" + (idMapCity[code] == undefined ? codeToName[code] : idMapCity[code]) + "-风土人情</b> ：";
					fzrq_list.forEach(function(item) {
						item.title = item.title.replace(/(^\s*)|(\s*$)/g, '');
						if (item.title != "") {
							if (item['title'].length > 20)
								tmp.push(item['title'].substring(0, 20));
							else
								tmp.push(item['title']);
						}
					});
					html += tmp.join("，");
					delete tmp
				}
			}
			callback(ticket, html);
		}
	});
}

var datatmpCName = [];
var dataLYZYCName = [];
var dataFTRQCName = [];
function pk_getData(code) {
	if (Object.keys(nameToCode).indexOf(idMapCity[code]) != -1) {
		code = nameToCode[idMapCity[code]]
	}
	var codetmp = codeAnay(code);
	if (code == "000000")
		codetmp = null;

	$.ajax({
		url : 'api/getAdvantage.html',
		type : 'get',
		data : {
			code : code == "000000" ? null : codetmp
		},
		dataType : 'json',
		success : function(data) {
			var datatmp = [];
			var dataLYZY = [];
			var dataFTRQ = [];
			datatmpCName = [];
			dataLYZYCName = [];
			dataFTRQCName = [];
			data.forEach(function(item, i) {
				var itemName = (idMapCity[item.Code] == undefined ? codeToName[item.Code] : idMapCity[item.Code]);
				datatmpCName.push({
					name : itemName,
					code : item.Code
				});
				datatmp.push({
					name : itemName,
					value : [ parseFloat(item.Longtitude), parseFloat(item.Latitude) ]
				});
				if (parseFloat(item.LYZY) > 1) {
					dataLYZYCName.push({
						name : itemName,
						code : item.Code
					});
					dataLYZY.push({
						name : itemName,
						value : [ parseFloat(item.Longtitude), parseFloat(item.Latitude), parseFloat(item.LYZY) ],
						remark : item.LYZY
					});
				}

				if (parseFloat(item.FTRQ) > 1) {
					dataFTRQCName.push({
						name : itemName,
						code : item.Code
					});
					dataFTRQ.push({
						name : itemName,
						value : [ parseFloat(item.Longtitude), parseFloat(item.Latitude), parseFloat(item.FTRQ) ],
						remark : item.FTRQ
					});
				}

			});

			if (code != "000000") {
				addCountryNames("tmpCountryList", datatmpCName);
				addCountryNames("lyzyCountryList", dataLYZYCName);
				addCountryNames("ftrqCountryList", dataFTRQCName);
			} else {
				$("#tmpCountryList").empty();
				$("#lyzyCountryList").empty();
				$("#ftrqCountryList").empty();
			}

			addSeries(pingkunChart, "风貌", datatmp);
			addSeries(pingkunChart, "旅游资源", dataLYZY);
			addSeries(pingkunChart, "风土人情", dataFTRQ);
		},
		error : function(e, XMLHttpRequest, textStatus, errorThrown) {
			console.log(e);
		}
	});

}

function addNavigate(code) {
	var that = $("#navgate");
	that.empty();
	addBack(code);
	pk_showMap({
		name : idMapCity[code]
	});

	if (code == null || code == "000000")
		return;

	var p = code.substring(0, 2) + "0000";
	that.append("<li data-code='" + p + "' onclick=addNavigate('" + p + "');><a href='javascript:void(0);'>></a><a href='javascript:void(0);'>" + idMapCity[p] + "</a></li>");

	if (code.substring(2, 6) != "0000") {
		if (code.substring(4, 6) == "00")
			that.append("<li data-code='" + code + "' onclick=addNavigate('" + code + "');><a href='javascript:void(0);'>></a><a href='javascript:void(0);'>" + idMapCity[code] + "</a></li>");
		else {
			var c = code.substring(0, 4) + "00";
			var cityName = getCityName(c);
			if (idMapCity[c] != "重庆市" && cityName != "直辖县级行政区划") {
				that.append("<li data-code='" + c + "' onclick=addNavigate('" + c + "');><a href='javascript:void(0);'>></a><a href='javascript:void(0);'>" + idMapCity[c] + "</a></li>");
			}
			that.append("<li data-code='" + code + "' onclick=addNavigate('" + code + "');><a href='javascript:void(0);'>></a><a href='javascript:void(0);'>" + idMapCity[code] + "</a></li>");
		}
	}
}

// 生成贫困县地图
function pk_showMap(params) {
	console.log(params.name);
	
	var cityCode = cityMap[params.name];
	if (cityCode == undefined)
		return;

	getMapJson(cityMap[params.name], params, function(c, p, map) {
		var name = params.name;
		pk_option.geo.map = name;
		pingkunChart.setOption(pk_option, true);
		pk_getData(c);
	});
}

pingkunChart.on('click', function(params, ev) {
	showTabWhenClickCounty(params, ev);
});

function showTabWhenClickCounty(params, ev) {
	if (params.value == undefined) {
		addNavigate((cityMap[params.name] == undefined ? nameToCode[params.name] : cityMap[params.name]));
		$("#tmpCountryList").css("display", "block")
		$("#particulars").css("display", "none")
		$("#lyzyCountryList").css("display", "none")
		$("#ftrqCountryList").css("display", "none")
	} else {
		console.log(params.value, params.name)
		ad_getDetails(params, function() {
			var t = pingkunChart.getOption();
			console.log(t)
			var idx = 0;
			if (t.legend[0].selected["旅游资源"]) {
				idx = 2;
			} else if (t.legend[0].selected["风土人情"]) {
				idx = 3
			}

			$("#tmpCountryList").css("display", "none")
			$("#lyzyCountryList").css("display", "none")
			$("#ftrqCountryList").css("display", "none")

			$('#myTab li:eq(' + idx + ') a').tab('show');
			$("#particulars").css("display", "block")
		});
	}
}

$(document).delegate("#particulars", "mouseleave", function() {
	$(this).css("display", "none");
	if (pingkunChart.getOption().legend[0].selected["旅游资源"] == true)
		$("#lyzyCountryList").css("display", "block");
	else if (pingkunChart.getOption().legend[0].selected["风土人情"] == true)
		$("#ftrqCountryList").css("display", "block")
	else
		$("#tmpCountryList").css("display", "block")

});

pingkunChart.on('legendselectchanged', function(params) {
	var t = pingkunChart.getOption();
	t.title[0].text = "贫困县-" + params.name
	if (params.name == "风貌") {
		$("#tmpCountryList").css("display", "block")
		$("#lyzyCountryList").css("display", "none")
		$("#ftrqCountryList").css("display", "none")
	} else if (params.name == "旅游资源") {
		$("#tmpCountryList").css("display", "none")
		$("#lyzyCountryList").css("display", "block")
		$("#ftrqCountryList").css("display", "none")
	} else {
		$("#tmpCountryList").css("display", "none")
		$("#lyzyCountryList").css("display", "none")
		$("#ftrqCountryList").css("display", "block")
	}
	$("#particulars").css("display", "none");

	$("#" + pingkunChart._dom.id).data("legend", t.legend[0].selected);
	if (t.legend[0].selected["风貌"] == true) {
		t.visualMap = null;
	} else {
		t.visualMap = {
			min : 0,
			max : 15,
			left : 30,
			bottom : 100,
			calculable : true,
			realtime : true,
			seriesIndex : [ 1, 2 ],
			inRange : {
				symbolSize : [ 8 * screenScale, 25 * screenScale ],
				color : lineColor
			},
			textStyle : {
				color : '#fff'
			}
		};
	}
	pingkunChart.setOption(t, true);
});
pk_showMap({
	name : 'china'
});
/** *****************************************悬浮框展示*********************************** */
// 悬浮框展示
function advantageDetails(params, res) {
	$("#jianJie").empty();
	$("#teChan").empty();
	$("#fengTuRenQing").empty();
	$("#lvYouZiYuan").empty();
	$("#cityName").empty();
	// $("#cityName").append("<a href='/IPA/info.jsp?code=" +
	// cityMap[params.name] + "'>" + params.name + "</a>");
	$("#cityName").append("<a href='#'>" + params.name + "</a>");

	var cityData = res;
	if (!cityData) {
		$("#jianJie").append("暂无信息");
		$("#teChan").append("暂无信息");
		$("#fengTuRenQing").append("暂无信息");
		$("#lvYouZiYuan").append("暂无信息");
	}

	if (cityData.jianJie) {
		$("#jianJie").append(cityData.jianJie + "</br>")
	} else {
		$("#jianJie").append("暂无信息");
	}

	if (cityData.teChan.length > 0) {
		cityData.teChan.forEach(function(item) {
			if (item.img == undefined) {
				$("#teChan").append(item.title + (item.title == "" ? "" : ":") + item.content + "<br />");
			} else {
				$("#teChan").append("<div style='display:inline-block; clear:both;'><div style='display:block;float:left;margin-right: 8px;max-width:350px;'><img style='display:inline-block;text-align:center;width:100%;height:100%;' src='" + item.img.replace("http://p.gxyj.com", "assets/images") + "' alt='" + item.title + "' /><h4 class='text-center'>" + item.title + "</h4></div>" + item.content + "</div></div>")
			}
		});
	} else {
		$("#teChan").append("暂无信息");
	}

	if (cityData.fengTuRenQing.length > 0) {
		cityData.fengTuRenQing.forEach(function(item) {
			if (item.img == undefined) {
				$("#fengTuRenQing").append(item.title + (item.title == "" ? "" : ":") + item.content + "<br />");
			} else {
				$("#fengTuRenQing").append("<div style='display:inline-block; clear:both;'><div style='display:block;float:left;margin-right: 8px;max-width:350px;'><img style='display:inline-block;text-align:center;' src='" + item.img.replace("http://p.gxyj.com", "assets/images") + "' alt='" + item.title + "' /><h4 class='text-center'>" + item.title + "</h4></div>" + item.content + "</div></div>")
			}
		});
	} else {
		$("#fengTuRenQing").append("暂无信息");
	}

	if (cityData.lvyouziyuan.length > 0) {
		cityData.lvyouziyuan.forEach(function(item) {
			if (item.img == undefined) {
				$("#lvYouZiYuan").append(item.title + (item.title == "" ? "" : ":") + item.content + "<br />");
			} else {
				$("#lvYouZiYuan").append("<div style='display:inline-block; clear:both;'><div style='display:block;float:left;margin-right: 8px;max-width:350px;'><img style='display:inline-block;text-align:center;' src='" + item.img.replace("http://p.gxyj.com", "assets/images") + "' alt='" + item.title + "' /><h4 class='text-center'>" + item.title + "</h4></div>" + item.content + "</div></div>")
			}
		});
	} else {
		$("#lvYouZiYuan").append("暂无信息");
	}
}

function ad_getDetails(params, callback) {
	// var code
	// =(cityMap[params.name]==undefined?nameToCode[params.name]:cityMap[params.name]);
	var code = (nameToCode[params.name] == undefined ? cityMap[params.name] : nameToCode[params.name])
	$.ajax({
		url : 'show/queryProductByCode.html',
		type : 'get',
		data : {
			code : code
		},
		dataType : 'json',
		success : function(data) {
			console.log(data)
			if (data == null)
				return;

			var res = {
				jianJie : '',
				fengTuRenQing : [],
				fengTuRenQingImg : [],
				teChan : [],
				teChanImg : [],
				lvyouziyuan : [],
				lvyouziyuanImg : []
			};

			res.jianJie = data["jianjie"] || "暂无数据展示。";
			eval(data.fengturenqingjieshao).forEach(function(item, i) {
				item.title = item.title.replace(/\s+/g, "");

				if (item.title && !/^\s+$/.test(item.title)) {
					var fimgs = eval(data.fengturenqingimg).filter(function(x) {
						return x.title == item.title
					});
					var fimg = undefined;
					if (fimgs.length > 0)
						fimg = fimgs[0]
					res.fengTuRenQing.push({
						title : item.title,
						content : item.content,
						img : fimg == undefined ? undefined : fimg.content
					});
				} else {
					res.fengTuRenQing.push({
						title : "",
						content : item.content
					});
				}
			});

			eval(data.techan).forEach(function(item, i) {
				item.title = item.title.replace(/\s+/g, "");

				if (item.title && !/^\s+$/.test(item.title)) {
					var fimgs = eval(data.difangtechanimg).filter(function(x) {
						return x.title == item.title
					});
					var fimg = undefined;
					if (fimgs.length > 0)
						fimg = fimgs[0];
					res.teChan.push({
						title : item.title,
						content : item.content,
						img : fimg == undefined ? undefined : fimg.content
					});
				} else {
					res.teChan.push({
						title : item.title,
						content : item.content
					});
				}
			});

			eval(data.lvyouziyuanjianjie).forEach(function(item, i) {
				item.title = item.title.replace(/\s+/g, "");

				if (item.title && !/^\s+$/.test(item.title)) {
					var fimgs = eval(data.lvyouziyuanimg).filter(function(x) {
						return x.title == item.title
					});
					var fimg = undefined;
					if (fimgs.length > 0)
						fimg = fimgs[0]
					res.lvyouziyuan.push({
						title : item.title,
						content : item.content,
						img : fimg == undefined ? undefined : fimg.content
					});
				} else {
					res.lvyouziyuan.push({
						title : item.title,
						content : item.content
					});
				}
			});

			advantageDetails(params, res);

			if (callback != undefined)
				callback();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest, textStatus, errorThrown)
		}
	});
}

window.onresize = function() {
	pingkunChart.resize();
}
