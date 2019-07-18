/* =====================================贫困县地图分布====================================== */
var pk_option = {
	geo : {
		show : false,
		map : 'china',
		roam : true,
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle
	},
	title : {
		text : '贫困县通宽带情况',
		left : 'center',
		textStyle : titleTextStyle,
		subtext : '单位：用户数',
		subtextStyle : subTitleTextStyle
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
		selectedMode : 'single',
		color : defaultColor
	},
	color : categoryColor,
	animationDuration : 1000,
	animationEasing : 'cubicOut',
	animationDurationUpdate : 1000
}
var countryPoorObj = {
	"省" : {
		parentNames : [ "china" ],
		childNames : [ "山西", "云南", "西藏", "青海", "新疆" ]
	},
	"市" : {
		parentNames : [ "江西", "湖北", "湖南", "四川", "甘肃" ],
		childNames : [ "赣州市", "恩施土家族苗族自治州", "湘西土家族苗族自治州", "凉山彝族自治州", "定西市" ]
	},
	"县" : {
		parentNames : [ "张家口市", "兴安盟", "河池市", "商洛市", "吴忠市" ],
		childNames : [ "康保县", "科尔沁右翼中旗", "都安瑶族自治县", "山阳县", "同心县" ]
	}
};

var __chartObjects = {};

function getChart(id) {
	if (document.getElementById(id) == undefined)
		return null;

	if (__chartObjects[id] == undefined)
		__chartObjects[id] = echarts.init(document.getElementById(id));

	return __chartObjects[id];
}
var pingkunChart = getChart('pingkunCounty');
var networkAreaLine = getChart('networkAreaChart');
var networkCoverage = getChart('networkCoverage');
var networkDeepChart = getChart('networkDeepChart');
var networkDeepChart2 = getChart('networkDeepChart2');
var networkDeepChart3 = getChart('networkDeepChart3');
var networkDeepChart4 = getChart('networkDeepChart4');
var networkDeepChart5 = getChart('networkDeepChart5');

var networkDeepTop = getChart('networkDeepTop');
var networkDeepTop2 = getChart('networkDeepTop2');
var networkDeepTop3 = getChart('networkDeepTop3');
var networkDeepTop4 = getChart('networkDeepTop4');
var networkDeepTop5 = getChart('networkDeepTop5');

var deepChartArr = [ networkDeepChart, networkDeepChart2, networkDeepChart3, networkDeepChart4, networkDeepChart5 ]
var deepChartTopArr = [ networkDeepTop, networkDeepTop2, networkDeepTop3, networkDeepTop4, networkDeepTop5 ]

// var networkDeepChart1 = getChart('networkAreaChart3');
function addSeries(tagetChart, mapName, name, data, pointData) {
	var t = tagetChart.getOption();
	t.legend[0].data.push({
		name : name,
		icon : 'circle'
	});
	t.legend[0].selected[name] = true
	t.visualMap = {
		min : 0,
		// max : res[0].value,
		max : 20000,
		left : "3%",
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
		mapType : mapName,
		top : '15%',
		roam : true,
		data : data,
		showLegendSymbol : false,
		z : 1,
		nameMap : {
			'china' : '中国'
		},
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle,
		markPoint : {
			symbol : "image://assets/images/In_topPoint.png",
			symbolSize : function(val, params) {
				// console.log(params.data.coord[2])
				if (isNaN(params.data.std))
					return 15;

				return params.data.std;
			},
			data : (pointData || []),
			tooltip : {
				trigger : 'item',
				formatter : function(params) {
					if (isNaN(params.data.coord[2]))
						return params.name + ":" + '0';
					else
						return params.name + ":" + toThousands(params.data.coord[2]);
				}
			},
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
		}
	});
	tagetChart.setOption(t, true);
}

