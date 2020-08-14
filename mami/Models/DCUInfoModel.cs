using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("gn001t")]
    public class DCUInfoModel
    {
        [Key]
        public string group_id { get; set; }
        public string group_nm { get; set; }
        public int group_gb { get; set; }
        public string parent_id { get; set; }
        public string parent_nm { get; set; }
        public string use_yn { get; set; }
        public string soato { get; set; }

    }
}