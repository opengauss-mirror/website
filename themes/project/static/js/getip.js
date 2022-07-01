function getIp() {
  const url = `/ip-api/`;
  $.ajax({
    type: "get",
    url: url,
    contentType: "application/json; charset=utf-8",
    datatype: "json",
    success: function (data) {
      window["returnCitySN"] = data;
    },
    error: function (error) {
      console.log(error);
      window["returnCitySN"] = { query: "ip获取失败", city: "城市获取失败" };
    },
  });
}
getIp()
