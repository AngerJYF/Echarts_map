var fiveProjectChart = echarts.init(document.getElementById("fiveProjectMap"));
var fiveProjectTop = echarts.init(document.getElementById("fiveProjectTop"));

var fiveProjectCountyChart = echarts.init(document.getElementById("fiveProjectCountyMap"));
var fiveProjectCountyTop = echarts.init(document.getElementById("fiveProjectCountyTop"));

var projectArr = [ "信息服务", "网络覆盖", "网络扶智", "农村电商", "网络公益" ];
// 公用option
var five_option = {
	title : {
		text : '五大工程进展',
		left : 'center',
		textStyle : titleTextStyle
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
		inactiveColor : '#93a7c1',
		textStyle : legendTextStyle,
		selectedMode : 'single'
	},
	color : defaultColor,
	series : [],
	animationDuration : 1000,
	animationEasing : 'cubicOut',
	animationDurationUpdate : 1000
}

function addSeries(targetChart, name, result) {
	var t = targetChart.getOption();
	var mapdata = [];
	var data = result.data;
	var map = result.map;
	var topData = (result.pointData || []);
	var allcity = (result.allcity || [])
	t.title[0].text = map == 'china' ? "全国五大工程进展" : map + "五大工程进展";
	data.forEach(function(item) {
		if (item.value > 0) {
			mapdata.push(item);
		}
	})
	if (map != 'china') {
		allcity.forEach(function(x) {
			var f = data.filter(function(y) {
				return y.name == x;
			});

			if (f == undefined || f == null || f.length == 0) {
				data.push({
					name : x,
					value : 0
				});
			}
		});
	}

	t.legend[0].data.push({
		name : name,
		icon : 'circle'
	});

	if ($("#" + targetChart._dom.id).data("legend") != undefined)
		t.legend[0].selected = $("#" + targetChart._dom.id).data("legend");

	t.visualMap = {
		min : 0,
		// max : res[0].value,
		max : 800,
		bottom : 120,
		calculable : true,
		realtime : true,
		inRange : {
			color : mapColor
		},
		textStyle : {
			color : '#fff'
		}
	};
	t.series.push({
		name : name,
		type : 'map',
		mapType : map,
		top : '10%',
		// left : map == "china" ? '12%' : '20%',
		zoom : map == "china" ? 1 : 0.8,
		roam : true,
		data : mapdata,
		showLegendSymbol : false,
		z : 1,
		nameMap : {
			'china' : '中国'
		},
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle,
		markPoint : {
			symbol : "image://assets/images/In_topPoint.png",
			symbolSize : [ 15, 15 ],
			data : topData,
			label : {
				normal : {
					formatter : function(params) {
						if (params.data) {
							return params.name + ":" + params.data.coord[2];
						} else {
							return params.name + "：暂无消息";
						}
					},
					position : 'right',
					show : false
				},
				emphasis : {
					show : false
				}
			},
			itemStyle : {
				normal : {
					color : '#F06C00'
				}
			}
		},
	});
	targetChart.setOption(t, true);
}

function addCountySeries(targetChart, seriesName, map, data) {
	var t = targetChart.getOption();
	t.title[0].text = map == 'china' ? "全国贫困县五大工程进展" : map + "贫困县五大工程进展";

	t.legend[0].data.push({
		name : seriesName,
		icon : 'circle'
	});

	if ($("#" + targetChart._dom.id).data("legend") != undefined)
		t.legend[0].selected = $("#" + targetChart._dom.id).data("legend");

	t.visualMap = {
		min : 0,
		max : 1,
		bottom : 120,
		calculable : true,
		realtime : true,
		inRange : {
			symbolSize : [ 10, 25 ],
			color : lineColor
		},
		textStyle : {
			color : '#fff'
		}
	};

	t.series.push({
		name : seriesName,
		type : 'scatter',
		coordinateSystem : 'geo',
		symbolSize : [ 15, 15 ],
		symbolOffset : [ 0, '50%' ],
		symbol : 'circle',
		data : data,
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				return params.name + "<br/>" + seriesName + "-推进力度" + "&nbsp;:&nbsp;" + params.value[2];
			}
		},
		nameMap : {
			'china' : '中国'
		},
		itemStyle : {
			normal : {}
		}
	});
	targetChart.setOption(t, true);
}

