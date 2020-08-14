using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MitioGlobal.AutoMeterReader;
using mami.Models;
using mami.Controllers;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace mami.Controllers
{
    public class UserController : Controller
    {
        private SqlConnection con;

        public void writeLog(string user, string date, string time)
        {
            connection();
            SqlCommand com = new SqlCommand("INSERT INTO dbo.log (username, meter_id, operation, ip_adress, machine_nm, date, time) VALUES(@username, @meter_id, @operation, @ip_adress, @machine_nm, @date, @time)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@username", user);
            com.Parameters.AddWithValue("@meter_id", "");
            com.Parameters.AddWithValue("@operation", "in");
            com.Parameters.AddWithValue("@ip_adress", "");
            com.Parameters.AddWithValue("@machine_nm", "");
            com.Parameters.AddWithValue("@date", date);
            com.Parameters.AddWithValue("@time", time);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }

        public JsonResult Login(string login, string password)
        {
            DateTime dt = DateTime.Now;
            string date = dt.ToString("dd.MM.yyyy");
            string time = dt.ToString("HH:mm");
            var db = new DCUContext();
            var query = (from users in db.Users where users.login == login select users.password).ToArray();
            var username = (from users in db.Users where users.login == login && users.position!="warehouse" && users.position!="inspector" select new { users.user_nm, users.group_id, users.group_gb, users.parent_id, users.login, users.position, users.id }).ToArray();
            Crypto crypto = new Crypto();
            string pass = crypto.DecryptStringAES(query[0], "mitio");
            if (password == pass)
            {
                Session["name"] = username[0].login;             
                writeLog(username[0].login, date, time);
                return Json(username, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetParent(string group_id, int group_gb)
        {
            var db = new DCUContext();
            var query = from tree in db.Tree
                        where tree.id == group_id && tree.group_gb == group_gb 
                        select new { tree.parent_id };

            return Json(query, JsonRequestBehavior.AllowGet); 
        }
        public JsonResult SearchLogs(string login, string date, string operation)
        {
            var db = new DCUContext();
            var searchLog = from log in db.Logs where log.operation.Contains(operation) && log.date.Contains(date) && log.username.Contains(login)
                select new {
                    username = log.username,
                    meter_id = log.meter_id,
                    operation = log.operation,
                    ip_address = log.ip_adress,
                    machine = log.machine_nm,
                    date = log.date,
                    time = log.time,
                };
            return Json(searchLog, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUsers()
        {
            var db = new DCUContext();
            var users = from user in db.Users select new { user = user.login };
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUsername()
        {
            var user = Session["name"];
            return Json(user.ToString(), JsonRequestBehavior.AllowGet);
        }

        public void connection()
        {
            string constr = ConfigurationManager.ConnectionStrings["DCUContext"].ToString();
            con = new SqlConnection(constr);

        }

        public JsonResult CheckMeter(string meter_id)
        {
            var db = new DCUContext();
            var query = db.Meters.Where(p => p.meter_id == meter_id).Select(p => p.meter_id).Count();
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult CheckLogin(string login)
        //{
        //    var db = new DCUContext();
        //    var query = db.Users.Where(p => p.login == login).Select(p => p.login).Count();
        //    return Json(query, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult AddTreeItem(string group_id, string group_nm, int group_gb, string parent_id, string type)
        {
            connection();
            Crypto crypto = new Crypto();
            SqlCommand com = new SqlCommand("INSERT INTO dbo.tree (id, name, parent_id, group_gb, type) VALUES(@gr_id, @gr_nm, @parent_id, @gr_gb, @type)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@gr_id", group_id);
            com.Parameters.AddWithValue("@gr_nm", group_nm);
            com.Parameters.AddWithValue("@parent_id", parent_id);
            com.Parameters.AddWithValue("@gr_gb", group_gb);
            com.Parameters.AddWithValue("@type", type);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("Запись прошла успешно", JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddTreeItem1(string group_id, string group_nm, int group_gb, string type)
        {
            connection();
            Crypto crypto = new Crypto();
            SqlCommand com = new SqlCommand("INSERT INTO dbo.tree (id, name, group_gb, type) VALUES(@gr_id, @gr_nm, @gr_gb, @type)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@gr_id", group_id);
            com.Parameters.AddWithValue("@gr_nm", group_nm);
            com.Parameters.AddWithValue("@gr_gb", group_gb);
            com.Parameters.AddWithValue("@type", type);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("Запись прошла успешно", JsonRequestBehavior.AllowGet);
        }
        

        public JsonResult AddUser(string login, string password, string user_nm, string position, string group_id, int group_gb, string relay, string read_h, string read_c, string parent_id, string region)
        {
            connection();
            Crypto crypto = new Crypto();
            SqlCommand com = new SqlCommand("INSERT INTO dbo.users (login, password, user_nm, position, group_id, group_gb, relay, read_h, read_c, parent_id, region) VALUES(@login, @password, @user_nm, @position, @group_id, @group_gb, @relay, @read_h, @read_c, @parent_id, @region)", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@login", login);
            com.Parameters.AddWithValue("@password", crypto.EncryptStringAES(password, "mitio"));
            com.Parameters.AddWithValue("@user_nm", user_nm);
            com.Parameters.AddWithValue("@position", position);
            com.Parameters.AddWithValue("@group_id", group_id);
            com.Parameters.AddWithValue("@group_gb", group_gb);
            com.Parameters.AddWithValue("@relay", relay);
            com.Parameters.AddWithValue("@read_h", read_h);
            com.Parameters.AddWithValue("@read_c", read_c);
            com.Parameters.AddWithValue("@parent_id", parent_id);
            com.Parameters.AddWithValue("@region", region);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("Запись прошла успешно", JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLogin()
        {
            var db = new DCUContext();
            IQueryable query = null;
            query = from user in db.Users
                    where user != null
                    select new { user.login };
            return Json(query, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGroupId()
        {
            var db = new DCUContext();
            IQueryable query = null;
            query = from tree in db.Tree
                    where tree != null
                    select new { tree.id };
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllUsers1(string group_id, int group_gb, string parent_id)
        {
            var db = new DCUContext();
            IQueryable query = null;
            
            if(group_gb==2)
            {
                query = from u in db.Users
                        join tree in db.Tree on u.group_id equals tree.id
                        where u.group_id == group_id &&  u.parent_id==parent_id && u.group_gb == group_gb
                        select new { u.login, u.user_nm, u.position, u.relay, u.read_h, u.read_c, tree.name };
                return Json(query, JsonRequestBehavior.AllowGet);
            }
            if (group_gb == 1)
            {
                query = from u in db.Users
                        join tree in db.Tree on u.group_id equals tree.id
                        where u.group_id == group_id && u.parent_id == parent_id || (u.parent_id==group_id && u.group_gb==2)
                        select new { u.login, u.user_nm, u.position, u.relay, u.read_h, u.read_c, tree.name };
                return Json(query, JsonRequestBehavior.AllowGet);
            }
            if (group_gb == 0)
            {
                query = from u in db.Users
                        join tree in db.Tree on u.group_id equals tree.id
                        where u.group_id == group_id  || (u.parent_id==group_id && u.group_gb==1) || ((from tree in db.Tree where tree.parent_id==group_id select tree.id).Contains(u.parent_id) && u.group_gb==2)
                        select new { u.login, u.user_nm, u.position, u.relay, u.read_h, u.read_c, tree.name };
                return Json(query, JsonRequestBehavior.AllowGet);
            }
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckTreeChild(string group_id)
        {
            var db = new DCUContext();
            IQueryable query = null;
            query = from dcu in db.DCUInfo
                    where dcu.parent_id ==group_id
                    select new { dcu.group_id };
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteTreeItem(string group_id, int group_gb)
        {
                connection();
                SqlCommand com = new SqlCommand("DELETE FROM dbo.tree WHERE id = @gr_id", con);
                com.CommandType = CommandType.Text;
                com.Parameters.AddWithValue("@gr_gb", group_gb);
                com.Parameters.AddWithValue("@gr_id", group_id);
                con.Open();
                com.ExecuteNonQuery();
                con.Close();
                return Json("gfdgdfgdfg", JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteUser(string login)
        {
            connection();
            SqlCommand com = new SqlCommand("DELETE FROM dbo.users WHERE login = @login", con);
            com.CommandType = CommandType.Text;
            com.Parameters.AddWithValue("@login", login);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
            return Json("gfdgdfgdfg", JsonRequestBehavior.AllowGet);
        }

        //public JsonResult GetAllUsers()
        //{
        //    var db = new DCUContext();
        //    var query = (from users in db.Users select new { users.login, users.user_nm, users.position, users.group_id, users.group_gb, users.relay, users.read_h, users.read_c }).ToArray();
        //    return Json(query, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult GetAllUsers(string group_id, int group_gb, string login)
        {
            var db = new DCUContext();
            IQueryable query = null;
            if (group_gb == 0)
            {
                query = from t in db.Users
                        join k in db.DCUInfo on t.group_id equals k.group_id
                        where t.group_id == group_id && t.login == login || (t.parent_id == group_id && t.group_gb == 1) || ((from k in db.DCUInfo where k.parent_id == group_id select k.group_id).Contains(t.parent_id) && t.group_gb == 2)// || ((from t6 in db.DCUInfo where (from t7 in db.DCUInfo where (from t8 in db.DCUInfo where t8.parent_id == group_id select t8.group_id).Contains(t7.parent_id) select t7.group_id).Contains(t6.parent_id) select t6.group_id).Contains(t.group_id) && t.group_gb == 3)
                        select new { t.login, t.user_nm, t.position, t.group_id, parent_id = t.parent_id, t.group_gb, k.group_nm, t.relay, t.read_h, t.read_c };
            }
            else if (group_gb == 1)
            {
                query = from t in db.Users
                        join k in db.DCUInfo on t.group_id equals k.group_id
                        where t.group_id == group_id && t.login == login || (t.parent_id == group_id && t.group_gb == 2)// || ((from k in db.DCUInfo where k.parent_id == group_id select k.group_id).Contains(t.parent_id) && t.group_gb == 3)
                        select new { t.login, t.user_nm, t.position, t.group_id, parent_id = group_gb == 1 && t.group_id == group_id ? " " : t.parent_id, t.group_gb, k.group_nm, t.relay, t.read_h, t.read_c };
            }
            else if (group_gb == 2)
            {
                query = from t in db.Users
                        join k in db.DCUInfo on t.group_id equals k.group_id
                        where t.group_id == group_id && t.login == login //|| (t.parent_id == group_id && t.group_gb == 3)
                        select new { t.login, t.user_nm, t.position, t.group_id, parent_id = group_gb == 2 && t.group_id == group_id ? " " : t.parent_id, t.group_gb, k.group_nm, t.relay, t.read_h, t.read_c };
            }
            return Json(query, JsonRequestBehavior.AllowGet);
        }

    }
}