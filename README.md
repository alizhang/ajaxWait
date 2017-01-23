*
 *
 * AjaxWait 说明
 * 1.该插件接受一个函数作为参数，该函数将会被自动注册到DOM的click事件
 * 2.函数接收两个参数，一个是event对象，一个是reset对象(用于解锁DOM的锁定状态)
 *
 * 插件同时接收一个配置项，用于注册处理点击事件前，点击事件中，和重置事件的挂钩事件
 * 



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
	onBeforeClick:function(dom){
		console.log("尚未点击，我得准备准备，么么哒！"); 
		dom.after($("<div class='percent' style='font-size:12px;  display:inline-block;'></div>"));
	},
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