function setTooltip(targetChart, str) {
	var t = targetChart.getOption();
	t.tooltip = {
		trigger : 'item',
		formatter : function(params) {
			var res = params.name + str;// '-五大工程新闻报道数量<br/>';
			var t = targetChart.getOption();
			var myseries = t.series;
			for (var i = 0; i < myseries.length; i++) {
				for (var j = 0; j < myseries[i].data.length; j++) {
					if (myseries[i].data[j].name == params.name) {
						res += myseries[i].name + ' : ' + (myseries[i].data[j].value == undefined ? 0 : myseries[i].data[j].value) + '&nbsp;次</br>';

					}
				}
			}
			return res;
		}
	};
	targetChart.setOption(t, true);
}

function addNavigate(code) {
	var that = $("#navgate").empty();

	init(getCityName(code));

	addBack(code);

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

function getSelectedSeries(targetChart) {
	var t = targetChart.getOption();
	var selectedLegend = Object.keys(t.legend[0].selected).filter(function(x) {
		return t.legend[0].selected[x] == true;
	});

	var selectedSeries = t.series.filter(function(x) {
		return x.name == selectedLegend[0];
	});
	return selectedSeries[0]
}

// 没用
function getFiveProject(name) {
	var xAxis_data = [ '2013', '2014', '2015', '2016', '2017' ];
	var legend_data = [ '网络覆盖', '农村电商', '网络扶智', '信息服务', '网络公益' ];

	var area_obj = newsJson[name];
	var validData = {};
	for ( var key in area_obj) {
		for ( var p in positionJson) {
			if (p.substring(0, 2) == key.split("_")[0].substring(0, 2))
				validData[key] = area_obj[key];
		}
	}

	var tmp = {};

	xAxis_data.forEach(function(item) {
		if (tmp[item] == undefined)
			tmp[item] = [ 0, 0, 0, 0, 0 ];

		legend_data.forEach(function(y, i) {
			var value = 0;

			for ( var key in validData) {
				if (validData[key]["data"][item] == undefined || validData[key]["data"][item][y] == undefined)
					continue;

				value += validData[key]["data"][item][y].value;
			}

			tmp[item][legend_data.indexOf(y)] = value;
		});
	});

	updateChart(fiveProjectByYear, {
		title : (name == 'china' ? '全国五大工程进展趋势' : name + '五大工程进展趋势'),
		color : categoryColor,
		chartType : "bar",
		stack : "汇总",
		legend : xAxis_data,
		xData : legend_data,
		yData : tmp,
		grid : {},
		showSumLine : false,
		showYAxisLabel : false
	});
}

function five_getData(name, allcity) {
	var area_obj = newsJsonInArr[name];
	var data = {};
	for ( var key in area_obj) {
		var code_ = key.split("_")[0];
		var name_ = getCityName(code_);
		var _prefix = null;

		if (code_.substring(2, 6) == "0000") {
			_prefix = code_.substring(0, 2);
		} else if (code_.substring(4, 6) == "00") {
			_prefix = code_.substring(0, 4);
		} else {
			_prefix = code_;
		}
		if (_prefix != null && !isPkx(_prefix))
			continue;

		if (area_obj[key]['data'] == undefined)
			break;

		if (area_obj[key]['data']['all'] != undefined) {
			var fiveJson = area_obj[key]['data']['all'];

			fiveJson.forEach(function(d, i) {
				if (data[projectArr[i]] == undefined) {
					data[projectArr[i]] = {
						data : [],
						map : name
					}
				}
				data[projectArr[i]]['data'].push({
					name : name_,
					value : d
				})
			})
		}
	}

	var data0 = data;
	projectArr.forEach(function(key) {
		if (data0[key] == undefined) {
			data0[key] = {
				data : [],
				map : name
			}
		}
		var topData = data0[key].data;
		topData.sort(function(x, y) {
			return y.value - x.value;
		});
		var index = 0;
		var pointData = [];
		topData.forEach(function(p) {
			// 排名前五
			// if (geoCoordMap[p.name] != undefined && index < 5) {
			// pointData.push({
			// name : p.name,
			// coord : geoCoordMap[p.name].concat(p.value)
			// });
			// }

			// 深度贫困地区

			if (p.name == "山西" || p.name == "云南" || p.name == "西藏" || p.name == "青海" || p.name == "新疆") {
				pointData.push({
					name : p.name,
					coord : geoCoordMap[p.name].concat(p.value)
				})
			}
			index++;
		});
		data0[key].pointData = pointData;
		data0[key].allcity = allcity;
	});

	return data0

};

function loadTopCity(targetChart, data, seriesName, map) {
	data.sort(function(x, y) {
		return (y.value || 0) - (x.value || 0);
	});
	var gridSetting = {
		top : '10%',
		containLabel : true
	};

	if (data.length < 10) {
		gridSetting = $.extend(true, gridSetting, {
			height : data.length * 5 + '%'
		});
	} else {
		gridSetting = $.extend(true, gridSetting, {
			height : '70%'
		});
	}
	showTop(targetChart, seriesName, data, 10, {
		grid : gridSetting,
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'cross',
				label : {
					backgroundColor : '#6a7985'
				}
			},
			formatter : function(params) {
				var html = "";
				for (var i = params.length - 1; i >= 0; i--) {
					if (i == params.length - 1) {
						var code = getCityCode(params[i].name);
						if (getCityName(code.substring(0, 2) + '0000') != undefined && (code.substring(0, 2) + '0000') != code)
							html += getCityName(code.substring(0, 2) + '0000') + "-";
						if (getCityName(code.substring(0, 4) + '00') != undefined && (code.substring(0, 4) + '00') != code)
							html += getCityName(code.substring(0, 4) + '00') + "-";
						html += params[i].name + "</br>";
					}

					var color;
					if (params[i].color instanceof Object) {
						color = params[i].color.colorStops[1].color
					} else {
						color = params[i].color
					}
					html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + ';"></span>' + params[i].seriesName + ': ' + params[i].value + '</br>'
				}
				return html;
			}
		}
	});
};

