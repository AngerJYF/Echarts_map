var years = [ "2013", "2014", "2015", "2016", "2017" ];
var legends = [ "网络覆盖", "农村电商", "网络扶智", "信息服务", "网络公益" ];
var screenScale = 2;
var bigTitleTextStyle = {
	color : '#fff',
	fontSize : 20 * screenScale,
	fontWeight : 'normal',
	fontFamily : "微软雅黑"
};

var bigSubTitleTextStyle = {
	color : '#fff',
	fontSize : 15 * screenScale,
	fontWeight : 'normal',
	fontFamily : "微软雅黑"
}

var bigLegendTextStyle = {
	color : '#fff',
	fontSize : 16 * screenScale,
	fontWeight : 'normal',
	fontFamily : "微软雅黑"
}

var bigLabelTextStyle = {
	color : '#fff',
	fontSize : 15 * screenScale,
	fontWeight : 'normal',
	fontFamily : "微软雅黑"
};

var bigMapLabelTextStyle = {
	color : '#fff',
	fontSize : 12 * screenScale,
	fontWeight : 'normal',
	fontFamily : "微软雅黑"
}

var bigMainMapLabelTextStyle = {
	color : '#fff',
	fontSize : 12 * screenScale,
	fontWeight : 'normal',
	fontFamily : "微软雅黑"
};
var emphasisBigMainMapLabelTextStyle = {
	color : '#000',
	fontSize : 12 * screenScale,
	fontWeight : 'normal',
	fontFamily : "微软雅黑"
};

var mapOption = {
	geo : {
		map : 'china',
		roam : false,
		zoom : 1,
		top: '5%',
		label : {
			normal : {
				show : false,
				textStyle : bigMapLabelTextStyle
			},
			emphasis : {
				show : true,
				textStyle : emphasisBigMainMapLabelTextStyle
			}
		},
		itemStyle : mapAreaItemStyle
	},
	visualMap : {
		calculable : true,
		realtime : true,
		itemHeight : 200,
		itemWidth : 20,
		orient: 'horizontal',
		left : '' + 3 * screenScale + '%',
		bottom : '7%',
		inRange : {
			symbolSize : [ 3, 6 ],
			color : mapColor
		},
		textStyle : {
			color : '#fff'
		}
	},
	title : {
		top : '6%',
		show: false,
		text : '网络扶贫行动进展',
		left : 'center',
		textStyle : bigTitleTextStyle,
		subtextStyle : bigSubTitleTextStyle,
		subtext : ""
	},
	tooltip : {
		trigger : 'item',
		formatter : function(params) {
			if (isNaN(params.value))
				return params.name + ":" + '0';
			else
				return params.name + ":" + toThousands(params.value);
		}
	},
	legend : {
		bottom : '3%',
		data : [],
		itemGap : screenScale * 8,  //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
		itemHeight : screenScale * 10,
		textStyle : bigLegendTextStyle,
		selectedMode : 'single'
	},
	series : [],
	color : defaultColor,
	animation : true,
	animationDuration : function(idx) {
		// 越往后的数据延迟越大
		return idx * 10;
	},
	animationEasing : 'quadraticOut',
	animationDurationUpdate : 1000
}

var baseOption = {
	baseOption : {
		timeline : {
			axisType : 'category',
			orient : 'horizontal',
			autoPlay : true,
			inverse : false,
			playInterval : 2000,
			height : 56,
			controlPosition : "right",
			symbol : 'circle',
			symbolSize : 12,
			itemStyle : {
				normal : {
					color : '#c4ddf3'
				}
			},
			label : {
				normal : {
					textStyle : {
						color : '#ddd',
						fontSize : 18
					}
				},
				emphasis : {
					textStyle : {
						color : '#fff'
					}
				}
			},
			lineStyle : {
				color : '#c4ddf3'
			},
			checkpointStyle : {
				color : '#FFA500',
				borderColor : '#777',
				borderWidth : 0
			},
			controlStyle : {
				showPlayBtn : true,
				showNextBtn : false,
				showPrevBtn : false,
				normal : {
					color : '#c4ddf3',
					borderColor : '#666',
					borderWidth : 0
				},
				emphasis : {
					color : '#aaa',
					borderColor : '#aaa',
					borderWidth : 0
				}
			},
			data : years
		},
		visualMap : {
			calculable : true,
			realtime : true,
			//bottom : 2,
			itemHeight : 200,
			itemWidth : 40,
			orient: 'horizontal',
			left : '10%',
			inRange : {
				symbolSize : [ 25, 25 ],
				color : mapColor
			},
			textStyle : {
				color : '#fff'
			}
		},
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				if (isNaN(params.value))
					return params.name + ":" + '0';
				else
					return params.name + ":" + toThousands(params.value);
			}
		},
		title : {
			text : "全国网络扶贫趋势动态图",
			top : 10,
			left : 'center',
			textStyle : bigTitleTextStyle
		},
		series : [ {
			mapType : "china",
			type : 'map',
			roam : false,
			zoom : 1
		} ],
	},
	options : []
};

var pieOption = {
	title : {
		show: false,
		text : '网络扶智',
		x : '50%',
		y : '45%',
		textAlign : "center",
		textStyle : bigTitleTextStyle
	},
	series : [ {
		name : ' ',
		type : 'pie',
		radius : [ '50%', '70%' ],
		avoidLabelOverlap : false,
		startAngle : 225,
		color : [ "#467ba", "transparent" ],
		hoverAnimation : false,
		legendHoverLink : false,
		label : {
			normal : {
				show : false,
				position : 'center'
			},
			emphasis : {
				show : true,
				textStyle : {
					fontSize : 20,
					fontWeight : 'bold',
					fontFamily : '黑体'
				}
			}
		},
		labelLine : {
			normal : {
				show : false
			}
		},
		data : [ {
			value : 75,
			name : '1'
		}, {
			value : 25,
			name : '2'
		} ]
	}, {
		name : '',
		type : 'pie',
		radius : [ '52%', '68%' ],
		avoidLabelOverlap : false,
		startAngle : 317,
		color : [ "#000", "transparent" ],
		hoverAnimation : false,
		legendHoverLink : false,
		clockwise : false,
		itemStyle : {
			normal : {
				borderColor : "transparent",
				borderWidth : "20"
			},
			emphasis : {
				borderColor : "transparent",
				borderWidth : "20"
			}
		},
		z : 10,
		labelLine : {
			normal : {
				show : true,
				lineStyle : {
					color : '#467ba'
				}
			},
			emphasis : {
				show : true,
				lineStyle : {
					color : '#467ba'
				}
			}
		},
		label : {
			normal : {
				show : true,
				formatter : function(param) {
					return param.name + ": " + param.data.relayValue + "所";
				},
				textStyle : {
					color : '#fff',
					fontSize : 16,
					fontFamily : '黑体'
				}
			}
		},
		data : [ {
			// "value": (100 - value1) * 266 / 360,
			name : ''
		}, {
			// "value": 100 - (100 - value1) * 266 / 360,
			name : ''
		} ]
	} ],
	animation : true,
	animationDuration : 2000,
	animationEasing : 'quarticOut',
	animationDelayUpdate : function(idx) {
		return idx * 5;
	},
	animationDurationUpdate : 2000
};

var __chartObjects = {};

function getChart(id) {
	if (document.getElementById(id) == undefined)
		return null;

	if (__chartObjects[id] == undefined)
		__chartObjects[id] = echarts.init(document.getElementById(id));

	return __chartObjects[id];
}

var mapAll = getChart('mapAll');
var mapCity = getChart('mapCity');
var mapAssist = getChart('mapAssist');
var mapEvolution = getChart('mapEvolution');
var mapSchool = getChart('mapSchool');
var mapEBussiness = getChart('mapEBussiness');
var mapNetworkCover = getChart('mapNetworkCover');

var topAll = getChart('topAll');
var topCity = getChart('topCity');

var fpAll = getChart('fpAll');
var fpContrast = getChart('fpContrast');

var fpSactter = getChart('fpSactter');
var fivePie = getChart('fivePieChart');
/*function mapZoom(name) {
	if (name == "内蒙古" || name == "新疆")
		return 1;
	else if (name == "黑龙江" || name == "辽宁" || name == "广东" || name == "福建")
		return 1;
		return 0.8;
	else if (name == "甘肃")
		return 0.6;
	else
		return 0.9;
}*/
function mapZoom(name) {
	if (name !== "")
		return 1;
}
function mapTop(name) {
	if (name !== "")
		return '4%';
}

/*function mapTop(name) {
	if (name == "内蒙古" || name == "新疆" || name == "青海")
		return '20%';
	else if (name == "甘肃")
		return '20%';
	else if (name == "西藏")
		return '23%';
	else if (name == "广东" || name == "福建")
		return '6%';
	else
		return '16%';
}*/

