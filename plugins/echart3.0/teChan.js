var mapCodeToJsonCode = {
	"360782" :"360703",
	"451025" :"451081",
	"652200" :"650500",
	"652222" :"650521",
	"652223" :"650522",
	"542324" : "540223",
	"542325" : "540224",
	"542326" : "540225",
	"542327" : "540226",
	"542328" : "540227",
	"542329" : "540228",
	"542330" : "540229",
	"542331" : "540230",
	"542332" : "540231",
	"542333" : "540232",
	"542334" : "540233",
	"542335" : "540234",
	"542336" : "540235",
	"542337" : "540236",
	"542338" : "540237",
	"542400" : "542400",
	"542421" : "542421",
	"542422" : "542422",
	"542423" : "542423",
	"542424" : "542424",
	"542425" : "542425",
	"542426" : "542426",
	"542427" : "542427",
	"542428" : "542428",
	"542429" : "542429",
	"542430" : "542430",
	"542431" : "542431",
	"542500" : "542500",
	"542521" : "542521",
	"542522" : "542522",
	"542523" : "542523",
	"542524" : "542524",
	"542525" : "542525",
	"542526" : "542526",
	"542527" : "542527",
	"542600" : "540400",
	"542621" : "540402",
	"542622" : "540421",
	"542623" : "540422",
	"542624" : "540423",
	"542625" : "540424",
	"542626" : "540425",
	"542627" : "540426",
	"540100" : "540100",
	"540101" : "540101",
	"540102" : "540102",
	"540121" : "540121",
	"540122" : "540122",
	"540123" : "540123",
	"540124" : "540124",
	"540125" : "540103",
	"540126" : "540126",
	"540127" : "540127",
	"542100" : "540300",
	"542121" : "540302",
	"542122" : "540321",
	"542123" : "540322",
	"542124" : "540323",
	"542125" : "540324",
	"542126" : "540325",
	"542127" : "540326",
	"542128" : "540327",
	"542129" : "540328",
	"542132" : "540329",
	"542133" : "540330",
	"542200" : "540500",
	"542221" : "540502",
	"542222" : "540521",
	"542223" : "540522",
	"542224" : "540523",
	"542225" : "540524",
	"542226" : "540525",
	"542227" : "540526",
	"542228" : "540527",
	"542229" : "540528",
	"542231" : "540529",
	"542232" : "540530",
	"542233" : "540531",
	"542300" : "540200",
	"542301" : "540202",
	"542322" : "540221",
	"542323" : "540222"
}

var jsonCodeToName = {
		"360703":"南康区",
		"650500" :"哈密市",
		"650521" :"巴里坤哈萨克自治县",
		"650522" :"伊吾县",
		"451081":"靖西市",
	"540223" : "定日县",
	"540224" : "萨迦县",
	"540225" : "拉孜县",
	"540226" : "昂仁县",
	"540227" : "谢通门县",
	"540228" : "白朗县",
	"540229" : "仁布县",
	"540230" : "康马县",
	"540231" : "定结县",
	"540232" : "仲巴县",
	"540233" : "亚东县",
	"540234" : "吉隆县",
	"540235" : "聂拉木县",
	"540236" : "萨嘎县",
	"540237" : "岗巴县",
	"542400" : "那曲地区",
	"542421" : "那曲县",
	"542422" : "嘉黎县",
	"542423" : "比如县",
	"542424" : "聂荣县",
	"542425" : "安多县",
	"542426" : "申扎县",
	"542427" : "索县",
	"542428" : "班戈县",
	"542429" : "巴青县",
	"542430" : "尼玛县",
	"542431" : "双湖县",
	"542500" : "阿里地区",
	"542521" : "普兰县",
	"542522" : "札达县",
	"542523" : "噶尔县",
	"542524" : "日土县",
	"542525" : "革吉县",
	"542526" : "改则县",
	"542527" : "措勤县",
	"540400" : "林芝市",
	"540402" : "巴宜区",
	"540421" : "工布江达县",
	"540422" : "米林县",
	"540423" : "墨脱县",
	"540424" : "波密县",
	"540425" : "察隅县",
	"540426" : "朗县",
	"540100" : "拉萨市",
	"540101" : "市辖区",
	"540102" : "城关区",
	"540103" : "堆龙德庆区",
	"540121" : "林周县",
	"540122" : "当雄县",
	"540123" : "尼木县",
	"540124" : "曲水县",
	"540126" : "达孜县",
	"540127" : "墨竹工卡县",
	"540300" : "昌都市",
	"540302" : "卡若区",
	"540321" : "江达县",
	"540322" : "贡觉县",
	"540323" : "类乌齐县",
	"540324" : "丁青县",
	"540325" : "察雅县",
	"540326" : "八宿县",
	"540327" : "左贡县",
	"540328" : "芒康县",
	"540329" : "洛隆县",
	"540330" : "边坝县",
	"540500" : "山南市",
	"540502" : "乃东区",
	"540521" : "扎囊县",
	"540522" : "贡嘎县",
	"540523" : "桑日县",
	"540524" : "琼结县",
	"540525" : "曲松县",
	"540526" : "措美县",
	"540527" : "洛扎县",
	"540528" : "加查县",
	"540529" : "隆子县",
	"540530" : "错那县",
	"540531" : "浪卡子县",
	"540200" : "日喀则市",
	"540202" : "桑珠孜区",
	"540221" : "南木林县",
	"540222" : "江孜县"
}

