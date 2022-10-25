using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

namespace Com.ACSCorp.Accelerator.Core.Utility
{
    public static class ExtensionMethods
    {
        /// <summary>
        /// Get enum description
        /// </summary>
        /// <param name="enumValue"> enum value </param>
        /// <returns></returns>
        public static string GetEnumDescription(this Enum enumValue)
        {
            FieldInfo fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            DescriptionAttribute[] descriptionAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return descriptionAttributes.Length > 0 ? descriptionAttributes[0].Description : enumValue.ToString();
        }

        /// <summary>
        /// Add range to collection.
        /// </summary>
        /// <typeparam name="T">type of collection</typeparam>
        /// <param name="collection">input collection</param>
        /// <param name="collectionToAdd">collection to add</param>
        public static void AddRange<T>(this ICollection<T> collection, IEnumerable<T> collectionToAdd)
        {
            if (collectionToAdd != null && collectionToAdd.Any())
            {
                foreach (T item in collectionToAdd)
                {
                    collection.Add(item);
                }
            }
        }
    }
}
