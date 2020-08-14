using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("users")]
    public class UserModel
    {
        [Key]
        public int id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public string user_nm { get; set; }
        public string position { get; set; }
        public string group_id { get; set; }
        public int group_gb { get; set; }
        public string relay { get; set; }
        public string read_h { get; set; }
        public string read_c { get; set; }
        public string parent_id { get; set; }
    }
}