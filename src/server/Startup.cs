using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using HomeInventory.Contexts;
using HomeInventory.Handlers;
using HomeInventory.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace HomeInventory
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();

            services.AddDbContext<MainDbContext>(b =>
            {
                b.UseSqlite("Data Source=main.db;");
            });

            var nuetrinoSettings = Configuration.GetSection("NeutrinoSettings");
            services.AddHttpClient<IConversionService, ConversionService>(b => 
            {
                b.BaseAddress = new Uri(nuetrinoSettings["BaseUri"]);
                b.DefaultRequestHeaders.Add("user-id", nuetrinoSettings["UserId"]);
                b.DefaultRequestHeaders.Add("api-key", nuetrinoSettings["ApiKey"]);
                b.DefaultRequestHeaders.Add("output-case", "camel");
            })
                .AddHttpMessageHandler<ConversionHandler>();

            services.AddTransient<ConversionHandler>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Home Inventory", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Home Inventory v1"));
            }

            app.UseHttpsRedirection();
            
            app.UseRouting();

            app.UseCors(b => b.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
