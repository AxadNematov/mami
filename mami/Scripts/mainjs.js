// Super Global Variables Definition //
var selected_dcu = "";
var home_title;
var selected_dt_m;
var selected_dt_c;
var selected_dt_c_end;
var selected_consm_id;
var selected_dt_m_g;
var selected_dt_m_g1;
var selected_dt_v;
var selected_gr_id = "";
var selected_gr_gb = "";
var selected_gr_nm = "";
var selected_dt_hp;
var selected_dt_hp_start;
var selected_dt_hp_end;
var selected_tp_nm;
var region;
// meter table var (table2)
var cur_m_step = 1;
var load_m_res = [];
var dcu_list_sum = [];
var load_profile_arr = [];
var undefined_meters = [];
var undefined_meter_list = [];
var task_res = [];
var arr_m = [];
var arr_m_res = [];
var arr_m_log = false;
var arr_m_rev_log = false;
var build_ml_log = false;
var m_ti;
var join_m_it;
var join_m_it_cnd;
var join_m_it_tree;
var selected_tp;
var logged_id;
var account_id
var logged_group_id;
var logged_group_gb;
var parent_id;
var check_login = 0;
//
// meter table global search
var task_arr = new Array;
var list_n = new Array;
var incr = 0;
var task_arr_g = new Array;
var task_arr_v = new Array;
//
var dcu_arr = new Array;
var dcu_tp_arr = new Array;
// consumer table var (table3)
var c_cur_m_step = 1;
var c_load_m_res = [];
var c_arr_m = [];
var c_arr_m_res = [];
var c_arr_m_log = false;
var c_arr_m_rev_log = false;
var c_build_ml_log = false;
var c_m_ti;
var c_join_m_it;
var c_join_m_it_cnd;
var c_join_m_it_tree;
var c_selected_tp;
//
var m_read_mode;
// js Tree
var tree_it;
var tree_global_arr = new Array;
var tree;

var e_g_w_switch = "water";

 var meter_id_gg;
 var dcu_id_gg;
 var consumer_nm_gg;
 var address_gg;
 var type_gg;

//
//var meters_arr = new Array();
//var meters_arr;
var table1;
var table2;
var table3;
var table7;
var table5;
var table2_dp_dcu;
var table1_dp_dcu;
var table_disp;
var table1_home;
var table2_home;
var table3_home;
var table1_dp_met;
var table2_dp_met;
var table1_dp_tp;
var table4_dp_tp;
var table2_g;
var table2_g1;
var table2_v;
var table10;
var table11;
var table91;
var table92;
var table93;
var table_g_drop;
// show details dcu panel log
var show_dcu_detp_log = true;
//var cur_m_log1;
var dt_dcu_pie2_a = 0;
var dt_dcu_pie2_b = 0;
var dt_dcu_pie2_a_c = 0;
var dt_dcu_pie2_b_c = 0;
//
var dcu_id_c;
var arr_consm = [];
var consm_i = 0;
var consm_temp = "";
var highlight_m = false;
//
    var login_u;
    var pass_u;
    var pass2_u;
    var username_u;
    var position_u;
    var relay_u;
    var rh_u;
    var rc_u;
    var tp_name;
    var load_consumers;
    var tree_arr;
    var load_meters;
    var inspector_list;
    var consumers_list = new Array;
    var account_list;
    var load_users;
    var load_users1;
    var selector = 1;
//
var active_dcu_btn = false;
var operator_id;
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

 function ReLoadTree()
 {
	 
    return $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Tree/Tree",
        data: '{id: "' + logged_group_id + '", group_gb: "' + logged_group_gb + '", type_switch: "' + e_g_w_switch + '" }',
        success: function (result) {
            tree_arr = result;
            tree_global_arr = result;            
        }
    })
	
}

function LoadTree(id, gb, e_g_w_switch) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Tree/Tree",
        data: '{id: "' + id + '", group_gb: "' + gb + '", type_switch: "' + e_g_w_switch + '" }',
        success: function (result) {
            tree_arr = result;

            tree_global_arr = result;
			
			
            $("#login_screen").fadeOut(800);
            $("#ht_loader").css('display', 'block');
            setTimeout(ShowHello, 3000);
            
        }
    })
    
  
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
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        cur_m_step = 1;
        cur_m_log1 = 1;
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");
        $("#table_div1").fadeIn("slow");
        $("#table1").css("width", "100%");
        $("#table1").css("height", "100%");
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_dcu").css("display", "block");
        $("#det_consumers").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_met").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "-5000px");
        $("#msg_box").css('display', 'none');

        $("#lm1").hide();
        $("#lm2").hide();
        $("#lm3").hide();
        $("#lm4").hide();
        $("#lm_v").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");

    $("#home_title").text(tree_global_arr[0].text);
    if (tree_global_arr.length != 0) {
        $('#jstree').jstree({
            'core': {
                'data': tree_global_arr,
                "multiple": true,
                "animation": 1,
                "check_callback": true,
                "themes": { "stripes": true, "dots": true, "icons": true },
            },
            "default": {
                "draggable": false
            },
            "search" : {  

                "case_insensitive" : true,  
                "show_only_matches": true,
                "show_only_matches_children": true

            },  
            
            "plugins": ["html_data", "search", "ui", "types", "wholerow"]
           
        });
        clearInterval(tree_it);
        $('#jstree').on('ready.jstree', function () {
            $("#jstree").jstree("open_all");
        });
        //GetDCUListbyTree(logged_group_id, logged_group_gb);
    }
}

function GetDCUListbyTree(id, gb) {
    //  get all read meters
    //alert(id + "   " + gb);
    //$("#dcu_loader").fadeOut(300);
    //$("#meter_loader").fadeOut(300);
    selected_gr_id = id;
    selected_gr_gb = gb;
    $.ajax({
        type: "POST",
        url: "/Tree/GetDCUByTree",
        data: '{group_id: "' + id + '", group_gb: "' + gb + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            table1.clear().draw();
            if ($("#home").css('display') == 'block') {
                table1_home.clear().draw();
                table2_home.clear().draw();
                table3_home.clear().draw();
            }
            var i = 0;
            dcu_arr = [];
            dcu_tp_arr = [];
            while (i < result.length) {
                //alert(dcu[i].dcu_id);
                var stat;
                if (result[i].use_yn == "1") {
                    stat = "<div class='dcu_stat_on'>" + result[i].use_yn + "</div>"
                } else {
                    stat = "<div class='dcu_stat_usen'>" + result[i].use_yn + "</div>";
                }
                table1.row.add([
                i + 1,
                stat,
                result[i].name,
                result[i].dcu_id,
                result[i].dcu_nm,
                result[i].model,
                result[i].model,
                result[i].imei_no,
                //"123456789012345",
                result[i].card_no,
                //"+998 90 777-55-66",
                result[i].install_dt,
                //"18.12.2017"
                ]).draw();

                if ($("#home").css('display') == 'block') {
                    dcu_arr[i] = result[i].dcu_id;
                    dcu_tp_arr[i] = result[i].name;
                }
                ////////////
                i++;
            }
            //

            //
            if ($("#home").css('display') == 'block') {
                //table1_home.row.add([
                ////"<p style='font-size: 10px'>" + (table1_home.rows().count() + 1) + "</p>",
                //table1_home.rows().count() + 1,
                //"<p style='color: #1eff00'>Итого:</p>",
                //"",
                //"",
                //""
                //]).draw(true);
                //InitHomeTable1();
                //InitHomeTable2();
            }
            //BalanceHTPie();
            //
        }
    })
}

// DCU functions //
function LoadDCUList(dcu) {
    //alert("ok");
    clearInterval(join_m_it);
    clearInterval(join_m_it_cnd);
    clearInterval(join_m_it_tree);
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
    $("#dcu_loader").fadeOut(300);
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
            $("#dcu_ktp").val(result[0].name);
            $("#dcu_grpid").val(result[0].group_id);
            $("#dcu_grpnm").val(result[0].name);
            $("#dcu_place").val(result[0].install_place);
            $("#dcu_sim").val(result[0].card_no);
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
            // det panel
            $("#det_dcu_tp").text(result[0].name + ".");
            $("#det_dcu_dcuid").text(result[0].dcu_id + ".");
            $("#det_dcu_dcunm").text(result[0].dcu_nm + ".");
            $("#det_dcu_model").text(result[0].model + ".");
            $("#det_dcu_type").text(result[0].model + ".");
            $("#det_dcu_imei").text(result[0].imei_no + ".");
            $("#det_dcu_sim").text(result[0].card_no + ".");
            $("#det_dcu_instdt").text(result[0].install_dt + ".");
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
function LoadDCUDetPie2(id, sdate, edate) {
    $.ajax({
        type: "POST",
        url: "/Meter/CountReadMeters",
        data: '{dcu_id: "' + id + '", sDate: "' + sdate + '", eDate: "' + edate + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //arr_m_rev_log = false;
            //alert(result);
            var s1;
            var s2;
            var s3;

            var p1 = result.indexOf("|");
            s1 = result.substr(0, p1);
            s2 = result.substr(p1 + 1, result.length);
            var a_read = parseInt(s1);
            var b_all = parseInt(s2);

            dt_dcu_pie2_a = a_read / (b_all / 100);
            dt_dcu_pie2_b = (b_all - a_read) / (b_all / 100);
            dt_dcu_pie2_a_c = b_all - a_read;
            dt_dcu_pie2_b_c = a_read;

            s1 = sdate.substring(0, 4);
            s2 = sdate.substring(4, 6);
            s3 = sdate.substring(6, 8);
            var text_date_s = s3 + "." + s2 + "." + s1;

            s1 = edate.substring(0, 4);
            s2 = edate.substring(4, 6);
            s3 = edate.substring(6, 8);
            var text_date_e = s3 + "." + s2 + "." + s1;

            //$("#dp_det_dcu_date1_start").val(text_date_s);
            //$("#dp_det_dcu_date1_end").val(text_date_e);

            DrawDtDcuPie2(dt_dcu_pie2_a, dt_dcu_pie2_b);
            //alert(dt_dcu_pie2_a);
            //alert(dt_dcu_pie2_b);

            //if ((result.length > 0) || (result == "null")) {
            //    arr_m_res = result;
            //    arr_m_rev_log = true;
            //}
        }
    });
}

function GlobalSearchMeters(search_str, group_id, group_gb, date) {
    $.ajax({
        type: "POST",
        url: "/Meter/GlobalSearchMeters",
        data: '{search: "' + search_str + '", group_id: "' + group_id + '", group_gb: "' + group_gb + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result[0].meter_id);
            load_m_res = result;
            call = "search";
            table2.clear().draw();
            if ($("#search_met").val() != ""){
               BuildMeterList(call);
            }
        }
    })
}

function SignalChartHT() {
    var dtm = new Date();
    var time = dtm.toString();
    var tm = time.substring(16, 21);
    var i = 0;
    var rval;
    var trace_vals = [];
    var trace_lbls = [];
    for (i = 0; i < table3_home.rows().count() ; i++) {
        rval = Math.floor(Math.random() * (95 - 65) + 65);
        table3_home.cell(i, 2).data(tm).draw();
        table3_home.cell(i, 3).data("-"+rval+" dBm").draw();
        trace_lbls[i] = i;
        trace_vals[i] = rval;
    }

    var trace2 = {
        x: trace_lbls,
        y: trace_vals,
        fill: 'tozeroy',
        mode: 'lines',
        name: 'Показания',
        area: 'fill',
        marker: {
            //color: '#f0ff00'
            color: '#03c91b'
        }
    };

    var layout = {
        title: 'Уровень сигнала',
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
        width: 500,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
            //autoexpand: true,
            l: 50,
            r: 20,
            t: 80,
            b: 90
        },
    };
    var data = [trace2];
    Plotly.newPlot('home_chart3', data, layout);
}

//////////////////////
function ForceShowHP() {
    // Force HP showing //
    $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', "0");
    $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
    //$("#lm1").css("display", "none");
    //$("#lm3").css("display", "none");
    $("#home").fadeIn(500);
    $("#table_div1").css("display", "none");
    $("#table_div9").css("display", "none");
    $("#table_div10").css("display", "none");
    $("#table_div11").css("display", "none");
    $("#table_div2").css("display", "none");
    $("#table_div3").css("display", "none");
    $("#table_div4").css("display", "none");
    $("#table_div5").css("display", "none");
    $("#table_div6").css("display", "none");
    $("#table_div7").css("display", "none");
    $("#table_div8").css("display", "none");
    $("#table_div_g").css("display", "none");
    $("#table1").css("width", "100%");
    $("#table1").css("height", "100%");
    //MalibuLineTopOn();
    //setTimeout(MalibuLineTopOff, 600);
    $("#scroll_l").css("display", "none");
    $("#scroll_r").css("display", "none");
    $("#det_dcu").css("display", "none");
    $("#det_consumers").css("display", "none");
    $("#det_user").css("display", "none");
    $("#det_met").css("display", "none");
    $("#det_cons").css("display", "none");
    $("#det_access").css("display", "none");
    $("#det_gas_gprs").css("display", "none");
    $("#det_struct").css("display", "none");
    $("#rightm_div").css("display", "none");
    $("#details_pan").css("left", "-5000px");
    ////////////////////////////////////////////
}
var in_i = 0;
var interval;
var in_i2 = 0;
var interval2;
var read = 0;
var not_read = 0;
var connected = 0;
var all = 0;
var not_connected = 0;
var sum = 0;
var rb_ht1_log = true;
//var tree_busy_log2 = true;
function InitHomeTable2() {
    $("#ht_loader").css('display', 'block');
    if ($("#home_date").val() == "") {
        var dt = new Date();
        var dt_m = dt.getMonth() + 1;
        var dt_d = dt.getDate();
        if (dt_d != 1 && dt_d != 2) {
            dt_d = dt_d - 2;
        }
        var dt_y = dt.getFullYear();
        var fdt_m = dt_m;
        if (dt_m < 10) {
            fdt_m = "0" + fdt_m;
        }
        var fdt_d = dt_d;
        if (dt_d < 10) {
            fdt_d = "0" + fdt_d;
        }
        $("#home_date").val(fdt_m + "/" + fdt_d + "/" + dt_y);
        selected_dt_hp = dt_y + "" + fdt_m + "" + fdt_d;
    }
    HPSummary(dcu_arr, dcu_tp_arr, selected_dt_hp);

    //alert(in_i);
    //if ((in_i + 1) == table2_home.rows().count()) {
    //    clearInterval(interval);
    //    CountHTChartsData();
    //    ForceShowHP();
    //    setTimeout(BuildPiesHT, 1500);
    //    if (rb_ht1_log == true) {
    //        InitHomeTable1();
    //    }
    //    //interval2 = setInterval(InitHomeTable3, 1000);
    //}
}

function CountHTChartsData() {
    var a;
    var i = 0;
    while (i < table2_home.rows().count()-1) {
        a = table2_home.row(i).data();
        all = all + parseInt(a[3]);
        read = read + parseInt(a[4]);
        not_connected = not_connected + parseInt(a[6]);
        i++;
    }
}

var allow_ht_ld = false;
function HPSummary(dcus, tps, date) {
    $.ajax({
        type: "POST",
        url: "/Meter/GetDCUSummary",
        //data: postData,
        data: { dcu_list: dcus, tp_list: tps, date },
        //data: postData2,
        dataType: "json",
        traditional: true,
        success: function (result) {
            dcu_list_sum = result;
            for (var i = 0; i < result.length-1; i++) {
                table2_home.row.add([
                    result[i].index + 1,
                    result[i].tp,
                    result[i].dcu_id,
                    result[i].all,
                    result[i].read,
                    result[i].nread,
                    result[i].left,
                ]).draw();
            };
            if (allow_ht_ld == true) {
                $("#ht_loader").css('display', 'none');
                allow_ht_ld = false;
            }
            CountHTChartsData();
            setTimeout(BuildPiesHT, 1500);
            InitHomeTable3();
        },
    });
}

function InitHomeTable3() {
    if (selected_gr_id == "" && selected_gr_gb == "") {
        SumMUsagebyDCU(logged_group_id, logged_group_gb, selected_dt_hp, selected_dt_hp);
    } else {
        SumMUsagebyDCU(selected_gr_id, selected_gr_gb, selected_dt_hp, selected_dt_hp);
    }
}

function SumMUsagebyDCU(gr_id, gb_gb, sdate, edate) {
    var i = 0;
    $.ajax({
        type: "POST",
        url: "/Meter/SumMBUsagebyDCU",
        data: '{group_id: "' + gr_id + '", group_gb: "' + gb_gb + '", eDate: "' + sdate + '"}',
        //data: '{dcu_id: "6070-00021", sDate: "20180205", eDate: "20180210" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result != "" || result != null) {
                clearInterval(interval2);
                // table3_home
                var sm = 0;
                var b = 0;
                var s = 0;
                var d = 0;
                table3_home.clear().draw();
                for (var i = 0; i < result.length; i++) {
                    sm = result[i].balance - result[i].summa;
                    sm = sm.toFixed(2);
                    table3_home.row.add([
                    i + 1,
                    result[i].dcu,
                    result[i].balance,
                    result[i].summa,
                    "<p style='color: yellow'>" + sm + "</p>",
                    ]).draw();
                    if (result[i].balance > result[i].summa) {
                        b = b + result[i].balance;
                        s = s + result[i].summa;
                    } else {
                        //$("#home_table3 tr:eq(" + (i + 1) + ")").css('background', 'url("/Content/files/stripe3.png")');
                        //$("#home_table3 tr:eq(" + (i + 1) + ")").css('background-size', 'contain');
                    }
                }
                b = b.toFixed(2);
                s = s.toFixed(2);
                d = b - s;
                d = d.toFixed(2);
                table3_home.row.add([
                //"<p style='font-size: 10px'>" + (i + 1) + "</p>",
                i+1,
                "<p style='color: #1eff00'>Итого:</p>",
                "<p style='color: #1eff00'>" + b + "</p>",
                "<p style='color: #1eff00'>" + s + "</p>",
                "<p style='color: #1eff00'>" + d + "</p>",
                ]).draw();
                var a1 = parseFloat(b);
                var a2 = parseFloat(s);
                var a3 = parseFloat(d);
                var c1 = a1 / ((a1 + a2 + a3) / 100);
                var c2 = a2 / ((a1 + a2 + a3) / 100);
                var c3 = a3 / ((a1 + a2 + a3) / 100);
                ForceShowHP();
                if (c1 >= 0) {
                    Pie4HT(c1, c2, c3);
                } else {
                    Pie4HT(0, 0, 100);
                }
            }
        }
    });
}

function BuildPiesHT() {
    $("#hello").css('display', 'none');
    a = table2_home.row(table2_home.rows().count() - 1).data();
    all = all + parseInt(a[3]);
    read = read + parseInt(a[4]);
    not_connected = not_connected + parseInt(a[6]);
    //alert(all);
    in_i = 0;
    ForceShowHP();
    table2_home.row.add([
    //"<p style='font-size: 10px'>" + (table2_home.rows().count() + 1) + "</p>",
    table2_home.rows().count() + 1,
    "",
    "<p style='color: #1eff00'>Итого:</p>",
    "<p style='color: #1eff00'>" + all + "</p>",
    "<p style='color: #1eff00'>" + read + "</p>",
    "<p style='color: #1eff00'>" + (all - read) + "</p>",
    "<p style='color: #1eff00'>" + not_connected + "</p>",
    ]).draw(true);

    $("#drop_home_det div:eq(1) p:eq(1)").text(all);;
    $("#drop_home_det div:eq(1) p:eq(2)").text("---");
    $("#drop_home_det div:eq(1) p:eq(3)").text("---");
    $("#drop_home_det div:eq(1) p:eq(4)").text("---");
    $("#drop_home_det div:eq(1) p:eq(5)").text("---");
    $("#drop_home_det div:eq(1) p:eq(6)").text("---");

    var a = 0;
    var b = 0;
    a = (read / all) * 100;
    b = 100 - a;
    // pie 2
    var trace1 = {
        values: [a, b],
        labels: ['Успешно опрошено', 'Не опрошено'],
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
        title: '',
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
    // pie 3
    a = (all / (all + not_connected)) * 100;
    b = 100 - a;
    var trace1 = {
        values: [a, b],
        labels: ['Подключено', 'Возможно подключить'],
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
        title: '',
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
    // pie 1
    var trace1 = {
        values: [100, 0],
        labels: ['Соединение стабильно', 'Соединение отсутствует'],
        marker: { 'colors': ['906088', '343d75'] },
        domain: {
            x: [0, 1.0]
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

    all = 0;
    read = 0;
    not_connected = 0;
}

function Pie4HT(b, s, d) {

    var trace1 = {
        //values: [s, d],
        //labels: ['Недосдача', 'Получено'],
        //marker: { 'colors': ['03a476', 'dd904c'] },
        values: [d, s],
        labels: ['Недосдача', 'Получено'],
        marker: { 'colors': ['d5db27', '019067'] },
        //marker: { 'colors': ['906088', '3c5663'] },
        domain: {
            x: [0, 1.0]
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
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('home_pie4', data, layout);
    // testing ht_loader
    //$("#ht_loader").css('display', 'none');
}

var labels = [];
var vals = [];
var summa = [];
var balance = [];
var temp_summa = [];
var temp_balance = [];
var obj_arr = [];
var single_dcu_data_b = new Array();
var single_dcu_data_s = new Array();
var n_i = 0;
var g_i = 0;
var p_b = 0;
var p_s = 0;
var p_d = 0;
function InitHomeTable1() {
    $("#ht_loader").css('display', 'block');
    if ($("#home_date_end").val() == "" && $("#home_date_start").val() == "") {
        var dt = new Date();
        var dt_m = dt.getMonth() + 1;
        var dt_d = dt.getDate();
        if (dt_d != 1 && dt_d != 2) {
            dt_d = dt_d - 2;
        }
        var dt_y = dt.getFullYear();
        var fdt_m = dt_m;
        if (dt_m < 10) {
            fdt_m = "0" + fdt_m;
        }
        var fdt_d = dt_d;
        if (dt_d < 10) {
            fdt_d = "0" + fdt_d;
        }
        $("#home_date_end").val(fdt_m + "/" + fdt_d + "/" + dt_y);
        $("#home_date_start").val(fdt_m + "/01/" + dt_y);
        //$("#home_date_end").val(fdt_d + "." + fdt_m + "." + dt_y);
        //$("#home_date_start").val("01" + "." + fdt_m + "." + dt_y);
        selected_dt_hp_end = dt_y + "" + fdt_m + "" + fdt_d;
        selected_dt_hp_start = dt_y + "" + fdt_m + "" + "01";
    }

    var start = $("#home_date_start").datepicker("getDate"); //mm/dd/yyyy
    var end = $("#home_date_end").datepicker("getDate"); //mm/dd/yyyy
    //$("#home_date_end").val(fdt_d + "." + fdt_m + "." + dt_y);
    //$("#home_date_start").val("01" + "." + fdt_m + "." + dt_y);
    //alert($("#home_date_start").val());
    //alert($("#home_date_end").val());

    var i = 0;
    while (start <= end) {
        var mm = ((start.getMonth() + 1) >= 10) ? (start.getMonth() + 1) : '0' + (start.getMonth() + 1);
        var dd = ((start.getDate()) >= 10) ? (start.getDate()) : '0' + (start.getDate());
        var yyyy = start.getFullYear();
        var date = dd + "." + mm + "." + yyyy; //yyyy-mm-dd
        labels[i] = date;
        vals[i] = yyyy + "" + mm + "" + dd;
        summa[i] = 0;
        balance[i] = 0;
        ////
        start = new Date(start.setDate(start.getDate() + 1)); //увеличиваем дату на 1
        i++;
    }
    //GetNextChartDCU();
    ChartDataHT1();
    HT1SingleClick(dcu_arr, vals);
}
////////////////////////// test function
var arr_ht1 = new Array();
function HT1SingleClick(dcus, vals) {
    $.ajax({
        type: "POST",
        url: "/Meter/SingleClickHT1",
        //data: postData,
        data: { dcu_list: dcus, dt_list: vals },
        //data: postData2,
        dataType: "json",
        traditional: true,
        success: function (result) {
            arr_ht1 = result;
            BuildPieBHT();
        },
    });
}
// obsolete //
function GetNextChartDCU() {
    $("#ht_loader").css('display', 'block');
    var a = table1_home.row(g_i).data();
    //alert(single_dcu_data_s[g_i][0]);
    //alert(single_dcu_data_b[g_i][0]);
    temp_summa = [];
    temp_balance = [];
    single_dcu_data_s[g_i] = new Array();
    single_dcu_data_b[g_i] = new Array();
    var i;
    for (i = 0; i < vals.length; i++) {
        temp_summa[i] = 0;
        temp_balance[i] = 0;
        single_dcu_data_s[g_i][i] = 0;
        single_dcu_data_b[g_i][i] = 0;
    }
    for (i = 0; i < vals.length; i++) {
        GetChartBData(i, a[1], vals[i], vals[i + 1]);
    }
}
//                  //
function ChartDataHT1() {
    $.ajax({
        type: "POST",
        url: "/Meter/BalanceChartHT",
        data: '{group_id: "' + selected_gr_id + '", group_gb: "' + selected_gr_gb + '", sDate: "' + selected_dt_hp_start + '", eDate: "' + selected_dt_hp_end + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result != "" || result != null) {
                clearInterval(interval2);
                // table1_home
                var sm = 0;
                var b = 0;
                var s = 0;
                var d = 0;
                table1_home.clear().draw();
                for (var i = 0; i < result.length; i++) {
                    sm = result[i].balance - result[i].summa;
                    sm = sm.toFixed(2);
                    table1_home.row.add([
                    i + 1,
                    result[i].dcu,
                    result[i].balance,
                    result[i].summa,
                    "<p style='color: yellow'>" + sm + "</p>",
                    ]).draw();
                    if (result[i].balance > result[i].summa) {
                        b = b + result[i].balance;
                        s = s + result[i].summa;
                    } else {
                        //$("#home_table1 tr:eq(" + (i + 1) + ")").css('background', 'url("/Content/files/stripe3.png")');
                        //$("#home_table1 tr:eq(" + (i + 1) + ")").css('background-size', 'contain');
                    }
                }
                b = b.toFixed(2);
                s = s.toFixed(2);
                d = b - s;
                d = d.toFixed(2);
                p_b = b;
                p_s = s;
                p_d = d;
                table1_home.row.add([
                //"<p style='font-size: 10px'>" + (i + 1) + "</p>",
                i + 1,
                "<p style='color: #1eff00'>Итого:</p>",
                "<p style='color: #1eff00'>" + b + "</p>",
                "<p style='color: #1eff00'>" + s + "</p>",
                "<p style='color: #1eff00'>" + d + "</p>",
                ]).draw();
                BuildChartBHT();
                //var p = table1_home.row(this).index();
                //SingleChartBuild(p);
            }
        }
    });
}

function BuildPieBHT() {
    var arr_s = [];
    var arr_b = [];
    for (var n = 0; n < arr_ht1[0].length; n++) {
        arr_s[n] = 0;
        arr_b[n] = 0;
    }
        
    for (var n = 0; n < arr_ht1.length; n++) {
        for (var j = 0; j < arr_ht1[n].length-1; j++) {
            if (arr_ht1[n][j][0] != null) {
                var ts = arr_s[j];
                var tb = arr_b[j];
                var val_s = arr_ht1[n][j][0].summa;
                var val_b = arr_ht1[n][j][0].balance;
                arr_s[j] = ts + val_s;
                arr_b[j] = tb + val_b;
            }
        }
    }


    var trace1 = {
        x: labels,
        y: arr_s,
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'Получено кВат',
        marker: {
            color: '#2171ad',
        }
    };
    var trace2 = {
        x: labels,
        y: arr_b,
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'Отпущено кВат',
        marker: {
            color: '#008000'
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
            t: 50,
            b: 100
        },
        legend: {
            x: 0.25,
            y: 22
        }
    };

    var data = [trace1, trace2];
    Plotly.newPlot('home_chart1', data, layout);
    $("#ht_loader").css('display', 'none');
}

function BuildChartBHT() {
    sum = sum.toFixed(2);
    //table1_home.row.add([
    //"<p style='font-size: 1px'>" + (table1_home.rows().count() + 1) + "</p>",
    //"<p style='color: #1eff00'>Итого:</p>",
    //"<p style='color: #1eff00'>" + sum +"</p>",
    //"",
    //""
    //]).draw();

    in_i2 = 0;
    sum = 0;

    p_b = parseFloat(p_b);
    p_s = parseFloat(p_s);
    p_d = parseFloat(p_d);
    //var b = p_b / ((p_b + p_s + p_d) / 100);
    //var s = p_s / ((p_b + p_s + p_d) / 100);
    //var d = p_d / ((p_b + p_s + p_d) / 100);

    var s = p_s / (p_b / 100);
    var d = p_d / (p_b / 100);
    if (p_s == 0) {
        if (p_b == 0) {
            s = 50;
            d = 50;
        }
    }

    var trace1 = {
        values: [s, d],
        labels: ['Получено кВат', 'Недосдача кВат'],
        marker: { 'colors': ['#2171ad', '#d5db27'] },
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
        legend: {
            x: 0,
            y: -50
        },
        hovermode: false,
        showlegend: true,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 300,
        height: 300
    };

    var data = [trace1];
    Plotly.newPlot('home_balance_pie', data, layout);
    //
}

function SingleChartBuild(p) {
    var arr_s = [];
    var arr_b = [];
    //alert(table1_home.cell(p, 1).data());
    //alert(table1_home.rows().count());
    if (p == table1_home.rows().count()) {
        for (var n = 0; n < arr_ht1[0].length; n++) {
            arr_s[n] = 0;
            arr_b[n] = 0;
        }
        for (var n = 0; n < arr_ht1.length-1; n++) {
            for (var j = 0; j < arr_ht1[n].length-1; j++) {
                if (arr_ht1[n][j][0] != null) {
                    var ts = arr_s[j];
                    var tb = arr_b[j];
                    var val_s = arr_ht1[n][j][0].summa;
                    var val_b = arr_ht1[n][j][0].balance;
                    arr_s[j] = ts + val_s;
                    arr_b[j] = tb + val_b;
                }
            }
            //alert(j + "    j");
            //alert(arr_s);
        }
    } else {
        for (var n = 0; n < arr_ht1[0].length - 1; n++) {
            if (arr_ht1[p][n][0] != null) {
                arr_s[n] = arr_ht1[p][n][0].summa;
                arr_b[n] = arr_ht1[p][n][0].balance;
            } else {
                arr_s[n] = 0;
                arr_b[n] = 0;
            }
        }
    }

    var trace1 = {
        x: labels,
        y: arr_s,
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'Получено кВат',
        marker: {
            color: '#2171ad',
        }
    };
    var trace2 = {
        x: labels,
        y: arr_b,
        //fill: 'tozeroy',
        mode: 'lines',
        name: 'Отпущено кВат',
        marker: {
            color: '#008000'
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
            t: 50,
            b: 100
        },
        legend: {
            x: 0.25,
            y: 22
        }
    };

    var data = [trace1, trace2];
    Plotly.newPlot('home_chart1', data, layout);
    $("#ht_loader").css('display', 'none');
}

function SingleCountPieB(sent, got) {
    sent = parseInt(sent);
    got = parseInt(got);
    //var c = ((sent + got + (sent - got)) / 100);
    //var b = sent / c;
    //var s = got / c;
    //var d = (sent - got) / c;
    var s = got / (sent / 100);
    var d = 100 - s;
    //
    var trace1 = {
        values: [s, d],
        labels: ['Получено кВат', 'Недосдача кВат'],
        marker: { 'colors': ['#2171ad', '#d5db27'] },
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
        legend: {
            x: 0,
            y: -50
        },
        hovermode: false,
        showlegend: true,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 300,
        height: 300
    };

    var data = [trace1];
    Plotly.newPlot('home_balance_pie', data, layout);

}

function SingleCountPie4(sent, got) {
    sent = parseInt(sent)
    got = parseInt(got)
    var c = ((sent + got + (sent - got)) / 100);
    var b = sent / c;
    var s = got / c;
    var d = (sent - got) / c;
    //
    var trace1 = {
        values: [d, s],
        labels: ['Недосдача', 'Получено'],
        //marker: { 'colors': ['f8d200', 'b944d2'] },
        marker: { 'colors': ['d5db27', '019067'] },
        //marker: { 'colors': ['906088', '3c5663'] },
        domain: {
            x: [0, 1.0]
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
        legend: {
            x: 0,
            y: -200
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        width: 500
    };

    var data = [trace1];
    Plotly.newPlot('home_pie4', data, layout);

}

function SingleCountPies123(all, read, left) {
    all = parseInt(all)
    read = parseInt(read)
    left = parseInt(left)
    var a = (read / all) * 100;
    var r = 100 - a;
    var l = (all / (all + left)) * 100;
    var c = 100 - l;
    //
    var trace1 = {
        values: [a, r],
        labels: ['Успешно опрошено', 'Не опрошено'],
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
        title: '',
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
    // pie 3
    var trace1 = {
        values: [l, c],
        labels: ['Подключено', 'Возможно подключить'],
        //marker: { 'colors': ['868679', '0f2f68'] },
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
        title: '',
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

}

function GetArrIn() {
    if (arr_in.length > 0) {
        clearInterval(interval);
        var s1;
        var s2;
        var a_read;
        var b_all;
        for (var i = 0; i < arr_in.length; i++) {
            p1 = arr_in[i].indexOf("|");
            s1 = arr_in[i].substr(0, p1);
            s2 = arr_in[i].substr(p1 + 1, arr_in[i].length);
            a_read = parseInt(s1);
            b_all = parseInt(s2);
            table2_home.cell(i, 4).data(a_read).draw();
            table2_home.cell(i, 5).data(b_all).draw();
        }
    }
}

var show_onoff_log = 0;
function LoadMeters(id, date) {
    //alert(id);
    //alert(date);
    //alert(gr_id);
    //alert(gr_gb);
    //alert(show_onoff_log);
    //date = "20180130";
    //  get all read meters
    if (show_onoff_log == 0){
        $.ajax({
            type: "POST",
            url: "/Meter/GetAllMeters",
            data: '{dcu_id: "' + id + '", date: "' + date + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //load_m_res = result;
                //arr_m_log = false;
                //alert("AllMeters    " + result);
                if ((result.length > 0) || (result == "null")) {
                    arr_m = result;
                    arr_m_log = true;
                }
            }
        })
        $.ajax({
            type: "POST",
            url: "/Meter/GetAllMetersReverse",
            data: '{dcu_id: "' + id + '", date: "' + date + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //arr_m_rev_log = false;
                //alert("ReverseMeters    " + result);
                if ((result.length > 0) || (result == "null")) {
                    arr_m_res = result;
                    arr_m_rev_log = true;
                }
            }
        });
    }
    // Count read meters for dcu graphic data
    if (show_onoff_log == 0) {
        $.ajax({
            type: "POST",
            url: "/Meter/CountReadMeters",
            data: '{dcu_id: "' + id + '", sDate: "' + date + '", eDate: "' + date + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //arr_m_rev_log = false;
                var s1;
                var s2;
                var s3;

                var p1 = result.indexOf("|");
                s1 = result.substr(0, p1);
                s2 = result.substr(p1 + 1, result.length);
                var a_read = parseInt(s1);
                var b_all = parseInt(s2);

                dt_dcu_pie2_a = a_read / (b_all / 100);
                dt_dcu_pie2_b = (b_all - a_read) / (b_all / 100);
                dt_dcu_pie2_a_c = b_all - a_read;
                dt_dcu_pie2_b_c = a_read;

                s1 = date.substring(0, 4);
                s2 = date.substring(4, 6);
                s3 = date.substring(6, 8);
                var text_date = s2 + "/" + s3 + "/" + s1;


                $("#dp_det_dcu_date1_start").val(text_date);
                $("#dp_det_dcu_date1_end").val(text_date);
                //alert(dt_dcu_pie2_a);
                //alert(dt_dcu_pie2_b);

                //if ((result.length > 0) || (result == "null")) {
                //    arr_m_res = result;
                //    arr_m_rev_log = true;
                //}
            }
        });
    }
    // Get meters stats
    if (show_onoff_log == 0) {
        $.ajax({
            type: "POST",
            url: "/Meter/GetMAllOnOffNR",
            data: '{dcu_id: "' + id + '", date: "' + date + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var s1 = result;
                var s2;
                if (result != "" || result != null) {
                    //alert(result);
                    s2 = s1.substr(0, s1.indexOf("|"));
                    s1 = s1.replace(s2 + "|", "");
                    $("#circle_nr p").text(s2);

                    s2 = s1.substr(0, s1.indexOf("|"));
                    s1 = s1.replace(s2 + "|", "");
                    $("#circle_on p").text(s2);

                    s2 = s1.substr(0, s1.indexOf("|"));
                    s1 = s1.replace(s2 + "|", "");
                    $("#circle_off p").text(s2);

                    s2 = s1.substr(0, s1.length);
                    $("#circle_all p").text(s2);
                }
            }
        });
    }
    // Load 'On' meters
    if (show_onoff_log == 1) {
        $.ajax({
            type: "POST",
            url: "/Meter/GetAllOnMeters",
            data: '{dcu_id: "' + id + '", date: "' + date + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //load_m_res = result;
                //arr_m_log = false;
                //alert("AllMeters    " + result);
                if ((result.length > 0) || (result == "null")) {
                    arr_m = result;
                    arr_m_log = true;
                }
            }
        })
        $.ajax({
            type: "POST",
            url: "/Meter/GetAllOnMetersReverse",
            data: '{dcu_id: "' + id + '", date: "' + date + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //arr_m_rev_log = false;
                //alert("ReverseMeters    " + result);
                if ((result.length > 0) || (result == "null")) {
                    arr_m_res = result;
                    arr_m_rev_log = true;
                }
            }
        });
    }
    // Load 'Off' meters
    if (show_onoff_log == 2) {
        $.ajax({
            type: "POST",
            url: "/Meter/GetAllOffMeters",
            data: '{dcu_id: "' + id + '", date: "' + date + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //load_m_res = result;
                //arr_m_log = false;
                //alert("AllMeters    " + result);
                if ((result.length > 0) || (result == "null")) {
                    arr_m = result;
                    arr_m_log = true;
                }
            }
        })
        $.ajax({
            type: "POST",
            url: "/Meter/GetAllOffMetersReverse",
            data: '{dcu_id: "' + id + '", date: "' + date + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //arr_m_rev_log = false;
                //alert("ReverseMeters    " + result);
                if ((result.length > 0) || (result == "null")) {
                    arr_m_res = result;
                    arr_m_rev_log = true;
                }
            }
        });
        /////////////////
    }
    // get all unread meters for circle_nr
    if (show_onoff_log == 3) {
        $.ajax({
            type: "POST",
            url: "/Meter/GetAllMetersReverse",
            data: '{dcu_id: "' + id + '", date: "' + date + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //arr_m_rev_log = false;
                //alert("ReverseMeters    " + result);
                if ((result.length > 0) || (result == "null")) {
                    arr_m_res = result;
                    arr_m = "null";
                    arr_m_rev_log = true;
                    arr_m_log = true;
                }
            }
        });
    }

}

