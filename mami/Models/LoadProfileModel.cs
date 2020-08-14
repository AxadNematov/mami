using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("loadProfileInfo")]
    public class LoadProfileModel
    {
        [Key]
        public int id { get; set; }
        public string meter_id { get; set; }
        public string read_date { get; set; }
        public string read_time { get; set; }
        public string voltage1 { get; set; }
        public string voltage2 { get; set; }
        public string voltage3 { get; set; }
        public string current1 { get; set; }
        public string current2 { get; set; }
        public string current3 { get; set; }
        public string frequency { get; set; }
        public string total_ap { get; set; }
        public string total_ap1 { get; set; }
        public string total_ap2 { get; set; }
        public string total_ap3 { get; set; }
        public string total_rp { get; set; }
        public string total_rp1 { get; set; }
        public string total_rp2 { get; set; }
        public string total_rp3 { get; set; }
        public string total_pfactor { get; set; }
        public string total_pfactor1 { get; set; }
        public string total_pfactor2 { get; set; }
        public string total_pfactor3 { get; set; }
        public string total_aplus { get; set; }
        public string total_aminus { get; set; }
        public string total_rplus { get; set; }
        public string total_rminus { get; set; }
    }
}