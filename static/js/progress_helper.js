function showProgress() {
    var progress = new LoadingOverlayProgress({
        bar: {
            "background": '#1a1d20'
        }
    });
    $.LoadingOverlay("show", {
        custom: progress.Init(),
        color: "rgba(0, 0, 0, 0.4)",
        image: ""
    });

    var count = 0;
    var interval = setInterval(function () {
        if (count >= 100) {
            clearInterval(interval);
            delete progress;
            $.LoadingOverlay("hide");
            return;
        }
        count += 10;
        progress.Update(count);
    }, 100);
}

function hideProgress() {
    $.LoadingOverlay("hide");
}
