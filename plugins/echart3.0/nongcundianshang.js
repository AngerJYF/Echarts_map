/* =====================================贫困县地图分布====================================== */
var nameMap = {
	'阿里电商' : ali,
	'供销e家' : gongxiaoyijia,
	'乐村淘' : lecuntao
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
var pk_option = {
	geo : {
		show : false,
		map : 'china',
		roam : true,
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle
	},
	title : {
		text : '贫困县电商销售情况',
		left : 'center',
		textStyle : titleTextStyle,
		subtext : '（农特产品上行销量，单位：万元）',
		subtextStyle : subTitleTextStyle
	},
	tooltip : {
		trigger : 'item',
		formatter : function(params) {
			if (isNaN(params.value))
				return params.name + ":" + '0';
			else
				return params.name + ":" + toThousands(params.value, 2);
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
		show : false,
		top : screenScale * 50,
		data : [],
		itemGap : screenScale * 20,
		itemHeight : screenScale * 20,
		textStyle : legendTextStyle,
	// selectedMode : 'single'
	},
	color : categoryColor,
	animationDuration : 1000,
	animationEasing : 'cubicOut',
	animationDurationUpdate : 1000
}

var __chartObjects = {};

function getChart(id) {
	if (document.getElementById(id) == undefined)
		return null;

	if (__chartObjects[id] == undefined)
		__chartObjects[id] = echarts.init(document.getElementById(id));

	return __chartObjects[id];
}

var pingkunChart = getChart('pingkunCounty');
var EBbar = getChart('EBbarChart');
var EBCoverage = getChart('EBCoverage');

var EBDeepChart = getChart('EBDeepChart');
var EBDeepChart2 = getChart('EBDeepChart2');
var EBDeepChart3 = getChart('EBDeepChart3');
var EBDeepChart4 = getChart('EBDeepChart4');
var EBDeepChart5 = getChart('EBDeepChart5');

var EBDeepTop = getChart('EBDeepTop');
var EBDeepTop2 = getChart('EBDeepTop2');
var EBDeepTop3 = getChart('EBDeepTop3');
var EBDeepTop4 = getChart('EBDeepTop4');
var EBDeepTop5 = getChart('EBDeepTop5');

var deepChartArr = [ EBDeepChart, EBDeepChart2, EBDeepChart3, EBDeepChart4, EBDeepChart5 ];
var deepChartTopArr = [ EBDeepTop, EBDeepTop2, EBDeepTop3, EBDeepTop4, EBDeepTop5 ];

function addSeries(tagetChart, seriesName, mapName, data, pointData) {
	var t = tagetChart.getOption();
	t.legend[0].data.push({
		name : seriesName,
		icon : 'circle'
	});
	t.legend[0].selected[seriesName] = true
	t.visualMap = {
		min : 0,
		// max : res[0].value,
		left : '3%',
		max : 20000,
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
		name : seriesName,
		type : 'map',
		mapType : mapName,
		top : '12%',
		roam : true,
		data : data,
		zoom : 1.1,
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
			silent : false,
			tooltip : {
				trigger : 'item',
				formatter : function(params) { 
					if (isNaN(params.data.coord[2]))
						return params.name + ":" + '0';
					else
						return params.name + ":" + toThousands(params.data.coord[2], 2);
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

function sumData(targetChart) {
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

function pk_getData(name, cityNames) {
	var tmp = {}, tmp1 = {};
	var xData = [];
	var legendData = [];
	var WLFGdata = {};
	for ( var EBname in nameMap) {
		if (nameMap[EBname] == undefined)
			return;

		if (WLFGdata[EBname] == undefined)
			WLFGdata[EBname] = [];

		if (legendData.indexOf(EBname) == -1)
			legendData.push(EBname);

		var tmpData = nameMap[EBname][name];
		for ( var prov in tmpData) {
			var provData = tmpData[prov]['上行销量'];
			var vv = 0;

			for ( var year in provData) {
				if (year != "2017" && xData.indexOf(year) == -1)
					xData.push(year)

				if (tmp[EBname] == undefined)
					tmp[EBname] = {}

				if (tmp[EBname][year] == undefined)
					tmp[EBname][year] = 0

				vv += (provData[year] || 0);
				tmp[EBname][year] += (provData[year] || 0);
			}

			WLFGdata[EBname].push({
				name : prov,
				value : vv
			});

			if (WLFGdata['京东'] == undefined) {
				WLFGdata['京东'] = [];
			}
			// WLFGdata['京东'].push({
			// name : prov
			// })
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

	xData = xData.sort();

	for ( var cate in tmp) {
		if (tmp1[cate] == undefined)
			tmp1[cate] = [];

		for (var i = 0; i < xData.length; i++) {
			var year = xData[i];
			tmp1[cate].push(tmp[cate][year]);
		}

	}

	if (name == 'china') {
		tmp1['京东'] = [ 18612, 79947, 304705, 890000 ]
		// legendData.push('京东');
		legendData.splice(1, 0, '京东');
	}

	return {
		legend : legendData,
		x : xData,
		y : tmp1,
		data : WLFGdata
	};
}

function updateBar(targetChart,legendData, xData, yData,option) {
	updateChart(targetChart, {
		chartType : "bar",
		color : categoryColor,
		legend : legendData,
		legendNew : {
			left : 'center',
			selectedMode : true
		},
		xData : xData,
		yData : yData,
		stack : "电商销售情况",
		yName : '单位（万元）',
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
		},
		seriesLabel : {
			normal : {
				show : true,
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
				return p.name + "<br/>" + p.seriesName + ":" + toThousands(p.value, 2);
			}
		},
		XboundaryGap : true,
		showSumLine : true,
		showYAxisLabel : true,
		inside : false,
		showLegend : true,
		orientLegend : 'horizontal'
	});
}

function pk_getDeepData(targerChart, name) {
	var tmp = {}, tmp1 = {};
	var xData = [];
	var legendData = [];
	var WLFGdata = {};
	for ( var EBname in nameMap) {
		if (nameMap[EBname] == undefined)
			return;

		if (WLFGdata[EBname] == undefined)
			WLFGdata[EBname] = [];

		if (legendData.indexOf(EBname) == -1)
			legendData.push(EBname);

		var tmpData = nameMap[EBname][name];
		for ( var prov in tmpData) {
			var provData = tmpData[prov]['上行销量'];
			var vv = 0;

			for ( var year in provData) {
				if (year != "2017" && xData.indexOf(year) == -1)
					xData.push(year)

				if (tmp[EBname] == undefined)
					tmp[EBname] = {}

				if (tmp[EBname][year] == undefined)
					tmp[EBname][year] = 0

				vv += (provData[year] || 0);
				tmp[EBname][year] += (provData[year] || 0);
			}

			WLFGdata[EBname].push({
				name : prov,
				value : vv
			});

			if (WLFGdata['京东'] == undefined) {
				WLFGdata['京东'] = [];
			}
			WLFGdata['京东'].push({
				name : prov
			})
		}
	}

	xData = xData.sort();

	for ( var cate in tmp) {
		if (tmp1[cate] == undefined)
			tmp1[cate] = [];

		for (var i = 0; i < xData.length; i++) {
			var year = xData[i];
			tmp1[cate].push(tmp[cate][year]);
		}

	}

	if (name == 'china') {
		tmp1['京东'] = [ 18612, 79947, 304705, 890000 ]
		// legendData.push('京东');
		legendData.splice(1, 0, '京东');
	}
	updateChart(targerChart, {
		title : name + "电商销售情况",
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
		stack : "深度贫困地区电商销售情况",
		yName : '单位（万元）',
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

function getCategoryByProvName(name) {
	var res = [];
	var EBdata = {}
	for ( var EBname in nameMap) {
		if (nameMap[EBname] == undefined)
			return;

		var tmpData = nameMap[EBname][name];
		for ( var prov in tmpData) {
			var data = tmpData[prov]['上行销量'] || 0;

			if (EBdata[EBname] == undefined)
				EBdata[EBname] = 0;

			if (data['2016'] != undefined)
				EBdata[EBname] += (data['2016'] || 0)
		}
	}

	for ( var _EBname in EBdata) {
		res.push({
			name : _EBname,
			value : EBdata[_EBname]
		})
	}
	if (name == 'china') {
		res.splice(1, 0, {
			name : '京东',
			value : 890000
		})
	}

	return res;
}

function addNavigate(code) {
	var that = $("#navgate");
	that.empty();
	addBack(code);
	loadPie(getCityName(code))
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

		var res = pk_getData(p.name, cityNames);

		if ($.isEmptyObject(res.data)) {
			addSeries(targetChart, params.name, '', []);
		} else {
			for ( var EBname in res.data) {
				// 深度贫困地区
				var deepArea = [];
				res.data[EBname].forEach(function(obj) {
					if (obj.name == "山西" || obj.name == "云南" || obj.name == "西藏" || obj.name == "青海" || obj.name == "新疆") {
						deepArea.push({
							name : obj.name,
							coord : geoCoordMap[obj.name].concat(obj.value)
						})
					}
				});

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
							} else
								v = countyData["ds"]

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

				addSeries(targetChart, EBname, params.name, res.data[EBname], deepArea)
			}
		}
		if (!p.tag) {
			updateBar(EBbar,res.legend, res.x, res.y);
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
			return m / 3;
		});
	});
}

function updataSumData(targetChart, params) {
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
}

function loadPie(name) {
	var data = getCategoryByProvName(name);
	var option = {
		color : categoryColor,
		title : {
			top : '10%',
			left : 'center',
			subtextStyle : subTitleTextStyle,
			textStyle : titleTextStyle,
			text : '农特产品上行销量占比'
		},
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				if (isNaN(params.value))
					return params.name + ":" + '0';
				else
					return params.name + ":" + toThousands(params.value, 2);
			}
		},
		animationDuration : 1000,
		animationDurationUpdate : 500,
		series : [ {
			name : name,
			type : 'pie',
			radius : [ '35%', '60%' ],
			center : [ '50%', '60%' ],
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
	}
	EBCoverage.setOption($.extend(true, {}, option), true)
}

function loadDeepTop(targetChart, data0, option) {
	var data = data0.markPoint.data.map(function(d) {
		return {
			name : d.name,
			value : (d.coord[2] || 0)

		}
	}).sort(function(a, b) {
		return (b.value || 0) - (a.value || 0);
	}).filter(function(d){
		if(d.value!=0)
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
					html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + ';"></span>电商销售额: ' + toThousands(params[i].value, 2) + '</br>'
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

function deepChartClick(_thisChart, params) {
	var cityCode = getCityCode(params.name)
	if (cityCode != undefined && cityCode.substring(4, 6) != "00") {
		pk_getDeepData(deepChartTopArr[deepChartArr.indexOf(_thisChart)], params.name, undefined);
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
		return m / 3;
	});
});

EBDeepChart.on('legendselectchanged', function(params) {
	updataSumData(EBDeepChart, params)
});
EBDeepChart2.on('legendselectchanged', function(params) {
	updataSumData(EBDeepChart2, params)
});
EBDeepChart3.on('legendselectchanged', function(params) {
	updataSumData(EBDeepChart3, params)
});
EBDeepChart4.on('legendselectchanged', function(params) {
	updataSumData(EBDeepChart4, params)
});
EBDeepChart5.on('legendselectchanged', function(params) {
	updataSumData(EBDeepChart5, params)
});

EBDeepChart.on('click', function(params) {
	deepChartClick(this, params)
})
EBDeepChart2.on('click', function(params) {
	deepChartClick(this, params)
})
EBDeepChart3.on('click', function(params) {
	deepChartClick(this, params)
})
EBDeepChart4.on('click', function(params) {
	deepChartClick(this, params)
})
EBDeepChart5.on('click', function(params) {
	deepChartClick(this, params)
})

EBDeepTop.on('legendselectchanged', function(params) {
	sumData(EBDeepTop);
});
EBDeepTop2.on('legendselectchanged', function(params) {
	sumData(EBDeepTop2);
});
EBDeepTop3.on('legendselectchanged', function(params) {
	sumData(EBDeepTop3);
});
EBDeepTop4.on('legendselectchanged', function(params) {
	sumData(EBDeepTop4);
});
EBDeepTop5.on('legendselectchanged', function(params) {
	sumData(EBDeepTop5);
});

EBbar.on('legendselectchanged', function(params) { 
	sumData(EBbar); 
});

$(document).delegate(".btnPoor a", "click", function() {
	$(".btnPoor a").each(function() {
		$(this).removeClass("active");
	})
	$(this).addClass("active")
	var dataObj = countryPoorObj[$(this).attr("realValue")];

	if ($(this).attr("realValue") == "县") {
		$(".subMapChart,.btnProject").hide();
		$(".deepBox").css("height", "200%");
		$(".deepTopBox").css("height", "50%");
		dataObj.childNames.forEach(function(c, i) {
			pk_getDeepData(deepChartTopArr[i], c, undefined);
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
						text : provName + "电商销售情况"
					}
				},
				callback : function() {
					setSelectedSeries(deepChartArr[i]);
					loadDeepTop(deepChartTopArr[i], getSelectedSeries(deepChartArr[i]), {
						title : provName + "深度贫困县电商销售排名"
					})
				}
			});
		})
	}

});

$(function() {
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
					text : provName + "电商销售情况"
				}
			},
			callback : function() {
				setSelectedSeries(deepChartArr[i]);
				loadDeepTop(deepChartTopArr[i], getSelectedSeries(deepChartArr[i]), {
					title : provName + "深度贫困县电商销售排名"
				})
			}
		});
	})

	echartsDefaultOption.title.text = '贫困县电商销售情况';
	EBbar.setOption($.extend(true, echartsDefaultOption, {}), true);

	loadPie('china')
});
window.onresize = function() {
	for ( var id in __chartObjects) {
		if (__chartObjects[id] != undefined)
			__chartObjects[id].resize();
	}
}
