function table_title(object) {
    var html = '';
    if (object && object.keys(object[0])) {
        html += '<table><tr>';
        for (var i = 0; i < object.keys(object[0]).length; i++) {
            html += '<th>' + object.keys(object[0])[i] + '</th>';
        }
        html += '</tr>';
    }
    for (var j = 0; j < object.length; j++) {
        html += '<tr>';
        for (var k in object.values(object[j])) {
            if (typeof object.values(object[i])[k] == 'object') {
                var fulldate = object.values(object.values(object[j])[k]).join('.');
                html += '<td>' + fulldate + '</td>';
            } else {
                html += '<td>' + object.values(members[j])[k] + '</td>';
            }
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}
function listen_list_all_stu_btn(listen_list_all_stu_btn_params) {
    $('#btn_list_all_stu').on("click", function (event) {
        event.preventDefault();
        console.log("list_all_stu_btn pressed!");
        $.post("./tableify_all_stu", {
            we_dont_need_any_value: "empty!",
        }, (data_back_all_stu_dom) => {
            document.getElementById("table_of_all_stu").innerHTML = data_back_all_stu_dom;
        })
    })
}
function listen_find_stu_btn(listen_list_all_stu_btn_params) {
    $('#btn_find_stu').on("click", function (event) {
        event.preventDefault();
        console.log("btn_find_stu pressed!");
        $.post("./post_find_stu", {
            stu_id: document.getElementById("find_stu_id_input").value,
        }, (data_back_all_stu_dom) => {
            document.getElementById("find_stu_reasult").innerText = data_back_all_stu_dom;
        })
    })
}
function listen_add_stu_btn(listen_list_all_stu_btn_params) {
    $('#btn_add_stu').on("click", function (event) {
        event.preventDefault();
        console.log("btn_add_stu pressed!");
        $.post("./post_add_stu", {
            stu_id: document.getElementById("add_stu_id_input").value,
            stu_name: document.getElementById("add_stu_name_input").value,
        }, (data_back_all_stu_dom) => {
            //nomove
        })
    })
}
function listen_rm_stu_btn(listen_list_all_stu_btn_params) {
    $('#btn_rm_stu').on("click", function (event) {
        event.preventDefault();
        console.log("btn_rm_stu pressed!");
        $.post("./post_rm_stu", {
            stu_id: document.getElementById("rm_stu_id_input").value,
        }, (data_back_all_stu_dom) => {
            //nomove
        })
    })
}
jQuery(function dom_ready(dom_ready_params) {//jQuery3.0 use aka new method
    listen_list_all_stu_btn();
    listen_find_stu_btn();
    listen_add_stu_btn();
    listen_rm_stu_btn();
});