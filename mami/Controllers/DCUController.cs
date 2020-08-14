using System.Web.Mvc;
using mami.Models;
using System.Linq;

namespace mami.Controllers
{
    public class DCUController : Controller
    {
        // GET: DCU

        public JsonResult GetAllDCU()
        {
            var db = new DCUContext();
            var query = from n in db.Cons join tree in db.Tree on n.group_id equals tree.id  select new {n.dcu_id, n.dcu_nm, n.model, n.dcu_gb, n.group_id, n.login_yn, n.install_place, n.card_no, n.firmware_version, n.install_dt, n.connection_dt, n.check_dt, n.production_dt, n.imei_no, n.use_yn, tree.name};
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetOneDCU(string id)
        {
            var db = new DCUContext();
            //var query = db.DCUs.Where(p => p.dcu_id == id);
            var query = from n in db.Cons where n.dcu_id == id join t in db.Tree on n.group_id equals t.id  select new { n.dcu_id, n.dcu_nm, n.model, n.dcu_gb, n.group_id, n.login_yn, n.install_place, n.card_no, n.firmware_version, n.install_dt, n.connection_dt, n.check_dt, n.production_dt, n.imei_no, n.use_yn, t.name};
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetTP(string gr_id)
        {
            var db = new DCUContext();
            var query = from tree in db.Tree
                        where tree.id == gr_id
                        select new { tree.name }; 
        return Json(query, JsonRequestBehavior.AllowGet);
        }
    }
}