using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class cm001t
    {
        public int consumer_id { get; set; }
        public string first_nm { get; set; }
        public string second_nm { get; set; }
        public string last_nm { get; set; }
        public string full_nm { get; set; }
        public string company_nm { get; set; }
        public string master_nm { get; set; }
        public string checker_nm { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string address3 { get; set; }
        public string full_addr { get; set; }
        public string phone_no { get; set; }
        public int consumer_type { get; set; }
        public int account_no { get; set; }
        public int meter_id { get; set; }
        public double initial_kwh { get; set; }
        public double last_kwh { get; set; }
        public double current_kwh { get; set; }
        public int start_dt { get; set; }
        public int end_dt { get; set; }
        public string group_id { get; set; }
        public int registered_dt { get; set; }
        public int using_yn { get; set; }
    }
}
