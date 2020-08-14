using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
[Table("undefined_metering_point")]
    public class UndefinedMeterModel
    {
    [Key]
    public int id { get; set; }
    public string meter_id { get; set; }
    public string description { get; set; }
    public string date { get; set; }
    public string inspector_nm { get; set; }
    public string tree_id { get; set; }

    }
}