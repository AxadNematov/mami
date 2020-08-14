using mami.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;
using System.Data.OleDb;
using asp_mvc_proj.Models;
using ClosedXML.Excel;
using Newtonsoft.Json;
using System.Text.RegularExpressions;


namespace asp_mvc_proj.Controllers
{
    public class TreeController : Controller
    {
        //private SqlConnection con;
        // GET: Tree
        //public JsonResult Tree() {
        //    //IQueryable<DCUInfoModel> query;
        //    var db = new DCUContext();
        //    var query = from t in db.DCUInfo select new { t.group_id, t.parent_id, t.group_nm, t.group_gb};
        //    //DCUInfoModel[] arr_result = query.ToArray();
        //    //string s = arr_result[1].group_nm;
        //    return Json(query, JsonRequestBehavior.AllowGet);
        //}

        //public JsonResult Tree()
        //{
        //    var db = new DCUContext();
        //    var query = from t in db.DCUInfo
        //                    //select new {t.group_id, t.parent_id, t.group_nm, t.group_gb, dcu_id = (from k in db.DCUs where (from t6 in db.DCUInfo where (from t7 in db.DCUInfo where (from t8 in db.DCUInfo select t8.group_id).Contains(t7.parent_id) select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(t.group_id) select k.dcu_id).Contains(t.group_id) };
        //                select new { t.group_id, t.parent_id, t.group_nm, t.group_gb, dcu_id = from k in db.DCUs where k.group_id == t.group_id select k.dcu_id + "|" + k.dcu_nm + "|" + k.group_id };
        //    return Json(query, JsonRequestBehavior.AllowGet);
        //}
        TreeReady[] tree_arr;
        List<string> cycle;
        List<string> cycle_1;
        public class TreeReady
        {
            public string id { get; set; }
            public string parent { get; set; }
            public string text { get; set; }
            public string icon { get; set; }
            public int gb { get; set; }
            public string gr_id { get; set; }
            public string dcu_id { get; set; }
            public string soato { get; set; }

        }

