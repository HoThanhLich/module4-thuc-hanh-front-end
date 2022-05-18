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
        <td>${danhSachThanhPho[i].ten}</td>
        <td>${danhSachThanhPho[i].quocGia.ten}</td>
         <td><button onclick="showEditCityForm(${danhSachThanhPho[i].id})"><i>Chỉnh sửa</i></button></td>
        <td><button onclick="showDelete(${danhSachThanhPho[i].id})"><i>Xóa</i></button></td>
       
    </tr>`
            }
            $('#danh_sach_thanh_pho').html(content);
        }

    })
    event.preventDefault();
}

function showEditCityForm() {

}