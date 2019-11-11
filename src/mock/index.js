import Mock from 'mockjs'
import {
  Option
} from 'element-ui';
Mock.setup({
  timeout: 500
})
//登陆请求
Mock.mock('/login', "post", Options => {
  if (Options.body == "username=admin&password=123456") {
    return {
      "data": {
        token: "qwertyuiop"
      },
      "meta": {
        msg: "登陆成功",
        status: 200
      }
    }
  } else {
    return {
      "meta": {
        msg: "等登失败",
        status: 404
      }
    }
  }
})

//左侧列表请求
Mock.mock('/menulist', "get", Options => {
  return {
    "data": [{
        "id": 101,
        "title": "首页",
        "path": 'home',
        "children": []
      },
      {
        "id": 102,
        "title": "新建",
        "path": "新建",
        "children": [{
            "id": 103,
            "title": "制品单",
            "path": 'product',
            "children": []
          },
          {
            "id": 104,
            "title": "设备单",
            "path": 'equipment',
            "children": []
          },
          {
            "id": 105,
            "title": "关联单",
            "path": 'link',
            "children": []
          },
        ]
      },
      {
        "id": 106,
        "title": "确认",
        "path": 'confirm',
        "children": []
      },
      {
        "id": 107,
        "title": "查询",
        "path": 'query',
        "children": []
      },
      {
        "id": 108,
        "title": "高级查询",
        "path": "高级查询",
        "children": [{
            "id": 109,
            "title": "制品分析",
            "path": 'proAnalysis',
            "children": []
          },
          {
            "id": 102,
            "title": "设备分析",
            "path": "equAnalysis",
            "children": []
          }

        ]
      },
    ],
    "mate":{
        status:200
    }
  }

})

export default Mock
