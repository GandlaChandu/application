namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IStaticScan
    {
        /// <summary>
        /// Run Static Scan
        /// </summary>
        /// <param name="projectPath"></param>
        /// <returns>taskId</returns>
        public string RunScan(string projectPath);
    }
}
