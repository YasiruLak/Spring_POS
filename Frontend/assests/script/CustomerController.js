var baseurl = "http://localhost:8080/13_Model_Mapper_war/api/v1/customer"

loadAllCustomer();
// $("#btnSaveCustomer").attr('disabled', true);


$("#btnSaveCustomer").click(function () {
    let data = $("#customerForm").serialize();

    $.ajax({
        url: baseurl,
        method: "POST",
        data: data,
        success: function (res) {
            if (res.code == 200) {
                loadAllCustomer();
                alert(res.message);
                resetCustomer();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
});


$("#btnGetAllCustomer").click(function () {
    resetCustomer();
    loadAllCustomer();

});

function resetCustomer() {
    $("#txtCusId").val("");
    $("#txtCusName").val("");
    $("#txtCusAddress").val("");
    $("#txtCusContact").val("");
    $("#txtSearchCustomer").val("");
}

function loadAllCustomer() {
    $("#customerTable").empty();
    $.ajax({
        url: baseurl,
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#customerTable").append(row);

            }
            bindClickEvents();
        },

        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}


$("#btnDeleteCustomer").click(function () {
    let customerID = $("#txtCusId").val();

    $.ajax({
        url: baseurl + "?id=" + customerID,
        method: "DELETE",

        success: function (res) {
            if (res.code == 200) {
                alert(res.message);
                resetCustomer();
                loadAllCustomer();
            }

        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
});

$("#btnUpdateCustomer").click(function () {
    let cusOb = {
        id: $("#txtCusId").val(),
        name: $("#txtCusName").val(),
        address: $("#txtCusAddress").val(),
        contact: $("#txtCusContact").val()
    }
    $.ajax({
        url: baseurl,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.code == 200) {
                alert(res.message);
                resetCustomer();
                loadAllCustomer()
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
});

$("#btnSearchCustomer").click(function () {
    let customerID = $("#txtSearchCustomer").val();
    $("#customerTable").empty();
    $.ajax({
        url: baseurl + "/" + customerID,
        method: "GET",
        success: function (resp) {
            var customer = resp.data;
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#customerTable").append(row);

            bindClickEvents();
        }

    });
});

function bindClickEvents() {
    $("#customerTable>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();

        $("#txtCusId").val(id);
        $("#txtCusName").val(name);
        $("#txtCusAddress").val(address);
        $("#txtCusContact").val(contact);
    });
}