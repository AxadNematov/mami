using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("ba001t")]
    public class UserModel
    {
        [Key]
        public string user_id { get; set; }
        public string user_nm { get; set; }
        public string password { get; set; }
        public int authority { get; set; }
        public string opcode { get; set; }
        public string expired_dt { get; set; }
        public int issue_cnt { get; set; }
        public int copy_cnt { get; set; }
        public int user_type { get; set; }
        public string duty_id { get; set; }
        public string group_id { get; set; }
        public string use_yn { get; set; }
        public string login_yn { get; set; }
        public string remote_ip { get; set; }
        public string machine_nm { get; set; }
    }
}