// Super Global Variables Definition //
var selected_dcu = "";
var selected_dt_m;
// meter table var (table1)
var cur_m_step = 1;
var load_m_res = [];
var arr_m = [];
var arr_m_res = [];
var arr_m_log = false;
var arr_m_rev_log = false;
var build_ml_log = false;
var m_ti;
var join_m_it;
var selected_tp;
//
// consumer table var (table1)
var c_cur_m_step = 1;
var c_load_m_res = [];
var c_arr_m = [];
var c_arr_m_res = [];
var c_arr_m_log = false;
var c_arr_m_rev_log = false;
var c_build_ml_log = false;
var c_m_ti;
var c_join_m_it;
var c_selected_tp;
//
// js Tree
var tree_ti;
var tree_global_arr = new Array;
//
//var meters_arr = new Array();
//var meters_arr;
var table1;
var table2;
//var cur_m_log1;
function MalibuLineTopOff() {
    $("#malibu_lt").css("background", "url('/Content/files/malibu_const_top.gif')");
    //$("#malibu_ll").css("background", "url('/Content/files/malibu_const_vert.gif')");
    //$("#malibu_lr").css("background", "url('/Content/files/malibu_const_vert.gif')");
}
function MalibuLineTopOn() {
    $("#malibu_lt").css("background", "url('/Content/files/malibu_run_top.gif')");
    //$("#malibu_ll").css("background", "url('/Content/files/malibu_run_vert.gif')");
    //$("#malibu_lr").css("background", "url('/Content/files/malibu_run_vert.gif')");
}
function MalibuLineSideOff() {
    $("#malibu_lt").css("background", "url('/Content/files/malibu_const_vert.gif')");
    //$("#malibu_ll").css("background", "url('/Content/files/malibu_const_vert.gif')");
    //$("#malibu_lr").css("background", "url('/Content/files/malibu_const_vert.gif')");
}
function MalibuLineSideOn() {
    $("#malibu_lt").css("background", "url('/Content/files/malibu_run_vert.gif')");
    //$("#malibu_ll").css("background", "url('/Content/files/malibu_run_vert.gif')");
    //$("#malibu_lr").css("background", "url('/Content/files/malibu_run_vert.gif')");
}
function LoadTree(result) {
    var n = 0;
    var i = 0;
    // group_gb 0 (node level)
    for (i = 0; i < result.length; i++) {
        var obj = {};
        if (result[i].group_gb == 0) {
            obj.id = result[i].group_id;
            obj.parent = "#";
            obj.text = result[i].group_nm;
            obj.icon = "./Content/files/tree_root2.png";
            obj.group_gb = result[i].group_gb;
            tree_global_arr[n] = obj;
            n++;
        }
    };
    // group_gb 1 (node level)
    for (i = 0; i < result.length; i++) {
        var obj = {};
        if (result[i].group_gb == 1) {
            obj.id = result[i].group_id;
            obj.parent = result[i].parent_id;
            obj.text = result[i].group_nm;
            obj.icon = "./Content/files/tree_ptes2.png";
            obj.group_db = result[i].group_gb;
            tree_global_arr[n] = obj;
            n++;
        }
    };
    // group_gb 2 (node level)
    for (i = 0; i < result.length; i++) {
        var obj = {};
        if (result[i].group_gb == 2) {
            obj.id = result[i].group_id;
            obj.parent = result[i].parent_id;
            obj.text = result[i].group_nm;
            obj.icon = "./Content/files/tree_res2.png";
            obj.group_db = result[i].group_gb;
            tree_global_arr[n] = obj;
            n++;
        }
    };
    // group_gb 3 (node level)
    for (i = 0; i < result.length; i++) {
        var obj = {};
        if (result[i].group_gb == 3) {
            obj.id = result[i].group_id;
            obj.parent = result[i].parent_id;
            obj.text = result[i].group_nm;
            obj.icon = "./Content/files/tree_tp4.png";
            obj.group_db = result[i].group_gb;
            tree_global_arr[n] = obj;
            n++;
        }
    };
}
function BuildTree() {
    //var arr = [
    //{ "id": "ajson1", "parent": "#", "text": "Simple root node", "icon": "./Content/files/tree_ptes.png" },
    //{ "id": "ajson2", "parent": "#", "text": "Root node 2", "icon": "./Content/files/tree_res.png" },
    //{ "id": "ajson3", "parent": "ajson2", "text": "Child 1", "icon": "./Content/files/tree_tp.png" },
    //{ "id": "ajson4", "parent": "ajson2", "text": "Child 2", "icon": "./Content/files/tree_tp.png" }
    //];
    //for (var i = 0; i < tree_global_arr.length; i++) {
    //    alert(tree_global_arr[i].id + " " + tree_global_arr[i].parent + " " + tree_global_arr[i].text + " " + tree_global_arr[i].icon + " ");
    //};
    if (tree_global_arr.length != 0) {
        $('#jstree').jstree({
            'core': {
                'data': tree_global_arr,
                "multiple": false,
                "animation": 1,
                "check_callback": true,
                "themes": { "stripes": true, "dots": true, "icons": true },
            },
            "plugins": [
                "html_data", "dnd", "search", "ui", "types", "wholerow"]
        });
        clearInterval(tree_ti);
    }
}
// DCU functions //
function LoadDCUList(dcu) {
    table1.clear().draw();
    var i = 0;
    while (i < dcu.length) {
        //alert(dcu[i].dcu_id);
        var stat;
        if (dcu[i].use_yn == "1"){
            stat = "<div class='dcu_stat_on'>"+dcu[i].use_yn+"</div>"
        }else{
            stat = "<div class='dcu_stat_usen'>"+dcu[i].use_yn+"</div>";
        }
        table1.row.add([
        i+1,
        stat,
        dcu[i].group_nm,
        dcu[i].dcu_id,
        dcu[i].dcu_nm,
        dcu[i].model,
        dcu[i].model,
        dcu[i].imei_no,
        //"123456789012345",
        dcu[i].card_no,
        //"+998 90 777-55-66",
        dcu[i].install_dt,
        //"18.12.2017"
        ]).draw();
        i++;
    }
}
function LoadDCUInfo(id) {
    $.ajax({
        type: "POST",
        url: "/DCU/GetOneDCU",
        data: '{id: "'+id+'" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result){
            //alert(result[0].dcu_id);
            $("#dcu_id").val(result[0].dcu_id);
            $("#dcu_nm").val(result[0].dcu_nm);
            $("#dcu_model").val(result[0].model);
            $("#dcu_type").val(result[0].model);
            $("#dcu_imei").val(result[0].imei_no);
            $("#dcu_ktp").val(result[0].group_nm);
            $("#dcu_grpid").val(result[0].group_id);
            $("#dcu_grpnm").val(result[0].group_nm);
            $("#dcu_place").val(result[0].install_place);
            $("#dcu_sim").val(result[0].card_no);
            $("#dcu_install_dt").val(result[0].card_no);
            $("#dcu_fmver").val(result[0].firmware_version);
            $("#dcu_install_dt").val(result[0].install_dt);
            $("#dcu_connect_dt").val(result[0].connection_dt);
            $("#dcu_check_dt").val(result[0].check_dt);
            $("#dcu_prod_dt").val(result[0].production_dt);
            if (result[0].use_yn == "1") {
                $("#dcu_stat").addClass("dcu_stat_on");
                $("#dcu_stat").removeClass("dcu_stat_usen");
            } else {
                $("#dcu_stat").addClass("dcu_stat_usen");
                $("#dcu_stat").removeClass("dcu_stat_on");
            }
        }
    })
}
function LoadMeterInfo(id) {
    $.ajax({
        type: "POST",
        url: "/Meter/GetMeterInfo",
        data: '{id: "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#m_type").val("Три фазы");
            $("#mt_tp").val(selected_tp);
            $("#mt_dcu").val(result[0].dcu_id);
            $("#mt_feeder_no").val(result[0].feeder_no);
            $("#mt_man_s_no").val(result[0].manu_sealno);
            $("#mt_uzgo_s_no").val(result[0].uzgo_sealno);
            $("#mt_res_s_no").val(result[0].res_sealn);
            $("#mt_cert_no").val(result[0].certification_no);
            $("#mt_inst_dt").val(result[0].install_dt);
            $("#mt_con_dt").val(result[0].connection_dt);
            $("#mt_check_dt").val(result[0].check_dt);
            $("#mt_discon_dt").val(result[0].shutdown_dt);
            $("#mt_remove_dt").val(result[0].removal_dt);
            $("#mt_man_dt").val(result[0].production_dt);
            $("#mt_start_val").val(result[0].production_dt);
            $("#mt_end_val").val(result[0].production_dt);
            $("#mt_trans_v").val("");
            $("#mt_trans_i").val("");
            if (result[0].phasetype == "1") {
                $("#m_type").val("pt1");
                //$('#m_type option:eq(0)').attr('selected', 'selected');
            } else {
                $("#m_type").val("pt3");
                //$('#m_type option:eq(1)').attr('selected', 'selected');
            }
            //
            $("#mt_m_id").val(result[0].meter_id);
            $("#mt_model").val(result[0].model);
            if (result[0].model_type == "V1") {
                $("#mt_m_v").val("v1");
            } else {
                $("#mt_m_v").val("v1");
            };
            $("#mt_protocol").val("prt3");
            switch (result[0].baudrate){
                case 0: $("#mt_bd_rate").val("300"); break;
                case 1: $("#mt_bd_rate").val("600"); break;
                case 2: $("#mt_bd_rate").val("1200"); break;
                case 3: $("#mt_bd_rate").val("2400"); break;
                case 4: $("#mt_bd_rate").val("4800"); break;
                case 5: $("#mt_bd_rate").val("7200"); break;
                case 6: $("#mt_bd_rate").val("9600"); break;
                case 7: $("#mt_bd_rate").val("19200"); break;
            }
            switch (result[0].comm_type) {
                case 0: $("#mt_conn_type").val("plc"); break;
                case 1: $("#mt_conn_type").val("rs485"); break;
                case 2: $("#mt_conn_type").val("ir"); break;
                case 3: $("#mt_conn_type").val("zigbee"); break;
                case 4: $("#mt_conn_type").val("rf"); break;
                case 5: $("#mt_conn_type").val("gprs"); break;
                case 6: $("#mt_conn_type").val("csd"); break;
            }
            $("#mt_port").val(result[0].com_port);
            $("#mt_s_no").val(result[0].serial_no);
            $("#mt_p_no").val(result[0].point_no);
            switch (result[0].tariff) {
                case 1: $("#mt_tarif").val("t1"); break;
                case 2: $("#mt_tarif").val("t2"); break;
                case 3: $("#mt_tarif").val("t3"); break;
                case 4: $("#mt_tarif").val("t4"); break;
            }
            $("#mt_pw").val(result[0].password);
            $("#mt_lnm").val(result[0].meter_nm);
            $("#mt_inst_addr").val(result[0].install_place);

        }
    })
}
function LoadMeters(id, date) {
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllMeters",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //load_m_res = result;
            //arr_m_log = false;
            if ((result.length > 0) || (result == "null")) {
                arr_m = result;
                arr_m_log = true;
            }
        }
    })
    // get all unread meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllMetersReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //arr_m_rev_log = false;
            if ((result.length > 0) || (result == "null")){
                arr_m_res = result;
                arr_m_rev_log = true;
            }
        }
    });
}

function DeployMeterList() {
    //selected_dt_m = "20180120";
    //alert("Running");
    LoadMeters(selected_dcu, selected_dt_m);
    if ((arr_m_log == true) && (arr_m_rev_log == true)) {
        //alert("arr_m    " + arr_m);
        //alert("arr_m_res    " + arr_m_res);
        clearInterval(join_m_it);
        table2.clear().draw();
        if (arr_m == "null") {
            load_m_res = arr_m_res;
            BuildMeterList();
            //alert("arr_m - null");
        }
        if (arr_m_res == "null") {
            load_m_res = arr_m;
            BuildMeterList();
            //alert("arr_m_res - null");
        }
        if ((arr_m != "null") && (arr_m_res != "null")) {
            load_m_res = arr_m.concat(arr_m_res);
            BuildMeterList();
            //alert("arr_m - null: arr_m_res - null");
        }
    }
    //alert("arr_m    " + arr_m.length + "     " + arr_m);
    //alert("arr_m_res    " + arr_m_res.length + "     " + arr_m_res);
    //alert("load_m_res    " + load_m_res.length + "     " + load_m_res);
}

function BuildMeterList() {
    //alert("Start build");
    $("#datatable2").scrollTop(0);
    //build_ml_log = false;
    cur_m_step = 1;
    var stat;
    var on_off;
    var rm;
    var rm2;
    var i = 0;
    while (i < 20) {
        on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
        if (load_m_res[i].use_yn == "1") {
            stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
        } else {
            stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
            on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
        }
        if (!load_m_res[i].pat) {
            rm = "<div class='text_yellow'>00.00</div>";
            rm2 = "<div class='text_red'>00.00</div>";
        } else {
            rm = "<div class='text_green'>" + load_m_res[i].pat + "</div>";
            rm2 = "<div class='text_red'>" + load_m_res[i].pat + "</div>";
        };
        table2.row.add([
        table2.rows().count() + 1,
        "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
        stat,
        on_off,
        load_m_res[i].group_nm,
        load_m_res[i].dcu_id,
        load_m_res[i].meter_id,
        load_m_res[i].point_no,
        load_m_res[i].meter_nm,
        load_m_res[i].install_place,
        $("#met_day_date").val(),
        rm,
        "00.00",
        "00.00",
        rm2,
        "<div class='text_red'>00.00</div>",
        "<div class='text_blue'>00.00</div>",
        "<div class='text_blue'>00.00</div>",
        "0000000"
        ]).draw();
        i++;
    };
    //build_ml_log = true;

    //clearInterval(m_ti);
}

