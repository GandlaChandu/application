using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface ICMDService : IDisposable
    {
        /// <summary>
        /// Execute Cmd
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        public CMDResult ExecuteCommand(string command);
    }
}
