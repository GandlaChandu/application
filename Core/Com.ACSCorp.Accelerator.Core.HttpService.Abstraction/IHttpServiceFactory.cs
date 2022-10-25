namespace Com.ACSCorp.Accelerator.Core.HttpService.Abstraction
{
    public interface IHttpServiceFactory
    {
        public IHttpService CreateHttpService();
        public IHttpService CreateHttpService(string name);
    }
}