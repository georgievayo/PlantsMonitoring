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

namespace PlantsMonitoring.UsersService
{
    public class UsersService : StatelessService, IUsersService
    {
        private const string SECRET = "426c54ef-513e-47d8-8652-37bdd32c1fb6";
        private const string AUDIENCE = "plants-monitoring";
        private const string ISSUER = "http://localhost:3434";

        private readonly IUsersManager usersManager;

        public UsersService(StatelessServiceContext context, IUsersManager usersManager)
            : base(context)
        {
            this.usersManager = usersManager;
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
                return Task.FromResult(token);
            }

            return Task.FromResult("");
        }

        public Task Logout(string token)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }

        private string GenerateToken(string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var encodedSecret = Encoding.ASCII.GetBytes(SECRET);
            var key = new SymmetricSecurityKey(encodedSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = AUDIENCE,
                Issuer = ISSUER,
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("UserId", userId)
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenSerialized = tokenHandler.WriteToken(token);

            return tokenSerialized;
        }
    }
}