var mapNameToJsonKeyName={
	"日喀则市":"日喀则地区",
	"丰宁满族自治县":"丰宁县",
	"兰州市城关区":"城关区"
}

function getJsonKeyName(name){
	if(mapNameToJsonKeyName[name]==undefined)
		return name;
	return mapNameToJsonKeyName[name];
}
function getTeChanCityCode(code){
	if(mapCodeToJsonCode[code]!=undefined)
		return mapCodeToJsonCode[code];
	else
		return code;
}
function getTeChanCityName(code) {
	if(jsonCodeToName[code]!=undefined)
		return jsonCodeToName[code];
	else 
		return (getCityName(code)==undefined?codeToName[code]:getCityName(code));
}


var teChanChart = echarts.init(document.getElementById('teChan'));
var tc_option = {
	geo : {
		map : 'china',
		roam : false,
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle
	},
	title : {
		text : '贫困县-特产分布',
		left : 'center',
		textStyle : titleTextStyle
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
	animationDuration : 1000,
	legend : {
		show : false,
		left : 20,
		top : 5,
		data : [],// , '风土人情','特产' ],
		itemGap : 20,
		itemHeight : 20,
		textStyle : legendTextStyle,
		orient : "vertical",
		selectedMode : 'single'
	},
	color : defaultColor,
	animationEasing : 'cubicOut',
	animationDurationUpdate : 1000
}

function addNavigate(code) {
	var that = $("#navgate").empty();

	tc_showMap({
		name : getCityName(code)
	});

	addBack(code);

	if (code == null || code == "000000")
		return;

	var p = parseProvinceCode(code);
	that.append("<li data-code='" + p + "' onclick=addNavigate('" + p + "');><a href='javascript:void(0);'>></a><a href='javascript:void(0);'>" + idMapCity[p] + "</a></li>");

	if (!isProvince(code)) {
		if (isCity(code))
			that.append("<li data-code='" + code + "' onclick=addNavigate('" + code + "');><a href='javascript:void(0);'>></a><a href='javascript:void(0);'>" + idMapCity[code] + "</a></li>");
		else {
			var c = parseCityCode(code);
			var cityName = getCityName(c);
			if (idMapCity[c] != "重庆市" && cityName != "直辖县级行政区划") {
				that.append("<li data-code='" + c + "' onclick=addNavigate('" + c + "');><a href='javascript:void(0);'>></a><a href='javascript:void(0);'>" + idMapCity[c] + "</a></li>");
			}
			that.append("<li data-code='" + code + "' onclick=addNavigate('" + code + "');><a href='javascript:void(0);'>></a><a href='javascript:void(0);'>" + idMapCity[code] + "</a></li>");
		}
	}
}

function addSeries(tagetChart, name, data) {
	var t = tagetChart.getOption();
	if (name != true) {
		t.legend[0].data.push({
			name : name,
			icon : 'circle'
		});
	}

	t.series.push({
		name : name,
		type : 'scatter',
		coordinateSystem : 'geo',
		data : data,
		legendHoverLink : false,
		symbolSize : [ 13, 13 ],
		symbol : 'circle',
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				return params.name;
			}
		},
		label : {
			normal : {
				formatter : '{b}',
				position : 'right',
				show : false
			},
			emphasis : {
				show : false
			}
		},
		itemStyle : {
			normal : {
			// color : '#F06C00'
			}
		}
	});
	t.color = defaultColor;
	tagetChart.setOption(t, true);
}

