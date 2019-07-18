var hotAnalyChart = echarts.init(document.getElementById('hotAnaly'));
var cnFacetNames = {
	"Opinion" : "观点分布",
	"OWord_0" : "负面",
	"OWord_1" : "正面观点",
	"PntData_DICT_成语" : "成语",
	"PntData_ChinaRegion3" : "区县",
	"PntData_ChinaRegion2" : "城市",
	"PntData_ChinaRegion1" : "省/自治区/直辖市",
	"PntData_DICT_国家" : "国家",
	"Entity_Location" : "地点",
	"Entity_Organization" : "机构",
	"Entity_Person" : "人物",
	"Nugget" : "子话题",
};
var opininStrCn = {
	3 : "正面",
	2 : "中性",
	1 : "负面"

};

var lineColor = {
	'正面' : '#33a02c',
	'中性' : '#CCCC00',
	'负面' : '#FF0033',
	'全部' : '#ff7f50'
}

var option = {
	// color : [ 'green', '#FFC000', 'red' ],
	title : {
		text : '网络推进力度趋势',
		left : 'center',
		textStyle : {
			color : '#fff',
			fontSize : 20,
			fontWeight : 'normal',
			fontFamily : "Microsoft YaHei"
		},
	},
	tooltip : {
		trigger : 'axis',
		axisPointer : {
			type : 'cross',
			label : {
				backgroundColor : '#6a7985'
			}
		}
	},
	legend : {
		data : [],
		left : 10,
		textStyle : {
			color : '#FFFFFF'
		},
	},
	toolbox : {
		show : false,
		feature : {
			saveAsImage : {}
		}
	},
	grid : {
		y : 50,
		x : 50,
		y2 : 70,
		x2 : 30
	},
	xAxis : [ {
		type : 'category',
		boundaryGap : false,
		data : [],
		axisLine : {
			lineStyle : {
				color : "#fff"
			}
		},
		axisLabel : {
			textStyle : {
				color : "#fff"
			}
		}

	} ],
	yAxis : [ {
		type : 'value',
		boundaryGap : [ 0, '100%' ],
		axisLine : {
			lineStyle : {
				color : "#fff"
			}
		},
		axisLabel : {
			textStyle : {
				color : "#fff"
			}
		}
	} ],
	dataZoom : [ {
		type : 'inside',
		start : 0,
		end : 100
	}, {
		start : 0,
		end : 10,
		handleIcon : 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
		handleSize : '80%',
		handleStyle : {
			color : '#fff',
			shadowBlur : 3,
			shadowColor : 'rgba(0, 0, 0, 0.6)',
			shadowOffsetX : 2,
			shadowOffsetY : 2
		},
		textStyle : {
			color : "#fff"
		}
	} ],
	series : []
};
 
function getNowFormatDate(da) {
	var seperator1 = "-";
	var seperator2 = ":";
	if (da == null) {
		console.log(da);
		var date = new Date();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		return currentdate;
	} else {

		var date = new Date(da);
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
		return currentdate;
	}

}

hotAnalyChart.setOption(option, true);

function addSeries(targetChart, name, data, date) {
	var t = targetChart.getOption();
	t.legend[0].data.push({
		name : name,
		icon : 'circle'
	});
	t.xAxis[0].data = date;
	t.series.push({
		name : name,
		type : 'line',
		stack : '趋势',
		smooth : true,
		smoothMonotone : 'x',
		areaStyle : {
			normal : {}
		},
		itemStyle : {
			normal : {
				color : lineColor[name],
				lineStyle : {
					width : 2,
					type : 'solid'
				}
			}
		},
		data : data
	});
	targetChart.setOption(t, true);
}

function getEffectData(key, name) {
	var nowDate = getNowFormatDate(null);
	$.ajax({
		url : 'solr/facet.html?ts=' + Math.random(),
		data : {
			queryText : '"网络扶贫" AND Opinion:' + key + ' AND Date:[2012-12-31 TO '+nowDate+']',
			fields : 'Date',
			queryFilter : 'Topic:fupin'
		},
		async : true,
		dataType : 'json',
		success : function(res) {
			var datatmp = [];
			var date = [];
			var data = [];
			 
			for ( var key in res.Date) {
				datatmp.push({
					Date : key,
					value : res.Date[key]
				})
			}
			datatmp.sort(function(x, y) {
				return new Date(x.Date) > new Date(y.Date) ? 1 : -1;
			});
			datatmp.forEach(function(item) {
				date.push(item.Date);
				data.push(item.value);
			})
			addSeries(hotAnalyChart, name, data, date);
		}
	});
}

function showLine() {
	for ( var key in opininStrCn) {
		getEffectData(key, opininStrCn[key]);
	}
}

