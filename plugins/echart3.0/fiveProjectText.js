var projectArr = [ "信息服务", "网络覆盖", "网络扶智", "农村电商", "网络公益" ];

function addNavigate(code) {
	var that = $("#navgate").empty(); 
	init(getCityName(code));
	addBack(code);

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

function five_getData(name, allcity) {
	var area_obj = newsJsonInArr[name];
	var data = {};
	for ( var key in area_obj) {
		var code_ = key.split("_")[0];
		var name_ = getCityName(code_);
		var _prefix = null;

		if (code_.substring(2, 6) == "0000") {
			_prefix = code_.substring(0, 2);
		} else if (code_.substring(4, 6) == "00") {
			_prefix = code_.substring(0, 4);
		} else {
			_prefix = code_;
		}
		if (_prefix != null && !isPkx(_prefix))
			continue;

		if (area_obj[key]['data'] == undefined)
			break;

		if (area_obj[key]['data']['all'] != undefined) {
			var fiveJson = area_obj[key]['data']['all'];

			fiveJson.forEach(function(d, i) {
				if (data[projectArr[i]] == undefined) {
					data[projectArr[i]] = {
						data : [],
						map : name
					}
				}
				data[projectArr[i]]['data'].push({
					name : name_,
					value : d
				})
			})
		}
	}

	var data0 = data;
	projectArr.forEach(function(key) {
		if (data0[key] == undefined) {
			data0[key] = {
				data : [],
				map : name
			}
		}
		var topData = data0[key].data;
		topData.sort(function(x, y) {
			return y.value - x.value;
		});
		var index = 0;
		var pointData = [];
		topData.forEach(function(p) {
			// 排名前五
			// if (geoCoordMap[p.name] != undefined && index < 5) {
			// pointData.push({
			// name : p.name,
			// coord : geoCoordMap[p.name].concat(p.value)
			// });
			// }

			// 深度贫困地区

			if (p.name == "山西" || p.name == "云南" || p.name == "西藏" || p.name == "青海" || p.name == "新疆") {
				pointData.push({
					name : p.name,
					coord : geoCoordMap[p.name].concat(p.value)
				})
			}
			index++;
		});
		data0[key].pointData = pointData;
		data0[key].allcity = (allcity || []);
	});

	return data0

};

function getCountyData(name) {
	var topName = name;
	var tmp = {};
	var tmpCode = codeAnay(getCityCode(topName));
	var newPositionJson;
	if (tmpCode == '000000') {
		newPositionJson = positionJson;
	} else {
		newPositionJson = findDict(positionJson, function(x) {
			if (x.indexOf(tmpCode) == 0)
				return x;
		})
	}
	projectArr.forEach(function(proj, i) {
		if (tmp[proj] == undefined)
			tmp[proj] = []
		for ( var code in newPositionJson) {
			var name = idMapCity[code];
			if (name == undefined)
				continue;
			for ( var fullName in newsJsonInArr[name]) {
				var data = newsJsonInArr[name][fullName];
				if (data == undefined || data['data'] == undefined || data['data']['all'] == undefined)
					continue;
				var d = data['data']['all'][i]
				if (d <= 0)
					continue;
				tmp[proj].push({
					name : name,
					value : positionJson[code].concat(d)
				});

			}
		}
	})
	return tmp;
};

function getMinMax(t) {
	var selectedLegends = Object.keys(t.legend.selected).filter(function(x) {
		return t.legend.selected[x] == true;
	});

	var max = 0;
	var min = 0;
	for (var i = 0; i < t.series.length; i++) {
		if (selectedLegends.indexOf(t.series[i].name) == -1)
			continue;

		var data = t.series[i].data;
		if (data.length == 0)
			continue;

		var vs = data.map(function(a) {
			var v = a.value || 0;

			if ($.isArray(a.value)) {
				if (!isNaN(a.value[2]))
					v = a.value[2];
			} else {
				if (!isNaN(a.value))
					v = a.value || 0;
			}

			return v;
		});

		var vv = Math.max.apply(null, vs);
		var v1 = Math.min.apply(null, vs);
		max += (isNaN(vv) ? 0 : vv);
		min += (isNaN(v1) ? 0 : v1);
	}

	if (max == undefined || max < 1) {
		max = 1;
	}
	if(max<min+10)
		min=0;
	return {
		max : max,
		min : min
	}
}

function getSelectedSeries1(t) {

	var selectedLegend = Object.keys(t.legend.selected).filter(function(x) {
		return t.legend.selected[x] == true;
	});

	var selectedSeries = t.series.filter(function(x) {
		return x.name == selectedLegend[0];
	});
	return selectedSeries[0];
}

function getTopData(t, n) {
	var series = getSelectedSeries1(t);
	var res = {};
	if (series.data.length < n)
		n = series.data.length
	res[series.name] = series.data.sort(function(a, b) {
		if ($.isArray(a.value)) {
			return (a.value[2] || 0) - (b.value[2] || 0);
		} else {
			return (a.value || 0) - (b.value || 0)
		}
	}).map(function(d, i) {
		if ($.isArray(d.value)) {
			return {
				name : d.name,
				value : (d.value[2] || 0)
			}
		}
		return {
			name : d.name,
			value : (d.value || 0)
		}
	}).slice(series.data.length - n, series.data.length);

	return res;
}

var fiveProjectChart = new elensChart("fiveProjectMap");
var fiveProjectTop = new elensChart("fiveProjectTop");
var fiveProjectCountyChart = new elensChart("fiveProjectCountyMap");
var fiveProjectCountyTop = new elensChart("fiveProjectCountyTop");

function legendChange(params){
	console.log(params)
	$("#"+fiveProjectChart.getId()).data("legend",params.name); 
	$("#"+fiveProjectCountyChart.getId()).data("legend",params.name);
	
	fiveProjectChart.setLegendSelected(params.name);
	fiveProjectChart.setVisualMap(0, getMinMax(fiveProjectChart.getOption()).max)
	fiveProjectChart.update();
	
	fiveProjectTop.updateSeries();
	fiveProjectTop.drawTopBar(getTopData(fiveProjectChart.getOption(), 10));
	fiveProjectTop.update();

	fiveProjectCountyChart.setLegendSelected(params.name);
	fiveProjectCountyChart.setVisualMap(0, (getMinMax(fiveProjectCountyChart.getOption()).max)/5)
	fiveProjectCountyChart.update();

	fiveProjectCountyTop.updateSeries();
	fiveProjectCountyTop.drawTopBar(getTopData(fiveProjectCountyChart.getOption(), 10));
	fiveProjectCountyTop.update();
}

function fiveProjectMap(name) {
	var data = five_getData(name);
	var legendData = [];
	fiveProjectChart.updateSeries();
	fiveProjectChart.setTitle("全国五大工程进展");
	for ( var proj in data) {
		legendData.push({
			name : proj,
			icon : 'circle'
		})
		fiveProjectChart.addSeries({
			name : proj,
			type : 'map',
			mapType : name,
			top : '10%',
			// left : map == "china" ? '12%' : '20%',
			zoom : name == "china" ? 1 : 0.8,
			roam : true,
			showLegendSymbol : false,
			z : 1,
			nameMap : {
				'china' : '中国'
			},
			label : mapLabelStyle,
			itemStyle : mapAreaItemStyle,
			markPoint : {
				symbol : "image://assets/images/In_topPoint.png",
				symbolSize : [ 15, 15 ],
				data : data[proj].pointData,
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
			},
		}, data[proj].data)
	}
	fiveProjectChart.setLegend({
		show : true,
		left : 'center',
		top : screenScale * 50,
		itemGap : screenScale * 20,
		itemHeight : screenScale * 20,
		inactiveColor : '#93a7c1',
		orient : "horizontal",
		selectedMode : 'single'
	}, legendData);
	
	var selectedSeries = $("#"+fiveProjectChart.getId()).data("legend");
	
	fiveProjectChart.setLegendSelected(selectedSeries);

	var t = fiveProjectChart.getOption();

	var maxMin = getMinMax(t); 
	fiveProjectChart.setVisualMap(maxMin.min, maxMin.max, {
		show : true,
		max:maxMin.max,
		min:maxMin.min,
		inRange : {
			color : mapColor
		},
		orient : 'vertical'
	});
	fiveProjectChart.updateMap(name, {
		show : false
	});
	
}

function fiveProjectMapTop(name) {
	fiveProjectTop.setTitle("各省五大工程排名");
	var data = getTopData(fiveProjectChart.getOption(), 10); 
	fiveProjectTop.drawTopBar(data);
	fiveProjectTop.update();
}

function fiveProjectCountyMap(name) {
	var mapData = getCountyData(name);
	var legendData = [];
	fiveProjectCountyChart.updateSeries();
	fiveProjectCountyChart.setTitle("全国贫困县五大工程进展");
	for ( var proj in mapData) {
		legendData.push({
			name : proj,
			icon : 'circle'
		})
		fiveProjectCountyChart.addSeries({
			name : proj,
			type : 'scatter',
			coordinateSystem : 'geo',
			symbolSize : [ 15, 15 ],
			symbolOffset : [ 0, '50%' ],
			symbol : 'circle',
			tooltip : {
				trigger : 'item',
				formatter : function(params) {
					return params.name + "<br/>" + params.seriesName + "-推进力度" + "&nbsp;:&nbsp;" + params.value[2];
				}
			}
		}, mapData[proj])
	}
	;
	fiveProjectCountyChart.setLegend({
		show : true,
		left : 'center',
		top : screenScale * 50,
		itemGap : screenScale * 20,
		itemHeight : screenScale * 20,
		inactiveColor : '#93a7c1',
		orient : "horizontal",
		selectedMode : 'single'
	}, legendData);

	var selectedSeries = $("#"+fiveProjectCountyChart.getId()).data("legend");
	
	fiveProjectCountyChart.setLegendSelected(selectedSeries);

	var t = fiveProjectCountyChart.getOption();

	var maxMin = getMinMax(t);
	fiveProjectCountyChart.setVisualMap(maxMin.min, maxMin.max / 5, {
		show : true,
		orient : 'vertical',
		max:maxMin.max/5,
		min:maxMin.min,
		inRange : {
			symbolSize : [ 10, 25 ],
			color : lineColor
		}
	})
	fiveProjectCountyChart.updateMap(name, {
		label : mapLabelStyle,
		itemStyle : mapAreaItemStyle
	})
}

function fiveProjectCountyMapTop(name) {
	var data = getTopData(fiveProjectCountyChart.getOption(), 10);

	fiveProjectCountyTop.setTitle("各县(区)五大工程排名");

	fiveProjectCountyTop.drawTopBar(data);

	fiveProjectCountyTop.update();
}

fiveProjectChart.on("legendselectchanged", function(params) {  
	legendChange(params);
});

fiveProjectCountyChart.on("legendselectchanged", function(params) {
	legendChange(params)
});

fiveProjectChart.on("click", function(params){
	addNavigate(getCityCode(params.name)); 
})

fiveProjectCountyChart.on("click", function(params){
	addNavigate(getCityCode(params.name)); 
})

function init(name) {
	fiveProjectMap(name);
	fiveProjectMapTop();
	fiveProjectCountyMap(name);
	fiveProjectCountyMapTop(name);
}

init("china");
