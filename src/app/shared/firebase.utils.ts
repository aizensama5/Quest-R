/**
 * Firebase utils class
 */
export class FirebaseUtils {
  /**
   * Prepare value for storing in Firebase database.
   * FireBase does not support all types of values that is why we need to convert
   * dates to numbers and recursively convert nested objects if present.
   *
   * @param value Object or value for converting
   * @returns {any} Converted value or object
   */
  public static prepareValue(value: any) {
    if (value instanceof Date) {
      // Convert dates to numbers
      return isNaN(value.getTime()) ? 0 : value.getTime();
    } else if (typeof value === 'object') {
      return FirebaseUtils.prepareObject(value);
    } else {
      return value;
    }
  }

  /**
   * Prepare object for storing in Firebase database.
   *
   * @param object Object for converting
   * @returns {} Converted object
   */
  public static prepareObject(object: any) {
    const newObject = {};
    Object.keys(object).forEach(function(key) {
      newObject[key] = FirebaseUtils.prepareValue(object[key]);
    });

    return newObject;
  }
}
