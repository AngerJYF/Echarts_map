var years = [ "2013", "2014", "2015", "2016", "2017" ];
var legends = [ "网络覆盖", "农村电商", "网络扶智", "信息服务", "网络公益" ];

var bigScreenTitleTextStyle = {
	color : '#fff',
	fontSize : 36,
	fontWeight : 'normal',
	fontFamily : "黑体"
};

var mapOption = {
	geo : {
		map : 'china',
		roam : 'move',
		zoom : 1.2,
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
	},
	visualMap : {
		calculable : true,
		realtime : true,
		// bottom : 80,
		itemHeight : 200,
		itemWidth : 40,
		// left : '10%',
		inRange : {
			symbolSize : [ 5, 25 ],
			color : mapColor
		},
		textStyle : {
			color : '#fff'
		}
	},
	title : {
		text : '',
		top : 10,
		left : 'center',
		textStyle : bigScreenTitleTextStyle
	},
	tooltip : {
		trigger : 'item',
		formatter : '{b}: {c}'
	},
	legend : {
		top : 55,
		data : [],
		itemGap : 20,
		itemHeight : 20,
		textStyle : {
			color : '#FFFFFF',
			fontSize : 22,
			fontWeight : 'normal',
			fontFamily : "微软雅黑"
		},
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
			bottom : 80,
			itemHeight : 200,
			itemWidth : 40,
			left : '10%',
			inRange : {
				symbolSize : [ 5, 25 ],
				color : mapColor
			},
			textStyle : {
				color : '#fff'
			}
		},
		tooltip : {
			trigger : 'item',
			formatter : '{b}: {c}'
		},
		title : {
			text : "全国网络扶贫趋势动态图",
			top : 10,
			left : 'center',
			textStyle : bigScreenTitleTextStyle
		},
		series : [ {
			mapType : "china",
			type : 'map',
			roam : 'move',
			zoom : 1.2
		} ],
	},
	options : []
};

