var data1 = ['管理员项', '客户信息', '管理动作', '业务考评', '资产管理维护', '分析图表', '退出'];
var data2 = [
    ['权限分配', '部门设置', '员工管理', '押品设置', '操作纪录', "客户性质", "货款产品", "收款方式", "合作银行", "全部银行", "渠道"],
    ['费用发放', '相关人员', '客户照片', '数据导入', '贷款明细', '还款明细'],
    ['客户签约', '签约审核', '风控验收', '货款到款', '货款发放', '客户调查'],
    ['业绩情况', '市场开放', '市场维护', '费用支出'],
    ['资产管理', '设备设置', '设备保修', '保修审核', '已审核问题'],
    ['月日均变化图', '贷款笔数变化图'],
    ['通知', '个人资料', '退出']
];

var datas = new Array();
for (var i = 0; i < data1.length; i++) {
    datas.push(data1[i]);
    var dd = data2[i];
    for (var j = 0; j < dd.length; j++) {

        datas.push(dd[j]);
    }
}
console.log(datas);


function initTree(t) {
    var tree = document.getElementById(t);

    var lists = tree.getElementsByTagName('li');
    for (var i = 0; i < lists.length; i++) {
        var item = lists[i]; //li
        (function (num) {
            var sub_ul = item.getElementsByTagName('ul');
            var a_el = item.getElementsByTagName('a');
            var b_el = item.getElementsByTagName('b');
            if (sub_ul.length != 0) { //1表
                sub_ul[0].style.display = 'none';
                a_el[0].onclick = function () {
                    if (sub_ul[0].style.display == 'block') {
                        sub_ul[0].style.display = 'none';
                        b_el[0].style.backgroundImage = 'url("./sources/images/arrow-right.png")';
                    } else {
                        sub_ul[0].style.display = 'block';
                        b_el[0].style.backgroundImage = 'url("./sources/images/arrow-down.png")';
                    }
                }
            } else { //2表
                a_el[0].onclick = function () {
                    var li_el = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('li');
                    // alert(li_el.length);
                    for (var i = 0; i < li_el.length; i++) {
                        var sub_a = li_el[i].getElementsByTagName('a');
                        sub_a[0].style.borderLeft = '4px solid #f8f6f7';
                        sub_a[0].style.color = '#999'; 
                        
                    }
                        this.style.borderLeft = '4px solid #f47f03';
                        this.style.color = '#f47f03';
                    console.log(datas[num]);
                    document.getElementById('c3-show').innerText = datas[num];
                    // tianjianli(cd);

                }
            }

        })(i);
    }

}

function createLeftNavs(id) {
    var ul_el = document.getElementById(id);
    if (data1.length != 0) {
        for (var i = 0; i < data1.length; i++) {
            var li = document.createElement('li');
            var b = document.createElement('b');
            var a = document.createElement('a');
            a.innerText = data1[i];
            a.style.backgroundImage = 'url("./sources/images/n' + i + '.png")';
            a.style.backgroundSize = '28px';
            a.style.color = '#f47f03';
            a.setAttribute('href', 'javascript:void(0);');
            li.appendChild(b);
            li.appendChild(a);
            var sub_ul = document.createElement('ul');
            sub_ul.classList.add('sub-item');
            for (var j = 0; j < data2[i].length; j++) {
                var s_li = document.createElement('li');
                var s_a = document.createElement('a');
                s_a.innerText = data2[i][j];
                s_a.style.background = 'url("./sources/images/n' + i + j + '.png") no-repeat 20px center';
                s_a.style.backgroundSize = '26px';
                s_li.appendChild(s_a);
                sub_ul.appendChild(s_li);
            }
            li.appendChild(sub_ul);
            ul_el.appendChild(li);
        }
    }

}


function textLeft(text) {
    var lab = document.createElement('label');
    lab.style.display = 'inline-block';
    lab.style.width = '120px';
    var txt = text + ':';
    lab.innerText = txt;
    //样式
    return lab;
}

function searchInput(text) {
    var s_input = document.createElement('input');
    s_input.setAttribute('type', 'text');
    s_input.setAttribute('placeholder', text);
    s_input.style.height = '15px';
    return s_input;
}





