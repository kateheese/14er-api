module.exports = {
  dataFormat: function(input, url) {
    var output = {links: {self: url}, data: []};
    for(var i = 0; i < input.length; i++) {
      output.data.push({type: "peak",
                        id: input[i].id,
                        attributes: {peak_name: input[i].peak_name,
                                    range: input[i].range,
                                    rank: input[i].rank,
                                    elevation: input[i].elevation,
                                    latitude: input[i].latitude,
                                    longitude: input[i].longitude},
                        links: url + '/' + input[i].id});
    }
    return output;
  },
  rangeFormat: function(input, url) {
    var output = {links: {self: url}, data: []};
    for(var i = 0; i < input.length; i++) {
      output.data.push(input[i].range);
    }
    return output;
  }
};