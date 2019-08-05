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
