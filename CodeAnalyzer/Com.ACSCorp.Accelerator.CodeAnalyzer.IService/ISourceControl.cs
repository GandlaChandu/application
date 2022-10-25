using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface ISourceControl
    {
        /// <summary>
        ///  Clone Repository
        /// </summary>
        /// <param name="soruceControlDTO"></param>
        /// <returns></returns>
        void CloneRepository(SourceControlDTO soruceControlDTO);

        /// <summary>
        /// Delete Repository
        /// </summary>
        void DeleteLocalRepository();
    }
}
