using System;
namespace HomeInventory.Shared.Dtos
{
    public class RegisterUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        // TODO: Add attributes
        public string ConfirmPassword { get; set; }
    }
}
