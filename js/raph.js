// Copyright @igrir
// email: giri.prahasta@student.upi.edu

raph = {};


/**
 * Array semua node
 */
raph.arrNode = [];


/**
 * Array dua dimensi untuk graf
 * Struktur dari graf ini adalah:
 * kolom adalah = tujuan
 * baris adalah = asal
 *
 *  contoh :
 *    a b
 *  c 1 0
 *  d 0 0
 *  ----
 *  1 berarti ada jalur dari c ke a
 */
raph.graph = [[]];


/**
 * Fungsi membuat graf
 * Merupakan inisialisasi dalam membuat graf
 */
raph.createGraph = function (arrNode) {
    //masukkan semua node yang akan dibuat grafnya
    raph.arrNode = arrNode;
    
    // buat array dua dimensi membuat graf
    for (i=0;i<this.arrNode.length;i++) {
        raph.graph[i] = new Array();
        for (j=0;j<this.arrNode.length;j++) {
            //inisialisasi nilainya 0, berarti tidak ada jalan
            raph.graph[i][j] = 0;
        }
    }
}


/**
 * Fungsi menghubungkan dari induk ke child
 *  @param {String} induk Nama induk
 *  @param {String} child Nama child yang mau dimasukkan
 */
raph.addArc = function (induk, child) {
   // tentukan dimana posisi induk dalam arrNode
   var nodeInduk = this.findNodeIndex(induk);
   var nodeChild = this.findNodeIndex(child);
 
    console.log("induk " + nodeInduk);
    console.log("child " + nodeChild);
   
   // buat arc yang menghubungkan dari nodeInduk ke nodeChild
   // angka 1 = terhubung
   raph.graph[nodeInduk][nodeChild] = 1;
}


/**
 *  Mendapatkan indeks dari arrNode
 *  @param {String} id Id dari nama Node
 *  @return {int} Indeksnya
 */
raph.findNodeIndex = function(id){
    //cari setiap indeks di arrNode di indeks_graf untuk dimasukkan ke dalam array dua dimensi graf
    var ketemu = false;
    var iter = 0;
    while (!ketemu && iter < this.arrNode.length) {

        if (id == this.arrNode[iter]) {
            ketemu = true;
        }else{
            iter++; 
        }   
    }
    if (ketemu) {
        return iter;
    }else{
        return -1;
    }
}



/**
 * Menampilkan graf di console
 */
raph.printGraph = function(){
    
    var result = "";
    
    // print index di bagian atas
    result = "  ";
    for (j=0; j<this.graph.length;j++) {
        result += raph.arrNode[j] + " ";
    }
    console.log(result);
    
    for (i=0; i<this.graph.length;i++) {
        
        // print isinya
        result = raph.arrNode[i] + " ";
        for (j=0; j<this.graph.length;j++) {
            result += raph.graph[i][j] + " ";
        }
        console.log(result);
        
        
    }
}

/**
 * Mendapatkan indeks-indeks anak-anaknya dari node awal
 * @param {String} id Nama id node induk di pertcpm.node_data
 * @return {Array} Array yang berisi indeks-indeks alamat childnya di pertcpm.node_data
 */
raph.getChild = function (id) {
    
    var node_index = raph.findNodeIndex(id);
    var childs = new Array();
    
    // lakukan perulangan sepanjang banyaknya kolom di raph.graph
    // untuk mengambil indeks-indeks mana saja yang terisi (ada angka 1)
    for (i=0;i<this.graph.length;i++) {
        if (this.graph[node_index][i] == 1) {
            childs[childs.length] = i;
        }
    }
    
    return childs;
}

init = function() {
    raph.createGraph(["S", "F","0","1","2","3"]);
    raph.printGraph();
    
    raph.addArc("0","1");
    raph.printGraph();
}