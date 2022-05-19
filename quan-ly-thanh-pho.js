showAllCity();

function showAllCity() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/thanhpho",

        success: function (danhSachThanhPho) {
            let content = '';
            for (let i = 0; i < danhSachThanhPho.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td><u><a href="detail.html" onclick="getDetailInfomation(${danhSachThanhPho[i].id})">${danhSachThanhPho[i].ten}</a></u></td>
        <td>${danhSachThanhPho[i].quocGia.ten}</td>
         <td><button onclick="showEditCityForm(${danhSachThanhPho[i].id})"><i>Chỉnh sửa</i></button></td>
        <td><button onclick="showDeleteForm(${danhSachThanhPho[i].id})"><i>Xóa</i></button></td>
       
    </tr>`
            }
            $('#danh_sach_thanh_pho').html(content);
        }

    })
    event.preventDefault();
}

function getDetailInfomation(id) {

    $.ajax({
        type: 'GET',
        url: `https://localhost:8080/thanhpho/${id}`,
        success: function (thanhPho) {
            $('#title').html(thanhPho.ten);
            $('#tenTP').html(thanhPho.ten);
            $('#ten').html(thanhPho.ten);
            $('#quocGia').html(thanhPho.quocGia.ten);
            $('#dienTich').html(thanhPho.dienTich);
            $('#danSo').html(thanhPho.danSo);
            $('#GDP').html(thanhPho.GDP);
            $('#moTa').html(thanhPho.moTa);
        }
    })
}

function showDeleteForm(id) {
    let content = `<table>
    <tr>
        <td colspan="2"><h2>Bạn chắc chắn muốn xóa ?</h2></td>
    </tr>
    <tr>
        <td>Tên TP:</td>
        <td id="ten"></td>
    </tr>
    <tr>
        <td>Quốc gia: </td>
        <td id="quocGia"></td>
    </tr>
    <tr>
        <td><button onclick="exitForm()">Quay lại</button></td>
        <td><button onclick="deleteCity(${id})">Xóa</button></td>
    </tr>
</table>`;
$.ajax({
    type: 'GET',
    url: `http://localhost:8080/thanhpho/${id}`,
    success: function (thanhPho) {
        $('#ten').html(thanhPho.ten);
        $('#quocGia').html(thanhPho.quocGia.ten);
    }
})
    $('#create-edit-form').html(content);
}

function deleteCity(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/thanhpho/${id}`,
        success: function () {
            exitForm();
            showAllCity();
        }
    })
}

function showCreateForm() {
    let conten = `<table>
            <tr>
                <td>Tên:</td>
                <td><input type="text" id="ten"></td>
            </tr>
            <tr>
                <td>Quốc Gia:</td>
                <td><select id="quocGia" style="width: 100%"></select></td>
            </tr>
            <tr>
                <td>Diện tích:</td>
                <td><input type="text" id="dienTich"></td>
            </tr>
            <tr>
                <td>Dân số:</td>
                <td><input type="text" id="danSo"></td>
            </tr>
            <tr>
                <td>GDP:</td>
                <td><input type="text" id="GDP"></td>
            </tr>
            <tr>
                <td>Mô tả:</td>
                <td><input type="text" id="moTa"></td>
            </tr>
            <tr>
            <td></td>
            <td><button style="margin-left: 1px" onclick="exitForm()">Hủy</button>      <button style="margin-right: 1px" onclick="createNewCity()">Tạo mới</button></td>
            </tr>
        </table>`;
    $('#create-edit-form').html(conten);
    getAllCountry();
}

function exitForm() {
    $('#create-edit-form').html("");
}

function createNewCity() {
    let tenThanhPho = $('#ten').val();
    let dienTichThanhPho = $('#dienTich').val();
    let danSoThanhPho = $('#danSo').val();
    let GDPThanhPho = $('#GDP').val();
    let moTaThanhPho = $('#moTa').val();
    let quocGiaThanhPho = $('#quocGia').val();
    let thanhPho = {
        ten: tenThanhPho,
        dienTich: dienTichThanhPho,
        danSo: danSoThanhPho,
        GDP: GDPThanhPho,
        moTa: moTaThanhPho,
        quocGia: {
            id: quocGiaThanhPho,
        }
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/thanhpho',
        data: JSON.stringify(thanhPho),
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            showAllCity();
            let ten = $('#ten').val(null);
            let dienTich = $('#dienTich').val(null);
            let danSo = $('#danSo').val(null);
            let GDP = $('#GDP').val(null);
            let moTa = $('#moTa').val(null);
            let quocGia = $('#quocGia').val(null);
        }
    })
}

function showEditCityForm(id) {

    let conten = `<table>
            <tr>
                <td><h2>Chỉnh sửa TP:</h2></td>
                <td><h2 id="ten_thanh_pho"></h2></td>
            </tr>
            <tr>
                <td>Tên: </td>
                <td><input type="text" id="ten"></input></td>
            </tr>
            <tr>
                <td>Quốc gia: </td>
                <td><select id="quocGia" style="width: 100%"></select></td>             
            </tr>
            <tr>
                <td>Diện tích: </td>
                <td><input type="text" id="dienTich"></input></td>
            </tr>
            <tr>
                <td>Dân số: </td>
                <td><input type="text" id="danSo"></input></td>
            </tr>
            <tr>
                <td>Giới thiệu: </td>
                <td><textarea id="moTa"></textarea></td>
            </tr>
            <tr>
                <td></td>
                <td><button onclick="exitForm()">Thoát</button>     <button onclick="editCity(${id})">Cập nhật</button></td>
            </tr>
        </table>`;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/thanhpho/${id}`,
        success: function (thanhPho) {
            $('#ten_thanh_pho').html(thanhPho.ten)
            $('#ten').val(thanhPho.ten);
            $('#quocGia').val(thanhPho.quocGia.ten);
            $('#dienTich').val(thanhPho.dienTich);
            $('#danSo').val(thanhPho.danSo);
            $('#moTa').val(thanhPho.moTa);

        }
    })
    event.preventDefault();
    $('#create-edit-form').html(conten);
    getAllCountry();
}

function editCity(id) {
    let tenThanhPho = $('#ten').val();
    let dienTichThanhPho = $('#dienTich').val();
    let danSoThanhPho = $('#danSo').val();
    let GDPThanhPho = $('#GDP').val();
    let moTaThanhPho = $('#moTa').val();
    let quocGiaThanhPho = $('#quocGia').val();
    let thanhPho = {
        ten: tenThanhPho,
        dienTich: dienTichThanhPho,
        danSo: danSoThanhPho,
        GDP: GDPThanhPho,
        moTa: moTaThanhPho,
        quocGia: {
            id: quocGiaThanhPho,
        }
    };
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/thanhpho/${id}`,
        data: JSON.stringify(thanhPho),
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {

            showAllCity();
            exitForm();
            // let ten = $('#ten').val(null);
            // let dienTich = $('#dienTich').val(null);
            // let danSo = $('#danSo').val(null);
            // let GDP = $('#GDP').val(null);
            // let moTa = $('#moTa').val(null);
            // let quocGia = $('#quocGia').val(null);
        }
    })
}

function getAllCountry() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/quocgia`,
        success: function (data) {
            let content = `<option>Chọn quốc gia</option>`
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].ten}</option>`
            }
            $('#quocGia').html(content);
        }
    })
}