        public JsonResult Tree(string id, int group_gb, string type_switch)
        {
            var db = new DCUContext();


            if (group_gb == 5)
            {
                cycle = new List<string>();
                cycle_1 = new List<string>();
                var result = (from t in db.Tree
                              where t.type==type_switch
                              select new
                              {
                                  t.id,
                                  t.parent_id,
                                  t.name,
                                  t.soato,
                                  t.code,
                                  t.group_gb,
                              }).Distinct().ToArray();
                var dcu = (from dcus in db.Cons
                           join tree in db.Tree on dcus.group_id equals tree.id
                           where  tree.type==type_switch
                           select new
                           {
                               dcus.dcu_id,
                               dcus.dcu_nm,
                               dcus.group_id,
                           }).Distinct().ToArray();
                foreach(var val in dcu)
                {
                    cycle_1.Add(val.ToString().Substring(2, 1));
                }
                foreach (var var in result)
                {
                    cycle.Add(var.ToString().Substring(11, 10));

                }
                tree_arr = new TreeReady[cycle.Count+cycle_1.Count];
                int n = 0;
                int a = 0;
                for (a = 0; a < cycle.Count; a++)
                {
                    tree_arr[n] = new TreeReady();

                    tree_arr[n].id = result[a].id;

                    if (result[a].parent_id == null)
                    {
                        tree_arr[n].parent = "#";
                    }
                    else
                    {
                        tree_arr[n].parent = result[a].parent_id;
                    }

                    tree_arr[n].text = result[a].name;

                    if (result[a].group_gb == 0)
                    {
                        tree_arr[n].icon = "./Content/files/tree_root2.png";
                    }
                    if (result[a].group_gb == 1)
                    {
                        tree_arr[n].icon = "./Content/files/tree_ptes2.png";
                    }
                    if (result[a].group_gb == 2)
                    {
                        tree_arr[n].icon = "./Content/files/tree_ptes2.png";
                    }
                    if (result[a].group_gb == 3)
                    {
                        tree_arr[n].icon = "./Content/files/tree_res2.png";
                    }
                    if (result[a].group_gb == 4)
                    {
                        tree_arr[n].icon = "./Content/files/tree_tp6.png";
                    }
                    tree_arr[n].gb = result[a].group_gb;
                    tree_arr[n].gr_id = result[a].id;
                    tree_arr[n].soato = result[a].soato;
                    n++;
                }
                int k = 0;
                for (k = 0; k < cycle_1.Count; k++)
                {
                            tree_arr[n] = new TreeReady();

                            tree_arr[n].id = dcu[k].dcu_id;
                            tree_arr[n].parent = dcu[k].group_id;
                            tree_arr[n].text = dcu[k].dcu_id + " " + dcu[k].dcu_nm;
                            tree_arr[n].icon = "./Content/files/pulse3.gif";
                            tree_arr[n].gb = 5;
                            tree_arr[n].gr_id = dcu[k].group_id;
                            tree_arr[n].dcu_id = dcu[k].dcu_id;
                            n++;                        
                }

            }
            else
            {
                cycle = new List<string>();
                cycle_1 = new List<string>();
                var result = (from t in db.Tree
                             where t.id == id || (t.parent_id == id) || ((from t1 in db.Tree where t1.parent_id == id select t1.id).Contains(t.parent_id)) || ((from t6 in db.Tree where (from t7 in db.Tree where (from t8 in db.Tree where t8.parent_id == id select t8.id).Contains(t7.parent_id) select t7.id).Contains(t6.parent_id) select t6.id).Contains(t.id)) || ((from t11 in db.Tree where (from t12 in db.Tree where (from t13 in db.Tree where (from t14 in db.Tree where t14.parent_id == id select t14.id).Contains(t13.parent_id) select t13.id).Contains(t12.parent_id) select t12.id).Contains(t11.parent_id) select t11.id).Contains(t.id))
                             select new
                             {
                                 t.id,
                                 t.parent_id,
                                 t.name,
                                 t.group_gb,
                                 t.soato
                             }).Distinct().ToArray();

                var dcu = (from dcus in db.Cons
                           join tree in db.Tree on dcus.group_id equals tree.id
                           where tree.parent_id==id && tree.id==dcus.group_id ||(from t1 in db.Tree where(from t2 in db.Tree where t2.parent_id==id select t2.id).Contains(t1.parent_id) select t1.id).Contains(dcus.group_id) || ((from t6 in db.Tree where (from t7 in db.Tree where (from t8 in db.Tree where t8.parent_id == id select t8.id).Contains(t7.parent_id) select t7.id).Contains(t6.parent_id) select t6.id).Contains(dcus.group_id)) || ((from t11 in db.Tree where (from t12 in db.Tree where (from t13 in db.Tree where (from t14 in db.Tree where t14.parent_id == id select t14.id).Contains(t13.parent_id) select t13.id).Contains(t12.parent_id) select t12.id).Contains(t11.parent_id) select t11.id).Contains(dcus.group_id))
                           select new
                           {
                               dcus.dcu_id,
                               dcus.dcu_nm,
                               dcus.group_id,
                           }).Distinct().ToArray();
                foreach (var val in dcu)
                {
                    cycle_1.Add(val.ToString().Substring(2, 1));
                }
                foreach (var var in result)
                {
                    cycle.Add(var.ToString().Substring(11, 10));

                }
                tree_arr = new TreeReady[cycle.Count + cycle_1.Count];
                int n = 0;
                int a = 0;
                for (a = 0; a < cycle.Count; a++)
                {
                    tree_arr[n] = new TreeReady();

                    tree_arr[n].id = result[a].id;

                    if (result[a].parent_id == null)
                    {
                        tree_arr[n].parent = "#";
                    }
                    else
                    {
                        if(result[a].id==id) 
                        {
                            tree_arr[n].parent = "#";
                        }
                        else {
                            tree_arr[n].parent = result[a].parent_id;
                        }
                        
                    }

                    tree_arr[n].text = result[a].name;

                    if (result[a].group_gb == 0)
                    {
                        tree_arr[n].icon = "./Content/files/tree_root2.png";
                    }
                    if (result[a].group_gb == 1)
                    {
                        tree_arr[n].icon = "./Content/files/tree_ptes2.png";
                    }
                    if (result[a].group_gb == 2)
                    {
                        tree_arr[n].icon = "./Content/files/tree_ptes2.png";
                    }
                    if (result[a].group_gb == 3)
                    {
                        tree_arr[n].icon = "./Content/files/tree_res2.png";
                    }
                    if (result[a].group_gb == 4)
                    {
                        tree_arr[n].icon = "./Content/files/tree_tp6.png";
                    }
                    tree_arr[n].gb = result[a].group_gb;
                    tree_arr[n].gr_id = result[a].id;
                    tree_arr[n].soato = result[a].soato;
                    n++;
                }
                int k = 0;
                for (k = 0; k < cycle_1.Count; k++)
                {

                    tree_arr[n] = new TreeReady();

                    tree_arr[n].id = dcu[k].dcu_id;
                    tree_arr[n].parent = dcu[k].group_id;
                    tree_arr[n].text = dcu[k].dcu_id + " " + dcu[k].dcu_nm;
                    tree_arr[n].icon = "./Content/files/pulse3.gif";
                    tree_arr[n].gb = 5;
                    tree_arr[n].gr_id = dcu[k].group_id;
                    tree_arr[n].dcu_id = dcu[k].dcu_id;
                    n++;

                }
            }


            return Json(tree_arr, JsonRequestBehavior.AllowGet);
        }



