using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("gn003t")]
    public class MeterModel
    {
        [Key]
        public string meter_id { get; set; }
        public int dcu_a1 { get; set; }
        public int dcu_a2 { get; set; }
        public string dcu_id { get; set; }
        public string meter_nm { get; set; }
        public string model { get; set; }
        public string old_model { get; set; }
        public int phasetype { get; set; }
        public decimal ct_rate { get; set; }
        public decimal pt_rate { get; set; }
        public int serial_no { get; set; }
        public int point_no { get; set; }
        public int baudrate { get; set; }
        public int com_port { get; set; }
        public int protocol { get; set; }
        public string password { get; set; }
        public int tariff { get; set; }
        public int data_int { get; set; }
        public int data_point { get; set; }
        public int big_group { get; set; }
        public int small_group { get; set; }
        public int comm_type { get; set; }
        public int usage_type { get; set; }
        public string password_0 { get; set; }
        public string password_2 { get; set; }
        public string uploaded_yn { get; set; }
        public string group_id { get; set; }
        public string relay_on { get; set; }
        public string imei_no { get; set; }
        public string install_place { get; set; }
        public string install_dt { get; set; }
        public string connection_dt { get; set; }
        public string shutdown_dt { get; set; }
        public string removal_dt { get; set; }
        public string check_dt { get; set; }
        public string production_dt { get; set; }
        public string inspection_dt { get; set; }
        public string res_nm { get; set; }
        public string certification_no { get; set; }
        public string tp_no { get; set; }
        public string feeder_no { get; set; }
        public string manu_sealno { get; set; }
        public string uzgo_sealno { get; set; }
        public string res_sealno { get; set; }
        public string model_type { get; set; }
        public string consumer_id { get; set; }
        public DateTime registered_dt { get; set; }
        public string use_yn { get; set; }
        public int collector { get; set; }
    }
}