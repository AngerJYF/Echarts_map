var shuangShiSchoolChart = echarts.init(document.getElementById("shuangshiSchool"));
var lianMengSchoolChart = echarts.init(document.getElementById("lianmengSchool"));
var schoolDatas='';

var option = {
	color : defaultColor,
	title : {
		text : '东西部协作扶贫分析',
		left : 'center',
		textStyle : titleTextStyle
	},
	tooltip : {
		trigger : 'item',
		formatter : '{b}'
	},
	legend : {
		itemHeight : screenScale * 20,
		orient : 'vertical',
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
		show : false,
		calculable : true,
		inRange : {
			color : mapColor
		},
		textStyle : {
			color : '#fff'
		}
	},
	geo : {
		map : 'china',
		roam : false,
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle
	},
	series : []
};

function addseries(targetChart, seriesName, map, data, schoolData) {
	var o = targetChart.getOption();
	o.geo = null;
	o.visualMap = null;
	o.series.push({
		name : seriesName,
		type : 'map',
		showLegendSymbol : false,
		mapType : map,
		data : data,
		itemStyle : mapAreaItemStyle,
		markPoint : {
			symbolSize : seriesName == "双师学校" ? 8 : 3,
			data : schoolData,
			large : true,
			silent : false,
			label : {
				normal : {
					show : false
				},
				emphasis : {
					show : false
				}
			}
		},
		label : {
			normal : {
				show : true,
				textStyle : labelTextStyle,
				formatter : function(params) {
					if (params.value > 0) {
						return params.name + ":" + params.value;
					}
					return "";
				}

			},
			emphasis : {
				show : true,
				textStyle : labelTextStyle,
				formatter : function(params) {
					if (params.value > 0) {
						return params.name + ":" + params.value;
					}
					return "";
				}
			}
		}
	})
	// o.tooltip = null;
	targetChart.setOption(o, true);
}

function _addseries(targetChart, schoolType, map, data, schooleData) {
	var t = targetChart.getOption();
	var dataLine = [];
	var dataScatter = [];
	schooleData.forEach(function(s) {
		dataLine.push({
			fromName : '中国人民大学附属中学',
			toName : s.name,
			coords : [ [ 116.32433053162889, 39.98044648296058 ], s.coord ]
		});
		dataScatter.push({
			name : s.name,
			value : s.coord
		})
	})
	t.tooltip = {
		trigger : 'item',
		formatter : function(params) {
			if (params.data.fromName) {
				return params.data.fromName + " > " + params.data.toName;
			} else {
				return params.name
			}
		}

	}, t.series.push({
		name : schoolType,
		type : 'map',
		showLegendSymbol : false,
		mapType : map,
		data : data,
		geoIndex : 0
	}, {
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
			normal : {
				color : '#E4C554',
				width : 0,
				opacity : 1,
				curveness : 0.1
			}
		},
		data : dataLine
	}, {
		name : schoolType,
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
			}
		},
		data : dataLine
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
				textStyle : labelTextStyle
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
	targetChart.setOption(t, true);
}

function getSchoolData(schoolType, callback, provName) {
	var res = [];
	var schoolData = [];
	var value = "";
	for ( var prov in SchoolJson) {
		var schoolTypeData = SchoolJson[prov][schoolType].schools
		value = SchoolJson[prov][schoolType].value;
		if (value > 0 && provName == undefined) {
			res.push({
				name : prov,
				value : value
			})
			for ( var schoolName in schoolTypeData) {

				schoolData.push({
					name : schoolName,
					coord : schoolTypeData[schoolName]
				})

			}

		} else if (prov == provName) {
			for ( var schoolName in schoolTypeData) {
				schoolData.push({
					name : schoolName,
					coord : schoolTypeData[schoolName]
				})

			}
		}
	}
	if (callback != undefined)
		callback(res, schoolData);
	return schoolData;
}

function showModal(params) {
	$("#schoolModal .modal-body .content").empty();
	getSchoolData(params.seriesName, function(x, y) {
		schoolDatas = y;
		if (y.length > 0) {
			y.forEach(function(school,i) {
//				if(i>39)
//					return;
				$("#schoolModal .modal-body .content").append("<div class='col-md-6'><p style='text-align: left;'>" + school.name + "</p></div>");
			});
			$("#schoolModal").modal('show');
		}

	}, params.name)
	delete params;
}

function initChart() {
	var params = {
		name : 'china'
	}
	getMapJson('000000', params, function(c, p, map) {
		var name = p.name;

		option.title.text = "双师学校分布";
		shuangShiSchoolChart.setOption(option, true);
		getSchoolData('双师学校', function(data, schoolData) {
			_addseries(shuangShiSchoolChart, "双师学校", "china", data, schoolData);
		});

		option.title.text = "联盟学校分布";
		lianMengSchoolChart.setOption(option, true);
		getSchoolData("联盟学校", function(data, schoolData) {
			addseries(lianMengSchoolChart, "联盟学校", "china", data, schoolData);
		});
	});
}

shuangShiSchoolChart.on('click', function(params) {
	$("#schoolModal .modal-title").html(params.name + "-双师学校名单(" + params.value + ")");
	showModal(params)
})

lianMengSchoolChart.on('click', function(params) {
	$("#schoolModal .modal-title").html(params.name + "-联盟学校名单(" + params.value + ")");
	showModal(params)
})

 $(document).delegate('.limt','click',function(){
	var text =  $(this).attr('data-text');
	var page = $('#limt').attr('data-value');
	console.log(text,schoolDatas)
	
	if(text=='last'){
//		if(page == 1)
//			return;
		$(this).next().remove();
		$(this).append('<li><span >第'+page-1+'页</span></li>')
		
	}else if(text == 'next'){
		
		
	}
	
 })

initChart();

window.onresize = function() {
	shuangShiSchoolChart.resize();
	lianMengSchoolChart.resize();
}