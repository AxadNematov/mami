var selfContext;
(function($) {
    $.widget("ui.photoSlider", {
        options: {
            imgLeft: 'data:image/gif;base64,R0lGODlhDgAcAOYAAPn7/fr7/TpRb5uz1TdPbTZNbENbdz5Wcy9GZrHL50dfe7TN6bTO6qnC4S1EZWePw0pjfYGq2Heg0Hmi0mGHvT9XdIex3aG626O73KC52Zy01nyl1DBHZm2WyDFIZ0hge0Veea3H5F+GvHCXyae/36a+3Z+42aS93WSLwICo1zRLan6n1oWu20Jadpqz1bDK54ev3GKJv6vF40lifKrE4muTx3aez7PM6UBYdV2Fu1yDujNKaXKZy6jB4C5FZURceDVMazJJaGmRxYmy3jlQbbDJ5nSczURdea7I5TxVcmaNwi1DZIOs2UhhfJ2115632Pn6/Pz9/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAOABwAAAengFOCg4SDS4WIUw46iYQ+LjmNgggDUCKSHBoAUhSNHk6bUjGJQU+hUiiIOyanUkqFKhmtUg+EQBezUkKDBRi5UjWCBCcBUsbHxh1TRCXFyMgjAiTOz8c8ST1R1chGUwcN2ttSNoIVNOHVEoM4MujIE4QtIe7GG4UGSPQriD9F7imJjrxAF6ERiAThmEhScEMbC0lTPiyIAgPilCYMLFicMmPIxikQAgEAOw==', 	// left arrow
            imgRight: 'data:image/gif;base64,R0lGODlhDgAcAOYAAPn7/fr7/TpRb5uz1TdPbTZNbENbdz5Wcy9GZrHL50dfe7TN6bTO6qnC4S1EZWePw0pjfYGq2Heg0Hmi0mGHvT9XdIex3aG626O73KC52Zy01nyl1DBHZm2WyDFIZ0hge0Veea3H5F+GvHCXyae/36a+3Z+42aS93WSLwICo1zRLan6n1oWu20Jadpqz1bDK54ev3GKJv6vF40lifKrE4muTx3aez7PM6UBYdV2Fu1yDujNKaXKZy6jB4C5FZURceDVMazJJaGmRxYmy3jlQbbDJ5nSczURdea7I5TxVcmaNwi1DZIOs2UhhfJ2115632Pn6/Pz9/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAOABwAAAemgEtTg4SFhDoOhopTOS4+i4UiUAMIkIMUUgAaHJYxUplOHpAon5lPQYtKpZkmO4oPq5kZKoZCsZkXQIU1t5kYBYQdvVIBJwSDI8PEJURTPMrEJAJG0FE9STbKUQ0HUxLDUTQVgxO9UTI4hBu3USEthSuxUUgGhimrUUU/ihGlUS9HFjH5FCUBCEgspES5ocASjCgLPliaYoFBk4lThszAOAUCxymBAAA7', // right arrow
	    imgWidth: 100,			// one image width
	    imgHeight: 140,			// one image height
	    imgCount: 7,			// count of visible images
	    width: 0,			// count of visible images
	    hint: false			// count of visible images
        },
        _create: function() {
            // initialization
	    var self=this,
		o=self.options,
		el=self.element,
		block=$("<div></div>").addClass("ui-widget ui-photoSlider"),
		data=0,
		visibleWidth=0;
		
	    var list=$(el).children('a');
	    
	    
	    // preparing new container
	    var html='';
	    html+='<a href="" class="ui-photoSlider-left"></a>';
            html+='<a href="" class="ui-photoSlider-right"></a>';
	    html+='<div class="ui-photoSlider-inner">';
	    
	    var totalWidth=0;
	    
	    // parsing source data
	    for(i=0; i<list.length; i++) {
		var href=$(list[i]).attr('href');
		var src=$(list[i]).children().attr('src');
		var target=$(list[i]).attr('target')||'_self';
		var title=$(list[i]).attr('title') || $(list[i]).children().attr('title');
		var rel=$(list[i]).attr('rel')||'photoSlider';
		
		html+='<div class="ui-photoSlider-block" style="background: url('+src+') center top no-repeat">';
		html+='<img class="ui-photoSlider-link" rel="'+rel+'" data="'+title+'">';
                if(o.hint) {
		    html+='<a href="'+href+'" target="'+target+'" class="ui-photoSlider-hint">'+title+'</a>';
		}
                html+='</div>';
		
		totalWidth+=o.imgWidth+5;
	    }
	    
	    html+='</div>';
	    $(block).html(html);
	    
	    // styles
	    
	    if(!o.width) {
		self.visibleWidth=totalWidth-o.imgCount*(o.imgWidth+3)-18;
		var blockWidth=(o.imgWidth+2)*o.imgCount+10;
	    } else {
		var blockWidth=o.width;
		self.visibleWidth=totalWidth-o.width-18;
	    }
	    
	    block.css({
		'width': blockWidth,
		'height': o.imgHeight+3
	    });
	    
	    block.children('.ui-photoSlider-inner').css({
		'width': totalWidth,
		'height': o.imgHeight+3
	    });
	    
	    block.children('.ui-photoSlider-left').css({
		'background-image': "url("+o.imgLeft+")",
		'height': o.imgHeight+2
	    });
	    block.children('.ui-photoSlider-right').css({
		'background-image': "url("+o.imgRight+")",
		'margin-left': blockWidth-18,
		'height': o.imgHeight+2
	    });
	    
	    block.children().children('.ui-photoSlider-block').css({
		'width': o.imgWidth,
		'height': o.imgHeight
	    });
	    
	    block.children().children('.ui-photoSlider-block').children('.ui-photoSlider-link').css({
		'width': o.imgWidth,
		'height': o.imgHeight
	    });
	    
	    block.children().children('.ui-photoSlider-block').children('.ui-photoSlider-hint').css({
		'width': o.imgWidth,
		'height': 'auto !important'
	    });
	    
	    
	    // finish
	    
	    $(el).html('').append(block);
	    //$(el).hide();
	    
	    // behavior
	    
	    block.children().children('.ui-photoSlider-block').mouseenter(function() {
		$(this).children(".ui-photoSlider-hint").css("bottom", 8+$(this).children(".ui-photoSlider-hint").height());
	    });
	    block.children().children('.ui-photoSlider-block').mouseleave(function() {
		$(this).children(".ui-photoSlider-hint").css("bottom", "0");
	    });
	    
	    block.children('.ui-photoSlider-left').mouseenter(function() {
		self.data=1;
		self._move();
	    });
	    block.children('.ui-photoSlider-left').mouseleave(function() {
		self.data=0;
	    });
	    
	    block.children('.ui-photoSlider-right').mouseenter(function() {
		self.data=2;
		self._move();
	    });
	    block.children('.ui-photoSlider-right').mouseleave(function() {
		self.data=0;
	    });
	    
	    block.children('.ui-photoSlider-left').click(function() {
		return false;
	    });
	    block.children('.ui-photoSlider-right').click(function() {
		return false;
	    });
	    
	    self.block=block;
	    
        },
	_render: function() {
	    
	},
	_destroy: function() {
	    $.Widget.prototype.destroy.call(this);
	},
	_move:function() {
	    var myContext=this;
	    if(this.data==1) {
		var right=this.block.children('.ui-photoSlider-inner').css("left");
		var re=/px/;
		right=right.replace(re, '');
		right*=1;
		
		if(right<0) {
		    this.block.children('.ui-photoSlider-inner').css("left", right+5);
		    window.setTimeout (function () { myContext._move.apply (myContext); }, 10); 
		}
	    } else if(this.data==2) {
		var left=this.block.children('.ui-photoSlider-inner').css("left");
		var re=/px/;
		left=left.replace(re, '');
		left*=1;
		
		if(left>-this.visibleWidth) {
		    this.block.children('.ui-photoSlider-inner').css("left", left-5);
		    window.setTimeout (function () { myContext._move.apply (myContext); }, 10); 
		}
	    }
	}
    });
})(jQuery);