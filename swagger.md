# 接口文档


**简介**:接口文档


**HOST**:localhost:8080


**联系人**:


**Version**:v1.0


**接口路径**:/v2/api-docs


[TOC]






# 好友相关接口


## 删除好友


**接口地址**:`/capi/user/friend`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "targetUid": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|request|body|true|FriendDeleteReq|FriendDeleteReq|
|&emsp;&emsp;targetUid|好友uid||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 申请好友


**接口地址**:`/capi/user/friend/apply`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "msg": "",
  "targetUid": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|request|body|true|FriendApplyReq|FriendApplyReq|
|&emsp;&emsp;msg|申请信息||false|string||
|&emsp;&emsp;targetUid|好友uid||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 审批同意


**接口地址**:`/capi/user/friend/apply`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "applyId": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|request|body|true|FriendApproveReq|FriendApproveReq|
|&emsp;&emsp;applyId|申请id||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 好友申请列表


**接口地址**:`/capi/user/friend/apply/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|pageNo|页面索引（从1开始）|query|false|integer(int32)||
|pageSize|页面大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«基础翻页返回«FriendApplyResp»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|基础翻页返回«FriendApplyResp»|基础翻页返回«FriendApplyResp»|
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|数据列表|array|FriendApplyResp|
|&emsp;&emsp;&emsp;&emsp;applyId|申请id|integer||
|&emsp;&emsp;&emsp;&emsp;msg|申请信息|string||
|&emsp;&emsp;&emsp;&emsp;status|申请状态 1待审批 2同意|integer||
|&emsp;&emsp;&emsp;&emsp;type|申请类型 1加好友|integer||
|&emsp;&emsp;&emsp;&emsp;uid|申请人uid|integer||
|&emsp;&emsp;pageNo|当前页数|integer(int32)||
|&emsp;&emsp;pageSize|每页查询数量|integer(int32)||
|&emsp;&emsp;totalRecords|总记录数|integer(int64)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"isLast": true,
		"list": [
			{
				"applyId": 0,
				"msg": "",
				"status": 0,
				"type": 0,
				"uid": 0
			}
		],
		"pageNo": 0,
		"pageSize": 0,
		"totalRecords": 0
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 申请未读数


**接口地址**:`/capi/user/friend/apply/unread`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«FriendUnreadResp»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|FriendUnreadResp|FriendUnreadResp|
|&emsp;&emsp;unReadCount|申请列表的未读数|integer(int32)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"unReadCount": 0
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 批量判断是否是自己好友


**接口地址**:`/capi/user/friend/check`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|uidList|校验好友的uid|query|false|array|integer|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«FriendCheckResp»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|FriendCheckResp|FriendCheckResp|
|&emsp;&emsp;checkedList|校验结果|array|FriendCheck|
|&emsp;&emsp;&emsp;&emsp;isFriend||boolean||
|&emsp;&emsp;&emsp;&emsp;uid||integer||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"checkedList": [
			{
				"isFriend": true,
				"uid": 0
			}
		]
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 联系人列表


**接口地址**:`/capi/user/friend/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|cursor|游标（初始为null，后续请求附带上次翻页的游标）|query|false|string||
|pageSize|页面大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«游标翻页返回«FriendResp»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|游标翻页返回«FriendResp»|游标翻页返回«FriendResp»|
|&emsp;&emsp;cursor|游标（下次翻页带上这参数）|string||
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|数据列表|array|FriendResp|
|&emsp;&emsp;&emsp;&emsp;activeStatus|在线状态 1在线 2离线|integer||
|&emsp;&emsp;&emsp;&emsp;uid|好友uid|integer||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"cursor": "",
		"isLast": true,
		"list": [
			{
				"activeStatus": 0,
				"uid": 0
			}
		]
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


# 歌单相关接口


## 新建歌单


**接口地址**:`/capi/playlist/add`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "cover": "",
  "isPublic": 0,
  "name": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|req|req|body|true|PlaylistAddReq|PlaylistAddReq|
