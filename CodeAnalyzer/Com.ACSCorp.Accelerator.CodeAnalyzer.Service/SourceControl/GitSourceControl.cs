using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using LibGit2Sharp;
using LibGit2Sharp.Handlers;

using Microsoft.Extensions.Configuration;

using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.Constants;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.SourceControl
{
    public class GitSourceControl : BaseSourceControl, ISourceControl
    {
        #region Variables

        private readonly IConfiguration configuration;

        #endregion Variables

        #region Constructor

        public GitSourceControl(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        #endregion Constructor

        #region Public Methods
        /// <summary>
        /// Clone source code from GIT
        /// </summary>
        /// <param name="sourceControlModel"></param>
        public void CloneRepository(SourceControlDTO sourceControlModel)
        {
            string baseRepositoryPath = configuration[AppSettingConstants.BaseRepositoryPath];

            RepositoryPath = $"{baseRepositoryPath}{sourceControlModel.ProjectKey}";

            DeleteLocalRepository();

            CredentialsHandler credentialsHandler = (_url, _user, _cred) => new UsernamePasswordCredentials
            {
                Username = sourceControlModel.UserName,
                Password = sourceControlModel.Password
            };

            CloneOptions cloneOptions = new CloneOptions
            {
                CredentialsProvider = credentialsHandler
            };
            Repository.Clone(sourceControlModel.Url, base.RepositoryPath, cloneOptions);
        }
        #endregion
    }
}
