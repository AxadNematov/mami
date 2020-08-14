<!DOCTYPE html>

<html>
<head>
    <title>Mitio Electronics</title>
    <meta http-equiv="content-type" name="charset=utf-8">
    <meta name="description" content="Mitio Global">
	<meta name="keywords" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <link href="/styles.css" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" href="/files/shortcut.png" type="image/x-icon" />
    <script src="/lib/JsHttpRequest/JsHttpRequest.js"></script>
	<!--jquery-->
    <script src="/lib/jquery/jquery-1.12.4.js"></script>
    <script src="/lib/jquery/jquery-ui.min.js"></script>
    <link href="/lib/jquery/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
	<!--jquery-->    
    <script type="text/javascript" src="/mainjs.js"></script>
	<script type="text/javascript" src="/product.js"></script>
    <script type="text/javascript" src="/map.js"></script>
    <script type="text/javascript" src="https://maps.google.com/maps/api/js?keyAIzaSyBG723Aj6uRzpaxpjknYVS3owtlRm-B95Y=&sensor=true"></script>	
</head>
<body>
	<div id="cert_hint">
		<p style="color: #A1A1A1; font-size: 11px; margin-left: 30px; margin-top: 20px;"></p>
	</div>	
    <div id="container">
		<div id="header">
			<div id="hlogo_div">
				<div style="width: 100%; height: 100px">
				</div>
				<div style="width: 325px; height: 70px; margin-left: auto; margin-right: auto;">
					<img src="/files/mlogo.png">
				</div>
			</div>
			<div id="hbuts_div">
				<div class="buttons">
					<a id="about_but"><img src="/files/about.png">
					<p>О Нас</p></a>
				</div>	
				<div class="buttons">
					<a id="projects_but"><img src="/files/projects.png">
					<p>Проекты</p></a>
				</div>				
				<div class="buttons">
					<a id="partners_but"><img src="/files/partners.png">
					<p>Партнеры</p></a>
				</div>
				<div class="buttons">
					<a id="contacts_but"><img src="/files/contact.png">
					<p>Связь с нами</p></a>
				</div>				
			</div>
	    </div>
		<div id="subcontainer">
			<div id="divleft">
				<div style="width: auto; height: 25px; background: #f3f4f4; padding-top: 8px;"><p style="text-align: center; font-size: 14px; font-weight: bold; color: #faa61a">Продукция</p></div>
				<div id="accord_menu">
					<h3>Оборудование</h3>
					<div>
						<ul>
							<li>Волновая линия</li>
							<li>Палетный конвейр</li>
							<li>Ленточный конвейр</li>
							<li>Цепной конвейр</li>
						</ul>
					</div>
					<h3>Тюнеры</h3>
					<div>
						<ul>
							<li>High Defenition Box</li>
						</ul>
					</div>
					<h3>Счетчики</h3>
					<div>
						<ul>
							<li>Концентратор</li>
							<li>Однофазный</li>
							<li>Трехфазный</li>
						</ul>
					</div>
					<h3>Модемы</h3>
					<div>
						<ul>
							<li>GPRS Modem</li>
						</ul>					
					</div>
					<h3>Уличное освещение</h3>
					<div>
						<ul>
							<li>Супер Мега Фонарь</li>
						</ul>					
					</div>					
				</div>              
			</div>
			<div id="divcent">
				<div id="main">
					<div id="about">
						<p style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">О нашей компании</p>
						<p style="text-align: justify; font-size: 11px; color: #A1A1A1">
							Текст о компании Текст о компании Текст о компании Текст о компании Текст о компании Текст о компании
							Текст о компании Текст о компании Текст о компании Текст о компании Текст о компании Текст о компании
							Текст о компании Текст о компании Текст о компании Текст о компании Текст о компании Текст о компании
							Текст о компании Текст о компании Текст о компании Текст о компании Текст о компании Текст о компании 
						</p>
						<div style="width: 520px; height: 330px; margin-top: 20px; border: 3px double; border-color: #faa61a" id="map_canvas">
						</div>
					</div>
					<div id="product">
						<p style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">Производимая и поставляемая продукция</p>
						<div style="width: 100%; height: 30px; background: #f3f4f4; margin-bottom: 15px">
							<img src="/files/specs.png" style="float: left; margin-top: 5px; margin-left: 18px;" />
							<a id="specs" href="" class="specs">Спецификации</a>
							<img src="/files/app.png" style="float: left; margin-top: 5px; margin-left: 22px;" />
							<a id="app" href="" class="specs">Программа</a>
							<img src="/files/cert.png" style="float: left; margin-top: 5px; margin-left: 22px;" />
							<a id="cert" href="" class="specs">Сертификат</a>
							<img src="/files/spares.png" style="float: left; margin-top: 5px; margin-left: 22px;" />
							<a id="spares" href="" class="specs">Комплектующие</a>
						</div>
						<p id="descr" style="text-align: justify; font-size: 11px; color: #A1A1A1">
						</p>
						<div style="width: 520px; height: 330px; margin-top: 20px; border: 3px double; border-color: #faa61a">
							<img style="margin-left: 1px; margin-top: 1px;" id="pic" src="" />
						</div>
					</div>
					<div id="projects">
						<p style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">Наши проекты</p>
						<p style="text-align: justify; font-size: 11px; color: #A1A1A1">
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами
							Страница с проектами Страница с проектами Страница с проектами Страница с проектами Страница с проектами 
						</p>
					</div>
					<div id="partners">
						<p style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">Наши партнеры</p>
						<p style="text-align: justify; font-size: 11px; color: #A1A1A1">
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами
							Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами Страница с партнерами 
						</p>
					</div>
					<div id="contacts">
						<p style="text-align: center; color: #565451; font-size: 20px; margin-bottom: 15px;">Связь с нами</p>
						<p style="text-align: justify; font-size: 11px; color: #A1A1A1">
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами
							Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами Страница сязь с нами 
						</p>
					</div>					
				</div>
			</div>
			<div id="divright">
				<div id="models">
					<div style="width: auto; height: 25px; background: #f3f4f4; padding-top: 8px;"><p style="text-align: center; font-size: 14px; font-weight: bold; color: #faa61a">Модели</p></div>
					<ul>
					</ul>	
				</div>
				<div id="certs">
					<div style="width: auto; height: 25px; background: #f3f4f4; padding-top: 8px;"><p style="text-align: center; font-size: 14px; font-weight: bold; color: #faa61a">Сертификаты</p></div>
					<img class="certimgs" src="/files/cert1.png" alt="cert1" />
					<img class="certimgs" src="/files/cert1.png" alt="cert2" />
					<img class="certimgs" src="/files/cert1.png" alt="cert3" />
					<img class="certimgs" src="/files/cert1.png" alt="cert4" />
					<img class="certimgs" src="/files/cert1.png" alt="cert5" />
					<img class="certimgs" src="/files/cert1.png" alt="cert6" />
					<img class="certimgs" src="/files/cert1.png" alt="cert7" />
					<img class="certimgs" src="/files/cert1.png" alt="cert8" />
				</div>
			</div>			
	    </div>
	</div>
	<div id="bottom_panel">
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
