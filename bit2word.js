module.exports = function(RED) {
    function bit2word(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var ar = msg.payload;
            var s = 0;
            for(var x = 0; x < ar.length; x++){
                var j = 2 ** x;
                if(ar[x]){
                    s+=j
                }
            }
            msg.payload = s;
            node.send(msg);
        });
    }
    RED.nodes.registerType("bit2word",bit2word);
}