        public JsonResult BuildServerTree()
        {
            var db = new DCUContext();
            var query = from t in db.DCUInfo select new { id = t.group_id, parent = t.parent_id, text = t.group_nm, icon = t.group_gb == 0 ? "./Content/files/tree_ptes.png" : t.group_gb == 1 ? "./Content/files/tree_res.png" : t.group_gb == 2 ? "./Content/files/tree_tp.png" : "./Content/files/tree_tp.png" };
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRegion(string gr_id, int gr_gb)
        {
            IQueryable query = null;
            var db = new DCUContext();
            if (gr_gb == 0)
            {
                query = from t in db.Tree
                        where t.id == gr_id
                        select new { t.id };
                
            }
            if (gr_gb == 1)
            {
                query = from t in db.Tree
                        where (from t1 in db.Tree where t1.id==gr_id select t1.parent_id).Contains(t.id)
                        select new { t.id };
                
            }
            if (gr_gb == 2)
            {
                query = from t in db.Tree
                        where (from t1 in db.Tree where (from t2 in db.Tree where t2.id == gr_id select t2.parent_id).Contains(t1.id) select t1.parent_id).Contains(t.id)
                        select new { t.id };
                
            }
            if (gr_gb == 3)
            {
                query = from t in db.Tree
                        where (from t1 in db.Tree where (from t2 in db.Tree where (from t3 in db.Tree where t3.id==gr_id select t3.parent_id).Contains(t2.id) select t2.parent_id).Contains(t1.id) select t1.parent_id).Contains(t.id)
                        select new { t.id };
                
            }
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMetersByTree(string group_id = "G000000000", int group_gb = 0)
        {
            IQueryable query = null;
            var db = new DCUContext();
            if (group_gb == 0)
            {
                query = from t0 in db.Meters
                        join t1 in db.DCUs on t0.dcu_id equals t1.dcu_id
                        join t2 in db.DCUInfo on t1.group_id equals t2.group_id
                        where (from t6 in db.DCUInfo where (from t7 in db.DCUInfo where (from t8 in db.DCUInfo where t8.parent_id == group_id select t8.group_id).Contains(t7.parent_id) select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(t2.group_id) && t0.use_yn == "1"
                        select new { t0.meter_id };
            }
            else if (group_gb == 1)
            {
                query = from t0 in db.Meters
                        join t1 in db.DCUs on t0.dcu_id equals t1.dcu_id
                        join t2 in db.DCUInfo on t1.group_id equals t2.group_id
                        where (from t6 in db.DCUInfo where (from t7 in db.DCUInfo where t7.parent_id == group_id select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(t2.group_id) && t0.use_yn == "1"
                        select new { t0.meter_id };
            }
            else if (group_gb == 2)
            {

                query = from t0 in db.Meters
                        join t1 in db.DCUs on t0.dcu_id equals t1.dcu_id
                        join t2 in db.DCUInfo on t1.group_id equals t2.group_id
                        where (from t6 in db.DCUInfo where t6.parent_id == group_id select t6.group_id).Contains(t2.group_id) && t0.use_yn == "1"
                        select new { t0.meter_id };
            }

            return Json(query, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDCUByTree(string group_id, int group_gb)
        {
            IQueryable query = null;
            var db = new DCUContext();
            if(group_gb == 5)
            {
                query = from t1 in db.Cons
                        join t2 in db.Tree on t1.group_id equals t2.id
						where t1.use_yn == 1
                        select new { t1.dcu_id, t1.use_yn, t2.name, t1.dcu_nm, t1.model, t1.imei_no, t1.card_no, t1.install_dt };
            }
            if (group_gb == 0)
            {
                query = from t1 in db.Cons
                        join t2 in db.Tree on t1.group_id equals t2.id
                        where (from t6 in db.Tree where (from t7 in db.Tree where (from t8 in db.Tree where t8.parent_id == group_id select t8.id).Contains(t7.parent_id) select t7.id).Contains(t6.parent_id) select t6.id).Contains(t2.parent_id)
                        select new { t1.dcu_id, t1.use_yn, t2.name, t1.dcu_nm, t1.model, t1.imei_no, t1.card_no, t1.install_dt };
            }
            else if (group_gb == 1)
            {
                query = from t1 in db.Cons
                        join t2 in db.Tree on t1.group_id equals t2.id
                        where (from t6 in db.Tree where (from t7 in db.Tree where t7.parent_id == group_id select t7.id).Contains(t6.parent_id) select t6.id).Contains(t2.parent_id)
                        select new { t1.dcu_id, t1.use_yn, t2.name, t1.dcu_nm, t1.model, t1.imei_no, t1.card_no, t1.install_dt };
            }
            else if (group_gb == 2)
            {

                query = from t1 in db.Cons
                        join t2 in db.Tree on t1.group_id equals t2.id
                        where (from t6 in db.Tree where t6.parent_id == group_id select t6.id).Contains(t2.parent_id)
                        select new { t1.dcu_id, t1.use_yn, t2.name, t1.dcu_nm, t1.model, t1.imei_no, t1.card_no, t1.install_dt };
            }
            else if (group_gb == 3)
            {
                query = from t1 in db.Cons
                        join t2 in db.Tree on t1.group_id equals t2.id
                        where t2.parent_id == group_id
                        select new { t1.dcu_id, t1.use_yn, t2.name, t1.dcu_nm, t1.model, t1.imei_no, t1.card_no, t1.install_dt };
            }

            return Json(query, JsonRequestBehavior.AllowGet);
        }



    }
}