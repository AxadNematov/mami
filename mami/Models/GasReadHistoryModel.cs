using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("gasMetersReadHistory")]
    public class GasReadHistoryModel
    {
        [Key]
        public int id { get; set; }
        public string meter_id { get; set; }
        public string dcu_id { get; set; }
        public string event_date { get; set; }
        public string event_time { get; set; }
        public string event_name { get; set; }
        public string event_code { get; set; }
        public string read_date { get; set; }

    }
}