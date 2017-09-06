# qinlaile_wxapp
亲来了小程序版本

#应用信息

##开发信息
liuzoneze@sina.com
wxebd33900b3a73460
7e01ef3855ef06e18b8f9445c20adefb

##腾讯地图开放平台
592090207
15206900201
【key】qinlaile_wxapp
【开发者key】IEGBZ-ALXC4-B4CUG-X2V36-AU4HO-52BE7

##测试账号

测试
15206900201

天朗测试
15311441217

李思民
15269489501

##pages/application.bat
cmd命令行执行，输出当前所有page名称及数量

#TODO

##物业缴费绑定成功页面wuye/query/bind

##报修图片上传base64编码wuye/public/create.js

##入驻申请图片上传base64编码huiyuan/apply/enter.js

##个人信息设置base64编码huiyuan/persoanl/personal.js

##首页今日热点，更多不能支持html直接显示

##订单支付，报修支付，预约支付

##报修评价和预约评价图片上传


#服务端待解决问题：
1.图片上传。所有的图片上传均为base64字符串，小程序不支持
2.支付功能。接口未开放微信支付功能，小程序不支持支付宝

##日志
2017-09-05
社区论坛头像
我的报修列表分页
报修详情完成
我的订单列表分页
订单详情页完成（90%）
我的预约列表

2017-09-06
订单详情（店铺评分）
小区公告列表分页
我的预约详情
收货地址列表
下单地址选择

##tips
pages最多5层，下单结算流程：index->store->shop->order->addresslsit，此时新建地址需要redirectTo新的insert页面