function DeployMeterList() {
    //selected_dt_m = "20180120";
    //alert("Running");
    LoadMeters(selected_dcu, selected_dt_m);
    if ((arr_m_log == true) && (arr_m_rev_log == true)) {
        //alert("arr_m    " + arr_m);
        //alert("arr_m_res    " + arr_m_res);
        clearInterval(join_m_it);
        clearInterval(join_m_it_cnd);
        clearInterval(join_m_it_tree);
        show_onoff_log = 0;
        table2.clear().draw();
        if (arr_m == "null") {
            load_m_res = arr_m_res;
            dt_dcu_pie2_a = 0;
            dt_dcu_pie2_b = 100;

            BuildMeterList();
        }
        if (arr_m_res == "null") {
            load_m_res = arr_m;
            dt_dcu_pie2_a = 100;
            dt_dcu_pie2_b = 0;

            BuildMeterList();
        }
        if ((arr_m != "null") && (arr_m_res != "null")) {
            load_m_res = arr_m.concat(arr_m_res);

            BuildMeterList();
        }
    }
    //alert("arr_m    " + arr_m.length + "     " + arr_m);
    //alert("arr_m_res    " + arr_m_res.length + "     " + arr_m_res);
    //alert("load_m_res    " + load_m_res.length + "     " + load_m_res);
}

function BuildMeterList(call) {
    //alert("Start build");
	selected_tp_nm = load_m_res[0].group_nm;
    $("#datatable2").scrollTop(0);
    //build_ml_log = false;
    cur_m_step = 1;
    var stat;
    var on_off;
    var rm;
    var rm2;
    var pat1; 
    var pat2;
    var pat3;
    var pat4;
    var nat;
    var nat1;
    var nat2;
    var nat3;
    var nat4;
    var i = 0;
    var c = 20;
    if (load_m_res.length < 20){
        c = load_m_res.length;
        //alert("c < 20");
    }
	//alert(load_m_res.length);
    while (i < c) {
		//alert("0");
        if (load_m_res[i].dcu_id.length > 5) {
            if (load_m_res[i].status == 3) {
                on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].status + "</div>"
            }
            if (load_m_res[i].status == 2) {
                stat = "<div class='ab_met_stat_err' style='height: 15px; width: 15px;'>" + load_m_res[i].status + "</div>"
            }
            if (load_m_res[i].status == 1) {
                on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + load_m_res[i].status + "</div>"
            }
            if (load_m_res[i].status == 0) {
                on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + load_m_res[i].status + "</div>"
            }
            if (call != "search") {
                if (load_m_res[i].pat == 'null') {
                    rm = "<div class='text_yellow'>0.00</div>";
                    rm2 = "<div class='text_red'>0.00</div>";
                }
                if (load_m_res[i].pat == 0) {
                    rm = "<div class='text_yellow'>0.00</div>";
                    rm2 = "<div class='text_red'>0.00</div>";
                }
                else {
                    rm = "<div class='text_green'>" + load_m_res[i].pat + "</div>";
                    rm2 = "<div class='text_green'>" + load_m_res[i].pat + "</div>";
                };
            } else {
                if (load_m_res[i].pat == 'null') {
                    rm = "<div class='text_yellow'>0.00</div>";
                    rm2 = "<div class='text_red'>0.00</div>";
                }
                if (load_m_res[i].pat == 0) {
                    rm = "<div class='text_yellow'>0.00</div>";
                    rm2 = "<div class='text_red'>0.00</div>";
                }
                else {
                    rm = "<div class='text_green'>" + load_m_res[i].pat + "</div>";
                    rm2 = "<div class='text_green'>" + load_m_res[i].pat + "</div>";
                };
            }
            if (load_m_res[i].pat1 == 'null') {
                pat1 = "<div class='text_red'>0.00</div>";
            }
            if (load_m_res[i].pat1 == 0) {
                pat1 = "<div class='text_red'>0.00</div>";
            }
            else {
                pat1 = "<div class='text_green'>" + load_m_res[i].pat1 + "</div>";
            }
            if (load_m_res[i].pat2 == 'null') {
                pat2 = "<div class='text_red'>0.00</div>";
            }
            if (load_m_res[i].pat2 == 0) {
                pat2 = "<div class='text_red'>0.00</div>";
            }
            else {
                pat2 = "<div class='text_green'>" + load_m_res[i].pat2 + "</div>";
            }
            if (load_m_res[i].pat3 == 'null') {
                pat3 = "<div class='text_red'>0.00</div>";
            }
            if (load_m_res[i].pat3 == 0) {
                pat3 = "<div class='text_red'>0.00</div>";
            }
            else {
                pat3 = "<div class='text_green'>" + load_m_res[i].pat3 + "</div>";
            }
            if (load_m_res[i].pat4 == 'null') {
                pat4 = "<div class='text_red'>0.00</div>";
            }
            if (load_m_res[i].pat4 == 0) {
                pat4 = "<div class='text_red'>0.00</div>";
            }
            else {
                pat4 = "<div class='text_green'>" + load_m_res[i].pat4 + "</div>";
            }
            if (load_m_res[i].nat == 'null') {
                nat = "<div class='text_red'>0.00</div>";
            }
            if (load_m_res[i].nat == 0) {
                nat = "<div class='text_red'>0.00</div>";
            }
            else {
                nat = "<div class='text_green'>" + load_m_res[i].nat + "</div>";
            }
            if (load_m_res[i].nat1 == 'null') {
                nat1 = "<div class='text_red'>0.00</div>";
            }
            if (load_m_res[i].nat1 == 0) {
                nat1 = "<div class='text_red'>0.00</div>";
            }
            else {
                nat1 = "<div class='text_green'>" + load_m_res[i].nat1 + "</div>";
            }
            if (load_m_res[i].nat2 == 'null') {
                nat2 = "<div class='text_red'>0.00</div>";
            }
            if (load_m_res[i].nat2 == 0) {
                nat2 = "<div class='text_red'>0.00</div>";
            }
            else {
                nat2 = "<div class='text_green'>" + load_m_res[i].nat2 + "</div>";
            }
            if (load_m_res[i].nat3 == 'null') {
                nat3 = "<div class='text_red'>0.00</div>";
            }
            if (load_m_res[i].nat3 == 0) {
                nat3 = "<div class='text_red'>0.00</div>";
            }
            else {
                nat3 = "<div class='text_green'>" + load_m_res[i].nat3 + "</div>";
            }
            if (load_m_res[i].nat4 == 'null') {
                nat4 = "<div class='text_red'>0.00</div>";
            }
            if (load_m_res[i].nat4 == 0) {
                nat4 = "<div class='text_red'>0.00</div>";
            }
            else {
                nat4 = "<div class='text_green'>" + load_m_res[i].nat4 + "</div>";
            }
		
            table2.row.add([
            table2.rows().count() + 1,
            "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox' value='" + table2.rows().count() + "'>",
            stat,
            on_off,
            load_m_res[i].group_nm,
            load_m_res[i].dcu_id,
            load_m_res[i].meter_id,
            load_m_res[i].point_no,
            load_m_res[i].meter_nm,
            load_m_res[i].install_place,
            $("#met_day_date").val(),
            "<div class='text_yellow'>" + load_m_res[i].apm + "</div>",
            rm2,
            pat1,
            pat2,
            pat3,
            pat4,
            nat,
            nat1,
            nat2,
            nat3,
            nat4,
            "0000000",
            "---"
            ]).draw();
            i++;
        }
    };
    //$("#table2 tr").css('background-size', 'contain');

    var dt = new Date();
    var mm = ((dt.getMonth() + 1) >= 10) ? (dt.getMonth() + 1) : '0' + (dt.getMonth() + 1);
    var dd = ((dt.getDate()) >= 10) ? (dt.getDate()) : '0' + (dt.getDate());
    var yyyy = dt.getFullYear();
    var start_dt = mm + "/" + "01/" + yyyy; //yyyy-mm-dd
    var end_dt = mm + "/" + dd + "/" + yyyy; //yyyy-mm-dd
    $("#dp_det_dcu_date1_start").val(start_dt);
    $("#dp_det_dcu_date1_end").val(end_dt);
    //
    DateRangeDCUDet();
    //
    //var start_dt = "01." + mm + "." + yyyy; //yyyy-mm-dd
    //var end_dt = dd + "." + mm + "." + yyyy; //yyyy-mm-dd
    //$("#dp_det_dcu_date1_start").val(start_dt);
    //$("#dp_det_dcu_date1_end").val(end_dt);

    DrawDtDcuPie1();
    DrawDtDcuPie2(dt_dcu_pie2_a, dt_dcu_pie2_b);
    DrawDtDcuPie3(dt_dcu_pie2_a_c, dt_dcu_pie2_b_c);
    DrawDtDcuPie4();

    $("#dcu_loader").fadeOut(300);
    $("#meter_loader").fadeOut(300);
    //build_ml_log = true;
    //clearInterval(m_ti);
}

function GetMeterStats(id, date) {
    $.ajax({
        type: "POST",
        url: "/Meter/GetMAllOnOffNR",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var s1 = result;
            var s2;
            if (result != "" || result != null) {

                alert(result);
                //s2 = s1.substr(0, s1.indexOf("|"));
                //s1 = s1.replace(s2 + "|", "");

                //s2 = s1.substr(0, s1.indexOf("|"));
                //s1 = s1.replace(s2 + "|", "");
                //obj.text = obj.id + " " + s2;

                //s2 = s1.substr(0, s1.length);
                //s1 = s1.replace(s2 + "|", "");
                //obj.parent = s2;
            }
        }
    });
}

function BuildMeterListDispatcher() {
    //alert("Start build");
    $("#datatable2").scrollTop(0);
    //build_ml_log = false;
    var stat;
    var on_off;
    var rm;
    var rm2;
    var i = 0;
    task_arr = [];
    while (i < task_res.length) {
        if (task_res[i].dcu_id.length > 5) {
            if (task_res[i].status == 3) {
                on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>"
                stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + task_res[i].status + "</div>"
            }
            if (task_res[i].status == 2) {
                stat = "<div class='ab_met_stat_err' style='height: 15px; width: 15px;'>" + task_res[i].status + "</div>"
            }
            if (task_res[i].status == 1) {
                on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>"
                stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + task_res[i].status + "</div>"
            }
            if (task_res[i].status == 0) {
                on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + task_res[i].status + "</div>"
            }
            if ((task_res[i].pat == "1") || (task_res[i].pat == "2")) {
                rm = "";
            } else {
                rm = task_res[i].pat;
            }
            var apm = parseFloat(task_res[i].pat) + parseFloat(task_res[i].nat);
            table2.row.add([
            table2.rows().count() + 1,
            "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox' value='" + table2.rows().count() + "'>",
            stat,
            on_off,
            selected_tp_nm,
            task_res[i].dcu_id,
            task_res[i].meter_id,
            task_res[i].point_no,
            task_res[i].meter_nm,
            task_res[i].install_place,
            task_res[i].dt,
            apm,
            task_res[i].pat,
            task_res[i].pat1,
            task_res[i].pat2,
            task_res[i].pat3,
            task_res[i].pat4,
            task_res[i].nat,
            task_res[i].nat1,
            task_res[i].nat2,
            task_res[i].nat3,
            task_res[i].nat4,
            "0000000",
            "---"
            ]).draw();
            i++;
        }
    };
    $("#dcu_loader").fadeOut(300);
    $("#meter_loader").fadeOut(300);
};

function DateRangeDCUDet() {
    var start = $("#dp_det_dcu_date1_start").datepicker("getDate"); //yyyy-mm-dd
    var end = $("#dp_det_dcu_date1_end").datepicker("getDate"); //yyyy-mm-dd
    var result = [];
    var vals = [];
    var min_level = [];
    var i = 0;

    table2_dp_dcu.clear().draw();
    table1_dp_dcu.clear().draw();
    while (start <= end) {
        var mm = ((start.getMonth() + 1) >= 10) ? (start.getMonth() + 1) : '0' + (start.getMonth() + 1);
        var dd = ((start.getDate()) >= 10) ? (start.getDate()) : '0' + (start.getDate());
        var yyyy = start.getFullYear();
        var date = dd + "." + mm + "." + yyyy; //yyyy-mm-dd
        //var rval = Math.floor(Math.random() * 80);     // returns a number between 0 and 99
        var rval = Math.floor(Math.random() * (95 - 65) + 65);
        result[i] = date;
        vals[i] = rval;
        min_level[i] = 80;
        //
        table2_dp_dcu.row.add([
        table2_dp_dcu.rows().count() + 1,
        result[i],
        "<div class='text_red'>-" + rval + " dBm</div>",
        ]).draw();
        //
        table1_dp_dcu.row.add([
        table1_dp_dcu.rows().count() + 1,
        result[i],
        "<div class='text_red'>----</div>",
        "<div class='text_green'>----</div>",
        ]).draw();
        //
        start = new Date(start.setDate(start.getDate() + 1)); //увеличиваем дату на 1
        i++;
    }
    DCUDetSignalGraph(result, vals, min_level);
}

function BuildConsumeGraph(titles, vals, m_id) {
    var arr = [];
    var i = 0;
    var dt_s;
    var dt_e;
    var l = vals.length;
    while (i < vals.length-1){
        dt_s = vals[i];
        dt_e = vals[i + 1];
        //alert(dt_s);
        //alert(dt_e);
        $.ajax({
            type: "POST",
            url: "/Meter/GetUsageDivision",
            data: '{sDate: "' + dt_s + '", eDate: "' + dt_e + '", meter_id: "' + m_id + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                CombineConsmArr(result, l);
            }
        });
        i++;
    }
}

function CombineConsmArr(res, v_l) {
    var s1 = res.substring(0, 8);
    var s2 = res.substring(9, res.length);
    arr_consm[consm_i] = [];
    arr_consm[consm_i][0] = s1;
    arr_consm[consm_i][1] = parseFloat(s2);
    consm_i++;
    var arr_l = arr_consm.length;
    if (v_l-1 == arr_l) {
        arr_consm.sort(sName);
        ConsumerDetGraph(arr_consm);
    }
}

function sName(a, b) {
    if (a[0] > b[0]) return 1;
    else if (a[0] < b[0]) return -1;
    else return 0;
}

// Graphics for DCU details
function DrawDtDcuPie1() {
    var trace1 = {
        values: [100, 0],
        labels: ['Соединение стабильно', 'Соединения нет'],
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
        //title: 'Cвязь с концентратором',
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
}

function DrawDtDcuPie2(a, b) {
    var trace1 = {
        values: [a, b],
        //labels: ['Успешно опрошенные счетчики - ' + dt_dcu_pie2_b_c, 'Не опрошенные счетчики - ' + dt_dcu_pie2_a_c],
        labels: ['Успешно опрошенные счетчики', 'Не опрошенные счетчики'],
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
        //title: 'Статистика опроса',
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

    setTimeout(SetActDCUbtn, 2000);
}
// DrawDtDcuPie4 satelite function
function SetActDCUbtn() {
    active_dcu_btn = false;
    $("#msg_box").fadeOut(500);
}

function DrawDtDcuPie3(a, b) {
    var c = a + b;
    var d = c / 3;
    var e = (2000 - c) / 3;
    var trace1 = {
        values: [d, e],
        labels: ['Подключено счетчиков - ' + (a + b), 'Возможно подключить - ' + (300 - (a + b))],
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
        //title: 'Количество счетчиков',
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
}

function DrawDtDcuPie4() {
    var trace1 = {
        values: [100, 0],
        labels: [ 'Зпросы прошли успешно', 'Запросы потеряны'],
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
        //title: 'Статистика обмена данными',
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
}

function DCUDetSignalGraph(arr_dt, arr_vals, arr_minl) {
    //test_arr = ["01.01.2018", "02.01.2018", "03.01.2018", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
    //alert(arr_dt);
    //alert(arr_vals);
    var trace1 = {
        x: arr_dt,
        y: arr_vals,
        fill: 'tozeroy',
        mode: 'lines',
        name: 'Текущий уровень',
        area: 'fill',
        marker: {
            color: '#f556e4'
        }
    };
    var trace2 = {
        x: arr_dt,
        y: arr_minl,
        fill: 'none',
        mode: 'lines',
        name: 'Минимальный уровень',
        marker: {
            color: 'red'
        }
    };

    var layout = {
        title: 'Уровень сигнала',
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
            b: 90
        },
    };
    var data = [trace1];
    Plotly.newPlot('dp_dcu_chart1', data, layout);
    //$('#source').tableBarChart('#chart1', '', false);
}

function ConsumerDetPat(id, date) {
    $.ajax({
        type: "POST",
        url: "/Meter/PatbyDate",
        data: '{sDate: "' + date + '", meter_id: "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var pat = result[0].pat;
            $("#det_cons_pat").text(pat);
        }
    })
}

function ConsumerDetGraph(main_arr) {
    var arr_t = [];
    var arr_v = [];
    var i = 0;
    while (i < main_arr.length){
        var s1 = main_arr[i][0].substr(0, 4);
        var s2 = main_arr[i][0].substr(4, 2);
        var s3 = main_arr[i][0].substr(6, 2);
        str = s3 + "." + s2 + "." + s1;
        if (parseFloat(parseFloat(main_arr[i][1])) > 0) {
            arr_t[i] = str;
            arr_v[i] = parseFloat(main_arr[i][1]);
            //alert(parseFloat(main_arr[i][1]));
        } else {
            //alert("Negative");
            arr_t[i] = str;
            arr_v[i] = parseFloat(0);
            i++;
            s1 = main_arr[i][0].substr(0, 4);
            s2 = main_arr[i][0].substr(4, 2);
            s3 = main_arr[i][0].substr(6, 2);
            str = s3 + "." + s2 + "." + s1;
            arr_t[i] = str;
            arr_v[i] = parseFloat(0);
        }
        //alert(arr_v[i]);
        i++;
    }

    var trace1 = {
        x: arr_t,
        y: arr_v,
        name: 'Получено кВат',
        fill: 'tozeroy',
        mode: 'lines',
        area: 'fill',
        marker: {
            color: '#1cc2ff'
        },
    };

    var layout = {
        //title: 'Потребление электроэнергии за указанный период',
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
        height: 360,
        margin: {
            //autoexpand: true,
            l: 50,
            r: 30,
            t: 35,
            b: 90
        },
    };

    var data = [trace1];
    Plotly.newPlot('r_r_graph', data, layout)


    $("#cons_det_loader").fadeOut(400);
    $("#chart_cover").css('display', 'none');
}
////////

function TestSend() {
    // abcde

    var test_obj_arr = new Array;

    var obj = {};
    obj.operator_id = "op1";
    obj.operation_id = "12345";
    obj.dcu_id = "6070-00021";
    obj.meter_id = "201620001375";
    obj.process = "";
    obj.result = "";
    obj.target = "on";
    test_obj_arr[0] = obj;

    var obj = {};
    obj.operator_id = "op1";
    obj.operation_id = "12345";
    obj.dcu_id = "6070-00021";
    obj.meter_id = "201620000696";
    obj.process = "";
    obj.result = "";
    obj.target = "on";
    test_obj_arr[1] = obj;

    var obj = {};
    obj.operator_id = "op1";
    obj.operation_id = "12345";
    obj.dcu_id = "6070-00021";
    obj.meter_id = "201620000731";
    obj.process = "";
    obj.result = "";
    obj.target = "on";
    test_obj_arr[2] = obj;


    $.ajax({
        type: "POST",
        url: "/Meter/GetAllMetersConsDiff",
        data: '{data: "' + test_obj_arr + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert(result);
        }
    })
}

function GlobalSearchConsumer(search_str, group_id, group_gb, sdate, edate) {
    $.ajax({
        type: "POST",
        url: "/Meter/GlobalMeterSearchConsumer",
        data: '{search: "' + search_str + '", group_id: "' + group_id + '", group_gb: "' + group_gb + '", date: "' + sdate + '", date2: "' + edate + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result[0].meter_id);
            c_load_m_res = result;
            call = "search";
            table3.clear().draw();
            if ($("#search_cons").val() != "") {
                BuildConsumerList(call);
            }
        }
    })
}

function LoadConsumerMeters(id, sdate, edate) {
    //  get all read meters
    //sdate = "20180120";
    //edate = "20180122";
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllMetersConsDiff",
        data: '{dcu_id: "' + id + '", date: "' + sdate + '", date2: "' + edate + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //load_m_res = result;
            //arr_m_log = false;
            //alert(result);
            if ((result.length > 0) || (result == "null")) {
                c_arr_m = result;
                c_arr_m_log = true;
                c_arr_m_rev_log = true;
            }
        }
    })
    // get all unread meters
    //$.ajax({
    //    type: "POST",
    //    url: "/Meter/GetAllMetersReverse",
    //    data: '{dcu_id: "' + id + '", date: "' + sdate + '" }',
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        //arr_m_rev_log = false;
    //        //alert(result);
    //        //alert(id + date);
    //        if ((result.length > 0) || (result == "null")) {
    //            c_arr_m_res = result;
    //            c_arr_m_rev_log = true;
    //        }
    //    }
    //});
}

function DeployConsumerList() {
    //if (selected_dt_c_end == null && selected_dt_c == null) {
    //    selected_dt_c_end = selected_dt_m;
    //    selected_dt_c = selected_dt_m;
    //    var a = $("#cons_start_date_main").val();
    //    $("#cons_end_date_main").val(a);
    //}
    LoadConsumerMeters(selected_dcu, selected_dt_c, selected_dt_c_end);
    //alert(c_arr_m_log);
    //alert(c_arr_m_rev_log);
    //alert("c_arr_m    " + c_arr_m);
    //alert("c_arr_m_res    " + c_arr_m_res);
    if ((c_arr_m_log == true) && (c_arr_m_rev_log == true)) {
        clearInterval(c_join_m_it);
        clearInterval(c_join_m_it_tree);
        clearInterval(c_join_m_it_cnd);
        table3.clear().draw();
        //if (c_arr_m_res == "null") {
        //    c_load_m_res = c_arr_m
        //} else {
        //    c_load_m_res = c_arr_m.concat(c_arr_m_res);
        //}
        c_load_m_res = c_arr_m;
        BuildConsumerList();
        //if (c_arr_m == "null") {
        //    c_load_m_res = c_arr_m_res;
        //    //alert("c_arr_m - null");
        //    BuildConsumerList();
        //}
        //////alert("Good3");
        //if (c_arr_m_res == "null") {
        //    c_load_m_res = c_arr_m;
        //    //alert("c_arr_m_res - null");
        //    BuildConsumerList();
        //}
        //////alert("Good4");
        //if ((c_arr_m != "null") && (c_arr_m_res != "null")) {
        //    c_load_m_res = c_arr_m.concat(c_arr_m_res);
        //    //alert("c_arr_m    " + c_arr_m);
        //    //alert("c_arr_m_res    " + c_arr_m_res);
        //    BuildConsumerList();
        //}
    }
    //alert("arr_m    " + arr_m.length + "     " + arr_m);
    //alert("arr_m_res    " + arr_m_res.length + "     " + arr_m_res);
    //alert("load_m_res    " + load_m_res.length + "     " + load_m_res);
}

function BuildConsumerList(call) {
    //alert("Start build");
    $("#datatable3").scrollTop(0);
    //build_ml_log = false;
    c_cur_m_step = 1;
    var stat;
    var on_off;
    var dif1;
    var dif2;
    var dif;
    var i = 0;
    //alert(load_m_res[0].meter_id + " test");
    if (c_load_m_res != "null") {
        while (i < 20) {
            //alert(i);
            //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
            //if (c_load_m_res[i].use_yn == "1") {
            //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + c_load_m_res[i].use_yn + "</div>"
            //} else {
            //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + c_load_m_res[i].use_yn + "</div>";
            //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
            //}

            if (c_load_m_res[i].status == 3) {
                on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + c_load_m_res[i].status + "</div>"
            }
            if (c_load_m_res[i].status == 2) {
                stat = "<div class='ab_met_stat_err' style='height: 15px; width: 15px;'>" + c_load_m_res[i].status + "</div>"
            }
            if (c_load_m_res[i].status == 1) {
                on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + c_load_m_res[i].status + "</div>"
            }
            if (c_load_m_res[i].status == 0) {
                on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + c_load_m_res[i].status + "</div>"
            }

            if (c_load_m_res[i].dif != null) {
                dif = "<div class='text_green'>" + c_load_m_res[i].dif + "</div>";
                dif1 = "<div class='text_orange'>" + c_load_m_res[i].dif1 + "</div>";
                dif2 = "<div>" + c_load_m_res[i].dif2 + "</div>";
            } else {
                dif = "<div class='text_yellow'>---</div>";
                dif1 = "<div class='text_yellow'>---</div>";
                dif2 = "<div class='text_yellow'>---</div>";
            }

            table3.row.add([
            table3.rows().count() + 1,
            "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
            stat,
            on_off,
            c_load_m_res[i].group_nm,
            c_load_m_res[i].meter_id,
            c_load_m_res[i].meter_nm,
            c_load_m_res[i].install_place,
            "000000000",
            dif1,
            dif2,
            dif,
            ]).draw();
            i++;
        };
    }
    $("#dcu_loader").fadeOut(300);
    $("#consumer_loader").fadeOut(300);
    //c_build_ml_log = true;

    //clearInterval(c_m_ti);
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

function SendTaskRequest(task_array) {
    //alert(task_array[0].meter_id);
    $.ajax({
        type: "POST",
        url: "/Meter/ReceiveTaskData",
        //data: '{data[]: "' + task_array + '" }',
        data: JSON.stringify(task_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result);
        }
    })
}

function SendTaskRequest_g(task_array) {
    //alert(task_array[0].meter_id);
    $.ajax({
        type: "POST",
        url: "/Meter/UploadGasMeterForReading",
        //data: '{data[]: "' + task_array + '" }',
        data: JSON.stringify(task_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result);
        }
    })
}

function SendTaskRequest_v(task_array) {
    //alert(task_array[0].meter_id);
    $.ajax({
        type: "POST",
        url: "/Meter/UploadGasMeterForReading",
        //data: '{data[]: "' + task_array + '" }',
        data: JSON.stringify(task_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result);
        }
    })
}
function GasGPRSMeters()
{
    $.ajax({
        type: "POST",
        url: "/Meter/GasGPRSMeters",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            table_g_drop.clear().draw();
            var i;
            for(i=0; i<result.length; i++)
            {
                var read_dt;
                var date;
                var year;
                var month;
                var day;
                read_dt = result[i].reg_date;
                year = read_dt.substring(0, 4);
                month = read_dt.substring(4, 6);
                day = read_dt.substring(6, 8);
                date = day + "." + month + "." + year;
                table_g_drop.row.add([
                table_g_drop.rows().count() + 1,
                result[i].meter_id,
                date,
                ]).draw();
            }
            }
        })
}

function SendCheckRequest(operator_id, operation_id) {
    //alert(task_array[0].meter_id);
    $.ajax({
        type: "POST",
        url: "/Meter/OperationsCheck",
        data: '{operator_id: "' + operator_id + '", operation_id: "' + operation_id + '" }',
        //data: JSON.stringify(task_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var i;
            var a;
            if (result != "no"){
                for (i = 0; i < table_disp.rows().count() ; i++) {
                    a = table_disp.row(i).data();
                    if (a[1] == result) {
                        if (table_disp.cell(i, 5).data() != "<div class='ready_disp'></div>") {
                            table_disp.cell(i, 5).data("<div class='ready_disp'></div>").draw()
                            $("#dispatcher").css('background', 'url("/Content/files/dispatcher_ready.png")');
                        }
                        //alert(result);
                        //alert(table_disp.cell(i, 5).data());
                    }
                }
            }
        //   
        }
    })
}

function SendCheckRequest_g(operator_id, operation_id) {
    //alert(task_array[0].meter_id);
    $.ajax({
        type: "POST",
        url: "/Meter/OperationsGasCheck",
        data: '{operator_id: "' + operator_id + '", operation_id: "' + operation_id + '" }',
        //data: JSON.stringify(task_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var i;
            var a;
            if (result != "no") {
                for (i = 0; i < table_disp.rows().count() ; i++) {
                    a = table_disp.row(i).data();
                    if (a[1] == result) {
                        if (table_disp.cell(i, 5).data() != "<div class='ready_disp'></div>") {
                            table_disp.cell(i, 5).data("<div class='ready_disp'></div>").draw()
                            $("#dispatcher").css('background', 'url("/Content/files/dispatcher_ready.png")');
                        }
                        //alert(result);
                        //alert(table_disp.cell(i, 5).data());
                    }
                }
            }
            //   
        }
    })
}

function SendCheckRequest_v(operator_id, operation_id) {
    //alert(task_array[0].meter_id);
    $.ajax({
        type: "POST",
        url: "/Meter/OperationsWaterCheck",
        data: '{operator_id: "' + operator_id + '", operation_id: "' + operation_id + '" }',
        //data: JSON.stringify(task_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var i;
            var a;
            if (result != "no") {
                for (i = 0; i < table_disp.rows().count() ; i++) {
                    a = table_disp.row(i).data();
                    if (a[1] == result) {
                        if (table_disp.cell(i, 5).data() != "<div class='ready_disp'></div>") {
                            table_disp.cell(i, 5).data("<div class='ready_disp'></div>").draw()
                            $("#dispatcher").css('background', 'url("/Content/files/dispatcher_ready.png")');
                        }
                        //alert(result);
                        //alert(table_disp.cell(i, 5).data());
                    }
                }
            }
            //   
        }
    })
}

function GetTaskResult(operator_id, operation_id) {
    //alert(task_array[0].meter_id);
    $.ajax({
        type: "POST",
        url: "/Meter/ReturnTaskResult",
        //data: '{operator_id: "' + operator_id + '", operation_id: "' + operation_id + '" }',
        //data: JSON.stringify(task_array),
        data: '{operator_id:"' + operator_id + '", operation_id:"' + operation_id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result);
            if (result.length > 0) {
                task_res = result;
                BuildMeterListDispatcher();
            }
        }
    })
}


function GetTaskResult_g(operator_id, operation_id) {
    //alert(task_array[0].meter_id);
    $.ajax({
        type: "POST",
        url: "/Meter/ReturnGasTaskResult",
        data: '{operator_id: "' + operator_id + '", operation_id: "' + operation_id + '" }',
        //data: JSON.stringify(task_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            table2_g.clear().draw();
            var i = 0;
            while (i < result.length) {
                var dt = result[i].dt;
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s3 + "" + s1 + "" + s2;
                var val;
                if (result[i].real_value == 0) {
                    val = "---";
                } else {
                    val = result[i].real_value;
                }
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].rs == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].rs + "</div>"
                }
                if (result[i].rs == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].rs + "</div>"
                }
                table2_g.row.add([
                table2_g.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                result[i].group_nm,
                result[i].dcu_id,
                result[i].meter_id,
                result[i].consumer,
                result[i].address,
                dt,
                val,
                ]).draw();
                i++;
            };
            
        }
    })
}

function GetTaskResult_v(operator_id, operation_id) {
    //alert(task_array[0].meter_id);
    $.ajax({
        type: "POST",
        url: "/Meter/ReturnWaterTaskResult",
        data: '{operator_id: "' + operator_id + '", operation_id: "' + operation_id + '" }',
        //data: JSON.stringify(task_array),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            table2_v.clear().draw();
            var i = 0;
            while (i < result.length) {
                var dt = result[i].dt;
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s3 + "" + s1 + "" + s2;
                var val;
                if (result[i].real_value == 0) {
                    val = "---";
                } else {
                    val = result[i].real_value;
                }
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].rs == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].rs + "</div>"
                }
                if (result[i].rs == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].rs + "</div>"
                }
                table2_v.row.add([
                    table2_v.rows().count() + 1,
                    "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                    stat,
                    on_off,
                    result[i].group_nm,
                    result[i].dcu_id,
                    result[i].meter_id,
                    result[i].consumer,
                    result[i].address,
                    dt,
                    val,
                ]).draw();
                i++;
            };

        }
    })
}

var login_once = false;
var login_p_id = "";
var login_gb = "";
var login_id = "";
var login_nm = "";
function Login(login, password) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/User/Login",
        data: '{login: "' + login + '", password: "' + password + '" }',
        success: function (result) {
            if (login_once == false) {
                login_once = true;
                if (result.length > 0) {
                    //$("#login_screen").fadeOut(800);
                    var id = result[0].group_id;
                    var gb = result[0].group_gb;
                    login_p_id = result[0].parent_id;

                    logged_id = result[0].id;
                    logged_group_id = result[0].group_id;
                    logged_parent_id = result[0].parent_id;
                    logged_group_gb = result[0].group_gb;

                    login_gb = gb;
                    login_id = id;
                    login_nm = login;
                    LoadTree(id, gb, e_g_w_switch);
                    //UsersList(id, gb, login);
                    //$.getJSON("/Tree/Tree", null, LoadTree);
                    tree_it = setInterval(BuildTree, 4000);
                    //setInterval(SignalChartHT, 15000);
                    setInterval(CheckDispatcherTasks, 5000);
                    //setInterval(GasGPRSMeters, 10000);
                } else {
                    login_once = false;
                }
            }
        }
    })
}

function SearchLogs(login, date, operation) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/User/SearchLogs",
        data: '{login: "' + login + '", date: "' + date + '", operation:"' + operation + '" }',
        success: function (result) {
            table7.clear().draw();
            for (var i = 0; i < result.length; i++) {
                if (result[i].ip_address != "") {
                    var ip = result[i].ip_address;
                } else {
                    var ip = "89.236.212.66";
                }
                //
                if (result[i].machine != "") {
                    var pc = result[i].machine;
                } else {
                    var pc = "RES-PC";
                }
                //
                if (result[i].meter_id != "") {
                    var m_id = result[i].meter_id;
                } else {
                    var m_id = "";
                }
                //
                var op = "";
                switch (result[i].operation) {
                    case "in":
                        op = "Вход в систему";
                        break;
                    case "history":
                        op = "Считывание с памяти концентратора";
                        break;
                    case "current":
                        op = "Считывание с счетчика";
                        break;
                    case "on":
                        op = "Включение счетчика";
                        break;
                    case "off":
                        op = "Выключение счетчика";
                        break;
                    default:
                        "";
                }
                table7.row.add([
                table7.rows().count() + 1,
                result[i].username,
                m_id,
                op,
                ip,
                pc,
                result[i].date,
                result[i].time,
                ]).draw();
            }
        }
    })
}

function GetUsers() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/User/GetUsers",
        //data: '{login: "' + login + '", date: "' + date + '", operation:"' + operation + '" }',
        success: function (result) {
            var i = 0;
            $("#dropdown7_1 div").remove();
            while (i < result.length) {
                $("#dropdown7_1").append('<div style="width: 100%; height: 23px; border-radius: 3px;"><p>' + result[i].user + '</p></div>');
                i++
            }
        }
    })
}

function CheckDispatcherTasks() {
    var i;
    var a;
    for (i = 0; i < table_disp.rows().count() ; i++) {
        a = table_disp.row(i).data();
        SendCheckRequest(a[0], a[1]);
        SendCheckRequest_g(a[0], a[1]);
    }
    //$("#disp_label").text("Диспетчер задач -  " + table_disp.rows().count() + " операций выполняются");
}

function RunBuildingDCUList() {
    //alert(tree_global_arr[0].id);
    GetDCUListbyTree(logged_group_id, logged_group_gb);
}

function ShowLogin_pass() {
    $("#login_pass").css('display', 'block');
};

function MeterDetailsChart(sdate, edate, mid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Meter/getUsagebyTwoDates",
        data: '{sDate: "' + sdate + '", eDate: "' + edate + '", meter:"' + mid + '" }',
        success: function (result) {
            var i = 0;
            var aplus_arr = [];
            var aminus_arr = [];
            var amodul_arr = [];
            var rplus_arr = [];
            var rminus_arr = [];
            var rmodul_arr = [];
            var dates = [];
            //table1_dp_met.clear().draw();
            $("#chart_cover_mdt").css('display', 'none');
            while (i < result.length-1) {
                if (result[i].aMinus == null) {
                    var aMinus = 0;
                } else {
                    var a = result[i + 1].aMinus;
                    var b = result[i].aMinus;
                    var aMinus = parseFloat(a) - parseFloat(b);
                    aMinus = aMinus.toFixed(2);
                }
                aminus_arr[i] = aMinus;
                //
                if (result[i].aModul == null) {
                    var aModul = 0;
                } else {
                    var a = result[i + 1].aModul;
                    var b = result[i].aModul;
                    var aModul = parseFloat(a) - parseFloat(b);
                    aModul = aModul.toFixed(2);
                }
                amodul_arr[i] = aModul;
                //
                if (result[i].aPlus == null) {
                    var aPlus = 0;
                } else {
                    var a = result[i + 1].aPlus;
                    var b = result[i].aPlus;
                    var aPlus = parseFloat(a) - parseFloat(b);
                    aPlus = aPlus.toFixed(2);
                }
                aplus_arr[i] = aPlus;
                //
                if (result[i].rMinus == null) {
                    var rMinus = 0;
                } else {
                    var a = result[i + 1].rMinus;
                    var b = result[i].rMinus;
                    var rMinus = parseFloat(a) - parseFloat(b);
                    rMinus = rMinus.toFixed(2);
                }
                rminus_arr[i] = rMinus;
                //
                if (result[i].rModul == null) {
                    var rModul = 0;
                } else {
                    var a = result[i + 1].rModul;
                    var b = result[i].rModul;
                    var rModul = parseFloat(a) - parseFloat(b);
                    rModul = rModul.toFixed(2);
                }
                rmodul_arr[i] = rModul;
                //
                if (result[i].rPlus == null) {
                    var rPlus = 0;
                } else {
                    //var rPlus = result[i].rPlus;
                    var a = result[i + 1].rPlus;
                    var b = result[i].rPlus;
                    var rPlus = parseFloat(a) - parseFloat(b);
                    rPlus = rPlus.toFixed(2);
                }
                rplus_arr[i] = rPlus;

                var dt = result[i].date;
                var s1 = dt.substring(0, 4);
                var s2 = dt.substring(4, 6);
                var s3 = dt.substring(6, 8);
                dates[i] = s3 + "." + s2 + "." + s1;
                table1_dp_met.row.add([
                    i+1, 
                    s3+"."+s2+"."+s1,
                    aPlus,
                    aMinus,
                    aModul,
                    rPlus,
                    rMinus,
                    rModul,
                ]).draw();
                i++;
            }
            //
            var trace1 = {
                x: dates,
                y: aplus_arr,
                mode: 'lines',
                name: 'A+',
                marker: {
                    color: '#1cc2ff'
                },
            };
            var trace2 = {
                x: dates,
                y: aminus_arr,
                mode: 'lines',
                name: 'A-',
                marker: {
                    color: '#fac363'
                }
            };
            var trace3 = {
                x: dates,
                y: amodul_arr,
                mode: 'lines',
                name: '|A|',
                marker: {
                    color: '#e1ff14'
                }
            };
            var trace4 = {
                x: dates,
                y: rplus_arr,
                mode: 'lines',
                name: '|R|',
                marker: {
                    color: '#ff0000'
                }
            };
            var trace5 = {
                x: dates,
                y: rminus_arr,
                mode: 'lines',
                name: 'R+',
                marker: {
                    color: '#ff00ea'
                }
            };
            var trace6 = {
                x: dates,
                y: rmodul_arr,
                mode: 'lines',
                name: 'R-',
                marker: {
                    color: '#00fff6'
                }
            };

            var layout = {
                title: 'Детальный график по показателям <b style="color: #1cc2ff">A+</b>, <b style="color: #fac363">A-</b>, <b style="color: #e1ff14">|A|</b>, <b style="color: #ff0000">|R|</b>, <b style="color: #ff00ea">R+</b>, <b style="color: #00fff6">R-</b>',
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
                    t: 40,
                    b: 90
                },
            };

            var data = [trace1, trace2, trace3, trace4, trace5, trace6];
            Plotly.newPlot('tab1_chart', data, layout);
            //
        }
    })
}

