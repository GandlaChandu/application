
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.Constants;
using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.ScannerConstants;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.StaticScanners
{
    public class GenericStaticScan : BaseStaticScanner, IStaticScan
    {
        private readonly IConfiguration _configuration;
        public GenericStaticScan(IConfiguration configuration, ICMDService cMDService, ILogger<GenericStaticScan> logger) : base(cMDService, logger)
        {
            _configuration = configuration;
        }
        public string RunScan(string projectPath)
        {
            string baseRepositoryPath = _configuration[AppSettingConstants.BaseRepositoryPath];
            SonarQubeCredentials sonarQubeCredentials = _configuration.GetSection(SonarServerInfo).Get<SonarQubeCredentials>();
            string cmd;
            string taskId;

            //Move to project path
            cmd = string.Format(CMDConstants.MoveToProjectFolder, $"{baseRepositoryPath}{projectPath}\\src");
            RunCommand(cmd);

            //Run Command
            cmd = string.Format(CMDConstants.GenericScannerCommands.GenericScan,
                projectPath, sonarQubeCredentials.Url,
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
