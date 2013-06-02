// dependency: pertcpm-2.js


function batchParse(){

	var table = document.getElementById("tabel");
	while (table.rows.length > 1){
		pertcpm.deleteRow(1);
	}


	var text = $("#batchInput").val();
	text = text.replace(/\r?\n/g, '<br />');
	var b_no;
	var b_nama;
	var b_ks;
	var b_op;
	var b_pr;
	var b_pe;

	var linesArray = text.split("<br />");
	console.log(linesArray.length);
	for (j=0; j < linesArray.length; j++) {
        var colsArray = linesArray[j].split(",");

        pertcpm.addRow();

        var id = pertcpm.banyakBaris-1;
     
        $("#col_no_"+id).val(colsArray[0]);
        $("#col_nama_"+id).val(colsArray[1]);
        $("#col_ks_"+id).val(colsArray[2]);
        $("#col_op_"+id).val(colsArray[3]);
        $("#col_pr_"+id).val(colsArray[4]);
        $("#col_pe_"+id).val(colsArray[4]);
	}
}