//var typicalmodeChart = echarts.init(document.getElementById("typicalmode"));
var typicalCountymodeChart = echarts.init(document.getElementById("typicalCountymode"));
// var myChart = echarts.init(document.getElementById('vis'));

var wordcloud_option = {
	tooltip : {
		show : true
	},
	series : [ {
		type : 'wordCloud',
		sizeRange : [ 18, 60 ],
		rotationRange : [ -45, 90 ],
		shape : 'circle',
		textPadding : 5,
		autoSize : {
			enable : true,
			minSize : 18
		},
		textStyle : {
			normal : {
				color : function() {
					return 'rgb(' + [ Math.floor(Math.random() * 190), Math.floor(Math.random() * 190), Math.floor(Math.random() * 190) ].join(',') + ')';
				}
			},
			emphasis : {
				shadowBlur : 10,
				shadowColor : '#333'
			}
		},
		data : []
	} ]
};

var ty_option = {
	title : {
		text : '全国各县扶贫典型模式',
		left : 'center',
		top : 20,
		textStyle : titleTextStyle,
		subtextStyle : subTitleTextStyle
	},
	tooltip : {
		trigger : 'item',
		formatter : function(params) {
			var data = typicalmodeJson[params.name];
			if (data != undefined) {
				var html = "";
				html = params.name + "：" + data["count"] + "个典型案例<br/>";
				data["json"]["items"].forEach(function(item) {
					html += item + "<br/>";
				});
				return html;
			}

			return params.name;
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
	geo : {
		map : "china",
		show : true,
		roam : true,
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle
	},
	visualMap : {
		min : 0,
		max : 5,
		calculable : true,
		inRange : {
			color : mapColor
		},
		textStyle : {
			color : '#fff'
		}
	},
	color : defaultColor,
	animationDuration : 1000,
	animationEasing : 'cubicOut',
	animationDurationUpdate : 1000,
	series : [ {
		name : "典型案例",
		type : 'map',
		mapType : "china",
		roam : true,
		nameMap : {
			'china' : '中国'
		},
		data : [],
		label : {
			normal : {
				formatter : function(params) {
					return params.name;
				},
				symbol : "pin",
				position : 'right',
				textStyle : labelTextStyle,
				show : true
			},
			emphasis : {
				show : true,
				textStyle : labelTextStyle,
				formatter : function(params) {
					return params.name;
				},
			}
		},
		itemStyle : mapAreaItemStyle,
		color : defaultColor,
		markPoint : {
			symbol : "pin",
			symbolSize : [ 25, 25 ],
			symbolColor : defaultColor,
			label : {
				normal : {
					show : false
				},
				emphasis : {
					show : false,
					textStyle : labelTextStyle,
				}
			},
			data : [],
			itemStyle : {
				normal : {
					color : defaultColor
				}
			}
		}
	} ]
}

// 生成地图
function ad_showMap(params, i) {
	var name = params.name;
	if (cityMap[name]) {
		$.ajax({
			url : 'assets/plugins/echart3.0/map/city/' + cityMap[name] + '.json',
			type : 'get',
			dataType : 'json',
			success : function(data) {
				echarts.registerMap(name, data);

				// typicalmodeChart.setOption(ty_option, true);
				// refreshChart();

				typicalCountymodeChart.setOption(ty_option, true);
				getDataCounty();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.status == 404) {
					ad_showMap({
						name : 'china'
					});
				}
			},
		});
	} else {
		ad_showMap({
			name : 'china'
		});
	}

}

function addSeries(tagetChart, name, data) {
	var t = tagetChart.getOption();
	t.series = [];
	t.visualMap = null;
	t.geo[0].show = true;
	t.geo[0].label.normal.show = false;
	t.series.push({
		name : name,
		type : 'scatter',
		coordinateSystem : 'geo',
		color : defaultColor,
		data : data,
		symbol : 'circle',// 'image://assets/images/heart.png',
		symbolSize : [ screenScale * 15, screenScale * 15 ],
		label : {
			normal : {
				show : true,
				formatter : '{b}',
				position : 'right',
				textStyle : labelTextStyle
			},
			emphasis : {
				show : false,
				textStyle : labelTextStyle
			}
		},
		itemStyle : {
			normal : {
			// color : "#000"
			}
		},
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				var code = cityMap[params.name];

				var province = idMapCity[code.substring(0, 2) + '0000'];
				var city = idMapCity[code.substring(0, 4) + '00'];

				return province + "&nbsp;" + city + "&nbsp;" + params.name;
			}
		}
	});
	tagetChart.setOption(t, true);
}

