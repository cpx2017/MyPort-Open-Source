using MyPort__Open_Source_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace MyPort__Open_Source_.Controllers
{
    public class homeController : Controller
    {
        // GET: home
        public ActionResult home() // Auto path to site sort from IP to language
        {
            return View();
        }
        public ActionResult en() // Path to site in English Language
        {
            return View();
        }
        public ActionResult th() // Path to site in Thai Language
        {
            return View();
        }

        public int autoReply(string senderMail, string lang)  // Email Auto reply to user Email
        {
            int errorcode;

            MailMessage getMail = new MailMessage();
            NetworkCredential NetworkCre = new NetworkCredential("username", "1234567890");

            SmtpClient setup = new SmtpClient();
            setup.Host = "smtp.gmail.com";
            if (lang == "en")
            {
                getMail.To.Add(senderMail);
                getMail.From = new MailAddress("mail@gmail.com");
                getMail.Subject = "[Autoreply System] Confirm received message";
                getMail.Body = "I'm glad to tell that your message is sent to me already. Thank you for your interesting." + '\n' + '\n' + "_____________________" + '\n' + "Chinnathorn Promnaruritr (chinnathorn.p@outlook.com)";
                getMail.IsBodyHtml = false;

                setup.Port = 587;
                setup.EnableSsl = true;

                setup.UseDefaultCredentials = true;
                setup.Credentials = NetworkCre;
            }
            else
            {
                getMail.To.Add(senderMail);
                getMail.From = new MailAddress("mail@gmail.com");
                getMail.Subject = "[ระบบตอบกลับอัตโนมัติ] ยืนยันการรับข้อความ";
                getMail.Body = "เราขอเรียนแจ้งให้ทราบว่า ข้อความได้ถูกส่งไปยังผู้พัฒนาเว็บไซต์นี้แล้ว ขอบคุณสำหรับข้อความที่ส่งมาครับ" + '\n' + '\n' + "_____________________" + '\n' + "นายชิณธร พร้อมนฤฤทธิ์ (mail.receive@outlook.com)";
                getMail.IsBodyHtml = false;

                setup.Port = 587;
                setup.EnableSsl = true;

                setup.UseDefaultCredentials = true;
                setup.Credentials = NetworkCre;
            }

            try
            {
                setup.Send(getMail);
            }
            catch (Exception exc)
            {
                Response.Write("Send failure: " + exc.ToString());
                errorcode = 1;
            }
            finally
            {
                errorcode = 0;
            }

            return errorcode;
        }

        private QuickContactModel Response_stat(string actionCase) // Response error code to front end with JSON
        {
            QuickContactModel respone;
            respone = new QuickContactModel();
            switch (actionCase)
            {
                case "success":
                    {
                        respone.errorcode = 0;
                        break;
                    }

                case "error":
                    {
                        respone.errorcode = 1;
                        break;
                    }
            }
            return respone;
        }

        [HttpPost]
        public JsonResult sendMessage(QuickContactModel Data)  // Send Email to Site Owner
        {
            QuickContactModel getMessage = new QuickContactModel()
            {
                Name = Data.Name,
                Email = Data.Email,
                Subject = Data.Subject,
                Message = Data.Message,
                lang = Data.lang
            };

            MailMessage getMail = new MailMessage();
            getMail.To.Add("mail.receive@outlook.com");
            getMail.From = new MailAddress("mail@gmail.com");
            getMail.Subject = getMessage.Subject;
            getMail.Body = getMessage.Message + Environment.NewLine + '\n' + "_____________________" + '\n' + getMessage.Name + " (" + getMessage.Email + ")";
            getMail.IsBodyHtml = false;

            SmtpClient setup = new SmtpClient();
            setup.Host = "smtp.gmail.com";
            setup.Port = 587;
            setup.EnableSsl = true;

            NetworkCredential NetworkCre = new NetworkCredential("username", "1234567890");
            setup.UseDefaultCredentials = true;
            setup.Credentials = NetworkCre;

            QuickContactModel responseStat;
            try
            {
                setup.Send(getMail);
            }
            catch (Exception exc)
            {
                Response.Write("Send failure: " + exc.ToString());
                responseStat = Response_stat("error");
            }
            finally
            {
                responseStat = Response_stat("success");
                autoReply(getMessage.Email, getMessage.lang);
            }

            return Json(responseStat, JsonRequestBehavior.AllowGet);
        }




    }
}