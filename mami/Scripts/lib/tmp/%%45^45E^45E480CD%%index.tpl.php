<?php /* Smarty version 2.6.19, created on 2016-08-12 02:57:33
         compiled from index.tpl */ ?>
<!DOCTYPE html>

<html>
<head>
    <title>Mitio Electronics</title>
    <meta http-equiv="content-type" name="charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="description" content="Mitio Global">
	<meta name="keywords" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <link href="/styles.css" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" href="/files/shortcut.png" type="image/x-icon" />
    <script src="/lib/JsHttpRequest/JsHttpRequest.js"></script>
	<!--jquery-->
    <script src="/lib/jquery/jquery-1.12.4.js"></script>
    <script src="/lib/jquery/jquery-ui.min._js"></script>
    <link href="/lib/jquery/jquery-ui.min._css" rel="stylesheet" type="text/css"/>
	<!--jquery-->
    <script type="text/javascript" src="/mainjs.js"></script>
    <!--<script type="text/javascript" src="/map.js"></script>-->
    <!--<script type="text/javascript" src="https://maps.google.com/maps/api/js?keyAIzaSyBG723Aj6uRzpaxpjknYVS3owtlRm-B95Y=&sensor=true"></script>-->
	<!--inputmask-->
	<script type="text/javascript" src="/lib/dist/jquery.inputmask.bundle.js"></script>
	<!---->
	<!--inputmask-->
	<script src="/lib/PageBlur-gh-pages/js/PageBlur.js"></script>
	<!---->
	<link href="/lib/jquery/jquery-ui.css" rel="stylesheet">
    <script src="/lib/jquery/jquery-ui.js"></script>
