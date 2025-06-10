(function() {
    var dw = window.dw || {};
    var sfcc = dw.sfcc || {};
    var livePreview = sfcc.livePreview || {};

    if (!livePreview.enabled) {
        return;
    }

    var host = livePreview.host;
    var port = livePreview.port;
    var path = livePreview.path;
    var protocol = livePreview.protocol;
    var query = livePreview.query;

    var wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';
    var wsUrl = wsProtocol + '//' + host + ':' + port + '/on/demandware.store/Sites-Site/default/ViewRenderAPI-LivePreview';

    var socket = new WebSocket(wsUrl);

    socket.onopen = function() {
        console.log('Live Preview: Connected to server');
    };

    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if (data.type === 'refresh') {
            window.location.reload();
        }
    };

    socket.onclose = function() {
        console.log('Live Preview: Disconnected from server');
        // Try to reconnect after 5 seconds
        setTimeout(function() {
            window.location.reload();
        }, 5000);
    };

    socket.onerror = function(error) {
        console.error('Live Preview: WebSocket error', error);
    };
})(); 