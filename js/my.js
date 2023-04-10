// 功能写在这个js里；
var myprice;
// 一、渲染手机详细 信息 
var priceArea =document.querySelector(".priceArea")
priceArea.innerHTML =`
<div class="priceArea">
        <!-- 手机详细 -->
        <h3 class="title">${goodData.goodsDetail.title}</h3>
        <p class="con1">${goodData.goodsDetail.recommend}</p>
        <div class="price">
            <div class="priceDetail">
                <p>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</p>
                <p>￥ <span>${goodData.goodsDetail.price}</span> 元</p>
            </div>
            <div class="buy">
                <p>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</p>
                <p><span>${goodData.goodsDetail.promoteSales.type}</span>${goodData.goodsDetail.promoteSales.content}</p>
            </div>
        </div>
        <div class="support">
            <div class="supportDetail">
                <p>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</p>
                <p>${goodData.goodsDetail.support}</p>
            </div>
            <div class="address">
                <p>配&nbsp;送&nbsp;至</p>
                <p>${goodData.goodsDetail.address}</p>
            </div>
        </div>
        <!-- 手机详细结束 -->
`




// var detailArea =document.querySelector(".detailArea")
var chooseArea =document.querySelector(".chooseArea")
chooseArea.innerHTML =""
var chioseTypeArr =[];//存放选中的型号
goodData.goodsDetail.crumbData.forEach(function(item,k){
    var dlEle =document.createElement("dl")
    var dtEle =document.createElement("dt")//存放型号title内容
    dtEle.innerHTML =item.title
    dlEle.appendChild(dtEle)
    item.data.forEach(function(val,key){
        var ddEle =document.createElement("dd")
         ddEle.innerHTML =val.type
         // 默认把 型号 dd 的第一个 存放在 chioseTypeArr
         if (key ===0) {
            ddEle.k =k// 自定义属性 k 来记录 dd 所在的 行 
            ddEle.kk =key// 点击的时候 通过 kk 记录  dd 所在的列；
            console.log("?",ddEle);
            ddEle.showText =ddEle.innerHTML//自定义属性
            chioseTypeArr.push(ddEle)
         }
         dlEle.appendChild(ddEle)

         ddEle.onclick =function(){
            console.log("点击了型号",k);
            this.k = k//记录行
            this.kk = key//记录列
            this.showText=this.innerHTML
            chioseTypeArr[k] = this
            console.log(chioseTypeArr);
            var dds =dlEle.querySelectorAll("dd")
            console.log(dds);
            dds.forEach(function(item){
            item.style.color ="#666"
            })
            //加上当前dd的样式
            this.style.color ="red"
            // renderChioseType(chioseTypeArr)
         }
    })
    chooseArea.appendChild(dlEle);
})


// -------------------------放大镜逻辑 ------------------


// 一、让 遮罩层 跟随鼠标移动 ；
// 鼠标移入的时候 遮罩层 显示  
// 鼠标移除的时候 遮罩层 隐藏 
var smallArea = document.querySelector(".smallArea");
var mask = document.querySelector(".mask");
var bigArea = document.querySelector(".bigArea");

smallArea.onmouseenter = function(){
    mask.style.display  ="block";
    bigArea.style.display = "block";
}

smallArea.onmouseleave = function(){
    mask.style.display  ="none";
    bigArea.style.display = "none";

}

// 让遮罩层 跟随鼠标移动 ；

// 遮罩层的边界限定 ；
// 放大图 对应的移动 ；1.移入 smallArae的时候  大图 需要显示 ，否则 隐藏；  2. 大图 需要 跟随小图的移动而移动 ；

smallArea.onmousemove = function(e){
    var x = e.clientX - this.getBoundingClientRect().left;
    var y = e.clientY - this.getBoundingClientRect().top;

    // 没有定位  ，相对于 浏览器 
    // 有定位 ，相对于父级 ；
    var disx = x - mask.offsetWidth/2;
    var disy = y  - mask.offsetHeight/2;

    if(disx<0){
        disx = 0;
    }

    if(disx>smallArea.offsetWidth-mask.offsetWidth){
        disx = smallArea.offsetWidth-mask.offsetWidth;
    }

    if(disy<0){
        disy = 0;
    }

    if(disy>smallArea.offsetHeight - mask.offsetHeight){
        disy = smallArea.offsetHeight - mask.offsetHeight
    }
    // 获取大图的宽度 
    var bigAreaImg = bigArea.querySelector("img");
    var w = bigAreaImg.width;
    var h = bigAreaImg.height;
    // console.log(w);
    var bigX = (disx/smallArea.offsetWidth)*w;
    var bigY = (disy/smallArea.offsetHeight)*h;
    bigAreaImg.style.left = -bigX + "px";
    bigAreaImg.style.top = -bigY + "px";

    mask.style.left = disx +  "px"
    mask.style.top = disy + "px";
}






// -------------------------点击切换大图--------------------
var list =document.querySelector(".list")
var smallArea =document.querySelector(".smallArea")
var lis = list.querySelectorAll("li");

goodData.imgsrc.forEach(function(item){
    var liEle =document.createElement("li")
    liEle.innerHTML = `<img src="${item.s}">`
    liEle.onclick =function(){
        var bigArea =document.querySelector(".bigArea")
        smallArea.innerHTML = `<img src="${item.b}">`
        bigArea.innerHTML = `<img src="${item.b}">`
    }
    list.appendChild(liEle)
})


// 点击下一个的时候 放大图小图 滚动 ；
var rightEle = document.querySelector(".right");
rightEle.onclick =throttle( function(){
    var  leftNum = parseInt( getComputedStyle(list)['left']);
    if(leftNum>-(lis.length-5)*lis[0].offsetWidth){
        list.style.left = leftNum - lis[0].offsetWidth + "px";
    }
},800);


var leftEle = document.querySelector(".left");
leftEle.onclick =throttle( function(){
    var  leftNum = parseInt( getComputedStyle(list)['left']);
    if(leftNum<0){
        list.style.left = leftNum + lis[0].offsetWidth + "px";
    }
},800);




function throttle(fn, delay) {
    var startTime = new Date().getTime();
    return function () {
        
        var endTime = new Date().getTime();
        if (endTime - startTime > delay) {
            fn();
            // fn.call(this);
            startTime = endTime;
        }
    }
}



// --------选项卡切换-------
function Tab(btns,tabPlan){
    this.btns =btns;
    this.tabPlan =tabPlan
    this.btnFor()
}
Tab.prototype.btnFor =function(){
    var that = this
    this.btns.forEach(function(btn,key){
     btn.onclick =function(){
        that.btns.forEach(function(item){
               item.classList.remove("active")
        })
        this.classList.add("active")
        that.tabPlanFor(key)
     }
    })
}
//循环隐藏切换
Tab.prototype.tabPlanFor=function(key){
this.tabPlan.forEach(function (tab,k){
    if (k===key) {
        tab.style.display ="block"
      tab.classList.add("active")
    }else{
        tab.style.display ="none"
        tab.classList.remove("active")
    }
})
   
}
var btns = document.querySelectorAll(".tabTitle h4");
var tabPlan = document.querySelectorAll(".tabContent .tab-pane");
new Tab(btns,tabPlan);

var btns2 = document.querySelectorAll(".tab-wraped li")
var tabPlan2 = document.querySelectorAll(".tab-content .tab-pane")
new Tab(btns2,tabPlan2);

















