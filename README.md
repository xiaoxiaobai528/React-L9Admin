<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
		<style>
			.e-edit-table{width: 1200px;margin: 0 auto;}
			.e-edit-tr{height: 40px;}
			.selectedTd{
				background: rgb(233,233,233);
			}
		</style>
	</head>
	<body>
		<div class="e-edit">
		</div>
	</body>
	
	<script type="text/javascript">
		
		
		//初始化
		$(function(){
			var editCon = $($('.e-edit')[0]);
			var editTableHtml = '<table class="e-edit-table" cellspacing="0" cellpadding="0" border="1">';
				editTableHtml = editTableHtml + '<colgroup class="e-edit-colgroup">';
				editTableHtml = editTableHtml + '<col width="100px" /><col width="100px" /><col width="100px" /><col width="100px" />';
				editTableHtml = editTableHtml + '<col width="100px" /><col width="100px" /><col width="100px" />';
				editTableHtml = editTableHtml + '</colgroup>';
				editTableHtml = editTableHtml + '<tbody class="e-edit-tbody">';
				for (var i = 0 ; i < 7; i++) {
					editTableHtml = editTableHtml + '<tr data-row='+i+' data-cell="0" class="e-edit-tr">';
					for (var j = 0 ; j < 7; j++) {
						editTableHtml = editTableHtml + '<td data-row='+i+' data-cell='+j+' class="e-edit-td "></td>';
					}
					editTableHtml = editTableHtml + '</tr>';
				}
				editTableHtml = editTableHtml + '</tbody>';
				editTableHtml = editTableHtml + '</table>';
			editCon.html(editTableHtml);
			
			//
			dargDailog();
		});
		
		
		//拖拽选中效果
		function dargDailog(){
			
			var editTds = $('.e-edit-td');
			for (var i = 0 ; i < editTds.length ; i++) {
				//按下鼠标
				$(editTds[i]).mousedown(function(e1){
					//console.info(e1)
					document.body.style.cursor = 'nw-resize'
					var x1 = ($(e1.target).attr('data-row'));
					var y1 = ($(e1.target).attr('data-cell'));
					$(e1.target).addClass('selectedTd');
					//鼠标移动
					document.onmousemove = function(e2){
						var x2 = ($(e2.target).attr('data-row'));
						var y2 = ($(e2.target).attr('data-cell'));
						$(e2.target).addClass('selectedTd');
						checkCollision(x1,y1,x2,y2);
						
					}
					
					//释放鼠标
					document.onmouseup = function(e3){
						var x3 = ($(e3.target).attr('data-row'));
						var y3 = ($(e3.target).attr('data-cell'));
						
						//
						//$(e3.target).addClass('selectedTd');
						//checkCollision(x1,y1,x3,y3);
						document.body.style.cursor = '';
						document.onmousemove = null;
						document.onmouseup = null;
					}
				});
			}
		}
		
		/**
		 * 
		 * @param {number} x1 起始行
		 * @param {number} y1 起始列
		 * @param {number} x2 结束行
		 * @param {number} y2 结束列
		 * @param {Object} startObj 起始e
		 * @param {Object} endObj	结束e
		 */
		function checkCollision(x1,y1,x2,y2){
			//debugger;
			console.info(x1,y1,x2,y2)
			x1 = x1*1;y1=y1*1;x2=x2*1;y2=y2*1;
			if(x1 != x2 || y1 != y2){ // 表示移动过 
				if(x2 >= x1 ){
					var xi = Math.abs(x2-x1)+1;
					var yi = Math.abs(y2-y1)+1;
					var oldxi = $('body > div > table > tbody > tr:nth-child('+(x1+1)+') > td:nth-child('+(y1+1)+')').attr('colspan');
					var oldyi = $('body > div > table > tbody > tr:nth-child('+(x1+1)+') > td:nth-child('+(y1+1)+')').attr('rowspan');
					$('body > div > table > tbody > tr:nth-child('+(x1+1)+') > td:nth-child('+(y1+1)+')').attr('colspan',yi);
					$('body > div > table > tbody > tr:nth-child('+(x1+1)+') > td:nth-child('+(y1+1)+')').attr('rowspan',xi);
					for(var i = 0 ; i < xi;i++){
						for(var j = 0 ; j < yi;j++){
							if(i == 0 && j == 0){
								
							}else{
								$('body > div > table > tbody > tr:nth-child('+(x1+i+1)+') > td:nth-child('+(y1+j+1)+')').hide();
							}
						}
					}
					
				}
				if(x2 < x1){
					for (var i = x2 ; i <= x1;i++) {
						
					}
				}
			}
		}
	</script>
</html>
