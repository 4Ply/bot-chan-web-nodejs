function toggleNode(node, enabled) {
    showProgress();
    $("input").blur();

    var url = "/profile/update_node_status/" + node;
    $.get(url + "?enabled=" + enabled, function () {
        Materialize.toast('Node preferences updated!', 3000);
        window.location.reload();
    });
}
