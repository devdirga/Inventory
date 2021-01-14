/**
 * Non-public global class to handle the "default" FlashMessage instance to global use
 */
class AlertManager {
  _defaultAlert = null;
  register(_ref) {
    if (!this._defaultAlert && '_id' in _ref) {
      this._defaultAlert = _ref;
    }
  }
  unregister(_ref) {
    if (!!this._defaultAlert && this._defaultAlert._id === _ref._id) {
      this._defaultAlert = null;
    }
  }
  getDefault() {
    return this._defaultAlert;
  }
}

export default new AlertManager();
