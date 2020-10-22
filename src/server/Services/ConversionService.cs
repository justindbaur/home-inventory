using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;

namespace HomeInventory.Services
{
    public class ConversionService : IConversionService
    {
        private readonly HttpClient client;
        private static readonly JsonSerializerOptions serializerOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        public ConversionService(HttpClient client)
        {
            this.client = client;
        }

        public async Task<float> Convert(string fromUom, string toUom)
        {
            var content = CreateBaseContent(new[]
            {
                new KeyValuePair<string?, string?>("from-value", "1"),
                new KeyValuePair<string?, string?>("from-type", fromUom),
                new KeyValuePair<string?, string?>("to-type", toUom)
            }.ToList());


            var response = await client.PostAsync("convert", content); 
            response.EnsureSuccessStatusCode();
            var data = await response.Content.ReadFromJsonAsync<ConversionResult>(serializerOptions);

            return data!.ResultFloat;
        }

        private FormUrlEncodedContent CreateBaseContent(List<KeyValuePair<string?, string?>> data)
        {
            data.Add(new KeyValuePair<string?, string?>("output-case", "camel"));

            return new FormUrlEncodedContent(data);
        }

        private class ConversionResult
        {
            public bool Valid { get; set; }
            public string? Result { get; set; }
            public string? FromValue { get; set; }
            public string? ToType { get; set; }
            public string? FromType { get; set; }
            public float ResultFloat { get; set; }
        }
    }
}