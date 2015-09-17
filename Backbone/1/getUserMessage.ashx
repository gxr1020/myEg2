<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        //获取GET方法传递参数：Request.QueryString["参数名称"];
        //获取POST方法传递参数：Request.Form["参数名称"];
        //本例使用的POST方法
        context.Response.ContentType = "application/json"; //指定返回数据格式为json
        string userName = context.Request.Form["userName"]; //读取post过来的数据
        string userPassWord = context.Request.Form["userPassWord"];
        string jsonResult = null;

        if ("admin" == userName && "123" == userPassWord)
        {
            //json数据标准格式
            jsonResult = "{\"worker\":" +
                     "[" +
                     "{\"name\":\"张三\",\"sex\":\"男\",\"age\":\"25\"}," +
                     "{\"name\":\"李四\",\"sex\":\"女\",\"age\":\"21\"}," +
                     "{\"name\":\"王五\",\"sex\":\"男\",\"age\":\"27\"}" +
                     "]," +
                     "\"remarksMessage\":" +
                     "[" +
                     "{\"remarks\":\"普通员工\"}" +
                     "]}";
        }
        context.Response.Write(jsonResult);//向客户端返回数据
        context.Response.End();
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}