var optionBar = {
	title : {
		text : '网络热度:',
		textStyle : {
			color : "#ffffff"
		},
		subtext : ' ',
		x : 'left'
	},
	grid : {
		left : '3%',
		right : '4%',
		bottom : '3%',
		containLabel : true
	},
	xAxis : [ {
		axisLine : {
			lineStyle : {
				color : '#ffffff'
			}
		},
		axisLabel : {
			textStyle : {
				color : "#fff"
			}
		},
		type : 'value',
		axisTick : {
			alignWithLabel : true
		}
	} ],
	yAxis : [ {
		show : false,
		axisLine : {
			show : false,
			lineStyle : {
				color : '#fff'
			}
		},
		axisLabel : {
			show : false,
			textStyle : {
				color : "#fff"
			},
			inside : true
		},
		type : 'category',
		data : []
	} ],
	series : [ {
		name : '贫困县数量',
		type : 'bar',
		barWidth : '80%',
		data : [],
		itemStyle : {
			normal : {
			// color : function(params) {
			// var colorList = [ '#32999E', '#FFC000', '#3B6FF5', '#CC5402',
			// '#F53BAD' ];
			// var legends = [ '网络覆盖', '农村电商', '网络扶智', '信息服务', '网络公益' ];
			// // console.log("color:",params.name);
			// return colorList[legends.indexOf(params.name)];
			// }
			}
		}
	} ]
}
var ChartBars = [];

function getBarDetails(params, ticket, callback) {
	var word;
	if (params.seriesName == "Opinion") {
		word = opininStrCn[params.name];
	} else if (params.seriesName.indexOf("PntData_ChinaRegion") == 0) {
		word = params.name.split("_")[1];
	} else {
		word = params.name;
	}

	var date = getNowFormatDate(null);
	$.ajax({
		url : 'solr/getJson.html?ts=' + Math.random(),
		data : {
			queryText : '"网络扶贫" "' + word + '" AND Topic:fupin AND Date:[2013-11-01 TO ' + date + '] ',
			start : 0,
			rows : 3
		},
		async : true,
		dataType : 'json',
		success : function(data) {
			var html = word + " : " + params.value + "</br>";
			data.forEach(function(item) { 
				var date1 = getNowFormatDate(item.Time);
				if (item != undefined) {
					html += date1 + " : " + item.Title + "</br>";
				}
			});
			callback(ticket, html);
		}
	});
}

function getBarData(tagetChart, field) {
	$.ajax({
		url : 'solr/facet.html',
		data : {
			queryText : '"网络扶贫"',
			fields : field,
			queryFilter : 'Topic:fupin',
			limit : 9
		},
		async : true,
		dataType : 'json',
		success : function(data) {
			var datatmp = [];
			var Xdata = [];
			var Ydata = [];
			for ( var key in data) {
				for ( var item in data[key]) {
					datatmp.push({
						word : item,
						value : data[key][item]
					});
				}
			}
			datatmp.sort(function(x, y) {
				return x.value < y.value ? 1 : -1;
			});

			for (var i = (datatmp.length > 10 ? 10 : datatmp.length - 1); i >= 0; i--) {
				Xdata.push(datatmp[i].value);
				Ydata.push(datatmp[i].word);
			}
			var t = tagetChart.getOption();
			t.series[0].data = Xdata;
			t.yAxis[0].data = Ydata;
			t.series[0].label = {
				normal : {
					show : true,
					position : 'insideLeft',
					formatter : function(params) {
						if (params.seriesName == "Opinion") {
							return opininStrCn[params.name];
						} else if (params.seriesName.indexOf("PntData_ChinaRegion") == 0) {
							return params.name.split("_")[1];
						}
						return params.name;
					},
					textStyle : {
						color : '#fff'
					}
				}
			}
			t.series[0].itemStyle = {
				normal : {
					color : function(params) { 
						var colorList = [  '#B03060', '#FE9A76',  '#32CD32', '#016936', '#B413EC', '#A52A2A', '#A0A0A0','#428bca', '#0E6EB8','#FFD700', '#008080', '#EE82EE', '#5cb85c', '#FF1493', '#5bc0de', '#f0ad4e', '#d9534f' ];
						if (params.dataIndex < colorList.length)
							return colorList[params.dataIndex];
						else
							return randomColor();
					}
				}
			}
			t.tooltip = {
				trigger : 'item',
				// triggerOn : 'none',
				enterable : true,
				showDelay : 1000,
				position : function(p) {
					return [ 30, p[1] + 30 ];
				},
				// axisPointer : { // 坐标轴指示器，坐标轴触发有效
				// type : 'line' // 默认为直线，可选为：'line' | 'shadow'
				// },
				formatter : function(params, ticket, callback) {
					getBarDetails(params, ticket, callback);
					return "Loading";
				}
			};
			tagetChart.setOption(t, true);
		}
	});
}

function CreatEchart(id, name) {
	var chart = echarts.init(document.getElementById(id));
	optionBar.title.text = name;
	optionBar.series[0].name = id;
	chart.setOption(optionBar, true);
	return chart;
}

function showBar() {
	var fields = [];

	for ( var key in cnFacetNames) {
		$("#hotAnaly").after("<div id = '" + key + "' class='col-xs-12 col-md-6 col-lg-3' style='height: 40%;'></div>");
		var _chart = CreatEchart(key, cnFacetNames[key]);
		ChartBars.push(_chart);
		fields.push(key);
	}

	ChartBars.forEach(function(chart, i) {
		getBarData(chart, fields[i]);
	});

	$("#hotAnaly").after("<h3>");
}

$(function() {
	showBar();
	showLine();
})

window.onresize = function() {
	ChartBars.forEach(function(itemChart) {
		itemChart.resize();
	});
	hotAnalyChart.resize();
}
