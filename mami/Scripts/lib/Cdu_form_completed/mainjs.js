
function MalibuLineTopOff(){
    $("#malibu_lt").css("background", "url('/files/malibu_const_top.gif')");
    //$("#malibu_ll").css("background", "url('/files/malibu_const_vert.gif')");
    //$("#malibu_lr").css("background", "url('/files/malibu_const_vert.gif')");
}
function MalibuLineTopOn(){
    $("#malibu_lt").css("background", "url('/files/malibu_run_top.gif')");
    //$("#malibu_ll").css("background", "url('/files/malibu_run_vert.gif')");
    //$("#malibu_lr").css("background", "url('/files/malibu_run_vert.gif')");
}
function MalibuLineSideOff(){
    $("#malibu_lt").css("background", "url('/files/malibu_const_vert.gif')");
    //$("#malibu_ll").css("background", "url('/files/malibu_const_vert.gif')");
    //$("#malibu_lr").css("background", "url('/files/malibu_const_vert.gif')");
}
function MalibuLineSideOn(){
    $("#malibu_lt").css("background", "url('/files/malibu_run_vert.gif')");
    //$("#malibu_ll").css("background", "url('/files/malibu_run_vert.gif')");
    //$("#malibu_lr").css("background", "url('/files/malibu_run_vert.gif')");
}
$(document).ready(function(){
    var log1 = false;
    var log2 = false;
    var log3 = false;
    var n_gl = 0;
    
    $("#close_pw_wnd").click(function(){
        $("#form_change_pw").fadeOut(400);    
    })
    $("#form_change_pw button:eq(1)").click(function(){
        $("#form_change_pw").fadeOut(400);    
    })
    $( "#form_change_pw" ).draggable();     
    $(function() {
        $('#jstree').perfectScrollbar();
        // with vanilla JS!
        Ps.initialize(document.getElementById('jstree'));
    });
    
    $("#hide_right_bar").click(function(){
        $("#rightm_div").fadeOut(700);
    })
    //setTimeout(progress1, 10);
    
    var tw = $("#hwnd").width();
    var a = tw/2;
    var th = $("#hwnd").height();
    var b = (tw/2)-40;
    $("#scroll_l").css("left", a);
    $("#scroll_r").css("left", a+40);
    $("#scroll_l").css("top", b);
    $("#scroll_r").css("top", b);
    
    
    $("#right_div").click(function(){
        //$("#left_div").fadeOut(200);
        //splitter.collapse(0);
        $("#right_div").hide(600);
        //alert();
    })
    
    $("#tree_show_btn").click(function(){
        if (log1 == false) {
            $(".splitter_panel .vsplitter").css("width", "0px");
            $("#tree_show_btn").css("margin-left", "3px");
            splitter.position(0);
            $("#table1").css("width", "100%");
            $("#table2").css("width", "150%");
            log1 = true;
        }else{
            $(".splitter_panel .vsplitter").css("width", "3px");
            splitter.position(331);
            $("#tree_show_btn").css("margin-left", "324px");
            log1 = false;
        }
    })
    //Andrew code

    //end
    $("#settings_show_btn").click(function(){
        if (log2 == false) {
            $("#rightm_div").fadeIn('slow');
            $(this).css("left", "69.2%");
            log2 = true;
        }else{
            //alert();
            $("#rightm_div").fadeOut('slow');
            $(this).css("left", "99.3%");
            log2 = false;
        }
    })
    $("#jstree_show_btn").click(function(){
        if (log3 == false) {
            $("#leftm_div").fadeIn('slow');
            $(this).css("left", "34.1%");
            log3 = true;
        }else{
            //alert();
            $("#leftm_div").fadeOut('slow');
            $(this).css("left", "4.1%");
            log3 = false;
        }
    })
    
    
    
    /////////////////////////////////////////////////////////////

    //////////////////////// Device Menu ///////////////////
    var cur_table = 0;
    $("#dcu").click(function(){
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
    })
    $("#dcu").mouseover(function(){
        $("#dcu p").css("color", "#48abe1");
    })
    $("#dcu").mouseout(function(){
        $("#dcu p").css("color", "#fff");
    })
    
    $("#meter").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
    $("#meter").mouseover(function(){
        $("#meter p").css("color", "#48abe1");
    })
    $("#meter").mouseout(function(){
        $("#meter p").css("color", "#fff");
    })
    $("#met_event_rd2").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
    $("#met2_event_rd2").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
    
    $("#consumer").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
    $("#consumer").mouseover(function(){
        $("#consumer p").css("color", "#48abe1");
    })
    $("#consumer").mouseout(function(){
        $("#consumer p").css("color", "#fff");
    })
    
    $("#org").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
    $("#org").mouseover(function(){
        $("#org p").css("color", "#ffd800");
    })
    $("#org").mouseout(function(){
        $("#org p").css("color", "#fff");
    })
    
    $("#access").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
    $("#access").mouseover(function(){
        $("#access p").css("color", "#ffd800");
    })
    $("#access").mouseout(function(){
        $("#access p").css("color", "#fff");
    })
    
    $("#renergy").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
    $("#renergy").mouseover(function(){
        $("#renergy p").css("color", "#c949e4");
    })
    $("#renergy").mouseout(function(){
        $("#renergy p").css("color", "#fff");
    })

    $("#mevent").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
    $("#mevent").mouseover(function(){
        $("#mevent p").css("color", "#c949e4");
    })
    $("#mevent").mouseout(function(){
        $("#mevent p").css("color", "#fff");
    })
    $("#event_met_rd1").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        $("#table_div8").css("display", "none");
        
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
        $("#event_met_rd1").removeAttr("checked");
    })
    
    $("#demand").mouseover(function(){
        $("#demand p").css("color", "#c949e4");
    })
    $("#demand").mouseout(function(){
        $("#demand p").css("color", "#fff");
    })
    
    $("#usage").click(function(){
        $("#table_div1").css("display", "none");
        $("#table_div2").css("display", "none");
        $("#table_div3").css("display", "none");
        $("#table_div4").css("display", "none");
        $("#table_div5").css("display", "none");
        $("#table_div6").css("display", "none");
        $("#table_div7").css("display", "none");
        
        $("#table_div8").fadeIn("slow");
        $("#table8").css("width", "100%");
        $("#table8").css("height", "100%");
        //MalibuLineTopOn();
        //setTimeout(MalibuLineTopOff, 680);
        $("#scroll_l").css("display", "none");
        $("#scroll_r").css("display", "none");
        $("#rightm_div").css("display", "none");
    })
    $("#usage").mouseover(function(){
        $("#usage p").css("color", "#c949e4");
    })
    $("#usage").mouseout(function(){
        $("#usage p").css("color", "#fff");
    })
    
    $("#conf").mouseover(function(){
        $("#conf p").css("color", "#00ff05");
    })
    $("#conf").mouseout(function(){
        $("#conf p").css("color", "#fff");
    })
    
    $("#pass").mouseover(function(){
        $("#pass p").css("color", "#00ff05");
    })
    $("#pass").mouseout(function(){
        $("#pass p").css("color", "#fff");
    })
    $("#pass").click(function(){
        $("#form_change_pw").fadeIn(400);
    })
    
    
    $("#btn_system").mouseover(function(){
        $("#btn_system p").css("color", "#00ff05");
    })
    $("#btn_system").mouseout(function(){
        $("#btn_system p").css("color", "#fff");
    })
    
    $("#btn_hierar").mouseover(function(){
        $("#btn_hierar p").css("color", "#ffd800");
    })
    $("#btn_hierar").mouseout(function(){
        $("#btn_hierar p").css("color", "#fff");
    })
    
    $("#btn_device").mouseover(function(){
        $("#btn_device p").css("color", "#48abe1");
    })
    $("#btn_device").mouseout(function(){
        $("#btn_device p").css("color", "#fff");
    })
    
    $("#btn_read").mouseover(function(){
        $("#btn_read p").css("color", "#c949e4");
    })
    $("#btn_read").mouseout(function(){
        $("#btn_read p").css("color", "#fff");
    })
    
    var cur_val_t3;
    /////////////////////////// show rightm_div /////////////////////////////////
    $("#table1").click(function(){
        $("#rightm_div").fadeIn(700);
    });
    $("#table2 td").click(function(){
        $("#rightm_div").fadeIn(700);
    });
    $("#table2 td").dblclick(function(){
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_met").css("display", "block");
        $("#detail_pan_cons").css("display", "none");
    })
    $("#table3 td").click(function(){
        //cur_val_t3 = $(this).html();
        //alert(cur_val_t3);
        //var Something = $(this).closest('tr').find('td:eq(1)').val();
        //alert(Something);
        $("#rightm_div").fadeIn(700);
    });
    //$('#example tbody').on( 'click', 'td', function () {
    //    alert( table.cell( this ).data() );
    //});
    $("#table3 td").dblclick(function(){
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "62px");
        $("#detail_pan_cons").css("display", "block");
        $("#detail_pan_met").css("display", "none");
    });
    $("#table4").click(function(){
        $("#rightm_div").fadeIn(700);
    });
    $("#table5").click(function(){
        $("#rightm_div").fadeIn(700);
    });
    //////////////////////////// Split div ///////////////////////////////////////
    var spl_h = $("#spl").css('height');
    var splitter = $('#spl').height(spl_h).split({
        orientation: 'vertical',
        limit: 0,
        position: '0%', // if there is no percentage it interpret it as pixels
        onDrag: function(event) {
            //ssconsole.log(splitter.position());
            //alert();
            $("#tree_show_btn").css("margin-left", splitter.position()-7);
        }
    });
    /////////////////////////////////////////////////////////////////////////////
    
    //$.jstree.defaults.core.themes.variant = "small";
    //$.jstree.defaults.core.themes.stripes = true;
    //$.jstree.defaults.core.themes.variant = true;
    
    //$("#jstree").jstree({
    //  "plugins" : [ "wholerow", "checkbox", "types"]
    //});
    $.jstree.defaults.core.themes.icons = true;
    $.jstree.defaults.core.themes.stripes = true;
    $.jstree.defaults.core.themes.ellipsis = true;
    $.jstree.defaults.core.themes.dots = false;
    $.jstree.defaults.core.expand_selected_onload = true;
    $.jstree.defaults.core.themes.variant = "small";
    $.jstree.defaults.checkbox.keep_selected_style = false;
    $('#jstree').jstree();
    
    $("#btn_system").click(function(){
        $("#lm2").hide();
        $("#lm3").hide();
        $("#lm4").hide();
        $("#lm1").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    })
    $("#btn_hierar").click(function(){
        $("#lm1").hide();
        $("#lm3").hide();
        $("#lm4").hide();
        $("#lm2").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    })
    $("#btn_device").click(function(){
        $("#lm1").hide();
        $("#lm2").hide();
        $("#lm4").hide();
        $("#lm3").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    })
    $("#btn_read").click(function(){
        $("#lm1").hide();
        $("#lm2").hide();
        $("#lm3").hide();
        $("#lm4").fadeIn("slow");
        $(".splitter_panel .vsplitter").css("width", "0px");
    })
    
    ///////////////////////// Create and initialize table1 (DCU) ///////////////////////////////////
    var h = $("#table_div1").height();
    var i = (h%35);
    //alert(i);
    var table1 = $("#table1").dataTable({
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
                $(row).removeClass('myodd myeven');
                 $(row).addClass('myeven');
            }
        },
        "pageLength": i,
        "paging": true,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
          { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1 }, { "width": "3%", "targets": 2 }, { "width": "15%", "targets": 3 },
          { "width": "7%", "targets": 4 }, { "width": "5%", "targets": 5 }, { "width": "15%", "targets": 6 }, { "width": "3%", "targets": 7 }, { "width": "3%", "targets": 8 }
        ]
    });
    // Select row
    $("#table1 tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table1.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////
    
    ///////////////////////// Create and initialize table2 (Meters) ///////////////////////////////////
    var h = $("#table_div2").height();
    var i = (h/35);
    var z = i.toFixed(0)-6;
    //alert(z);
    var table2 = $("#table2").dataTable({
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
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
          { "width": "1%", "targets": 0}, { "width": "1%", "targets": 1, "orderable": false}, { "width": "1%", "targets": 2, "orderable": false  }, { "width": "3%", "targets": 3, "orderable": false  },
        //  { "width": "7%", "targets": 4 }, { "width": "7%", "targets": 5 }, { "width": "20%", "targets": 6 }, { "width": "35%", "targets": 7 },
        //  { "width": "6%", "targets": 8 }, { "width": "6%", "targets": 9 }, { "width": "6%", "targets": 10 }, { "width": "6%", "targets": 11 },
        //  { "width": "6%", "targets": 12 }, { "width": "6%", "targets": 13 }, { "width": "6%", "targets": 14 }, { "width": "6%", "targets": 15 },
        //  { "width": "6%", "targets": 16 }, { "width": "6%", "targets": 17 }
        ]        
    });
    // Select row
    $("#table2 tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table2.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    ///////////////////////////////////////////////////////////    
    
    ///////////////////////// Create and initialize table3 (Consumer) ///////////////////////////////////
    var h = $("#table_div3").height();
    var i = (h/38);
    var z = i.toFixed(0)-1;
    //alert(z);
    var table3 = $("#table3").dataTable({
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
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
          { "width": "1%", "targets": 0 }, { "width": "1%", "targets": 1, "orderable": false }, { "width": "3%", "targets": 2, "orderable": false }, { "width": "8%", "targets": 3 },
          { "width": "20%", "targets": 4 }, { "width": "30%", "targets": 5 }, { "width": "8%", "targets": 6 }, { "width": "6%", "targets": 7 },
          { "width": "6%", "targets": 8 }, { "width": "6%", "targets": 9 }
        ]
    });
    // Select row
    $("#table3 tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
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
    var i = (h/35);
    var z = i.toFixed(0)-1;
    //alert(z);
    var table4 = $("#table4").dataTable({
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
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
    $("#table4 tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
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
    var i = (h/35);
    var z = i.toFixed(0)-1;
    //alert(z);
    var table5 = $("#table5").dataTable({
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
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
            { "width": "10%", "targets": 0 }, { "width": "15%", "targets": 1 }, { "width": "10%", "targets": 2 }, { "width": "5%", "targets": 3 },
            { "width": "10%", "targets": 4 }, { "width": "25%", "targets": 5 }, { "width": "5%", "targets": 6}
        ]
    });
    // Select row
    $("#table5 tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
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
    var i = (h/35);
    var z = i.toFixed(0)-6;
    //alert(z);
    var table6 = $("#table6").dataTable({
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
                $(row).removeClass('myodd myeven');
                 $(row).addClass('myeven');
            }
        },
        "paging": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            { "width": "1%", "targets": 0}, { "width": "1%", "targets": 1, "orderable": false}, { "width": "1%", "targets": 2, "orderable": false  }, { "width": "3%", "targets": 3, "orderable": false  },
        //  { "width": "7%", "targets": 4 }, { "width": "7%", "targets": 5 }, { "width": "20%", "targets": 6 }, { "width": "35%", "targets": 7 },
        //  { "width": "6%", "targets": 8 }, { "width": "6%", "targets": 9 }, { "width": "6%", "targets": 10 }, { "width": "6%", "targets": 11 },
        //  { "width": "6%", "targets": 12 }, { "width": "6%", "targets": 13 }, { "width": "6%", "targets": 14 }, { "width": "6%", "targets": 15 },
        //  { "width": "6%", "targets": 16 }, { "width": "6%", "targets": 17 }
        ]
    });
    // Select row
    $("#table6 tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
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
    var i = (h/35);
    var z = i.toFixed(0)-1;
    //alert(z);
    var table7 = $("#table7").dataTable({
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
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
    $("#table7 tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
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
    var i = (h/35);
    var z = i.toFixed(0)-1;
    //alert(z);
    var table8 = $("#table8").dataTable({
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
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
            { "width": "5%", "targets": 4 }, { "width": "3%", "targets": 5 }, { "width": "20%", "targets": 6}
        ]
    });
    // Select row
    $("#table8 tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
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
    $("#dropbox2_1").click(function(){
        $("#dropdown2_1").slideToggle(400);
    })
    $("#dropdown2_1 p").click(function(){
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
    
    $("#dropbox6_1").click(function(){
        $("#dropdown6_1").slideToggle(400);
    })
    $("#dropdown6_1 p").click(function(){
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
        if ($(this).text() == "Память концентратора"){
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
    
    $("#dropbox7_1").click(function(){
        $("#dropdown7_1").slideToggle(400);
    })
    
    $("#dropdown7_1 p").click(function(){
        $("#dropdown7_1").slideUp(400);
        if ($(this).text() == "База данных") {
            $("#dropbox7_1 p").text("База данных");
            cur_table = 7;
        }
        if ($(this).text() == "Память концентратора"){
            $("#dropbox7_1 p").text("Память концентратора");
            cur_table = 7;
        }
    })
    
    $("#dropbox7_2").click(function(){
        $("#dropdown7_2").slideToggle(400);
    })
    
    $("#dropdown7_2 p").click(function(){
        $("#dropdown7_2").slideUp(400);
        if ($(this).text() == "Открыта крашка зажимов") {
            $("#dropbox7_2 p").text("Открыта крашка зажимов");
            cur_table = 8;
        }
        if ($(this).text() == "Открыта крышка терминала"){
            $("#dropbox7_2 p").text("Открыта крышка терминала");
            cur_table = 8;
        }
        if ($(this).text() == "Реле выключено"){
            $("#dropbox7_2 p").text("Реле выключено");
            cur_table = 8;
        }
        if ($(this).text() == "Реле включено"){
            $("#dropbox7_2 p").text("Реле включено");
            cur_table = 8;
        }
        if ($(this).text() == "Стерты данные"){
            $("#dropbox7_2 p").text("Стерты данные");
            cur_table = 8;
        }
    })
    
    ///////////////////////////////////////////////////////////
    
    $("#tab2_1").click(function(){
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
    $("#tab2_2").click(function(){
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
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
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
            { "width": "1%", "targets": 4 }, { "width": "1%", "targets": 5 }, { "width": "1%", "targets": 6}, { "width": "1%", "targets": 7},
            { "width": "20%", "targets": 8}, { "width": "20%", "targets": 9}, { "width": "20%", "targets": 10}, {"bSortable": false, "aTargets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
        ],
        ////
    });
    // Select row
    $("#dp_met_table tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
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
    $(function() {
        var dateFormat = "dd.mm.yy",
        
        from = $( "#cons_start_date2" ).datepicker({changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
        .on( "change", function() {
            to.datepicker( "option", "minDate", getDate( this ) );
        }).datepicker("setDate", new Date()),
        
        to = $( "#cons_end_date2" ).datepicker({changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
        .on( "change", function() {
            from.datepicker( "option", "maxDate", getDate( this ) );
        }).datepicker("setDate", new Date());
 
        function getDate(element){
            var date;
            try {
                date = $.datepicker.parseDate( dateFormat, element.value );
            }catch( error ){
                date = null;
            }
            return date;
        }
        //
        $("#cons_start_date2").click(function(){
            if (log_cons_date2 == false) {
                $(this).val("");
                $("#cons_end_date2").val("");
                log_cons_date2 = true;
            }
        })
        $("#cons_end_date2").click(function(){
            if (log_cons_date2 == false) {
                $(this).val("");
                $("#cons_start_date2").val("");
                log_cons_date2 = true;
            }
        })
    });
    // calendar for consumer details //
    var log_cons_date1 = false;
    $(function() {
        // 24 hours //
        $( "#day_date" ).datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd.mm.yy'
        }).datepicker("setDate", new Date());
        // period
        var dateFormat = "dd.mm.yy",
        
        from = $( "#cons_start_date1" ).datepicker({changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy' })
        .on( "change", function() {
            to.datepicker( "option", "minDate", getDate( this ) );
        }).datepicker("setDate", new Date()),
        
        to = $( "#cons_end_date1" ).datepicker({changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy'})
        .on( "change", function() {
            from.datepicker( "option", "maxDate", getDate( this ) );
        }).datepicker("setDate", new Date());
 
        function getDate(element){
            var date;
            try {
                date = $.datepicker.parseDate( dateFormat, element.value );
            }catch( error ){
                date = null;
            }
            return date;
        }
        //
        $("#cons_start_date1").click(function(){
            if (log_cons_date1 == false) {
                $(this).val("");
                $("#cons_end_date1").val("");
                log_cons_date1 = true;
            }
        })
        $("#cons_end_date1").click(function(){
            if (log_cons_date1 == false) {
                $(this).val("");
                $("#cons_start_date1").val("");
                log_cons_date1 = true;
            }
        })
    });
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    /////////////////////////////////////////////////// Meters ///////////////////////////////////////////////////
    // calendar for meters table //3
    $(function() {
        // 24 hours //
        $( "#met_day_date" ).datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd.mm.yy'
        }).datepicker("setDate", new Date());
    });
    // calendar for energy table //3
    $(function() {
        // 24 hours //
        $( "#renergy_day_date" ).datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd.mm.yy'
        }).datepicker("setDate", new Date());
    });
    // calendar for meters table //3
    $(function() {
        // 24 hours //
        $( "#event_day_date" ).datepicker({
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: 'dd.mm.yy'
        }).datepicker("setDate", new Date());
    });
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    
    ///////////////// Consumer details period chart ////////////////////////////////////////////
    $(function() {
        //$('#source').tableBarChart(targetDiv, caption, reverseGroup);
        $('#source').tableBarChart('#chart1', '', false);
    });
    

    ////////////////////////////////////////////////////////////////////
    // consumer print
    $("#cons_print1").mouseover(function(){
        $(this).attr("src", "/files/print_icon_h.png");
    })
    $("#cons_print1").mouseout(function(){
        $(this).attr("src", "/files/print_icon.png");
    })
    $("#cons_excel1").mouseover(function(){
        $(this).attr("src", "/files/excel_icon_h.png");
    })
    $("#cons_excel1").mouseout(function(){
        $(this).attr("src", "/files/excel_icon.png");
    })
    $("#cons_pdf1").mouseover(function(){
        $(this).attr("src", "/files/pdf_icon_h.png");
    })
    $("#cons_pdf1").mouseout(function(){
        $(this).attr("src", "/files/pdf_icon.png");
    })
    
    $("#cons_print2").mouseover(function(){
        $(this).attr("src", "/files/print_icon_h.png");
    })
    $("#cons_print2").mouseout(function(){
        $(this).attr("src", "/files/print_icon.png");
    })
    $("#cons_excel2").mouseover(function(){
        $(this).attr("src", "/files/excel_icon_h.png");
    })
    $("#cons_excel2").mouseout(function(){
        $(this).attr("src", "/files/excel_icon.png");
    })
    $("#cons_pdf2").mouseover(function(){
        $(this).attr("src", "/files/pdf_icon_h.png");
    })
    $("#cons_pdf2").mouseout(function(){
        $(this).attr("src", "/files/pdf_icon.png");
    })
    ////////////
    
    // Meters print
    $("#met_print1").mouseover(function(){
        $(this).attr("src", "/files/print_icon_h.png");
    })
    $("#met_print1").mouseout(function(){
        $(this).attr("src", "/files/print_icon.png");
    })
    $("#met_excel1").mouseover(function(){
        $(this).attr("src", "/files/excel_icon_h.png");
    })
    $("#met_excel1").mouseout(function(){
        $(this).attr("src", "/files/excel_icon.png");
    })
    $("#met_pdf1").mouseover(function(){
        $(this).attr("src", "/files/pdf_icon_h.png");
    })
    $("#met_pdf1").mouseout(function(){
        $(this).attr("src", "/files/pdf_icon.png");
    })
    
    ////////////

    // Renergy print
    $("#renergy_print1").mouseover(function(){
        $(this).attr("src", "/files/print_icon_h.png");
    })
    $("#renergy_print1").mouseout(function(){
        $(this).attr("src", "/files/print_icon.png");
    })
    $("#renergy_excel1").mouseover(function(){
        $(this).attr("src", "/files/excel_icon_h.png");
    })
    $("#renergy_excel1").mouseout(function(){
        $(this).attr("src", "/files/excel_icon.png");
    })
    $("#renergy_pdf1").mouseover(function(){
        $(this).attr("src", "/files/pdf_icon_h.png");
    })
    $("#renergy_pdf1").mouseout(function(){
        $(this).attr("src", "/files/pdf_icon.png");
    })
    
    ////////////
    
    // Meters print
    $("#event_print1").mouseover(function(){
        $(this).attr("src", "/files/print_icon_h.png");
    })
    $("#event_print1").mouseout(function(){
        $(this).attr("src", "/files/print_icon.png");
    })
    $("#event_excel1").mouseover(function(){
        $(this).attr("src", "/files/excel_icon_h.png");
    })
    $("#event_excel1").mouseout(function(){
        $(this).attr("src", "/files/excel_icon.png");
    })
    $("#event_pdf1").mouseover(function(){
        $(this).attr("src", "/files/pdf_icon_h.png");
    })
    $("#event_pdf1").mouseout(function(){
        $(this).attr("src", "/files/pdf_icon.png");
    })
    
    ////////////
    
    var log_met_on = false;
    $("#cons_met_on1").click(function(){
        if (log_met_on == false) {
            $(this).attr("src", "/files/met_off.png");
            log_met_on = true;
        }else{
            $(this).attr("src", "/files/met_on.png");
            log_met_on = false;
        }
    })
    $(".met_on_off").click(function(){
        //var color = $( this ).css( "background" );
        //alert(color);
        //if ($(this).css("background") == "url('/files/moff.png') no-repeat center") {
            //$(this).css("background", "url('/files/mon.png') no-repeat center");
        //}else{
            $(this).css("background", "url('/files/moff.png') no-repeat center");
        //}
        $(this).css("background-size", "45px 20px");
    })
    $("#close_met").click(function(){
        $("#rightm_div").css("display", "none");
        $("#details_pan").css("left", "-5000px");
    })
    ////////////////////////////////////////////////////////////////////
    
    // met_det_tabs
    $("#met_det_tab1").click(function(){
        $("#met_det_tabs").css("background", "url('/files/tabbtn1.png')");
        $("#contain_wide").scrollLeft(0);
    })
    $("#met_det_tab2").click(function(){
        $("#met_det_tabs").css("background", "url('/files/tabbtn2.png')");
        var w = $("#det_pan_met_wide").width();
        var n = w/4;
        $("#contain_wide").scrollLeft(n);
    })
    $("#met_det_tab3").click(function(){
        $("#met_det_tabs").css("background", "url('/files/tabbtn3.png')");
        var w = $("#det_pan_met_wide").width();
        var n = (w/4)*2;
        $("#contain_wide").scrollLeft(n);
    })
    $("#met_det_tab4").click(function(){
        $("#met_det_tabs").css("background", "url('/files/tabbtn4.png')");
        var w = $("#det_pan_met_wide").width();
        var n = (w/4)*3;
        $("#contain_wide").scrollLeft(n);
    })
    $("#contain_wide").on( 'scroll', function(){
        var w = $("#det_pan_met_wide").width();
        var n = (w/4);
        var pos = $("#contain_wide").scrollLeft();
        //$("#met_det_tab3").text(pos);
        //$("#met_det_tab4").text(n);
        //alert(pos);
        if (pos == 0) {
            $("#met_det_tabs").css("background", "url('/files/tabbtn1.png')");
        }
        if ((pos >= n) && (pos < (n*2)-800)) {
            $("#met_det_tabs").css("background", "url('/files/tabbtn2.png')");
        }
        if (pos >= (n*2)) {
            $("#met_det_tabs").css("background", "url('/files/tabbtn3.png')");
        }
        if (pos >= ((n*3)-400)) {
            $("#met_det_tabs").css("background", "url('/files/tabbtn4.png')");
        }
    });
    $("#drop_met_det_btn").click(function(){
        $("#drop_met_det").toggle(500);
    })
    
    ///////////////////////// Create and initialize table3 (Consumer) ///////////////////////////////////
    //var h = $("#table_div3").height();
    //var i = (h/38);
    //var z = i.toFixed(0)-1;
    //alert(z);
    var table3 = $("#dp_met_table1").dataTable({
        "rowCallback": function( row, data, index ) {
            if(index%2 == 0){
                $(row).removeClass('myodd myeven');
                $(row).addClass('myodd');
            }else{
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
          { "width": "3%", "targets": 4 }, { "width": "3%", "targets": 5 }, { "width": "3%", "targets": 6 }, { "width": "15%", "targets": 7 },
          { "width": "15%", "targets": 8 }, { "width": "15%", "targets": 9 }
        ]
    });
    // Select row
    $("#table3 tbody").on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
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
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        y: [201, 125, 214, 632, 225, 128, 780, 505, 620, 50], 
        mode: 'lines',
        name: 'A+',
        marker:{
            color: '#1cc2ff'
        },
    };
    var trace2 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        y: [305, 658, 125, 155, 412, 655, 925, 810, 730, 130], 
        mode: 'lines',
        name: 'A-',
        marker:{
            color: '#fac363'
        }
    };
    var trace3 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        y: [270, 214, 658, 236, 874, 520, 325, 760, 100, 270], 
        mode: 'lines',
        name: '|A|',
        marker:{
            color: '#e1ff14'
        }
    };
    var trace4 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        y: [250, 658, 174, 412, 155, 445, 410, 925, 195, 500], 
        mode: 'lines',
        name: '|R|',
        marker:{
            color: '#ff0000'
        }
    };
    var trace5 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        y: [620, 398, 658, 874, 632, 380, 365, 320, 380, 330], 
        mode: 'lines',
        name: 'R+',
        marker:{
            color: '#ff00ea'
        }
    };
    var trace6 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        y: [525, 174, 125, 225, 236, 217, 810, 410, 550, 500], 
        mode: 'lines',
        name: 'R-',
        marker:{
            color: '#00fff6'
        }
    };

    var layout = {
        title:'Детальный график по показателям A+, A-, |A|, |R|, R+, R-',
        font:{
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
        paper_bgcolor:'rgb(51,51,51)',
        plot_bgcolor:'transparent',
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
})
    angular.module('example', ['n3-line-chart'])
    .controller('MyChartCtrl', function($scope) {
        $scope.options = {
            series:[
                {
                    axis: "y",
                    dataset: "dataset0",
                    key: "val_0",
                    label: "Показания в кВт",
                    color: "#1ab609",
                    type: ['line', 'area'],
                    id: 'mySeries0',
                }
            ],
            axes:{
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
                {x: 0, val_0: 0},
                {x: 1, val_0: 25},
                {x: 2, val_0: 15},
                {x: 3, val_0: 32},
                {x: 4, val_0: 85},
                {x: 5, val_0: 67},
                {x: 6, val_0: 75},
                {x: 7, val_0: 28},
                {x: 8, val_0: 56},
                {x: 9, val_0: 74},
                {x: 10, val_0: 43},
                {x: 11, val_0: 15},
                {x: 12, val_0: 69},
                {x: 13, val_0: 59},
                {x: 14, val_0: 34},
                {x: 15, val_0: 55},
                {x: 16, val_0: 38},
                {x: 17, val_0: 78},
                {x: 18, val_0: 62},
                {x: 19, val_0: 98},
                {x: 20, val_0: 50},
                {x: 21, val_0: 41},
                {x: 22, val_0: 25},
                {x: 23, val_0: 56},
                {x: 24, val_0: 32},
                {x: 25, val_0: 67},
                {x: 26, val_0: 28},
                {x: 27, val_0: 32},
                {x: 28, val_0: 67},
                {x: 29, val_0: 64},
                {x: 30, val_0: 25},
                {x: 31, val_0: 15},
                {x: 32, val_0: 32},
                {x: 33, val_0: 85},
                {x: 34, val_0: 67},
                {x: 35, val_0: 75},
                {x: 36, val_0: 28},
                {x: 37, val_0: 56},
                {x: 38, val_0: 74},
                {x: 39, val_0: 43},
                {x: 40, val_0: 15},
                {x: 41, val_0: 69},
                {x: 42, val_0: 59},
                {x: 43, val_0: 34},
                {x: 44, val_0: 55},
                {x: 45, val_0: 38},
                {x: 46, val_0: 78},
                {x: 47, val_0: 62},
                {x: 48, val_0: 98},
                {x: 49, val_0: 50},
                {x: 50, val_0: 41},
                {x: 51, val_0: 25},
                {x: 52, val_0: 56},
                {x: 53, val_0: 32},
                {x: 54, val_0: 67},
                {x: 55, val_0: 28},
                {x: 56, val_0: 32},
                {x: 57, val_0: 67},
                {x: 58, val_0: 35},
                {x: 59, val_0: 25},
                {x: 60, val_0: 15},
                {x: 61, val_0: 32},
                {x: 62, val_0: 85},
                {x: 63, val_0: 67},
                {x: 64, val_0: 75},
                {x: 65, val_0: 28},
                {x: 66, val_0: 56},
                {x: 67, val_0: 74},
                {x: 68, val_0: 43},
                {x: 69, val_0: 15},
                {x: 70, val_0: 69},
                {x: 71, val_0: 59},
                {x: 72, val_0: 34},
                {x: 73, val_0: 55},
                {x: 74, val_0: 38},
                {x: 75, val_0: 78},
                {x: 76, val_0: 62},
                {x: 77, val_0: 98},
                {x: 78, val_0: 50},
                {x: 79, val_0: 41},
                {x: 80, val_0: 25},
                {x: 81, val_0: 56},
                {x: 82, val_0: 32},
                {x: 83, val_0: 67},
                {x: 84, val_0: 28},
                {x: 85, val_0: 32},
                {x: 86, val_0: 67}
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