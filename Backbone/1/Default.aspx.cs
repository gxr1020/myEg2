using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Net;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //Response.ContentType = "application/json";
       // string str = Request.ToString();
       // string str2 = Request.GetResponse().ToString();
        using (var reader = new System.IO.StreamReader(Request.InputStream))
        {
            String xmlData = reader.ReadToEnd();

            if (!string.IsNullOrEmpty(xmlData))
            {
                //业务处理
            }
            Response.Write(xmlData);
            Response.Write("123");
        }
        this.Response.End();
        //Response.
      ///  Response.Write(str);
       // return str;
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
      //  Stream postData = Request.InputStream;
       /// StreamReader sRead = new StreamReader(postData);
       /// string postContent = sRead.ReadToEnd();
       /// sRead.Close();
     
        //Request.QueryString[]
        //Response.Write(str);
        //return
    }
}