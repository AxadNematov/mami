using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("log")]
    public class LogModel
    {
        public int id { get; set; }
        public string username { get; set; }
        public string meter_id { get; set; }
        public string operation { get; set; }
        public string ip_adress { get; set; }
        public string machine_nm { get; set; }
        public string date { get; set; }
        public string time { get; set; }
    }
}