using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace mami.Models
{
    [Table("tree")]
    public class TreeModel 
    {
    [Key]
      
    public string id { get; set; }
    public string name { get; set; }
    public string parent_id { get; set; }
    public string soato { get; set; }
    public string code { get; set; }
    public int group_gb { get; set; }
    public string type { get; set; }
    }
}