function listen_list_all_stu_btn(listen_list_all_stu_btn_params) {

    console.log("list_all_stu_btn pressed!");
    $.post("./last_time_up", {
        we_dont_need_any_value: "empty!",
    }, (data_back_all_stu_dom) => {
        document.getElementById("table_of_all_stu").innerText = data_back_all_stu_dom;
    })

    setTimeout(() => {
        listen_list_all_stu_btn();
    }, 5000);
}

jQuery(function dom_ready(dom_ready_params) {//jQuery3.0 use aka new method
    listen_list_all_stu_btn();
})