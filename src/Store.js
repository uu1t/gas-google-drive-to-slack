export default class Store {
  /**
   * @param {GoogleAppsScript.Properties.Properties} properties
   */
  constructor(properties = PropertiesService.getScriptProperties()) {
    this.properties = properties
  }

  /**
   * @param {string} key
   */
  get(key) {
    return this.properties.getProperty(key)
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  set(key, value) {
    this.properties.setProperty(key, value)
  }
}