function pk_getData(name, cityNames, category) {
	var tmpData = WLFG[name];
	var legendData = [];
	var xData = [];
	var tmp = {};
	var tmp1 = {};
	var WLFGdata = {};
	for ( var prov in tmpData) {
		var provData = tmpData[prov]
		for ( var _cate in provData) {
			var value = 0
			for ( var _category in provData[_cate]) {
				if (category == '全部' || category == undefined) {
					value += provData[_cate][_category]['2016'];
					for ( var year in provData[_cate][_category]) {
						if (tmp[_cate] == undefined) {
							tmp[_cate] = {}
						}
						if (tmp[_cate][year] == undefined)
							tmp[_cate][year] = provData[_cate][_category][year]
						else {
							tmp[_cate][year] += provData[_cate][_category][year]
						}

					}

				} else if (_category == category) {
					value = provData[_cate][_category]['2016'];
					for ( var year in provData[_cate][_category]) {
						if (tmp[_cate] == undefined) {
							tmp[_cate] = {}
						}
						if (tmp[_cate][year] == undefined)
							tmp[_cate][year] = provData[_cate][_category][year]
						else {
							tmp[_cate][year] += provData[_cate][_category][year]
						}

					}
				}
			}
			if (WLFGdata[_cate] == undefined) {
				WLFGdata[_cate] = [];
			}
			WLFGdata[_cate].push({
				name : prov,
				value : value
			})

		}
	}

	for ( var cate in WLFGdata) {
		var citys = WLFGdata[cate].map(function(x) {
			return x.name;
		});

		for (var i = 0; i < cityNames.length; i++) {
			if (citys.indexOf(cityNames[i]) == -1) {
				WLFGdata[cate].push({
					name : cityNames[i]
				});
			}
		}
	}

	for ( var cate in tmp) {
		legendData.push(cate)
		for ( var year in tmp[cate]) {
			if (tmp1[cate] == undefined)
				tmp1[cate] = []

			tmp1[cate].push(tmp[cate][year] / 10000);
			if (xData.indexOf(year) == -1)
				xData.push(year)
		}
	}
	return {
		legend : legendData,
		x : xData,
		y : tmp1,
		data : WLFGdata
	};
}

