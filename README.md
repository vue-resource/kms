# kms

## 路由说明

### 登陆
- 登陆： /login

### 项目相关
- 项目列表：/project/list
- 添加项目：/project/add

### 目标管理
- 目标列表：/contract/list?id=项目id
- 添加项目：/contract/add?id=项目id
- 需求关系图：/contract/topu?id=目标id
- 编辑目标：
    /contract/目标id?tab=0&projectId=项目id   我发出
    /contract/目标id?tab=1&projectId=项目id   我收到

### 问题管理
- 问题列表：/issue/list
- 添加问题：/issue/action
- 编辑问题：/issue/action?id=问题id
- 问题详情：/issue/detail


## 枚举值说明
- viewType = 0 发出
  targetStatus:
    0 || '': 和原来一样
    1: 和原来相比，增加确定按钮（收到->点击发布）
    2: 确定按钮消失，页面所有面板只读，增加第三个面板，数据只读，按钮禁用（发出 -> 点击确定按钮）
    3: 按钮可以点击(收到 -> 点击发布)
- viewType = 1 收到
  targetStatus:
    0 || '': 和原来一样
    1:
    2: 前2个面板禁用，第三个面板展开，可编辑，发布，保存按钮
    3: 页面所有禁用（发出 -> 点击确定）

0-2 只读、禁用
0-3 只读、启用
0-4 只读、消失

1-2 正常
1-3 正常
1-4 只读、消失