function createlines(id, datas) {
    //创建外层
    var ul_wrapper = document.createElement('ul');
    var li_row = document.createElement('li');
    var ul_row = document.createElement('ul');
    for (var i = 0; i < 3; i++) {
        var col = document.createElement('li');
        if (0 == i) {
            var lab = textLeft(datas['row11']['name']);
            var input = searchInput(datas['row11']['val']);
            col.appendChild(lab);
            col.appendChild(input);
        } else if (1 == i) {
            var sbtn = document.createElement('button');
            var abtn = document.createElement('button');
            sbtn.innerText = '搜索';
            abtn.innerText = '添加';
            col.appendChild(sbtn);
            col.appendChild(abtn);
        } else {
            col.style.display = 'none';
        }
        ul_row.appendChild(col);
    }
    li_row.appendChild(ul_row);
    ul_wrapper.appendChild(li_row);
    document.getElementById(id).appendChild(ul_wrapper);
}

function createClos(id, datas) {
    var cols = datas['datas'].length;
    var rows = Math.ceil(cols / 3);
    var ul_wrapper = document.createElement('ul');
    for (var i = 0; i < rows; i++) {
        (function (num) {
            var li_row = document.createElement('li');
            var ul_row = document.createElement('ul');
            for (var j = 0; j < 3; j++) {
                var col = document.createElement('li');
                col.style.display = 'inline-block';
                col.style.paddingRight = '20px';
                if ((num * 3 + j) < cols) {
                    var text = textLeft(datas['datas'][num * 3 + j]['row']['name']);
                    var input = searchInput(datas['datas'][num * 3 + j]['row']['val']);
                    col.appendChild(text);
                    col.appendChild(input);
                } else {
                    col.style.display = 'none';
                }

                ul_row.appendChild(col);
            }
            ul_row.style.overflow = 'hidden';
            ul_row.style.paddingTop = '10px';
            li_row.appendChild(ul_row);
            ul_wrapper.appendChild(li_row);

        })(i)

    }

    document.getElementById(id).appendChild(ul_wrapper);
}

function createHeader(lines, id, datas) {
    switch (lines) {
        case 1:
            {
                //创建ul
                createlines(id, datas);
                break;
            }
        default:
            {
                createClos(id, datas);
            }
            break;
    }
}

function initEl() {
    var dd = {
        datas: [{
            row: {
                name: 'ID',
                val: '搜索'
            }
        },
        {
            row: {
                name: '客户名称',
                val: '搜索'
            }
        },
        {
            row: {
                name: '贷款银行',
                val: '搜索'
            }
        },
        {
            row: {
                name: '收款账号',
                val: '搜索'
            }
        },
        {
            row: {
                name: '开户行',
                val: '搜索'
            }
        },
        {
            row: {
                name: '市场开发人员',
                val: '搜索'
            }
        },
        {
            row: {
                name: '市场维护人员',
                val: '搜索'
            }
        },
        {
            row: {
                name: '介入时机',
                val: '搜索'
            }
        },
        {
            row: {
                name: '搜索',
                val: '搜索'
            }
        }
        ]
    }
    createHeader(0,'c0_header', dd)
}



var cd = {
    cs: [{
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    },
    {
        row: {
            c0: 'ID',
            c1: '客户名称',
            c2: '合同编号',
            c3: '贷款银行',
            c4: '市场开发人员',
            c5: '市场维护人员',
            c6: '部门',
            c7: '签约时间',
            c8: '贷款发放时间'
        }

    }

    ]
}



//表头
function createList(id, tdata) {
    var wrapper = document.getElementById(id);
    var t_head = document.createElement('ul');
    for (var i = 0; i < tdata.length; i++) {
        var rol = document.createElement('li');
        rol.setAttribute('class','lesi');
        
        rol.style.display = 'inline-block';
        var a_el = document.createElement('a');
        a_el.innerText = tdata[i];
        a_el.setAttribute('href', 'javascript:void(0);');
        rol.appendChild(a_el);
        t_head.appendChild(rol);
    }
    wrapper.appendChild(t_head);
    var comtent = document.createElement('ul');
    comtent.setAttribute('id', 'content');
    wrapper.appendChild(comtent);
    lesi=wrapper.getElementsByClassName('lesi')[0].getElementsByTagName('a')[0];
        var ut=document.createElement('input');
        ut.setAttribute('type','checkbox');
        ut.setAttribute('id','che');
        lesi.appendChild(ut);
       
}

