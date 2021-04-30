using System;
using System.Threading.Tasks;
using HomeInventory.Shared.Dtos;
using HomeInventory.Shared.Entities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HomeInventory.Controllers
{

    [ApiController]
    [Route("api/[controller]Svc")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;

        public AccountController(SignInManager<ApplicationUser> signInManager)
        {
            this.signInManager = signInManager;
        }

        [Authorize(AuthenticationSchemes = "Basic")]
        [HttpPost(nameof(SignIn))]
        public async Task<IActionResult> SignIn()
        {
            await signInManager.SignInAsync(await signInManager.UserManager.GetUserAsync(User), true);
            return NoContent();
        }

        [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
        [HttpPost("SignOut")]
        public async Task<IActionResult> SignOutUser()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }

        [Authorize(AuthenticationSchemes = "Basic")]
        [HttpGet(nameof(Generate))]
        public IActionResult Generate()
        {
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost(nameof(Register))]
        public async Task<IActionResult> Register(RegisterUserDto registerUser)
        {
            var user = new ApplicationUser
            {
                Id = registerUser.UserName.ToUpper(),
                UserName = registerUser.UserName,
                NormalizedUserName = registerUser.UserName.ToUpper(),
                Email = registerUser.Email,
                NormalizedEmail = registerUser.Email.ToUpper(),
            };

            var result = await signInManager.UserManager.CreateAsync(user, registerUser.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new { result.Errors });
            }

            return NoContent();
        }
    }
}