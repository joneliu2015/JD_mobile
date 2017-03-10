/**
 * Created by Administrator on 2016/12/24.
 */
//在页面加载完成之后后执行JS
window.onload= function () {
    search();
    banner();
    downTime();
}
//头部搜索
function search(){
    //屏幕滚动时候，搜索栏的颜色要随着屏幕的滚动不断加深（onscroll）
    //在滚动到轮播图结束，搜索栏的颜色不再加深，大概为0.8；

    //获取搜素盒子
    var searchBox=document.querySelector('.jd_header_box');
    //获取banner图的盒子
    var bannerBox=document.querySelector('.jd_banner');
    //获取banner图高度
    var height=bannerBox.offsetHeight;
    window.onscroll= function () {
    //如果页面卷曲的高度
        var top=document.body.scrollTop;
        var opacity=0;
        if(top>height){
            opacity=0.85
        }else{
            opacity=0.85*(top/height)
        }
        searchBox.style.background="rgba(201, 21, 35,"+opacity+")"
    }
}
//轮播图
function banner(){
//    1.自动轮播
//    2.点对应图片轮播改变
//    3.图片盒子能滑动
//    4.滑动不超过一定距离（1/3）时候，图片能吸附回去;超过的时候滚动到左边或者右边；

    //需要操作的DOM元素
    //1.大轮播图；2.图片；3。点
    //轮播图大盒子
    var banner=document.querySelector('.jd_banner');
    //图片的宽度
    var width=banner.offsetWidth;
    //图片盒子
    var imageBox=banner.querySelector('ul:first-child');
    //点盒子
    var pointBox=banner.querySelector('ul:last-child');
    //所有的点
    var points=pointBox.querySelectorAll('li');
    //添加过度
    var addTransition= function () {
        imageBox.style.webkitTransition="all 0.2s";
        imageBox.style.transition="all 0.2s";
    };
    var removeTransition= function () {
        imageBox.style.webkitTransition="none";
        imageBox.style.transition="none";
    };
    var setTranslateX= function () {
        imageBox.style.webkitTransform="translateX("+(-index*width)+"px)";
        imageBox.style.transform="translateX("+(-index*width)+"px)";
    };
//    自动轮播
    var index=1;
    //核心定时器
    var timer=setInterval(function () {
        index++;
        //让图片动态滚动
        //先给imageBox加上过度
        addTransition();
        //给imageBox设置当前位置
        setTranslateX(-index*width);
    } ,3000);
    //第三步
    //无缝滚动和滑动
    //动画结束，过度结束，判断是第几张
    //索引是9，定位到索引为1的这张，索引是0的时候，定位到索引为8的这张；
    imageBox.addEventListener('webkitTransitionEnd', function () {
        if(index>=9){
            index=1;
            removeTransition();
            setTranslateX(-index*width);
        }else if(index<=0){
            index=8;
            removeTransition();
            setTranslateX(-index*width);
        }
        setPoint();
    });
    //第四步
    //点随着图片轮播改变，对应上当前图片的位置
    var setPoint= function () {
        for(var i=0;i<points.length;i++){
            points[i].className="";
        }
        points[index-1].className="now";
    };

    //第五步
    //图片盒子能滑动
    //开始的X坐标
    var startX=0;
    //移动后的时候的X坐标
    var moveX=0;
    //移动的距离
    var distanceX=0;
    //判断是否滑动过
    var isMove=false;
    //绑定监听事件
    imageBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);//清定时器
        startX= e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        isMove=true;
        moveX= e.touches[0].clientX;
        distanceX=moveX-startX;
        /*在滑动的时候不断的给图片盒子做定位  来达到滑动的效果*/
        /*定位的位置  当前的图片的定位  加上 移动的距离*/
        //清除过渡
        removeTransition();
        //设置当前的定位
        setTranslateX(-index*width+distanceX);
    });
    window.addEventListener('touchend', function (e) {
        //滑动不超过一定距离（1/3）时候，图片能吸附回去;超过的时候滚动到左边或者右边；

        if(Math.abs(distanceX)>(width/3)&&isMove){
            //通过distanceX的值来判断要移动到上一张还是下一张；
            if(distanceX>0){
                index--;
            }else{
                index++;
            }
            /*动画的定位回去 当前的index*/
            addTransition();
            setTranslateX(-index*width);
        }else{
            /*动画的定位回去 其实就是吸附回去*/
            addTransition();
            setTranslateX(-index*width);
        }
        //重置参数，防止第二次的时候影响计算
        startX=0;
        moveX=0;
        distanceX=0;
        isMove=false;
        /*加上定时器*/
        clearInterval(timer);
        timer=setInterval(function () {
            index++;
            /*让图片动画的滚动  translateX  transition 来实现动画*/
            /*给imageBox加上过度*/
            addTransition();
            //给imageBox设置当前位置
            setTranslateX(-index*width);
        } ,3000);
    });
}
//倒计时
function downTime(){
    //获取时间
    var time=5*60*60;
    var skTime=document.querySelector('.sk_time');
    var spans=skTime.querySelectorAll('span');
    console.log(spans);
    var timer=setInterval(function () {
        time--;
        if(time<0){
            clearInterval(timer);
            return false;
        }
        var h=Math.floor(time/3600);
        var m=Math.floor((time%3600)/60);
        var s=time%60;
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000)
}