function getCateDataByProvName(name) {
	var tmpData = WLFG[name];

	var data = {};
	for ( var prov in tmpData) {
		var provData = tmpData[prov];
		var v = 0;

		for ( var _cate in provData) {
			if (data[_cate] == undefined)
				data[_cate] = {};

			var _cateData = provData[_cate];
			for ( var _category in _cateData) {
				if (data[_cate][_category] == undefined)
					data[_cate][_category] = 0;

				data[_cate][_category] += _cateData[_category]['2016'];
			}
		}
	}

	var res = {};
	for ( var _cate in data) {
		if (res[_cate] == undefined)
			res[_cate] = [];

		for ( var k in data[_cate]) {
			res[_cate].push({
				name : k,
				value : data[_cate][k]
			});
		}
	}
	return res;
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

function sumData(targetChart) {
	console.log(targetChart)
	var sumData = [];
	var t = targetChart.getOption();

	for ( var l in t.legend[0].selected) {
		if (t.legend[0].selected[l]) {
			for (var i = 0; i < t.series.length; i++) {
				if (t.series[i].name != l)
					continue;

				var seriesData = t.series[i].data;
				for (var j = 0; j < seriesData.length; j++) {
					if (sumData[j])
						sumData[j] += seriesData[j];
					else
						sumData[j] = seriesData[j];
				}

				break;
			}
		}
	}

	t.series.filter(function(x) {
		return x.name == "汇总";
	})[0].data = sumData;
	targetChart.setOption(t, true);
};

function setSelectedSeries(targetChart) {
	var selectedSeriesName = $(".btnProject a.active").attr("realValue");
	if (selectedSeriesName == undefined)
		return;
	var t = targetChart.getOption();
	for ( var series in t.legend[0].selected) {
		if (series == selectedSeriesName)
			t.legend[0].selected[series] = true
		else {
			t.legend[0].selected[series] = false
		}
	}
	targetChart.setOption(t, true);
}

function addNavigate(code) {
	var that = $("#navgate");
	that.empty();
	addBack(code);
	loadPie(getCityName(code));
	pk_showMap(pingkunChart, {
		name : idMapCity[code],
		deepArea : []
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

function loadDeepTop(targetChart, data0, option) {
	var data = data0.markPoint.data.map(function(d) {
		return {
			name : d.name,
			value : (d.coord[2] || 0)

		}
	}).sort(function(a, b) {
		return (b.value || 0) - (a.value || 0);
	}).filter(function(d) {
		if (d.value != 0)
			return d;
	});
	var gridSetting = {
		top : '8%',
		containLabel : true
	};

	if (data.length < 20) {
		gridSetting = $.extend(true, gridSetting, {
			height : data.length * 6 + '%'
		});
	} else {
		gridSetting = $.extend(true, gridSetting, {
			height : '70%'
		});
	}
	var _option = {
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
	}
	if (option != undefined) {
		_option = $.extend(true, option, _option)
	}
	showTop(targetChart, data0.name, data, 10, _option);
}

// 生成贫困县地图
function pk_showMap(targetChart, params) {
	var cityCode = cityMap[params.name];
	if (cityCode == undefined)
		return;

	getMapJson(cityCode, params, function(c, p, map, cityNames) {
		var _pk_option = pk_option;
		_pk_option.geo.map = params.name;
		if (p.option != undefined) {
			_pk_option = $.extend(true, {}, pk_option, p.option)
		}
		targetChart.setOption(_pk_option, true);

		var res = pk_getData(p.name, cityNames, undefined)
		if ($.isEmptyObject(res.data)) {
			addSeries(targetChart, params.name, '', [])
		} else {
			for ( var projName in res.data) {
				// 深度贫困地区
				var deepArea = [];

				res.data[projName].forEach(function(obj) {
					if (obj.name == "山西" || obj.name == "云南" || obj.name == "西藏" || obj.name == "青海" || obj.name == "新疆") {
						deepArea.push({
							name : obj.name,
							coord : geoCoordMap[obj.name].concat(obj.value)
						})
					}
				})
				if (p.name != "china") {
					var counties = getLevelCounties(p.name)
					if (counties != undefined) {
						for ( var countyName in counties) {
							var countyData = getDestituteAreasData(countyName)
							if (countyData.state != 0)
								continue;
							var v;
							if (countyData == undefined) {
								v = 0
							} else if (projName == '固定宽带家庭用户数') {
								v = countyData["2016gd"]
							} else if (projName == '移动宽带用户数') {
								v = countyData["2016yd"]
							}
							deepArea.push({
								name : countyName,
								coord : counties[countyName].concat([ v ])
							})

						}
					}
					if (p.deepArea != undefined)
						deepArea = p.deepArea
					STDMinMax(deepArea)
				}

				addSeries(targetChart, params.name, projName, res.data[projName], deepArea);
			}
		}
		if (!p.tag) {
			updateBar(res.legend, res.x, res.y)
		}

		var oldLegendSelected = $("#pingkunCounty").data("legend");
		if (oldLegendSelected != undefined && oldLegendSelected != null) {
			var t = targetChart.getOption();
			t.legend[0].selected = oldLegendSelected;
			targetChart.setOption(t, true);
		}
		if (params.callback != undefined)
			params.callback();
		refreshvisualMap(targetChart, function(m) {
			return Math.round(m * 0.8);
		});

	});
}

function loadPie(name) {
	var cityCode = cityMap[name];
	if (cityCode == undefined)
		return;

	var data = getCateDataByProvName(name);
	var option = {
		color : categoryColor,
		title : {
			left : 'center',
			text : '三大运营商占比',
			top : '6%',
			textStyle : titleTextStyle,
			subtextStyle : subTitleTextStyle
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
			top : '20%',
			data : [ {
				name : "固定宽带家庭用户数",
				icon : 'circle'
			}, {
				name : "移动宽带用户数",
				icon : 'circle'
			} ],
			color : defaultColor,
			itemGap : screenScale * 20,
			itemHeight : screenScale * 20,
			textStyle : legendTextStyle,
			selectedMode : 'single'
		},
		animationDuration : 1000,
		animationDurationUpdate : 500,
		series : [ {
			name : "固定宽带家庭用户数",
			type : 'pie',
			center : [ '50%', '65%' ],
			radius : [ '35%', '60%' ],
			data : data["固定宽带家庭用户数"] == undefined ? [] : data["固定宽带家庭用户数"],
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
					textStyle : labelTextStyle,
					formatter : '{b}\n{d}%'
				},
				emphasis : {
					show : true,
					textStyle : labelTextStyle,
					formatter : '{b}\n{d}%'
				}
			}
		}, {
			name : "移动宽带用户数",
			type : 'pie',
			center : [ '50%', '65%' ],
			radius : [ '35%', '60%' ],
			data : data["移动宽带用户数"] == undefined ? [] : data["移动宽带用户数"],
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
					textStyle : labelTextStyle,
					formatter : '{b}\n{d}%'
				},
				emphasis : {
					show : true,
					textStyle : labelTextStyle,
					formatter : '{b}\n{d}%'
				}
			}
		} ]
	};
	// var o1 = $.extend(true, echartsDefaultOption, option);
	// console.log(o1);
	networkCoverage.setOption(option, true);
}

