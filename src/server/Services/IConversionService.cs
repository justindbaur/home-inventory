using System.Threading.Tasks;

namespace HomeInventory.Services
{
    public interface IConversionService
    {
        Task<float> Convert(string fromUom, string toUom);
    }
}