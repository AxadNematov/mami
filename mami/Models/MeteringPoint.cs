using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("metering_point")]
    public class MeteringPoint
    {
        [Key]
        public int id { get; set; }
        public string consumer { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public string pers_account { get; set; }
        public string dcu_id { get; set; }
        public string description { get; set; }

    }


}