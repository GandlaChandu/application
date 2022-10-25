using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.Core.Utility
{
    public static class JsonUtility
    {
        /// <summary>
        /// tries to serialize the given object
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="value"></param>
        /// <param name="validations"></param>
        /// <returns></returns>
        public static bool TrySerializeObject(this object obj, out string value, out Dictionary<string, string> validations)
        {
            value = default;
            validations = null;
            Dictionary<string, string> errors = new Dictionary<string, string>();
            JsonSerializerSettings jsonSerializer = new JsonSerializerSettings
            {
                Error = delegate (object sender, ErrorEventArgs args)
                {
                    errors.Add(args.ErrorContext.Path, args.ErrorContext.Error.Message);
                    args.ErrorContext.Handled = true;
                }
            };

            value = SerializeObject(obj, Formatting.None, jsonSerializer);

            if (errors != null && errors.Count > 0)
            {
                validations = errors;
                return false;
            }

            return true;
        }

        /// <summary>
        /// tries to deserialize a given string
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="obj"></param>
        /// <param name="validations"></param>
        /// <returns></returns>
        public static bool TryDeserialize<T>(this string value, out T obj, out Dictionary<string, string> validations)
        {
            JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings();
            return TryDeserialize(value, jsonSerializerSettings, out obj, out validations);
        }

        /// <summary>
        ///  tries to deserialize a given string
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="jsonSerializerSettings"></param>
        /// <param name="obj"></param>
        /// <param name="validations"></param>
        /// <returns></returns>
        public static bool TryDeserialize<T>(this string value, JsonSerializerSettings jsonSerializerSettings, out T obj, out Dictionary<string, string> validations)
        {
            obj = default;
            validations = null;
            Dictionary<string, string> errors = new Dictionary<string, string>();

            jsonSerializerSettings.Error = delegate (object sender, ErrorEventArgs args)
            {
                errors.Add(args.ErrorContext.Path, args.ErrorContext.Error.Message);
                args.ErrorContext.Handled = true;
            };

            obj = DeserializeObject<T>(value, jsonSerializerSettings);

            if (errors != null && errors.Count > 0)
            {
                validations = errors;
                return false;
            }

            return true;
        }

        /// <summary>
        ///  deserialize a given string
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static T DeserializeObject<T>(this string value)
        {
            return DeserializeObject<T>(value, null);
        }

        /// <summary>
        /// Serialize object
        /// </summary>
        /// <param name="obj">input object to serialize</param>
        /// <returns> returns serailized string </returns>
        public static string SerializeObject(this object obj)
        {
            return SerializeObject(obj, Formatting.None, null);
        }

        /// <summary>
        /// serialize a given object
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="formatting"></param>
        /// <returns></returns>
        public static string SerializeObject(this object obj, Formatting formatting)
        {
            return SerializeObject(obj, formatting, null);
        }

        /// <summary>
        /// serialize a given object
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="jsonSerializerSettings"></param>
        /// <returns></returns>
        public static string SerializeObject(this object obj, JsonSerializerSettings jsonSerializerSettings)
        {
            return SerializeObject(obj, Formatting.None, jsonSerializerSettings);
        }

        /// <summary>
        /// serialize a given object
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="formatting"></param>
        /// <param name="jsonSerializerSettings"></param>
        /// <returns></returns>
        public static string SerializeObject(this object obj, Formatting formatting, JsonSerializerSettings jsonSerializerSettings)
        {
            return JsonConvert.SerializeObject(obj, formatting, jsonSerializerSettings);
        }

        /// <summary>
        /// deserialize a given string
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="jsonSerializerSettings"></param>
        /// <returns></returns>
        public static T DeserializeObject<T>(this string value, JsonSerializerSettings jsonSerializerSettings)
        {
            return JsonConvert.DeserializeObject<T>(value, jsonSerializerSettings);
        }
    }
}