function initMap(targetChart, options, params) {
	for ( var key in options) {
		if (params[key] != undefined) {
			options[key] = params[key] == null ? null : $.extend(true, options[key], params[key]);
		}
	}

	if (options.title != undefined && params.title != undefined) {
		options.title.text = params.title;

		if (params.subtext != undefined)
			options.title.subtext = params.subtext;
	}

	if (options.geo != undefined && options.geo != null && params.name != undefined)
		options.geo.map = params.name;

	if (options.legend != undefined) {
		options.legend.data = [];
		options.legend.selected = {};

		var i = 0;
		for ( var l in (params.legendData == undefined ? params.data : params.legendData)) {
			options.legend.data.push({
				name : l,
				icon : 'circle'
			});

			options.legend.selected[l] = i == 0 ? true : false;
			i++;
		}

		if (params.showLegend != undefined) {
			options.legend.show = params.showLegend
		}

		var oldLegendSelected = $("#" + targetChart._dom.id).data("legend");
		if (oldLegendSelected != undefined && oldLegendSelected != null) {
			options.legend.selected = oldLegendSelected;
		}
	}

	if (options.series != undefined)
		options.series = [];

	if (options.series != undefined && params.data != undefined) {
		if (params.addSeries == undefined) {
			for ( var l in params.data) {
				var seriesOption = {
					name : l,
					type : 'map',
					mapType : params.name,
					/*top : '14%',*/
					top : mapTop(params.name),
					zoom : mapZoom(params.name),
					/*zoom : 0.9,*/
					left : 'center',
					roam : true,
					showLegendSymbol : false,
					nameMap : {
						'china' : '中国'
					},
					label : {
						normal : {
							show : true,
							textStyle : bigMainMapLabelTextStyle
						},
						emphasis : {
							show : true,
							textStyle : emphasisBigMainMapLabelTextStyle
						}
					},
					itemStyle : params.seriesItemStyle || mapAreaItemStyle,
					data : params.data[l]
				}

				if (params.seriesOption != undefined)
					seriesOption = $.extend(true, seriesOption, params.seriesOption);

				options.series.push(seriesOption);
			}
		} else {
			params.addSeries(options.series, params.data);
		}
	} else if (options.options != undefined && params.data != undefined) {
		for ( var key in params.data) {
			var seriesOption = {
				series : [ {
					name : '扶贫趋势动态图',
					data : params.data[key],
					nameMap : {
						'china' : '中国'
					},
					hoverable : false,
					label : {
						normal : {
							show : true,
							textStyle : {
								color : '#fff',
								fontSize : 20,
								fontWeight : 'normal',
								fontFamily : "微软雅黑"
							}
						},
						emphasis : {
							show : true,
							textStyle : {
								color : '#000',
								fontSize : 20,
								fontWeight : 'normal',
								fontFamily : "微软雅黑"
							}
						}
					},
					itemStyle : mapAreaItemStyle
				} ]
			};

			options.options.push(seriesOption);
		}
	}

	if (options.visualMap != undefined && options.visualMap != null && options.visualMap != null) {
		if (params.maxValue != undefined && $.isFunction(params.maxValue)) {
			var m = params.maxValue(options);
			options.visualMap.max = (m == undefined ? 100 : m);
		} else {
			options.visualMap.max = (params.maxValue == undefined ? 100 : params.maxValue);
		}
	} else if (options.baseOption != undefined && options.baseOption.visualMap != null && options.baseOption.visualMap != undefined && options.baseOption.visualMap != null) {
		if ($.isFunction(params.maxValue)) {
			var m = params.maxValue(options);
			options.baseOption.visualMap.max = (m == undefined ? 100 : m);
		} else {
			options.baseOption.visualMap.max = (params.maxValue == undefined ? 100 : params.maxValue);
		}
	}

	params.data = null;

	setActiveView(targetChart, options, params);
	targetChart.setOption(options, true);

	if (params.completed != undefined && params.completed != null)
		params.completed(targetChart, options, params);
}

function setActiveView(targetChart, options, params) {
	var targetId = targetChart._dom.id;
	var isMainView = $("#" + targetChart._dom.id).attr("mainView");

	if (isMainView == undefined)
		isMainView = false;
	else
		isMainView = isMainView == "true" ? true : false;
	isMainView = true;
	if (options.visualMap) {
		options.visualMap.show = isMainView;
		options.visualMap.itemHeight = 1250;   //更改全局 visualMap 的长度
		options.visualMap.itemWidth = 50;
	}

	if (options.geo.show) {
		options.geo.label.normal = {
			show : isMainView,
			textStyle : (isMainView ? bigMainMapLabelTextStyle : bigMapLabelTextStyle)
		}
	} else {
		options.series.forEach(function(x, i) {
			options.series[i].label.normal = {
				show : isMainView,
				textStyle : (isMainView ? bigMainMapLabelTextStyle : bigMapLabelTextStyle)
			}

			options.series[i].label.emphasis = {
				show : isMainView,
				textStyle : (isMainView ? emphasisBigMainMapLabelTextStyle : emphasisBigMainMapLabelTextStyle)
			}
		});
	}

	options.legend.show = isMainView && (targetId == 'mapAll' || targetId == 'mapNetworkCover' || targetId == "mapSchool");
	options.legend.itemHeight = (isMainView ? 40 : 20) * screenScale;
	options.legend.itemGap = (isMainView ? 40 : 20) * screenScale;

	if (isMainView) {
		if (options.visualMap)
			//options.visualMap.inRange.symbolSize = [ 5, 20 * screenScale ]
			options.visualMap.inRange.symbolSize = [ 6 * screenScale, 6 * screenScale ]

		if (options.series) {
			options.series.forEach(function(x, i) {
				if (x.lineStyle)
					options.series[i].lineStyle.normal.width = 2;

				if (x.effect) {
					options.series[i].effect.symbolSize = 2 * screenScale;  //双师学校与东西部协作扶贫 移动点大小
				}
			})
		}
	}
}

function getData(cityName) {
	var data = {
		"推进力度" : [],
		"网络覆盖" : [],
		"农村电商" : [],
		"网络扶智" : [],
		"信息服务" : [],
		"网络公益" : []
	};

	var _data = newsJson[cityName];
	if (cityName == '重庆') {
		_data = $.extend(true, _data, newsJson['县']);
	}
	for ( var _city in _data) {
		var _prefix = null;
		var _cityCode = _city.split('_')[0];
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

		for ( var legend in data) {
			if (legend == "推进力度") {
				data[legend].push({
					name : _cityName,
					value : _data[_city].value
				});
			} else {
				data[legend].push({
					name : _cityName,
					value : _data[_city]["data"]["all"][legend] == undefined ? 0 : _data[_city]["data"]["all"][legend].value
				});
			}
		}
	}

	for ( var key in data) {
		data[key].sort(function(a, b) {
			return b.value - a.value;
		});
	}
	return data;
}

function getPkxData(cityName) {
	var data = {
		"推进力度" : [],
		"网络覆盖" : [],
		"农村电商" : [],
		"网络扶智" : [],
		"信息服务" : [],
		"网络公益" : []
	};

	var _prefix = null;
	var cityCode = getCityCode(cityName);

	if (cityCode == undefined)
		return data;

	if (cityCode != "000000" && cityCode.substring(2, 6) == "0000") {
		_prefix = cityCode.substring(0, 2);
	} else if (cityCode != "000000" && cityCode.substring(4, 6) == "00") {
		_prefix = cityCode.substring(0, 4);
	} else if (cityCode != "000000") {
		_prefix = cityCode;
	}

	var pkx = null;
	if (_prefix == null) {
		pkx = Object.keys(positionJson);
	} else {
		pkx = Object.keys(positionJson).filter(function(x) {
			return x.substring(0, _prefix.length) == _prefix;
		});
	}

	pkx.forEach(function(_cityCode) {
		var _cityName = getCityName(_cityCode);
		var _data = newsJson[_cityName];
		for ( var key in _data) {
			var _subCityCode = key.split('_')[0];
			var _subCityName = getCityName(_subCityCode);
			if (positionJson[_subCityCode] != undefined) {

				for ( var legend in data) {
					if (legend == "推进力度") {
						data[legend].push({
							name : _subCityName,
							value : positionJson[_subCityCode].concat(_data[key].value)
						});
					} else {
						data[legend].push({
							name : _subCityName,
							value : positionJson[_subCityCode].concat(_data[key]["data"]["all"][legend] == undefined ? 0 : _data[key]["data"]["all"][legend].value)
						});
					}
				}
			}
		}
	});

	for ( var legend in data) {
		data[legend].sort(function(a, b) {
			return b.value[2] - a.value[2];
		});
	}

	return data;
}

function getPkxMarkPointData(cityName) {
	var data = {
		"推进力度" : [],
		"网络覆盖" : [],
		"农村电商" : [],
		"网络扶智" : [],
		"信息服务" : [],
		"网络公益" : []
	};

	var _prefix = null;
	var cityCode = getCityCode(cityName);

	if (cityCode == undefined)
		return data;

	if (cityCode != "000000" && cityCode.substring(2, 6) == "0000") {
		_prefix = cityCode.substring(0, 2);
	} else if (cityCode != "000000" && cityCode.substring(4, 6) == "00") {
		_prefix = cityCode.substring(0, 4);
	} else if (cityCode != "000000") {
		_prefix = cityCode;
	}

	var pkx = null;
	if (_prefix == null) {
		pkx = Object.keys(positionJson);
	} else {
		pkx = Object.keys(positionJson).filter(function(x) {
			return x.substring(0, _prefix.length) == _prefix;
		});
	}

	pkx.forEach(function(_cityCode) {
		var _cityName = getCityName(_cityCode);
		var _data = newsJson[_cityName];
		for ( var key in _data) {
			var _subCityCode = key.split('_')[0];
			var _subCityName = getCityName(_subCityCode);
			if (positionJson[_subCityCode] != undefined) {

				for ( var legend in data) {
					if (legend == "推进力度") {
						data[legend].push({
							name : _subCityName,
							coord : positionJson[_subCityCode].concat(Math.log(_data[key].value))
						});
					} else {
						data[legend].push({
							name : _subCityName,
							coord : positionJson[_subCityCode].concat(_data[key]["data"]["all"][legend] == undefined ? 0 : Math.log(_data[key]["data"]["all"][legend].value))
						});
					}
				}
			}
		}
	});

	for ( var legend in data) {
		data[legend].sort(function(a, b) {
			return b.coord[2] - a.coord[2];
		});
	}

	return data;
}

