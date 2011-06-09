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
					if(settings.expand===true){$this.parent().addClass('tr-expand')}
				});

			},

			//Set label width to that of wrapped text
			//Couldn't accomplish with CSS b/c wrap-initiating container keeps
			//width that kicks off the wrap (instead of collapsing down around
			//wrapped content) - generated span gives the width
			setLabelWidths:function($labels,settings){
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
					var class=settings.highlight===true?'highlight':'active';//css class determined by settings.highlight

					$labels.click(function(e){console.log(e);
						var $that=$(this),//clicked label
							$input=$('#'+$that.attr('for'));

						//appearance
						$that.toggleClass(class); //instigator
						$labels.each(function(){ //others
							if($(this)[0]!==$that[0]){
								$(this).removeClass(class);
							}
						});

						//radio toggle
						if($input[0].checked){
							e.preventDefault();
							$input.removeAttr('checked');
						}

					})
				}());
			}
		};

	$.fn.toggleRadio=function(options){

		//defaults
		var settings={
			expand:false,
			highlight:true,
			offset:false,
			action:null
		};

		//overrides
		if(options){
			$.extend(settings,options);
		}

		methods.setup(this,settings);
		methods.setLabelWidths(this,settings);
		methods.attachLabelBehaviors(this,settings);
	};

}(jQuery));