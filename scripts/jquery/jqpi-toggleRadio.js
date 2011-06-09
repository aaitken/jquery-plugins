//radio button-to-(expanding)-toggle jQuery plugin
//Alex Aitken 7/2011
//Call plugin using a selector that resolves to a discrete, named radio button group

(function($){

	//private
	var methods={

			setup:function($labels,settings){
				$labels.each(function(){
					var $this=$(this);
					$this.parent().addClass('tr-container');
					if(settings.expand){$this.parent().addClass('tr-expand')}
					if(settings.offset){$this.parent().addClass('tr-offset')}
				});

			},

			//Set label width to that of wrapped text
			//Couldn't accomplish with CSS b/c wrap-initiating container keeps
			//width that kicks off the wrap (instead of collapsing down around
			//wrapped content) - generated span gives the width
			setLabelWidths:function($labels){
				$labels.each(function(){
					var $this=$(this);
					$this.wrapInner(document.createElement('span'));
					$this.css({
						width:$this.find('span:eq(0)').width() + 'px'
					})
				});
			},

			//attachBehaviors
			attachLabelBehaviors:function($labels,settings){

				//attach hovers
				(function(){
					var arrive=function(){$(this).addClass('hover')},
						leave=function(){$(this).removeClass('hover')};
					$labels.hover(arrive,leave);
				}());

				//attach clicks
				(function(){

					//private
					var className=settings.highlight===true?'highlight':'active';//css class determined by settings.highlight

					$labels.click(function(e){
						var $that=$(this),//clicked label
							$input=$('#'+$that.attr('for'));

						//appearance
						$that.toggleClass(className); //instigator
						$labels.each(function(){ //others
							if($(this)[0]!==$that[0]){
								$(this).removeClass(className);
							}
						});

						//radio toggle off
						if($input[0].checked){
							e.preventDefault();
							$input.removeAttr('checked');
						}

						//timed callback
						if(settings.callback){
							setTimeout(function(){
								settings.callback();
							},settings.delay);
						}

					})
				}());
			}
		};

	$.fn.toggleRadio=function(options){

		//todo - set up for event delegation rather than individual attachments

		//defaults
		var	$label=this.parent().find('label'), //label translation (as plugin is called on rb group)
			settings={
				expand:false, //left-side arrow toggle
				highlight:true, //highlight instead of subtler 'active' class
				offset:false, //left positioning
				callback:null, //callback function for after toggle
				delay:0 //callback delay
			};

		//overrides
		if(options){
			$.extend(settings,options);
		}

		methods.setup($label,settings);
		methods.setLabelWidths($label);
		methods.attachLabelBehaviors($label,settings);
	};

}(jQuery));