function getEvolutionData(cityName) {
	var data = {
		"2013" : [],
		"2014" : [],
		"2015" : [],
		"2016" : [],
		"2017" : []
	};

	var _data = newsJson[cityName];
	for ( var _city in _data) {
		var _prefix = null;
		var _cityCode = _city.split('_')[0];
		var _cityName = getCityName(_cityCode);

		if (_cityCode.substring(2, 6) == "0000") {
			_prefix = _cityCode.substring(0, 2);
		} else if (_cityCode.substring(4, 6) == "00") {
			_prefix = _cityCode.substring(0, 4);
		}

		if (!isPkx(_prefix))
			continue;

		for ( var year in data) {
			data[year].push({
				name : _cityName,
				value : _data[_city]["data"][year]["网络扶贫"] == undefined ? 0 : _data[_city]["data"][year]["网络扶贫"].value
			});
		}
	}

	for ( var legend in data) {
		data[legend].sort(function(a, b) {
			return b.value - a.value;
		});
	}

	return data;
}

function getAssistData(name) {
	var data = {
		"全国" : []
	};

	for ( var from in provToProv) {
		if (data[from] == undefined)
			data[from] = [];

		for ( var to in provToProv[from]) {
			data[from].push({
				fromName : from,
				toName : to,
				value : provToProv[from][to],
				coords : [ geoCoordMap[from], geoCoordMap[to] ]
			});

			data["全国"].push({
				fromName : from,
				toName : to,
				value : provToProv[from][to],
				coords : [ geoCoordMap[from], geoCoordMap[to] ]
			});
		}
	}

	for ( var to in prov2prov) {
		if (data[to] == undefined)
			data[to] = [];

		for ( var from in prov2prov[to]) {
			data[to].push({
				fromName : from,
				toName : to,
				value : prov2prov[to][from],
				coords : [ geoCoordMap[from], geoCoordMap[to] ]
			});

			data["全国"].push({
				fromName : from,
				toName : to,
				value : prov2prov[to][from],
				coords : [ geoCoordMap[from], geoCoordMap[to] ]
			});
		}
	}

	return data;
}

function getAssistCountByName(name) {
	var data = {}
	var from = [];
	var to = [];
	cityToCity.forEach(function(value, index) {
		if (name == "china" || value.from_prov == name || value.to_prov == name) {
			var fromCity = value.from_city;
			var toCity = value.to_city;
			if (from.indexOf(fromCity) == -1)
				from.push(fromCity);
			if (to.indexOf(toCity) == -1)
				to.push(toCity);
		}
	});

	if (provToProv[name] != undefined)
		data.type = "from";
	else if (prov2prov[name] != undefined)
		data.type = "to";
	else
		data.type = "all";
	data.fromCount = from.length;
	data.toCount = to.length;
	return data;
}

function getAssistSchoolCountByName(name) {
	var data = {};
	var doubleCount = 0;
	var sharedCount = 0;
	data.doubleCount = doubleCount;
	data.sharedCount = sharedCount;
	if (name == "china") {
		for ( var key in SchoolJson) {
			doubleCount += SchoolJson[key]["双师学校"].value;
			sharedCount += SchoolJson[key]["联盟学校"].value;
		}
		data.doubleCount = doubleCount;
		data.sharedCount = sharedCount;
	} else {
		if (SchoolJson[name] == undefined)
			return data;
		data.doubleCount = SchoolJson[name]["双师学校"].value;
		data.sharedCount = SchoolJson[name]["联盟学校"].value;
	}
	return data;
}

function getNetworkCoverData(name, cityNames) {
	var data = {};

	for ( var city in WLFG[name]) {
		for ( var cate in WLFG[name][city]) {
			if (data[cate] == undefined)
				data[cate] = [];

			var v = 0;

			for ( var j in WLFG[name][city][cate]) {
				v += (WLFG[name][city][cate][j]['2016'] || 0);
			}

			data[cate].push({
				name : city,
				value : v
			})
		}
	}

	if ($.isEmptyObject(data)) {
		data = {
			"固定宽带家庭用户数" : [],
			"移动宽带用户数" : []
		};
	}

	for ( var cate in data) {
		var citys = data[cate].map(function(x) {
			return x.name;
		});

		for (var i = 0; i < cityNames.length; i++) {
			if (citys.indexOf(cityNames[i]) == -1) {
				data[cate].push({
					name : cityNames[i]
				});
			}
		}
	}
	return data;
}

function getEBussinessData(name, cityNames) {
	var source = {
		"阿里电商" : ali,
		"供销e家" : gongxiaoyijia,
		"乐村淘" : lecuntao
	}

	var data = {};

	for ( var s in source) {
		if (data[s] == undefined)
			data[s] = [];

		for ( var city in source[s][name]) {
			var v = 0;

			for ( var j in source[s][name][city]["上行销量"]) {
				v += (source[s][name][city]["上行销量"][j] || 0);
			}

			data[s].push({
				name : city,
				value : v
			});
			if (data['京东'] == undefined) {
				data['京东'] = [];
			}
			data['京东'].push({
				name : city
			})
		}
	}

	for ( var cate in data) {
		var citys = data[cate].map(function(x) {
			return x.name;
		});

		for (var i = 0; i < cityNames.length; i++) {
			if (citys.indexOf(cityNames[i]) == -1) {
				data[cate].push({
					name : cityNames[i]
				});
			}
		}
	}
	return data;
}

function getFiveProjectByYear(cityName) {
	var data = {};

	legends.forEach(function(x) {
		data[x] = [ 0, 0, 0, 0, 0 ];
	});

	var _data = newsJson[cityName];
	for ( var _city in _data) {
		var _prefix = null;
		var _cityCode = _city.split('_')[0];
		var _cityName = getCityName(_cityCode);

		if (_cityCode.substring(2, 6) == "0000") {
			_prefix = _cityCode.substring(0, 2);
		} else if (_cityCode.substring(4, 6) == "00") {
			_prefix = _cityCode.substring(0, 4);
		}

		if (_prefix != null && !isPkx(_prefix))
			continue;

		for ( var legend in data) {
			years.forEach(function(year) {
				var v = 0;

				try {
					v = _data[_city]["data"][year][legend].value;
				} catch (e) {
					// debug(_city, legend, year);
				}

				data[legend][years.indexOf(year)] += v;
			});

			for (var i = 1; i < data[legend].length; i++) {
				var p = data[legend][i];
				data[legend][i] = (data[legend][i] + data[legend][i - 1]);
			}
			for (var i = 0; i < data[legend].length; i++) {
				data[legend][i] = data[legend][i] / (i + 1);
			}

		}
	}

	return data;
}

function getFiveProjectByLegend(cityName) {
	var data = {};

	years.forEach(function(x) {
		data[x] = [ 0, 0, 0, 0, 0 ];
	});

	var _data = newsJson[cityName];
	for ( var _city in _data) {
		var _prefix = null;
		var _cityCode = _city.split('_')[0];
		var _cityName = getCityName(_cityCode);

		if (_cityCode.substring(2, 6) == "0000") {
			_prefix = _cityCode.substring(0, 2);
		} else if (_cityCode.substring(4, 6) == "00") {
			_prefix = _cityCode.substring(0, 4);
		}

		if (_prefix != null && !isPkx(_prefix))
			continue;

		for ( var year in data) {
			legends.forEach(function(legend) {
				var v = 0;

				try {
					v = _data[_city]["data"][year][legend].value;
				} catch (e) {
					// debug(_city, legend, year);
				}

				data[year][legends.indexOf(legend)] += v;
			});
		}
	}
	return data;
}

function getFeature(code) {
	if (code == undefined)
		codeQ = "000000";
	else if (code.substring(2, 6) == '0000')
		codeQ = code.substring(0, 2);
	else if (code.substring(4, 6) == '00')
		codeQ = code.substring(0, 4);
	else
		codeQ = code;
	/*
	 * else if (positionJson[code] == undefined) { if (isPkx(code.substring(0,
	 * 2))) codeQ = code.substring(0, 4); else codeQ = "000000"; } else codeQ =
	 * code;
	 */
	$.ajax({
		url : 'show/queryItemsByCode.html',
		type : 'get',
		data : {
			code : codeQ,
			limit : 12
		},
		dataType : 'json',
		success : function(res) {
			codeQ = res.code;
			var items = [];
			res.list.forEach(function(data) {
				var tt = data.title;
				items.push({
					title : tt,
					src : data.img.replace("http://p.gxyj.com", 'assets/images'),
					description : data.content != 'NULL' ? data.content : "暂无&nbsp;" + tt + "&nbsp;相关介绍。"
				});
			});
			featureLayout(".features", getCityName(codeQ), items);
			$(".details").css("display", "none");
			$(".slide").css("display", "block");
		}
	});
}

