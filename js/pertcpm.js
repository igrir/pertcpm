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
			 ["input","text", "span1 tgl","col_es_", "col_es"],
			 ["input","text", "span1 tgl","col_ef_", "col_ef"],
			 ["input","text", "span1 tgl","col_ls_", "col_ls"],
			 ["input","text", "span1 tgl","col_lf_", "col_lf"],
			 ["input","text", "span1","col_sl_", "col_sl"],
			 ["input","text", "span1","col_fs_", "col_fs"],
			 ["input","text", "span1","col_cp_", "col_cp"],
			 ],
	indeks_graf :[],
	graf : [],
	//fungsi inisialisasi
	init:function(){
		this.addRow();

		$("#edit_btn").hide();

		console.log(this.graf);
	},

	//fungsi mengedit data kembali. Ditrigger ketika tombol edit diklik
	edit:function(){
		/********* Memunculkan Tampilan  *********/
		
		$("#tabel").slideUp();

		//menampilkan t, es, ef, ls, lf, sl, fs, cp hide dulu
        $(".col_t"). hide();
        $(".col_es").hide();
        $(".col_ef").hide();
        $(".col_ls").hide();
        $(".col_lf").hide();
        $(".col_sl").hide();
        $(".col_fs").hide();
        $(".col_cp").hide();

        //menampilkan tombol edit
        $("#edit_btn").hide();

		/********* Menghilangkan Tampilan  *********/


		$("#tabel").slideDown();

		//menghilangkan tombol tambah
		$("#tambah_btn").show();

		//menghilangkan tombol hitung
		$("#hitung_btn").show();

		//menghilangkan kolom kegiatan sebelumnya
		$(".col_ks").fadeIn();

		//menghilangkan kolom optimis, probable, dan pesimis
		$(".col_op").fadeIn();
		$(".col_pr").fadeIn();
		$(".col_pe").fadeIn();

		//menghilangkan kolom hapus
		$(".col_hapus").fadeIn();
		
		
		
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

	            	element.title = "Tanggal " + this.kolom[i][3] + this.banyakBaris;

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

            $(".tgl").tooltip();
 
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
	            	}else{
	            		var cell = row.cells[j];

	            		var element = cell.getElementsByTagName('input')[0]; 

						
		            	element.id = this.kolom[i][3]+i;

		            	element.title = "Tanggal " + this.kolom[i][3] + i;

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


		$("#tabel").slideUp();

		//menghilangkan tombol tambah
		$("#tambah_btn").hide();

		//menghilangkan tombol hitung
		$("#hitung_btn").hide();

		//menghilangkan kolom kegiatan sebelumnya
		$(".col_ks").hide();

		//menghilangkan kolom optimis, probable, dan pesimis
		$(".col_op").hide();
		$(".col_pr").hide();
		$(".col_pe").hide();

		//menghilangkan kolom hapus
		$(".col_hapus").hide();
		
		/********* Memunculkan Tampilan  *********/
		
		$("#tabel").slideDown();

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
        $("#edit_btn").show();
		

        /********* Proses menghitung  *********/

        var table = document.getElementById("tabel");
        var rowCount = table.rows.length;

        for (i = 1; i < rowCount; i++) {
        	var op = $("#col_op_"+i).val();		//optimis
        	var pr = $("#col_pr_"+i).val();		//probable
        	var pe = $("#col_pe_"+i).val();		//pesimis
        	var t = $("#col_t_"+i);				//waktu
        	var ks = $("#col_ks_"+i);			//kegiatan sebelumnya
        	var no = $("#col_no_"+i);			//id kegiatan
        	var sl = $("#col_sl_"+i);			//slack
        	var fs = $("#col_fs_"+i);			//free slack
        	var cp = $("#col_cp_"+i);			//critical path


        	op = parseInt(op);
        	pr = parseInt(pr);
        	pe = parseInt(pe);


        	//menghitung t
        	var t_hasil = (op+(4*pr)+pe)/6;
        	// console.log(t_hasil);
        	t.val(t_hasil);

        	// memproses indeks untuk array dua dimensi
        	var idx = i-1; //indeks

        	//membuat indeks baris
        	this.indeks_graf[idx] = no.val();
        }

        //membuat array dua dimensi yang kosong di graf
        for (i = 0; i < rowCount-1; i++) {
        	this.graf[i] = new Array();
        	for (j = 0; j < rowCount-1; j++) {
        		this.graf[i][j] = 0;
        	}
        }


        //	memasukkan kegiatan sebelumnya ke dalam array
    	// bentuk array dua dimensi adalah seperti ini
    	//
    	//   0 1 2 3
    	// 0
    	// 1
    	// 2
    	// 3
    	//
    	//	indeks_graf baris pertama berisi 0..n indeks baris
    	for (i = 1; i < rowCount; i++) {
    		var op = $("#col_op_"+i).val();		//optimis
        	var pr = $("#col_pr_"+i).val();		//probable
        	var pe = $("#col_pe_"+i).val();		//pesimis
        	var t = $("#col_t_"+i);				//waktu
        	var ks = $("#col_ks_"+i);			//kegiatan sebelumnya
        	var no = $("#col_no_"+i);			//id kegiatan
        	var sl = $("#col_sl_"+i);			//slack
        	var fs = $("#col_fs_"+i);			//free slack
        	var cp = $("#col_cp_"+i);			//critical path

        	// memproses indeks untuk array dua dimensi
        	var idx = i-1; //indeks

        	// ubah node berspasi jadi array
        	var arr_node = new Array();
        	var ks_str = ks.val();
        	var node = "";
        	for (j=0; j <= ks_str.length ; j++ ) {
        		if (ks_str[j] == " " || j == ks_str.length) {
        			arr_node[arr_node.length] = node;
        			node = "";
        		}else{
        			node += ks_str[j]
        		}
        	}

        	//cari setiap indeks di arr_node di indeks_graf untuk dimasukkan ke dalam array dua dimensi graf
        	for (j = 0; j < arr_node.length; j++) {
        		var ketemu = false;
	        	var iter = 0;
	        	while (!ketemu && iter < this.indeks_graf.length) {

	        		if (arr_node[j] == this.indeks_graf[iter]) {
	        			ketemu = true;
	        			//masukkan ke dalam graf statusnya 1
	        			this.graf[idx][iter] = 1;
	        		}else{
	        			iter++;	
	        		}

	        		
	        	}
        	}

    	}

    	var print = "  ";
    	for (i = 0; i < this.indeks_graf.length; i++) {
    		print += this.indeks_graf[i] + " ";
    	}
    	console.log(print);

    	for (i = 0; i < this.graf.length; i++) {
    		var print = this.indeks_graf[i]+ " ";
    		for (j = 0; j < this.graf.length; j++) {
    			print += this.graf[i][j] + " ";
    		}
    		console.log(print);
    	}
        

	}



};

/*
============================================================
Tutorial, Referensi, dan Daftar Pustaka
============================================================

http://viralpatel.net/blogs/dynamically-add-remove-rows-in-html-table-using-javascript/

*/