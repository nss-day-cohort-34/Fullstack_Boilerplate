using Microsoft.AspNetCore.Identity;
using Capstone.Models.DataModels;
using Capstone.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Interfaces
{
    public interface IUserService
    {
        Task<AuthenticationResult> RegisterUserAsync(UserRegistrationViewModel user);

        Task<AuthenticationResult> LoginAsync(string userName, string password);

        Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken);

        Task<ApplicationUser> GetUserAsync(string id);
    }
}
