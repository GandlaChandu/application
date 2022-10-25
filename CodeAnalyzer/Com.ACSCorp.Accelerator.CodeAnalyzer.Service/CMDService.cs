using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using System;
using System.Diagnostics;
using System.IO;
using System.Threading;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class CMDService : ICMDService
    {
        private readonly Process cmdProcess;
        private readonly StreamWriter streamWriter;
        private readonly AutoResetEvent outputWaitHandle;
        private readonly CMDResult cmdOutput;

        public CMDService()
        {
            cmdProcess = new Process();
            outputWaitHandle = new AutoResetEvent(false);
            cmdOutput = new CMDResult();

            ProcessStartInfo processStartInfo = new ProcessStartInfo
            {
                FileName = Common.Constants.Constants.CMDExePath,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                RedirectStandardError = true,
                CreateNoWindow = true
            };
            cmdProcess.OutputDataReceived += CMDProcessOutputDataReceived;
            cmdProcess.ErrorDataReceived += CMDProcessErrorDataReceived;
            cmdProcess.StartInfo = processStartInfo;
            cmdProcess.Start();

            streamWriter = cmdProcess.StandardInput;
            cmdProcess.BeginOutputReadLine();
            cmdProcess.BeginErrorReadLine();
        }

        #region Public methods

        public CMDResult ExecuteCommand(string command)
        {
            cmdOutput.ErrorResult = string.Empty;
            cmdOutput.OutputResult = string.Empty;
            cmdOutput.WarningResult = string.Empty;

            streamWriter.WriteLine(command);
            streamWriter.WriteLine("echo end");
            outputWaitHandle.WaitOne();
            return cmdOutput;
        }

        public void Dispose()
        {
            cmdProcess.Close();
            cmdProcess.Dispose();
            streamWriter.Close();
            streamWriter.Dispose();
        }

        #endregion Public methods

        #region Private methods

        /// <summary>
        /// Event handler for output
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void CMDProcessOutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            if (e.Data == null || e.Data == "end")
            {
                outputWaitHandle.Set();
            }
            else
            {
                cmdOutput.OutputResult += e.Data + Environment.NewLine;
                Debug.WriteLine(e.Data);
            }
        }

        /// <summary>
        /// Event handler for error
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void CMDProcessErrorDataReceived(object sender, DataReceivedEventArgs e)
        {
            if (e.Data == null || e.Data == "end")
            {
                outputWaitHandle.Set();
            }
            else if (e.Data.StartsWith("WARNING:"))
            {
                cmdOutput.WarningResult += e.Data + Environment.NewLine;
                Debug.WriteLine(e.Data);
            }
            else
            {
                cmdOutput.ErrorResult += e.Data + Environment.NewLine;
                Debug.WriteLine(e.Data);
            }
        }

        #endregion Private methods

    }
}
