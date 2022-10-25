using System.IO;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.SourceControl
{
    public class BaseSourceControl
    {
        protected string RepositoryPath { get; set; }

        /// <summary>
        /// Delete Repository
        /// </summary>
        public void DeleteLocalRepository()
        {
            if (!string.IsNullOrWhiteSpace(RepositoryPath) && Directory.Exists(RepositoryPath))
            {
                DeleteReadOnlyDirectory(RepositoryPath);
            }
        }

        /// <summary>
        /// Recursively deletes a directory as well as any subdirectories and files. If the files are read-only, they are flagged as normal and then deleted.
        /// </summary>
        /// <param name="directory">The name of the directory to remove.</param>
        public static void DeleteReadOnlyDirectory(string directory)
        {
            foreach (string subDirectory in Directory.EnumerateDirectories(directory))
            {
                DeleteReadOnlyDirectory(subDirectory);
            }
            foreach (string fileName in Directory.EnumerateFiles(directory))
            {
                FileInfo fileInfo = new FileInfo(fileName)
                {
                    Attributes = FileAttributes.Normal
                };
                fileInfo.Delete();
            }
            Directory.Delete(directory);
        }
    }
}
