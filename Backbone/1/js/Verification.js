$(document).ready(function () {
    var txtUserName = $("#txtUserName"); //保存文本框对象，提高效率
    var txtPassWord = $("#txtPassWord");

    //注册提交按钮单击事件
    $("#btnSubmit").click(function () {
        if ("" != txtUserName.val() && "" != txtPassWord.val()) { //简单的验证放在客户端，减少服务器压力
            //利用post方式向服务器请求数据
            $.post("getUserMessage.ashx?t=" + Math.random(), { userName: txtUserName.val(), userPassWord: txtPassWord.val() }, function (json) {
                if (json) {
                    if (0 != json.worker.length) {
                        $(".worker li").remove(); //移除所有员工列表下的li标记
                        //遍历json中的worker数组，获取所有员工
                        for (var i = 0; i < json.worker.length; i++) {
                            $("<li>姓名：" + json.worker[i].name + ",性别：" + json.worker[i].sex + ",年龄：" + json.worker[i].age + "</li>").appendTo(".worker"); //从json中读取数据，构造一个li标签，插入到ul标签中
                        }
                    } else {
                        $(".worker li").remove();
                        $("<li>暂无数据或验证失败！</li>").appendTo(".worker");
                    }
                    if (0 != json.remarksMessage.length) {
                        $(".remarksMessage li").remove();
                        //遍历json中的remarksMessage数组，获取备注信息
                        for (var i = 0; i < json.remarksMessage.length; i++) {
                            $("<li>" + json.remarksMessage[i].remarks + "</li>").appendTo(".remarksMessage");
                        }
                    } else {
                        $(".remarksMessage li").remove();
                        $("<li>暂无数据或验证失败！</li>").appendTo(".remarksMessage");
                    }
                } else {
                    $("li").remove();
                    $("<li>暂无数据或验证失败！</li>").appendTo(".worker");
                    $("<li>暂无数据或验证失败！</li>").appendTo(".remarksMessage");
                }

            }, "json");
        } else {
            alert("输入非法！");
        }
    });

    //注册重置按钮单击事件
    $("#btnReset").click(function () {
        txtUserName.val("");
        txtPassWord.val("");
    });
});