//
// ============================================================
// Tutorial, Referensi, dan Daftar Pustaka
// ============================================================
//
// http://viralpatel.net/blogs/dynamically-add-remove-rows-in-html-table-using-javascript/


/**
 * @fileoverview Penghitung proyek kapan dilaksanakan dengan metode PERT-CPM
 * @author giri.prahasta@student.upi.edu (Giri Prahasta Putra)
 */

pertcpm = {};

/**
 *  Objek node
 *  @param {String} no Nomor indeks dari node
 *  @param {String} nama Nama kegiatan dari node
 *  @param {int} t banyak waktu untuk Node
 *  @constructor
 */
pertcpm.Node = function(no, nama, t){
    this.no     = no;
    this.nama   = nama;
    this.ks     = "";
    this.op     = 0;
    this.pr     = 0;
    this.pe     = 0;
    this.t      = 0;
    this.es     = 0;
    this.ef     = 0;
    this.ls     = 0;
    this.lf     = 0;
    this.sl     = 0;
    this.fs     = 0;
    this.cp     = false;
};


/**
 *  Tampung banyak baris
 *  @type {Number}
 *  @const
 */
pertcpm.banyakBaris = 1;


/**
 *  Kolom yang ingin dicetak
 *  strukturnya :
 *  element, type, className, id, class column
 *  @type {Array}
 *  @const
 */
pertcpm.kolom = [["input","text", "span1","col_no_", "col_no"],
                 ["input","text", "span5","col_nama_", "col_nama"],
                 ["input","text", "span3","col_ks_", "col_ks"],
                 ["input","text", "span1","col_op_", "col_op"],
                 ["input","text", "span1","col_pr_", "col_pr"],
                 ["input","text", "span1","col_pe_", "col_pe"],
                 ["button-hapus","button", "","col_hapus_", "col_hapus"],
                 ["input","text", "span1","col_t_", "col_t"],
                 ["input","text", "span1 tgl","col_es_", "col_es"],
                 ["input","text", "span1 tgl","col_ef_", "col_ef"],
                 ["input","text", "span1 tgl","col_ls_", "col_ls"],
                 ["input","text", "span1 tgl","col_lf_", "col_lf"],
                 ["input","text", "span1","col_sl_", "col_sl"],
                 ["input","text", "span1","col_fs_", "col_fs"],
                 ["input","text", "span1","col_cp_", "col_cp"],
                 ];


/**
 *  Nodes yang ada dalam graf
 *  @type 
 *  @const
 */
pertcpm.node_data = [];


/**
 *  Inisialisasi, menambah row baru, menghilangkan tombol edit
 */
pertcpm.init = function(){
    pertcpm.addRow();

    $("#edit_btn").hide();

    console.log(raph.graph);
}


/**
 *  Menampilkan tampilan edit
 */
pertcpm.showEdit = function(){
    
        // menghilangkan tampilan hasil
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

        // menampilkan tombol edit
        $("#edit_btn").hide();

        // memunculkan tampilan edit
        $("#tabel").slideDown();

        // menghilangkan tombol tambah
        $("#tambah_btn").show();

        // menghilangkan tombol hitung
        $("#hitung_btn").show();

        // menghilangkan kolom kegiatan sebelumnya
        $(".col_ks").fadeIn();

        // menghilangkan kolom optimis, probable, dan pesimis
        $(".col_op").fadeIn();
        $(".col_pr").fadeIn();
        $(".col_pe").fadeIn();

        // menghilangkan kolom hapus
        $(".col_hapus").fadeIn();
}


/**
 *  Menambah baris baru di kolom
 */
pertcpm.addRow = function(){
    
        var table = document.getElementById("tabel");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        for (i = 0 ; i < pertcpm.kolom.length; i++) {
            
            //proses khusus untuk kolom tombol hapus
            if (pertcpm.kolom[i][0] == "button-hapus") {
                var cell = row.insertCell(i);
                cell.className = pertcpm.kolom[i][4];
                cell.innerHTML = "<button class='btn btn-danger' onClick='pertcpm.deleteRow("+pertcpm.banyakBaris+")'>" +
                                    "<i class='icon-trash icon-white'></i>" +
                                  "</button>";
            //proses kolom selain tombol hapus
            }else{
                var cell = row.insertCell(i);
                cell.className = pertcpm.kolom[i][4];

                var element = document.createElement(pertcpm.kolom[i][0]);
                element.type        = pertcpm.kolom[i][1];
                element.className   = pertcpm.kolom[i][2];
                element.id          = pertcpm.kolom[i][3] + pertcpm.banyakBaris;

                element.title = "Tanggal " + pertcpm.kolom[i][3] + pertcpm.banyakBaris;

                cell.appendChild(element);
            }

        }

        // Yang t, es, ef, ls, lf, sl, fs, cp hide dulu karena hanya ditampilkan untuk hasil
        $(".col_t").hide();
        $(".col_es").hide();
        $(".col_ef").hide();
        $(".col_ls").hide();
        $(".col_lf").hide();
        $(".col_sl").hide();
        $(".col_fs").hide();
        $(".col_cp").hide();

        pertcpm.banyakBaris++;
        rowCount++;

        $(".tgl").tooltip();

}


/**
 * Menghapus baris berdasarkan id tertentu
 */