</head>
<body>
	<div id="cert_hint">
		<p style="color: #faa61a; font-size: 11px; margin-left: 30px; margin-top: 25px; text-align: center; width: 190px">Сертификат партнера</p>
		<p style="color: #A1A1A1; font-size: 11px; margin-left: 30px; margin-top: 5px; text-align: center; width: 190px"></p>
		<img style="margin-left: 85px; margin-top: 10px" src="" />
	</div>
	<div id="alert_hint">
		<p id="ah1" style="display: none; color: #2f9008; font-size: 11px; margin-left: 30px; margin-top: 40px; text-align: center; width: 190px; font-weight: 800">Заполните все поля!</p>
		<p id="ah2" style="display: none; color: #2f9008; font-size: 11px; margin-left: 30px; margin-top: 40px; text-align: center; width: 190px; font-weight: 800">Сообщение отправлено!</p>
		<p id="ah3" style="display: none; color: #2f9008; font-size: 11px; margin-left: 30px; margin-top: 20px; text-align: center; width: 190px; font-weight: 800">Сообщение не отправлено!<br><br>Пожалуйста проверьте подключение!</p>
	</div>
	<div id="show_pic_video_back">
	</div>
	<div id="show_pic_video">
		<img src="/files/loader.gif" />
		<!--<img id="loading" src="/files/loading.gif" />-->
		<!--<embed id="player" flashvars="set_video1_url=&set_title_text=&set_posterUrl=" style="display: none; margin-left: 30%; margin-top: 200px;" src="/lib/spruto/player.swf" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="360" />-->
		<!--<embed id="player" flashvars="set_video1_url=http://mitio.mg/files/t50.flv&set_title_text=ПАК ФА Т-50 Корпорация ОАО Сухой&set_posterUrl=" style="display: none; margin-left: 30%; margin-top: 200px;" src="/lib/spruto/player.swf" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="360" />-->
	</div>
	<div id="show_loader">
		<img src="/files/loader.gif" style="margin-left: 45%; margin-top: 20%; width: 80px; height: 80px;" />
	</div>
    <div id="container" class="blurback1">
		<div id="header">
			<div id="hlogo_div">
				<div style="width: 100%; height: 61px">
				</div>
				<div style="width: 300px; height: 70px; margin-left: auto; margin-right: auto;">
					<img src="/files/mlogo2.png">
				</div>
			</div>
			<div id="hbuts_div">
				<div class="buttons">
					<a id="about_but"><img src="/files/about2.png">
					<p>О Нас</p></a>
				</div>	
				<div class="buttons">
					<a id="projects_but"><img src="/files/projects1.png">
					<p>Проекты</p></a>
				</div>				
				<div class="buttons">
					<a id="partners_but"><img src="/files/partners3.png">
					<p>Партнеры</p></a>
				</div>
				<div class="buttons">
					<a id="contacts_but"><img src="/files/contact3.png">
					<p>Связь с нами</p></a>
				</div>				
			</div>
	    </div>
		<div id="subcontainer" class="blurback1">
			<div id="divleft">
				<div id="accord_menu">
					<div id="equip_m" class="accord_m">
						<a><img src="/files/iconequip.png"><p>Оборудование</p></a>
					</div>
					<div id="equip_div" class="accord_div">
						<ul>
							<li>Волновая линия</li>
							<li>Палетный конвейр</li>
							<li>Ленточный конвейр</li>
							<li>Цепной конвейр</li>
						</ul>						
					</div>
					<div id="tuner_m" class="accord_m">
						<a><img src="/files/icontuner.png"><p>Тюнеры</p></a>						
					</div>
					<div id="tuner_div" class="accord_div">
						<ul>
							<li>High Defenition Box</li>
						</ul>						
					</div>
					<div id="meter_m" class="accord_m">
						<a><img src="/files/iconmeter.png"><p>Электро счетчики</p></a>						
					</div>
					<div id="meter_div" class="accord_div">
						<ul>
							<li>Концентратор</li>
							<li>Однофазный</li>
							<li>Трехфазный</li>
						</ul>						
					</div>
					<div id="meter_gaz_m" class="accord_m">
						<a><img src="/files/iconmeter.png"><p>Газовые счетчики</p></a>						
					</div>
					<div id="meter_gaz_div" class="accord_div">
						<ul>
							<li>Газовый тип 1</li>
							<li>Газовый тип 2</li>
							<li>Газовый тип 3</li>
						</ul>						
					</div>
					<div id="meter_wt_m" class="accord_m">
						<a><img src="/files/iconmeter.png"><p>Водяные счетчики</p></a>						
					</div>
					<div id="meter_wt_div" class="accord_div">
						<ul>
							<li>Водяной тип 1</li>
							<li>Водяной тип 2</li>
							<li>Водяной тип 3</li>
						</ul>						
					</div>
					<div id="model_m" class="accord_m">
						<a><img src="/files/iconmodem.png"><p>Модемы</p></a>						
					</div>
					<div id="model_div" class="accord_div">
						<ul>
							<li>GPRS Modem</li>
						</ul>							
					</div>
					<div id="light_m" class="accord_m">
						<a><img src="/files/iconlight.png"><p>Уличное освещение</p></a>						
					</div>
					<div id="light_div" class="accord_div">
						<ul>
							<li>Супер Мега Фонарь</li>
						</ul>								
					</div>
					<div id="raw_m" class="accord_m">
						<a><img src="/files/iconraw.png"><p>Сырье</p></a>						
					</div>
					<div id="raw_div" class="accord_div">
						<ul>
							<li>ABS</li>
							<li>PC</li>
							<li>PP</li>
							<li>PT</li>
							<li>Припой</li>
							<li>Флюст</li>
						</ul>								
					</div>
					<div id="inv_m" class="accord_m">
						<a><img src="/files/iconinv.png"><p>Инвентарь</p></p>						
					</div>
					<div id="inv_div" class="accord_div">
						<ul>
							<li>Паяльники</li>
							<li>Отвертки</li>
							<li>Лупы</li>
							<li>Халаты</li>
							<li>Пинцеты</li>
							<li>Тапочки</li>
						</ul>		
					</div>
				</div>              
			</div>
			<div id="divcent">
				<div id="main">
					<div id="about">
						<p style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">О нашей компании</p>
						<p style="text-align: justify; font-size: 11px; color: #A1A1A1"><?php echo $this->_tpl_vars['about']; ?>
