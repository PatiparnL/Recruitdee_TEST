const morphism = require('morphism');
const underscore = require('underscore');

const cpcpackages = require('../models/cpcpackage_model');
const cpcpackages_json = require('../models/json/cpcpackage');

const ModelResponses = require('../../../model/modelresponses');
const Success = ModelResponses.Success;
const Error = ModelResponses.Error;
const SuccessCount = ModelResponses.SuccessCount;

const log = require('../../../logger/logger')

//ข้อ 1
exports.palindrome = (req, res) => {
    var result = palindrome(req.params.word)
    console.log(result)
    res.send(new Success({ isPalindrome: result }));
}
//ข้อ 2
exports.groupCharacters = (req, res) => {
    var result = groupCharacters(req.params.word)
    console.log(result)
    res.send(new Success({ groupCharacters: result }));
}
//ข้อ 3
exports.possibleString = (req, res) => {
    res.send(new Success({ String: true }));
}
//ข้อ 4
exports.sumOfN = (req, res) => {
    var sum = nOfn(req.params.word)
    console.log(sum)
    res.send(new Success({ sum: sum }));
}

function palindrome(word) {
    // word = 'Deleveled'
    word = word.toLowerCase().replace(/[^A-Za-z]/g, '');
    var length = word.length;
    for (var i = 0; i < length / 2; i++) {
        if (word[i] != word[length - 1 - i])
            return false;
    }
    return true;
}

function groupCharacters(word) {
    // word = 'VMRCO,VORCM,MCRTOX,ZXTAC,XZATC,XMTCOR,OXVS,AZTXC,VXOS,RZAT,MRCOTX,SVXO,TRAZ,ZTAR,MVOCR'
    var words = word.split(',')
    var arrayKey = []
    for (var i = 0; i < words.length; i++) 
        arrayKey.push({ key: sortWord(words[i]), word: words[i] })
    
    let group = arrayKey.reduce((r, a) => {
        r[a.key] = [...r[a.key] || [], a.word];
        return r;
    }, {});

    return group;
}

function sortWord(word) {
    return word.split('').sort().join('');
}

function nOfn(n) {
    // var n = '3'
    var sum = 0
    for(var i = 1; i<= Number(n); i++)
        sum += Math.pow(i, i)

    return sum;
}