//创建行 是li
function addrow(ell,rowdd) {
    var col = document.createElement('li');
    for (var i = 0; i < rowdd.length; i++) {
        var a_el = document.createElement('span');
        var xk=document.createElement('input');
        
        a_el.innerText = rowdd[i];
        col.appendChild(a_el);
        ell.appendChild(col);
    }
    var ss=col.getElementsByTagName('span')[0];
    xk.setAttribute('type','checkbox');
    ss.appendChild(xk);
}
function init() {

    //声明原生js Ajax对象
    var xhr = null;
    if (window.XMLHttpRequest) {//主流浏览器自带
        xhr = new XMLHttpRequest();
    } else {//IE5 6
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //1.4配置请求
    var url = 'http://127.0.0.1:8885/getdata';
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (4 == xhr.readyState) {
            if (200 == xhr.status) {//服务器准备好
                 obj = JSON.parse(xhr.responseText);
                console.log(obj);
                for (var i = 0; i < obj.length; i++) {
                    var itme = obj[i];
                    var dd = new Array();
                    dd.push('');
                    dd.push(itme['uid']);
                    dd.push(itme['uname']);
                    dd.push(itme['CN']);
                    dd.push(itme['openBank']);
                    dd.push(itme['dec']);
                    dd.push(itme['mbp']);
                    dd.push(itme['userType']);
                    dd.push(itme['time']);
                    dd.push(itme['time']);
                    // dd.push(itme['time']);
                    //显示页内容
                    
                    pages_total_datas.push(dd);
                }

                //清除
                var el = getConteWrapper();
                showPage(el,1);

            }
        }
    }

    

    //动态添加数据
    var ddc = ['', 'ID', '客户名称', '合同编号', '贷款银行', '市场开发人员', '市场维护人员', '部门', '签约时间', '贷款发放时间'];
    createList('c3_button_bg', ddc);
}
var pages_total_datas = new Array();
function showPage(el,page){
    // alert(1)
    for(var i=0;i<6;i++){
       if((pages_total_datas.length)===((page-1)*6)+i){
            break;
       }
         var rowdd = pages_total_datas[((page-1)*6)+i];//每一个下标是一段;也是每一行
    //    rowdd.unshift('');
    //    console.log(rowdd);
        addrow(el,rowdd);
        
    }
    
    
}



//获取当前指定显示容器
function getConteWrapper(){
    var get_content=document.getElementById('content');
    if(get_content){
        get_content.parentNode.removeChild(get_content);   
    }
        get_content=document.createElement('ul');
        get_content.setAttribute('id','content');
        document.getElementById('c3_button_bg').appendChild(get_content);
        return get_content;
}
//创建页码
var currentPage=1;
function creatPages(cla,pages){
  var  pages_el=document.getElementsByClassName(cla)[0];
  var p_ul=pages_el.getElementsByTagName('ul')[0];  
  for(var index=0;index<5;index++){
      var page_li=document.createElement('li');
      switch(index){
          case 0:{
                var a_el=document.createElement('a');
                a_el.setAttribute('href','javascript:void(0);');
                a_el.innerText='当前页:';
                var current_span=document.createElement('span');
                current_span.innerText='1';
                current_span.style.color='#f47f03';
                var total_span=document.createElement('span');
                total_span.innerText='/'+pages.length;
                a_el.appendChild(current_span);
                a_el.appendChild(total_span);
                page_li.appendChild(a_el);
          }
          break;
          default:{
                  var a_el=document.createElement('a');
                  a_el.innerText=index;
                  a_el.setAttribute('href','javascript:void(0);');
                  (function(num){
                         a_el.onclick=function(){
                                switch(num){
                                    case 1:
                                    if(currentPage==1){
                                        break;
                                    }
                                    currentPage=1;
                                    break;
                                    //执行刷新页面
                                    case 2:
                                    if(currentPage>1){
                                        currentPage-=1;
                                    }else{
                                        提示
                                    }
                                    break;
                                    //执行刷新页面
                                    case 3:
                                    if(currentPage<pages){
                                        currentPage+=1;
                                    }else{
                                        提示
                                    }
                                    break;
                                    case 4:
                                    if(currentPage==pages){
                                        break;
                                    }
                                      currentPage=pages;
                                    
                                    break;
                                }
                         }
                  })(index);
          }
          break;
      }
  }
 for(var i=0;i<4;i++){
     var li = document.createElement('li');
     li.style.display='inline-block';
     var a= document.createElement('a');
     a.setAttribute('java','javascript:void(0);');
     a.innerText=i+1;
     li.appendChild(a);
     (function(num){
          a.onclick=function(){
            //   alert(1);
              //实现切换页
              var el=getConteWrapper();
              currentPage=num+1;
              showPage(el,currentPage);
          }
     })(i);
     p_ul.appendChild(li);
 }
}