function drawMap(targetChart, params) {
	var name = params.name;
	var code = cityMap[name];
	if (code == undefined)
		return;
	getMapJson(code, params, function(c, p, map) {
		five_option.series = [];
		targetChart.setOption($.extend(true, p.option || {}, five_option), true);

		var allcity = map.features.map(function(x) {
			return x.properties.name
		});

		if (p.callback)
			p.callback(p, allcity);
	});
};

function getCountyData(name) {
	var topName = name; 
	var tmp = {}; 
	var tmpCode = codeAnay(getCityCode(topName));
	var newPositionJson;
	if (tmpCode == '000000') {
		newPositionJson = positionJson;
	} else {
		newPositionJson = findDict(positionJson, function(x) {
			if (x.indexOf(tmpCode) == 0)
				return x;
		})
	}
	projectArr.forEach(function(proj, i) {
		if (tmp[proj] == undefined)
			tmp[proj] = []
		for ( var code in newPositionJson) {
			var name = idMapCity[code];
			if (name == undefined)
				continue;
			for ( var fullName in newsJsonInArr[name]) {
				var data = newsJsonInArr[name][fullName];
				if (data == undefined || data['data'] == undefined || data['data']['all'] == undefined)
					continue;
				var d = data['data']['all'][i]
				if (d <= 0)
					continue; 
				tmp[proj].push({
					name : name,
					value : positionJson[code].concat(d)
				});

			}
		}
	}) 
	return tmp; 
};

function refreshTopBar(sourceChart, targetChart, params) {
	var selectedSeries = getSelectedSeries(sourceChart);
	var data = [];
	var map = "";
	if (params == undefined) {
		data = selectedSeries.data.map(function(d) {
			if ($.isArray(d.value)) {
				return {
					name : d.name,
					value : d.value[2]
				}
			} else {
				return d
			}
		})
	}

	if (selectedSeries.map == undefined)
		map = sourceChart.getOption().geo[0].map
	else
		map = selectedSeries.map

	loadTopCity(targetChart, data, selectedSeries.name, map);
}

// 地图点击事件
fiveProjectChart.on('click', function(params) {
	addNavigate(cityMap[params.name]);
});

