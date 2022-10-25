namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IStaticScan
    {
        /// <summary>
        /// Run Static Scan
        /// </summary>
        /// <param name="projectKey"></param>
        /// <returns>taskId</returns>
        public string RunScan(string projectKey);
    }
}
