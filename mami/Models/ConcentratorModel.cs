using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("dcus")]

    public class ConcentratorModel 
    {
       [Key]

        public string dcu_id { get; set; }
        public string dcu_nm { get; set; }
        public string model { get; set; }
        public string dcu_gb { get; set; }
        public string group_id { get; set; }
        public int login_yn { get; set; }
        public string install_place { get; set; }
        public string card_no { get; set; }
        public string firmware_version { get; set; }
        public string install_dt { get; set; }
        public string connection_dt { get; set; }
        public string check_dt { get; set; }
        public string production_dt { get; set; }
        public string imei_no { get; set; }
        public int use_yn { get; set; }

    }
}