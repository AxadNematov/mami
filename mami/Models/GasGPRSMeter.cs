using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("gas_gprs")]
    public class GasGPRSMeter
    {
        [Key]
        public string meter_id { get; set; }
        public string reg_date { get; set; }
    }
}