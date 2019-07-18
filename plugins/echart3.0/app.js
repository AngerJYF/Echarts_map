//地图容器
var symbolColor = {
	'推进力度' : '#3B6FF5',
	'脱贫率' : '#CC5402',
	'人均收入增幅' : '#F53BAD'
};

var chart = echarts.init(document.getElementById('main'));
var mainCityChart = echarts.init(document.getElementById('mainCity'));
// var FPJZchart = echarts.init(document.getElementById('FPJZ'));
var FPJZtopChart = echarts.init(document.getElementById('FPJZTop'));
var mainCityFPJZchart = echarts.init(document.getElementById('mainCityFPJZ'));

function rd(n, m) {
	var c = m - n + 1;
	return Math.floor(Math.random() * c + n);
}

// 获取数据根据地名获取成效数据展示获取
function getDataByName(name) {
	var res = [];
	var _data = newsJson[name];
	if (name == '重庆') {
		_data = $.extend(true, _data, newsJson['县']);
	}
	for ( var d in _data) {

		var _prefix = null;
		var _cityCode = d.split('_')[0];
		var _cityName = getCityName(_cityCode);

		if (_cityCode.substring(2, 6) == "0000") {
			_prefix = _cityCode.substring(0, 2);
		} else if (_cityCode.substring(4, 6) == "00") {
			_prefix = _cityCode.substring(0, 4);
		} else {
			_prefix = _cityCode;
		}
		if (_prefix != null && !isPkx(_prefix))
			continue;
		res.push({
			id : d.split("_")[0],
			value : _data[d]["value"]
		});
	}

	res.sort(function(x, y) {
		return y.value - x.value;
	});
	var index = 0;
	var t = chart.getOption();
	t.legend[0].data = [];
	for (var i = 0; i < t.series.length; i++) {
		t.series[i].data = [];
	}

	t.visualMap = {
		min : 0,
		// max : res[0].value,
		max : (res[0] == undefined ? 0 : res[0].value),
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

	var tmp = {
		'推进力度' : [],
		'脱贫率' : [],
		'人均收入增幅' : [],
		'top' : []
	};

	res.forEach(function(p) {
		if (getCityName(p.id) == undefined)
			console.log(p)
		tmp['推进力度'].push({
			name : getCityName(p.id),
			value : p.value
		});

		tmp['人均收入增幅'].push({
			name : idMapCity[p.id],
			value : Math.round(Math.random() * 50)
		});

		tmp['脱贫率'].push({
			name : idMapCity[p.id],
			value : Math.round(Math.random() * 30)
		});

		// 排名前五
		// if (geoCoordMap[idMapCity[p.id]] != undefined && index < 5) {
		// tmp['top'].push({
		// name : idMapCity[p.id],
		// coord : geoCoordMap[idMapCity[p.id]].concat(p.value)
		// });
		// }

		// 深度贫困地区
		var pName = getCityName(p.id);
		if (pName == "山西" || pName == "云南" || pName == "西藏" || pName == "青海" || pName == "新疆") {
			tmp['top'].push({
				name : pName,
				coord : geoCoordMap[pName].concat(p.value)
			})
		}

		index++;
	});

	t.series.forEach(function(item, i) {
		t.legend[0].data.push({
			name : item.name,
			icon : 'circle'
		});

		if (item.name == '推进力度') {
			t.series[i].data = tmp[item.name];
			t.series[i].markPoint.data = tmp['top'];

			var gridSetting = {
				top : '8%',
				containLabel : true
			};

			if (tmp[item.name].length < 10) {
				gridSetting = $.extend(true, gridSetting, {
					height : tmp[item.name].length * 6 + '%'
				});
			} else {
				gridSetting = $.extend(true, gridSetting, {
					height : '70%'
				});
			}

			var title = "各省网络扶贫进展排名";
			if (name != 'china') {
				var code = getCityCode(name);
				if (name == '北京' || name == '天津' || name == '上海' || name == '重庆') {
					title = name + "市辖区网络扶贫进展排名";
				} else if (isProvince(code)) {
					title = name + "各市网络扶贫进展排名";
				} else if (isCity(code)) {
					title = name + "各县网络扶贫进展排名";
				} else {
					title = name + "网络扶贫进展排名";
				}
			}

			showTop(FPJZtopChart, item.name, tmp[item.name], 10, {
				grid : gridSetting,
				title : title
			});
		} else {
			t.series[i].data = tmp[item.name];
		}
	});

	chart.setOption(t, true);
	setTooltip(chart);
	refreshvisualMap(chart);
}

// 根据地名获取扶贫进展数据
function getDataFPJZ(name) {
	var legend_data = [ '推进力度' ];
	var xAxis_data = [ '2013', '2014', '2015', '2016', '2017' ];

	var area_obj = newsJson[name];
	var validData = {};
	for ( var key in area_obj) {
		for ( var p in positionJson) {
			if (p.substring(0, 2) == key.split("_")[0].substring(0, 2))
				validData[key] = area_obj[key];
		}
	}

	var tmp = {};
	legend_data.forEach(function(item) {
		tmp[item] = [ 0, 0, 0, 0, 0 ];
	});

	xAxis_data.forEach(function(y, i) {
		var value = 0;

		for ( var key in validData) {
			if (validData[key]["data"][y] == undefined)
				continue;

			for ( var subkey in validData[key]["data"][y]) {
				value += validData[key]["data"][y][subkey]['value'];

			}
		}

		tmp['推进力度'][i] = value == 'NaN' ? 0 : value;
	});

	// var total = tmp['推进力度'].reduce(function(a, b) {
	// return (a == "NaN" ? 0 : a) + (b == "NaN" ? 0 : b);
	// });
	//	
	// tmp['推进力度'].forEach(function(item, i) {
	// if (total == 0)
	// tmp['推进力度'][i] = 0
	// else
	// tmp['推进力度'][i] = ((item / total) * 100).toFixed(0);
	// });

	updateChart(FPJZchart, {
		title : name == 'china' ? '全国网络扶贫进展' : name + '网络扶贫进展',
		chartType : "bar",
		color : categoryColor,
		legend : legend_data,
		xData : xAxis_data,
		yData : tmp,
		XboundaryGap : true,
		showSumLine : false,
		showYAxisLabel : true,
		inside : false,
		stack : "汇总",
		yName : '推进力度',
		xName : '年份',
		x : {
			axisLine : {
				show : true,
				lineStyle : {
					color : labelColor
				}
			}
		},
		y : {
			axisLine : {
				show : true,
				lineStyle : {
					color : labelColor
				}
			},
			axisTick : {
				show : true,
				lineStyle : {
					color : labelColor
				}
			}
		},
		grid : {
			height : '70%',
			bottom : '2%',
			containLabel : true
		}
	});
}

// 地图点击触发事件，地图变化，数据更新
function mapChange(params) {
	var name = params.name;
	showMap(chart, name);
	showMap(mainCityChart, name);
	loadPKXData(name);
	getDataByName(name);
	// getDataFPJZ(params.name);
};

function addNavigate(code) {
	var that = $("#navgate");
	that.empty();
	addBack(code);
	if (code == null)
		code = "000000";

	var name = idMapCity[code];
	getMapJson(code, {
		name : name,
		id : code
	}, function(c, p, map) {
		mapChange(p);
	});

	if (code == null || code == "000000") {
		return;
	}

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

// 初始化绘制全国地图配置
var option;
function setTooltip(targetChart) {
	var t = targetChart.getOption();
	t.tooltip = {
		trigger : 'item',
		formatter : function(params) {
			var res = params.name + '-网络扶贫效果：<br/>';

			var t = chart.getOption();
			var myseries = t.series;
			for (var i = 0; i < myseries.length; i++) {
				for (var j = 0; j < myseries[i].data.length; j++) {
					if (myseries[i].data[j].name == params.name) {
						res += myseries[i].name + ' : ' + (myseries[i].data[j].value == undefined ? 0 : myseries[i].data[j].value) + (myseries[i].name == "推进力度" ? "&nbsp;</br>" : '&nbsp;%</br>');
					}
				}
			}

			return res;
		}
	};
	targetChart.setOption(t, true);
}

// 绘制地图
function showMap(targetChart, map) {
	var cityCode = cityMap[map];
	if (cityCode == undefined)
		return;

	option = {
		type : 'china',
		geo : {
			map : map,
			show : false,
			roam : true,
			label : mapLabelStyle,
			itemStyle : mapAreaItemStyle,
		},
		visualMap : {
			max : 4000,
			calculable : true,
			bottom : 120,
			inRange : {
				color : mapColor
			},
			textStyle : {
				color : '#fff'
			}
		},
		title : [ {
			text : map == 'china' ? "全国网络扶贫进展" : map + "网络扶贫进展",
			left : 'center',
			textStyle : titleTextStyle
		} ],
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
		color : defaultColor,
		legend : {
			// left : 0,
			show : false,
			top : screenScale * 50,
			itemGap : screenScale * 20,
			itemHeight : screenScale * 20,
			textStyle : legendTextStyle,
			// orient : "vertical",
			data : [ {
				name : "推进力度",
				icon : 'circle'
			} ],
			inactiveColor : '#93a7c1',
			selected : {
				'推进力度' : true
			},
			selectedMode : 'single'
		},
		animationDuration : 1000,
		animationEasing : 'cubicOut',
		animationDurationUpdate : 1000,
		series : [ {
			name : '推进力度',
			type : 'map',
			mapType : map,
			top : '8%',
			left : 'center',// map == 'china' ? '12%' : '20%',
			roam : true,
			nameMap : {
				'china' : '中国'
			},
			label : mapLabelStyle,
			itemStyle : mapAreaItemStyle,
			showLegendSymbol : false,
			data : [],
			markPoint : {
				symbol : "image://assets/images/In_topPoint.png",// "image://assets/images/timg.png",
				symbolSize : [ 15 * screenScale, 15 * screenScale ],
				data : [],
				label : {
					normal : {
						formatter : function(params) {
							if (params.value) {
								return params.name + ":" + params.value[2];
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
			}
		} ]
	};
	// 渲染地图
	targetChart.setOption(option, true);
};

function legendSelected(targetChart, name) {
	targetChart.dispatchAction({
		type : 'legendSelect',
		// 图例名称
		name : name
	})

	var t = targetChart.getOption();
	t.series.forEach(function(item, i) {
		if (item.name == name) {
			var data = t.series[i].data;
			data.sort(function(a, b) {
				if (a.value[2] == undefined || b.value[2])
					return b.value[2] - a.value[2];
				else
					return (b.value == undefined ? 0 : b.value) - (a.value == undefined ? 0 : a.value);
			});
			showTop(targetChart, name, data, 20);
		}
	});
}

function addSeries(targetChart, name, data) {
	var t = targetChart.getOption()
	t.legend[0].data.push(name);
	t.legend[0].selected = {
		'推进力度' : true
	}
	t.visualMap = {
		min : 0,
		max : 200,
		bottom : 120,
		calculable : true,
		realtime : true,
		inRange : {
			symbolSize : [ 5, 25 ],
			color : lineColor
		},
		textStyle : {
			color : '#fff'
		}
	};

	t.series.push({
		name : name,
		type : 'scatter',
		coordinateSystem : 'geo',
		data : data,
		symbolSize : [ 15, 15 ],
		symbolOffset : [ 0, '50%' ],
		symbol : 'circle',
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				return params.name + "-" + name + "&nbsp;:&nbsp;" + params.value[2] + (name == "推进力度" ? "" : "%");
			}
		},
		label : {
			normal : {
				formatter : function(params, ticket, callback) {
					return params.name;
				},
				position : 'right',
				show : false
			},
			emphasis : {
				show : false
			}
		}
	});

	targetChart.setOption(t, true);
}
function loadPKXData(name) {
	var p = mainCityChart.getOption();
	p.title[0].text = name == "china" ? "全国贫困县网络扶贫进展" : name + "贫困县网络扶贫进展";

	p.grid = [];
	p.xAxis = [];
	p.yAxis = [];

	p.visualMap = {
		min : 0,
		max : 200,
		bottom : 80,
		calculable : true,
		realtime : true,
		inRange : {
			symbolSize : [ 5, 25 ]
		},
		textStyle : {
			color : '#fff'
		}
	};

	p.geo = {
		map : name,
		show : true,
		roam : true,
		top : '9%',
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle,
	};

	p.series = [];
	p.legend[0].data = [];
	p.legend[0].selectedMode = 'single';
	mainCityChart.setOption(p, true);

	var tmp = {
		'推进力度' : []
	};

	var hot = {};
	var tmpCode = codeAnay(cityMap[name]);
	var newPositionJson;
	if (tmpCode == '000000') {
		newPositionJson = positionJson;
	} else {
		newPositionJson = findDict(positionJson, function(x) {
			if (x.indexOf(tmpCode) == 0)
				return x;
		})
	}

	for ( var code in newPositionJson) {
		var cityName = getCityName(code);
		if (cityName != undefined) {
			for ( var fullName in newsJson[cityName]) {

				var value = newsJson[cityName][fullName]['value']
				if (value != undefined && value > 0) {
					hot[cityName] = positionJson[code].concat(value);
				}
			}
		}
	}

	for ( var key in hot) {
		tmp['推进力度'].push({
			name : key,
			value : hot[key]
		});
	}

	var ii = 0;
	for ( var key in tmp) {
		addSeries(mainCityChart, key, tmp[key]);

		if (ii == 0) {
			tmp[key].sort(function(a, b) {
				return b.value[2] - a.value[2];
			});
			var gridSetting = {
				top : '8%',
				containLabel : true
			};

			if (tmp[key].length < 20) {
				gridSetting = $.extend(true, gridSetting, {
					height : tmp[key].length * 5 + '%'
				});
			}

			var title = "各县(区)网络扶贫进展排名";
			if (name != 'china') {
				var code = getCityCode(name);
				if (isCounty(code)) {
					title = name + "网络扶贫进展排名";
				} else {
					title = name + "各县(区)网络扶贫进展排名";
				}
			}

			showTop(mainCityFPJZchart, key, tmp[key], 20, {
				title : title,
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

								if (getCityName(code.substring(0, 2) + '0000') != undefined)
									html += getCityName(code.substring(0, 2) + '0000') + "-";
								if (getCityName(code.substring(0, 4) + '00') != undefined)
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
		}

		ii++;
	}
	refreshvisualMap(mainCityChart, function(m) {
		return m / 10;
	});
	delete hot, tmp;
	setTooltip(mainCityChart);
}

// 地图点击事件
chart.on('click', function(params) {
	if (unClickCitys.indexOf(params.name) >= 0)
		return;
	addNavigate(cityMap[params.name]);
});
mainCityChart.on('click', function(params) {
	if (params.value != undefined || (unClickCitys.indexOf(params.name) >= 0)) {
		return;
	}
	addNavigate(cityMap[params.name]);
})
chart.on('legendselectchanged', function(params) {
	legendSelected(mainCityChart, params.name);
	var t = chart.getOption();
	t.series.forEach(function(item, i) {
		if (item.name == params.name) {
			var data = t.series[i].data;

			data.sort(function(a, b) {
				return (b.value == undefined ? 0 : b.value) - (a.value == undefined ? 0 : a.value);
			});
			showTop(FPJZtopChart, params.name, data, 10);
		}
	});
	refreshvisualMap(chart);
	refreshvisualMap(mainCityChart, function(m) {
		return m / 10;
	});
})
mainCityChart.on('legendselectchanged', function(params) {
	legendSelected(chart, params.name);
	var t = mainCityChart.getOption();
	t.series.forEach(function(item, i) {
		if (item.name == params.name) {
			var data = t.series[i].data;
			data.sort(function(a, b) {
				return b.value[2] - a.value[2];
			});
			showTop(mainCityFPJZchart, params.name, data, 20);
		}
	});
	refreshvisualMap(chart);
	refreshvisualMap(mainCityChart, function(m) {
		return m / 10;
	});
})
// 初始化图表
function Init(map) {
	$("#navgate").empty();

	getMapJson("000000", {
		name : map
	}, function(c, p, m) {
		showMap(chart, p.name);
		getDataByName(p.name);

		showMap(mainCityChart, p.name);
		loadPKXData(p.name);
	});

	echartsDefaultOption.title.text = '各县网络扶贫进展排名';
	mainCityFPJZchart.setOption(echartsDefaultOption, true);

	echartsDefaultOption.title.text = '网络扶贫进展排名';
	FPJZtopChart.setOption(echartsDefaultOption, true);

	echartsDefaultOption.title.text = '网络扶贫进展';

	// FPJZchart.setOption($.extend(true, echartsDefaultOption, {
	// title : {
	// top : 10 * screenScale + '%'
	// }
	// }), true);

	// getDataFPJZ("china");
}

window.onresize = function() {
	chart.resize();
	mainCityChart.resize();
	// FPJZchart.resize();
	FPJZtopChart.resize();
	mainCityFPJZchart.resize();
}

$(function() {
	Init("china");
});