function updataSeries(tagetChart, name, data) {
	var t = tagetChart.getOption();
	t.series.forEach(function(series, i) {
		if (series.name == name) {
			t.series[i].data = data;
			return;
		}
	})
	tagetChart.setOption(t, true);
}

function tc_getData(code, bigClassName) {
	var data = techanJsonWithCode['000000'];
	var _prefix = getPrefix(code);
	if (bigClassName == undefined)
		$("#bigClass ul").empty();

	var other = {};
	var firstClass;
	var j = 1;
	var test = {};
	var testArry = [];
	for ( var key in data) {
		test[key] = [];
		if (j == 1)
			firstClass = key;
		var datatmp = [];
		for ( var _code in data[key]) {
			if (_prefix == undefined) {
				datatmp.push({
					name:getTeChanCityName(_code),
					//name : (getCityName(_code) == undefined ? codeToName[_code] : getCityName(_code)),
					//name:(getTeChanCityName(getTeChanCityCode(_code))==undefined?codeToName[_code]:getTeChanCityName(getTeChanCityCode(_code))),
					value : getPosition(_code),
					data : data[key][_code]
				})
			} else if (_code.substring(0, _prefix.length) == _prefix) {
				//console.log(_code.substring(0, _prefix.length))
				datatmp.push({
					name:getTeChanCityName(_code),
					//name : (getCityName(_code) == undefined ? codeToName[_code] : getCityName(_code)),
					//name:(getTeChanCityName(getTeChanCityCode(_code))==undefined?codeToName[_code]:getTeChanCityName(getTeChanCityCode(_code))),
					value : getPosition(_code),
					data : data[key][_code]
				})
			}
			if (getPosition(_code) == undefined && _code != 'img') {
				if (test[key].indexOf(_code) == -1) {
					test[key].push(_code)
				}
				if (testArry.indexOf(_code) == -1) {
					testArry.push(_code)
				}
			}
		}
		if (bigClassName != undefined) {
			if (bigClassName == key)
				return datatmp;
			else
				continue;
		}

		if (key == "其他")
			other[key] = datatmp
		else if (datatmp.length > 0)
			addSeries(teChanChart, key, datatmp);
		//console.log(datatmp)
		if (datatmp.length > 0) {
			if (j == 1)
				firstClass = key
			var part = $("<li><img src='" + (data[key].img == null ? "assets/images/defaulttc.jpg" : data[key].img) + "' style='border-radius:5px;' alt='" + key + "' /><p class='opacityTitle' style='bottom:-5px;'>" + j + "." + key + "</p></li>")
			part.data("source", key);
			part.data("code", code)
			$("#bigClass ul").append(part);
			j++;
		}

	}
	if (other["其他"] != undefined && other["其他"].length > 0)
		addSeries(teChanChart, "其他", other["其他"]);

	getReidoData(firstClass, code);
	other = undefined;
}

function refreshClassData(code, bigClassName) {
	var data = tc_getData(code, bigClassName)
	// var datatmp = [];
	// for ( var key in data) {
	// if (key == bigClassName) {
	// for ( var _code in data[key]) {
	// datatmp.push({
	// name : idMapCity[_code],
	// value : positionJson[_code],
	// data : data[key][_code]
	// })
	// }
	// break;
	// }
	// }
	updataSeries(teChanChart, bigClassName, data);

	getReidoData(bigClassName, code);
	datatmp = [];
}

// 生成贫困县地图
function tc_showMap(params) {
	var cityCode = cityMap[params.name];
	if (cityCode == undefined)
		return;

	getMapJson(cityCode, params, function(c, p, map) {
		var name = p.name;
		tc_option.geo.map = name;
		teChanChart.setOption(tc_option, true);
		tc_getData(getTeChanCityCode(c));
	});
}