|&emsp;&emsp;cover|封面url||true|string||
|&emsp;&emsp;isPublic|是否公开||true|integer(int32)||
|&emsp;&emsp;name|歌单名||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 添加歌曲


**接口地址**:`/capi/playlist/addSong`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "playlistId": 0,
  "songIds": [
    1,
    2
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|req|req|body|true|SongToPlaylistReq|SongToPlaylistReq|
|&emsp;&emsp;playlistId|歌单id||true|integer(int64)||
|&emsp;&emsp;songIds|歌曲id列表||true|array|integer|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 删除歌单


**接口地址**:`/capi/playlist/delete`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|req|req|body|true|IdReqVO|IdReqVO|
|&emsp;&emsp;id|id||true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 删除歌单内歌曲


**接口地址**:`/capi/playlist/deleteSong`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "playlistId": 0,
  "songIds": [
    1,
    2
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|req|req|body|true|SongToPlaylistReq|SongToPlaylistReq|
|&emsp;&emsp;playlistId|歌单id||true|integer(int64)||
|&emsp;&emsp;songIds|歌曲id列表||true|array|integer|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 查询歌单详细信息


**接口地址**:`/capi/playlist/get`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«歌单详情»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|歌单详情|歌单详情|
|&emsp;&emsp;cover|封面|string||
|&emsp;&emsp;id|歌单id|integer(int64)||
|&emsp;&emsp;isPublic|是否公开 0否 1是|integer(int32)||
|&emsp;&emsp;name|歌单名|string||
|&emsp;&emsp;plCommentNum|歌单评论数|integer(int32)||
|&emsp;&emsp;plFollowNum|歌单收藏数|integer(int32)||
|&emsp;&emsp;plListenNum|歌单播放数|integer(int32)||
|&emsp;&emsp;plShareNum|歌单分享数|integer(int32)||
|&emsp;&emsp;plSongNum|歌单歌曲数|integer(int32)||
|&emsp;&emsp;songs|歌曲列表|array|歌曲列表返回体|
|&emsp;&emsp;&emsp;&emsp;cover|歌曲封面|string||
|&emsp;&emsp;&emsp;&emsp;id|歌曲id|integer||
|&emsp;&emsp;&emsp;&emsp;name|歌曲名|string||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"cover": "",
		"id": 0,
		"isPublic": 0,
		"name": "",
		"plCommentNum": 0,
		"plFollowNum": 0,
		"plListenNum": 0,
		"plShareNum": 0,
		"plSongNum": 0,
		"songs": [
			{
				"cover": "",
				"id": 0,
				"name": ""
			}
		]
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 用户歌单分页


**接口地址**:`/capi/playlist/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|pageNo|页面索引（从1开始）|query|false|integer(int32)||
|pageSize|页面大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«基础翻页返回«歌单分页»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|基础翻页返回«歌单分页»|基础翻页返回«歌单分页»|
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|数据列表|array|歌单分页|
|&emsp;&emsp;&emsp;&emsp;cover|封面|string||
|&emsp;&emsp;&emsp;&emsp;id|歌单id|integer||
|&emsp;&emsp;&emsp;&emsp;name|歌单名|string||
|&emsp;&emsp;&emsp;&emsp;plSongNum|歌单歌曲数|integer||
|&emsp;&emsp;pageNo|当前页数|integer(int32)||
|&emsp;&emsp;pageSize|每页查询数量|integer(int32)||
|&emsp;&emsp;totalRecords|总记录数|integer(int64)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"isLast": true,
		"list": [
			{
				"cover": "",
				"id": 0,
				"name": "",
				"plSongNum": 0
			}
		],
		"pageNo": 0,
		"pageSize": 0,
		"totalRecords": 0
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 用户歌单分页


**接口地址**:`/capi/playlist/song/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|playlistId|歌单id|query|true|integer(int64)||
|pageNo|页面索引（从1开始）|query|false|integer(int32)||
|pageSize|页面大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«基础翻页返回«歌单内歌曲分页»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|基础翻页返回«歌单内歌曲分页»|基础翻页返回«歌单内歌曲分页»|
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|数据列表|array|歌单内歌曲分页|
|&emsp;&emsp;&emsp;&emsp;cover|封面|string||
|&emsp;&emsp;&emsp;&emsp;id|歌曲id|integer||
|&emsp;&emsp;&emsp;&emsp;name|歌曲名|string||
|&emsp;&emsp;&emsp;&emsp;singerName|歌手|string||
|&emsp;&emsp;pageNo|当前页数|integer(int32)||
|&emsp;&emsp;pageSize|每页查询数量|integer(int32)||
|&emsp;&emsp;totalRecords|总记录数|integer(int64)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"isLast": true,
		"list": [
			{
				"cover": "",
				"id": 0,
				"name": "",
				"singerName": ""
			}
		],
		"pageNo": 0,
		"pageSize": 0,
		"totalRecords": 0
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 修改歌单信息


**接口地址**:`/capi/playlist/update`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "cover": "",
  "id": 0,
  "isPublic": 0,
  "name": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|req|req|body|true|PlaylistUpdateReq|PlaylistUpdateReq|
|&emsp;&emsp;cover|封面url||false|string||
|&emsp;&emsp;id|歌单id||true|integer(int64)||
|&emsp;&emsp;isPublic|是否公开||false|integer(int32)||
|&emsp;&emsp;name|歌单名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


# 歌手相关接口


## 查询歌手详细信息


**接口地址**:`/singer/get`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«歌曲详情»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|歌曲详情|歌曲详情|
|&emsp;&emsp;albumNum|专辑数|integer(int32)||
|&emsp;&emsp;followNum|关注数|integer(int32)||
|&emsp;&emsp;singerId|歌手id|integer(int64)||
|&emsp;&emsp;singerName|歌手名|string||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"albumNum": 0,
		"followNum": 0,
		"singerId": 0,
		"singerName": ""
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


# 歌曲相关接口


## 查询歌曲详细信息


**接口地址**:`/song/get`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«歌曲详情»_1|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|歌曲详情_1|歌曲详情_1|
|&emsp;&emsp;cover|封面url|string||
|&emsp;&emsp;playlistId|专辑id|integer(int64)||
|&emsp;&emsp;playlistName|专辑名|string||
|&emsp;&emsp;singerId|歌手id|integer(int64)||
|&emsp;&emsp;singerName|歌手名|string||
|&emsp;&emsp;songId|歌曲id|integer(int64)||
|&emsp;&emsp;songName|歌曲名|string||
|&emsp;&emsp;url|歌曲url|string||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"cover": "",
		"playlistId": 0,
		"playlistName": "",
		"singerId": 0,
		"singerName": "",
		"songId": 0,
		"songName": "",
		"url": ""
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


# 用户相关接口


## 用户登录


**接口地址**:`/capi/user/public/login`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|phone|phone|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«登录信息»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|登录信息|登录信息|
|&emsp;&emsp;token|token|string||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"token": ""
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 用户注册


**接口地址**:`/capi/user/public/register`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "avatar": "",
  "name": "",
  "phone": "",
  "sex": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userInfo|userInfo|body|true|UserRegisterReq|UserRegisterReq|
|&emsp;&emsp;avatar|头像||true|string||
|&emsp;&emsp;name|用户昵称||true|string||
|&emsp;&emsp;phone|手机号||true|string||
|&emsp;&emsp;sex|性别 1为男性，2为女性||true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«登录信息»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|登录信息|登录信息|
|&emsp;&emsp;token|token|string||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"token": ""
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 获取用户信息


**接口地址**:`/capi/user/userInfo`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«object»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|object||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


# 聊天室相关接口


## 发送消息


**接口地址**:`/capi/chat/msg`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "body": {},
  "msgType": 0,
  "roomId": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|request|body|true|ChatMessageReq|ChatMessageReq|
|&emsp;&emsp;body|消息内容，类型不同传值不同，见https://www.yuque.com/snab/mallcaht/rkb2uz5k1qqdmcmd||false|object||
|&emsp;&emsp;msgType|消息类型||false|integer(int32)||
|&emsp;&emsp;roomId|房间id||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«ChatMessageResp»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|ChatMessageResp|ChatMessageResp|
|&emsp;&emsp;fromUser|发送者信息|UserInfo|UserInfo|
|&emsp;&emsp;&emsp;&emsp;uid|用户id|integer||
|&emsp;&emsp;message|消息详情|Message|Message|
|&emsp;&emsp;&emsp;&emsp;body|消息内容不同的消息类型，内容体不同，见https://www.yuque.com/snab/mallcaht/rkb2uz5k1qqdmcmd|object||
|&emsp;&emsp;&emsp;&emsp;id|消息id|integer||
|&emsp;&emsp;&emsp;&emsp;messageMark|消息标记|MessageMark|MessageMark|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;dislikeCount|举报数|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;likeCount|点赞数|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userDislike|该用户是否已经举报 0否 1是|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userLike|该用户是否已经点赞 0否 1是|integer||
|&emsp;&emsp;&emsp;&emsp;roomId|房间id|integer||
|&emsp;&emsp;&emsp;&emsp;sendTime|消息发送时间|string||
|&emsp;&emsp;&emsp;&emsp;type|消息类型 1正常文本 2.撤回消息|integer||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"fromUser": {
			"uid": 0
		},
		"message": {
			"body": {},
			"id": 0,
			"messageMark": {
				"dislikeCount": 0,
				"likeCount": 0,
				"userDislike": 0,
				"userLike": 0
			},
			"roomId": 0,
			"sendTime": "",
			"type": 0
		}
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 获取消息的已读未读总数


**接口地址**:`/capi/chat/msg/read`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|msgIds|消息id集合（只查本人）|query|false|array|integer|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«List«MsgReadInfoDTO»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|array|MsgReadInfoDTO|
|&emsp;&emsp;msgId|消息id|integer(int64)||
|&emsp;&emsp;readCount|已读数|integer(int32)||
|&emsp;&emsp;unReadCount|未读数|integer(int32)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": [
		{
			"msgId": 0,
			"readCount": 0,
			"unReadCount": 0
		}
	],
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 消息阅读上报


**接口地址**:`/capi/chat/msg/read`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "roomId": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|request|body|true|ChatMessageMemberReq|ChatMessageMemberReq|
|&emsp;&emsp;roomId|会话id||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 消息的已读未读列表


**接口地址**:`/capi/chat/msg/read/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|cursor|游标（初始为null，后续请求附带上次翻页的游标）|query|false|string||
|msgId|消息id|query|false|integer(int64)||
|pageSize|页面大小|query|false|integer(int32)||
|searchType|查询类型 1已读 2未读|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«游标翻页返回«ChatMessageReadResp»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|游标翻页返回«ChatMessageReadResp»|游标翻页返回«ChatMessageReadResp»|
|&emsp;&emsp;cursor|游标（下次翻页带上这参数）|string||
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|数据列表|array|ChatMessageReadResp|
|&emsp;&emsp;&emsp;&emsp;uid|已读或者未读的用户uid|integer||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"cursor": "",
		"isLast": true,
		"list": [
			{
				"uid": 0
			}
		]
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 会话详情


**接口地址**:`/capi/chat/public/contact/detail`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«ChatRoomResp»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|ChatRoomResp|ChatRoomResp|
|&emsp;&emsp;activeTime|房间最后活跃时间(用来排序)|string(date-time)||
|&emsp;&emsp;avatar|会话头像|string||
|&emsp;&emsp;hot_Flag|是否全员展示的会话 0否 1是|integer(int32)||
|&emsp;&emsp;name|会话名称|string||
|&emsp;&emsp;roomId|房间id|integer(int64)||
|&emsp;&emsp;text|最新消息|string||
|&emsp;&emsp;type|房间类型 1群聊 2单聊|integer(int32)||
|&emsp;&emsp;unreadCount|未读数|integer(int32)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"activeTime": "",
		"avatar": "",
		"hot_Flag": 0,
		"name": "",
		"roomId": 0,
		"text": "",
		"type": 0,
		"unreadCount": 0
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 会话详情(联系人列表发消息用)


**接口地址**:`/capi/chat/public/contact/detail/friend`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|uid|好友uid|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«ChatRoomResp»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|ChatRoomResp|ChatRoomResp|
|&emsp;&emsp;activeTime|房间最后活跃时间(用来排序)|string(date-time)||
|&emsp;&emsp;avatar|会话头像|string||
|&emsp;&emsp;hot_Flag|是否全员展示的会话 0否 1是|integer(int32)||
|&emsp;&emsp;name|会话名称|string||
|&emsp;&emsp;roomId|房间id|integer(int64)||
|&emsp;&emsp;text|最新消息|string||
|&emsp;&emsp;type|房间类型 1群聊 2单聊|integer(int32)||
|&emsp;&emsp;unreadCount|未读数|integer(int32)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"activeTime": "",
		"avatar": "",
		"hot_Flag": 0,
		"name": "",
		"roomId": 0,
		"text": "",
		"type": 0,
		"unreadCount": 0
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 会话列表


**接口地址**:`/capi/chat/public/contact/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|cursor|游标（初始为null，后续请求附带上次翻页的游标）|query|false|string||
|pageSize|页面大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«游标翻页返回«ChatRoomResp»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|游标翻页返回«ChatRoomResp»|游标翻页返回«ChatRoomResp»|
|&emsp;&emsp;cursor|游标（下次翻页带上这参数）|string||
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|数据列表|array|ChatRoomResp|
|&emsp;&emsp;&emsp;&emsp;activeTime|房间最后活跃时间(用来排序)|string||
|&emsp;&emsp;&emsp;&emsp;avatar|会话头像|string||
|&emsp;&emsp;&emsp;&emsp;hot_Flag|是否全员展示的会话 0否 1是|integer||
|&emsp;&emsp;&emsp;&emsp;name|会话名称|string||
|&emsp;&emsp;&emsp;&emsp;roomId|房间id|integer||
|&emsp;&emsp;&emsp;&emsp;text|最新消息|string||
|&emsp;&emsp;&emsp;&emsp;type|房间类型 1群聊 2单聊|integer||
|&emsp;&emsp;&emsp;&emsp;unreadCount|未读数|integer||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"cursor": "",
		"isLast": true,
		"list": [
			{
				"activeTime": "",
				"avatar": "",
				"hot_Flag": 0,
				"name": "",
				"roomId": 0,
				"text": "",
				"type": 0,
				"unreadCount": 0
			}
		]
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 消息列表


**接口地址**:`/capi/chat/public/msg/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|cursor|游标（初始为null，后续请求附带上次翻页的游标）|query|false|string||
|pageSize|页面大小|query|false|integer(int32)||
|roomId|会话id|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«游标翻页返回«ChatMessageResp»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|游标翻页返回«ChatMessageResp»|游标翻页返回«ChatMessageResp»|
|&emsp;&emsp;cursor|游标（下次翻页带上这参数）|string||
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|数据列表|array|ChatMessageResp|
|&emsp;&emsp;&emsp;&emsp;fromUser|发送者信息|UserInfo|UserInfo|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;uid|用户id|integer||
|&emsp;&emsp;&emsp;&emsp;message|消息详情|Message|Message|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;body|消息内容不同的消息类型，内容体不同，见https://www.yuque.com/snab/mallcaht/rkb2uz5k1qqdmcmd|object||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|消息id|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;messageMark|消息标记|MessageMark|MessageMark|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;dislikeCount|举报数|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;likeCount|点赞数|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userDislike|该用户是否已经举报 0否 1是|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userLike|该用户是否已经点赞 0否 1是|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;roomId|房间id|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sendTime|消息发送时间|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;type|消息类型 1正常文本 2.撤回消息|integer||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"cursor": "",
		"isLast": true,
		"list": [
			{
				"fromUser": {
					"uid": 0
				},
				"message": {
					"body": {},
					"id": 0,
					"messageMark": {
						"dislikeCount": 0,
						"likeCount": 0,
						"userDislike": 0,
						"userLike": 0
					},
					"roomId": 0,
					"sendTime": "",
					"type": 0
				}
			}
		]
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 新增群组


**接口地址**:`/capi/room/group`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "uidList": []
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|request|body|true|GroupAddReq|GroupAddReq|
|&emsp;&emsp;uidList|邀请的uid||false|array|integer|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«IdRespVO»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|IdRespVO|IdRespVO|
|&emsp;&emsp;id|id|integer(int64)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"id": 0
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 邀请好友


**接口地址**:`/capi/room/group/member`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "roomId": 0,
  "uidList": []
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|request|body|true|MemberAddReq|MemberAddReq|
|&emsp;&emsp;roomId|房间id||false|integer(int64)||
|&emsp;&emsp;uidList|邀请的uid||false|array|integer|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 移除成员


**接口地址**:`/capi/room/group/member`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "roomId": 0,
  "uid": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|request|body|true|MemberDelReq|MemberDelReq|
|&emsp;&emsp;roomId|会话id||false|integer(int64)||
|&emsp;&emsp;uid|被移除的uid（主动退群填自己）||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«Void»|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 房间内的所有群成员列表-@专用


**接口地址**:`/capi/room/group/member/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roomId|会话id|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«List«ChatMemberListResp»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|array|ChatMemberListResp|
|&emsp;&emsp;avatar|头像|string||
|&emsp;&emsp;name|用户名称|string||
|&emsp;&emsp;uid|uid|integer(int64)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": [
		{
			"avatar": "",
			"name": "",
			"uid": 0
		}
	],
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 群组详情


