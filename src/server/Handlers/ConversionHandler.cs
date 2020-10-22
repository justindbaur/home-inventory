using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace HomeInventory.Handlers
{
    public class ConversionHandler : DelegatingHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return base.SendAsync(request, cancellationToken);
        }
    }
}