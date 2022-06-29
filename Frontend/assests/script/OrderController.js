var baseurl2 = "http://localhost:8080/Backend_war_exploded/api/v1/purchase_Orders"

function generateOrderID() {
    $("#txtOrderID").val("O00-0001");
    $.ajax({
        url: baseurl2,
        method: "GET",
        success: function (resp) {
            for (const orders of resp.data) {
                let orderId = orders.oId;
                let tempId = parseInt(orderId.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#txtOrderID").val("O00-000" + tempId);
                } else if (tempId <= 99) {
                    $("#txtOrderID").val("O00-00" + tempId);
                } else if (tempId <= 999) {
                    $("#txtOrderID").val("O00-0" + tempId);
                } else {
                    $("#txtOrderID").val("O00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

generateOrderID();

function loadAllOrders(){
    $("#orderTable").empty();
    $.ajax({
        url: baseurl2,
        method: "GET",
        success: function (resp) {
            for (const orders of resp.data) {
                let row = `<tr><td>${orders.oId}</td><td>${orders.custId}</td><td>${orders.date}</td><td>
                ${orders.total}</td><td>${orders.discount}</td><td>${orders.subTotal}</td></tr>`;
                $("#orderTable").append(row);

            }
            // bindOrderDetailsClickEvent();
        }
    });
}

loadAllOrders();

function setCurrentDate() {
    let orderDate = $('#txtOrderDate');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    orderDate.val(today);
}

setCurrentDate();

function loadItemComboBoxData() {
    $("#txtOrderItemCode").empty();
    $("#txtOrderItemCode").append($("<option></option>").attr("value", 0).text("Select Item"));
    let count = 0;
    $.ajax({
        url: "http://localhost:8080/Backend_war_exploded/api/v1/item",
        method: "GET",
        success: function (res) {
            for (const item of res.data) {
                $("#txtOrderItemCode").append($("<option></option>").attr("value", count).text(item.code));
                count++;
            }
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
        }
    });

}

function loadCustomerComboBoxData() {
    $("#txtOrderCusID").empty();
    $("#txtOrderCusID").append($("<option></option>").attr("value", 0).text("Select Customer"));
    let count = 0;
    $.ajax({
        url: "http://localhost:8080/Backend_war_exploded/api/v1/customer",
        method: "GET",
        success: function (res) {
            for (const customer of res.data) {
                $("#txtOrderCusID").append($("<option></option>").attr("value", count).text(customer.id));
                count++;
            }
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
        }
    });
}

$("#txtOrderCusID").click(function () {

    let id = $("#txtOrderCusID option:selected").text();
    let name = $("#txtOrderCusName").val();
    let address = $("#txtOrderCusAddress").val();
    let contact = $("#txtOrderCusContact").val();


    $.ajax({
        url: "http://localhost:8080/Backend_war_exploded/api/v1/customer",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {

                if (customer.id == id) {

                    name = customer.name;
                    address = customer.address;
                    contact = customer.contact;

                    $("#txtOrderCusName").val(name);
                    $("#txtOrderCusAddress").val(address);
                    $("#txtOrderCusContact").val(contact);
                }

            }
        }
    });


});


$("#txtOrderItemCode").click(function () {

    let id = $("#txtOrderItemCode option:selected").text();
    let name = $("#txtOrderItemName").val();
    let qtyOnHand = $("#txtOrderItemQtyOnHand").val();
    let price = $("#txtOrderItemPrice").val();

    $.ajax({
        url: "http://localhost:8080/Backend_war_exploded/api/v1/item",
        method: "GET",
        success: function (resp) {
            for (const item of resp.data) {
                if (item.code == id) {

                    name = item.name;
                    qtyOnHand = item.qty;
                    price = item.price;

                    $("#txtOrderItemName").val(name);
                    $("#txtOrderItemQtyOnHand").val(qtyOnHand);
                    $("#txtOrderItemPrice").val(price);
                }
            }
        }
    });
});

function bindOrderClickEvent() {
    $("#addToCartTable>tr").click('click', function () {

        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        console.log(itemCode);
        let itemName = $(this).children(":eq(1)").text();
        let unitPrice = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();

            $.ajax({
            url: "item?option=SEARCH&itemCode=" + itemCode,
            method: "GET",
            success: function (resp) {
                    let avQty = resp.qty;
                    let newQty = avQty - qty;
                parseInt($("#txtOrderItemQtyOnHand").val(newQty));
            }
        });

        $("#txtOrderItemCode option:selected").text(itemCode);
        $("#txtOrderItemName").val(itemName);
        $("#txtOrderItemPrice").val(unitPrice);
        $("#txtQty").val(qty);

    });
}

var tableRow;

$("#btnAddToCart").click(function () {

    if ($("#txtOrderCusName").val() == '') {
        alert("Please Select Customer");
    } else if ($("#txtOrderItemName").val() == '') {
        alert("Please Select Item");
    } else if ($("#txtQty").val() == '') {
        alert("Please Enter Valid Quantity");
    }else if (parseInt($("#txtQty").val()) > parseInt($("#txtOrderItemQtyOnHand").val())){
        alert("Please Check Stock");
    }else{
        let duplicate = false;

        for (let i = 0; i < $("#addToCartTable tr").length; i++) {
            if ($("#txtOrderItemCode option:selected").text() == $("#addToCartTable tr").children(':nth-child(1)')[i].innerText) {
                duplicate = true;
            }
        }

        if (duplicate != true) {
            loadOrderDetail();
            minusQty($("#txtQty").val());
            manageTotal($("#txtQty").val() * $("#txtOrderItemPrice").val());
            manageDiscount();
            itemTextFieldClear();
            bindOrderClickEvent();

        } else if (duplicate == true) {

            manageQuantity(tableRow.children(':nth-child(4)').text(), $("#txtQty").val());
            $(tableRow).children(':nth-child(4)').text($("#txtQty").val());

            updateManageTotal(tableRow.children(':nth-child(5)').text(), $("#txtQty").val() * $("#txtOrderItemPrice").val());
            $(tableRow).children(':nth-child(5)').text($("#txtQty").val() * $("#txtOrderItemPrice").val());

            itemTextFieldClear();
        }

        bindOrderClickEvent();
    }
});

var itemCode;
var itemName;
var itemPrice;
var itemQtyOnHand;
var itemOrderQty;

$("#addToCartTable").empty();

function loadOrderDetail() {

    itemCode = $("#txtOrderItemCode option:selected").text();
    itemName = $("#txtOrderItemName").val();
    itemPrice = $("#txtOrderItemPrice").val();
    itemQtyOnHand = $("#txtOrderItemQtyOnHand").val();
    itemOrderQty = $("#txtQty").val();

        let total = itemPrice * itemOrderQty;

        $("#addToCartTable").append("<tr>" +
            "<td>" + itemCode + "</td>" +
            "<td>" + itemName + "</td>" +
            "<td>" + itemPrice + "</td>" +
            "<td>" + itemOrderQty + "</td>" +
            "<td>" + total + "</td>" +
            "</tr>");

        manageDiscount();
        bindOrderClickEvent();

}

function minusQty(orderQty) {
    var minusQty = parseInt(orderQty);
    var manageQty = parseInt($("#txtOrderItemQtyOnHand").val());

    manageQty = manageQty - minusQty;

    $("#txtOrderItemQtyOnHand").val(manageQty);
    bindOrderClickEvent();
}

var total = 0;

function manageTotal(amount) {
    total += amount;
    parseInt($("#total").text(total));

    manageDiscount();
}

function updateManageTotal(prvTotal, nowTotal) {
    total -= prvTotal;
    total += nowTotal;

    parseInt($("#total").text(total));

    manageDiscount();
}

function manageQuantity(prevQty, nowQty) {
    var prevQty = parseInt(prevQty);
    var nowQty = parseInt(nowQty);
    var availableQty = parseInt($("#txtOrderItemQtyOnHand").val());

    availableQty += prevQty;
    availableQty -= nowQty;

    $("#txtOrderItemQtyOnHand").val(availableQty);
}

function manageDiscount() {
    var net = parseInt($("#total").text());
    var discount = 0;

    if (net > 500 && net < 999) {
        discount = 2;
        parseInt($("#txtDiscount").val(discount));
    } else if (net > 1000 && net < 2999) {
        discount = 4;
        parseInt($("#txtDiscount").val(discount));
    } else if (net > 3000 && net < 4999) {
        discount = 5;
        parseInt($("#txtDiscount").val(discount));
    } else if (net > 5000 && net < 9999) {
        discount = 8;
        parseInt($("#txtDiscount").val(discount));
    } else if (net > 10000) {
        discount = 10;
        parseInt($("#txtDiscount").val(discount));
    }

    var subTotal = (net * discount) / 100;
    subTotal = net - subTotal;
    parseInt($("#subtotal").text(subTotal));

}

$("#btnSubmitOrder").click(function () {

    let orderDetails = [];

    if (parseInt($("#subtotal").text()) > parseInt($("#txtCash").val())){
        alert("Please need more money");
        $("#txtCash").val('');
    }else{
        var discount = parseInt($("#total").text()) - parseInt($("#subtotal").text());


        for (let i = 0; i < $("#addToCartTable > tr").length; i++) {
            var OrderDetail = {
                oId : $("#txtOrderID").val(),
                iCode : $("#addToCartTable > tr").children(':nth-child(1)')[i].innerText,
                qty : $("#addToCartTable > tr").children(':nth-child(4)')[i].innerText,
                unitPrice : $("#addToCartTable > tr").children(':nth-child(3)')[i].innerText,
                total : $("#addToCartTable > tr").children(':nth-child(5)')[i].innerText

            }
            orderDetails.push(OrderDetail);
        }

        var orderOb = {
            oId:$("#txtOrderID").val(),
            custId:$("#txtOrderCusID option:selected").text(),
            date:$("#txtOrderDate").val(),
            total:$("#total").text(),
            discount:discount.toString(),
            subTotal:$("#subtotal").text(),
            orderDetails : orderDetails
        }

        console.log(orderOb);

        if ($("#txtCash").val() == '') {
            alert("Please Enter Cash");
        }else {
            $.ajax({
                url: baseurl2,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(orderOb),
                success: function (resp) {
                    if (resp.code==200){
                        alert(resp.message);
                        manageBalance();
                        itemTextFieldClear();
                        customerTextFieldClear();
                        generateOrderID();
                        balanceTextFieldClear();
                        $("#addToCartTable").empty();

                    }

                },
                error: function (ob, textStatus, error) {
                    alert(ob.responseJSON.message);
                    console.log(ob.responseJSON.message);
                }
            });

        }
    }

});

function manageBalance() {
    let balance = 0;
    let subtotal = parseInt($("#subtotal").text());
    let cash = parseInt($("#txtCash").val());

    balance = cash - subtotal;

    parseInt($("#txtBalance").val(balance));
}

function itemTextFieldClear() {
    loadItemComboBoxData();
    $("#txtOrderItemQtyOnHand").val("");
    $("#txtOrderItemPrice").val("");
    $("#txtOrderItemName").val("");
    $("#txtQty").val("");
}

function customerTextFieldClear() {
    loadCustomerComboBoxData();
    $("#txtOrderCusName").val("");
    $("#txtOrderCusContact").val("");
    $("#txtOrderCusAddress").val("");
}

function balanceTextFieldClear(){
    $("#txtBalance").val("");
    $("#txtCash").val("");
    $("#txtDiscount").val("");
}

function bindOrderDetailsClickEvent(){
    $("#orderTable > tr").click('click', function () {

        tableRow = $(this);
        let oid = $(this).children(":eq(0)").text();

        $("#orderDetailTable").empty();
        $.ajax({
            url: "orders?option=SEARCH&orderId=" + oid,
            method: "GET",
            success: function (resp) {
                for (const orders of resp) {

                    let row = `<tr><td>${orders.oId}</td><td>${orders.iCode}</td><td>${orders.qty}</td><td>
                    ${orders.price}</td><td>${orders.total}</td></tr>`;
                    $("#orderDetailTable").append(row);

                }
            }

        });
    });
}

bindOrderDetailsClickEvent();


