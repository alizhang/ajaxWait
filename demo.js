$(function(){
	// 提供类似Ajax的服务
	var UU = {
		getData:function(){
			var a = $.Deferred();
			setTimeout(function(){
				a.resolve({res:'ok'});
			},3000);
			return a;
		}
	}

	// 点击句饼
	var clickHandler = function(e,a){
		UU.getData().done(function(){
			a.reset();
		})
	};
	// 注册事件
	$("[ajaxWait]").ajaxWait(clickHandler,{
		timeout:5000,
		onBeforeClick:function(dom){console.log("尚未点击，我得准备准备，么么哒！"); dom.after($("<div class='percent' style='font-size:12px;  display:inline-block;'></div>"));},
		onHoldClick:function(dom){ 
			dom.html("正在请求数据"); 
			$({a:0}).animate(
				{a:99},
				{
					step:function(step){ 
						dom.next(".percent").html(parseInt(step)+"%");
					}
					
				})
		},
		onresetClick:function(dom){
			dom.html("你好")
			dom.next(".percent").html("100%").fadeOut(1000);
		}
	});
})