var xxkli=document.getElementById('c3-ul1').getElementsByTagName('li');
var xxklv=document.getElementById('c3-xxk').getElementsByClassName('xgf-xxk-1');
for(var i=0;i<xxkli.length;i++){
    xxklv[0].style.display='block';    
    (function(num){
          xxkli[num].onclick=function(){
               for(var j=0;j<xxklv.length;j++){
                   xxklv[j].style.display='none';
                   xxkli[j].className='';
                   xxkli[j].style.backgroundColor='#f9f9f9';
               }
               xxklv[num].style.display='block';
               xxkli[num].className='c3-lu-li';
               xxkli[num].style.backgroundColor='#fff';
          }
    })(i)
}

//图表
function getCarsAndHourse(){
    var xhr = new XMLHttpRequest();
    var url='http://127.0.0.1:8885/data';
    xhr.open('GET',url,true);
    xhr.send();
    xhr.onreadystatechange=function(){
        if(4==xhr.readyState){
            if(200==xhr.status){
                obj = JSON.parse(xhr.responseText);
                  var datas={};
                  var temp=new Array();
                  for(var i=0;i<obj['hours'].length;i++){
                         temp.push(obj['hours'][i]['score']); 
                  }
                  datas.hours=temp;
                  temp=[];
                  for(var i=0;i<obj['cars'].length;i++){
                    temp.push(obj['cars'][i]['score']); 
             }
             datas.cars=temp;
             drawTu(datas);
             drawTu2(datas);

            }
        }
    }
}
//柱状
function drawTu(datas){
    var tu1 = document.getElementById('c3_data_show').getElementsByClassName('row')[1].getElementsByClassName('col')[0];
    var myBar=echarts.init(tu1);
    var option={
        title:{
            text:'已完成业务-年统计图',
            subtext:'根据审批数据统计',
            left:'center',
            subtextStyle:{
                color:'#f00',
                fontSize:'16px'
            }
        },
        //图例
        legend:{
            data:['房贷','车贷'],
            bottom:'1%'
        },
        grid:{
            left:'3%',
            right:'5%',
            bottom:'15%',
            containLabel:true
       },
        tooltip:{
            trigger:'axis',
           },
        xAxis:{
            data:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            axisPointer:{
                type:'shadow'
            },

        },
        yAxis:{
            type:'value',
            name:'单',
            min:0,
            max:300,
            interval:100,
            axisLabel:{
                formatter:'{value}单'
            }
        },
        series:[
            {
              name:'房贷',  
              type:'bar',
              color:'#3db6f5',
              data:datas['hours'],
              barWidth:'20%',
              
            },
            {
                name:'车贷',  
                type:'bar',
                color:'#fb8005',
                data:datas['cars'],
                barWidth:'20%'
              },
              
        ]

    }
    myBar.setOption(option);
}
//折线图
function drawTu2(datas){
    var tu1 = document.getElementById('c3_data_show').getElementsByClassName('row')[2].getElementsByClassName('col')[0];
    var myBar=echarts.init(tu1);
    var option={
        title:{
            text:'放款金额-年统计图',
            subtext:'根据放款数据统计',
            left:'center',
            subtextStyle:{
                color:'#f00',
                fontSize:'16px'
            }
        },
        //图例
        legend:{
            data:['房贷','车贷'],
            bottom:'1%'
        },
        grid:{
            left:'3%',
            right:'5%',
            bottom:'15%',
            containLabel:true
       },
        tooltip:{
            trigger:'axis',
           },
        xAxis:{
            data:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            axisPointer:{
                type:'shadow'
            },

        },
        yAxis:{
            type:'value',
            name:'单',
            min:0,
            max:300,
            interval:100,
            axisLabel:{
                formatter:'{value}单'
            }
        },
        series:[
            {
              name:'房贷',  
              type:'line',
              color:'#3db6f5',
              data:datas['hours'],
            //   itemStyle:{
            //     //   color:'#f00'
            //   }
              symbol:'circle',
              
            },
            {
                name:'车贷',  
                type:'line',
                color:'#fb8005',
                data:datas['cars'],
                symbol:'circle',
              },
              
        ]

    }
    myBar.setOption(option);
}


// dddd()
window.onload = function () {
    createLeftNavs('main_navs');
    initTree('main_navs');
    init();
    initEl();
    creatPages('pages',4);
    getCarsAndHourse();/*画图*/ 
var www=document.getElementById('che');
www.onclick=function(){
   cc=document.getElementById('c3_button_bg').getElementsByTagName('input');
   for(var i=0;i<cc.length;i++){
       cc[i].checked=www.checked;
   }
}

    



}
