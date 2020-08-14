using mami.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace mami.Controllers
{
    
    public class HomeController : Controller
    {
        //[Authorize(Roles = "AllUsers")]
        public ActionResult Index()
        {
            return View();
        }


    }
}