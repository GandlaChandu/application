using System;

namespace Com.ACSCorp.Accelerator.Core.Models
{
    public static class ModelExtensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="enumValue"></param>
        /// <returns></returns>
        public static ListItem<T> ToListItem<T>(this T enumValue) where T : Enum
        {
            return new ListItem<T>
            {
                Text = enumValue.ToString(),
                Value = enumValue
            };
        }

        public static ListItem<T> ToListItem<T>(this T value, string text)
        {
            return new ListItem<T>
            {
                Text = text,
                Value = value
            };
        }
    }
}
