function animate(dom, json, time, callback){
	 // 我们现在知道的数据有： dom元素 json数据（dom元素的css属性目标值）  time 定时器的间隔时间 回调函数
	 // 总时间 time  除以 单次时间（定时器的执行间隔 我们定义为20ms）得到总次数
	 // 再知道总距离的话 就可以进行计算一次移动多少了。
	 // 总距离 =  目标值 - 初始值
	 // 目标值是json中的数据  初始值是定时器没有开启的时候的css样式值
	 // 如何获取css样式呢？ 我们曾经学过一个getComputedStyle方法 它是高级浏览器的方法 用于获取元素的计算后样式
	 // 定义一个变量用来保存定时器的执行间隔
	 var interval = 20;
	 // 定义一个变量用来记录总次数
	 var allCount = parseInt(time / interval);
	 var nowJson = {
	 };
	 for(var i in json){
		 	// 循环json 获取它的key 对nowJson进行赋值
		 	nowJson[i] = parseInt(getComputedStyle(dom)[i]);
	 }
	 // 定义一个新的变量用来保存每一步移动多长
	 var stepJson = {};
	 for(var i in json){
	 	 stepJson[i] = (json[i] - nowJson[i]) / allCount;
	 }
	 // console.log("一共要移动" + allCount + "次");
	 // console.log("现在的状态", nowJson);
	 // console.log("目标状态", json);
	 // console.log("每一次移动的距离", stepJson);
	 // 定义累加器
	 var idx = 0;
	 // 开始移动
	 var timer = setInterval(function(){
	 	 // 累加器累加
	 	 idx++;
	 	 // 对dom进行样式改变
	 	 for(var i in json){
	 	 	if(i.toLowerCase() === "opacity"){
	 	 		dom.style[i] = nowJson[i] + stepJson[i] * idx;
	 	 	}else{
	 	 		dom.style[i] = nowJson[i] + stepJson[i] * idx + "px";
	 	 	}
	 	 }
	 	 if(idx >= allCount){
	 	 	clearInterval(timer);
	 	 	// 停下之后 执行函数 
	 	 	callback &&	callback();
	 	 }
	 }, interval);
}
// $("dom").animate({
// 	left: 1000,
// 	top: 2000
// }, 2000, function(){

// });

// animate(box1, {
// 	left: 1000,
// 	top: 2000
// }, 2000, function(){

// });