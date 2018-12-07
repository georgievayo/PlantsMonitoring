using System;
using System.Collections.Generic;
using System.Fabric;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using PlantsMonitoring.Data.Users;
using PlantsMonitoring.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using PlantsMonitoring.UsersService.Cache;
using System.Linq;
using PlantsMonitoring.Common;

namespace PlantsMonitoring.UsersService
{
    public class UsersService : StatelessService, IUsersService
    {
        private readonly ISessionCache cache;
        private readonly IUsersManager usersManager;

        public UsersService(StatelessServiceContext context, IUsersManager usersManager, ISessionCache cache)
            : base(context)
        {
            this.usersManager = usersManager;
            this.cache = cache;
        }

        public async Task<User> CreateUser(User user)
        {
            var result = await this.usersManager.Add(user);
            user.Id = result.Id;

            return user;
        }

        public Task<string> Login(User user)
        {
            var foundUser = this.usersManager.GetUser(user.Username, user.Password);
            if(foundUser != null)
            {
                var token = GenerateToken(foundUser.Id);
                cache.RemoveItem(foundUser.Id);
                cache.AddItem(foundUser.Id, token, Constants.TOKEN_EXPIRATION_DURATION);

                return Task.FromResult(token);
            }

            return Task.FromResult("");
        }

        public Task Logout(string userId)
        {
            cache.RemoveItem(userId);
            return Task.CompletedTask;
        }

        public Task<bool> ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenValue = tokenHandler.ReadToken(token) as JwtSecurityToken;
            var expirationDate = tokenValue.ValidTo;
            var userIdClaim = tokenValue.Claims.SingleOrDefault(c => c.Type == Constants.USER_ID_CLAIM);
            var existingToken = this.cache.GetItem(userIdClaim.Value);
            if (existingToken != null && DateTime.UtcNow < expirationDate)
            {
                return Task.FromResult(true);
            }
            else
            {
                return Task.FromResult(false);
            }
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }

        private string GenerateToken(string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var encodedSecret = Encoding.ASCII.GetBytes(Constants.SECRET);
            var key = new SymmetricSecurityKey(encodedSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = Constants.AUDIENCE,
                Issuer = Constants.ISSUER,
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(Constants.USER_ID_CLAIM, userId)
                }),
                Expires = DateTime.UtcNow.AddHours(Constants.TOKEN_EXPIRATION_DURATION),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenSerialized = tokenHandler.WriteToken(token);

            return tokenSerialized;
        }
    }
}
