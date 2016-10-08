//on facus 可以抽象一层

Components 继承出来添加 显示控制子组件重新渲染的部分

form表单可以先不重用

慢慢划分


commonPop
button
buttonList
hightlight
Tab
nav
fetch
下拉组件
form
select
index
textarea
dataGird

组件generator 化
Sliders
tips组件
alert(组件)
区块组件

进度条组件

翻页组件
label组件  消息组件


绑定真实接口 接口测试

接口更新  真实/mock





//使用app.use 注入中间件
//所有的koa中间件，必须是 generator function ，即 function *(){} 语法

// 路由接受 post  get请求

// 根据请求读取相应路径的文件  能读取到就 返回res.json

// 读不到就返回接口不存在

//完整逻辑

//创建

//ui -> node create json schema

//client request-> node scan json schema -> 404/faker.js + schema ->real data > response

//api创建

//权限管理 api权限管理

//json 扫描