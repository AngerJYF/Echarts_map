//地图容器 
var effectChart = echarts.init(document.getElementById('effect'));
var years = [ "2013", "2014", "2015", "2016", "2017" ];
var option = {
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
		tooltip : {
			trigger : 'item',
			formatter : '{b}: {c}'
		},
		title : {
			text : "网络扶贫总览",
			subtext : "全国",
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
		series : [ {
			mapType : "china",
			type : 'map',
			roam : true
		} ],
	},
	options : []
};

function showMap(map) {
	option.baseOption.series[0].mapType = map;
	option.options = [];
	years.forEach(function(x) {
		option.options.push({
			title : {
				subtext : map == "china" ? "全国(" + x + ")" : map + "(" + x + ")",
			},
			series : [ {
				data : [],
				nameMap : {
					'china' : '中国'
				},
				label : mapLabelStyle,
				itemStyle : mapAreaItemStyle
			} ]
		})
	});
}

function getDataByName(name) {
	var res = [];
	var area_obj = newsJson[name];
	var resData = {};
	// 数据整理
	for ( var fullName in area_obj) {
		var bln = true;
		for ( var p in positionJson) {
			if (p.substring(0, 2) == fullName.split("_")[0].substring(0, 2)) {
				bln = false;
				break;
			}
		}
		if (bln)
			continue;
		var tmpData = area_obj[fullName]['data'];
		if (tmpData != undefined) {
			for ( var year in tmpData) {
				if (tmpData[year] != undefined) {
					var value = 0;
					for ( var project in tmpData[year]) {
						if (tmpData[year][project]['value'] != undefined)
							value += tmpData[year][project]['value']
					}
					if (resData[year] == undefined) {
						resData[year] = [];
					}
					resData[year].push({
						name : idMapCity[fullName.split("_")[0]],
						value : value
					});
				}
			}
		}
	}
	console.log(resData)
	res.sort(function(x, y) {
		return y.value - x.value;
	});
	// options添加
	option.baseOption.series[0].mapType = name;
	var maxValue = {
		"2013" : 128,
		"2014" : 212,
		"2015" : 1475,
		"2016" : 5000,
		"2017" : 11000
	};
	var options = [];
	for ( var year in resData) {
		options.push({
			visualMap : {
				bottom : 120,
				left : '15%',
				max : maxValue[year],
				calculable : true,
				inRange : {
					color : mapColor
				},
				textStyle : {
					color : '#fff'
				}
			},
			title : {
				subtext : name == "china" ? "全国(" + year + ")" : name + "(" + year + ")",
			},
			series : [ {
				data : resData[year],
				nameMap : {
					'china' : '中国'
				},
				hoverable : false,
				label : mapLabelStyle,
				itemStyle : mapAreaItemStyle
			} ]
		})
	}
	option.options = options;
	// for (var i = 0; i < 5; i++) {
	// var t = option.options[i];
	// var index = 0;
	// res.forEach(function(p) {
	// t.series[0].data.push({
	// name : idMapCity[p.id],
	// value : Math.round(Math.random() * 30)
	// });
	//
	// if (geoCoordMap[idMapCity[p.id]] != undefined && index < 5) {
	// t.series[0].markPoint.data.push({
	// name : idMapCity[p.id],
	// coord : geoCoordMap[idMapCity[p.id]].concat(p.value)
	// });
	// }
	// index++;
	// });
	// }
}

effectChart.on('click', function(params, ev) {
	// console.log( params.name )
	// getMapJson(cityMap[params.name], params, function(c, p, map) {
	// echarts.registerMap(p.name, map);
	// showMap(p.name);
	// getDataByName(p.name);
	// effectChart.setOption(option, true);
	// });
})

getMapJson("000000", {
	name : 'china',
	id : '000000'
}, function(c, p, map) { 
	getDataByName(p.name);
	effectChart.setOption(option, true);
});

window.onresize = function() {
	effectChart.resize();
};