function ConsDetailChart(sdate, edate, mid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Meter/getUsagebyTwoDates",
        data: '{sDate: "' + sdate + '", eDate: "' + edate + '", meter:"' + mid + '" }',
        success: function (result) {
            var i = 0;
            var aplus_arr = [];
            var aminus_arr = [];
            var amodul_arr = [];
            var rplus_arr = [];
            var rminus_arr = [];
            var rmodul_arr = [];
            var dates = [];
            //table1_dp_met.clear().draw();
            $("#cons_det_loader").fadeOut(400);
            $("#chart_cover").css('display', 'none');
            while (i < result.length - 1) {
                if (result[i].aMinus == null) {
                    var aMinus = 0;
                } else {
                    var a = result[i + 1].aMinus;
                    var b = result[i].aMinus;
                    var aMinus = parseFloat(a) - parseFloat(b);
                    aMinus = aMinus.toFixed(2);
                }
                aminus_arr[i] = aMinus;
                //
                if (result[i].aModul == null) {
                    var aModul = 0;
                } else {
                    var a = result[i + 1].aModul;
                    var b = result[i].aModul;
                    var aModul = parseFloat(a) - parseFloat(b);
                    aModul = aModul.toFixed(2);
                }
                amodul_arr[i] = aModul;
                //
                if (result[i].aPlus == null) {
                    var aPlus = 0;
                } else {
                    var a = result[i + 1].aPlus;
                    var b = result[i].aPlus;
                    var aPlus = parseFloat(a) - parseFloat(b);
                    aPlus = aPlus.toFixed(2);
                }
                aplus_arr[i] = aPlus;
                //
                if (result[i].rMinus == null) {
                    var rMinus = 0;
                } else {
                    var a = result[i + 1].rMinus;
                    var b = result[i].rMinus;
                    var rMinus = parseFloat(a) - parseFloat(b);
                    rMinus = rMinus.toFixed(2);
                }
                rminus_arr[i] = rMinus;
                //
                if (result[i].rModul == null) {
                    var rModul = 0;
                } else {
                    var a = result[i + 1].rModul;
                    var b = result[i].rModul;
                    var rModul = parseFloat(a) - parseFloat(b);
                    rModul = rModul.toFixed(2);
                }
                rmodul_arr[i] = rModul;
                //
                if (result[i].rPlus == null) {
                    var rPlus = 0;
                } else {
                    //var rPlus = result[i].rPlus;
                    var a = result[i + 1].rPlus;
                    var b = result[i].rPlus;
                    var rPlus = parseFloat(a) - parseFloat(b);
                    rPlus = rPlus.toFixed(2);
                }
                rplus_arr[i] = rPlus;

                var dt = result[i].date;
                var s1 = dt.substring(0, 4);
                var s2 = dt.substring(4, 6);
                var s3 = dt.substring(6, 8);
                dates[i] = s3 + "." + s2 + "." + s1;
                //table1_dp_met.row.add([
                //    i + 1,
                //    s3 + "." + s2 + "." + s1,
                //    aPlus,
                //    aMinus,
                //    aModul,
                //    rPlus,
                //    rMinus,
                //    rModul,
                //]).draw();
                i++;
            }
            var trace1 = {
                x: dates,
                y: aplus_arr,
                mode: 'lines',
                name: 'A+',
                marker: {
                    color: '#1cc2ff'
                },
                fill: 'tozeroy'
            };
            var trace2 = {
                x: dates,
                y: aminus_arr,
                mode: 'lines',
                name: 'A-',
                marker: {
                    color: '#fac363'
                }
            };
            var trace3 = {
                x: dates,
                y: amodul_arr,
                mode: 'lines',
                name: '|A|',
                marker: {
                    color: '#e1ff14'
                }
            };
            var trace4 = {
                x: dates,
                y: rplus_arr,
                mode: 'lines',
                name: '|R|',
                marker: {
                    color: '#ff0000'
                }
            };
            var trace5 = {
                x: dates,
                y: rminus_arr,
                mode: 'lines',
                name: 'R+',
                marker: {
                    color: '#ff00ea'
                }
            };
            var trace6 = {
                x: dates,
                y: rmodul_arr,
                mode: 'lines',
                name: 'R-',
                marker: {
                    color: '#00fff6'
                }
            };

            var layout = {
                title: 'Потребление электроэнергии за указанный период (кВат)',
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
                    t: 40,
                    b: 90
                },
            };
            var data = [trace1/*, trace2, trace3, trace4, trace5, trace6*/];
            Plotly.newPlot('r_r_graph', data, layout);
        }
    })
}

var bt_pie1_s = 0;
var bt_pie1_b = 0;
var inter_bt;
function BadTableBalance(dcu) {
    var year = "2018";
    //var dcu = "6070-00027";
    for (var i = 0; i < table1_dp_tp.rows().count()-1; i++) {
        table1_dp_tp.cell(i, 2).data("0").draw();
        table1_dp_tp.cell(i, 3).data("0").draw();
        table1_dp_tp.cell(i, 4).data("0").draw();
        table1_dp_tp.cell(i, 5).data("0").draw();
        table1_dp_tp.cell(i, 6).data("0").draw();
        table1_dp_tp.cell(i, 7).data("0").draw();
        table1_dp_tp.cell(i, 8).data("0").draw();
        table1_dp_tp.cell(i, 9).data("0").draw();
        table1_dp_tp.cell(i, 10).data("0").draw();
        table1_dp_tp.cell(i, 11).data("0").draw();
        table1_dp_tp.cell(i, 12).data("0").draw();
        table1_dp_tp.cell(i, 13).data("0").draw();
    }
    //table1_dp_tp.cell(12, 2).data("0").draw();
    //table1_dp_tp.cell(12, 8).data("0").draw();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Meter/GetDataByYearAllMeters",
        data: '{year: "' + year + '", dcu_id: "' + dcu + '" }',
        success: function (result) {
            //alert(result);
            bt_pie1_s = result[0].summa_aPlus;
            var sum = 0;
            for (var i = 0; i < result.length; i++) {
                table1_dp_tp.cell(i, 8).data(result[i].summa_aPlus).draw();
                table1_dp_tp.cell(i, 9).data(result[i].summa_aMinus).draw();
                table1_dp_tp.cell(i, 10).data(result[i].summa_aModul).draw();
                table1_dp_tp.cell(i, 11).data(result[i].summa_rPlus).draw();
                table1_dp_tp.cell(i, 12).data(result[i].summa_rMinus).draw();
                table1_dp_tp.cell(i, 13).data(result[i].summa_rModul).draw();
                sum = sum + result[i].summa_aPlus;
            }
            table1_dp_tp.cell(12, 8).data(sum.toFixed(2)).draw();
        }
    })
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Meter/GetDataByYearBalance",
        data: '{year: "' + year + '", dcu_id: "' + dcu + '" }',
        success: function (result) {
            //alert(result);
            bt_pie1_b = result[0].summa_aPlus;
            var sum = 0;
            for (var i = 0; i < result.length; i++) {
                table1_dp_tp.cell(i, 2).data(result[i].summa_aPlus).draw();
                table1_dp_tp.cell(i, 3).data(result[i].summa_aMinus).draw();
                table1_dp_tp.cell(i, 4).data(result[i].summa_aModul).draw();
                table1_dp_tp.cell(i, 5).data(result[i].summa_rPlus).draw();
                table1_dp_tp.cell(i, 6).data(result[i].summa_rMinus).draw();
                table1_dp_tp.cell(i, 7).data(result[i].summa_rModul).draw();
                sum = sum + result[i].summa_aPlus;
            }
            table1_dp_tp.cell(12, 2).data(sum.toFixed(2)).draw();

            inter_bt = setInterval(BuildPie1BT, 1000);

            //Plotly.newPlot('dt_tp_pie2', data, layout);
        }
    })
}

function BuildPie1BT() {
    var i = 0;
    var current;
    if (bt_pie1_s != 0 && bt_pie1_b != 0) {
        clearInterval(inter_bt);
        bt_pie1_s = 0;
        bt_pie1_b = 0;
        for (i = 0; i < table1_dp_tp.rows().count()-1 ; i++) {
            current = table1_dp_tp.row(i).data();
            bt_pie1_s = bt_pie1_s + current[8];
            bt_pie1_b = bt_pie1_b + current[2];
        }

        bt_pie1_s = bt_pie1_b - bt_pie1_s;

        var c = (bt_pie1_b / 100);
        var s = (bt_pie1_s / c);
        var d = 100 - s;

        s = s.toFixed(2);
        d = d.toFixed(d);

        var trace1 = {
            values: [s, d],
            //labels: ['Недосдача', 'Получено'],
            //marker: { 'colors': ['03a476', 'dd904c'] },
            //values: [30, 70],
            labels: ['Недосдача ' + bt_pie1_s.toFixed(2) + ' кВат', 'Получено'],
            marker: { 'colors': ['f8d200', 'b944d2'] },

            //marker: { 'colors': ['906088', '3c5663'] },
            domain: {
                x: [0, 1.0]
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
            legend: {
                x: 0,
                y: -200
            },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            width: 500
        };

        var data = [trace1];
        Plotly.newPlot('dt_tp_pie1', data, layout);
        //alert(d);
        //alert(s);

        bt_pie1_s = 0;
        bt_pie1_b = 0;
    }
}

var bmet = 0;
var sum = 0;
var inter2;
function BadTableGetMetPeriod(sdate, edate) {
    var dcu = "6070-00027";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Meter/GetDataByPeriodBalanceMet",
        data: '{sDate: "' + sdate + '", eDate: "' + edate + '", dcu_id:"' + dcu + '"}',
        success: function (result) {
            //alert(result);
            bmet = result[0].summa_aPlus;
            $("#balance_met").text("Балансовый счетчик  " + result[0].dcu);

            $("#balance_met_ap").text("А+    " + result[0].summa_aPlus);
            $("#balance_met_am").text("А-    " + result[0].summa_aMinus);
            $("#balance_met_amd").text("|А|    " + result[0].summa_aModul);

            $("#balance_met_rp").text("R+    " + result[0].summa_rPlus);
            $("#balance_met_rm").text("R-    " + result[0].summa_rMinus);
            $("#balance_met_rmd").text("|R|    " + result[0].summa_rModul);
        }
    })

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Meter/GetDataByPeriodBT",
        data: '{sDate: "' + sdate + '", eDate: "' + edate + '", dcu_id:"' + dcu + '"}',
        success: function (result) {
            //alert(result);
            var a = 0;
            var x_arr = [];
            var f_arr = [];
            var y_arr = [];
            var m_arr = [];
            table4_dp_tp.clear().draw();
            for (var i = 0; i < result.length; i++) {
                table4_dp_tp.row.add([
                    i+1,
                    result[i].meter,
                    result[i].summa_aPlus,
                    result[i].summa_aMinus,
                    result[i].summa_aModul,
                    result[i].summa_rPlus,
                    result[i].summa_rMinus,
                    result[i].summa_rModul
                ]).draw();
                x_arr[i] = i+1;
                y_arr[i] = result[i].summa_aPlus;
                f_arr[i] = 0;
                m_arr[i] = result[i].meter;
                sum = sum + result[i].summa_aPlus;
            }
            table4_dp_tp.row.add([
                    i + 1,
                    "Итого: ",
                    "<p style='color: #1ef21f'>" + sum.toFixed(2) + "</p>",
                    "",
                    "",
                    "",
                    "",
                    ""
            ]).draw();
            inter2 = setInterval(BuildPeriodPie, 1000);

            var trace1 = {
                x: x_arr,
                y: y_arr,
                //fill: 'tozeroy',
                mode: 'lines',
                name: 'кВат',
                marker: {
                    color: '#00ff42'
                }
            };

            //var trace2 = {
            //    x: f_arr,
            //    y: y_arr,
            //    //fill: 'tozeroy',
            //    mode: 'lines',
            //    name: 'кВат',
            //    marker: {
            //        color: '#666666'
            //    }
            //};

            var layout = {
                //title: 'Детальный график по показателям <b style="color: #1cc2ff">A+</b>, <b style="color: #fac363">A-</b>, <b style="color: #e1ff14">|A|</b>, <b style="color: #ff0000">|R|</b>, <b style="color: #ff00ea">R+</b>, <b style="color: #00fff6">R-</b>',
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
                    tickcolor: '#666',
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
                    t: 40,
                    b: 30
                },
            };

            var data = [trace1];
            Plotly.newPlot('dt_tp_chart1', data, layout);
        }
    })
}

function ShowHello() {
    $("#hello").fadeIn("slow");
}

function BuildPeriodPie() {
    if (bmet > 0 && sum > 0) {
        var a = sum;
        clearInterval(inter2);
        sum = bmet - sum;
        var c = (bmet / 100);
        var s = (sum / c);
        var d = 100 - s;

        s = s.toFixed(2);
        d = d.toFixed(2);

        var trace1 = {
            values: [s, d],
            //labels: ['Недосдача', 'Получено'],
            //marker: { 'colors': ['03a476', 'dd904c'] },
            //values: [30, 70],
            labels: ['Недосдача ' + sum.toFixed(2) + ' кВат', 'Получено ' + a.toFixed(2) + ' кВат'],
            marker: { 'colors': ['f8d200', '3983de'] },

            //marker: { 'colors': ['906088', '3c5663'] },
            domain: {
                x: [0, 1.0]
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
            legend: {
                x: 0,
                y: -200
            },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            width: 500
        };

        var data = [trace1];
        //Plotly.newPlot('dt_tp_pie1', data, layout);
        Plotly.newPlot('dt_tp_pie2', data, layout);
        sum = 0;
        bmet = 0;
    }
}

function GetReportOne() {
    var dcu = selected_dcu;
    var dt = $("#cons_start_date_main").val();
    var s1 = dt.substring(0, 2);
    var s2 = dt.substring(3, 5);
    var s3 = dt.substring(6, 10);
    var sdate = s3 + "" + s1 + "" + s2;
    var dt = $("#cons_end_date_main").val();
    var s1 = dt.substring(0, 2);
    var s2 = dt.substring(3, 5);
    var s3 = dt.substring(6, 10);
    var edate = s3 + "" + s1 + "" + s2;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Meter/OtchetPokazaniyAbonentov",
        data: '{sdate: "' + sdate + '", edate: "' + edate + '", dcu_id:"' + dcu + '" }',
        success: function (result) {
            var res = "http://" + result.substring(0, result.indexOf("xlsx") + 4);
            $("#report_link1").attr("href", res);
            document.getElementById("report_link1").click();
        }
    })
}

function UsersList() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/User/GetParent",
        data: '{group_id:"' + selected_gr_id + '", group_gb:"' + selected_gr_gb + '"}',
        success: function (result) {
            if (result[0].parent_id != null) {
                parent_id = result[0].parent_id;
            }
            if (result[0].parent_id == null)
            {
                parent_id = selected_gr_id;
            }
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "/User/GetAllUsers1",
                data: '{group_id:"' + selected_gr_id + '", group_gb:"' + selected_gr_gb + '", parent_id:"' + parent_id + '"}',
                success: function (result) {
                    load_users1 = result;
                    table5.clear().draw();
                    
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].position != "warehouse" && result[i].position != "inspector") {
                            table5.row.add([
                                table5.rows().count() + 1,
                                result[i].login,
                                result[i].user_nm,
                                result[i].position,
                                result[i].name,
                                result[i].relay,
                                result[i].read_h,
                                result[i].read_c,
                            ]).draw();
                            
                        }
                    }
                }
            })
        }
    })
    //$.ajax({
    //    type: "POST",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    url: "/User/GetAllUsers",
    //    data: '{group_id: "' + gr_id + '", group_gb: "' + gr_gb + '", login: "' + login +  '"}',
    //    success: function (result) {
    //        $("#groups_select option").remove();
    //        $("#groups_select").append('<option value="val0"></option>');
    //        for (var n = 0; n < tree_global_arr.length; n++) {
    //            if (tree_global_arr[n].gb < 3) {
    //                $("#groups_select").append('<option value="val' + (n + 1) + '">' + tree_global_arr[n].text + '</option>');
    //            }
    //        }
    //        table5.clear().draw();
    //        for (var i = 0; i < result.length; i++) {
    //            table5.row.add([
    //                i + 1,
    //                result[i].login,
    //                result[i].user_nm,
    //                result[i].group_id,
    //                result[i].group_nm,
    //                result[i].relay,
    //                result[i].read_h,
    //                result[i].read_c,
    //            ]).draw();
    //        }
    //    }
    //})
}

function AddUser() {
    var login = $("#access_inputs input:eq(0)").val();
    //
    var nm = $("#access_inputs input:eq(1)").val();
    //
    var pw = $("#access_inputs input:eq(2)").val();
    //
    var pos = "";
    //
    var gr_nm = $("#groups_select option:selected").text();
    for (var g = 0; g < tree_global_arr.length; g++) {
        if (tree_global_arr[g].text == gr_nm) {
            var gr_id = tree_global_arr[g].gr_id;
            var gr_gb = tree_global_arr[g].gb;
            if (tree_global_arr[g].parent != "#") {
                var p_id = tree_global_arr[g].parent;
            } else {
                var p_id = login_p_id;
            }
        }
    }
    //
    var relay = $("#let_relay option:selected").text();
    //
    var rh = $("#let_rh option:selected").text();
    //
    var rc = $("#let_rc option:selected").text();
    //
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/User/AddUser",
        data: '{login: "' + login + '", password: "' + pw + '", user_nm: "' + nm + '", position: "' + pos + '", group_id: "' + gr_id + '", group_gb: "' + gr_gb + '", relay: "' + relay + '", read_h: "' + rh + '", read_c: "' + rc + '", parent_id: "' + p_id + '"}',
        success: function (result) {
            alert("Новый пользователь создан");
            //UsersList(login_id, login_gb, login_nm);
        }
    })
}

function DeleteUser() {
    var login = $("#access_inputs input:eq(0)").val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/User/DeleteUser",
        data: '{login: "' + login + '"}',
        success: function (result) {
            alert("Пользователь удален");
            //UsersList(login_id, login_gb, login_nm);
        }
    })
}

////////////////////////////////////////////////////////////// GAZ /////////////////////////////////////////////////////////////
function LoadGazMeters(id, date) {
    //alert(gr_id);
    //alert(gr_gb);
    //alert(show_onoff_log);
    //date = "20180130";
    $.ajax({
        type: "POST",
        url: "/Meter/GetGasMAllOnOffNR",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var s1 = result;
            var s2;
            if (result != "" || result != null) {
                //alert(result);
                s2 = s1.substr(0, s1.indexOf("|"));
                s1 = s1.replace(s2 + "|", "");
                $("#circle_nr_g p").text(s2);

                s2 = s1.substr(0, s1.indexOf("|"));
                s1 = s1.replace(s2 + "|", "");
                $("#circle_on_g p").text(s2);

                s2 = s1.substr(0, s1.indexOf("|"));
                s1 = s1.replace(s2 + "|", "");
                $("#circle_off_g p").text(s2);

                s2 = s1.substr(0, s1.length);
                $("#circle_all_g p").text(s2);
            }
        }
    })
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllGasMetersWithReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#dcu_loader").fadeOut(150);
            $("#dcu_loader_g").fadeOut(150);
            $("#meter_loader").fadeOut(150);
            $("#meter_loader_g").fadeOut(150);
            table2_g.clear().draw();
            var i = 0;
            while (i < result.length) {
                //var dt = result[i].frozen_dt;
                //var s1 = dt.substring(0, 2);
                //var s2 = dt.substring(3, 5);
                //var s3 = dt.substring(6, 10);
                //dt = s3 + "" + s1 + "" + s2;
                //var val;
                //if (result[i].real_value == 0){
                //    val = "---";
                //} else {
                //    val = result[i].real_value;
                //}
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].relay_status == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].relay_status + "</div>"
                }
                if (result[i].relay_status == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].relay_status + "</div>"
                }
                table2_g.row.add([
                table2_g.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                result[i].name,
                result[i].dcu_id,
                result[i].meter_id,
                result[i].consumer,
                result[i].address,
                "----",
                "----",
                ]).draw();
                i++;
            };
            //load_m_res = result;
            //arr_m_log = false;
            //alert("AllMeters    " + result);
            //if ((result.length > 0) || (result == "null")) {
            //    arr_m = result;
            //    arr_m_log = true;
            //}
        }
    })
}

function LoadGazStatusTB(id, date) {
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllGasmetersInfo",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#dcu_loader").fadeOut(150);
            $("#dcu_loader_g").fadeOut(150);
            $("#meter_loader").fadeOut(150);
            $("#meter_loader_g").fadeOut(150);
            $("#meter_loader_g1").fadeOut(150);
            table2_g1.clear().draw();
            var i = 0;
            while (i < result.length) {
                table2_g1.row.add([
                table2_g1.rows().count() + 1,
                result[i].meter_id,
                result[i].dcu_id,
                result[i].event_date,
                result[i].event_time,
                result[i].event_name,
                result[i].read_date,
                ]).draw();
                i++;
            };
            //load_m_res = result;
            //arr_m_log = false;
            //alert("AllMeters    " + result);
            //if ((result.length > 0) || (result == "null")) {
            //    arr_m = result;
            //    arr_m_log = true;
            //}
        }
    })
}

function LoadGazMetersOn(id, date) {
    //alert(gr_id);
    //alert(gr_gb);
    //alert(show_onoff_log);
    //date = "20180130";
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllOnGasMetersWithReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#dcu_loader").fadeOut(150);
            $("#dcu_loader_g").fadeOut(150);
            $("#meter_loader").fadeOut(150);
            $("#meter_loader_g").fadeOut(150);
            table2_g.clear().draw();
            var i = 0;
            while (i < result.length) {
                var dt = result[i].frozen_dt;
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s3 + "" + s1 + "" + s2;
                var val;
                if (result[i].real_value == 0) {
                    val = "---";
                } else {
                    val = result[i].real_value;
                }
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].rs == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].rs + "</div>"
                }
                if (result[i].rs == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].rs + "</div>"
                }
                table2_g.row.add([
                table2_g.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                result[i].group_nm,
                result[i].dcu_nm,
                result[i].meter_id,
                result[i].consumer,
                result[i].address,
                dt,
                val,
                ]).draw();
                i++;
            };
            //load_m_res = result;
            //arr_m_log = false;
            //alert("AllMeters    " + result);
            //if ((result.length > 0) || (result == "null")) {
            //    arr_m = result;
            //    arr_m_log = true;
            //}
        }
    })
}

function LoadGazMetersOff(id, date) {
    //alert(gr_id);
    //alert(gr_gb);
    //alert(show_onoff_log);
    //date = "20180130";
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllOffGasMetersWithReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#dcu_loader").fadeOut(150);
            $("#dcu_loader_g").fadeOut(150);
            $("#meter_loader").fadeOut(150);
            $("#meter_loader_g").fadeOut(150);
            table2_g.clear().draw();
            var i = 0;
            while (i < result.length) {
                var dt = result[i].frozen_dt;
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s3 + "" + s1 + "" + s2;
                var val;
                if (result[i].real_value == 0) {
                    val = "---";
                } else {
                    val = result[i].real_value;
                }
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].relay_status == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].relay_status + "</div>"
                }
                if (result[i].relay_status == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].relay_status + "</div>"
                }
                table2_g.row.add([
                table2_g.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                result[i].group_nm,
                result[i].dcu_nm,
                result[i].meter_id,
                result[i].consumer,
                result[i].address,
                dt,
                val,
                ]).draw();
                i++;
            };
            //load_m_res = result;
            //arr_m_log = false;
            //alert("AllMeters    " + result);
            //if ((result.length > 0) || (result == "null")) {
            //    arr_m = result;
            //    arr_m_log = true;
            //}
        }
    })
}

function LoadGazMetersNR(id, date) {
    //alert(gr_id);
    //alert(gr_gb);
    //alert(show_onoff_log);
    //date = "20180130";
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllGasMetersReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#dcu_loader").fadeOut(150);
            $("#dcu_loader_g").fadeOut(150);
            $("#meter_loader").fadeOut(150);
            $("#meter_loader_g").fadeOut(150);
            table2_g.clear().draw();
            var i = 0;
            while (i < result.length) {
                var dt = result[i].frozen_dt;
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s3 + "" + s1 + "" + s2;
                var val;
                if (result[i].real_value == 0) {
                    val = "---";
                } else {
                    val = result[i].real_value;
                }
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].relay_status == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].relay_status + "</div>"
                }
                if (result[i].relay_status == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].relay_status + "</div>"
                }
                table2_g.row.add([
                table2_g.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                result[i].group_nm,
                result[i].dcu_nm,
                result[i].meter_id,
                result[i].consumer,
                result[i].address,
                dt,
                val,
                ]).draw();
                i++;
            };
            //load_m_res = result;
            //arr_m_log = false;
            //alert("AllMeters    " + result);
            //if ((result.length > 0) || (result == "null")) {
            //    arr_m = result;
            //    arr_m_log = true;
            //}
        }
    })
}
////////////////////////////////////////////////////// Water //////////////////////////////////////////////////
function LoadWaterMeters(id, date) {
    $.ajax({
        type: "POST",
        url: "/Meter/GetWaterMAllOnOffNR",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var s1 = result;
            var s2;
            if (result != "" || result != null) {
                //alert(result);
                s2 = s1.substr(0, s1.indexOf("|"));
                s1 = s1.replace(s2 + "|", "");
                $("#circle_nr_v p").text(s2);

                s2 = s1.substr(0, s1.indexOf("|"));
                s1 = s1.replace(s2 + "|", "");
                $("#circle_on_v p").text(s2);

                s2 = s1.substr(0, s1.indexOf("|"));
                s1 = s1.replace(s2 + "|", "");
                $("#circle_off_v p").text(s2);

                s2 = s1.substr(0, s1.length);
                $("#circle_all_v p").text(s2);
            }
        }
    })
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllWaterMetersWithReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#dcu_loader").fadeOut(150);
            $("#dcu_loader_g").fadeOut(150);
            $("#meter_loader").fadeOut(150);
            $("#meter_loader_g").fadeOut(150);
            $("#meter_loader_v").fadeOut(150);
            table2_v.clear().draw();
            var i = 0;
            while (i < result.length) {
                var dt = result[i].frozen_dt;
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s3 + "" + s1 + "" + s2;
                var val;
                if (result[i].real_value == 0) {
                    val = "---";
                } else {
                    val = result[i].real_value;
                }
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].relay_status == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].relay_status + "</div>"
                }
                if (result[i].relay_status == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].relay_status + "</div>"
                }
                table2_v.row.add([
                table2_v.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                result[i].group_nm,
                result[i].dcu_nm,
                result[i].meter_id,
                result[i].consumer,
                result[i].address,
                dt,
                val,
                ]).draw();
                i++;
            };
            //load_m_res = result;
            //arr_m_log = false;
            //alert("AllMeters    " + result);
            //if ((result.length > 0) || (result == "null")) {
            //    arr_m = result;
            //    arr_m_log = true;
            //}
        }
    })
}
function LoadWMetersOn(id, date) {
    //alert(gr_id);
    //alert(gr_gb);
    //alert(show_onoff_log);
    //date = "20180130";
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllOnWaterMetersWithReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#dcu_loader").fadeOut(150);
            $("#dcu_loader_g").fadeOut(150);
            $("#meter_loader").fadeOut(150);
            $("#meter_loader_v").fadeOut(150);
            table2_v.clear().draw();
            var i = 0;
            while (i < result.length) {
                var dt = result[i].frozen_dt;
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s3 + "" + s1 + "" + s2;
                var val;
                if (result[i].real_value == 0) {
                    val = "---";
                } else {
                    val = result[i].real_value;
                }
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].rs == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].rs + "</div>"
                }
                if (result[i].rs == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].rs + "</div>"
                }
                table2_v.row.add([
                table2_v.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                result[i].group_nm,
                result[i].dcu_nm,
                result[i].meter_id,
                result[i].consumer,
                result[i].address,
                dt,
                val,
                ]).draw();
                i++;
            };
            //load_m_res = result;
            //arr_m_log = false;
            //alert("AllMeters    " + result);
            //if ((result.length > 0) || (result == "null")) {
            //    arr_m = result;
            //    arr_m_log = true;
            //}
        }
    })
}

function LoadWMetersOff(id, date) {
    //alert(gr_id);
    //alert(gr_gb);
    //alert(show_onoff_log);
    //date = "20180130";
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllOffWaterMetersWithReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#dcu_loader").fadeOut(150);
            $("#dcu_loader_g").fadeOut(150);
            $("#meter_loader").fadeOut(150);
            $("#meter_loader_v").fadeOut(150);
            table2_v.clear().draw();
            var i = 0;
            while (i < result.length) {
                var dt = result[i].frozen_dt;
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s3 + "" + s1 + "" + s2;
                var val;
                if (result[i].real_value == 0) {
                    val = "---";
                } else {
                    val = result[i].real_value;
                }
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].relay_status == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].relay_status + "</div>"
                }
                if (result[i].relay_status == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].relay_status + "</div>"
                }
                table2_v.row.add([
                table2_v.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                result[i].group_nm,
                result[i].dcu_nm,
                result[i].meter_id,
                result[i].consumer,
                result[i].address,
                dt,
                val,
                ]).draw();
                i++;
            };
            //load_m_res = result;
            //arr_m_log = false;
            //alert("AllMeters    " + result);
            //if ((result.length > 0) || (result == "null")) {
            //    arr_m = result;
            //    arr_m_log = true;
            //}
        }
    })
}