function getSchoolData(provName, callback) {
	var res = {
		schoolData : {},
		schoolValue : {}
	}
	var schoolData = {
		'联盟学校' : [],
		'双师学校' : []
	}
	var schoolValue = {
		'联盟学校' : [],
		'双师学校' : []
	}
	for ( var prov in SchoolJson) {
		var code;
		if (provName != undefined)
			code = codeAnay(cityMap[provName]);
		if (provName != undefined && code.length == 2 && provName == prov) {
			for ( var schoolType in SchoolJson[prov]) {
				var schoolTypeData = SchoolJson[prov][schoolType];
				if (schoolTypeData.value > 0) {
					var schoolDatas = schoolTypeData.schools;
					for ( var schoolName in schoolDatas) {
						schoolData[schoolType].push({
							name : schoolName,
							coord : schoolDatas[schoolName]
						})
					}
				}
			}
		} else if (provName == 'china') {
			for ( var schoolType in SchoolJson[prov]) {
				var schoolTypeData = SchoolJson[prov][schoolType];
				if (schoolTypeData.value > 0) {
					schoolValue[schoolType].push({
						name : prov,
						value : schoolTypeData.value
					})
					var schoolDatas = schoolTypeData.schools;
					for ( var schoolName in schoolDatas) {
						schoolData[schoolType].push({
							name : schoolName,
							coord : schoolDatas[schoolName]
						})
					}
				}
			}
		}
	}
	res.schoolData = schoolData;
	res.schoolValue = schoolValue;
	if (callback != undefined)
		callback(res);
	return res;

}

function featureLayout(containter, title, data) {
	var pageNum = 12;
	var length = data.length;
	var pages = Math.ceil(length / pageNum);

	var indicators = $(containter).find(".carousel-indicators");
	var inner = $(containter).find(".carousel-inner");

	indicators.empty();
	inner.empty();
	$(containter).find(".details").empty();

	for (var pageIndex = 0; pageIndex < pages; pageIndex++) {
		indicators.append("<li data-target='#carousel-example-generic' data-slide-to='" + pageIndex + "' " + (pageIndex == 0 ? "class='active'" : "") + " ></li>");

		if (pageIndex == 0)
			inner.append("<div id='feature" + pageIndex + "' class='row feature item active' ></div>");
		else
			inner.append("<div id='feature" + pageIndex + "' class='row feature item' ></div>");

		var items = subArray(pageIndex * pageNum, pageNum, data)
		//$("#feature" + pageIndex).empty().append("<h1>" + (title == "china" ? "全国贫困县" : title) + "-优势资源</h1>");
		$("#feature" + pageIndex).parents(".features").siblings().empty().append("<span class='show-city-resources'>" + (title == "china" ? "全国贫困县" : title) + "</span>-优势资源");

		items.forEach(function(item) {
			if (item == undefined)
				return;

			if (item.src == undefined)
				return;

			var itemContainer = $("<div class='pkx_item'><img class='img-circle' src='" + item.src + "' alt='" + item.title + "' /><h3>" + item.title + "</h3></div>");

			itemContainer.data("title", item.title);
			itemContainer.data("src", item.src);
			itemContainer.data("content", item.description);
			$("#feature" + pageIndex).append(itemContainer);
		});
	}
}

function loadMainMapData(name) {
	var allData = getData(name);
	var points = getPkxData(name);
	var o1 = $.extend(true, {}, mapOption);
	$(".city-name-alone").html(name == 'china' ? '全国' : name);
	initMap(mapAll, o1, {
		title : "网络扶贫-推进力度",
		subtext : name == 'china' ? '全国' : name,
		name : name,
		data : allData,
		markPoints : points,
		geo : {
			show : false,
			zoom : mapZoom(name),
			top : mapTop(name)
		},
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				if ($.isArray(params.value)) {
					return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value[2]) ? 0 : toThousands(params.value[2]));
				} else {
					return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value) ? 0 : toThousands(params.value));
				}
			}
		},
		maxValue : allData["推进力度"].length > 0 ? allData["推进力度"][0].value : 1,
		completed : function(t, o, p) {
			var _pkx = $('#mySwitch input').prop('checked');
			var data = p.markPoints['推进力度']
			var p = t.getOption();
			if (p.series.length == p.legend[0].data.length) {
				p.series.push({
					name : '贫困县分布',
					type : 'scatter',
					coordinateSystem : 'geo',
					symbolSize : function(value, params) {
						if (_pkx)
							return 0;
						return 8 * screenScale;
					},
					symbol : 'circle',
					data : data,
					itemStyle : {
						normal : {
							color : '#FFCC00',
							borderColor : '#4CB1E9',
							borderWidth : 0
						}
					},
					label : {
						normal : {
							show : false
						},
						emphasis : {
							show : false
						}
					},
					tooltip : {
						trigger : 'item',
						formatter : function(params) {
							if ($.isArray(params.value)) {
								return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value[2]) ? 0 : toThousands(params.value[2]));
							} else {
								return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value) ? 0 : toThousands(params.value));
							}
						}
					}
				})
			}
			t.setOption(p, true);
		}
	});

	var o2 = $.extend(true, {}, mapOption);
	var pkxData = getPkxData(name);
	initMap(mapCity, o2, {
		title : "国家级贫困县分布",
		name : 'china',
		dataName : name,
		showLegend : false,
		seriesItemStyle : {
			borderColor : '#4CB1E9',
			borderWidth : 0
		},
		geo : {
			show : true
		},
		visualMap : {
			inRange : {
				color : [ '#A6F5B0', '#E7E04E', '#FFB930', '#FE6C2D', '#F82B29' ],
				symbolSize : [ 2 * screenScale, 5 * screenScale ],
			},
			itemHeight : 100,
			itemWidth : 20,
			bottom:'4%',  //距离底部的距离
			orient: 'horizontal',
			/*controller: {  // 表示 visualMap-continuous 本身的视觉样式，会覆盖共有的视觉样式。
	            inRange: {
	                symbolSize: [5 * screenScale, 5 * screenScale]
	            },
	        }*/
		},
		seriesOption : {
			type : 'scatter',
			coordinateSystem : 'geo',
			symbolSize : [ 15, 15 ],
			symbolOffset : [ 0, '50%' ],
			symbol : 'circle',
			geoIndex : 0,
			itemStyle : {
				borderColor : '#4CB1E9',
				borderWidth : 0
			},
			label : {
				normal : {
					show : false
				},
				emphasis : {
					show : false
				}
			},
			tooltip : {
				trigger : 'item',
				formatter : function(params) {
					if ($.isArray(params.value)) {
						return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value[2]) ? 0 : toThousands(params.value[2]));
					} else {
						return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value) ? 0 : toThousands(params.value));
					}
				}
			}
		},
		data : pkxData,
		completed : function(t, o, p) {
			hightLight(t, p.dataName);
			refreshvisualMap(mapCity, function(max) {
				if (p.dataName == 'china')
					return max / 12;
				return max;
			});
			// selectedMapArea(t, p.dataName);

		}
	});

	var o3 = $.extend(true, {}, mapOption);
	o3.visualMap = null;
	if (name == 'china') {
		var schoolData = getSchoolData(name);
		initMap(mapSchool, o3, {
			title : "网络扶智",
			name : name,
			data : schoolData,
			tooltip : {
				trigger : 'item',
				formatter : function(params) {
					if (params.data.fromName) {
						return params.data.fromName + " > " + params.data.toName;
					} else {
						return params.name
					}
				}

			},
			geo : {
				show : true
			},
			legendData : {
				'联盟学校' : [],
				'双师学校' : []
			},
			addSeries : function(series, res) {
				var schoolData = res.schoolData;
				
				/*console.log(series)
				console.log(res.schoolData)
				
				for(var item in res.schoolData){
					if(item == "双师学校"){
						console.log(res.schoolData[item])
						for(var el in res.schoolData[item]){
							// 双师学校名称和其坐标
							console.log(res.schoolData[item][el].name,res.schoolData[item][el].coord)
						}
					}
				}*/
				
				var schoolValue = res.schoolValue;
				var renDaSchool = [ {
					name : '中国人民大学附属中学',
					coord : [ 116.32433053162889, 39.98044648296058 ]
				} ];
				
				//东西南北四个方向的双师学校
				var geoCoordschoolname = [
				        {name:'吉木乃县初级中学',coord:[86.2081, 47.4063]},
				        {name:'海南万宁思源实验学校',coord:[110.3521, 18.7999]},
					    {name:'鄂伦春自治旗克一河中学',coord:[122.629, 50.6663]},
				        {name:'汤原县第一中学',coord:[129.9056, 46.7321]}
					];
				
				for ( var schoolType in schoolData) {
					var dataLine = [];
					var dataScatter = [];
					var resdata =[];
					var coordArray = [];
					schoolData[schoolType].forEach(function(data) {

						if (schoolType == '双师学校') {
							dataLine.push({
								fromName : '中国人民大学附属中学',
								toName : data.name,
								coords : [ [ 116.32433053162889, 39.98044648296058 ], data.coord ]
							});
						}
						dataScatter.push({
							name : data.name,
							value : data.coord
						})
					})
					geoCoordschoolname.forEach(function(schoolName){
						console.log(schoolName)
						if (schoolType == '双师学校') {
							resdata.push({
								fromName : '中国人民大学附属中学',
								toName : schoolName.name,
								coords : [ [ 116.32433053162889, 39.98044648296058 ], schoolName.coord ]
							});
						}
						coordArray.push({
							name : schoolName.name,
							value : schoolName.coord
						})
					})
					series.push({
						name : schoolType,
						type : 'lines',
						zlevel : 1,
						effect : {
							show : true,
							period : 0.4,   //特效动画的时间，单位为 s。
							constantSpeed: 20,  //特效图形的移动动画是否是固定速度
							trailLength : 0.01, // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
							symbolSize : 1,
							shadowBlur : 0,
						},
						lineStyle : {
							normal : schoolType == '双师学校' ? {
								color : '#E4C554',
								width : 0,
								opacity : 0,
								curveness : 0.1
							} : {}
						},
						animation: false,
						data : schoolType == '双师学校' ? dataLine : []
					}, {
						name : schoolType,
						type : 'lines',
						//所有带有尾迹特效的图表需要单独放在一个层，也就是需要单独设置 zlevel，同时建议关闭该层的动画（animation: false）。不然位于同个层的其它系列的图形，和动画的标签也会产生不必要的残影。
						zlevel : 2,
						symbol : [ 'none', 'none' ],
						symbolSize : 1,
						lineStyle : {
							normal : schoolType == '双师学校' ? {
								color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
									offset : 0,
									color : '#f3f4a6'
								}, {
									offset : 1,
									color : '#F82B29'
								} ], false),
								width : 2,
								opacity : 0.2,
								curveness : 0.1
							} : {}
						},
						animation: false,
						data : schoolType == '双师学校' ? dataLine : []
					},{
						name : schoolType,
			            type: 'effectScatter',
			            zlevel : 4,
			            effectType:'rippleEffect',
						symbolSize :  schoolType == '双师学校' ? 10 : 2 * screenScale,  //控制双师学校的 点 大小
			            coordinateSystem: 'geo',
			            rippleEffect: { //涟漪特效
			                period: 4, //动画时间，值越小速度越快
			                brushType: 'stroke', //波纹绘制方式 stroke, fill
			                scale: 4, //波纹圆环最大限制，值越大波纹越大
			                trailLength: 0,
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'right', //显示位置
			                    offset: [8, 0], //偏移设置
			                    textStyle :  {
			                    	color : 'yellow',
			                    	fontSize : 8 * screenScale,
			                    	fontWeight : 'normal',
			                    	fontFamily : "微软雅黑"
			                    },
			                    formatter: '{b}' //圆环显示文字
			                },
			                emphasis: {
			                    show: true
			                }
			            },
			            symbol: 'circle',
			            symbolSize: 8 * screenScale,  // 圆环大小
			            itemStyle: {
			                normal: {
			                    show: true,
			                    color: 'yellow'
			                }
			            },
			            animation: true,
			            data: schoolType == '双师学校' ? coordArray : [],
			        }, {
						name : schoolType,
						type : 'scatter',
						coordinateSystem : 'geo',
						zlevel : 2,
						symbolSize : schoolType == '双师学校' ? 2 : 2 * screenScale,  //控制双师学校的 点 大小
						rippleEffect : {
							brushType : 'stroke'
						},
						label : {
							normal : {
								show : false,
								position : 'top',
								formatter : '{b}',
								textStyle : {
									color : '#fff'
								}
							}
						},
						showEffectOn : 'render',
						itemStyle : {
							normal : schoolType == '双师学校' ? {
								color : '#FFCC00',
								opacity : 1,
								curveness : 0.1
							} : {}
						},
						animation: false,
						data : dataScatter
					})
				}
			}
		})
	}
}

