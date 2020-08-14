using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("waterHistoryData")]
    public class waterHistoryData
    {
        [Key]
        public int id { get; set; }
        public string operator_id { get; set; }
        public string operation_id { get; set; }
        public string meter_id { get; set; }
        public string dcu_id { get; set; }
        public string result { get; set; }
        public string processing { get; set; }
        public string dt { get; set; }
        public string target { get; set; }
        public string task { get; set; }
        public int attempt { get; set; }
        public string flag { get; set; }
        public double? real_value { get; set; }
        public string battery_level { get; set; }
        public int? magnet { get; set; }
        public int? ltnm { get; set; }
        public int? rsb { get; set; }
        public int? ova { get; set; }
        public int? lf { get; set; }
        public int? rs { get; set; }
        public int? te { get; set; }
        public int? lb { get; set; }
        public int? biltcvt { get; set; }
        public int? overdraft { get; set; }
        public int? ee { get; set; }
        public int? bine { get; set; }
        public int? lbe { get; set; }
        public int? mme { get; set; }
        public int? res1 { get; set; }
        public int? res2 { get; set; }
    }
}