const form            = document.querySelector('#register');
const regList         = document.querySelector('#regList');
const namaInput       = document.querySelector('#name');
const genderInput     = document.querySelector('#gender');
const noHpInput       = document.querySelector('#hp');
const addressInput    = document.querySelector('#address');

loadEventListeners();

function loadEventListeners() {
    
    document.addEventListener('DOMContentLoaded', ambilReg);

    form.addEventListener('submit', addReg);
    regList.addEventListener('click', removeReg);
}

// Fungsi untuk menampilkan data dari Localstorage
function ambilReg() {
    let regs;

    if(localStorage.getItem('regs') === null) {
        regs = [];
    }
    else {
        regs = JSON.parse(localStorage.getItem('regs'));
    }

    // Untuk menampilkan data dari Localstorage
    regs.forEach(function(reg) {

        let tr = document.createElement('tr');
        tr.innerHTML = reg;
        
        regList.appendChild(tr);
    });
}

function addReg(e) {
    if (namaInput.value =='' || genderInput.value=='' || noHpInput.value=='' || addressInput.value=='') {
        alert ('Semua data harus diisi')
    }

    let nama = document.createTextNode(namaInput.value);
    let gender = document.createTextNode(genderInput.value);
    let noHp = document.createTextNode(noHpInput.value);
    let address = document.createTextNode(addressInput.value);

    let link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="btn btn-danger text-center">Hapus Data</i>';

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    td1.appendChild(nama);
    td2.appendChild(gender);
    td3.appendChild(noHp);
    td4.appendChild(address);
    td5.appendChild(link);

    let tr = document.createElement('tr');
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    regList.appendChild(tr);

    // Untuk mengubah ke bentuk html untuk disimpan ke dalam Localstorage
    simpanData(tr.innerHTML);

    namaInput.value = '';
    genderInput.value = '';
    noHpInput.value = '';
    addressInput.value = '';

    e.preventDefault();

}

// Fungsi untuk menyimpan data ke dalam Localstorage
function simpanData(reg) {
    let regs;
    if(localStorage.getItem('regs') === null) {
        regs = [];
    }
    else {
        regs = JSON.parse(localStorage.getItem('regs'));
    }

    regs.push(reg);

    localStorage.setItem('regs', JSON.stringify(regs));
}

// Fungsi untuk menghapus data
function removeReg(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('apakah anda yakin ingin menghapus data ?')) {
            e.target.parentElement.parentElement.parentElement.remove();
        }
    }

    hapusDataLocal(e.target.parentElement.parentElement.parentElement);
}

// Fungsi Untuk menghapus data dari Localstorage
function hapusDataLocal(regItem) {
    let regs;
    if(localStorage.getItem('regs') === null) {
        regs = [];
    }
    else {
        regs = JSON.parse(localStorage.getItem('regs'));
    }

    regs.forEach(function(reg,index) {
        if(regItem.innerHTML === reg) {
            regs.splice(index, 1);
        }
    });

    localStorage.setItem('regs', JSON.stringify(regs));
}