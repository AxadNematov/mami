using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("gn002t")]
    public class DCUModel
    {
        [Key]
        [Column(Order = 1)]
        public int dcu_a1 { get; set; }
        [Key]
        [Column(Order = 2)]
        public int dcu_a2 { get; set; }
        public string dcu_id { get; set; }
        public string dcu_nm { get; set; }
        public string model { get; set; }
        public int dcu_gb { get; set; }
        public string group_id { get; set; }
        public string login_yn { get; set; }
        public string install_place { get; set; }
        public string card_no { get; set; }
        public string firmware_version { get; set; }
        public string install_dt { get; set; }
        public string connection_dt { get; set; }
        public string check_dt { get; set; }
        public string production_dt { get; set; }
        public string imei_no { get; set; }
        public string use_yn { get; set; }

    }


}