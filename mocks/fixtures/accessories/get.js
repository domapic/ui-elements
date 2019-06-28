const getAccessoriesEmpty = {
  url: "/api/accessories",
  method: "GET",
  response: {
    status: 200,
    body: []
  }
};

const getAccessoriesSuccess = {
  url: "/api/accessories",
  method: "GET",
  response: {
    status: 200,
    body: [
      {
        id: "foo",
        name: "foo"
      }
    ]
  }
};

module.exports = {
  getAccessoriesEmpty,
  getAccessoriesSuccess
};
