module.exports = function(RED) {
    function bit2word(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var ar = msg.payload;
            var s = 0;
            var vInt = [];
            var vBool = [];
            for(var i in ar){
                vInt.push(Number(ar[i]));
                vBool.push(Boolean(ar[i]));
            };
            for(var x = 0; x < ar.length; x++){
                var j = 2 ** x;
                if(ar[x]){
                    s+=j;
                };
            };
            msg.payload = s;
            msg.topic = {
                "vBool": vBool,
                "vInt": vInt
            };
            node.send(msg);
        });
    }
    RED.nodes.registerType("bit2word",bit2word);
}