var sourceChart = echarts.init(document.getElementById("IPASrcMove"));
var desChart = echarts.init(document.getElementById("IPADstMove"));
var allAssistChart = echarts.init(document.getElementById("IPAallMove"));
var sourceCountyChart = echarts.init(document.getElementById("IPASrcCountyMove"));
var desCountyChart = echarts.init(document.getElementById("IPADesCountyMove"));
var allAssistCountyChart = echarts.init(document.getElementById("IPAallCountyMove"));
var initPageSize=16;
var option = {
	color : defaultColor,
	title : {
		text : '东西部协作扶贫总览',
		subtext : '',
		left : 'center',
		textStyle : titleTextStyle,
		subtextStyle : subTitleTextStyle
	},
	tooltip : {
		trigger : 'item',
		formatter : '{b}'
	},
	legend : {
		type : 'scroll',
		orient : 'vertical',
		itemHeight : screenScale * 20,
		// height : 200,
		left : 20,
		top : 20,
		data : [],
		selectedMode : 'single',
		selected : {},
		textStyle : legendTextStyle
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
	visualMap : {
		min : 0,
		max : 100,
		calculable : true,
		inRange : {
			color : [ '#50a3ba', '#eac736', '#d94e5d' ]
		},
		textStyle : {
			color : '#fff'
		}
	},
	geo : {
		map : 'china',
		roam : false,
		zoom : '1.2',
		itemStyle : mapAreaItemStyle
	},
	series : []
};

function initChart() {
	var params = {
		name : 'china'
	}
	getMapJson('000000', params, function(c, p, map) {
		var name = params.name;
		option.title.text = "东西部协作扶贫总览";
		allAssistCountyChart.setOption(option, true);
		var allData = getCountyData();
		addseries(allAssistCountyChart, "all", allData);

		option.title.text = "东西部协作扶贫总览";
		allAssistChart.setOption(option, true);
		refreshData(allAssistChart, provToProv, "source", "all");

		option.title.text = "东部省份协作情况";
		sourceChart.setOption(option, true);
		refreshData(sourceChart, provToProv, "source");

		option.title.text = "东部贫困县协作情况";
		sourceCountyChart.setOption(option, true);
		var data = getCountyData("北京", "source");
		addseries(sourceCountyChart, "北京", data);

		option.title.text = "西部省份协作情况";
		desChart.setOption(option, true);
		refreshData(desChart, prov2prov, "des");

		option.title.text = "西部贫困县协作情况";
		desCountyChart.setOption(option, true);
		var desData = getCountyData("重庆", "des");
		addseries(desCountyChart, "重庆", desData);
	});
}

function convertLinesData(data, type) {
	var res = [];
	if (type == 'all') {
		data.forEach(function(x) {
			x.data.forEach(function(y) {
				res.push({
					fromName : y[0].name,
					toName : y[1].name,
					value : y[1].value,
					coords : [ geoCoordMap[y[0].name], geoCoordMap[y[1].name] ]
				})
			});
		});
	} else {
		data.data.forEach(function(x) {
			res.push({
				fromName : x[0].name,
				toName : x[1].name,
				value : type == 'source' ? x[1].value : x[0].value,
				coords : [ geoCoordMap[x[0].name], geoCoordMap[x[1].name] ]
			})
		})
	}

	return res;

}

function converScatterData(data, type) {
	res = [];
	var allValue = 0;
	if (type == 'all') {
		data.forEach(function(x) {
			var tmp = [];
			var tmpValue = 0;
			x.data.forEach(function(y) {
				tmp.push({
					name : y[1].name,
					value : geoCoordMap[y[1].name].concat([ y[1].value ])
				})
			});
			tmp.forEach(function(x) {
				tmpValue += x.value[2];
			});
			tmp.push({
				name : x.name,
				value : geoCoordMap[x.name].concat([ tmpValue / tmp.length ])
			})

			res = res.concat(tmp);
		});
		res = unique(res);

	} else {
		data.data.forEach(function(x) {
			res.push({
				name : type == 'source' ? x[1].name : x[0].name,
				value : type == 'source' ? geoCoordMap[x[1].name].concat([ x[1].value ]) : geoCoordMap[x[0].name].concat([ x[0].value ])
			})
		})
		res.forEach(function(x) {
			allValue += x.value[2];
		});
		res.push({
			name : data.name,
			value : geoCoordMap[data.name].concat([ allValue / res.length ])
		})
	}

	return res;
}

function allCityData(oldData, type) {
	var data = {
		allContry : [],
		citys : []
	};

	var index = 0;

	for ( var from in oldData) {
		var cd = {
			name : from,
			data : []
		};
		for ( var to in oldData[from]) {
			var ca = [];
			var cda = [];

			ca.push({
				name : type == "source" ? from : to
			});

			ca.push({
				name : type == "source" ? to : from,
				value : oldData[from][to]
			});
			if (type == "source") {
				cda.push({
					name : from
				});
				cda.push({
					name : to,
					value : oldData[from][to]
				});
			} else if (type == "des") {
				cda.push({
					name : to,
					value : oldData[from][to]
				});
				cda.push({
					name : from
				});
			}
			data.allContry.push(ca);
			if (type == "source") {
				cd.data.push(cda);
			} else {

				cd.data.push(cda);
			}

		}
		data.citys.push(cd);
		index++;
	}

	return data;
}

function refreshData(targetChart, oldData, type, type1) {
	var o = targetChart.getOption();
	debug(o)
	o.legend[0].data = [];
	var data = allCityData(oldData, type);
	if (type1 == undefined) {
		data.citys.forEach(function(item, i) {
			o.legend[0].data.push({
				name : item.name,
				icon : 'circle'
			});
			o.series.push({
				name : item.name,
				type : 'lines',
				zlevel : 1,
				effect : {
					show : true,
					period : 8,
					trailLength : 0.7,
					symbolSize : 3,
					shadowBlur : 1
				},
				lineStyle : {
					normal : {
						width : 0,
						curveness : 0.2
					}
				},
				data : convertLinesData(item, type)
			}, {
				name : item.name,
				type : 'lines',
				zlevel : 2,
				symbol : [ 'none', 'arrow' ],
				symbolSize : 10,
				effect : {
					show : true,
					period : 8,
					trailLength : 0,
					symbolSize : 3,
					shadowBlur : 1
				},
				lineStyle : {
					normal : {
						width : 2,
						curveness : 0.2
					}
				},
				data : convertLinesData(item, type)
			}, {
				name : item.name,
				type : 'effectScatter',
				coordinateSystem : 'geo',
				zlevel : 2,
				symbolSize : function(val) {
					return val[2] / 20
				},
				rippleEffect : {
					brushType : 'stroke'
				},
				label : {
					normal : {
						show : true,
						position : 'top',
						formatter : '{b}',
						textStyle : labelTextStyle
					}
				},
				data : converScatterData(item, type)
			});
		});
	} else {
		o.series.push({
			name : 'all',
			type : 'lines',
			zlevel : 1,
			effect : {
				show : true,
				period : 8,
				trailLength : 0.5,
				symbolSize : 3,
				shadowBlur : 1
			},
			lineStyle : {
				normal : {
					width : 0,
					curveness : 0.2
				}
			},
			data : convertLinesData(data.citys, type1)
		}, {
			name : 'all',
			type : 'lines',
			zlevel : 3,
			symbol : [ 'none', 'arrow' ],
			symbolSize : 10,
			effect : {
				show : true,
				period : 8,
				trailLength : 0,
				shadowBlur : 1,
				symbolSize : 3
			},
			lineStyle : {
				normal : {
					width : 2,
					curveness : 0.2
				}
			},
			data : convertLinesData(data.citys, type1)
		}, {
			name : 'all',
			type : 'effectScatter',
			coordinateSystem : 'geo',
			zlevel : 2,
			rippleEffect : {
				brushType : 'stroke'
			},
			label : {
				normal : {
					show : true,
					position : 'top',
					formatter : '{b}',
					textStyle : labelTextStyle
				}
			},
			symbolSize : function(val) {
				return val[2] / 20
			},
			data : converScatterData(data.citys, type1)
		});
	}

	o.tooltip = {
		trigger : 'item',
		formatter : function(params) {
			if (params.data.fromName) {
				return params.data.fromName + " > " + params.data.toName + " <br/>帮扶力度 : " + params.data.value;
			} else if (params.seriesName == params.data.fromName) {
				return params.seriesName + "平均帮扶力度：" + params.value[2]
			} else if (params.seriesName == params.data.toName) {
				return params.seriesName + "平均被帮扶力度：" + params.value[2]
			} else {
				return params.name + ":" + params.value[2]
			}

		}
	}
	o.visualMap = {
		min : 0,
		max : 500,
		show : true,
		calculable : true,
		left : '20',
		inRange : {
			color : [ '#A6F5B0', '#E7E04E', '#FFB930', '#FE6C2D', '#F82B29' ],
			colorAlpha : 0.8
		},
		textStyle : {
			color : '#fff'
		},
		bottom : 120,
	};
	targetChart.setOption(o, true);
}

function getCountyData(proSel, type) {
	var countys = [];
	cityToCity.forEach(function(countyObj, i) {
		var fromCity = countyObj['from_prov'];
		var toCity = countyObj['to_prov'];
		if (proSel == undefined) {
			countys.push({
				fromName : countyObj['from_prov'] + "-" + countyObj['from_city'],
				toName : countyObj['to_prov'] + "-" + countyObj['to_city'],
				value : countyObj['value'],
				coords : [ getcoords(countyObj['from_prov'], countyObj['from_city']), getcoords(countyObj['to_prov'], countyObj['to_city']) ]
			})
		} else if (fromCity == proSel && type == "source") {
			countys.push({
				fromName : countyObj['from_prov'] + "-" + countyObj['from_city'],
				toName : countyObj['to_prov'] + "-" + countyObj['to_city'],
				value : countyObj['value'],
				coords : [ getcoords(countyObj['from_prov'], countyObj['from_city']), getcoords(countyObj['to_prov'], countyObj['to_city']) ]
			})
		} else if (toCity == proSel && type == "des") {
			countys.push({
				fromName : countyObj['from_prov'] + "-" + countyObj['from_city'],
				toName : countyObj['to_prov'] + "-" + countyObj['to_city'],
				value : countyObj['value'],
				coords : [ getcoords(countyObj['from_prov'], countyObj['from_city']), getcoords(countyObj['to_prov'], countyObj['to_city']) ]
			})
		}
	})
	return countys;
}

function addseries(targetChart, seriesName, data) {
	var o = targetChart.getOption();
	o.series = [];
	o.series.push({
		name : seriesName,
		type : 'lines',
		zlevel : 1,
		effect : {
			show : true,
			period : 10,
			trailLength : 0.7,
			symbolSize : 2,
			shadowBlur : 0
		},
		lineStyle : {
			normal : {
				// color : '#E4C554',
				width : 0,
				opacity : 1,
				curveness : 0.1
			}
		},
		data : data
	}, {
		name : seriesName,
		type : 'lines',
		zlevel : 2,
		symbol : [ 'circle', 'circle' ],
		symbolSize : 1,
		label : {
			normal : {
				show : true,
				position : 'top',
				formatter : '{b}',
				textStyle : labelTextStyle
			}
		},
		lineStyle : {
			normal : {
				// color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
				// offset : 0,
				// color : '#f3f4a6'
				// }, {
				// offset : 1,
				// color : '#F82B29'
				// } ], false),
				width : 2,
				opacity : 0.2,
				curveness : 0.1
			}
		},
		data : data
	})
	o.visualMap = {
		min : 0,
		max : 50,
		show : true,
		calculable : true,
		left : '20',
		inRange : {
			color : [ '#A6F5B0', '#E7E04E', '#FFB930', '#FE6C2D', '#F82B29' ],
			colorAlpha : 0.8
		},
		textStyle : {
			color : '#fff'
		},
		bottom : 120,
	};
	o.tooltip = {
		trigger : 'item',
		formatter : function(params) {
			if (params.data.fromName) {
				return params.data.fromName + " > " + params.data.toName + " <br/>帮扶力度 : " + params.data.value;
			} else if (params.seriesName == params.data.fromName) {
				return params.seriesName + "平均帮扶力度：" + params.value[2] // params.name
				// +
				// "<br/>"+params+"："
				// + ;
			} else if (params.seriesName == params.data.toName) {
				return params.seriesName + "平均被帮扶力度：" + params.value[2]
			} else {
				return params.name + ":" + params.value[2]
			}

		}
	}
	targetChart.setOption(o, true);
}

function updatavisualMap(targetChart, dataArr) {
	targetChart.dispatchAction({
		type : 'selectDataRange',
		selected : dataArr
	})
}

// var mySlider = new Slider("input.slider", {
// id : 'srcSliderDiv',
// min : 0,
// max : 50,
// rang : true,
// value : [ 0, 50 ]
// });
//
// mySlider.on("change", function(data) {
// updatavisualMap(allAssistChart, data.newValue);
//
// });
// 区县帮扶
sourceChart.on('legendselectchanged', function(params) {
	var proSel = params.name;
	var data = getCountyData(proSel, "source");
	addseries(sourceCountyChart, proSel, data);
	showCityTable('IPASrcCountyMove', 'IPASrcCountyMoveTableBody', 'IPASrcCountyMoveTableTitle', proSel, null, 1, initPageSize)
	delete params, data;

})

desChart.on('legendselectchanged', function(params) {
	var proSel = params.name;
	var data = getCountyData(proSel, "des");
	addseries(desCountyChart, proSel, data);
	showCityTable('IPADesCountyMove', 'IPADesCountyMoveTableBody', 'IPADesCountyMoveTableTitle', null, proSel, 1, initPageSize)
	delete params, data;
})

// 去重
function unique(arr) {
	arr = arr || [];
	var obj = {}, ret = [], res = [];
	arr.forEach(function(x) {
		if (obj[x.name] == undefined) {
			obj[x.name] = {
				name : x.name,
				index : 1,
				value : x.value[2]
			}
			ret.push(x);
		} else {
			obj[x.name].index += 1;
			obj[x.name].value += x.value[2];
		}
	});
	ret.forEach(function(y) {
		if (obj[y.name] && obj[y.name].index > 1) {
			value = obj[y.name].value / obj[y.name].index;
			res.push({
				name : y.name,
				value : [ y.value[0], y.value[1], value ]
			})
		} else {
			res.push(y);
		}
	});
	delete obj, ret
	return res;
}
// 列表展示

initChart();

window.onresize = function() {
	sourceChart.resize();
	desChart.resize();
	allAssistChart.resize();
	sourceCountyChart.resize();
	desCountyChart.resize();
	allAssistCountyChart.resize();
}

function showCityTable(parentDiv, tableBodyName, tableTitleName, proSel, toProv, pageIndex, pageSize) {
	var table = $("#" + tableBodyName).empty();
	$("#" + tableTitleName).empty().html((proSel==null?toProv:proSel) + "-携手奔小康-结对关系")
	var datas={};
	if(toProv==null){
		cityToCity.forEach(function(node, index) {
			var toProvName=node['to_prov'];
			var toCityName=node['to_city'];
			var fromProvName=node['from_prov'];
			var fromCityName=node['from_city'];
			if (fromProvName == proSel || proSel == '全国') {
				if (datas[fromProvName] == undefined) 
					datas[fromProvName] ={}
				
				if(datas[fromProvName][fromCityName]== undefined)
					datas[fromProvName][fromCityName]={}
				
				if(datas[fromProvName][fromCityName][toProvName]== undefined)
					datas[fromProvName][fromCityName][toProvName]=[]
				
				datas[fromProvName][fromCityName][toProvName].push(toCityName);
			}
		})
	}
	if(proSel==null){
		cityToCity.forEach(function(node, index) {
			var toProvName=node['to_prov'];
			var toCityName=node['to_city'];
			var fromProvName=node['from_prov'];
			var fromCityName=node['from_city'];
			if (toProvName == toProv || toProv == '全国') {
				if (datas[toProvName] == undefined) 
						datas[toProvName] ={}
				
				if(datas[toProvName][toCityName]== undefined)
					datas[toProvName][toCityName]={}
				
				if(datas[toProvName][toCityName][fromProvName]== undefined)
					datas[toProvName][toCityName][fromProvName]=[]
					
				datas[toProvName][toCityName][fromProvName].push(fromCityName);
			}
		})
	}
	
	var count = 0;
	var startIndex = (pageIndex - 1) * pageSize;
	var endIndex = pageIndex * pageSize;
	
	if(datas){
		var tr;
		for ( var prov in datas) {
			for(var city in datas[prov]){
				for(var key in datas[prov][city]){
					for (var j = 0; j < datas[prov][city][key].length; j++) {
						if (count >= startIndex && count < endIndex)
							tr += '<tr class="j-number"><td style="border:solid 1px #fff;text-align:center;" class="col-lg-3 col-md-3">' + prov + '</td><td style="border-right:solid 1px #fff;text-align:center;" class="col-lg-3 col-md-3">' + city + '</td>' + '<td style="border-right:solid 1px #fff;text-align:center;" class="col-lg-3 col-md-3">' + key + '</td><td class="text-center col-lg-3 col-md-3">' + datas[prov][city][key][j] + '</td></tr>';
						count++;
					}
				}
			}
		}
		table.append(tr);
	}
	var pageCount = Math.ceil(count / pageSize)
	$("#" + parentDiv + "Next").attr("href", "javascript:showCityTable(\"" + parentDiv + "\",\"" + tableBodyName + "\",\"" + tableTitleName + "\"," + (proSel==null?null:("\""+proSel+"\"")) + ","+(toProv==null?null:("\""+toProv+"\""))+"," + (pageIndex + 1 > pageCount ? pageIndex : (pageIndex + 1)) + "," + pageSize + ")")
	$("#" + parentDiv + "Previous").attr("href", "javascript:showCityTable(\"" + parentDiv + "\",\"" + tableBodyName + "\",\"" + tableTitleName + "\"," + (proSel==null?null:("\""+proSel+"\"")) +","+(toProv==null?null:("\""+toProv+"\""))+"," + (pageIndex > 1 ? (pageIndex - 1) : 1) + "," + pageSize + ")")
	$("#" + parentDiv + "Current").text("第" + pageIndex + "页")
}

function uniqueArr(arr) {
	var data = [];
	arr.forEach(function(x) {
		if (data.indexOf(x) == -1)
			data.push(x);
	});
	return data;
}

function showTableOrMap(parentDiv, table, flag) {
	if (flag == true) {
		$("#" + parentDiv).css("display", "none");
		$("#" + table).css("display", "block");
	} else {
		$("#" + parentDiv).css("display", "block");
		$("#" + table).css("display", "none");
	}
}
function initTable(parentDiv, table, tableTitle, tableBody, initNameFrom,initNameTo, pageIndex, pageSize, flag) {
	showCityTable(parentDiv, tableBody, tableTitle, initNameFrom, initNameTo, pageIndex, pageSize)
	showTableOrMap(parentDiv, table, flag)
}
