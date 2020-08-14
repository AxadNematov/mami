using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("rm001t")]
    public class MeterEnergyUsageModel
    {
        [Key]
        [Column(Order = 1)]
        public string meter_id { get; set; }
        [Key]
        [Column(Order = 2)]
        public string frozen_dt { get; set; }
        public string read_dt { get; set; }
        public decimal? pat { get; set; }
        public decimal? pat1 { get; set; }
        public decimal? pat2 { get; set; }
        public decimal? pat3 { get; set; }
        public decimal? pat4 { get; set; }
        public decimal? nat { get; set; }
        public decimal? nat1 { get; set; }
        public decimal? nat2 { get; set; }
        public decimal? nat3 { get; set; }
        public decimal? nat4 { get; set; }
        public decimal? prt { get; set; }
        public decimal? prt1 { get; set; }
        public decimal? prt2 { get; set; }
        public decimal? prt3 { get; set; }
        public decimal? prt4 { get; set; }
        public decimal? nrt { get; set; }
        public decimal? nrt1 { get; set; }
        public decimal? nrt2 { get; set; }
        public decimal? nrt3 { get; set; }
        public decimal? nrt4 { get; set; }
        public decimal? uat { get; set; }
        public decimal? uat1 { get; set; }
        public decimal? uat2 { get; set; }
        public decimal? uat3 { get; set; }
        public decimal? uat4 { get; set; }

    }
}