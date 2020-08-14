using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class cm003t
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // only if your primary key is auto-generated/identity column
        [Key]
        public int consumer_id { get; set; }
        public int sale_ym { get; set; }
        public int meter_id { get; set; }
        public int sale_dt { get; set; }
        public double sale_amt { get; set; }
        public double prior_at { get; set; }
        public double current_at { get; set; }
        public double usage_at { get; set; }
        public string regular_yn { get; set; }
        public int confirm_yn { get; set; }
        public string user_id { get; set; }

    }
}