function loadBarLineData(name) {
	var fiveProjectByYear = getFiveProjectByYear(name);
	var fiveProjectByLegend = getFiveProjectByLegend(name);

	if (name == 'china')
		name = "全国";

	updateChart(fpContrast, {
		chartType : "bar",
		legend : years,
		xData : legends,
		yData : fiveProjectByLegend,
		title : name + "五大工程行动趋势",
		orientLegend : 'horizontal',
		showYAxisLabel : false,
		showLegend : true,
		legendNew : {
			top : '16%',
			textStyle : bigLegendTextStyle
		},
		grid : {
			top : '30%',
			// width : '70%',
			height : '55%'
		},
		tooltip : {
			trigger : 'axis',
			triggerOn : 'click',
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
						html = params[i].name + "</br>";
					}
					html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + ';"></span>' + params[i].seriesName + ': ' + params[i].value + '</br>'
				}
				return html;
			}
		},
		inside : true,
		labelTextStyle : bigLabelTextStyle
	});
}

function loadAssistData(name) {
	if (name != 'china')
		return;

	var data = getAssistData(name);
	data['无协作'] = [];
	var o1 = $.extend(true, {}, mapOption);
	initMap(mapAssist, o1, {
		title : "东西部协作扶贫",
		name : name,
		data : data,
		geo : {
			show : true
		},
		legend : {
			show : false
		},
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				if (params.data.fromName) {
					return params.data.fromName + " > " + params.data.toName + " <br/>帮扶力度 : " + params.data.value;
				} else if (params.seriesName == params.data.fromName) {
					return params.seriesName + "帮扶力度：" + params.value[2]
				} else if (params.seriesName == params.data.toName) {
					return params.seriesName + "被帮扶力度：" + params.value[2]
				} else {
					return params.name + ":" + params.value[2]
				}
			}
		},
		maxValue : 400,
		visualMap : {
			inRange : {
				color : [ '#A6F5B0', '#E7E04E', '#FFB930', '#FE6C2D', '#F82B29' ],
				symbolSize : [ 2 * screenScale, 4 * screenScale ],
				colorAlpha : 0.8
			},
			itemHeight : 100,
			itemWidth : 20,
			bottom: '4%',
		},
		addSeries : function(series, data) {
			for ( var from in data) {
				var points = [], sum = 0;
				if (data[from].length > 0) {
					data[from].forEach(function(item, i) {

						points.push({
							name : item.toName,
							value : geoCoordMap[item.toName].concat(item.value)
						});

						sum += item.value;
					});

					if (from != "全国") {
						points.push({
							name : from,
							value : geoCoordMap[from].concat(Math.floor(sum / data[from].length))
						});
					}
				}
				series.push({
					name : from,
					type : 'lines',
					zlevel : 1,
					effect : {
						show : true,
						period : 20,
						trailLength : 0,
						symbolSize : 3 * screenScale,
						shadowBlur : 1
					},
					lineStyle : {
						normal : {
							width : 0,
							curveness : 0.2,
							shadowColor : 'rgba(0, 0, 0, 0.5)',
							shadowBlur : 10
						}
					},
					data : data[from]
				}, {
					name : from,
					type : 'lines',
					zlevel : 2,
					symbol : [ 'none', 'arrow' ],
					symbolSize : 10,
					lineStyle : {
						normal : {
							width : 2,
							curveness : 0.2
						}
					},
					effect : {
						show : true,
						period : 20,
						trailLength : 0,
						symbolSize : 3 * screenScale,
						shadowBlur : 1
					},
					data : data[from]
				}, {
					name : from,
					type : 'effectScatter',
					coordinateSystem : 'geo',
					zlevel : 2,
					rippleEffect : {
						brushType : 'stroke'
					},
					label : {
						normal : {
							show : false,
							position : 'top',
							formatter : '{b}',
							textStyle : {
								color : '#fff'
							}
						}
					},
					symbolSize : function(val) {
						return val[2] / 2
					},
					itemStyle : {
						normal : {

						}
					},
					data : points
				});
			}
		}
	});
}

function loadEBussinessData(name, cityNames) {
	var data = getEBussinessData(name, cityNames);
	var o1 = $.extend(true, {}, mapOption);
	initMap(mapEBussiness, o1, {
		title : "贫困县电商销售情况",
		subtext : "农特产品上行销量(万元)",
		name : name,
		data : data,
		legend : {
			show : false,
			selectedMode : 'multiple'
		},
		geo : {
			show : false
		},
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				if ($.isArray(params.value)) {
					return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value[2]) ? 0 : toThousands(params.value[2], 2));
				} else {
					return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value) ? 0 : toThousands(params.value, 2));
				}
			}
		},
		maxValue : function(o) {
			var selected = Object.keys(o.legend.selected).filter(function(x) {
				return o.legend.selected[x];
			});
			var m = Math.max.apply(null, (data[selected[0]] || []).map(function(a) {
				var v = 0;
				if (a.value != undefined) {
					if ($.isArray(a.value))
						v = a.value[2];
					else
						v = a.value;
				}
				return v;
			}));

			//console.log("nongcundianshang", m);
			return (m / 3) < 1 ? 1 : (m / 3);
		}
	});
}

function loadNetworkCoverData(name, cityNames) {
	var data = getNetworkCoverData(name, cityNames);

	var o1 = $.extend(true, {}, mapOption);
	initMap(mapNetworkCover, o1, {
		title : "贫困县通宽带情况",
		subtext : "固定/移动宽带用户数",
		name : name,
		data : data,
		geo : {
			show : false
		},
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				if ($.isArray(params.value)) {
					return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value[2]) ? 0 : toThousands(Math.round(params.value[2])));
				} else {
					return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value) ? 0 : toThousands(Math.round(params.value)));
				}
			}
		},
		maxValue : function(o) {
			var selected = Object.keys(o.legend.selected).filter(function(x) {
				return o.legend.selected[x];
			});

			var m = (data[selected[0]] || []).map(function(a) {
				var v = 0;
				if (a.value != undefined) {
					if ($.isArray(a.value))
						v = a.value[2];
					else
						v = a.value;
				}
				return v;
			}).sort(function(a, b) {
				return b - a;
			});

			var vv = Math.max.apply(null, m);
			var max = Math.round(vv * 0.8);
			return max < 1 ? 1 : max;
		}
	});
}

