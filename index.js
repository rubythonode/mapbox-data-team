'use strict';

var team = require('./data/team.js').team;

function getData(returnField, searchField, value, json) {
    var teamJSON = json || team;
    if (!searchField) {
        return teamJSON.map(function (member) {
            return member[returnField];
        }).sort();
    } else {
        return teamJSON.filter(function (member) {
            return (member[searchField].toLowerCase() === value.toLowerCase());
        }).map(function (member) {
            return member[returnField];
        }).sort();
    }
}

function getUsernames(json) {
    return getData('username', null, null, json);
}

function getUserIds(json) {
    return getData('uid', null, null, json);
}

function getUsernamesFor(field, value, json) {
    return getData('username', field, value, json);
}

function getUserIdsFor(field, value, json) {
    return getData('uid', field, value, json);
}

function getNames(json) {
    return getData('fullname', null, null, json);
}

function getEverything(json) {
    return json || team;
}

function _find(queryShape, returnShape, json, singular) {
    var teamJSON = json || team;
    var keys = Object.keys(queryShape);
    
    var filtered = teamJSON.filter(function(t) {
        var keep = true;
        keys.forEach(function (k) {
            if (t.hasOwnProperty(k)) {
                keep = keep && (t[k] === queryShape[k]);
            }
        });
        return keep;
    });
    return singular ? filtered[0] : filtered;
}

function find(queryShape, returnShape, json) {
    return _find(queryShape || {}, returnShape || {}, json, false);
}

function findOne(queryShape, returnShape, json) {
    return _find(queryShape || {}, returnShape || {}, json, true);
}

module.exports = {
    'getUsernames': getUsernames,
    'getNames': getNames,
    'getUserIds': getUserIds,
    'getUsernamesFor': getUsernamesFor,
    'getUserIdsFor': getUserIdsFor,
    'getEverything': getEverything,
    'find': find,
    'findOne': findOne
};
