using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections.Specialized;
using System.Text;
using System.Collections;
using System.Net;
using System.IO;
public partial class Default2 : System.Web.UI.Page
{
    public partial class Post_Server : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {



            string type = "";

            string Re = "";

            Re += "数据传送方式：";

            if (Request.RequestType.ToUpper() == "POST")
            {

                type = "POST";

                Re += type + "<br/>参数分别是：<br/>";

                SortedList table = Param();

                if (table != null)
                {

                    foreach (DictionaryEntry De in table) { Re += "参数名：" + De.Key + " 值：" + De.Value + "<br/>"; }

                }

                else

                { Re = "你没有传递任何参数过来！"; }

            }

            else
            {

                type = "GET";

                Re += type + "<br/>参数分别是：<br/>";

                NameValueCollection nvc = GETInput();

                if (nvc.Count != 0)
                {

                    for (int i = 0; i < nvc.Count; i++) { Re += "参数名：" + nvc.GetKey(i) + " 值：" + nvc.GetValues(i)[0] + "<br/>"; }

                }

                else

                { Re = "你没有传递任何参数过来！"; }

            }

            Response.Write(Re);



        }



        //获取GET返回来的数据

        private NameValueCollection GETInput()

        { return Request.QueryString; }

        // 获取POST返回来的数据

        private string PostInput()
        {

            try
            {

                System.IO.Stream s = Request.InputStream;

                int count = 0;

                byte[] buffer = new byte[1024];

                StringBuilder builder = new StringBuilder();

                while ((count = s.Read(buffer, 0, 1024)) > 0)
                {

                    builder.Append(Encoding.UTF8.GetString(buffer, 0, count));

                }

                s.Flush();

                s.Close();

                s.Dispose();

                return builder.ToString();

            }

            catch (Exception ex)

            { throw ex; }

        }

        private SortedList Param()
        {

            string POSTStr = PostInput();

            SortedList SortList = new SortedList();

            int index = POSTStr.IndexOf("&");

            string[] Arr = { };

            if (index != -1) //参数传递不只一项
            {

                Arr = POSTStr.Split('&');

                for (int i = 0; i < Arr.Length; i++)
                {

                    int equalindex = Arr[i].IndexOf('=');

                    string paramN = Arr[i].Substring(0, equalindex);

                    string paramV = Arr[i].Substring(equalindex + 1);

                    if (!SortList.ContainsKey(paramN)) //避免用户传递相同参数

                    { SortList.Add(paramN, paramV); }

                    else //如果有相同的，一直删除取最后一个值为准

                    { SortList.Remove(paramN); SortList.Add(paramN, paramV); }

                }

            }

            else //参数少于或等于1项
            {

                int equalindex = POSTStr.IndexOf('=');

                if (equalindex != -1)
                { //参数是1项

                    string paramN = POSTStr.Substring(0, equalindex);

                    string paramV = POSTStr.Substring(equalindex + 1);

                    SortList.Add(paramN, paramV);



                }

                else //没有传递参数过来

                { SortList = null; }

            }

            return SortList;

        }

    }
    
    protected void Button1_Click(object sender, EventArgs e)
    {
        Encoding encode = System.Text.Encoding.GetEncoding("utf-8");
        byte[] arrB = encode.GetBytes("aa=aa&bb=好飞");
        HttpWebRequest myReq = (HttpWebRequest)WebRequest.Create("http://localhost:11626/MyTest/Post_Server.aspx");
        myReq.Method = "POST";
        myReq.ContentType = "application/x-www-form-urlencoded";
        myReq.ContentLength = arrB.Length;
        Stream outStream = myReq.GetRequestStream();
        outStream.Write(arrB, 0, arrB.Length);
        outStream.Close();


        //接收HTTP做出的响应
        WebResponse myResp = myReq.GetResponse();
        Stream ReceiveStream = myResp.GetResponseStream();
        StreamReader readStream = new StreamReader(ReceiveStream, encode);
        Char[] read = new Char[256];
        int count = readStream.Read(read, 0, 256);
        string str = null;
        while (count > 0)
        {
            str += new String(read, 0, count);
            count = readStream.Read(read, 0, 256);
        }
        readStream.Close();
        myResp.Close();

        Response.Write(str);
    }
   
}

