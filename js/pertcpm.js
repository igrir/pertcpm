var pertcpm = {

	//tampung banyaknya baris
	banyakBaris:1,

	//kolom yang ingin dicetak
	//element, type, className, id, class column
	kolom : [["input","text", "span1","col_no_", "col_no"],
			 ["input","text", "span3","col_nama_", "col_nama"],
			 ["input","text", "span4","col_ks_", "col_ks"],
			 ["input","text", "span2","col_op_", "col_op"],
			 ["input","text", "span2","col_pr_", "col_pr"],
			 ["input","text", "span2","col_pe_", "col_pe"],
			 ["button-hapus","button", "","col_hapus_", "col_hapus"],
			 ["input","text", "span1","col_t_", "col_t"],
			 ["input","text", "span1","col_es_", "col_es"],
			 ["input","text", "span1","col_ef_", "col_ef"],
			 ["input","text", "span1","col_ls_", "col_ls"],
			 ["input","text", "span1","col_lf_", "col_lf"],
			 ["input","text", "span1","col_sl_", "col_sl"],
			 ["input","text", "span1","col_fs_", "col_fs"],
			 ["input","text", "span1","col_cp_", "col_cp"],
			 ],

	//fungsi inisialisasi
	init:function(){
		this.addRow();

		$("#edit_btn").hide();
	},

	//fungsi mengedit data kembali. Ditrigger ketika tombol edit diklik
	edit:function(){
		$("#tambah_btn").fadeIn();
		$("#hitung_btn").fadeIn();
		$(".col_ks")	.fadeIn();
		$(".col_op")	.fadeIn();
		$(".col_pr")	.fadeIn();
		$(".col_pe")	.fadeIn();

		//menghilangkan kolom hapus
		$(".col_hapus").fadeIn();

		//menampilkan t, es, ef, ls, lf, sl, fs, cp hide dulu
        $(".col_t"). fadeOut();
        $(".col_es").fadeOut();
        $(".col_ef").fadeOut();
        $(".col_ls").fadeOut();
        $(".col_lf").fadeOut();
        $(".col_sl").fadeOut();
        $(".col_fs").fadeOut();
        $(".col_cp").fadeOut();

        //menampilkan tombol edit
        $("#edit_btn").fadeOut();
	},
	//fungsi menambah baris baru
	addRow:function(){

		



		    var table = document.getElementById("tabel");
 
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);

            for (i = 0 ; i < this.kolom.length; i++) {
            	if (this.kolom[i][0] == "button-hapus") {
            		var cell = row.insertCell(i);
            		cell.className = this.kolom[i][4];

            		cell.innerHTML = "<button class='btn btn-danger' onClick='pertcpm.deleteRow("+this.banyakBaris+")'>" +
            						  	"<i class='icon-trash icon-white'></i>" +
            						  "</button>";


            		// btn span1 icon-trash
            	}else{
            		var cell = row.insertCell(i);
            		cell.className = this.kolom[i][4];

	            	var element = document.createElement(this.kolom[i][0]);
	            	element.type = this.kolom[i][1];
	            	element.className = this.kolom[i][2];
	            	element.id = this.kolom[i][3]+this.banyakBaris;


	            	cell.appendChild(element);
            	}

            }

            //yang t, es, ef, ls, lf, sl, fs, cp hide dulu
            $(".col_t").hide();
            $(".col_es").hide();
            $(".col_ef").hide();
            $(".col_ls").hide();
            $(".col_lf").hide();
            $(".col_sl").hide();
            $(".col_fs").hide();
            $(".col_cp").hide();
 
            this.banyakBaris++;
            rowCount++;
 
	},

	//fungsi menghapus baris berdasarkan id tertent
	deleteRow:function(id){
		try {
	        var table = document.getElementById("tabel");
	        var rowCount = table.rows.length;

	        table.deleteRow(id);
	        rowCount--;
	        this.banyakBaris--;

	        //reindex semua id
            
            for (i = 1 ; i < rowCount; i++) {

            	var row = table.rows[i];

            	for (j = 0 ; j < this.kolom.length; j++) {
            		if (this.kolom[j][0] == "button-hapus") {
	       				var cell = row.cells[6];
		            	cell.innerHTML = "<button class='btn btn-danger' onClick='pertcpm.deleteRow("+i+")'>" +
	            						  	"<i class='icon-trash icon-white'></i>" +
	    								  "</button>";

	    						  console.log("edit " + i);		
	            	}

            	}
            }


        }catch(e) {
            alert(e);
        }	
	},

	//proses menghitung
	hitung:function(){


		/********* Menghilangkan Tampilan  *********/

		//menghilangkan tombol tambah
		$("#tambah_btn").fadeOut();

		//menghilangkan tombol hitung
		$("#hitung_btn").fadeOut();

		//menghilangkan kolom kegiatan sebelumnya
		$(".col_ks").fadeOut();

		//menghilangkan kolom optimis, probable, dan pesimis
		$(".col_op").fadeOut();
		$(".col_pr").fadeOut();
		$(".col_pe").fadeOut();

		//menghilangkan kolom hapus
		$(".col_hapus").fadeOut();

		/********* Memunculkan Tampilan  *********/
		//menampilkan t, es, ef, ls, lf, sl, fs, cp hide dulu
        $(".col_t"). fadeIn();
        $(".col_es").fadeIn();
        $(".col_ef").fadeIn();
        $(".col_ls").fadeIn();
        $(".col_lf").fadeIn();
        $(".col_sl").fadeIn();
        $(".col_fs").fadeIn();
        $(".col_cp").fadeIn();

        //menampilkan tombol edit
        $("#edit_btn").fadeIn();

        

	}



};

/*
============================================================
Tutorial, Referensi, dan Daftar Pustaka
============================================================

http://viralpatel.net/blogs/dynamically-add-remove-rows-in-html-table-using-javascript/

*/