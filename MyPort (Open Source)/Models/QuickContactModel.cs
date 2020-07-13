using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyPort__Open_Source_.Models
{
    public class QuickContactModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string lang { get; set; }

        public int errorcode { get; set; }
    }
}