function pk_deepAreaData(targerChart, name, category) {
	var tmpData = WLFG[name];
	var legendData = [];
	var xData = [];
	var tmp = {};
	var tmp1 = {};
	var WLFGdata = {};
	for ( var prov in tmpData) {
		var provData = tmpData[prov]
		for ( var _cate in provData) {
			var value = 0
			for ( var _category in provData[_cate]) {
				if (category == '全部' || category == undefined) {
					value += provData[_cate][_category]['2016'];
					for ( var year in provData[_cate][_category]) {
						if (tmp[_cate] == undefined) {
							tmp[_cate] = {}
						} else if (tmp[_cate][year] == undefined)
							tmp[_cate][year] = provData[_cate][_category][year]
						else {
							tmp[_cate][year] += provData[_cate][_category][year]
						}

					}

				} else if (_category == category) {
					value = provData[_cate][_category]['2016'];
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
			if (WLFGdata[_cate] == undefined) {
				WLFGdata[_cate] = [];
			}
			WLFGdata[_cate].push({
				name : prov,
				value : value
			})

		}
	}
	for ( var cate in tmp) {
		legendData.push(cate)
		for ( var year in tmp[cate]) {
			if (tmp1[cate] == undefined)
				tmp1[cate] = []

			tmp1[cate].push(tmp[cate][year] / 10000);
			if (xData.indexOf(year) == -1)
				xData.push(year)
		}
	}
	;
	updateChart(targerChart, {
		title : name + "通宽带情况",
		chartType : "bar",
		color : echartTheme.barColor,
		legend : legendData,
		labelTextStyle : {
			color : '#B2C6EB',
			fontSize : 16 * screenScale,
			fontFamily : "Microsoft YaHei"
		},
		legendNew : {
			left : 'center',
			selectedMode : true,
			itemHeight : 10,
			itemWidth : 10,
			textStyle : {
				color : '#B2C6EB'
			}
		},
		xData : xData,
		yData : tmp1,
		stack : "深度贫困地区通宽带情况",
		yName : '单位（万户）',
		xName : '年份',
		x : {
			axisLine : {
				show : true,
				lineStyle : {
					color : echartTheme.x_axisLineColor
				}
			},
			nameTextStyle : {
				color : echartTheme.x_axisLineColor,
			}
		},
		y : {
			axisLine : {
				show : true,
				lineStyle : {
					color : echartTheme.y_axisLineColor
				}
			},
			nameTextStyle : {
				color : echartTheme.y_axisLineColor,
			},
			axisTick : {
				show : true,
				lineStyle : {
					color : echartTheme.y_axisTick
				}
			},
			splitLine : {
				show : true,
				lineStyle : {
					color : echartTheme.y_axisLineColor,
					opacity : 0.34
				}

			}
		},
		grid : {
			height : '60%',
			bottom : '15%',
			containLabel : true
		},
		seriesLabel : {
			normal : {
				show : false,
				position : 'inside',
				textStyle : {
					color : '#000',
					fontSize : 12 * screenScale
				},
				formatter : function(params) {
					return calcPercent(targetChart, params.seriesIndex, params.dataIndex);
				}
			}
		},
		tooltip : {
			formatter : function(p) {
				return p.name + "<br/>" + p.seriesName + ":" + toThousands(p.value, 0);
			}
		},
		XboundaryGap : true,
		showSumLine : true,
		sumLineSeries : {
			symbolSize : 0.1,
			label : {
				normal : {
					textStyle : {
						color : "#828DAD"
					}
				}
			},
			lineStyle : {
				normal : {
					opacity : 0
				}
			}
		},
		pointNum : 0,
		showYAxisLabel : true,
		inside : false,
		showLegend : true,
		orientLegend : 'horizontal'
	});
};

function deepChartLegendChange(targetChart, params) {
	targetChart.dispatchAction({
		type : 'legendSelect',
		name : params.name
	});
	refreshvisualMap(targetChart, function(m) {
		return Math.round(m * 0.8);
	});

	var mapName = targetChart.getOption().series[0].map;
	loadDeepTop(deepChartTopArr[deepChartArr.indexOf(targetChart)], getSelectedSeries(targetChart), {
		title : mapName + "深度贫困县排名"
	})
}

function updateBar(legendData, xData, yData) {
	updateChart(networkAreaLine, {
		chartType : "bar",
		color : categoryColor,
		legend : legendData,
		legendNew : {
			left : 'center',
			selectedMode : true
		},
		xData : xData,
		yData : yData,
		yName : '单位（万户）',
		xName : '年份',
		stack : "通宽带情况",
		seriesLabel : {
			normal : {
				show : true,
				position : 'top',
				textStyle : {
					color : "#fff",
					fontSize : 12 * screenScale
				},
				formatter : function(params) {
					return toThousands(params.value, 2);
				}
			}
		},
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
		},
		seriesOption : {
			stack : "国家级贫困市",
		},
		tooltip : {
			formatter : function(p) {
				return p.name + "<br/>" + p.seriesName + ":" + toThousands(p.value);
			}
		},
		XboundaryGap : true,
		showYAxisLabel : true,
		inside : false,
		showLegend : true,
		orientLegend : 'horizontal'
	});

	var t = networkAreaLine.getOption();
	t.xAxis.push({
		data : xData.concat(xData),
		show : false
	});

	t.series.forEach(function(item, i) {
		var tmp = [];
		item.data.forEach(function(x, j) {
			if (i == 0) {
				tmp.push(x);
				tmp.push("-")
			} else {
				tmp.push("-")
				tmp.push(x);
			}
		});

		t.series.push({
			name : item.name + "汇总",
			type : "line",
			connectNulls : true,
			showSymbol : true,
			symbol : 'circle',
			symbolSize : 7 * screenScale,
			stack : item.name + '数据汇总',
			xAxisIndex : 1,
			label : {
				normal : {
					show : false
				}
			},
			lineStyle : {
				normal : {
					width : 2 * screenScale,
					color : "#E7E04E"
				}
			},
			itemStyle : {
				normal : {
					borderWidth : 0,
					shadowBlur : 0
				}
			},
			data : tmp
		});
	});
	networkAreaLine.setOption(t, true);
}

function deepChartClick(_thisChart, params) {
	var cityCode = getCityCode(params.name)
	if (cityCode != undefined && cityCode.substring(4, 6) != "00") {
		pk_deepAreaData(deepChartTopArr[deepChartArr.indexOf(_thisChart)], params.name, undefined);
	} else {
		var p = _thisChart.getOption();
		var selectedSeies = getSelectedSeries(_thisChart)
		selectedSeies.markPoint.data = selectedSeies.markPoint.data.filter(function(d) {
			var _code = getCityCode(d.name);
			if (_code != undefined) {
				if (cityCode.substring(0, 4) == _code.substring(0, 4)) {
					return d;
				}
			}
		});
		loadDeepTop(deepChartTopArr[deepChartArr.indexOf(_thisChart)], selectedSeies, {
			title : params.name + "深度贫困县排名"
		});
	}
}

pingkunChart.on('click', function(params, ev) {
	var t = pingkunChart.getOption();
	$("#pingkunCounty").data("legend", t.legend[0].selected);

	addNavigate(cityMap[params.name]);
});

pingkunChart.on('legendselectchanged', function(params) {
	var t = pingkunChart.getOption();
	$("#pingkunCounty").data("legend", t.legend[0].selected);

	refreshvisualMap(pingkunChart, function(m) {
		return Math.round(m * 0.8);
	});
});

for (var i = 0; i < deepChartArr.length; i++) {
	deepChartArr[i].on('legendselectchanged', function(params) {
		deepChartLegendChange(this, params)
	});

	deepChartArr[i].on('click', function(params) {
		deepChartClick(this, params)
	})
}

for (var i = 0; i < deepChartTopArr.length; i++) {
	console.log(deepChartTopArr)
	deepChartTopArr[i].on('legendselectchanged', function(params) {
		sumData(this);
	});
}

networkAreaLine.on('legendselectchanged', function(params) {
	var sumData = [];
	var t = networkAreaLine.getOption();

	var selectedLegends = Object.keys(t.legend[0].selected).filter(function(x) {
		return t.legend[0].selected[x] == true;
	});

	for ( var l in t.legend[0].selected) {
		if (t.legend[0].selected[l]) {
			for (var i = 0; i < t.series.length; i++) {
				if (t.series[i].name != l)
					continue;

				var seriesData = t.series[i].data;
				var cs = t.series.filter(function(x) {
					return x.name == l + "汇总";
				})[0];

				if (selectedLegends.length > 1) {
					var tmp = [];
					seriesData.forEach(function(x, j) {
						if (i == 0) {
							tmp.push(x);
							tmp.push("-")
						} else {
							tmp.push("-")
							tmp.push(x);
						}
					});

					cs.data = tmp;
					cs.xAxisIndex = 1;
				} else {
					cs.data = seriesData
					cs.xAxisIndex = 0;
				}

				break;
			}
		} else {
			t.series.filter(function(x) {
				return x.name == l + "汇总";
			})[0].data = [];
		}
	}

	networkAreaLine.setOption(t, true);
});

$(document).delegate(".btnProject a", "click", function() {
	$(".btnProject a").each(function() {
		$(this).removeClass("active");
	})
	$(this).addClass("active");
	var projName = $(this).attr("realValue");
	deepChartArr.forEach(function(chart) {
		deepChartLegendChange(chart, {
			name : projName
		})
	})
});

$(document).delegate(".btnPoor a", "click", function() {
	$(".btnPoor a").each(function() {
		$(this).removeClass("active");
	})
	$(this).addClass("active")
	var dataObj = countryPoorObj[$(this).attr("realValue")]
	if ($(this).attr("realValue") == "县") {
		$(".subMapChart,.btnProject").hide();
		$(".deepBox").css("height", "200%");
		$(".deepTopBox").css("height", "50%");
		dataObj.childNames.forEach(function(c, i) {
			pk_deepAreaData(deepChartTopArr[i], c, undefined);
		})
	} else {
		$(".subMapChart,.btnProject").show();
		$(".deepBox").css("height", "500%");
		$(".deepTopBox").css("height", "20%");
		dataObj.childNames.forEach(function(provName, i) {
			pk_showMap(deepChartArr[i], {
				name : provName,
				tag : true,
				option : {
					title : {
						text : provName + "通宽带情况"
					},
					legend : {
						show : false
					}

				},
				callback : function() {
					setSelectedSeries(deepChartArr[i]);
					loadDeepTop(deepChartTopArr[i], getSelectedSeries(deepChartArr[i]), {
						title : provName + "深度贫困县排名"
					})
				}
			});
		})
	}
});

function init() {
	pk_showMap(pingkunChart, {
		name : 'china'
	});
	countryPoorObj["省"].childNames.forEach(function(provName, i) {

		deepChartTopArr[i].setOption($.extend(true, echartsDefaultOption, {}), true);

		pk_showMap(deepChartArr[i], {
			name : provName,
			tag : true,
			option : {
				title : {
					text : provName + "通宽带情况"
				},
				legend : {
					show : false
				}
			},
			callback : function() {
				setSelectedSeries(deepChartArr[i]);
				loadDeepTop(deepChartTopArr[i], getSelectedSeries(deepChartArr[i]), {
					title : provName + "深度贫困县排名"
				})
			}
		});
	})
	echartsDefaultOption.title.text = '贫困县通宽带情况';
	networkAreaLine.setOption($.extend(true, echartsDefaultOption, {}), true);
	loadPie('china');
}


init();

window.onresize = function() {
	for ( var id in __chartObjects) {
		if (__chartObjects[id] != undefined)
			__chartObjects[id].resize();
	}
}