function showModal(targetChart, params) {
	var t = targetChart.getOption();
	var schoolType = '';
	for ( var legend in t.legend[0].selected) {
		if (t.legend[0].selected[legend]) {
			schoolType = legend
			break;
		}
	}
	$("#schoolModal .modal-body .content").empty();

	getSchoolData(params.name, function(x) {
		var y = x.schoolData[schoolType];
		$("#schoolModal .modal-title").html(params.name + "-" + schoolType + "名单(" + y.length + "所)");
		if (y.length > 0) {
			y.forEach(function(school) {
				$("#schoolModal .modal-body .content").append("<div class='col-md-6'><p style='text-align: left;'>" + school.name + "</p></div>");
			});

			$("#schoolModal").modal('show');
		}
	})
}

function getAssistNumData(name) {
	var cityCode = getCityCode(name);
	if (!cityCode.match("[0-9]{2}0000"))
		return;

	var assistCount = getAssistCountByName(name);
	$(".info-box-number.assistCounty").numberAnimate(assistCount.fromCount + assistCount.toCount)
}

function getSchoolNumData(name) {
	var code = getCityCode(name);
	if (!code.match("[0-9]{2}0000"))
		return;

	var schoolCount = getAssistSchoolCountByName(name);
	if (codeAnay(code).length != 2 || codeAnay(code) != "000000") {
		code = code.substring(0, 2) + "0000";
		name = getCityName(code);
	}
	var doubleCount = schoolCount.doubleCount
	var sharedCount = schoolCount.sharedCount
	$(".info-box-number.shuangShiSchool").numberAnimate(doubleCount);
	$(".info-box-number.lianMengSchool").numberAnimate(sharedCount);
}

function getPKXcityNum(cityName) {
	var _prefix = null;
	var cityCode = getCityCode(cityName);

	if (cityCode == undefined)
		return data;

	if (cityCode != "000000" && cityCode.substring(2, 6) == "0000") {
		_prefix = cityCode.substring(0, 2);
	} else if (cityCode != "000000" && cityCode.substring(4, 6) == "00") {
		_prefix = cityCode.substring(0, 4);
	} else if (cityCode != "000000") {
		_prefix = cityCode;
	}

	var pkx = null;
	if (_prefix == null) {
		pkx = Object.keys(positionJson);
	} else {
		pkx = Object.keys(positionJson).filter(function(x) {
			return x.substring(0, _prefix.length) == _prefix;
		});
	}
	$(".info-box-number.PKX").numberAnimate(pkx.length);
}

function getEBusinessNum(name) {
	var nameMap = {
		'阿里电商' : ali,
		'供销e家' : gongxiaoyijia,
		'乐村淘' : lecuntao
	}
	var value = 0;
	for ( var EBname in nameMap) {
		if (nameMap[EBname] == undefined)
			return;
		var tmpData = nameMap[EBname][name];

		for ( var prov in tmpData) {
			var data = tmpData[prov]['上行销量'] || 0;
			if (data['2016'] != undefined)
				value += (data['2016'] || 0)
		}
	}
	if (name == 'china')
		value += 890000
	if (parseInt(value / 10000) > 1)
		$(".info-box-number.EBusiness").html(parseInt((value / 10000)) + '亿');
	else if (parseInt(value / 1) >= 1)
		$(".info-box-number.EBusiness").html(parseInt(value) + '万')
	else
		$(".info-box-number.EBusiness").html(round(value, 2))
}

function getNetworkAreaNum(name) {
	var mapping = {
		'移动宽带用户数' : 'yd',
		'固定宽带家庭用户数' : 'gd'
	}
	var tmpData = WLFG[name];
	var tmp = {};
	for ( var prov in tmpData) {
		var provData = tmpData[prov]
		for ( var _cate in provData) {
			for ( var _category in provData[_cate]) {
				for ( var year in provData[_cate][_category]) {
					if (tmp[_cate] == undefined) {
						tmp[_cate] = {}
					} else if (tmp[_cate][year] == undefined)
						tmp[_cate][year] = provData[_cate][_category][year]
					else {
						tmp[_cate][year] += provData[_cate][_category][year]
					}

				}

			}
		}
	}
	if (!$.isEmptyObject(tmp)) {
		for ( var cate in tmp) {
			var value = tmp[cate]['2016']
			if (parseInt(value / 100000000) >= 1) {
				value = round(value / 100000000, 2)
				$(".info-box-number." + mapping[cate] + "").html(value + '亿');
			} else if (parseInt(value / 10000) >= 1) {
				value = round(value / 10000, 0)
				$(".info-box-number." + mapping[cate] + "").html(value + '万');
			} else {
				$(".info-box-number." + mapping[cate] + "").html(parseInt(value))
			}

		}
	} else {
		$(".info-box-number." + mapping['移动宽带用户数'] + "").html('0.00');
		$(".info-box-number." + mapping['固定宽带家庭用户数'] + "").html('0.00');
	}
}

function getAssistProvNum(name) {
	var res = [];
	var code = getCityCode(name);
	if (code == '000000') {
		for ( var prov in provToProv) {
			var _provData = provToProv[prov]
			for ( var _prov in _provData) {
				if (res.indexOf(_prov) == -1)
					res.push(_prov);
			}
			if (res.indexOf(prov) == -1)
				res.push(prov);
		}
	} else {
		var provName = getCityName(parseProvinceCode(code));
		if (provToProv[provName] != undefined) {
			for ( var _prov in provToProv[provName]) {
				if (res.indexOf(_prov) == -1)
					res.push(_prov);
			}
		} else if (prov2prov[provName] != undefined) {
			for ( var _prov in prov2prov[provName]) {
				if (res.indexOf(_prov) == -1)
					res.push(_prov);
			}
		}

	}
	$(".info-box-number.assisProv").numberAnimate(res.length);
}

function getfpScatterData(name) {
	echartsDefaultOption.title.text = '全国网络扶贫趋势';
	// fpSactter.setOption($.extend(true, {}, echartsDefaultOption), true);
	var fiveProjectByYear = getFiveProjectByYear(name);
	update3DChart(fpSactter, {
		chartType : "scatter",
		legend : legends,
		xData : years,
		yData : legends,
		data : fiveProjectByYear,
		title : name == 'china' ? '全国网络扶贫趋势' : name + '网络扶贫趋势',
		showYAxisLabel : true,
		showLegend : true,
		inside : true,
		color : lineColor,
		labelTextStyle : {
			color : '#fff',
			fontSize : 17,
			fontWeight : 'normal',
			fontFamily : "微软雅黑"
		}
	});
}

function hightLight(targetChart, name) {
	if (name == 'china')
		return;
	var t = targetChart.getOption();
	var code = getCityCode(name);
	name = getCityName(code.substring(0, 2) + "0000");
	t.geo[0].regions = [ {
		name : name,
		itemStyle : {
			normal : {
				areaColor : '#00133B',
				borderColor : '#e519c0',
				borderWidth : 4
			}
		}
	} ]
	targetChart.setOption(t, true)

}

function updataShuangshiData(targetChart, name) {
	var provSchoolData;

	if (name != 'china') {
		var provCode = getCityCode(name).substring(0, 2) + "0000";
		provSchoolData = getSchoolData(getCityName(provCode));
		var schoolData = provSchoolData.schoolData;
		var t = targetChart.getOption();
		for ( var schoolType in schoolData) {
			var dataLine = [];
			var dataScatter = [];
			schoolData[schoolType].forEach(function(data) {
				if (schoolType == '双师学校') {
					dataLine.push({
						fromName : '中国人民大学附属中学',
						toName : data.name,
						coords : [ [ 116.32433053162889, 39.98044648296058 ], data.coord ]
					});
					console.log(data.coord)
				}
				dataScatter.push({
					name : data.name,
					value : data.coord
				})
			})
			t.series.forEach(function(s, i) {
				if (s.name == schoolType) {
					if (s.type == 'lines' && s.name == '双师学校'){
						t.series[i].data = dataLine;
				} else if (s.type == 'scatter') {
						t.series[i].symbolSize = 5
						t.series[i].data = dataScatter;
					}

				}
			})
		}

		targetChart.setOption(t, true)
	}
}

function markAssistProvince(cityCode) {
	if (cityCode == undefined || cityCode == null || cityCode == "000000")
		return;
	if (cityCode == '000000') {
		provinceName = "全国";
	} else {
		var provinceName = getCityName(cityCode.substring(0, 2) + "0000");
		var assistOption = mapAssist.getOption();
		if (assistOption.legend[0].data.filter(function(a) {
			return a.name == provinceName;
		}).length <= 0) {
			if (cityName == 'china')
				provinceName = "全国";
			else
				provinceName = '无协作';
		}
	}
	mapAssist.dispatchAction({
		type : 'legendSelect',
		name : provinceName
	});
}

