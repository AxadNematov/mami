using asp_mvc_proj.Models;
using ClosedXML.Excel;
using mami.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace mami.Controllers
{
    public class ChartDataRes
    {
        public double balance { get; set; }

        public string dcu { get; set; }

        public int digit { get; set; }

        public double summa { get; set; }
    }

    public class MeterController : Controller
    {
        public bool hasAny;
        public bool hasAny2;
        public bool hasAny3;
        private IQueryable<Object> query;
        private IQueryable<Object> query2;
        SqlConnection con;
        Otchet[] res_arr1;

        public void connection()
        {
            string constr = ConfigurationManager.ConnectionStrings["DCUContext"].ToString();
            con = new SqlConnection(constr);
        }
        public int MyConverter(string str)
        {
            int value = Convert.ToInt32(str);
            return value;
        }
        public double CalcS(double aModul, double rModul)
        {
            double S = Math.Sqrt(Math.Pow(aModul, 2) + Math.Pow(rModul, 2));
            return S;
        }

        public JsonResult readLoadProfile(string date, string meter)
        {
            var db = new DCUContext();
            var result = (from info in db.LoadProfile
                          where info.read_date == date && info.meter_id == meter
                          select new {
                              info.meter_id,
                              info.read_date,
                              info.read_time,
                              info.voltage1,
                              info.voltage2,
                              info.voltage3,
                              info.current1,
                              info.current2,
                              info.current3,
                              info.frequency,
                              info.total_ap,
                              info.total_ap1,
                              info.total_ap2,
                              info.total_ap3,
                              info.total_rp,
                              info.total_rp1,
                              info.total_rp2,
                              info.total_rp3,
                              info.total_pfactor,
                              info.total_pfactor1,
                              info.total_pfactor2,
                              info.total_pfactor3,
                              info.total_aplus,
                              info.total_aminus,
                              info.total_rplus,
                              info.total_rminus
                          }).ToArray();
                 return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getUsagebyTwoDates(string sDate, string eDate, string meter)
        {
            var db = new DCUContext();
            var result = (from date in db.MeterEnergyUsage
                          where date.meter_id == meter && (date.frozen_dt.CompareTo(sDate) >= 0 && date.frozen_dt.CompareTo(eDate) <= 0)
                          select new { date = date.frozen_dt, aPlus = date.pat == null ? 0 : date.pat, aMinus = date.nat == null ? 0 : (Decimal?)date.nat, aModul = date.pat == null ? 0 : (Decimal?)date.pat + date.nat == null ? 0 : (Decimal?)date.nat, rModul = date.prt == null ? 0 : (Decimal?)date.prt + date.nrt == null ? 0 : (Decimal?)date.nrt, rPlus = date.prt == null ? 0 : (Decimal?)date.prt, rMinus = date.nrt == null ? 0 : (Decimal?)date.nrt }).ToArray();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }
        public JsonResult DeleteConsumer(string name, string pers_acc)
        {
            connection();
            SqlCommand com = new SqlCommand("DELETE FROM dbo.metering_point WHERE pers_account = @account", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@name", name);
            com.Parameters.AddWithValue("@account", pers_acc);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("gfdgdfgdfg", JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateConsumers(string pers_acc, string insp_nm)
        {
            connection();
            SqlCommand com = new SqlCommand("UPDATE dbo.meters SET inspector_nm = @name WHERE pers_account = @account", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@name", insp_nm);
            com.Parameters.AddWithValue("@account", pers_acc);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("gfdgdfgdfg", JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteUndefinedMeter(string meter_id)
        {
            connection();
            SqlCommand com = new SqlCommand("DELETE FROM dbo.undefined_metering_point WHERE meter_id = @meter_id", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@meter_id", meter_id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("gfdgdfgdfg", JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddConsumer(string dcu_id, string name, string reg_place, string phone_n, string pers_acc, string reg_dt, string meter_type, string saved, string registered, string processing, string parent_id, string meter_id)
        {
            connection();

            SqlCommand com = new SqlCommand("INSERT INTO dbo.meters (dcu_id, meter_id, consumer, install_place, phone, pers_account, reg_dt, meter_type, saved, registered, processing, parent_id) VALUES(@dcu_id, @meter_id, @consumer, @place, @phone, @account, @reg_dt, @meter_type, @saved, @registered, @processing, @parent_id)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@dcu_id", dcu_id);
            com.Parameters.AddWithValue("@consumer", name);
            com.Parameters.AddWithValue("@place", reg_place);
            com.Parameters.AddWithValue("@phone", phone_n);
            com.Parameters.AddWithValue("@account", pers_acc);
            com.Parameters.AddWithValue("@meter_type", meter_type);
            com.Parameters.AddWithValue("@saved", saved);
            com.Parameters.AddWithValue("@registered", registered);
            com.Parameters.AddWithValue("@parent_id", parent_id);
            com.Parameters.AddWithValue("@meter_id", meter_id);
            com.Parameters.AddWithValue("@processing", processing);
            com.Parameters.AddWithValue("@reg_dt", reg_dt);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("Запись прошла успешно", JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddMeterPoint(string dcu_id, string name, string reg_place, string phone_n, string pers_acc)
        {
            connection();

            SqlCommand com = new SqlCommand("INSERT INTO dbo.metering_point ( consumer, address, phone, pers_account, dcu_id) VALUES(@consumer, @address, @phone, @account, @dcu_id)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@consumer", name);
            com.Parameters.AddWithValue("@address", reg_place);
            com.Parameters.AddWithValue("@dcu_id", dcu_id);
            com.Parameters.AddWithValue("@phone", phone_n);
            com.Parameters.AddWithValue("@account", pers_acc);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("Запись прошла успешно", JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetConsumers(string parent_id)
        {
            var db = new DCUContext();
            var query1 = from cons in db.Consumer                    
                        where cons.parent_id == parent_id
                        select new {cons.meter_id, cons.consumer, cons.install_place, cons.phone, cons.pers_account, cons.inspector_nm, cons.meter_type, cons.reg_dt, cons.registered };

            return Json(query1, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMeterPoint(string gr_nm)
        {
            var db = new DCUContext();
            var query1 = from cons in db.Meterpoint
                         join dcu in db.Cons on cons.dcu_id equals dcu.dcu_id
                         join d in db.Tree on dcu.group_id equals d.id
                         where d.name == gr_nm
                         select new {cons.id, cons.consumer, cons.address, cons.phone, cons.pers_account, cons.dcu_id, cons.description};

            return Json(query1, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInspector()
        {
            var db = new DCUContext();
            var query1 = from user in db.Users
                         where user.position == "inspector"
                         select new { user.user_nm };
            return Json(query1, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAccount()
        {
            var db = new DCUContext();
            var query = from met in db.Meterpoint
                        where met.pers_account != null
                        select new { met.pers_account };
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUndefinedMeters(string id)
        {
            var db = new DCUContext();
            var query = from met in db.UndefinedMeter
                        where met.tree_id == id
                        select new { met.meter_id, met.description, met.date, met.inspector_nm };
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllMeters(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.Tree
                     join t1 in db.Cons on t0.id equals t1.group_id
                     join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                     join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                     where t3.frozen_dt == date
                     where t2.dcu_id == dcu_id
                     where t2.use_yn == "1"
                     select new
                     {  
                         group_nm=t0.name,
                         t1.dcu_id,
                         t2.meter_id,
                         t2.point_no,
                         t2.meter_nm,
                         t2.install_place,
                         pat = t3.pat ?? 0,
						 pat1 = t3.pat1 ?? 0,
						 pat2 = t3.pat2 ?? 0,
						 pat3 = t3.pat3 ?? 0,
						 pat4 = t3.pat4 ?? 0,
						 nat = t3.nat ?? 0,
						 nat1 = t3.nat ?? 0,
						 nat2 = t3.nat2 ?? 0,
						 nat3 = t3.nat3 ?? 0,
						 nat4 = t3.nat4 ?? 0,
                         t3.frozen_dt,
						 apm = (t3.pat ?? 0) + (t3.nat ?? 0),
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
        public JsonResult GetAllMeterOtchet(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.Tree
                         join t1 in db.Cons on t0.id equals t1.group_id
                         join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                         join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         where t2.use_yn == "1"
                         select new
                         {
                             group_nm = t0.name,
                             t1.dcu_id,
                             t2.meter_id,
                             t2.point_no,
                             t2.meter_nm,
                             t2.install_place,
                             pat = t3.pat ?? 0,
                             pat1 = t3.pat1 ?? 0,
                             pat2 = t3.pat2 ?? 0,
                             pat3 = t3.pat3 ?? 0,
                             pat4 = t3.pat4 ?? 0,
                             nat = t3.nat ?? 0,
                             nat1 = t3.nat ?? 0,
                             nat2 = t3.nat2 ?? 0,
                             nat3 = t3.nat3 ?? 0,
                             nat4 = t3.nat4 ?? 0,
                             t3.frozen_dt,
                             apm = (t3.pat ?? 0) + (t3.nat ?? 0),
                             status = t2.use_yn == "0" ? "3" : t2.uploaded_yn == "0" ? "2" : t2.relay_on == "0" ? "1" : "0"
                         }).ToArray();

            

            return Json(query, JsonRequestBehavior.AllowGet);
   
        }
        public JsonResult GetListMeterOtchet(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query2 = (from gn1 in db.Tree
                          join dcu in db.Cons on gn1.id equals dcu.group_id
                          join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                          where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.use_yn == "1"
                          select new
                          {
                              group_nm=gn1.name,
                              dcu.dcu_id,
                              meters.meter_id,
                              meters.point_no,
                              meters.meter_nm,
                              meters.install_place,
                              status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0",
                              apm = "----",
                              pat = "---",
                              pat1 = "---",
                              pat2 = "---",
                              pat3 = "---",
                              pat4 = "---",
                              nat = "---",
                              nat1 = "---",
                              nat2 = "---",
                              nat3 = "---",
                              nat4 = "---",
                              frothen_dt = date
                          }).ToArray();

            return Json(query2, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMetersCount(string dcu_id, string date)
        {
            //IQueryable query;
            var db = new DCUContext();
            int query = (from t0 in db.Tree
                         join t1 in db.Cons on t0.id equals t1.group_id
                         join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                         join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         select new
                         {
                             group_nm=t0.name,
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
            var query = from gn1 in db.Tree
                    join dcu in db.Cons on gn1.id equals dcu.group_id
                    join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                    where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.use_yn == "1"
                    select new { group_nm=gn1.name, dcu.dcu_id, meters.meter_id, meters.point_no, meters.meter_nm, meters.install_place, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0", apm="----", pat="---", pat1="---",pat2="---",pat3="---",pat4="---", nat="---", nat1="---", nat2="---", nat3="---", nat4="---"};

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
            var query_45 = from t0 in db.Tree
                           join t1 in db.Cons on t0.id equals t1.group_id
                           join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                           join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                           join t4 in db.MeterEnergyUsage on t2.meter_id equals t4.meter_id
                           where t2.dcu_id == dcu_id && t3.frozen_dt == date && t4.frozen_dt == date2
                           select new
                           {
                               group_nm=t0.name,
                               t0.group_gb,
                               t2.meter_id,
                               t2.meter_nm,
                               t2.install_place,
                               t2.use_yn,
                               dif = ((t4.pat + t4.nat) - (t3.pat + t3.nat)),
                               dif1 = t3.pat + t3.nat,
                               dif2 = t4.pat +t4.nat,
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
			IQueryable query = null;
            var db = new DCUContext();
            if (group_gb == 0)
            {
                query = from meters in db.Meters
                        join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                        join tree in db.Tree on dcus.group_id equals tree.id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.Tree where (from t7 in db.Tree where (from t8 in db.Tree where t8.parent_id == group_id select t8.id).Contains(t7.parent_id) select t7.id).Contains(t6.parent_id) select t6.id).Contains(tree.parent_id)
                        where energy_usage.frozen_dt == date
                        select new { 
                                    group_nm = tree.name,  
                                    dcus.dcu_id, 
                                    meters.use_yn, 
                                    meters.point_no, 
                                    meters.meter_id, 
                                    meters.install_place, 
                                    meters.meter_nm, 
                                    pat = energy_usage.pat ?? 0,
                                    pat1 = energy_usage.pat1 ?? 0, 
                                    pat2 = energy_usage.pat2 ?? 0, 
                                    pat3 = energy_usage.pat3 ?? 0, 
                                    pat4 = energy_usage.pat4 ?? 0, 
                                    nat = energy_usage.nat ?? 0, 
                                    nat1 = energy_usage.nat1 ?? 0, 
                                    nat2 = energy_usage.nat2 ?? 0, 
                                    nat3 = energy_usage.nat3 ?? 0, 
                                    nat4 = energy_usage.nat4 ?? 0, 
                                    apm = (energy_usage.pat ?? 0) + (energy_usage.nat ?? 0), 
                                    energy_usage.frozen_dt,
                                    status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            if (group_gb == 1)
            {
                query = from meters in db.Meters
                        join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                        join tree in db.Tree on dcus.group_id equals tree.id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t7 in db.Tree where (from t8 in db.Tree where t8.parent_id == group_id select t8.id).Contains(t7.parent_id) select t7.id).Contains(tree.parent_id)
                        where energy_usage.frozen_dt == date
                        select new
                        {
                            group_nm = tree.name,
                            dcus.dcu_id,
                            meters.use_yn,
                            meters.point_no,
                            meters.meter_id,
                            meters.install_place,
                            meters.meter_nm,
                            pat = energy_usage.pat ?? 0,
                            pat1 = energy_usage.pat1 ?? 0,
                            pat2 = energy_usage.pat2 ?? 0,
                            pat3 = energy_usage.pat3 ?? 0,
                            pat4 = energy_usage.pat4 ?? 0,
                            nat = energy_usage.nat ?? 0,
                            nat1 = energy_usage.nat1 ?? 0,
                            nat2 = energy_usage.nat2 ?? 0,
                            nat3 = energy_usage.nat3 ?? 0,
                            nat4 = energy_usage.nat4 ?? 0,
                            apm = (energy_usage.pat ?? 0) + (energy_usage.nat ?? 0),
                            energy_usage.frozen_dt,
                            status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0"
                        };
            }
            if (group_gb == 2)
            {
                query = from meters in db.Meters
                        join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                        join tree in db.Tree on dcus.group_id equals tree.id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t8 in db.Tree where t8.parent_id == group_id select t8.id).Contains(tree.parent_id)
                        where energy_usage.frozen_dt == date
                        select new
                        {
                            group_nm = tree.name,
                            dcus.dcu_id,
                            meters.use_yn,
                            meters.point_no,
                            meters.meter_id,
                            meters.install_place,
                            meters.meter_nm,
                            pat = energy_usage.pat ?? 0,
                            pat1 = energy_usage.pat1 ?? 0,
                            pat2 = energy_usage.pat2 ?? 0,
                            pat3 = energy_usage.pat3 ?? 0,
                            pat4 = energy_usage.pat4 ?? 0,
                            nat = energy_usage.nat ?? 0,
                            nat1 = energy_usage.nat1 ?? 0,
                            nat2 = energy_usage.nat2 ?? 0,
                            nat3 = energy_usage.nat3 ?? 0,
                            nat4 = energy_usage.nat4 ?? 0,
                            apm = (energy_usage.pat ?? 0) + (energy_usage.nat ?? 0),
                            energy_usage.frozen_dt,
                            status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0"
                        };
            }
            if (group_gb == 3)
            {
                query = from meters in db.Meters
                        join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                        join tree in db.Tree on dcus.group_id equals tree.id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t8 in db.Tree where t8.parent_id == group_id select t8.id).Contains(tree.id)
                        where energy_usage.frozen_dt == date
                        select new
                        {
                            group_nm = tree.name,
                            dcus.dcu_id,
                            meters.use_yn,
                            meters.point_no,
                            meters.meter_id,
                            meters.install_place,
                            meters.meter_nm,
                            pat = energy_usage.pat ?? 0,
                            pat1 = energy_usage.pat1 ?? 0,
                            pat2 = energy_usage.pat2 ?? 0,
                            pat3 = energy_usage.pat3 ?? 0,
                            pat4 = energy_usage.pat4 ?? 0,
                            nat = energy_usage.nat ?? 0,
                            nat1 = energy_usage.nat1 ?? 0,
                            nat2 = energy_usage.nat2 ?? 0,
                            nat3 = energy_usage.nat3 ?? 0,
                            nat4 = energy_usage.nat4 ?? 0,
                            apm = (energy_usage.pat ?? 0) + (energy_usage.nat ?? 0),
                            energy_usage.frozen_dt,
                            status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0"
                        };
            }
            if (group_gb == 4)
            {
                query = from meters in db.Meters
                        join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                        join tree in db.Tree on dcus.group_id equals tree.id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where tree.id==group_id
                        where energy_usage.frozen_dt == date
                        select new
                        {
                            group_nm = tree.name,
                            dcus.dcu_id,
                            meters.use_yn,
                            meters.point_no,
                            meters.meter_id,
                            meters.install_place,
                            meters.meter_nm,
                            pat = energy_usage.pat ?? 0,
                            pat1 = energy_usage.pat1 ?? 0,
                            pat2 = energy_usage.pat2 ?? 0,
                            pat3 = energy_usage.pat3 ?? 0,
                            pat4 = energy_usage.pat4 ?? 0,
                            nat = energy_usage.nat ?? 0,
                            nat1 = energy_usage.nat1 ?? 0,
                            nat2 = energy_usage.nat2 ?? 0,
                            nat3 = energy_usage.nat3 ?? 0,
                            nat4 = energy_usage.nat4 ?? 0,
                            apm = (energy_usage.pat ?? 0) + (energy_usage.nat ?? 0),
                            energy_usage.frozen_dt,
                            status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0"
                        };
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
                        join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.Tree on dcus.group_id equals dcu_info.id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.Tree where (from t7 in db.Tree where (from t8 in db.Tree where t8.parent_id == group_id select t8.id).Contains(t7.parent_id) select t7.id).Contains(t6.parent_id) select t6.id).Contains(dcu_info.parent_id) && energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        where energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        select new { meters.meter_id, meters.install_place, meters.meter_nm, meters.use_yn, group_nm=dcu_info.name, dif2 = energy_usage2.pat + energy_usage2.nat, dif = ((energy_usage2.pat + energy_usage2.nat) - (energy_usage.pat + energy_usage.nat)), dif1 = energy_usage.pat + energy_usage.nat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            else if (group_gb == 1)
            {
                query = from meters in db.Meters
                        join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.Tree on dcus.group_id equals dcu_info.id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.Tree where (from t7 in db.Tree where t7.parent_id == group_id select t7.id).Contains(t6.parent_id) select t6.id).Contains(dcu_info.parent_id) && energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        where energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        select new { meters.meter_id, meters.install_place, meters.meter_nm, meters.use_yn, group_nm=dcu_info.name, dif2 = energy_usage2.pat + energy_usage2.nat, dif = ((energy_usage2.pat + energy_usage2.nat) - (energy_usage.pat + energy_usage.nat)), dif1 = energy_usage.pat + energy_usage.nat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            else if (group_gb == 2)
            {
                query = from meters in db.Meters
                        join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.Tree on dcus.group_id equals dcu_info.id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where (from t6 in db.Tree where t6.parent_id == group_id select t6.id).Contains(dcu_info.parent_id) && energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        where energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        select new { meters.meter_id, meters.install_place, meters.meter_nm, meters.use_yn, group_nm=dcu_info.name, dif2 = energy_usage2.pat + energy_usage2.nat, dif = ((energy_usage2.pat + energy_usage2.nat) - (energy_usage.pat + energy_usage.nat)), dif1 = energy_usage.pat + energy_usage.nat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            else if (group_gb == 3)
            {
                query = from meters in db.Meters
                        join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                        join dcu_info in db.Tree on dcus.group_id equals dcu_info.id
                        join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                        join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                        where meters.meter_id.Contains(search) || meters.meter_nm.Contains(search) || meters.install_place.Contains(search)
                        where dcu_info.parent_id == group_id && energy_usage.frozen_dt == date && energy_usage2.frozen_dt == date2
                        select new { meters.meter_id, meters.install_place, meters.meter_nm, meters.use_yn, group_nm=dcu_info.name, dif2 = energy_usage2.pat + energy_usage2.nat, dif = ((energy_usage2.pat + energy_usage2.nat) - (energy_usage.pat + energy_usage.nat)), dif1 = energy_usage.pat + energy_usage.nat, status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0" };
            }
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ReceiveTaskData(getHistoryDataModel[] data)
        {
            DateTime dt = DateTime.Now;
            string date = dt.ToString("dd.MM.yyyy");
            string time = dt.ToString("HH:mm");
            var db = new DCUContext();
            if (data.Count() == 0)
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
            else
            {
                getHistoryDataModel[] dbEntities = data.Select(m => new getHistoryDataModel
                {
                    id = m.id,
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
                LogModel[] dbEntitieslogs = data.Select(m => new LogModel
                {
                    id = m.id,
                    username = Session["name"].ToString(),
                    meter_id = m.meter_id,
                    operation = m.target,
                    ip_adress = "",
                    machine_nm = "",
                    date = date,
                    time = time
                }).ToArray();
                db.Logs.AddRange(dbEntitieslogs);
                db.SaveChanges();
                //writeLog(login, operation, date, time);
                return Json("Ok", JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult OperationsCheck(string operator_id, string operation_id)
        {
            var db = new DCUContext();
            //int count = (from historyData in db.HistoryData where historyData.operator_id == operator_id && historyData.operation_id == operation_id select new { historyData.meter_id }).Count();
            int count_2 = (from historyData in db.HistoryData where historyData.operator_id == operator_id && historyData.operation_id == operation_id && historyData.result == "done" select new { historyData.meter_id }).Count();
            if (count_2 > 0)
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
                    //join dcu in db.DCUs on historyData.dcu_id equals dcu.dcu_id
					//join tree in db.Tree on dcu.group_id equals tree.id
                    where (historyData.operator_id == operator_id) && (historyData.operation_id == operation_id) && (historyData.result == "done")
                    select new { 
                        historyData.dt,
                        //tree.name,
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
                        historyData.nat4};
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
            int query_nr = (from gn1 in db.Tree
                            join dcu in db.Cons on gn1.id equals dcu.group_id
                            join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                            where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.use_yn == "1"
                            select new { meters.meter_id }).Count();
            //On
            int query_on = (from gn1 in db.Tree
                            join dcu in db.Cons on gn1.id equals dcu.group_id
                            join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                            where meters.relay_on == "1" && meters.dcu_id == dcu_id && meters.use_yn == "1"
                            select new { meters.meter_id }).Count();
            //Off
            int query_off = (from gn1 in db.Tree
                             join dcu in db.Cons on gn1.id equals dcu.group_id
                             join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                             where meters.relay_on == "0" && meters.dcu_id == dcu_id && meters.use_yn == "1"
                             select new { meters.meter_id }).Count();
            //All
            int query_all = (from gn1 in db.Tree
                             join dcu in db.Cons on gn1.id equals dcu.group_id
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

        public JsonResult GetGasMAllOnOffNR(string dcu_id, string date)
        {
            var db = new DCUContext();
            //NR
            int query_nr = (from tree in db.Tree
                            join dcu in db.Cons on tree.id equals dcu.group_id
                            join meters in db.GasMeter on dcu.dcu_id equals meters.dcu_id
                            where !(from rm in db.GasMeterVol where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id
                            select new { meters.meter_id }).Count();
            //On
            int query_on = (from tree in db.Tree
                            join dcu in db.Cons on tree.id equals dcu.group_id
                            join meters in db.GasMeter on dcu.dcu_id equals meters.dcu_id
                            where meters.rs == 0 && meters.dcu_id == dcu_id
                            select new { meters.meter_id }).Count();
            //Off
            int query_off = (from tree in db.Tree
                             join dcu in db.Cons on tree.id equals dcu.group_id
                             join meters in db.GasMeter on dcu.dcu_id equals meters.dcu_id
                             where meters.rs == 1 && meters.dcu_id == dcu_id
                             select new { meters.meter_id }).Count();
            //All
            int query_all = (from tree in db.Tree
                             join dcu in db.Cons on tree.id equals dcu.group_id
                             join meters in db.GasMeter on dcu.dcu_id equals meters.dcu_id
                             where meters.dcu_id == dcu_id
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

        public JsonResult GetWaterMAllOnOffNR(string dcu_id, string date)
        {
            var db = new DCUContext();
            //NR
            int query_nr = (from gn1 in db.Tree
                            join dcu in db.Cons on gn1.id equals dcu.group_id
                            join meters in db.WaterMeter on dcu.dcu_nm equals meters.dcu_id
                            where !(from rm in db.WaterMeterVol where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id
                            select new { meters.meter_id }).Count();
            //On
            int query_on = (from gn1 in db.Tree
                            join dcu in db.Cons on gn1.id equals dcu.group_id
                            join meters in db.WaterMeter on dcu.dcu_nm equals meters.dcu_id
                            where meters.rs == 0 && meters.dcu_id == dcu_id
                            select new { meters.meter_id }).Count();
            //Off
            int query_off = (from gn1 in db.Tree
                             join dcu in db.Cons on gn1.id equals dcu.group_id
                             join meters in db.WaterMeter on dcu.dcu_nm equals meters.dcu_id
                             where meters.rs == 1 && meters.dcu_id == dcu_id
                             select new { meters.meter_id }).Count();
            //All
            int query_all = (from gn1 in db.Tree
                             join dcu in db.Cons on gn1.id equals dcu.group_id
                             join meters in db.WaterMeter on dcu.dcu_nm equals meters.dcu_id
                             where meters.dcu_id == dcu_id
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
            var query = (from t0 in db.Tree
                         join t1 in db.Cons on t0.id equals t1.group_id
                         join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                         join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         where t2.use_yn == "1"
                         where t2.relay_on == "1"
                         select new
                         {
                             group_nm=t0.name,
                             t1.dcu_id,
                             t2.meter_id,
                             t2.point_no,
                             t2.meter_nm,
                             t2.install_place,
                             pat = t3.pat ?? 0,
                             pat1 = t3.pat1 ?? 0,
                             pat2 = t3.pat2 ?? 0,
                             pat3 = t3.pat3 ?? 0,
                             pat4 = t3.pat4 ?? 0,
                             nat = t3.nat ?? 0,
                             nat1 = t3.nat ?? 0,
                             nat2 = t3.nat2 ?? 0,
                             nat3 = t3.nat3 ?? 0,
                             nat4 = t3.nat4 ?? 0,
                             t3.frozen_dt,
                             apm = (t3.pat ?? 0) + (t3.nat ?? 0),
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
            var query = from gn1 in db.Tree
                        join dcu in db.Cons on gn1.id equals dcu.group_id
                        join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                        where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.use_yn == "1" && meters.relay_on == "1"
                        select new {
                            group_nm=gn1.name,
                            dcu.dcu_id,
                            meters.meter_id,
                            meters.point_no,
                            meters.meter_nm,
                            meters.install_place,
                            status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0",
                            apm = "----",
                            pat = "---",
                            pat1 = "---",
                            pat2 = "---",
                            pat3 = "---",
                            pat4 = "---",
                            nat = "---",
                            nat1 = "---",
                            nat2 = "---",
                            nat3 = "---",
                            nat4 = "---"
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

        public JsonResult GetAllOffMeters(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.Tree
                         join t1 in db.Cons on t0.id equals t1.group_id
                         join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                         join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         where t2.use_yn == "1"
                         where t2.relay_on == "0"
                         select new
                         {
                             group_nm=t0.name,
                             t1.dcu_id,
                             t2.meter_id,
                             t2.point_no,
                             t2.meter_nm,
                             t2.install_place,
                             pat = t3.pat ?? 0,
                             pat1 = t3.pat1 ?? 0,
                             pat2 = t3.pat2 ?? 0,
                             pat3 = t3.pat3 ?? 0,
                             pat4 = t3.pat4 ?? 0,
                             nat = t3.nat ?? 0,
                             nat1 = t3.nat ?? 0,
                             nat2 = t3.nat2 ?? 0,
                             nat3 = t3.nat3 ?? 0,
                             nat4 = t3.nat4 ?? 0,
                             t3.frozen_dt,
                             apm = (t3.pat ?? 0) + (t3.nat ?? 0),
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
            var query = from gn1 in db.Tree
                        join dcu in db.Cons on gn1.id equals dcu.group_id
                        join meters in db.Meters on dcu.dcu_id equals meters.dcu_id
                        where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.use_yn == "1" && meters.relay_on == "0"
                        select new
                        {
                            group_nm=gn1.name,
                            dcu.dcu_id,
                            meters.meter_id,
                            meters.point_no,
                            meters.meter_nm,
                            meters.install_place,
                            status = meters.use_yn == "0" ? "3" : meters.uploaded_yn == "0" ? "2" : meters.relay_on == "0" ? "1" : "0",
                            apm = "----",
                            pat = "---",
                            pat1 = "---",
                            pat2 = "---",
                            pat3 = "---",
                            pat4 = "---",
                            nat = "---",
                            nat1 = "---",
                            nat2 = "---",
                            nat3 = "---",
                            nat4 = "---"
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

        BalanceCharHT[] res_arr;
        BalanceCharHT[] res_arr_1;
        List<string> numbers;
        
        public class BalanceCharHT
        {
            public string dcu { get; set; }

            public double balance { get; set; }

            public double summa { get; set; }

        }
        List<string> all_date;
        public JsonResult SumMBUsageByDCU(string group_id, int group_gb, string eDate)
        {
            all_date = new List<string>();
            DateTime endDate = DateTime.ParseExact(eDate, "yyyyMMdd", null);
            int check = 0;
            if(endDate==DateTime.Today)
            {
                check = 1;
            }
            int k = 0;
            for(k=0; k<30; k++)
            {
                string date = endDate.ToString("yyyyMMdd");
                all_date.Add(date);
                endDate = endDate.Subtract(TimeSpan.FromDays(1));
            }
            var db = new DCUContext();
            if (group_gb == 5)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if(balance!=null)
                    {
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select new { energy_usage.pat }).DefaultIfEmpty();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = max_pat.FirstOrDefault() == null ? 0 : Math.Round(Convert.ToDouble(max_pat.FirstOrDefault().pat * ct_rate), 2);
                        double summa_f = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.use_yn == "1" && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            double maxsumma = 0;
                            string meter = met[m].meter_id;
                            var res = (from energ in db.MeterEnergyUsage
                                       where energ.meter_id == meter && all_date.Contains(energ.frozen_dt)
                                       select new { energ.pat }).Distinct().ToArray();
                            int meter_count = 0;
                            foreach (var l in res)
                            {
                                meter_count++;
                            }
                            int y = 0;
                            for (y = 0; y < meter_count; y++)
                            {
                                double pat = Convert.ToDouble(res[y].pat);
                                if (pat > maxsumma)
                                {
                                    maxsumma = pat;
                                }
                            }
                            summa_f = summa_f + maxsumma;
                        }
                        if (summa_f != 0 && check == 0)
                        {
                            res_arr[i].summa = Math.Round(summa_f, 2);
                        }
                        else { res_arr[i].summa = 0; }
                    }
                    if(balance==null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }
                }
            }
            if (group_gb == 0)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where (from t6 in db.Tree where (from t7 in db.Tree where (from t8 in db.Tree where t8.parent_id == group_id select t8.id).Contains(t7.parent_id) select t7.id).Contains(t6.parent_id) select t6.id).Contains(tree.parent_id)//
                              && meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if (balance != null)
                    {
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select new { energy_usage.pat }).DefaultIfEmpty();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = max_pat.FirstOrDefault() == null ? 0 : Math.Round(Convert.ToDouble(max_pat.FirstOrDefault().pat * ct_rate), 2);
                        double summa_f = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.use_yn == "1" && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            double maxsumma = 0;
                            string meter = met[m].meter_id;
                            var res = (from energ in db.MeterEnergyUsage
                                       where energ.meter_id == meter && all_date.Contains(energ.frozen_dt)
                                       select new { energ.pat }).Distinct().ToArray();
                            int meter_count = 0;
                            foreach (var l in res)
                            {
                                meter_count++;
                            }
                            int y = 0;
                            for (y = 0; y < meter_count; y++)
                            {
                                double pat = Convert.ToDouble(res[y].pat);
                                if (pat > maxsumma)
                                {
                                    maxsumma = pat;
                                }
                            }
                            summa_f = summa_f + maxsumma;
                        }
                        if (summa_f != 0 && check == 0)
                        {
                            res_arr[i].summa = Math.Round(summa_f, 2);
                        }
                        else { res_arr[i].summa = 0; }
                    }
                    if (balance == null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }
                }
            }
            if (group_gb == 1)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where (from t6 in db.Tree where (from t7 in db.Tree where t7.parent_id == group_id select t7.id).Contains(t6.parent_id) select t6.id).Contains(tree.parent_id)//
                              && meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if (balance != null)
                    {
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select new { energy_usage.pat }).DefaultIfEmpty();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = max_pat.FirstOrDefault() == null ? 0 : Math.Round(Convert.ToDouble(max_pat.FirstOrDefault().pat * ct_rate), 2);
                        double summa_f = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.use_yn == "1" && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            double maxsumma = 0;
                            string meter = met[m].meter_id;
                            var res = (from energ in db.MeterEnergyUsage
                                       where energ.meter_id == meter && all_date.Contains(energ.frozen_dt)
                                       select new { energ.pat }).Distinct().ToArray();
                            int meter_count = 0;
                            foreach (var l in res)
                            {
                                meter_count++;
                            }
                            int y = 0;
                            for (y = 0; y < meter_count; y++)
                            {
                                double pat = Convert.ToDouble(res[y].pat);
                                if (pat > maxsumma)
                                {
                                    maxsumma = pat;
                                }
                            }
                            summa_f = summa_f + maxsumma;
                        }
                        if (summa_f != 0 && check == 0)
                        {
                            res_arr[i].summa = Math.Round(summa_f, 2);
                        }
                        else { res_arr[i].summa = 0; }
                    }
                    if (balance == null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }
                }
            }

            if (group_gb == 2)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where (from t6 in db.Tree where t6.parent_id == group_id select t6.id).Contains(tree.parent_id)//
                              && meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if (balance != null)
                    {
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select new { energy_usage.pat }).DefaultIfEmpty();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = max_pat.FirstOrDefault() == null ? 0 : Math.Round(Convert.ToDouble(max_pat.FirstOrDefault().pat * ct_rate), 2);
                        double summa_f = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.use_yn == "1" && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            double maxsumma = 0;
                            string meter = met[m].meter_id;
                            var res = (from energ in db.MeterEnergyUsage
                                       where energ.meter_id == meter && all_date.Contains(energ.frozen_dt)
                                       select new { energ.pat }).Distinct().ToArray();
                            int meter_count = 0;
                            foreach (var l in res)
                            {
                                meter_count++;
                            }
                            int y = 0;
                            for (y = 0; y < meter_count; y++)
                            {
                                double pat = Convert.ToDouble(res[y].pat);
                                if (pat > maxsumma)
                                {
                                    maxsumma = pat;
                                }
                            }
                            summa_f = summa_f + maxsumma;
                        }
                        if (summa_f != 0 && check == 0)
                        {
                            res_arr[i].summa = Math.Round(summa_f, 2);
                        }
                        else { res_arr[i].summa = 0; }
                    }
                    if (balance == null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }
                }
            }

            if (group_gb == 3)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where tree.parent_id==group_id && meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if (balance != null)
                    {
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select new { energy_usage.pat }).DefaultIfEmpty();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = max_pat.FirstOrDefault() == null ? 0 : Math.Round(Convert.ToDouble(max_pat.FirstOrDefault().pat * ct_rate), 2);
                        double summa_f = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.use_yn == "1" && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            double maxsumma = 0;
                            string meter = met[m].meter_id;
                            var res = (from energ in db.MeterEnergyUsage
                                       where energ.meter_id == meter && all_date.Contains(energ.frozen_dt)
                                       select new { energ.pat }).Distinct().ToArray();
                            int meter_count = 0;
                            foreach (var l in res)
                            {
                                meter_count++;
                            }
                            int y = 0;
                            for (y = 0; y < meter_count; y++)
                            {
                                double pat = Convert.ToDouble(res[y].pat);
                                if (pat > maxsumma)
                                {
                                    maxsumma = pat;
                                }
                            }
                            summa_f = summa_f + maxsumma;
                        }
                        if (summa_f != 0 && check == 0)
                        {
                            res_arr[i].summa = Math.Round(summa_f, 2);
                        }
                        else { res_arr[i].summa = 0; }
                    }
                    if (balance == null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }
                }
            }
            return Json(res_arr, JsonRequestBehavior.AllowGet);
        }
        List<string> counter;
        List<string> allDate;
        public JsonResult BalanceChartHT(string group_id, int group_gb, string sDate, string eDate)
        {
        
        var db = new DCUContext();
            if (group_gb == 5)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if (balance != null)
                    {
                        var min_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == sDate select energy_usage.pat).FirstOrDefault();
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select energy_usage.pat).FirstOrDefault();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2) < 0 ? 0 : Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2);

                        double finalsumma = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            allDate = new List<string>();
                            DateTime startDate = DateTime.ParseExact(sDate, "yyyyMMdd", null);
                            DateTime endDate = DateTime.ParseExact(eDate, "yyyyMMdd", null);
                            for (; startDate <= endDate; startDate.AddDays(1))
                            {
                                string date = startDate.ToString("yyyyMMdd");
                                allDate.Add(date);
                                startDate = startDate.AddDays(1);
                            }

                            double maxsumma = 0;
                            double minsumma = 0;
                            double summa = 0;
                            counter = new List<string>();
                            string meter = met[m].meter_id;
                            var div = (from energy in db.MeterEnergyUsage
                                       where energy.meter_id == meter && allDate.Contains(energy.frozen_dt)
                                       select new
                                       {
                                           energy.meter_id,
                                           energy.pat,
                                           energy.frozen_dt
                                       }).Distinct().ToArray();


                            foreach (var val in div)
                            {
                                counter.Add(val.ToString().Substring(2, 1));
                            }

                            if (counter.Count == 1)
                            {

                                summa = summa + Math.Round(Convert.ToDouble(div[0].pat), 2);

                            }
                            if (counter.Count > 1)
                            {
                                int k = 0;
                                for (k = 0; k < counter.Count; k++)
                                {

                                    double pat = Math.Round(Convert.ToDouble(div[k].pat), 2);

                                    if (pat > maxsumma)
                                    {
                                        maxsumma = pat;
                                    }
                                    if (pat <= minsumma)
                                    {
                                        minsumma = pat;
                                    }
                                    if (minsumma == 0)
                                    {
                                        minsumma = pat;
                                    }
                                }
                            }
                            summa = (maxsumma - minsumma);
                            finalsumma = finalsumma + summa;
                        }

                        if (finalsumma > 0)
                        {
                            res_arr[i].summa = Math.Round(finalsumma, 2);
                        }
                        else
                        {
                            res_arr[i].summa = 0;
                        }
                    }
                    if (balance == null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }

                }
            }
            if (group_gb == 0)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where (from t6 in db.Tree where (from t7 in db.Tree where (from t8 in db.Tree where t8.parent_id == group_id select t8.id).Contains(t7.parent_id) select t7.id).Contains(t6.parent_id) select t6.id).Contains(tree.parent_id)//
                              && meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if (balance != null)
                    {
                        var min_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == sDate select energy_usage.pat).FirstOrDefault();
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select energy_usage.pat).FirstOrDefault();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2) < 0 ? 0 : Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2);

                        double finalsumma = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            allDate = new List<string>();
                            DateTime startDate = DateTime.ParseExact(sDate, "yyyyMMdd", null);
                            DateTime endDate = DateTime.ParseExact(eDate, "yyyyMMdd", null);
                            for (; startDate <= endDate; startDate.AddDays(1))
                            {
                                string date = startDate.ToString("yyyyMMdd");
                                allDate.Add(date);
                                startDate = startDate.AddDays(1);
                            }

                            double maxsumma = 0;
                            double minsumma = 0;
                            double summa = 0;
                            counter = new List<string>();
                            string meter = met[m].meter_id;
                            var div = (from energy in db.MeterEnergyUsage
                                       where energy.meter_id == meter && allDate.Contains(energy.frozen_dt)
                                       select new
                                       {
                                           energy.meter_id,
                                           energy.pat,
                                           energy.frozen_dt
                                       }).Distinct().ToArray();


                            foreach (var val in div)
                            {
                                counter.Add(val.ToString().Substring(2, 1));
                            }

                            if (counter.Count == 1)
                            {

                                summa = summa + Math.Round(Convert.ToDouble(div[0].pat), 2);

                            }
                            if (counter.Count > 1)
                            {
                                int k = 0;
                                for (k = 0; k < counter.Count; k++)
                                {

                                    double pat = Math.Round(Convert.ToDouble(div[k].pat), 2);

                                    if (pat > maxsumma)
                                    {
                                        maxsumma = pat;
                                    }
                                    if (pat <= minsumma)
                                    {
                                        minsumma = pat;
                                    }
                                    if (minsumma == 0)
                                    {
                                        minsumma = pat;
                                    }
                                }
                            }
                            summa = (maxsumma - minsumma);
                            finalsumma = finalsumma + summa;
                        }

                        if (finalsumma > 0)
                        {
                            res_arr[i].summa = Math.Round(finalsumma, 2);
                        }
                        else
                        {
                            res_arr[i].summa = 0;
                        }
                    }
                    if (balance == null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }

                }
            }
            if (group_gb == 1)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where (from t6 in db.Tree where (from t7 in db.Tree where t7.parent_id == group_id select t7.id).Contains(t6.parent_id) select t6.id).Contains(tree.parent_id)
                              && meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if (balance != null)
                    {
                        var min_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == sDate select energy_usage.pat).FirstOrDefault();
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select energy_usage.pat).FirstOrDefault();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2) < 0 ? 0 : Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2);

                        double finalsumma = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            allDate = new List<string>();
                            DateTime startDate = DateTime.ParseExact(sDate, "yyyyMMdd", null);
                            DateTime endDate = DateTime.ParseExact(eDate, "yyyyMMdd", null);
                            for (; startDate <= endDate; startDate.AddDays(1))
                            {
                                string date = startDate.ToString("yyyyMMdd");
                                allDate.Add(date);
                                startDate = startDate.AddDays(1);
                            }

                            double maxsumma = 0;
                            double minsumma = 0;
                            double summa = 0;
                            counter = new List<string>();
                            string meter = met[m].meter_id;
                            var div = (from energy in db.MeterEnergyUsage
                                       where energy.meter_id == meter && allDate.Contains(energy.frozen_dt)
                                       select new
                                       {
                                           energy.meter_id,
                                           energy.pat,
                                           energy.frozen_dt
                                       }).Distinct().ToArray();


                            foreach (var val in div)
                            {
                                counter.Add(val.ToString().Substring(2, 1));
                            }

                            if (counter.Count == 1)
                            {

                                summa = summa + Math.Round(Convert.ToDouble(div[0].pat), 2);

                            }
                            if (counter.Count > 1)
                            {
                                int k = 0;
                                for (k = 0; k < counter.Count; k++)
                                {

                                    double pat = Math.Round(Convert.ToDouble(div[k].pat), 2);

                                    if (pat > maxsumma)
                                    {
                                        maxsumma = pat;
                                    }
                                    if (pat <= minsumma)
                                    {
                                        minsumma = pat;
                                    }
                                    if (minsumma == 0)
                                    {
                                        minsumma = pat;
                                    }
                                }
                            }
                            summa = (maxsumma - minsumma);
                            finalsumma = finalsumma + summa;
                        }

                        if (finalsumma > 0)
                        {
                            res_arr[i].summa = Math.Round(finalsumma, 2);
                        }
                        else
                        {
                            res_arr[i].summa = 0;
                        }
                    }
                    if (balance == null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }

                }
            }
            
            if (group_gb == 2)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where (from t6 in db.Tree where t6.parent_id == group_id select t6.id).Contains(tree.parent_id) && meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if (balance != null)
                    {
                        var min_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == sDate select energy_usage.pat).FirstOrDefault();
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select energy_usage.pat).FirstOrDefault();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2) < 0 ? 0 : Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2);

                        double finalsumma = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            allDate = new List<string>();
                            DateTime startDate = DateTime.ParseExact(sDate, "yyyyMMdd", null);
                            DateTime endDate = DateTime.ParseExact(eDate, "yyyyMMdd", null);
                            for (; startDate <= endDate; startDate.AddDays(1))
                            {
                                string date = startDate.ToString("yyyyMMdd");
                                allDate.Add(date);
                                startDate = startDate.AddDays(1);
                            }

                            double maxsumma = 0;
                            double minsumma = 0;
                            double summa = 0;
                            counter = new List<string>();
                            string meter = met[m].meter_id;
                            var div = (from energy in db.MeterEnergyUsage
                                       where energy.meter_id == meter && allDate.Contains(energy.frozen_dt)
                                       select new
                                       {
                                           energy.meter_id,
                                           energy.pat,
                                           energy.frozen_dt
                                       }).Distinct().ToArray();


                            foreach (var val in div)
                            {
                                counter.Add(val.ToString().Substring(2, 1));
                            }

                            if (counter.Count == 1)
                            {

                                summa = summa + Math.Round(Convert.ToDouble(div[0].pat), 2);

                            }
                            if (counter.Count > 1)
                            {
                                int k = 0;
                                for (k = 0; k < counter.Count; k++)
                                {

                                    double pat = Math.Round(Convert.ToDouble(div[k].pat), 2);

                                    if (pat > maxsumma)
                                    {
                                        maxsumma = pat;
                                    }
                                    if (pat <= minsumma)
                                    {
                                        minsumma = pat;
                                    }
                                    if (minsumma == 0)
                                    {
                                        minsumma = pat;
                                    }
                                }
                            }
                            summa = (maxsumma - minsumma);
                            finalsumma = finalsumma + summa;
                        }

                        if (finalsumma > 0)
                        {
                            res_arr[i].summa = Math.Round(finalsumma, 2);
                        }
                        else
                        {
                            res_arr[i].summa = 0;
                        }
                    }
                    if (balance == null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }

                }
            }
            if (group_gb == 3)
            {
                numbers = new List<string>();
                var result = (from meters in db.Meters
                              join dcus in db.Cons on meters.dcu_id equals dcus.dcu_id
                              join tree in db.Tree on dcus.group_id equals tree.id
                              where tree.parent_id==group_id && meters.use_yn == "1"
                              select new { meters.dcu_id }).Distinct().ToList();
                foreach (var value in result)
                {
                    numbers.Add(value.ToString().Substring(11, 10));
                }
                res_arr = new BalanceCharHT[numbers.Count];

                int i;
                for (i = 0; i < numbers.Count; i++)
                {
                    string dcu = numbers[i];
                    var balance = (from meters in db.Meters where meters.dcu_id == dcu && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
                    if (balance != null)
                    {
                        var min_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == sDate select energy_usage.pat).FirstOrDefault();
                        var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select energy_usage.pat).FirstOrDefault();
                        var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2) < 0 ? 0 : Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2);

                        double finalsumma = 0;
                        int incr = 0;
                        var met = (from t2 in db.Meters
                                   where t2.dcu_id == dcu && t2.usage_type == 0
                                   select new { t2.meter_id }).Distinct().ToArray();
                        foreach (var meter in met)
                        {
                            incr++;
                        }
                        int m = 0;
                        for (m = 0; m < incr; m++)
                        {
                            allDate = new List<string>();
                            DateTime startDate = DateTime.ParseExact(sDate, "yyyyMMdd", null);
                            DateTime endDate = DateTime.ParseExact(eDate, "yyyyMMdd", null);
                            for (; startDate <= endDate; startDate.AddDays(1))
                            {
                                string date = startDate.ToString("yyyyMMdd");
                                allDate.Add(date);
                                startDate = startDate.AddDays(1);
                            }

                            double maxsumma = 0;
                            double minsumma = 0;
                            double summa = 0;
                            counter = new List<string>();
                            string meter = met[m].meter_id;
                            var div = (from energy in db.MeterEnergyUsage
                                       where energy.meter_id == meter && allDate.Contains(energy.frozen_dt)
                                       select new
                                       {
                                           energy.meter_id,
                                           energy.pat,
                                           energy.frozen_dt
                                       }).Distinct().ToArray();


                            foreach (var val in div)
                            {
                                counter.Add(val.ToString().Substring(2, 1));
                            }

                            if (counter.Count == 1)
                            {

                                summa = summa + Math.Round(Convert.ToDouble(div[0].pat), 2);

                            }
                            if (counter.Count > 1)
                            {
                                int k = 0;
                                for (k = 0; k < counter.Count; k++)
                                {

                                    double pat = Math.Round(Convert.ToDouble(div[k].pat), 2);

                                    if (pat > maxsumma)
                                    {
                                        maxsumma = pat;
                                    }
                                    if (pat <= minsumma)
                                    {
                                        minsumma = pat;
                                    }
                                    if (minsumma == 0)
                                    {
                                        minsumma = pat;
                                    }
                                }
                            }
                            summa = (maxsumma - minsumma);
                            finalsumma = finalsumma + summa;
                        }

                        if (finalsumma > 0)
                        {
                            res_arr[i].summa = Math.Round(finalsumma, 2);
                        }
                        else
                        {
                            res_arr[i].summa = 0;
                        }
                    }
                    if (balance == null)
                    {
                        res_arr[i] = new BalanceCharHT();
                        res_arr[i].dcu = dcu;
                        res_arr[i].balance = 0;
                        res_arr[i].summa = 0;
                    }

                }
            }

            return Json(res_arr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SingleClickHT1(List<String> dcu_list, List<String> dt_list) {
            Object[][] res_arr = new Object[dcu_list.Count][];
            //int j = 0;
            for (int n = 0; n<dcu_list.Count; n++) {
                string dcu_id = dcu_list[n];
                res_arr[n] = new Object[dt_list.Count];
                //while (j < dt_list.Count) { 
                for (int j = 0; j<dt_list.Count-1; j++) {
                    //
                    string sDate = dt_list[j];
                    string eDate = dt_list[j+1];
                    var db = new DCUContext();
                    var result = (from meters in db.Meters
                                  join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                                  join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                                  where meters.dcu_id == dcu_id && meters.use_yn == "1" && meters.usage_type == 0 && energy_usage.frozen_dt == sDate && energy_usage2.frozen_dt == eDate
                                  select new { data = energy_usage.frozen_dt, diff = energy_usage2.pat - energy_usage.pat }).GroupBy(row => row.data).Select(grouping => new
                                  {
                                      dcu = dcu_id,
                                      summa = grouping.Sum(i => i.diff)
                                  });
                    var result2 = (from meters in db.Meters
                                   join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                                   join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                                   where meters.dcu_id == dcu_id && meters.use_yn == "1" && meters.usage_type == 1 && energy_usage.frozen_dt == sDate && energy_usage2.frozen_dt == eDate
                                   select new { data = energy_usage.frozen_dt, diff = (energy_usage2.pat - energy_usage.pat) * meters.ct_rate }).GroupBy(row => row.data).Select(grouping => new
                                   {
                                       dcu = dcu_id,
                                       balance = grouping.Sum(i => i.diff)
                                   });
                    var result3 = from pl in result join t in result2 on pl.dcu equals t.dcu select new { dcu = pl.dcu, balance = t.balance == 0 ? 0 : t.balance, summa = pl.summa == 0 ? 0 : pl.summa }; ;
                    // 
                    res_arr[n][j] = result3;
                    //j++;
                }
            }
            return Json(res_arr, JsonRequestBehavior.AllowGet); 
        }

        public class HPT2
        {
            public int index { get; set; }

            public string tp { get; set; }

            public string dcu_id { get; set; }

            public int all { get; set; }

            public int read { get; set; }

            public int nread { get; set; }

            public int left { get; set; }
        }

        public JsonResult GetDCUSummary(List<String> dcu_list, List<String> tp_list, string date)
        {
            int i;
            int all_sum = 0;
            int read_sum = 0;
            int nread_sum = 0;
            int left_sum = 0;
            HPT2[] res_arr = new HPT2[dcu_list.Count+1];
            for (i = 0; i<dcu_list.Count; i++) {
                string dcu_id = dcu_list[i];
                //
                var db = new DCUContext();
                int query = (from meters in db.Meters join meter_usage in db.MeterEnergyUsage on meters.meter_id equals meter_usage.meter_id where (meter_usage.frozen_dt.CompareTo(date) >= 0 && meter_usage.frozen_dt.CompareTo(date) <= 0) && meters.dcu_id == dcu_id select meters.meter_id).Count();
                //int query = (from meters in db.Meters where (from meter_usage in db.MeterEnergyUsage where (meter_usage.frozen_dt.CompareTo(sDate) >= 0 && meter_usage.frozen_dt.CompareTo(eDate) <= 0) select meter_usage.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id select meters.meter_id).Count();
                int query_2 = (from meters in db.Meters where meters.dcu_id == dcu_id && meters.use_yn == "1" select meters.meter_id).Count();
                int days = (int.Parse(date) - int.Parse(date)) + 1;
                int query_3 = query_2 * days;
                //
                res_arr[i] = new HPT2();
                res_arr[i].index = i;
                res_arr[i].tp = tp_list[i];
                res_arr[i].dcu_id = dcu_list[i];
                res_arr[i].all = query_3;
                res_arr[i].read = query;
                res_arr[i].nread = query_3 - query;
                res_arr[i].left = 2000 - query_3;
                all_sum = all_sum + res_arr[i].all;
                read_sum = read_sum + res_arr[i].read;
                nread_sum = nread_sum + res_arr[i].nread;
                left_sum = left_sum + res_arr[i].left;
            }
            res_arr[i] = new HPT2();
            res_arr[i].index = i;
            res_arr[i].tp = "";
            res_arr[i].dcu_id = "Итого";
            res_arr[i].all = all_sum;
            res_arr[i].read = read_sum;
            res_arr[i].nread = nread_sum;
            res_arr[i].left = left_sum;

            return Json(res_arr, JsonRequestBehavior.AllowGet);
        }

        public class BalanceYear
        {
            public string month { get; set; }

            public string dcu { get; set; }

            public decimal? summa_aPlus { get; set; }

            public decimal? summa_aMinus { get; set; }

            public decimal? summa_aModul { get; set; }

            public decimal? summa_rPlus { get; set; }

            public decimal? summa_rMinus { get; set; }

            public decimal? summa_rModul { get; set; }

            public double S { get; set; }
        }

        public JsonResult GetDataByYearBalance(string year, string dcu_id)
        {
            var db = new DCUContext();
            int i;
            List<string> numbers = new List<string>() { "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" };
            BalanceYear[] res_arr = new BalanceYear[numbers.Count];
            var balance = (from meters in db.Meters where meters.dcu_id == dcu_id && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
            for (i = 0; i < numbers.Count; i++)
            {
                string month = numbers[i];
                var min_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt.Contains(year + month) select energy_usage.pat).Min();
                var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt.Contains(year + month) select energy_usage.pat).Max();
                var min_nat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt.Contains(year + month) select energy_usage.nat).Min();
                var max_nat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt.Contains(year + month) select energy_usage.nat).Max();
                var min_prt = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt.Contains(year + month) select energy_usage.prt).Min();
                var max_prt = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt.Contains(year + month) select energy_usage.prt).Max();
                var min_nrt = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt.Contains(year + month) select energy_usage.nrt).Min();
                var max_nrt = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt.Contains(year + month) select energy_usage.nrt).Max();
                var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
                decimal? summa_aPlus = (max_pat - min_pat) * ct_rate;
                decimal? summa_aMinus = (max_nat - min_nat) * ct_rate;
                decimal? summa_aModul = ((max_pat - min_pat) * ct_rate) + ((max_nat - min_nat) * ct_rate);
                decimal? summa_rPlus = (max_prt - min_prt) * ct_rate;
                decimal? summa_rMinus = (max_nrt - min_nrt) * ct_rate;
                decimal? summa_rModul = ((max_prt - min_prt) * ct_rate) + ((max_nrt - min_nrt) * ct_rate);
                double S = Math.Round(CalcS(Convert.ToDouble(((max_pat - min_pat) * ct_rate) + ((max_nat - min_nat) * ct_rate)), Convert.ToDouble(((max_prt - min_prt) * ct_rate) + ((max_nrt - min_nrt) * ct_rate))), 2);
                res_arr[i] = new BalanceYear();
                res_arr[i].month = month == "01" ? "Январь" : month == "02" ? "Февраль" : month == "03" ? "Март" : month == "04" ? "Апрель" : month == "05" ? "Май" : month == "06" ? "Июнь" : month == "07" ? "Июль" : month == "08" ? "Август" : month == "09" ? "Сентябрь" : month == "10" ? "Октябрь" : month == "11" ? "Ноябрь" : "Декабрь";
                res_arr[i].dcu = dcu_id;
                res_arr[i].summa_aPlus = summa_aPlus == null ? 0 : summa_aPlus;
                res_arr[i].summa_aMinus = summa_aMinus == null ? 0 : summa_aMinus;
                res_arr[i].summa_aModul = summa_aModul == null ? 0 : summa_aModul;
                res_arr[i].summa_rPlus = summa_rPlus == null ? 0 : summa_rPlus;
                res_arr[i].summa_rMinus = summa_rMinus == null ? 0 : summa_rMinus;
                res_arr[i].summa_rModul = summa_rModul == null ? 0 : summa_rModul;
                res_arr[i].S = S == null ? 0 : S;
            }
            return Json(res_arr, JsonRequestBehavior.AllowGet);
        }

        public class AllMetersYear
        {
            public string month { get; set; }

            public string dcu { get; set; }

            public decimal? summa_aPlus { get; set; }

            public decimal? summa_aMinus { get; set; }

            public decimal? summa_aModul { get; set; }

            public decimal? summa_rPlus { get; set; }

            public decimal? summa_rMinus { get; set; }

            public decimal? summa_rModul { get; set; }

            public double S { get; set; }
        }

        public JsonResult GetDataByYearAllMeters(string dcu_id, string year)
        {
            var db = new DCUContext();
            int i;
            List<string> numbers = new List<string>() { "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" };
            AllMetersYear[] res_arr = new AllMetersYear[numbers.Count];
            for (i = 0; i < numbers.Count; i++)
            {
                string month = numbers[i];
                var result = (from meters in db.Meters
                              join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                              join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                              where meters.usage_type == 0 && meters.dcu_id == dcu_id && energy_usage.frozen_dt.Contains(year + month)// && energy_usage2.frozen_dt == "20180131"
                              select new { dcu = meters.dcu_id, pat = energy_usage.pat == null ? 0 : energy_usage.pat, nat = energy_usage.nat == null ? 0 : energy_usage.nat, meter = meters.meter_id, prt = energy_usage.prt == null ? 0 : energy_usage.prt, nrt = energy_usage.nrt == null ? 0 : energy_usage.nrt }).Distinct().GroupBy(n => n.meter).Select(grouping => new
                              {
                                  meter = grouping.Key,
                                  dcu = dcu_id,
                                  aPlus = grouping.Max(item => item.pat) - grouping.Min(item => item.pat),
                                  aMinus = grouping.Max(item => item.nat) - grouping.Min(item => item.nat),
                                  aModul = (grouping.Max(item => item.pat) - grouping.Min(item => item.pat)) + (grouping.Max(item => item.nat) - grouping.Min(item => item.nat)),
                                  rPlus = grouping.Max(item => item.prt) - grouping.Min(item => item.prt),
                                  rMinus = grouping.Max(item => item.nrt) - grouping.Min(item => item.nrt),
                                  rModul = (grouping.Max(item => item.prt) - grouping.Min(item => item.prt)) + (grouping.Max(item => item.nrt) - grouping.Min(item => item.nrt))
                              }).GroupBy(g => g.dcu).Select(group => new
                              {
                                  dcu = group.Key,
                                  aPlus = group.Sum(item => item.aPlus),
                                  aMinus = group.Sum(item => item.aMinus),
                                  aModul = group.Sum(item => item.aModul),
                                  rPlus = group.Sum(item => item.rPlus),
                                  rMinus = group.Sum(item => item.rMinus),
                                  rModul = group.Sum(item => item.rModul),
                              }).ToArray();
                if (result.Length > 0)
                {
                    res_arr[i] = new AllMetersYear();
                    res_arr[i].month = month == "01" ? "Январь" : month == "02" ? "Февраль" : month == "03" ? "Март" : month == "04" ? "Апрель" : month == "05" ? "Май" : month == "06" ? "Июнь" : month == "07" ? "Июль" : month == "08" ? "Август" : month == "09" ? "Сентябрь" : month == "10" ? "Октябрь" : month == "11" ? "Ноябрь" : "Декабрь";
                    res_arr[i].dcu = dcu_id;
                    res_arr[i].summa_aPlus = result[0].aPlus;
                    res_arr[i].summa_aMinus = result[0].aMinus;
                    res_arr[i].summa_aModul = result[0].aModul;
                    res_arr[i].summa_rPlus = result[0].rPlus;
                    res_arr[i].summa_rMinus = result[0].rMinus;
                    res_arr[i].summa_rModul = result[0].rModul;
                    res_arr[i].S = 0;//CalcS(Convert.ToDouble(((result[0].pat_max - result[0].pat_min)) + ((max_nat - min_nat) * ct_rate)), Convert.ToDouble(((max_prt - min_prt) * ct_rate) + ((max_nrt - min_nrt) * ct_rate)));
                }
                else
                {
                    res_arr[i] = new AllMetersYear();
                    res_arr[i].month = month == "01" ? "Январь" : month == "02" ? "Февраль" : month == "03" ? "Март" : month == "04" ? "Апрель" : month == "05" ? "Май" : month == "06" ? "Июнь" : month == "07" ? "Июль" : month == "08" ? "Август" : month == "09" ? "Сентябрь" : month == "10" ? "Октябрь" : month == "11" ? "Ноябрь" : "Декабрь";
                    res_arr[i].dcu = dcu_id;
                    res_arr[i].summa_aPlus = 0;
                    res_arr[i].summa_aMinus = 0;
                    res_arr[i].summa_aModul = 0;
                    res_arr[i].summa_rPlus = 0;
                    res_arr[i].summa_rMinus = 0;
                    res_arr[i].summa_rModul = 0;

                }
            }
            return Json(res_arr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDataByPeriodBT(string sDate, string eDate, string dcu_id)
        {
            var db = new DCUContext();
            var result = (from meters in db.Meters
                          join energy_usage in db.MeterEnergyUsage on meters.meter_id equals energy_usage.meter_id
                          join energy_usage2 in db.MeterEnergyUsage on meters.meter_id equals energy_usage2.meter_id
                          where meters.dcu_id == dcu_id && meters.usage_type == 0 && energy_usage.frozen_dt == sDate && energy_usage2.frozen_dt == eDate && meters.usage_type == 0
                          select new
                          {
                              meters.meter_id,
                              aPlus = energy_usage2.pat - energy_usage.pat,
                              aMinus = energy_usage2.nat - energy_usage.nat,
                              aModul = (energy_usage2.pat - energy_usage.pat) + (energy_usage2.nat - energy_usage.nat),
                              rPlus = energy_usage.prt - energy_usage2.prt,
                              rMinus = energy_usage.nrt - energy_usage2.nrt,
                              rModul = (energy_usage.prt - energy_usage2.prt) + (energy_usage.nrt - energy_usage2.nrt),
                              max_pat = energy_usage2.pat,
                              min_pat = energy_usage.pat,
                          }).GroupBy(row => row.meter_id).
                    Select(grouping => new {
                        meter = grouping.Key,
                        summa_aPlus = grouping.Select(item => item.aPlus).FirstOrDefault() == null ? 0 : grouping.Select(item => item.aPlus).FirstOrDefault(),
                        summa_aMinus = grouping.Select(item => item.aMinus).FirstOrDefault() == null ? 0 : grouping.Select(item => item.aMinus).FirstOrDefault(),
                        summa_aModul = grouping.Select(item => item.aModul).FirstOrDefault() == null ? 0 : grouping.Select(item => item.aModul).FirstOrDefault(),
                        summa_rPlus = grouping.Select(item => item.rPlus).FirstOrDefault() == null ? 0 : grouping.Select(item => item.rPlus).FirstOrDefault(),
                        summa_rMinus = grouping.Select(item => item.rMinus).FirstOrDefault() == null ? 0 : grouping.Select(item => item.rMinus).FirstOrDefault(),
                        summa_rModul = grouping.Select(item => item.rModul).FirstOrDefault() == null ? 0 : grouping.Select(item => item.rModul).FirstOrDefault(),
                        S = "Math.Sqrt(Math.Pow(aModul, 2) + Math.Pow(rModul, 2))"
                    });
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDataByPeriodBalanceMet(string sDate = "20180215", string eDate = "20180315", string dcu_id = "6070-00027")
        {
            var db = new DCUContext();
            BalanceYear[] res_arr = new BalanceYear[1];
            var balance = (from meters in db.Meters where meters.dcu_id == dcu_id && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
            var min_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == sDate select energy_usage.pat).Min();
            var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select energy_usage.pat).Max();
            var min_nat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == sDate select energy_usage.nat).Min();
            var max_nat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select energy_usage.nat).Max();
            var min_prt = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == sDate select energy_usage.prt).Min();
            var max_prt = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select energy_usage.prt).Max();
            var min_nrt = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == sDate select energy_usage.nrt).Min();
            var max_nrt = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance && energy_usage.frozen_dt == eDate select energy_usage.nrt).Max();
            var ct_rate = (from meter in db.Meters where meter.meter_id == balance select meter.ct_rate).Max();
            decimal? summa_aPlus = (max_pat - min_pat) * ct_rate;
            decimal? summa_aMinus = (max_nat - min_nat) * ct_rate;
            decimal? summa_aModul = ((max_pat - min_pat) * ct_rate) + ((max_nat - min_nat) * ct_rate);
            decimal? summa_rPlus = (max_prt - min_prt) * ct_rate;
            decimal? summa_rMinus = (max_nrt - min_nrt) * ct_rate;
            decimal? summa_rModul = ((max_prt - min_prt) * ct_rate) + ((max_nrt - min_nrt) * ct_rate);
            double S = Math.Round(CalcS(Convert.ToDouble(((max_pat - min_pat) * ct_rate) + ((max_nat - min_nat) * ct_rate)), Convert.ToDouble(((max_prt - min_prt) * ct_rate) + ((max_nrt - min_nrt) * ct_rate))), 2);
            res_arr[0] = new BalanceYear();
            res_arr[0].dcu = balance;
            res_arr[0].summa_aPlus = summa_aPlus == null ? 0 : summa_aPlus;
            res_arr[0].summa_aMinus = summa_aMinus == null ? 0 : summa_aMinus;
            res_arr[0].summa_aModul = summa_aModul == null ? 0 : summa_aModul;
            res_arr[0].summa_rPlus = summa_rPlus == null ? 0 : summa_rPlus;
            res_arr[0].summa_rMinus = summa_rMinus == null ? 0 : summa_rMinus;
            res_arr[0].summa_rModul = summa_rModul == null ? 0 : summa_rModul;
            res_arr[0].S = S == null ? 0 : S; return Json(res_arr, JsonRequestBehavior.AllowGet);
        }

        public class Otchet
        {
            public string dcu { get; set; }

            public double balance { get; set; }

            public double summa { get; set; }

        }

        public string ConvertData(string oldData)
        {

            string day = oldData.Substring(6, 2);
            string month = oldData.Substring(4, 2);
            string year = oldData.Substring(0, 4);
            return day + "-" + month + "-" + year;
        }

        public JsonResult OtchetPokazaniyAbonentov(string sdate, string edate, string dcu_id)
        {
            var db = new DCUContext();
            var tp = (from dcu_info in db.DCUInfo join dcu in db.DCUs on dcu_info.group_id equals dcu.group_id where dcu.dcu_id == dcu_id select new { dcu_info.group_nm }).ToList();

            string sDateFormat = ConvertData(sdate);
            string eDateFormat = ConvertData(edate);

            res_arr1 = new Otchet[1];

            var balance1 = (from meters in db.Meters where meters.dcu_id == dcu_id && meters.usage_type == 1 select meters.meter_id).FirstOrDefault();
            var min_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance1 && energy_usage.frozen_dt == sdate select energy_usage.pat).FirstOrDefault();
            var max_pat = (from energy_usage in db.MeterEnergyUsage where energy_usage.meter_id == balance1 && energy_usage.frozen_dt == edate select energy_usage.pat).FirstOrDefault();
            var ct_rate = (from meter in db.Meters where meter.meter_id == balance1 select meter.ct_rate).Max();
            var div = (from t0 in db.DCUInfo
                       join t1 in db.DCUs on t0.group_id equals t1.group_id
                       join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                       join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                       join t4 in db.MeterEnergyUsage on t2.meter_id equals t4.meter_id
                       where t2.dcu_id == dcu_id && t3.frozen_dt == sdate && t4.frozen_dt == edate
                       select new
                       {
                           t2.dcu_id,
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
                       }).GroupBy(n => n.dcu_id).Select(grouping => new
                       {
                           summa = grouping.Sum(z => z.dif)
                       }).DefaultIfEmpty().ToArray();
            if (div[0] == null)
            {
                res_arr1[0] = new Otchet();
                res_arr1[0].balance = Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2) < 0 ? 0 : Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2);
                res_arr1[0].summa = 0;
            }
            else
            {
                res_arr1[0] = new Otchet();
                res_arr1[0].balance = Math.Round((Convert.ToDouble(max_pat) - Convert.ToDouble(min_pat)) * Convert.ToDouble(ct_rate), 2);
                res_arr1[0].summa = Math.Round(Convert.ToDouble(div[0].summa), 2);
            }

            var balance = (from t0 in db.DCUInfo
                           join t1 in db.DCUs on t0.group_id equals t1.group_id
                           join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                           join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                           join t4 in db.MeterEnergyUsage on t2.meter_id equals t4.meter_id
                           where t2.dcu_id == dcu_id && t3.frozen_dt == sdate && t4.frozen_dt == edate && t2.usage_type == 1
                           select new
                           {
                               t2.dcu_id,
                               t2.meter_id,
                               t2.meter_nm,
                               t2.model,
                               t2.usage_type,
                               t2.phasetype,
                               t2.relay_on,
                               dif1 = t3.pat,
                               dif2 = t4.pat,
                               dif = t4.pat - t3.pat
                           }).ToArray();

            var query_45 = (from t0 in db.DCUInfo
                            join t1 in db.DCUs on t0.group_id equals t1.group_id
                            join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                            join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                            join t4 in db.MeterEnergyUsage on t2.meter_id equals t4.meter_id
                            where t2.dcu_id == dcu_id && t3.frozen_dt == sdate && t4.frozen_dt == edate && t2.usage_type == 0
                            select new
                            {
                                t2.dcu_id,
                                t2.meter_id,
                                t2.meter_nm,
                                t2.model,
                                t2.usage_type,
                                t2.phasetype,
                                t2.relay_on,
                                dif1 = t3.pat,
                                dif2 = t4.pat,
                                dif = t4.pat - t3.pat
                            }).ToList();

            var result1 = query_45.AsEnumerable().Select((x, index) => new { Index = index + 1, x.dcu_id, x.meter_id, x.meter_nm, x.model, x.usage_type, x.phasetype, x.relay_on, x.dif1, x.dif2, x.dif }).ToArray();

            int count = (from t0 in db.DCUInfo
                         join t1 in db.DCUs on t0.group_id equals t1.group_id
                         join t2 in db.Meters on t1.dcu_id equals t2.dcu_id
                         join t3 in db.MeterEnergyUsage on t2.meter_id equals t3.meter_id
                         join t4 in db.MeterEnergyUsage on t2.meter_id equals t4.meter_id
                         where t2.dcu_id == dcu_id && t3.frozen_dt == sdate && t4.frozen_dt == edate && t2.usage_type == 0
                         select new
                         {
                             t2.dcu_id,
                             t2.meter_id,
                             t2.meter_nm,
                             t2.model,
                             t2.usage_type,
                             t2.phasetype,
                             t2.relay_on,
                             dif1 = t3.pat,
                             dif2 = t4.pat,
                             dif = t4.pat - t3.pat
                         }).Count();

            int count_all_meters = (from meters in db.Meters where meters.dcu_id == dcu_id && meters.usage_type == 0 select new { meters.meter_id }).Count();
            int count_off_meters = (from meters in db.Meters where meters.dcu_id == dcu_id && meters.usage_type == 0 && meters.relay_on == "0" select new { meters.meter_id }).Count();

            double summa_perc;
            double nedosdacha;
            if (res_arr1.Length > 0)
            {
                summa_perc = (res_arr1[0].summa * 100) / res_arr1[0].balance;
                nedosdacha = Math.Round(100 - summa_perc, 2);
            }
            else
            {
                summa_perc = 0;
                nedosdacha = 0;
            }

            var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Энергоучет");

            ws.Columns().Width = 20;

            ws.Cell("B1").Value = "ID концентратора";
            ws.Cell("C1").Value = "ID номер счетчика";
            ws.Cell("D1").Value = "                               Имя счетчика";
            ws.Cell("E1").Value = "Модель";
            ws.Cell("F1").Value = "Выбрать тип использования";
            ws.Cell("G1").Value = "Тип фазы";
            ws.Cell("H1").Value = "Состояние реле";
            ws.Cell("I1").Value = sDateFormat;
            ws.Cell("J1").Value = eDateFormat;
            ws.Cell("K1").Value = "Usage value";

            ws.Range("I1:J1").Style.NumberFormat.Format = "dd-mm-yyyy";

            if (balance.Length > 0)
            {
                ws.Column(2).Width = 15.71;
                ws.Cell("C2").Style.NumberFormat.Format = "000000000000";
                ws.Cell("B2").Value = balance[0].dcu_id;
                ws.Cell("C2").Value = balance[0].meter_id;
                ws.Cell("D2").Value = balance[0].meter_nm + " (" + ct_rate + ")";
                ws.Cell("E2").Value = balance[0].model;
                ws.Cell("F2").Value = balance[0].usage_type;
                ws.Cell("G2").Value = balance[0].phasetype;
                ws.Cell("H2").Value = balance[0].relay_on;
                ws.Cell("I2").Value = balance[0].dif1;
                ws.Cell("J2").Value = balance[0].dif2;
                ws.Cell("K2").Value = balance[0].dif;
            }
            else
            {
                ws.Cell("B2").Value = "нет данных за этот период";
                var col2 = ws.Column(2);
                col2.Width = 30.0;
            }


            if (result1.Length > 0)
            {
                ws.Column(2).Width = 15.71;
                ws.Cell(6, 1).InsertData(result1);
            }
            else
            {
                ws.Cell(6, 2).Value = "Нет данных за этот период";
                var col3 = ws.Column(2);
                col3.Width = 30.0;
            }

            ws.Cell(3, 4).Value = "Итого опрошенных счетчиков";
            ws.Cell("K3").Value = count;
            ws.Cell(4, 4).Value = "разница (потери линии)";
            ws.Cell("K4").Value = res_arr1[0].balance - res_arr1[0].summa;
            ws.Cell(5, 4).Value = "%";
            ws.Cell("K5").Value = nedosdacha;
            //ws.Cell(6, 4).Value = "кол-во откл/обще кол-во счет - " + count_off_meters + " / " + count_all_meters;
            ws.Cell("D2").Style.Font.Bold = true;
            ws.Cell("D3").Style.Font.Bold = true;
            ws.Cell("D4").Style.Font.Bold = true;
            ws.Cell("D5").Style.Font.Bold = true;
            ws.SheetView.FreezeRows(1);

            //ws.Column(2).Width = 15.71;
            ws.Column(3).Width = 16.29;
            ws.Column(4).Width = 39.14;
            ws.Column(5).Width = 11.71;
            ws.Column(6).Width = 15.57;
            ws.Column(7).Width = 9;
            ws.Column(8).Width = 14.57;
            ws.Column(9).Width = 10.43;
            ws.Column(10).Width = 10.43;
            ws.Column(11).Width = 11.29;

            var row1 = ws.Row(1);
            row1.Height = 32.5;

            var col1 = ws.Column(1);
            col1.Width = 5;

            ws.Range("B1:K2").Style.Font.Bold = true;
            ws.Range("K3:K5").Style.Font.Bold = true;
            ws.Columns().Style.Font.FontName = "Arial";
            ws.Columns().Style.Font.FontSize = 9;
            ws.Range("B2:K2").Style.Border.OutsideBorderColor = XLColor.Black;
            ws.Columns().Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            ws.Columns().Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            ws.Cell("D1").Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            ws.Column(4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;
            ws.Columns().Style.Alignment.WrapText = true;

            //Сохранение файла
            Random rnd = new Random();
            var path_long = Request.ServerVariables["PATH_TRANSLATED"].ToString();
            var path = path_long.Substring(0, 53).Replace(@"\", @"\\");
            var file_name = "Report_" + tp[0].group_nm + "_" + dcu_id + "_" + rnd.Next(1, 99999999) + ".xlsx";
            string saveFile = path + "Reports" + "\\" + file_name;
            wb.SaveAs(saveFile);
            string ip = Request.ServerVariables["HTTP_HOST"];
            return Json(ip + "/Reports/" + file_name + " " + path, JsonRequestBehavior.AllowGet);
        }


        #region GASMETERS
        public JsonResult GasGPRSMeters()
        {
            var db = new DCUContext();
            var query = (from table in db.GasGPRS
                         select new
                         {
                             table.meter_id,
                             table.reg_date,
                         }).ToArray();
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetallGasMetersInfo(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from table in db.GasReadHistory
                         where table.dcu_id == dcu_id && table.event_date == date
                         select new
                         {
                             table.dcu_id,
                             table.meter_id,
                             table.event_date,
                             table.event_time,
                             table.event_name,
                             table.event_code,
                             table.read_date,
                         }).ToArray();
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        #region GetAllGasMeters

        public JsonResult GetAllGasMetersWithReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from tree in db.Tree
                         join dcu in db.Cons on tree.id equals dcu.group_id
                         join t2 in db.GasMeter on dcu.dcu_id equals t2.dcu_id
                         join t3 in db.GasMeterVol on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         select new
                         {
                             relay_status = t2.rs,
                             tree.name,
                             dcu.dcu_id,
                             dcu.dcu_nm,
                             t2.meter_id,
                             t2.consumer,
                             t2.address,
                             t3.frozen_dt,
                             t3.real_value,
                             t3.magnet,
                             t3.ltnm,
                             t3.rsb,
                             t3.ova,
                             t3.lf,
                             t3.rs,
                             t3.te,
                             t3.lb,
                             t3.biltcvt,
                             t3.overdraft,
                             t3.ee,
                             t3.bine,
                             t3.lbe,
                             t3.mme,
                             t3.res1,
                             t3.res2
                         }).ToArray();

            var query2 = (from tree in db.Tree
                          join dcu in db.Cons on tree.id equals dcu.group_id
                          join meters in db.GasMeter on dcu.dcu_id equals meters.dcu_id
                          where !(from rm in db.GasMeterVol where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id
                          select new
                          {
                              relay_status = meters.rs,
                              tree.name,
                              dcu.dcu_id,
                              meters.meter_id,
                              meters.consumer,
                              meters.address,
                              frozen_dt = "---",
                              real_value = 0.00,
                              magnet = 2,
                              ltnm = 2,
                              rsb = 2,
                              ova = 2,
                              lf = 2,
                              rs = 2,
                              te = 2,
                              lb = 2,
                              biltcvt = 2,
                              overdraft = 2,
                              ee = 2,
                              bine = 2,
                              lbe = 2,
                              mme = 2,
                              res1 = 2,
                              res2 = 2

                          }).ToArray();

            var result = new Object[query.Length + query2.Length];
            query.CopyTo(result, 0);
            query2.CopyTo(result, query.Length);

            bool hasAny = result.AsQueryable().Any();
            if (hasAny == true)
            {
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }



        public class GasWithReverse
        {
            public int? rs { get; set; }
            public string group_nm { get; set; }
            public string dcu_nm { get; set; }
            public string meter_id { get; set; }
            public string consumer { get; set; }
            public string address { get; set; }
            public string frozen_dt { get; set; }
            public double? real_value { get; set; }

        }

        public JsonResult GetAllOnGasMetersWithReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.Tree
                         join t1 in db.Cons on t0.id equals t1.group_id
                         join t2 in db.GasMeter on t1.dcu_nm equals t2.dcu_id
                         join t3 in db.GasMeterVol on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         where t2.rs == 0
                         select new GasWithReverse
                         {
                             rs = t2.rs,
                             group_nm = t0.name,
                             dcu_nm = t1.dcu_nm,
                             meter_id = t2.meter_id,
                             consumer = t2.consumer,
                             address = t2.address,
                             frozen_dt = t3.frozen_dt,
                             real_value = t3.real_value,
                         }).ToArray();

            var query2 = (from gn1 in db.Tree
                          join dcu in db.Cons on gn1.id equals dcu.group_id
                          join meters in db.GasMeter on dcu.dcu_nm equals meters.dcu_id
                          where !(from rm in db.GasMeterVol where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.rs == 0
                          select new GasWithReverse
                          {
                              rs = meters.rs,
                              group_nm = gn1.name,
                              dcu_nm = dcu.dcu_nm,
                              meter_id = meters.meter_id,
                              consumer = meters.consumer,
                              address = meters.address,
                              frozen_dt = "",
                              real_value = 0.00,
                          }).ToArray();

            var res = query.Union(query2).GroupBy(x => x.meter_id).Select(x => x.First());

            //var result = new Object[query.Length + query2.Length];
            //query.CopyTo(result, 0);
            //query2.CopyTo(result, query.Length);

            hasAny = res.AsQueryable().Any();
            if (hasAny == true)
            {
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllOffGasMetersWithReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.Tree
                         join t1 in db.Cons on t0.id equals t1.group_id
                         join t2 in db.GasMeter on t1.dcu_nm equals t2.dcu_id
                         join t3 in db.GasMeterVol on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         where t2.rs == 1
                         select new
                         {
                             relay_status = t2.rs,
                             group_nm=t0.name,
                             t1.dcu_nm,
                             t2.meter_id,
                             t2.consumer,
                             t2.address,
                             t3.frozen_dt,
                             t3.real_value,
                         }).ToArray();

            var query2 = (from gn1 in db.Tree
                          join dcu in db.Cons on gn1.id equals dcu.group_id
                          join meters in db.GasMeter on dcu.dcu_nm equals meters.dcu_id
                          where !(from rm in db.MeterEnergyUsage where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.rs == 1
                          select new
                          {
                              relay_status = meters.rs,
                              group_nm=gn1.name,
                              dcu.dcu_nm,
                              meters.meter_id,
                              meters.consumer,
                              meters.address,
                              frozen_dt = "",
                              real_value = 0.00,
                          }).ToArray();

            var result = new Object[query.Length + query2.Length];
            query.CopyTo(result, 0);
            query2.CopyTo(result, query.Length);

            hasAny = result.AsQueryable().Any();
            if (hasAny == true)
            {
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllGasMetersReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = from gn1 in db.Tree
                        join dcu in db.Cons on gn1.id equals dcu.group_id
                        join meters in db.GasMeter on dcu.dcu_nm equals meters.dcu_id
                        where !(from rm in db.GasMeterVol where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id
                        select new
                        {
                            relay_status = meters.rs,
                            group_nm=gn1.name,
                            dcu.dcu_nm,
                            meters.meter_id,
                            meters.consumer,
                            meters.address,
                            frozen_dt = "",
                            real_value = 0.00
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
        //public JsonResult GetAllGasMeters(string dcu_id, string date)
        //{
        //    var db = new DCUContext();
        //    var query = (from t0 in db.DCUInfo
        //                 join t1 in db.DCUs on t0.group_id equals t1.group_id
        //                 join t2 in db.GasMeter on t1.dcu_nm equals t2.dcu_id
        //                 join t3 in db.GasMeterVol on t2.meter_id equals t3.meter_id
        //                 where t3.frozen_dt == date
        //                 where t1.dcu_nm == dcu_id
        //                 where t2.rs == 1
        //                 select new
        //                 {
        //                     t0.group_nm,
        //                     t1.dcu_id,
        //                     t1.dcu_nm,
        //                     t2.meter_id,
        //                     t2.address,
        //                     t2.consumer,
        //                     t2.battery_level,
        //                     t3.real_value,
        //                     t3.frozen_dt,
        //                     relay_status = t3.rs == 1 ? "on" : "off"
        //                 });
        //    hasAny = query.AsQueryable().Any();
        //    if (hasAny == true)
        //    {
        //        return Json(query, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json("null", JsonRequestBehavior.AllowGet);
        //    }
        //}

        #endregion

        #region AddGasMeter

        public bool CheckGaskMeter(string meter_id)
        {
            var db = new DCUContext();
            var query = db.GasMeter.Where(p => p.meter_id == meter_id).Select(p => p.meter_id).Count();
            if (query > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
       
            [HttpPost]

        public JsonResult AddGasMeter(string meter_id, string dcu_id, string address, string consumer, string type)
        {
            connection();
            SqlCommand com = new SqlCommand("INSERT INTO dbo.gas_meters (meter_id, dcu_id, address, consumer, type) VALUES(@id_m, @id_dcu, @address, @consumer, @type)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@id_m", meter_id);
            com.Parameters.AddWithValue("@id_dcu", dcu_id);
            com.Parameters.AddWithValue("@address", address);
            com.Parameters.AddWithValue("@consumer", consumer);
            com.Parameters.AddWithValue("@type", type);

            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("Запись прошла успешно", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GasMeterDelete(string meter_id)
        {
            connection();
            SqlCommand com = new SqlCommand("DELETE FROM dbo.gas_meters WHERE meter_id = @meter_id", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@meter_id", meter_id);
            
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("gfdgdfgdfg", JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddMeter(GasMeterModel obj)
        {
            connection();
            SqlCommand com = new SqlCommand("INSERT INTO dbo.gas_meters (meter_id, dcu_id, ) VALUES(@meter_id, @dcu_id)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@meter_id", obj.meter_id);
            com.Parameters.AddWithValue("@dcu_id", obj.dcu_id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("Запись прошла успешно", JsonRequestBehavior.AllowGet);
        }
     
        

        public JsonResult AddConcentrator(string dcu_id, string dcu_nm, string model, int dcu_gb, string group_id, string login_yn, string install_place, string card_no, string firmware_version, string install_dt, string connection_dt, string check_dt, string production_dt, string imei_no, string use_yn)
        {
            connection();
            SqlCommand com = new SqlCommand("INSERT INTO dbo.dcus (dcu_id, dcu_nm, model, dcu_gb, group_id, login_yn, install_place, card_no, firmware_version, install_dt, connection_dt, check_dt, production_dt, imei_no, use_yn) VALUES(@id, @nm, @dcu_model, @dcu_gb, @group_id, @login_yn, @install_place, @card_no, @version, @install_dt, @connection_dt, @check_dt, @production_dt, @imei_no, @use_yn)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@id", dcu_id);
            com.Parameters.AddWithValue("@nm",dcu_nm);
            com.Parameters.AddWithValue("@dcu_model", model);
            com.Parameters.AddWithValue("@dcu_gb", dcu_gb);
            com.Parameters.AddWithValue("@group_id", group_id);
            com.Parameters.AddWithValue("@login_yn", login_yn);
            com.Parameters.AddWithValue("@install_place", install_place);
            com.Parameters.AddWithValue("@card_no", card_no);
            com.Parameters.AddWithValue("@version", firmware_version);
            com.Parameters.AddWithValue("@install_dt", install_dt);
            com.Parameters.AddWithValue("@connection_dt", connection_dt);
            com.Parameters.AddWithValue("@check_dt", check_dt);
            com.Parameters.AddWithValue("@production_dt", production_dt);
            com.Parameters.AddWithValue("@imei_no", imei_no);
            com.Parameters.AddWithValue("@use_yn", use_yn);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("Запись прошла успешно", JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region DeleteGasMeter

        [HttpPost]
        public JsonResult DeleteGasMeter(string[] ids)
        {
            var db = new DCUContext();
            List<int> TaskIds = ids.Select(x => Int32.Parse(x)).ToList();
            for (var i = 0; i < TaskIds.Count(); i++)
            {
                var todo = db.GasMeter.Find(TaskIds[i]);
                db.GasMeter.Remove(todo);
                db.SaveChanges();
            }
            return Json("Выполнено", JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region UpdateGasMeter

        [HttpPost]
        public JsonResult UpdateGasMeter(GasMeterModel obj)
        {
            connection();
            SqlCommand com = new SqlCommand("UPDATE dbo.gn003t SET dcu_id = @dcu_id WHERE meter_id = @meter_id", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@meter_id", obj.dcu_id);
            com.Parameters.AddWithValue("@dcu_id", obj.dcu_id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("gfdgdfgdfg", JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region UploadMultipleGasMetersToGasHistoryData

        public string DateTimeConv()
        {
            String sDate = DateTime.Now.ToString();
            DateTime datevalue = (Convert.ToDateTime(sDate.ToString()));
            String dy = datevalue.Day.ToString();
            String mn = datevalue.Month.ToString();
            String yy = datevalue.Year.ToString();
            string july28 = new DateTime(Int32.Parse(yy), Int32.Parse(mn), Int32.Parse(dy)).GetDateTimeFormats()[5].ToString();
            Regex regex = new Regex(@"\W");
            string text = regex.Replace(july28, "");
            return text;
        }

        [HttpPost]
        public JsonResult UploadGasMeterForReading(gasHistoryDataModel[] data)
        {
            var db = new DCUContext();
            if (data.Count() == 0)
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
            else
            {
                gasHistoryDataModel[] dbEntities = data.Select(m => new gasHistoryDataModel
                {
                    id = m.id,
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
                    real_value = 0.00,
                    battery_level = "",
                    magnet = 0,
                    ltnm = 0,
                    rsb = 0,
                    ova = 0,
                    lf = 0,
                    rs = 0,
                    te = 0,
                    lb = 0,
                    biltcvt = 0,
                    overdraft = 0,
                    bine = 0,
                    lbe = 0,
                    mme = 0,
                    res1 = 0,
                    res2 = 0
                }).ToArray();
                db.GasHistory.AddRange(dbEntities);
                db.SaveChanges();
                LogModel[] dbEntitieslogs = data.Select(m => new LogModel
                {
                    id = m.id,
                    username = Session["name"].ToString(),
                    meter_id = m.meter_id,
                    operation = m.target,
                    ip_adress = "",
                    machine_nm = "",
                    date = DateTime.Now.ToString("M/d/yyyy"),
                    time = DateTime.Now.ToString("hh:ss")
                }).ToArray();
                db.Logs.AddRange(dbEntitieslogs);
                db.SaveChanges();
                return Json("Ok", JsonRequestBehavior.AllowGet);
            }

        }

        #endregion

        #region OperationsGasCheck

        public JsonResult OperationsGasCheck(string operator_id, string operation_id)
        {
            var db = new DCUContext();
            //int count = (from historyData in db.GasHistory where historyData.operator_id == operator_id && historyData.operation_id == operation_id select new { historyData.meter_id }).Count();
            int count_2 = (from historyData in db.GasHistory where historyData.operator_id == operator_id && historyData.operation_id == operation_id && historyData.result == "done" select new { historyData.meter_id }).Count();
            if (count_2 > 0)
            {
                return Json(operation_id, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("no", JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region ReturnGasTaskResult

        public JsonResult ReturnGasTaskResult(string operator_id, string operation_id)
        {
            var db = new DCUContext();
            query = from historyData in db.GasHistory
                    join meters in db.GasMeter on historyData.meter_id equals meters.meter_id
                    join dcu in db.Cons on meters.dcu_id equals dcu.dcu_nm
                    join dcu_info in db.Tree on dcu.group_id equals dcu_info.id
                    where historyData.operator_id == operator_id && historyData.operation_id == operation_id && historyData.result == "done"
                    select new
                    {
                        historyData.dt,
                        historyData.real_value,
                        group_nm=dcu_info.name,
                        meters.meter_id,
                        meters.address,
                        meters.consumer,
                        historyData.operator_id,
                        historyData.operation_id,
                        historyData.dcu_id,
                        historyData.target,
                        historyData.battery_level,
                        magnet = historyData.magnet,
                        ltnm = historyData.ltnm,
                        rsb = historyData.rsb,
                        ova = historyData.ova,
                        lf = historyData.lf,
                        rs = historyData.rs,
                        te = historyData.te,
                        lb = historyData.lb,
                        biltcvt = historyData.biltcvt,
                        overdraft = historyData.overdraft,
                        eeprom_error = historyData.ee,
                        bine = historyData.bine,
                        lbe = historyData.lbe,
                        mme = historyData.mme,
                        res1 = historyData.res1,
                        res2 = historyData.res2
                    };
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #endregion



        #region WATERMETERS

        #region GetAllWaterMeters

        public JsonResult GetAllWaterMetersWithReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.Tree
                         join t1 in db.Cons on t0.id equals t1.group_id
                         join t2 in db.WaterMeter on t1.dcu_nm equals t2.dcu_id
                         join t3 in db.WaterMeterVol on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         select new
                         {
                             relay_status = t2.rs,
                             group_nm=t0.name,
                             t1.dcu_nm,
                             t2.meter_id,
                             t2.consumer,
                             t2.address,
                             t3.frozen_dt,
                             t3.real_value,
                             t3.magnet,
                             t3.ltnm,
                             t3.rsb,
                             t3.ova,
                             t3.lf,
                             t3.rs,
                             t3.te,
                             t3.lb,
                             t3.biltcvt,
                             t3.overdraft,
                             t3.ee,
                             t3.bine,
                             t3.lbe,
                             t3.mme,
                             t3.res1,
                             t3.res2
                         }).ToArray();

            var query2 = (from gn1 in db.Tree
                          join dcu in db.Cons on gn1.id equals dcu.group_id
                          join meters in db.WaterMeter on dcu.dcu_nm equals meters.dcu_id
                          where !(from rm in db.WaterMeterVol where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id
                          select new
                          {
                              relay_status = meters.rs,
                              group_nm=gn1.name,
                              dcu.dcu_nm,
                              meters.meter_id,
                              meters.consumer,
                              meters.address,
                              frozen_dt = "---",
                              real_value = 0.00,
                              magnet = 2,
                              ltnm = 2,
                              rsb = 2,
                              ova = 2,
                              lf = 2,
                              rs = 2,
                              te = 2,
                              lb = 2,
                              biltcvt = 2,
                              overdraft = 2,
                              ee = 2,
                              bine = 2,
                              lbe = 2,
                              mme = 2,
                              res1 = 2,
                              res2 = 2

                          }).ToArray();

            var result = new Object[query.Length + query2.Length];
            query.CopyTo(result, 0);
            query2.CopyTo(result, query.Length);

            bool hasAny = result.AsQueryable().Any();
            if (hasAny == true)
            {
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }



        public class WaterWithReverse
        {
            public int? rs { get; set; }
            public string group_nm { get; set; }
            public string dcu_nm { get; set; }
            public string meter_id { get; set; }
            public string consumer { get; set; }
            public string address { get; set; }
            public string frozen_dt { get; set; }
            public double? real_value { get; set; }

        }

        public JsonResult GetAllOnWaterMetersWithReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.Tree
                         join t1 in db.Cons on t0.id equals t1.group_id
                         join t2 in db.WaterMeter on t1.dcu_nm equals t2.dcu_id
                         join t3 in db.WaterMeterVol on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         where t2.rs == 0
                         select new GasWithReverse
                         {
                             rs = t2.rs,
                             group_nm = t0.name,
                             dcu_nm = t1.dcu_nm,
                             meter_id = t2.meter_id,
                             consumer = t2.consumer,
                             address = t2.address,
                             frozen_dt = t3.frozen_dt,
                             real_value = t3.real_value,
                         }).ToArray();

            var query2 = (from gn1 in db.Tree
                          join dcu in db.Cons on gn1.id equals dcu.group_id
                          join meters in db.WaterMeter on dcu.dcu_nm equals meters.dcu_id
                          where !(from rm in db.WaterMeterVol where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.rs == 0
                          select new GasWithReverse
                          {
                              rs = meters.rs,
                              group_nm = gn1.name,
                              dcu_nm = dcu.dcu_nm,
                              meter_id = meters.meter_id,
                              consumer = meters.consumer,
                              address = meters.address,
                              frozen_dt = "",
                              real_value = 0.00,
                          }).ToArray();

            var res = query.Union(query2).GroupBy(x => x.meter_id).Select(x => x.First());

            //var result = new Object[query.Length + query2.Length];
            //query.CopyTo(result, 0);
            //query2.CopyTo(result, query.Length);

            hasAny = res.AsQueryable().Any();
            if (hasAny == true)
            {
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllOffWaterMetersWithReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = (from t0 in db.Tree
                         join t1 in db.Cons on t0.id equals t1.group_id
                         join t2 in db.WaterMeter on t1.dcu_nm equals t2.dcu_id
                         join t3 in db.WaterMeterVol on t2.meter_id equals t3.meter_id
                         where t3.frozen_dt == date
                         where t2.dcu_id == dcu_id
                         where t2.rs == 1
                         select new
                         {
                             relay_status = t2.rs,
                             group_nm=t0.name,
                             t1.dcu_nm,
                             t2.meter_id,
                             t2.consumer,
                             t2.address,
                             t3.frozen_dt,
                             t3.real_value,
                         }).ToArray();

            var query2 = (from gn1 in db.Tree
                          join dcu in db.Cons on gn1.id equals dcu.group_id
                          join meters in db.WaterMeter on dcu.dcu_nm equals meters.dcu_id
                          where !(from rm in db.WaterMeterVol where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id && meters.rs == 1
                          select new
                          {
                              relay_status = meters.rs,
                              group_nm=gn1.name,
                              dcu.dcu_nm,
                              meters.meter_id,
                              meters.consumer,
                              meters.address,
                              frozen_dt = "",
                              real_value = 0.00,
                          }).ToArray();

            var result = new Object[query.Length + query2.Length];
            query.CopyTo(result, 0);
            query2.CopyTo(result, query.Length);

            hasAny = result.AsQueryable().Any();
            if (hasAny == true)
            {
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllWaterMetersReverse(string dcu_id, string date)
        {
            var db = new DCUContext();
            var query = from gn1 in db.Tree
                        join dcu in db.Cons on gn1.id equals dcu.group_id
                        join meters in db.WaterMeter on dcu.dcu_nm equals meters.dcu_id
                        where !(from rm in db.WaterMeterVol where rm.frozen_dt == date select rm.meter_id).Contains(meters.meter_id) && meters.dcu_id == dcu_id
                        select new
                        {
                            relay_status = meters.rs,
                            group_nm=gn1.name,
                            dcu.dcu_nm,
                            meters.meter_id,
                            meters.consumer,
                            meters.address,
                            frozen_dt = "",
                            real_value = 0.00
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
        //public JsonResult GetAllGasMeters(string dcu_id, string date)
        //{
        //    var db = new DCUContext();
        //    var query = (from t0 in db.DCUInfo
        //                 join t1 in db.DCUs on t0.group_id equals t1.group_id
        //                 join t2 in db.GasMeter on t1.dcu_nm equals t2.dcu_id
        //                 join t3 in db.GasMeterVol on t2.meter_id equals t3.meter_id
        //                 where t3.frozen_dt == date
        //                 where t1.dcu_nm == dcu_id
        //                 where t2.rs == 1
        //                 select new
        //                 {
        //                     t0.group_nm,
        //                     t1.dcu_id,
        //                     t1.dcu_nm,
        //                     t2.meter_id,
        //                     t2.address,
        //                     t2.consumer,
        //                     t2.battery_level,
        //                     t3.real_value,
        //                     t3.frozen_dt,
        //                     relay_status = t3.rs == 1 ? "on" : "off"
        //                 });
        //    hasAny = query.AsQueryable().Any();
        //    if (hasAny == true)
        //    {
        //        return Json(query, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json("null", JsonRequestBehavior.AllowGet);
        //    }
        //}

        #endregion

        #region AddWaterMeter

        public bool CheckWaterMeter(string meter_id)
        {
            var db = new DCUContext();
            var query = db.WaterMeter.Where(p => p.meter_id == meter_id).Select(p => p.meter_id).Count();
            if (query > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        [HttpPost]
        public JsonResult AddWaterMeter(WaterMeterModel obj)
        {
            connection();
            SqlCommand com = new SqlCommand("INSERT INTO dbo.water_meters (meter_id, dcu_id ) VALUES(@meter_id, @dcu_id)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@meter_id", obj.meter_id);
            com.Parameters.AddWithValue("@dcu_id", obj.dcu_id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("Запись прошла успешно", JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region DeleteWaterMeter

        [HttpPost]
        public JsonResult DeleteWaterMeter(string[] ids)
        {
            var db = new DCUContext();
            List<int> TaskIds = ids.Select(x => Int32.Parse(x)).ToList();
            for (var i = 0; i < TaskIds.Count(); i++)
            {
                var todo = db.WaterMeter.Find(TaskIds[i]);
                db.WaterMeter.Remove(todo);
                db.SaveChanges();
            }
            return Json("Выполнено", JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region UpdateWaterMeter

        [HttpPost]
        public JsonResult UpdateWaterMeter(WaterMeterModel obj)
        {
            connection();
            SqlCommand com = new SqlCommand("UPDATE dbo.water_meters SET dcu_id = @dcu_id WHERE meter_id = @meter_id", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@meter_id", obj.dcu_id);
            com.Parameters.AddWithValue("@dcu_id", obj.dcu_id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("gfdgdfgdfg", JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region UploadMultipleWaterMetersToWaterHistoryData


        [HttpPost]
        public JsonResult UploadWaterMeterForReading(waterHistoryData[] data)
        {
            var db = new DCUContext();
            if (data.Count() == 0)
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
            else
            {
                waterHistoryData[] dbEntities = data.Select(m => new waterHistoryData
                {
                    id = m.id,
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
                    real_value = 0.00,
                    battery_level = "",
                    magnet = 0,
                    ltnm = 0,
                    rsb = 0,
                    ova = 0,
                    lf = 0,
                    rs = 0,
                    te = 0,
                    lb = 0,
                    biltcvt = 0,
                    overdraft = 0,
                    bine = 0,
                    lbe = 0,
                    mme = 0,
                    res1 = 0,
                    res2 = 0
                }).ToArray();
                db.WaterHistory.AddRange(dbEntities);
                db.SaveChanges();
                LogModel[] dbEntitieslogs = data.Select(m => new LogModel
                {
                    id = m.id,
                    username = "Operator",
                    meter_id = m.meter_id,
                    operation = m.target,
                    ip_adress = "",
                    machine_nm = "",
                    date = DateTime.Now.ToString("M/d/yyyy"),
                    time = DateTime.Now.ToString("hh:ss")
                }).ToArray();
                db.Logs.AddRange(dbEntitieslogs);
                db.SaveChanges();
                return Json("Ok", JsonRequestBehavior.AllowGet);
            }

        }

        #endregion

        #region OperationsWaterCheck

        public JsonResult OperationsWaterCheck(string operator_id, string operation_id)
        {
            var db = new DCUContext();
            //int count = (from historyData in db.GasHistory where historyData.operator_id == operator_id && historyData.operation_id == operation_id select new { historyData.meter_id }).Count();
            int count_2 = (from historyData in db.WaterHistory where historyData.operator_id == operator_id && historyData.operation_id == operation_id && historyData.result == "done" select new { historyData.meter_id }).Count();
            if (count_2 > 0)
            {
                return Json(operation_id, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("no", JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region ReturnWaterTaskResult

        public JsonResult ReturnWaterTaskResult(string operator_id, string operation_id)
        {
            var db = new DCUContext();
            query = from historyData in db.GasHistory
                    join meters in db.WaterMeter on historyData.meter_id equals meters.meter_id
                    join dcu in db.Cons on meters.dcu_id equals dcu.dcu_nm
                    join dcu_info in db.Tree on dcu.group_id equals dcu_info.id
                    where historyData.operator_id == operator_id && historyData.operation_id == operation_id && historyData.result == "done"
                    select new
                    {
                        historyData.dt,
                        historyData.real_value,
                        group_nm=dcu_info.name,
                        meters.meter_id,
                        meters.address,
                        meters.consumer,
                        historyData.operator_id,
                        historyData.operation_id,
                        historyData.dcu_id,
                        historyData.target,
                        historyData.battery_level,
                        magnet = historyData.magnet,
                        ltnm = historyData.ltnm,
                        rsb = historyData.rsb,
                        ova = historyData.ova,
                        lf = historyData.lf,
                        rs = historyData.rs,
                        te = historyData.te,
                        lb = historyData.lb,
                        biltcvt = historyData.biltcvt,
                        overdraft = historyData.overdraft,
                        eeprom_error = historyData.ee,
                        bine = historyData.bine,
                        lbe = historyData.lbe,
                        mme = historyData.mme,
                        res1 = historyData.res1,
                        res2 = historyData.res2
                    };
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #endregion


    }
}