function LoadWMetersNR(id, date) {
    //alert(gr_id);
    //alert(gr_gb);
    //alert(show_onoff_log);
    //date = "20180130";
    //  get all read meters
    $.ajax({
        type: "POST",
        url: "/Meter/GetAllWaterMetersReverse",
        data: '{dcu_id: "' + id + '", date: "' + date + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#dcu_loader").fadeOut(150);
            $("#dcu_loader_g").fadeOut(150);
            $("#meter_loader").fadeOut(150);
            $("#meter_loader_v").fadeOut(150);
            table2_v.clear().draw();
            var i = 0;
            while (i < result.length) {
                var dt = result[i].frozen_dt;
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s3 + "" + s1 + "" + s2;
                var val;
                if (result[i].real_value == 0) {
                    val = "---";
                } else {
                    val = result[i].real_value;
                }
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (result[i].relay_status == 1) {
                    var on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    var stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + result[i].relay_status + "</div>"
                }
                if (result[i].relay_status == 0) {
                    var on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    var stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + result[i].relay_status + "</div>"
                }
                table2_v.row.add([
                table2_v.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                result[i].group_nm,
                result[i].dcu_nm,
                result[i].meter_id,
                result[i].consumer,
                result[i].address,
                dt,
                val,
                ]).draw();
                i++;
            };
            //load_m_res = result;
            //arr_m_log = false;
            //alert("AllMeters    " + result);
            //if ((result.length > 0) || (result == "null")) {
            //    arr_m = result;
            //    arr_m_log = true;
            //}
        }
    })
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $.fn.dataTable.ext.errMode = "none";
    $("#top").click(function () {
        $("#ht_loader").css('display', 'none');
    });

    $("#lm1").click(function () {
        $("#ht_loader").css('display', 'none');
    });

    $("#lm2").click(function () {
        $("#ht_loader").css('display', 'none');
    });

    $("#lm3").click(function () {
        $("#meter_loader").css('display', 'none');
    });

    $("#lm4").click(function () {
        $("#ht_loader").css('display', 'none');
    });

    $("#lm_v").click(function () {
        $("#ht_loader").css('display', 'none');
    });
    $("#lm_v").css("display", "none");
    $("#rightm_div1").css("display", "none");
    $("#login_pass").css('display', 'none');
    setTimeout(ShowLogin_pass, 10000);
    var rnd, rnd2, rnd3, rnd4, rnd5, rnd6;
    rnd = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    rnd2 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    rnd3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    rnd4 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    rnd5 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    rnd6 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    operator_id = rnd +'' + rnd2 + '' + rnd3 + '' + rnd4 + '' +rnd5 + '' + rnd6;
    //
    //alert(operator_id);

    var log1 = false;
    var log2 = false;
    var log3 = false;
    var n_gl = 0;

    //  HT signal level
    

    //  checking dispatcher tasks

    $("#login_pass").click(function () {
        var login = $("#login_ami").val();
        var pass = $("#pass_ami").val();
        //alert(login + "  " + pass);
        if (login != "" && pass != ""){
            Login(login, pass);
        }
        //$("#login_screen").fadeOut(800);
        //$.getJSON("/Tree/Tree", null, LoadTree);
        //tree_it = setInterval(BuildTree, 1000);
        //setTimeout(RunBuildingDCUList, 2000);
        //setInterval(SignalChartHT, 15000);
        //setInterval(CheckDispatcherTasks, 5000);
    });

    $("#pass_ami").keypress(function (e) {
        if (e.which == 13) {
            if ($("#login_pass").css('display') != 'none') {
                var login = $("#login_ami").val();
                var pass = $("#pass_ami").val();
                if (login != "" && pass != "") {
                    Login(login, pass);
                }
            }
        }
    })

    //GetDCUListbyTree(tree_global_arr[0].id, tree_global_arr[0].gb);
    ////////////////////////////////
    $("#btns1 button:eq(0)").click(function () {
        $("#access_inputs input:eq(0)").val("");
        $("#access_inputs input:eq(1)").val("");
    })

    $("#btns1 button:eq(1)").click(function () {
        DeleteUser();
        //UsersList(login_id, login_gb, login_nm);
    })

    $("#btns1 button:eq(2)").click(function () {
        AddUser();
        //UsersList(login_id, login_gb, login_nm);
    })

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
    $("#dispatcher").draggable();
     
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
        $("#gas_drop_head").css("display", "block");
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
        //if (log3 == false) {
        $("#leftm_div").fadeIn('slow');
        //$(this).css("left", "24%");
        //log3 = true;
        //} else {
        //    //alert();
        //    $("#leftm_div").fadeOut('slow');
        //    $(this).css("left", "4.1%");
        //    log3 = false;
        //}
    })

    $(".tree_hide").click(function () {
        $("#leftm_div").fadeOut(300);

    })

    // Dispatcher
    $("#dispatcher").dblclick(function () {
        $("#dispatcher img:eq(0)").hide(300);
        $("#dispatcher p").text("");
        $("#disp_drop").slideDown(300);
        $("#dispatcher").css('background', 'url("/Content/files/dispatcher1.png")');
    })

    $("#dispatcher").mouseleave(function () {
        $("#disp_drop").hide(350);
        $("#dispatcher img").show(300);
        $("#dispatcher p").text("D");
    })

    table_disp = $("#table_disp").DataTable({
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
          { "width": "5%", "targets": 0 }, { "width": "5%", "targets": 1, "orderable": false }, { "width": "30%", "targets": 2 }, { "width": "10%", "targets": 3, "orderable": false },
          { "width": "5%", "targets": 4 } , { "width": "1%", "targets": 5 },
          { "width": "1%", "targets": 6 }, //{ "width": "6%", "targets": 13 }, { "width": "6%", "targets": 14 }, { "width": "6%", "targets": 15 },
          //{ "width": "6%", "targets": 16 }, { "width": "6%", "targets": 17 }
        ]
    });
    // Select row

    $("#table_disp tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table_disp.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //$("#rightm_div").css('left', '47%');
        //$("#rightm_div").css('width', '52%');
        //$("#rightm_div").fadeIn(700);
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });

    $("#table_disp").on('click', '.cancel_disp', function () {
        var i = 0;
        var index = $(this).parent("td").parent("tr").index();
        //alert(index);
        table_disp.row(index).remove().draw();
    });

    $("#table_disp").on('dblclick', 'tr', function () {
        var current = table_disp.row(this).data();
        table2.clear().draw();
        table2_g.clear().draw();
        table2_v.clear().draw();
        task_res = [];
        task_arr = [];
        task_arr_g = [];
        task_arr_v = [];
        var lbl = current[2];
        if (lbl.indexOf("газ")) {
            GetTaskResult_g(current[0], current[1]);
        }
        if (lbl.indexOf("вод")) {
            GetTaskResult_v(current[0], current[1]);
        }
        if (lbl.indexOf("вод") == -1 && lbl.indexOf("газ") == -1) {
            GetTaskResult(current[0], current[1]);
        }
    });


    ////////////////

    // testtesttest
    $("#cons_pdf2").click(function () {
        alert(arr_consm[0][0]);
        alert(arr_consm[1][0]);
        alert(arr_consm[2][0]);
        alert(arr_consm[3][0]);

        arr_consm.sort(sName);
        alert("Ok");
        alert(arr_consm[0][0]);
        alert(arr_consm[1][0]);
        alert(arr_consm[2][0]);
        alert(arr_consm[3][0]);
        alert("Perfect!");

    })
    //

    /////////////////////////////////////////////////////////////

    //////////////////////// Device Menu ///////////////////
    var cur_table = 0;
    $("#dcu").click(function () {
        if (active_dcu_btn == false) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //table1.clear().draw();
            cur_m_step = 1;
            cur_m_log1 = 1;
            // works $.getJSON("/DCU/GetAllDCU", null, LoadDCUList);
            //$.getJSON("/Tree/Tree", null, LoadServerTree);
            //tree_it = setInterval(BuildTree, 1000);
            //selected_gr_id = "";
            //GetDCUListbyTree(tree_global_arr[0].id, tree_global_arr[0].gb);
            $("#table_div2").css("display", "none");
            $("#table_div3").css("display", "none");
            $("#table_div4").css("display", "none");
            $("#table_div5").css("display", "none");
            $("#table_div6").css("display", "none");
            $("#table_div7").css("display", "none");
            $("#table_div8").css("display", "none");
            $("#table_div9").css("display", "none");
            $("#table_div10").css("display", "none");
            $("#table_div11").css("display", "none");
            $("#table_div_g").css("display", "none");
            $("#table_div_v").css("display", "none");
            $("#table_div3_v").css("display", "none");
            $("#table_div_g1").css("display", "none");
            $("#table_div3_g2").css("display", "none");
            $("#home").css("display", "none");
            $("#table_div1").fadeIn("slow");
            $("#table1").css("width", "100%");
            $("#table1").css("height", "100%");
            //MalibuLineTopOn();
            //setTimeout(MalibuLineTopOff, 600);
            $("#scroll_l").css("display", "none");
            $("#scroll_r").css("display", "none");
            $("#det_dcu").css("display", "block");
            $("#det_consumers").css("display", "none");
            $("#det_met").css("display", "none");
            $("#det_user").css("display", "none");
            $("#det_cons").css("display", "none");
            $("#det_access").css("display", "none");
            $("#det_gas_gprs").css("display", "none");
            $("#det_struct").css("display", "none");
            $("#rightm_div").css("display", "none");
            $("#details_pan").css("left", "-5000px");
            $("#msg_box").css('display', 'none');
        } else {
            $("#msg_box").fadeIn(500);
        }
    })

    $("#dcu_g").click(function () {
        if (active_dcu_btn == false) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //table1.clear().draw();
            cur_m_step = 1;
            cur_m_log1 = 1;
            // works $.getJSON("/DCU/GetAllDCU", null, LoadDCUList);
            //$.getJSON("/Tree/Tree", null, LoadServerTree);
            //tree_it = setInterval(BuildTree, 1000);
            //selected_gr_id = "";
            //GetDCUListbyTree(tree_global_arr[0].id, tree_global_arr[0].gb);
            $("#table_div2").css("display", "none");
            $("#table_div3").css("display", "none");
            $("#table_div4").css("display", "none");
            $("#table_div5").css("display", "none");
            $("#table_div6").css("display", "none");
            $("#table_div7").css("display", "none");
            $("#table_div8").css("display", "none");
            $("#table_div9").css("display", "none");
            $("#table_div10").css("display", "none");
            $("#table_div11").css("display", "none");
            $("#table_div_v").css("display", "none");
            $("#table_div3_v").css("display", "none");
            $("#table_div_g1").css("display", "none");
            $("#table_div3_g2").css("display", "none");
            $("#table_div_g").css("display", "none");
            $("#home").css("display", "none");
            $("#table_div1").fadeIn("slow");
            $("#table1").css("width", "100%");
            $("#table1").css("height", "100%");
            //MalibuLineTopOn();
            //setTimeout(MalibuLineTopOff, 600);
            $("#scroll_l").css("display", "none");
            $("#scroll_r").css("display", "none");
            $("#det_dcu").css("display", "block");
            $("#det_consumers").css("display", "none");
            $("#det_user").css("display", "none");
            $("#det_met").css("display", "none");
            $("#det_cons").css("display", "none");
            $("#det_access").css("display", "none");
            $("#det_gas_gprs").css("display", "none");
            $("#det_struct").css("display", "none");
            $("#rightm_div").css("display", "none");
            $("#details_pan").css("left", "-5000px");
            $("#msg_box").css('display', 'none');
        } else {
            $("#msg_box").fadeIn(500);
        }
    })

    $("#dcu").mouseover(function () {
        $("#dcu p").css("color", "#f2ce02");
    })
    $("#dcu").mouseout(function () {
        $("#dcu p").css("color", "#fff");
    })

    $("#dcu_g").mouseover(function () {
        $("#dcu_g p").css("color", "#48abe1");
    })
    $("#dcu_g").mouseout(function () {
        $("#dcu_g p").css("color", "#fff");
    })
    $("#search_met_g").click(function () {
        $(".dataTables_g_filter input").val("");
        $("#mhint2_g").fadeIn(350);
        $("#mhint1_g").css('display', 'none');
        setTimeout('$("#mhint2_g").fadeOut(350)', 5000);
    })
    $("#met_day_date_g").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s1 + "" + s2;
        selected_dt_m_g = dt;
        // change fornart to dd.mm.yyy
        //$(this).val(s2 + "." + s1 + "." + s3);
        //alert(selected_dt_m);
        //

        if ($("#search_met_g").val() != "") {
            //if (table2.rows().count() > 0) {
            //    var search = $("#search_met_g").val();
            //    GlobalSearchMeters(search, selected_gr_id, selected_gr_gb, selected_dt_m_g);
            //}
        } else {
            if (selected_dcu != null && selected_dcu != "") {
                $("#meter_loader_g").fadeIn(150);
                LoadGazMeters(selected_dcu, selected_dt_m_g);
            } else {
                alert("Выберите концентратор из дерева объектов или из списка концентраторов!");
            }
        }
    });

    $("#met_day_date_g1").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s1 + "" + s2;
        selected_dt_m_g1 = dt;
        // change fornart to dd.mm.yyy
        //$(this).val(s2 + "." + s1 + "." + s3);
        //alert(selected_dt_m);
        //

        if ($("#search_met_g1").val() != "") {
            //if (table2.rows().count() > 0) {
            //    var search = $("#search_met_g1").val();
            //    GlobalSearchMeters(search, selected_gr_id, selected_gr_gb, selected_dt_m_g1);
            //}
        } else {
            if (selected_dcu != null && selected_dcu != "") {
                $("#meter_loader_g1").fadeIn(150);
                LoadGazStatusTB(selected_dcu, selected_dt_m_g1);
            } else {
                alert("Выберите концентратор из дерева объектов или из списка концентраторов!");
            }
        }
    });

    $("#dropbox2_1_g").click(function () {
        $("#dropdown2_1_g").slideToggle(400);
    })

    $("#dropdown2_1_g div").mouseenter(function () {
        $(this).css('background', '#8c8c8c');
    })

    $("#dropdown2_1_g div").mouseleave(function () {
        $(this).css('background', 'none');
    })

    function DcuAdd()
    {
        
        var dcu_id;
        var dcu_nm;
        var model;
        var dcu_gb;
        var group_id;
        var login_yn;
        var install_place;
        var card_no;
        var version;
        var install_dt;
        var connection_dt;
        var check_dt;
        var production_dt;
        var imei_no;
        var use_yn;
        dcu_id = $("#dcu_id").val();
        
        
        dcu_nm = $("#dcu_nm").val();
        model = $("#dcu_model").val();
        dcu_gb = $("#dcu_type option:selected").val();
        group_id = selected_gr_id;
        login_yn = 0;
        install_place = $("#dcu_place").val();
        card_no = $("#dcu_sim").val();
        version = $("#dcu_fmver").val();
        install_dt = $("#dcu_install_dt").val();
        connection_dt = $("#dcu_connect_dt").val();
        check_dt = $("#dcu_check_dt").val();
        production_dt=$("#dcu_prod_dt").val();
        imei_no = $("#dcu_imei").val();
        use_yn = 1;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/Meter/AddConcentrator",
            data: '{dcu_id:"' + dcu_id + '", dcu_nm:"' + dcu_nm + '", model:"' + model + '", dcu_gb:"' + dcu_gb + '", group_id:"' + group_id + '", login_yn:"' + login_yn + '", install_place:"' + install_place + '", card_no:"' + card_no + '", firmware_version:"' + version + '", install_dt:"' + install_dt + '", connection_dt:"' + connection_dt + '", check_dt:"' + check_dt + '", production_dt:"' + production_dt + '", imei_no:"' + imei_no + '", use_yn:"' + use_yn + '"}',
            success: function (result) {
                alert("OK!!!");
            }
        })
    }

    $("#add_dcu").click(function () {
        if(selected_gr_gb==4)
        {
        DcuAdd();
        }
        else
        {
        alerrt("you cannot add dcu to this node!!!");
        }
        RebuildTree();
        $("#dcu_id").val("");
        $("#dcu_nm").val("");
        $("#dcu_model").val("");
        $("#dcu_imei").val("");
        $("#dcu_place").val("");
        $("#dcu_sim").val("");
        $("#dcu_fmver").val("");
        $("#dcu_install_dt").val("");
        $("#dcu_connect_dt").val("");
        $("#dcu_check_dt").val("");
        $("#dcu_prod_dt").val("");
    })

    function DisplayTreeItems()
    {
        //table11.clear().draw();
        //var i = 0;
        //for (i = 0; i < tree_global_arr.length; i++) {
        //    table11.row.add([
        //                    table11.rows().count() + 1,
        //                    tree_global_arr[i].id,
        //                    tree_global_arr[i].text,
        //                    tree_global_arr[i].gb,
        //                    tree_global_arr[i].parent,
        //    ]).draw();
        //};
    }
    function AddTreeItem()
    {
        var i = 0;
        var check_id = 0;
        var parent_id;
        var group_id;
        var group_nm;
        var group_gb;
        group_id = $("#tree_group_id").val();
        group_nm = $("#tree_group_name").val();
        if ($("#ch_tree").prop('checked') == false)
        {
            parent_id = $("#tree_parent_id").val();
            if (selected_gr_gb == "0") {
                group_gb = "1";
            }
            if (selected_gr_gb == "1") {
                group_gb = "2";
            }
            if (selected_gr_gb == "2") {
                group_gb = "3";
            }
            if (selected_gr_gb == "3") {
                group_gb = "4";
            }
            $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/User/GetGroupId",
            success: function (result) {
                for(i=0; i<result.length; i++)
                {
                    if(group_id==result[i].id)
                    {
                        check_id = 1;
                        alert("извините, этот ИД используется!!!");
                        $("#tree_group_id").val("");
                        $("#tree_group_name").val("");
                        $("#tree_group_gb").val("");
                    }
                }
                if(check_id==0)
                {
                    if (selected_gr_gb != 4) {
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: "/User/AddTreeItem",
                            data: '{group_id: "' + group_id + '", group_nm: "' + group_nm + '", group_gb: "' + group_gb + '", parent_id: "' + parent_id + '", type:"' + e_g_w_switch + '"}',
                            success: function (result) {
                                alert("Новый узел создан!!!");
                                $("#tree_group_id").val("");
                                $("#tree_group_name").val("");
                                $("#tree_group_gb").val("");
                                RebuildTree();
                            }
                        })
                    }
                    if (selected_gr_gb == 4) {
                        alert("!!!");
                    }
                }
                 
            }
        }) 
        }
        if ($("#ch_tree").prop('checked') == true)
        { 
            group_gb = "0";
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "/User/GetGroupId",
                success: function (result) {
                    for (i = 0; i < result.length; i++) {
                        if (group_id == result[i].id) {
                            check_id = 1;
                            alert("извините, этот ИД используется!!!");
                            $("#tree_group_id").val("");
                            $("#tree_group_name").val("");
                            $("#tree_group_gb").val("");
                        }
                    }
                    if (check_id == 0) {
                        if (selected_gr_gb != 4) {
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                url: "/User/AddTreeItem1",
                                data: '{group_id: "' + group_id + '", group_nm: "' + group_nm + '", group_gb: "' + group_gb + '", type:"' + e_g_w_switch + '"}',
                                success: function (result) {
                                    alert("Новый узел создан!!!");
                                    $("#tree_group_id").val("");
                                    $("#tree_group_name").val("");
                                    $("#tree_group_gb").val("");
                                }
                            })
                        }
                        if (selected_gr_gb == 4) {
                            alert("!!!");
                        }
                    }

                }
            })
        }
    }

    function DeleteTreeItem()
    {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/User/CheckTreeChild",
            data: '{group_id: "' + selected_gr_id + '"}',
            success: function (result) {
                if(result.length>0)
                {
                    alert("вы не можете удалить узел, у которого есть дочерние элементы!!!")
                }
                else {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "/User/DeleteTreeItem",
                        data: '{group_id: "' + selected_gr_id + '", group_gb: "' + selected_gr_gb + '"}',
                        success: function (result) {
                            alert("узел удален!!!");
                            RebuildTree();
                        }
                    })
                }
            }
        })

        
    }

    function RebuildTree()
    {
        $('#jstree').jstree(true).settings.core.data = ["Loading..."];
        $('#jstree').jstree(true).refresh();
        $('#jstree').on('refresh.jstree', function () {
            $("#jstree").jstree("open_all");
        });

        $.when(ReLoadTree()).done(function () {
            $('#jstree').jstree(true).settings.core.data = tree_global_arr;
            $('#jstree').jstree(true).refresh();
            $('#jstree').on('refresh.jstree', function () {
                $("#jstree").jstree("open_all");
            });
        });
    }
    $("#ch_tree").click(function () {
        if ($(this).prop('checked') == true)
        {
            $("#tree_parent_id").val("");
            $("#tree_parent_id").prop('disabled', true);
            $("#tree_parent_name").val("");
            $("#tree_parent_name").prop('disabled', true);
        }

        if ($(this).prop('checked') == false)
        {
            $("#tree_parent_id").val("");
            $("#tree_parent_id").prop('disabled', false);
            $("#tree_parent_name").val("");
            $("#tree_parent_name").prop('disabled', false);
        }
    })
    $("#tree_add").click(function () {
        AddTreeItem();
        
    })
    $("#tree_delete").click(function () {
        DeleteTreeItem();
        

    })

    $("#tree_item").click(function () {
        setTimeout('$("#datatable11").scrollTop(0);', 5);
        $("#t11_header_back").css('display', 'none');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").fadeIn("slow");
        $("#table_div_g").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");
        DisplayTreeItems();
    })

    $("#meter_g").click(function () {
        $("#t2_header_back_g").css('display', 'none');
        $("#chart_cover_mdt").css('display', 'block');
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_met").css("display", "none");
        $("#det_dcu").css("display", "none");
        $("#det_consumers").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "block");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#table_div_g").fadeIn("slow");
        $("#table2_g").css("width", "100%");
        $("#table2_g").css("height", "100%");

        
        

        $("#dropdown2_1_g").css("display", "none");
        $(function () {
            // 24 hours //
            $("#met_day_date_g").datepicker({
                numberOfMonths: 3,
                maxDate: 0,
            });
        });
    })

    $("#logs_g").click(function () {
        
        GetUsers();
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div7").fadeIn("slow");
        $("#table7").css("width", "100%");
        $("#table7").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        cur_table = 7;
        $("#scroll_l").css("display", "block");
        $("#scroll_r").css("display", "block");
        $("#rightm_div").css("display", "none");
        $("#met_event_rd2").removeAttr("checked");
    })

    $("#meter").click(function () {
        setTimeout('$("#datatable2").scrollTop(0);', 5);
        $("#t2_header_back").css('display', 'none');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        // or 
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '1');
        //table1_dp_met.clear().draw();
        $("#chart_cover_mdt").css('display', 'block');
        $("#table_div1").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div2").fadeIn("slow");
        $("#table2").css("width", "175%");
        $("#table2").css("height", "100%");
        $("#table6").css("width", "150%");
        $("#table6").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_met").css("display", "block");
        $("#det_dcu").css("display", "none");
        $("#det_consumers").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#dropbox2_1 p").text("Операции");
        $("#details_pan").css("left", "-5000px");
    })

    $("#meter").mouseover(function () {
        $("#meter p").css("color", "#f2ce02");
    })
    $("#meter").mouseout(function () {
        $("#meter p").css("color", "#fff");
    })

    $("#meter_g").mouseover(function () {
        $("#meter_g p").css("color", "#48abe1");
    })
    $("#meter_g").mouseout(function () {
        $("#meter_g p").css("color", "#fff");
    })

    $("#logs_g").mouseover(function () {
        $("#logs_g p").css("color", "#48abe1");
    })
    $("#logs_g").mouseout(function () {
        $("#logs_g p").css("color", "#fff");
    })

    $("#switch_re").click(function () {
        $(this).toggleClass("switch_re_r");
    })
    //new code axad
    $("#met_print1_g1").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#met_print1_g1").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#met_excel1_g1").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#met_excel1_g1").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#met_pdf1_g1").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#met_pdf1_g1").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })
    $("#meter_logs_g").mouseover(function () {
        $("#meter_logs_g p").css("color", "#48abe1");
    })
    $("#meter_logs_g").mouseout(function () {
        $("#meter_logs_g p").css("color", "#fff");
    })
    $("#search_met_g1").click(function () {
        $(".dataTables_g1_filter input").val("");
        $("#mhint2_g1").fadeIn(350);
        $("#mhint1_g1").css('display', 'none');
        setTimeout('$("#mhint2_g1").fadeOut(350)', 5000);
    })

    $("#circle_all_g1 p").mouseover(function () {
        $("#msg_box2_g1").css('top', '5%');
        $("#msg_box2_g1").css('left', '61%');
        $("#msg_box2_g1").fadeIn(200);
        $("#msg_box2_g1 p").text("Отобразить все счетчики");
    })

    $("#circle_all_g1").mouseout(function () {
        $("#msg_box2_g1").fadeOut(200);
    })
    $("#circle_on_g1 p").mouseover(function () {
        $("#msg_box2_g1").css('top', '5%');
        $("#msg_box2_g1").css('left', '64%');
        $("#msg_box2_g1").fadeIn(200);
        $("#msg_box2_g1 p").text("Отобразить включенные счетчики");
    })

    $("#circle_on_g1").mouseout(function () {
        $("#msg_box2_g1").fadeOut(200);
    })
    $("#circle_off_g1 p").mouseover(function () {
        $("#msg_box2_g1").css('top', '5%');
        $("#msg_box2_g1").css('left', '66.5%');
        $("#msg_box2_g1").fadeIn(200);
        $("#msg_box2_g1 p").text("Отобразить выключенные счетчики");
    })

    $("#circle_off_g1").mouseout(function () {
        $("#msg_box2_g1").fadeOut(200);
    })
    $("#circle_nr_g1 p").mouseover(function () {
        $("#msg_box2_g1").css('top', '5%');
        $("#msg_box2_g1").css('left', '68.8%');
        $("#msg_box2_g1").fadeIn(200);
        $("#msg_box2_g1 p").text("Отобразить не опрошенные счетчики");
    })

    $("#circle_nr_g1").mouseout(function () {
        $("#msg_box2_g1").fadeOut(200);
    })

    $("#meter_logs_g").click(function () {
        $("#t2_header_back_g1").css('display', 'none');
        $("#chart_cover_mdt").css('display', 'block');
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#home").css("display", "none");
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_met").css("display", "block");
        $("#det_dcu").css("display", "none");
        $("#det_consumers").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#table_div_g1").fadeIn("slow");
        $("#table2_g1").css("width", "100%");
        $("#table2_g1").css("height", "100%");



        $("#dropdown2_1_g1").css("display", "none");
        $(function () {
            $("#met_day_date_g1").datepicker({
                numberOfMonths: 3,
                maxDate: 0,
            });
        });
    })

    table2_g1 = $("#table2_g1").DataTable({
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
        "autoWidth": false
        //"columnDefs": [
          //{ "width": "2%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2 }, { "width": "2%", "targets": 3, "orderable": true },
          //{ "width": "9%", "targets": 4 }, { "width": "6%", "targets": 5 }, { "width": "5%", "targets": 6 }, { "width": "9%", "targets": 7 },
          //{ "width": "9%", "targets": 8 }, { "width": "4%", "targets": 9 }, { "width": "4%", "targets": 10 }//, { "width": "8%", "targets": 11 }
          //{ "width": "50%", "targets": 12 }, //{ "width": "6%", "targets": 13 }, { "width": "6%", "targets": 14 }, { "width": "6%", "targets": 15 },
        //  { "width": "6%", "targets": 16 }, { "width": "6%", "targets": 17 }
        //]
    });
    // Select row

    $("#table2_g1 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table2_g1.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });

    table2_v = $("#table2_v").DataTable({
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
        "autoWidth": false
        //"columnDefs": [
        //{ "width": "2%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2 }, { "width": "2%", "targets": 3, "orderable": true },
        //{ "width": "9%", "targets": 4 }, { "width": "6%", "targets": 5 }, { "width": "5%", "targets": 6 }, { "width": "9%", "targets": 7 },
        //{ "width": "9%", "targets": 8 }, { "width": "4%", "targets": 9 }, { "width": "4%", "targets": 10 }//, { "width": "8%", "targets": 11 }
        //{ "width": "50%", "targets": 12 }, //{ "width": "6%", "targets": 13 }, { "width": "6%", "targets": 14 }, { "width": "6%", "targets": 15 },
        //  { "width": "6%", "targets": 16 }, { "width": "6%", "targets": 17 }
        //]
    });
    // Select row

    $("#table2_v tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table2_v.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });

    // All meters
    $("#circle_all_v").click(function () {
        var s1 = $("#circle_all_v p").text();
        if ((s1 != "") && (s1 != "0")) {
            $("#meter_loader_v").fadeIn(150);
            LoadWaterMeters(selected_dcu, selected_dt_v);
        }
    });

    // On meters
    $("#circle_on_v").click(function () {
        var s1 = $("#circle_on_v p").text();
        if ((s1 != "") && (s1 != "0")) {
            $("#meter_loader_v").fadeIn(150);
            LoadWMetersOn(selected_dcu, selected_dt_v);
        }
    });

    // Off meters
    $("#circle_off_v").click(function () {
        var s1 = $("#circle_off_v p").text();
        if ((s1 != "") && (s1 != "0")) {
            $("#meter_loader_v").fadeIn(150);
            LoadWMetersOff(selected_dcu, selected_dt_v);
        }
    });

    // Not read meters
    $("#circle_nr_v").click(function () {
        var s1 = $("#circle_nr_v p").text();
        if ((s1 != "") && (s1 != "0")) {
            $("#meter_loader_v").fadeIn(150);
            LoadWMetersNR(selected_dcu, selected_dt_v);
        }
    });

    $("#table2_v thead").on('click', 'input', function () {
        var i = 0;
        var current;
        //var dt = selected_dt_m;
        //var s1 = dt.substring(0, 4);
        //var s2 = dt.substring(4, 6);
        //var s3 = dt.substring(6, 8);
        //dt = s3 + "" + s2 + "" + s1;
        if ($("#table2_v thead input").prop('checked') == true) {
            $("#table2_v tbody input").prop('checked', true);
            for (i = 0; i < table2_v.rows().count() ; i++) {
                current = table2_v.row(i).data();
                var obj = {};
                obj.operator_id = operator_id;
                obj.operation_id = "";
                obj.meter_id = current[6];
                obj.dcu_id = current[5];
                obj.dt = "";
                obj.target = "";
                obj.task = "";
                task_arr_v[i] = obj;
            }
        } else {
            $("#table2_v tbody input").prop('checked', false);
            task_arr_v = [];
        }
        //alert(task_arr);
    });

    $("#table2_v").on('click', 'input', function () {
        var i = 0;
        var index = $(this).parent("td").parent("tr").index();
        var current = table2_v.row(index).data();

        //var dt = selected_dt_m;
        //var s1 = dt.substring(0, 4);
        //var s2 = dt.substring(4, 6);
        //var s3 = dt.substring(6, 8);
        //dt = s3 + "" + s2 + "" + s1;
        //var text_date = s2 + "." + s1 + "." + s3;

        if ($(this).prop("checked") == true) {
            //alert("checkbox checked");
            var obj = {};
            obj.operator_id = operator_id
            obj.operation_id = "";
            obj.meter_id = current[6];
            obj.dcu_id = current[5];
            obj.dt = "";
            obj.target = "";
            obj.task = "";
            task_arr_v[index] = obj;
            //alert(task_arr);
        };

        if ($(this).prop("checked") == false) {
            task_arr_v[index] = null;
            //alert("checkbox unchecked");
            //alert(task_arr);
        }
    });

    $("#dropdown2_1_v p").click(function () {
        $("#dropdown2_1_v").slideUp(400);
        var rnd, rnd2, rnd3, rnd4, rnd5, rnd6, i;
        rnd = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd2 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd4 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd5 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd6 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        var operation_id = rnd + '' + rnd2 + '' + rnd3 + '' + rnd4 + '' + rnd5 + '' + rnd6;

        var dtt = selected_dt_m_g;
        var s1 = dtt.substring(0, 4);
        var s2 = dtt.substring(4, 6);
        var s3 = dtt.substring(6, 8);
        dtt = s3 + "" + s2 + "" + s1;

        //alert(task_arr);
        task_arr_v = task_arr_v.filter(function (n) {
            return n != undefined
        });
        //alert(task_arr);

        var dtm = new Date();
        var time = dtm.toString();
        var tm = time.substring(16, 21);
        //Sat Feb 24 2018 12:42:24 GMT+0500 (West Asia Standard Time)
        $("#table2_v input:checkbox").prop('checked', false);
        if ($(this).text() == "Показания с счетчика") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr_v.length; i++) {
                task_arr_v[i].operation_id = operation_id;
                task_arr_v[i].target = "current";
                task_arr_v[i].dt = dtt;
            }
            table_disp.row.add([
                task_arr_v[0].operator_id,
                task_arr_v[0].operation_id,
                "Чтение с счетчика воды",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest_v(task_arr_v);
            //$("#met_day_date").prop("disabled", true);
        }
        //
        if ($(this).text() == "Включить выбранные счетчики") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr_v.length; i++) {
                task_arr_v[i].operation_id = operation_id;
                task_arr_v[i].target = "on";
                task_arr_v[i].dt = dtt;
            }
            table_disp.row.add([
                task_arr_v[0].operator_id,
                task_arr_v[0].operation_id,
                "Включение счетчиков воды",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest_v(task_arr_v);
            //$("#met_day_date").prop("disabled", true);
        }
        //
        if ($(this).text() == "Выключить выбранные счетчики") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr_v.length; i++) {
                task_arr_v[i].operation_id = operation_id;
                task_arr_v[i].target = "off";
                task_arr_v[i].dt = dtt;
            }
            table_disp.row.add([
                task_arr_v[0].operator_id,
                task_arr_v[0].operation_id,
                "Выключение счетчиков воды",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest_v(task_arr_v);
            //$("#met_day_date").prop("disabled", true);
        }
        //
        task_arr_v = [];
    })

    //end code axad
    //new code 16/11/2018 axad
    //start for ВОДА СЧЕТЧИКИ
    $("#met_print1_v").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#met_print1_v").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#met_excel1_v").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#met_excel1_v").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#met_pdf1_v").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#met_pdf1_v").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })
    $("#circle_all_v p").mouseover(function () {
        $("#msg_box2_v").css('top', '5%');
        $("#msg_box2_v").css('left', '61%');
        $("#msg_box2_v").fadeIn(200);
        $("#msg_box2_v p").text("Отобразить все счетчики");
    })

    $("#circle_all_v").mouseout(function () {
        $("#msg_box2_v").fadeOut(200);
    })
    $("#circle_on_v p").mouseover(function () {
        $("#msg_box2_v").css('top', '5%');
        $("#msg_box2_v").css('left', '64%');
        $("#msg_box2_v").fadeIn(200);
        $("#msg_box2_v p").text("Отобразить включенные счетчики");
    })

    $("#circle_on_v").mouseout(function () {
        $("#msg_box2_v").fadeOut(200);
    })
    $("#circle_off_v p").mouseover(function () {
        $("#msg_box2_v").css('top', '5%');
        $("#msg_box2_v").css('left', '66.5%');
        $("#msg_box2_v").fadeIn(200);
        $("#msg_box2_v p").text("Отобразить выключенные счетчики");
    })

    $("#circle_off_v").mouseout(function () {
        $("#msg_box2_v").fadeOut(200);
    })
    $("#circle_nr_v p").mouseover(function () {
        $("#msg_box2_v").css('top', '5%');
        $("#msg_box2_v").css('left', '68.8%');
        $("#msg_box2_v").fadeIn(200);
        $("#msg_box2_v p").text("Отобразить не опрошенные счетчики");
    })

    $("#circle_nr_v").mouseout(function () {
        $("#msg_box2_v").fadeOut(200);
    })
    $("#dropdown2_1_v div").mouseenter(function () {
        $(this).css('background', '#8c8c8c');
    })

    $("#dropdown2_1_v div").mouseleave(function () {
        $(this).css('background', 'none');
    })
    $("#dropbox2_1_v").click(function () {
        $("#dropdown2_1_v").slideToggle(400);
    })
    $("#search_met_v").click(function () {
        $(".dataTables_v_filter input").val("");
        $("#mhint2_v").fadeIn(350);
        $("#mhint1_v").css('display', 'none');
        setTimeout('$("#mhint2_v").fadeOut(350)', 5000);
    })

    $("#met_day_date_v").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s1 + "" + s2;
        selected_dt_v = dt;
        // change fornart to dd.mm.yyy
        //$(this).val(s2 + "." + s1 + "." + s3);
        //alert(selected_dt_m);
        //

        if ($("#search_met_v").val() != "") {
            //if (table2.rows().count() > 0) {
            //    var search = $("#search_met_g").val();
            //    GlobalSearchMeters(search, selected_gr_id, selected_gr_gb, selected_dt_m_g);
            //}
        } else {
            if (selected_dcu != null && selected_dcu != "") {
                $("#meter_loader_v").fadeIn(150);
                LoadWaterMeters(selected_dcu, selected_dt_v);
            } else {
                alert("Выберите концентратор из дерева объектов или из списка концентраторов!");
            }
        }
    });

    $("#meter_v").click(function () {
        setTimeout('$("#datatable2_v").scrollTop(0);', 5);
        $("#t2_header_back_v").css('display', 'none');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        $("#t2_header_back_v").css('display', 'none');
        $("#chart_cover_mdt").css('display', 'block');
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#home").css("display", "none");
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_met").css("display", "block");
        $("#det_dcu").css("display", "none");
        $("#det_consumers").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#table_div_v").fadeIn("slow");
        $("#table2_v").css("width", "100%");
        $("#table2_v").css("height", "100%");



        $("#dropdown2_1_v").css("display", "none");
        $(function () {
            // 24 hours //
            $("#met_day_date_v").datepicker({
                numberOfMonths: 3,
                maxDate: 0,
            });
        });
    })
    //end for ВОДА СЧЕТЧИКИ
    //start for ВОДА АБОНЕНТЫ
    $("#cons_end_date_main_v").datepicker({
        numberOfMonths: 3,
        maxDate: 0
    });
    $("#cons_start_date_main_v").datepicker({
        numberOfMonths: 3,
        maxDate: 0,
        onClose: function () {
            $("#cons_end_date_main_v").datepicker("show");
        }
    });
    $("#search_cons_v").click(function () {
        $("#chint2_v").fadeIn(350);
        $("#chint1_v").css('display', 'none');
        setTimeout('$("#chint2_v").fadeOut(350)', 5000);
    })

    $("#consumer_v").click(function () {
        alert("Раздел временно не доступен.");
        //$("#table3_v").DataTable();
        //$("#t3_header_back_v").css('display', 'none');
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        //$("#table_div1").css("display", "none");
        //$("#table_div2").css("display", "none");
        //$("#table_div4").css("display", "none");
        //$("#table_div5").css("display", "none");
        //$("#table_div6").css("display", "none");
        //$("#table_div7").css("display", "none");
        //$("#table_div8").css("display", "none");
        //$("#table_div_g").css("display", "none");
        //$("#table_div_v").css("display", "none");
        //$("#table_div3_g2").css("display", "none");
        //$("#table_div_g1").css("display", "none");
        //$("#table_div3").css("display", "none");
        //$("#home").css("display", "none");
        //$("#search_cons_v").css('display', 'block');

        //$("#table_div3_v").fadeIn("slow");
        //$("#table3_v").css("width", "100%");
        //$("#table3_v").css("height", "100%");
        //$("#scroll_l").css("display", "none");
        //$("#scroll_r").css("display", "none");
        //$("#det_cons").css("display", "block");
        //$("#det_met").css("display", "none");
        //$("#det_dcu").css("display", "none");
        //$("#det_access").css("display", "none");
        //$("#det_struct").css("display", "none");
        //$("#det_struct").css("display", "none");
        //$("#rightm_div").css("display", "none");
        //$("#details_pan").css("left", "-10000px");
    })
    //end ВОДА АБОНЕНТЫ
    //start for GAS АБОНЕНТЫ
    $("#cons_end_date_main_g2").datepicker({
        numberOfMonths: 3,
        maxDate: 0
    });
    $("#cons_start_date_main_g2").datepicker({
        numberOfMonths: 3,
        maxDate: 0,
        onClose: function () {
            $("#cons_end_date_main_g2").datepicker("show");
        }
    });
    $("#search_cons_g2").click(function () {
        $("#chint2_g2").fadeIn(350);
        $("#chint1_g2").css('display', 'none');
        setTimeout('$("#chint2_g2").fadeOut(350)', 5000);
    })

    $("#consumer_g").click(function () {
        alert("Раздел временно не доступен.");
        //$("#table3_g2").DataTable();
        //setTimeout('$("#datatable3_g2").scrollTop(0);', 5);
        //$("#t3_header_back_g2").css('display', 'none');
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        //$("#table_div1").css("display", "none");
        //$("#table_div2").css("display", "none");
        //$("#table_div4").css("display", "none");
        //$("#table_div5").css("display", "none");
        //$("#table_div6").css("display", "none");
        //$("#table_div7").css("display", "none");
        //$("#table_div8").css("display", "none");
        //$("#table_div_g").css("display", "none");
        //$("#table_div_v").css("display", "none");
        //$("#table_div3_v").css("display", "none");
        //$("#table_div_g1").css("display", "none");
        //$("#table_div3").css("display", "none");
        //$("#home").css("display", "none");
        //$("#search_cons_g2").css('display', 'block');

        //$("#table_div3_g2").fadeIn("slow");
        //$("#table3_g2").css("width", "100%");
        //$("#table3_g2").css("height", "100%");
        //$("#scroll_l").css("display", "none");
        //$("#scroll_r").css("display", "none");
        //$("#det_cons").css("display", "block");
        //$("#det_met").css("display", "none");
        //$("#det_dcu").css("display", "none");
        //$("#det_access").css("display", "none");
        //$("#det_struct").css("display", "none");
        //$("#det_struct").css("display", "none");
        //$("#rightm_div").css("display", "none");
        //$("#details_pan").css("left", "-10000px");
    })
    //end for GAS АБОНЕНТЫ
    //end code 16/11/2018 axad

    //new code axad 17/11/2018
    $("#datatable2_g").scroll(function(event){
        var s = $(this).scrollTop();
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#t2_header_back_g").css('display', 'block');
            $("#t2_header_back_g").css('border-bottom', 'solid 1px #cecece');
            $("#table2_g th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#t2_header_back_g").css('display', 'none');
            $("#table2_g th").css('border-bottom', 'solid 1px #cecece');
        }
    })

    $("#datatable2_v").scroll(function (event) {
        var s = $(this).scrollTop();
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#t2_header_back_v").css('display', 'block');
            $("#t2_header_back_v").css('border-bottom', 'solid 1px #cecece');
            $("#table2_v th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#t2_header_back_v").css('display', 'none');
            $("#table2_v th").css('border-bottom', 'solid 1px #cecece');
        }
    })
    //end code axad 17/11/2018
    $("#logs").click(function () {
        GetUsers();
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div7").fadeIn("slow");
        $("#table7").css("width", "100%");
        $("#table7").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        cur_table = 7;
        $("#scroll_l").css("display", "block");
        $("#scroll_r").css("display", "block");
        $("#rightm_div").css("display", "none");
        $("#met_event_rd2").removeAttr("checked");
    })
    $("#logs").mouseover(function () {
        $("#logs p").css("color", "#f2ce02");
    })
    $("#logs").mouseout(function () {
        $("#logs p").css("color", "#fff");
    })

    $("#met2_event_rd2").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
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
        setTimeout('$("#datatable3").scrollTop(0);', 5);
        $("#t3_header_back").css('display', 'none');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        // or
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '1');
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");
        $("#search_cons").css('display', 'block');

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
        $("#det_consumers").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "-10000px");
        //$(".clk1").trigger('click');
        //alert();
    })
    $("#consumer").mouseover(function () {
        $("#consumer p").css("color", "#f2ce02");
    })
    $("#consumer").mouseout(function () {
        $("#consumer p").css("color", "#fff");
    })

    $("#consumer_g").mouseover(function () {
        $("#consumer_g p").css("color", "#48abe1");
    })
    $("#consumer_g").mouseout(function () {
        $("#consumer_g p").css("color", "#fff");
    })

    $("#org").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
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
        $("#det_gas_gprs").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_met").css("display", "none");
        $("#det_dcu").css("display", "none");
        $("#det_consumers").css("display", "none");
        $("#det_user").css("display", "none");
        $("#rightm_div").css("display", "none");
    })
    $("#org").mouseover(function () {
        $("#org p").css("color", "#ffd800");
    })
    $("#org").mouseout(function () {
        $("#org p").css("color", "#fff");
    })

    table91 = $("#table91").DataTable({
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
        "ordering": false,
        "info": false,
        "filter": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "2%", "targets": 0, "orderable": false }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2, "orderable": false }
        ]
    });
    table92 = $("#table92").DataTable({
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
        "ordering": false,
        "info": false,
        "filter": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "2%", "targets": 0, "orderable": false }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2, "orderable": false }
        ]
    });
    table93 = $("#table93").DataTable({
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
        "ordering": false,
        "info": false,
        "filter": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "2%", "targets": 0, "orderable": false }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2, "orderable": false }
        ]
    });

    $("#consumers").click(function () {
        setTimeout('$("#datatable10").scrollTop(0);', 5);
        $("#t10_header_back").css('display', 'none');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div10").fadeIn("slow");
        $("#table5").css("width", "100%");
        $("#table5").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_met").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_dcu").css("display", "none");
        $("#det_consumers").css("display", "block");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        
    })
    $("#consumers").mouseover(function () {
        $("#consumers p").css("color", "#f2ce02");
    })
    $("#consumers").mouseout(function () {
        $("#consumers p").css("color", "#fff");
    })

    $("#tree_item").mouseover(function () {
        $("#tree_item p").css("color", "#f2ce02");
    })
    $("#tree_item").mouseout(function () {
        $("#tree_item p").css("color", "#fff");
    })
    table10 = $("#table10").DataTable({
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
        
    });

    table11 = $("#table11").DataTable({
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
          { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1, }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 }, { "width": "1%", "targets": 4 }
        ]
    });
    $("#datatable11").scroll(function (event) {
        var s = $(this).scrollTop();
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#t11_header_back").css('display', 'block');
            $("#t11_header_back").css('border-bottom', 'solid 1px #cecece');
            $("#t11_header_back").css('top', '0px');
            $("#table11 th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#t11_header_back").css('display', 'none');
            $("#table11 th").css('border-bottom', 'solid 1px #cecece');
        }
    })

    $("#table10 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table10.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });

    $("#datatable10").scroll(function (event) {
        var s = $(this).scrollTop();
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#t10_header_back").css('display', 'block');
            $("#t10_header_back").css('border-bottom', 'solid 1px #cecece');
            $("#t10_header_back").css('top', '0px');
            $("#table10 th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#t10_header_back").css('display', 'none');
            $("#table10 th").css('border-bottom', 'solid 1px #cecece');
        }
    })
    $("#access").click(function () {
        setTimeout('$("#datatable5").scrollTop(0);', 5);
        $("#t5_header_back").css('display', 'none');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div5").fadeIn("slow");
        $("#table5").css("width", "100%");
        $("#table5").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_access").css("display", "block");
        $("#det_gas_gprs").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_met").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_dcu").css("display", "none");
        $("#det_consumers").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        
    })
    $("#access").mouseover(function () {
        $("#access p").css("color", "#f2ce02");
    })
    $("#access").mouseout(function () {
        $("#access p").css("color", "#fff");
    })

    //start 26/11/2018
    $("#add_user").mouseover(function () {
        $("#add_user p").css("color", "#f2ce02");
    })
    $("#add_user").mouseout(function () {
        $("#add_user p").css("color", "#fff");
    })
    $("#add_user").click(function () {
        setTimeout('$("#datatable9").scrollTop(0);', 5);
        setTimeout('$("#datatable9_1").scrollTop(0);', 5);
        $("#t9_header_back").css('display', 'none');
        $("#t9_1_header_back").css('display', 'none');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');

        $("#t9_header_back").css('display', 'none');
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_user").css("display", "block");
        $("#det_met").css("display", "none");
        $("#det_dcu").css("display", "none");
        $("#det_consumers").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#rightm_div1").css("display", "none");
        $("#table_div9").fadeIn("slow");
        $("#table9_1").css("width", "100%");
        $("#table9_1").css("height", "100%");
        $("#table9").css("width", "100%");
        $("#table9").css("height", "100%");
        
        
    })
    table9_1 = $("#table9_1").DataTable({
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
          { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1, }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 }, { "width": "1%", "targets": 4 }
        ]
    });

    $("#table9_1 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table9_1.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });
    
    table9 = $("#table9").DataTable({
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
          { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1, }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 }, { "width": "1%", "targets": 4 }
        ]
    });

    $("#table9 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table9.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });

    $("#datatable9").scroll(function (event) {
        var s = $(this).scrollTop();
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#t9_header_back").css('display', 'block');
            $("#t9_header_back").css('border-bottom', 'solid 1px #cecece');
            $("#t9_header_back").css('top', '0px');
            $("#table9 th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            $("#t9_header_back").css('display', 'none');
            $("#table9 th").css('border-bottom', 'solid 1px #cecece');
        }
    })

    $("#datatable9_1").scroll(function (event) {
        var s = $(this).scrollTop();
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#t9_1_header_back").css('display', 'block');
            $("#t9_1_header_back").css('border-bottom', 'solid 1px #cecece');
            $("#t9_1_header_back").css('top', '0px');
            $("#table9_1 th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            $("#t9_1_header_back").css('display', 'none');
            $("#table9_1 th").css('border-bottom', 'solid 1px #cecece');
        }
    })
    function GetRegionId(group_id, group_gb)
    {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/Tree/GetRegion",
            data: '{gr_id:"' + group_id + '", gr_gb:"' + group_gb + '"}',
            success: function (result) {
                region = result[0].id;
                AddUser1();
            }
        })
    }
    function AddUser1() {
        var chek = 0;
        if (login_u.length == 0) {
            chek = 1;
        }
        if (pass_u.length == 0) {
            chek = 1;
        }
        if (pass2_u.length == 0) {
            chek = 1;
        }
        if (username_u.length == 0) {
            chek = 1;
        }
        if (position_u.length == 0) {
            chek = 1;
        }
        if (chek == 0) {
            if (pass_u == pass2_u) {

                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "/User/GetParent",
                    data:'{group_id:"' + selected_gr_id + '", group_gb:"' + selected_gr_gb + '"}',
                    success: function (result)
                    {
                        if(result[0].parent_id!=null)
                        {
                            parent_id = result[0].parent_id;
                        }
                        if(result[0].parent_id==null)
                        {
                            parent_id=selected_gr_id;
                        }
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: "/User/GetLogin",
                            success: function (result) {
                                for (var i = 0; i < result.length; i++)
                                {
                                    if (login_u == result[i].login)
                                    {
                                        check_login = 1;
                                    }
                                }
                            if(check_login==0)
                            {
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    url: "/User/AddUser",
                                    data: '{login: "' + login_u + '", password: "' + pass_u + '", user_nm: "' + username_u + '", position: "' + position_u + '", group_id: "' + selected_gr_id + '", group_gb: "' + selected_gr_gb + '", relay: "' + relay_u + '", read_h: "' + rh_u + '", read_c: "' + rc_u + '", parent_id: "' + parent_id + '", region: "' + region + '"}',
                                    success: function (result) {
                                        alert("Новый пользователь создан");
                                        $("#login_u").val("");
                                        $("#passw_u").val("");
                                        $("#passw_u1").val("");
                                        $("#user_nm_u").val("");
                                        $("#position_u").val([0]);
                                        $("#let_user_relay").val([0]);
                                        $("#let_user_rh").val([0]);
                                        $("#let_user_rc").val([0]);

                                        $("#login_access").val("");
                                        $("#passw_access").val("");
                                        $("#passw_access1").val("");
                                        $("#user_nm_access").val("");
                                        $("#position_access").val([0]);
                                        $("#let_access_relay").val([0]);
                                        $("#let_access_rh").val([0]);
                                        $("#let_access_rc").val([0]);
                                    }
                                })
                            }
                    else {
                                alert("извините, этот логин используется");
                        check_login = 0;
                    }

                }
            })
                    }
                })

            

                    
            }
            else {
                alert("повторите правильную проверку!!!");
            }
        }
        else {
            alert("пожалуйста, выполните все обязательные поля!!!")
        }
        
    }
    function GetConsumer(group_name)
    {
       
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/Meter/GetMeterPoint",
            data: '{gr_nm:"' + group_name + '"}',
            success: function (result) {
                load_consumers = result;
                table10.clear().draw();
                
                for(var i=0; i<load_consumers.length; i++)
                {
                    table10.row.add([
                        table10.rows().count() + 1,
                        "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox' value='"+ table10.rows().count() +"'>",
                        load_consumers[i].id,
                        load_consumers[i].consumer,
                        load_consumers[i].address,
                        load_consumers[i].phone,
                        load_consumers[i].pers_account,
                    ]).draw();
                    //if (load_consumers[i].registered == "no") {
                    //    table10.row.add([
                    //            table10.rows().count() + 1,
                    //            "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                    //            "<div class='process'></div>",
                    //            load_consumers[i].meter_id,
                    //            load_consumers[i].consumer,
                    //            load_consumers[i].install_place,
                    //            load_consumers[i].phone,
                    //            load_consumers[i].pers_account,
                    //    ]).draw();
                    //}
                    //if(load_consumers[i].registered=="yes")
                    //{
                    //    table10.row.add([
                    //                table10.rows().count() + 1,
                    //                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                    //                "<div class='ready_disp'></div>",
                    //                load_consumers[i].meter_id,
                    //                load_consumers[i].consumer,
                    //                load_consumers[i].install_place,
                    //                load_consumers[i].phone,
                    //                load_consumers[i].pers_account,
                    //    ]).draw();
                    //}
                }
            }
        })
    }

    

    function GetTP(group_id)
    {
        $.ajax({

            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/DCU/GetTP",
            data:'{gr_id:"' + group_id + '"}',
            success: function (result)
            {
                //dcu_id_c = result[0].dcu_id;
                $("#ktp_c").val(result[0].name);
            }
            
            })
    }
    function GetAllUsers() {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/User/GetParent",
            data:'{group_id:"' + selected_gr_id + '", group_gb:"' + selected_gr_gb + '"}',
            success: function (result)
            {
                if(result[0].parent_id != null)
                {
                    parent_id=result[0].parent_id;
                }
                if(result[0].parent_id==null)
                {
                    parent_id=selected_gr_id;
                }
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "/User/GetAllUsers1",
                    data: '{group_id:"' + selected_gr_id + '", group_gb:"' + selected_gr_gb + '", parent_id:"' + parent_id + '"}',
                    success: function (result) {
                        load_users = result;
                        table9.clear().draw();
                        table9_1.clear().draw();
                        var i = 0;
                        for (i = 0; i < load_users.length; i++) {
                            if (load_users[i].position == "inspector") {
                                table9_1.row.add([
                                                table9_1.rows().count() + 1,
                                                load_users[i].login,
                                                load_users[i].user_nm,
                                                load_users[i].position,
                                ]).draw();
                            }
                            if (load_users[i].position == "warehouse") {
                                table9.row.add([
                                                table9.rows().count() + 1,
                                                load_users[i].login,
                                                load_users[i].user_nm,
                                                load_users[i].position,
                                ]).draw();
                            }

                        }
                    }
                })
            }
        })    
    }
    
    function AddConsumers() {
        var name;
        var place;
        var phone;
        var pers_acc;
        var phone_number;
        var phone_code;
        name = $("#name_c").val();
        place = $("#installed_p").val();
        phone_code = $("#operator_code").val();
        phone_number = $("#phone_number").val();
        phone = phone_code.concat(phone_number);
        pers_acc = $("#pers_account").val();
        var meter_type = "electric";
        var saved = "no";
        var registered = "no";
        var chek_c = 0;
        if (name.length == 0) {
            chek_c = 1;
        }
        if (place.length == 0) {
            chek_c = 1;
        }
        if (phone_number.length == 0) {
            chek_c = 1;
        }
        if (pers_acc.length == 0) {
            chek_c = 1;
        }

        if (chek_c == 0) {
            var check_acc = 0;
            if (pers_acc.length > 8 || pers_acc.length < 6) {
                check_acc = 1;
            }
            if (check_acc == 0) {
                var check_acc2 = 0;
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "/Meter/GetAccount",
                    success: function (result) {
                        account_list = result;
                        for (i = 0; i < account_list.length; i++) {
                            if (pers_acc == account_list[i].pers_account) {
                                //check_acc2 = 1;
                                //alert("извините, этот номер счета уже есть!!!");

                            }
                        }
                        if (check_acc2 == 0) {
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                url: "/Meter/AddMeterPoint",
                                data: '{dcu_id:"' + dcu_id_c + '", name:"' + name + '", reg_place:"' + place + '", phone_n:"' + phone + '", pers_acc:"' + pers_acc + '"}',
                                success: function (result) {
                                    alert("Новый точка учета создан");
                                }
                            })
                            GetConsumer(tp_name);
                            $("#name_c").val("");
                            $("#installed_p").val("");
                            $("#phone_number").val("");
                            $("#pers_account").val("");
                            $("#operator_code").val("");
                        }
                    }
                })
            }
            if (check_acc == 1) {
                alert("пожалуйста, введите номер вашей учетной записи правильно!!!");
            }
        }
        else {
            alert("пожалуйста, выполните все обязательные поля!!!");
        }

    }

    //function GetInspectors() {
    //    $.ajax({
    //        type: "POST",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        url: "/Meter/GetInspector",
    //        success: function (result) {
    //            inspector_list = result;
    //            BuildInspectorList();
    //        }
    //    })

    //}



    //function BuildInspectorList() {
       
    //    $("#drop_inspector_1 select").empty();
    //    var i = 0;
    //    for (i = 0; i < inspector_list.length; i++) {
    //        $('#drop_inspector_1 select').append('<option value=' + inspector_list[i].user_nm + '>' + inspector_list[i].user_nm + '</option>');
    //    }
    //}
    function ListUndefinedMeters() {
        var id = selected_gr_id.substring(0, 5);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/Meter/GetUndefinedMeters",
            data: '{id:"' + id + '"}',
            success: function (result) {
                undefined_meter_list = result;
                BuildUndefinedMeterList();
            }
        })
    }
    function BuildUndefinedMeterList() {

        $("#drop_meter select").empty();
        var i = 0;
        for (i = 0; i < undefined_meter_list.length; i++) {
            $('#drop_meter select').append('<option value=' + undefined_meter_list[i].meter_id + '>' + undefined_meter_list[i].meter_id + '</option>');
        }
    }
    function DeleteConsumers() {
        var check = 0;
        var check2 = 0;
        var name_d;
        var account_d;
        account_d = $("#pers_account").val();
        name_d = $("#name_c").val();

        if (name_d.length == 0) {
            check2 = 1;
        }
        if (account_d.length == 0) {
            check2 = 1;
        }
        if (check2 == 0) {
            var i = 0;
            for (i = 0; i < load_consumers.length; i++) {
                if (name_d == load_consumers[i].consumer) {
                    if (account_d == load_consumers[i].pers_account) {
                        check = 1;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: "/Meter/DeleteConsumer",
                            data: '{name:"' + name_d + '", pers_acc:"' + account_d + '"}',
                            success: function (result) {
                                alert("Абонент удален");
                            }
                        })
                        GetConsumer(tp_name);
                        $("#name_c").val("");
                        $("#installed_p").val("");
                        $("#phone_number").val("");
                        $("#pers_account").val("");
                    }

                }
            }
        }
        else {
            alert("пожалуйста, введите полное имя и номер вашего счета!!!");
        }

        if (check == 0) {
            alert("извините, у нас нет такого абонента!!!!!");
        }
    }
    $("#add_g").click(function () {
       
      
        meter_id_gg = $("#gas_g_id").val();
        dcu_id_gg = $("#gas_g_dcu_id").val();
        consumer_nm_gg = $("#gas_g_consumer").val();
        address_gg = $("#gas_g_address").val();
        type_gg = $("#gas_g_type").val();
        AddGasMeters();
        LoadGazMeters(selected_dcu, selected_dt_m_g);
        $("#gas_g_id").val("");
        $("#gas_g_consumer").val("");
        $("#gas_g_address").val("");
        $("#gas_g_type").val("");
    })
    $("#delete_g").click(function () {
       var meter_id;
       meter_id = $("#gas_g_id").val();
       DeleteGasMeter(meter_id);
       $("#gas_g_id").val("");
       $("#gas_g_consumer").val("");
       $("#gas_g_address").val("");
       $("#gas_g_type").val("");
       LoadGazMeters(selected_dcu, selected_dt_m_g);
    })
    $("#clear_g").click(function () {

        $("#gas_g_id").val("");
        $("#gas_g_consumer").val("");
        $("#gas_g_address").val("");
        $("#gas_g_type").val("");
    })
    function DeleteGasMeter(id)
    {
        $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "/Meter/GasMeterDelete",
                    data: '{meter_id:"' + id + '"}',
                    success: function (result) {
                        alert("счетчик удален");
                    }
        })
    }

    function AddGasMeters()
    {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/Meter/AddGasMeter",
            data: '{meter_id:"' + meter_id_gg + '", dcu_id:"' + dcu_id_gg + '", address:"' + address_gg + '", consumer:"' + consumer_nm_gg + '", type:"' + type_gg + '"}',
            //data: '{meter_id: "' + meter_id_gg + '", dcu_id: "' + dcu_id_gg + '", address: "' + address_gg + '", consumer: "' + consumer_nm_gg + '", type:"' + type_gg + '"}"',
            success: function (result) {
                alert("Новый GPRS счетчик создан");
            }
        })
    }

    $("#access_add").click(function () {

        login_u = $("#login_access").val();
        pass_u = $("#passw_access").val();
        pass2_u = $("#passw_access1").val();
        username_u = $("#user_nm_access").val();
        position_u = $("#position_access option:selected").text();
        relay_u = $("#let_access_relay option:selected").text();
        rh_u = $("#let_access_rh option:selected").text();
        rc_u = $("#let_access_rc option:selected").text();
        GetRegionId(selected_gr_id, selected_gr_gb);
        UsersList();
    })

    $("#consumer_add").click(function () {
        if (selected_gr_gb == 5)
        {
            AddConsumers();
        }
        else {
            alert("вам нужно выбрать концентратор, к которому вы хотите добавить потребителей !!!");
        }
    
    })
    $("#consumer_delete").click(function () {


        DeleteConsumers();
    })
    $("#consumer_clear").click(function () {
        $("#name_c").val("");
        $("#installed_p").val("");
        $("#phone_number").val("");
        $("#pers_account").val("");
    })

    $("#user_add").click(function () {
        
         login_u = $("#login_u").val();
         pass_u = $("#passw_u").val();
         pass2_u = $("#passw_u1").val();
         username_u = $("#user_nm_u").val();
         position_u = $("#position_u option:selected").text();
         relay_u = $("#let_user_relay option:selected").text();
         rh_u = $("#let_user_rh option:selected").text();
         rc_u = $("#let_user_rc option:selected").text();
        GetRegionId(selected_gr_id, selected_gr_gb);
        GetAllUsers();
    })
    function DeleteUser1(login) {

        var i = 0;
        var check = 0;
        for (i = 0; i < load_users.length; i++) {
            if (login == load_users[i].login) {
                check = 1;
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "/User/DeleteUser",
                    data: '{login: "' + login + '"}',
                    success: function (result) {
                        alert("Пользователь удален");
                    }
                })
            }
        }

        if (check == 0) {
            alert("извините, у нас нет такого пользователя!!!!!");
        }
    }
    function DeleteUser2(login) {

        var i = 0;
        var check = 0;
        for (i = 0; i < load_users1.length; i++) {
            if (login == load_users1[i].login) {
                check = 1;
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "/User/DeleteUser",
                    data: '{login: "' + login + '"}',
                    success: function (result) {
                        alert("Пользователь удален");
                    }
                })
            }
        }

        if (check == 0) {
            alert("извините, у нас нет такого пользователя!!!!!");
        }
    }
    $("#access_delete").click(function () {
            login_u = $("#login_access").val();
            DeleteUser2(login_u);
            UsersList();
       
    })

    $("#user_delete").click(function () {
            login_u = $("#login_u").val();
            DeleteUser1(login_u);
            GetAllUsers();
       
    })
    $("#user_c").click(function () {
        $("#login_u").val("");
        $("#passw_u").val("");
        $("#passw_u1").val("");
        $("#user_nm_u").val("");
        $("#position_u").val([0]);
        $("#let_user_relay").val([0]);
        $("#let_user_rh").val([0]);
        $("#let_user_rc").val([0]);
    })
    $("#access_clear").click(function () {
        $("#login_access").val("");
        $("#passw_access").val("");
        $("#passw_access1").val("");
        $("#user_nm_access").val("");
        $("#position_access").val([0]);
        $("#let_access_relay").val([0]);
        $("#let_access_rh").val([0]);
        $("#let_access_rc").val([0]);
    })
    //end 26/11/2018

    $("#renergy").click(function () {
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
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
        GetUsers();
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
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
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
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
        $("#det_consumers").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "none");
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
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
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
        $("#conf p").css("color", "#48abe1");
    })
    $("#conf").mouseout(function () {
        $("#conf p").css("color", "#fff");
    })
    $("#conf").click(function () {
        alert("Раздел временно не доступен!");
    })

    $("#pass").mouseover(function () {
        $("#pass p").css("color", "#f2ce02");
    })
    $("#pass").mouseout(function () {
        $("#pass p").css("color", "#fff");
    })
    $("#pass").click(function () {
        alert("Раздел временно не доступен!");
        //$("#form_change_pw").fadeIn(400);
    })

    $("#btn_home").mouseover(function () {
        $("#btn_home p").css("color", "#00ff05");
        $("#home_drop").css('display', 'block');
    })
    $("#btn_home").mouseout(function () {
        $("#btn_home p").css("color", "#fff");
    })
    //$("#btn_home").click(function () {
    //    $("#ht1_header").css('display', 'block');
    //    $("#ht2_header").css('display', 'block');
    //    $("#ht3_header").css('display', 'block');
    //    $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', "0");
    //    $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
    //    //$("#lm1").css("display", "none");
    //    //$("#lm3").css("display", "none");
    //    $("#home").fadeIn(500);
    //    //$("#lm1").css("display", "none");
    //    //$("#lm2").css("display", "none");
    //    //$("#lm3").css("display", "none");
    //    //$("#lm4").css("display", "none");
    //    //$("#lm_v").css("display", "none");
    //    $("#table_div1").css("display", "none");
    //    $("#table_div2").css("display", "none");
    //    $("#table_div3").css("display", "none");
    //    $("#table_div4").css("display", "none");
    //    $("#table_div5").css("display", "none");
    //    $("#table_div6").css("display", "none");
    //    $("#table_div7").css("display", "none");
    //    $("#table_div8").css("display", "none");
    //    $("#table_div9").css("display", "none");
    //    $("#table_div10").css("display", "none");
    //    $("#table_div11").css("display", "none");
    //    $("#table_div_g").css("display", "none");
    //    $("#top").css("display", "noone");
    //    $("#table1").css("width", "100%");
    //    $("#table1").css("height", "100%");
    //    //MalibuLineTopOn();
    //    //setTimeout(MalibuLineTopOff, 600);
    //    $("#scroll_l").css("display", "none");
    //    $("#scroll_r").css("display", "none");
    //    $("#det_dcu").css("display", "none");
    //    $("#det_consumers").css("display", "none");
    //    $("#det_user").css("display", "none");
    //    $("#det_met").css("display", "none");
    //    $("#det_cons").css("display", "none");
    //    $("#det_access").css("display", "none");
    //    $("#det_gas_gprs").css("display", "none");
    //    $("#det_struct").css("display", "none");
    //    $("#rightm_div").css("display", "none");
    //    $("#details_pan").css("left", "-5000px");
    //})

    

    $("#btn_hierar").mouseover(function () {
        $("#btn_hierar p").css("color", "#ffd800");
    })
    $("#btn_hierar").mouseout(function () {
        $("#btn_hierar p").css("color", "#fff");
    })

    $("#btn_device").mouseover(function () {
        $("#btn_device p").css("color", "#ffd800");
    })
    $("#btn_device").mouseout(function () {
        $("#btn_device p").css("color", "#fff");
    })

    $("#btn_gaz").mouseover(function () {
        $("#btn_gaz p").css("color", "#48abe1")
    })
    $("#btn_gaz").mouseout(function () {
        $("#btn_gaz p").css("color", "#fff")
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
    $("#table5").on('click', 'td', function () {
        var current = table5.row(this).data();
        var login = current[1];
        var name = current[2];
        $("#login_access").val(login);
        $("#user_nm_access").val(name);
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


    $("#jstree").on("changed.jstree", function (e, data) {
        // listen for event
        table5.clear().draw();
        table9.clear().draw();
        table9_1.clear().draw();
        if (selected_dt_m == null){
            var dt = new Date();
            var dt_m = dt.getMonth() + 1;
            var dt_d = dt.getDate();

            if (dt_d != 1 && dt_d != 2) {
                dt_d = dt_d - 2;
            }

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
        }


        if (selected_dt_c == null && selected_dt_c_end == null) {
            var dt = new Date();
            var dt_m = dt.getMonth() + 1;
            var dt_d = dt.getDate();

            if (dt_d != 1 && dt_d != 2) {
                dt_d = dt_d - 2;
            }

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
            $("#cons_start_date_main").val(fdt_d + "." + fdt_m + "." + dt_y);
            $("#cons_end_date_main").val(fdt_d + "." + fdt_m + "." + dt_y);
            $("#t3_hdt").text(fdt_d + "." + fdt_m + "." + dt_y);
            $("#t3_hdt2").text(fdt_d + "." + fdt_m + "." + dt_y);
            selected_dt_c = dt_y + "" + fdt_m + "" + fdt_d;
            selected_dt_c_end = dt_y + "" + fdt_m + "" + fdt_d;
        }
        var i, j, r = [];
        var gb;
        var gr_id;
        var dcu = "";
        var gr_nm = "";

        for (i = 0, j = data.selected.length; i < j; i++) {
            r.push(data.instance.get_node(data.selected[i]).id);
        };

        for (i = 0; i < tree_global_arr.length; i++) {
            if (data.selected == tree_global_arr[i].id) {
                gb = tree_global_arr[i].gb;
                gr_id = tree_global_arr[i].gr_id;
                dcu = tree_global_arr[i].dcu_id;
                gr_nm = tree_global_arr[i].text;
                selected_gr_nm = gr_nm;
                $("#tree_group_id").val("");
                $("#tree_group_name").val("");
                if($("#ch_tree").prop('checked')==false)
                {
                    $("#tree_parent_id").val(gr_id);
                    $("#tree_parent_name").val(gr_nm);
                }
            }
        };
        dcu_id_c = dcu;
        selected_gr_id = gr_id;
        selected_gr_gb = gb;
        if (selected_gr_gb == "4")
        {
            $("#dcu_ktp").val(gr_nm);
            $("#dcu_grpid").val(selected_gr_id);
        }
        else {
            $("#dcu_ktp").val("");
            $("#dcu_grpid").val("");
        }
        
        if (selected_gr_gb != 4) {
            if(selected_gr_gb !=5)
            {
            if ($("#home").css('display') == 'block') {
                // inithometable1() vars
                labels = [];
                vals = [];
                summa = [];
                balance = [];
                temp_summa = [];
                temp_balance = [];
                obj_arr = [];
                single_dcu_data_b = new Array();
                single_dcu_data_s = new Array();
                n_i = 0;
                g_i = 0;
                p_b = 0;
                p_s = 0;
                p_d = 100;
                // inithometable2() vars
                in_i = 0;
                interval;
                in_i2 = 0;
                interval2;
                read = 0;
                not_read = 0;
                connected = 0;
                all = 0;
                not_connected = 0;
                sum = 0;
                rb_ht1_log = true;

                $("#ht_loader").css('display', 'block');
                //table1_home.clear().draw();
                if (gr_nm.length > 3)
                {
                    $("#home_title").text(gr_nm);
                }
                
                //BuildChartBHT();
            }
            GetDCUListbyTree(gr_id, gb);
            }
            else if (selected_gr_gb == 5)
            {
                table1.clear().draw();
            }
        }
        else if (selected_gr_gb == 4)
            {
                table1.clear().draw();
            }


        //alert(dcu);
        if (dcu != "" && dcu != null) {
            selected_dcu = dcu;
            $("#dcu_loader").fadeIn(150);
            $("#meter_loader").fadeIn(150);
            $("#consumer_loader").fadeIn(150);
            arr_m_log = false;
            arr_m_rev_log = false;
            highlight_m = false;
            arr_m = [];
            arr_m_res = [];
            load_m_res = [];
            join_m_it_tree = 0;
            //table2.clear().draw();
            //alert("Ok");
            join_m_it_tree = setInterval(DeployMeterList, 1000);
            c_arr_m_log = false;
            c_arr_m_rev_log = false;
            c_arr_m = [];
            c_arr_m_res = [];
            c_load_m_res = [];
            c_join_m_it_tree = 0;
            //table2.clear().draw();
            c_join_m_it_tree = setInterval(DeployConsumerList, 1000);
        }
        else selected_dcu = null;


        //alert();
        //table2.clear().draw();
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
        //alert(gb);

        //alert(data.selected);
        GetAllUsers();
        UsersList();
        if(selected_gr_gb==5)
        {
            GetTP(selected_gr_id);
        }
        
        if(selected_gr_gb==4)
        {
            GetConsumer(gr_nm);
            tp_name = gr_nm;
            ListUndefinedMeters();
        }
        //GetInspectors();
    })
    //var to = false;
    //$('#search').keyup(function () {
    //    if (to) { clearTimeout(to); }
    //    to = setTimeout(function () {
    //        var v = $('#search').val();
    //        $('#jstree').jstree(true).search(v);
    //    }, 250);
    //    //
    //});
    $("#search").keypress(function (e) {
        var key = e.which;
        if(key==13)
        {
            var v = $(this).val();
            $("#jstree").jstree('search', v)
        }
    });


    /////////////////////////////

    
    $("#btn_hierar").click(function () {
        $("#lm1").hide();
        $("#lm3").hide();
        $("#lm4").hide();
        $("#lm2").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    })
    //$("#btn_gaz").click(function () {
	
    //    $("#lm3").hide();
    //    $("#lm2").hide();
    //    $("#lm4").hide();
    //    $("#lm_v").hide();
    //    $("#lm1").fadeIn("slow");
    //    $(".splitter_panel .vsplitter").css("width", "0px");
    //    e_g_w_switch = "gas";
    //    table1.clear().draw();
	//	$('#jstree').jstree(true).settings.core.data = ["Loading..."];
    //    $('#jstree').jstree(true).refresh();
    //    $('#jstree').on('refresh.jstree', function () {
    //        $("#jstree").jstree("open_all");
    //    });
		
	//	$.when(ReLoadTree()).done(function(){
	//		$('#jstree').jstree(true).settings.core.data = tree_global_arr;
	//		$('#jstree').jstree(true).refresh();
	//		$('#jstree').on('refresh.jstree', function () {
    //        $("#jstree").jstree("open_all");
    //    });
	//	});
    //});
    //new code axad

    $("#logs_v").mouseover(function () {
        $("#logs_v p").css("color", "#00deff");
    })
    $("#logs_v").mouseout(function () {
        $("#logs_v p").css("color", "#fff");
    })

    $("#consumer_v").mouseover(function () {
        $("#consumer_v p").css("color", "#00deff");
    })
    $("#consumer_v").mouseout(function () {
        $("#consumer_v p").css("color", "#fff");
    })

    $("#dcu_v").mouseover(function () {
        $("#dcu_v p").css("color", "#00deff");
    })
    $("#dcu_v").mouseout(function () {
        $("#dcu_v p").css("color", "#fff");
    })

    $("#meter_v").mouseover(function () {
        $("#meter_v p").css("color", "#00deff");
    })
    $("#meter_v").mouseout(function () {
        $("#meter_v p").css("color", "#fff");
    })

    $("#btn_v").mouseover(function () {
        $("#btn_v p").css("color", "#00ffff")
    })
    $("#btn_v").mouseout(function () {
        $("#btn_v p").css("color", "#fff")
    })

    $("#btn_v").click(function () {
        $("#lm1").hide();
        $("#lm2").hide();
        $("#lm3").hide();
        $("#lm4").hide();
        $("#lm_v").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
        e_g_w_switch = "water";
        table1.clear().draw();
        $('#jstree').jstree(true).settings.core.data = ["Loading..."];
        $('#jstree').jstree(true).refresh();
        $('#jstree').on('refresh.jstree', function () {
            $("#jstree").jstree("open_all");
        });
		
		$.when(ReLoadTree()).done(function(){
			$('#jstree').jstree(true).settings.core.data = tree_global_arr;
			$('#jstree').jstree(true).refresh();
			$('#jstree').on('refresh.jstree', function () {
            $("#jstree").jstree("open_all");
        });
		});
    });

    $("#dcu_v").click(function () {
        if (active_dcu_btn == false) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            cur_m_step = 1;
            cur_m_log1 = 1;
            $("#table_div2").css("display", "none");
            $("#table_div3").css("display", "none");
            $("#table_div4").css("display", "none");
            $("#table_div5").css("display", "none");
            $("#table_div6").css("display", "none");
            $("#table_div7").css("display", "none");
            $("#table_div8").css("display", "none");
            $("#table_div9").css("display", "none");
            $("#table_div10").css("display", "none");
            $("#table_div11").css("display", "none");
            $("#table_div_g").css("display", "none");
            $("#table_div_v").css("display", "none");
            $("#table_div3_v").css("display", "none");
            $("#table_div_g1").css("display", "none");
            $("#table_div3_g2").css("display", "none");
            $("#home").css("display", "none");
            $("#table_div1").fadeIn("slow");
            $("#table1").css("width", "100%");
            $("#table1").css("height", "100%");
            $("#scroll_l").css("display", "none");
            $("#scroll_r").css("display", "none");
            $("#det_dcu").css("display", "block");
            $("#det_consumers").css("display", "none");
            $("#det_user").css("display", "none");
            $("#det_met").css("display", "none");
            $("#det_cons").css("display", "none");
            $("#det_access").css("display", "none");
            $("#det_gas_gprs").css("display", "none");
            $("#det_struct").css("display", "none");
            $("#rightm_div").css("display", "none");
            $("#details_pan").css("left", "-5000px");
            $("#msg_box").css('display', 'none');
        } else {
            $("#msg_box").fadeIn(500);
        }
    })

    $("#logs_v").click(function () {
        GetUsers();
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#table_div_v").css("display", "none");
        $("#table_div3_v").css("display", "none");
        $("#table_div_g1").css("display", "none");
        $("#table_div3_g2").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div7").fadeIn("slow");
        $("#table7").css("width", "100%");
        $("#table7").css("height", "100%");
        cur_table = 7;
        $("#scroll_l").css("display", "block");
        $("#scroll_r").css("display", "block");
        $("#rightm_div").css("display", "none");
        $("#met_event_rd2").removeAttr("checked");
    })
    //end code axad
    //$("#btn_device").click(function () {
    //    $("#lm1").hide();
    //    $("#lm2").hide();
    //    $("#lm4").hide();
    //    $("#lm_v").hide();
    //    $("#lm3").fadeIn("slow");
    //    $(".splitter_panel .vsplitter").css("width", "0px");
    //    e_g_w_switch = "electr";
    //    table1.clear().draw();
	//	$('#jstree').jstree(true).settings.core.data = ["Loading..."];
    //    $('#jstree').jstree(true).refresh();
    //    $('#jstree').on('refresh.jstree', function () {
    //        $("#jstree").jstree("open_all");
    //    });
		
	//	$.when(ReLoadTree()).done(function(){
	//		$('#jstree').jstree(true).settings.core.data = tree_global_arr;
	//		$('#jstree').jstree(true).refresh();
	//		$('#jstree').on('refresh.jstree', function () {
    //        $("#jstree").jstree("open_all");
    //    });
	//	});
    //});
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
            "selector": "td:first-child"
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
    });

    $("#table1").on("click", "tr", function (event) {
        var pt = $(this).offset().top;
        $("#select_line_t1").css('top', pt - 83);
        $("#select_line_t1").css('display', 'block');
        //selected_gr_id = "";
        //selected_gr_gb = "";
        var current = table1.row(this).data();
        selected_dcu = current[3];
        $("#dcu_loader").css('display', 'block');
        $("#meter_loader").css('display', 'block');
        $("#consumer_loader").css('display', 'block');
        LoadDCUInfo(selected_dcu);
        
        // load meters
        //alert(selected_dt_m);
        //alert(selected_dt_c);
        //alert(selected_dt_c_end);

        if (selected_dt_m == null){
            var dt = new Date();
            var dt_m = dt.getMonth() + 1;
            var dt_d = dt.getDate();
            if (dt_d != 1 && dt_d != 2) {
                dt_d = dt_d - 2;
            }
            var dt_y = dt.getFullYear();
            var fdt_m = dt_m;
            if (dt_m < 10) {
                fdt_m = "0" + fdt_m;
            }
            var fdt_d = dt_d;
            if (dt_d < 10) {
                fdt_d = "0" + fdt_d;
            }
            $("#met_day_date").val(fdt_m + "/" + fdt_d + "/" + dt_y);
            selected_dt_m = dt_y + "" + fdt_m + "" + fdt_d;
        }

        if (selected_dt_c == null && selected_dt_c_end == null) {
            var dt = new Date();
            var dt_m = dt.getMonth() + 1;
            var dt_d = dt.getDate();
            if (dt_d != 1 && dt_d != 2) {
                dt_d = dt_d - 2;
            }
            var dt_y = dt.getFullYear();
            var fdt_m = dt_m;
            if (dt_m < 10) {
                fdt_m = "0" + fdt_m;
            }
            var fdt_d = dt_d;
            if (dt_d < 10) {
                fdt_d = "0" + fdt_d;
            }
            $("#cons_start_date_main").val(fdt_m + "/" + fdt_d + "/" + dt_y);
            $("#cons_end_date_main").val(fdt_m + "/" + fdt_d + "/" + dt_y);
            $("#t3_hdt").text(fdt_d + "." + fdt_m + "." + dt_y);
            $("#t3_hdt2").text(fdt_d + "." + fdt_m + "." + dt_y);
            selected_dt_c = dt_y + "" + fdt_m + "" + fdt_d;
            selected_dt_c_end = dt_y + "" + fdt_m + "" + fdt_d;
        }

        if (selected_dt_m_g == null) {
            var dt = new Date();
            var dt_m = dt.getMonth() + 1;
            var dt_d = dt.getDate();
            if (dt_d != 1 && dt_d != 2) {
                dt_d = dt_d - 2;
            }
            var dt_y = dt.getFullYear();
            var fdt_m = dt_m;
            if (dt_m < 10) {
                fdt_m = "0" + fdt_m;
            }
            var fdt_d = dt_d;
            if (dt_d < 10) {
                fdt_d = "0" + fdt_d;
            }
            $("#met_day_date_g").val(fdt_m + "/" + fdt_d + "/" + dt_y);
            selected_dt_m_g = dt_y + "" + fdt_m + "" + fdt_d;
        }
        if (selected_dt_m_g1 == null) {
            var dt = new Date();
            var dt_m = dt.getMonth() + 1;
            var dt_d = dt.getDate();
            if (dt_d != 1 && dt_d != 2) {
                dt_d = dt_d - 2;
            }
            var dt_y = dt.getFullYear();
            var fdt_m = dt_m;
            if (dt_m < 10) {
                fdt_m = "0" + fdt_m;
            }
            var fdt_d = dt_d;
            if (dt_d < 10) {
                fdt_d = "0" + fdt_d;
            }
            $("#met_day_date_g1").val(fdt_m + "/" + fdt_d + "/" + dt_y);
            selected_dt_m_g1 = dt_y + "" + fdt_m + "" + fdt_d;
        }
        if (selected_dt_v == null) {
            var dt = new Date();
            var dt_m = dt.getMonth() + 1;
            var dt_d = dt.getDate();
            if (dt_d != 1 && dt_d != 2) {
                dt_d = dt_d - 2;
            }
            var dt_y = dt.getFullYear();
            var fdt_m = dt_m;
            if (dt_m < 10) {
                fdt_m = "0" + fdt_m;
            }
            var fdt_d = dt_d;
            if (dt_d < 10) {
                fdt_d = "0" + fdt_d;
            }
            $("#met_day_date_v").val(fdt_m + "/" + fdt_d + "/" + dt_y);
            selected_dt_v = dt_y + "" + fdt_m + "" + fdt_d;
        }
        //GetMetersCount(selected_dcu, selected_dt_m);
        if (e_g_w_switch == "electr"){
        //if (active_dcu_btn == false) {
            active_dcu_btn = true;
            //
            arr_m_log = false;
            arr_m_rev_log = false;
            highlight_m = false;
            arr_m = [];
            arr_m_res = [];
            load_m_res = [];
            join_m_it = 0;
            //table2.clear().draw();
            join_m_it = setInterval(DeployMeterList, 1000);
            c_arr_m_log = false;
            c_arr_m_rev_log = false;
            c_arr_m = [];
            c_arr_m_res = [];
            c_load_m_res = [];
            c_join_m_it = 0;
            //table2.clear().draw();
            c_join_m_it = setInterval(DeployConsumerList, 1000);
        //}
        }
        if (e_g_w_switch == "gas") {
            //if (active_dcu_btn == false) {
            var current = table1.row(this).data();
            selected_dcu = current[3];
            $("#gas_g_dcu_id").val(selected_dcu);

            LoadGazMeters(selected_dcu, selected_dt_m_g);
            LoadGazStatusTB(selected_dcu, selected_dt_m_g1)
        }
        if (e_g_w_switch == "water") {
            //if (active_dcu_btn == false) {
            var current = table1.row(this).data();
            selected_dcu = current[4];

            LoadWaterMeters(selected_dcu, selected_dt_v);
            //LoadGazStatusTB(selected_dcu, selected_dt_m_g1)
        }
        //
    })

    $("#table1").on("mouseover", "tr", function (event) {
        $("#select_line_t1").css('display', 'none');
    })

    $("#dcu_loader").dblclick(function () {
        $("#drop_dcu_det").css('display', 'none');
        $("#rightm_div").css('display', 'none');
        $("#details_pan").css("left", "62px");
        $("#detail_pan_dcu").css("display", "block");
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_met").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '0');
        $(this).css('display', 'none');
    })

    //$("#select_line_t1").dblclick(function () {
    //    $("#rightm_div").css('display', 'none');
    //    $("#details_pan").css("left", "62px");
    //    $("#detail_pan_dcu").css("display", "block");
    //    $("#detail_pan_cons").css("display", "none");
    //    $("#detail_pan_met").css("display", "none");
    //    $("#detail_pan_tp").css("display", "none");
    //    $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    //    $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '0');
    //    $(this).css('display', 'none');
    //})

    $(function () {
        $("#dp_det_dcu_date1_end").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
        });
        $("#dp_det_dcu_date1_start").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
            onClose: function () {
                $("#dp_det_dcu_date1_end").datepicker("show");
            }
        });
        //
    });



    $("#dp_det_dcu_date1_start").change(function () {
        //var dt = $(this).val();
        //var s1 = dt.substring(0, 2);
        //var s2 = dt.substring(3, 5);
        //var s3 = dt.substring(6, 10);
        //dt = s3 + "" + s2 + "" + s1;
        //var text_date = s2 + "." + s1 + "." + s3;
        //$(this).val(text_date);
    })

    $("#dp_det_dcu_date1_end").change(function () {
        DateRangeDCUDet();
        // end date
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt_e = s3 + "" + s1 + "" + s2;
        // change fornart to dd.mm.yyy
        //var text_date = s2 + "." + s1 + "." + s3;
        //$(this).val(text_date);
        //
        // start date
        //var dt = $("#dp_det_dcu_date1_start").val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt_s = s3 + "" + s1 + "" + s2;
        // change fornart to dd.mm.yyy
        //var text_date = s2 + "." + s1 + "." + s3;
        //$("#dp_det_dcu_date1_start").val(text_date);
        //
        // testing daterange
        //alert(dt_s);
        //alert(dt_e);
        LoadDCUDetPie2(selected_dcu, dt_s, dt_e);
    })
    //$("#table1").on("dblclick", "tr", function (event) {
    //    $("#rightm_div").css('display', 'none');
    //    $("#details_pan").css("left", "62px");
    //    $("#detail_pan_dcu").css("display", "block");
    //    $("#detail_pan_cons").css("display", "none");
    //    $("#detail_pan_met").css("display", "none");
    //    $("#detail_pan_tp").css("display", "none");
    //    $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    //    $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '0');
    //})
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
          { "width": "2%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2 }, { "width": "2%", "targets": 3, "orderable": true },
          { "width": "6%", "targets": 4 }, { "width": "6%", "targets": 5 }, { "width": "5%", "targets": 6 }, { "width": "2%", "targets": 7 },
          { "width": "9%", "targets": 8 }, { "width": "9%", "targets": 9 }, { "width": "6%", "targets": 10 }, { "width": "4%", "targets": 11 }//,
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
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });

    $("#table2 tbody").on('dblclick', 'tr', function () {
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_met").css("display", "block"); // +
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_dcu").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        $("#search_met").css('z-index', '0');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        $("#t2_header_back").css('display', 'none');
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '1');
    });

    $(".right_div_show_btn").click(function () {
        $("#rightm_div").css('left', '47.5%');
        $("#rightm_div").css('width', '52%');
        $("#rightm_div").fadeIn(700);
    })
    $(".right_div_show_btn_g").click(function () {
        $("#rightm_div").css('left', '74.5%');
        $("#rightm_div").css('width', '25%');
        $("#rightm_div").fadeIn(700);
        $("#gas_drop_head").css("display", "none");
    })

    $(".right_div_show_btn2").click(function () {
        $("#rightm_div").css('left', '74.5%');
        $("#rightm_div").css('width', '25%');
        $("#rightm_div").fadeIn(700);
    })

    $("#table2").on('click', 'td', function () {
        var current = table2.row(this).data();
        $("#drop_met_det p:eq(16)").text(current[4]);
        $("#drop_met_det p:eq(17)").text(current[5]);
        $("#drop_met_det p:eq(18)").text(current[6]);
        $("#drop_met_det p:eq(19)").text("-");
        $("#drop_met_det p:eq(20)").text(current[8]);
        $("#drop_met_det p:eq(21)").text("-");
        $("#drop_met_det p:eq(22)").text("-");
        $("#drop_met_det p:eq(23)").text(current[9]);
        $("#drop_met_det p:eq(24)").text("-");
        $("#drop_met_det p:eq(25)").text("-");

        var selected_meter = current[6];
        selected_tp = current[4];
        //alert(selected_meter);
        LoadMeterInfo(selected_meter);
    })
    //
    $("#table2 thead").on('click', 'input', function () {
        var i = 0;
        var current;
        //var dt = selected_dt_m;
        //var s1 = dt.substring(0, 4);
        //var s2 = dt.substring(4, 6);
        //var s3 = dt.substring(6, 8);
        //dt = s3 + "" + s2 + "" + s1;
        if ($("#table2 thead input").prop('checked') == true) {
            $("#table2 tbody input").prop('checked', true);
            for (i = 0; i < table2.rows().count() ; i++) {
                current = table2.row(i).data();
                var obj = {};
                obj.operator_id = operator_id;
                obj.operation_id = "";
                obj.meter_id = current[6];
                obj.dcu_id = current[5];
                obj.dt = "";
                obj.target = "";
                obj.task = "";
                task_arr[i] = obj;
            }
        } else {
            $("#table2 tbody input").prop('checked', false);
            task_arr = [];
        }
        //alert(task_arr);
    });
    ///
    $("#table2").on('click', '.met_on_on', function () {
        var index = $(this).parent("td").parent("tr").index();
        var current = table2.row(index).data();
        task_arr = [];

        var rnd, rnd2, rnd3, rnd4, rnd5, rnd6, i;
        rnd = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd2 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd4 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd5 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd6 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        var operation_id = rnd + '' + rnd2 + '' + rnd3 + '' + rnd4 + '' + rnd5 + '' + rnd6;

        var dtt = selected_dt_m;
        var s1 = dtt.substring(0, 4);
        var s2 = dtt.substring(4, 6);
        var s3 = dtt.substring(6, 8);
        dtt = s3 + "" + s2 + "" + s1;

        var obj = {};
        obj.operator_id = operator_id;
        obj.operation_id = operation_id;
        obj.meter_id = current[6];
        obj.dcu_id = current[5];
        obj.dt = dtt;
        obj.target = "off";
        obj.task = "";
        task_arr[index] = obj;

        task_arr = task_arr.filter(function (n) {
            return n != undefined
        });

        var dtm = new Date();
        var time = dtm.toString();
        var tm = time.substring(16, 21);
        table_disp.row.add([
                task_arr[0].operator_id,
                task_arr[0].operation_id,
                "Выключение счетчиков",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
        ]).draw();

        $(this).css('background', 'url("/Content/files/loading.gif")');
        $(this).css('background-size', 'cover');
        $(this).css('width', '20px');
        $(this).css('height', '20px');

        SendTaskRequest(task_arr);

        //alert(index + " on");
    });

    $("#table2").on('click', '.met_on_off', function () {
        var index = $(this).parent("td").parent("tr").index();
        var current = table2.row(index).data();
        //alert(index + " off");
        task_arr = [];

        var rnd, rnd2, rnd3, rnd4, rnd5, rnd6, i;
        rnd = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd2 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd4 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd5 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd6 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        var operation_id = rnd + '' + rnd2 + '' + rnd3 + '' + rnd4 + '' + rnd5 + '' + rnd6;

        var dtt = selected_dt_m;
        var s1 = dtt.substring(0, 4);
        var s2 = dtt.substring(4, 6);
        var s3 = dtt.substring(6, 8);
        dtt = s3 + "" + s2 + "" + s1;

        ////var text_date = s2 + "." + s1 + "." + s3;

        var obj = {};
        obj.operator_id = operator_id;
        obj.operation_id = operation_id;
        obj.meter_id = current[6];
        obj.dcu_id = current[5];
        obj.dt = dtt;
        obj.target = "on";
        obj.task = "";
        task_arr[index] = obj;

        task_arr = task_arr.filter(function (n) {
            return n != undefined
        });

        var dtm = new Date();
        var time = dtm.toString();
        var tm = time.substring(16, 21);
        table_disp.row.add([
                task_arr[0].operator_id,
                task_arr[0].operation_id,
                "Включение счетчиков",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
        ]).draw();

        //$(this).removeClass("met_on_off");
        //$(this).addClass("process");
        $(this).css('background', 'url("/Content/files/loading.gif")');
        $(this).css('background-size', 'cover');
        $(this).css('width', '20px');
        $(this).css('height', '20px');

        SendTaskRequest(task_arr);
        
    })
    ///
    $("#table2").on('click', 'input', function () {
        var i = 0;
        var index = $(this).val();
        var current = table2.row(index).data();

        //var dt = selected_dt_m;
        //var s1 = dt.substring(0, 4);
        //var s2 = dt.substring(4, 6);
        //var s3 = dt.substring(6, 8);
        //dt = s3 + "" + s2 + "" + s1;
        //var text_date = s2 + "." + s1 + "." + s3;

        if ($(this).prop("checked") == true) {
            //alert("checkbox checked");
            var obj = {};
            obj.operator_id = operator_id
            obj.operation_id = "";
            obj.meter_id = current[6];
            obj.dcu_id = current[5];
            obj.dt = "";
            obj.target = "";
            obj.task = "";
            task_arr[index] = obj;
            //alert(task_arr);
        };

        if ($(this).prop("checked") == false) {
            task_arr[index] = null;
            //alert("checkbox unchecked");
            //alert(task_arr);
        }
    });
    $("#syncronyze").click(function () {
        
        var i = 0;
        for(i=0; i<load_consumers.length; i++)
        {
            if(list_n[0].id==load_consumers[i].id)
            {
                var date = new Date();
                var s1 = date.getDate();
                var s2 = date.getMonth() + 1;
                var s3 = date.getFullYear();
                var dcu_id;
                var consumer;
                var place;
                var phone;
                var account;
                var registered_date;
                var meter_type;
                var saved;
                var registered;
                var parent_id;
                var meter_id;
                var processing;
                meter_id = $("#meter_drop_list option:selected").text();
                dcu_id = load_consumers[i].dcu_id;
                consumer = load_consumers[i].consumer;
                place = load_consumers[i].address;
                phone = load_consumers[i].phone;
                account = load_consumers[i].pers_account;
                registered_date = s1 + "." + s2 + "." + s3;
                meter_type = "electric"
                saved = "yes";
                registered = "yes";
                processing = "0";
                parent_id = load_consumers[i].id;
                $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "/Meter/AddConsumer",
                        data: '{dcu_id:"' + dcu_id + '", name:"' + consumer + '", reg_place:"' + place + '", phone_n:"' + phone + '", pers_acc:"' + account + '", reg_dt:"'+ registered_date +'", meter_type:"' + meter_type + '", saved:"' + saved + '", registered:"' + registered + '", processing:"'+ processing +'", parent_id:"' + parent_id + '", meter_id:"' + meter_id + '"}',
                        success: function (result) {
                            $("#user_sync").val("");
                                    $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "json",
                                            url: "/Meter/DeleteUndefinedMeter",
                                            data: '{meter_id:"' + meter_id + '"}',
                                            success: function (result) {
                                                ListUndefinedMeters();
                                                }
                                    })
                            }
                })
                GetConsumer(tp_name);        
                list_n = [];
            }
        }
    })
    $("#table10").on('click', 'input', function () {
        var index = $(this).val();
        var current = table10.row(index).data();
        //alert(index);
        if ($(this).prop("checked") == true) {
            //alert("checkbox checked");
            var obj = {};
            obj.name = current[3];
            obj.place = current[4];
            obj.id=current[2];
            list_n[0] = obj;
            $("#user_sync").val(current[3]);
            
        };

        if ($(this).prop("checked") == false) {
            list_n[0] = null;
            $("#user_sync").val("");
        }
    });
    $("#table10").on('click', 'td', function () {
        table91.clear().draw();
        table92.clear().draw();
        table93.clear().draw();
        var current = table10.row(this).data();
        var id = current[2];
        account_id = id;
        //$("#name_c").val(name);
        //$("#installed_p").val(place);
        //$("#operator_code").val(operator_code);
        //$("#phone_number").val(number);
        //$("#pers_account").val(acc_nm);
        GetMeter(account_id);
        var interval;
        //interval=setInterval(DisplayMeter, 20000);
    });
    $("#table11 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table11.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $("#table11").on('click', 'td', function () {

        var current = table11.row(this).data();
        var parent_id = current[4];
        var parent_name = "";
        var group_id = current[1];
        var group_nm = current[2];
        var i = 0;
        for (i = 0; i < tree_global_arr.length; i++) {
            if (parent_id == tree_global_arr[i].gr_id) {
                parent_name = tree_global_arr[i].text;
            }
        }
        $("#tree_parent_id").val(parent_id);
        $("#tree_parent_name").val(parent_name);
        $("#tree_group_id").val(group_id);
        $("#tree_group_name").val(group_nm);
    });

    function DisplayMeter()
    {
        table91.clear().draw();
        table92.clear().draw();
        table93.clear().draw();
        GetMeter(account_id);
    }

    function GetMeter(id)
    {

        var i = 0;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/Meter/GetConsumers",
            data: '{parent_id:"' + id + '"}',
            success: function(result)
            {
                load_meters = result;
                
                for(var i=0; i<load_meters.length; i++)
                {
                    if(load_meters[i].meter_type=="electric")
                    {
                        if (load_meters[i].registered == "yes") {
                            table91.row.add([
                                table91.rows().count() + 1,
                                "<div class='ready_disp'></div>",
                                load_meters[i].meter_id,
                                load_meters[i].reg_dt,
                            ]).draw();
                        }
                        if (load_meters[i].registered == "no") {
                            table91.row.add([
                                table91.rows().count() + 1,
                                "<div class='process'></div>",
                                "<div class='text_red'>----</div>",
                                "<div class='text_red'>----</div>",
                            ]).draw();
                        }
                    }
                    
                    if (load_meters[i].meter_type == "gas")
                    {
                        if (load_meters[i].registered == "yes") {
                            table92.row.add([
                                table92.rows().count() + 1,
                                "<div class='ready_disp'></div>",
                                load_meters[i].meter_id,
                                load_meters[i].reg_dt,
                            ]).draw();
                        }
                        if (load_meters[i].registered == "no") {
                            table92.row.add([
                                table92.rows().count() + 1,
                                "<div class='process'></div>",
                                "<div class='text_red'>----</div>",
                                "<div class='text_red'>----</div>",
                            ]).draw();
                        }
                    }

                    if (load_meters[i].meter_type == "water")
                    {
                        if (load_meters[i].registered == "yes") {
                            table93.row.add([
                                table93.rows().count() + 1,
                                "<div class='ready_disp'></div>",
                                load_meters[i].meter_id,
                                load_meters[i].reg_dt,
                            ]).draw();
                        }
                        if (load_meters[i].registered == "no") {
                            table93.row.add([
                                table93.rows().count() + 1,
                                "<div class='process'></div>",
                                "<div class='text_red'>----</div>",
                                "<div class='text_red'>----</div>",
                            ]).draw();
                        }
                    }
                }
            }
        })
    }

    //$("#create_list").click(function () {
    //    var i = 0;
    //    var k = 0;
    //    var date = new Date();
    //    var s1 = date.getSeconds();
    //    var s2 = date.getMinutes();
    //    var s3 = date.getHours();
    //    var s4 = date.getDate();
    //    var s5 = date.getMonth() + 1;
    //    var s6 = date.getFullYear();
    //    var unique_id = s1 + "-" + s2 + "-" + s3 + "-" + s4 + "-" + s5 + "-" + s6;
    //    //$("#drop_abonent select").empty();
    //    for (i = 0; i < load_consumers.length; i++) {
    //        if (list_n[i]!=null)
    //        {
    //            for(k=0; k<load_consumers.length; k++)
    //            {
    //                if(list_n[i].id==load_consumers[k].id)
    //                {
    //                    var dcu_id;
    //                    var consumer;
    //                    var place;
    //                    var phone;
    //                    var account;
    //                    var insp_nm;
    //                    var meter_type;
    //                    var saved;
    //                    var registered;
    //                    var parent_id;
    //                    dcu_id = load_consumers[k].dcu_id;
    //                    consumer = load_consumers[k].consumer;
    //                    place = load_consumers[k].address;
    //                    phone = load_consumers[k].phone;
    //                    account = load_consumers[k].pers_account;
    //                    meter_type = $("#meter_type option:selected").val();
    //                    saved = "no";
    //                    registered = "no";
    //                    insp_nm = $("#inspector_c_1 option:selected").text();
    //                    parent_id=load_consumers[k].id;
    //                        $.ajax({
    //                                    type: "POST",
    //                                    contentType: "application/json; charset=utf-8",
    //                                    dataType: "json",
    //                                    url: "/Meter/AddConsumer",
    //                                    data: '{dcu_id:"' + dcu_id + '", name:"' + consumer + '", reg_place:"' + place + '", phone_n:"' + phone + '", pers_acc:"' + account + '", insp_nm:"' + insp_nm + '", meter_type:"' + meter_type + '", saved:"' + saved + '", registered:"' + registered + '", parent_id:"' + parent_id + '", unique_id:"' + unique_id + '"}',
    //                                    success: function (result) {
    //                                        alert("наряд создан!!!");
    //                                    }
    //                                })
    //                }
    //            }
    //        }
    //    }
    //    GetConsumer(tp_name);        
    //    list_n = [];
    //});

    $("#test_dt").click(function () {
        //AddUser();
        //UsersList();
        //alert("Ok");
        //GetReportOne();
        //BadTableBalance();
        //BadTableGetMetPeriod();
        //MeterDetailsChart();
        //TestFunc(dcu_arr, dcu_tp_arr, selected_dt_hp);
        //$("#ht_loader").css('display', 'none');
        //$(this).text("Test");
        //alert("Test");
        //var sdate = "20180205";
        //var edate = "20180205";
        ////var op = "operator";
        ////var dt = "14.03.2018";
        ////var opn = "in";

        //table7.clear().draw();
        //var opn = "";
        //switch ($("#drop_p_7_2").text()) {
        //    case "Вход в систему":
        //        opn = "in";
        //        break;
        //    case "Считывание с памяти концентратора":
        //        opn = "history";
        //        break;
        //    case "Считывание с счетчика":
        //        opn = "current";
        //        break;
        //    case "Включение счетчика":
        //        opn = "on";
        //        break;
        //    case "Выключение счетчика":
        //        opn = "off";
        //        break;
        //    default:
        //        "";
        //}
        //var op = $("#drop_p_7_1").text();
        //var dt = $("#event_day_date").val();
        //alert(opn);
        //alert(op);
        //alert(dt);


        //SearchLogs(op, dt, opn);


        //alert(tree_global_arr[0].id);
        //alert(tree_global_arr[0].gb);

        //$("#dispatcher").css('background', 'url("/Content/files/dispatcher_ready.png")');
        //$("#dispatcher").css('background', 'url("/Content/files/dispatcher1.png")');
        //EnergySumbyDCU(tree_global_arr[0].gb, tree_global_arr[0].id, sdate, edate);
        //interval = setInterval(InitHomeTable2, 600);
        //interval2 = setInterval(InitHomeTable1, 1500);
        //SignalChartHT();

        //BalanceHTPie();

        //GetHomeTabDCUsData(sdate, edate);
        //alert();
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "static");
    });

    $("#search_met").keyup(function () {
        var search = $(this).val();
        if (search == "") {
            table2.clear().draw();
        }
    });

    $("#search_met").click(function () {
        $(".dataTables_filter input").val("");
        $("#mhint2").fadeIn(350);
        $("#mhint1").css('display', 'none');
        setTimeout('$("#mhint2").fadeOut(350)', 5000);
    })


    $(".dataTables_filter input").click(function () {
        $("#search_met").val("");
        $("#mhint1").fadeIn(350);
        $("#mhint2").css('display', 'none');
        setTimeout('$("#mhint1").fadeOut(350)', 5000);
    })

    $(".dataTables_filter input").click(function () {
        $("#search_met_g").val("");
        $("#mhint1_g").fadeIn(350);
        $("#mhint2_g").css('display', 'none');
        setTimeout('$("#mhint1_g").fadeOut(350)', 5000);
    })

    $("#search_met").keypress(function (e) {
        var search = $(this).val();
        if (search == ""){
            table2.clear().draw();
        }
        if (e.which == 13) {
            if (selected_gr_id != null && selected_gr_id != "" && selected_gr_gb != null && selected_dt_m != null && selected_dt_m != "") {
                //alert("Ok");
                highlight_m = false;
                GlobalSearchMeters(search, selected_gr_id, selected_gr_gb, selected_dt_m);
            } else {
                alert("Выберите в дереве объектов группу в пределах которой необходимо осуществить поиск!");
            }
        }
    });

    $("#datatable2").scroll(function (event) {
        //load_m_res = arr_m.concat(arr_m_res);
        var s = $(this).scrollTop();
        //$("#test_dt").text(cur_m_step + " | " + Math.round(s));
        var h = $("#table2").height();
        //if ((s + 612) > h) {
        var z = 0;
        var temp_s;
        var log1 = false;
        var log2 = false;
        var log3 = false;
        var log4 = false;
        if ((table2.rows().count() == load_m_res.length) && (highlight_m == false)) {
            while (z < table2.rows().count()) {
                temp_s = table2.row(z).data();
                //alert(temp_s[11] + "   " + temp_s[2]);
                if (temp_s[11] == "<div class='text_yellow'>---</div>") {
                    log1 = true;
                }
                //if (temp_s[2] == "<div class='ab_met_stat_off' style='height: 15px; width: 15px;'>1</div>") {
                //    log2 = true;
                //}
                //if (temp_s[2] == "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>0</div>") {
                //    log3 = true;
                //}
                //alert(log1 + "   " + log2 + "   " + log3);
                //if (log1 == true && log2 == true){
                //    $("#table2 tr:eq(" + (z + 1) + ")").css('background', 'url("/Content/files/stripe1.png")');
                //}
                //if (log1 == true && log3 == true) {
                //    $("#table2 tr:eq(" + (z + 1) + ")").css('background', 'url("/Content/files/stripe1.png")');
                //}
                if (log1 == true){
                    $("#table2 tr:eq(" + (z + 1) + ")").css('background', 'url("/Content/files/stripe1_1.png")');
                }

                z++;
                log1 = false;
                log2 = false;
                log3 = false;
            }
            //for (z = 0; z < table2.rows().count() ; z++) {
            //    temp_s = table2.row(z).data();
            //    $("#test_p_m").text("");
            //    $("#test_p_m").text(highlight_m + "   " + temp_s[11] + "   " + temp_s[2]);
            //    if ((temp_s[11] == "<div class='text_yellow'>---</div>" && temp_s[2] == "<div class='ab_met_stat_off' style='height: 15px; width: 15px;'>1</div>") || (temp_s[11] == "<div class='text_yellow'>---</div>" && temp_s[2] == "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>0</div>")) {
            //        $("#table2 tr:eq(" + (z + 1) + ")").css('background', 'url("/Content/files/stripe_pink2.png")');
            //    }

            //}
            highlight_m = true;
        }
        //};
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
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
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}
                if (load_m_res[i].dcu_id.length > 5)
                {
                    if (load_m_res[i].status == 3) {
                        on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                        stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + load_m_res[i].status + "</div>"
                    }
                    if (load_m_res[i].status == 2) {
                        stat = "<div class='ab_met_stat_err' style='height: 15px; width: 15px;'>" + load_m_res[i].status + "</div>"
                    }
                    if (load_m_res[i].status == 1) {
                        on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                        stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + load_m_res[i].status + "</div>"
                    }
                    if (load_m_res[i].status == 0) {
                        on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                        stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + load_m_res[i].status + "</div>"
                    }
                    if (load_m_res[i].pat == 'null') {
                        rm2 = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].pat == 0) {

                        rm2 = "<div class='text_red'>0.00</div>";
                    } else {

                        rm2 = "<div class='text_green'>" + load_m_res[i].pat + "</div>";
                    };
                    if (load_m_res[i].pat1 == 'null') {
                        pat1 = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].pat1 == 0) {
                        pat1 = "<div class='text_red'>0.00</div>";
                    }
                    else {
                        pat1 = "<div class='text_green'>" + load_m_res[i].pat1 + "</div>";
                    }
                    if (load_m_res[i].pat2 == 'null') {
                        pat2 = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].pat2 == 0) {
                        pat2 = "<div class='text_red'>0.00</div>";
                    }
                    else {
                        pat2 = "<div class='text_green'>" + load_m_res[i].pat2 + "</div>";
                    }
                    if (load_m_res[i].pat3 == 'null') {
                        pat3 = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].pat3 == 0) {
                        pat3 = "<div class='text_red'>0.00</div>";
                    }
                    else {
                        pat3 = "<div class='text_green'>" + load_m_res[i].pat3 + "</div>";
                    }
                    if (load_m_res[i].pat4 == 'null') {
                        pat4 = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].pat4 == 0) {
                        pat4 = "<div class='text_red'>0.00</div>";
                    }
                    else {
                        pat4 = "<div class='text_green'>" + load_m_res[i].pat4 + "</div>";
                    }
                    if (load_m_res[i].nat == 'null') {
                        nat = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].nat == 0) {
                        nat = "<div class='text_red'>0.00</div>";
                    }
                    else {
                        nat = "<div class='text_green'>" + load_m_res[i].nat + "</div>";
                    }
                    if (load_m_res[i].nat1 == 'null') {
                        nat1 = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].nat1 == 0) {
                        nat1 = "<div class='text_red'>0.00</div>";
                    }
                    else {
                        nat1 = "<div class='text_green'>" + load_m_res[i].nat1 + "</div>";
                    }
                    if (load_m_res[i].nat2 == 'null') {
                        nat2 = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].nat2 == 0) {
                        nat2 = "<div class='text_red'>0.00</div>";
                    }
                    else {
                        nat2 = "<div class='text_green'>" + load_m_res[i].nat2 + "</div>";
                    }
                    if (load_m_res[i].nat3 == 'null') {
                        nat3 = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].nat3 == 0) {
                        nat3 = "<div class='text_red'>0.00</div>";
                    }
                    else {
                        nat3 = "<div class='text_green'>" + load_m_res[i].nat3 + "</div>";
                    }
                    if (load_m_res[i].nat4 == 'null') {
                        nat4 = "<div class='text_red'>0.00</div>";
                    }
                    if (load_m_res[i].nat4 == 0) {
                        nat4 = "<div class='text_red'>0.00</div>";
                    }
                    else {
                        nat4 = "<div class='text_green'>" + load_m_res[i].nat4 + "</div>";
                    }
                    table2.row.add([
                    table2.rows().count() + 1,
                    "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox' value='" + table2.rows().count() + "'>",
                    stat,
                    on_off,
                    load_m_res[i].group_nm,
                    load_m_res[i].dcu_id,
                    load_m_res[i].meter_id,
                    load_m_res[i].point_no,
                    load_m_res[i].meter_nm,
                    load_m_res[i].install_place,
                    $("#met_day_date").val(),
                    "<div class='text_yellow'>" + load_m_res[i].apm + "</div>",
                    rm2,
                    pat1,
                    pat2,
                    pat3,
                    pat4,
                    nat,
                    nat1,
                    nat2,
                    nat3,
                    nat4,
                    "0000000",
                    "---"
                    ]).draw();
                    i++;
                }
            };
            cur_m_step++;
        };
        //};
    });

    $(function () {
        // 24 hours //
        $("#met_day_date").datepicker({
            numberOfMonths: 3, 
            maxDate: 0,
        });
    });

    //$("#met_day_date").click(function () {
    //    $(this).val("");
    //})

    $("#met_day_date").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s1 + "" + s2;
        selected_dt_m = dt;
        // change fornart to dd.mm.yyy
        //$(this).val(s2 + "." + s1 + "." + s3);
        //alert(selected_dt_m);
        //
        arr_m_log = false;
        arr_m_rev_log = false;
        highlight_m = false;
        arr_m = [];
        arr_m_res = [];
        load_m_res = [];
        join_m_it_cnd = 0;

        if ($("#search_met").val() != "") {
            if (table2.rows().count() > 0) {
                var search = $("#search_met").val();
                GlobalSearchMeters(search, selected_gr_id, selected_gr_gb, selected_dt_m);
            }
        } else {
            if (selected_dcu != null && selected_dcu != "") {
                $("#meter_loader").fadeIn(150);
                join_m_it_cnd = setInterval(DeployMeterList, 1000);
            } else {
                alert("Выберите концентратор из дерева объектов или из списка концентраторов!");
            }
        }
        
        //table2.clear().draw();
        //if (selected_dcu != null && selected_dcu != "") {
        //    $("#meter_loader").fadeIn(150);
        //    join_m_it_cnd = setInterval(DeployMeterList, 1000);
        //} else {
        //    if (table2.rows().count() > 0) {
        //        var search = $("#search_met").val();
        //        GlobalSearchMeters(search, selected_gr_id, selected_gr_gb, selected_dt_m);
        //    } else {
        //        alert("Выберите концентратор из дерева объектов или из списка концентраторов!");
        //    }
        //}
    });
    $("#met_day_date").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s1 + "" + s2;
        selected_dt_m_g = dt;
        // change fornart to dd.mm.yyy
        //$(this).val(s2 + "." + s1 + "." + s3);
        //alert(selected_dt_m);
        //

        if ($("#search_met_g").val() != "") {
            if (table2_g.rows().count() > 0) {
                var search = $("#search_met_g").val();
                GlobalSearchMeters(search, selected_gr_id, selected_gr_gb, selected_dt_m_g);
            }
        } else {
            if (selected_dcu != null && selected_dcu != "") {
                $("#meter_loader_g").fadeIn(150);
                LoadGazMeters(selected_dcu, selected_dt_m_g);
            } else {
                alert("Выберите концентратор из дерева объектов или из списка концентраторов!");
            }
        }

        //table2.clear().draw();
        //if (selected_dcu != null && selected_dcu != "") {
        //    $("#meter_loader").fadeIn(150);
        //    join_m_it_cnd = setInterval(DeployMeterList, 1000);
        //} else {
        //    if (table2.rows().count() > 0) {
        //        var search = $("#search_met").val();
        //        GlobalSearchMeters(search, selected_gr_id, selected_gr_gb, selected_dt_m);
        //    } else {
        //        alert("Выберите концентратор из дерева объектов или из списка концентраторов!");
        //    }
        //}
    });
    ///////////////////////////////////////////////////////////    

    ///////////////////////// Create and initialize table2_g (Gaz Meters) //////////////////////////////
    table_g_drop = $("#table2_g_drop").DataTable({
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
          { "width": "1%", "targets": 0 }, { "width": "4%", "targets": 1 }, { "width": "4%", "targets": 2 }
        ]
    });

    table2_g = $("#table2_g").DataTable({
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
          { "width": "2%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2 }, { "width": "2%", "targets": 3, "orderable": true },
          { "width": "9%", "targets": 4 }, { "width": "6%", "targets": 5 }, { "width": "5%", "targets": 6 }, { "width": "9%", "targets": 7 },
          { "width": "9%", "targets": 8 }, { "width": "4%", "targets": 9 }, { "width": "4%", "targets": 10 }//, { "width": "8%", "targets": 11 }
          //{ "width": "50%", "targets": 12 }, //{ "width": "6%", "targets": 13 }, { "width": "6%", "targets": 14 }, { "width": "6%", "targets": 15 },
        //  { "width": "6%", "targets": 16 }, { "width": "6%", "targets": 17 }
        ]
    });
    // Select row

    $("#table2_g tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table2_g.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });

    // all meters
    $("#circle_all_g").click(function () {
        var s1 = $("#circle_all_g p").text();
        if ((s1 != "") && (s1 != "0")) {
            $("#meter_loader_g").fadeIn(150);
            LoadGazMeters(selected_dcu, selected_dt_m_g);
        }
    });

    $("#circle_all_g p").mouseover(function () {
        $("#msg_box2_g").css('top', '5%');
        $("#msg_box2_g").css('left', '61%');
        $("#msg_box2_g").fadeIn(200);
        $("#msg_box2_g p").text("Отобразить все счетчики");
    })

    $("#circle_all_g").mouseout(function () {
        $("#msg_box2_g").fadeOut(200);
    })
    // On meters
    $("#circle_on_g").click(function () {
        var s1 = $("#circle_on_g p").text();
        if ((s1 != "") && (s1 != "0")) {
            $("#meter_loader_g").fadeIn(150);
            LoadGazMetersOn(selected_dcu, selected_dt_m_g);
        }
    });

    $("#circle_on_g p").mouseover(function () {
        $("#msg_box2_g").css('top', '5%');
        $("#msg_box2_g").css('left', '64%');
        $("#msg_box2_g").fadeIn(200);
        $("#msg_box2_g p").text("Отобразить включенные счетчики");
    })

    $("#circle_on_g").mouseout(function () {
        $("#msg_box2_g").fadeOut(200);
    })
    // Off meters
    $("#circle_off_g").click(function () {
        var s1 = $("#circle_off_g p").text();
        if ((s1 != "") && (s1 != "0")) {
            $("#meter_loader_g").fadeIn(150);
            LoadGazMetersOff(selected_dcu, selected_dt_m_g);
        }
    });

    $("#circle_off_g p").mouseover(function () {
        $("#msg_box2_g").css('top', '5%');
        $("#msg_box2_g").css('left', '66.5%');
        $("#msg_box2_g").fadeIn(200);
        $("#msg_box2_g p").text("Отобразить выключенные счетчики");
    })

    $("#circle_off_g").mouseout(function () {
        $("#msg_box2_g").fadeOut(200);
    })
    // Not read meters
    $("#circle_nr_g").click(function () {
        var s1 = $("#circle_nr_g p").text();
        if ((s1 != "") && (s1 != "0")) {
            $("#meter_loader_g").fadeIn(150);
            LoadGazMetersNR(selected_dcu, selected_dt_m_g);
        }
    });

    $("#circle_nr_g p").mouseover(function () {
        $("#msg_box2_g").css('top', '5%');
        $("#msg_box2_g").css('left', '68.8%');
        $("#msg_box2_g").fadeIn(200);
        $("#msg_box2_g p").text("Отобразить не опрошенные счетчики");
    })

    $("#circle_nr_g").mouseout(function () {
        $("#msg_box2_g").fadeOut(200);
    })
    
    $("#table2_g thead").on('click', 'input', function () {
        var i = 0;
        var current;
        //var dt = selected_dt_m;
        //var s1 = dt.substring(0, 4);
        //var s2 = dt.substring(4, 6);
        //var s3 = dt.substring(6, 8);
        //dt = s3 + "" + s2 + "" + s1;
        if ($("#table2_g thead input").prop('checked') == true) {
            $("#table2_g tbody input").prop('checked', true);
            for (i = 0; i < table2_g.rows().count() ; i++) {
                current = table2_g.row(i).data();
                var obj = {};
                obj.operator_id = operator_id;
                obj.operation_id = "";
                obj.meter_id = current[6];
                obj.dcu_id = current[5];
                obj.dt = "";
                obj.target = "";
                obj.task = "";
                task_arr_g[i] = obj;
            }
        } else {
            $("#table2_g tbody input").prop('checked', false);
            task_arr_g = [];
        }
        //alert(task_arr);
    });

    $("#table2_g").on('click', 'td', function () {
        var current = table2_g.row(this).data();
        $("#gas_g_id").val(current[6]);
        $("#gas_g_dcu_id").val(current[5]);
        $("#gas_g_consumer").val(current[7]);
        $("#gas_g_address").val(current[8]);
        $("#gas_g_type").val("---");
    })



    $("#table2_g").on('click', 'input', function () {
        var i = 0;
        var index = $(this).parent("td").parent("tr").index();
        var current = table2_g.row(index).data();
        
        //var dt = selected_dt_m;
        //var s1 = dt.substring(0, 4);
        //var s2 = dt.substring(4, 6);
        //var s3 = dt.substring(6, 8);
        //dt = s3 + "" + s2 + "" + s1;
        //var text_date = s2 + "." + s1 + "." + s3;
        
        if ($(this).prop("checked") == true) {
            //alert("checkbox checked");
            var obj = {};
            obj.operator_id = operator_id
            obj.operation_id = "";
            obj.meter_id = current[6];
            obj.dcu_id = current[5];
            obj.dt = "";
            obj.target = "";
            obj.task = "";
            task_arr_g[index] = obj;
            //alert(task_arr);
        };

        if ($(this).prop("checked") == false) {
            task_arr_g[index] = null;
            //alert("checkbox unchecked");
            //alert(task_arr);
        }
    });

    $("#dropdown2_1_g p").click(function () {
        $("#dropdown2_1_g").slideUp(400);
        var rnd, rnd2, rnd3, rnd4, rnd5, rnd6, i;
        rnd = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd2 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd4 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd5 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd6 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        var operation_id = rnd + '' + rnd2 + '' + rnd3 + '' + rnd4 + '' + rnd5 + '' + rnd6;

        var dtt = selected_dt_m_g;
        var s1 = dtt.substring(0, 4);
        var s2 = dtt.substring(4, 6);
        var s3 = dtt.substring(6, 8);
        dtt = s3 + "" + s2 + "" + s1;

        //alert(task_arr);
        task_arr_g = task_arr_g.filter(function (n) {
            return n != undefined
        });
        //alert(task_arr);

        var dtm = new Date();
        var time = dtm.toString();
        var tm = time.substring(16, 21);
        //Sat Feb 24 2018 12:42:24 GMT+0500 (West Asia Standard Time)
        $("#table2_g input:checkbox").prop('checked', false);
        if ($(this).text() == "Показания с счетчика") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr_g.length; i++) {
                task_arr_g[i].operation_id = operation_id;
                task_arr_g[i].target = "current";
                task_arr_g[i].dt = dtt;
            }

            table_disp.row.add([
                task_arr_g[0].operator_id,
                task_arr_g[0].operation_id,
                "Чтение с счетчика газа",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest_g(task_arr_g);
            //$("#met_day_date").prop("disabled", true);
        }
        //
        if ($(this).text() == "Включить выбранные счетчики") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr_g.length; i++) {
                task_arr_g[i].operation_id = operation_id;
                task_arr_g[i].target = "on";
                task_arr_g[i].dt = dtt;
            }
            table_disp.row.add([
                task_arr_g[0].operator_id,
                task_arr_g[0].operation_id,
                "Включение счетчиков газа",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest_g(task_arr_g);
            //$("#met_day_date").prop("disabled", true);
        }
        //
        if ($(this).text() == "Выключить выбранные счетчики") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr_g.length; i++) {
                task_arr_g[i].operation_id = operation_id;
                task_arr_g[i].target = "off";
                task_arr_g[i].dt = dtt;
            }
            table_disp.row.add([
                task_arr_g[0].operator_id,
                task_arr_g[0].operation_id,
                "Выключение счетчиков газа",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest_g(task_arr_g);
            //$("#met_day_date").prop("disabled", true);
        }

        if ($(this).text() == "Журнал событий") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr_g.length; i++) {
                task_arr_g[i].operation_id = operation_id;
                task_arr_g[i].target = "event";
                task_arr_g[i].dt = dtt;
            }
            table_disp.row.add([
                task_arr_g[0].operator_id,
                task_arr_g[0].operation_id,
                "Журнал событий",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest_g(task_arr_g);
            //$("#met_day_date").prop("disabled", true);
        }

        //
        task_arr_g = [];
    })
    ////////////////////////////////////////////////////////////

    ///////////////////////// Create and initialize table3 (Consumer) ///////////////////////////////////
    var h = $("#table_div3").height();
    var i = (h / 38);
    var z = i.toFixed(0) - 1;
    //alert(z);
    table3 = $("#table3").DataTable({
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
          { "width": "2%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2, "orderable": true }, { "width": "1%", "targets": 3, "orderable": false  },
          { "width": "15%", "targets": 4 }, { "width": "10%", "targets": 5 }, { "width": "20%", "targets": 6 }, { "width": "20%", "targets": 7 },
          { "width": "10%", "targets": 8 }, { "width": "6%", "targets": 9 }, { "width": "10%", "targets": 9 }
        ]
    });
    // Select row
    $("#table3 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected'); //trtrtr
            var current = table3.row(this).data();
            var pat = current[9];
            var a = pat.indexOf(">");
            var s1 = pat.substr(a+1, pat.length);
            var b = s1.indexOf("<");
            var s2 = s1.substr(0, b);
            var dt1 = $("#cons_start_date_main").val();
            var dt2 = $("#cons_end_date_main").val();
            $("#cons_start_date1").val(dt1);
            $("#cons_end_date1").val(dt2);
            $("#day_date").val(dt1);
            $("#det_cons_pat").text(s2);
            $("#chart_cover").css('display', 'block');
        }
        else {
            table3.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $("#datatable3").scroll(function (event) {
        //load_m_res = arr_m.concat(arr_m_res);
        var s = $(this).scrollTop();
        var h = $("#table3").height();
        //if ((s + 612) > h) {
        //var z = 0;
        //var temp_s;
        //for (z = 0; z < table3.rows().count() ; z++) {
        //    temp_s = table3.row(z).data();
        //    //alert(temp_s[9]);
        //    if ((temp_s[9] == "<div class='text_yellow'>---</div>") && (temp_s[2] != "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>3</div>")) {
        //        $("#table3 tr:eq(" + (z + 1) + ")").css('background', 'url("/Content/files/stripe_pink2.png")');
        //    }
        //}
        //};
        
        //$("#test_dt").text(cur_m_step + " | " + Math.round(s));
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#t3_header_back").css('display', 'block');
            $("#t3_header_back").css('border-bottom', 'solid 1px #cecece');
            $("#table3 th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#t3_header_back").css('display', 'none');
            $("#table3 th").css('border-bottom', 'solid 1px #cecece');
        }
        if (s > (c_cur_m_step * 50)) {
            //alert(s);
            //alert(c_cur_m_step);
            var i = table3.rows().count();
            var stat;
            var off;
            var dif;
            var dif1;
            var dif2;
            var c = table3.rows().count();
            // adding to table3 items from c_load_m_res //
            while (i < (20 + c)) {
                //alert(i);
                //on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'></div>"
                //if (c_load_m_res[i].use_yn == "1") {
                //    stat = "<div class='ab_met_stat_on' style='height: 15px; width: 15px;'>" + c_load_m_res[i].use_yn + "</div>"
                //} else {
                //    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + c_load_m_res[i].use_yn + "</div>";
                //    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'></div>";
                //}

                if (c_load_m_res[i].status == 3) {
                    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    stat = "<div class='ab_met_stat_nc' style='height: 15px; width: 15px;'>" + c_load_m_res[i].status + "</div>"
                }
                if (c_load_m_res[i].status == 2) {
                    stat = "<div class='ab_met_stat_err' style='height: 15px; width: 15px;'>" + c_load_m_res[i].status + "</div>"
                }
                if (c_load_m_res[i].status == 1) {
                    on_off = "<div class='met_on_off' style='width: 40px; height: 20px;'>0</div>"
                    stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + c_load_m_res[i].status + "</div>"
                }
                if (c_load_m_res[i].status == 0) {
                    on_off = "<div class='met_on_on' style='width: 40px; height: 20px;'>1</div>"
                    stat = "<div class='ab_met_stat_on' style='height: 19px; width: 18px;'>" + c_load_m_res[i].status + "</div>"
                }

                if (c_load_m_res[i].dif != null) {
                    dif = "<div class='text_green'>" + c_load_m_res[i].dif + "</div>";
                    dif1 = "<div class='text_orange'>" + c_load_m_res[i].dif1 + "</div>";
                    dif2 = "<div>" + c_load_m_res[i].dif2 + "</div>";
                } else {
                    dif = "<div class='text_yellow'>---</div>";
                    dif1 = "<div class='text_yellow'>---</div>";
                    dif2 = "<div class='text_yellow'>---</div>";
                }

                table3.row.add([
                table3.rows().count() + 1,
                "<input style='margin-left: 2px; margin-top: 2px;' class='met_check' type='checkbox'>",
                stat,
                on_off,
                c_load_m_res[i].group_nm,
                c_load_m_res[i].meter_id,
                c_load_m_res[i].meter_nm,
                c_load_m_res[i].install_place,
                "000000000",
                dif1,
                dif2,
                dif,
                ]).draw();
                i++;
            };
            //
            c_cur_m_step++;
        };
    });

    $(function () {
        $("#cons_end_date_main").datepicker({
            numberOfMonths: 3,
            maxDate: 0
        });
        $("#cons_start_date_main").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
            onClose: function () {
                $("#cons_end_date_main").datepicker("show");
            }
        });
        //
        //$("#cons_start_date_main").click(function () {
        //    $(this).val("");
        //    $("#cons_end_date_main").val("");
        //})
        //$("#cons_end_date_main").click(function () {
        //    $(this).val("");
        //    $("#dp_det_dcu_date1_start").val("");
        //})
    });



    $("#cons_start_date_main").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s1 + "" + s2;
        var text_date = s2 + "." + s1 + "." + s3;
        selected_dt_c = dt;
        var dt = $(this).val();
        $(this).val(dt);
        $("#t3_hdt").text(dt);
    })

    $("#cons_end_date_main").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s1 + "" + s2;
        var text_date = s2 + "." + s1 + "." + s3;
        selected_dt_c_end = dt;
        var dt = $(this).val();
        $(this).val(dt);
        $("#t3_hdt2").text(dt);

        c_arr_m_log = false;
        c_arr_m_rev_log = false;
        c_arr_m = [];
        c_arr_m_res = [];
        c_load_m_res = [];
        c_join_m_it_cnd = 0;
        //alert(selected_dt_c);
        //alert(selected_dt_c_end);

        //table2.clear().draw();
        //alert(selected_gr_gb);
        if ($("#search_cons").val() != "") {
            if (table3.rows().count() > 0) {
                var search = $("#search_cons").val();
                GlobalSearchConsumer(search, selected_gr_id, selected_gr_gb, selected_dt_c, selected_dt_c_end);
            }
        } else {
            if (selected_dcu != null && selected_dcu != "") {
                $("#consumer_loader").fadeIn(150);
                c_join_m_it_cnd = setInterval(DeployConsumerList, 1000);
            } else {
                alert("Выберите концентратор из дерева объектов или из списка концентраторов!");
            }
        }

    })

    //table3.fnSort([[0,'asc']]);
    $("#table3").on('dblclick', 'td', function (event) {
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '0');
        $("#t3_header_back").css('display', 'none');
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_cons").css("display", "block");
        $("#detail_pan_met").css("display", "none");
        $("#detail_pan_dcu").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
        var current = table3.row(this).data();
        selected_consm_id = current[5];
        $("#cdet_tp").text(current[4]);
        $("#cdet_mid").text(current[5]);
        $("#cdet_nm").text(current[6]);
        $("#cdet_addr").text(current[7]);
        $("#search_cons").css('display', 'none');
        // consumer dbl
    });

    $(function () {
        $("#day_date").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
        });
        $("#cons_start_date1").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
            onClose: function () {
                $("#cons_end_date1").datepicker("show");
            }
        });
        $("#cons_end_date1").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
        });
        $("#cons_start_date1").click(function () {
            //$(this).val("");
            //$("#cons_end_date1").val("");
            arr_consm = [];
            consm_i = 0;
        })
        $("#cons_end_date1").click(function () {
            //$(this).val("");
            //$("#cons_start_date1").val("");
            arr_consm = [];
            consm_i = 0;
        })

    });

    $("#cons_start_date1").change(function () {
        //var dt = $(this).val();
        //var s1 = dt.substring(0, 2);
        //var s2 = dt.substring(3, 5);
        //var s3 = dt.substring(6, 10);
        //dt = s3 + "" + s2 + "" + s1;
        //var text_date = s2 + "." + s1 + "." + s3;
        //$(this).val(text_date);
    })

    $("#cons_end_date1").change(function () {
        $("#cons_det_loader").fadeIn(150);
        var start = $("#cons_start_date1").datepicker("getDate"); //yyyy-mm-dd
        var end = $("#cons_end_date1").datepicker("getDate"); //yyyy-mm-dd
        var titles = [];
        var vals = [];
        var i = 0;
        while (start <= end) {
            var mm = ((start.getMonth() + 1) >= 10) ? (start.getMonth() + 1) : '0' + (start.getMonth() + 1);
            var dd = ((start.getDate()) >= 10) ? (start.getDate()) : '0' + (start.getDate());
            var yyyy = start.getFullYear();
            var dt = yyyy + "" + mm + "" + dd;
            var date = dd + "." + mm + "." + yyyy; //yyyy-mm-dd
            titles[i] = date;
            vals[i] = dt;
            //
            start = new Date(start.setDate(start.getDate() + 1)); //увеличиваем дату на 1
            i++;
        }
        // end date
        //$(this).val(titles[i-1]);
        // start date
        //alert(titles);
        //alert(vals);

        //$("#cons_start_date1").val(titles[0]);
        //
        // -- original
        //BuildConsumeGraph(titles, vals, selected_consm_id);
        // ---
        //
        // testing daterange
        var sdt = $("#cons_start_date1").val();
        var edt = $(this).val();
        //
        var s1 = sdt.substring(0, 2);
        var s2 = sdt.substring(3, 5);
        var s3 = sdt.substring(6, 10);
        sdate = s3 + "" + s1 + "" + s2;
        //
        var s1 = edt.substring(0, 2);
        var s2 = edt.substring(3, 5);
        var s3 = edt.substring(6, 10);
        edate = s3 + "" + s1 + "" + s2;

        ConsDetailChart(sdate, edate, selected_consm_id);
    })

    $("#day_date").change(function () {
        //$("#cons_det_loader").fadeIn(150);
        var dt = $("#day_date").val(); //yyyy-mm-dd
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s1 + "" + s2;
        var dt2 = s2 + "." + s1 + "." + s3;
        //$(this).val(dt2);
        //

        ConsumerDetPat(selected_consm_id, dt);
        //BuildConsumeGraph(titles, vals, selected_consm_id);
        //
        // testing daterange
    })

    $("#search_cons").click(function () {
        $(".dataTables_filter input").val("");
        $("#chint2").fadeIn(350);
        $("#chint1").css('display', 'none');
        setTimeout('$("#chint2").fadeOut(350)', 5000);
    })

    $(".dataTables_filter input").click(function () {
        $("#search_cons").val("");
        $("#chint1").fadeIn(350);
        $("#chint2").css('display', 'none');
        setTimeout('$("#chint1").fadeOut(350)', 5000);
    })


    $("#search_cons").keyup(function () {
        var search = $(this).val();
        if (search == "") {
            table3.clear().draw();
        }
    });

    $("#search_cons").keypress(function (e) {
        var search = $(this).val();
        if (search == "") {
            table3.clear().draw();
        }
        if (e.which == 13) {
            //alert("Input press enter");
            if (selected_gr_id != null && selected_gr_id != "" && selected_gr_gb != null && selected_dt_c != null && selected_dt_c != "" && selected_dt_c_end != null && selected_dt_c_end != "") {
                GlobalSearchConsumer(search, selected_gr_id, selected_gr_gb, selected_dt_c, selected_dt_c_end);
            } else {
                alert("Выберите в дереве объектов группу в пределах которой необходимо осуществить поиск!");
            }
        }
    });

    
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
    
    table5 = $("#table5").DataTable({
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
            { "width": "10%", "targets": 4 }, { "width": "20%", "targets": 5 }, { "width": "20%", "targets": 6 }, { "width": "20%", "targets": 7 }
        ]
    });
    // Select row
    $("#datatable5").scroll(function (event) {
        var s = $(this).scrollTop();
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#t5_header_back").css('display', 'block');
            $("#t5_header_back").css('border-bottom', 'solid 1px #cecece');
            $("#t5_header_back").css('top', '0px');
            $("#table5 th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#t5_header_back").css('display', 'none');
            $("#table5 th").css('border-bottom', 'solid 1px #cecece');
        }
    })
    $("#table5 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table5.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $("#table5 tbody").on('click', 'td', function () {
        var current = table5.row(this).data();
        $("#det_access input:eq(0)").val(current[1]);
        $("#det_access input:eq(1)").val(current[2]);


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
    table7 = $("#table7").DataTable({
        "rowCallback": function (row, data, index) {
            if (index % 2 == 0) {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            } else {
                $(row).removeClass('myodd myeven');
                $(row).addClass('myeven');
            }
        },
        "searching": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            //{ "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "1%", "targets": 2, "orderable": false }, { "width": "1%", "targets": 3 },
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
            table7.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
    });

    $("#datatable7").scroll(function (event) {
        //load_m_res = arr_m.concat(arr_m_res);
        var s = $(this).scrollTop();
        //$("#test_dt").text(cur_m_step + " | " + Math.round(s));
        var h = $("#table7").height();
        //if ((s + 612) > h) {
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '1');
            $("#t7_header_back").css('display', 'block');
            $("#t7_header_back").css('border-bottom', 'solid 1px #cecece');
            $("#table7 th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#t7_header_back").css('display', 'none');
            $("#table7 th").css('border-bottom', 'solid 1px #cecece');
        s};
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
    $("#dropbox2_1").click(function () {
        $("#dropdown2_1").slideToggle(400);
    })

    $("#dropdown2_1 div").mouseenter(function () {
        $(this).css('background', '#8c8c8c');
    })

    $("#dropdown2_1 div").mouseleave(function () {
        $(this).css('background', 'none');
    })

    $("#search_met").click(function () {
        //alert("Test");
    })

    $("#circle_all").click(function () {
        var s1 = $("#circle_all p").text(); 
        if ((s1 != "") && (s1 != "0")) {
            arr_m_log = false;
            arr_m_rev_log = false;
            highlight_m = false;
            arr_m = [];
            arr_m_res = [];
            load_m_res = [];
            join_m_it_cnd = 0;

            $("#meter_loader").fadeIn(150);
            join_m_it_cnd = setInterval(DeployMeterList, 1000);
        }
    });

    $("#circle_all p").mouseover(function () {
        $("#msg_box2").css('top', '5%');
        $("#msg_box2").css('left', '61%');
        $("#msg_box2").fadeIn(200);
        $("#msg_box2 p").text("Отобразить все счетчики");
    })

    $("#circle_all").mouseout(function () {
        $("#msg_box2").fadeOut(200);
    })
    
    $("#circle_on").click(function () {
        var s1 = $("#circle_on p").text(); 
        if ((s1 != "") && (s1 != "0")) {
            show_onoff_log = 1;

            arr_m_log = false;
            arr_m_rev_log = false;
            highlight_m = false;
            arr_m = [];
            arr_m_res = [];
            load_m_res = [];
            join_m_it_cnd = 0;

            $("#meter_loader").fadeIn(150);
            join_m_it_cnd = setInterval(DeployMeterList, 1000);
        }
    });

    $("#circle_on p").mouseover(function () {
        $("#msg_box2").css('top', '5%');
        $("#msg_box2").css('left', '64%');
        $("#msg_box2").fadeIn(200);
        $("#msg_box2 p").text("Отобразить включенные счетчики");
    })

    $("#circle_on").mouseout(function () {
        $("#msg_box2").fadeOut(200);
    })

    $("#circle_off").click(function () {
        var s1 = $("#circle_off p").text(); 
        if ((s1 != "") && (s1 != "0")) {
            show_onoff_log = 2;

            arr_m_log = false;
            arr_m_rev_log = false;
            highlight_m = false;
            arr_m = [];
            arr_m_res = [];
            load_m_res = [];
            join_m_it_cnd = 0;

            $("#meter_loader").fadeIn(150);
            join_m_it_cnd = setInterval(DeployMeterList, 1000);
        }
    });

    $("#circle_off p").mouseover(function () {
        $("#msg_box2").css('top', '5%');
        $("#msg_box2").css('left', '66.5%');
        $("#msg_box2").fadeIn(200);
        $("#msg_box2 p").text("Отобразить выключенные счетчики");
    })

    $("#circle_off").mouseout(function () {
        $("#msg_box2").fadeOut(200);
    })

    $("#circle_nr").click(function () {
        var s1 = $("#circle_nr p").text(); 
        if ((s1 != "") && (s1 != "0")) {
            show_onoff_log = 3;

            arr_m_log = false;
            arr_m_rev_log = false;
            highlight_m = false;
            arr_m = [];
            arr_m_res = [];
            load_m_res = [];
            join_m_it_cnd = 0;

            $("#meter_loader").fadeIn(150);
            join_m_it_cnd = setInterval(DeployMeterList, 1000);
        }
    });

    $("#circle_nr p").mouseover(function () {
        $("#msg_box2").css('top', '5%');
        $("#msg_box2").css('left', '68.8%');
        $("#msg_box2").fadeIn(200);
        $("#msg_box2 p").text("Отобразить не опрошенные счетчики");
    })

    $("#circle_nr").mouseout(function () {
        $("#msg_box2").fadeOut(200);
    })
    $("#circle_person p").mouseover(function () {
        $("#msg_box2").css('top', '5%');
        $("#msg_box2").css('left', '68.8%');
        $("#msg_box2").fadeIn(200);
        $("#msg_box2 p").text("Физическое лицо");
    })

    $("#circle_person").mouseout(function () {
        $("#msg_box2").fadeOut(200);
    })
    $("#circle_official p").mouseover(function () {
        $("#msg_box2").css('top', '5%');
        $("#msg_box2").css('left', '68.8%');
        $("#msg_box2").fadeIn(200);
        $("#msg_box2 p").text("Юридическое лицо");
    })

    $("#circle_official").mouseout(function () {
        $("#msg_box2").fadeOut(200);
    })

    $("#dropdown2_1 p").click(function () {
        $("#dropdown2_1").slideUp(400);
        var rnd, rnd2, rnd3, rnd4, rnd5, rnd6, i;
        rnd = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd2 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd4 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd5 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        rnd6 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        var operation_id = rnd + '' + rnd2 + '' + rnd3 + '' + rnd4 + '' + rnd5 + '' + rnd6;

        var dtt = selected_dt_m;
        var s1 = dtt.substring(0, 4);
        var s2 = dtt.substring(4, 6);
        var s3 = dtt.substring(6, 8);
        dtt = s3 + "" + s2 + "" + s1;

        //alert(task_arr);
        task_arr = task_arr.filter(function (n) {
            return n != undefined
        });
        //alert(task_arr);

        var dtm = new Date();
        var time = dtm.toString();
        var tm = time.substring(16, 21);
        //Sat Feb 24 2018 12:42:24 GMT+0500 (West Asia Standard Time)
        $("#table2 input:checkbox").prop('checked', false);
        //alert(tm);
        if ($(this).text() == "Отобразить все счетчики") {
            //$("#dropbox2_1 p").text("База данных");
            m_read_mode = "db";

            arr_m_log = false;
            arr_m_rev_log = false;
            highlight_m = false;
            arr_m = [];
            arr_m_res = [];
            load_m_res = [];
            join_m_it_cnd = 0;

            $("#meter_loader").fadeIn(150);
            join_m_it_cnd = setInterval(DeployMeterList, 1000);
            //$("#met_day_date").prop("disabled", false);
        }
        //
        if ($(this).text() == "Показания с концентратора") {
            //$("#dropbox2_1 p").text("Память концентратора");
            m_read_mode = "dcu";
            for (i = 0; i < task_arr.length; i++) {
                task_arr[i].operation_id = operation_id;
                task_arr[i].target = "history";
                task_arr[i].dt = dtt;
            }
            //alert(task_arr);
            table_disp.row.add([
                task_arr[0].operator_id,
                task_arr[0].operation_id,
                "Чтение с памяти концентратора",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest(task_arr);
            //$("#met_day_date").prop("disabled", true);
        }
        //
        if ($(this).text() == "Показания с счетчика") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr.length; i++) {
                task_arr[i].operation_id = operation_id;
                task_arr[i].target = "current";
                task_arr[i].dt = dtt;
            }
            table_disp.row.add([
                task_arr[0].operator_id,
                task_arr[0].operation_id,
                "Чтение с счетчика",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest(task_arr);
            //$("#met_day_date").prop("disabled", true);
        }
        //
        if ($(this).text() == "Включить выбранные счетчики") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr.length; i++) {
                task_arr[i].operation_id = operation_id;
                task_arr[i].target = "on";
                task_arr[i].dt = dtt;
            }
            table_disp.row.add([
                task_arr[0].operator_id,
                task_arr[0].operation_id,
                "Включение счетчиков",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest(task_arr);
            //$("#met_day_date").prop("disabled", true);
        }
        //
        if ($(this).text() == "Выключить выбранные счетчики") {
            //$("#dropbox2_1 p").text("С счетчика");
            m_read_mode = "m";
            for (i = 0; i < task_arr.length; i++) {
                task_arr[i].operation_id = operation_id;
                task_arr[i].target = "off";
                task_arr[i].dt = dtt;
            }
            table_disp.row.add([
                task_arr[0].operator_id,
                task_arr[0].operation_id,
                "Выключение счетчиков",
                selected_dcu,
                tm,
                "<div class='process'></div>",
                "<div class='cancel_disp'></div>",
            ]).draw();
            SendTaskRequest(task_arr);
            //$("#met_day_date").prop("disabled", true);
        }
        //
        if ($(this).text() == "Журнал событий") {
            //$("#dropbox2_1 p").text("Журнал событий");
            m_read_mode = "me";
            //$("#met_day_date").prop("disabled", false);
        }
        task_arr = [];
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

    $("#dropdown7_1 div").mouseenter(function () {
        $(this).css('background', '#8c8c8c');
    })

    $("#dropdown7_1 div").mouseleave(function () {
        $(this).css('background', 'none');
    })

    $(document).on("mouseenter", "#dropdown7_1 div", function (event) {
        $(this).css('background', '#8c8c8c');
    })

    $(document).on("mouseleave", "#dropdown7_1 div", function (event) {
        $(this).css('background', 'none');
    })

    $(document).on("click", "#dropdown7_1 div", function (event) {
        $("#dropdown7_1").slideToggle(400);
        var s = $(this).text();
        $("#drop_p_7_1").text(s);
        if ($("#drop_p_7_1").text() != "" && $("#drop_p_7_2").text() != "" && $("#event_day_date").val() !="") {
            table7.clear().draw();
            var opn = "";
            switch ($("#drop_p_7_2").text()) {
                case "Вход в систему":
                    opn = "in";
                    break;
                case "Считывание с концентратора":
                    opn = "history";
                    break;
                case "Считывание с счетчика":
                    opn = "current";
                    break;
                case "Включение счетчика":
                    opn = "on";
                    break;
                case "Выключение счетчика":
                    opn = "off";
                    break;
                default:
                    "";
            }
            var op = $("#drop_p_7_1").text();
            var dt = $("#event_day_date").val();
            var s1 = dt.substring(0, 2);
            var s2 = dt.substring(3, 5);
            var s3 = dt.substring(6, 10);
            dt = s2 + "." + s1 + "." + s3;
            SearchLogs(op, dt, opn);
        } else {
            //alert("Сначало выберите пользователя и событие.");
        }
    })


    $("#dropbox7_2").click(function () {
        $("#dropdown7_2").slideToggle(400);
    })

    $("#dropdown7_2 div").mouseenter(function () {
        $(this).css('background', '#8c8c8c');
    })

    $("#dropdown7_2 div").mouseleave(function () {
        $(this).css('background', 'none');
    })

    $("#dropdown7_2 p").click(function () {
        $("#dropdown7_2").slideUp(400);
        var s = $(this).text();
        $("#drop_p_7_2").text(s);
        if ($("#drop_p_7_1").text() != "" && $("#drop_p_7_2").text() != "" && $("#event_day_date").val() != "") {
            table7.clear().draw();
            var opn = "";
            switch ($("#drop_p_7_2").text()) {
                case "Вход в систему":
                    opn = "in";
                    break;
                case "Считывание с концентратора":
                    opn = "history";
                    break;
                case "Считывание с счетчика":
                    opn = "current";
                    break;
                case "Включение счетчика":
                    opn = "on";
                    break;
                case "Выключение счетчика":
                    opn = "off";
                    break;
                default:
                    "";
            }
            var op = $("#drop_p_7_1").text();
            var dt = $("#event_day_date").val();
            var s1 = dt.substring(0, 2);
            var s2 = dt.substring(3, 5);
            var s3 = dt.substring(6, 10);
            dt = s2 + "." + s1 + "." + s3;
            SearchLogs(op, dt, opn);
        } else {
            //alert("Сначало выберите пользователя и событие.");
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
    //$(function () {
    //    // 24 hours //
    //    $("#cons_start_date_main").datepicker({
    //        changeMonth: true,
    //        numberOfMonths: 1,
    //        dateFormat: 'dd.mm.yy',
    //    }).datepicker();
    //    $("#cons_end_date_main").datepicker({
    //        changeMonth: true,
    //        numberOfMonths: 1,
    //        dateFormat: 'dd.mm.yy',
    //    }).datepicker();
    //});

    //$("#cons_start_date_main").datepicker({
    //    onClose: function () {
    //        $("#cons_end_date_main").datepicker("show");
    //    }
    //});

    //$("#cons_start_date_main").click(function () {
    //    $(this).val("");
    //    $("#cons_end_date_main").val("");
    //})

    //$("#cons_end_date_main").click(function () {
    //    $(this).val("");
    //    $("#cons_start_date_main").val("");
    //})

    var log_cons_date2 = false;


















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
    //var log_cons_date1 = false;
    
    ////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////// Meters ///////////////////////////////////////////////////

    //$("#met_day_date").click(function () {
    //    $(this).val("");
    //})
    //$("#met_day_date").change(function () {
    //    var dt = $(this).val();
    //    var s1 = dt.substring(0, 2);
    //    var s2 = dt.substring(3, 5);
    //    var s3 = dt.substring(6, 10);
    //    dt = s3 + "" + s2 + "" + s1;
    //    selected_dt_m = dt;
    //    //alert(selected_dt_m);
    //    //
    //    arr_m_log = false;
    //    arr_m_rev_log = false;
    //    arr_m = [];
    //    arr_m_res = [];
    //    load_m_res = [];
    //    //table2.clear().draw();
    //    join_m_it = setInterval(DeployMeterList, 1000);
    //});

    // calendar for energy table //3
    $(function () {
        // 24 hours //
        $("#renergy_day_date").datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd.mm.yy'
        }).datepicker("setDate", new Date());
    });
    // calendar for meters table //
    $(function () {
        // 24 hours //

        $("#event_day_date").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
        })

        $("#event_day_date").change(function () {
            ////
            if ($("#drop_p_7_1").text() != "" && $("#drop_p_7_2").text() != "") {
                table7.clear().draw();
                var opn = "";
                switch ($("#drop_p_7_2").text()) {
                    case "Вход в систему":
                        opn = "in";
                        break;
                    case "Считывание с концентратора":
                        opn = "history";
                        break;
                    case "Считывание с счетчика":
                        opn = "current";
                        break;
                    case "Включение счетчика":
                        opn = "on";
                        break;
                    case "Выключение счетчика":
                        opn = "off";
                        break;
                    default:
                        "";
                }
                var op = $("#drop_p_7_1").text();
                var dt = $("#event_day_date").val();
                var s1 = dt.substring(0, 2);
                var s2 = dt.substring(3, 5);
                var s3 = dt.substring(6, 10);
                dt = s2 + "." + s1 + "." + s3;
                SearchLogs(op, dt, opn);
            } else {
                //alert("Сначало выберите пользователя и событие.");
            }
            ////
        })
    });
    ////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////// Consumer details period chart ////////////////////////////////////////////
    $(function () {
        //$('#source').tableBarChart(targetDiv, caption, reverseGroup);
        $('#source').tableBarChart('#chart1', '', false);
    });
    

    $(function () {
        //    //alert("Hi!");
        //    var data = [{
        //        type: 'bar',
        //        x: [10, 15, 17, 9, 11, 20, 13, 8, 14, 24, 19, 23, 9, 14, 22, 29, 27, 6, 29, 15, 17, 10, 8, 20],
        //        y: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', ],
        //        orientation: 'v'
        //    }];

        //var layout = {
        //    xaxis: {
        //        autorange: 'reversed'
        //    },
        //    yaxis: {
        //        side: 'right'
        //    }
        //}


        var layout = {
            title: 'Потребление по часам за сутки',
            font: {
                family: 'Arial',
                size: 11,
                color: '#fff'
            },
            xaxis: {
                zeroline: true,
                showline: true,
                showgrid: true,
                showticklabels: true,
                gridcolor: '#666666',
                linecolor: '#666666',
                ticks: 'inside',
                tickcolor: '#fff',
                tickwidth: 2,
                ticklen: 5,
                tickfont: {
                    family: 'Arial',
                    size: 11,
                    color: '#fff'
                }
            },
            yaxis: {
                zeroline: true,
                showline: true,
                showgrid: true,
                showticklabels: true,
                gridcolor: '#666666',
                linecolor: '#666666',
                ticks: 'inside',
                tickcolor: '#fff',
                tickwidth: 2,
                ticklen: 5,
            },
            legend: {
                x: 0,
                y: 100
            },
            side: 'right',
            height: 350,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            margin: {
                //autoexpand: true,
                l: 50,
                r: 20,
                t: 50,
                b: 100
            },
        };

        Plotly.newPlot('chart1', data, layout);
        ///
        var trace1 = {
            //x: arr_t,
            //y: arr_v,
            fill: 'tozeroy',
            mode: 'lines',
            name: 'График потребления энергии за выбранный период',
            area: 'fill',
            marker: {
                color: '#1cc2ff'
            },
        };

        var layout = {
            title: 'Потребление электроэнергии за указанный период',
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
            height: 360,
            margin: {
                //autoexpand: true,
                l: 50,
                r: 30,
                t: 35,
                b: 70
            },
        };

        var data = [trace1];
        Plotly.newPlot('r_r_graph', data, layout)
        //////
    })


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
    $("#cons_excel1").click(function () {
        if ($("#cons_start_date_main").val() != "" && $("#cons_end_date_main").val() != "" && selected_dcu != "") {
            GetReportOne();
        } else {
        }
        // a href
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
    $("#ht2_excel").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#ht2_excel").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })

    $("#mp_excel").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#mp_excel").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })

    $("#met_pdf1").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#met_pdf1").mouseout(function () {
        $(this).attr("src", "/Content/files/pdf_icon.png");
    })


    $("#met_print1_g").mouseover(function () {
        $(this).attr("src", "/Content/files/print_icon_h.png");
    })
    $("#met_print1_g").mouseout(function () {
        $(this).attr("src", "/Content/files/print_icon.png");
    })
    $("#met_excel1_g").mouseover(function () {
        $(this).attr("src", "/Content/files/excel_icon_h.png");
    })
    $("#met_excel1_g").mouseout(function () {
        $(this).attr("src", "/Content/files/excel_icon.png");
    })
    $("#met_pdf1_g").mouseover(function () {
        $(this).attr("src", "/Content/files/pdf_icon_h.png");
    })
    $("#met_pdf1_g").mouseout(function () {
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

    // test gazzzzz
    function s2ab(s)
    {
        var buf = new ArrayBuffer(s.length); 
        var view = new Uint8Array(buf);  
        for (var i = 0; i < s.length; i++)
        {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
    $("#met_excel1").click(function () {
       
        var list = [];
        list[0] = [];
        list[0][0] = "Статус";
        list[0][1] = "КТП";
        list[0][2] = "Концентратор";
        list[0][3] = "ID Счетчика";
        list[0][4] = "PNO";
        list[0][5] = "Имя Абонента";
        list[0][6] = "Адрес";
        list[0][7] = "Дата опроса";
        list[0][8] = "|A|";
        list[0][9] = "A+ (Total)";
        list[0][10] = "A+ (T1)";
        list[0][11] = "A+ (T2)";
        list[0][12] = "A+ (T3)";
        list[0][13] = "A+ (T4)";
        list[0][14] = "A- (Total)";
        list[0][15] = "A- (T1)";
        list[0][16] = "A- (T2)";
        list[0][17] = "A- (T3)";
        list[0][18] = "A- (T4)";
        list[0][19] = "Лиц. счет";
        list[0][20] = "Тип абонента";
        var list1 = new Array;
        var list2 = new Array;


        var i = 0;
        for(i=0; i<load_m_res.length; i++)
        {
            list[i + 1] = [];
            if(load_m_res[i].status=="1")
            {
                list[i + 1][0] = "Включен";
            }
            if (load_m_res[i].status == "0") {
                list[i + 1][0] = "Выключен";
            }
            list[i + 1][1] = load_m_res[i].group_nm;
            list[i + 1][2] = load_m_res[i].dcu_id;
            list[i + 1][3] = load_m_res[i].meter_id;
            list[i + 1][4] = load_m_res[i].point_no;
            list[i + 1][5] = load_m_res[i].meter_nm;
            list[i + 1][6] = load_m_res[i].install_place;
            list[i + 1][7] = $("#met_day_date").val(),
            list[i + 1][8] = load_m_res[i].apm;
            list[i + 1][9] = load_m_res[i].pat;
            list[i + 1][10] = load_m_res[i].pat1;
            list[i + 1][11] = load_m_res[i].pat2;
            list[i + 1][12] = load_m_res[i].pat3;
            list[i + 1][13] = load_m_res[i].pat4;
            list[i + 1][14] = load_m_res[i].nat;
            list[i + 1][15] = load_m_res[i].nat1;
            list[i + 1][16] = load_m_res[i].nat2;
            list[i + 1][17] = load_m_res[i].nat3;
            list[i + 1][18] = load_m_res[i].nat4;
            list[i + 1][19] = "---";
            list[i + 1][20] = "электрический";
        }
        
        var wb = XLSX.utils.book_new();
        wb.SheetNames.push("Test Sheet");
        var ws = XLSX.utils.aoa_to_sheet(list);
        wb.Sheets["Test Sheet"] = ws;
        
        var wbout = XLSX.write(wb, { booktype: 'xlsx', type: 'binary' });
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Meter_list_'+ load_m_res[0].dcu_id +'.xlsx');
    })
    $("#ht2_excel").click(function () {
        
        var list = [];
		var name = $("#home_title").text();
        list[0] = [];
        list[0][0] = "КТП";
        list[0][1] = "Концентратор";
        list[0][2] = "Всего";
        list[0][3] = "Опрошено";
        list[0][4] = "Не опрошено";
        list[0][5] = "Возможно подключить";

        list[1] = [];
        list[1][0] = "                                " + name + "(состояние концентраторов)";
        list[1][1] = "";
        list[1][2] = "";
        list[1][3] = "";
        list[1][4] = "";
        list[1][5] = "";
        var i = 0;
        var k = 2;
        for (i = 0; i < dcu_list_sum.length; i++) {
            list[k] = [];
            list[k][0] = dcu_list_sum[i].tp;
            list[k][1] = dcu_list_sum[i].dcu_id;
            list[k][2] = dcu_list_sum[i].all;
            list[k][3] = dcu_list_sum[i].read;
            list[k][4] = dcu_list_sum[i].nread;
            list[k][5] = dcu_list_sum[i].left;
            k++;
        }
        var workBook = XLSX.utils.book_new();
        workBook.cellStyles = true;
        workBook.SheetNames.push("Sheet 1");
        var workSheet = XLSX.utils.aoa_to_sheet(list);
        var merge = { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } };
        var wscols = [
            { wch: 20 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
        ];
        var wsrows = [
            { hpt: 15 },
            { hpt: 25 },
        ];
        workSheet['!cols'] = wscols;
        workSheet['!rows'] = wsrows;

        if (!workSheet['!merges']) {
            workSheet['!merges'] = [];
        }
        workSheet['!merges'].push(merge);
        workSheet.cellStyles = true;
        workBook.Sheets["Sheet 1"] = workSheet;
        var wbout = XLSX.write(workBook, { booktype: 'xlsx', type: 'binary', bookSST: true, cellStyles: true });
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), name + '_.xlsx');
    })

    $("#mp_excel").click(function () {
        var tree_id;
        if (selected_gr_gb == 1)
        {
            tree_id = selected_gr_id;

        }
        else
        {
            tree_id = selected_gr_id.substring(0, 5);
        }
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/Meter/GetUndefinedMeters",
            data: '{id:"'+ tree_id +'"}',
            success: function (result) {
                undefined_meters=result;
                GetUndefinedMeters();
            }
        })
    })
    function GetUndefinedMeters()
    {
        var list = [];
        list[0] = [];
        list[0][0] = "ИД";
        list[0][1] = "Описание";
        list[0][2] = "дата";
        list[0][3] = "имя инспектора";

        list[1] = [];
        list[1][0] ="                            " + selected_gr_nm + "(неизвестный объекти)";
        list[1][1] = "";
        list[1][2] = "";
        list[1][3] = "";
        var i = 0;
        var k = 2;

        for (i = 0; i < undefined_meters.length; i++) {
            
                list[k] = [];
                list[k][0] = undefined_meters[i].meter_id;
                list[k][1] = undefined_meters[i].description;
                list[k][2] = undefined_meters[i].date;
                list[k][3] = undefined_meters[i].inspector_nm;
                k++;
        }
        var workBook = XLSX.utils.book_new();
        workBook.cellStyles = true;
        workBook.SheetNames.push("Sheet 1");
        var workSheet = XLSX.utils.aoa_to_sheet(list);
        workSheet.cellStyles = true;
        var merge = { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } };
        var wscols = [
            { wch: 15 },
            { wch: 30 },
            { wch: 25 },
            { wch: 25 },
        ];
        var wsrows = [
            { hpt: 15 },
            { hpt: 25 },
        ];
        workSheet['!cols'] = wscols;
        workSheet['!rows'] = wsrows;
        
        if (!workSheet['!merges'])
        {
            workSheet['!merges'] = [];
        }
        workSheet['!merges'].push(merge);
        workBook.Sheets["Sheet 1"] = workSheet;
        var wbout = XLSX.write(workBook, { booktype: 'xlsx', type: 'binary', bookSST: true, cellStyles: true });
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }),  selected_gr_nm +'_.xlsx');
    }

    // met_det_tabs
    $("#met_det_tab1").click(function () {
        $("#dp_det_met_date1_start").show();
        //$("#met_det_tabs").css("background", "url('/Content/files/tabbtn1.png')");
        $("#contain_wide").scrollLeft(0);
        selector = 1;
    })
    $("#met_det_tab2").click(function () {
        $("#dp_det_met_date1_start").hide();
        //$("#met_det_tabs").css("background", "url('/Content/files/tabbtn2.png')");
        var w = $("#det_pan_met_wide").width();
        //alert(w);
        var n = w / 3;
        $("#contain_wide").scrollLeft(n);
        selector=2
    })
    
    $("#met_det_tab4").click(function () {
        $("#dp_det_met_date1_start").show();
        //$("#met_det_tabs").css("background", "url('/Content/files/tabbtn4.png')");
        var w = $("#det_pan_met_wide").width();
        var n = (w / 3) * 2;
        $("#contain_wide").scrollLeft(n);
        selector = 3;
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
    $("#gas_meter_drop_btn").click(function () {
        $("#gas_drop").slideToggle(500);
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
    table1_dp_met = $("#dp_met_table1").DataTable({
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
          { "width": "3%", "targets": 0 }, { "width": "3%", "targets": 1}, { "width": "3%", "targets": 2}, { "width": "3%", "targets": 3 },
          { "width": "3%", "targets": 4 }, { "width": "3%", "targets": 5 }, { "width": "3%", "targets": 6 }, { "width": "3%", "targets": 7 }
          //{ "width": "15%", "targets": 8 }, { "width": "15%", "targets": 9 }, { "width": "15%", "targets": 10 }
        ]
    });
    // Select row
    $("#dp_met_table1 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table1_dp_met.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $(function () {
        //$("#home_date").datepicker({
        //    numberOfMonths: 3,
        //    maxDate: 0,
        //});
        $("#dp_det_met_date1_start").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
            onClose: function () {
                $("#dp_det_met_date1_end").datepicker("show");
            }
        });
        $("#dp_det_met_date1_end").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
        });
    });
    
    $("#dp_det_met_date1_end").change(function () {
        var sdt = $("#dp_det_met_date1_start").val();
        var edt = $(this).val();
        //
        var s1 = sdt.substring(0, 2);
        var s2 = sdt.substring(3, 5);
        var s3 = sdt.substring(6, 10);
        sdate = s3 + "" + s1 + "" + s2;
        //
        var s1 = edt.substring(0, 2);
        var s2 = edt.substring(3, 5);
        var s3 = edt.substring(6, 10);
        edate = s3 + "" + s1 + "" + s2;
        //
        var mid = $("#drop_met_det p:eq(18)").text();
        //alert(sdate + "   " + edate + "   " + mid);
        if (selector == 1) {
            MeterDetailsChart(sdate, edate, mid);
        }
        if (selector == 2) {
            
            var s1 = edt.substring(0, 2);
            var s2 = edt.substring(3, 5);
            var s3 = edt.substring(6, 10);
            var read_date = s2 + "." + s1 + "." + s3;
            LoadProfileDetails(read_date, mid)
        }
        if (selector == 3) {
            
        }
    });
    function LoadProfileDetails(date, mid)
    {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/Meter/readLoadProfile",
            data: '{date: "' + date + '", meter:"' + mid + '" }',
            success: function (result) {
                table2_dp_met.clear().draw();
                var i = 0;
                $("#chart_cover_mdt").css('display', 'none');
                var time_arr = [];
                var voltage1_arr = [];
                var voltage2_arr = [];
                var voltage3_arr = [];
                var current1_arr = [];
                var current2_arr = [];
                var current3_arr = [];
                var frequency_arr = [];
                var total_ap_arr = [];
                var total_ap1_arr = [];
                var total_ap2_arr = [];
                var total_ap3_arr = [];
                var total_rp_arr = [];
                var total_rp1_arr = [];
                var total_rp2_arr = [];
                var total_rp3_arr = [];
                var pfactor_arr = [];
                var pfactor1_arr = [];
                var pfactor2_arr = [];
                var pfactor3_arr = [];
                var aplus_arr = [];
                var aminus_arr = [];
                var rplus_arr = [];
                var rminus_arr = [];

                for (i = 0; i < result.length; i++) {
                    time_arr[i] = result[i].read_time;
                    if (result[i].voltage1 == null) {
                        voltage1_arr[i] = 0;
                    }
                    else {
                        voltage1_arr[i] = result[i].voltage1;
                    }
                    if (result[i].voltage2 == null) {
                        voltage2_arr[i] = 0;
                    }
                    else {
                        voltage2_arr[i] = result[i].voltage2;
                    }
                    if (result[i].voltage3 == null) {
                        voltage3_arr[i] = 0;
                    }
                    else {
                        voltage3_arr[i] = result[i].voltage3;
                    }
                    if (result[i].current1 == null) {
                        current1_arr[i] = 0;
                    }
                    else {
                        current1_arr[i] = result[i].current1;
                    }

                    if (result[i].current2 == null) {
                        current2_arr[i] = 0;
                    }
                    else {
                        current2_arr[i] = result[i].current2;
                    }

                    if (result[i].current3 == null) {
                        current3_arr[i] = 0;
                    }
                    else {
                        current3_arr[i] = result[i].current3;
                    }

                    if (result[i].frequency == null) {
                        frequency_arr[i] = 0;
                    }
                    else {
                        frequency_arr[i] = result[i].frequency;
                    }

                    if (result[i].total_ap == null) {
                        total_ap_arr[i] = 0;
                    }
                    else {
                        total_ap_arr[i] = result[i].total_ap;
                    }

                    if (result[i].total_ap1 == null) {
                        total_ap1_arr[i] = 0;
                    }
                    else {
                        total_ap1_arr[i] = result[i].total_ap1;
                    }

                    if (result[i].total_ap2 == null) {
                        total_ap2_arr[i] = 0;
                    }
                    else {
                        total_ap2_arr[i] = result[i].total_ap2;
                    }
                    if (result[i].total_ap3 == null) {
                        total_ap3_arr[i] = 0;
                    }
                    else {
                        total_ap3_arr[i] = result[i].total_ap3;
                    }
                    if (result[i].total_rp == null) {
                        total_rp_arr[i] = 0;
                    }
                    else {
                        total_rp_arr[i] = result[i].total_rp;
                    }
                    if (result[i].total_rp1 == null) {
                        total_rp1_arr[i] = 0;
                    }
                    else {
                        total_rp1_arr[i] = result[i].total_rp1;
                    }
                    if (result[i].total_rp2 == null) {
                        total_rp2_arr[i] = 0;
                    }
                    else {
                        total_rp2_arr[i] = result[i].total_rp2;
                    }
                    if (result[i].total_rp3 == null) {
                        total_rp3_arr[i] = 0;
                    }
                    else {
                        total_rp3_arr[i] = result[i].total_rp3;
                    }
                    if (result[i].total_pfactor == null) {
                        pfactor_arr[i] = 0;
                    }
                    else {
                        pfactor_arr[i] = result[i].total_pfactor;
                    }
                    if (result[i].total_pfactor1 == null) {
                        pfactor1_arr[i] = 0;
                    }
                    else {
                        pfactor1_arr[i] = result[i].total_pfactor1;
                    }
                    if (result[i].total_pfactor2 == null) {
                        pfactor2_arr[i] = 0;
                    }
                    else {
                        pfactor2_arr[i] = result[i].total_pfactor2;
                    }
                    if (result[i].total_pfactor3 == null) {
                        pfactor3_arr[i] = 0;
                    }
                    else {
                        pfactor3_arr[i] = result[i].total_pfactor3;
                    }
                    if (result[i].total_aplus == null) {
                        aplus_arr[i] = 0;
                    }
                    else {
                        aplus_arr[i] = result[i].total_aplus;
                    }
                    if (result[i].total_aminus == null) {
                        aminus_arr[i] = 0;
                    }
                    else {
                        aminus_arr[i] = result[i].total_aminus;
                    }
                    if (result[i].total_rplus == null) {
                        rplus_arr[i] = 0;
                    }
                    else {
                        rplus_arr[i] = result[i].total_rplus;
                    }
                    if (result[i].total_rminus == null) {
                        rminus_arr[i] = 0;
                    }
                    else {
                        rminus_arr[i] = result[i].total_rminus;
                    }

                    table2_dp_met.row.add([
                                           table2_dp_met.rows().count() +1,
                                           result[i].read_time,
                                           result[i].voltage1,
                                           result[i].voltage2,
                                           result[i].voltage3,
                                           result[i].current1,
                                           result[i].current2,
                                           result[i].current3,
                                           result[i].frequency,
                                           result[i].total_ap,
                                           result[i].total_ap1,
                                           result[i].total_ap2,
                                           result[i].total_ap3,
                                           result[i].total_rp,
                                           result[i].total_rp1,
                                           result[i].total_rp2,
                                           result[i].total_rp3,
                                           result[i].total_pfactor,
                                           result[i].total_pfactor1,
                                           result[i].total_pfactor2,
                                           result[i].total_pfactor3,
                                           result[i].total_aplus,
                                           result[i].total_aminus,
                                           result[i].total_rplus,
                                           result[i].total_rminus,
                    ]).draw();
                }
                var trace1 = {
                        x: time_arr,
                        y: voltage1_arr,
                        fill: 'tozeroy',
                        mode: 'lines',
                        name: 'voltage_1',
                        marker: {
                            color: '#00004d'
                        },
                };
                var trace2 = {
                    x: time_arr,
                    y: voltage2_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'voltage_2',
                    marker: {
                        color: '#0000cc'
                    },
                };
                var trace3 = {
                    x: time_arr,
                    y: voltage3_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'voltage_3',
                    marker: {
                        color: '#3333ff'
                    },
                };
                var trace4 = {
                    x: time_arr,
                    y: current1_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'current_1',
                    marker: {
                        color: '#604020'
                    },
                };
                var trace5 = {
                    x: time_arr,
                    y: current2_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'current_2',
                    marker: {
                        color: '#996633'
                    },
                };
                var trace6 = {
                    x: time_arr,
                    y: current3_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'current_3',
                    marker: {
                        color: '#d2a679'
                    },
                };
                var trace7 = {
                    x: time_arr,
                    y: frequency_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'frequency',
                    marker: {
                        color: '#009900'
                    },
                };
                var trace8 = {
                    x: time_arr,
                    y: total_ap_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'total |A|',
                    marker: {
                        color: '#66004d'
                    },
                };
                var trace9 = {
                    x: time_arr,
                    y: total_ap1_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'total |A| phase-1',
                    marker: {
                        color: '#99004d'
                    },
                };
                var trace10 = {
                    x: time_arr,
                    y: total_ap2_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'total |A| phase-2',
                    marker: {
                        color: '#993366'
                    },
                };
                var trace11 = {
                    x: time_arr,
                    y: total_ap3_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'total |A| phase-3',
                    marker: {
                        color: '#b30059'
                    },
                };
                var trace12 = {
                    x: time_arr,
                    y: total_rp_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'total |R|',
                    marker: {
                        color: '#996600'
                    },
                };
                var trace13 = {
                    x: time_arr,
                    y: total_rp1_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'total |R| phase-1',
                    marker: {
                        color: '#663300'
                    },
                };
                var trace14 = {
                    x: time_arr,
                    y: total_rp2_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'total |R| phase-2',
                    marker: {
                        color: '#993300'
                    },
                };
                var trace15 = {
                    x: time_arr,
                    y: total_rp3_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'total |R| phase-3',
                    marker: {
                        color: '#993333'
                    },
                };
                var trace16 = {
                    x: time_arr,
                    y: pfactor_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'power factor',
                    marker: {
                        color: '#ff0066'
                    },
                };
                var trace17 = {
                    x: time_arr,
                    y: pfactor1_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'power factor phase-1',
                    marker: {
                        color: '#ff3300'
                    },
                };
                var trace18 = {
                    x: time_arr,
                    y: pfactor2_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'power factor phase-2',
                    marker: {
                        color: '#ff0000'
                    },
                };
                var trace19 = {
                    x: time_arr,
                    y: pfactor3_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'power factor phase-3',
                    marker: {
                        color: '#cc0000'
                    },
                };
                var trace20 = {
                    x: time_arr,
                    y: aplus_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'A+',
                    marker: {
                        color: '#800000'
                    },
                };
                var trace21 = {
                    x: time_arr,
                    y: aminus_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'A-',
                    marker: {
                        color: '#00ffff'
                    },
                };
                var trace22 = {
                    x: time_arr,
                    y: rplus_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'R+',
                    marker: {
                        color: '#ff3399'
                    },
                };
                var trace23 = {
                    x: time_arr,
                    y: rminus_arr,
                    fill: 'tozeroy',
                    mode: 'lines',
                    name: 'R-',
                    marker: {
                        color: '#66ff99'
                    },
                };
                var layout = {
                    title: 'детальный график по профиль нагрузкой',
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
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    margin: {
                        l: 50,
                        r: 20,
                        t: 80,
                        b: 70
                    },
                };

                var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10, trace11, trace12, trace13, trace14, trace15, trace16, trace17, trace18, trace19, trace20, trace21, trace22, trace23];
                Plotly.newPlot('tab2_chart', data, layout);
            }
        });
    }



    table2_dp_met = $("#dp_met_table2").DataTable({
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
          { "width": "1%", "targets": 0 }, { "width": "3%", "targets": 1 }, { "width": "3%", "targets": 2 }, { "width": "3%", "targets": 3 },
          { "width": "3%", "targets": 4 }, { "width": "3%", "targets": 5 }, { "width": "3%", "targets": 6 }, { "width": "3%", "targets": 7 },
          { "width": "3%", "targets": 8 }, { "width": "5%", "targets": 9 }, { "width": "5%", "targets": 10 }, { "width": "5%", "targets": 11 },
          { "width": "5%", "targets": 12 }, { "width": "5%", "targets": 13 }, { "width": "5%", "targets": 14 }, { "width": "5%", "targets": 15 },
          { "width": "5%", "targets": 16 }, { "width": "5%", "targets": 17 }, { "width": "5%", "targets": 18 }, { "width": "5%", "targets": 19 },
          { "width": "5%", "targets": 20 }, { "width": "4%", "targets": 21 }, { "width": "4%", "targets": 22 }, { "width": "4%", "targets": 23 },
          { "width": "4%", "targets": 24 }
        ]
    });

    $("#datatable_dp_met_table2").scroll(function (event) {
        table2.scc('display','none');
        var s = $(this).scrollTop();
        if (s != 0) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'relative');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', s - 20);
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', "1");
            $("#do_met_table2_header_back").css('display', 'block');
            $("#dp_met_table2_header_back").css('border-bottom', 'solid 1px #cecece');
            $("#dp_met_table2_header_back").css('top', '0px');
            $("#table5 th").css('border-bottom', 'solid 0px #cecece');
        };
        if (s < 10) {
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#dp_met_table2_header_back").css('display', 'none');
            $("#dp_met_table2 th").css('border-bottom', 'solid 1px #cecece');
        }
    })

    $("#dp_met_table2 tbody").on('click', 'tr', function () {
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
    ///////////////////////// Create and initialize dp_met_table3 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    

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
        title: 'Потребление электроэнергии за указанный период',
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
        name: 'Порог',
        marker: {
            color: '#ff5757'
        },
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        y: [10, 28, 62, 35, 45, 57, 48, 35, 18, 40, 55, 60, 43, 31, 45],
        fill: 'none',
        mode: 'lines',
        name: 'Показания',
        marker: {
            color: '#24ff00'
        }
    };

    var layout = {
        title: 'График превышения максимальной нагрузки',
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
    table1_dp_dcu = $("#dp_dcu_table1").DataTable({
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


    //

    $("#dp_det_dcu_date1").datepicker();
    $("#dp_det_dcu_date2").datepicker();


    ///////////////////////// Create and initialize dp_met_table4 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    table2_dp_dcu = $("#dp_dcu_table2").DataTable({
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
    table1_dp_tp = $("#dp_tp_table1").DataTable({
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
          { "width": "1%", "targets": 0 }, { "width": "3%", "targets": 1, "orderable": false }, { "width": "8%", "targets": 2 }, { "width": "8%", "targets": 3, "orderable": true },
          { "width": "8%", "targets": 4 }, { "width": "8%", "targets": 5 }, { "width": "8%", "targets": 6 }, { "width": "8%", "targets": 7 },
          { "width": "8%", "targets": 8 }, { "width": "8%", "targets": 9 }, { "width": "8%", "targets": 10 }, { "width": "8%", "targets": 11 },
          { "width": "8%", "targets": 12 }, { "width": "8%", "targets": 13 }//, { "width": "6%", "targets": 15 },
        //  { "width": "6%", "targets": 16 }, { "width": "6%", "targets": 17 }
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


    $("#dp_tp_table1 tbody").on('click', 'td', function () {
        var bt_pie1_s = 0;
        var bt_pie1_b = 0;
        var current = table1_dp_tp.row(this).data();
        bt_pie1_s = bt_pie1_s + current[8];
        bt_pie1_b = bt_pie1_b + current[2];

        bt_pie1_s = bt_pie1_b - bt_pie1_s;

        var c = (bt_pie1_b / 100);
        var s = (bt_pie1_s / c);
        var d = 100 - s;

        s = s.toFixed(2);
        d = d.toFixed(2);

        var trace1 = {
            values: [s, d],
            //labels: ['Недосдача', 'Получено'],
            //marker: { 'colors': ['03a476', 'dd904c'] },
            //values: [30, 70],
            labels: ['Недосдача ' + bt_pie1_s.toFixed(2) + ' кВат', 'Получено'],
            marker: { 'colors': ['f8d200', 'b944d2'] },

            //marker: { 'colors': ['906088', '3c5663'] },
            domain: {
                x: [0, 1.0]
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
            legend: {
                x: 0,
                y: -200
            },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            width: 500
        };

        var data = [trace1];
        Plotly.newPlot('dt_tp_pie1', data, layout);

    });
    //table3.fnSort([[0,'asc']]);

    //$("#dp_tp_table1 tbody").click('click', 'td', function () {

        //bt_pie1_s = 0;
        //bt_pie1_b = 0;
        //current = table1_dp_tp.row(this).data();
        //bt_pie1_s = bt_pie1_s + current[8];
        //bt_pie1_b = bt_pie1_b + current[2];

        //bt_pie1_s = bt_pie1_b - bt_pie1_s;

        //var c = (bt_pie1_b / 100);
        //var s = (bt_pie1_s / c);
        //var d = 100 - s;

        //s = s.toFixed(2);
        //d = d.toFixed(d);

        //var trace1 = {
        //    values: [s, d],
        //    //labels: ['Недосдача', 'Получено'],
        //    //marker: { 'colors': ['03a476', 'dd904c'] },
        //    //values: [30, 70],
        //    labels: ['Недосдача', 'Получено'],
        //    marker: { 'colors': ['f8d200', 'b944d2'] },

        //    //marker: { 'colors': ['906088', '3c5663'] },
        //    domain: {
        //        x: [0, 1.0]
        //    },
        //    name: '',
        //    hoverinfo: 'label+percent+name',
        //    hole: .6,
        //    type: 'pie'
        //};

        //var layout = {
        //    title: '',
        //    font: {
        //        family: 'Arial',
        //        size: 12,
        //        color: '#fff',
        //    },
        //    legend: {
        //        x: 0,
        //        y: -200
        //    },
        //    paper_bgcolor: 'transparent',
        //    plot_bgcolor: 'transparent',
        //    width: 500
        //};

        //var data = [trace1];
        //Plotly.newPlot('dt_tp_pie1', data, layout);

        //alert(table3.cell(this).data());
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////
    var trace1 = {
        x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mode: 'lines',
        name: 'Отпущено кВт',
        marker: {
            color: '#1cc2ff'
        },
    };
    var trace2 = {
        x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mode: 'lines',
        name: 'Получено кВт',
        marker: {
            color: '#fac363'
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
            t: 50,
            b: 100
        },
        legend: {
            x: 0.25,
            y: 22
        }
    };

    var data = [trace1, trace2];
    Plotly.newPlot('home_chart1', data, layout);

    //var data = [trace1, trace2];
    //Plotly.newPlot('dt_tp_chart1', data, layout);

    var trace1 = {
        x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //fill: 'tozeroy',
        mode: 'lines',
        name: '',
        marker: {
            color: 'blue'
        }
    };
    var trace2 = {
        x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //fill: 'tozeroy',
        mode: 'lines',
        //name: 'Получено',
        marker: {
            color: 'green'
        }
    };

    var layout = {
        //title: 'Детальный график по показателям <b style="color: #1cc2ff">A+</b>, <b style="color: #fac363">A-</b>, <b style="color: #e1ff14">|A|</b>, <b style="color: #ff0000">|R|</b>, <b style="color: #ff00ea">R+</b>, <b style="color: #00fff6">R-</b>',
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
            t: 40,
            b: 30
        },
    };

    var data = [trace1];
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

    ///////////////////////// Create and initialize dp_met_table4 (Meter details) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    table4_dp_tp = $("#dp_tp_table4").DataTable({
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
          { "width": "4%", "targets": 0 }, { "width": "12%", "targets": 1, "orderable": false }, { "width": "14%", "targets": 2 }, { "width": "14%", "targets": 3 },
          { "width": "14%", "targets": 4 }, { "width": "14%", "targets": 5 }, { "width": "14%", "targets": 6 }, { "width": "14%", "targets": 7 },
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

    $("#dp_tp_table4 tbody").on('dblclick', 'tr', function () {
        $("#home_drop").css('display', 'none');
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_met").css("display", "block"); // +
        $("#detail_pan_cons").css("display", "none");
        $("#detail_pan_dcu").css("display", "none");
        $("#detail_pan_tp").css("display", "none");
        //BuildTaskArr
        //DrawVector(0, 120, 240, 30, 80, 50);
        $("#search_met").css('z-index', '0');
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', 'static');
        $("#t2_header_back").css('display', 'none');

        var sdt = $("#dp_tp_date1_start").val();
        var edt = $("#dp_tp_date1_end").val();

        $("#dp_det_met_date1_start").val(sdt);
        $("#dp_det_met_date1_end").val(edt);
        //
        var s1 = sdt.substring(0, 2);
        var s2 = sdt.substring(3, 5);
        var s3 = sdt.substring(6, 10);
        sdate = s3 + "" + s1 + "" + s2;
        //
        var s1 = edt.substring(0, 2);
        var s2 = edt.substring(3, 5);
        var s3 = edt.substring(6, 10);
        edate = s3 + "" + s1 + "" + s2;
        //
        var current = table4_dp_tp.row(this).data();
        var mid = current[1];
        //alert(sdate + "   " + edate + "   " + mid);
        MeterDetailsChart(sdate, edate, mid);
    });

    




    $(function () {
        $("#dp_tp_date1_start").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
            onClose: function () {
                $("#dp_tp_date1_end").datepicker("show");
            }
        });
        $("#dp_tp_date1_end").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
        });
    });

    $("#dp_tp_date1_end").change(function () {
        var dt = $("#dp_tp_date1_start").val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt_start = s3 + "" + s1 + "" + s2;

        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt_end = s3 + "" + s1 + "" + s2;

        //alert(dt_start);
        //alert(dt_end);

        BadTableGetMetPeriod(dt_start, dt_end);
    })

    //table3.fnSort([[0,'asc']]);

    //$("#table3 tbody").click( 'click', 'td', function () {
    //    alert( table3.cell( this ).data() );
    //});

    // calendar for TP table //3
    //var log_cons_date2 = false;
    //$(function () {
    //    var dateFormat = "dd.mm.yy",

    //    from = $("#dp_tp_date1_start").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
    //        .on("change", function () {
    //            to.datepicker("option", "minDate", getDate(this));
    //        }).datepicker("setDate", new Date()),

    //        to = $("#dp_tp_date1_end").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
    //        .on("change", function () {
    //            from.datepicker("option", "maxDate", getDate(this));
    //        }).datepicker("setDate", new Date());

    //    function getDate(element) {
    //        var date;
    //        try {
    //            date = $.datepicker.parseDate(dateFormat, element.value);
    //        } catch (error) {
    //            date = null;
    //        }
    //        return date;
    //    }
    //    //
    //    $("#dp_tp_date1_start").click(function () {
    //        if (log_cons_date2 == false) {
    //            $(this).val("");
    //            $("#dp_tp_date1_end").val("");
    //            log_cons_date2 = true;
    //        }
    //    })
    //    $("#dp_tp_date1_end").click(function () {
    //        if (log_cons_date2 == false) {
    //            $(this).val("");
    //            $("#dp_tp_date1_start").val("");
    //            log_cons_date2 = true;
    //        }
    //    })
    //});
    //$("#dp_tp_date1_start").datepicker({
    //    onClose: function () {
    //        $("#dp_tp_date1_end").datepicker("show");
    //    }
    //});
    ////calendar for TP details end //

    //// calendar for DCU details start //3
    //var log_cons_date2 = false;
    //$(function () {
    //    $("#dp_det_dcu_date1_end").datepicker();
    //    $("#dp_det_dcu_date1_start").datepicker();

    //    //
    //    $("#dp_det_dcu_date1_start").click(function () {
    //        if (log_cons_date2 == false) {
    //            $(this).val("");
    //            $("#dp_det_dcu_date1_end").val("");
    //            log_cons_date2 = true;
    //        }
    //    })
    //    $("#dp_det_dcu_date1_end").click(function () {
    //        if (log_cons_date2 == false) {
    //            $(this).val("");
    //            $("#dp_det_dcu_date1_start").val("");
    //            log_cons_date2 = true;
    //        }
    //    })
    //});
    //$("#dp_det_dcu_date1_start").datepicker({
    //    onClose: function () {
    //        $("#dp_det_dcu_date1_end").datepicker("show");
    //    }
    //});
    //// calendar for DCU details end //

    //// calendar for Meters details start //3
    //var log_cons_date3 = false;
    //$(function () {
    //    var dateFormat = "dd.mm.yy",

    //    from = $("#dp_det_met_date1_start").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
    //    .on("change", function () {
    //        to.datepicker("option", "minDate", getDate(this));
    //    }).datepicker("setDate", new Date()),

    //    to = $("#dp_det_met_date1_end").datepicker({ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
    //    .on("change", function () {
    //        from.datepicker("option", "maxDate", getDate(this));
    //    }).datepicker("setDate", new Date());

    //    function getDate(element) {
    //        var date;
    //        try {
    //            date = $.datepicker.parseDate(dateFormat, element.value);
    //        } catch (error) {
    //            date = null;
    //        }
    //        return date;
    //    }
    //    //
    //    $("#dp_det_met_date1_start").click(function () {
    //        if (log_cons_date3 == false) {
    //            $(this).val("");
    //            $("#dp_det_met_date1_end").val("");
    //            log_cons_date3 = true;
    //        }
    //    })
    //    $("#dp_det_met_date1_end").click(function () {
    //        if (log_cons_date3 == false) {
    //            $(this).val("");
    //            $("#dp_det_met_date1_start").val("");
    //            log_cons_date3 = true;
    //        }
    //    })
    //});
    //$("#dp_det_met_date1_start").datepicker({
    //    onClose: function () {
    //        $("#dp_det_met_date1_end").datepicker("show");
    //    }
    //});
    //// calendar for Meters details end //

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
        title: 'График превышения максимальной нагрузки',
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
    //$("#login").click(function () {
    //    $("#login_screen").fadeOut(800);
    //})

    ///////////////////////// Create and initialize home table1 (home page) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    table1_home = $("#home_table1").DataTable({
        "order": [[ 0, "asc" ]],
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
          //{ "width": "1%", "targets": 0 }, { "width": "10%", "targets": 1 }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 },
          //{ "width": "1%", "targets": 4 },
        ]
    });

    // Select row
    $("#home_table1 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            //alert();
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '0');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#rightm_div").css("display", "none");
            //$("#details_pan").css("left", "62px");
            $("#detail_pan_tp").css("display", "block");
            $("#detail_pan_dcu").css("display", "none");
            $("#detail_pan_cons").css("display", "none");
            $("#detail_pan_met").css("display", "none");
        }
        else {
            table1_home.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $("#home_table1 tbody").on('dblclick', 'tr', function () {
        //if ($(this).hasClass('selected')) {
            $("#ht1_header").css('display', 'none');
            $("#ht2_header").css('display', 'none');
            $("#ht3_header").css('display', 'none');
            $(this).removeClass('selected');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('z-index', '0');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('position', "fixed");
            $("#rightm_div").css("display", "none");
            $("#details_pan").css("left", "62px");
            $("#detail_pan_tp").css("display", "block");
            $("#detail_pan_dcu").css("display", "none");
            $("#detail_pan_cons").css("display", "none");
            $("#detail_pan_met").css("display", "none");
        //}
        //else {
        //    table1_home.$('tr.selected').removeClass('selected');
        //    $(this).addClass('selected');
        //}
    });
    //table3.fnSort([[0,'asc']]);

    $("#home_table1 tbody").on('click', 'td', function () { 
        var current = table1_home.row(this).data();
        BadTableBalance(current[1]);
        $("#tp_det_title").text(current[1]);
        var p = table1_home.row(this).index();
        var c2 = current[2] + "";
        var c3 = current[3] + "";
        if (c2.indexOf("<") == 0) {
            c2 = c2.substr(c2.indexOf(">") + 1, c2.length);
            c2 = c2.substr(0, c2.indexOf("<"));
            c3 = c3.substr(c3.indexOf(">") + 1, c3.length);
            c3 = c3.substr(0, c3.indexOf("<"));
            SingleCountPieB(c2, c3);
            var total_log = 1;
            SingleChartBuild(table1_home.rows().count());
        } else {
            SingleCountPieB(c2, c3);
            var total_log = 0;
            SingleChartBuild(p);
        }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////


    ////
    //var trace1 = {
    //    values: [30, 20, 50],
    //    labels: ['', '', ''],
    //    marker: { 'colors': ['#cd9b9a', '#a5308b', '#03a476'] },
    //    domain: {
    //        x: [0, 15.0]
    //    },
    //    name: '',
    //    hoverinfo: 'label+percent+name',
    //    hole: .6,
    //    type: 'pie'
    //};

    //var layout = {
    //    title: '',
    //    font: {
    //        family: 'Arial',
    //        size: 12,
    //        color: '#fff',
    //    },
    //    showlegend: false,
    //    paper_bgcolor: 'transparent',
    //    plot_bgcolor: 'transparent',
    //    width: 500
    //};

    //var data = [trace1];
    //Plotly.newPlot('home_chart2', data, layout);



    ////////////////////////////////////////////////////////////////////////////////////////////////

    //
    
    //
    //

    //
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //var trace1 = {
    //    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    //    y: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
    //    fill: 'none',
    //    mode: 'lines',
    //    name: 'Порог',
    //    marker: {
    //        color: '#f0ff00'
    //    },
    //};
    //var trace2 = {
    //    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    //    y: [10, 28, 62, 35, 45, 57, 48, 35, 18, 40, 55, 60, 43, 31, 45, 55, 60, 43, 45, 57, 48, 35, 18, 10, 28, 62, 55, 35, 29, 18],
    //    fill: 'tozeroy',
    //    mode: 'lines',
    //    name: 'Показания',
    //    area: 'fill',
    //    marker: {
    //        color: '#00eb27'
    //    }
    //};
    //var trace3 = {
    //    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    //    y: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    //    fill: 'none',
    //    mode: 'lines',
    //    name: 'Показания',
    //    marker: {
    //        color: 'red'
    //    }
    //};
    //var trace4 = {
    //    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    //    y: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
    //    fill: 'none',
    //    mode: 'lines',
    //    name: 'Показания',
    //    marker: {
    //        color: 'blue'
    //    }
    //};
    ////var trace3 = {
    ////    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 
    ////    y: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    ////    fill: 'none',
    ////    mode: 'lines',
    ////    name: 'РџРѕРєР°Р·Р°РЅРёСЏ',
    ////    marker:{
    ////        color: 'transparent'
    ////    }
    ////};

    //var layout = {
    //    title: 'Уровень сигнала',
    //    font: {
    //        family: 'Arial',
    //        size: 12,
    //        color: '#fff'
    //    },
    //    xaxis: {
    //        zeroline: false,
    //        showline: true,
    //        showgrid: true,
    //        showticklabels: true,
    //        gridcolor: '#666666',
    //        linecolor: '#666666',
    //        ticks: 'outside',
    //        tickcolor: '#fff',
    //        tickwidth: 2,
    //        ticklen: 5,
    //        tickfont: {
    //            family: 'Arial',
    //            size: 12,
    //            color: '#fff'
    //        }
    //    },
    //    yaxis: {
    //        zeroline: false,
    //        showline: true,
    //        showgrid: true,
    //        showticklabels: true,
    //        gridcolor: '#666666',
    //        linecolor: '#666666',
    //        ticks: 'outside',
    //        tickcolor: '#fff',
    //        tickwidth: 2,
    //        ticklen: 5,
    //    },
    //    legend: {
    //        x: 0,
    //        y: 100
    //    },
    //    height: 350,
    //    paper_bgcolor: 'transparent',
    //    plot_bgcolor: 'transparent',
    //    margin: {
    //        //autoexpand: true,
    //        l: 50,
    //        r: 20,
    //        t: 80,
    //        b: 70
    //    },
    //};
    //var data = [trace2];
    //Plotly.newPlot('home_chart3', data, layout);

    //htchartsignal

    ///////////////////////// Create and initialize home table2_home (home page) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    table2_home = $("#home_table2").DataTable({
        "order": [[ 0, "asc" ]],
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
          { "width": "1%", "targets": 0 }, { "width": "8%", "targets": 1 }, { "width": "1%", "targets": 2 }, { "width": "1%", "targets": 3 }, { "width": "1%", "targets": 4 },
          { "width": "2%", "targets": 5 }, { "width": "5%", "targets": 6 }
        ]
    });
    // Select row
    $("#home_table2 tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            //$("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
            //$("#table_div1").css("display", "none");
            //$("#table_div3").css("display", "none");
            //$("#table_div4").css("display", "none");
            //$("#table_div5").css("display", "none");
            //$("#table_div6").css("display", "none");
            //$("#table_div7").css("display", "none");
            //$("#table_div8").css("display", "none");
            //$("#home").css("display", "none");

            //$("#table_div2").fadeIn("slow");
            //$("#table2").css("width", "175%");
            //$("#table2").css("height", "100%");
            //$("#table6").css("width", "150%");
            //$("#table6").css("height", "100%");
            ////MalibuLineTopOn();
            ////setTimeout(MalibuLineTopOff, 680);
            //$("#scroll_l").css("display", "none");
            //$("#scroll_r").css("display", "none");
            //$("#det_met").css("display", "block");
            //$("#det_dcu").css("display", "none");
            //$("#det_cons").css("display", "none");
            //$("#det_access").css("display", "none");
            //$("#det_struct").css("display", "none");
            //$("#rightm_div").css("display", "none");
            //$("#dropbox2_1 p").text("Операции");
            //$("#details_pan").css("left", "-5000px");
        }
        else {
            table2_home.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $("#home_table2 tbody").on('dblclick', 'td', function () {
        selected_gr_id = "";
        selected_gr_gb = "";
        var current = table2_home.row(this).data();
        selected_dcu = current[2];
        $("#dcu_loader").css('display', 'block');
        $("#meter_loader").css('display', 'block');
        $("#consumer_loader").css('display', 'block');

        // load meters
        //alert(selected_dt_m);
        //alert(selected_dt_c);
        //alert(selected_dt_c_end);

        if (selected_dt_m == null) {
            var dt = new Date();
            var dt_m = dt.getMonth() + 1;
            var dt_d = dt.getDate();
            if (dt_d != 1 && dt_d != 2) {
                dt_d = dt_d - 2;
            }
            var dt_y = dt.getFullYear();
            var fdt_m = dt_m;
            if (dt_m < 10) {
                fdt_m = "0" + fdt_m;
            }
            var fdt_d = dt_d;
            if (dt_d < 10) {
                fdt_d = "0" + fdt_d;
            }
            //$("#met_day_date").val(fdt_d + "." + fdt_m + "." + dt_y);
            selected_dt_m = dt_y + "" + fdt_m + "" + fdt_d;
        }

        if (selected_dt_c == null && selected_dt_c_end == null) {
            var dt = new Date();
            var dt_m = dt.getMonth() + 1;
            var dt_d = dt.getDate();
            if (dt_d != 1 && dt_d != 2) {
                dt_d = dt_d - 2;
            }
            var dt_y = dt.getFullYear();
            var fdt_m = dt_m;
            if (dt_m < 10) {
                fdt_m = "0" + fdt_m;
            }
            var fdt_d = dt_d;
            if (dt_d < 10) {
                fdt_d = "0" + fdt_d;
            }
            //$("#cons_start_date_main").val(fdt_d + "." + fdt_m + "." + dt_y);
            //$("#cons_end_date_main").val(fdt_d + "." + fdt_m + "." + dt_y);
            //$("#t3_hdt").text(fdt_d + "." + fdt_m + "." + dt_y);
            //$("#t3_hdt2").text(fdt_d + "." + fdt_m + "." + dt_y);
            selected_dt_c = dt_y + "" + fdt_m + "" + fdt_d;
            selected_dt_c_end = dt_y + "" + fdt_m + "" + fdt_d;
        }


        //GetMetersCount(selected_dcu, selected_dt_m);

        //if (active_dcu_btn == false) {
        active_dcu_btn = true;
        //
        arr_m_log = false;
        arr_m_rev_log = false;
        highlight_m = false;
        arr_m = [];
        arr_m_res = [];
        load_m_res = [];
        join_m_it = 0;
        //table2.clear().draw();
        join_m_it = setInterval(DeployMeterList, 1000);
        c_arr_m_log = false;
        c_arr_m_rev_log = false;
        c_arr_m = [];
        c_arr_m_res = [];
        c_load_m_res = [];
        c_join_m_it = 0;
        //table2.clear().draw();
        c_join_m_it = setInterval(DeployConsumerList, 1000);

        $("#lm1").hide();
        $("#lm2").hide();
        $("#lm4").hide();
        $("#lm3").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
        //
        $("table.dataTable thead .sorting,table.dataTable thead .sorting_asc,table.dataTable thead .sorting_desc,table.dataTable thead .sorting_asc_disabled,table.dataTable thead .sorting_desc_disabled").css('top', '0px');
        $("#table_div1").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        $("#table_div9").css("display", "none");
        $("#table_div10").css("display", "none");
        $("#table_div11").css("display", "none");
        $("#table_div_g").css("display", "none");
        $("#home").css("display", "none");

        $("#table_div2").fadeIn("slow");
        $("#table2").css("width", "175%");
        $("#table2").css("height", "100%");
        $("#table6").css("width", "150%");
        $("#table6").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#det_met").css("display", "block");
        $("#det_dcu").css("display", "none");
        $("#det_consumers").css("display", "none");
        $("#det_user").css("display", "none");
        $("#det_cons").css("display", "none");
        $("#det_access").css("display", "none");
        $("#det_gas_gprs").css("display", "none");
        $("#det_struct").css("display", "none");
        $("#rightm_div").css("display", "none");
        $("#dropbox2_1 p").text("Операции");
        $("#details_pan").css("left", "-5000px");
    });

    $("#home_table2 tbody").on('click', 'td', function () {
        var current = table2_home.row(this).data();
        var c3 = current[3] + "";
        var c4 = current[4] + "";
        var c6 = current[6] + "";
        if (c3.indexOf("<") == 0) {
            c3 = c3.substr(c3.indexOf(">") + 1, c3.length);
            c3 = c3.substr(0, c3.indexOf("<"));
            c4 = c4.substr(c4.indexOf(">") + 1, c4.length);
            c4 = c4.substr(0, c4.indexOf("<"));
            c6 = c6.substr(c6.indexOf(">") + 1, c6.length);
            c6 = c6.substr(0, c6.indexOf("<"));
            //
            SingleCountPies123(c3, c4, c6);
        } else {
            SingleCountPies123(current[3], current[4], current[6]);
        }
    });
    //table3.fnSort([[0,'asc']]);

    //$("#home_table2 tbody").click('click', 'td', function () {
    //    //alert(table3.cell(this).data());
    //    //var current = table2_home.rows().data();
    //    //alert(current);
    //    //var a = table2_home.cell(i, 4).data(a_read).draw();
    //});
    ///////////////////////// Create and initialize home table2 (home page) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    table3_home = $("#home_table3").DataTable({
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

    $("#home_table3 tbody").on('click', 'td', function () {
        var current = table3_home.row(this).data();
        var c2 = current[2] + "";
        var c3 = current[3] + "";
        if (c2.indexOf("<") == 0) {
            c2 = c2.substr(c2.indexOf(">") + 1, c2.length);
            c2 = c2.substr(0, c2.indexOf("<"));
            c3 = c3.substr(c3.indexOf(">") + 1, c3.length);
            c3 = c3.substr(0, c3.indexOf("<"));
            SingleCountPie4(c2, c3);
        } else {
            SingleCountPie4(c2, c3);
        }
    });

    //calendar for home page
    var log_home_date1 = false;
    $(function () {
        $("#home_date").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
        });
        $("#home_date_start").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
            onClose: function () {
                $("#home_date_end").datepicker("show");
            }
        });
        $("#home_date_end").datepicker({
            numberOfMonths: 3,
            maxDate: 0,
        });
    });



    $("#home_date").change(function () {
        $("#home_date").datepicker("hide");
        rb_ht1_log = false;
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt = s3 + "" + s1 + "" + s2;
        //var text_date = s2 + "." + s1 + "." + s3;
        selected_dt_hp = dt;
        //$(this).val(text_date);
        //alert(dt);
        table2_home.clear().draw();
        table3_home.clear().draw();
        InitHomeTable2();
        allow_ht_ld = true;
        //interval = setInterval(InitHomeTable2, 600);
        //BalanceHTPie();
    })

    $("#home_date_start").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt_s = s3 + "" + s1 + "" + s2;
        //var text_date = s2 + "." + s1 + "." + s3;
        //var text_date = s2 + "." + s1 + "." + s3;
        //$(this).val(text_date);
        selected_dt_hp_start = dt_s;
    })

    $("#home_date_end").change(function () {
        var dt = $(this).val();
        var s1 = dt.substring(0, 2);
        var s2 = dt.substring(3, 5);
        var s3 = dt.substring(6, 10);
        dt_e = s3 + "" + s1 + "" + s2;
        ////var text_date = s2 + "." + s1 + "." + s3;
        //var text_date = s2 + "." + s1 + "." + s3;
        ////$(this).val(text_date);
        selected_dt_hp_end = dt_e;
        labels = [];
        vals = [];
        summa = [];
        balance = [];
        temp_summa = [];
        temp_balance = [];
        obj_arr = [];
        n_i = 0;
        g_i = 0;
        p_b = 0;
        p_s = 0;
        p_d = 0;
        arr_ht1 = [];
        InitHomeTable1();
    })

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
