var connection = require("./connection");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
}

  var orm = {
    selectAll: function(tableName) {
      var queryString = "SELECT * FROM ??";
      connection.query(queryString, [tableName], function(err, result) {
        if (err) throw err;
        console.log("result", result);
      });
    },

    insertOne: function(tableName, cols, vals) {
      var queryString = "INSERT INTO" + tableName;
      queryString += "(";
      queryString += cols.toString();
      queryString += ")";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ")";

      connection.query(queryString, [tableName, colName], function(
        err,
        result
      ) {
        if (err) throw err;
        console.log(result);
      });
    },

    updateOne: function(tableName, objColVals, condition) {
      var queryString = "UPDATE" + tableName;
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;

      connection.query(
        queryString,
        [tableName, objColVals, condition],
        function(err, result) {
          if (err) throw err;
          console.log(result);
        }
      );
    }
  };


module.exports = orm;
