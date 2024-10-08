# 小红书接口/爬虫
## 更新日志
### 8.30
* 更新X-S补环境版本
## 项目目录结构
* api:封装的几个小红书接口
* api_example:接口的响应示例
* data：用于存放爬虫主程序生成数据
* sign：小红书接口涉及到的签名算法
* utils：封装的几个工具函数
* config.js：项目配置文件，主要是cookie
* index.js：项目主入口,当前只写了爬取系统推荐的笔记（高考类别）示例，可以根据需求调用api接口进行改造
* test.js：测试程序，爬取系统推荐的笔记（高考类别）32篇
## 运行环境
* Node.js v20.11.1
## 项目使用配置
在config.js文件中配置
* b1：浏览器指纹，可能需要前端调试获取（当前不确定是否可以配置相同指纹）
* cookie_a1：在web端登录小红书帐号后，浏览器内cookie中的a1字段
* my_cookie:完整的cookie字符串。可通过浏览器访问https://edith.xiaohongshu.com/api/sns/web/v1/homefeed，用F12，在header部分的cookie中复制。
## 安装依赖
```shell
npm i
```
## 运行命令
主程序运行命令，会连续请求51200篇笔记
```shell
npm run dev
```
测试运行命令，会请求32篇笔记
```shell
npm run test
```


## 接口介绍
响应详见api_example文件夹内json文件
### homefeed
* 功能：获取首页推荐的笔记数据，只包含笔记的缩略信息，但是可以借此获取笔记ID
* 参数：
  * note_index：获取笔记的开始索引
  * num：获取笔记数量（注意，实际返回的笔记数可能少于该值）
  * refresh_type：刷新类型，默认即可
  * category：笔记的类别，对应小红书首页的几个类别选项
### feed
* 功能：获取特定ID的笔记数据，内部包含图片、视频等URL信息
* 参数：
  * note_id：笔记ID
  * xsec_token：应该是校验token，可从homefeed接口中获取，但是实测不是必备。
### page_comment
* 功能：获取特定笔记的一级评论，每次至多返回10条
* 参数：
  * note_id：笔记ID
  * cursor：评论索引，初始为""即可，后续需要获取更多评论，可以根据上次响应的cursor字段确定
### sub_comment
* 功能：获取笔记的二级评论，每次至多返回5条
* 参数：
  * note_id：笔记ID
  * root_comment_id：根评论ID
  * cursor：评论索引，初始为""即可，后续需要获取更多评论，可以根据上次响应的cursor字段确定



## 小红书平台爬虫限制
当前（2024.7.4），实测在128请求并发（无主动时延），调用10w次feed接口后，帐号被限制

