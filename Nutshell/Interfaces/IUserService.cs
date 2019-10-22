using Microsoft.AspNetCore.Identity;
using Nutshell.Models.Data;
using Nutshell.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nutshell.Interfaces
{
    public interface IUserService
    {
        Task<AuthenticationResult> RegisterUserAsync(UserRegistrationViewModel user);

        Task<AuthenticationResult> LoginAsync(string email, string password);

        Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken);

        Task<ApplicationUser> GetUserAsync(string id);
    }
}