pertcpm.deleteRow = function(id){
    try {
        var table = document.getElementById("tabel");
        var rowCount = table.rows.length;

        table.deleteRow(id);
        rowCount--;
        pertcpm.banyakBaris--;

        // Reindex semua id elemen di baris menjadi terurut . Hal ini dilakukan agar saat mengambil id
        // di proses perhitungan dapat dilakukan secara perulangan
        for (i = 1 ; i < rowCount; i++) {

            var row = table.rows[i];

            for (j = 0 ; j < pertcpm.kolom.length; j++) {
                
                // proses khusus tombol hapus
                if (pertcpm.kolom[j][0] == "button-hapus") {
                    var cell = row.cells[6];
                    cell.innerHTML = "<button class='btn btn-danger' onClick='pertcpm.deleteRow("+i+")'>" +
                                        "<i class='icon-trash icon-white'></i>" +
                                      "</button>";

                              console.log("edit " + i);     
                // proses selain tombol hapus
                }else{
                    var cell = row.cells[j];
                    var element = cell.getElementsByTagName('input')[0]; 
                    element.id = pertcpm.kolom[j][3]+i;
                    element.title = "Tanggal " + pertcpm.kolom[i][3] + i;
                }
            }
        }
    }catch(e) {
        alert(e);
    }   
}


/**
 *  Animasi menampilkan tabel hasil perhitungan
 */
pertcpm.animasiHitung = function() {
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
}


/**
 * Proses menghitung
 */
pertcpm.hitung = function(){
    
        // penampung semua Node yang ada
        var arrNode = new Array();
        
        arrNode[0] = "S";   //start
        arrNode[1] = "F";   //finish
        
        var table = document.getElementById("tabel");
        var rowCount = table.rows.length;

        for (i = 1; i < rowCount; i++) {
            var op   = $("#col_op_"+i);     //optimis
            var pr   = $("#col_pr_"+i);     //probable
            var pe   = $("#col_pe_"+i);     //pesimis
            var t    = $("#col_t_"+i);      //waktu
            var ks   = $("#col_ks_"+i);     //kegiatan sebelumnya
            var no   = $("#col_no_"+i);     //id kegiatan
            var sl   = $("#col_sl_"+i);     //slack
            var fs   = $("#col_fs_"+i);     //free slack
            var cp   = $("#col_cp_"+i);     //critical path
            var nama = $("#col_nama_"+i);   //nama


            op = parseInt(op);
            pr = parseInt(pr);
            pe = parseInt(pe);


            //menghitung t
            var t_hasil = (op+(4*pr)+pe)/6;

            // memproses indeks untuk array dua dimensi
            var idx = i-1; //indeks

            //membuat objek node
            //var node = new this.Node(no.val(), nama.val(), t_hasil);
            
            //masukkan node baru ke dalam node_data
            arrNode[arrNode.length] = no.val();
        }

        //membuat graf
        raph.createGraph(arrNode);
        console.log("arrNodes " + arrNode);

        //  memasukkan kegiatan sebelumnya ke dalam array
        // bentuk array dua dimensi adalah seperti ini
        //
        //   0 1 2 3
        // 0
        // 1
        // 2
        // 3
        //
        //  indeks_graf baris pertama berisi 0..n indeks baris
        for (i = 1; i < rowCount; i++) {
            var op   = $("#col_op_"+i);     //optimis
            var pr   = $("#col_pr_"+i);     //probable
            var pe   = $("#col_pe_"+i);     //pesimis
            var t    = $("#col_t_"+i);      //waktu
            var ks   = $("#col_ks_"+i);     //kegiatan sebelumnya
            var no   = $("#col_no_"+i);     //id kegiatan
            var sl   = $("#col_sl_"+i);     //slack
            var fs   = $("#col_fs_"+i);     //free slack
            var cp   = $("#col_cp_"+i);     //critical path
            var nama = $("#col_nama_"+i);     //nama

            // memproses indeks untuk array dua dimensi
            var idx = i-1; //indeks

            // ubah node berspasi jadi array
            var arr_node = new Array();
            var ks_str = ks.val();
            var node = "";
            
            console.log("ke-"+i);
            
            for (j=0; j <= ks_str.length ; j++ ) {
                if (ks_str[j] == " " || j == ks_str.length) {

                    //masukkan kalau node tidak kosong
                    if (node != "") {
                        //tambah node baru di paling belakang
                        arr_node[arr_node.length] = node;

                        node = "";
                    }
                    
                }else{
                    node += ks_str[j]
                }
            }

            
            //jika tidak punya kegiatan sebelumnya maka ditujukan ke induk
            if (arr_node.length == 0) {
                raph.addArc("S", no.val());
            }else{
                //cari setiap indeks di arr_node di indeks_graf untuk dimasukkan ke dalam array dua dimensi graf
                for (j = 0; j < arr_node.length; j++) {
                    raph.addArc(arr_node[j], no.val());               
                }    
            }
            
            
        }
        
        //hubungkan ke finish jika tidak ada kegiatan yang dituju setelahnya
        for (j = 0; j< 5; j++) {
            var childs = raph.getChild(raph.arrNode[j]);
            console.log("iterasi : " + j);
            console.log("NODE YANG DILIHAT: " + raph.arrNode[j]);
            if (childs.length == 0) {
                raph.addArc(raph.arrNode[j], "F");
            }
        }
        
        raph.printGraph();
        
        // proses forward pass
        
        
    // menampilkan tampilan hasil perhitungan
    pertcpm.animasiHitung();
}