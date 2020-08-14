using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("rm005t")]
    public class WaterMeterVolumeModel
    {
        [Key]
        public int id { get; set; }
        public string meter_id { get; set; }
        public string frozen_dt { get; set; }
        public double? real_value { get; set; }
        public string battery_level { get; set; }
        public int? magnet { get; set; }
        public int? ltnm { get; set; }
        public int? rsb { get; set; }
        public int? ova { get; set; }
        public int? lf { get; set; }
        public int? rs { get; set; }
        public int? te { get; set; }
        public int? lb { get; set; }
        public int? biltcvt { get; set; }
        public int? overdraft { get; set; }
        public int? ee { get; set; }
        public int? bine { get; set; }
        public int? lbe { get; set; }
        public int? mme { get; set; }
        public int? res1 { get; set; }
        public int? res2 { get; set; }
    }
}