function LoadConsumerMeters(id, date) {
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllMeters",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //load_m_res = result;
            //arr_m_log = false;
            if ((result.length > 0) || (result == "null")) {
                c_arr_m = result;
                c_arr_m_log = true;
            }
        }
    })
    // get all unread meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllMetersReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //arr_m_rev_log = false;
            if ((result.length > 0) || (result == "null")) {
                c_arr_m_res = result;
                c_arr_m_rev_log = true;
            }
        }
    });
}

function DeployConsumerList() {
    //selected_dt_m = "20180120";
    //alert("Running");
    LoadConsumerMeters(selected_dcu, selected_dt_m);
    if ((c_arr_m_log == true) && (c_arr_m_rev_log == true)) {
        //alert("arr_m    " + arr_m);
        //alert("arr_m_res    " + arr_m_res);
        clearInterval(c_join_m_it);
        table3.clear().draw();
        if (c_arr_m == "null") {
            c_load_m_res = c_arr_m_res;
            BuildConsumerList();
            //alert("arr_m - null");
        }
        if (c_arr_m_res == "null") {
            c_load_m_res = c_arr_m;
            BuildConsumerList();
            //alert("arr_m_res - null");
        }
        if ((c_arr_m != "null") && (c_arr_m_res != "null")) {
            c_load_m_res = c_arr_m.concat(c_arr_m_res);
            BuildConsumerList();
            //alert("arr_m - null: arr_m_res - null");
        }
    }
    //alert("arr_m    " + arr_m.length + "     " + arr_m);
    //alert("arr_m_res    " + arr_m_res.length + "     " + arr_m_res);
    //alert("load_m_res    " + load_m_res.length + "     " + load_m_res);
}

function BuildConsumerList() {
    //alert("Start build");
    $("#datatable3").scrollTop(0);
    //build_ml_log = false;
    c_cur_m_step = 1;
    var stat;
    var on_off;
    var rm;
    var rm2;
    var i = 0;
    while (i < 20) {
        //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
        //if (load_m_res[i].use_yn == "1") {
        //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
        //} else {
        //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
        //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
        //}
        //if (!load_m_res[i].pat) {
        //    rm = "<div class='text_yellow'>00.00</div>";
        //    //rm2 = "<div class='text_red'>00.00</div>";
        //} else {
        //    rm = "<div class='text_green'>" + load_m_res[i].pat + "</div>";
        //    //rm2 = "<div class='text_red'>" + load_m_res[i].pat + "</div>";
        //};
        //table2.row.add([
        //table2.rows().count() + 1,
        //"<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
        //stat,
        //on_off,
        //load_m_res[i].meter_id,
        //load_m_res[i].meter_nm,
        //load_m_res[i].install_place,
        //"000000000",
        //load_m_res[i].meter_nm,
        //load_m_res[i].install_place,
        //$("#met_day_date").val(),
        //rm,
        //"00.00",
        //"00.00",
        //rm2,
        //"<div class='text_red'>00.00</div>",
        //"<div class='text_blue'>00.00</div>",
        //"<div class='text_blue'>00.00</div>",
        //"0000000"
        //]).draw();
        i++;
    };
    //build_ml_log = true;

    //clearInterval(m_ti);
}