function loadFivePieData(name) {
	var fiveProjectByLegend = getFiveProjectByLegend(name);

	var option = {
		baseOption : {
			timeline : {
				show : false,
				axisType : 'category',
				orient : 'horizontal',
				bottom : 0,
				autoPlay : true,
				inverse : false,
				playInterval : 2000,
				// padding : [ 10, 50 ],
				controlPosition : "right",
				symbol : 'circle',
				symbolSize : 6,
				itemStyle : {
					normal : {
						color : '#c4ddf3'
					}
				},
				label : {
					normal : {
						position : 18,
						textStyle : bigLabelTextStyle
					},
					emphasis : {
						position : 18,
						textStyle : bigLabelTextStyle
					}
				},
				lineStyle : {
					lineHeight : 100,
					color : '#c4ddf3'
				},
				checkpointStyle : {
					color : '#FFA500',
					borderColor : '#777',
					borderWidth : 0
				},
				controlStyle : {
					showPlayBtn : true,
					showNextBtn : false,
					showPrevBtn : false,
					normal : {
						color : '#c4ddf3',
						borderColor : '#666',
						borderWidth : 0
					},
					emphasis : {
						color : '#aaa',
						borderColor : '#aaa',
						borderWidth : 0
					}
				},
				data : years
			},
			tooltip : {
				trigger : 'item',
				formatter : '{b}: {c}'
			},
			color : lineColor,
			series : [ {
				mapType : "china",
				type : 'map',
				type : 'pie',
			} ],
		},
		options : []
	}

	var i = 0;
	for ( var year in fiveProjectByLegend) {
		var data = [];
		fiveProjectByLegend[year].forEach(function(x, i) {
			data.push({
				name : legends[i],
				value : x
			})
		});
		option.options.push({
			title : [ {
				top : 10,
				text : (name == "china" ? "全国" : name) + "五大工程行动分布",
				left : 'center',
				textStyle : bigTitleTextStyle
			}, {
				text : year,
				top : '46%',
				left : 'center',
				textStyle : bigTitleTextStyle,
				subtext : name == 'china' ? '全国' : name,
				subtextStyle : bigSubTitleTextStyle
			} ],
			series : [ {
				name : year,
				type : 'pie',
				radius : [ '35%', '60%' ],
				center : [ '50%', '52%' ],
				data : data,
				itemStyle : {
					normal : {
						opacity : 0.8
					},
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				},
				label : {
					normal : {
						show : true,
						textStyle : bigLabelTextStyle,
						formatter : '{b}\n{d}%'
					},
					emphasis : {
						show : true,
						textStyle : bigLabelTextStyle,
						formatter : '{b}\n{d}%'
					}
				}
			} ]
		})
		i++;
	}
	fivePie.setOption(option, true);
}

function subArray(start, size, arr) {
	var data = [];
	var end = start + size;
	var length = arr.length;
	if (start > length)
		return data;
	else if (end > length)
		end = length;
	for (var index = start; index < end; index++) {
		data.push(arr[index])
	}
	return data;
}

// 显示选中区域 (省，市，县)
function selectedMapArea(targetChart, name) {
	var provCode = getCityCode(name).substring(0, 2) + "0000";
	var position = getPosition(name);
	if (position == undefined || position.length == 0)
		position = getcoords(getCityName(provCode), name);
	var data = [ {
		name : name,
		value : position
	} ]

	var t = targetChart.getOption();
	if (t.series[t.series.length - 1].name == '地图联动选中') {
		t.series[t.series.length - 1].data = data;
	} else {
		t.series.push({
			name : '地图联动选中',
			type : 'scatter',
			silent : true,
			coordinateSystem : 'geo',
			symbolSize : [ 160, 30 ],
			symbolOffset : [ 0, -30 ],
			symbol : 'image://assets/images/mapPoint.png',
			data : data,
			itemStyle : {
				borderColor : '#4CB1E9',
				borderWidth : 0
			},
			label : {
				normal : {
					show : true,
					offset : [ 0, -5 ],
					formatter : '{b}',
					textStyle : {
						fontSize : 16,
						color : '#fff'
					}
				},
				emphasis : {
					show : false
				}
			},
			tooltip : {
				trigger : 'item',
				formatter : function(params) {
					return params.name;
				}
			}

		})
	}
	targetChart.setOption(t, true);
}

// 全局联动
function GlobalLinkage(name) {
	var cityCode = getCityCode(name);
	if (cityCode == undefined) {
		console.log("code is null,", name);
		return;
	}

	getMapJson(cityCode, {
		name : name
	}, function(c, p, map, cityNames) {
		// 加载主要的地图数据
		loadMainMapData(p.name);

		// 加载协作地图
		loadAssistData(p.name);

		// 加载网络覆盖数据
		loadNetworkCoverData(p.name, cityNames);

		// 加载农村电商数据
		loadEBussinessData(p.name, cityNames);

		// 更新地图双师学校数量
		updataShuangshiData(mapSchool, name);

		// 区域标识
		// selectedMapArea(mapSchool, name);

		// 学校高亮显示
		hightLight(mapSchool, name);

		hightLight(mapAssist, name);

		// legend选中
		markAssistProvince(cityCode);

		addBack(c);
	});

	// 线图柱状图
	// loadBarLineData(name);

	// 五个饼图
	// loadFivePieData(name);

	// 风貌
	getFeature(cityCode);

	// 贫困县数量
	getPKXcityNum(name);

	// 学校数量
	getSchoolNumData(name);

	// 区县帮扶数量
	getAssistNumData(name);

	// 农特产品数量
	getEBusinessNum(name);

	// 移动/固定宽带数量
	getNetworkAreaNum(name);

	// 东西部结对（省份）
	getAssistProvNum(name)
}

function init(name) {
	// var evolutionData = getEvolutionData(name);
	// var o1 = $.extend(true, {}, baseOption);
	// initMap(mapEvolution, o1, {
	// title : "全国网络扶贫推进力度演进图",
	// name : name,
	// data : evolutionData,
	// maxValue : evolutionData["2016"][1].value
	// });

	echartsDefaultOption.title.textStyle = bigTitleTextStyle;

	// echartsDefaultOption.title.text = '全国推进力度排名';
	// topAll.setOption($.extend(true, {}, echartsDefaultOption), true);
	//
	// echartsDefaultOption.title.text = '贫困县推进力度排名';
	// topCity.setOption($.extend(true, {}, echartsDefaultOption), true);

	// echartsDefaultOption.title.text = '全国网络扶贫趋势';
	// fpAll.setOption($.extend(true, {}, echartsDefaultOption), true);

	echartsDefaultOption.title.text = '全国网络扶贫五大工程趋势';
	echartsDefaultOption.color = lineColor;
	fpContrast.setOption($.extend(true, {}, echartsDefaultOption), true);

	// var allData = getData("china");
	// var pkxData = getPkxData("china");
	//
	// showTop(topAll, "推进力度", allData["推进力度"], 7, {
	// labelTextStyle : {
	// color : '#fff',
	// fontSize : 22,
	// fontWeight : 'normal',
	// fontFamily : "微软雅黑"
	// }
	// });
	// showTop(topCity, "推进力度", pkxData["推进力度"], 7, {
	// labelTextStyle : {
	// color : '#fff',
	// fontSize : 22,
	// fontWeight : 'normal',
	// fontFamily : "微软雅黑"
	// }
	// });

	// getfpScatterData(name);
	// 加载帮扶地图数据

	GlobalLinkage(name);
}

init('china');

$(document).delegate(".pkx_item", "click", function() {
	var that = $(this);

	$(".slide").css("display", "none");
	$(".details").append("<h1>" + that.data('title') + "</h1><div class='description'><img src='" + that.data('src') + "' />" + that.data('content'));
	$(".details").css("display", "block");
});

$(document).delegate("#details", "click", function() {
	$(".slide").css("display", "block");
	$(".details").empty().css("display", "none");
});

$(document).delegate("#details", "mouseleave", function() {
	$(".slide").css("display", "block");
	$(".details").empty().css("display", "none");
});

mapAll.on("click", function(params, ev) {
	if (params.value != undefined) {
		GlobalLinkage(params.name);
		refreshvisualMap(mapAll);
		refreshvisualMap(mapCity, function(max) {
			if (params.name == 'china')
				return max / 12;
			return max;
		});
	}
});

mapAll.on('legendselectchanged', function(params, ev) {
	mapCity.dispatchAction({
		type : 'legendSelect',
		name : params.name
	});
	var name;
	var o = mapAll.getOption();
	if (o.series[0].type == 'map' && o.series[0].mapType != undefined) {
		name = o.series[0].mapType;
	}
	//o.title[0].text = '网络扶贫-' + params.name
	$(".city-type-alone").html(params.name);
	mapAll.setOption(o, true);

	var t = mapAll.getOption();
	$("#mapAll").data("legend", t.legend[0].selected);

	refreshvisualMap(mapAll);
	refreshvisualMap(mapCity, function(max) {
		if (name == 'china')
			return max / 12;
		return max;
	});
});

mapSchool.on('click', function(params) {
	showModal(mapSchool, params);
	GlobalLinkage(params.name);
})

mapCity.on('click', function(params, ev) {
	var cityCode = getCityCode(params.name);

	if (cityCode.substring(4, 6) == '00' || cityCode.substring(2, 6) == '0000') {
		GlobalLinkage(params.name);
	}
	/*
	 * refreshvisualMap(mapCity, function(x) { return x; })
	 */
});

