using Com.ACSCorp.Accelerator.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Com.ACSCorp.Accelerator.Core.QueryUtility
{
    public static class SortUtility<T> where T : class
    {
        private const string PARAMETER_EXPRESSION = "x";

        /// <summary>
        /// Sort the expression
        /// </summary>
        /// <param name="sortFields"></param>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static IQueryable<T> GetSortResult(IQueryable<T> expression, SortField sortField)
        {
            if (sortField != null)
            {
                Dictionary<string, PropertyInfo> types = typeof(T).GetProperties().ToDictionary(x => x.Name.ToLower());

                Expression<Func<T, object>> orderByExpTree = GetExpressionTree(sortField.PropertyName, types);

                if (sortField.IsAscending)
                {
                    expression = expression.OrderBy(orderByExpTree);
                }
                else
                {
                    expression = expression.OrderByDescending(orderByExpTree);
                }
            }

            return expression;
        }

        /// <summary>
        /// Method to generate expression tree for order by clauses
        /// </summary>
        /// <param name="property"></param>
        /// <returns></returns>
        private static Expression<Func<T, object>> GetExpressionTree(string property, Dictionary<string, PropertyInfo> types)
        {
            Type type = typeof(T);
            ParameterExpression parameterExpression = Expression.Parameter(type, PARAMETER_EXPRESSION);
            PropertyInfo propertyInfo = types[property.ToLower()];

            return Expression.Lambda<Func<T, object>>(Expression.Convert(
                                                                         Expression.Property(parameterExpression, propertyInfo), typeof(object)), parameterExpression);

        }

        /// <summary>
        /// OrderBy Clause implementation
        /// </summary>
        /// <param name="expression"></param>
        /// <param name="property"></param>
        /// <returns></returns>
        private static IOrderedQueryable<T> OrderBy(IOrderedQueryable<T> expression, string property, Dictionary<string, PropertyInfo> types)
        {
            Expression<Func<T, object>> expTree = GetExpressionTree(property, types);
            return expression.ThenBy(expTree);
        }

        /// <summary>
        /// OrderByDescending Clause implementation
        /// </summary>
        /// <param name="expression"></param>
        /// <param name="property"></param>
        /// <returns></returns>
        private static IOrderedQueryable<T> OrderByDescending(IOrderedQueryable<T> expression, string property, Dictionary<string, PropertyInfo> types)
        {
            Expression<Func<T, object>> expTree = GetExpressionTree(property, types);
            return expression.ThenByDescending(expTree);
        }
    }
}
