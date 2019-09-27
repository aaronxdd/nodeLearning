var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var xlsx = require('node-xlsx');
var config = require('config-lite')(__dirname);
var fs = require('fs');
var url = require('url');

superagent.get(config.creeperUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var topicUrls = [];
    var alldata = [];
    var $ = cheerio.load(res.text);
    alldata.push(config.row);
    //获取每个帖子url
    $(config.dom).each(function (idx, element) {
      var $element = $(element);
      var href = url.resolve(config.creeperUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    var ep = new eventproxy();

    ep.after('first_comment', topicUrls.length, function (topics) {
      topics = topics.map(function (topicPair) {
        var cellData = [];
        var topicUrl = topicPair[0];
        var topicHtml = topicPair[1];
        var $ = cheerio.load(topicHtml);
        cellData.push($('#articleTitle').text().trim());//标题名
        cellData.push(topicUrl);//url
        cellData.push($('.comments-content p').eq(0).text().trim());//第一条评论
        alldata.push(cellData);
      });
      
      var buffer = xlsx.build([{
        name: "mySheetName", //excel中的sheetname
        data: alldata
      }]);

      //写入excle数据
      fs.writeFileSync('./test.xlsx', buffer);
    });

    topicUrls.forEach(function (topicUrl) {
      superagent.get(topicUrl)
        .end(function (err, res) {
          // console.log('fetch ' + topicUrl + ' successful');
          ep.emit('first_comment', [topicUrl, res.text]);
        });
    });
  });