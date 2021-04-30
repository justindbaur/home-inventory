using System;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using HomeInventory.Shared.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;

namespace HomeInventory.Server.Services
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly SignInManager<ApplicationUser> signInManager;

        public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory loggerFactory,
            UrlEncoder urlEncoder,
            ISystemClock clock,
            SignInManager<ApplicationUser> signInManager)
            : base(options, loggerFactory, urlEncoder, clock)
        {
            this.signInManager = signInManager;
        }

        protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!AuthenticationHeaderValue.TryParse(Request.Headers[HeaderNames.Authorization], out var authValue))
            {
                return AuthenticateResult.NoResult();
            }

            if (!authValue.Scheme.Equals(Scheme.Name, StringComparison.InvariantCultureIgnoreCase))
            {
                return AuthenticateResult.NoResult();
            }

            var credentials = Encoding.UTF8.GetString(Convert.FromBase64String(authValue.Parameter ?? string.Empty))
                .Split(':', 2);

            if (credentials.Length != 2)
            {
                return AuthenticateResult.Fail("Basic token is malformed");
            }

            var user = await signInManager.UserManager.FindByNameAsync(credentials[0]);

            if (user is null)
            {
                return AuthenticateResult.Fail("Username or password is incorrect");
            }

            if (!await signInManager.UserManager.CheckPasswordAsync(user, credentials[1]))
            {
                return AuthenticateResult.Fail("Username or password is incorrect");
            }

            var ticket = new AuthenticationTicket(await signInManager.ClaimsFactory.CreateAsync(user), Scheme.Name);
            return AuthenticateResult.Success(ticket);
        }
    }
}
