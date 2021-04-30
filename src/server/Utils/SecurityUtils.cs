using System;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace HomeInventory.Server.Utils
{
    public static class SecurityUtils
    {
        public static SecurityKey CreateSecurityKey(string secret)
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        }
    }
}
