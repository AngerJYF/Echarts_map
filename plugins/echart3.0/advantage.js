var symbol = {
	'风土人情' : 'image://assets/images/风土人情.png',
	'旅游资源' : 'image://assets/images/旅游.png',
	'特产' : 'image://assets/images/特产.png',
	'默认' : 'image://assets/images/positionlogo.png'
};

var symbolColor = {
	'风土人情' : 'red',
	'旅游资源' : '#00BFFF',
	'特产' : 'green'
};

var advantageChart = echarts.init(document.getElementById("advantageChart"));
var advantageAllChart = echarts.init(document.getElementById("advantageChartAll"));

// 公用option
var ad_option = {
	geo : {
		map : 'china',
		roam : true,
		show : true,
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle
	},
	title : {
		text : '贫困县优势资源',
		left : 'center',
		textStyle : titleTextStyle,
		subtextStyle : subTitleTextStyle
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
		left : 'center',
		top : 60,
		data : [],// , '风土人情','特产' ],
		inactiveColor : '#93a7c1',
		textStyle : {
			color : '#FFFFFF'
		}
	},
	animationDuration : 1000,
	animationEasing : 'cubicOut',
	animationDurationUpdate : 1000
}

function addSeries(name, data) {
	var t = advantageChart.getOption()
	t.legend[0].data.push(name);
	t.visualMap = {
		min : 0,
		max : 20,
		calculable : true,
		realtime : true,
		inRange : {
			symbolSize : [ 15, 50 ],
			color : mapColor
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
		symbol : 'pin',
		tooltip : {
			trigger : 'item',
			formatter : function(params, ticket, callback) {
				console.log(params.seriesName);
				getDetails(params.seriesName, cityMap[params.name], ticket, callback);
				return "Loading";
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
		},
		itemStyle : {
			normal : {
				color : symbolColor[name]
			}
		}
	});

	advantageChart.setOption(t, true);
}

// 获取数据数
function ad_getData(code) {
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
			var dataTC = [];

			data.forEach(function(item, i) {
				datatmp.push({
					name : idMapCity[item.Code],
					value : [ parseFloat(item.Longitude), parseFloat(item.Latitude) ]
				});

				if (parseFloat(item.LYZY) > 1) {
					dataLYZY.push({
						name : idMapCity[item.Code],
						value : [ parseFloat(item.Longitude), parseFloat(item.Latitude), parseFloat(item.LYZY) ],
						remark : item.LYZY
					});
				}

				if (parseFloat(item.FTRQ) > 1) {
					dataFTRQ.push({
						name : idMapCity[item.Code],
						value : [ parseFloat(item.Longitude), parseFloat(item.Latitude), parseFloat(item.FTRQ) ],
						remark : item.FTRQ
					});
				}

				if (parseFloat(item.TC) > 1) {
					dataTC.push({
						name : idMapCity[item.Code],
						value : [ parseFloat(item.Longitude), parseFloat(item.Latitude), parseFloat(item.TC) ],
						remark : item.TC
					});
				}
			});

			addSeries("特产", dataTC);
			addSeries("旅游资源", dataLYZY);
			addSeries("风土人情", dataFTRQ);

			setTooltip(advantageChart, '-优势项目<br/>');
		},
		error : function(e, XMLHttpRequest, textStatus, errorThrown) {
			console.log(e);
		}
	});

}

function addNavigate(code) {
	var that = $("#navgate");
	that.empty();

	ad_showMap({
		name : idMapCity[code]
	});

	if (code == null || code == "000000")
		return;

	var p = code.substring(0, 2) + "0000";
	that.append("<li data-code='" + p + "' onclick=addNavigate('" + p + "');><i>></i><i>" + idMapCity[p] + "</i></li>");

	if (code.substring(2, 6) != "0000") {
		if (code.substring(4, 6) == "00")
			that.append("<li data-code='" + code + "' onclick=addNavigate('" + code + "');><i>></i><i>" + idMapCity[code] + "</i></li>");
		else {
			var c = code.substring(0, 4) + "00";
			that.append("<li data-code='" + c + "' onclick=addNavigate('" + c + "');><i>></i><i>" + idMapCity[c] + "</i></li>");
			that.append("<li data-code='" + code + "' onclick=addNavigate('" + code + "');><i>></i><i>" + idMapCity[code] + "</i></li>");
		}
	}
}

// 生成地图
function ad_showMap(params) {
	var name = params.name;
	if (cityMap[name]) {
		$.ajax({
			url : 'assets/plugins/echart3.0/map/city/' + cityMap[name] + '.json',
			type : 'get',
			dataType : 'json',
			success : function(data) {
				echarts.registerMap(name, data);
				ad_option.geo.map = name;
				ad_option.geo.show = true;
				ad_option.title.subtext = (name == "china" ? "全国" : name);

				advantageChart.setOption(ad_option, true);
				ad_getData(cityMap[params.name]);

				if (name == 'china') {
					ad_option.geo.show = false;
					advantageAllChart.setOption(ad_option, true);
					adAll_getData(cityMap[params.name]);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.status == 404) {
					addNavigate("000000");
				}
			},
		});
	} else {
		addNavigate("000000");
	}

}

