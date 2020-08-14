using asp_mvc_proj.Models;
using mami.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mami.Controllers
{
    public class MeterController : Controller
    {
        public bool hasAny;
        public bool hasAny2;
        public bool hasAny3;
        private IQueryable<Object> query;
        private IQueryable<Object> query2;
        private SqlConnection con;

        // GET: Meter
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllMeters(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.DCUInfo
                     join t1 in db.DCUs on t0.group_id equals t1.group_id
                     join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                     join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                     where t3.frozen_dt == date
                     where t2.dcu_id == dcu_id
                     where t2.use_yn == "1"
                     select new
                     {
                         t0.group_nm,
                         t1.dcu_id,
                         t2.meter_id,
                         t2.point_no,
                         t2.meter_nm,
                         t2.install_place,
                         t3.pat,
                         t3.frozen_dt,
                         status = t2.use_yn == "0" ? "3" : t2.uploaded_yn == "0" ? "2" : t2.relay_on == "0" ? "1" : "0"
                     });

            //hasAny = query.AsQueryable().Any();
            hasAny = query.AsQueryable().Any();
            if (hasAny == true)
            {
                return Json(query, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMetersCount(string dcu_id, string date)
        {
            //IQueryable query;
            var db = new DCUContext();
            int query = (from t0 in db.DCUInfo
                         join t1 in db.DCUs on t0.group_id equals t1.group_id
                         join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                         join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         select new
                         {
                             t0.group_nm,
                             t1.dcu_id,
                             t2.meter_id,
                             t3.pat,
                             t3.frozen_dt
                         }).Count();
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllMetersReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = from gn1 in db.DCUInfo
                    join dcu in db.DCUs on gn1.group_id equals dcu.group_id
                    join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                    where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.use_yn == "1"
                    select new { gn1.group_nm, dcu.dcu_id, meters.meter_id, meters.point_no, meters.meter_nm, meters.install_place, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0"};

            hasAny2 = query.AsQueryable().Any();
            if (hasAny2 == true)
            {
                return Json(query, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMeterEnergyUsageRange(string sDate, string eDate, string meter_id)
        {
            var db = new DCUContext();
            var query = from d in db.MeterEnergyUsage where d.meter_id == meter_id && (d.frozen_dt.CompareTo(sDate) >= 0 && d.frozen_dt.CompareTo(eDate) < 0) select new { d.meter_id, d.frozen_dt, d.pat };
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMeterInfo(string id)
        {
            var db = new DCUContext();
            var query = from n in db.Meters where n.meter_id == id select new { n.meter_id, n.dcu_a1, n.dcu_a2, n.dcu_id, n.meter_nm, n.model, n.old_model, n.phasetype, n.ct_rate, n.pt_rate, n.serial_no, n.point_no, n.baudrate, n.com_port, n.protocol, n.password, n.tariff, n.data_int, n.data_point, n.big_group, n.small_group, n.comm_type, n.usage_type, n.password_0, n.password_2, n.uploaded_yn, n.group_id, n.relay_on, n.imei_no, n.install_place, n.install_dt, n.connection_dt, n.shutdown_dt, n.removal_dt, n.check_dt, n.production_dt, n.inspection_dt, n.res_nm, n.certification_no, n.tp_no, n.feeder_no, n.manu_sealno, n.uzgo_sealno, n.res_sealno, n.model_type, n.consumer_id, n.registered_dt, n.use_yn, n.collector};
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUsageDivision(string sDate, string eDate, string meter_id)
        {
            var db = new DCUContext();
            var query1 = from n in db.MeterEnergyUsage where n.frozen_dt == eDate where n.meter_id == meter_id select n.pat;
            var query2 = from e in db.MeterEnergyUsage where e.frozen_dt == sDate where e.meter_id == meter_id select e.pat;
            var query = query1.FirstOrDefault() - query2.FirstOrDefault();
            var query_result = sDate + " " + query;
            return Json(query_result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CountReadMeters(string dcu_id, string sDate, string eDate)
        {
            var db = new DCUContext();
            int query = (from meters in db.Meters join meter_usage in db.MeterEnergyUsage on meters.meter_id equals meter_usage.meter_id where (meter_usage.frozen_dt.CompareTo(sDate) >= 0 && meter_usage.frozen_dt.CompareTo(eDate) <= 0) && meters.dcu_id == dcu_id select meters.meter_id).Count();
            //int query = (from meters in db.Meters where (from meter_usage in db.MeterEnergyUsage where (meter_usage.frozen_dt.CompareTo(sDate) >= 0 && meter_usage.frozen_dt.CompareTo(eDate) <= 0) select meter_usage.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id select meters.meter_id).Count();
            int query_2 = (from meters in db.Meters where meters.dcu_id == dcu_id && meters.use_yn == "1" select meters.meter_id).Count();
            int days = (int.Parse(eDate) - int.Parse(sDate)) + 1;
            int query_3 = query_2 * days;
            var result = query + "|" + query_3;
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllMetersConsDiff(string dcu_id, string date, string date2)
        {
            var db = new DCUContext();
            var query_45 = from t0 in db.DCUInfo
                           join t1 in db.DCUs on t0.group_id equals t1.group_id
                           join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                           join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                           join t4 in db.MeterEnergyUsage on t2.meter_id equals t4.meter_id
                           where t2.dcu_id == dcu_id && t3.frozen_dt == date && t4.frozen_dt == date2
                           select new
                           {
                               t0.group_nm,
                               t0.group_gb,
                               t2.meter_id,
                               t2.meter_nm,
                               t2.install_place,
                               t2.use_yn,
                               dif = t4.pat - t3.pat,
                               dif1 = t3.pat,
                               dif2 = t4.pat,
                               status = t2.use_yn == "0" ? "3" : t2.uploaded_yn == "0" ? "2" : t2.relay_on == "0" ? "1" : "0"
                           };
            //return Json(query_45, JsonRequestBehavior.AllowGet);
            hasAny3 = query_45.AsQueryable().Any();
            if (hasAny3 == true)
            {
                return Json(query_45, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }

        public JsonResult GlobalSearchMeters(string search, string group_id, int group_gb, string date) //201620000612 Хайтбоев 10-11-3
        {
            var db = new DCUContext();
            if (group_gb == 0)
            {
                query = from meters in db.Meters
                        join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.DCUInfo where (from t7 in db.DCUInfo where (from t8 in db.DCUInfo where t8.parent_id == group_id select t8.group_id).Contains(t7.parent_id) select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(dcu_info.group_id)
                        where energy_usage.frozen_dt == date
                        select new { dcu_info.group_nm, dcus.dcu_id, meters.use_yn, meters.point_no, meters.meter_id, meters.install_place, meters.meter_nm, energy = energy_usage.pat == 0 ? 0 : energy_usage.pat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            else if (group_gb == 1)
            {
                query = from meters in db.Meters
                        join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.DCUInfo where (from t7 in db.DCUInfo where t7.parent_id == group_id select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(dcu_info.group_id)
                        where energy_usage.frozen_dt == date
                        select new { dcu_info.group_nm, dcus.dcu_id, meters.use_yn, meters.point_no, meters.meter_id, meters.install_place, meters.meter_nm, energy = energy_usage.pat == 0 ? 0 : energy_usage.pat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            else if (group_gb == 2)
            {
                query = from meters in db.Meters
                        join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.DCUInfo where t6.parent_id == group_id select t6.group_id).Contains(dcu_info.group_id)
                        where energy_usage.frozen_dt == date
                        select new { dcu_info.group_nm, dcus.dcu_id, meters.use_yn, meters.point_no, meters.meter_id, meters.install_place, meters.meter_nm, energy = energy_usage.pat == 0 ? 0 : energy_usage.pat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            else if (group_gb == 3)
            {
                query = from meters in db.Meters
                        join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where dcu_info.group_id == group_id
                        where energy_usage.frozen_dt == date
                        select new { dcu_info.group_nm, dcus.dcu_id, meters.use_yn, meters.point_no, meters.meter_id, meters.install_place, meters.meter_nm, energy = energy_usage.pat == 0 ? 0 : energy_usage.pat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        //

        public JsonResult GlobalMeterSearchConsumer(string search, string group_id, int group_gb, string date, string date2) //201620000612 Хайтбоев 10-11-3
        {
            var db = new DCUContext();
            if (group_gb == 0)
            {
                query = from meters in db.Meters
                        join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.DCUInfo where (from t7 in db.DCUInfo where (from t8 in db.DCUInfo where t8.parent_id == group_id select t8.group_id).Contains(t7.parent_id) select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(dcu_info.group_id) && energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        where energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        select new { meters.meter_id, meters.install_place, meters.meter_nm, meters.use_yn, dcu_info.group_nm, dif2 = energy_usage2.pat, dif = energy_usage2.pat - energy_usage.pat, dif1 = energy_usage.pat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            else if (group_gb == 1)
            {
                query = from meters in db.Meters
                        join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.DCUInfo where (from t7 in db.DCUInfo where t7.parent_id == group_id select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(dcu_info.group_id) && energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        where energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        select new { meters.meter_id, meters.install_place, meters.meter_nm, meters.use_yn, dcu_info.group_nm, dif2 = energy_usage2.pat, dif = energy_usage2.pat - energy_usage.pat, dif1 = energy_usage.pat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            else if (group_gb == 2)
            {
                query = from meters in db.Meters
                        join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.DCUInfo where t6.parent_id == group_id select t6.group_id).Contains(dcu_info.group_id) && energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        where energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        select new { meters.meter_id, meters.install_place, meters.meter_nm, meters.use_yn, dcu_info.group_nm, dif2 = energy_usage2.pat, dif = energy_usage2.pat - energy_usage.pat, dif1 = energy_usage.pat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            else if (group_gb == 3)
            {
                query = from meters in db.Meters
                        join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where dcu_info.group_id == group_id && energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        select new { meters.meter_id, meters.install_place, meters.meter_nm, meters.use_yn, dcu_info.group_nm, dif2 = energy_usage2.pat, dif = energy_usage2.pat - energy_usage.pat, dif1 = energy_usage.pat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        public void writeLog(string user, string operation, string date, string time)
        {
            connection();
            SqlCommand com = new SqlCommand("INSERT INTO dbo.log (username, operation, ip_adress, machine_nm, date, time) VALUES(@username, @operation, @ip_address, @machine_nm, @date, @time)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@username", user);
            com.Parameters.AddWithValue("@operation", operation);
            com.Parameters.AddWithValue("@ip_address", "");
            com.Parameters.AddWithValue("@machine_nm", "");
            com.Parameters.AddWithValue("@date", date);
            com.Parameters.AddWithValue("@time", time);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }

        private void connection()
        {
            throw new NotImplementedException();
        }

        public JsonResult ReceiveTaskData(getHistoryDataModel[] data, string login, string operation)
        {
            var db = new DCUContext();
            if (data.Count() == 0)
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
            else
            {
                getHistoryDataModel[] dbEntities = data.Select(m => new getHistoryDataModel
                {
                    operator_id = m.operator_id, //
                    operation_id = m.operation_id, //
                    meter_id = m.meter_id, //
                    dcu_id = m.dcu_id, //
                    result = "",
                    processing = "0",
                    dt = m.dt, //               
                    target = m.target, //
                    task = m.task, //
                    attempt = 0,
                    flag = "",
                    pat = "",
                    pat1 = "",
                    pat2 = "",
                    pat3 = "",
                    pat4 = "",
                    nat = "",
                    nat1 = "",
                    nat2 = "",
                    nat3 = "",
                    nat4 = ""
                }).ToArray();
                db.HistoryData.AddRange(dbEntities);
                db.SaveChanges();
                writeLog(login, operation, DateTime.Now.ToString("M/d/yyyy"), DateTime.Now.ToString("hh:mm"));
                return Json("Ok", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult OperationsCheck(string operator_id, string operation_id)
        {
            var db = new DCUContext();
            int count = (from historyData in db.HistoryData where historyData.operator_id == operator_id && historyData.operation_id == operation_id select new { historyData.meter_id }).Count();
            int count_2 = (from historyData in db.HistoryData where historyData.operator_id == operator_id && historyData.operation_id == operation_id && historyData.result == "done" select new { historyData.meter_id }).Count();
            if (count == count_2)
            {
                return Json(operation_id, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("no", JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult ReturnTaskResult(string operator_id, string operation_id)
        {
            var db = new DCUContext();
            query = from historyData in db.HistoryData
                    join meters in db.Meters on historyData.meter_id equals meters.meter_id
                    join dcu in db.DCUs on meters.dcu_id equals dcu.dcu_id
                    join dcu_info in db.DCUInfo on dcu.group_id equals dcu_info.group_id
                    where historyData.operator_id == operator_id && historyData.operation_id == operation_id && historyData.result == "done"
                    select new { 
                        historyData.dt,
                        dcu_info.group_nm,
                        meters.point_no,
                        meters.meter_nm,
                        meters.install_place,
                        meters.install_dt,
                        status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0",
                        historyData.operator_id,
                        historyData.operation_id,
                        historyData.meter_id,
                        historyData.dcu_id,
                        historyData.target,
                        historyData.pat,
                        historyData.pat1,
                        historyData.pat2,
                        historyData.pat3,
                        historyData.pat4,
                        historyData.nat,
                        historyData.nat1,
                        historyData.nat2,
                        historyData.nat3,
                        historyData.nat4 };
            return Json(query, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SumMUsagebyDCU(string dcu_id, string sDate, string eDate)
        {
            var db = new DCUContext();
            var query_sum = from meters in db.Meters
                            join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                            where meters.dcu_id == dcu_id && meters.use_yn == "1" && (energy_usage.frozen_dt.CompareTo(sDate) >= 0 && energy_usage.frozen_dt.CompareTo(eDate) <= 0)
                            select new { meters.dcu_id, energy_usage.pat };
            var sum = query_sum.Select(p => p.pat).Sum();
            //string sum = query.AsEnumerable().Sum(p => p.pat).ToString();
            return Json(sum, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PatbyDate(string sDate, string meter_id)
        {
            var db = new DCUContext();
            var query_sum = from energy_usage in db.MeterEnergyUsage
                            where energy_usage.meter_id == meter_id && energy_usage.frozen_dt == sDate
                            select new { energy_usage.meter_id, energy_usage.pat };
            return Json(query_sum, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMAllOnOffNR(string dcu_id, string date)
        {
            var db = new DCUContext();
            //NR
            int query_nr = (from gn1 in db.DCUInfo
                            join dcu in db.DCUs on gn1.group_id equals dcu.group_id
                            join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                            where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.use_yn == "1"
                            select new { meters.meter_id }).Count();
            //On
            int query_on = (from gn1 in db.DCUInfo
                            join dcu in db.DCUs on gn1.group_id equals dcu.group_id
                            join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                            where meters.relay_on == "1" && meters.dcu_id == dcu_id && meters.use_yn == "1"
                            select new { meters.meter_id }).Count();
            //Off
            int query_off = (from gn1 in db.DCUInfo
                             join dcu in db.DCUs on gn1.group_id equals dcu.group_id
                             join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                             where meters.relay_on == "0" && meters.dcu_id == dcu_id && meters.use_yn == "1"
                             select new { meters.meter_id }).Count();
            //All
            int query_all = (from gn1 in db.DCUInfo
                             join dcu in db.DCUs on gn1.group_id equals dcu.group_id
                             join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                             where meters.use_yn == "1" && meters.dcu_id == dcu_id
                             select new { meters.meter_id }).Count();

            string all = query_nr + "|" + query_on + "|" + query_off + "|" + query_all;

            if (all != "")
            {
                return Json(all, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllOnMeters(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.DCUInfo
                         join t1 in db.DCUs on t0.group_id equals t1.group_id
                         join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                         join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         where t2.use_yn == "1"
                         where t2.relay_on == "1"
                         select new
                         {
                             t0.group_nm,
                             t1.dcu_id,
                             t2.meter_id,
                             t2.point_no,
                             t2.meter_nm,
                             t2.install_place,
                             t3.pat,
                             t3.frozen_dt,
                             status = t2.use_yn == "0" ? "3" : t2.uploaded_yn == "0" ? "2" : t2.relay_on == "0" ? "1" : "0"
                         });

            //hasAny = query.AsQueryable().Any();
            hasAny = query.AsQueryable().Any();
            if (hasAny == true)
            {
                return Json(query, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllOnMetersReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = from gn1 in db.DCUInfo
                        join dcu in db.DCUs on gn1.group_id equals dcu.group_id
                        join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                        where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.use_yn == "1" && meters.relay_on == "1"
                        select new {
                            gn1.group_nm,
                            dcu.dcu_id,
                            meters.meter_id,
                            meters.point_no,
                            meters.meter_nm,
                            meters.install_place,
                            status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };

            hasAny2 = query.AsQueryable().Any();
            if (hasAny2 == true)
            {
                return Json(query, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllOffMeters(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.DCUInfo
                         join t1 in db.DCUs on t0.group_id equals t1.group_id
                         join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                         join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         where t2.use_yn == "1"
                         where t2.relay_on == "0"
                         select new
                         {
                             t0.group_nm,
                             t1.dcu_id,
                             t2.meter_id,
                             t2.point_no,
                             t2.meter_nm,
                             t2.install_place,
                             t3.pat,
                             t3.frozen_dt,
                             status = t2.use_yn == "0" ? "3" : t2.uploaded_yn == "0" ? "2" : t2.relay_on == "0" ? "1" : "0"
                         });

            //hasAny = query.AsQueryable().Any();
            hasAny = query.AsQueryable().Any();
            if (hasAny == true)
            {
                return Json(query, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllOffMetersReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = from gn1 in db.DCUInfo
                        join dcu in db.DCUs on gn1.group_id equals dcu.group_id
                        join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                        where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.use_yn == "1" && meters.relay_on == "0"
                        select new
                        {
                            gn1.group_nm,
                            dcu.dcu_id,
                            meters.meter_id,
                            meters.point_no,
                            meters.meter_nm,
                            meters.install_place,
                            status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0"
                        };

            hasAny2 = query.AsQueryable().Any();
            if (hasAny2 == true)
            {
                return Json(query, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult SumMBUsagebyDCU(string group_id, int group_gb, string sDate)
        {
            var db = new DCUContext();
            var result = new Object();
            if (group_gb == 0)
            {
                result = (from meters in db.Meters
                          join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                          join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                          join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                          where (from t6 in db.DCUInfo where (from t7 in db.DCUInfo where (from t8 in db.DCUInfo where t8.parent_id == group_id select t8.group_id).Contains(t7.parent_id) select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(dcu_info.group_id)//
                          && meters.use_yn == "1" && energy_usage.frozen_dt == sDate//(energy_usage.frozen_dt.CompareTo(sDate) >= 0 && energy_usage.frozen_dt.CompareTo(eDate) <= 0)--------where (from dcus in db.DCUs select dcus.dcu_id).Contains(meters.dcu_id)
                          select new { meters.dcu_id, balance = meters.usage_type == 1 ? energy_usage.pat * meters.ct_rate : energy_usage.pat * meters.ct_rate, diff = meters.usage_type == 0 ? energy_usage.pat : energy_usage.pat }).GroupBy(row => row.dcu_id).Select(grouping => new
                          {
                              dcu = grouping.Key,
                              summa = grouping.Sum(item => item.diff),
                              balance = grouping.Max(bal => bal.balance)
                          }).ToArray();
            }
            else if (group_gb == 1)
            {
                result = (from meters in db.Meters
                          join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                          join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                          join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                          where (from t6 in db.DCUInfo where (from t7 in db.DCUInfo where t7.parent_id == group_id select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(dcu_info.group_id)//
                          && meters.use_yn == "1" && energy_usage.frozen_dt == sDate //(energy_usage.frozen_dt.CompareTo(sDate) >= 0 && energy_usage.frozen_dt.CompareTo(eDate) <= 0)--------where (from dcus in db.DCUs select dcus.dcu_id).Contains(meters.dcu_id)
                          select new { meters.dcu_id, balance = meters.usage_type == 1 ? energy_usage.pat * meters.ct_rate : energy_usage.pat * meters.ct_rate, diff = meters.usage_type == 0 ? energy_usage.pat : energy_usage.pat }).GroupBy(row => row.dcu_id).Select(grouping => new
                          {
                              dcu = grouping.Key,
                              summa = grouping.Sum(item => item.diff),
                              balance = grouping.Max(bal => bal.balance)
                          }).ToArray();
            }
            else if (group_gb == 2)
            {
                result = (from meters in db.Meters
                          join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                          join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                          join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                          where (from t6 in db.DCUInfo where t6.parent_id == group_id select t6.group_id).Contains(dcu_info.group_id)
                          && meters.use_yn == "1" && energy_usage.frozen_dt == sDate //(energy_usage.frozen_dt.CompareTo(sDate) >= 0 && energy_usage.frozen_dt.CompareTo(eDate) <= 0)--------where (from dcus in db.DCUs select dcus.dcu_id).Contains(meters.dcu_id)
                          select new { meters.dcu_id, balance = meters.usage_type == 1 ? energy_usage.pat * meters.ct_rate : energy_usage.pat * meters.ct_rate, diff = meters.usage_type == 0 ? energy_usage.pat : energy_usage.pat }).GroupBy(row => row.dcu_id).Select(grouping => new
                          {
                              dcu = grouping.Key,
                              summa = grouping.Sum(item => item.diff),
                              balance = grouping.Max(bal => bal.balance)
                          }).ToArray();
            }
            else if (group_gb == 3)
            {
                result = (from meters in db.Meters
                          join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                          join dcus in db.DCUs on meters.dcu_id equals dcus.dcu_id
                          join dcu_info in db.DCUInfo on dcus.group_id equals dcu_info.group_id
                          where dcu_info.group_id == group_id
                          && meters.use_yn == "1" && energy_usage.frozen_dt == sDate //(energy_usage.frozen_dt.CompareTo(sDate) >= 0 && energy_usage.frozen_dt.CompareTo(eDate) <= 0)--------where (from dcus in db.DCUs select dcus.dcu_id).Contains(meters.dcu_id)
                          select new { meters.dcu_id, balance = meters.usage_type == 1 ? energy_usage.pat * meters.ct_rate : energy_usage.pat * meters.ct_rate, diff = meters.usage_type == 0 ? energy_usage.pat : energy_usage.pat }).GroupBy(row => row.dcu_id).Select(grouping => new
                          {
                              dcu = grouping.Key,
                              summa = grouping.Sum(item => item.diff),
                              balance = grouping.Max(bal => bal.balance)
                          }).ToArray();
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BalanceChartHT(int cifra, string dcu_id, string sDate, string eDate)
        {
            var db = new DCUContext();
            var result = (from meters in db.Meters
                          join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                          join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                          where meters.dcu_id == dcu_id && meters.use_yn == "1" && meters.usage_type == 0 && energy_usage.frozen_dt == sDate && energy_usage2.frozen_dt == eDate
                          select new { data = energy_usage.frozen_dt, diff = energy_usage2.pat - energy_usage.pat }).GroupBy(row => row.data).Select(grouping => new
                          {
                              digit = cifra,
                              dcu = dcu_id,
                              summa = grouping.Sum(i => i.diff)
                          });
            var result2 = (from meters in db.Meters
                           join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                           join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                           where meters.dcu_id == dcu_id && meters.use_yn == "1" && meters.usage_type == 1 && energy_usage.frozen_dt == sDate && energy_usage2.frozen_dt == eDate
                           select new { data = energy_usage.frozen_dt, diff = (energy_usage2.pat - energy_usage.pat) * meters.ct_rate }).GroupBy(row => row.data).Select(grouping => new
                           {
                               digit = cifra,
                               dcu = dcu_id,
                               balance = grouping.Sum(i => i.diff)
                           });
            var result3 = from pl in result join t in result2 on pl.dcu equals t.dcu select new { digit = pl.digit, dcu = pl.dcu, balance = t.balance, summa = pl.summa }; ;
            return Json(result3, JsonRequestBehavior.AllowGet);
        }



    }
}