web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]');
VotingContext = web3.eth.contract(abi);
contractInstance = VotingContext.at('0x3d062b2e7d1ab63ab6af4b05c242d8ee58d4e684');
candidates = {"0x5092411226cD83363294688c29119691BcEf9120": "candidate-1",
              "0x28da79FdAc078F240A6AaDFe2f3Dc9056Fe7C476": "candidate-2",
              "0xe84Ca93Ec2cf8b7EA54C0756F890a170b317b304": "candidate-3"};

function voteForCandidate() {
    var candidateName = $("#candidate").val();

    contractInstance.voteForCandidate(candidateName,
                                     {gas:140000, from:web3.eth.accounts[0]},
                                     function() {
        let div_id = candidates[candidateName];
        let totalVote = contractInstance.totalVotesFor.call(candidateName).toString();

        $("#" + div_id).html(totalVote);
        console.log(candidateName + ' has been voted [' + totalVote + ']. ');
    });
}


$(document).ready(function(){
    candidateNames = Object.keys(candidates);

    for (var i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        console.log(name);
        let val = contractInstance.totalVotesFor.call(name).toString();
        $('#' + candidates[name]).html(val);
    }
});
