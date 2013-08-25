// filename jquery-ui-touchCarousel.js
		
		(function ($, undefined) {
		
			var _super = $.ui.carousel.prototype;
			
			$.widget('ui.touchCarousel', $.ui.carousel, {
			
				options: {
					sensitivity: 0.8
				},
				
				_create: function () {
					
					_super._create.apply(this);
					
					var self = this;
					
					this._setAxis();
				
					this.elements.runner
						.touchify() // maps draggables mouse events to touch events
						.draggable({
							axis: this.axis,
							start: function (e) {
								e = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
								self._dragStartHandler(e);
							},
							stop: function (e) {	
								e = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
								self._dragStopHandler(e);
							}
								
						});
					
				},
				
				_setAxis: function () {
					
					this.axis = this.horizontal ? 'x' : 'y';
				
				},
				
				_dragStartHandler: function (e) {
				
					this.startTime = this._getTime();
					
					this.startPos = {
						x: e.pageX,
						y: e.pageY
					};
				
				},
				
				_dragStopHandler: function (e) {
				
					var time,
						distance,
						speed,
						direction;
						
					// if touch direction changes start date should prob be reset to correctly determine speed...
					this.endTime = this._getTime();
					
					time = this.endTime - this.startTime;
					
					this.endPos = {
						x: e.pageX,
						y: e.pageY
					};
					
					distance = Math.abs(this.startPos[this.axis] - this.endPos[this.axis]);
					speed = distance / time;
					
					direction = this.startPos[this.axis] > this.endPos[this.axis] ? 'next' : 'prev';
					
					if (speed > this.options.sensitivity || distance > (this.itemDim * this._getitemsPerTransition() / 2)) {
						this[direction]();
					}
					else {
						this.goTo(this.itemIndex); // go to current element
					}
				
				},
				
				_getTime: function () {
					
					var date = new Date();
					return date.getTime();
				
				},
				
				_setOption: function (option, value) {
				
					_super._setOption.apply(this, arguments);
					
					switch (option) {
						
					case 'orientation':
						
						this._setAxis();
						this._switchAxis();
						
						break;
					
					}
					
				},
				
				_switchAxis: function () {
				
					this.elements.runner.draggable('option', 'axis', this.axis);
				
				},
				
				_destroy: function () {
					
					_super._destroy.apply(this);
					
					this.elements.runner.draggable('destroy');
					
					// must destroy touchify events...$.fn.untouchify?
					
				}
				
			});
		
		})(jQuery);
		