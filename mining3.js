/**
 * Created by Yoana on 12/19/2017.
 */


var mine3 = _mineBlock(difficulty)
{
    // console.log("the shit is ",Array(difficulty + 1).join("0"));
    // console.log("the shit is ",this.hash.substring(0,difficulty));
    while(this.hash.substring(0,difficulty)!== Array(difficulty + 1).join("0"))
    {
        this.nonce++;
        this.hash  = this._calculateHash();
    }
    console.log("Blocked mine : "+this.hash);
}

module.exports = mine3;