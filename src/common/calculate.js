const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const parseDate = (input) => {
  input = input.substring(0, 10);
  var parts = input.split('-');
  return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
};

const Calculate = {
  distance: (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000; // return in meters
  },

  daysLeft: (input) => {
    var inputDate = parseDate(input.toString());
    var today = new Date();
    var timeDiff = inputDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  },
};

export default Calculate;
