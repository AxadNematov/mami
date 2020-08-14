using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("meters")]
    public class ConsumersModel 
    {
    [Key]
        public int id { get; set; }
        public string dcu_id { get; set; }
        public string meter_id { get; set; }
        public string consumer { get; set; }
        public string install_place { get; set; }
        public string phone { get; set; }
        public string pers_account { get; set; }
        public decimal energy_value_first { get; set; }
        public decimal energy_value_last { get; set; }
        public string inspector_nm { get; set; }
        public string wkeeper_nm { get; set; }
        public string scan_dt { get; set; }
        public string reg_dt { get; set; }
        public string meter_type { get; set; }
        public string saved { get; set; }
        public string registered { get; set; }
        public string parent_id { get; set; }

    }

    
}