var pieOption = {
	title : {
		text : '网络扶智',
		x : '50%',
		y : '45%',
		textAlign : "center",
		textStyle : {
			color : '#fff',
			fontWeight : 'normal',
			fontSize : 24
		},
		subtextStyle : {
			fontWeight : 'bold',
			fontSize : 18,
			color : '#3ea1ff'
		}
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
					fontSize : '30',
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

var mapAll = echarts.init(document.getElementById('mapAll'));
var mapCity = echarts.init(document.getElementById('mapCity'));
var mapAssist = echarts.init(document.getElementById('mapAssist'));
var mapEvolution = echarts.init(document.getElementById('mapEvolution'));
var mapSchool = echarts.init(document.getElementById('mapSchool'));

var topAll = echarts.init(document.getElementById('topAll'));
var topCity = echarts.init(document.getElementById('topCity'));

var fpAll = echarts.init(document.getElementById('fpAll'));
var fpContrast = echarts.init(document.getElementById('fpContrast'));

var fpSactter = echarts.init(document.getElementById('fpSactter'));

var schoolPie = echarts.init(document.getElementById('schoolPie'));
var fivePie = echarts.init(document.getElementById('fivePieChart'));

function initMap(targetChart, options, params) {
	for ( var key in options) {
		if (params[key] != undefined) {
			options[key] = params[key] == null ? null : $.extend(true, options[key], params[key]);
		}
	}

	if (options.title != undefined && params.title != undefined)
		options.title.text = params.title;

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
					top : '12%',
					zoom : 1.2,
					left : 'center',
					roam : 'move',
					showLegendSymbol : false,
					nameMap : {
						'china' : '中国'
					},
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
					itemStyle : params.seriesItemStyle == undefined ? mapAreaItemStyle : params.seriesItemStyle,
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
		options.visualMap.max = params.maxValue == undefined ? 100 : params.maxValue;
	} else if (options.baseOption != undefined && options.baseOption.visualMap != null && options.baseOption.visualMap != undefined && options.baseOption.visualMap != null) {
		options.baseOption.visualMap.max = params.maxValue == undefined ? 100 : params.maxValue;
	}

	params.data = null;
	targetChart.setOption(options, true);

	if (params.completed != undefined && params.completed != null)
		params.completed(targetChart, options, params);
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
			if (positionJson[_subCityCode] == undefined)
				continue;
			for ( var legend in data) {
				if (legend == "推进力度") {
					data[legend].push({
						name : _subCityName,
						value : positionJson[_subCityCode].concat(Math.log(_data[key].value))
					});
				} else {
					data[legend].push({
						name : _subCityName,
						value : positionJson[_subCityCode].concat(_data[key]["data"]["all"][legend] == undefined ? 0 : Math.log(_data[key]["data"]["all"][legend].value))
					});
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

function getFiveProjectByYear(cityName) {
	var res = {};

	legends.forEach(function(x) {
		res[x] = [ 0, 0, 0, 0, 0 ];
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

		years.forEach(function(year, idx) {
			for ( var l in res) {
				try {
					res[l][idx] += _data[_city]["data"][year][l].value;
				} catch (e) {
					res[l][idx] += 0;
				}
			}
		});
	}

	for ( var l in res) {
		for (var i = 1; i < res[l].length; i++) {
			res[l][i] += res[l][i - 1];
		}
	}

	return res;
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
					debug(_city, legend, year);
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
			limit : 8
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
			delete data;
			$(".details").css("display", "none");
			$(".slide").css("display", "block");
			/*
			 * var tc_data = [], tc_list = null, tc_images = null; var ly_data =
			 * [], lyzy_list = null, lyzy_images = null; var ftrq_list = null,
			 * ftrq_images = null;
			 * 
			 * res.forEach(function(data) { if (data.techan != undefined &&
			 * data.techan != null) tc_list =
			 * eval(data.techan.replace(/[\r\n]/g, ""));
			 * 
			 * if (data.difangtechanimg != undefined && data.difangtechanimg !=
			 * null) tc_images = eval(data.difangtechanimg.replace(/[\r\n]/g,
			 * ""));
			 * 
			 * if (tc_images != null && tc_images.length > 0) {
			 * tc_images.forEach(function(item) { var title =
			 * item.title.replace(/(^\s*)|(\s*$)/g, ''); var src =
			 * item.content.replace("http://p.gxyj.com", 'assets/images')
			 * 
			 * if (title != "" && src != "") { var find =
			 * tc_list.filter(function(a) { return (a.title).match(title) });
			 * var tt = find.length > 0 ? find[0].title : title; tc_data.push({
			 * title : tt, src : src, description : find.length > 0 ?
			 * find[0].content : "暂无&nbsp;" + tt + "&nbsp;相关介绍。" }); } }); }
			 * 
			 * if (data.lvyouziyuanjianjie != undefined &&
			 * data.lvyouziyuanjianjie != null) lyzy_list =
			 * eval(data.lvyouziyuanjianjie.replace(/[\r\n]/g, ""));
			 * 
			 * if (data.lvyouziyuanimg != undefined && data.lvyouziyuanimg !=
			 * null) lyzy_images = eval(data.lvyouziyuanimg.replace(/[\r\n]/g,
			 * ""));
			 * 
			 * if (lyzy_images != null && lyzy_images.length > 0) {
			 * lyzy_images.forEach(function(item) { var title =
			 * item.title.replace(/(^\s*)|(\s*$)/g, ''); var src =
			 * item.content.replace("http://p.gxyj.com", 'assets/images')
			 * 
			 * if (title != "" && src != "") { var find =
			 * lyzy_list.filter(function(a) { return (a.title).match(title) });
			 * 
			 * var tt = find.length > 0 ? find[0].title : title;
			 * 
			 * ly_data.push({ title : tt, src : src, description : find.length >
			 * 0 ? find[0].content : "暂无&nbsp;" + tt + "&nbsp;相关介绍。" }); } }); }
			 * 
			 * if (data.fengturenqingjieshao != undefined &&
			 * data.fengturenqingjieshao != null) ftrq_list =
			 * eval(data.fengturenqingjieshao.replace(/[\r\n]/g, ""))
			 * 
			 * if (data.fengturenqingimg != undefined && data.fengturenqingimg !=
			 * null) ftrq_list = eval(data.fengturenqingimg.replace(/[\r\n]/g,
			 * ""))
			 * 
			 * if (ftrq_images != null && ftrq_images.length > 0) {
			 * ftrq_images.forEach(function(item) { var title =
			 * item.title.replace(/(^\s*)|(\s*$)/g, ''); var src =
			 * item.content.replace("http://p.gxyj.com", 'assets/images')
			 * 
			 * if (title != "" && src != "") { var find =
			 * ftrq_list.filter(function(a) { return (a.title).match(title) });
			 * 
			 * var tt = find.length > 0 ? find[0].title : title;
			 * 
			 * ly_data.push({ title : find.length > 0 ? find[0].title : title,
			 * src : src, description : find.length > 0 ? find[0].content :
			 * "暂无&nbsp;" + tt + "&nbsp;相关介绍。" }); } }); } });
			 * 
			 * featureLayout(".features", getCityName(code),
			 * tc_data.concat(ly_data));
			 * 
			 * delete data;
			 */
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
	var pageNum = 8;
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
		$("#feature" + pageIndex).empty().append("<h1 style='font-family:黑体;'>" + (title == "china" ? "全国贫困县" : title) + "-优势资源</h1>");
		$("#feature" + pageIndex).append("<hr style='margin:20px 60px 30px;border:solid 2px #fff;' />")

		items.forEach(function(item) {
			if (item == undefined)
				return;

			if (item.src == undefined)
				return;

			// var itemContainer = $("<div class='col-md-3
			// pkx_item'><div
			// class='intro'><img src='" + item.src + "' alt='" +
			// item.title +
			// "' /><h4 class='opacityTitle'
			// style='bottom:-5px!important;
			// border-bottom-left-radius:8px;border-bottom-right-radius:8px;'>"
			// + item.title + "</h4></div><div class='content'>" +
			// item.description + "</div></div>");

			var itemContainer = $("<div class='pkx_item'><img src='" + item.src + "' alt='" + item.title + "' /><h3 style='color:#48ade1;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:黑体'>" + item.title + "</h3></div>");

			itemContainer.data("title", item.title);
			itemContainer.data("src", item.src);
			itemContainer.data("content", item.description);
			$("#feature" + pageIndex).append(itemContainer);
		});
	}
	/*
	 * $('.carousel').carousel({ interval : 2000 });
	 * 
	 * $('.carousel').carousel("cycle");
	 */
}

function loadMainMapData(name) {
	var allData = getData(name);
	var o1 = $.extend(true, {}, mapOption);
	initMap(mapAll, o1, {
		title : "全国网络扶贫成效",
		name : name,
		data : allData,
		geo : {
			show : false
		},
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				if ($.isArray(params.value)) {
					return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value[2]) ? 0 : params.value[2]);
				} else {
					return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value) ? 0 : params.value);
				}
			}
		},
		maxValue : allData["推进力度"].length > 0 ? allData["推进力度"][0].value : 1
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
				symbolSize : [ 5, 20 ],
			}
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
						return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value[2]) ? 0 : params.value[2]);
					} else {
						return params.name + "&nbsp;:&nbsp;" + (isNaN(params.value) ? 0 : params.value);
					}
				}
			}
		},
		data : pkxData,
		maxValue : pkxData["推进力度"].length > 0 ? pkxData["推进力度"][0].value[2] : 1,
		completed : function(t, o, p) {
			hightLight(t, p.dataName);
			selectedMapArea(t, p.dataName);
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
				'双师学校' : [],
				'联盟学校' : []
			},
			addSeries : function(series, res) {
				var schoolData = res.schoolData;
				var schoolValue = res.schoolValue;
				var renDaSchool = [ {
					name : '中国人民大学附属中学',
					coord : [ 116.32433053162889, 39.98044648296058 ]
				} ];

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
						}
						dataScatter.push({
							name : data.name,
							value : data.coord
						})
					})
					series.push({
						name : schoolType,
						type : 'lines',
						zlevel : 1,
						effect : {
							show : true,
							period : 8,
							trailLength : 0.7,
							symbolSize : 2,
							shadowBlur : 0
						},
						lineStyle : {
							normal : schoolType == '双师学校' ? {
								color : '#E4C554',
								width : 0,
								opacity : 1,
								curveness : 0.1
							} : {}
						},
						data : schoolType == '双师学校' ? dataLine : []
					}, {
						name : schoolType,
						type : 'lines',
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
						data : schoolType == '双师学校' ? dataLine : []
					}, {
						name : schoolType,
						type : 'scatter',
						coordinateSystem : 'geo',
						zlevel : 2,
						symbolSize : schoolType == '双师学校' ? 1 : 5,
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
								opacity : 0.5,
								curveness : 0.1
							} : {}
						},
						data : dataScatter
					})
				}
			}
		})
	}

	delete allData, pkxData, schoolData;
}

