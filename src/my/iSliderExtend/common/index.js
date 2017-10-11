/**
 * 轮播翻页组件
 * 该模式下建议使用触屏事件
 */
define(['../../../../node_modules/jquery/mobile.js', '../../../../node_modules/islider.js/src/js/iSlider.js'/* , 'islider/plugin/animate' */], function($, iSlider) {
	'use strict';
	// 默认配置
	var defaultOpt = {
		// 页面存储方式默认为会话存储.
		// 可选参数: 空/null/false(表示不记录)、session、hash
		pageRecordType: 'session',
		/**
		 * 轮播渲染就绪
		 * render(slide) 第一个参数即轮播对象
		 * @type {Function}
		 */
		render: function(){},
		// 轮播组件原始配置项
		sliderOpt: {
			isDebug: false,
			isAutoplay: false,
			isLooping: false,
			isVertical: 1,
			// 场景内屏蔽原生事件的触发，如：滚动、拖拽、缩放等
			// 对表单类元素"SELECT"、"INPUT"、"TEXTAREA"、"BUTTON"、"LABEL"，任何情况下均不进行阻止
			fixPage: '[data-cmd]',
			animateTime: 1000
		}
	};
	var Page = {
		cache: {},
		curPage: 0,
		opt: {},
		create: function(opt) {
			var ca = this.cache;
			ca.$main = $('#main');
			ca.$stage = $('#stage');
			ca.$guide = $('.stage-guide', ca.$main);
			$.extend(true, this.opt, defaultOpt, opt);
			this.curPage = this.getPage();
			this.checkSrcLoad(function() {
				var slide = this.initSlide();
				this.opt.render.call(this, slide);
			});
		},
		/**
		 * 检查资源加载
		 */
		checkSrcLoad: function(completeFn) {
			var me = this;
			var ca = this.cache;
			// 需要加载判断的资源
			ca.preSrcCount = 0;
			$('img', ca.$stage).each(function() {
				if (!this.complete) {
					ca.preSrcCount++;
					this.onload = function() {
						ca.preSrcCount--;
						if (!ca.preSrcCount) {
							completeFn.call(me);
						}
					}
					this.onerror = function() {
						ca.preSrcCount--;
						if (!ca.preSrcCount) {
							completeFn.call(me);
						}
					}
				}
			});
			if (!ca.preSrcCount) {
				completeFn.call(this);
			}
		},
		/**
		 * 从hash地址取页码
		 * @return {Number} page
		 */
		getHashPage: function() {
			var hash = location.hash;
			var page = hash.match(/page=(\d+)/);
			if (page) {
				return +page[1] || 0;
			} else {
				return 0;
			}
		},
		/**
		 * 保存页码到hash地址
		 * @param {Number} page 页码
		 */
		saveHashPage: function(page) {
			var hash = location.hash;
			page = +page || 0;
			if (!hash) {
				location.hash = 'page=' + page;
			} else if (hash.match(/page=(\d+)/)) {
				location.hash = hash.replace(/(page=)\d+/, '$1' + page);
			} else {
				location.hash = '&page=' + page;
			}
		},
		/**
		 * 获取会话存储里缓存的页码
		 * @return {Number} page
		 */
		getSessionPage: function() {
			return +sessionStorage.getItem('h5Page-' + location.pathname) || 0;
		},
		/**
		 * 保存页码到会话存储
		 * @param {Number} page 页码
		 */
		saveSessionPage: function(page) {
			sessionStorage.setItem('h5Page-' + location.pathname, +page || 0);
		},
		/**
		 * 获取缓存的页码
		 * @return {Number} page
		 */
		getPage: function() {
			var type = this.opt.pageRecordType;
			if (type) {
				if (type == 'hash') {
					return this.getHashPage();
				}
				return this.getSessionPage();
			}
			return 0;
		},
		/**
		 * 保存页码
		 * @param {Number} page 页码
		 */
		savePage: function(page) {
			var type = this.opt.pageRecordType;
			this.curPage = page;
			if (type) {
				if (type == 'hash') {
					this.saveHashPage(page);
				}
				this.saveSessionPage(page);
			}
		},
		initSlide: function(opt) {
			var me = this;
			var ca = this.cache;
			var list = [];
			var _opt;
			var pageCount;
			var instance;
			// 默认取stage容器里的page项
			$('.page', ca.$stage).each(function(i, el) {
				list.push({
					content: el
				});
			});
			ca.$stage.children().remove();
			$('.stage-loading', ca.$main).hide();
			ca.$stage.show();
			_opt = $.extend(true, {
				dom: $('#stage')[0],
				data: list,
				initIndex: this.curPage
			}, this.opt.sliderOpt);
			pageCount = _opt.data.length;
			instance = new iSlider(_opt);
			// this.curPage为最后一页
			if (this.curPage == pageCount - 1) {
				ca.$guide.hide();
			}
			// 当场景改变完成(动画完成)时触发
			instance.on('slideChanged', function(i, el) {
				me.savePage(i);
				// 最后一页隐藏引导箭头
				if (i == pageCount - 1) {
					ca.$guide.hide();
				} else {
					ca.$guide.show();
				}
			});
			return instance;
		}
	}
	return Page;
});
