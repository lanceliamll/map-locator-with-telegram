const data = [
  {
    "id": 1,
    "user": {
      "id": 1,
      "username": "admin",
      "email": "adminuser@gmail.com",
      "provider": "local",
      "confirmed": true,
      "blocked": false,
      "role": 1,
      "created_at": "2020-05-16T06:07:55.661Z",
      "updated_at": "2020-05-17T01:35:55.472Z"
    },
    "longitude": 121.0085408,
    "latitude": 14.5818966,
    "title": "Near Yang",
    "description": "Test Marker",
    "data": [
      {
        "id": 48,
        "data": {
          "timestamp": 1590678850219,
          "mocked": false,
          "coords": {
            "altitude": 70.69999694824219,
            "heading": 0,
            "longitude": 121.0084791,
            "speed": 0,
            "latitude": 14.5819453,
            "accuracy": 83.00800323486328
          }
        },
        "user": {
          "created_at": "2020-05-16T06:07:55.661Z",
          "blocked": false,
          "provider": "local",
          "role": 1,
          "username": "admin",
          "updated_at": "2020-05-17T01:35:55.472Z",
          "id": 1,
          "email": "adminuser@gmail.com",
          "confirmed": true
        },
        "created_at": "2020-05-28T15:14:10.233Z",
        "updated_at": "2020-05-28T15:14:10.236Z"
      },
      {
        "id": 49,
        "data": {
          "timestamp": 1590678874129,
          "mocked": false,
          "coords": {
            "altitude": 66.19999694824219,
            "heading": 11.099784851074219,
            "longitude": 121.0085694,
            "speed": 0.04129723086953163,
            "latitude": 14.5818898,
            "accuracy": 54.86399841308594
          }
        },
        "user": {
          "created_at": "2020-05-16T06:07:55.661Z",
          "blocked": false,
          "provider": "local",
          "role": 1,
          "username": "admin",
          "updated_at": "2020-05-17T01:35:55.472Z",
          "id": 1,
          "email": "adminuser@gmail.com",
          "confirmed": true
        },
        "created_at": "2020-05-28T15:14:34.349Z",
        "updated_at": "2020-05-28T15:14:34.357Z"
      },
      {
        "id": 50,
        "data": {
          "timestamp": 1590678889099,
          "mocked": false,
          "coords": {
            "altitude": 53.19999694824219,
            "heading": 9.2875394821167,
            "longitude": 121.0086616,
            "speed": 3.8923439979553223,
            "latitude": 14.5824361,
            "accuracy": 27.881000518798828
          }
        },
        "user": {
          "created_at": "2020-05-16T06:07:55.661Z",
          "blocked": false,
          "provider": "local",
          "role": 1,
          "username": "admin",
          "updated_at": "2020-05-17T01:35:55.472Z",
          "id": 1,
          "email": "adminuser@gmail.com",
          "confirmed": true
        },
        "created_at": "2020-05-28T15:14:49.055Z",
        "updated_at": "2020-05-28T15:14:49.062Z"
      }
    ],
    "created_at": "2020-05-25T01:42:14.679Z",
    "updated_at": "2020-05-31T05:56:59.584Z"
  }
];


const transformData = data => {
  // return !data.length ? [] : data.map(d => {
  //   const transformedData = {
  //     id: d.id,
  //     title: d.title,
  //     description: d.description,
  //     created_at: d.created_at,
  //     coords: 

  //     })
  //   }
  //   return transformedData;
  // });
  return !data.length ? [] : data.map(d => {
    // return d.data.map(location => {
    //   const transformedLocation = {
    //     coords: {
    //       latitude: location.data.coords.latitude,
    //       longitude: location.data.coords.longitude
    //     }
    //   }
    //   return transformedLocation;
    // })
    console.log("123123",d)
  })
}

console.log(transformData(data));