</p>
						<div style="width: 522px; height: 332px; margin-top: 20px; border: 3px double; border-color: #fff" id="">
							<img src="/files/tutorial_index.jpg" />
						</div>
						<!--<div style="width: 522px; height: 332px; margin-top: 20px; border: 3px double; border-color: #faa61a">-->
							<!--<img style="margin-left: 1px; margin-top: 1px;" src="/files/chart.png" />-->
						<!--</div>-->
						<!--<object id="videoplayer1700" type="application/x-shockwave-flash" data="http://www.articls.ru/player/mp3.swf" width="500" height="350">-->
						<!--<param name="allowFullScreen" value="true" />-->
						<!--<param name="allowScriptAccess" value="always" />-->
						<!--<param name="wmode" value="transparent" />-->
						<!--<param name="movie" value="http://www.articls.ru/player/mp3.swf" />-->
						<!--<param name="flashvars" value="comment=НАЗВАНИЕ видео&st=http://www.articls.ru/player/style/video18-639.txt&file=http://mitio.mg/files/t50.flv"/>-->
						<!--</object>-->
					</div>
					<div id="product_div">
						<p id="prd_div_h" style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;"></p>
						<p id="prd_div_descr" style="text-align: justify; font-size: 11px; color: #A1A1A1"></p>
						<div style="width: 522px; height: 332px; margin-top: 20px; border: 3px double; border-color: #faa61a">
							<img style="margin-left: 1px; margin-top: 1px; width: 520px; height: 330px; cursor: pointer" id="prd_div_pic" src="" />
						</div>
						<div id="video_list" style="margin-top: 15px;">
							<!--<img src="/files/video1.png" class="video_list" alt="" />-->
						</div>
					</div>
					<div id="cert_div">
						<p id="cert_div_h" style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;"></p>
						<p id="cert_div_descr" style="text-align: justify; font-size: 11px; color: #A1A1A1"></p>
						<div style="width: 522px; height: 737px; margin-top: 20px; border: 3px double; border-color: #faa61a">
							<img style="margin-left: 1px; margin-top: 1px;" id="cert_div_pic" src="" />
						</div>
						<a id="getcert"><img src="/files/icongetcert.png"><p>Скачать сертификат</p></a>
					</div>					
					<div id="product">
						<p id="prd_h" style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">Производимая и поставляемая продукция</p>
						<div style="width: 100%; height: 30px; background: #f3f4f4; margin-bottom: 15px">
							<img src="/files/specs.png" style="float: left; margin-top: 5px; margin-left: 18px;" />
							<a id="specs" href="" class="specs">Спецификации</a>
							<img id="appicon" src="/files/app.png" style="float: left; margin-top: 5px; margin-left: 22px;" />
							<a id="app" style="cursor: pointer" class="specs">Программа</a>
							<img src="/files/cert.png" style="float: left; margin-top: 5px; margin-left: 22px;" />
							<a id="cert" href="" class="specs">Сертификат</a>
							<img src="/files/spares.png" style="float: left; margin-top: 5px; margin-left: 22px;" />
							<a id="spares" href="" class="specs">Комплектующие</a>
						</div>
						<div id="app_div" style="width: 100%; margin-bottom: 15px;">
							<div style="width: 522px; height: 332px;">
								<img style="width: 520px; height: 330px; cursor: pointer" id="apppic" src="" />
							</div>
							<p id="app_div_h" style="margin-top: 10px; margin-bottom: 10px; text-align: center; font-size: 13px; color: #A1A1A1"></p>
							<p id="app_div_descr" style="text-align: justify; font-size: 11px; color: #A1A1A1"></p>
							<div id="verlinks" style="margin-top: 20px; margin-bottom: 30px;">
							</div>	
						</div>
						<div style="float: left; width: 100%; height: auto">
							<p id="descr" style="text-align: justify; font-size: 11px; color: #A1A1A1"></p>
							<div style="width: 522px; height: 332px; margin-top: 20px; border: 3px double; border-color: #faa61a">
								<img style="margin-left: 1px; margin-top: 1px; width: 520px; height: 330px; cursor: pointer" id="pic" src="" />
							</div>
						</div>
					</div>
					<div id="projects">
						<div id="projlogos_container">
							<p style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">Наши проекты</p>
						</div>
						<div id="projects_div" style="display: none">
							<p id="proj_div_h" style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;"></p>
							<img id="proj_div_pic1" class="proj_div_pic" style="width: 250px; height: 140px; float: left; margin-right: 10px;" src="">
							<p id="proj_div_descr1" style="text-align: justify; font-size: 11px; color: #A1A1A1; margin-bottom: 15px;"></p>
							<img id="proj_div_pic2" class="proj_div_pic" style="width: 250px; height: 140px; float: right; margin-right: 10px; margin-left: 10px;" src="">
							<p id="proj_div_descr2" style="text-align: justify; font-size: 11px; color: #A1A1A1; margin-bottom: 15px;"></p>
							<img id="proj_div_pic3" class="proj_div_pic" style="width: 250px; height: 140px; float: left; margin-right: 10px;" src="">
							<p id="proj_div_descr3" style="text-align: justify; font-size: 11px; color: #A1A1A1; margin-bottom: 15px;"></p>
							<img id="proj_div_pic4" class="proj_div_pic" style="width: 250px; height: 140px; float: right; margin-right: 10px; margin-left: 10px;" src="">
							<p id="proj_div_descr4" style="text-align: justify; font-size: 11px; color: #A1A1A1; margin-bottom: 15px;"></p>
							<img id="proj_div_pic5" class="proj_div_pic" style="width: 250px; height: 140px; float: left; margin-right: 10px;" src="">
							<p id="proj_div_descr5" style="text-align: justify; font-size: 11px; color: #A1A1A1; margin-bottom: 15px;"></p>
							<img id="proj_div_pic6" class="proj_div_pic" style="width: 250px; height: 140px; float: right; margin-right: 10px; margin-left: 10px;" src="">
							<p id="proj_div_descr6" style="text-align: justify; font-size: 11px; color: #A1A1A1; margin-bottom: 15px;"></p>
							<div id="" style="width: 100%; height: 25px; background: #f3f4f4; margin-bottom: 10px;">
								<p style="color: #faa61a; font-size: 14px; font-weight: bold; padding-top: 3px; width: 100%; text-align: center">Оборудование данного проекта</p>
							</div>
							<div id="prdlinks">
							</div>
							<div id="" style="width: 100%; height: 25px; background: #f3f4f4; margin-bottom: 10px; margin-top: 20px;">
								<p style="color: #faa61a; font-size: 14px; font-weight: bold; padding-top: 3px; width: 100%; text-align: center">Партнеры участвующие в данном проекте</p>
							</div>
							<img src="" alt="" id="ppp1" class="ppp" />
							<img src="" alt="" id="ppp2" class="ppp" />
							<img src="" alt="" id="ppp3" class="ppp" />
							<img src="" alt="" id="ppp4" class="ppp" />
							<img src="" alt="" id="ppp5" class="ppp" />
							<img src="" alt="" id="ppp6" class="ppp" />
							<img src="" alt="" id="ppp7" class="ppp" />
							<img src="" alt="" id="ppp8" class="ppp" />
							<img src="" alt="" id="ppp9" class="ppp" />
							<img src="" alt="" id="ppp10" class="ppp" />
						</div>
						<div id="d1">
							<a class="c" alt="test" ></a>
						</div>
					</div>
					<div id="partners">
						<div id="prtlogos_container">
							<p style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">Наши партнеры</p>
						</div>
						<div id="partner_div">
							<p id="prt_div_h" style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">Mercedes</p>
							<img id="prt_div_pic" style="float: left; margin-right: 10px;" src="/files/prtpic1.png">
							<p id="prt_div_descr" style="text-align: justify; font-size: 11px; color: #A1A1A1"></p>
							<div id="" style="width: 100%; height: 25px; background: #f3f4f4; margin-top: 10px;">
								<p style="color: #faa61a; font-size: 14px; font-weight: bold; padding-top: 3px; width: 100%; text-align: center">Проекты с данным партнером</p>
							</div>
							<div id="projlinks" style="margin-top: 20px; margin-bottom: 20px; float: left; width: auto; height: auto;">
							</div>
						</div>
					</div>
					<div id="contacts">
						<p id="ddd" style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">Связь с нами</p>
						<form enctype="multipart/form-data" method="POST" id="frm" onsubmit="return false">
					        <p class="inputslbl">Ваше имя</p><input id="nm" value="" type="text" name="name" class="inputs"><br><br>
							<p class="inputslbl">Ваш email</p><input id="eml" value="" type="text" name="email" class="inputs"><br><br>
						    <p class="inputslbl">Ваша компания</p><input id="cmp" value="" type="text" name="company" class="inputs"><br><br>
							<textarea class="inputsmsg" id="m" name="msg"></textarea><br><br>
							<!--файл 1-->
							<div id="fdiv1" class="file">
								<div style="width: 10%; height: 35px; float: left" class="files">
									<input type="file" id="somefile1" style="display: none; float: left; width: 10px">							
									<img id="somefileimg1" src="/files/skrepka1.png" onclick="somefile1.click()" style="cursor: pointer;" />
									<input type="file" id="somefile2" style="display: none; float: left">							
									<img id="somefileimg2" src="/files/skrepka2.png" onclick="somefile2.click()" style="display: none; cursor: pointer" />
									<input type="file" id="somefile3" style="display: none; float: left">							
									<img id="somefileimg3" src="/files/skrepka3.png" onclick="somefile3.click()" style="display: none; cursor: pointer" />
									<input type="file" id="somefile4" style="display: none; float: left">							
									<img id="somefileimg4" src="/files/skrepka4.png" onclick="somefile4.click()" style="display: none; cursor: pointer" />
									<input type="file" id="somefile5" style="display: none; float: left">							
									<img id="somefileimg5" src="/files/skrepka5.png" onclick="somefile5.click()" style="display: none; cursor: pointer" />
									<input type="file" id="somefile6" style="display: none; float: left">							
									<img id="somefileimg6" src="/files/skrepka6.png" onclick="somefile6.click()" style="display: none; cursor: pointer" />
									<input type="file" id="somefile7" style="display: none; float: left">							
									<img id="somefileimg7" src="/files/skrepka7.png" onclick="somefile7.click()" style="display: none; cursor: pointer" />
									<input type="file" id="somefile8" style="display: none; float: left">							
									<img id="somefileimg8" src="/files/skrepka8.png" onclick="somefile8.click()" style="display: none; cursor: pointer" />
									<input type="file" id="somefile9" style="display: none; float: left">							
									<img id="somefileimg9" src="/files/skrepka9.png" onclick="somefile9.click()" style="display: none; cursor: pointer" />
									<input type="file" id="somefile10" style="display: none; float: left">							
									<img id="somefileimg10" src="/files/skrepka10.png" onclick="somefile10.click()" style="display: none; cursor: pointer" />
									<!--<input type="file" id="somefile11" style="display: none; float: left">-->
									<img id="somefileimg11" src="/files/skrepka0.png" onclick="somefile11.click()" style="display: none; cursor: pointer" />
								</div>
								<div id="bar" style="width: 89%; height: 35px; float: left; display: none;">
									<div id="progressbar-1" style="width: 100%; height: 10px; margin-top: 7px;"></div>
								</div>
							</div>
							<!-- Добавить файл блок -->
							<div id="filelist">
								<!--<div id="fl1">-->
								<!--	<div style="float: left; width: 95%">-->
								<!--		<p class="filelistlabel"></p>-->
								<!--	</div>-->
								<!--	<div style="float: left; width: 5%">-->
								<!--		<img id="del" src="/files/del_file.png" style="width: 20px; height: 20px; cursor: pointer" />-->
								<!--	</div>-->
								<!--</div>-->
							</div>
							<input id="button" type="button" value="Отправить" style="margin-top: 20px; width: 100px; height: 25px; border: solid 2px #f9a61a; background: #414141; color: #f3f4f4; font-size: 11px;">
							<input id="btnprogress" type="button" value="" style="display: none">
						</form>
						<p id="test" style="text-align: justify; font-size: 11px; color: #A1A1A1">
							<br><br>
							<b>Address:</b> #705, A-building, Kumkang Penterium IT Tower, 282, Hagui-ro, Dongan-gu, Anyang-si, Gyeonggi-do, Korea
							<br>
							<b>Phone:</b> +82 337 6248
							<br>
							<b>Fax:</b> +82 337 6249
							<br>
							<b>Email:</b> mitiosales@gmail.com 
						</p>
						<div style="width: 522px; height: 332px; margin-top: 20px; border: 3px double; border-color: #faa61a" id="map_canvas"></div>
					</div>					
				</div>
			</div>
			<div id="divright">
				<div id="accord_m_descr1" style="display: none; width: 100%; height: 25px; background: #f3f4f4; margin-bottom: 10px">
					<p style="color: #faa61a; font-size: 12px; font-weight: bold; padding-top: 3px; width: 100%; text-align: center">Оборудование проекта</p>
				</div>
				<div id="models">
				</div>
				<div id="projectprts">
					<div id="accord_m_descr2" style="display: block; width: 100%; height: 25px; background: #f3f4f4; margin-bottom: 10px">
						<p style="color: #faa61a; font-size: 12px; font-weight: bold; padding-top: 3px; width: 100%; text-align: center">Партнеры проекта</p>
					</div>
					<img src="" alt="" id="rm_ppp1" class="rm_ppp" />
					<img src="" alt="" id="rm_ppp2" class="rm_ppp" />
					<img src="" alt="" id="rm_ppp3" class="rm_ppp" />
					<img src="" alt="" id="rm_ppp4" class="rm_ppp" />
					<img src="" alt="" id="rm_ppp5" class="rm_ppp" />
					<img src="" alt="" id="rm_ppp6" class="rm_ppp" />
					<img src="" alt="" id="rm_ppp7" class="rm_ppp" />
					<img src="" alt="" id="rm_ppp8" class="rm_ppp" />
					<img src="" alt="" id="rm_ppp9" class="rm_ppp" />
					<img src="" alt="" id="rm_ppp10" class="rm_ppp" />					
				</div>
				<div id="partnerprojlinks">
					<div id="accord_m_descr3" style="display: block; width: 100%; height: 25px; background: #f3f4f4; margin-bottom: 10px">
						<p style="color: #faa61a; font-size: 12px; font-weight: bold; padding-top: 3px; width: 100%; text-align: center">Проекты партнера</p>
					</div>
					<ul>
						<li>Проект на поставку конвейеров</li>
						<li>Проект на поставку запчастей для автомашин гос аппарата</li>
						<li>Проект на поставку нано электро счетчиков</li>
						<li>Проект на поставку газовых счетчиков</li>
						<li>Проект на поставку двигателей для подстанций</li>
					</ul>
				</div>
				<div id="prt_menu_r_container">
					<div id="prt_m_descr" style="width: 100%; height: 25px; background: #f3f4f4; margin-bottom: 10px;">
						<p style="color: #faa61a; font-size: 14px; font-weight: bold; padding-top: 3px; width: 100%; text-align: center">Партнеры</p>
					</div>
					<div id="prt_menu_r">
					</div>
				</div>
				<div id="accord_menu_r">
					<div id="accord_m_descr" style="display: none; width: 100%; height: 25px; background: #f3f4f4; margin-bottom: 10px">
						<p style="color: #faa61a; font-size: 14px; font-weight: bold; padding-top: 3px; width: 100%; text-align: center">Сертификаты</p>
					</div>
					<div id="cert_cmp_m" class="accord_m_r">
						<a><img src="/files/iconequip.png" alt="c"><p>Сертификаты компании</p></a>
					</div>
					<div id="cert_cmp_div" class="accord_div_r">
						<div style="width: 100%; height: auto; margin-bottom: 10px;">
							<?php unset($this->_sections['cert']);
