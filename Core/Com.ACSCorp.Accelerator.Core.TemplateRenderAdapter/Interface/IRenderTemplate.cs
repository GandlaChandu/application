using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter.Interface
{
    public interface IRenderTemplate
    {
        public Task<string> RenderTemplateAsync<TViewModel>(string filename, TViewModel viewModel);
    }
}