function loadLineData(name) {
	var fpYear = getFiveProjectByYear(name);

	updateChart(fpAll, {
		chartType : "line",
		color : lineColor,
		legend : legends,
		xData : years,
		yData : fpYear,
		title : (name == 'china' ? "全国" : name) + "网络扶贫趋势",
		orientLegend : 'horizontal',
		showLegend : true,
		showYAxisLabel : false,
		grid : {},
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
		leftLegend : 190,
		inside : true,
		labelTextStyle : {
			color : '#fff',
			fontSize : 17,
			fontWeight : 'normal',
			fontFamily : "微软雅黑"
		},
		seriesLabel : {
			normal : {
				show : false,
				pisition : 'insideRight',
				formatter : '{a}{b}',
				textStyle : {
					color : '#fff',
					fontFamily : 'Arial',
					fontSize : 16
				}
			}
		}
	});
}

function loadBarData(name) {
	var fiveProjectByLegend = getFiveProjectByLegend(name);
	updateChart(fpContrast, {
		chartType : "bar",
		legend : years,
		xData : legends,
		yData : fiveProjectByLegend,
		title : (name == 'china' ? "全国" : name) + "网络扶贫五大工程趋势",
		orientLegend : 'horizontal',
		showYAxisLabel : false,
		showLegend : true,
		grid : {},
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
		labelTextStyle : {
			color : '#fff',
			fontSize : 22,
			fontWeight : 'normal',
			fontFamily : "微软雅黑"
		}
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
		maxValue : 50,
		visualMap : {
			inRange : {
				color : [ '#A6F5B0', '#E7E04E', '#FFB930', '#FE6C2D', '#F82B29' ],
				colorAlpha : 0.8
			}
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
						symbolSize : 6,
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
						symbolSize : 6,
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
	delete params;
}

function getAssistNumData(name) {
	var cityCode = getCityCode(name);
	if (!cityCode.match("[0-9]{2}0000"))
		return;

	var assistCount = getAssistCountByName(name);
	if (assistCount.toCount == 0) {
		$("#AssistNum1").hide();
		$("#AssistNum").hide();
	} else if (assistCount.type == "all") {
		$("#AssistNum1").show()
		$("#AssistNum").show();
		$("#AssistNum").html("<font style='font-size:28px;color:#fff;'>" + (name == "china" ? "全国" : name) + "帮扶区县&nbsp;</font><font  style='font-size:25px;color:#fff; '>" + assistCount.fromCount + "&nbsp个</font>")
		$("#AssistNum1").html("<font style='font-size:28px;color:#fff;'>" + (name == "china" ? "全国" : name) + "协作区县&nbsp;</font><font  style='font-size:25px;color:#fff;'>" + assistCount.toCount + "&nbsp个</font>")
	} else {
		$("#AssistNum1").hide()
		$("#AssistNum").show();
		$("#AssistNum").html("<font style='font-size:28px;color:#fff;'>" + name + " 协作扶贫区县&nbsp;</font><font  style='font-size:25px;color:#fff;'>" + assistCount.toCount + "个</font>")
	}
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
	var value = parseInt(75 * doubleCount / (doubleCount + sharedCount))
	pieOption.title.subtext = name == 'china' ? '全国' : name
	pieOption.series[1].data = [ {
		name : '双师学校',
		value : value,
		relayValue : doubleCount
	}, {
		name : '联盟学校',
		value : 100 - value,
		relayValue : sharedCount
	} ];
	schoolPie.setOption(pieOption, true);
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
	$("#cityNum").html("<font style='font-size: 28px; color: #fff;'>贫困县&nbsp;</font><font style='font-size: 25px; color: #fff'>" + pkx.length + "&nbsp个</font>")
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
	var t = targetChart.getOption();
	var code = getCityCode(name);
	if (name != 'china') {
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
}

function updataShuangshiData(targetChart, name) {
	var provSchoolData;
	var dataLine = [];
	if (name != 'china') {
		var provCode = getCityCode(name).substring(0, 2) + "0000";
		provSchoolData = getSchoolData(getCityName(provCode));
		var schoolData = provSchoolData.schoolData;
		for ( var schoolType in schoolData) {
			schoolData[schoolType].forEach(function(data) {
				if (schoolType == '双师学校') {
					dataLine.push({
						fromName : '中国人民大学附属中学',
						toName : data.name,
						coords : [ [ 116.32433053162889, 39.98044648296058 ], data.coord ]
					});
				}
			})
		}
		var t = targetChart.getOption();
		t.series.forEach(function(s, i) {
			if (s.name == '双师学校') {
				if (s.type == 'lines')
					t.series[i].data = dataLine;
				else if (s.type == 'scatter')
					t.series[i].symbolSize = 5

			}
		})
		targetChart.setOption(t, true)
	}
}

function markAssistProvince(cityCode) {
	if (cityCode == undefined || cityCode == null || cityCode == "000000")
		return;

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

	mapAssist.dispatchAction({
		type : 'legendSelect',
		name : provinceName
	});
}

function loadFivePieData(name) {
	var fiveProjectByYear = getFiveProjectByYear(name);
	var option = {
		title : [
		// {
		// // text : '网络覆盖',
		// x : '9%',
		// y : '50%',
		// textAlign : "center",
		// textStyle : {
		// color : '#fff',
		// fontWeight : 'normal',
		// fontSize : 12
		// }
		// }, {
		// // text : '农村电商',
		// x : '29%',
		// y : '50%',
		// textAlign : "center",
		// textStyle : {
		// color : '#fff',
		// fontWeight : 'normal',
		// fontSize : 12
		// }
		//
		// },
		],
		color : mapColor,
		series : []
	}
	var i = 0;
	for ( var project in fiveProjectByYear) {
		var data = [];
		fiveProjectByYear[project].forEach(function(x, i) {
			data.push({
				name : years[i],
				value : x
			})
		});
		var coord = [ [ '10%', '61%' ], [ '30%', '61%' ], [ '50%', '61%' ], [ '70%', '61%' ], [ '90%', '61%' ] ]
		option.title.push({
			text : project,
			left : 115 + (i * 240),
			y : '54%',
			textAlign : "center",
			textStyle : {
				color : lineColor[i],
				fontWeight : 'normal',
				fontSize : 16
			}

		})
		option.series.push({
			name : project,
			type : 'pie',
			radius : [ '50%', '70%' ],
			center : coord[i],
			data : data,
			itemStyle : {
				emphasis : {
					shadowBlur : 10,
					shadowOffsetX : 0,
					shadowColor : 'rgba(0, 0, 0, 0.5)'
				}
			},
			label : {
				normal : {
					show : true,
					// position:'inside',
					textStyle : {
						color : '#fff',
						fontSize : 16
					},
					formatter : '{b}'
				}
			},
			labelLine : {
				normal : {
					length2 : 6,
				}
			}
		})
		i++;
	}
	fivePie.setOption(option, true);
	delete option;
}
// 包头不包含尾

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
	if (name == "china")
		return;

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
	if (cityCode == undefined)
		cityCode = '000000'

		// 加载 学校，贫困县，扶贫力度地图数据
	getMapJson(cityCode, {
		name : name
	}, function(c, p, map) {
		// 加载主要的地图
		loadMainMapData(p.name);

		// 加载协作地图
		loadAssistData(p.name);

		// 更新地图双师学校数量
		updataShuangshiData(mapSchool, name);

		// 学校高亮显示
		hightLight(mapSchool, name);

		// 区域标识
		selectedMapArea(mapSchool, name);

		addBack(c);
	});

	// 柱状图
	loadBarData(name);

	// 线图
	loadLineData(name);

	// 贫困县数量
	getPKXcityNum(name);

	// 五个饼图
	loadFivePieData(name);

	// 风貌
	getFeature(cityCode);

	// 学校数量
	getSchoolNumData(name);

	// 区县帮扶
	getAssistNumData(name);
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

	echartsDefaultOption.title.textStyle = bigScreenTitleTextStyle;

	// echartsDefaultOption.title.text = '全国推进力度排名';
	// topAll.setOption($.extend(true, {}, echartsDefaultOption), true);
	//
	// echartsDefaultOption.title.text = '贫困县推进力度排名';
	// topCity.setOption($.extend(true, {}, echartsDefaultOption), true);

	echartsDefaultOption.title.text = '全国网络扶贫趋势';
	fpAll.setOption($.extend(true, {}, echartsDefaultOption), true);

	echartsDefaultOption.title.text = '全国网络扶贫五大工程趋势';
	echartsDefaultOption.color = mapColor;
	fpContrast.setOption($.extend(true, {}, echartsDefaultOption), true);

	GlobalLinkage(name);
}

init('china');

$(document).delegate(".pkx_item", "click", function() {
	var that = $(this);

	$(".slide").css("display", "none");
	$(".details").append("<h1>" + that.data('title') + "</h1><div class='description'><img src='" + that.data('src') + "' />" + that.data('content')+"</div>");
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
		markAssistProvince(getCityCode(params.name));
	}
});

mapAll.on('legendselectchanged', function(params) {
	mapCity.dispatchAction({
		type : 'legendSelect',
		name : params.name
	});
	refreshvisualMap(mapAll);
	refreshvisualMap(mapCity);
});

mapSchool.on('click', function(params) {
	showModal(mapSchool, params);

	var cityCode = getCityCode(params.name);
	GlobalLinkage(params.name);
	markAssistProvince(cityCode);
})

mapCity.on('click', function(params, ev) {
	var cityCode = getCityCode(params.name);

	// 县成效显示特产图
	if (cityCode.substring(4, 6) == '00' || cityCode.substring(2, 6) == '0000') {
		GlobalLinkage(params.name);
		markAssistProvince(getCityCode(params.name));
	}
});

mapAssist.on('click', function(params, ev) {
	if (params.value == undefined) {
		GlobalLinkage(params.name);
		markAssistProvince(getCityCode(params.name));
	}
})

$("#back").click(function() {
	var cityName = getCityName($(this).attr("code"));
	GlobalLinkage(cityName);
	markAssistProvince(getCityCode(cityName));
});

window.onresize = function() {
	mapAll.resize();
	mapEvolution.resize();
	mapCity.resize();

	topAll.resize();
	topCity.resize();

	fpAll.resize();
	fpContrast.resize();
}

var autoPlay = null;
var playIndex = 0;
var playList = [ 
{
	code : "360000",
	name : "江西",
	type : "map"
},/*{
	code : "510000",
	name : "四川",
	type : "map"
},*/ {
	name : "网络覆盖",
	type : "legend"
}, {
	name : "推进力度",
	type : "legend"
}, {
	code : "360700",
	name : "赣州市",
	type : "map"
},{
	code : "360730",
	name : "宁都县",
	type : "map"
},{
	name : "联盟学校",
	type : "school"
}, {
	name : "双师学校",
	type : "school"
},/*{
	code : "511900",
	name : "巴中市",
	type : "map"
},{
	code : "511921",
	name : "通江县",
	type : "map"
}, */ {
	code : "000000",
	name : "china",
	type : "map"
} ];

function play() {
	autoPlay = setInterval(function() {
		loadAutoData(playList[playIndex])
		if (playIndex == playList.length - 1)
			playIndex = 0;
		else
			playIndex += 1;
	}, 5000);
}
var waverCount = 4;
var waverSpaceTime = 200;

function waver(targetChart, playObject, index) {
	setTimeout(function() {
		targetChart.dispatchAction({
			type : index % 2 == 0 ? "highlight" : "downplay",
			seriesName : '推进力度',
			name : playObject.name
		});
	}, waverSpaceTime * index);
}

function loadAutoData(playObject) {
	if (playObject.type == "map") {

		if (playObject.code != "000000") {
			for (var index = 0; index < waverCount; index++) {
				waver(mapAll, playObject, index)
			}
		}
		setTimeout(function() {
			GlobalLinkage(playObject.name)
			markAssistProvince(playObject.code);
		}, waverCount * waverSpaceTime);

	} else if (playObject.type == "legend") {
		mapAll.dispatchAction({
			type : 'legendSelect',
			name : playObject.name
		});
		mapCity.dispatchAction({
			type : 'legendSelect',
			name : playObject.name
		});
		refreshvisualMap(mapAll);
		refreshvisualMap(mapCity);
	} else {
		mapSchool.dispatchAction({
			type : 'legendSelect',
			name : playObject.name
		});
	}
}
$("#autoPlayControl").click(function() {
	if (autoPlay == null)
		$($(this).children("img").get(0)).attr("src", "assets/images/停止.png");
	else
		$($(this).children("img").get(0)).attr("src", "assets/images/开始.png");

	playControl();
});

function playControl() {
	if (autoPlay == null) {
		play();
	} else {
		clearInterval(autoPlay);
		autoPlay = null;
		playIndex = 0;
		loadAutoData(playList[playList.length - 1])
	}
}
