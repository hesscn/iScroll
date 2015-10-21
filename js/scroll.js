//四方向滚动
//调用格式：
// $('$wrapDivectWrapper').Marquee({
//     speed:3000,
//     direction:'up',
//     easingType:'linear'
// });

(function($) {
	$.fn.Marquee = function(o) {
		o = $.extend({
			speed: 3000,
			direction: "up", //滚动方向
			easingType: 'linear'
		}, o || {});

		var scrtime,
			$wrapDiv = $(this),
			flag = true,
			ul = $('ul', $wrapDiv),
			btnPr = $('.prev', $wrapDiv),
			btnNr = $('.next', $wrapDiv);
		//左右控制

		$wrapDiv.on('mouseenter', function() {
			clearInterval(scrtime);
			btnPr.fadeIn('slow');
			btnNr.fadeIn('slow');
		});
		$wrapDiv.on('mouseleave', function() {
			btnPr.fadeOut('slow');
			btnNr.fadeOut('slow');
			scrtime = setInterval(function() {
				doMarquee(o.direction);
			}, o.speed);
		}).trigger("mouseleave");

		//向左滚动
		btnPr.on('click', function() {
			if (flag) {
				o.direction = 'left';
				flag = false;
				doMarquee('left');
			}
		});

		//向右滚动
		btnNr.on('click', function() {
			if (flag) {
				o.direction = 'right';
				flag = false;
				doMarquee('right');
			}
		});

		var doMarquee = function(p) {
			var margn = {};
			if (p === 'left' || p === 'up') {
				var li = ul.find('li:first');
				li.animate({
					opacity: 0
				}, 800); //左、上滚动时先渐隐(要出现的)第一个元素
			} else {
				var li = ul.find('li:last'); //右、下滚动时只先查找到最后一个元素
			}

			if (p === 'left' || p === 'right') {
				var liWidth = li.outerWidth() + parseInt(li.css('marginRight'));
				if (p === 'left') liWidth = -liWidth;
				margn.marginLeft = liWidth + 'px'; //左右滚动时先计算元素的宽度，并且向左时为负
			}

			if (p === 'up' || p === 'down') {
				var liWidth = li.outerHeight() + parseInt(li.css('marginBottom'));
				if (p === 'up') liWidth = -liWidth;
				margn.marginTop = liWidth + 'px'; //上下滚动时计算元素的高度，并且向上时为负
			}

			ul.animate(margn, 1500, o.easingType, function() {
				if (p === 'left' || p === 'up') {
					li.css({
						opacity: 100
					});
					li.appendTo(ul); //左、上：渐显先前隐藏的元素
				} else {
					li.prependTo(ul);
					li.hide(); //右、下：渐隐元素
				}

				if (p === 'left' || p === 'right') margn.marginLeft = '0px';
				if (p === 'up' || p === 'down') margn.marginTop = '0px';
				ul.css(margn);
				if (p === 'right' || p === 'down') li.fadeIn(1000);
				flag = true;
			});

		};

	}
})(jQuery);