function getReidoData(classifyName, code) {

	var data = {}, data0 = techanJsonWithClassify[classifyName];

	var _prefix = getPrefix(code);

	if (_prefix == undefined) {
		data = data0
	} else {
		for ( var smallClassName in data0) {
			var tmpClass = {};
			for ( var _code in data0[smallClassName]) {
				if (_prefix == _code.substring(0, _prefix.length) && _code != 'img') {
					tmpClass[_code] = data0[smallClassName][_code]
				}
			}
			if ($.isEmptyObject(tmpClass))
				continue;
			if (data0[smallClassName]['img'] != undefined)
				tmpClass['img'] = data0[smallClassName]['img']

			data[smallClassName] = tmpClass
		}
	}
	$("#redio").empty();

	if (!$.isEmptyObject(data)) {
		for ( var key in data) {
			var part = $("<div class='col-md-4 col-sm-4 item'><div style='position:relative;'><img src='" + (data[key].img == null ? "assets/images/defaulttc.jpg" : data[key].img) + "' alt='" + key + "' /><p class='opacityTitle' style='border-bottom-left-radius: 5px;border-bottom-right-radius: 5px'>" + key + "</p></div></div>")
			part.data("source", data[key]);
			part.data("classifyName", classifyName)
			$("#redio").append(part);
		}
	}
}

// 点选按钮选中事件
$(document).delegate("#bigClass img", "click", function() {
	var bigClassname = $(this).parent().data("source");
	var code = $(this).parent().data("code");

	$("#bigClass").find(".activeFeature").removeClass("activeFeature");
	$(this).parent().find("p").addClass("activeFeature");

	teChanChart.dispatchAction({
		type : 'legendSelect',
		name : bigClassname
	});

	refreshClassData(code, bigClassname);
});

$(document).delegate(".techan-classify .next", "click", function() {
	var container = $("#bigClass ul li");
	if (container.length > 0) {
		var cl = container.first().clone(true);
		container.first().remove();

		$("#bigClass ul").append(cl);
	}
});

$(document).delegate(".techan-classify .pre", "click", function() {
	var container = $("#bigClass ul li");
	if (container.length > 0) {
		var cl = container.last().clone(true);
		container.last().remove();

		$("#bigClass ul").prepend(cl);
	}
});

$(document).delegate("#redio>div", "click", function() {
	var data = $(this).data("source");

	$("#redio").find(".activeFeature").removeClass("activeFeature");
	$(this).find("p").addClass("activeFeature");

	var classifyName = $(this).data("classifyName");
	var datatmp = [];
	if (data) {
		for ( var code in data) {
			datatmp.push({
				//name : (getCityName(code)==undefined?codeToName[code]:getCityName(code)),
				name:(getTeChanCityName(getTeChanCityCode(code))==undefined?codeToName[code]:getTeChanCityName(getTeChanCityCode(code))),
				value : getPosition(code),
				data : data[code]
			})
		}
	}
	updataSeries(teChanChart, classifyName, datatmp);
});

teChanChart.on('click', function(params, ev) {
	if (params.value == undefined) {
		addNavigate(getCityCode(params.name), params);
	} else {
		var cityName =getJsonKeyName(params.name);
		$("#cityModal .modal-title").html(cityName + "特产");
		$("#cityModal .modal-body").empty();
		var path;
		for ( var key in params.data.data) {
			//console.log(cityName + "..." + key)
			//console.log("当前查询的县数据json中的key为：" + teChanImgs[cityName])
			if (teChanImgs[cityName] == undefined) {
				cityName = getShortName(cityName);

			} else if (teChanImgs[cityName] == undefined)
				path = "";
			else if (teChanImgs[cityName][key] == undefined)
				path = '';
			else
				path = teChanImgs[cityName][key];
			$("#cityModal .modal-body").append("<div style='position:relative;width:30%;margin-left:35%'><img src='" + (path == "" ? "assets/images/defaulttc.jpg" : path) + "' alt='" + key + "' /><p style='text-align: center;'>" + key + "</p></div>");
			$("#cityModal .modal-body").append(params.data.data[key] + "<br ><br >");
		}
		$("#cityModal").modal("show");
	}
});

teChanChart.on('legendselectchanged', function(params, ev) {
	refreshClassData(params.name);
});

tc_showMap({
	name : 'china'
});

window.onresize = function() {
	teChanChart.resize();
}