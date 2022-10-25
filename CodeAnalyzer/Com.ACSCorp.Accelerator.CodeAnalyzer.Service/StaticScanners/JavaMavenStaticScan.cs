using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.Constants;
using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.ScannerConstants;


namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.StaticScanners
{
    public class JavaMavenStaticScan : BaseStaticScanner, IStaticScan
    {
        private readonly IConfiguration _configuration;
        public JavaMavenStaticScan(IConfiguration configuration, ICMDService cMDService, ILogger<JavaMavenStaticScan> logger) : base(cMDService, logger)
        {
            _configuration = configuration;
        }
        public string RunScan(string projectKey)
        {
            string baseRepositoryPath = _configuration[AppSettingConstants.BaseRepositoryPath];
            SonarQubeCredentials sonarQubeCredentials = _configuration.GetSection(SonarServerInfo).Get<SonarQubeCredentials>();
            string cmd;
            string taskId;
            //Move to project path
            cmd = string.Format(CMDConstants.MoveToProjectFolder, $"{baseRepositoryPath}{projectKey}");
            RunCommand(cmd);

            //MVN Clean & Install
            cmd = CMDConstants.JavaMavenScannerCommands.MVNCleanInstall;
            RunCommand(cmd);

            //MVN Sonar Scan
            cmd = string.Format(CMDConstants.JavaMavenScannerCommands.MVNSonarScan,
                sonarQubeCredentials.Url,
                sonarQubeCredentials.UserName,
                sonarQubeCredentials.Password,
                projectKey);
            string outputResult = RunCommand(cmd);
            taskId = FindTaskId(outputResult);

            cmd = CMDConstants.MoveToPreviousFolder;
            RunCommand(cmd);

            return taskId;
        }
    }
}
