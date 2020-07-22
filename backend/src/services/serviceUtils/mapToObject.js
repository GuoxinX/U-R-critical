/**
 * Convert map to Json String
 * @param {Map} map 
 * @return {JSON_String}
 */
const mapToObject = (map) => {
  let out = Object.create(null);
  map.forEach((value, key) => {
    if (value instanceof Map) {
      out[key] = mapToObject(value);
    }
    else {
      out[key] = value;
    }
  });
  return JSON.stringify(out);
};

module.exports = {
  mapToObject
};