function getDetails(name, code, ticket, callback) {
	$.ajax({
		url : 'show/queryProducts.html',
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
				if (data.techan != undefined)
					tc_list = eval(data.techan.replace(/[\r\n]/g, ""))

				if (tc_list != null && tc_list.length > 0) {
					html = "<b>" + idMapCity[code] + "-特产</b> ：";

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

				if (data.lvyouziyuanjianjie != undefined)
					lyzy_list = eval(data.lvyouziyuanjianjie.replace(/[\r\n]/g, ""))

				if (lyzy_list != null && lyzy_list.length > 0) {
					html = "<b>" + idMapCity[code] + "-旅游资源</b> ：";

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

				if (data.fengturenqingjieshao != undefined)
					fzrq_list = eval(data.fengturenqingjieshao.replace(/[\r\n]/g, ""))

				if (fzrq_list != null && fzrq_list.length > 0) {
					html = "<b>" + idMapCity[code] + "-风土人情</b> ：";
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

function setTooltip(tagetChart, str) {
	var t = tagetChart.getOption();
	t.tooltip = {
		trigger : 'item',
		formatter : function(params) {
			var res = params.name + str;// '-优势项目<br/>';
			var t = tagetChart.getOption();
			var myseries = t.series;
			for (var i = 0; i < myseries.length; i++) {
				for (var j = 0; j < myseries[i].data.length; j++) {
					if (myseries[i].data[j].name == params.name) {
						res += myseries[i].name + ' : ' + (myseries[i].data[j].value == undefined ? 0 : myseries[i].data[j].value) + '&nbsp;个</br>';
					}
				}
			}
			return res;
		}
	};
	tagetChart.setOption(t, true);
}

// 地图点击事件
advantageChart.on('click', function(params) {
	if (params.value == undefined)
		addNavigate(cityMap[params.name]);
})
// 图例选中
function legendSelected(tagetChart) {
	if (targetChart) {
		option.legend.selected[name] = targetChart.component.legend.isSelected(name);// 这里获取之前的选择状态
	}
}

function getLegendSelected(targetChart) {
	var p = targetChart.getOption();
	return p.legend[0].selected;
}

function restoreLegendSelected(targetChart, selected) {
	for ( var key in selected) {
		targetChart.dispatchAction({
			type : selected[key] ? 'legendSelect' : 'legendUnSelect',
			name : key
		});
	}
}
// 地图
/** ****************************优势总体分布*************************************** */
function adAll_getData(code) {
	var codetmp = codeAnay(code);
	if (code == "000000")
		codetmp = null;

	$.ajax({
		url : 'api/getAdvantageByProvince.html',
		type : 'get',
		dataType : 'json',
		success : function(data) {
			var dataLYZY = [];
			var dataFTRQ = [];
			var dataTC = [];

			data.forEach(function(item, i) {
				if (parseFloat(item.LYZY) > 0) {
					dataLYZY.push({
						name : item.Province,
						value : item.LYZY
					});
				}

				if (parseFloat(item.FTRQ) > 0) {
					dataFTRQ.push({
						name : item.Province,
						value : item.FTRQ
					});
				}
				if (parseFloat(item.TC) > 0) {
					dataTC.push({
						name : item.Province,
						value : item.TC
					});
				}
			});

			addSeriesData(advantageAllChart, "特产", dataTC);
			addSeriesData(advantageAllChart, "旅游资源", dataLYZY);
			addSeriesData(advantageAllChart, "风土人情", dataFTRQ);
		},
		error : function(e, XMLHttpRequest, textStatus, errorThrown) {
			console.log(e);
		}
	});

}

function addSeriesData(tageChart, name, data, topData) {
	var t = tageChart.getOption();
	t.legend[0].data.push({
		name : name,
		icon : 'circle'
	});
	t.visualMap = {
		min : 3,
		max : 300,
		calculable : true,
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
		mapType : 'china',
		roam : true,
		nameMap : {
			'china' : '中国'
		},
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle,
		markPoint : {
			symbol : "image://assets/images/timg.png",
			symbolSize : [ 25, 25 ],
			data : topData,
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
			},
			tooltip : {
				show : false
			}

		},
		data : data
	});
	t.color = [ 'green', '#00BFFF ', '#FFC000' ];
	tageChart.setOption(t, true);
	setTooltip(tageChart, '-各类优势数量<br/>');
}

window.onresize = function() {
	advantageChart.resize();
	advantageAllChart.resize();
}

/** *************************************************************************** */
$(function() {
	ad_showMap({
		name : 'china'
	});
});
