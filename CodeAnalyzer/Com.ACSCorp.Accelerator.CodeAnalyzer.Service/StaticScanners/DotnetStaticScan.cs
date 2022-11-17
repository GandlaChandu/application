﻿using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.Constants;
using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.ScannerConstants;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.StaticScanners
{
    public class DotnetStaticScan : BaseStaticScanner, IStaticScan
    {
        private readonly IConfiguration _configuration;
        public DotnetStaticScan(IConfiguration configuration, ICMDService cMDService, ILogger<DotnetStaticScan> logger) : base(cMDService, logger)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Run Dotnet Scan
        /// </summary>
        /// <param name="projectPath"></param>
        /// <returns></returns>
        public string RunScan(string projectPath)
        {
            string baseRepositoryPath = _configuration[AppSettingConstants.BaseRepositoryPath];
            SonarQubeCredentials sonarQubeCredentials = _configuration.GetSection(SonarServerInfo).Get<SonarQubeCredentials>();
            string cmd;
            string taskId;

            //Move to project path
            cmd = string.Format(CMDConstants.MoveToProjectFolder, $"{baseRepositoryPath}{projectPath}");
            RunCommand(cmd);

            //Begin Scan
            cmd = string.Format(
                CMDConstants.DotnetScannerCommands.BeginCommand,
                sonarQubeCredentials.Url,
                sonarQubeCredentials.UserName,
                sonarQubeCredentials.Password,
                projectPath);
            RunCommand(cmd);

            //Build Project
            cmd = CMDConstants.DotnetScannerCommands.BuildCommand;
            RunCommand(cmd);

            cmd = CMDConstants.DotnetScannerCommands.BuildShutDown;
            RunCommand(cmd);

            //End Scan
            cmd = string.Format(CMDConstants.DotnetScannerCommands.EndCommand,
                sonarQubeCredentials.UserName,
                sonarQubeCredentials.Password);
            string outputResult = RunCommand(cmd);
            taskId = FindTaskId(outputResult);

            cmd = CMDConstants.MoveToPreviousFolder;
            RunCommand(cmd);

            return taskId;
        }
    }
}