**接口地址**:`/capi/room/public/group`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«MemberResp»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|MemberResp|MemberResp|
|&emsp;&emsp;avatar|群头像|string||
|&emsp;&emsp;groupName|群名称|string||
|&emsp;&emsp;onlineNum|在线人数|integer(int64)||
|&emsp;&emsp;role|成员角色 1群主 2管理员 3普通成员 4踢出群聊|integer(int32)||
|&emsp;&emsp;roomId|房间id|integer(int64)||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"avatar": "",
		"groupName": "",
		"onlineNum": 0,
		"role": 0,
		"roomId": 0
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```


## 群成员列表


**接口地址**:`/capi/room/public/group/member/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|cursor|游标（初始为null，后续请求附带上次翻页的游标）|query|false|string||
|pageSize|页面大小|query|false|integer(int32)||
|roomId|房间号|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|基础返回体«游标翻页返回«ChatMemberResp»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|data|返回对象|游标翻页返回«ChatMemberResp»|游标翻页返回«ChatMemberResp»|
|&emsp;&emsp;cursor|游标（下次翻页带上这参数）|string||
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|数据列表|array|ChatMemberResp|
|&emsp;&emsp;&emsp;&emsp;activeStatus|在线状态 1在线 2离线|integer||
|&emsp;&emsp;&emsp;&emsp;lastOptTime|最后一次上下线时间|string||
|&emsp;&emsp;&emsp;&emsp;roleId||integer||
|&emsp;&emsp;&emsp;&emsp;uid|uid|integer||
|errorCode|错误码|integer(int32)|integer(int32)|
|errorMsg|错误消息|string||
|success|成功标识true or false|boolean||


**响应示例**:
```javascript
{
	"data": {
		"cursor": "",
		"isLast": true,
		"list": [
			{
				"activeStatus": 0,
				"lastOptTime": "",
				"roleId": 0,
				"uid": 0
			}
		]
	},
	"errorCode": 0,
	"errorMsg": "",
	"success": true
}
```