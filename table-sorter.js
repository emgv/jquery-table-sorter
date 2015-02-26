/*
	Plugin para añadir la ordenación de tablas por
	columnas.

	Autor: Engerbeth Gomes | emgvivas@gmail.com
*/
(function ( $ ) {

	$.fn.tablaOrdenada = function(){
		return this.each(
			function(){
				var tbl= $(this);
				
				tbl.data('ordenacionAsc', false);

				tbl.find('a.ordenar').click(
					function(){
						var col= $(this).closest('th').index();
						var fg= tbl.data('ordenacionAsc');
						
						ordenarTabla(tbl, col, !fg);
						tbl.data('ordenacionAsc', !fg);
					}
				);
			}
		);
	}


	/*
		tbl=> el objecto tabla a ordenar
		col=> el indice de la columna, 0,1,...N
		asc=> booleano que indica el tipo de ordenacion,
			  true=> ascendiente, false=> descendiente
	*/
    var ordenarTabla= function(tbl, col, asc){
		//debe ir aqui! ese registro por elemento ultimaColumnaOrdenada: -1
		//$.data(this, 'numTds', $(this).find('td').length);

		var colArr= new Array();
		var i=0, e=0, r= new RegExp('^[0-9]*$');

		tbl.find('tr').each(
			function(){

				var ctd= $(this).find('>td:eq('+col+')');
				var htm= $(this).html();

				if( ctd.length > 0){
					colArr[i] = {val: ctd.text(), trHtml: htm};
					
					if( r.test(colArr[i].val.replace(/\r|\n| /gi,'')) )
						e++;
					
					i++;
				}

			}
		);

		if(e<i){//ordenacion alfanumerica
    		colArr.sort(function(a,b){
    			var ret;
    			if(a.val > b.val)
    				ret= (asc == true) ? 1:-1;
    			
    			else if(a.val < b.val)
    				ret= (asc == true) ? -1:1;
    			else
    				return 0;

    			return ret;
    		});
		}else{//ordenacion numerica
			colArr.sort(function(a,b){
    			if(parseInt(a.val) > parseInt(b.val))
    				ret= (asc == true) ? 1:-1;
    
    			else if(parseInt(a.val) < parseInt(b.val))
    				ret= (asc == true) ? -1:1;

    			else
    				return 0;

    			return ret;
    		});
		}//fin ordenacion

		i=0;
		tbl.find('tr').each(
			function(){
				var ctd= $(this).find('>td');
				if(ctd.length > 0){
					$(this).html(colArr[i].trHtml);
					i++;
				}
			}
		);
    }
}(jQuery));

