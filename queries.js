const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: '18.220.22.137',
  database: 'servicedb',
  password: 'password',
  port: 5432,
})

// return all products
const getProducts = (request, response) => {
  console.log('getting all products..');
  pool.query("SELECT * FROM products WHERE product_id > 0 AND product_id < 6", (error, results) => {
    if (error) {
      console.log(error);
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  })
}

// return all product information for a specific product id
const getProductInfo = (request, response) => {
  console.log('getting product info..');
  console.log('request:', request.params);
  var features = [];

  // PROMISE
  // query gets features of specific product
  var queryFeatures = "SELECT feature, feature_value FROM features WHERE product_id = $1";
  // query to get product information for a specific product id
  var query = "SELECT * FROM products WHERE product_id = $1";

  pool
    .query(queryFeatures, [request.params.id])
    .then(res => {
      res.rows.forEach((feature) => {
        features.push(feature);
      })
      return features;
    })
    .then(res => {
      pool
        .query(query, [request.params.id])
        .then(res => {
          res.rows.forEach((result) => {
            result.features = features;
          })
          response.status(200).json(res.rows);
        })
    })
    .catch(e => console.error(e.stack))
}

// return product styles for a specific product id
const getProductStyles = (request, response) => {
  console.log('getting product styles..');
  var stylesObj = { "product_id": request.params.id.toString() };
  console.log(stylesObj);
  var results = [];
  // var photos = [];

  // query to get style information for a specific product id
  var stylesQuery = "SELECT style_id, name, original_price, sale_price, default_style FROM styles WHERE product_id     = $1";
  // query to get photos for a specific product id
  var photosQuery = "SELECT thumbnail_url, url FROM photos WHERE style_id = $1";

  // query to get photos
  pool
    .query(photosQuery, [request.params.id])
    .then(res => {
      console.log('THE res.rows:', res.rows);
      var photos = [];
      // for each photo from the query, add it to photos array
      res.rows.forEach((photo) => {
        photos.push(photo);
      })
      console.log('photos', photos);
      return photos;
    })
    .then(q => {
      // query to get style information for a product
      pool
        .query(stylesQuery, [request.params.id])
        .then(res => {
          // for each style from the query
          res.rows.forEach((style) => {
            // add photos property
            style.photos = q;
            // add the style to results array
            results.push(style);
            // add results array as property to stylesObj
            stylesObj.results = results;
          })
          response.status(200).json(stylesObj);
        })
    })
    .catch(e => console.error(e.stack))
}


module.exports = {
  getProducts,
  getProductInfo,
  getProductStyles,
}