function GetMetersCount(id, date) {
    cur_m_total_steps = 0;
    $.ajax({
        type: "POST",
        url: "/Meter/GetMetersCount",
        data: '{dcu_id: "' + id + '", date: "' + date + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //cur_m_total_amount = result;
            cur_m_step = 1;
            cur_m_total_steps = result / 20;
            //alert(cur_m_step);
            cur_m_total_steps = Math.round(cur_m_total_steps) + 1;
            //alert(cur_m_step);
        }
    })
}
function TestPromise() {
    var LoadM_promise = new Promise(function (resolve, reject) {
        // do a thing, possibly async, then…
        //alert("The implementation of 'promise' construction itself");
        var a, b;
        a = 1;
        b = 1;
        if (a == b) {
            resolve("Stuff worked!");
        }
        else {
            reject(Error("It broke"));
        }
    });
}
$(document).ready(function () {
    var log1 = false;
    var log2 = false;
    var log3 = false;
    var n_gl = 0;

    $("#close_pw_wnd").click(function () {
        $("#form_change_pw").fadeOut(400);
    })
    $("#cdu_settings_close").click(function () {
        $("#cdu_settings").fadeOut(400);
    })
    $("#form_change_pw button:eq(1)").click(function () {
        $("#form_change_pw").fadeOut(400);
    })
    $("#form_change_pw").draggable();
    $("#cdu_settings").draggable();

    $("#dcu_set_open").click(function () {
        $("#cdu_settings").fadeIn(400);
    })
    //$(function() {
    //    $('#jstree').perfectScrollbar();
    //    // with vanilla JS!
    //    Ps.initialize(document.getElementById('jstree'));
    //});

    $("#hide_right_bar").click(function () {
        $("#rightm_div").fadeOut(700);
    })
    //setTimeout(progress1, 10);

    var tw = $("#hwnd").width();
    var a = tw / 2;
    var th = $("#hwnd").height();
    var b = (tw / 2) - 40;
    $("#scroll_l").css("left", a);
    $("#scroll_r").css("left", a + 40);
    $("#scroll_l").css("top", b);
    $("#scroll_r").css("top", b);


    $("#right_div").click(function () {
        //$("#left_div").fadeOut(200);
        //splitter.collapse(0);
        $("#right_div").hide(600);
        //alert();
    })

    $("#tree_show_btn").click(function () {
        if (log1 == false) {
            $(".splitter_panel .vsplitter").css("width", "0px");
            $("#tree_show_btn").css("margin-left", "3px");
            splitter.position(0);
            $("#table1").css("width", "100%");
            $("#table2").css("width", "130%");
            log1 = true;
        } else {
            $(".splitter_panel .vsplitter").css("width", "3px");
            splitter.position(331);
            $("#tree_show_btn").css("margin-left", "324px");
            log1 = false;
        }
    })

    $("#settings_show_btn").click(function () {
        if (log2 == false) {
            $("#rightm_div").fadeIn('slow');
            $(this).css("left", "69.2%");
            log2 = true;
        } else {
            //alert();
            $("#rightm_div").fadeOut('slow');
            $(this).css("left", "99.3%");
            log2 = false;
        }
    })
    $("#jstree_show_btn").click(function () {
        if (log3 == false) {
            $("#leftm_div").fadeIn('slow');
            $(this).css("left", "24%");
            log3 = true;
        } else {
            //alert();
            $("#leftm_div").fadeOut('slow');
            $(this).css("left", "4.1%");
            log3 = false;
        }
    })



    /////////////////////////////////////////////////////////////

    //////////////////////// Device Menu ///////////////////
    var cur_table = 0;
    $("#dcu").click(function () {
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        //table1.clear().draw();
        cur_m_step = 1;
        cur_m_log1 = 1;
        $.getJSON("/DCU/GetAllDCU", null, LoadDCUList);
        //$.getJSON("/Tree/Tree", null, LoadTree);
        //tree_ti = setInterval(BuildTree, 1000);
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div1").fadeIn("slow");
        $("#table1").css("width", "100%");
        $("#table1").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 600);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_dcu").css("display", "block");
        $("#det_met").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "-5000px");
    })
    $("#dcu").mouseover(function () {
        $("#dcu p").css("color", "#48abe1");
    })
    $("#dcu").mouseout(function () {
        $("#dcu p").css("color", "#fff");
    })

    $("#meter").click(function () {
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        $("#table_div1").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div2").fadeIn("slow");
        $("#table2").css("width", "150%");
        $("#table2").css("height", "100%");
        $("#table6").css("width", "150%");
        $("#table6").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_met").css("display", "block");
        $("#det_dcu").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#dropbox2_1 p").text("База данных");
        $("#details_pan").css("left", "-5000px");
    })
    $("#meter").mouseover(function () {
        $("#meter p").css("color", "#48abe1");
    })
    $("#meter").mouseout(function () {
        $("#meter p").css("color", "#fff");
    })
    $("#switch_re").click(function () {
        $(this).toggleClass("switch_re_r");
    })
    $("#met_event_rd2").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div7").fadeIn("slow");
        $("#table7").css("width", "200%");
        $("#table7").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        cur_table = 7;
        $("#scroll_l").css("display", "block");
        $("#scroll_r").css("display", "block");
        $("#rightm_div").css("display", "none");
        $("#met_event_rd2").removeAttr("checked");
    })
    $("#met2_event_rd2").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div7").fadeIn("slow");
        $("#table7").css("width", "200%");
        $("#table7").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        cur_table = 7;
        $("#scroll_l").css("display", "block");
        $("#scroll_r").css("display", "block");
        $("#rightm_div").css("display", "none");
        $("#met2_event_rd2").removeAttr("checked");
    })

    $("#consumer").click(function () {
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div3").fadeIn("slow");
        $("#table3").css("width", "100%");
        $("#table3").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_cons").css("display", "block");
        $("#det_met").css("display", "none");
        $("#det_dcu").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "-10000px");
        //$(".clk1").trigger('click');
        //alert();
    })
    $("#consumer").mouseover(function () {
        $("#consumer p").css("color", "#48abe1");
    })
    $("#consumer").mouseout(function () {
        $("#consumer p").css("color", "#fff");
    })

    $("#org").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div4").fadeIn("slow");
        $("#table4").css("width", "100%");
        $("#table4").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_struct").css("display", "block");
        $("#det_access").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_met").css("display", "none");
        $("#det_dcu").css("display", "none");
        $("#rightm_div").css("display", "none");
    })
    $("#org").mouseover(function () {
        $("#org p").css("color", "#ffd800");
    })
    $("#org").mouseout(function () {
        $("#org p").css("color", "#fff");
    })

    $("#access").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div5").fadeIn("slow");
        $("#table5").css("width", "100%");
        $("#table5").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_access").css("display", "block");
        $("#det_cons").css("display", "none");
        $("#det_met").css("display", "none");
        $("#det_dcu").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
    })
    $("#access").mouseover(function () {
        $("#access p").css("color", "#00ff05");
    })
    $("#access").mouseout(function () {
        $("#access p").css("color", "#fff");
    })

    $("#renergy").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div6").fadeIn("slow");
        $("#table6").css("width", "150%");
        $("#table6").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        cur_table = 6;
        $("#scroll_l").css("display", "block");
        $("#scroll_r").css("display", "block");
        $("#rightm_div").css("display", "none");
    })
    $("#renergy").mouseover(function () {
        $("#renergy p").css("color", "#c949e4");
    })
    $("#renergy").mouseout(function () {
        $("#renergy p").css("color", "#fff");
    })

    $("#mevent").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div7").fadeIn("slow");
        $("#table7").css("width", "200%");
        $("#table7").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        cur_table = 7;
        $("#scroll_l").css("display", "block");
        $("#scroll_r").css("display", "block");
        $("#rightm_div").css("display", "none");
    })
    $("#mevent").mouseover(function () {
        $("#mevent p").css("color", "#c949e4");
    })
    $("#mevent").mouseout(function () {
        $("#mevent p").css("color", "#fff");
    })
    $("#event_met_rd1").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div2").fadeIn("slow");
        $("#table2").css("width", "150%");
        $("#table2").css("height", "100%");
        $("#table6").css("width", "150%");
        $("#table6").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_met").css("display", "block");
        $("#det_dcu").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#dropbox2_1 p").text("Р‘Р°Р·Р° РґР°РЅРЅС‹С…");
        $("#details_pan").css("left", "-5000px");
        $("#event_met_rd1").removeAttr("checked");
    })

    $("#demand").mouseover(function () {
        $("#demand p").css("color", "#c949e4");
    })
    $("#demand").mouseout(function () {
        $("#demand p").css("color", "#fff");
    })

    $("#usage").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div8").fadeIn("slow");
        $("#table8").css("width", "100%");
        $("#table8").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#rightm_div").css("display", "none");
    })
    $("#usage").mouseover(function () {
        $("#usage p").css("color", "#c949e4");
    })
    $("#usage").mouseout(function () {
        $("#usage p").css("color", "#fff");
    })

    $("#conf").mouseover(function () {
        $("#conf p").css("color", "#00ff05");
    })
    $("#conf").mouseout(function () {
        $("#conf p").css("color", "#fff");
    })

    $("#pass").mouseover(function () {
        $("#pass p").css("color", "#00ff05");
    })
    $("#pass").mouseout(function () {
        $("#pass p").css("color", "#fff");
    })
    $("#pass").click(function () {
        $("#form_change_pw").fadeIn(400);
    })

    $("#btn_home").mouseover(function () {
        $("#btn_home p").css("color", "#ffd800");
    })
    $("#btn_home").mouseout(function () {
        $("#btn_home p").css("color", "#fff");
    })
    $("#btn_home").click(function () {
        $("#lm1").css("display", "none");
        $("#lm3").css("display", "none");
        $("#home").fadeIn(500);
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table1").css("width", "100%");
        $("#table1").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 600);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_dcu").css("display", "none");
        $("#det_met").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "-5000px");
    })

    $("#btn_system").mouseover(function () {
        $("#btn_system p").css("color", "#00ff05");
    })
    $("#btn_system").mouseout(function () {
        $("#btn_system p").css("color", "#fff");
    })

    $("#btn_hierar").mouseover(function () {
        $("#btn_hierar p").css("color", "#ffd800");
    })
    $("#btn_hierar").mouseout(function () {
        $("#btn_hierar p").css("color", "#fff");
    })

    $("#btn_device").mouseover(function () {
        $("#btn_device p").css("color", "#48abe1");
    })
    $("#btn_device").mouseout(function () {
        $("#btn_device p").css("color", "#fff");
    })

    $("#btn_read").mouseover(function () {
        $("#btn_read p").css("color", "#c949e4");
    })
    $("#btn_read").mouseout(function () {
        $("#btn_read p").css("color", "#fff");
    })

    $("#btn_online").mouseover(function () {
        $("#btn_online p").css("color", "#c949e4");
    })
    $("#btn_online").mouseout(function () {
        $("#btn_online p").css("color", "#fff");
    })
    $("#lesson").click(function () {
        //alert();
        $("#show_pic_video_back").css('display', 'block');
        $("#show_pic_video").css('display', 'block');
        //$("#show_pic_video").append('<embed id="player" flashvars="set_video1_url=http://mitio.mg/Content/files/t50.flv&set_title_text=MAMI&set_posterUrl=" style="display: block; margin-left: 30%; margin-top: 200px;" src="/lib/spruto/player.swf" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="360" />');
        $("#show_pic_video").css('opacity', '1');
    })
    $("#show_pic_video").click(function () {
        $(this).fadeOut('slow');
        $("#show_pic_video_back").fadeOut('slow');
        //$("#show_pic_video embed").remove();
    })
    //$("#show_pic_video").click(function(){
    //    $("#show_pic_video_back").fadeOut('fast');
    //    $(this).fadeOut('fast');
    //})
    var cur_val_t3;
    /////////////////////////// show rightm_div /////////////////////////////////
    //$("#table1 td").click(function () {
    //    $("#rightm_div").css('left', '74%');
    //    $("#rightm_div").css('width', '25%');
    //    $("#rightm_div").fadeIn(700);
    //});
    //$("#table1 td").dblclick(function () {
    //    $("#rightm_div").css("display", "none");
    //    $("#details_pan").css("left", "62px");
    //    $("#detail_pan_dcu").css("display", "block");
    //    $("#detail_pan_cons").css("display", "none");
    //    $("#detail_pan_met").css("display", "none");
    //    $("#detail_pan_tp").css("display", "none");

    //})
    $("#table2 td").click(function () {
        $("#rightm_div").css('left', '46%');
        $("#rightm_div").css('width', '53%');
        $("#rightm_div").fadeIn(700);
        DrawVector(0, 120, 240, 30, 80, 50);
    });
    $("#table2 td").dblclick(function () {
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_met").css("display", "block");
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_dcu").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
    })
    $("#table3 td").click(function () {
        //cur_val_t3 = $(this).html();
        //alert(cur_val_t3);
        //var Something = $(this).closest('tr').find('td:eq(1)').val();
        //alert(Something);
        //$("#rightm_div").fadeIn(700);
    });
    //$('#example tbody').on( 'click', 'td', function () {
    //    alert( table.cell( this ).data() );
    //});
    $("#table3 td").dblclick(function () {
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_cons").css("display", "block");
        $("#detail_pan_met").css("display", "none");
        $("#detail_pan_dcu").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
    });
    $("#dp_tp_table4 td").dblclick(function () {
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_met").css("display", "block");
        $("#detail_pan_dcu").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
    });

    $("#table4").click(function () {
        $("#rightm_div").fadeIn(700);
    });
    $("#table5").click(function () {
        $("#rightm_div").fadeIn(700);
    });

    //////////////////////////// Split div ///////////////////////////////////////
    var spl_h = $("#spl").css('height');
    var splitter = $('#spl').height(spl_h).split({
        orientation: 'vertical',
        limit: 0,
        position: '0%', // if there is no percentage it interpret it as pixels
        onDrag: function (event) {
            //ssconsole.log(splitter.position());
            //alert();
            $("#tree_show_btn").css("margin-left", splitter.position() - 7);
        }
    });
    /////////////////////////////////////////////////////////////////////////////

    //$.jstree.defaults.core.themes.variant = "small";
    //$.jstree.defaults.core.themes.stripes = true;
    //$.jstree.defaults.core.themes.variant = true;

    //$("#jstree").jstree({
    //  "plugins" : [ "wholerow", "checkbox", "types"]
    //});
    //$.jstree.defaults.core.themes.icons = true;
    //$.jstree.defaults.core.themes.stripes = true;
    //$.jstree.defaults.core.themes.ellipsis = true;
    //$.jstree.defaults.core.themes.dots = false;
    //$.jstree.defaults.core.expand_selected_onload = true;
    //$.jstree.defaults.core.themes.variant = "small";
    //$.jstree.defaults.checkbox.keep_selected_style = false;


    //     TREE VIEW LEFT     //
    $.getJSON("/Tree/Tree", null, LoadTree);
    tree_ti = setInterval(BuildTree, 1000);

    $('#jstree').on('changed.jstree', function (e, data) {
        // listen for event
        var i, j, r = [];
        for (i = 0, j = data.selected.length; i < j; i++) {
            r.push(data.instance.get_node(data.selected[i]).id);
        }
        //alert('Selected: ' + r.join(', '));
        //$("#rightm_div").css("display", "none");
        //$("#details_pan").css("left", "62px");
        //$("#detail_pan_tp").css("display", "block");
        //$("#detail_pan_dcu").css("display", "none");
        //$("#detail_pan_cons").css("display", "none");
        //$("#detail_pan_met").css("display", "none");
        //$('#tp_det_title').html(r.join(', '));
        //$('#home_title').html(r.join(', '));
        //alert(r.join(', '));
        //alert(data.selected);
    })
    var to = false;
    $('#search').keyup(function () {
        if (to) { clearTimeout(to); }
        to = setTimeout(function () {
            var v = $('#search').val();
            $('#jstree').jstree(true).search(v);
        }, 250);
    });



    /////////////////////////////

    $("#btn_system").click(function () {
        $("#lm2").hide();
        $("#lm3").hide();
        $("#lm4").hide();
        $("#lm1").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    })
    $("#btn_hierar").click(function () {
        $("#lm1").hide();
        $("#lm3").hide();
        $("#lm4").hide();
        $("#lm2").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    })
    $("#btn_device").click(function () {
        $("#lm1").hide();
        $("#lm2").hide();
        $("#lm4").hide();
        $("#lm3").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    });
    $("#btn_read").click(function () {
        $("#lm1").hide();
        $("#lm2").hide();
        $("#lm3").hide();
        $("#lm4").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    })
    $("#btn_online").click(function () {
        $("#contact").fadeToggle("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    })
    $("#send_on_p").click(function () {
        var on_text = $("#online_text").val();
        $("#online_text").val("");
        //alert(on_text);
        //$("#content").append('<p>'+on_text+'</p>');
        //$("#content").append('<p>'+'test'+'</p>');
    })
    function test_respond() {
        //$("#content").append('<div class="in_msg"><p>Р”РѕР±СЂС‹Р№ РґРµРЅСЊ! РњС‹ СЂР°СЃСЃРјРѕС‚СЂРёРј РІРѕР·РЅРёРєС€РёР№ РІРѕРїСЂРѕСЃ Рё РѕС‚РІРµС‚РёРј РІ РєСЂР°С‚С‡Р°Р№С€РёРµ СЃСЂРѕРєРё. </p>');
        $("#content").append('<div style="width: 100%; height: auto"><div class="in_msg"><p>Р”РѕР±СЂС‹Р№ РґРµРЅСЊ! РњС‹ СЂР°СЃСЃРјРѕС‚СЂРёРј РІРѕР·РЅРёРєС€РёР№ РІРѕРїСЂРѕСЃ Рё РѕС‚РІРµС‚РёРј РІ РєСЂР°С‚С‡Р°Р№С€РёРµ СЃСЂРѕРєРё. </p></div></div>');

        //code
    }
    $("#online_text").keypress(function (e) {
        if (e.which == 13) {
            var c = $(this).val();
            if (c != "") {
                $("#content").append('<div style="width: 100%; height: auto"><div class="out_msg"><p>' + c + '</p></div></div>');
                $(this).val("");
                setTimeout(test_respond, 3000);
            }
        }
    })
    ///////////////////////// Create and initialize table1 (DCU) ///////////////////////////////////
    var h = $("#table_div1").height();
    var i = (h % 35);
    //alert(i);
    table1 = $("#table1").DataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"pageLength": i,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": true }, { "width": "15%", "targets": 2 },
          { "width": "12%", "targets": 3 }, { "width": "15%", "targets": 4 }//, { "width": "15%", "targets": 6 }, { "width": "3%", "targets": 7 }, { "width": "3%", "targets": 8 }
        ],
        "select": {
            "style": "os",
            "2selector": "td:first-child"
        }
    });
    // Select row
    $("#table1 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table1.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        $("#rightm_div").css('left', '74%');
        $("#rightm_div").css('width', '25%');
        $("#rightm_div").fadeIn(700);
    });
    $("#table1").on("click", "td", function (event) {
        var current = table1.row(this).data();
        selected_dcu = current[3];
        selected_dt_m = "20171101";
        LoadDCUInfo(selected_dcu);
        GetMetersCount(selected_dcu, selected_dt_m);
        // load meters
        var dt = new Date();
        var dt_m = dt.getMonth() + 1;
        var dt_d = dt.getDate() - 2;
        var dt_y = dt.getFullYear();
        var fdt_m = dt_m;
        if (dt_m < 10) {
            fdt_m = "0" + fdt_m;
        }
        var fdt_d = dt_d;
        if (dt_d < 10) {
            fdt_d = "0" + fdt_d;
        }
        //alert(fdt_d + "." + fdt_m + "." + dt_y);
        //alert(dt_y + "" + fdt_m + "" + fdt_d);
        $("#met_day_date").val(fdt_d + "." + fdt_m + "." + dt_y);
        selected_dt_m = dt_y + "" + fdt_m + "" + fdt_d;
        //
        arr_m_log = false;
        arr_m_rev_log = false;
        arr_m = [];
        arr_m_res = [];
        load_m_res = [];
        //table2.clear().draw();
        join_m_it = setInterval(DeployMeterList, 1000);
    })
    $("#table1").on("dblclick", "td", function (event) {
        $("#rightm_div").css('display', 'none');
        $("#details_pan").css("left", "62px");
        $("#detail_pan_dcu").css("display", "block");
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_met").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '0');
    })
    ////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////// Create and initialize table2 (Meters) ///////////////////////////////////
    var h = $("#table_div2").height();
    var i = (h / 35);
    var z = i.toFixed(0) - 6;
    //alert(z);
    table2 = $("#table2").DataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"pageLength": 60,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "2%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2 }, { "width": "3%", "targets": 3, "orderable": false },
          { "width": "8%", "targets": 4 }, { "width": "6%", "targets": 5 }, { "width": "6%", "targets": 6 }, { "width": "5%", "targets": 7 },
          { "width": "10%", "targets": 8 }, { "width": "11%", "targets": 9 }, { "width": "6%", "targets": 10 }//, { "width": "8%", "targets": 11 },
          //{ "width": "50%", "targets": 12 }, //{ "width": "6%", "targets": 13 }, { "width": "6%", "targets": 14 }, { "width": "6%", "targets": 15 },
        //  { "width": "6%", "targets": 16 }, { "width": "6%", "targets": 17 }
        ]
    });
    // Select row
    $("#table2 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table2.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        $("#rightm_div").css('left', '47%');
        $("#rightm_div").css('width', '52%');
        $("#rightm_div").fadeIn(700);
        DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });

    $("#table2").on('click', 'td', function () {
        var current = table2.row(this).data();
        var selected_meter = current[6];
        selected_tp = current[4];
        //alert(selected_meter);
        LoadMeterInfo(selected_meter);
    })
    
    $("#test_dt").click(function () {
        //alert();
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "static");
    });

    $("#datatable2").scroll(function (event) {
        //load_m_res = arr_m.concat(arr_m_res);
        var s = $(this).scrollTop();
        //$("#test_dt").text(cur_m_step + " | " + Math.round(s));
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#t2_header_back").css('display', 'block');
            $("#t2_header_back").css('border-bottom', 'solid 1px #cecece');
            $("#table2 th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#t2_header_back").css('display', 'none');
            $("#table2 th").css('border-bottom', 'solid 1px #cecece');
        }
        if (s > (cur_m_step * 50)) {
            var i = table2.rows().count();
            var stat;
            var off;
            var rm;
            var rm2;
            var c = table2.rows().count();
            // adding to table2 items from load_m_res //
            while (i < (20 + c)) {
                on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                if (load_m_res[i].use_yn == "1") {
                    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                } else {
                    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                }
                if (!load_m_res[i].pat) {
                    rm = "<div class='text_yellow'>00.00</div>";
                    rm2 = "<div class='text_red'>00.00</div>";
                } else {
                    rm = "<div class='text_green'>" + load_m_res[i].pat + "</div>";
                    rm2 = "<div class='text_red'>" + load_m_res[i].pat + "</div>";
                };
                table2.row.add([
                table2.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                load_m_res[i].group_nm,
                load_m_res[i].dcu_id,
                load_m_res[i].meter_id,
                load_m_res[i].point_no,
                load_m_res[i].meter_nm,
                load_m_res[i].install_place,
                $("#met_day_date").val(),
                rm,
                "00.00",
                "00.00",
                rm2,
                "<div class='text_red'>00.00</div>",
                "<div class='text_blue'>00.00</div>",
                "<div class='text_blue'>00.00</div>",
                "0000000"
                ]).draw();
                i++;
            };
            //
            cur_m_step++;
        };
        //};
    });

    $("#table2").on("click", "td", function (event) {
        //var current = table2.row(this).data();
        //selected_dcu = current[3];
        //LoadDCUInfo(selected_dcu);
    })
    ///////////////////////////////////////////////////////////    

    ///////////////////////// Create and initialize table3 (Consumer) ///////////////////////////////////
    var h = $("#table_div3").height();
    var i = (h / 38);
    var z = i.toFixed(0) - 1;
    //alert(z);
    var table3 = $("#table3").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "2%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2, "orderable": false }, { "width": "8%", "targets": 3 },
          { "width": "10%", "targets": 4 }, { "width": "25%", "targets": 5 }, { "width": "30%", "targets": 6 }, { "width": "10%", "targets": 7 },
          { "width": "6%", "targets": 8 }, { "width": "6%", "targets": 9 }
        ]
    });
    // Select row
    $("#table3 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table3.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////    

    ///////////////////////// Create and initialize table4 (Organization) ///////////////////////////////////
    var h = $("#table_div4").height();
    var i = (h / 35);
    var z = i.toFixed(0) - 1;
    //alert(z);
    var table4 = $("#table4").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        "pageLength": z,
        "paging": true,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            { "width": "5%", "targets": 0 }, { "width": "35%", "targets": 1 }, { "width": "10%", "targets": 2 }, { "width": "10%", "targets": 3 },
            { "width": "35%", "targets": 4 }, { "width": "5%", "targets": 5 }
        ]
    });
    // Select row
    $("#table4 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table4.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    ///////////////////////////////////////////////////////////

    ///////////////////////// Create and initialize table5 (MAMI Access) ///////////////////////////////////
    var h = $("#table_div5").height();
    var i = (h / 35);
    var z = i.toFixed(0) - 1;
    //alert(z);
    var table5 = $("#table5").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"pageLength": z,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            { "width": "1%", "targets": 0, "orderable": false }, { "width": "15%", "targets": 1 }, { "width": "20%", "targets": 2 }, { "width": "20", "targets": 3 },
            { "width": "10%", "targets": 4 }, { "width": "20%", "targets": 5 }, { "width": "20%", "targets": 6 }
        ]
    });
    // Select row
    $("#table5 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table5.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    ///////////////////////////////////////////////////////////

    ///////////////////////// Create and initialize table6 (Reading Energy) ///////////////////////////////////
    var h = $("#table_div6").height();
    var i = (h / 35);
    var z = i.toFixed(0) - 6;
    //alert(z);
    var table6 = $("#table6").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2, "orderable": false }, { "width": "3%", "targets": 3, "orderable": false },
        //  { "width": "7%", "targets": 4 }, { "width": "7%", "targets": 5 }, { "width": "20%", "targets": 6 }, { "width": "35%", "targets": 7 },
        //  { "width": "6%", "targets": 8 }, { "width": "6%", "targets": 9 }, { "width": "6%", "targets": 10 }, { "width": "6%", "targets": 11 },
        //  { "width": "6%", "targets": 12 }, { "width": "6%", "targets": 13 }, { "width": "6%", "targets": 14 }, { "width": "6%", "targets": 15 },
        //  { "width": "6%", "targets": 16 }, { "width": "6%", "targets": 17 }
        ]
    });
    // Select row
    $("#table6 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            //table6.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    /////////////////////////////////////////////////////////

    ///////////////////////// Create and initialize table7 (Meter Event) ///////////////////////////////////
    var h = $("#table_div7").height();
    var i = (h / 35);
    var z = i.toFixed(0) - 1;
    //alert(z);
    var table7 = $("#table7").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2, "orderable": false }, { "width": "1%", "targets": 3 },
            //{ "width": "2%", "targets": 4 }, { "width": "3%", "targets": 5 }, { "width": "4%", "targets": 6}, { "width": "4%", "targets": 7},
            //{ "width": "5%", "targets": 8}, { "width": "3%", "targets": 9}, { "width": "3%", "targets": 10}, { "width": "3%", "targets": 11},
            //{ "width": "3%", "targets": 12}, { "width": "3%", "targets": 13}, { "width": "3%", "targets": 14}, { "width": "3%", "targets": 15},
            //{ "width": "3%", "targets": 16}, { "width": "3%", "targets": 17}, { "width": "3%", "targets": 18}, { "width": "3%", "targets": 19},
            //{ "width": "3%", "targets": 20}, { "width": "3%", "targets": 21}
        ]
    });
    // Select row
    $("#table7 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table6.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    /////////////////////////////////////////////////////////

    ///////////////////////// Create and initialize table8 (Energy Usage) ///////////////////////////////////
    var h = $("#table_div8").height();
    var i = (h / 35);
    var z = i.toFixed(0) - 1;
    //alert(z);
    var table8 = $("#table8").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        "pageLength": z,
        "paging": true,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            { "width": "5%", "targets": 0 }, { "width": "5%", "targets": 1 }, { "width": "10%", "targets": 2 }, { "width": "5%", "targets": 3 },
            { "width": "5%", "targets": 4 }, { "width": "3%", "targets": 5 }, { "width": "20%", "targets": 6 }
        ]
    });
    // Select row
    $("#table8 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table8.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    /////////////////////////////////////////////////////////

    //$(function() {
    //    $("#table_div2").perfectScrollbar();
    //    // with vanilla JS!
    //    Ps.initialize(document.getElementById("table_div2"));
    //});


    ////////////////// Drop menus on top and inputs //////////////////
    ///// data type select menu (Meters) //////
    var dd2_1 = 0;
    $("#dropbox2_1").click(function () {
        $("#dropdown2_1").slideToggle(400);
    })
    $("#dropdown2_1 p").click(function () {
        $("#dropdown2_1").slideUp(400);
        if ($(this).text() == "База данных") {
            dd2_1 = 1;
            $("#dropbox2_1 p").text("База данных");
            $("#dropbox6_1 p").text("База данных");
            $("#table_div2").css("display", "block");
            $("#table_div6").css("display", "none");
            $("#scroll_l").css("display", "none");
            $("#scroll_r").css("display", "none");
            cur_table = 2;
        }
        if ($(this).text() == "Память концентратора") {
            dd2_1 = 2;
            $("#dropbox2_1 p").text("Память концентратора");
            $("#dropbox6_1 p").text("Память концентратора");
            $("#table_div2").css("display", "none");
            $("#table_div6").css("display", "block");
            $("#scroll_l").css("display", "block");
            $("#scroll_r").css("display", "block");
            cur_table = 6;
        }
        if ($(this).text() == "Память счетчика") {
            dd2_1 = 3;
            $("#dropbox2_1 p").text("Память счетчика");
            $("#dropbox6_1 p").text("Память счетчика");
            $("#table_div2").css("display", "none");
            $("#table_div6").css("display", "block");
            $("#scroll_l").css("display", "block");
            $("#scroll_r").css("display", "block");
            cur_table = 6;
        }
        if ($(this).text() == "Текущие показания") {
            dd2_1 = 4;
            $("#dropbox2_1 p").text("Текущие показания");
            $("#dropbox6_1 p").text("Текущие показания");
            $("#table_div2").css("display", "none");
            $("#table_div6").css("display", "block");
            $("#scroll_l").css("display", "block");
            $("#scroll_r").css("display", "block");
            cur_table = 6;
        }
    })

    $("#dropbox6_1").click(function () {
        $("#dropdown6_1").slideToggle(400);
    })
    $("#dropdown6_1 p").click(function () {
        $("#dropdown6_1").slideUp(400);
        if ($(this).text() == "База данных") {
            dd2_1 = 1;
            $("#dropbox6_1 p").text("База данных");
            $("#dropbox2_1 p").text("База данных");
            $("#table_div2").css("display", "block");
            $("#table_div6").css("display", "none");
            $("#scroll_l").css("display", "none");
            $("#scroll_r").css("display", "none");
            cur_table = 2;
        }
        if ($(this).text() == "Память концентратора") {
            dd2_1 = 2;
            $("#dropbox6_1 p").text("Память концентратора");
            $("#dropbox2_1 p").text("Память концентратора");
            $("#table_div2").css("display", "none");
            $("#table_div6").css("display", "block");
            $("#scroll_l").css("display", "block");
            $("#scroll_r").css("display", "block");
            cur_table = 6;
        }
        if ($(this).text() == "Память счетчика") {
            dd2_1 = 3;
            $("#dropbox6_1 p").text("Память счетчика");
            $("#dropbox2_1 p").text("Память счетчика");
            $("#table_div2").css("display", "none");
            $("#table_div6").css("display", "block");
            $("#scroll_l").css("display", "block");
            $("#scroll_r").css("display", "block");
            cur_table = 6;
        }
        if ($(this).text() == "Текущие показания") {
            dd2_1 = 4;
            $("#dropbox6_1 p").text("Текущие показания");
            $("#dropbox2_1 p").text("Текущие показания");
            $("#table_div2").css("display", "none");
            $("#table_div6").css("display", "block");
            $("#scroll_l").css("display", "block");
            $("#scroll_r").css("display", "block");
            cur_table = 6;
        }
    })

    $("#dropbox7_1").click(function () {
        $("#dropdown7_1").slideToggle(400);
    })

    $("#dropdown7_1 p").click(function () {
        $("#dropdown7_1").slideUp(400);
        if ($(this).text() == "База данных") {
            $("#dropbox7_1 p").text("Р‘Р°Р·Р° РґР°РЅРЅС‹С…");
            cur_table = 7;
        }
        if ($(this).text() == "РџР°РјСЏС‚СЊ РєРѕРЅС†РµРЅС‚СЂР°С‚РѕСЂР°") {
            $("#dropbox7_1 p").text("РџР°РјСЏС‚СЊ РєРѕРЅС†РµРЅС‚СЂР°С‚РѕСЂР°");
            cur_table = 7;
        }
    })

    $("#dropbox7_2").click(function () {
        $("#dropdown7_2").slideToggle(400);
    })

    $("#dropdown7_2 p").click(function () {
        $("#dropdown7_2").slideUp(400);
        if ($(this).text() == "РћС‚РєСЂС‹С‚Р° РєСЂР°С€РєР° Р·Р°Р¶РёРјРѕРІ") {
            $("#dropbox7_2 p").text("РћС‚РєСЂС‹С‚Р° РєСЂР°С€РєР° Р·Р°Р¶РёРјРѕРІ");
            cur_table = 8;
        }
        if ($(this).text() == "РћС‚РєСЂС‹С‚Р° РєСЂС‹С€РєР° С‚РµСЂРјРёРЅР°Р»Р°") {
            $("#dropbox7_2 p").text("РћС‚РєСЂС‹С‚Р° РєСЂС‹С€РєР° С‚РµСЂРјРёРЅР°Р»Р°");
            cur_table = 8;
        }
        if ($(this).text() == "Р РµР»Рµ РІС‹РєР»СЋС‡РµРЅРѕ") {
            $("#dropbox7_2 p").text("Р РµР»Рµ РІС‹РєР»СЋС‡РµРЅРѕ");
            cur_table = 8;
        }
        if ($(this).text() == "Р РµР»Рµ РІРєР»СЋС‡РµРЅРѕ") {
            $("#dropbox7_2 p").text("Р РµР»Рµ РІРєР»СЋС‡РµРЅРѕ");
            cur_table = 8;
        }
        if ($(this).text() == "РЎС‚РµСЂС‚С‹ РґР°РЅРЅС‹Рµ") {
            $("#dropbox7_2 p").text("РЎС‚РµСЂС‚С‹ РґР°РЅРЅС‹Рµ");
            cur_table = 8;
        }
    })

    ///////////////////////////////////////////////////////////

    $("#tab2_1").click(function () {
        $("#div2_1").css("display", "block");
        $("#div2_2").css("display", "block");
        $("#div2_3").css("display", "block");

        $("#div2_4").css("display", "none");
        $("#div2_5").css("display", "none");
        $(this).addClass("active_page");
        $(this).removeClass("nactive_page");
        $("#tab2_2").addClass("nactive_page");
        $("#tab2_2").removeClass("active_page");
        $("#btns2").css("margin-top", "40px");
    })
    $("#tab2_2").click(function () {
        $("#div2_1").css("display", "none");
        $("#div2_2").css("display", "none");
        $("#div2_3").css("display", "none");

        $("#div2_4").css("display", "block");
        $("#div2_5").css("display", "block");
        $(this).addClass("active_page");
        $(this).removeClass("nactive_page");
        $("#tab2_1").addClass("nactive_page");
        $("#tab2_1").removeClass("active_page");
        $("#btns2").css("margin-top", "84px");
    })


    ///////////////////////// Create and initialize dp_met_table (Energy Usage) ///////////////////////////////////
    //var h = $("#table_div8").height();
    //var i = (h/35);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table8 = $("#dp_met_table").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        "pageLength": 13,
        "paging": true,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            { "width": "0%", "targets": 0 }, { "width": "3%", "targets": 1 }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 },
            { "width": "1%", "targets": 4 }, { "width": "1%", "targets": 5 }, { "width": "1%", "targets": 6 }, { "width": "1%", "targets": 7 },
            { "width": "20%", "targets": 8 }, { "width": "20%", "targets": 9 }, { "width": "20%", "targets": 10 }, { "bSortable": false, "aTargets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
        ],
        ////
    });
    // Select row
    $("#dp_met_table tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table8.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    /////////////////////////////////////////////////////////

    /////////////////////////////////////////////////// Consumers ///////////////////////////////////////////////////
    // calendar for consumer table //3
    var log_cons_date2 = false;
    $(function () {
        // 24 hours //
        $("#cons_start_date_main").datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd/mm/yy',
        }).datepicker();
        $("#cons_end_date_main").datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd/mm/yy',
        }).datepicker();
    });

    $("#cons_start_date_main").datepicker({
        onClose: function () {
            $("#cons_end_date_main").datepicker("show");
        }
    });

    $("#cons_start_date_main").click(function () {
        $(this).val("");
        $("#cons_end_date_main").val("");
    })

    $("#cons_end_date_main").click(function () {
        $(this).val("");
        $("#cons_start_date_main").val("");
    })
    //$(function () {
    //    //
    //    $("#cons_start_date_main").click(function () {
    //        if (log_cons_date2 == false) {
    //            $(this).val("");
    //            $("#cons_end_date_main").val("");
    //            log_cons_date2 = true;
    //        }
    //    })
    //    $("#cons_end_date_main").click(function () {
    //        if (log_cons_date2 == false) {
    //            $(this).val("");
    //            $("#cons_start_date_main").val("");
    //            log_cons_date2 = true;
    //        }
    //    })
    //});

    // calendar for consumer details //
    var log_cons_date1 = false;
    $(function () {
        // 24 hours //
        //$( "#day_date" ).datepicker({
        //    changeMonth: true,
        //    numberOfMonths: 1,
        //    dateFormat: 'dd.mm.yy'
        //}).datepicker("setDate", new Date());
        // period
        var dateFormat = "dd.mm.yy",

        from = $("#cons_start_date1").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
        .on("change", function () {
            to.datepicker("option", "minDate", getDate(this));
        }).datepicker("setDate", new Date()),

        to = $("#cons_end_date1").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
        .on("change", function () {
            from.datepicker("option", "maxDate", getDate(this));
        }).datepicker("setDate", new Date());

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
        //
        $("#cons_start_date1").click(function () {
            if (log_cons_date1 == false) {
                $(this).val("");
                $("#cons_end_date1").val("");
                log_cons_date1 = true;
            }
        })
        $("#cons_end_date1").click(function () {
            if (log_cons_date1 == false) {
                $(this).val("");
                $("#cons_start_date1").val("");
                log_cons_date1 = true;
            }
        })
    });
    $("#cons_start_date1").datepicker({
        onClose: function () {
            $("#cons_end_date1").datepicker("show");
        }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////// Meters ///////////////////////////////////////////////////
    // calendar for meters table //3
    $(function () {
        // 24 hours //
        $("#met_day_date").datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd.mm.yy',
        }).datepicker();
    });

    $("#met_day_date").click(function () {
        $(this).val("");
    })
    $("#met_day_date").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s2 + "" + s1;
        selected_dt_m = dt;
        //alert(selected_dt_m);
        //
        arr_m_log = false;
        arr_m_rev_log = false;
        arr_m = [];
        arr_m_res = [];
        load_m_res = [];
        //table2.clear().draw();
        join_m_it = setInterval(DeployMeterList, 1000);
    });

    // calendar for energy table //3
    $(function () {
        // 24 hours //
        $("#renergy_day_date").datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd.mm.yy'
        }).datepicker("setDate", new Date());
    });
    // calendar for meters table //3
    $(function () {
        // 24 hours //
        $("#event_day_date").datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd.mm.yy'
        }).datepicker("setDate", new Date());
    });
    ////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////// Consumer details period chart ////////////////////////////////////////////
    $(function () {
        //$('#source').tableBarChart(targetDiv, caption, reverseGroup);
        $('#source').tableBarChart('#chart1', '', false);
    });
    $(function () {
        //$('#source').tableBarChart(targetDiv, caption, reverseGroup);
        $('#source2').tableBarChart('#chart2', '', false);
    });

    ////////////////////////////////////////////////////////////////////
    // consumer print
    $("#cons_print1").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#cons_print1").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#cons_excel1").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#cons_excel1").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#cons_pdf1").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#cons_pdf1").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })

    $("#cons_print2").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#cons_print2").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#cons_excel2").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#cons_excel2").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#cons_pdf2").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#cons_pdf2").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })
    ////////////

    // Meters print
    $("#met_print1").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#met_print1").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#met_excel1").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#met_excel1").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#met_pdf1").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#met_pdf1").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })

    ////////////

    // Renergy print
    $("#renergy_print1").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#renergy_print1").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#renergy_excel1").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#renergy_excel1").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#renergy_pdf1").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#renergy_pdf1").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })

    ////////////

    // Meters print
    $("#event_print1").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#event_print1").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#event_excel1").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#event_excel1").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#event_pdf1").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#event_pdf1").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })

    // TP print
    $("#tp_print1").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#tp_print1").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#tp_excel1").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#tp_excel1").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#tp_pdf1").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#tp_pdf1").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })

    ////////////

    var log_met_on = false;
    $("#cons_met_on1").click(function () {
        if (log_met_on == false) {
            $(this).attr("src", "/Content/files/met_off.png");
            log_met_on = true;
        } else {
            $(this).attr("src", "/Content/files/met_on.png");
            log_met_on = false;
        }
    })
    $(".met_on_off").click(function () {
        //var color = $( this ).css( "background" );
        //alert(color);
        //if ($(this).css("background") == "url('/Content/files/moff.png') no-repeat center") {
        //$(this).css("background", "url('/Content/files/mon.png') no-repeat center");
        //}else{
        $(this).css("background", "url('/Content/files/moff.png') no-repeat center");
        //}
        $(this).css("background-size", "45px 20px");
    })
    $("#close_met").click(function () {
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "-5000px");
    })
    ////////////////////////////////////////////////////////////////////

    // met_det_tabs
    $("#met_det_tab1").click(function () {
        $("#met_det_tabs").css("background", "url('/Content/files/tabbtn1.png')");
        $("#contain_wide").scrollLeft(0);
    })
    $("#met_det_tab2").click(function () {
        $("#met_det_tabs").css("background", "url('/Content/files/tabbtn2.png')");
        var w = $("#det_pan_met_wide").width();
        //alert(w);
        var n = w / 4;
        $("#contain_wide").scrollLeft(n);
    })
    $("#met_det_tab3").click(function () {
        $("#met_det_tabs").css("background", "url('/Content/files/tabbtn3.png')");
        var w = $("#det_pan_met_wide").width();
        var n = (w / 4) * 2;
        $("#contain_wide").scrollLeft(n);
    })
    $("#met_det_tab4").click(function () {
        $("#met_det_tabs").css("background", "url('/Content/files/tabbtn4.png')");
        var w = $("#det_pan_met_wide").width();
        var n = (w / 4) * 3;
        $("#contain_wide").scrollLeft(n);
    })
    $("#contain_wide").on('scroll', function () {
        var w = $("#det_pan_met_wide").width();
        var n = (w / 4);
        var pos = $("#contain_wide").scrollLeft();
        //$("#met_det_tab3").text(pos);
        //$("#met_det_tab4").text(n);
        //alert(pos);
        if (pos == 0) {
            $("#met_det_tabs").css("background", "url('/Content/files/tabbtn1.png')");
        }
        if ((pos >= n) && (pos < (n * 2) - 800)) {
            $("#met_det_tabs").css("background", "url('/Content/files/tabbtn2.png')");
        }
        if (pos >= (n * 2)) {
            $("#met_det_tabs").css("background", "url('/Content/files/tabbtn3.png')");
        }
        if (pos >= ((n * 3) - 400)) {
            $("#met_det_tabs").css("background", "url('/Content/files/tabbtn4.png')");
        }
    });
    $("#drop_met_det_btn").click(function () {
        $("#drop_met_det").slideToggle(500);
    })
    $("#drop_dcu_det_btn").click(function () {
        $("#drop_dcu_det").slideToggle(500);
    })
    $("#drop_home_btn").click(function () {
        $("#drop_home_det").slideToggle(500);
    })
    $("#drop_vector_btn").click(function () {
        $("#vc_sub1").toggle(500);
        $("#vc_sub2").toggle(500);
        $("#vector_container").slideToggle(500);
    })
    ///////////////////////// Create and initialize dp_met_table1 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table1_dp_met = $("#dp_met_table1").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "3%", "targets": 0 }, { "width": "3%", "targets": 1 }, { "width": "3%", "targets": 2 }, { "width": "3%", "targets": 3 },
          { "width": "3%", "targets": 4 }, { "width": "3%", "targets": 5 }, { "width": "3%", "targets": 6 }, { "width": "3%", "targets": 7 },
          { "width": "15%", "targets": 8 }, { "width": "15%", "targets": 9 }, { "width": "15%", "targets": 10 }
        ]
    });
    // Select row
    $("#dp_met_table11 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table1_dp_met.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [20, 12, 21, 63, 22, 12, 78, 50, 62, 50],
        mode: 'lines',
        name: 'A+',
        marker: {
            color: '#1cc2ff'
        },
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [30, 65, 12, 15, 41, 65, 92, 81, 73, 13],
        mode: 'lines',
        name: 'A-',
        marker: {
            color: '#fac363'
        }
    };
    var trace3 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [27, 21, 65, 23, 87, 52, 32, 76, 10, 27],
        mode: 'lines',
        name: '|A|',
        marker: {
            color: '#e1ff14'
        }
    };
    var trace4 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [25, 65, 17, 41, 15, 44, 41, 92, 19, 50],
        mode: 'lines',
        name: '|R|',
        marker: {
            color: '#ff0000'
        }
    };
    var trace5 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [62, 39, 65, 87, 63, 38, 36, 32, 38, 33],
        mode: 'lines',
        name: 'R+',
        marker: {
            color: '#ff00ea'
        }
    };
    var trace6 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [52, 17, 12, 22, 23, 21, 81, 41, 55, 50],
        mode: 'lines',
        name: 'R-',
        marker: {
            color: '#00fff6'
        }
    };

    var layout = {
        title: 'Р”РµС‚Р°Р»СЊРЅС‹Р№ РіСЂР°С„РёРє РїРѕ РїРѕРєР°Р·Р°С‚РµР»СЏРј <b style="color: #1cc2ff">A+</b>, <b style="color: #fac363">A-</b>, <b style="color: #e1ff14">|A|</b>, <b style="color: #ff0000">|R|</b>, <b style="color: #ff00ea">R+</b>, <b style="color: #00fff6">R-</b>',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        //text_color: 'rgb(fff,fff,fff)',
        //paper_bgcolor:'rgb(51,51,51)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
    };

    var data = [trace1, trace2, trace3, trace4, trace5, trace6];
    Plotly.newPlot('tab1_chart', data, layout);

    ///////////////////////// Create and initialize dp_met_table2 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table2_dp_met = $("#dp_met_table2").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1 }, { "width": "10%", "targets": 2 }, { "width": "6%", "targets": 3 },
          { "width": "6%", "targets": 4 }, { "width": "6%", "targets": 5 }, { "width": "6%", "targets": 6 }, { "width": "6%", "targets": 7 },
          { "width": "6%", "targets": 8 }
        ]
    });
    // Select row
    $("#dp_met_table22 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table2_dp_met.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [201, 125, 214, 632, 225, 128, 780, 505, 620, 50],
        fill: 'tozeroy',
        mode: 'lines',
        name: '+P',
        marker: {
            color: '#ffd6d5'
        },
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [305, 658, 125, 155, 412, 655, 925, 810, 730, 130],
        fill: 'tozeroy',
        mode: 'lines',
        name: '+Q',
        marker: {
            color: '#f6ffb8'
        }
    };
    var trace3 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [270, 214, 658, 236, 874, 520, 325, 760, 100, 270],
        fill: 'tozeroy',
        mode: 'lines',
        name: 'Q',
        marker: {
            color: '#27ff3b'
        }
    };
    var trace4 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [250, 658, 174, 412, 155, 445, 410, 925, 195, 500],
        fill: 'tozeroy',
        mode: 'lines',
        name: '+A',
        marker: {
            color: '#b61c1c'
        }
    };
    var trace5 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [620, 398, 658, 874, 632, 380, 365, 320, 380, 330],
        fill: 'tozeroy',
        mode: 'lines',
        name: '+R',
        marker: {
            color: '#e7b9ff'
        }
    };
    var trace6 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [525, 174, 125, 225, 236, 217, 810, 410, 550, 500],
        fill: 'tozeroy',
        mode: 'lines',
        name: 'R',
        marker: {
            color: '#5ca9ff'
        }
    };

    var layout = {
        title: 'Р”РµС‚Р°Р»СЊРЅС‹Р№ РіСЂР°С„РёРє РїРѕ РїРѕРєР°Р·Р°С‚РµР»СЏРј <b style="color: #ffd6d5">+P</b>, <b style="color: #f6ffb8">+Q</b>, <b style="color: #27ff3b">Q</b>, <b style="color: #b61c1c">+A</b>, <b style="color: #e7b9ff">+R</b>, <b style="color: #5ca9ff">R</b>',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        //text_color: 'rgb(fff,fff,fff)',
        //paper_bgcolor:'rgb(51,51,51)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
    };

    var data = [trace1, trace2, trace3, trace4, trace5, trace6];
    Plotly.newPlot('tab2_chart', data, layout);
    ///////////////////////// Create and initialize dp_met_table3 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table3_dp_met = $("#dp_met_table3").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1 }, { "width": "9%", "targets": 2 }
        ]
    });
    // Select row
    $("#dp_met_table33 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table3_dp_met.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        y: [25, 15, 32, 85, 67, 75, 28, 56, 74, 43, 15, 69, 59, 34, 25, 15, 32, 85, 67, 75, 28, 56, 74, 43, 15, 69, 59, 34, 55, 38, 78, 62, 98, 50, 41, 25, 32, 67, 28, 32, 67, 25, 15, 32, 55, 38, 78, 62, 98, 50, 41, 25, 32, 67, 28, 32, 67, 25, 15, 32],
        fill: 'tozeroy',
        mode: 'lines',
        name: 'R',
        marker: {
            color: '#2898e8'
        }
    };

    var layout = {
        title: 'Р“СЂР°С„РёРє РїРѕС‚СЂРµР±Р»РµРЅРёСЏ СЌРЅРµСЂРіРёРё Р·Р° РІС‹Р±СЂР°РЅРЅС‹Р№ РїРµСЂРёРѕРґ',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        //text_color: 'rgb(fff,fff,fff)',
        //paper_bgcolor:'rgb(51,51,51)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
    };

    var data = [trace1];
    Plotly.newPlot('tab3_chart', data, layout);

    ///////////////////////// Create and initialize dp_met_table4 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table4_dp_met = $("#dp_met_table4").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "10%", "targets": 1 }, { "width": "50%", "targets": 2 }, { "width": "10%", "targets": 1 }, { "width": "10%", "targets": 2 }
        ]
    });
    // Select row
    $("#dp_met_table4 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table4_dp_met.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        y: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕСЂРѕРі',
        marker: {
            color: '#ff5757'
        },
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        y: [10, 28, 62, 35, 45, 57, 48, 35, 18, 40, 55, 60, 43, 31, 45],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
        marker: {
            color: '#24ff00'
        }
    };

    var layout = {
        title: 'Р“СЂР°С„РёРє РїСЂРµРІС‹С€РµРЅРёСЏ РјР°РєСЃРёРјР°Р»СЊРЅРѕР№ РЅР°РіСЂСѓР·РєРё',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        //text_color: 'rgb(fff,fff,fff)',
        //paper_bgcolor:'rgb(51,51,51)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
    };
    var data = [trace1, trace2];
    Plotly.newPlot('tab4_chart', data, layout);
    ///////////////////////// Create and initialize dp_met_table4 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table1_dp_dcu = $("#dp_dcu_table1").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "filter": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "15%", "targets": 1 }, { "width": "35%", "targets": 2 }, { "width": "30%", "targets": 1 }
        ]
    });
    // Select row
    $("#dp_dcu_table1 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table1_dp_dcu.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        values: [80, 20],
        labels: ['РЎРѕРµРґРёРЅРµРЅРёРµ СЃС‚Р°Р±РёР»СЊРЅРѕ', 'РЎРѕРµРґРёРЅРµРЅРёСЏ РЅРµС‚'],
        marker: { 'colors': ['7c976a', 'cdb56f'] },
        domain: {
            x: [0, 1.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: 'CРІСЏР·СЊ СЃ РєРѕРЅС†РµРЅС‚СЂР°С‚РѕСЂРѕРј',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('dt_dcu_pie1', data, layout);
    //
    var trace1 = {
        values: [60, 40],
        labels: ['РЈСЃРїРµС€РЅРѕ РѕРїСЂРѕС€РµРЅРѕ 600 СЃС‡РµС‚С‡РёРєРѕРІ РёР· 1000', 'РќРµ РѕРїСЂРѕС€РµРЅРѕ 400 СЃС‡РµС‚С‡РёРєРѕРІ РёР· 1000'],
        marker: { 'colors': ['906088', '3c5663'] },
        domain: {
            x: [0, 1.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: 'РЎС‚Р°С‚РёСЃС‚РёРєР° РѕРїСЂРѕСЃР°',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('dt_dcu_pie2', data, layout);
    //
    //
    var trace1 = {
        values: [30, 70],
        labels: ['Р’РѕР·РјРѕР¶РЅРѕ РїРѕРґРєР»СЋС‡РёС‚СЊ 60 СЃС‡РµС‚С‡РёРєРѕРІ', 'РџРѕРґРєР»СЋС‡РµРЅРѕ 220 СЃС‡РµС‚С‡РёРєРѕРІ'],
        marker: { 'colors': ['70606b', '8dae3b'] },
        domain: {
            x: [0, 1.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: 'РљРѕР»РёС‡РµСЃС‚РІРѕ СЃС‡РµС‚С‡РёРєРѕРІ',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('dt_dcu_pie3', data, layout);
    //
    var trace1 = {
        values: [20, 80],
        labels: ['Р—Р°РїСЂРѕСЃС‹ РїРѕС‚РµСЂСЏРЅС‹', 'Р—РїСЂРѕСЃС‹ РїСЂРѕС€Р»Рё СѓСЃРїРµС€РЅРѕ'],
        marker: { 'colors': ['745751', 'fc73db'] },
        domain: {
            x: [0, 1.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: 'РЎС‚Р°С‚РёСЃС‚РёРєР° РѕР±РјРµРЅР° РґР°РЅРЅС‹РјРё',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('dt_dcu_pie4', data, layout);

    $("#dp_det_dcu_date1").datepicker();
    $("#dp_det_dcu_date2").datepicker();


    ///////////////////////// Create and initialize dp_met_table4 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table2_dp_dcu = $("#dp_dcu_table2").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "filter": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "15%", "targets": 1 }, { "width": "35%", "targets": 2 }
        ]
    });
    // Select row
    $("#dp_dcu_table2 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table2_dp_dcu.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕСЂРѕРі',
        marker: {
            color: 'green'
        },
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: [10, 28, 62, 35, 45, 57, 48, 35, 18, 40, 55, 60, 43, 31, 45, 55, 60, 43, 45, 57, 48, 35, 18, 10, 28, 62, 55, 35, 29, 18],
        fill: 'tozeroy',
        mode: 'lines',
        name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
        area: 'fill',
        marker: {
            color: '#f556e4'
        }
    };
    var trace3 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
        marker: {
            color: 'red'
        }
    };
    var trace4 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
        marker: {
            color: 'blue'
        }
    };
    //var trace3 = {
    //    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 
    //    y: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    //    fill: 'none',
    //    mode: 'lines',
    //    name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
    //    marker:{
    //        color: 'transparent'
    //    }
    //};

    var layout = {
        title: 'РЈСЂРѕРІРµРЅСЊ СЃРёРіРЅР°Р»Р°',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        legend: {
            x: 0,
            y: 100
        },
        height: 350,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
    };
    var data = [trace1, trace2, trace3, trace4];
    Plotly.newPlot('dp_dcu_chart1', data, layout);

    //show tp details
    $("#testbtn1").click(function () {
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_tp").css("display", "block");
        //$("#dt_dp_left").css("display", "block");
        //$("#dt_dp_secp").css("display", "none");
        $("#detail_pan_dcu").css("display", "none");
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_met").css("display", "none");
    })
    //show res details
    //$("#testbtn2").click(function(){
    //    $("#rightm_div").css("display", "none");
    //    $("#details_pan").css("left", "62px");
    //    $("#detail_pan_res").css("display", "block");
    //    //$("#dt_dp_secp").css("display", "none");
    //    $("#detail_pan_dcu").css("display", "none");
    //    $("#detail_pan_cons").css("display", "none");
    //    $("#detail_pan_met").css("display", "none");
    //    $("#detail_pan_tp").css("display", "none");
    //})

    ///////////////////////// Create and initialize dp_tp_table1 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table1_dp_tp = $("#dp_tp_table1").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "filter": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "10%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 },
          { "width": "1%", "targets": 4 }, { "width": "1%", "targets": 5 }, { "width": "1%", "targets": 6 }, { "width": "1%", "targets": 7 },
          { "width": "10%", "targets": 8 }, { "width": "15%", "targets": 9 }, { "width": "15%", "targets": 10 },
        ]
    });
    // Select row
    $("#dp_tp_table1 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table1_dp_tp.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [0, 10, 15, 25, 30, 30, 35, 35, 40, 45, 50, 50],
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'РћС‚РїСѓС‰РµРЅРѕ',
        marker: {
            color: 'blue'
        }
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [0, 10, 15, 20, 25, 20, 20, 25, 15, 45, 40, 45],
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'РџРѕР»СѓС‡РµРЅРѕ',
        marker: {
            color: 'green'
        }
    };
    var layout = {
        title: '',
        font: {
            family: 'Arial',
            size: 11,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        //text_color: 'rgb(fff,fff,fff)',
        //paper_bgcolor:'rgb(51,51,51)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
        legend: {
            x: 0,
            y: 20
        }
    };

    var data = [trace1, trace2];
    Plotly.newPlot('dt_tp_chart1', data, layout);

    ///////////////////////// Create and initialize dp_tp_table2 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table2_dp_tp = $("#dp_tp_table2").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "filter": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "10%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 },
          { "width": "1%", "targets": 4 }, { "width": "1%", "targets": 5 }, { "width": "1%", "targets": 6 }, { "width": "1%", "targets": 7 },
          { "width": "10%", "targets": 8 }, { "width": "15%", "targets": 9 }, { "width": "15%", "targets": 10 },
        ]
    });
    // Select row
    $("#dp_tp_table2 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table2_dp_tp.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ///////////////////////// Create and initialize dp_met_table4 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table3_dp_tp = $("#dp_tp_table3").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "filter": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0, "orderable": false }, { "width": "10%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2, "orderable": false }, { "width": "1%", "targets": 3, "orderable": false },
          { "width": "1%", "targets": 4, "orderable": false }, { "width": "1%", "targets": 5, "orderable": false }, { "width": "1%", "targets": 6, "orderable": false }, { "width": "15%", "targets": 7, "orderable": false },
          { "width": "15%", "targets": 8, "orderable": false }, { "width": "15%", "targets": 9, "orderable": false }
        ]
    });
    // Select row
    $("#dp_tp_table3 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table3_dp_tp.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [0, 10, 15, 25, 30, 30, 35, 35, 40, 45, 50, 50],
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'РћС‚РїСѓС‰РµРЅРѕ',
        marker: {
            color: 'blue',
        }
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [0, 10, 15, 20, 25, 20, 20, 25, 15, 45, 40, 45],
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'РџРѕР»СѓС‡РµРЅРѕ',
        marker: {
            color: 'green'
        }
    };
    var layout = {
        title: '',
        font: {
            family: 'Arial',
            size: 11,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        //text_color: 'rgb(fff,fff,fff)',
        //paper_bgcolor:'rgb(51,51,51)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
        legend: {
            x: 0,
            y: 20
        }
    };

    var data = [trace1, trace2];
    Plotly.newPlot('dt_tp_chart2', data, layout);
    ////
    var trace1 = {
        values: [30, 20, 50],
        labels: ['', '', ''],
        marker: { 'colors': ['skyblue', 'brown', 'darkgreen'] },
        domain: {
            x: [0, 15.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: '',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        showlegend: false,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('dt_tp_chart2_1', data, layout);
    ////
    var trace1 = {
        values: [30, 20, 50],
        labels: ['', '', ''],
        marker: { 'colors': ['skyblue', 'brown', 'darkgreen'] },
        domain: {
            x: [0, 15.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: '',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        showlegend: false,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('dt_tp_chart1_1', data, layout);

    ///////////////////////// Create and initialize dp_met_table4 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table4_dp_tp = $("#dp_tp_table4").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "filter": true,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "10%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 },
          { "width": "1%", "targets": 4 }, { "width": "1%", "targets": 5 }, { "width": "1%", "targets": 6 }, { "width": "1%", "targets": 7 },
          { "width": "10%", "targets": 8 }, { "width": "15%", "targets": 9 }, { "width": "15%", "targets": 10 },
        ]
    });
    // Select row
    $("#dp_tp_table4 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table4_dp_tp.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    // calendar for TP table //3
    var log_cons_date2 = false;
    $(function () {
        var dateFormat = "dd.mm.yy",

        from = $("#dp_tp_date1_start").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }).datepicker("setDate", new Date()),

            to = $("#dp_tp_date1_end").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            }).datepicker("setDate", new Date());

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
        //
        $("#dp_tp_date1_start").click(function () {
            if (log_cons_date2 == false) {
                $(this).val("");
                $("#dp_tp_date1_end").val("");
                log_cons_date2 = true;
            }
        })
        $("#dp_tp_date1_end").click(function () {
            if (log_cons_date2 == false) {
                $(this).val("");
                $("#dp_tp_date1_start").val("");
                log_cons_date2 = true;
            }
        })
    });
    $("#dp_tp_date1_start").datepicker({
        onClose: function () {
            $("#dp_tp_date1_end").datepicker("show");
        }
    });
    //calendar for TP details end //

    // calendar for DCU details start //3
    var log_cons_date2 = false;
    $(function () {
        $("#dp_det_dcu_date1_end").datepicker();
        $("#dp_det_dcu_date1_start").datepicker();

        //
        $("#dp_det_dcu_date1_start").click(function () {
            if (log_cons_date2 == false) {
                $(this).val("");
                $("#dp_det_dcu_date1_end").val("");
                log_cons_date2 = true;
            }
        })
        $("#dp_det_dcu_date1_end").click(function () {
            if (log_cons_date2 == false) {
                $(this).val("");
                $("#dp_det_dcu_date1_start").val("");
                log_cons_date2 = true;
            }
        })
    });
    $("#dp_det_dcu_date1_start").datepicker({
        onClose: function () {
            $("#dp_det_dcu_date1_end").datepicker("show");
        }
    });
    // calendar for DCU details end //

    // calendar for Meters details start //3
    var log_cons_date3 = false;
    $(function () {
        var dateFormat = "dd.mm.yy",

        from = $("#dp_det_met_date1_start").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
        .on("change", function () {
            to.datepicker("option", "minDate", getDate(this));
        }).datepicker("setDate", new Date()),

        to = $("#dp_det_met_date1_end").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
        .on("change", function () {
            from.datepicker("option", "maxDate", getDate(this));
        }).datepicker("setDate", new Date());

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
        //
        $("#dp_det_met_date1_start").click(function () {
            if (log_cons_date3 == false) {
                $(this).val("");
                $("#dp_det_met_date1_end").val("");
                log_cons_date3 = true;
            }
        })
        $("#dp_det_met_date1_end").click(function () {
            if (log_cons_date3 == false) {
                $(this).val("");
                $("#dp_det_met_date1_start").val("");
                log_cons_date3 = true;
            }
        })
    });
    $("#dp_det_met_date1_start").datepicker({
        onClose: function () {
            $("#dp_det_met_date1_end").datepicker("show");
        }
    });
    // calendar for Meters details end //

    $("#tp_det_tab1").click(function () {
        $("#tp_det_tabs").css("background", "url('/Content/files/tabbtn5.png')");
        $("#dt_tp_wide_cont").scrollLeft(0);
    })
    $("#tp_det_tab2").click(function () {
        $("#tp_det_tabs").css("background", "url('/Content/files/tab5.png')");
        var w = $("#dt_tp_wide").width();
        var n = w / 2;
        $("#dt_tp_wide_cont").scrollLeft(n);
    })
    $("#dt_tp_wide_cont").on('scroll', function () {
        var w = $("#dt_tp_wide").width();
        var n = (w / 2);
        var pos = $("#dt_tp_wide_cont").scrollLeft();
        //$("#tp_det_tab1").text(pos);
        //$("#tp_det_tab2").text(n-200);
        //alert(pos);
        if (pos == 0) {
            $("#tp_det_tabs").css("background", "url('/Content/files/tabbtn5.png')");
        }
        if (pos > (n - 200)) {
            $("#tp_det_tabs").css("background", "url('/Content/files/tab5.png')");
        }
    });
    //$("#tp_det_tab2").click(function(){

    //})

    //$("#tp_det_tab1").click(function(){

    //})

    ///////////////////////// Create and initialize dp_tp_table5 (TP details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table5_dp_tp = $("#dp_tp_table5").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "10%", "targets": 1 }, { "width": "50%", "targets": 2 }, { "width": "10%", "targets": 1 }, { "width": "10%", "targets": 2 }
        ]
    });
    // Select row
    $("#dp_tp_table5 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table4_dp_met.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});





    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        y: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕСЂРѕРі',
        marker: {
            color: '#ff5757'
        },
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        y: [10, 28, 62, 35, 45, 57, 48, 35, 18, 40, 55, 60, 43, 31, 45],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
        marker: {
            color: '#24ff00'
        }
    };

    var layout = {
        title: 'Р“СЂР°С„РёРє РїСЂРµРІС‹С€РµРЅРёСЏ РјР°РєСЃРёРјР°Р»СЊРЅРѕР№ РЅР°РіСЂСѓР·РєРё',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        //text_color: 'rgb(fff,fff,fff)',
        //paper_bgcolor:'rgb(51,51,51)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
    };
    var data = [trace1, trace2];
    Plotly.newPlot('dt_tp_chart5', data, layout);


    // Draw vector diagram; begin //
    function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    //function DrawVolt(v1, v2, v3, vn1, vn2, vn3) {
    //    var w = $("#vector_div").width();
    //    var h = $("#vector_div").height();
    //    var c = document.getElementById("vector_canvas");  
    //    c.width = w;
    //    c.height = h;
    //
    //    // vector1 //
    //    var ctx = c.getContext("2d");
    //    x1 = (w/2)+2;
    //    y1 = (h/2)+(h/10);
    //    r =  170;
    //    theta = v1;
    //    theta2 = vn1;
    //    ctx.lineWidth = 2;
    //    ctx.beginPath();
    //    //ctx.lineTo(x1 + r * Math.cos(theta), y1 + r * Math.sin(theta)); theta in radian
    //    x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
    //    y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
    //    ctx.moveTo(x1, y1);
    //    ctx.lineTo(x1_to, y1_to ); /*theta in degrees*/
    //    //ctx.closePath();
    //    ctx.strokeStyle = '#f20000';
    //    ctx.stroke();
    //    //code
    //}
    function DrawVector(v1, v2, v3, vn1, vn2, vn3) {
        var w = $("#vector_div").width();
        var h = $("#vector_div").height();
        var c = document.getElementById("vector_canvas");
        c.width = w;
        c.height = h;

        //// vector1 //
        //var ctx = c.getContext("2d");
        //x1 = (w/2)+2;
        //y1 = h/2;
        //r =  170;
        //theta = v1;
        //theta2 = vn1;
        //ctx.lineWidth = 2;
        //ctx.beginPath();
        ////ctx.lineTo(x1 + r * Math.cos(theta), y1 + r * Math.sin(theta)); theta in radian
        //x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
        //y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
        //ctx.moveTo(x1, y1);
        //ctx.lineTo(x1_to, y1_to ); /*theta in degrees*/
        ////ctx.closePath();
        //ctx.strokeStyle = '#f20000';
        //ctx.stroke();
        //ctx.fillStyle = '#fff';
        //ctx.font = "20px Tahome";
        //ctx.fillText("A",x1_to+10 ,y1_to+5);
        //DrawArc(x1, y1, v1, vn1, ctx, '#f20000');

        // vector1 //
        var ctx = c.getContext("2d");
        x1 = (w / 2) + 2;
        y1 = h / 2;
        r = 170;
        theta = v1;
        //theta2 = vn1;
        ctx.lineWidth = 2;
        ctx.beginPath();
        x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
        y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1_to, y1_to); /*theta in degrees*/
        ctx.closePath();
        ctx.strokeStyle = '#f20000';
        ctx.stroke();
        r = 120;
        ctx.fillStyle = '#fff';
        ctx.font = "20px Tahoma";
        ctx.fillText("A", x1_to + 10, y1_to + 5);
        for (theta = v1; theta <= vn1; theta++) {
            ctx.beginPath();
            x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
            y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1_to, y1_to); /*theta in degrees*/
            ctx.closePath();
            ctx.strokeStyle = '#f20000';
            ctx.stroke();
        }
        DrawArrow(x1, y1, v1, vn1, ctx, '#f20000');

        // vector2 //
        var ctx = c.getContext("2d");
        x1 = (w / 2) + 2;
        y1 = h / 2;
        r = 170;
        theta = v2;
        //theta2 = vn1;
        ctx.lineWidth = 2;
        ctx.beginPath();
        x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
        y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1_to, y1_to); /*theta in degrees*/
        ctx.closePath();
        ctx.strokeStyle = '#e117ff';
        ctx.stroke();
        r = 120;
        ctx.fillStyle = '#fff';
        ctx.font = "20px Tahoma";
        ctx.fillText("B", x1_to + 10, y1_to + 5);
        for (theta = v2; theta <= (vn2 + v2) ; theta++) {
            //alert(theta+'+'+(v2+vn2));
            ctx.beginPath();
            x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
            y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1_to, y1_to); /*theta in degrees*/
            ctx.closePath();
            ctx.strokeStyle = '#e117ff';
            ctx.stroke();
        }
        DrawArrow(x1, y1, v2, vn2, ctx, '#e117ff');

        // vector3 //
        var ctx = c.getContext("2d");
        x1 = (w / 2) + 2;
        y1 = h / 2;
        r = 170;
        theta = v3;
        //theta2 = vn1;
        ctx.lineWidth = 2;
        ctx.beginPath();
        x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
        y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1_to, y1_to); /*theta in degrees*/
        ctx.closePath();
        ctx.strokeStyle = '#18ff00';
        ctx.stroke();
        r = 120;
        ctx.fillStyle = '#fff';
        ctx.font = "20px Tahoma";
        ctx.fillText("c", x1_to + 10, y1_to + 5);
        for (theta = v3; theta <= (vn3 + v3) ; theta++) {
            ctx.beginPath();
            x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
            y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1_to, y1_to); /*theta in degrees*/
            ctx.closePath();
            ctx.strokeStyle = '#18ff00';
            ctx.stroke();
        }
        DrawArrow(x1, y1, v3, vn3, ctx, '#18ff00');

    }

    function DrawArc(x1, y1, v, vn, ctx, color) {
        r = 120;
        theta = v + vn;
        theta2 = v + vn + 5;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        //ctx.lineTo(x1 + r * Math.cos(theta), y1 + r * Math.sin(theta)); theta in radian
        x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
        y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
        x1_to2 = x1 + 170 * Math.cos(Math.PI * theta2 / 180.0);
        y1_to2 = y1 + 170 * Math.sin(Math.PI * theta2 / 180.0);
        ctx.lineTo(x1_to, y1_to); /*theta in degrees*/
        //ctx.lineTo(x1_to2, y1_to2 ); /*theta in degrees*/
        ctx.strokeStyle = color;
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.beginPath();
        //for (i = 0; i < 119; i++){
        //    ctx.arc(x1, y1, i, degreesToRadians(v), degreesToRadians(v+vn));
        //    ctx.stroke();
        //}
        ctx.closePath();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x1, y1, 170, degreesToRadians(v), degreesToRadians(v + vn));
        ctx.stroke();
        //// the triangle arrow
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1 + 165 * Math.cos(Math.PI * theta / 180.0), y1 + 165 * Math.sin(Math.PI * theta / 180.0));
        ctx.lineTo(x1 + 175 * Math.cos(Math.PI * theta / 180.0), y1 + 175 * Math.sin(Math.PI * theta / 180.0));
        ctx.lineTo(x1_to2, y1_to2);
        ctx.fillStyle = "#000000";
        ctx.fill();
    }

    function DrawArrow(x1, y1, v, vn, ctx, color) {
        r = 120;
        theta = v + vn;
        theta2 = v + vn + 5;
        ctx.lineWidth = 2;
        //ctx.lineTo(x1 + r * Math.cos(theta), y1 + r * Math.sin(theta)); theta in radian
        x1_to = x1 + r * Math.cos(Math.PI * theta / 180.0);
        y1_to = y1 + r * Math.sin(Math.PI * theta / 180.0);
        x1_to2 = x1 + 170 * Math.cos(Math.PI * theta2 / 180.0);
        y1_to2 = y1 + 170 * Math.sin(Math.PI * theta2 / 180.0);
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x1, y1, 170, degreesToRadians(v), degreesToRadians(v + vn));
        ctx.stroke();
        //// the triangle arrow
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1 + 165 * Math.cos(Math.PI * theta / 180.0), y1 + 165 * Math.sin(Math.PI * theta / 180.0));
        ctx.lineTo(x1 + 175 * Math.cos(Math.PI * theta / 180.0), y1 + 175 * Math.sin(Math.PI * theta / 180.0));
        ctx.lineTo(x1_to2, y1_to2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    $("#testbtn5").click(function () {
        DrawVector(0, 120, 240, 15, 200, 50);
    })
    // Draw vector diagram; end //
    $("#login").click(function () {
        $("#login_screen").fadeOut(800);
    })

    ///////////////////////// Create and initialize home table1 (home page) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table1_home = $("#home_table1").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "filter": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "10%", "targets": 1 }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 },
          { "width": "1%", "targets": 4 },
        ]
    });
    // Select row
    $("#home_table1 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table1_home.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [0, 10, 15, 25, 30, 30, 35, 35, 40, 45, 50, 50],
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'РћС‚РїСѓС‰РµРЅРѕ',
        marker: {
            color: 'blue',
        }
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [0, 10, 15, 20, 25, 20, 20, 25, 15, 45, 40, 45],
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'РџРѕР»СѓС‡РµРЅРѕ',
        marker: {
            color: 'green'
        }
    };
    var layout = {
        title: '',
        font: {
            family: 'Arial',
            size: 11,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        //text_color: 'rgb(fff,fff,fff)',
        //paper_bgcolor:'rgb(51,51,51)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
        legend: {
            x: 0,
            y: 20
        }
    };

    var data = [trace1, trace2];
    Plotly.newPlot('home_chart1', data, layout);

    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [0, 10, 15, 25, 30, 30, 35, 35, 40, 45, 50, 50],
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'РћС‚РїСѓС‰РµРЅРѕ',
        marker: {
            color: 'blue',
        }
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [0, 10, 15, 20, 25, 20, 20, 25, 15, 45, 40, 45],
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'РџРѕР»СѓС‡РµРЅРѕ',
        marker: {
            color: 'green'
        }
    };
    var layout = {
        title: '',
        font: {
            family: 'Arial',
            size: 11,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        //text_color: 'rgb(fff,fff,fff)',
        //paper_bgcolor:'rgb(51,51,51)',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
        legend: {
            x: 0,
            y: 20
        }
    };

    var data = [trace1, trace2];
    Plotly.newPlot('dt_tp_chart2', data, layout);
    ////
    var trace1 = {
        values: [30, 20, 50],
        labels: ['', '', ''],
        marker: { 'colors': ['#cd9b9a', '#a5308b', '#03a476'] },
        domain: {
            x: [0, 15.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: '',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        showlegend: false,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('home_chart2', data, layout);



    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        values: [80, 20],
        labels: ['РЎРѕРµРґРёРЅРµРЅРёРµ СЃС‚Р°Р±РёР»СЊРЅРѕ', 'РЎРѕРµРґРёРЅРµРЅРёСЏ РЅРµС‚'],
        marker: { 'colors': ['906088', '3c5663'] },
        domain: {
            x: [0, 1.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: 'CРІСЏР·СЊ СЃ РєРѕРЅС†РµРЅС‚СЂР°С‚РѕСЂРѕРј',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('home_pie1', data, layout);
    //
    var trace1 = {
        values: [60, 40],
        labels: ['РЈСЃРїРµС€РЅРѕ РѕРїСЂРѕС€РµРЅРѕ 600 СЃС‡РµС‚С‡РёРєРѕРІ РёР· 1000', 'РќРµ РѕРїСЂРѕС€РµРЅРѕ 400 СЃС‡РµС‚С‡РёРєРѕРІ РёР· 1000'],
        marker: { 'colors': ['7c976a', 'cdb56f'] },
        domain: {
            x: [0, 1.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: 'РЎС‚Р°С‚РёСЃС‚РёРєР° РѕРїСЂРѕСЃР°',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('home_pie2', data, layout);
    //
    //
    var trace1 = {
        values: [30, 70],
        labels: ['Р’РѕР·РјРѕР¶РЅРѕ РїРѕРґРєР»СЋС‡РёС‚СЊ 60 СЃС‡РµС‚С‡РёРєРѕРІ', 'РџРѕРґРєР»СЋС‡РµРЅРѕ 220 СЃС‡РµС‚С‡РёРєРѕРІ'],
        marker: { 'colors': ['745751', 'fc73db'] },
        domain: {
            x: [0, 1.0]
        },
        name: '',
        hoverinfo: 'label+percent+name',
        hole: .6,
        type: 'pie'
    };

    var layout = {
        title: 'РљРѕР»РёС‡РµСЃС‚РІРѕ СЃС‡РµС‚С‡РёРєРѕРІ',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff',
        },
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('home_pie3', data, layout);
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕСЂРѕРі',
        marker: {
            color: '#f0ff00'
        },
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: [10, 28, 62, 35, 45, 57, 48, 35, 18, 40, 55, 60, 43, 31, 45, 55, 60, 43, 45, 57, 48, 35, 18, 10, 28, 62, 55, 35, 29, 18],
        fill: 'tozeroy',
        mode: 'lines',
        name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
        area: 'fill',
        marker: {
            color: '#00eb27'
        }
    };
    var trace3 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
        marker: {
            color: 'red'
        }
    };
    var trace4 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
        fill: 'none',
        mode: 'lines',
        name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
        marker: {
            color: 'blue'
        }
    };
    //var trace3 = {
    //    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 
    //    y: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    //    fill: 'none',
    //    mode: 'lines',
    //    name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
    //    marker:{
    //        color: 'transparent'
    //    }
    //};

    var layout = {
        title: 'РЈСЂРѕРІРµРЅСЊ СЃРёРіРЅР°Р»Р°',
        font: {
            family: 'Arial',
            size: 12,
            color: '#fff'
        },
        xaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            }
        },
        yaxis: {
            zeroline: false,
            showline: true,
            showgrid: true,
            showticklabels: true,
            gridcolor: '#666666',
            linecolor: '#666666',
            ticks: 'outside',
            tickcolor: '#fff',
            tickwidth: 2,
            ticklen: 5,
        },
        legend: {
            x: 0,
            y: 100
        },
        height: 350,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 70
        },
    };
    var data = [trace1, trace2, trace3, trace4];
    Plotly.newPlot('home_chart3', data, layout);

    ///////////////////////// Create and initialize home table2_home (home page) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table2_home = $("#home_table2").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "filter": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1 }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 },
          { "width": "2%", "targets": 4 }, { "width": "1%", "targets": 5 }, { "width": "1%", "targets": 6 }, { "width": "1%", "targets": 7 }, { "width": "2%", "targets": 8 },
        ]
    });
    // Select row
    $("#home_table2 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table2_home.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Create and initialize home table2 (home page) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table3_home = $("#home_table3").dataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        //"scrollY": "500px",
        //"scrollX": true,
        //"scrollCollapse": false,
        //"pageLength": z,
        "filter": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        //"columnDefs": [
        //  { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1}, { "width": "1%", "targets": 2}, { "width": "1%", "targets": 3},
        //  { "width": "10%", "targets": 4}, { "width": "1%", "targets": 5}, { "width": "1%", "targets": 6}, { "width": "1%", "targets": 7}, { "width": "1%", "targets": 8},
        //]
    });
    // Select row
    $("#home_table3 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table3_home.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});
    //calendar for home page
    var log_home_date1 = false;
    $(function () {
        // 24 hours //
        //var dateFormat = "dd.mm.yy",

        from = $("#home_date_start").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
        .on("change", function () {
            to.datepicker("option", "minDate", getDate(this));
        }).datepicker("setDate", new Date()),

        to = $("#home_date_end").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
        .on("change", function () {
            from.datepicker("option", "maxDate", getDate(this));
        }).datepicker("setDate", new Date());

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
        //
        $("#home_date_start").click(function () {
            if (log_cons_date1 == false) {
                $(this).val("");
                $("#home_date_end").val("");
                log_cons_date1 = true;
            }
        })
        $("#home_date_end").click(function () {
            if (log_cons_date1 == false) {
                $(this).val("");
                $("#home_date_start").val("");
                log_cons_date1 = true;
            }
        })
    });
    $("#home_date_start").datepicker({
        onClose: function () {
            $("#home_date_end").datepicker("show");
        }
    });
    ////////////////////////////////////////////////////////////////////
    // consumer print
    $("#home_print1").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#home_print1").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#home_excel1").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#home_excel1").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#home_pdf1").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#home_pdf1").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })

    $("#home_table1 td").dblclick(function () {
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_tp").css("display", "block");
        $("#detail_pan_dcu").css("display", "none");
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_met").css("display", "none");
        $('#tp_det_title').html(r.join(', '));
    })

    $("#home_table2 td").dblclick(function () {
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_dcu").css("display", "block");
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_met").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
    })
    $("#home_table3 td").dblclick(function () {
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_dcu").css("display", "block");
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_met").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
    })
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        values: [10],
        labels: [''],
        marker: { 'colors': ['#fff'] },
        domain: {
            x: [0, 1.0]
        },
        name: '',
        hoverinfo: 'none',
        hole: .9,
        type: 'pie'
    };

    var layout = {
        title: '',
        font: {
            family: 'Arial',
            size: 12,
            color: 'transparent',
        },
        showlegend: false,
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 240
    };

    var data = [trace1];
    Plotly.newPlot('met_det_drop_chart1', data, layout);
    ////////////////////////////////////////////////////////////////
    var met_onff = false;
    $("#met_on1").click(function () {
        if (met_onff == false) {
            $(this).attr('src', '/Content/files/moff.png');
            met_onff = true;
            $("#meter_stat").attr('src', '/Content/files/mabonent_off.png');
        } else {
            $(this).attr('src', '/Content/files/mon.png');
            met_onff = false;
            $("#meter_stat").attr('src', '/Content/files/mabonent_on.png');
        }
    })
    var trace1 = {
        values: [10],
        labels: [''],
        marker: { 'colors': ['#fff'] },
        domain: {
            x: [0, 1.0]
        },
        name: '',
        hoverinfo: 'none',
        hole: .9,
        type: 'pie'
    };

    var layout = {
        title: '',
        font: {
            family: 'Arial',
            size: 12,
            color: 'transparent',
        },
        showlegend: false,
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 240
    };

    var data = [trace1];
    Plotly.newPlot('met_det_drop_chart2', data, layout);
    var met_onff2 = false;
    $("#met_on2").click(function () {
        if (met_onff == false) {
            $(this).attr('src', '/Content/files/moff.png');
            met_onff = true;
            $("#meter_stat2").attr('src', '/Content/files/mabonent_off.png');
        } else {
            $(this).attr('src', '/Content/files/mon.png');
            met_onff = false;
            $("#meter_stat2").attr('src', '/Content/files/mabonent_on.png');
        }
    })
})

    angular.module('example', ['n3-line-chart'])
    .controller('MyChartCtrl', function ($scope) {
        $scope.options = {
            series: [
                {
                    axis: "y",
                    dataset: "dataset0",
                    key: "val_0",
                    label: "РџРѕРєР°Р·Р°РЅРёСЏ РІ РєР’С‚",
                    color: "#1ab609",
                    type: ['line', 'area'],
                    id: 'mySeries0',
                }
            ],
            axes: {
                x: {
                    key: "x"
                }
            },
            margin: {
                top: 5,
                right: 30,
                bottom: 50,
                left: 50
            },
            grid: {
                x: true,
                y: true
            },
        };

        $scope.data = {
            dataset0: [
                { x: 0, val_0: 0 },
                { x: 1, val_0: 25 },
                { x: 2, val_0: 15 },
                { x: 3, val_0: 32 },
                { x: 4, val_0: 85 },
                { x: 5, val_0: 67 },
                { x: 6, val_0: 75 },
                { x: 7, val_0: 28 },
                { x: 8, val_0: 56 },
                { x: 9, val_0: 74 },
                { x: 10, val_0: 43 },
                { x: 11, val_0: 15 },
                { x: 12, val_0: 69 },
                { x: 13, val_0: 59 },
                { x: 14, val_0: 34 },
                { x: 15, val_0: 55 },
                { x: 16, val_0: 38 },
                { x: 17, val_0: 78 },
                { x: 18, val_0: 62 },
                { x: 19, val_0: 98 },
                { x: 20, val_0: 50 },
                { x: 21, val_0: 41 },
                { x: 22, val_0: 25 },
                { x: 23, val_0: 56 },
                { x: 24, val_0: 32 },
                { x: 25, val_0: 67 },
                { x: 26, val_0: 28 },
                { x: 27, val_0: 32 },
                { x: 28, val_0: 67 },
                { x: 29, val_0: 64 },
                { x: 30, val_0: 25 },
                { x: 31, val_0: 15 },
                { x: 32, val_0: 32 },
                { x: 33, val_0: 85 },
                { x: 34, val_0: 67 },
                { x: 35, val_0: 75 },
                { x: 36, val_0: 28 },
                { x: 37, val_0: 56 },
                { x: 38, val_0: 74 },
                { x: 39, val_0: 43 },
                { x: 40, val_0: 15 },
                { x: 41, val_0: 69 },
                { x: 42, val_0: 59 },
                { x: 43, val_0: 34 },
                { x: 44, val_0: 55 },
                { x: 45, val_0: 38 },
                { x: 46, val_0: 78 },
                { x: 47, val_0: 62 },
                { x: 48, val_0: 98 },
                { x: 49, val_0: 50 },
                { x: 50, val_0: 41 },
                { x: 51, val_0: 25 },
                { x: 52, val_0: 56 },
                { x: 53, val_0: 32 },
                { x: 54, val_0: 67 },
                { x: 55, val_0: 28 },
                { x: 56, val_0: 32 },
                { x: 57, val_0: 67 },
                { x: 58, val_0: 35 },
                { x: 59, val_0: 25 },
                { x: 60, val_0: 15 },
                { x: 61, val_0: 32 },
                { x: 62, val_0: 85 },
                { x: 63, val_0: 67 },
                { x: 64, val_0: 75 },
                { x: 65, val_0: 28 },
                { x: 66, val_0: 56 },
                { x: 67, val_0: 74 },
                { x: 68, val_0: 43 },
                { x: 69, val_0: 15 },
                { x: 70, val_0: 69 },
                { x: 71, val_0: 59 },
                { x: 72, val_0: 34 },
                { x: 73, val_0: 55 },
                { x: 74, val_0: 38 },
                { x: 75, val_0: 78 },
                { x: 76, val_0: 62 },
                { x: 77, val_0: 98 },
                { x: 78, val_0: 50 },
                { x: 79, val_0: 41 },
                { x: 80, val_0: 25 },
                { x: 81, val_0: 56 },
                { x: 82, val_0: 32 },
                { x: 83, val_0: 67 },
                { x: 84, val_0: 28 },
                { x: 85, val_0: 32 },
                { x: 86, val_0: 67 }
            ]
            //dataset0: [
            //    {x: 0, val_0: 0, val_1: 0, val_2: 0, val_3: 0},
            //    {x: 1, val_0: 0.993, val_1: 3.894, val_2: 8.47, val_3: 14.347},
            //    {x: 2, val_0: 1.947, val_1: 7.174, val_2: 13.981, val_3: 19.991},
            //    {x: 3, val_0: 2.823, val_1: 9.32, val_2: 14.608, val_3: 13.509},
            //    {x: 4, val_0: 3.587, val_1: 9.996, val_2: 10.132, val_3: -1.167},
            //    {x: 5, val_0: 4.207, val_1: 9.093, val_2: 2.117, val_3: -15.136},
            //    {x: 6, val_0: 4.66, val_1: 6.755, val_2: -6.638, val_3: -19.923},
            //    {x: 7, val_0: 4.927, val_1: 3.35, val_2: -13.074, val_3: -12.625}
            //]
        };



    });



