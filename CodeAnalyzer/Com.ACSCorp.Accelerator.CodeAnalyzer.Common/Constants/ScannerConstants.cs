namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants
{
    public class ScannerConstants
    {
        public struct CMDConstants
        {
            public const string MoveToProjectFolder = "cd /d {0}";
            public const string MoveToPreviousFolder = "cd..";
            public const string ExitTerminal = "Exit";
            public struct DotnetScannerCommands
            {
                public const string BeginCommand = "dotnet sonarscanner begin /d:sonar.host.url={0} /d:sonar.login={1} /d:sonar.password={2} /k:{3} /n:{3}";
                public const string BuildCommand = "dotnet build";
                public const string BuildShutDown = "dotnet build-server shutdown --msbuild";
                public const string EndCommand = "dotnet sonarscanner end /d:sonar.login={0} /d:sonar.password={1}";
            }

            public struct JavaMavenScannerCommands
            {
                public const string MVNCleanInstall = "mvn clean install";
                public const string MVNSonarScan = "mvn sonar:sonar -Dsonar.host.url={0} -Dsonar.login={1} -Dsonar.password={2} -Dsonar.projectKey={3} -Dsonar.projectName={3}";
            }

            public struct GenericScannerCommands
            {
                public const string GenericScan = "sonar-scanner -Dsonar.projectKey={0} -Dsonar.projectName={0} -Dsonar.sources=src -Dsonar.host.url={1} -Dsonar.login={2} -Dsonar.password={3}";
            }
        }
    }
}

