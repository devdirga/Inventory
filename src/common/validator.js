const Validator = {
  required: function required(value) {
    if (Array.isArray(value)) {
      return !!value.length;
    }
    if (value === undefined || value === null) {
      return false;
    }
    return !!String(value).trim().length;
  },
  regex: function (value, ref) {
    if (value === undefined || value === null || value === '') {
      return true;
    }
    var regex = ref;
    // var flags = ref.slice(1);
    if (regex instanceof RegExp) {
      return regex.test(value);
    }
    return new RegExp(regex).test(String(value));
  },
  numeric: function (value) {
    if (value === null || value === undefined || value === '') {
      return true;
    }
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return /^[0-9-]+$/.test(String(val));
      });
    }
    return /^[0-9-]+$/.test(String(value));
  },
  min_value: function (value, min) {
    if (
      Array.isArray(value) ||
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return true;
    }
    return Number(value) >= min;
  },
  min: function (value, length) {
    if (value === undefined || value === null) {
      return true;
    }
    return String(value).length === 0 || String(value).length >= length;
  },
  max_value: function (value, max) {
    if (
      Array.isArray(value) ||
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return true;
    }
    return Number(value) <= max;
  },
  max: function (value, length) {
    if (value === undefined || value === null) {
      return length >= 0;
    }
    return String(value).length <= length;
  },
  between: function (value, ref) {
    var min = ref[0];
    var max = ref[1];

    if (value === null || value === undefined || value === '') {
      return true;
    }

    if (Array.isArray(value)) {
      return value.every(function (val) {
        return Validator.between(val, [min, max]);
      });
    }
    return Number(min) <= value && Number(max) >= value;
  },
  email: function (value) {
    if (value === undefined || value === null || value === '') {
      return true;
    }
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          String(val),
        );
      });
    }
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(value),
    );
  },
  phone: function (value) {
    if (value === undefined || value === null || value === '') {
      return true;
    }
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(String(val));
      });
    }
    return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(String(value));
  },
  in: function (value, options) {
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return Validator.in(val, options);
      });
    }
    return !!options.filter(function (option) {
      return option == value;
    }).length;
  },
  not_in: function (value, options) {
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return Validator.not_in(val, options);
      });
    }
    return !options.filter(function (option) {
      return option == value;
    }).length;
  },
  not_in_ignorecase: function (value, options) {
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return Validator.not_in_ignorecase(val, options);
      });
    }
    return !options.filter(function (option) {
      return option.toUpperCase() == value.toUpperCase();
    }).length;
  },
  is: function (value, ref) {
    return value === ref;
  },
  is_not: function (value, ref) {
    return value !== ref;
  },
  alpha_dash: function (value) {
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return Validator.alpha_dash(val);
      });
    }
    return /^[0-9A-Za-z_-]*$/.test(value);
  },
  alpha_num: function (value) {
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return Validator.alpha_num(val);
      });
    }
    return /^[0-9A-Za-z]*$/.test(value);
  },
  alpha_spaces: function (value) {
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return Validator.alpha_spaces(val);
      });
    }
    return /^[A-Za-z\s]*$/.test(value);
  },
  alpha: function (value) {
    if (Array.isArray(value)) {
      return value.every(function (val) {
        return Validator.alpha(val);
      });
    }
    return /^[A-Za-z]*$/.test(value);
  },
};

export default Validator;