mapAssist.on('click', function(params, ev) {
	if (params.value == undefined) {
		GlobalLinkage(params.name);
	}
});

mapNetworkCover.on('click', function(params, ev) {
	GlobalLinkage(params.name);
});

mapNetworkCover.on('legendselectchanged', function(params, ev) {
	var t = mapNetworkCover.getOption();
	$("#mapNetworkCover").data("legend", t.legend[0].selected);

	refreshvisualMap(mapNetworkCover, function(max) {
		return Math.round(max * 0.8);
	});
});

mapEBussiness.on("click", function(params, ev) {
	GlobalLinkage(params.name);
});

mapEBussiness.on('legendselectchanged', function(params, ev) {
	var t = mapEBussiness.getOption();
	$("#mapEBussiness").data("legend", t.legend[0].selected);

	refreshvisualMap(mapEBussiness, function(m) {
		return m / 2;
	});
});

$("#back").click(function() {
	var cityCode = $(this).attr("code");
	var cityName = getCityName(cityCode);
	GlobalLinkage(cityName);
	refreshvisualMap(mapAll);
	refreshvisualMap(mapCity, function(max) {
		if (cityName == 'china')
			return max / 12;
		return max;
	});
});

window.onresize = function() {
	for ( var id in __chartObjects) {
		if (__chartObjects[id] != undefined)
			__chartObjects[id].resize();
	}
}

var __selectedMapElement = $("#mapAll");
__selectedMapElement.attr("mainView", true);

function switchMap(targetId) {
	var targetObject = $("#" + targetId);
	var sourceId = __selectedMapElement.attr("id");

	__selectedMapElement.attr("mainView", false);
	__selectedMapElement.swap(targetObject);

	__selectedMapElement = targetObject;
	__selectedMapElement.attr("mainView", true);

	var targetChart = getChart(targetId);
	var o = targetChart.getOption();

	if (o.geo[0].show) {
		o.geo[0].label.normal = {
			show : true,
			textStyle : bigMainMapLabelTextStyle
		}
	} else {
		o.series.forEach(function(x, i) {
			if (x.name == '贫困县分布')
				return;
			o.series[i].label.normal = {
				show : true,
				textStyle : bigMainMapLabelTextStyle
			}
			o.series[i].label.emphasis = {
				show : true,
				textStyle : bigMainMapLabelTextStyle
			}
		});
	}

	o.legend.forEach(function(x, i) {
		o.legend[i].itemHeight = 40 * screenScale;
		o.legend[i].itemGap = 40 * screenScale;

		o.legend.forEach(function(x, i) {
			o.legend[i].show = (targetId == 'mapAll' || targetId == 'mapNetworkCover' || targetId == "mapSchool");
		});
	});

	if (targetId == 'mapAssist' || targetId == 'mapCity' || targetId == 'mapSchool') {
		o.series.forEach(function(s, i) {
			if (targetId == 'mapSchool' && s.effect) {
				o.series[i].effect.symbolSize = 2;
			} else if (s.effect) {
				o.series[i].effect.symbolSize = 6 * screenScale;
			}

			if (s.name == '联盟学校') {
				o.series[i].symbolSize = 5 * screenScale;
			}

			if (s.lineStyle)
				o.series[i].lineStyle.normal.width = 2;
		});

		if (o.visualMap[0])
			o.visualMap[0].inRange.symbolSize = o.visualMap[0].target.inRange.symbolSize = o.visualMap[0].controller.inRange.symbolSize = [ 5, 20 * screenScale ]
	}

	if (o.visualMap[0]) {
		o.visualMap[0].show = true;
		o.visualMap[0].itemHeight = 180 * screenScale;
		o.visualMap[0].itemWidth = 30 * screenScale;

		// o.visualMap[0].inRange.color = o.visualMap[0].target.inRange.color =
		// o.visualMap[0].controller.inRange.color = mapColor;
	}

	targetChart.setOption(o, true);
	targetChart.resize();

	var sourceChart = getChart(sourceId);
	var so = sourceChart.getOption();

	if (so.geo[0].show) {
		so.geo[0].label.normal.show = false
	} else {
		so.series.forEach(function(x, i) {
			so.series[i].label.normal.show = false

			so.series[i].label.emphasis.show = false

		});
	}

	so.legend.forEach(function(x, i) {
		so.legend[i].show = false;
	});

	if (sourceId == 'mapAssist' || sourceId == 'mapCity' || sourceId == 'mapSchool') {
		so.series.forEach(function(s, i) {
			if (sourceId == 'mapSchool' && s.effect) {
				so.series[i].effect.symbolSize = 1;
			} else if (s.effect) {
				so.series[i].effect.symbolSize = 3 * screenScale;
			}

			if (s.name == '联盟学校') {
				so.series[i].symbolSize = 2 * screenScale;
			}

			if (s.lineStyle) {
				so.series[i].lineStyle.normal.width = 2;
			}
		})

		if (so.visualMap[0]) {
			so.visualMap[0].inRange.symbolSize = so.visualMap[0].target.inRange.symbolSize = so.visualMap[0].controller.inRange.symbolSize = [ 2, 4 * screenScale ]
		}
	}

	if (so.visualMap[0]) {
		so.visualMap[0].show = false;
		// so.visualMap[0].inRange.color = so.visualMap[0].target.inRange.color
		// = so.visualMap[0].controller.inRange.color = lineColor;
	}

	sourceChart.setOption(so, true);
	sourceChart.resize();

	return sourceId;
}

$(document).delegate(".chart-maximum,.chart-left-maximum", "click", function() {
	var targetId = $(this).attr("targetId");
	var sourceId = switchMap(targetId);
	$(this).attr("targetId", sourceId);
});

/*-------------------------------------自动播放---------------------------------------*/
var playList = [ {
	code : "510000",
	name : "四川",
	type : "map",
	chart : mapAll,
	seriesName : "推进力度"
}, {
	code : "513400",
	name : "凉山彝族自治州",
	type : "map",
	chart : mapAll,
	seriesName : "推进力度"
}, {
	code : "513431",
	name : "昭觉县",
	type : "map",
	seriesName : "推进力度"
}, {
	code : "620000",
	name : "甘肃",
	type : "map",
	chart : mapAll,
	seriesName : "推进力度"
}, {
	code : "621200",
	name : "陇南市",
	type : "map",
	chart : mapAll,
	seriesName : "推进力度"
}, {
	code : "621225",
	name : "西和县",
	type : "map",
	seriesName : "推进力度"
}, {
	code : "000000",
	name : "china",
	type : "map",
	chart : mapAll
}, {
	type : "switchMap",
	chartName : "mapAssist"
}, {
	type : "switchMap",
	chartName : "mapSchool"
}, {
	name : "双师学校",
	type : "legend",
	chart : mapSchool
}, {
	type : "switchMap",
	chartName : "mapCity"
}, {
	type : "switchMap",
	chartName : "mapNetworkCover"
}, {
	name : "移动宽带用户数",
	type : "legend",
	chart : mapNetworkCover
}, {
	type : "switchMap",
	chartName : "mapEBussiness"
}, {
	type : "switchMap",
	chartName : "mapAll"
} ];

var autoPlay = null;
var playIndex = 0;
var waverCount = 4;
var waverSpaceTime = 200;

function waver(targetChart, playObject, index, seriesName) {
	setTimeout(function() {
		targetChart.dispatchAction({
			type : index % 2 == 0 ? "highlight" : "downplay",
			seriesName : seriesName,
			name : playObject.name
		});
	}, waverSpaceTime * index);
}

function play() {
	autoPlay = setInterval(function() {
		loadAutoData(playList[playIndex]);

		if (playIndex == playList.length - 1)
			playIndex = 0;
		else
			playIndex += 1;

	}, 5000);
}

function loadAutoData(playObject) {
	if (playObject.type == "map") {
		if (playObject.seriesName != undefined) {
			for (var index = 0; index < waverCount; index++) {
				waver(mapAll, playObject, index, playObject.seriesName)
			}
		}
		;

		setTimeout(function() {
			GlobalLinkage(playObject.name)
			markAssistProvince(playObject.code);
		}, waverCount * waverSpaceTime);
	} else if (playObject.type == "switchMap") {
		var sourceId = switchMap(playObject.chartName);
		$("[targetId='" + playObject.chartName + "']").attr("targetId", sourceId);
	} else if (playObject.type == "legend") {
		playObject.chart.dispatchAction({
			type : 'legendSelect',
			name : playObject.name
		});
		//console.log(playObject.chart._dom.id);
		if (playObject.chart._dom.id == "mapNetworkCover") {
			refreshvisualMap(mapNetworkCover, function(max) {
				return Math.round(max * 0.8);
			});
		}
	}
}

function playControl() {
	if (autoPlay == null) {
		play();
	} else {
		clearInterval(autoPlay);

		autoPlay = null;
		playIndex = 0;
		loadAutoData(playList[6])
		loadAutoData(playList[playList.length - 1])
	}
}

$("#autoPlayControl").click(function() {
	if (autoPlay == null)
		$($(this).children("img").get(0)).attr("src", "assets/images/停止.png");
	else
		$($(this).children("img").get(0)).attr("src", "assets/images/开始.png");

	playControl();
});