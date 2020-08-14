using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace asp_mvc_proj.Models
{
    [Table("getHistoryData")]
    public class getHistoryDataModel
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
        public string pat { get; set; }
        public string pat1 { get; set; }
        public string pat2 { get; set; }
        public string pat3 { get; set; }
        public string pat4 { get; set; }
        public string nat { get; set; }
        public string nat1 { get; set; }
        public string nat2 { get; set; }
        public string nat3 { get; set; }
        public string nat4 { get; set; }
    }
}