function getDataCounty() {
	var modelData = [];
	for ( var key in typicalmodeJson) {
		var titles = typicalmodeJson[key]["json"]["items"];
		var codes = typicalmodeJson[key]["json"]["codes"];
		if (codes != undefined && codes.length > 0) {
			for (var i = 0; i < codes.length; i++) {
				modelData.push({
					name : idMapCity[codes[i]],
					value : positionJson[codes[i]],
					data : titles[i]
				})
			}
		}
	}

	addSeries(typicalCountymodeChart, "countyModel", modelData);
}

typicalCountymodeChart.on('click', function(params, ev) {
	if (params.value == undefined)
		return;

	var code = cityMap[params.name];
	var province = idMapCity[code.substring(0, 2) + '0000'];
	var city = idMapCity[code.substring(0, 4) + '00'];
	var title = province + city + params.name + "典型案例";

	$.get("assets/html/" + params.data.data + ".html", function(result) {
		$("#typicalModal").find(".modal-title").html(title);
		$("#typicalModal").find(".modal-body").html(result);
		$("#typicalModal").modal("show");
	});

});

function refreshChart() {
	var p = typicalmodeChart.getOption();

	for ( var key in typicalmodeJson) {
		p.series[0].data.push({
			name : key,
			value : typicalmodeJson[key]["count"],
			count : typicalmodeJson[key]["count"],
			data : typicalmodeJson[key]["json"]
		});

		p.series[0].markPoint.data.push({
			name : key,
			coord : geoCoordMap[key].concat(typicalmodeJson[key]["count"]),
			count : typicalmodeJson[key]["count"],
			data : typicalmodeJson[key]["json"]
		});
	}

	typicalmodeChart.setOption(p, true);
}

function refreshWordCloud(words) {
	var p = myChart.getOption();
	p.series[0].data = [];

	var words_count = JSON.parse(words);
	for ( var key in words_count) {
		if (/([\u4E00-\u9FD5a-zA-Z0-9+#&\._]+)/.test(key) && StopWordJson.indexOf(key) == -1) {
			p.series[0].data.push({
				name : key,
				value : words_count[key] * 1000
			});
		}
	}
	words_count = {};
	myChart.setOption(p, true);
}

// typicalmodeChart.on('click', function(params, ev) {
// var myTap = $("#myTab");
// myTap.html("");
//
// var myTabContent = $("#myTabContent");
// myTabContent.html("");
//
// $(".typical-keyword").html(params.name + "&nbsp;典型模式--热度词");
// $(".typical-list").html(params.name + "&nbsp;典型模式--文件列表");
//
// typicalmodeJson[params.name]["json"]["items"].forEach(function(item, i) {
// if (i == 0) {
// myTap.append("<li class='active'><a href='#html" + i + "' data-toggle='tab'>"
// + item + "</a></li>");
// myTabContent.append("<div class='tab-pane fade in active'
// style='color:white;text-indent: 12px; padding: 5px;' id='html" + i +
// "'></div>")
// } else {
// myTap.append("<li><a href='#html" + i + "' data-toggle='tab'>" + item +
// "</a></li>");
// myTabContent.append("<div class='tab-pane fade'
// style='color:white;text-indent: 12px; padding: 5px;' id='html" + i +
// "'></div>")
// }
//
// $.get("assets/html/" + item + ".html", function(result) {
// $("#html" + i).html("");
// $("#html" + i).html(result);
//
// $("#showModelCaseHtml").show();
// location.href = "#html0";
// });
// });
//
// querySegWords(params.name)
//
// });

window.onresize = function() {
	// typicalmodeChart.resize();
	// myChart.resize();
	typicalCountymodeChart.resize();
}

function querySegWords(name) {
	var segWordsUrl = "show/queryTFIDFByCode.html";
	var maxNum = 300;
	$.post(segWordsUrl, {
		name : name,
		maxNum : maxNum
	}, function(sten) {
		refreshWordCloud(sten);
	});
}

$(function() {
	ad_showMap({
		name : 'china'
	});

	// myChart.setOption(wordcloud_option, true);
	// querySegWords();
});
