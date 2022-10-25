using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Com.ACSCorp.Accelerator.Core.QueryUtility
{
    public static class FilterUtility<T> where T : class
    {
        private const string PARAMETER_EXPRESSION = "x";
        private const string CONTAINS = "Contains";
        private const string TOLOWER = "ToLower";
        private const string ERROR_MESSAGE = "Operator not found";

        /// <summary>
        /// Filter the expression
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static IQueryable<T> GetFilterResult(IQueryable<T> query, Filter[] filters)
        {
            if (filters?.Length > 0)
            {
                Type type = typeof(T);
                ParameterExpression parameterExpression = Expression.Parameter(type, PARAMETER_EXPRESSION);
                Dictionary<string, PropertyInfo> types = type.GetProperties().ToDictionary(x => x.Name.ToLower());

                Expression actualExpression = GenerateExpression(filters, types, parameterExpression);
                if (actualExpression == null)
                {
                    return query;
                }

                Expression<Func<T, bool>> expressionTree = Expression.Lambda<Func<T, bool>>(actualExpression, new[] { parameterExpression });
                query = query.Where(expressionTree);
            }
            return query;
        }

        /// <summary>
        /// Seperate method to handle switch conditions for each operation
        /// </summary>
        /// <param name="operation"></param>
        /// <param name="memberExpression"></param>
        /// <param name="constantExpression"></param>
        /// <returns></returns>
        private static Expression GenerateExpression(Filter[] filters, Dictionary<string, PropertyInfo> types, Expression parameterExpression)
        {
            Expression actualExpression = null;
            foreach (Filter filter in filters)
            {
                PropertyInfo propertyInfo = types[filter.Name.ToLower()];
                Type stringType = typeof(string);
                Type propertyType = propertyInfo.PropertyType;
                Expression constantExpression = null;

                if (filter.Operator != Operator.In)
                {
                    var propertyValue = TryParseFilterValue(filter.FromValue, propertyType);
                    if (propertyValue == null)
                    {
                        continue;
                    }
                    else
                    {
                        constantExpression = Expression.Convert(Expression.Constant(propertyValue), propertyType);
                    }
                }
                Expression memberExpression = Expression.Property(parameterExpression, propertyInfo);



                switch (filter.Operator)
                {
                    case Operator.In:
                        string[] stringcsv = filter.FromValue.Split(',');
                        Type listType = typeof(List<>).MakeGenericType(propertyType);
                        IList list = (IList)Activator.CreateInstance(listType);

                        foreach (string csv in stringcsv)
                        {
                            if (propertyType.IsEnum)
                            {
                                list.Add(Enum.Parse(propertyType, csv));
                            }
                            else
                            {
                                list.Add(Convert.ChangeType(csv.Trim(), propertyType));
                            }

                        }
                        Type methodType = list.GetType();
                        MethodInfo method = list.GetType().GetMethod(CONTAINS);
                        Expression inExpression = Expression.Call(Expression.Constant(list), method, memberExpression);
                        actualExpression = FormExpression(actualExpression, inExpression);
                        break;
                    case Operator.Equals:
                        Expression equalExpression = Expression.Equal(memberExpression, constantExpression);
                        actualExpression = FormExpression(actualExpression, equalExpression);
                        break;
                    case Operator.Contains:
                        MethodInfo methodInfo = stringType.GetMethod(CONTAINS, new[] { stringType });
                        memberExpression = Expression.Call(memberExpression, stringType.GetMethod(TOLOWER, Type.EmptyTypes));
                        constantExpression = Expression.Call(constantExpression, stringType.GetMethod(TOLOWER, Type.EmptyTypes));

                        Expression containsExpression = Expression.Call(memberExpression, methodInfo, constantExpression);

                        actualExpression = FormExpression(actualExpression, containsExpression);
                        break;
                    case Operator.GreaterThan:
                        Expression greaterThanExpression = Expression.GreaterThan(memberExpression, constantExpression);
                        actualExpression = FormExpression(actualExpression, greaterThanExpression);
                        break;
                    case Operator.LessThan:
                        Expression lesserThanExpression = Expression.LessThan(memberExpression, constantExpression);
                        actualExpression = FormExpression(actualExpression, lesserThanExpression);
                        break;
                    case Operator.GreaterThanEqual:
                        Expression greaterThanEqualExpression = Expression.GreaterThanOrEqual(memberExpression, constantExpression);
                        actualExpression = FormExpression(actualExpression, greaterThanEqualExpression);
                        break;
                    case Operator.LessThanEqual:
                        Expression lesserThanEqualExpression = Expression.LessThanOrEqual(memberExpression, constantExpression);
                        actualExpression = FormExpression(actualExpression, lesserThanEqualExpression);
                        break;
                    case Operator.NotEqual:
                        Expression notEqualExpression = Expression.NotEqual(memberExpression, constantExpression);
                        actualExpression = FormExpression(actualExpression, notEqualExpression);
                        break;
                    default:
                        throw new NotImplementedException(ERROR_MESSAGE);
                }
            }
            return actualExpression;
        }

        private static object TryParseFilterValue(string source, Type target)
        {
            object value;
            try
            {
                TypeConverter converter = TypeDescriptor.GetConverter(target);
                if (!converter.CanConvertFrom(typeof(string)))
                {
                    throw new NotSupportedException($"{source} cannot be converted to {target}");
                }
                value = converter.ConvertFromInvariantString(source);
            }
            catch (FormatException)
            {
                value = null;
            }

            return value;
        }

        /// <summary>
        /// method to bind all events
        /// </summary>
        /// <param name="actualExpression"></param>
        /// <param name="additionalExpression"></param>
        /// <returns></returns>
        private static Expression FormExpression(Expression actualExpression, Expression additionalExpression)
        {
            if (additionalExpression == null)
            {
                return actualExpression;
            }

            if (actualExpression == null)
            {
                actualExpression = additionalExpression;
            }
            else
            {
                actualExpression = Expression.AndAlso(actualExpression, additionalExpression);
            }

            return actualExpression;
        }
    }
}
