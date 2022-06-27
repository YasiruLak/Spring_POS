var baseurl1 = "http://localhost:8080/Backend_war_exploded/api/v1/item"

loadAllItem();

$("#btnItemSave").click(function (){
    let itemData = $("#itemForm").serialize();

    if ($("#txtItemCode").val() == '') {
        alert("Can not be Item Code empty");
    } else if ($("#txtItemName").val() == '') {
        alert("Can not be Item Name empty");
    }else if ($("#txtItemQuantity").val() == '') {
        alert("Can not be Item Quantity empty");
    }else if ($("#txtItemUnitPrice").val() == '') {
        alert("Can not be Item Price empty");
    }else{
        $.ajax({
            url:baseurl1,
            method:"POST",
            data: itemData,
            success: function (res){
                if (res.status == 200){
                    loadAllItem();
                    alert(res.message);
                    resetItem();
                }
                loadAllItem();
            },
            error: function (ob) {
                alert(ob.responseJSON.message);
                loadAllItem();
            }
        });
    }
});

$("#btnGetAllItem").click(function (){
    resetItem();
    loadAllItem();
});


function resetItem(){
    $("#txtItemCode").val("");
    $("#txtItemName").val("");
    $("#txtItemUnitPrice").val("");
    $("#txtItemQuantity").val("");
    $("#txtSearchItem").val("");
}

function bindClickEvent() {

    $("#itemToTable>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qtyOnHand = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#txtItemCode").val(id);
        $("#txtItemName").val(name);
        $("#txtItemQuantity").val(qtyOnHand);
        $("#txtItemUnitPrice").val(price);

    });
}

function loadAllItem(){
    $("#itemToTable").empty();
    $.ajax({
        url:baseurl1,
        method:"GET",
        success:function (resp){
            for (const item of resp.data){
                let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;
                $("#itemToTable").append(row);

            }
            bindClickEvent();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

$("#btnItemDelete").click(function (){
    let itemCode = $("#txtItemCode").val();

    $.ajax({
        url: baseurl1 + "?id=" + itemCode,
        method: "DELETE",

        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                resetItem();
                loadAllItem();
            }
            loadAllItem();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
            loadAllItem();
        }
    });
});


$("#btnItemUpdate").click(function (){
    let itemOb = {
        code: $("#txtItemCode").val(),
        name: $("#txtItemName").val(),
        qty: $("#txtItemQuantity").val(),
        price: $("#txtItemUnitPrice").val()
    };
    $.ajax({
        url: baseurl1,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(itemOb),
        success: function (res){
            if (res.status == 200){
                alert(res.message);
                resetItem();
                loadAllItem();
            }
            loadAllItem();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
            loadAllItem();
        }

    });
});

$("#btnItemSearch").click(function (){
    let itemCode = $("#txtSearchItem").val();
    $("#itemToTable").empty();
    $.ajax({
        url:baseurl1 + "/" + itemCode,
        method:"GET",
        success:function (resp){
            var item = resp.data;
                let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;
                $("#itemToTable").append(row);

            bindClickEvent();
        }
    });
});


