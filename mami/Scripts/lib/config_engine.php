<?php
    if (!defined("PATH_SEPARATOR")) define("PATH_SEPARATOR", getenv("COMSPEC")? ";" : ":");
    ini_set("include_path", ini_get("include_path").PATH_SEPARATOR.dirname(__FILE__));

    require_once "lib/DbSimple/Generic.php";
    require_once "lib/Smarty/Smarty.class.php";
    require_once "lib/JsHttpRequest/JsHttpRequest.php";
    
    $dbhost="localhost";
    $dbname="MitioDB";
    $dblogin="root";
    $dbpass="";
    
    $DB = DbSimple_Generic::connect("mysql://$dblogin:$dbpass@$dbhost/$dbname");
    //$DB->setErrorHandler('databaseErrorHandler');
    //$DB->transaction();
    $DB->query("SET CHARACTER SET utf8");
    $DB->query("SET NAMES utf8");

    $smarty=new smarty();
    $smarty->compile_dir="{$_SERVER['DOCUMENT_ROOT']}/lib/tmp";
    
    $JsHttpRequest =& new JsHttpRequest("UTF-8");
?>