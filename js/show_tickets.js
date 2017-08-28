$(function(){
	var url = window.location.href;
    var id1 = url.split('?')[1];
    var id2=id1.split('&')[0];
    var true_pid=id2.split('=')[1];//app里的pid
    var uid=id1.split('&')[1];
    var uid1=uid.split('&')[0];
    var true_uid=uid1.split('=')[1];//app里的UID

    $.ajax({
    	type:'post',
    	url:"https://www.coucouchina.com/api/index/luyanImage",
    	async:true,
    	data:{
    		uid:true_uid,
    		gid:true_pid
    	},
    	success:function(e){
    		var data=e.data;
    		if(e.code==1){
    			var html='';
	    		html='<div id="box" class="box viewport-flip">'+
					'<a href="#" class="list flip out">'+
						'<img src='+data.luyanimageback+' alt="路演门票背面" />'+
					'</a>'+
					'<a href="#" class="list flip">'+
						'<img src='+data.luyanimage+' alt="路演门票正面" />'+
					'</a>'+
				'</div>'
				$('.bigBox').append(html)
    		}
    		//翻转效果
	    	// 在前面显示的元素，隐藏在后面的元素
			var eleBack = null,
				eleFront = null,
				// 门票元素们 
				eleList = $(".list");
			// 确定前面与后面元素
			var funBackOrFront = function() {
				eleList.each(function() {
					if($(this).hasClass("out")) {
						eleBack = $(this);
					} else {
						eleFront = $(this);
					}
				});
			};
			funBackOrFront();
			$("#box").bind("click", function() {
				// 切换的顺序如下
				// 1. 当前在前显示的元素翻转90度隐藏, 动画时间300毫秒
				// 2. 结束后，之前显示在后面的元素逆向90度翻转显示在前
				// 3. 完成翻面效果
				eleFront.addClass("out").removeClass("in");
				setTimeout(function() {
					eleBack.addClass("in").removeClass("out");
					// 重新确定正反元素
					funBackOrFront();
				}, 300);
				return false;
			});	
    	}
    })
	
	
})