$this->_sections['cert']['name'] = 'cert';
$this->_sections['cert']['loop'] = is_array($_loop=$this->_tpl_vars['cpics_c']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['cert']['show'] = true;
$this->_sections['cert']['max'] = $this->_sections['cert']['loop'];
$this->_sections['cert']['step'] = 1;
$this->_sections['cert']['start'] = $this->_sections['cert']['step'] > 0 ? 0 : $this->_sections['cert']['loop']-1;
if ($this->_sections['cert']['show']) {
    $this->_sections['cert']['total'] = $this->_sections['cert']['loop'];
    if ($this->_sections['cert']['total'] == 0)
        $this->_sections['cert']['show'] = false;
} else
    $this->_sections['cert']['total'] = 0;
if ($this->_sections['cert']['show']):

            for ($this->_sections['cert']['index'] = $this->_sections['cert']['start'], $this->_sections['cert']['iteration'] = 1;
                 $this->_sections['cert']['iteration'] <= $this->_sections['cert']['total'];
                 $this->_sections['cert']['index'] += $this->_sections['cert']['step'], $this->_sections['cert']['iteration']++):
$this->_sections['cert']['rownum'] = $this->_sections['cert']['iteration'];
$this->_sections['cert']['index_prev'] = $this->_sections['cert']['index'] - $this->_sections['cert']['step'];
$this->_sections['cert']['index_next'] = $this->_sections['cert']['index'] + $this->_sections['cert']['step'];
$this->_sections['cert']['first']      = ($this->_sections['cert']['iteration'] == 1);
$this->_sections['cert']['last']       = ($this->_sections['cert']['iteration'] == $this->_sections['cert']['total']);
?>
								<img class="certimgs" src="<?php echo $this->_tpl_vars['cpics_c'][$this->_sections['cert']['index']][1]; ?>
" alt="<?php echo $this->_tpl_vars['cpics_c'][$this->_sections['cert']['index']][2]; ?>
"/>
							<?php endfor; endif; ?>
						</div>
					</div>
					<div id="cert_prt_m" class="accord_m_r">
						<a><img src="/files/icontuner.png" alt="p"><p>Сертификаты партнеров</p></a>						
					</div>
					<div id="cert_prt_div" class="accord_div_r">
						<div style="width: 100%; height: auto; margin-bottom: 10px;">
							<?php unset($this->_sections['cert']);
$this->_sections['cert']['name'] = 'cert';
$this->_sections['cert']['loop'] = is_array($_loop=$this->_tpl_vars['cpics_p']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['cert']['show'] = true;
$this->_sections['cert']['max'] = $this->_sections['cert']['loop'];
$this->_sections['cert']['step'] = 1;
$this->_sections['cert']['start'] = $this->_sections['cert']['step'] > 0 ? 0 : $this->_sections['cert']['loop']-1;
if ($this->_sections['cert']['show']) {
    $this->_sections['cert']['total'] = $this->_sections['cert']['loop'];
    if ($this->_sections['cert']['total'] == 0)
        $this->_sections['cert']['show'] = false;
} else
    $this->_sections['cert']['total'] = 0;
if ($this->_sections['cert']['show']):

            for ($this->_sections['cert']['index'] = $this->_sections['cert']['start'], $this->_sections['cert']['iteration'] = 1;
                 $this->_sections['cert']['iteration'] <= $this->_sections['cert']['total'];
                 $this->_sections['cert']['index'] += $this->_sections['cert']['step'], $this->_sections['cert']['iteration']++):
$this->_sections['cert']['rownum'] = $this->_sections['cert']['iteration'];
$this->_sections['cert']['index_prev'] = $this->_sections['cert']['index'] - $this->_sections['cert']['step'];
$this->_sections['cert']['index_next'] = $this->_sections['cert']['index'] + $this->_sections['cert']['step'];
$this->_sections['cert']['first']      = ($this->_sections['cert']['iteration'] == 1);
$this->_sections['cert']['last']       = ($this->_sections['cert']['iteration'] == $this->_sections['cert']['total']);
?>
								<img class="certimgs" src="<?php echo $this->_tpl_vars['cpics_p'][$this->_sections['cert']['index']][1]; ?>
" alt="<?php echo $this->_tpl_vars['cpics_p'][$this->_sections['cert']['index']][2]; ?>
"/>
							<?php endfor; endif; ?>
						</div>
					</div>
					<div id="cert_ref_m" class="accord_m_r">
						<a><img src="/files/iconmeter.png" alt="r"><p>Отзывы</p></a>						
					</div>
					<div id="cert_ref_div" class="accord_div_r">
						<div style="width: 100%; height: auto; margin-bottom: 10px;">
							<?php unset($this->_sections['cert']);
$this->_sections['cert']['name'] = 'cert';
$this->_sections['cert']['loop'] = is_array($_loop=$this->_tpl_vars['cpics_r']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['cert']['show'] = true;
$this->_sections['cert']['max'] = $this->_sections['cert']['loop'];
$this->_sections['cert']['step'] = 1;
$this->_sections['cert']['start'] = $this->_sections['cert']['step'] > 0 ? 0 : $this->_sections['cert']['loop']-1;
if ($this->_sections['cert']['show']) {
    $this->_sections['cert']['total'] = $this->_sections['cert']['loop'];
    if ($this->_sections['cert']['total'] == 0)
        $this->_sections['cert']['show'] = false;
} else
    $this->_sections['cert']['total'] = 0;
if ($this->_sections['cert']['show']):

            for ($this->_sections['cert']['index'] = $this->_sections['cert']['start'], $this->_sections['cert']['iteration'] = 1;
                 $this->_sections['cert']['iteration'] <= $this->_sections['cert']['total'];
                 $this->_sections['cert']['index'] += $this->_sections['cert']['step'], $this->_sections['cert']['iteration']++):
$this->_sections['cert']['rownum'] = $this->_sections['cert']['iteration'];
$this->_sections['cert']['index_prev'] = $this->_sections['cert']['index'] - $this->_sections['cert']['step'];
$this->_sections['cert']['index_next'] = $this->_sections['cert']['index'] + $this->_sections['cert']['step'];
$this->_sections['cert']['first']      = ($this->_sections['cert']['iteration'] == 1);
$this->_sections['cert']['last']       = ($this->_sections['cert']['iteration'] == $this->_sections['cert']['total']);
?>
								<img class="certimgs" src="<?php echo $this->_tpl_vars['cpics_r'][$this->_sections['cert']['index']][1]; ?>
" alt="<?php echo $this->_tpl_vars['cpics_r'][$this->_sections['cert']['index']][2]; ?>
"/>
							<?php endfor; endif; ?>
						</div>
					</div>
				</div>	
			</div>			
	    </div>
	</div>
	<div id="bottom_panel" class="blurback1">
		<div id="sub_bottom_panel">
			<div id="copyright" style="height: 100%; width: 250px; float: left;">
				<p style="font-size: 10px; color: #A1A1A1; margin-top: 100px;">Copyright © 2014 Mitio Electronics</p>
			</div>
			<div id="blogo" style="height: 100%; width: 250px; float: right;">
			</div>
		</div>
	</div>
</body>
</html>