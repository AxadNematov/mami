/**
 * Table Bar Chart jQuery plugin 1.0
 * 
 * Copyright (c) 2014, AIWSolutions
 * License: GPL2
 * Project Website: http://wiki.aiwsolutions.net/Snld9
 **/

jQuery.fn.tableBarChart = function(targetDiv, caption, reverseGroup) {
	var source = $(this);
	var target = $(targetDiv);
	var maxValue = 0;
	var minValue = Number.MAX_VALUE;
	var yAxisMax = 0;
	var yAxisMin = 0;
	var groupTitles = [];
	var legends = [];
	var tableData = [];
	
	function getHeaderNames(isColumn) {
		var parentNode = isColumn ? 'thead' : 'tbody';
		var names = [];
		source.find(parentNode + ' th').each(function(index, element) {
			// skip first cell
			if (index > 0 || isColumn === undefined || !isColumn) {
				names.push($(element).text());
			}
		});
		return names;
	}
	
	function getDataByRow() {
		var dataMatrix = [];
		source.find('tbody tr').each(function(i, trElement) {
			var rowValue = [];
			$(trElement).find('td').each(function(j, tdElement) {
				var intValue = parseInt($(tdElement).text());
				if (intValue > maxValue) {
					maxValue = intValue;
				} else if (intValue < minValue) {
					minValue = intValue;
				}
				rowValue.push(intValue);
			});
			dataMatrix.push(rowValue);
		});
		return dataMatrix;
	}
	
	function getDataByColumn() {
		var dataMatrix = [];
		var numCols = source.find('tbody tr:eq(0) td').size();
		for (var i = 0; i < numCols; i++) {
			var colValue = [];
			source.find('tbody tr').each(function() {
				var intValue = parseInt($($(this).find('td:eq(' + i + ')')[0]).text());
				if (intValue > maxValue) {
					maxValue = intValue;
				} else if (intValue < minValue) {
					minValue = intValue;
				}
				colValue.push(intValue);
			});
			dataMatrix.push(colValue);
		}
		return dataMatrix;
	}
	
	function getCaption() {
		if (caption === undefined || caption.length === 0) {
			caption = '';
			source.find('caption').each(function() {
				caption = $(this).text();
			});
		}
		return caption;
	}
	
	function getAxisHTML(sourceArray, cssClass) {
		var axis = $('<ul class="' + cssClass + '"></ul>');
		$(sourceArray).each(function() {
			axis.append('<li><span>' + this + '</span></li>');
		});
		return axis;
	}
	
	function getYAxisArray(stepCount) {
		var maxDigitCount = String(maxValue).length;
		var minDigitCount = String(minValue).length;
		var base10 = Math.pow(10, maxDigitCount - 1);
		yAxisMax = base10 * (Math.floor(maxValue / base10) + 1);
		if (maxDigitCount === minDigitCount) {			
			yAxisMin = base10 * (Math.floor(minValue / base10));
		}
		var result = [];
		var step = (yAxisMax - yAxisMin) / stepCount;
		for (var i = stepCount; i >= 0; i--) {
			var stepValue = yAxisMin + step * i;
			if (stepValue % 1 !== 0) {
				stepValue = parseFloat(Math.round(stepValue * 100) / 100).toFixed(2);
			}
			result.push(stepValue);
		}
		return result;
	}
	
	function animateBar(index){
		target.find('.bar.item-' + index).each(function() {
			var bar = $(this);
			bar.css('height', 0);
			var value = bar.attr('value');
			bar.animate({
					'height': value
			}, 800);
		});
	}
	
	function getLegendHTML() {
		var legendContainer = $('<ul class="legend"></ul>');
		$(legends).each(function(index) {
			var legendItem = $('<li><span class="icon item-' + index + '"></span>' + 
				this + '</li>');
			legendItem.mouseenter(function() {
				animateBar(index);
			});
			legendContainer.append(legendItem);
		});
		return legendContainer;
	}
	
	function getBarChartHTML() {
		var barsContainer = $('<div class="bars"></div>');
		$(tableData).each(function(i, columnGroup) {
			var barGroup = $('<div class="bar-group"></div>');
			$(columnGroup).each(function(j, cell) {
				var bar = $('<div class="bar item-' + j + '" value="' +
					Math.floor((cell - yAxisMin) / (yAxisMax - yAxisMin) * 100) + '%"><span>' +
					cell + '</span></div>');
				
				// CSS :hover won't work on IE
				bar.hover(function() {
					bar.find('span').css('display', 'block');
					bar.find('span').css('z-index', '10');
					bar.find('span').css('font-weight', 'bold');
				}, function() {
					bar.find('span').css('display', 'none');
				});
				
				barGroup.append(bar);
			});
			barsContainer.append(barGroup);
		});
		return barsContainer;
	}
	
	function layout() {
		var defaultMargin = 10;
		var yAxisWidth = 50;
		target.find('.y-axis').css('width', '100%');
		target.find('.y-axis span').css('width', yAxisWidth).css('margin', '-' + defaultMargin + 'px 0 0 -' + (yAxisWidth + defaultMargin) + 'px');
		var graphWidth = target.width() - (yAxisWidth + 2 * defaultMargin);
		var graphHeight = target.height() - target.find('.caption').height() - target.find('.legend').height() - 3 * defaultMargin;
		target.find('.graph').css('width', graphWidth).css('height', graphHeight);
		var stepHeight = Math.floor((graphHeight - target.find('.x-axis').height() - 2 * defaultMargin) / (groupTitles.length + 1));	
		target.find('.y-axis li').css('height', stepHeight).css('width', '100%');
		var barGroupHeight = (target.find('.y-axis li').height() + 1) * (groupTitles.length + 1);
		target.find('.bars').css('height', barGroupHeight).css('width', '100%');
		var barGroupWidth = graphWidth / groupTitles.length - 2 * defaultMargin;
		target.find('.bar-group').css('width', barGroupWidth).css('margin', '0 ' + defaultMargin);
		target.find('.x-axis li').css('width', barGroupWidth);
		var barWidth = barGroupWidth / legends.length - 2;
		target.find('.bar').css('width', barWidth);
		///////////////////////////////// Edited Code /////////////////////////
		var r_prev = getRandomInt(0, 9);
		var r_cur = r_prev;
		/////////////// .............................. ///////////////////////
		for (var i = 0; i < legends.length; i++) {
			target.find('.bar.item-' + i).css('left', i * (barWidth + 2));
			///////////////////////////////  Edited Code //////////////////////////////////////
			if (i > 8) {
                //code
			var stxt0 = "background: #d0e4f7; background: -moz-linear-gradient(left,  #d0e4f7 0%, #73b1e7 24%, #0a77d5 50%, #539fe1 79%, #87bcea 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#d0e4f7), color-stop(24%,#73b1e7), color-stop(50%,#0a77d5), color-stop(79%,#539fe1), color-stop(100%,#87bcea)); /* Chrome,Safari4+ */ background: -webkit-linear-gradient(left,  #d0e4f7 0%,#73b1e7 24%,#0a77d5 50%,#539fe1 79%,#87bcea 100%); background: -o-linear-gradient(left,  #d0e4f7 0%,#73b1e7 24%,#0a77d5 50%,#539fe1 79%,#87bcea 100%); background: -ms-linear-gradient(left,  #d0e4f7 0%,#73b1e7 24%,#0a77d5 50%,#539fe1 79%,#87bcea 100%);  background: linear-gradient(to right,  #d0e4f7 0%,#73b1e7 24%,#0a77d5 50%,#539fe1 79%,#87bcea 100%);  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d0e4f7', endColorstr='#87bcea',GradientType=1 ); ";
			var stxt1 = "background: #f0b7a1; background: -moz-linear-gradient(left,  #f0b7a1 0%, #8c3310 42%, #752201 59%, #bf6e4e 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#f0b7a1), color-stop(42%,#8c3310), color-stop(59%,#752201), color-stop(100%,#bf6e4e)); background: -webkit-linear-gradient(left,  #f0b7a1 0%,#8c3310 42%,#752201 59%,#bf6e4e 100%); background: -o-linear-gradient(left,  #f0b7a1 0%,#8c3310 42%,#752201 59%,#bf6e4e 100%); background: -ms-linear-gradient(left,  #f0b7a1 0%,#8c3310 42%,#752201 59%,#bf6e4e 100%); background: linear-gradient(to right,  #f0b7a1 0%,#8c3310 42%,#752201 59%,#bf6e4e 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0b7a1', endColorstr='#bf6e4e',GradientType=1 );";
			var stxt2 = "background: #6d6d6d; background: -moz-linear-gradient(left,  #6d6d6d 0%, #828282 12%, #666666 25%, #424242 49%, #727272 72%, #666666 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#6d6d6d), color-stop(12%,#828282), color-stop(25%,#666666), color-stop(49%,#424242), color-stop(72%,#727272), color-stop(100%,#666666)); background: -webkit-linear-gradient(left,  #6d6d6d 0%,#828282 12%,#666666 25%,#424242 49%,#727272 72%,#666666 100%); background: -o-linear-gradient(left,  #6d6d6d 0%,#828282 12%,#666666 25%,#424242 49%,#727272 72%,#666666 100%); background: -ms-linear-gradient(left,  #6d6d6d 0%,#828282 12%,#666666 25%,#424242 49%,#727272 72%,#666666 100%);background: linear-gradient(to right,  #6d6d6d 0%,#828282 12%,#666666 25%,#424242 49%,#727272 72%,#666666 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6d6d6d', endColorstr='#666666',GradientType=1 );";
			var stxt3 = "background: #8eb92a; background: -moz-linear-gradient(left,  #bfd255 0%, #8eb92a 28%, #72aa00 47%, #8eb92a 78%, #9ecb2d 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#bfd255), color-stop(28%,#8eb92a), color-stop(47%,#72aa00), color-stop(78%,#8eb92a), color-stop(100%,#9ecb2d)); background: -webkit-linear-gradient(left,  #bfd255 0%,#8eb92a 28%,#72aa00 47%,#8eb92a 78%,#9ecb2d 100%); background: -o-linear-gradient(left,  #bfd255 0%,#8eb92a 28%,#72aa00 47%,#8eb92a 78%,#9ecb2d 100%); background: -ms-linear-gradient(left,  #bfd255 0%,#8eb92a 28%,#72aa00 47%,#8eb92a 78%,#9ecb2d 100%); background: linear-gradient(to right,  #bfd255 0%,#8eb92a 28%,#72aa00 47%,#8eb92a 78%,#9ecb2d 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bfd255', endColorstr='#9ecb2d',GradientType=1 ); }";
			var stxt4 = "background: #feff66; background: -moz-linear-gradient(left,  #feff9d 0%, #feff66 24%, #fcff00 50%, #fafc60 79%, #feff9d 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#feff9d), color-stop(24%,#feff66), color-stop(50%,#fcff00), color-stop(79%,#fafc60), color-stop(100%,#feff9d)); background: -webkit-linear-gradient(left,  #feff9d 0%,#feff66 24%,#fcff00 50%,#fafc60 79%,#feff9d 100%); background: -o-linear-gradient(left,  #feff9d 0%,#feff66 24%,#fcff00 50%,#fafc60 79%,#feff9d 100%); background: -ms-linear-gradient(left,  #feff9d 0%,#feff66 24%,#fcff00 50%,#fafc60 79%,#feff9d 100%); background: linear-gradient(to right,  #feff9d 0%,#feff66 24%,#fcff00 50%,#fafc60 79%,#feff9d 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#feff9d', endColorstr='#feff9d',GradientType=1 );";
			var stxt5 = "background: #ff5454; background: -moz-linear-gradient(left,  #ff7575 0%, #ff5454 12%, #ff3636 25%, #e00000 49%, #ff0000 72%, #ff4848 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ff7575), color-stop(12%,#ff5454), color-stop(25%,#ff3636), color-stop(49%,#e00000), color-stop(72%,#ff0000), color-stop(100%,#ff4848)); background: -webkit-linear-gradient(left,  #ff7575 0%,#ff5454 12%,#ff3636 25%,#e00000 49%,#ff0000 72%,#ff4848 100%); background: -o-linear-gradient(left,  #ff7575 0%,#ff5454 12%,#ff3636 25%,#e00000 49%,#ff0000 72%,#ff4848 100%); background: -ms-linear-gradient(left,  #ff7575 0%,#ff5454 12%,#ff3636 25%,#e00000 49%,#ff0000 72%,#ff4848 100%); background: linear-gradient(to right,  #ff7575 0%,#ff5454 12%,#ff3636 25%,#e00000 49%,#ff0000 72%,#ff4848 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff7575', endColorstr='#ff4848',GradientType=1 );";
			var stxt6 = "background: #e6a2ff; background: -moz-linear-gradient(left,  #e6a2ff 0%, #e293ff 12%, #8c25b2 25%, #ba00ff 49%, #d667ff 72%, #e192ff 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#e6a2ff), color-stop(12%,#e293ff), color-stop(25%,#8c25b2), color-stop(49%,#ba00ff), color-stop(72%,#d667ff), color-stop(100%,#e192ff)); background: -webkit-linear-gradient(left,  #e6a2ff 0%,#e293ff 12%,#8c25b2 25%,#ba00ff 49%,#d667ff 72%,#e192ff 100%); background: -o-linear-gradient(left,  #e6a2ff 0%,#e293ff 12%,#8c25b2 25%,#ba00ff 49%,#d667ff 72%,#e192ff 100%); background: -ms-linear-gradient(left,  #e6a2ff 0%,#e293ff 12%,#8c25b2 25%,#ba00ff 49%,#d667ff 72%,#e192ff 100%); background: linear-gradient(to right,  #e6a2ff 0%,#e293ff 12%,#8c25b2 25%,#ba00ff 49%,#d667ff 72%,#e192ff 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6a2ff', endColorstr='#e192ff',GradientType=1 );";
			var stxt7 = "background: #99c4fe; background: -moz-linear-gradient(left,  #99c4fe 0%, #709dd9 12%, #6baaff 25%, #0e16a7 49%, #5795e8 72%, #86b6f8 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#99c4fe), color-stop(12%,#709dd9), color-stop(25%,#6baaff), color-stop(49%,#0e16a7), color-stop(72%,#5795e8), color-stop(100%,#86b6f8)); background: -webkit-linear-gradient(left,  #99c4fe 0%,#709dd9 12%,#6baaff 25%,#0e16a7 49%,#5795e8 72%,#86b6f8 100%);  background: -o-linear-gradient(left,  #99c4fe 0%,#709dd9 12%,#6baaff 25%,#0e16a7 49%,#5795e8 72%,#86b6f8 100%);  background: -ms-linear-gradient(left,  #99c4fe 0%,#709dd9 12%,#6baaff 25%,#0e16a7 49%,#5795e8 72%,#86b6f8 100%);  background: linear-gradient(to right,  #99c4fe 0%,#709dd9 12%,#6baaff 25%,#0e16a7 49%,#5795e8 72%,#86b6f8 100%);  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#99c4fe', endColorstr='#86b6f8',GradientType=1 );";
			var stxt8 = "background: #ffbe6a; background: -moz-linear-gradient(left,  #ffbe6a 0%, #ffb24f 12%, #ffa530 25%, #de7d00 49%, #ff9000 72%, #ffae45 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ffbe6a), color-stop(12%,#ffb24f), color-stop(25%,#ffa530), color-stop(49%,#de7d00), color-stop(72%,#ff9000), color-stop(100%,#ffae45)); background: -webkit-linear-gradient(left,  #ffbe6a 0%,#ffb24f 12%,#ffa530 25%,#de7d00 49%,#ff9000 72%,#ffae45 100%); background: -o-linear-gradient(left,  #ffbe6a 0%,#ffb24f 12%,#ffa530 25%,#de7d00 49%,#ff9000 72%,#ffae45 100%); background: -ms-linear-gradient(left,  #ffbe6a 0%,#ffb24f 12%,#ffa530 25%,#de7d00 49%,#ff9000 72%,#ffae45 100%); background: linear-gradient(to right,  #ffbe6a 0%,#ffb24f 12%,#ffa530 25%,#de7d00 49%,#ff9000 72%,#ffae45 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffbe6a', endColorstr='#ffae45',GradientType=1 );";
			while (r_cur == r_prev){
				r_cur = getRandomInt(0, 9);
            }
			var style_n = document.createElement('style');
			style_n.type = 'text/css';
			if (r_cur == 0) {
				var stxt = stxt0;
            }
			if (r_cur == 1) {
                var stxt = stxt1;
            }
			if (r_cur == 2) {
                var stxt = stxt2;
            }
			if (r_cur == 3) {
				var stxt = stxt3;
            }
			if (r_cur == 4) {
                var stxt = stxt4;
            }
			if (r_cur == 5) {
				var stxt = stxt5;
            }
			if (r_cur == 6) {
                var stxt = stxt6;
            }
			if (r_cur == 7) {
                var stxt = stxt7;
            }
			if (r_cur == 8) {
                var stxt = stxt8;
            }
			style_n.innerHTML = '.item-' + i + '{' + stxt + '}';
			document.getElementsByTagName('head')[0].appendChild(style_n);
			r_prev = r_cur;
			}
            ///////////////////////////// ............ //////////////////////////
			animateBar(i);
		}
	}
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	function render() {
		target.append('<div class="caption">' + getCaption() + '</div>');
		var graphContainer = $('<div class="graph"></div>');
		graphContainer.append(getAxisHTML(groupTitles, 'x-axis'));
		graphContainer.append(getAxisHTML(getYAxisArray(groupTitles.length + 1), 'y-axis'));
		graphContainer.append(getBarChartHTML());
		target.append(graphContainer);
		target.append(getLegendHTML());
		layout();
	}
	
	function initialize() {
		groupTitles = getHeaderNames(reverseGroup ? false : true);
		legends = getHeaderNames(reverseGroup ? true : false);
		tableData = reverseGroup ? getDataByRow() : getDataByColumn();
		render();
	}
	
	initialize();
}