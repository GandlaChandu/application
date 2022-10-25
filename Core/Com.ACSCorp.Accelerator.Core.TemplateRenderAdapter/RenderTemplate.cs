using Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter.Interface;
using RazorLight;
using System.IO;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter
{
    public class RenderTemplate : IRenderTemplate
    {
        public async Task<string> RenderTemplateAsync<TViewModel>(string filename, TViewModel viewModel)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "Views");
            var engine = new RazorLightEngineBuilder()
                 .UseFileSystemProject(path)
                 .UseMemoryCachingProvider()
                 .Build();

            string result = await engine.CompileRenderAsync(filename, viewModel);

            return result;
        }
    }
}