fiveProjectCountyChart.on('click', function(params) {
	if (params.value != undefined)
		return;
	addNavigate(cityMap[params.name]);
})

fiveProjectChart.on('legendselectchanged', function(params) {
	fiveProjectCountyChart.dispatchAction({
		type : 'legendSelect',
		name : params.name
	});

	refreshTopBar(fiveProjectChart, fiveProjectTop);

	refreshTopBar(fiveProjectCountyChart, fiveProjectCountyTop);

	refreshvisualMap(fiveProjectChart);
	refreshvisualMap(fiveProjectCountyChart, function(m) {
		return m / 5;
	});
	var t = fiveProjectChart.getOption();
	$("#" + fiveProjectChart._dom.id).data("legend", t.legend[0].selected);

	var t = fiveProjectCountyChart.getOption();
	$("#" + fiveProjectCountyChart._dom.id).data("legend", t.legend[0].selected);
});

fiveProjectCountyChart.on('legendselectchanged', function(params) {
	fiveProjectChart.dispatchAction({
		type : 'legendSelect',
		name : params.name
	});

	refreshTopBar(fiveProjectChart, fiveProjectTop);

	refreshTopBar(fiveProjectCountyChart, fiveProjectCountyTop);

	refreshvisualMap(fiveProjectChart);
	refreshvisualMap(fiveProjectCountyChart, function(m) {
		return m / 5;
	});
	
	var t = fiveProjectChart.getOption();
	$("#" + fiveProjectChart._dom.id).data("legend", t.legend[0].selected);

	var t = fiveProjectCountyChart.getOption();
	$("#" + fiveProjectCountyChart._dom.id).data("legend", t.legend[0].selected);

});

window.onresize = function() {
	fiveProjectChart.resize();
	fiveProjectCountyChart.resize();
	fiveProjectTop.resize();
	fiveProjectCountyTop.resize();
}

function init(name) {
	drawMap(fiveProjectChart, {
		name : name,
		callback : function(p, allcity) {
			var data = five_getData(p.name, allcity);
			for ( var proj in data) {
				addSeries(fiveProjectChart, proj, data[proj]);
			}

			setTooltip(fiveProjectChart, '-五大工程推进力度<br/>');
			refreshvisualMap(fiveProjectChart);

			var title = '各省五大工程进展排名';
			if (name != 'china') {
				var code = getCityCode(name);
				if (name == '北京' || name == '天津' || name == '上海' || name == '重庆') {
					title = name + "各县五大工程进展排名";
				} else if (isProvince(code)) {
					title = name + "各市五大工程进展排名";
				} else if (isCity(code)) {
					title = name + "各县五大工程进展排名";
				} else {
					title = name + "五大工程进展排名";
				}
			}
			var _option = $.extend(true, echartsDefaultOption, {
				title : {
					text : title
				}
			})
			fiveProjectTop.setOption(_option, true);
			refreshTopBar(fiveProjectChart, fiveProjectTop);
		}
	});

	drawMap(fiveProjectCountyChart, {
		name : name,
		option : {
			geo : {
				top : '11%',
				map : name,
				show : true,
				roam : true,
				zoom : 1.1,
				label : mapLabelStyle,
				itemStyle : mapAreaItemStyle
			}
		},
		callback : function(p, allcity) {
			var data = getCountyData(p.name);
			
			for (var proj in data){
				addCountySeries(fiveProjectCountyChart, proj, p.name,data[proj]);
			}
			refreshvisualMap(fiveProjectCountyChart, function(m) {
				return m / 5;
			});
			setTooltip(fiveProjectCountyChart, '推进力度：</br>');
			
			var title = "各县(区)五大工程进展排名";
			if (name != 'china') {
				var code = getCityCode(name);
				if (isCounty(code)) {
					title = name + "五大工程进展排名";
				} else {
					title = name + "各县(区)五大工程进展排名";
				}
			}
			var _option = $.extend(true, echartsDefaultOption, {
				title : {
					text : title
				}
			})
			fiveProjectCountyTop.setOption(_option, true);
			refreshTopBar(fiveProjectCountyChart, fiveProjectCountyTop)
		}
	});
}

init("china");
